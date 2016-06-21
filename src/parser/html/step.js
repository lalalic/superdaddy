import Base from "docx4js/lib/openxml/docx/model"
import document from './document'
import P from "./p"

const IS=/^\[.*\]$/g
/**
 *
 * [key:alt:reward]
 */
export default class Step extends P{
    constructor(wordModel){
        super(...arguments)
        wordModel.wXml.textContent.trim()
            .replace(/^\[(.*)\]$/g, (a, content)=>{
                const [key,alt,reward="1"]=content.split(":")
                this._info={key, alt, reward:parseInt(reward)}
                this.findTypedParent(document).addStep(this._info)
            })
    }

    get html(){
        const {key,alt}=this._info
        return `<${this.tag} class="step">${alt||key}</${this.tag}>`
    }

    visit(){
        super.visit(...arguments)
        return false//not visit children
    }


    static is(model){
        if(model.type!=='paragraph')
            return false
		
        return IS.test(model.wXml.textContent.trim())
    }

    static Model=class extends Base{
        static get type(){return "step"}
    }
}
