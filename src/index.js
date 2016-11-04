require('../style/index.less')

import React, {Component, PropTypes} from "react"
import {Route, IndexRoute, Direct, IndexRedirect} from "react-router"
import {User,QiliApp, UI, ENTITIES} from 'qili-app'
import {MenuItem, FloatingActionButton, Avatar} from 'material-ui'
import {normalize,arrayOf} from "normalizr"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

import {Family,Knowledge,Table,init} from './db'

const {Empty, Comment, CommandBar}=UI

const DOMAIN='superdaddy'
const INIT_STATE={}
const ACTION={
	FAMILY_FETCHED: ({children, currentChild, all})=>dispatch=>{
		if(all.length)
			dispatch(ENTITIES(normalize(all,arrayOf(Family.schema)).entities))
		
		if(currentChild)
			dispatch({type:'CURRENT_CHILD_CHANGE',payload:currentChild})
		else
			dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD())
	}
	,CREATE_DEFAULT_FIRST_CHILD: ()=>dispatch=>{
		return Family.upsert({name:""})
			.then(child=>{
				dispatch(ENTITIES(normalize(child,Family.schema).entities))
				dispatch({type:'CURRENT_CHILD_CHANGE',payload:child})	
			})
	}
	,SWITCH_CURRENT_CHILD: ()=>(dispatch,getState)=>{
		const state=getState()
		const children=state.entities.children
		const current=state[DOMAIN].child
		const ids=Object.keys(children)
		let next=ids[(ids.indexOf(current)+1)%ids.length]
		dispatch({type:'CURRENT_CHILD_CHANGE',payload:children[next]})
	}
}

const REDUCER=(state=INIT_STATE,{type,payload})=>{
	switch(type){
	case 'CURRENT_CHILD_CHANGE':
		return Object.assign({},state,{child:payload._id})
	}
	return state
}

class SuperDaddy extends Component{
	render(){
		const {childName, childPhoto, children, routes, initChildName, dispatch}=this.props
		const {router}=this.context
		let contextualStyle={fontSize:"xx-small"}
		if(routes.find(a=>a.contextual===false))
			contextualStyle.display="none"
        return (
            <QiliApp appId="5746b2c5e4bb3b3700ae1566" 
				init={
					()=>init(initChildName)
						.then(a=>dispatch(ACTION.FAMILY_FETCHED(a)))
				}>
				<FloatingActionButton className="sticky top right"
					mini={true}
					style={contextualStyle}
					onClick={e=>dispatch(ACTION.SWITCH_CURRENT_CHILD())}>
					{childPhoto ? (<Avatar src={childPhoto}/>) : childName}
				</FloatingActionButton>

				{children}

                <CommandBar className="footbar"
					items={[
						{label:"我的任务", action:"tasks",
                            onSelect:a=>router.push('/'),
                            icon:<IconTask/>},
                        {label:"成绩", action:"score",
							onSelect:a=>router.push('/score'),
							icon:<IconReward/>},
                        {label:"发现", action:"knowledges",
                            onSelect:a=>router.push('/knowledges'),
                            icon:<IconKnowledges/>},
                        {label:"我", action:"account",
                            onSelect:a=>router.push('/account'),
                            icon:<IconAccount/>}
                        ]}
                    />
            </QiliApp>
        )
	}
	
	static defaultProps={
		childName: PropTypes.object
		,childPhoto: PropTypes.string
		,initChildName: PropTypes.string
	}
	
	static contextTypes={
		router: PropTypes.object
	}
}


/*
class SuperDaddy extends Component{
    constructor(props){
        super(props)
        Object.assign(this.state,{child:null})
        Family.event.on('change',child=>this.setState({child}))
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.children.props.route.contexture
			&& nextState.child!=this.state.child
			&& !this.context.router.isActive(`baby/${nextState.child.name}`)){
			this.context.router.push(`baby/${nextState.child.name}`)
			return false
		}

		return true
    }

    renderContent(){
        let {child}=this.state
		if(!child)
			return (<Empty icon={<Logo/>}><Link to="baby">click to start from your first baby!</Link></Empty>)

        let {contextual, name:routeName}=this.props.children.props.route
        return (
            <div>
				{contextual!=false &&
					(<CurrentChild name={child.name}/>)}

				{this.props.children}

                {routeName&&(<CommandBar className="footbar"
                    primary={routeName}
					items={[
						{label:"我的任务", action:"tasks",
                            onSelect:a=>this.context.router.push(''),
                            icon:<IconTask/>},
                        {label:"成绩", action:"score",
							onSelect:a=>this.context.router.push('score'),
							icon:<IconReward/>},
                        {label:"发现", action:"knowledges",
                            onSelect:a=>this.context.router.push('knowledges'),
                            icon:<IconKnowledges/>},
                        {label:"我", action:"account",
                            onSelect:a=>this.context.router.push('account'),
                            icon:<IconAccount/>}
                        ]}
                    />)}
            </div>
        )
    }
    static contextTypes={
        router:PropTypes.object
    }

    static childContextTypes=Object.assign({
        child: PropTypes.object
    },QiliApp.childContextTypes)

    getChildContext(){
        return Object.assign({
            child:this.state.child
        },super.getChildContext())
    }
}

Object.assign(SuperDaddy.defaultProps,{
    appId:"5746b2c5e4bb3b3700ae1566",
    init:()=>init()
})

class CurrentChild extends Component{
    render(){
        let {name}=this.props
        let {child}=this.context
        return(
            <FloatingActionButton className="contexture sticky top right"
				mini={true}
				style={{fontSize:"xx-small"}}
                onClick={e=>this.change()}>
                {child.photo ? (<Avatar src={child.photo}/>) : name}
            </FloatingActionButton>
        )
    }

    change(){
        var current=this.context.child,
            children=Family.children,
            len=children.length;
        if(len<2)
            return;

        var index=children.indexOf(current)
        Family.currentChild=children[(index+1) % len]
    }
    static contextTypes={child:PropTypes.object}
}


*/
import TaskUI from './task'
import BabyUI, {Creator} from './baby'
import KnowledgesUI from './knowledges'
import KnowledgeUI from './knowledge'
import NewKnowledgeUI from './newKnowledge'
import AccountUI from './account'
import SettingUI from './setting'
import PublishUI from './publish'
import TasksUI, {Approvings} from "./tasks"
import ScoreUI from "./score"
import InviteUI from "./invite"

import DashboardUI from "./dashboard"

import {connect} from "react-redux"

const currentChild=state=>{
	try{
		return state.entities[Family._name][state[DOMAIN].child]
	}catch(e){
		return {
			name:"_default"
		}
	}
}

module.exports=QiliApp.render(
    (<Route path="/" component={connect(a=>({child:currentChild(a)}))(SuperDaddy)}>
		
		<IndexRoute component={connect(a=>({score:currentChild(a).score}))(DashboardUI)}/>
		
        <Route name="tasks" component={TasksUI}/>

        <Route path="score" name="score" component={ScoreUI}/>

        <Route path="knowledges" name="knowledges" contextual={false} component={KnowledgesUI.Creatable}/>

        <Route path="account"  name="account" contextual={false} component={AccountUI} />

        <Route path="task/:_id" contextual={false} component={TaskUI}/>

        <Route path="baby/:name" contexture={true} component={BabyUI}/>
        <Route path="baby" contextual={false} component={Creator}/>

        <Route path="courses">
            <IndexRoute component={KnowledgesUI.Course}/>
            <Route path="done"/>
        </Route>

        <Route path="knowledge">
            <IndexRoute contextual={false} component={NewKnowledgeUI}/>
            <Route path=":_id" component={KnowledgeUI}/>
        </Route>

        <Route path="comment/:type/:_id" component={Comment}/>


        <Route path="setting">
			<IndexRoute  contextual={false}  component={SettingUI}/>
		</Route>

        <Route path="publish" component={PublishUI}>
            <IndexRoute/>
            <Route path=":what"/>
        </Route>

        <Route path="invite" component={InviteUI}/>

    </Route>)
	,[{[DOMAIN]:REDUCER,ui:(a={})=>a}]
)


/**
* quickAction position doesn't change when resizing
* server render ready
    * dom and data retrieving from server should be in componentDidMount
* immutable setState to improve performance
*done: baby feature
    * create first baby
    * delete last baby
    * create baby
    * delete baby
    * Family list update along with baby addition and deletion
*done: Not baby centric
* logo
    * loading
* flux refactor
* form refactor
    *done: auto update: baby, controlled input onchange->setState->onBlur->upsert
* Family list UI
    * remove->dashboard->family list: setState warning, not pure render?
* change child name ->shortcut name should be changed accordingly
*/
