const a="a".charCodeAt(0)
const OP=['+','-',String.fromCharCode(0xF7),String.fromCharCode(0xD7)]
class Formula{
    constructor({i,bracket}){
        this.i=i
        this.bracket=bracket
    }

    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min+1)) + min;
    }

    generate1(){
        const i=this.i
        const data=new Array(i).fill(0)
        const chars=new Array(i-1).fill(0).map((v,i)=>String.fromCharCode(a+i))
        const randomChar=()=>{
            const i=this.random(0,chars.length-1)
            const char=chars[i]
            chars.splice(i,1)
            return char
        }

        data[this.random(0,data.length-1)]='<b>x</b>'
        data.forEach((v,i)=>{
            if(!data[i]){
                data[i]=randomChar()
            }
        })

        const k=this.random(0,data.length-1-1)
        if(i>2 && this.bracket && this.random(0,1)%2==1){
            data[k]="("+data[k]
            data[k+1]=data[k+1]+")"
        }
        const _="&nbsp;"
        const dataWithOp=data.reduce((d,k,i)=>{
            d.push(k)
            d.push(_.repeat(k.startsWith("(") ? 1 : 2)+OP[this.random(0,OP.length-1)]+_.repeat(k.startsWith("(") ? 1 : 2))
            return d
        },[])
        dataWithOp.pop()
        dataWithOp.push("="+String.fromCharCode(a+this.random(i,20)))
        return dataWithOp
    }

    generatePage(n){
        return `
            <div style="position:relative;height:90%;width:100%;padding:40px;font-size:14px;font-family:'Courier New'">
                <div style="display:flex;flex-direction:column;height:100%;width:100%; ">
                    ${new Array(n).fill(0).map(a=>`
                        <div style="display:flex;flex-direction:row;flex:1;border-bottom:1px dotted lightgray;padding-bottom:4px">
                            <div style="flex:1;align-self:flex-end">
                                ${this.generate1().join("")}
                            </div>
                            <div style="flex:1;align-self:flex-end">
                                <b>x</b>&nbsp;=
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `
    }
}

module.exports = {
    title: "解方程",
    summary: "五年级方程",
    content: "<div>五年级方程,简单,复杂,!</div>",
    tags: ["数学", "五年级"],
    category: ["学习能力"],
    fields: [
        { name: "i", title: "最大数", value: 3, type:"number", min:2, max:5 },
        { name: "bracket", title: "括号", value: 1, options:[
            {value:1,displayText:"带"},
            {value:0,displayText:"不带"},
        ]},
    ],
    hasHomework: {
        i: 3,
        bracket:1,
    },
    hasPrint: null,
    homework({i,bracket}) {
        return new Formula({i:parseInt(i),bracket}).generatePage(20)
    }
}