import React,{Component} from "react"
import {Scheme,Level1, Level2, Level3} from "./classic"
const TEST={
    name:"composition",
    title:"作文",
    children:[
        {
            name:"目标"
        },
        {
            name:"结构"
        },
        {
            name:"论点"
        }
    ]
}
export default ({data=TEST})=>(
    <svg viewBox="0 0 400 500" width={400} height={500} x={100} y={100} style={{border:"1px solid red",margin:"5px auto"}}>
        <Scheme {...data}/>
    </svg>
)

