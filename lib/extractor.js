import DOCX , {Visitor as Any}from "docx4js"

class document extends Any{
    constructor(){
        super(...arguments)
        this._children=[]
    }

    get html(){
        return this._children.map((a)=>a.html).join("\r\n")
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
        this.imageBuffer=this.srcModel.getImage()
    }

    get html(){
        return `<img class="__revoking" src="${URL.createObjectURL(new Blob([this.imageBuffer],{type:"image/*"}))}">`
    }
}

var factory=DOCX.createVisitorFactory({document,paragraph, table, row, cell, text,image,
        heading:paragraph, header:Ignore, footer:Ignore, documentStyles: Ignore})

export default function extract(file){
    return DOCX.load(file).then((docx)=>({content:docx.parse(factory).html}))
}

extract.invokeImageUrls=function(container){
    window.document.querySelectorAll(`${container} img.__revoking`)
        .forEach((a)=>URL.revokeObjectURL(a.src))
}
