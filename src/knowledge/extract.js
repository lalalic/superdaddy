import {File} from "qili-app"
import dbKnowledge from "../db/knowledge"
import parse from "./parse"

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
                    File.find({params:more,fields:"crc32"}).fetch(files=>{
                        var pImages=images.map(({url,crc32})=>{
                            if(files.find((a)=>a.crc32==crc32))
                                return undefined;

                            return File.upload(url, Object.assign({crc32,key:"a.jpg"},more))
                                .then(remoteURL=>{
									this.knowledge.content.replace(url,image.url=remoteURL)
									window.document.querySelector(`#${elId} img[src~="url"]`).setAttribute("src",remoteURL)
								})
								
                        }).filter(a=>!!a)

                        var pRawDocx=File.upload(file, Object.assign({key:"a.docx"},more))
							.then(url =>this.knowledge.template=url)

                        Promise.all([pRawDocx, ...pImages])
                            .then(()=>{
                                    resolve(this.knowledge)
                                }, reject)
                    })//fetch
                )//promise
            }
        }
    })
}
