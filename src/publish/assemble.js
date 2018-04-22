export default class Assembler{
    constructor({template, ...data}){
        this.data=data
        this.template=template
    }

    assemble(){
        return this.load()
            .then(template=>{
				return template.assemble(this.data)
			})
    }

    load(){
        return import(/* webpackChunkName: "docx-template" */"docx-template").then(DocxTemplate=>{
            if(typeof(this.template)=="string"){
    			return fetch(this.template)
    				.then(data=>data.blob())
    				.then(docx=>DocxTemplate.parse(docx))
    		}else{
    			return DocxTemplate.parse(this.template)
    		}
        })	
    }
}
