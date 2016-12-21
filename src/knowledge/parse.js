import docx4js from "docx4js"
import React from "react"
import ReactDOM from "react-dom/server"

let uuid=0
export default function parse(file){
	return docx4js.load(file).then(docx=>{
		let properties={}, steps=[], images=[],id=`_parser${uuid++}`
		let doc=docx.render((type,props,children)=>{
			switch(type){
			case "document":
				props.id=id
			break
			case "property":
				properties[props.name.toLowerCase()]=props.value
				return null
			break
			case "step":
			break
			case "inline.picture":
				images.push({url:props.url,crc32:props.crc32})
			break
			case "block":
			case "inline":
				let tag=props.node.children.find(a=>a.name=="w:sdtPr").children.find(a=>a.name=="w:tag")
				if(tag && tag.attribs["w:val"]=="hidden")
					props.hidden=true
			break
			}
			return createElement(type,props,children)
		})

		let html=ReactDOM.renderToStaticMarkup(doc)
		html=tidy(html)

		return {
			html,
			properties,
			steps,
			images,
			id
		}
	})
}



function createElement(type,props,children){
	console.log(type)
	const {pr,node,type:a,...others}=props
	if(TYPE[type])
		return React.createElement(TYPE[type], others,...children)
	else
		return null
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
	,"inline.picture":({url})=><img src={url}/>
	,hyperlink:({url,children})=><a href={url}>{children}</a>
	,tbl:({children})=><table><tbody>{children}</tbody></table>
	,tr:"tr"
	,tc:"td"
	,heading:({level,children})=>{
		return React.createElement(`h${level}`,{},children)
	}
	,list:({numId, level, children})=><ul><li>{children}</li></ul>
	,property:wrapper
	,drawing:wrapper
	,block:({hidden,children})=>hidden ? null : <div>{children}</div>
	,inline:({hidden,children})=>hidden ? null : <span>{children}</span>
}

import cheer from "cheerio"

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
