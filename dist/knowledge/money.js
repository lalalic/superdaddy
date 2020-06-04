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

    generatePageData(){
        return new Array(this.rowCount).fill(1)
            .map(i=>new Array(this.colCount).fill(1).map(()=>this.generate1(...arguments)))
    }

}

class Money extends Calculation{
    constructor(kind, rows,cols){
        super(kind, rows||25,cols||2)
    }

    generate1() {
        if(this.kind=="+"){
            return this.generateAdd(...arguments)
        }else if(this.kind=="-"){
            return this.generateMinus(...arguments)
        }else if (this.random(0, 100) % 2 == 1){
            return this.generateAdd(...arguments)
        } else {
            return this.generateMinus(...arguments)
        }
    }
    toAB(a){
        a=a+''
        const d=(()=>{
            switch(a.length){
            case 3:
                return [a.substring(0,2),'元',a.substring(2),'角']
            case 2:
                return [a.substring(0,1),'元',a.substring(1),'角']
            case 1:
                return ['','',a,'角']
            }
        })();
        if(d[2]=='0')
            d.splice(2,2,'','')
        return d
    }
    generatePage(){
        const rows=this.generatePageData(...arguments)
            .map(cols=>
                "<tr>"+cols.map(([a,o,b])=>
                        `${this.toAB(a).map(k=>`<td>${k}</td>`).join("")}<td style="font-weight:700">${o}</td>${this.toAB(b).map(k=>`<td>${k}</td>`).join("")}<td>=</td>
                            <td style="width:70px;text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;角&nbsp;=</td>
                            <td style="width:110px;text-align:center;"></td>`//4td
                    ).join("")+
                "</tr>"
            ).join("")
        const header = ''

        const footer =''
        const uuid = `oc_${Date.now()}`
        const style = `
                #${uuid} td{
                    font-size:12pt;
                    width:10px;
                    text-align:center;
                }
                #${uuid} tr{
                    height:40px;
                }
        `
        return `
                <style>@media print{${style}}</style>
                <style>${style}</style>
                <table id="${uuid}" class="print-page" style="table-layout:fixed;width:auto!important;margin:30px 30px">${header + rows + footer}</table>
            `
    }

}

module.exports = {
    title: "人民币的认识",
    summary: "人民币的认识",
    content: "<div>人民币的计算</div>",
    tags: ["口算", "数学", "二年级","一年级","人民币"],
    category: ["学习能力"],
    fields: [
        { name: "kind", title: "难度", value: 10, options:[
            {value:10,displayText:"10元以内"},
            {value:20,displayText:"20元以内"},
            {value:100,displayText:"100元以内"}
        ]},
    ],
    hasHomework: {
        max: 100,
        tuple: 2,
        kind:".",
    },
    hasPrint: null,
    homework({kind}) {
        return new Money(kind).generatePage(kind*10,1)
    }
}