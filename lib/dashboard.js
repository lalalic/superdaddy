var {React,Component,UI,Router}=require('dashboard'),
    {List, Loading, Empty,Comment,CommandBar,DialogCommand}=UI,
    {Link}=Router,
    {Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField}=require('material-ui'),
    Tasks=require('./db/task'),
    Family=require('./db/family');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            todayTasks:null,
            approvings:null,
            child:Family.currentChild
        }
    }

    componentDidMount(){
        Tasks.todayTasks()
            .then(function(data){
                this.setState({todayTasks:data})
            }.bind(this))

        Tasks.approvings()
            .then(function(data){
                this.setState({approvings:data})
            }.bind(this))
    }

    render(){
        var depth=1
        var {todayTasks,approvings,children}=this.state;

        var todayTask, approving;

        if(todayTasks){
            if(todayTasks.length){
                todayTask=(
                    <Paper zDepth={depth}>
                        <h1 style={{textAlign:"center"}}>Today Task</h1>
                        <List model={todayTasks} template={TaskItem}/>
                    </Paper>
                    )
            }else{
                todayTask=(<Empty text="Magic Task"/>)
            }
        }else
            todayTask=(<Loading text="loading tasks"/>);

        if(approvings){
            approving=(
                <div>
                    <h2 style={{textAlign:"center"}}>Approvings</h2>
                    <List model={approvings} template={ProvingItem}/>
                </div>)
        }else
            approving=(<Loading text="loading approvings"/>)

        return (
            <div>
                {todayTask}
                {approving}
                <CommandBar
                    className="footbar"
                    items={["Knowledges", "More", "Family"]}
                    onSelect={this.onSelect.bind(this)}
                    />
                <FamilyCommand
                    ref="family"/>
            </div>
        )
    }

    onSelect(command,e){
        if(this.refs.family.state.open){
            this.refs.family.dismiss()
            e.preventDefault()
            e.stopPropagation()
            return false
        }
        switch(command){
        case 'Knowledges':
            this.context.router.transitionTo('knowledges')
            break
        case 'Family':
            this.refs.family.show()
            break
        }
    }
}

class TaskItem extends Component{
    render(){
        var {model, image, actions, ...others}=this.props;
        return (
            <div className="li">
                <div className="content" onClick={this.onDetail.bind(this)}>
                    <div>
                        <h4>{model.knowledge.title}</h4>
                    </div>
                    <div className="photo">
                        <img src={model.photo||image}/>
                    </div>
                </div>
            </div>
        )
    }
    onDetail(){
        this.context.router.transitionTo('knowledge',this.props.model.knowledge)
    }
}
TaskItem.defaultProps={
    image:"images/task.jpg"
}

class ProvingItem extends TaskItem{

}

Main.contextTypes=TaskItem.contextTypes={
    router:React.PropTypes.func
}

class FamilyCommand extends DialogCommand{
    constructor(props){
        super(props)
        this.state={
            child:Family.currentChild,
            children:Family.children
        }
    }
    render(){
        if(children && children.length){
            var path=this.context.router.makePath
            quickActions.push({text:'children',type:MenuItem.Types.SUBHEADER})
            children.forEach(function(child){
                quickActions.push({text:child.name,route:path('family',child)})
            }.bind(this))
        }
        var {children,child}=this.state
        var uiChildren=children.map(function(a,i){
            return (<li key={a._id}>
                <Link to="family" params={a}>
                    <img src={a.photo}/>
                    <span>{a.name}</span>
                </Link>
                <RadioButton
                    name="currentChild"
                    value={a._id}/>
            </li>)
        })

        var appender=(<li>
                <Link to="family" params={{_id:"create"}}>
                    <FontIcon
                        className="icon-no"/>
                    <span>More Child</span>
                </Link>
                <span>
                    <IconButton
                        iconClassName="icon-plus"
                        />
                </span>
            </li>)

        var inviter=(<li>
                <TextField
                    hintText="phone number of relatives invitee"
                    />
                <span>
                    <IconButton
                        iconClassName="icon-pull-request"
                        onClick={this.invite.bind(this)}
                        />
                </span>
            </li>)

        this.props.children=(<ul className="families">
                {uiChildren}
                {appender}
                {inviter}
            </ul>)
        return super.render()
    }
    invite(){

    }
}
