import React, {Component} from "react"
import PropTypes from "prop-types"
import Monitor from "./monitor"

import {IconButton} from "material-ui"
import IconStart from "material-ui/svg-icons/av/play-arrow"
import IconPause from "material-ui/svg-icons/av/pause"
import IconResume from "material-ui/svg-icons/av/play-arrow"


export default class Clock extends Component{
    static propTypes={
        timer: PropTypes.number,
        idle: PropTypes.number,
        min: PropTypes.number,
    }

    static defaultProps={
        timer:1,
        idle: 2,
        threshold:170,
    }
    constructor(){
        super(...arguments)
        this.state={data:[{time:Date.now(),fr:0}],start:0, end:0, valid:0}
        this.monitor=new Monitor()
        this.refTimer=React.createRef()
    }

    componentDidMount(){
        const {idle, threshold,  onFinish}=this.props
        this.monitor.onData(current=>{
            if(this.state.pausing || this.state.end){
                return
            }
            this.setState(({data,valid,start,timer})=>{
                const last=data[data.length-1]
                while(data.length>0 && (current.time-data[0].time)>1000*idle){
                    data.shift()
                }
                data.push(current)
                
                if(Math.max(...data.map(a=>a.fr))>=threshold){
                    valid=valid+(current.time-last.time)
                }
                if(valid>=1000*60*timer){
                    this.monitor.stop()
                    if(onFinish){
                        onFinish({start,end:Data.now,timer})
                    }
                    return {start:undefined, pausing:undefined, current:undefined}
                }
                return {valid,current}
            })
        })
    }

    componentWillUnmount(){
        this.monitor.stop()
    }

    render(){
        const {timer}=this.props
        const {start, pausing,current}=this.state
        const {minute, second}=this.leftTime()
        const style={width:40,border:"none",height:24,lineHeight:24,background:"black",color:"white"}
        const Icon=!!!start ? IconStart : (pausing ?  IconResume : IconPause)
        return (
            <center style={{height:24,lineHeight:"24px"}}>
                {!!start && <span style={style}>{minute}:{second}</span>}
                {!!!start && <input style={style} ref={this.refTimer}  defaultValue={timer} type="number" min={10} step={10} max={90}/>}
                <Icon onClick={e=>this.toggleStart()}/>
                {!!start &&  <span>{current && current.fr}</span>}
            </center>
        )
    }

    leftTime(){
        const {timer}=this.props
        const {valid}=this.state
        const leftSeconds=parseInt((timer*60*1000-valid)/1000)
        const minutes=parseInt(leftSeconds/60)
        const seconds=leftSeconds-minutes*60
        return {minute:`${minutes}`.padStart(2,'0'), second:`${seconds}`.padStart(2,'0')}
    }

    toggleStart(){
        const {start, pausing}=this.state
        if(!start){
            this.monitor.start().then(()=>this.setState({start:Date.now(),end:undefined, timer:this.refTimer.current.value}))
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