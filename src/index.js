import React, {PropTypes} from "react"
import {compose} from "recompose"
import {Router, Route, IndexRoute, Direct, IndexRedirect, hashHistory} from "react-router"

import QiliApp, * as qili from "qili-app"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"
import CheckUpdate from "qili-app/components/check-update"

const {REDUCER}=qili
const DOMAIN="superdaddy"

const ACTION={
	CURRENT_CHILD: payload=>({
		type:`@@${DOMAIN}/CURRENT_CHILD`,
		payload,
	})
}

const reducer=(state={},{type,payload})=>{
	state=REDUCER(state, {type,payload})
	switch(type){
	case `@@${DOMAIN}/CURRENT_CHILD`:
		return {...state, current:payload}
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
			query index_prefetch_Query{
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
			if(children.length>0){
				dispatch(ACTION.CURRENT_CHILD(children[0].id))
			}
		}
	}),
)(QiliApp)

const router=(
	<Router history={hashHistory}>
		<Route path="/" component={Navigator}>
			
		</Route>
	</Router>
)


QiliApp.render(<SuperDaddy>)