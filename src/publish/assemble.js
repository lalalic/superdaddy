import docxTemplate from "docx-template"

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
        return fetch(`/publish/templates/${this.template}.docx`)
            .then(data=>data.blob())
            .then(docx=>docxTemplate.parse(docx))
    }
}
