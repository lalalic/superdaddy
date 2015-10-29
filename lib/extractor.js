import DOCX , {Visitor as Any}from "docx4js"

class document extends Any{
    constructor(){
        super(...arguments)
        this._children=[]
    }

    get html(){
        return this._children.map((a)=>a.html).join("\r\n")
    }

    get properties(){
        return this.srcModel.wDoc.props
    }
}

class Ignore extends Any{
    _shouldIgnore(){
        return true
    }
}

class Visitor extends Any{
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
}



class paragraph extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="p"
        this.container=this.findTypedParent(document, cell)
    }
}

class table extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="table"
        this.container=this.findTypedParent(document,cell)
    }
}

class row extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="tr"
        this.container=this.findTypedParent(table)
    }
}

class cell extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="td"
        this.container=this.findTypedParent(row)
    }
}

class text extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(paragraph)
    }

    get html(){
        return this.srcModel.getText()
    }
}

class image extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(paragraph)
        this.image=this.srcModel.getImage()
    }

    get html(){
        switch(typeof(this.image)){
        case 'string':
            return `<img src="${this.image}">`
        default:
            return `<img class="__revoking" src="${URL.createObjectURL(new Blob([this.image],{type:"image/*"}))}">`
        }
    }
}

var Non_Content_Properties="title,keywords,category,abstract,subject".split(',')
class documentProperty extends Visitor{
    visit(){

    }
    _shouldIgnore(){
        return Non_Content_Properties.indexOf(this.srcModel.key)!=-1
    }
}

var factory=DOCX.createVisitorFactory({document,documentProperty,paragraph, table, row, cell, text,image,
        heading:paragraph, header:Ignore, footer:Ignore, documentStyles: Ignore})

export default function extract(file){
    return DOCX.load(file).then((docx)=>{
        var doc=docx.parse(factory)
        return $.extend({content:doc.html}, doc.properties)
    })
}

extract.invokeImageUrls=function(container){
    window.document.querySelectorAll(`${container} img.__revoking`)
        .forEach((a)=>URL.revokeObjectURL(a.src))
}
