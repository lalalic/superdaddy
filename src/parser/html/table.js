import Visitor from "./visitor"
import document from "./document"
import cell from "./td"

export default class table extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="table"
        this.container=this.findTypedParent(cell, document)
    }
}

