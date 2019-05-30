class OralCalculation{
    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }

    generate1(max=100,min=1){
        if(this.random(0,100)%2==1)
            return this.generateAdd(...arguments)
        else
            return this.generateMinus(...arguments)
    }

    generateAdd(max,min){
        var a=this.random(min,max)
        var b=this.random(min,max-a)
        return [a,'+',b]
    }

    generateMinus(max,min){
        var b=this.random(min,max)
        var a=this.random(b,max)
        return [a,'-',b]
    }

    generateMultiply(max, min){

    }

    generateDivide(max, min){
        
    }

    generatePage(max=100, min=1){
        var rows=new Array(25).fill(1).map(i=>{
            var cells=new Array(4)
                .fill(1)
                .map(j=>{
                    var data=this.generate1(...arguments)
                    var a=data[0]
                    var o=data[1]
                    var b=data[2]
                    return '<td>'+a+'</td><td>'+o+'</td><td>'+b+'</td><td>=</td><td>&nbsp;&nbsp;&nbsp;</td>'
                }).join("")
            return "<tr>"+cells+"</tr>"
        }).join("")
        
        var header='<tr><td colspan="20"><center>_______班&nbsp;_____________同学&nbsp;</center></td></tr>'
        
        var footer=
            '<tr>'+
                '<td colspan="3" style="text-align:right">日期:</td><td colspan="4">___年___月___日</td>'+
                '<td colspan="3" style="text-align:right">用时:</td><td colspan="4">___分___秒</td>'+
                '<td colspan="3" style="text-align:right">错误数:</td><td colspan="3">___/100</td>'+
            '</tr>'
        var uuid=`oc_${Date.now()}`
        var style=`
            #${uuid} td{
                font-size:12pt;
                padding: 2.5mm 1.4mm;
            }
            
            #${uuid} td:nth-child(5n+4){
                width: 4em;
            }
            
            #${uuid} tr:last-child td{
                padding-top:5mm;
                padding-bottom:0mm;
            }
        `
        return `
                <style>${style}</style>
                <table id="${uuid}">${header+rows+footer}</table>
            `
    }
}
module.exports={
    title:"oral calculation",
    summary:"oral calculation expression generator",
    content:"<div>hello, oral calculation!</div>",
    keywords:["classroom"],
    category:["自制力"], 
    hasHomework:true,
    homework(setting){
        return new OralCalculation(setting).generatePage(100,1)
    }
}