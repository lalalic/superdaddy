import {DocxTemplate as docxTemplate} from "docx-template"
import React from "react"
import cheer from "cheerio"
import ReactDOM from "react-dom/server"
import OLE from "cfb"

let uuid=0

const ARRAY=/^([a-z]+)(\d+)$/i
export default function parse(file){
	let properties={}, applets=[], sale, hasPrint, hasHomework
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
			case "applet":
				let {title,desc,data}=model
				let code=extractOLE(data.asNodeBuffer())
				applets.unshift({title,desc,code,node})
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
		
		function appletWithin(domain){
			let found=applets.findIndex(({node:a})=>$(a).closest(domain).length==1)
			if(found!=-1){
				found=applets.splice(found,1)
				delete found.node
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
							let applet=appletWithin(node)
							if(applet)
								hasHomework.applet=applet
							break
						}
						case "homework":{
							hasHomework={}
							let myFields=fieldsWithin(node)
							if(myFields)
								hasHomework.fields=myFields
							let applet=appletWithin(node)
							if(applet)
								hasHomework.applet=applet
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
				case "applet":
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
				html,
				properties,
				steps,
				days,
				images,
				sale,
				hasPrint,
				hasHomework,
				id,
				fields: fields.length>0 ? fields : undefined,
				applet: applets.length>0 ? applets[0] : undefined
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
	case 'object':
		let ole=node.children.find(a=>a.name=="o:OLEObject"), rid
		if(ole && ole.attribs.ProgID=='Package' 
			&& ole.attribs.Type=='Embed' 
			&& (rid=ole.attribs['r:id'])){
			model.type="applet"
			model.data=officeDocument.getRel(rid)
			let shape=node.children.find(a=>a.name=="v:shape")
			if(shape){
				let alt=(shape.attribs.alt||"").trim()
				let desc=$(node).closest("w\\:p").text().trim()
				model.title=alt || desc || "工具"
				if(desc)
					model.desc=desc
			}
		}
	break
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
	let {type, children, ...props}=model
	let name=$(node).find("w\\:tag").attr("w:val")
	let title=$(node).find("w\\:alias").attr("w:val")
	if(name){
		return {name, title, ...props, node}
	}else{
		console.warn(`a ${type} without tag is ignored as form field`)
	}
}

function extractOLE(data){
	let ole=OLE.parse(data)
	let content=ole.find("!ole10Native").content
	let start=content.slice(0,Math.min(content.length/2,512)).lastIndexOf(0)+1
	let end=content.indexOf(0,Math.min(start,content.length/2))-1
	return new TextDecoder("utf-8").decode(content.slice(start,end))
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
