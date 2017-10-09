import React, {PropTypes} from "react"
import {connect} from "react-redux"
import {compose, getContext, withProps,withState,withContext} from "recompose"
import {withInit, withQuery, withPagination} from "qili/tools/recompose"

import {graphql} from "react-relay"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"

import QiliApp, * as qili from "qili-app"
import CheckUpdate from "qili/components/check-update"
import CommandBar from "qili/components/command-bar"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

import withCurrent from "components/current-child"
import withNavigator from "components/navigator"

const DOMAIN="superdaddy"

const ACTION={
	CURRENT_CHILD: payload=>({
		type:`@@${DOMAIN}/CURRENT_CHILD`,
		payload,
	})
}

function reducer(state={},{type,payload}){
	state=knowledge_reducer(...arguments)
	state=plan_reducer(...arguments)
	switch(type){
	case `@@${DOMAIN}/CURRENT_CHILD`:
		return {...state, current:payload}
	}
	
	return state
}

const SuperDaddy=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"596c7a5905d49ec80e48085a",//"5746b2c5e4bb3b3700ae1566",
		reducers:{
			[DOMAIN]:reducer
		}
	})),
	withInit({
		query:graphql`
			query src_prefetch_Query{
				me{
					id
					token
					children{
						id
						name
						photo
					}
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{children, token, id}}=response
			dispatch(qili.ACTION.CURRENT_USER({id,token}))
			if(children && children.length>0){
				dispatch(ACTION.CURRENT_CHILD(children[0].id))
			}
		}
	}),
)(QiliApp)

import Child from "family/child"
import Account from "setting/account"
import Setting from "qili/ui/setting"
//import Profile from "setting/profile"
import Profile from "qili/ui/user-profile"
import Publish, {Publishes} from "publish"
import Plan from "family/plan"

import {
	Creatable as Knowledges, 
	REDUCER as knowledge_reducer,
	NewKnowledge,
	Knowledge,
	} from "knowledge"

const router=(
	<Router history={hashHistory}>
		<Route path="/">
			<IndexRoute component={compose(
				withCurrent(),
				withNavigator(),
			)(()=><div>hello, Not ready yet!</div>)}/>
			
			<Route path="my">
				<IndexRoute component={compose(
					withQuery({
						query:graphql`
							query src_account_Query{
								me{
									...account
								}
							}
						`
					}),
					withProps(({me})=>({data:me})),
					getContext({
						client:PropTypes.object,
						router: PropTypes.object,
					}),
					withProps(({client,router})=>{
						let props={
							toCreate:()=>router.push("/child"),
							toChild: id=>router.push(`/child/${id}`),
						}
						
						let all=client.getAll("Child")
						if(all){
							props.babies=all.map(({id,name})=>({id,name}))
						}
						return props
					}),
					withNavigator(),
				)(Account)}/>
				
				<Route path="setting" component={Setting} />
				<Route path="profile" component={compose(
					withQuery({
						query:graphql`
							query src_profile_Query{
								me{
									id
									username
									birthday
									gender
									location
									photo
									signature
								}
							}
							`,
					}),
					withProps(({me})=>({
						...me,
						birthday: me&&me.birthday ? new Date(me.birthday) : undefined
					})),
				)(Profile)}/>
			</Route>			
			
			<Route path="child">
				<IndexRoute component={compose(
					getContext({router: PropTypes.object}),
					withProps(({router})=>({
						toChild:id=>router.replace(`/child/${id}`),
					})),
				)(Child.Creator)}/>
				<Route path=":id" component={compose(
					withQuery(({params:{id}})=>({
						variables:{id},
						query: graphql`
							query src_child_Query($id:ObjectID){
								me{
									child(_id:$id){
										...child
									}
								}
							}
						`,
					})),
					connect(({superdaddy:{current}})=>({current})),
					getContext({
						client:PropTypes.object,
						router:PropTypes.object,
					}),
					withProps(({me,client,current,dispatch, router,params:{id}})=>({
						id,
						data:me.child,
						switchChild(){
							let all=client.getAll("Child")
							dispatch(ACTION.CURRENT_CHILD(all.length ? all[0].id : null))
						},
						client:undefined,
						current:undefined,
						toMy: ()=>router.replace("/my"),
						toPublish:()=>router.push("/publish"),
						toPlan:()=>router.push("/plan"),
					})),
				)(Child)}/>
			</Route>
			<Route path="knowledge">
				<IndexRoute component={compose(
					withState("title","searchByTitle"),
					withPagination(({title})=>({
						variables:{
							first:10,
							after:{title}
						},
						query: graphql`
							query src_knowleges_Query($first:Int,$after:JSON){
								...list_knowledges
							}
						`,
					})),
					getContext({router:PropTypes.object}),
					withProps(({knowledges,earchByTitle})=>({
						knowledges:knowledges||null,
						search({title}){
							if(title){
								searchByTitle(title)
							}
						},
						goBack:()=>router.goBack(),
						toKnowledge: id=>router.push(`/knowledge/${id}`),
					})),
					withCurrent(),
					withNavigator(),
				)(Knowledges)}/>
				
				<Route path="create" component={compose(
					connect(state=>({
						selectedDocx:state[DOMAIN].selectedDocx,
						knowledge: state[DOMAIN].selectedDocx && state[DOMAIN].selectedDocx.knowledge,
					})),
					getContext({router:PropTypes.object}),
					withProps(({router})=>({
						toKnowledge: id=>router.push(`/knowledge/${id}`),
					}))
				)(NewKnowledge)}/>

				<Route path=":id" component={compose(
					connect(state=>({
						child:state.superdaddy.current,
					})),
					withQuery(({id:_id,child})=>({
						variables:{
							_id,
							child,
						},
						query:graphql`
							query src_knowledge_Query($id:ObjectID, $child: ObjectID){
								knowledge(_id:$id){
									...info_knowledge
								}
							}
						`,
					})),
				)(Knowledge)}/>

			</Route>
			
			<Route path="publish">
				<IndexRoute component={compose(
					getContext({router:PropTypes.object}),
					withProps(({router})=>({
						toList:()=>router.push("/publish/list")
					})),
				)(Publish)}/>
				
				<Route path="list" component={compose(
					connect(state=>({child: state.superdaddy.current})),
					withQuery(({child})=>({
						variables:{child},
						query: graphql`
							query src_publishes_Query($child:ObjectID){
								me{
									child(_id:$child){
										...list_publishes
									}
								}
							}
						`,
					}))
				)(Publishes)}/>
			</Route>
			
			<Route path="plan"  component={compose(
				connect(state=>({child:state.superdaddy.current})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query src_plan_Query($child:ObjectID){
							me{
								child(_id:$child){
									plan{
										...plan
									}
								}
							}
						}
					`,
				})),
				withProps(({me})=>({
					data: me.child.plan
				})),
			)(Plan)}/>
			
			<Route path="task" component={compose(
				connect(state=>({
					child:state.superdaddy.current,
				})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query src_scorepad_Query($child:ObjectID){
							me{
								child(_id:$child){
									plan{
										...core_timeManage
									}
								}
							}
						}
					`,
				})),
				withProps(({me})=>({
					data: me.child.plan,
				})),
				withPlanActions(),
				withContext({actions:PropTypes.object},({actions})=>({actions})),
				withNavigator(),
			)(TimeManage)}/>

			<Route path="score" component={compose(
				connect(state=>({
					child:state.superdaddy.current,
				})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query src_scorepad_Query($child:ObjectID){
							me{
								child(_id:$child){
									plan{
										...scorePad
									}
								}
							}
						}
					`,
				})),
				withProps(({me})=>({
					data: me.child.plan
				})),
				withPlanActions(),
				withContext({actions:PropTypes.object},({actions})=>({actions})),
				withNavigator(),
			)(ScorePad)}/>

		</Route>
	</Router>
)
import TimeManage, {ScorePad, reducer as plan_reducer, withPlanActions} from "time-manage"

QiliApp.render(<SuperDaddy>{router}</SuperDaddy>)