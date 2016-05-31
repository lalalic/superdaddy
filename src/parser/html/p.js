import Visitor from "./visitor"
import document from "./document"
import cell from "./td"
import Template from "../extractor"

/**
* [key:alt] is an editable region
*/
export default class paragraph extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="p"
        this.container=this.findTypedParent(cell, document)
    }

    get html(){
        var text=this._children.map((a)=>a.html).join("").trim(),len=text.length
        if(this.isRegion(text)){//editable region
            let [key,alt]=this.parse(text)
            return Template.placeholder(key, alt)
        }else {
            return `<${this.tag}>${text}</${this.tag}>`
        }
    }

    isRegion(text){
        return text.length>1 && text[0]=='[' && text[len-1]==']'
    }

    parse(text){
        let [key="__",alt]=text.split(":")
        !alt && (alt=key);
        return [key,alt]
    }
}
