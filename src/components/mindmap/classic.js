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
        const {name,title=name,children=[]}=this.props
        const width=this.measure.stringWidth(title)
        const height=this.measure.lineHeight()

        return (
            <g transform="translate(200 250)">
                {
                    (()=>{
                        if(children.length){
                            const angle=Math.floor(360/children.length)
                            const bias=parseInt(Math.random()*90)
                            const colors=[...COLOR]
                            return children.map((node,i)=>
                                <Level1 key={i} {...node} 
                                    startOffset={60}
                                    strokeWidths={[20,2]}
                                    color={colors.splice(Math.floor(Math.random()*(colors.length-1)) ,1)[0]}
                                    rotate={angle*i+bias} scope={angle} 
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
                    <text fontSize="12" x={100/2-width/2} y={100/2+height/2}>{title}</text>
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
                    <Path id={id} fill="none" d="M0,50 q30,5 50,-15 t30,-15" strokeWidths={strokeWidths} which={rotate>180 ? -1 :1}/>
                    <text rotate={rotate>180 ? "180" : "0"}>
                        <textPath href={`#${id}`} {...others}>
                            {rotate>180 ? Array.from(title).reverse().join("") : title}
                        </textPath>
                    </text>
                    {
                    (()=>{
                        if(children.length){
                            const angle=Math.floor(360/children.length)
                            const bias=0//parseInt(Math.random()*90)
                            return children.map((node,i)=><Level2 key={i} {...node} rotate={angle*i+bias} scope={angle} measure={this.measure}/>)
                        }
                        return null
                    })()
                }
                </g>
            </g>
        )
    }
}
const COLOR=["aqua","blueviolet","brown","crimson","orange","gold", "skyblue"]
export const Level2=Level1

export const Level3=Level2

class Path extends Component{
    static displayName="VSWpath"
    constructor(){
        super(...arguments)
        this.path=React.createRef()
        this.state={}
    }

    render(){
        const {strokeWidths=[],pieces=100, id, strokeWidth=0,...props}=this.props
        const {paths, textPath}=this.state

        return (
            <g>
                <path {...props} ref={this.path} id={textPath ? "" : id}/>
                {textPath && <path id={id} stroke="transparent" fill="none" d={textPath}/>}
                {paths && <g>{paths.map((a,i)=><path key={i} {...props} {...a}/>)}</g>}
            </g>
        )
    }

    componentDidMount(){
        const {strokeWidths,pieces=100,which=1}=this.props
        if(strokeWidths && strokeWidths.length>1){
            const path=this.path.current
            const totalLength=path.getTotalLength()
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
            this.setState({paths,textPath})
        }
    }
}