var {React,Component,UI,Router}=require('dashboard'),
    {List, Loading, Empty,Comment,CommandBar,DialogCommand,Photo}=UI,
    {Link}=Router,
    {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField, Tabs, Tab, DatePicker}=require('material-ui'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family');

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            todayTasks:null,
            approvings:null,
            child:dbFamily.currentChild
        }
    }
    componentDidMount(){
        dbTask.todayTasks()
            .then(function(data){
                this.setState({todayTasks:data})
            }.bind(this))

        dbTask.approvings()
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
                        subheader={<h3 style={{textAlign:'center'}}>Approvings</h3>}
                        subheaderStyle={{padding:0,backgroundColor:'darkorange'}}
                        model={approvings}
                        template={ProvingItem}/>)
        }else
            approving=(<Loading text="loading approvings"/>)

        return (
            <div>
                <Tabs initialSelectedIndex={1} style={{minHeight:210}}>
                    <Tab label="Yesterday">
                        <List model={dbTask.query({})} template={TaskItem}/>
                    </Tab>
                    <Tab label="Today">
                        <List model={dbTask.query({})} template={TaskItem}/>
                    </Tab>
                    <Tab label="Tomorrow">
                        <List model={dbTask.query({})} template={TaskItem}/>
                    </Tab>
                    <Tab label={<DatePicker hintText="Pick a Date" autoOk={true} style={{width:'100%'}}/>}>
                        <List model={dbTask.query({})} template={TaskItem}/>
                    </Tab>
                </Tabs>
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

}

Dashboard.contextTypes=TaskItem.contextTypes={
    router:React.PropTypes.func
}

class FamilyCommand extends DialogCommand{
    constructor(props){
        super(props)
        this.state={
            child:dbFamily.currentChild,
            children:dbFamily.children
        }
    }
    render(){
        var router=this.context.router,
            {children,child}=this.state,
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
                        onClick={()=>router.transitionTo("family",a)}
                        rightToggle={len>1 ? <RadioButton/> : null}
                        leftAvatar={avatar}>
                        {a.name}
                    </List.Item>
                )
            }),
            appender=(
                <List.Item key={"create"}
                    leftAvatar={<span/>}
                    rightToggle={<FontIcon
                        onClick={()=>router.transitionTo("family")}
                        className="mui-font-icon icon-plus"/>}>
                    <span onClick={()=>router.transitionTo("family")}>I have more children!</span>
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
    shortcutPhoto(child, url){
        dbFamily.upsert(child,{photo:url})
        this.setState({children: dbFamily.children})
    }
    invite(){
        alert("invite")
    }
}
FamilyCommand.contextTypes={router: React.PropTypes.func}
