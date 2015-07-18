var {React,Component,UI,Router}=require('dashboard'),
    {List, Loading, Empty,Comment,CommandBar,Photo,Messager}=UI,
    {DialogCommand}=CommandBar,
    {Link}=Router,
    {Avatar,Paper, RadioGroup, RadioButton,FontIcon,IconButton,TextField, Tabs, Tab, DatePicker}=require('material-ui'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family'),
    Calendar=require('./components/calendar');

var headerStyle={
        height: 100,
        backgroundColor:'darkorange',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        textAlign:'left',
        fontSize:"xx-large",
        padding:10,
        margin:0
    }
export default class Dashboard extends Component{
    constructor(props){
        super(props)
        var today=new Date(),
            {params:{when=today}}=this.props;
        this.state={when:when}
    }
    render(){
        var {when}=this.state
        when=this._parseDate(when)
        return (
            <div>
                {this._getQuery(when)}
                <CommandBar
                    className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={[
                        <TaskQueryCommand label="task"
                            ref="task" self={()=>this.refs.task}
                            when={when}
                            onChange={this.onChangeDate.bind(this)}/>,
                        "Knowledges",
                        "Refresh",
                        <FamilyCommand label="Family" ref="family" self={()=>this.refs.family}/>]}
                    />
            </div>
        )
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

    _getQuery(when){
        if('approvings'==when)
            return (<QueryApprovings/>)

        var delta=Math.floor((Date.now()-when.getTime())/(1000*24*60*60))

        if(delta>0)
            return (<QueryPast title={this._format(when)} when={when}/>)
        else if(delta<0)
            return (<QueryFuture title={this._format(when)} when={when}/>)
        else
            return (<QueryToday title="Today" when={when}/>)
    }

    onSelect(command,e){
        switch(command){
        case 'Knowledges':
            this.context.router.transitionTo('knowledges')
            break
        case 'Refresh':
            this.setState({refresh:true})
            break
        }
    }
    _format(d){
        if(typeof(d)=='string')
            return d
        switch(Math.floor((Date.now()-d.getTime())/(1000*24*60*60))){
            case 0: return 'today'
            case 1: return 'yesterday'
            case -1: return 'tomorrow'
        }

        return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
    }
    onChangeDate(d){
        this.context.router.transitionTo("dashboard",{when:this._format(d)})
        this.setState({when:d})
        this.refs.task.dismiss()
    }
}
Dashboard.contextTypes={router:React.PropTypes.func}

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
/*
            <Card>
                <CardHeader title={knowledge.title}
                    subtitle={knowledge.author.name}
                    avatar={knowledge.author.thumbnail}/>
                <CardMedia>
                    <img src={task.thumbnail || knowledge.thumbnail || image}>
                </CardMedia>
                <CardActions>
                    <FlatButton label="Start"/>
                    <FlatButton label="Comment"/>
                    <FlatButton label="Share"/>
                </CardActions>
            </Card>
*/
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

class QueryPast extends Component{
    constructor(props){
        super(props)
        this.state={when:this.props.when}
    }
    render(){
        var child=dbFamily.currentChild,
            {title}=this.props,
            {when}=this.state;
        return (
            <List model={dbTask.byDate({when:when})}
                template={TaskItem}
                subheader={title}
                subheaderStyle={headerStyle}
                empty={{text:`You didn't play with ${child.name}`}}
                />
        )
    }
}

class QueryFuture extends QueryPast{
    render(){
        var {title}=this.props,
            child=dbFamily.currentChild,
            {when}=this.state;
        return (
            <List model={dbTask.byDate({when:when})}
                template={TaskItem}
                subheader={title}
                subheaderStyle={headerStyle}
                empty={{text:`Find fun topic right now, and play with ${child.name}`}}
                />
        )
    }
}

class QueryToday extends QueryFuture{
    render(){
        return super.render()
    }
}
QueryToday.defaultProps={title:"Today"}

class QueryApprovings extends Component{
    render(){
        return (
            <List model={dbTask.approvings()}
                loading={{text:"loading approvings"}}
                subheader="Approvings"
                subheaderStyle={headerStyle}
                template={ProvingItem}
                empty={{text:"Nobody played with your children!"}}
            />
        )
    }
}

Dashboard.contextTypes=TaskItem.contextTypes={
    router:React.PropTypes.func
}
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
                        onClick={()=>router.transitionTo("baby",a)}
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
                        onClick={()=>router.transitionTo("baby")}
                        className="mui-font-icon icon-plus"/>}>
                    <span onClick={()=>router.transitionTo("baby")}>I have more children!</span>
                </List.Item>),
            inviter=(
                <List.Item key="inviter"
                    style={{paddingBottom:0,paddingTop:0}}
                    leftAvatar={<span/>}
                    rightToggle={<FontIcon onClick={this.invite.bind(this)}
                        className="mui-font-icon icon-pull-request"/>}>
                    <TextField
                        ref="invite"
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
        //Messager.info("invited "+this.refs.invite.getValue())
    }
}
FamilyCommand.contextTypes={router: React.PropTypes.func}
