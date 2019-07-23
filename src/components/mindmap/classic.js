import React, {Component} from "react"
import PropTypes from "prop-types"
import Path from "./path"
import RefreshIndicator from "material-ui/RefreshIndicator";

var uuid=Date.now()
export class Scheme extends Component{
    static childContextTypes={
        measure: PropTypes.shape({
            lineHeight:PropTypes.func,
            stringWidth: PropTypes.func,
        })
    }

    getChildContext(){
        return {
            measure:this.props.measure
        }
    }

    constructor(){
        super(...arguments)
        this.root=React.createRef()
    }

    render(){
        const {name,title=name,children=[], x, y, measure, ...props}=this.props
        const width=measure.stringWidth(title)
        const height=measure.lineHeight()
        const scale=width>70 ? 70/width : 1
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
                                    rotate={angle*i+30} 
                                    scope={angle}/>
                            )
                        }
                        return null
                    })()
                }
                <g transform="translate(-50 0)">
                    <g transform="translate(0 10)">
                        <path d="M60,70 Q90,80 90,45 Q90,10 50,10 Q10,10 10,40 Q10,70 45,70 Q70,70 75,50" fill="white" stroke="black"/>
                    </g>
                    <g transform={`translate(${100/2-width*scale/2} ${100/2+height*scale/2})`}>
                        <g transform={`scale(${scale})`}>
                            <text>
                                {title}
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        )
    }

    componentDidMount(){
        const root=this.root.current
        const {width,height}=root.getBBox()
        const box=root.ownerSVGElement.viewBox.baseVal
        if((box.width/box.height-1)*(width/height-1)<0){
            root.setAttr("transform",`${root.getAttr('transform')} rotate(90)`)
        } 
    }

    componentDidUpdate(){
        debugger
    }
}

export class Level1 extends Component{
    static contextTypes={
        measure: PropTypes.any
    }
    render(){
        const measure=this.context.measure
        const {name,title=name,children=[], id=`${++uuid}`, 
            x=0, y=0, scope, rotate, color, 
            strokeWidths,
            ...others}=this.props
        return (
            <g transform={`translate(${x} ${y})`} stroke={color}>
                <g transform={`rotate(${rotate} 0 50)`}>
                    <Path id={id} fill="none" 
                        d={`M0,50 q30,5 50,-15 t${Math.max(30,measure.stringWidth(title)+20)},-15`} 
                        strokeWidths={strokeWidths} 
                        which={rotate>=180 ? -1 :1}
                        >
                        {
                        (()=>{
                            if(children.length){
                                const angle=Math.floor(180/children.length)
                                return children.map((node,i)=>
                                    <Level2 key={i} {...node} 
                                        rotate={-45+angle*i} 
                                        scope={angle} 
                                        measure={measure}/>
                                )
                            }
                            return null
                        })()
                        }
                    </Path>
                    <text rotate={rotate>=180 ? "180" : "0"}>
                        <textPath href={`#${id}`} {...others}>
                            {rotate>=180 ? Array.from(title).reverse().join("") : title}
                        </textPath>
                    </text>
                </g>
            </g>
        )
    }
}
export class Level2 extends Component{
    static contextTypes={
        measure: PropTypes.any
    }
    
    render(){
        const measure=this.context.measure
        const {name,title=name,children=[], id=`${++uuid}`, 
            rotate=0, color, strokeWidth=2,
            }=this.props
        return (
            <g transform={`rotate(${rotate} 0 0)`}>
                <Path id={id} fill="none" 
                    stroke={color} 
                    strokeWidth={strokeWidth} 
                    d={`M0,0 q10,10 30,5 t${Math.max(50,measure.stringWidth(title))} 0`}>
                {
                (()=>{
                    if(children.length){
                        const angle=Math.floor(180/children.length)
                        return children.map((node,i)=>
                            <Level3 key={i} {...node} 
                                rotate={-45+angle*i} 
                                scope={angle} 
                                measure={measure}/>
                        )
                    }
                    return null
                })()
                }
                </Path>
                <text>
                    <textPath href={`#${id}`} startOffset={30} >{title}</textPath>
                </text>
            </g>
        )
    }
}

export const Level3=props=><Level2 {...props} strokeWidth={1}/>
const COLOR=["aqua","blueviolet","brown","crimson","orange","gold", "skyblue"]
