import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import IconStart from "material-ui/svg-icons/av/play-arrow"
import IconPause from "material-ui/svg-icons/av/pause"
import IconResume from "material-ui/svg-icons/av/play-arrow"

import Monitor from "./monitor"
import {getNoteKey, getPianoKey, getFrequency} from "./phonic"

export default class Clock extends Component{
    static propTypes={
        timer: PropTypes.number,
        idle: PropTypes.number,
        threshold: PropTypes.oneOfType([PropTypes.number,PropTypes.string,PropTypes.func]),
        filter: PropTypes.func,
        cheerSound: PropTypes.string,
    }

    static defaultProps={
        timer:1,
        idle: 2,
        threshold:170,
        filter: getFrequency,
        cheerSound: "/timer.wav",
    }

    constructor(){
        super(...arguments)
        this.state={data:[{time:Date.now(),fr:0}],start:0, end:0, valid:0}
        this.refTimer=React.createRef()
        this.monitor=new Monitor()
    }

    static getDerivedStateFromProps({threshold},state){
        return {threshold:state.threshold||threshold}
    }

    get threshold(){
        const {threshold}=this.state
        switch(typeof(threshold)){
        case "func":
            return threshold
        case "number":
            return frs=>Math.max(...frs)>=threshold
        case "string":{
                if(threshold=="panio"){
                    return frs=>frs.find(fr=>getPianoKey(fr)!=-1)!=-1
                }
                const [min=0,max=Number.MAX_SAFE_INTEGER]=threshold.split("-").map(a=>parseInt(a))
                return frs=>frs.findIndex(a=>a>=min && a<=max)!=-1
            }
        }
    }

    componentDidMount(){
        const {idle,  onFinish, filter}=this.props
        this.monitor.onData(current=>{
            if(this.state.pausing || this.state.end){
                return
            }
            this.setState(({data,valid,start,timer})=>{
                const last=data[data.length-1]
                while(data.length>0 && (current.time-data[0].time)>1000*idle){
                    data.shift()
                }

                const fr=filter(current.buffer, this.monitor.sampleRate)
                if(fr<1)
                    return 
                data.push(current={time:current.time, fr})
                
                if(this.threshold(data.map(a=>a.fr))){
                    if(last){
                        valid=valid+(current.time-last.time)
                    }
                }

                if(valid>=1000*60*timer){
                    this.monitor.stop()
                    const last={start,end:Date.now(),timer, cheered:false}
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
        const {timer, debug=false, idle, filter, threshold:_1, cheerSound, ...props}=this.props
        const {start, pausing,current,data, threshold,last}=this.state
        const {minute, second}=this.leftTime()
        const style={width:40,border:"none",height:24,lineHeight:"24px",background:"black",color:"white"}
        const Icon=!!!start ? IconStart : (pausing ?  IconResume : IconPause)
        return (
            <div {...props}>
                {last && <div>{this.lastSummary()}</div>}

                <div>    
                    <span style={{display:"inline-flex"}}>
                        {!!start && <span style={style}>{minute}:{second}</span>}
                        {!!!start && <input style={style} ref={this.refTimer}  defaultValue={timer} type="number" min={10} step={10} max={90}/>}
                        <Icon onClick={e=>this.toggleStart()} viewBox="4 0 24 24"/>

                        {!!start && debug && (
                            <span>
                                {getNoteKey(current ? current.fr : -1).padEnd(3,' ')}
                                {`${getPianoKey(current ? current.fr : -1)}`.padEnd(2,' ')}
                                {data.map(a=>a.fr).slice(0,10).join(",")}
                            </span>
                        )}
                    </span>
                </div>
                <div>
                    <audio src={cheerSound} autoPlay={!!(last && !last.cheered && cheerSound)}
                        style={{position:"absolute",left:-999}} 
                        onEnded={()=>this.setState({last:{...last, cheered:true}})}/>

                    <input type="number" 
                        value={threshold} step={5} 
                        style={{...style,background:"",color:""}}
                        onChange={e=>this.setState({threshold:parseInt(e.target.value)})}/>
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
            this.monitor.start().then(()=>this.setState({start:Date.now(),end:undefined, timer:this.refTimer.current.value, last:undefined}))
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