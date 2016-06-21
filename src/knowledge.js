import {React,Component, File,UI, User} from 'qili-app'
import {RaisedButton, DatePicker} from 'material-ui'
import {Link} from "react-router"

import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconCancel from "material-ui/svg-icons/navigation/cancel"

import Calendar, {cnDateTimeFormat, addDays, relative, isEqualDate, getLastDayOfMonth} from './components/calendar'
import dbKnowledge from './db/knowledge'
import dbTask from './db/task'

import extract from './parser/extractor'

const {List,Loading,Comment,CommandBar,fileSelector}=UI
const {DialogCommand}=CommandBar

export default class Knowledge extends Component{
    state={entity:null, queued:false}

	getData(_id){
		let {state}=this.props.location
			,{_id:child}=this.props.child
			,status="scheduled"

		if(state && state.knowledge){
			dbTask.find({knowledge:{_id},child,status},tasks=>{
				this.setState({tasks})
			})
			this.setState({entity:state.knowledge})
		}else{
			dbKnowledge.findOne({_id},entity=>{
				dbTask.find({knowledge:{_id},child,status},tasks=>{
					this.setState({tasks})
				})
				this.setState({entity})
			})
		}
	}

    componentDidMount(){
		this.getData(this.props.params._id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params._id!=nextProps.params._id)
            this.getDate(nextProps.params._id)
    }

    componentWillUnmount(){
        this.docx && this.docx.revoke()
    }

    render(){
        var {entity, status, planing, tasks}=this.state

        if(!entity)
            return (<Loading/>)

        var commands=["Back"]
			,now=new Date()
			,scheduled=tasks.map(a=>a.scheduledAt)

        if(true || User.current._id==entity.author._id)
            commands.push({action:"New Version",icon:IconCreate})

        switch(status){
        case 'revising':
            commands.push("Save")
            commands.push({action:"Cancel",
                onSelect:()=>this.setState({entity:this.origin,status:undefined}),
                icon:IconCancel})
        break
        default:
            this.origin=entity
            commands.push({action:"", label:"添加课程", onSelect:e=>this.plan()})

            commands.push(<CommandBar.Comment key="Comment" type={dbKnowledge} model={entity}/>)
            commands.push(<CommandBar.Share key="Share" message={entity}/>)
        }

        return (
            <div className="post">
                <div className="knowledge">
                    {Knowledge.renderContent(entity)}
                </div>

                <CommandBar
                    className="footbar"
                    onSelect={cmd=>this.onSelect(cmd)}
                    items={commands}/>
            </div>
        )
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

	plan(day){
		let {entity}=this.state

		dbTask.plan(entity,day).then(a=>{
			tasks.push(a)
			this.setState({tasks})
		})
	}

    static selectDocx(){
        return fileSelector.select()
            .then(extract,console.error)
    }

    static renderContent(entity, open=true, templateRender){
        var {category=[], keywords=[], figure}=entity,
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'}

        var content=<div dangerouslySetInnerHTML={{__html:entity.content}}/>

        if(entity.summary && open!==null){
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
                (<h1 key="link0"><Link to={`knowledge/${entity._id}`}>{entity.title}</Link></h1>),
                (<p key="author">
                    {entity.author.name} - <time>{relative(entity.createdAt)}</time>
                </p>)
            ]
        }else {
            notNewStuff=(<h1 key="link1">{entity.title}</h1>)
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
}
