import React, {Component} from "react"
import PropTypes from "prop-types"
import Monitor from "./monitor"
export default class Clock extends Component{
    static propTypes={
        timer: PropTypes.number,
        idle: PropTypes.number,
        min: PropTypes.number,
    }

    static defaultProps={
        timer:30,
        idle: 2,
        min:170,
    }
    constructor(){
        super(...arguments)
        this.state={data:[{time:Date.now(),fr:0}],start:0, end:0, valid:0}
        this.monitor=new Monitor()
    }

    componentDidMount(){
        const {timer,idle, min}=this.props
        this.monitor.onData(current=>{
            this.setState(({data,valid})=>{
                const last=data[data.length-1]
                while(data.length>0 && (current.time-data[0].time)>1000*idle){
                    data.shift()
                }
                data.push(current)
                
                if(Math.max(...data.map(a=>a.fr))>=min){
                    valid=valid+(current.time-last.time)
                }
                if(valid>=1000*timer){
                    this.monitor.stop()
                    return {valid, end:Date.now(), pausing:undefined, current:undefined}
                }
                return {valid,current}
            })
        })
    }

    componentWillUnmount(){
        this.monitor.stop()
    }

    render(){
        const { current, start, end, valid, pausing}=this.state
        if(end){
            return (
                <button type="button">{valid}({start}-{end})</button>
            )
        }

        return (
            <div>
                <button type="button" onClick={e=>this.toggleStart()}>
                    {!start ? "Click to Start Clock" : `${parseInt(valid/1000)} Seconds(${start}, ${current.fr}), click to ${pausing ? "Resume" : "Pause"}`}
                </button>
            </div>
        )
    }

    toggleStart(){
        const {start, end, pausing}=this.state
        if(!start){
            this.monitor.start().then(()=>this.setState({start:Date.now()}))
        }else{
            if(!pausing){
                this.monitor.pause()
                this.setState({pausing:true})
            }else{
                this.monitor.resume()
                this.setState({pausing:undefined})
            }
        }
    }
}