import React, {PropTypes} from "react"
import {connect} from "react-redux"
import {compose, getContext, withProps, mapProps, withState,withContext,branch,renderComponent} from "recompose"
import {withInit, withQuery, withPagination, withFragment} from "qili/tools/recompose"

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

export const ACTION={
	CURRENT_CHILD: payload=>({
		type:`@@${DOMAIN}/CURRENT_CHILD`,
		payload,
	})
}

function reducer(state={},action){
	const {type,payload}=action
	state=knowledge_reducer(state,action)
	state=plan_reducer(state,action)
	switch(type){
	case `@@${DOMAIN}/CURRENT_CHILD`:
		return {...state, current:payload}
	}

	return state
}

const SuperDaddy=compose(
	withProps(()=>({
		project: require("../package.json"),
		appId:"5746b2c5e4bb3b3700ae1566",
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
		},
		onError(error,dispatch){
			dispatch(qili.ACTION.LOGOUT)
		}
	}),
)(QiliApp)

import Child from "family/child"
import Account from "setting/account"
import Setting from "qili/ui/setting"
import Comment from "qili/components/comment"
import Profile from "qili/ui/user-profile"
import Publish, {Publishes} from "publish"
import Plan from "family/plan"

import {
	Creatable as Knowledges,
	REDUCER as knowledge_reducer,
	NewKnowledge,
	Knowledge,
	} from "knowledge"
import TimeManage, {ScorePad, reducer as plan_reducer, withPlanActions} from "time-manage"

const router=(
	<Router history={hashHistory}>
		<Route path="/" component={compose(
				connect(state=>({hasChild:!!state.superdaddy.current})),
				branch(({hasChild})=>!hasChild,renderComponent(
					compose(
						withProps(({dispatch})=>({
							toChild:child=>{
								dispatch(ACTION.CURRENT_CHILD(child))
							},
						}))
					)(props=>(
						<div>
							<center style={{height:50, color:"lightgray", margin:20}}>
								start from creating your first baby!
							</center>

							<Child.Creator {...props} style={{margin:"0px 100px"}}/>
						</div>))
				))
			)(({children})=><div>{children}</div>)}>

			<IndexRoute component={compose(
				connect(state=>({
					child:state.superdaddy.current,
				})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query src_timeManage_Query($child:ObjectID){
							me{
								child(_id:$child){
									plan{
										...core
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
							toSetting: ()=>router.push('/my/setting'),
							toProfile: ()=>router.push('/my/profile')
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


				<Route path=":id/comment" component={compose(
					withPagination(({params:{id:parent}})=>({
						variables:{parent},
						query: graphql`
							query src_childComments_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
								...src_childComments
							}
						`,
					})),
					withFragment({data:graphql`
						fragment src_childComments on Query{
							comments:child_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"child_comments"){
								edges{
									node{
										id
										content
										type
										createdAt
										author{
											id
											name
											photo
										}
										isOwner
									}
								}
								pageInfo{
									hasPreviousPage
									startCursor
								}
							}
						}
					`}),
					withProps(({params:{id:parent}})=>({
						parent,
						connection:"child_comments"
					})),
					withCurrent(),
				)(Comment)}/>
			</Route>
			<Route path="knowledge">
				<IndexRoute component={compose(
					withState("title","searchByTitle"),
					withPagination(({title,categories,tags})=>({
						variables:{
							title,categories,tags,
						},
						query: graphql`
							query src_knowleges_Query($title:String,$categories:[String],$tags:[String],$count:Int,$cursor:JSON){
								...list
							}
						`
					})),
					getContext({router:PropTypes.object}),
					mapProps(({searchByTitle,router,...others})=>({
						...others,
						search({title}){
							searchByTitle(title)
						},
						goBack:()=>router.goBack(),
						toKnowledge: id=>router.push(`/knowledge/${id}`),
					})),
					withNavigator(),
				)(Knowledges)}/>

				<Route path="create" component={compose(
					connect(state=>({
						selectedDocx:state[DOMAIN].selectedDocx,
						knowledge: state[DOMAIN].selectedDocx && state[DOMAIN].selectedDocx.knowledge,
					})),
					getContext({router:PropTypes.object}),
					withProps(({router})=>({
						toKnowledge: id=>router.replace(`/knowledge/${id}`),
					}))
				)(NewKnowledge)}/>

				<Route path=":id" component={compose(
					getContext({router:PropTypes.object}),
					connect((state,{router,params:{id}})=>({
						child:state.superdaddy.current,
						toComment:()=>router.push(`knowledge/${id}/comment`),
						router:undefined,
					})),
					withQuery(({params:{id},child})=>({
						variables:{id,child},
						query:graphql`
							query src_knowledge_Query($id:ObjectID, $child: ObjectID){
								knowledge(_id:$id){
									...info_knowledge
								}
							}
						`,
					})),
				)(Knowledge)}/>

				<Route path=":id/comment" component={compose(
					withPagination(({params:{id:parent}})=>({
						variables:{parent},
						query: graphql`
							query src_comment_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
								...src_knowledgeComments
							}
						`,
					})),
					withFragment({data:graphql`
						fragment src_knowledgeComments on Query{
							comments:knowledge_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"knowledge_comments"){
								edges{
									node{
										id
										content
										type
										createdAt
										author{
											id
											name
											photo
										}
										isOwner
									}
								}
								pageInfo{
									hasPreviousPage
									startCursor
								}
							}
						}
					`}),
					withProps(({params:{id:parent}})=>({
						parent,
						connection:"knowledge_comments"
					})),
					withCurrent(),
				)(Comment)}/>
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

		</Route>
	</Router>
)

QiliApp.render(<SuperDaddy>{router}</SuperDaddy>)
