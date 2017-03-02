require('../style/index.less')

import React, {Component, PropTypes} from "react"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"
import {User,QiliApp, UI, ENTITIES, compact} from 'qili-app'
import {normalize,arrayOf} from "normalizr"
import {combineReducers} from "redux"
import {connect} from "react-redux"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"
import CheckUpdate from "qili-app/lib/components/check-update"

import {Family,Knowledge,init} from './db'
import {getCurrentChild, getChild, getCurrentChildTasks, getKnowledges, getKnowledge} from "./selector"

const {Empty, Comment, CommandBar, Setting:SettingUI}=UI

import AccountUI from './account'
import BabyUI, {Creator} from './baby'
import PublishUI from './publish'
import TimeManageUI from "./time-manage"
import KnowledgeUI from './knowledge/info'
import NewKnowledgeUI from './knowledge/create'
import KnowledgesUI from './knowledge/'
import KnowledgeComment from "./knowledge/comment"
import ProfileUI from "./profile"

const DOMAIN='superdaddy'

const INIT_STATE={}

export const REDUCER=(state=INIT_STATE,{type,payload})=>{
	switch(type){
	case 'CURRENT_CHILD_CHANGE':
		return Object.assign({},state,{child:payload._id})
	}
	return state
}

const Navigator=({children})=>(
	<div>
		{children}
		<CommandBar className="footbar" style={{zIndex:1}}
			items={[
				{label:"任务", action:"tasks",
					link:"/",
					icon:<IconTask/>},
				{label:"状态", action:"score",
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
	</div>
)

export class SuperDaddy extends Component{
	render(){
		const {dispatch}=this.props
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
						return dispatch(BabyUI.ACTION.FETCH_FAMILY())
				}}>

				<Router history={hashHistory}>
					<Route path="/" component={Navigator}>

						<IndexRoute component={connect(state=>compact(state.qiliApp.user,"_id", "manageMyTime"))(TimeManageUI)}/>

						<Route path="score" component={TimeManageUI.ScorePad}/>

						<Route path="my">
							<IndexRoute component={connect(state=>{
								let children=state.entities.children
								return {babies:children ? Object.keys(children).map(k=>children[k]) : []}
							})(AccountUI)}/>

							<Route path="setting" component={SettingUI} />

							<Route path="profile">
								<IndexRoute component={ProfileUI}/>
							</Route>
						</Route>

						<Route path="baby">
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

						<Route path="knowledge">
							<IndexRoute
								component={connect(state=>({knowledges:getKnowledges(state)}))(KnowledgesUI.Creatable)}/>

							<Route path="create"
								component={connect(state=>compact(state.ui.knowledge.selectedDocx,"knowledge"))(NewKnowledgeUI)}/>

							<Route path=":_id"
								component={connect((state,{params:{_id}})=>({
									knowledge:getKnowledge(state)
									,revising:!!state.ui.knowledge.selectedDocx
									,inTask:!!(getCurrentChildTasks(state)).find(a=>a.knowledge==_id)||!!(getCurrentChildTasks(state,state.qiliApp.user._id)).find(a=>a.knowledge==_id)
									}))(KnowledgeUI)}/>
						</Route>

						<Route path="comment/:type/:_id" component={KnowledgeComment}/>

						<Route path="publish">
							<IndexRoute component={connect(state=>({child:getCurrentChild(state).name}))(PublishUI)}/>
							<Route path="list"
								component={connect(state=>({child:getCurrentChild(state).name}))(PublishUI.List)}/>
						</Route>
					</Route>
				</Router>
            </QiliApp>
        )
	}
}

const StateSuperDaddy=connect()(SuperDaddy)

export const main=QiliApp.render(<StateSuperDaddy/>, {
	[DOMAIN]:REDUCER,
	ui: combineReducers({
		knowledge:KnowledgesUI.REDUCER,
		time:TimeManageUI.reducer
	})
})


/*
import TaskUI from './task'
import SettingUI from './setting'
import TasksUI, {Approvings} from "./tasks"
import ScoreUI from "./score"
import InviteUI from "./invite"
*/


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
