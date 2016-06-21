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
import step from './html/step'

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
	step,
	heading: paragraph,
	header: Ignore,
	footer: Ignore,
	documentStyles: Ignore
}

class Document1 extends docx4js{
	static Factory=class extends docx4js.Factory{
		create(wXml, doc, parent, more){
			let model=super.create(...arguments)
			if(step.is(model))
				return new step.Model(...arguments)

			return model
		}
	}
}

function splitKey(data){
	if(typeof(data)=='string')
		data=[data]
	var keys=[]
	data.forEach(a=>a.split(",").forEach(b=>((b=b.trim()).length && keys.push(b))))
	return keys
}

export default function extract(file){
    return docxHub.assemble(file,{channel:"interactive"})
		.then(docx=>Document1.load(docx.data))
		.then(docx=>docx.parse(Document1.createVisitorFactory(MODELS))).then(doc=>{
        var {html:content, properties, id:elId, images, steps}=doc,
            {name,title, keywords, category, subject, abstract,description, ...others}=properties

		if(keywords)
			keywords=splitKey(keywords)

		if(category)
			category=splitKey(category)

        return {
            knowledge: {
                content,
                title:title||name,
                summary:abstract||description||subject,
                keywords,category,
                props:others,
				steps
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
