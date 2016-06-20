import {Visitor as Any} from "docx4js"
import document from './document'
import P from "./p"

/**
 *
 * [key:alt:reward]
 */
export default class Step extends P{
    constructor(wordModel){
        super(...arguments)
        wordModel.textContent.trim()
            .replace(/^\[(.*)\]$/g, (a, content)=>{
                const [key,alt,reward="1"]=content.split(":")
                this._info={key, alt, reward:parseInt(reward)}
                this.findTypedParent(document).addStep(this._info)
            })
    }

    get html(){
        const {key,alt}=this._info
        return `<${this.tag} className="step">${alt||key}</${this.tag}>`
    }

    visit(){
        super.visit(...arguments)
        return false//not visit children
    }


    static is(wordModel){
        if(wordModel.type!=='paragraph')
            return false

        return wordModel.textContent.trim().test(/^\[.*\]$/g)
    }

    static Model=class extends Any{
        static get type(){return "step"}
    }
}
