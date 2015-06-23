var {React,Component,UI,Router}=require('dashboard'),
    {List, Loading, Empty,Comment,CommandBar,DialogCommand}=UI,
    {Link}=Router,
    {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField}=require('material-ui'),
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
    static get name(){
        return "Dashboard"
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
                        <List
                            subheader="Today Tasks"
                            model={todayTasks}
                            template={TaskItem}/>
                    </Paper>
                    )
            }else{
                todayTask=(<Empty text="Magic Task"/>)
            }
        }else
            todayTask=(<Loading text="loading tasks"/>);

        if(approvings){
            approving=(<List
                        subheader="Approvings"
                        model={approvings}
                        template={ProvingItem}/>)
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
                <FamilyCommand ref="family"/>
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
    static get name(){
        return "Dashboard._TaskItem"
    }
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
        this.context.router.transitionTo('task',this.props.model)
    }
}
TaskItem.defaultProps={
    image:"images/task.jpg"
}

class ProvingItem extends TaskItem{
    static get name(){
        return "Dashboard._ProvingItem"
    }
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
    static get name(){
        return "Dashboard._FamilyCommand"
    }
    render(){
        var router=this.context.router,
            {children,child}=this.state,
            len=children.length,
            uiChildren=children.map(function(a){
                return (
                    <List.Item key={a._id}
                        onClick={()=>router.transitionTo("family",a)}
                        rightToggle={len>1 ? <RadioButton/> : null}
                        leftAvatar={<Avatar src={a.photo}/>}>
                        {a.name}
                    </List.Item>
                )
            }),
            appender=(
                <List.Item key={"create"}
                    onClick={()=>router.transitionTo("family")}
                    leftAvatar={<span/>}
                    rightToggle={<FontIcon className="mui-font-icon icon-plus"/>}>
                    I have more children!
                </List.Item>),
            inviter=(
                <List.Item key="inviter"
                    style={{paddingBottom:0,paddingTop:0}}
                    leftAvatar={<span/>}
                    rightToggle={<FontIcon onClick={this.invite.bind(this)}
                        className="mui-font-icon icon-pull-request"/>}>
                    <TextField
                        hintText="phone number of relatives invitee"/>
                </List.Item>);

        this.props.children=[(
            <List key="children" subheader="Children">
                {appender}
                {len ? (<List.Divider inset={true}/>) : null}
                {uiChildren}
            </List>),(
            <List key="eldership" subheader="Invite eldership" style={{marginTop:10}}>
                {inviter}
            </List>)];
        return super.render()
    }
    invite(){
        alert("invite")
    }
}
FamilyCommand.contextTypes={router: React.PropTypes.func}
