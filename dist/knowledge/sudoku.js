function generate(level="easy",num=9){
    const diffs={easy:0.4, middle:0.3, hard:0.25, hard1:0.2}
    const emptyFlag=level=>Math.random()>diffs[level]

    function generateAll() {
        const temp = [1,2,3,4,5,6,7,8,9]
        var res = [[], [], [], [], [], [], [], [], []]
    
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                let originR = r;
    
                if (r == 1) {
                    r = 3
                } else if (r == 2) {
                    r = 6
                } else if (r == 3) {
                    r = 1
                } else if (r == 5) {
                    r = 7
                } else if (r == 6) {
                    r = 2
                } else if (r == 7) {
                    r = 5
                }
    
                let i = r + c;
                while (i > temp.length - 1) {
                    i = i - 9
                }
    
                res[originR][c] = temp[i]
                r = originR
            }
        }
        return res;
    }
    
    function disorder() {
        let res
        let r1 = [0, 1, 2]
        r1.sort(() => {
            return Math.random() - 0.5
        })
        let r2 = [3, 4, 5]
        r2.sort(() => {
            return Math.random() - 0.5
        })
        let r3 = [6, 7, 8]
        r3.sort(() => {
            return Math.random() - 0.5
        })
        let all = [r1, r2, r3]
        all.sort(() => {
            return Math.random() - 0.5
        })
        res = [...all[0], ...all[1], ...all[2]]
        return res;
    }
    
    function board_string_to_grid(board_string){
        /* Convert a board string to a two-dimensional array
        */
        var rows = [];
        var cur_row = [];
        for(var i in board_string){
            cur_row.push(board_string[i]);
            if(i % 9 == 8){
                rows.push(cur_row);
                cur_row = [];
            }
        }
        return rows;
    }

    const data=[]
    let arr = generateAll();

    let order1 = disorder(); // 横向
    let order2 = disorder(); // 纵向

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let v = arr[order2[r]][order1[c]]

            if(emptyFlag(level)){
                data.push(".")    
            }else{
                data.push(v)
            }

        }
    }

    const rows=board_string_to_grid(data.join(""))
    const dark='#eee'
    return `
        <style>
            table{
                table-layout:fixed;
                border-collapse: collapse;
                border-spacing: 0;
                margin:20px auto;
                font-size:20pt;
                font-weight:700;
            }
            td{
                border: 1px solid #ddd;
                text-align:center;
                vertical-align:middle;
                width:75px;
                height:75px;
            }
            .tr0 td,.tr1 td,.tr2 td{background:transparent}
            .tr0 .td3,.tr0 .td4,.tr0 .td5, 
            .tr1 .td3,.tr1 .td4,.tr1 .td5, 
            .tr2 .td3,.tr2 .td4,.tr2 .td5{background:${dark}}

            .tr3 td,.tr4 td,.tr5 td{background:${dark}}
            .tr3 .td3,.tr3 .td4,.tr3 .td5,
            .tr4 .td3,.tr4 .td4,.tr4 .td5,
            .tr5 .td3,.tr5 .td4,.tr5 .td5{background:transparent}

            .tr6 td,.tr7 td,.tr8 td{background:transparent}
            .tr6 .td3,.tr6 .td4,.tr6 .td5,
            .tr7 .td3,.tr7 .td4,.tr7 .td5,
            .tr8 .td3,.tr8 .td4,.tr8 .td5{background:${dark}}

        </style>
        <table>
            <tbody>
                ${rows.map((cols,r)=>`
                    <tr class="tr${r}">${cols.map((a,c)=>`
                        <td class="td${c}">${a=="." ? "&nbsp;" : a}</td>
                    `).join("")}</tr>
                `).join("")}
            </tbody>
        </table>
    `
}

module.exports={
    title: "数独游戏",
    summary: "",
    content: "<div>数独游戏，培养逻辑思维能力，挑战自己</div>",
    tags: ["数独", "数学", "逻辑"],
    category: ["学习能力","观察能力"],
    fields: [
        { name: "num", title: "宫格数", value: 4,options:[
            {value:4},
            {value:6},
            {value:9},
        ] },
        { name: "kind", title: "难度", value: "easy", options:[
            {value:"easy",displayText:"易"},
            {value:"middle",displayText:"中"},
            {value:"hard",displayText:"难"},
            {value:"hard1",displayText:"难+"}
        ]},
    ],
    hasHomework: {
        kind:32,
    },
    hasPrint: null,
    homework({kind,num}) {
        return generate(kind,num)
    }
}