import React, {Component, PropTypes} from "react"
import {UI, ENTITIES} from 'qili-app'
import {normalize, arrayOf} from "normalizr"
import {Link} from "react-router"
import {IconButton, AppBar, TextField, Paper} from 'material-ui'

import ReactPullToRefresh from "react-pull-to-refresh"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconThumbup from "material-ui/svg-icons/action/thumb-up"
import IconSearch from "material-ui/svg-icons/action/search"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"
import IconPullRefresh from "material-ui/svg-icons/hardware/keyboard-arrow-down"


import dbKnowledge from 'db/knowledge'
import {relative} from 'components/calendar'
import FloatingAdd from "components/floating-add"
import {getCurrentChild} from "$/selector"
import {ACTION as TASK_ACTION} from "time-manage"
import Assembler from "publish/assemble"

import uiKnowledge from './info'
import extract from './extract'

const {CommandBar, Empty, fileSelector}=UI

const {DialogCommand}=CommandBar

function validate(knowledge){
	let errors=[]
	if(!knowledge.title)
		errors.push(`没有标题`)

	if(!knowledge.content || knowledge.content.length<256)
		errors.push(`需要详细的内容`)

	return errors
}

const DOMAIN="knowledge"
const INIT_STATE={
	knowledges:[]
}
export const ACTION={
    FETCH: (query,done)=>dispatch=>dbKnowledge.find(query)
        .fetch(knowledges=>{
			if(knowledges && knowledges.length){
				let data=normalize(knowledges, arrayOf(dbKnowledge.schema))
				dispatch(ENTITIES(data.entities))
				dispatch({type:`@@${DOMAIN}/fetched`, payload:data.result})
			}
			
			if(done){
				done(knowledges)
			}
        })
    ,SELECT_DOCX: a=>dispatch=>fileSelector.select()
		.then(file=>extract(file))
        .then(docx=>dispatch({type:`@@${DOMAIN}/selectedDocx`,payload:docx}))

    ,CREATE: ()=>(dispatch,getState)=>{
		const state=getState()
		const docx=state.ui.knowledge.selectedDocx
        const {knowledge}=docx

		let errors=validate(knowledge)
		if(errors.length)
			return Promise.reject(errors.join(";"))

		return dbKnowledge.upsert({content:"processing..."}).then(a=>{
			return docx.upload(a).then(uploaded=>{
				return dbKnowledge.upsert({...a, ...uploaded, photos: docx.getPhotos()})
					.then(knowledge=>{
						dispatch(ENTITIES(normalize(knowledge,dbKnowledge.schema).entities))
						dispatch({type:`@@${DOMAIN}/created`})
						return knowledge
					})
			}, a=>{
				dbKnowledge.remove(knowledge)
				return Promise.reject(a)
			})
		})
    }
	,FETCH1: _id=>(dispatch, getState)=>{
		const state=getState()
		dbKnowledge.findOne({_id}, knowledge=>dispatch(ENTITIES(normalize(knowledge,dbKnowledge.schema).entities)))
	}
	,UPDATE: id=>(dispatch, getState)=>{
		const state=getState()
		const docx=state.ui.knowledge.selectedDocx
        const {knowledge:newVersion}=docx

		let errors=validate(newVersion)
		if(errors.length)
			return Promise.reject(errors.join(";"))

		const current=state.entities[dbKnowledge.schema.getKey()][id]

		return docx.upload(current).then(uploaded=>{
			return dbKnowledge.upsert({...current, ...uploaded, photos: docx.getPhotos()})
				.then(knowledge=>{
					dispatch(ENTITIES(normalize(knowledge,dbKnowledge.schema).entities))
					dispatch({type:`@@${DOMAIN}/updated`})
					return knowledge
				})
		})
	}
	,CANCEL: a=>({type:`@@${DOMAIN}/cancel`})
	,TASK: (knowledge)=>dispatch=>dispatch(TASK_ACTION.ADD(knowledge))
	,UNTASK: (knowledge)=>dispatch=>dispatch(TASK_ACTION.REMOVE(knowledge))
	,BUY: ({sale})=>{
		window.open(sale,"superdaddy buy")
		return {type:`@@{DOMAIN}/buy`,payload:knowledge}
	}
	,HOMEWORK: (knowledge, props)=>dispatch=>{
		let assembler=new Assembler({template:knowledge.template, goal:"homework", ...props})
		return assembler.assemble().then(docx=>{
			docx.save(`作业(${knowledge.title}).docx`)
			dispatch({type:`@@{DOMAIN}/homework`,payload: {knowledge,props}})
		})
	}
	,PREVIEW: (knowledge, props)=>dispatch=>{
		let assembler=new Assembler({template:knowledge.template, goal:"print", ...props})
		return assembler.assemble().then(docx=>{
			docx.save(`打印(${knowledge.title}).docx`)
			dispatch({type:`@@{DOMAIN}/preview`,payload: {knowledge,props}})
		})
	}
	,WECHAT: ({title,summary,figure,_id},scene)=>{
		Wechat.share({
				scene:Wechat.Scene[scene]
				,message:{
					title
					,messageExt: summary || title
					,thumb: figure
					,media:{
						type: Wechat.Type.WEBPAGE
						,webpageUrl: `http://static.papazai.com/${_id}.html`
					}
				}
			},a=>1,e=>e)
		return {type:`@@{DOMAIN}/share2wechat`, payload:knowledge}
	}
}

export const REDUCER=(state=INIT_STATE, {type, payload})=>{
    switch(type){
    case `@@${DOMAIN}/fetched`:
        return Object.assign({},state,{knowledges:payload})

    case `@@${DOMAIN}/selectedDocx`:
        if(state.selectedDocx)
            state.selectedDocx.revoke()
        return Object.assign({},state,{selectedDocx:payload})
    case `@@${DOMAIN}/created`:
	case `@@${DOMAIN}/updated`:
	case `@@${DOMAIN}/cancel`:
		if(state.selectedDocx){
            state.selectedDocx.revoke()
			delete state.selectedDocx
			return Object.assign({}, state)
		}
		break

    }
	return state
}

export class Knowledges extends Component{
	state={filter:null}
    componentDidMount(){
        const {location:{query={}}, dispatch}=this.props
        dispatch(ACTION.FETCH(query))
    }

    componentWillReceiveProps(next){
        const {location:{query}}=this.props
        const {location:{query:nextQuery}, dispatch}=next
        if(query.title!=nextQuery.Title)
            dispatch(ACION.FETCH(next.location.query))
    }

    render(){
        const {router,muiTheme:{page:{height}, footbar}}=this.context
        const {knowledges}=this.props
		const {filter}=this.state
        let refSearch=null
        const search=title=>{
			router.replace(encodeURI(`/knowledge?query=${JSON.stringify({title:refSearch.getValue().trim()})}`))
			this.setState({filter:null})
		}
        return (
			<div style={{minHeight:height-footbar.height}}>
				<AppBar
					iconElementLeft={this.getLeftElement()}
					iconElementRight={<IconButton onClick={e=>search()}><IconSearch/></IconButton>}
					title={<TextField ref={a=>refSearch=a}
						hintText="查询"
						onChange={(e,value)=>this.setState({filter:value})}
						onKeyDown={e=>e.keyCode==13 && search()}
						fullWidth={true}/>
					}
					/>
				<ReactPullToRefresh
					style={{textAlign: 'center'}}
					onRefresh={(resolve,reject)=>setTimeout(resolve,3000)}>
					<div className="ptr_content">
						{knowledges.filter(a=>filter ? -1!=a.title.indexOf(filter) : true).map(a=><Item model={a} key={a._id}/>)}
					</div>
				</ReactPullToRefresh>
			</div>
            
        )
    }

	getLeftElement(){
		return (<span/>)
	}

	static contextTypes={
		router:PropTypes.object,
		muiTheme: PropTypes.object
	}

    static Creatable=class extends Knowledges{
        render(){
            const {dispatch}=this.props
            const {router}=this.context
            return (
                <div>
                    <FloatingAdd
                        onClick={e=>dispatch(ACTION.SELECT_DOCX()).then(a=>router.replace('/knowledge/create'))}
                        mini={true}/>
                    {super.render()}
                </div>
            )
        }
    }

	static Course=class extends Knowledges{
		getLeftElement(){
			return (<IconButton onClick={e=>this.context.router.goBack()}><IconBack/></IconButton>)
		}
	}
}

class Search extends DialogCommand{
    renderContent(){
        var {age,gender,category}=this.props.query||{}

        return [
            (<CheckGroup ref="age" key="Age" label="Age (Year)" single={true}
                selected={age}
                items={"0.5, 1, 2, 3, 4, 5, 6, 8, 10".split(',')}/>),
            (<CheckGroup ref="gender" key="Gender" label="Gender"
                selected={gender}
                items={"Girl,Boy".split(',')}/>),
            (<CheckGroup ref="category" key="Category" label="Category"
                selected={category}
                items={"Observe, Study, Sport".split(',')}/>),
            (<div key="actions" style={{padding:10, textAlign:'center'}}>
                <RaisedButton primary={true} onClick={e=>{
						var age=this.refs.age.state.selected,
							gender=Array.from(this.refs.gender.state.selected),
							category=Array.from(this.refs.category.state.selected)

						this.props.onSearch({age,gender,category})
					}}>Search</RaisedButton>
                </div>)
        ]
    }
}

class CheckGroup extends Component{
    constructor(props){
        super(props)
        this.componentWillReceiveProps(this.props)
    }
    componentWillReceiveProps(next){
        var {selected, single}=next
        this.state={}
        if(single)
            this.state.selected=selected;
        else if(Array.isArray(selected)){
            this.state.selected=new Set(selected)
        }else
            this.state.selected=new Set()

    }
    render(){
        var{items, label, onChange, single}=this.props,
            {selected}=this.state,
            selectedStyle={padding:5, borderRight:'1px solid lightgray',
                color:'white',backgroundColor:'red'},
            unselectedStyle=Object.assign({},selectedStyle,{color:'black', backgroundColor:'transparent'});

        return(<div style={{padding:10}}>
                <span>{label}</span>
                <span style={{float:'right',padding:'5px 0px', border:'1px solid lightgray', borderRight:0}}>
                    {items.map(function(a){
                        if(typeof(a)!='string')
                            return a;
                        a=a.trim();
                        return (<span
                            key={a}
                            onClick={()=>this.onSelect(a)}
                            style={(single ? selected==a : selected.has(a)) ? selectedStyle : unselectedStyle}>
                            {a}</span>)
                    }.bind(this))}
                </span>
            </div>)
    }
    onSelect(item, a={}){
        var{single}=this.props,
            {selected}=this.state;

        if(single)
            this.setState({selected: selected==item ? undefined : item});
        else{
            selected[selected.has(item) ? 'delete' : 'add'](item)
            this.setState({selected:selected})
        }
    }

	static defaultProps={single:false}
}

class Item extends Component{
    render(){
        var {model:{photos=[]}}=this.props
        switch(photos.length){
        case 0:
            return this._0photo()
        case 1:
        case 2:
            return this._1photo()
        default:
            return this._3photo()
        }
    }

    _0photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo0" {...others} onClick={()=>this.onDetail()}>
                <div className="title">{model.title}</div>
                <div className="summary">{model.summary}</div>
                {this._more(model)}
            </div>
        )
    }
    _1photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo1" {...others} onClick={()=>this.onDetail()}>
                <div className="layout">
                    <div>
                        <div className="title">{model.title}</div>
                        {this._more(model)}
                    </div>
                    <div className="photos">
                        <div><img src={model.photos[0]}/></div>
                    </div>
                </div>
            </div>
        )
    }

    _3photo(){
        var {model,...others}=this.props
        return (
            <div className="li inset photo3" {...others} onClick={()=>this.onDetail()}>
                <div className="title">{model.title}</div>
                <div className="photos">
                    <div><img src={model.photos[0]}/></div>
                    <div><img src={model.photos[1]}/></div>
                    <div><img src={model.photos[2]}/></div>
                </div>
            {this._more(model)}
            </div>
        )
    }

    _more(model){
        var time=relative(model.createdAt||model.updatedAt)

        var zan=model.zans ? (<div><IconThumbup/>{model.zans}</div>) : null
        return (
            <div className="more">
                <time>{time}</time>
                {zan}
            </div>
        )
    }
    onDetail(){
        this.context.router.push({pathname:`/knowledge/${this.props.model._id}`,state:{knowledge:this.props.model}})
    }
	static contextTypes={router:PropTypes.object}
}


export const Content=({_id, title, content, summary, createdAt, category=[], keywords=[], figure, author})=>{
	content=<div dangerouslySetInnerHTML={{__html:content}}/>

	if(summary && open!==null){
		content=(
			<details open={open}>
				<summary>{summary}</summary>
				{content}
			</details>
		)
	}

	let notNewStuff=null
	if(_id){
		notNewStuff=[
			(<h1 key="link0"><Link to={`/knowledge/${_id}`}>{title}</Link></h1>),
			(<p key="author">
				{author.username} - <time>{relative(createdAt)}</time>
			</p>)
		]
	}else {
		notNewStuff=(<h1 key="link1">{title}</h1>)
	}

	if(figure)
		figure=(<img src={figure}/>)

	return (
		<article>
			<figure>{figure}</figure>
			<header>
				{notNewStuff}
				<p>
					{[...category,...keywords].join(", ")}
				</p>
			</header>
			<section>
				{content}
			</section>
		</article>
	)
}

export default Object.assign(Knowledges,{ACTION, REDUCER})
