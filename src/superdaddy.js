import React ,{Fragment}from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {Router, Route, IndexRoute, browserHistory} from "react-router"

import {compose, getContext, withProps, mapProps, withContext,branch,renderComponent} from "recompose"
import {withInit, withQuery, withPagination, withFragment,} from "qili-app/graphql"
import {QiliApp, ACTION as qiliACTION} from "qili-app"
import Account from "qili-app/components/account"
import Comment from "qili-app/components/comment"


import withCurrent from "components/current-child"
import withNavigator from "components/navigator"
import Movable from "components/movable"
import Clock from "components/clock"
import project from "../package.json"
import {DOMAIN, reducer, ACTION} from "./state"

import Child from "family/child"
import My from "setting/account"
import Publish, {Publishes} from "publish"
import {Creatable as Knowledges,NewKnowledge,Knowledge} from "knowledge"
import TimeManage, {ScorePad, withPlanActions} from "time-manage"
import Awards from "./award"
import AwardPaper from "components/award-paper"

const _=id=>id.split(":").pop()

export const routes=(
	<Router history={browserHistory}>
		<Route path="/" component={compose(
				connect(state=>({hasChild:!!state.superdaddy.current, timer: !!state.superdaddy.timer})),
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
				)(({children,dispatch, timer})=>(
					<Fragment>
						{timer && (
							<Movable className="clock sticky bottom left _2" style={{cursor:"move"}}>
								<Clock dispatch={dispatch}/>
							</Movable>
						)}
						{children}
					</Fragment>
				))}>

			<IndexRoute component={compose(
				withNavigator({flex:false}),
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

				withProps(({data})=>({
					data: data.me.child.plan,
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
				withProps(({data})=>({
					data: data.me.child.plan,
				})),
				withPlanActions(),
				withContext({actions:PropTypes.object},({actions})=>({actions})),

			)(ScorePad)}/>

			<Route path="my/awards" component={compose(
				withQuery(()=>({
					query: graphql`
						query superdaddy_awards_Query{
							me{
								awards{
									...award
								}
							}
						}
					`
				})),
				withProps(({data})=>({data:data.me.awards})),
			)(Awards)}/>

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
					withProps(({router, data})=>{
						let props={
							user:data.user,
							toCreate:()=>router.push("/child"),
							toChild: id=>router.push(`/child/${_(id)}`),
							toSetting: ()=>router.push('/my/setting'),
							toProfile: ()=>router.push('/my/profile'),
							toGoals: ()=>router.push('/my/awards'),
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
						toChild:id=>router.replace(`/child/${_(id)}`)
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
					withProps(({data,client,store, router,params:{id}})=>({
						id,
						data:data.me.child,
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

				<Route path=":id/award-paper" component={compose(
					withQuery(({params:{id:child}})=>({
						variables:{child},
						query: graphql`
							query superdaddy_awardpaper_Query($child:ObjectID){
								me{
									child(_id:$child){
										name
										photo
									}
								}
							}
						`
					})),
					withProps(({data:{me:{child:{name,photo,plan={}}}}})=>{
						return {name,photo, ...plan}
					}),
				)(AwardPaper)}/>
			</Route>
			<Route path="knowledge">
				<IndexRoute component={compose(
					withNavigator({flex:false}),
					connect(state=>({qs:state[DOMAIN].qs}),(dispatch)=>({
						search:cond=>dispatch(ACTION.QUERY(cond))
					})),
					withPagination(({qs})=>({
						variables:{...qs},
						query: graphql`
							query superdaddy_knowleges_Query($title:String,$categories:[String],$tags:[String],
								$mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
								$count:Int=5,$cursor:JSON){
								...list
							}
						`,
					})),
					getContext({router:PropTypes.object}),
					mapProps(({router,...others})=>({
						...others,
						goBack:()=>router.goBack(),
						toKnowledge: id=>`/knowledge/${_(id)}.html`,
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
						toKnowledge: id=>router.replace(`/knowledge/${_(id)}.html`),
						goBack(){
							router.goBack()
						}
					}))
				)(NewKnowledge)}/>

				<Route path=":id.html" component={compose(
					getContext({router:PropTypes.object}),
					connect((state,{router,params:{id}})=>({
						child:state.superdaddy.current,
						toComment:()=>router.push(`knowledge/${_(id)}/comment`),
						router:undefined,
					})),
					withQuery(({params:{id},child})=>({
						variables:{id,child},
						query:graphql`
							query superdaddy_knowledge_Query($id:ObjectID, $child: ObjectID){
								knowledge(_id:$id){
									...info_knowledge
									_viewed
								}
							}
						`,
					})),
					withProps(({data})=>({knowledge:data.knowledge})),
				)(Knowledge)}/>

				<Route path=":id/comment" component={compose(
					withCurrent(),
					withPagination(({params:{id}})=>({
						variables:{parent:`Knowledge:${id}`},
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
					withProps(({params:{id}})=>({
						parent:`Knowledge:${id}`,
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

			<Route path="test" component={({
				routeParams,router, routes, route, params, location, data,
				...props
				})=><MindMap {...{
					style:{width:"100%",height:"100%"},
					//src:"mindmap://🤪如何写好作文(中心(论点,主题),材料(1,2,3,…),结构(开头,1,2,3,…,结尾),表现(象征,对比,衬托,拟人))"}}, 
					src:"mindmap://汉语拼音(音调😇(1,2,3,4),字母(😤,🤩,😜),拼读🐹(读(da,li,ba,xiao),拼(李 ,艾 ,洋 ,多 ,少 ,学 ,习 )))",
				}} {...props}/> 
			}/>
		</Route>
		<Route path="*" exact={true} component={()=><div>404 error</div>}/>
	</Router>
)

import MindMap from "./components/mindmap"

export const SuperDaddy=compose(
	withProps(props=>({
		project,
		service:"https://api.jiliguan.com/1/graphql",
		appId:project.config.appId,
		reducers:{
			[DOMAIN]:reducer
		},
		notifyOffline:false,
		...props
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
					awards{
						...award
					}
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{children, token, id}}=response
			dispatch(qiliACTION.LOADING(false))
			dispatch(qiliACTION.CURRENT_USER({id,token}))
			if(children && children.length>0){
				dispatch(ACTION.CURRENT_CHILD(children[0].id))
			}
		},
		onError(error,dispatch){
			dispatch(qiliACTION.LOADING(false))
			dispatch(qiliACTION.LOGOUT)
		}
	}),
)(QiliApp)
