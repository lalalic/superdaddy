import docxTemplate from "docx-template"
import React from "react"
import cheer from "cheerio"
import ReactDOM from "react-dom/server"

let uuid=0

const ARRAY=/^([a-z]+)(\d+)$/i
export default function parse(file){
	let properties={}, applets=[], sale
	return docxTemplate.load(file).then(docx0=>{
		docx0.render(()=>null,function(){
			let model=identify(...arguments)
			if(!model)
				return model
			switch(model.type){
			case "property":
				properties[model.name.toLowerCase()]=model.value
			break
			case "applet":
				let {title,desc,data}=model
				applets.unshift({title,desc,data})
			break
			case "sale":
				sale=model.url
			break
			}
			return model
		})
		
		return docxTemplate.parse(docx0)
		.then(varDoc=>{
			return varDoc.assemble({goal:"promote"})
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
				applets,
				sale,
				id
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
