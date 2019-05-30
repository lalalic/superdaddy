import React ,{Fragment}from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {graphql} from "react-relay"
import {Router, Route, IndexRoute, hashHistory} from "react-router"

import {compose, getContext, withProps, mapProps,
	withContext,branch,renderComponent} from "recompose"
import {withInit, withQuery, withPagination, withFragment,
	Account, Comment,
	QiliApp, ACTION as qiliACTION} from "qili-app"

import withCurrent from "components/current-child"
import withNavigator from "components/navigator"
import project from "../package.json"
import {DOMAIN, reducer, ACTION} from "./state"

import Child from "family/child"
import My from "setting/account"
import Publish, {Publishes} from "publish"
import Plan from "family/plan"
import {Creatable as Knowledges,NewKnowledge,Knowledge} from "knowledge"
import TimeManage, {ScorePad, withPlanActions} from "time-manage"
import Goods from "./good"

export const routes=(
	<Router history={hashHistory}>
		<Route path="/" component={compose(
				connect(state=>({hasChild:!!state.superdaddy.current})),
				branch(({hasChild})=>!hasChild,renderComponent(
					compose(
						withProps(({dispatch})=>({
							toChild:child=>{
								dispatch(ACTION.CURRENT_CHILD(child))
							},
							name:`宝宝`,
						}))
					)(props=>(
						<Fragment>
							<Child.Creator {...props} style={{margin:"0px 100px"}}/>
						</Fragment>))
				))
			)(({children})=><Fragment>{children}</Fragment>)}>

			<IndexRoute component={compose(
				withNavigator(),
				connect(state=>({
					child:state.superdaddy.current,
				})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query superdaddy_timeManage_Query($child:ObjectID){
							me{
								child(_id:$child){
									name
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
			)(TimeManage)}/>

			<Route path="score" component={compose(
				withNavigator(),
				connect(state=>({
					child:state.superdaddy.current,
				})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query superdaddy_scorepad_Query($child:ObjectID){
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
					data: me.child.plan,
				})),
				withPlanActions(),
				withContext({actions:PropTypes.object},({actions})=>({actions})),

			)(ScorePad)}/>

			<Route path="my/goods" component={compose(
				withQuery(()=>({
					query: graphql`
						query superdaddy_good_Query{
							me{
								goods{
									...good
								}
							}
						}
					`
				})),
				withProps(({me})=>({data:me.goods})),
			)(Goods)}/>

			{Account.routes({
				account:compose(
					withNavigator(),
					withQuery({
						query:graphql`
							query superdaddy_account_Query{
								user:me{
									...account_user
								}
							}
						`
					}),
					getContext({
						router: PropTypes.object,
					}),
					withProps(({router})=>{
						let props={
							toCreate:()=>router.push("/child"),
							toChild: id=>router.push(`/child/${id}`),
							toSetting: ()=>router.push('/my/setting'),
							toProfile: ()=>router.push('/my/profile'),
							toGoals: ()=>router.push('/my/goods'),
						}
						return props
					})
				)(My),
				profileQL:graphql`
					query superdaddy_profile_Query{
						user:me{
							...qili_profile_user
						}
					}
				`
			})}

			<Route path="child">
				<IndexRoute component={compose(
					getContext({router: PropTypes.object}),
					withProps(({router})=>({
						toChild:id=>router.replace(`/child/${id}`)
					})),
				)(Child.Creator)}/>

				<Route path=":id" component={compose(
					withQuery(({params:{id}})=>({
						variables:{id},
						query: graphql`
							query superdaddy_child_Query($id:ObjectID){
								me{
									child(_id:$id){
										...child
									}
								}
							}
						`,
					})),
					getContext({
						client:PropTypes.object,
						router:PropTypes.object,
						store: PropTypes.object
					}),
					withProps(({me,client,store, router,params:{id}})=>({
						id,
						data:me.child,
						switchChild(){
							let all=client.getAll("Child")
							store.dispatch(ACTION.CURRENT_CHILD(all.length ? all[0].id : null))
						},
						client:undefined,
						toMy: ()=>router.replace("/my"),
						toPublish:()=>router.push("/publish"),
						toPlan:()=>router.push("/plan"),
					})),
				)(Child)}/>


				<Route path=":id/comment" component={compose(
					withCurrent(),
					withPagination(({params:{id:parent}})=>({
						variables:{parent},
						query: graphql`
							query superdaddy_childComments_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
								...superdaddy_childComments
							}
						`,
					})),
					withFragment({data:graphql`
						fragment superdaddy_childComments on Query{
							comments:child_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"child_comments"){
								edges{
									node{
										...qili_comment
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

				)(Comment)}/>
			</Route>
			<Route path="knowledge">
				<IndexRoute component={compose(
					withNavigator(),
					connect(state=>({qs:state[DOMAIN].qs}),(dispatch)=>({
						search:cond=>dispatch(ACTION.QUERY(cond))
					})),
					withPagination(({qs})=>({
						variables:qs,
						query: graphql`
							query superdaddy_knowleges_Query($title:String,$categories:[String],$tags:[String],
								$mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
								$count:Int,$cursor:JSON){
								...list
							}
						`
					})),
					getContext({router:PropTypes.object}),
					mapProps(({router,qs:{title, ...qs},...others})=>({
						...others,
						title,
						qs,
						goBack:()=>router.goBack(),
						toKnowledge: id=>router.push(`/knowledge/${id}`),
						toCreate: ()=>router.push(`/knowledge/create`),
					})),

				)(Knowledges)}/>

				<Route path="create" component={compose(
					connect(state=>({
						selectedDocx:state[DOMAIN].selectedDocx,
						knowledge: state[DOMAIN].selectedDocx && state[DOMAIN].selectedDocx.knowledge,
					})),
					getContext({router:PropTypes.object}),
					withProps(({router})=>({
						toKnowledge: id=>router.replace(`/knowledge/${id}`),
						goBack(){
							router.goBack()
						}
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
							query superdaddy_knowledge_Query($id:ObjectID, $child: ObjectID){
								knowledge(_id:$id){
									...info_knowledge
								}
							}
						`,
					})),
				)(Knowledge)}/>

				<Route path=":id/comment" component={compose(
					withCurrent(),
					withPagination(({params:{id:parent}})=>({
						variables:{parent},
						query: graphql`
							query superdaddy_comment_Query($parent:ObjectID!, $count: Int=10, $cursor: JSON){
								...superdaddy_knowledgeComments
							}
						`,
					})),
					withFragment({data:graphql`
						fragment superdaddy_knowledgeComments on Query{
							comments:knowledge_comments(parent:$parent, last:$count, before: $cursor)@connection(key:"knowledge_comments"){
								edges{
									node{
										...qili_comment
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

				)(Comment)}/>
			</Route>

			<Route path="publish">
				<Route path="create" component={compose(
					getContext({
						router:PropTypes.object,
						client:PropTypes.object,
					}),
					withProps(({router})=>({
						toInfo:id=>router.replace(`/publish/${id}`),
						info:null,
					})),
					connect((state,{client,router})=>({
						child: client.get(state.superdaddy.current)
					})),
				)(Publish)}/>

				<Route path=":id" component={compose(
					getContext({
						router:PropTypes.object,
						client:PropTypes.object,
					}),
					withProps(({params:{id}, router})=>({
						id,
						toList: replace=>router[replace ? "replace" : "push"](`/publish`)
					})),
					connect((state,{client})=>({
						child: client.get(state.superdaddy.current)
					})),
					withQuery(({id,child})=>({
						variables:{id,child:child.id},
						query:graphql`
							query superdaddy_publish_Query($child:ObjectID, $id:ObjectID){
								me{
									child(_id:$child){
										publish(_id:$id){
											...publish_info
										}
									}
								}
							}
						`,
					})),
					withProps(({data})=>({
						info:data.me.child.publish
					}))
				)(Publish)}/>

				<IndexRoute component={compose(
					getContext({router:PropTypes.object}),
					connect(state=>({child: state.superdaddy.current})),
					withQuery(({child})=>({
						variables:{child},
						query: graphql`
							query superdaddy_publishes_Query($child:ObjectID){
								me{
									child(_id:$child){
										...list_publishes
									}
								}
							}
						`
					})),
					withProps(({router, data:{me:{child}}})=>({
						child,
						toInfo:id=>router.push(`/publish/${id}`),
						toCreate: replace=>router[replace ? 'replace' : 'publish']('/publish/create')
					})),
				)(Publishes)}/>


			</Route>

			<Route path="plan"  component={compose(
				connect(state=>({child:state.superdaddy.current})),
				withQuery(({child})=>({
					variables:{child},
					query: graphql`
						query superdaddy_plan_Query($child:ObjectID){
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

export const SuperDaddy=compose(
	withProps(({service="https://api.papazai.com/1/graphql"})=>({
		project,
		service,
		appId:project.config.appId,
		reducers:{
			[DOMAIN]:reducer
		},
		notifyOffline:false,
	})),
	withInit({
		query:graphql`
			query superdaddy_prefetch_Query{
				me{
					id
					token
					children{
						id
						name
						photo
					}
					goods{
						...good
					}
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{children, token, id}}=response
			dispatch(qiliACTION.CURRENT_USER({id,token}))
			if(children && children.length>0){
				dispatch(ACTION.CURRENT_CHILD(children[0].id))
			}
		},
		onError(error,dispatch){
			dispatch(qiliACTION.LOGOUT)
		}
	}),
)(QiliApp)
