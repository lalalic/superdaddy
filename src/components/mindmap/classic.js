import React, {Component} from "react"
import {Measure} from "./measure"

var uuid=Date.now()
export class Scheme extends Component{
    constructor(){
        super(...arguments)
        const {fonts="",size=12}=this.props
        this.measure=new Measure({fonts,size})
    }
    render(){
        const {name,title=name,children=[], x, y, ...props}=this.props
        const width=this.measure.stringWidth(title)
        const height=this.measure.lineHeight()
        return (
            <g ref={this.root} transform={`translate(${x} ${y})`} {...props}>
                {
                    (()=>{
                        if(children.length){
                            const angle=Math.floor(360/children.length)
                            const colors=[...COLOR]
                            return children.map((node,i)=>
                                <Level1 key={i} {...node} 
                                    startOffset={60}
                                    strokeWidths={[20,3]}
                                    color={colors.splice(Math.floor(Math.random()*(colors.length-1)) ,1)[0]}
                                    rotate={-90+angle*i} scope={angle} 
                                    measure={this.measure}/>
                            )
                        }
                        return null
                    })()
                }
                <g transform="translate(-50 0)">
                    <g transform="translate(0 10)">
                        <path d="M60,70 Q90,80 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" fill="white" stroke="black"/>
                    </g>
                    <text x={100/2-width/2} y={100/2+height/2}>{title}</text>
                </g>
            </g>
        )
    }
}

export class Level1 extends Component{
    render(){
        const {name,title=name,children=[], measure, id=`${++uuid}`, 
            x=0, y=0, scope, rotate, color, 
            strokeWidths,
            ...others}=this.props
        return (
            <g transform={`translate(${x} ${y})`} stroke={color}>
                <g transform={`rotate(${rotate} 0 50)`}>
                    <Path id={id} fill="none" 
                        d="M0,50 q30,5 50,-15 t30,-15" 
                        strokeWidths={strokeWidths} 
                        which={rotate>180 ? -1 :1}
                        >
                        {
                        (()=>{
                            if(children.length){
                                const angle=Math.floor(180/children.length)
                                return children.map((node,i)=><Level2 key={i} {...node} rotate={-90+angle*i} scope={angle} measure={this.measure}/>)
                            }
                            return null
                        })()
                        }
                    </Path>
                    <text rotate={rotate>180 ? "180" : "0"}>
                        <textPath href={`#${id}`} {...others}>
                            {rotate>180 ? Array.from(title).reverse().join("") : title}
                        </textPath>
                    </text>
                </g>
            </g>
        )
    }
}
const COLOR=["aqua","blueviolet","brown","crimson","orange","gold", "skyblue"]
export class Level2 extends Component{
    render(){
        const {name,title=name,children=[], measure, id=`${++uuid}`, 
            scope, rotate=0, color, strokeWidth=2,
            }=this.props
        return (
            <g transform={`rotate(${rotate} 0 0)`}>>
                <Path fill="none" stroke={color} strokeWidth={strokeWidth} d="M0,0 q10,10 30,5 t50 0">
                {
                (()=>{
                    if(children.length){
                        const angle=Math.floor(180/children.length)
                        return children.map((node,i)=><Level3 key={i} {...node} rotate={-90+angle*i} scope={angle} measure={this.measure}/>)
                    }
                    return null
                })()
                }
                </Path>
                <path fill="none" id={id} stroke="transparent" d="M0,0 q10,4 30,-1 t50 -6"/>
                <text>
                    <textPath href={`#${id}`} startOffset={30} >{title}</textPath>
                </text>
            </g>
        )
    }
}

export const Level3=props=><Level2 {...props} strokeWidth={1}/>

class Path extends Component{
    static displayName="VSWpath"
    constructor(){
        super(...arguments)
        this.path=React.createRef()
        this.state={}
    }

    render(){
        const {strokeWidths=[],pieces=100, id, children, ...props}=this.props
        const {paths, textPath, x=0, y=0}=this.state

        return (
            <g>
                <path {...props} ref={this.path} id={textPath ? "" : id}/>
                {textPath && <path id={id} stroke="transparent" fill="none" d={textPath}/>}
                {paths && <g>{paths.map((a,i)=><path key={i} {...props} {...a}/>)}</g>}
                {children && (
                <g transform={`translate(${x} ${y})`}>
                    {children}
                </g>
                )}
            </g>
        )
    }

    componentDidMount(){
        const {strokeWidths,pieces=100,which=1, children}=this.props
        const path=this.path.current
        const totalLength=path.getTotalLength()
        var state={}    
        if(strokeWidths && strokeWidths.length>1){
            const dash=totalLength/pieces
            const lerp=(p, a, b)=>a+(b-a)*p
            const padding=10
            const points=[]
            const paths=new Array(pieces).fill(0).map((a,i)=>{
                const strokeWidth=lerp(i/(pieces-1),...strokeWidths)
                const iDash=(i+1)*dash
                const strokeDasharray=`${iDash},${totalLength}`
                const {x,y}=path.getPointAtLength(iDash)
                points.push({x,y:y-(strokeWidth/2+padding)*which})
                return {strokeWidth,strokeDasharray}
            })
            const {x,y}=this.path.current.getPointAtLength(0)
            const textPath=`M${x} ${y} L${points.map(({x,y})=>`${x},${y}`).join(" ")}`
            state={...state, paths, textPath}
        }

        if(children){
            const {x,y}=path.getPointAtLength(totalLength)
            state={...state, x,y}
        }

        this.setState(state)
    }
}