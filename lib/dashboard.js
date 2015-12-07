var {React,Component,UI,Router}=require('qili-app'),
    {List, Loading, Empty,Comment,CommandBar,Photo,Messager,Icons}=UI,
    {DialogCommand}=CommandBar,
    {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField, Tabs, Tab, DatePicker}=require('material-ui'),
    {Task:dbTask,Family:dbFamily}=require('./db'),
    Calendar=require('./components/calendar'),
    Logo=require('./icons/logo');

var IconKnowledges=require("material-ui/lib/svg-icons/communication/dialpad"),
    IconBaby=IconKnowledges

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
class AuthorDashboard extends Component{
    render(){
        return (
            <div>
                <Empty text="Start from your first baby!"
                    icon={<Logo/>}
                    onClick={()=>this.context.router.transitionTo("baby")}/>
                <CommandBar
                    className="footbar"
                    primary="Family"

                    items={[
                        {action:"Knowledges",
                            onSelect:()=>this.context.router.transitionTo('knowledges'),
                            icon:IconKnowledges},
                        {action:"Family",
                            onSelect:()=>this.refs.family.show(),
                            icon:require("material-ui/lib/svg-icons/action/supervisor-account")},
                        {action:"setting", label:"Account",
                            onSelect:()=>this.context.router.transitionTo('account'),
                            icon: require('material-ui/lib/svg-icons/action/account-box')}
                        ]}
                    />
                <FamilyCommand ref="family"/>
            </div>)
    }
}
AuthorDashboard.contextTypes={router:React.PropTypes.func}

/**
@ with currentChild
*/
class BabyDashboard extends Component{
    constructor(props){
        super(props)
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
        return (
            <div>
                {this.renderContent(when)}
                <CommandBar
                    className="footbar"
                    primary="Knowledges"
                    onSelect={()=>this.onSelect()}
                    items={[
                        {action:"Task",
                            onSelect:()=>this.refs.task.show(),
                            icon:require("material-ui/lib/svg-icons/editor/format-list-numbered")},
                        {action:"Publish",
                            onSelect:()=>this.context.router.transitionTo('publish'),
                            icon:require("material-ui/lib/svg-icons/image/camera-roll")},
                        {action:"Knowledges",
                            onSelect:()=>this.context.router.transitionTo('knowledges'),
                            icon:IconKnowledges},
                        {action:"Family",
                            onSelect:()=>this.refs.family.show(),
                            icon:require("material-ui/lib/svg-icons/action/supervisor-account")},
                        {action:"setting", label:"Account",
                            onSelect:()=>this.context.router.transitionTo('account'),
                            icon: require('material-ui/lib/svg-icons/action/account-box')}
                        ]}
                    />
                <TaskQueryCommand ref="task" when={when} onChange={()=>this.onChangeDate()}/>
                <FamilyCommand ref="family" child={this.props.child}/>
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
                        onTouchTap={()=>this.context.router.transitionTo('knowledges')} />)
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
        this.context.router.transitionTo("dashboard",{when:this._format(d)})
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
            return Date.Helper.addDays(today,-1)
        case 'tomorrow':
            return Date.Helper.addDays(today,1)
        default:
            when=new Date(Date.parse(when))
            when.setHours(0,0,0,0)
            return when
        }
    }
}
BabyDashboard.contextTypes={router:React.PropTypes.func}

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
        this.context.router.transitionTo('task',this.props.model)
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
                    <Calendar
                        selected={when}
                        displayDate={displayDate}
                        minDate={Date.Helper.addDays(displayDate,-31)}
                        maxDate={Date.Helper.addDays(displayDate,31)}
                        onDayTouchTap={onChange}
                         />
                </div>)]
    }
}



class FamilyCommand extends DialogCommand{
    renderContent(){
        var router=this.context.router,
            {child={}}=this.props,
            children=dbFamily.children,
            len=children.length,
            uiChildren=children.map(function(a){
                var avatar;
                if(a.photo)
                    avatar=(<Avatar src={a.photo}/>)
                else{
                    let photo=(<Photo
                        onPhoto={(url)=>this.shortcutPhoto(a,url)}
                        iconRatio={2/3} width={40} height={40}/>)

                    avatar=(<Avatar icon={photo}/>)
                }

                return (
                    <List.Item key={a._id}
                        onClick={()=>router.transitionTo("baby",dbFamily.currentChild=a)}
                        leftAvatar={avatar}>
                        {a.name}
                    </List.Item>
                )
            }),
            appender=(
                <List.Item key="create"
                    onClick={()=>router.transitionTo("baby")}
                    leftAvatar={<Avatar>+</Avatar>} >
                    I have more children!
                </List.Item>),
            inviter=(
                <List.Item key="inviter"
                    style={{paddingBottom:0,paddingTop:0,textAlign:'left'}}
                    rightAvatar={<Avatar onClick={this.invite.bind(this)}>+</Avatar>} >
                        <input
                            style={{width:'54%',marginRight:2, border:0, borderBottom:'1px solid #eee', padding:5}}
                            ref="id"
                            placeholder="手机号/登录账号"/>

                        <input
                            style={{width:'45%',border:0, borderBottom:'1px solid #eee', padding:5}}
                            ref="relationship"
                            placeholder={`与${child.name||'宝宝'}的关系`}/>
                </List.Item>);

            return [(
                <List key="children">
                    {uiChildren}
                    {len ? (<List.Divider inset={true}/>) : null}
                    {appender}
                </List>),(
                <List key="invite" subheader="邀请家人" style={{marginTop:5}}>
                    {inviter}
                </List>)];
    }
    shortcutPhoto(child, url){
        dbFamily.upsert(child,{photo:url})
    }
    invite(){
        var {id, relationship}=this.refs
        id=id.getDOMNode().value
        relationship=relationship.getDOMNode().value

        if(id && relationship){
            dbFamily.invite(id, relationship)
                .then(function(){

                })
        }
    }
}
FamilyCommand.contextTypes={router: React.PropTypes.func}
