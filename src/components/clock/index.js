import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import IconStart from "material-ui/svg-icons/av/play-arrow"
import IconPause from "material-ui/svg-icons/av/pause"
import IconResume from "material-ui/svg-icons/av/play-arrow"
import IconClose from "material-ui/svg-icons/navigation/close"

import Monitor from "./monitor"
import {ACTION} from "../../state"

export default class Clock extends Component{
    static propTypes={
        timer: PropTypes.number,
        idle: PropTypes.number,
        threshold: PropTypes.number,
        focus: PropTypes.number,
        filter: PropTypes.func,
        cheerSound: PropTypes.string,
    }

    static defaultProps={
        timer:1,
        idle: 2,
        threshold:170,
        filter: frs=>Math.max(...frs),
        cheerSound: "/timer.wav",
        focus:30,
    }

    constructor(){
        super(...arguments)
        this.state={}
        this.refTimer=React.createRef()
        this.refCheerSound=React.createRef()
        this.canvas=React.createRef()
        this.monitor=new Monitor()
    }

    static getDerivedStateFromProps({threshold,timer,focus},state){
        return {threshold, timer,focus,...state}
    }

    draw(data){
        const canvasWidth=100, canvasHeight=50
        const ctx=this.canvas.current.getContext("2d")
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        for (var i = 0; i < data.length; i++) {
            var value = data[i] / 256;
            var y = canvasHeight - (canvasHeight * value) - 1;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(i, y, 1, 1);
        }
    }

    componentDidMount(){
        const {idle,  onFinish, filter, cheerSound}=this.props
        this.monitor.onData(current=>{
            if(this.state.pausing || this.state.end){
                return
            }
            this.draw(current.buffer)
            this.setState(({data,valid,start,timer,threshold})=>{
                const last=data[data.length-1]
                while(data.length>0 && (current.time-data[0].time)>1000*idle){
                    data.shift()
                }

                const fr=filter(current.buffer||[0])
                if(fr<1)
                    return 
                data.push(current={time:current.time, fr})
                
                if(Math.max(...data.map(a=>a.fr))>=threshold){
                    if(last){
                        valid=valid+(current.time-last.time)
                    }
                }

                if(valid>=1000*60*timer){
                    this.monitor.stop()
                    if(cheerSound){
                        this.refCheerSound.current.play()
                        setTimeout(()=>this.refCheerSound.current.pause(),3000)
                    }
                    const last={start,end:Date.now(),timer}
                    if(onFinish){
                        onFinish(last)
                    }
                    return {start:undefined, pausing:undefined, current:undefined, last}
                }
                return {valid,current}
            })
        })
    }

    componentWillUnmount(){
        this.monitor.stop()
    }

    render(){
        const {debug=false, idle, filter, threshold:_1, cheerSound, dispatch, ...props}=this.props
        const {start, pausing, threshold,timer,last}=this.state
        const {minute, second}=this.leftTime()
        const style={width:40,border:"none",height:24,lineHeight:"24px",background:"black",color:"white"}
        const Icon=!!!start ? IconStart : (pausing ?  IconResume : IconPause)
        return (
            <div {...props}>
                {last && <div>{this.lastSummary()}</div>}
                <div style={{display:"flex", flexDirection:"row"}}>
                    <canvas ref={this.canvas} width={100} height={50} style={{background:"black",marginRight:1}}/>
                    <div>
                        <div className="primary">    
                            <span style={{display:"inline-flex"}}>
                                {!!start && <span style={style}>{minute}:{second}</span>}
                                {!!!start && (
                                    <input style={style} ref={this.refTimer} title="时间(分)" 
                                        value={timer} 
                                        type="number" 
                                        onChange={e=>this.setState({timer:e.target.value})}
                                        min={10} step={10} max={90}/>
                                )}
                                <Icon onClick={e=>this.toggleStart()} viewBox="4 0 24 24" style={{cursor:"default"}}/>
                            </span>
                        </div>
                        <div className="second">
                            <audio src={cheerSound} ref={this.refCheerSound} preload="auto" loop={true}/>        
                            <span style={{display:"inline-flex"}}>
                                <input type="number" title="音量"
                                    value={threshold} step={5}
                                    style={{...style,background:"",color:""}}
                                    onChange={e=>this.setState({threshold:parseInt(e.target.value)})}/>
                                <IconClose 
                                    onClick={e=>{
                                        this.monitor.stop()
                                        this.setState({
                                            data:[],
                                            start:0,
                                            timer:0, 
                                            last:undefined,
                                            valid:0
                                        })
                                        dispatch && dispatch(ACTION.TIMER(false))
                                    }} 
                                    viewBox="-4 -10 48 48" 
                                    style={{cursor:"default"}}
                                    />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    lastSummary(){
        const {start, end, timer}=this.state.last
        const taken=parseInt((end-start)/1000/60)
        return `练习${timer}分钟共花了${taken}分钟，专注度：${parseInt(timer*100/taken)}`
    }

    leftTime(){
        const {valid,timer}=this.state
        const leftSeconds=parseInt((timer*60*1000-valid)/1000)
        const minutes=parseInt(leftSeconds/60)
        const seconds=leftSeconds-minutes*60
        return {minute:`${minutes}`.padStart(2,'0'), second:`${seconds}`.padStart(2,'0')}
    }

    toggleStart(){
        const {start, pausing,timer}=this.state
        if(!start){
            this.monitor.start(()=>this.setState({
                data:[{time:Date.now(),fr:0}],
                start:Date.now(),
                timer, 
                last:undefined,
                valid:0
            }))
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