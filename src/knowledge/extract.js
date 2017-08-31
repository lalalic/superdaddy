import {File} from "qili-app"
import dbKnowledge from "db/knowledge"
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
        let {docx, html:content, properties, id:elId, 
				images, steps, sale, hasPrint, hasHomework,fields}=doc
				
        let {name,title, keywords, category, subject, 
				abstract,description, ...others}=properties

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
				steps,
				sale,
				hasPrint,
				hasHomework,
				fields,
				template:file
            },
            revoke(){
                var nodes=window.document.querySelectorAll(`#${elId} img[src~="blob:"]`)
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            getPhotos(){
                return Array.prototype.map.call(window.document.querySelectorAll(`#${elId} img`),a=>a.src)
            },
            upload(entity){
                let kind=dbKnowledge._name
                let more={entity:{kind,_id:entity._id}}
                return new Promise((resolve, reject)=>
                    File.find({params:more,fields:"crc32"}).fetch(files=>{
                        let done=images.map(image=>{
							const {url,crc32}=image
                            if(files.find((a)=>a.crc32==crc32))
                                return Promise.resolve({url,crc32});

                            return File.upload(url, Object.assign({crc32,key:"a.jpg"},more))
                                .then(remoteURL=>{
									this.knowledge.content=this.knowledge.content.replace(url,image.url=remoteURL)
									window.document.querySelector(`#${elId} img[src~='${url}']`).setAttribute("src",remoteURL)
									return {url: remoteURL, crc32}
								})
								
                        })
						
						Promise.all(done)
							.then(images=>externalizeDocxImage(docx,images))
							.then(externalizedDocx=>File.upload(externalizedDocx, Object.assign({key:"a.docx"},more)))
							.then(url =>this.knowledge.template=url)
							.then(()=>resolve(this.knowledge),reject)
                    })//fetch
                )//promise
            }
        }
    })
}


//crc32->part
function externalizeDocxImage(docx, images){
	let root=docx.officeDocument.relName.split("/").slice(0,-1).join("/")
	let parts=docx.officeDocument
		.rels("[Type$=header]")
		.add(docx.officeDocument.rels("[Type$=footer]"))
		.map((i,rel)=>{
			let partName=`${root}/${rel.attribs.Target}.rels`
			let part=docx.getPart(partName)
			if(part && part.cheerio){//parsed means possibly image  handled
				return part
			}
		})
		.get()
		.filter(a=>!!a)
		
	parts.push(docx.officeDocument.rels)
	
	root=docx.officeDocument.folder
	parts.forEach($=>{
		$("[Type$=image]").each((i,rel)=>{
			if(rel.attribs.TargetMode=="External")
				return
	
			let partName=`${root}${rel.attribs.Target}`
			let crc=docx.getPartCrc32(partName)
			let found=images.find(({crc32})=>crc32==crc)
			if(found){
				rel.attribs.TargetMode="External"
				rel.attribs.Target=found.url
				delete docx.parts[partName]
			}
		})
	})
	
	docx.save("test")
	
	return docx.serialize().generate({type:"nodebuffer"})
}