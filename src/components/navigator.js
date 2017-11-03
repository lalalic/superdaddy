import React from "react"
import PropTypes from "prop-types"

import {createEagerFactory} from "recompose"

import CheckUpdate from "qili/components/check-update"
import CommandBar from "qili/components/command-bar"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

export const Navigator=()=>(
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



export const withNavigator=()=>BaseComponent=>{
	const factory=createEagerFactory(BaseComponent)
	const WithNavigator=props=>(<div>{factory(props)}<Navigator/></div>)
	return WithNavigator
}

export default withNavigator