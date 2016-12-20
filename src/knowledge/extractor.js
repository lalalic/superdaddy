import {File} from "qili-app"
import dbKnowledge from "../db/knowledge"
import parse from "./parser"

const reg=/[-,\s+]/
function splitKey(data){
	if(typeof(data)=='string')
		data=[data]

	return data.reduce((keys,piece)=>{
		piece.split(reg).forEach(a=>keys.push(a))
		return keys
	},[]).filter(a=>!!a)
}

export default function extract(file){
    return parse(file).then(doc=>{
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
                var nodes=window.document.querySelectorAll(`#${elId} img[src~="blob:"]`)
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            getPhotos(){
                return Array.prototype.map.call(window.document.querySelectorAll(`#${elId} img`),a=>a.src)
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
