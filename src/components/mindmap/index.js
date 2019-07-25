import React,{Component} from "react"
import {Scheme} from "./classic"
import {print} from "../print-trigger"
import {define} from "remount"
import parse from "./parse"


export default class MindMap extends Component{
    constructor(){
        super(...arguments)
        this.svg=React.createRef()
        this.measure=React.createRef()
        this.state={}
    }

    render(){
        const {src, data=parse(src), ...props}=this.props
        const {measure}=this.state
        return (
            <svg ref={this.svg} fontSize="12"  strokeLinecap="round" {...props} onClick={this.print}>
                <text ref={this.measure} x={-10000} y={-10000}>Ä</text>
                <g  transform={`translate(-10000 -10000)`}>
                    {measure && <Scheme {...(data)} measure={measure}/>}
                </g>
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

    componentDidMount(){
        const r=this.measure.current
        this.setState({measure:{
            lineHeight(){
                return r.getBBox().height
            },

            stringWidth(word){
                r.firstChild.data=word
                return r.getBBox().width
            }
        }}, this.adjustSize.bind(this))
    }


    adjustSize(){
        setTimeout(()=>{
            const svg=this.svg.current
            const g=svg.querySelector('g')
            const {x,y,width,height}=g.getBBox()
            g.setAttribute("transform",`translate(${-x} ${-y})`)
            svg.setAttribute("width",width)
            svg.setAttribute("height",height)
            svg.querySelector('text').remove()
        },100)
    }

    static asHtmlElement(){
        define({"x-mindmap":{component:MindMap, attributes:["src","width","height"]}})
    }
}