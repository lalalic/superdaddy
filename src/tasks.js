import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import {AppBar, LinearProgress as Progress} from 'material-ui'


import {Task as dbTask,Family as dbFamily} from './db'
import Calendar, {addDays, getLastDayOfMonth} from './components/calendar'
import FloatingAdd from "./components/floating-add"
import Logo from './icons/logo'
import IconMore from "material-ui/svg-icons/navigation/more-vert"
import IconStar from "material-ui/svg-icons/toggle/star"

const {List, Loading, Empty,Comment,CommandBar,Photo,Messager,Icons}=UI
const {DialogCommand}=CommandBar

/**
@ with currentChild
*/
export default class Tasks extends Component{
	state={tasks:null}

	getData(child){
		dbTask.find(/*{status:"scheduled",child:this.props.child._id, scheduledAt:when}*/).fetch(tasks=>{
			this.setState({tasks})
		})
	}

	componentDidMount(){
		this.getData(this.context.child)
	}

	componentWillReceiveProps(nextProps, nextContext){
		if(this.context.child!=nextContext.child)
			this.getData(nextContext.child)
	}

    render(){
		const {router, child}=this.context
		return (
			<div>
				<FloatingAdd mini={true} onClick={e=>router.push("courses")}/>

				<AppBar
					titleStyle={{color:"lightgray"}}
					showMenuIconButton={false}
					title={`${child.name}的课程`}/>

	            <List model={this.state.tasks}
					empty={<Empty icon={<Logo/>}/>}
					template={this.props.template||this.constructor.Item}/>
			</div>
        )
    }
	static contextTypes={
		router: PropTypes.object,
		child: PropTypes.object
	}

	static Item=class  extends Component{
		render(){
			let {model,thumbnail,...others}=this.props
			let {knowledge}=model
			let {title, steps=[]}=knowledge, len=steps.length
	        return (
	            <div className="li inset photo1" {...others} onClick={()=>this.onDetail()}>
					<div className="layout">
		                <div>
		                    <div className="title">{title}</div>
							<Progress mode="determinate"
								color="green"
								style={{margin:"5px auto"}}
								max={len}
								value={model.current}/>
							<div className="more">
							{model.current ? `已完成${Math.ceil(100*model.current/len)}%, 继续玩吧！`
								: "至今还没有开始玩，赶紧开始吧！"}
				            </div>
		                </div>
		                <div className="photos">
		                    <div><img src={model.thumbnail||thumbnail}/></div>
		                </div>
					</div>
	            </div>
	        )
		}
		onDetail(){
			this.context.router.push({pathname:`task/${this.props.model._id}`, state:{task:this.props.model}})
		}
		static defaultProps={thumbnail:"images/icon.svg"}
		static contextTypes={router:PropTypes.object}
	}
}
