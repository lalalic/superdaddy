import Visitor from "./visitor"
import document from "./document"
import cell from "./td"

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
        if(len>1 && text[0]=='[' && text[len-1]==']'){//editable region
            var sep=text.indexOf(':'), key, alt;
            if(sep>1){
                key=text.substring(1,sep)
                alt=text.substring(sep+1,len-1)
            }else {
                alt=key=(text.substring(1,len-1)||"__")
            }
            return Template.placeholder(key, alt)
        }else {
            return `<${this.tag}>${text}</${this.tag}>`
        }
    }
}

