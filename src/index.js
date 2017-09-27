import React, {PropTypes} from "react"
import {connect} from "react-redux"
import {compose, branch,renderNothing, getContext, withProps} from "recompose"
import {withInit, withQuery} from "qili-app/lib/tools/recompose"

import {graphql} from "react-relay"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"

import QiliApp, * as qili from "qili-app"
import CheckUpdate from "qili-app/lib/components/check-update"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

const DOMAIN="superdaddy"

const ACTION={
	CURRENT_CHILD: payload=>({
		type:`@@${DOMAIN}/CURRENT_CHILD`,
		payload,
	})
}

const reducer=(state={},{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/CURRENT_CHILD`:
		return {...state, current:payload}
	}
	return state
}

const Navigator=()=>(
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
)

const Current=compose(
	connect(({superdaddy:{current}})=>({id:current})),
	branch(({id})=>!id, renderNothing),
	getContext({client: PropTypes.object}),
	withProps(({dispatch, client,id})=>({
		name: client.get(id).name,
		switchChild(){
			let all=client.getAll("Child")
			let i=all.findIndex(a=>a.id==id)
			dispatch(ACTION.CURRENT_CHILD(all.length ? all[(i+1)%apps.length].id : null))
		}
	})),
)(({name,switchChild})=>(
	<FloatingActionButton className="sticky top right" mini={true}
		style={{fontSize:"xx-small"}}
		onClick={switchChild}>
		{name}
	</FloatingActionButton>
))

const withCurrent=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithCurrent=props=>(<div><Current/>{factory(props)}</div>)
	return WithCurrent
}

const withNavigator=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithCurrent=props=>(<div>{factory(props)}<Navigator/></div>)
	return WithCurrent
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
					name
					token
					children{
						id
						name
					}
				}
			}
		`,
		onSuccess(response,dispatch){
			const {me:{children, token,name}}=response
			dispatch(qili.ACTION.CURRENT_USER({name,token}))
			if(children && children.length>0){
				dispatch(ACTION.CURRENT_CHILD(children[0].id))
			}
		}
	}),
)(QiliApp)

import Child from "family/child"

const router=(
	<Router history={hashHistory}>
		<Route path="/">
		
		
			<Route path="baby">
				<IndexRoute component={Child.Creator}/>
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
					getContext({client:PropTypes.object}),
					withProps(({me,client,current,dispatch})=>({
						data:me.child,
						switchChild(){
							let all=client.getAll("Child")
							dispatch(ACTION.CURRENT_CHILD(all.length ? all[0].id : null))
						},
						client:undefined,
						current:undefined,
					})),
				)(Child)}/>
			</Route>			
		</Route>
	</Router>
)

QiliApp.render(<SuperDaddy>{router}</SuperDaddy>)