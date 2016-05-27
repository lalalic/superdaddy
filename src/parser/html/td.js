import Visitor from "./visitor"
import row from "./tr"

export default class cell extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="td"
        this.container=this.findTypedParent(row)
    }
}