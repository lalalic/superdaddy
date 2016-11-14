import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import ReactDOM from "react-dom"
import {IconButton, AppBar, TextField} from 'material-ui'

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconThumbup from "material-ui/svg-icons/action/thumb-up"
import IconSearch from "material-ui/svg-icons/action/search"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import dbKnowledge from './db/knowledge'
import uiKnowledge from './knowledge'
import {relative} from './components/calendar'
import FloatingAdd from "./components/floating-add"

const {CommandBar, Empty}=UI

const {DialogCommand}=CommandBar

const DOMAIN="knowledge"
const INIT_STATE={
    query:{
        title:""
    }
    ,knowledges:[]
}
export const ACTION={
    FETCH: query=>dispatch=>dbKnowledge.find(query)
        .fetch(knowledges=>{
            dispatch({type:`@@${DOMAIN}/fetched`, payload:{query,knowledges}})
        })
    ,SELECT_DOCX: a=>dispatch=>uiKnowledge.selectDocx()
        .then(docx=>dispatch({type:`@@${DOMAIN}/selectedDocx`,payload:docx}))

    ,CREATE: docx=>dispatch=>{
        const {entity}=docx
        entity.content=""
        return dbKnowledge.upsert(entity).then(a=>{
            return docx.upload(entity).then(content=>{
                entity.photos=docx.getPhotos()
                entity.content=content
                return dbKnowledge.upsert(entity)
            }, a=>{
                dbKnowledge.remove(entity)
                return a
            })
        })
    }
    ,CLEAR: {type:`@@${DOMAIN}/clear`}
}

export const REDUCER=(state=INIT_STATE, {type, payload})=>{
    switch(type){
    case `@@${DOMAIN}/fetched`:
        return Object.assign({},state,payload)
    case `@@${DOMAIN}/selectedDocx`:
        if(state.selectedDocx)
            state.selectedDocx.revoke()
        return Object.assign({},state,{selectedDocx:payload})
    case `@@${DOMAIN}/clear`:
        if(state.selectedDocx){
            state.selectedDocx.revoke()
            delete state.selectedDocx
        }
        return state
    default:
        return state
    }
}

export class Knowledges extends Component{
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
        const {router}=this.context
        const {knowledges}=this.props
        let refSearch=null
        const search=title=>router.replace(`/knowledge?`+JSON.stringify({title:refSearch.getValue().trim()}))
        return (
            <div>
                <AppBar
                    iconElementLeft={this.getLeftElement()}
                    iconElementRight={<IconButton onClick={e=>search()}><IconSearch/></IconButton>}
                    title={<TextField ref={a=>refSearch=a}
                        hintText="查询"
                        onKeyDown={e=>(e.keycode==13 && search())}
                        fullWidth={true}/>
                    }
                    />

                <div>
                    {knowledges.map(a=><Item model={a} key={a._id}/>)}
                </div>
            </div>
        )
    }

	getLeftElement(){
		return (<span/>)
	}

	static contextTypes={router:PropTypes.object}

    static Creatable=class extends Knowledges{
        render(){
            const {dispatch}=this.props
            const {router}=this.context
            return (
                <div>
                    <FloatingAdd
                        onClick={e=>dispatch(ACTION.SELECT_DOCX()).then(router.push("/knowledge/create"))}
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

export default Object.assign(Knowledges,{ACTION, REDUCER})
