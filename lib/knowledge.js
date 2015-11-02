var {React,Component, File,UI:{List,Loading,Comment,CommandBar,selectFile},Router:{Link}, User}=require('dashboard'),
    {DialogCommand}=CommandBar,
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task'),
    {RaisedButton}=require('material-ui'),
    extract=require('./extractor');

class Plan extends Component{
    render(){
        var {className,open,...others}=this.props

        return (
            <div className={`${className} ${!open && "hidden" ||""}`} {...others}>

            </div>
        )
    }
}

export default class Knowledge extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentWillMount(){
        var id=this.props.params._id
        dbKnowledge.findOne({_id:id},(entity)=>this.setState({entity:entity}))
    }

    componentWillUnmount(){
        this.docx && this.docx.invoke()
    }

    render(){
        var {entity, status, planing}=this.state

        if(!entity)
            return (<Loading/>)

        var commands=["Back"], primary;
        if(true || User.current._id==entity.author._id)
            commands.push({action:"New Version",icon:require("material-ui/lib/svg-icons/editor/border-color")})

        switch(status){
            case 'revising':
                commands.push("Save")
                commands.push({action:"Cancel",icon:require("material-ui/lib/svg-icons/navigation/cancel")})
                primary="Save"
            break
            default:
                this.origin=entity
                commands.push(<PlanCommand key="Plan" label="Plan" ref="plan"
                        onDismiss={this.createPlan.bind(this)}
                        self={()=>this.refs.plan}/>)
                commands.push(<CommandBar.Comment key="Comment" type={dbKnowledge} model={entity}/>)
                commands.push(<CommandBar.Share key="Share" message={entity}/>)
                primary="Plan"
        }


        return (
            <div className="post">
                {Knowledge.renderContent(entity)}
                <Plan style={{padding:10}} open={planing} entity={entity}/>

                <CommandBar
                    className="footbar"
                    primary={primary}
                    onSelect={this.onSelect.bind(this)}
                    items={commands}/>
            </div>
        )
    }

    static renderContent(entity, open=true){
        var {category=[], keywords=[]}=entity,
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'}

        var content=(<div className="knowledge" dangerouslySetInnerHTML={{__html:entity.content}} />)
        if(entity.summary){
            content=(
                <details style={{padding:10}} open={open}>
                    <summary>{entity.summary}</summary>
                    {content}
                </details>
            )
        }

        var notNewStuff
        if(entity._id){
            notNewStuff=[
                (<li key="link"><Link to={`/knowledge/${entity._id}`}>{entity.title}</Link></li>),
                (<li key="author" style={sencondaryStyle}>
                    {entity.author.name} - <time>{entity.createdAt}</time>
                </li>)
            ]
        }else {
            notNewStuff=(<li key="link">{entity.title}</li>)
        }

        return (
            <div>
                <h1 style={{padding:10}}>
                    <ul style={{listStyle:'none',margin:0, padding:0}}>
                        {notNewStuff}
                        <li style={sencondaryStyle}>
                            {category.join(", ")} {keywords.join(", ")}
                        </li>
                    </ul>
                </h1>

                {content}
            </div>
        )
    }

    getExperience(){

    }

    onSelect(command){
        switch(command){
        case 'Plan':
            this.refs.plan.show()
            break
        case 'New Version':
            Knowledge.selectDocx()
                .then((docx)=>{
                    this.docx && this.docx.invoke()
                    delete this.docx

                    this.docx=docx
                    var {knowledge}=docx
                    var pending=Object.assign({},this.state.entity,knowledge)
                    this.setState({entity:pending, status:'revising'})
                })
            break
        case 'Cancel':
            this.setState({entity:this.origin,status:undefined})
            break
        case 'Save':
            this.docx.upload(this.state.entity).then((content)=>{
                this.state.entity.content=content
                dbKnowledge.upsert(this.state.entity, this.origin,
                    ()=>this.setState({status:undefined}))
            })
            break
        }
    }

    createPlan(){
        var {entity}=this.state,
            {selectedDays}=this.refs.plan.state

        dbTask.plan(entity,selectedDays)
    }

    static selectDocx(){
        return selectFile('raw')
            .then(extract,console.error)
    }
}

Knowledge.contextTypes={
    router: React.PropTypes.func
}

class PlanCommand extends CommandBar.DialogCommand{
    constructor(props){
        super(props)
        this.state={
            selectedDays:[]
        }
    }
    renderContent(){
        var everydays="week,weekend,weekday,month".split(",").map(function(a){
                return (<RaisedButton key={a} onClick={()=>this.selectDays(a)}>{a}</RaisedButton>)
            }.bind(this)),
            now=new Date(),
            Calendar=require('./components/calendar'),
            {selectedDays}=this.state;

        return [(<div key="everydays" style={{textAlign:'center',padding:10}}>{everydays}</div>),
                (<div key="calender">
                    <Calendar
                        ref="calendar"
                        minDate={now}
                        maxDate={Date.Helper.addDays(now,31)}
                        displayDate={now} />
                </div>)]
    }

    selectDays(a){

    }
}
