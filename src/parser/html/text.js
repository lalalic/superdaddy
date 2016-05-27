import Visitor from "./visitor"
import paragraph from "./p"
import hyperlink from "./hyperlink"

export default class text extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(hyperlink, paragraph)
    }

    get html(){
        return this.text
    }

    get text(){
        return this.srcModel.getText()
    }
}
