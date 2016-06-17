import {React,Component,UI} from 'qili-app'
import {Link} from "react-router"
import {Subheader, Divider, Tabs, Tab, DatePicker} from 'material-ui'


import {Task as dbTask,Family as dbFamily} from './db'
import Calendar, {addDays, getLastDayOfMonth} from './components/calendar'
import Logo from './icons/logo'
import IconMore from "material-ui/svg-icons/navigation/more-vert"

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
            <List model={this.state.tasks}
				empty={<Empty icon={<Logo/>}/>}
				template={this.props.template||this.constructor.Item}/>
        )
    }

	static Item=class  extends Component{
		render(){
			var {model:task, image, actions, ...others}=this.props,
				{knowledge}=task;
			return (
				<div className="li">
					<div className="content" onClick={this.onDetail.bind(this)}>
						<div>
							<h4>{task.knowledge.title}</h4>
						</div>
						<div className="photo">
							<img src={task.photo||image}/>
						</div>
					</div>
				</div>
			)
		}
		onDetail(){
			this.context.router.push({pathname:`task/${this.props.model._id}`, state:{task:this.props.model}})
		}
		static defaultProps={image:"images/task.jpg"}
		static contextTypes={router:React.PropTypes.object}
	}
}
