import React,{Component} from "react"
import {Scheme} from "./classic"
import {print} from "../print-trigger"

export default class MindMap extends Component{
    constructor(){
        super(...arguments)
        this.svg=React.createRef()
        this.measure=React.createRef()
        this.state={}
    }
    render(){
        const {data=TEST, ...props}=this.props
        const {width,height}=this.state
        return (
            <svg ref={this.svg} fontFamily="" fontSize="11" {...props} onClick={this.print}>
                <text ref={this.measure} x={-10000} y={-10000}>Ä</text>
                {width&&height &&<Scheme {...(data)} measure={this.makeMeasure()} strokeLinecap="round" x={width/2} y={height/2}/>}
            </svg>
        )
    }

    print(e){
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
    }

    makeMeasure(){
        const r=this.measure
        return {
            lineHeight(){
                return r.current.getBBox().height
            },

            stringWidth(word){
                r.current.firstChild.data=word
                return r.current.getBBox().width
            }
        }
    }

    componentDidMount(){
        const {width,height}=this.svg.current.viewBox.baseVal
        this.setState({width,height})
    }

    static get parse(){
        return parse
    }
}

const TEST={
    name:"composition",
    title:"如何写好一篇作文",
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
