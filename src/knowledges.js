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

const {List, CommandBar, Empty}=UI

const {DialogCommand}=CommandBar

export default class Knowledges extends Component{
    state={model:null}

    getData(){
        dbKnowledge.find(this.props.location.query).fetch(model=>{
            this.setState({model})
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        var {model}=this.state,
            {query={}}=this.props.location
        return (
            <div>
                <AppBar
                    iconElementLeft={this.getLeftElement()}
                    iconElementRight={<IconButton onClick={e=>this.search()}><IconSearch/></IconButton>}
                    title={<TextField name="search"
                        hintText="查询"
                        onKeyDown={e=>(e.keycode==13 && this.search(e.target.value))}
                        fullWidth={true} defaultValue={query.title}/>}/>

                <List
                    ref="list"
                    model={model}
                    empty={<Empty icon={<IconKnowledges/>} text="No knowledge yet, Please stay tune"/>}
                    pageSize={20}
                    template={Item}/>
            </div>
        )
    }
	
	getLeftElement(){
		return (<span/>)
	}

    search(props){
        this.refs.search.dismiss()
        var {value:title=""}=ReactDOM.findDOMNode(this.refs.byTitle)
        title=title.trim()
        if(title.length)
            props.title=title
        this.context.router.replace(this.context.router.createPath("knowledges", props))
    }

	static contextTypes={router:PropTypes.object}

    static Creatable=class extends Knowledges{
        render(){
            return (
                <div>
                    <FloatingAdd onClick={e=>this.context.router.push("knowledge")} mini={true}/>
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
        this.context.router.push({pathname:`knowledge/${this.props.model._id}`,state:{knowledge:this.props.model}})
    }
	static contextTypes={router:PropTypes.object}
}
