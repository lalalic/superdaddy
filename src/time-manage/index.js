import React, {PropTypes} from "react"

import {AppBar,FloatingActionButton, Paper} from "material-ui"
import {cyan300 as bgc} from "material-ui/styles/colors"

import {Knowledge} from "db"

import BabyAppBar from "components/app-bar"

import TimeManageCreator from "./core"

const MyAppBar=(props=>(
	<AppBar {...props} style={{backgroundColor:bgc}}
		iconElementLeft={
			<FloatingActionButton
				mini={true}
				backgroundColor={bgc}
				style={{fontSize:"xx-small"}}
				zDepth={1}
				>
				我的
			</FloatingActionButton>
		}
		/>
))

export const BabyTimeManage=TimeManageCreator(BabyAppBar,"baby")
let MyTimeManage


export const reducer=(state,next)=>{
	let nextState=BabyTimeManage.reducer(state,next)
	if(nextState==state && MyTimeManage)
		nextState=MyTimeManage.reducer(state,next)
	return nextState
}

export const ACTION={
	ADD: knowledge=>(dispatch, getState)=>{//core/index.js ACTION.RESET cloned this logic
		let {_id,title,score, days}=knowledge
		let task={knowledge:_id,content:title,score, days}
		let ps=[]

		if(Knowledge.isForBaby(knowledge))
			ps.push(BabyTimeManage.ACTION.ADD(task)(dispatch, getState))

		if(Knowledge.isForParent(knowledge) && MyTimeManage)
			ps.push(MyTimeManage.ACTION.ADD(task)(dispatch, getState))

		return Promise.all(ps)
	},
	REMOVE: knowledge=>(dispatch, getState)=>{
		let ps=[]
		if(Knowledge.isForBaby(knowledge))
			ps.push(BabyTimeManage.ACTION.REMOVE({_id:knowledge._id})(dispatch, getState))

		if(Knowledge.isForParent(knowledge) && MyTimeManage)
			ps.push(MyTimeManage.ACTION.REMOVE({_id:knowledge._id})(dispatch, getState))

		return Promise.all(ps)
	}
}

export const TimeManage=({_id, manageMyTime},{muiTheme, minHeight=(muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height)/2})=>(
    <div>
		<div style={{minHeight}}>
			<BabyTimeManage/>
		</div>
		{
			(function(){
				if(!manageMyTime)
					return null

				if(!MyTimeManage)
					MyTimeManage=TimeManageCreator(MyAppBar,_id)
				return React.createElement(MyTimeManage)
			})()
		}
    </div>
)

TimeManage.contextTypes={
	muiTheme:PropTypes.object
}

export default Object.assign(TimeManage,{reducer,ScorePad:BabyTimeManage.ScorePad})
