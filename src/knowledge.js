var {React,Component, File,UI:{List,Loading,Comment,CommandBar,fileSelector},Router:{Link}, User}=require('qili-app'),
    {DialogCommand}=CommandBar,
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task'),
    {RaisedButton}=require('material-ui'),
    extract=require('./extractor');

export default class Knowledge extends Component{
    constructor(props){
        super(props)
        this.state={}
        var {params:{_id:id}}=this.props
        dbKnowledge.findOne({_id:id},(entity)=>this.setState({entity:entity}))
    }


    componentWillReceiveProps (nextProps){
        var {params:{_id:lastId}}=this.props,
            {params:{_id:id}}=nextProps

        if(id!=lastId)
            dbKnowledge.findOne({_id:id},(entity)=>this.setState({entity:entity}))
    }

    componentWillUnmount(){
        this.docx && this.docx.revoke()
    }

    render(){
        var {entity, status, planing}=this.state

        if(!entity)
            return (<Loading/>)

        var commands=["Back"], primary, planCommand;
        if(true || User.current._id==entity.author._id)
            commands.push({action:"New Version",icon:require("material-ui/lib/svg-icons/editor/border-color")})

        switch(status){
        case 'revising':
            commands.push("Save")
            commands.push({action:"Cancel",
                onSelect:()=>this.setState({entity:this.origin,status:undefined}),
                icon:require("material-ui/lib/svg-icons/navigation/cancel")})
            primary="Save"
        break
        default:
            this.origin=entity
            commands.push({action:"Plan", onSelect:()=>this.refs.plan.show()})
            planCommand=(<PlanCommand ref="plan" onDismiss={()=>this.createPlan()}/>)

            commands.push(<CommandBar.Comment key="Comment" type={dbKnowledge} model={entity}/>)
            commands.push(<CommandBar.Share key="Share" message={entity}/>)
            primary="Plan"
        }

        return (
            <div className="post">
                <div className="knowledge">
                    {Knowledge.renderContent(entity)}
                </div>
                <Plan style={{padding:10}} open={planing} entity={entity}/>

                <CommandBar
                    className="footbar"
                    primary={primary}
                    onSelect={this.onSelect.bind(this)}
                    items={commands}/>

                {planCommand}
            </div>
        )
    }

    static renderContent(entity, open=true, templateRender){
        var {category=[], keywords=[]}=entity,
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'},
            template=new extract.Template(entity.content);

        var content=(templateRender||function(tpl){
                var __html=tpl.contents.map((section,i)=>{
                    if(typeof(section)=='string')
                        return section
                    return `
                        <details open="true">
                            <summary>${section.key}</summary>
                            <p>${section.alt}</p>
                        </details>
                    `
                }).join("");
                return <div dangerouslySetInnerHTML={{__html}}/>
            })(template);

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
                <div className="inset">
                    {content}
                </div>
            </div>
        )
    }

    getExperience(){

    }

    onSelect(command){
        switch(command){
        case 'New Version':
            Knowledge.selectDocx()
                .then((docx)=>{
                    this.docx && this.docx.revoke()
                    delete this.docx

                    this.docx=docx
                    var {knowledge}=docx
                    var pending=Object.assign({},this.state.entity,knowledge)
                    this.setState({entity:pending, status:'revising'})
                })
            break
        case 'Save':
            var {entity}=this.state
            this.docx.upload(entity).then((content)=>{
                entity.photos=this.docx.getPhotos()
                entity.content=content
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
        return fileSelector.select()
            .then(extract,console.error)
    }
}

Knowledge.contextTypes={
    router: React.PropTypes.func
}

class Plan extends Component{
    render(){
        var {className,open,...others}=this.props

        return (
            <div className={`${className} ${!open && "hidden" ||""}`} {...others}>

            </div>
        )
    }
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