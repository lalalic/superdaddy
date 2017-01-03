import React, {PropTypes} from "react"

import {AppBar,FloatingActionButton, Paper} from "material-ui"
import {cyan300 as bgc} from "material-ui/styles/colors"

import BabyAppBar from "../components/app-bar"

import TimeManageCreator from "./core"

const MyAppBar=(props=>(
	<AppBar {...props} style={{backgroundColor:bgc}}
		iconElementLeft={
			<FloatingActionButton
				mini={true}
				disabled={true}
				style={{fontSize:"xx-small",backgroundColor:bgc}}
				>
				我
			</FloatingActionButton>
		}
		/>
))

const BabyTimeManage=TimeManageCreator(BabyAppBar,"baby")
let MyTimeManage


export const reducer=(state,next)=>{
	let nextState=BabyTimeManage.reducer(state,next)
	if(nextState==state && MyTimeManage)
		nextState=MyTimeManage.reducer(state,next)
	return nextState
}

export const TimeManage=({_id},{muiTheme, minHeight=(muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height)/2})=>(
    <div>
		<div style={{minHeight}}>
			<BabyTimeManage/>
		</div>
		{
			(function(){
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
