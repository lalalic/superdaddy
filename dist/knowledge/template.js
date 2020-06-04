/**
 * superdaddy javascript template to create knowledge
 * a classic nodejs module
 */
module.exports = {
    title: "我的课程",
    summary: "介绍解决的问题",
    content: `<div>详细内容</div>`,
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
    homework({kind,max,tuple}) {/**作业生成:生成的内容会包在<html><body>....</body></html>*/
        return `<h1><center>开始创建课程</center></h1>`
    },
    print(){/**出版功能，future*/
        
    },
    hasPrint:{/*为出版功能设置缺省参数*/

    },
}