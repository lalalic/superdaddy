import React,{Component} from "react"
import {Scheme} from "./classic"
import {print} from "../print-trigger"
import withWidth from "material-ui/utils/withWidth";

export default class MindMap extends Component{
    constructor(){
        super(...arguments)
        this.svg=React.createRef()
        this.state={}
    }
    render(){
        const {data=TEST, ...props}=this.props
        const {width,height}=this.state
        return (
            <svg ref={this.svg} xmlns="http://www.w3.org/2000/svg"{...props} onClick={e=>{
                    const svg=(e.target.ownerSVGElement||e.target)
                    print({
                        html:`<html>
                            <body>
                                <center>
                                    <svg width="100%" height="100%">
                                        ${svg.innerHTML}
                                    </svg>
                                </center>
                            </body>
                        </html>`,
                        style:`
                        @page { 
                            size: A4; 
                        } 
                        `
                    })
                }}    
                >
                {width&&height &&<Scheme {...(data)} fontSize="12" strokeLinecap="round" x={width/2} y={height/2}/>}
            </svg>
        )
    }

    componentDidMount(){
        const {width,height}=this.svg.current.viewBox.baseVal
        this.setState({width,height})
    }
}

const TEST={
    name:"composition",
    title:"作文",
    children:[
        {
            name:"目标",
            children:[
                {
                    name:"事实",
                    children:[
                        {
                            name:"正叙"
                        },
                        {
                            name:"倒叙"
                        },
                        {
                            name:"虚构"
                        }
                    ]
                },
                {
                    name:"情感"
                },
                {
                    name:"虚构"
                }
            ]
        },
        {
            name:"结构",
            children:[
                {
                    name:"正叙"
                },
                {
                    name:"倒叙"
                },
                {
                    name:"虚构"
                }
            ]
        },
        {
            name:"论点"
        }
    ]
}

