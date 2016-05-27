import Visitor from "./visitor"
import table from "./table"

export default class row extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="tr"
        this.container=this.findTypedParent(table)
    }
}

