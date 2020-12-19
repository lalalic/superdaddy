/**
 * superdaddy javascript template to create knowledge
 * a classic nodejs module
 */
module.exports = {
    title: "作文",
    summary: "作文的基本问题",
    content: `<div>作文</div>`,
    tags: ["二年级","一年级"],//任何标签
    category: ["观察能力","自制力","专注力","记忆力"],//解决的能力
    fields: [/**作业支持的参数，homework({...})可以根据参数调整作业*/
        { //example
            name: "kind", /**required */
            title: "难度", /**required */
            value: 10, /**optional */
            options:[/**optional */
                {value:10,displayText:"10"},
                {value:20,displayText:"20"},
                {value:100,displayText:"100"}
            ]
        },
    ],
    hasHomework: {/**家庭作业的缺省参数,key对应field的name*/
        max: 100,
        tuple: 2,
        kind:10,
    },
    homework({kind,max,tuple,crawl}) {/**作业生成:生成的内容会包在<html><body>....</body></html>*/
        const url="http://www.eduxiao.com/"
        crawl(url,$=>{
            const extract=(i,a)=>{
                const $a=$(a)
                return {href:$a.attr("href").replace(/http\:\/\/www\.eduxiao\.com/gi,""), name:$a.text()}
            }
        
            const grades=$('.navmet').find("a").map(extract).get()
                        
            const tags=$('.search .tags').find("a").map(extract).get()
        
            const cates=$('.zhuanti .zt_r').find("a").map(extract).get()
        
            const commends=$('.pright .commend .c1').find('a').map(extract).get()
        
            const hots=$('.pright .hot .c1').find('a').map(extract).get()
            return {grades, tags,cates,commends,hots}
        }).then(data=>{
            console.log(data)
        })
        return 
    },
    print(){/**出版功能，future*/
        
    },
    hasPrint:{/*为出版功能设置缺省参数*/

    },
}

function random(min=0, max=100) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}