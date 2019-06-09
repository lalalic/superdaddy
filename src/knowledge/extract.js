import parse from "./parse"
import {compile} from "./code"

const reg=/[-,，\s+]/
function splitKey(data){
	if(typeof(data)=='string')
		data=[data]

	return data.reduce((keys,piece)=>{
		piece.split(reg).forEach(a=>keys.push(a))
		return keys
	},[]).filter(a=>!!a)
}

function codeToBlob(str){
	const bytes = new Array(str.length);
	for (let i = 0; i < str.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	const byteArray=new Uint8Array(bytes)
	return new Blob([byteArray], {type:"text/javascript"})
}

function extractFromJavascript(file){
	return new Promise((resolve, reject)=>{
		const reader=new FileReader()
		reader.onload=function(e){
			const data=e.target.result
			try{
				const {homework,...plugin}=compile(data)
				plugin.code=data
				resolve({
					toJSON:a=>null,
					knowledge:plugin,
					revoke(){

					},
					getPhotos(){
						return []
					},
					upload(id,upload,files){
						return upload(codeToBlob(data),id,"index.js")
							.then(url=>this.knowledge.code=url)
							.then(()=>this.knowledge)
					}
				})
			}catch(e){
				reject(e)
			}
		}
		reader.onerror=reject

		reader.readAsText(file)
	})
}

export default function extract(file){
	if(file.type.endsWith("javascript")){
		return extractFromJavascript(file)
	}

    return parse(file).then(doc=>{
        let {docx, html:content, properties, id:elId,
				images, steps, sale, hasPrint, hasHomework,code,fields}=doc

        let {name,title, keywords, category, subject,
				abstract,description, score, ...others}=properties

		if(keywords)
			keywords=splitKey(keywords)

		if(category)
			category=splitKey(category)

        return {
			toJSON:a=>undefined,
            knowledge: {
                content,
                title:title||name,
                summary:abstract||description||subject,
				tags:keywords,
				category,
                props:others,
				steps,
				sale,
				hasPrint,
				hasHomework,
				fields,
				score,
				code,
				template:file
            },
            revoke(){
                var nodes=window.document.querySelectorAll(`#${elId} img[src~="blob:"]`)
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            getPhotos(){
                return Array.prototype.map.call(window.document.querySelectorAll(`#${elId} img`),a=>a.src)
            },
            upload(id,upload,files,token){
				files=files||[]
				let done=images.map(image=>{
					const {url,crc32:crc}=image
					if(!crc)
						return Promise.resolve({url})
					let found=files.find((a)=>a.crc==crc)
					if(found){
						return Promise.resolve({url:found.url,crc});
					}

					return upload(url, id,`image/${crc}.jpg`,{crc},token)
						.then(remoteURL=>{
							this.knowledge.content=this.knowledge.content.replace(url,image.url=remoteURL)
							window.document.querySelector(`#${elId} img[src~='${url}']`).setAttribute("src",remoteURL)
							return {url: remoteURL, crc}
						})
				})

				return Promise.all(done)
					.then(images=>externalizeDocxImage(docx,images))
					.then(externalizedDocx=>upload(externalizedDocx, id,`template.docx`))
					.then(url=>this.knowledge.template=url)
					.then(()=>code && upload(codeToBlob(data), id, 'index.js').then(url=>this.knowledge.code=url))
					.then(()=>this.knowledge)
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
			let found=images.find(a=>a.crc==crc)
			if(found){
				rel.attribs.TargetMode="External"
				rel.attribs.Target=found.url
				delete docx.parts[partName]
			}
		})
	})

	return docx.serialize()
		.generate({type:"blob", mimeType:docx.constructor.mime})
}
