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
            <svg ref={this.svg} fontSize="12"  strokeLinecap="round" 
                viewBox="-1000,-1000,10,10"
                {...props}
                onClick={this.print}>
                <text id="measure" ref={this.measure}>Ä</text>
                <g>
                    {measure && <Scheme {...(data)} measure={measure}/>}
                </g>
            </svg>
        )
    }

    print(e){
        const svg=(e.target.ownerSVGElement||e.target)
        const g=svg.querySelector('g')
        const {x,y}=g.getBBox()
        print({
            html:`
                <svg width="100%" height="100%">
                    <g transform="translate(${-x} ${-y})">
                        ${svg.innerHTML}
                    </g>
                </svg>`,
            style:`
            @page { 
                size: A4; 
            } 
            `
        })
    }

    componentDidMount(){
        const r=this.measure.current
        this.setState({
                measure:{
                    lineHeight(){
                        return r.getBBox().height
                    },

                    stringWidth(word){
                        r.firstChild.data=word
                        return r.getBBox().width
                    }
                },
            }, 
            ()=>setTimeout(()=>{
                const svg=this.svg.current
                svg.querySelector('text#measure').remove()
                adjustSize(svg)
                window._mindmapAdjustSize=adjustSize
            },100)
        )
    }

    static asHtmlElement(){
        define({"x-mindmap":{component:MindMap, attributes:["src","width","height"]}})
    }
}

function adjustSize(svg){
    const g=svg.querySelector('g')
    const {x,y,width,height}=g.getBBox()
    const {width:clientWidth,height:clientHeight}=svg.getBoundingClientRect()
    const scale=clientWidth>clientHeight ? clientHeight/height : clientWidth/width
    svg.setAttribute("viewBox",`${x-(clientWidth/scale-width)/2} ${y-(clientHeight/scale-height)/2} ${clientWidth/scale} ${clientHeight/scale}`)
}