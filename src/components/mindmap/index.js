import React,{Component} from "react"
import {Scheme} from "./classic"
import {print} from "../print-trigger"
import {define} from "remount"


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
            <svg ref={this.svg} fontSize="11"  strokeLinecap="round" {...props} onClick={this.print}>
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
}

define({"x-mindmap":{component:MindMap, attributes:["src","width","height"]}})

function parse(mind=""){
    if(mind.startsWith("mindmap://")){
        mind=mind.substring("mindmap://".length)
    }
	function tocAppend({outline,name}, toc=[]){
		if(toc.length==0){
			toc.push({outline,name})
		}else if(outline==toc[0].outline){
			toc.push({outline,name})
		}else if(outline>toc[0].outline){
			const current=toc[toc.length-1]
			if(!current.children){
				current.children=[]
			}
			tocAppend(arguments[0], current.children)
		}
		return toc
	}
    let o=0
    const outline=mind.split(",").reduce((as,a)=>{
        as.data.splice(as.data.length-1,0,...a.split("(").map((b,i)=>{
            o=as.outline+i
            const j=b.indexOf(")")
            if(j!=-1){
                const a={name:b.substring(0,j), outline:o}
				o=o-(b.length-j)
				return a
            }
            return {name:b, outline:o}
        }))
        as.outline=o
        return as
    },{outline:1,data:[]}).data
    const toc=outline.reduce((toc,a)=>tocAppend(a,toc),[])
    return toc[0]
}