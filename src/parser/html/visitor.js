import Ignore from "./ignore"

export default class Visitor extends Ignore{
    constructor(){
        super(...arguments)
        this._children=[]
        this.container=null
    }

    findTypedParent(...Types){
        var p=this.parent
        while(p){
            if(Types.filter((Type)=>p instanceof Type).length)
                return p
            else
                p=p.parent
        }
        throw new Error("Wrong structure: can not find container for a "+this.srcModel.type)
    }

    visit(){
        super.visit()
        this.container._children.push(this)
    }

    get html(){
        if(!this.tag)
            return ''
        return `<${this.tag}>${this._children.map((a)=>a.html).join("\r\n")}</${this.tag}>`
    }

    get text(){
        return `${this._children.map((a)=>a.text).join('')}`
    }
	
	_shouldIgnore(){
        return false
    }
}