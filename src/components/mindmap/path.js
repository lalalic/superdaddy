import React,{Component} from "react"

export default class Path extends Component{
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
        const {strokeWidth=1, strokeWidths,pieces=100,which=1,padding=10,id, children}=this.props
        const path=this.path.current
        const totalLength=path.getTotalLength()
        const dash=totalLength/pieces

        var state={}
        if(strokeWidths && strokeWidths.length>1){
            const lerp=(p, a, b)=>a+(b-a)*p
            state.paths=new Array(pieces).fill(0).map((a,i)=>{
                return {
                    strokeWidth:lerp(i/(pieces-1),...strokeWidths),
                    strokeDasharray:`${(i+1)*dash},${totalLength}`
                }
            })
        }

        if(typeof(id)!="undefined"){
            const {x,y}=path.getPointAtLength(0)
            const textPaths=new Array(pieces).fill(0).map((a,i)=>{
                const {x,y}=path.getPointAtLength((i+1)*dash)
                return {x,y:y-(strokeWidth/2+padding)*which}
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