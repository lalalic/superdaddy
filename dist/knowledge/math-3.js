class Calculation {
    constructor(kind,rows,cols){
        this.kind=kind
        this.rowCount=rows
        this.colCount=cols
    }
    
    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    generateAdd(max, min) {
        var a = this.random(min, max)
        var b = this.random(min, max - a)
        return [a, '+', b]
    }

    generateMinus(max, min) {
        var b = this.random(min, max)
        var a = this.random(b, max)
        return [a, '-', b]
    }

    generateMutiply(max,min){
        max=Math.floor(Math.sqrt(max))
        var b = this.random(min, max)
        var a = this.random(b, max)
        return [a, '*', b]
    }

    generateDivide(max,min){
        var [a,,b]=this.generateMutiply(...arguments)
        a=a*b
        if(this.remainder){
            if (this.random(0, 100) % 2 == 1){
                a=a+this.random(Math.min(max-a, b, c),0)
            }
        }
        return [a,"/",b]
    }

    generatePageData(){
        return new Array(this.rowCount).fill(1)
            .map(i=>new Array(this.colCount).fill(1).map(()=>this.generate1(...arguments)))
    }

}

class Tuple2 extends Calculation{
    constructor(kind, rows,cols){
        super(kind, rows||25,cols||4)
    }

    generate1() {
        switch(this.kind||'+-*/'[this.random(3,0)]){
        case "*":
            return this.generateMutiply(...arguments)
        case "/":
            return this.generateDivide(...arguments)
        case "+":
            return this.generateAdd(...arguments)
        case '-':    
            return this.generateMinus(...arguments)
        }
    }

    generatePage(){
        const rows=this.generatePageData(...arguments)
            .map(cols=>
                "<tr>"+cols.map(([a,o,b])=>
                        `<td>${a}</td><td>${o}</td><td>${b}</td><td>=</td>`//4td
                    ).join("")+
                "</tr>"
            ).join("")
        const header = '<tr><td colspan="20"><center>_______班&nbsp;_____________同学&nbsp;</center></td></tr>'

        const footer =
            '<tr>' +
            '<td colspan="6">日期:___年___月___日</td>' +
            '<td colspan="5">用时:___分___秒</td>' +
            '<td colspan="5">错误数:___/100</td>' +
            '</tr>'
        const uuid = `oc_${Date.now()}`
        const style = `
                #${uuid} td{
                    font-size:12pt;
                    padding: 2.5mm 1.4mm;
                    text-align:center;
                }
                
                #${uuid} td:nth-child(4n+1),#${uuid} td:nth-child(4n+3){
                    width: 3mm;
                }
                
                #${uuid} td:nth-child(4n+2){
                    width:1mm;
                }
                

                #${uuid} td:nth-child(4n){
                    width: 28mm;
                    text-align:left;
                }
                
                
                #${uuid} tr:last-child td{
                    padding-top:5mm;
                    padding-bottom:0mm;
                    text-align:left;
                }

                #${uuid}{
                    margin-left:10mm
                }
        `
        return `
                <style>@media print{${style}}</style>
                <table id="${uuid}" class="print-page">${header + rows + footer}</table>
            `
    }

}

class Tuple3 extends Tuple2{
    constructor(kind, rows,cols){
        super(kind, rows||25,cols||3)
    }

    generate1(max,min){
        const remainder=this.remainder
        delete this.remainder
        const kind=this.kind
        delete this.kind

        this.kind=kind[this.random(kind.length-1,0)]
        const [a,o,b]=super.generate1(...arguments)
        const r=eval(`${a}${o}${b}`)
        this.kind=kind[this.random(kind.length-1,0)]
        
        switch(this.kind){
        case "+":
            c=this.random(max-r,max-r>0 ? 1 : 0)
            break
        case "-":
            c=this.random(r,r>0 ? 1 : 0)
            break
        case "*":
            c=Math.floor(max/r)||1
            break
        case "/":
            c=this.random(r,1)
            break
        }

        return [a,o,b,o1,c]
    }

    generatePage(){
        const rows=this.generatePageData(...arguments)
            .map(cols=>
                "<tr>"+cols.map(([a,o,b,o1,c])=>
                        `<td>${a}</td><td>${o}</td><td>${b}</td><td>${o1}</td><td>${c}</td><td>=</td>`//6td
                    ).join("")+
                "</tr>"
            ).join("")
            const header = '<tr><td colspan="18"><center>_______班&nbsp;_____________同学&nbsp;</center></td></tr>'

            const footer =
                '<tr>' +
                '<td colspan="7">日期:___年___月___日</td>' +
                '<td colspan="6">用时:___分___秒</td>' +
                '<td colspan="5">错误数:___/100</td>' +
                '</tr>'
            const uuid = `oc_${Date.now()}`
            const style = `
                    #${uuid} td{
                        font-size:12pt;
                        padding: 2.5mm 1.4mm;
                        text-align:center;
                    }
                    
                    #${uuid} td:nth-child(6n+1),#${uuid} td:nth-child(6n+3),#${uuid} td:nth-child(6n+5){
                        width: 3mm;
                    }
                    
                    #${uuid} td:nth-child(6n+2),#${uuid} td:nth-child(6n+4){
                        width:1mm;
                    }
                    
                    #${uuid} td:nth-child(6n){
                        width: 25mm;
                        text-align:left;
                    }
                    
                    #${uuid} tr:last-child td{
                        padding-top:5mm;
                        padding-bottom:0mm;
                        text-align:left;
                    }

                    #${uuid}{
                        margin-left:10mm
                    }
                
            `
            return `
                    <style>@media print{${style}}</style>
                    <table id="${uuid}" class="print-page">${header + rows + footer}</table>
                `
    }
} 

class Priorized extends Tuple3{
    constructor(kind,...args){
        super("+-*/",...args)
    }

    generate1(max,min){
        debugger
        var [a,o,b,o1,c]=super.generate1(...arguments)
        if(this.random(10,1)%2==1){
            if(eval(`${b}${o1}${c}`)>=0){
                b=`(${b}`
                c=`${c})`
            }else if(eval(`${a}${o}${b}`)>=0){
                a=`(${a}`
                b=`${b})`
            }
        }
        return [a,o,b,o1,c]
    }
}

const Types={Tuple2, Tuple3}

module.exports = {
    title: "加减乘除法口算题",
    summary: "三年级加减乘除法口算题",
    content: "<div>三年级加减乘除法口算题，支持自定义最大数,因子个数(2或3),运算类别(混合运算，加法，减法)!</div>",
    tags: ["口算", "数学", "三年级"],
    category: ["学习能力"],
    fields: [
        { name: "max", title: "最大数", value: 100 },
        { name: "tuple", title: "因子个数", value: 2, options:[{value:2},{value:3}]},
        { name: "kind", title: "运算类别", value: ".", options:[
            {value:"+-*/",displayText:"四则运算"},
            {value:"()",displayText:"带括号的四则运算"},
            {value:"*",displayText:"乘法"},
            {value:"/",displayText:"除法"},
        ]},
        { name: "remainder", title: "带余数", value: false,options:[
            {value:true,displayText:"可以"},
            {value:false,displayText:"不可以"},
        ] },
    ],
    hasHomework: {
        max: 100,
        tuple: 2,
        kind:"*",
        remainder:false,
    },
    hasPrint: null,
    homework({max,tuple,kind,remainder}) {
        const Type=kind=="()" ? Priorized : Types[`Tuple${tuple||2}`]
        const creator=new Type(kind)
        creator.remainder=remainder
        return creator.generatePage(parseInt(max), 1)
    }
}