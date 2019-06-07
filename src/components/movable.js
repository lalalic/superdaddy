import React, {Component} from "react"

export default class Movable extends Component{
    constructor(){
        super(...arguments)
        this.container=React.createRef()
        this.state={}
    }
    
    componentDidMount(){
        const container=this.container.current
        container.addEventListener("mousedown",e=>{
            const {left,top}=container.getBoundingClientRect()
            this.setState({left, top,moving:true,x:e.clientX, y:e.clientY})
        })
        container.addEventListener("mousemove",e=>{
            const {moving, left,top, x,y}=this.state
            if(!moving)
                return 
            container.style=`positon:absolute; left: ${left+(e.clientX-x)}px !important; top:${top+(e.clientY-y)}px !important;bottom:auto !important;right:auto !important`
        })
        container.addEventListener("mouseup",e=>{
            this.setState({left:e.clientX, top:e.clientY,moving:false})
        })
    }

    render(){
        return (
            <div {...this.props} ref={this.container}/>
        )
    }


}