import Ignore from "./ignore"

export default class document extends Ignore{
    constructor(){
        super(...arguments)
        this._children=[]
        this.images=[]
        this._id=`docx_${Date.now()}`
    }

    get html(){
        return `<div id="${this._id}">${this._children.map((a)=>a.html).join("")}</div>`
    }

    get properties(){
        return this.srcModel.wDoc.props
    }
	
	_shouldIgnore(){
        return false
    }
}