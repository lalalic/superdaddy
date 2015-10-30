import DOCX , {Visitor as Any}from "docx4js"

class document extends Any{
    constructor(){
        super(...arguments)
        this._children=[]
        this.images=[]
        this._id=`docx_${Date.now()}`
    }

    get html(){
        return `<div id="${this._id}">${this._children.map((a)=>a.html).join("\r\n")}</div>`
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
        this.data=this.srcModel.getImage()
        if(typeof(this.data)!='string')
            this.doc.images.push(this)
    }

    get html(){
        switch(typeof(this.data)){
        case 'string':
            return `<img src="${this.data}">`
        default:
            return `<img class="__revoking" src="${URL.createObjectURL(new Blob([this.data],{type:"image/*"}))}">`
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
        var doc=docx.parse(factory),
            {html:content, properties, id:elId, images}=doc,
            {name,title, keywords, category, subject, abstract,description, ...others}=properties

        return {
            knowledge: {content,title:title||name,summary:abstract||description||subject,keywords,category,props:others},
            invoke(){
                var nodes=window.document.querySelectorAll(`#${elId} img.__revoking`)
                Array.proptotyp.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            upload(entity){
                var {File}=require('dashboard'),
                    kind=require('./db/Knowledge')._name,
                    more={entity:{kind,_id:entity._id}}
                return File.find({params:more,fields:"crc32"}).then((files)=>{
                    var pImages=new Promise((resolve, reject)=>{
                        return images.map((image)=>{
                            var data=image.data,
                                crc32=data.crc32;
                            if(files.find((a)=>a.crc32==crc32))
                                return null;
                            return File.upload(data, "image", Object.assign({crc32,key:"a.jpg"},more))
                                .then((url)=>image.data=url)
                                .then(resolve,reject)
                        }).filter((a)=>a)
                    })
                    var pRawDocx=new Promise((resolve, reject)=>{
                        return File.upload(file,"docx", Object.assign({key:"a.docx"},more)).then(resolve, reject)
                    })
                    return Promise.all(pRawDocx, ...pImages)
                        .then(()=>this.knowledge.content=doc.html)
                })
            }
        }
    })
}
