/**
 * superdaddy javascript template to create knowledge
 * a classic nodejs module
 */
module.exports = {
    title: "小学单位换算",
    summary: "单位换算需要记住单位之间的关系，然后根据关系计算从小到大单位，大到小单位，和关于10，100，1000...的乘除法的理解运用，对于小学生是比较困难的。",
    content: `<div>详细内容</div>`,
    tags: ["四年级"],//任何标签
    category: ["观察能力","记忆力"],//解决的能力
    fields: [/**作业支持的参数，homework({...})可以根据参数调整作业*/
        { //example
            name: "kind", /**required */
            title: "单位类型", /**required */
            value: "Any", /**optional */
            options:[/**optional */
                {value:"Any",displayText:"任何"},
                {value:"Length",displayText:"长度"},
                {value:"Dimension",displayText:"面积"},
                {value:"Weight",displayText:"重量"},
                {value:"Money",displayText:"人民币"},
            ]
        },
        {
            name:"onlyUnit",
            title:"强化单位换算",
            value:0,
            options:[
                {value:1, displayText:"是"},
                {value:0, displayText:"不"}
            ]
        },
        {
            name:"max",
            title:"最大数",
            value:100,
        },
        {
            name:"min",
            title:"最小数",
            value:0.01,
        },
        {
            name:"n",
            title:"多少题",
            value:20
        }
    ],
    hasHomework: {/**家庭作业的缺省参数,key对应field的name*/
        kind: "Any",
        max:100,
        min:0.01,
        n:20,
        onlyUnit:0,
    },
    homework({kind,...args}) {/**作业生成:生成的内容会包在<html><body>....</body></html>*/
        const Type=Types[kind]
        return new Type().generatePage(args)
    },
    print(){/**出版功能，future*/
        
    },
    hasPrint:{/*为出版功能设置缺省参数*/

    },
}

class Unit{
    constructor(units){
        this.units=units
    }

    get Units(){
        return Array.from(new Set(this.units.map(([a,b])=>([a,b])).flat()))
    }

    random(max=100,min=0) {
        var p=1
        if(min<1 && min>0){
            const m=String(min)
            p=parseInt(`1${new Array(m.length-1-m.indexOf(".")).fill(0).join("")}`)
            max=max*p
            min=min*p
        }
        min = Math.ceil(min);
        max = Math.floor(max);
        const r=Math.floor(Math.random() * (max - min)) + min;
        if(p!=1){
            return r/p
        }
        return r
    }

    randomUnit(i){
        if(typeof(i)=="number"){
            const units=this.Units.slice(i)
            return units[this.random(units.length-1)]
        }
        const excludes=Array.from(arguments)
        const units=this.Units.filter(a=>excludes.indexOf(a)==-1)
        return units[this.random(units.length-1)]
    }

    generateAeB({min,max}){
        const A=this.randomUnit(),B=this.randomUnit(A)
        return [this.random(max,min),A,B]
    }

    generateABeC({min,max}){
        const units=this.Units
        const A=this.randomUnit(),i=units.indexOf(A)
        if(i==units.length-1){
            return this.generateABeC(...arguments)
        }
        const B=this.randomUnit(i+1)
        const C=this.randomUnit(i)
        return [this.random(parseInt(max),parseInt(min)),A,this.random(this.units[units.indexOf(B)-1][2],1),B,C]
    }

    generateApBeC({min,max}){
        const A=this.randomUnit()
        const B=this.randomUnit()
        const C=this.randomUnit()
        return [this.random(max,min),A,"+",this.random(max,min),B,C]
    }

    generateAmBeC({min,max}){
        const units=this.Units
        const A=this.randomUnit(),i=units.indexOf(A)
        const B=this.randomUnit(i),j=units.indexOf(B)
        const P=this.units.slice(i,j).reduce((o,[,,p])=>o*p,1)

        const C=this.randomUnit()
        const a=this.random(max,min)
        if(A==B)
            return [a,A,"-",this.random(a,min),B,C]
        return [a,A,"-",this.random(this.units[units.indexOf(B)-1][2],1),B,C]
    }

    generate({n,onlyUnit}){
        const data=[]
        if(onlyUnit){
            for(let i=0;i<n;i++){
                data.push(this.generateAeB({max:1,min:1}))
            }
            return data
        }

        const fs=["generateAeB","generateABeC","generateApBeC","generateAmBeC"]
        for(let i=0;i<n;i++){
            let x=fs[this.random(fs.length)]
            data.push(this[x](...arguments))
        }
        return data
    }

    generatePage({n}){
        const data=this.generate(...arguments)
        return `
        <style>
            #all{
                padding-left:30px;
                padding-top:30px;
            }
            .a{
                display:inline-block;
                width:45%;
                padding-bottom:${(20/n)*70}px;
                margin-top:10px;
                margin-right:20px;
                border-bottom:1px solid lightgray;
            }
            .e{
                padding-right:80px
            }
            span:last-child{
                float: right;
                width: 100px;
                text-align: right;
                padding-right: 25px;
            }
            span:nth-last-child(2):after{
                content:' =';
                font-weight:700;
            }
            span{
                padding:0px 5px
            }
        </style>
        <div id="all">
            ${data.map(a=>`<div class="a"><span>${a.join("</span><span>")}</span></div>`).join("")}
        </div>
        `
    }
}

class Length extends Unit{
    constructor(){
        super([["km","m",1000],["m","dm",10],["dm","cm",10],["cm","mm",10]])
    }
}

class Dimension extends Length{
    constructor(){
        super()
        this.units=this.units.map(([a,b,n])=>([`${a}2`,`${b}2`,n*n]))
        this.units.splice(1,0,["公顷","m2",100*100])
    }
}

class Money extends Unit{
    constructor(){
        super([["元","角",10],["角","分",10]])
    }

    random(max=100,min=0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min
    }
}

class Weight extends Unit{
    constructor(){
        super([["t","kg",1000],["kg","g",1000]])
    }
}

class Time extends Unit{
    constructor(){
        super([["day","h",24],["h","m",60],["m","s",60]])
    }
}

class Any extends Unit{
    generate({n,...props}){
        const Types=[Length, Dimension,Money,Weight]
        const data=[]
        props.n=1
        for(let i=0,l=Types.length;i<n;i++){
            let Type=Types[this.random(l)]
            data.push(new Type().generate(props)[0])
        }
        return data
    }
}

const Types={Length, Dimension,Money,Weight, Any}