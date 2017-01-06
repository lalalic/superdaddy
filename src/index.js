require('../style/index.less')

import React, {Component, PropTypes} from "react"
import {Route, IndexRoute, Direct, IndexRedirect} from "react-router"
import {User,QiliApp, UI, ENTITIES, compact, enhancedCombineReducers} from 'qili-app'
import {MenuItem, FloatingActionButton, Avatar, Paper} from 'material-ui'
import {normalize,arrayOf} from "normalizr"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

import {Family,Knowledge,Table,init} from './db'

import CheckUpdate from "qili-app/lib/components/check-update"

const {Empty, Comment, CommandBar}=UI

const DOMAIN='superdaddy'

const INIT_STATE={}


export const ACTION={
	FETCH_FAMILY: a=>(dispatch,getState)=>Family.find({author:User.currentAsAuthor})
		.fetch(all=>{
			if(all.length==0)
				dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD())
			else {
				all=Family.upgrade(all)
				let entities=normalize(all,arrayOf(Family.schema)).entities
				dispatch(ENTITIES(entities))
				if(entities.children){
					let next=entities.children[Object.keys(entities.children)[0]]
					if(next)
						dispatch(ACTION.CURRENT_CHILD_CHANGE(next))
				}
			}
		})
	,CREATE_DEFAULT_FIRST_CHILD: ()=>dispatch=>{
		return Family.upsert({name:"宝宝",targets:{baby:{score:0,totalScore:0}}})
			.then(child=>{
				dispatch(ENTITIES(normalize(child,Family.schema).entities))
				dispatch(ACTION.CURRENT_CHILD_CHANGE(child))
			})
	}
	,SWITCH_CURRENT_CHILD: id=>(dispatch,getState)=>{
		const state=getState()
		const children=state.entities.children
		if(id){
			dispatch(ACTION.CURRENT_CHILD_CHANGE(children[id]))
		}else{
			const current=state[DOMAIN].child
			const ids=Object.keys(children)
			let next=ids[(ids.indexOf(current)+1)%ids.length]
			dispatch(ACTION.CURRENT_CHILD_CHANGE(children[next]))
		}
	}
	,CURRENT_CHILD_CHANGE: child=>({type:'CURRENT_CHILD_CHANGE',payload:child})
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
		const {children, routes, dispatch}=this.props
		const {router}=this.context
		let contextualStyle={fontSize:"xx-small"}
		if(routes.find(a=>a.contextual===false))
			contextualStyle.display="none"
        return (
            <QiliApp appId="5746b2c5e4bb3b3700ae1566"
				project={require("../package.json")}
				tutorial={[
					{
						media:"images/tutorial/time.png",
						title:"任务管理"
					},
					{
						media:"images/tutorial/score.png",
						title:"正面激励"
					},
					{
						media:"images/tutorial/knowledge.png",
						title:"知识查询"
					}
				]}
				init={a=>{
						init()
						dispatch(ACTION.FETCH_FAMILY())
				}}>

				{children}

                <CommandBar className="footbar" style={{zIndex:1}}
					items={[
						{label:"任务管理", action:"tasks",
							link:"/",
                            icon:<IconTask/>},
						{label:"成绩", action:"score",
							link:'/score',
							icon:<IconReward/>},
						{label:"发现", action:"knowledges",
							link:'/knowledge',
							icon:<IconKnowledges/>},

                        {label:"我", action:"my",
                            link:'/my',
                            icon:<CheckUpdate><IconAccount/></CheckUpdate>}
                        ]}
                    />
            </QiliApp>
        )
	}
	static contextTypes={
		router: PropTypes.object
	}
}

/*
import TaskUI from './task'
import SettingUI from './setting'
import PublishUI from './publish'
import TasksUI, {Approvings} from "./tasks"
import ScoreUI from "./score"
import InviteUI from "./invite"
*/

import AccountUI from './account'
import BabyUI, {Creator} from './baby'

import TimeManageUI from "./time-manage"

import KnowledgeUI from './knowledge/info'
import NewKnowledgeUI from './knowledge/create'
import KnowledgesUI from './knowledge/'
import KnowledgeComment from "./knowledge/comment" 

import {connect} from "react-redux"
import {getCurrentChild, getChild, getCurrentChildTasks, getKnowledges, getKnowledge} from "./selector"

import Test from "./test"

const {Setting:SettingUI, Profile: ProfileUI}=UI

module.exports=QiliApp.render(
    (<Route path="/" component={connect()(SuperDaddy)}>

		<Route path="score" component={TimeManageUI.ScorePad}/>

		<Route path="my" contextual={false}>
			<IndexRoute component={connect(state=>({babies:Object.values(state.entities.children)}))(AccountUI)}/>

			<Route path="setting" component={SettingUI} />

			<Route path="profile">
				<IndexRoute component={ProfileUI}/>
			</Route>
		</Route>



		<Route path="baby" contextual={false}>
			<IndexRoute component={connect()(Creator)}/>

			<Route path=":id"
				component={connect((state,{params:{id}})=>{
					let child=getChild(state,id)
					let target=(child.targets||{})["baby"]
					let info={...compact(child,"name","photo","bd","gender"),...compact(target,"todo","goal","score","totalScore")}
					info.isCurrent=child==getCurrentChild(state)
					return info
				})(BabyUI)}/>
		</Route>

		<IndexRoute component={connect(state=>compact(state.qiliApp.user,"_id"))(TimeManageUI)}/>

		<Route path="knowledge">
			<IndexRoute contextual={false}
				component={connect(state=>({knowledges:getKnowledges(state)}))(KnowledgesUI.Creatable)}/>

			<Route path="create"
				contextual={false}
				component={connect(state=>compact(state.ui.knowledge.selectedDocx,"knowledge"))(NewKnowledgeUI)}/>

			<Route path=":_id"
				component={connect((state,{params:{_id}})=>({
					knowledge:getKnowledge(state)
					,revising:!!state.ui.knowledge.selectedDocx
					,inTask:!!(getCurrentChildTasks(state)).find(a=>a.knowledge==_id)||!!(getCurrentChildTasks(state,state.qiliApp.user._id)).find(a=>a.knowledge==_id)
					}))(KnowledgeUI)}/>
		</Route>

		<Route path="comment/:type/:_id" component={KnowledgeComment}/>

		<Route path="test" component={Test}/>

	{/*
        <Route name="tasks" component={TasksUI}/>

        <Route path="score" name="score" component={ScoreUI}/>

        <Route path="account"  name="account" contextual={false} component={AccountUI} />

        <Route path="task/:_id" contextual={false} component={TaskUI}/>

        <Route path="courses">
            <IndexRoute component={KnowledgesUI.Course}/>
            <Route path="done"/>
        </Route>



        <Route path="publish" component={PublishUI}>
            <IndexRoute/>
            <Route path=":what"/>
        </Route>

        <Route path="invite" component={InviteUI}/>
*/}
    </Route>)
	,[
		{[DOMAIN]:REDUCER}
		,{ui: enhancedCombineReducers({
			knowledge:KnowledgesUI.REDUCER
			,time:TimeManageUI.reducer
		})}
	]
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
