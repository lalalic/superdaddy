import React,{Component} from "react"
import PropTypes from "prop-types"

export default class Path extends Component{
    static displayName="VSWpath"
    static propTypes={
        precision:PropTypes.number,
        strokeWidths:PropTypes.arrayOf(PropTypes.number),
    }

    static defaultProps={
        precision:100,
    }

    static contextTypes={
        flip:PropTypes.any,
    }

    constructor(){
        super(...arguments)
        this.path=React.createRef()
        this.state={}
    }

    render(){
        const {strokeWidths=[],precision, id, children, ...props}=this.props
        const {paths, textPath, x=0, y=0}=this.state

        return (
            <g>
                <path {...props} ref={this.path}/>
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
        const {strokeWidth=1, strokeWidths=[],precision,id, children}=this.props
        const textPadding=strokeWidths.length>0 ? Math.max(...strokeWidths)/2 : strokeWidth
        const path=this.path.current
        const totalLength=path.getTotalLength()
        const dash=totalLength/precision
        const flip=this.context.flip

        var state={}
        if(strokeWidths && strokeWidths.length>1){
            const lerp=(p, a, b)=>a+(b-a)*p
            state.paths=new Array(precision).fill(0).map((a,i)=>{
                return {
                    strokeWidth:lerp(i/(precision-1),...strokeWidths),
                    strokeDasharray:`${(i+1)*dash},${totalLength}`
                }
            })
        }

        if(typeof(id)!="undefined"){
            const {x,y}=path.getPointAtLength(0)
            const textPaths=new Array(precision).fill(0).map((a,i)=>{
                const {x,y}=path.getPointAtLength((i+1)*dash)
                return {x,y:y-(strokeWidth/2+textPadding)*flip}
            })
            state.textPath=`M${x} ${y} L${textPaths.map(({x,y})=>`${x},${y}`).join(" ")}`
        }

        if(children){
            const {x,y}=path.getPointAtLength(totalLength)
            state={...state, x,y}
        }

        this.setState(state)
    }
}