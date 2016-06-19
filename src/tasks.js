import {React,Component,UI} from 'qili-app'
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
		this.getData(this.props.child)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.child!=nextProps.child)
			this.getData(nextProps.child)
	}

    render(){
		return (
			<div>
				<FloatingAdd mini={true} onClick={e=>this.context.router.push("courses")}/>

				<AppBar
					titleStyle={{color:"lightgray"}}
					showMenuIconButton={false}
					title={`${this.props.child.name}的课程`}/>

	            <List model={this.state.tasks}
					empty={<Empty icon={<Logo/>}/>}
					template={this.props.template||this.constructor.Item}/>
			</div>
        )
    }
	static contextTypes={router: React.PropTypes.object}
	static Item=class  extends Component{
		render(){
			let {model,thumbnail,...others}=this.props
			let {knowledge}=model
	        return (
	            <div className="li inset photo1" {...others} onClick={()=>this.onDetail()}>
					<div className="layout">
		                <div>
		                    <div className="title">{knowledge.title}</div>
							<Progress mode="determinate"
								color="green"
								style={{margin:"5px auto"}}
								max={knowledge.steps||10} value={model.current}/>
							<div className="more">
							{model.current ? `已完成${Math.ceil(100*model.current/knowledge.steps)}%, 继续玩吧！` 
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
		static contextTypes={router:React.PropTypes.object}
	}
}
