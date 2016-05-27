import Visitor from "./visitor"
import paragraph from "./p"
import document from "./document"


export default class image extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(paragraph)
        this.data=this.srcModel.getImage()
        if(typeof(this.data)!='string'){
            this.findTypedParent(document).images.push(this)
        }
    }

    get html(){
        let alt=this.alt ? `alt="${this.alt}"` : ""
        switch(typeof(this.data)){
        case 'string':
            return `<img src="${this.data}" ${alt}>`
        default:
            return `<img class="__revoking" ${alt} src="${URL.createObjectURL(new Blob([this.data],{type:"image/*"}))}">` /**/
        }
    }

    get alt(){
        return this.container.text
    }
}
