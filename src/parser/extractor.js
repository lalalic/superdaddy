import docxHub from "docx-template"
import docx4js from "docx4js"

import {File} from "qili-app"
import dbKnowledge from "../db/knowledge"

import Ignore from "./html/ignore"
import document from "./html/document"
import documentProperty from "./html/property"
import paragraph from "./html/p"
import table from "./html/table"
import row from "./html/tr"
import cell from "./html/td"
import text from "./html/text"
import image from "./html/image"
import hyperlink from "./html/hyperlink"

export default function extract(file){
	var MODELS={
		document,
		documentProperty,
		paragraph,
		table,
		row,
		cell,
		text,
		image,
		hyperlink,
		heading: paragraph,
		header: Ignore,
		footer: Ignore,
		documentStyles: Ignore
	}

    return docxHub.assemble(file,{channel:"interactive"})
		.then(docx=>docx.parse(docx4js.createVisitorFactory(MODELS))).then(doc=>{
        var {html:content, properties, id:elId, images}=doc,
            {name,title, keywords, category, subject, abstract,description, ...others}=properties

        return {
            knowledge: {
                content,
                title:title||name,
                summary:abstract||description||subject,
                keywords,category,
                props:others
            },
            revoke(){
                var nodes=window.document.querySelectorAll(`#${elId} img.__revoking`)
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            getPhotos(){
                return Array.prototype.map.call(window.document.querySelectorAll(`#${elId} img`),(a)=>a.src)
            },
            upload(entity){
                var kind=dbKnowledge._name,
                    more={entity:{kind,_id:entity._id}}
                return new Promise((resolve, reject)=>
                    File.find({params:more,fields:"crc32"}).fetch((files)=>{
                        var pImages=images.map((image)=>{
                            var data=image.data,
                                crc32=data.crc32;
                            if(files.find((a)=>a.crc32==crc32))
                                return undefined;

                            return File.upload(data, "image", Object.assign({crc32,key:"a.jpg"},more))
                                .then((url)=>image.data=url)
                        }).filter((a)=>a)

                        var pRawDocx=File.upload(file,"docx", Object.assign({key:"a.docx"},more))

                        Promise.all([pRawDocx, ...pImages])
                            .then(()=>{
                                    resolve(this.knowledge.content=doc.html)
                                }, reject)
                    })//fetch
                )//promise
            }
        }
    })
}

extract.Template=class Template{
    constructor(html){
        this.contents=[]
        var matcher, lastIndex=0, reg=this.constructor.EDITABLE_REG, len=html.length
        var staticContent,key, alt
        while((matcher=reg.exec(html))!=null){
            staticContent=html.substring(lastIndex,matcher.index)
            key=matcher[1]
            alt=matcher[2]
            lastIndex=reg.lastIndex
            if(staticContent)
                this.contents.push(staticContent)
            if(key || alt)
                this.contents.push({key,alt})
        }

        if(lastIndex!=len-1)
            this.contents.push(html.substring(lastIndex,len))
    }

    static placeholder(key,alt){
        return `<editable key="${key}">${alt}</editable>`
    }

	static EDITABLE_REG=/<editable\s+key="(.*?)">(.*?)<\/editable>/gm
}
