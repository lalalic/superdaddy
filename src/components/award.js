import React, {Component,Fragment} from "react"
import { CommandBar } from "qili-app"
import PrintTrigger from "./print-trigger"
import ReactPrint from "react-to-print"

export default class Award extends Component{
    constructor(){
        super(...arguments)
        this.state={tempalte:""}
        this.printArea=React.createRef()
    }
    static defaultProps={
        award:"祝贺你在这一阶段的生活中取得的|极大进步！",
    }

    static getDerivedStateFromProps({award, name, photo},state){
        return {award, name, photo,...state}
    }

    render(){
        const {templates=[]}=this.props
        const {template, award, name, photo,print}=this.state
        return (
            <Fragment>
                <div style={{flex:1,margin:4}}>
                    <center style={{fontSize:12}}>鼓励寄语,“|”为换行符</center>
                    <textarea defaultValue={award} 
                        onChange={e=>this.setState({award:e.target.value})}
                        style={{height:47,border:"1px solid lightblue",padding:4,width:"100%",fontSize:14}}/>
                </div>
                <div style={{flex:"1 1 100%", overflowY:"scroll",position:"relative",textAlign:"center",margin:4}} 
                    ref={this.printArea}>
                    <svg viewBox="0 0 297 210" style={{maxWidth:"100%",maxHeight:"100%"}}>
                        {photo && (<defs>
                            <pattern id="photo" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 50 50">
                                <image x="0%" y="0%" xlinkHref={photo} height="50" width="50"/>
                            </pattern>
                        </defs>
                        )}
                        <image xlinkHref="/images/award.jpg"  height="100%" width="100%"/>
                        
                        {photo && <circle r="21" cx="148" cy="30" fill="url(#photo)"/>}
                        
            
                        <g fontSize="x-small">
                            <text x={30} y={80}>
                                <tspan fontSize="large">{name}</tspan>
                                <tspan>同学</tspan></text>
                            <text x={60} y={90}>{
                                award.split("|").map((a,i)=>
                                    <tspan key={i} x={i==0 ? 60 : 40} dy={`1.2em`}>{a}</tspan>
                                )
                            }</text>
                            <text x={90} y={150}>请再接再厉，争取取得更大的进步</text>
                            <text x={150} y={170}>特发此证，以资鼓励</text>
                        </g>
                    </svg>
                </div>
                <CommandBar style={{flex:"none"}} items={[
                    "back",

                    <ReactPrint 
                        trigger={()=>(<PrintTrigger onNativeClick={()=>this.setState({print:1})} printReady={print==1}/>)} 
                        content={()=>this.printArea.current.querySelector("svg")}
                        pageStyle={`
                            @page { 
                                size: A4 landscape;  
                                margin: 0mm; 
                            } 
                            @media print { 
                                body { 
                                    margin: 0mm; 
                                    padding:0mm;
                                }
                            }
                        `}

                        onAfterPrint={()=>this.setState({print:undefined})}
                        />
                    ]}/>
            </Fragment>
        )
    }
}



