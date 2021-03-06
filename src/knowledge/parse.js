import React from "react"
import cheer from "cheerio"
import ReactDOM from "react-dom/server"
import {test} from "./code"
export {asModule} from "./code"

let uuid=0

const ARRAY=/^([a-z]+)(\d+)$/i
export default function parse(file){
	let properties={},  sale=null, hasPrint=null, hasHomework=null,code=null
	let fields=[]
	return import(/* webpackChunkName: "docx-template" */"docx-template").then(({DocxTemplate})=>{
		function identify(node, officeDocument){
			if(node.name=="w:hyperlink" && node.attribs["w:anchor"]){
				return null
			}
			let model=DocxTemplate.identify(...arguments)
			if(!model)
				return model
			let $=officeDocument.content
			switch(model.type){
			case "block":{
				let title=$(node).find(">w\\:sdtPr>w\\:alias").attr("w:val")
				if(title){
					let info=title.match(ARRAY)
					if(info){
						let [,key,i]=info
						model.type="["+key+"]"
						model.text=$(node).text().trim()
					}
				}
			}
			break
			case 'hyperlink':
				if("买"==$(node).text().trim())
					model.type="sale"
			break
			}

			return model
		}

		return DocxTemplate.load(file).then(docx0=>{
			let $=docx0.officeDocument.content
			docx0.render(()=>null,function(node, officeDocument){
				let model=identify(...arguments)
				if(!model)
					return model
				switch(model.type){
				case "object":{
					test(code=model.data)
					break
				}
				case "property":
					properties[model.name.toLowerCase()]=model.value
				break
				case "sale":
					sale=model.url
				break
				case "control.text":
				case "control.comboBox":
				case "control.dropDownList":
					fields.push(extractField(model, node, $))
				break
				}
				return model
			})
			fields=fields.filter(a=>!!a)

			function fieldsWithin(domain){
				let found=fields.filter(({node:a})=>$(a).closest(domain).length==1)
				if(found.length>0){
					fields=fields.filter(a=>!found.includes(a))
					found.forEach(a=>delete a.node)
					return found
				}

				return null
			}

			return DocxTemplate.parse(docx0).then(varDoc=>{
				varDoc.children.forEach(({code:{body:[stmt]=[]}, node})=>{
					if(stmt && stmt.type=="IfStatement"){
						let {right,left}=stmt.test
						switch(right.value){
							case "print":{
								hasPrint={}
								let myFields=fieldsWithin(node)
								if(myFields){
									myFields.forEach(({name,value})=>{
										hasPrint[name]=value
									})
								}
								break
							}
							case "homework":{
								hasHomework={}
								let myFields=fieldsWithin(node)
								if(myFields){
									myFields.forEach(({name,value})=>{
										hasHomework[name]=value
									})
								}
								break
							}
						}
					}
				})
				return varDoc.assemble({goal:"knowledge"})
			})
			.then(docx=>{
				const $=docx.officeDocument.content
				let steps=[], days=[], images=[],id=`_parser${uuid++}`
				let toc=[]
				let doc=docx.render((type,props,children)=>{
					switch(type){
					case "document":
						props.id=id
					break
					case "control.docPartObj":
					case "property":
						return null
					case "block":{
						if($(props.node).find(`w\\:sdtPr>w\\:docPartObj`).length==1){
							return null
						}
						break
					}
					case "control.picture":
					case "picture":
						if(props.blipFill && props.blipFill.blip){
							images.push({...props.blipFill.blip})
						}
					break
					case '[step]':
						steps.push(props.text)
					break
					case '[day]':
						days.push(props.text)
					break
					case "sale":
						type="hyperlink"
					break
					case "control.text":
						type="inline"
						children=$(props.node).text()
					break
					case "heading":
						if(Array.isArray(toc)){
							tocAppend({outline:props.outline, name:$(props.node).text()}, toc)
						}
					break
					case "p":
						const text=$(props.node).text()
						if(text.startsWith("mindmap://")){
							images.push({url:text})
							return createElement("mindmap",{...props,type:"mindmap",src:text})
						}
					break
					}
					return createElement(type,props,children)
				}, identify)

				let html=ReactDOM.renderToStaticMarkup(doc)
				html=tidy(html)

				if(toc.length==0){
					toc=undefined
				}else{
					toc={name:properties.name||properties.title, children:toc}
				}

				return {
					docx,
					html,
					properties,
					steps,
					days,
					images,
					sale,
					code,
					toc,
					hasPrint,
					hasHomework,
					id,
					fields: fields.length>0 ? fields.map(a=>{delete a.node;return a}) : undefined
				}
			})
		})
	})
}

function extractField(model, node, $){
	let {type, children, value, options, checked, format,locale}=model
	let name=$(node).find("w\\:tag").attr("w:val")
	let title=$(node).find("w\\:alias").attr("w:val")
	if(name){
		return {name, title, value, options, checked, format,locale, node}
	}else{
		console.warn(`a ${type} without tag is ignored as form field`)
	}
}


function createElement(type,props,children=[]){
	const {pr,node,type:a,...others}=props
	let Type=TYPE[type]||wrapper
	try{
		return React.createElement(Type, others,...children)
	}catch(e){
		debugger
		return null
	}
}

const wrapper=({children})=>{
	let content=React.Children.toArray(children)
	if(!content || content.length==0)
		return null
	else if(content.length==1)
		return React.Children.only(content[0])
	else
		return <span>{content}</span>
}

const TYPE={
	ignore: a=>null,
	document:"div",
	p:"p",
	r:"span",
	t:"span",
	tr:"tr",
	tc:"td",
	mindmap:({src})=><center>{React.createElement(`x-mindmap`,{src})}</center>,
	picture:({blipFill:{blip:{url}}})=><img src={url}/>,
	hyperlink:({url,children})=><a>{children}</a>,
	tbl:({children})=><table><tbody>{children}</tbody></table>,
	heading:({outline,children})=>React.createElement(`h${outline}`,{},children),
	list:({numId, level, children})=><ul><li>{children}</li></ul>,
	block:({children})=><div>{children}</div>,
	inline:({children})=><span>{children}</span>,
	"control.text": ({children})=><span>{children}</span>,
}

function tidy(html){
	let raw=cheer.load(html)
	raw("span>span:first-child:last-child")
		.each((i,el)=>raw(el.parent).replaceWith(el))

	raw("span").each((i,el)=>{
		let $=raw(el)
		if($.find("img,a").length==0)
			$.replaceWith($.text())
	})
	return raw.html()
}


export function toHtml(docx){
	const doc=docx.render(createElement)
	const html=ReactDOM.renderToStaticMarkup(doc)
	return tidy(html)
}

function tocAppend({outline,name}, toc=[]){
	if(toc.length==0){
		toc.push({outline,name})
	}else if(outline==toc[0].outline){
		toc.push({outline,name})
	}else if(outline>toc[0].outline){
		const current=toc[toc.length-1]
		if(!current.children){
			current.children=[]
		}
		tocAppend(arguments[0], current.children)
	}
	return toc
}