import DOCX , {Visitor as Any}from "docx4js"

class document extends Any{
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

    get text(){
        return `${this._children.map((a)=>a.text).join('')}`
    }
}



class paragraph extends Visitor{
    constructor(){
        super(...arguments)
        this.tag="p"
        this.container=this.findTypedParent(document, cell)
    }

    get html(){
        var text=this._children.map((a)=>a.html).join(""),len=text.length
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
        return this.text
    }

    get text(){
        return this.srcModel.getText()
    }
}

class image extends Visitor{
    constructor(){
        super(...arguments)
        this.container=this.findTypedParent(paragraph)
        this.data=this.srcModel.getImage()
        if(typeof(this.data)!='string'){
            this.findTypedParent(document).images.push(this)
        }
    }

    get html(){
        switch(typeof(this.data)){
        case 'string':
            return `<img src="${this.data}" alt="${this.alt}">`
        default:
            return `<img class="__revoking" alt="${this.alt}" src="${URL.createObjectURL(new Blob([this.data],{type:"image/*"}))}">`
        }
    }

    get alt(){
        return this.container.text
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
                Array.prototype.forEach.call(nodes, (a)=>URL.revokeObjectURL(a.src))
            },
            upload(entity){
                var {File}=require('dashboard'),
                    kind=require('./db/Knowledge')._name,
                    more={entity:{kind,_id:entity._id}}
                return new Promise((resolve, reject)=>File.find({params:more,fields:"crc32"}).fetch((files)=>{
                    var pImages=images.map((image)=>{
                        var data=image.data,
                            crc32=data.crc32;
                        if(files.find((a)=>a.crc32==crc32))
                            return undefined;
                        return File.upload(data, "image", Object.assign({crc32,key:"a.jpg"},more))
                            .then((url)=>image.data=url)
                    }).filter((a)=>a)

                    var pRawDocx=File.upload(file,"docx", Object.assign({key:"a.docx"},more))

                    Promise.all([pRawDocx, ...pImages])
                        .then(()=>{
                                resolve(this.knowledge.content=doc.html)
                            }, reject)
                }))
            }
        }
    })
}

class Template{
    constructor(html){
        this.contents=[]
        var matcher, lastIndex=0, reg=Template.reg, len=html.length
        var staticContent,key, alt
        while((matcher=reg.exec(html))!=null){
            staticContent=html.substring(lastIndex,matcher.index)
            key=matcher[1]
            alt=matcher[2]
            lastIndex=reg.lastIndex
            if(staticContent)
                this.contents.push(staticContent)
            if(key || alt)
                this.contents.push({key,alt})
        }

        if(lastIndex!=len-1)
            this.contents.push(html.substring(lastIndex,len))
    }

    static placeholder(key,alt){
        return `<editable key="${key}">${alt}</editable>`
    }
}
Template.reg=/<editable\s+key="(.*?)">(.*?)<\/editable>/gm

extract.Template=Template
