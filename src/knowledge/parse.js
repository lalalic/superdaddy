import {DocxTemplate as docxTemplate} from "docx-template"
import React from "react"
import cheer from "cheerio"
import ReactDOM from "react-dom/server"

let uuid=0

const ARRAY=/^([a-z]+)(\d+)$/i
export default function parse(file){
	let properties={},  sale, hasPrint, hasHomework
	let fields=[]
	return docxTemplate.load(file).then(docx0=>{
		let $=docx0.officeDocument.content
		docx0.render(()=>null,function(node, officeDocument){
			let model=identify(...arguments)
			if(!model)
				return model
			switch(model.type){
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
		
		return docxTemplate.parse(docx0)
		.then(varDoc=>{
			varDoc.children.forEach(({code:{body:[stmt]}, node})=>{
				if(stmt.type=="IfStatement"){
					let {right,left}=stmt.test
					switch(right.value){
						case "print":{
							hasPrint={}
							let myFields=fieldsWithin(node)
							if(myFields)
								hasPrint.fields=myFields
							break
						}
						case "homework":{
							hasHomework={}
							let myFields=fieldsWithin(node)
							if(myFields)
								hasHomework.fields=myFields
							break
						}
					}
				}
			})
			return varDoc.assemble({goal:"knowledge"})
		})
		.then(docx=>{
			let steps=[], days=[], images=[],id=`_parser${uuid++}`
			let doc=docx.render((type,props,children)=>{
				switch(type){
				case "document":
					props.id=id
				break
				case "property":
					return null
				break
				case "control.picture":
				case "picture":
					images.push({url:props.url,crc32:props.crc32})
				break
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
					children=docx.officeDocument.content(props.node).text()
				break
				}
				return createElement(type,props,children)
			}, identify)

			let html=ReactDOM.renderToStaticMarkup(doc)
			html=tidy(html)

			return {
				docx,
				html,
				properties,
				steps,
				days,
				images,
				sale,
				hasPrint,
				hasHomework,
				id,
				fields: fields.length>0 ? fields.map(a=>{delete a.node;return a}) : undefined
			}
		})
	})
	
}

export function identify(node, officeDocument){
	let model=docxTemplate.identify(...arguments)
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
				model.type=`[${key}]`
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


function createElement(type,props,children){
	const {pr,node,type:a,...others}=props
	let Type=TYPE[type]||wrapper
	return React.createElement(Type, others,...children)
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
	ignore: a=>null
	,document:"div"
	,p:"p"
	,r:"span"
	,t:"span"
	,picture:({url})=><img src={url}/>
	,hyperlink:({url,children})=><a>{children}</a>
	,tbl:({children})=><table><tbody>{children}</tbody></table>
	,tr:"tr"
	,tc:"td"
	,heading:({level,children})=>{
		return React.createElement(`h${level}`,{},children)
	}
	,list:({numId, level, children})=><ul><li>{children}</li></ul>
	,block:({children})=><div>{children}</div>
	,inline:({children})=><span>{children}</span>
	,"control.text": ({children})=><span>{children}</span>
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
