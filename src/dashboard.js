import {React,Component,UI} from 'qili-app'
import {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField, Tabs, Tab, DatePicker} from 'material-ui'
import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"

import {Task as dbTask,Family as dbFamily} from './db'
import Calendar from './components/calendar'
import Rewards from './components/rewards'
import Logo from './icons/logo'

const {List, Loading, Empty,Comment,CommandBar,Photo,Messager,Icons}=UI
const {DialogCommand}=CommandBar



export default class Dashboard extends Component{
    shouldComponentUpdate(nextProps){
        return nextProps.child!=this.props.child
    }
    render(){
        var {child}=this.props
        return child ? (<BabyDashboard {...this.props} />) : (<AuthorDashboard {...this.props}/>)
    }
}

/**
@without currentChild
*/
export class AuthorDashboard extends Component{
    render(){
        return (
            <div>
                <Empty text="Start from your first baby, or walk around!"
                    icon={<Logo/>}
                    onClick={()=>this.context.router.push("baby")}/>
                <CommandBar
                    className="footbar"
                    primary="Family"

                    items={[
                        {action:"Knowledges",
                            onSelect:()=>this.context.router.push('knowledges'),
                            icon:IconKnowledges},
                        {action:"setting", label:"Account",
                            onSelect:()=>this.context.router.push('account'),
                            icon: IconAccount}
                        ]}
                    />
            </div>)
    }
}
AuthorDashboard.contextTypes={router:React.PropTypes.object}

/**
@ with currentChild
*/
export class BabyDashboard extends Component{
	constructor(){
		super(...arguments)
		this.state=this._resolveModel()
	}

    _resolveModel(props){
        var today=new Date(),
            {params:{when=today}}=props||this.props;
        when=this._parseDate(when)
        var model=when=='approvings' ? dbTask.approvings() : dbTask.byDate(when)
        return {when, model}
    }

    componentWillReceiveProps(nextProps){
        var today=new Date(),
            {nextChild, params:{nextWhen=today}}=nextProps,
            {child, params:{when=today}}=this.props
        if (nextChild!=child || nextWhen.getTime()!=when.getTime())
            this.setState(this._resolveModel(nextProps))
    }

    render(){
        var {when, model}=this.state
		var {child}=this.props
        return (
            <div>
                <Rewards child={child}/>

                <div className="page">
                    {this.renderContent(when)}
                </div>
				<CommandBar
                    className="footbar"
                    primary="Knowledges"
                    onSelect={()=>this.onSelect()}
                    items={[
                        {action:"Task",
                            onSelect:()=>this.refs.task.show(),
                            icon:IconTask},
                        {action:"Knowledges",
                            onSelect:()=>this.context.router.push('knowledges'),
                            icon:IconKnowledges},
                        {action:"setting", label:"Account",
                            onSelect:()=>this.context.router.push('account'),
                            icon: IconAccount}
                        ]}
                    />
                <TaskQueryCommand ref="task" when={when} onChange={d=>this.onChangeDate(d)}/>
            </div>
        )
    }

    renderContent(when){
        var {child}=this.props,
            {model}=this.state,
            headerStyle={
                height: 100,
                backgroundColor:'darkorange',
                textOverflow:'ellipsis',
                whiteSpace:'nowrap',
                textAlign:'left',
                fontSize:"xx-large",
                padding:10,
                margin:0
            },
            props={model,headerStyle}

        if('approvings'==when){
            Object.assign(props,{
                subheader:"Approvings",
                template:ProvingItem,
                empty:(<Empty text="Nobody played with your children!"
                            icon={<Logo/>}/>)
            })
        }else{
            var d=Math.floor((Date.now()-when.getTime())/(1000*24*60*60))
            Object.assign(props,{
                subheader: this._format(when),
                template:TaskItem,
                empty:d>0 ?
                    (<Empty text={`You didnot play with ${child.name}`}
                        icon={<Logo/>}/>) :
                    (<Empty text={`Find fun topic NOW to play with ${child.name} `}
                        icon={<Logo/>}
                        onTouchTap={()=>this.context.router.push('knowledges')} />)
            })
        }

        return <List {...props}/>
    }

    onSelect(command,e){
        switch(command){
        case 'Refresh':
            this.forceUpdate()
            break
        }
    }
    onChangeDate(d){
        this.context.router.push("dashboard",{when:this._format(d)})
        this.setState({when:d})
        this.refs.task.dismiss()
    }

    _format(d){
        switch(Math.floor((Date.now()-d.getTime())/(1000*24*60*60))){
            case 0: return 'Today'
            case 1: return 'Yesterday'
            case -1: return 'Tomorrow'
        }
        return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
    }

    _parseDate(when){
        if(typeof(when)!='string'){
            when.setHours(0,0,0,0)
            return when
        }
        var today=new Date()
        today.setHours(0,0,0,0)
        switch(when.toLowerCase()){
        case 'approvings':
            return 'approvings'
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
}
BabyDashboard.contextTypes={router:React.PropTypes.object}

class TaskItem extends Component{
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
        this.context.router.push('task',this.props.model)
    }
}
TaskItem.defaultProps={
    image:"images/task.jpg"
}

class ProvingItem extends TaskItem{}

class TaskQueryCommand extends DialogCommand{
    renderContent(){
        var {when, onChange}=this.props,
            displayDate=when;
        when=='approvings' && (displayDate=new Date(), when=null);
        when && when.setHours(0,0,0,0)
        displayDate && displayDate.setHours(0,0,0,0)

        return [(<List key="others">
                    <List.Item
                        leftAvatar={(<Avatar>A</Avatar>)}
                        onClick={()=>onChange("approvings")}
                        secondaryText="Other families played, need your approval"
                        >
                        Approvings
                    </List.Item>
                    <List.Divider/>
                </List>),
                (<div key="calendar">
                    {/*<Calendar
                        selected={when}
                        displayDate={displayDate}
                        minDate={addDays(displayDate,-31)}
                        maxDate={addDays(displayDate,31)}
                        onDayTouchTap={onChange}
                         />*/}
                </div>)]
    }
}

function addDays(date, days){
    var d=new Date()
    d.setTime(date.getTime()-days*24*60*60*1000)
    return d
}
