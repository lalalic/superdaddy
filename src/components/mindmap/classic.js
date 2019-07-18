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
                                    startOffset={50}
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
                    <Path id={id} fill="none" d="M0,50 q30,5 50,-15 t30,-15" strokeWidths={strokeWidths}/>
                    <text rotate={rotate>180 ? "180" : "0"}>
                        <textPath href={`#${id}`} {...others}>
                            {title}
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
        const {strokeWidths,pieces=100, ...props}=this.props
        const {totalLength}=this.state
        if(!strokeWidths || strokeWidths.length==0 || !totalLength)
            return <path {...props} ref={this.path}/>
        
        const dash=totalLength/pieces
        const lerp=(p, a, b)=>{
            debugger
            return  Number(a)+(b-a)*p
        }

        return (
            <g>
                {
                    new Array(pieces).fill(0).map((a,i)=>
                        <path key={i} {...props} 
                            strokeWidth={lerp(i/(pieces-1),...strokeWidths)} 
                            strokeDasharray={`${(i+1)*dash},${totalLength}`}
                            />
                    )
                }
            </g>
        )
    }

    componentDidMount(){
        const {strokeWidths,pieces=100}=this.props
        if(strokeWidths && strokeWidths.length>1){
            this.setState({totalLength:this.path.current.getTotalLength()})
        }
    }
}