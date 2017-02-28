import {File} from "qili-app"
import dbKnowledge from "../db/knowledge"
import parse from "./parse"

const reg=/[-,，\s+]/
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
        var {html:content, properties, id:elId, images, steps, applets,sale}=doc,
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
				applets,
				steps,
				sale
            },
            revoke(){
                var nodes=window.document.querySelectorAll(`#${elId} img[src~="blob:"]`)
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            getPhotos(){
                return Array.prototype.map.call(window.document.querySelectorAll(`#${elId} img`),a=>a.src)
            },
            upload(entity){
                let kind=dbKnowledge._name,
                    more={entity:{kind,_id:entity._id}}
                return new Promise((resolve, reject)=>
                    File.find({params:more,fields:"crc32"}).fetch(files=>{
                        let pImages=images.map(image=>{
							const {url,crc32}=image
                            if(files.find((a)=>a.crc32==crc32))
                                return undefined;

                            return File.upload(url, Object.assign({crc32,key:"a.jpg"},more))
                                .then(remoteURL=>{
									this.knowledge.content=this.knowledge.content.replace(url,image.url=remoteURL)
									window.document.querySelector(`#${elId} img[src~='${url}']`).setAttribute("src",remoteURL)
								})
								
                        }).filter(a=>!!a)

                        let pRawDocx=File.upload(file, Object.assign({key:"a.docx"},more))
							.then(url =>this.knowledge.template=url)
							
						let pApplet
						if(applets.length){
							pApplet=Promise.all(this.knowledge.applets.map(applet=>{
								return File.upload(applet.data,{key:"a.html"})
									.then(url=>applet.data=url)
							}))
						}else{
							pApplet=Promise.resolve()
						}

                        Promise.all([pRawDocx, pApplet, ...pImages])
                            .then(()=>{
                                    resolve(this.knowledge)
                                }, reject)
                    })//fetch
                )//promise
            }
        }
    })
}
