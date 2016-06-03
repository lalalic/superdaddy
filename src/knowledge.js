var {React,Component, File,UI:{List,Loading,Comment,CommandBar,fileSelector},Router:{Link}, User}=require('qili-app'),
    {DialogCommand}=CommandBar,
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task'),
    {RaisedButton}=require('material-ui'),
    extract=require('./parser/extractor'),
	Template=require("./parser/template");

import moment from "moment"

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
	
	static date2String(d){
		if(!d) return ""
		var now=moment(),date=moment(d)	
        return date.format(now.isSame(date,"day") ? "今天 HH:MM" : now.isSame(date, "year") ? "MM月DD日" : "YYYY年MM月DD日")
	}

    static renderContent(entity, open=true, templateRender){
        var {category=[], keywords=[], figure="http://n.sinaimg.cn/transform/20150716/cKHR-fxfaswi4039085.jpg"}=entity,
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'},
            template=new Template(entity.content);

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
                <details open={open}>
                    <summary>{entity.summary}</summary>
                    {content}
                </details>
            )
        }

        var notNewStuff
        if(entity._id){
            notNewStuff=[
                (<h1 key="link"><Link to={`/knowledge/${entity._id}`}>{entity.title}</Link></h1>),
                (<p key="author">
                    {entity.author.name} - <time>{Knowledge.date2String(entity.createdAt)}</time>
                </p>)
            ]
        }else {
            notNewStuff=(<h1 key="link">{entity.title}</h1>)
        }
		
		if(figure)
			figure=(<img src={figure}/>)
		
		return (
			<article>
				<figure>{figure}</figure>
				<header>
					{notNewStuff}
					<p>
						{category.join(", ")} {keywords.join(", ")}
					</p>
				</header>
				<section>
					{content}
				</section>
			</article>
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
