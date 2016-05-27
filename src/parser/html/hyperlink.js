import Visitor from "./visitor"
import paragraph from "./p"

export default class hyperlink extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(paragraph)
    }

    get html(){
        var text=this.text.trim().toLowerCase()
        if('buy'==text||'买'==text){
            return `<a class="buy" target="buy" href="${this.link}">${text}</a>`
        }else {
            return text
        }
    }

    get link(){
        return this.srcModel.getLink()
    }
}