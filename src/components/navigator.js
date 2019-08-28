import React,{createFactory,Fragment} from "react"
import PropTypes from "prop-types"

import {CheckUpdate,CommandBar} from "qili-app"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

export const Navigator=({style})=>(
	<CommandBar style={style}
		items={[
			{label:"任务", action:"tasks",
				link:"/",
				icon:<IconTask/>},
			{label:"状态", action:"score",
				link:'/score',
				icon:<IconReward/>},
			{label:"发现", action:"knowledges",
				link:'/knowledges',
				icon:<IconKnowledges/>},

			{label:"我", action:"my",
				link:'/my',
				icon:<CheckUpdate><IconAccount/></CheckUpdate>}
			]}
	/>
)



export const withNavigator=({flex}={flex:true})=>BaseComponent=>{
	const factory=createFactory(BaseComponent)
	const WithNavigator=props=>(
		<Fragment>
			{flex ? <div className="flexV" children={factory(props)}/> : factory(props)}
			<Navigator style={{flex:"none"}}/>
		</Fragment>
	)
	return WithNavigator
}

export default withNavigator
