import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose,getContext,withProps} from "recompose"
import {withFragment} from "qili/tools/recompose"

import AppBar from "components/app-bar"
import ScorePad from "./score-pad"
import TaskPad from "./task-pad"
import TaskPadEditor from "./task-pad-editor"
import TodoEditor from "./todo-editor"

export {default as ScorePad} from "./score-pad"

export const TimeManage=({minHeight,goal, score, editing,week,reset})=>(
	<div style={{minHeight}}>
		{
			(currentWeek=>{
				if(!goal){
					return <ScorePad/>
				}else{
					let isCurrentWeek=week==currentWeek
					if(isCurrentWeek){
						let accomplished=goal<=score
						if(!accomplished){
							return (
								<div>
									<TodoEditor/>
									{editing ? <TaskPadEditor/> : <TaskPad current={new Date().getDay()}/>}
								</div>
							)
						}else{
							return <ScorePad/>
						}
					}else{
						return (
							<div>
								<AppBar
									iconElementRight={
										<IconButton onClick={reset}>
											<IconDone color="white"/>
										</IconButton>
									}
									title={`保存前${new Date(currentWeek).relative(new Date(week))/7}周完成情况`}
								/>
								
								<TaskPad current={99}/>
							</div>
						)
					}
				}
			})((d=>d.relativeDate(-1*d.getDay()).toDate().getTime())(new Date()))
		}
	</div>
)

export default compose(
	getContext({
		muiTheme:PropTypes.object,
		actions:PropTypes.object,
	}),
	connect((state,{actions:{reset},muiTheme})=>({
		reset,
		editing: state=>state.childPlanEdit,
		minHeight:(muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height)/2,
	})),
	withFragment(graphql`
		fragment core_timeManage on Plan{
			goal
			score
			week
			...scorePad
			...taskPad
			...taskPadEditor
		}
	`),
	withProps(({data:{goal,score,week}})=>({
		goal,score,week
	})),
)(TimeManage)