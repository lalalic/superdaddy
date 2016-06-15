import {React,Component,UI} from 'qili-app'
import {Subheader, Divider} from 'material-ui'


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
	constructor(){
		super(...arguments)
		this.state={tasks:null}
	}

	getData(when){
		dbTask.find(/*{status:"scheduled",child:this.props.child._id, scheduledAt:when}*/).fetch(tasks=>{
			this.setState({tasks})
		})
	}

	componentDidMount(){
		this.getData(this._parseDate(this.props.params.when))
	}

    componentWillReceiveProps(nextProps){
        if(this.props.params.when!=nextProps.params.when)
			this.getData(this._parseDate(nextProps.params.when))
    }

    render(){
		var when=this._parseDate(this.props.params.when)
        return (
            <div>
                <List model={this.state.tasks}
					empty={<Empty icon={<Logo/>}/>}
					template={this.props.template||this.constructor.Item}>
					<Subheader><h2><center>{this.props.params.when||'today'}</center></h2></Subheader>
					<Divider inset={false}/>
				</List>
				<CommandBar
                    className="footbar"
                    primary="Knowledges"
                    items={[
						{action:"今天",
							onSelect: a=>this.context.router.push("tasks/today")},
						{action:"明天",
							onSelect: a=>this.context.router.push("tasks/tomorrow")},
						{action:"...",
                            onSelect:()=>this.refs.task.show(),
                            icon:IconMore}
					]}
                    />
                <Tasks.TaskQueryCommand ref="task" when={when}
					onChange={(d,name)=>{
						switch(Math.floor((Date.now()-d.getTime())/(1000*24*60*60))){
							case 0:
								name='today'
							break
							case 1:
								name='yesterday'
							break
							case -1:
								name='tomorrow'
							break
							default:
								name=d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
							break
						}
						this.context.router.push(`tasks/${name}`)
					}}/>
            </div>
        )
    }

    _parseDate(when='today'){
        var today=new Date()
        today.setHours(0,0,0,0)
        switch(when){
        case 'today':
            return today
        case 'yesterday':
            return addDays(today,-1)
        case 'tomorrow':
            return addDays(today,1)
        default:
            when=new Date(Date.parse(when))
            when.setHours(0,0,0,0)
            return when
        }
    }

	static contextTypes={router:React.PropTypes.object}

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

	static Approvings=class extends Tasks{
		getData(){
			dbTask.find(/*{status:"finished",child:this.props.child._id}*/).fetch(tasks=>{
				this.setState({tasks})
			})
		}

		_parseDate(){
			return null
		}

		static Item=class extends Tasks.Item{

		}
	}

	static TaskQueryCommand=class extends DialogCommand{
		renderContent(){
			var {when, onChange}=this.props
				,now=new Date()
			return (<div className="calendar">
						{<Calendar
							firstDayOfWeek={0}
							mode="landscape"
							selected={when}
							displayDate={now}
							minDate={now}
							maxDate={getLastDayOfMonth(now)}
							onTouchTapDay={(e,day)=>onChange(day)}
							 />}
					</div>)
		}
	}
}
