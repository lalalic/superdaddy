import Visitor from "./visitor"
import document from "./document"
import cell from "./td"

export default class paragraph extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="p"
        this.container=this.findTypedParent(cell, document)
    }
}
