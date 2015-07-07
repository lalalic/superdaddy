var {React,Component,UI,Router}=require('dashboard'),
    {List, Loading, Empty,Comment,CommandBar,DialogCommand,Photo}=UI,
    {Link}=Router,
    {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField, Tabs, Tab, DatePicker}=require('material-ui'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family');

export default class Dashboard extends Component{
    getModel(index, selected, when){
        if(index!=selected)
            return []

        if(selected!=3)
            when=Date.Helper.addDays(new Date(), selected)

        return dbTask.find({when:when})
    }
    render(){
        var child=dbFamily.currentChild,
            {params:{when='today'}}=this.props,
            today=new Date(),
            temp,
            selected=(temp='yesterday,today,tomorrow'.split(',').indexOf(when))==-1 ? 3 : temp;

        return (
            <div>
                <Paper zDepth={2}>
                    <Tabs initialSelectedIndex={selected} style={{minHeight:210}}>
                        <Tab label="Yesterday"
                            onActive={()=>this.onTab(this.refs.yesterday, -1)}>
                            <List ref="yesterday" model={this.getModel(0,selected)} template={TaskItem}
                                empty={{text:`You didn't play with ${child.name}`}}
                                />
                        </Tab>
                        <Tab label="Today"
                            onActive={()=>this.onTab(this.refs.today, 0)}>
                            <List ref="today" model={this.getModel(1,selected)}
                                template={TaskItem}
                                empty={{text:`Find fun topic, and play with ${child.name}`}}
                                />
                        </Tab>
                        <Tab label="Tomorrow"
                            onActive={()=>this.onTab(this.refs.tomorrow,1)}>
                            <List ref="tomorrow"model={this.getModel(2,selected)} template={TaskItem}
                                empty={{text:`Find fun topic, and play with ${child.name}`}}
                                />
                        </Tab>
                        <Tab label={<DatePicker
                                        ref="specifiedDate"
                                        hintText="Pick a Date"
                                        autoOk={true} style={{width:'100%'}}/>}
                            onActive={()=>this.onTab(this.refs.specified, this.refs.specifiedDate.getValue())}>
                            <List ref="specified" model={this.getModel(3,selected,when)} template={TaskItem}
                                empty={{text:`Find fun topic, and play with ${child.name}`}}
                                />
                        </Tab>
                    </Tabs>
                </Paper>

                <List model={dbTask.approvings()}
                    style={{marginTop:10}}
                    loading={{text:"loading approvings"}}
                    subheader="Approvings"
                    subheaderStyle={{padding:0,textAlign:'center'}}
                    template={ProvingItem}
                    />
                <CommandBar
                    className="footbar"
                    items={["Knowledges",
                        "Refresh",
                        <FamilyCommand ref="family" label="Family" self={()=>this.refs.family} />]}
                    onSelect={this.onSelect.bind(this)}
                    />

            </div>
        )
    }

    onTab(list, date){
        date=typeof(date)=='number' ? Date.Helper.addDays(new Date(), date) : date;
        dbTask.find({when: date})
            .fetch(function(data){
                list.setState({data:data})
            })
    }

    onSelect(command,e){
        switch(command){
        case 'Knowledges':
            this.context.router.transitionTo('knowledges')
            break
        case 'Refresh':
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
    renderContent(){
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

            return [(
                <List key="children" subheader="Children">
                    {appender}
                    {len ? (<List.Divider inset={true}/>) : null}
                    {uiChildren}
                </List>),(
                <List key="eldership" subheader="Invite eldership" style={{marginTop:10}}>
                    {inviter}
                </List>)];
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
