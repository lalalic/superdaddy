import React, {Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,getContext,withProps} from "recompose"
import {withFragment} from "qili-app"

import {IconButton} from "material-ui"

import IconDone from "material-ui/svg-icons/file/cloud-done"

import AppBar from "components/app-bar"
import ScorePad from "./score-pad"
import TaskPad from "./task-pad"
import TaskPadEditor from "./task-pad-editor"
import TodoEditor from "./todo-editor"

export {default as ScorePad} from "./score-pad"

export {default as PrintPad} from "./print"


export const TimeManage=({goal, score, editing,week,reset,data, child})=>(
	<Fragment>
		{
			(currentWeek=>{
				if(!goal){
					return <ScorePad data={data}/>
				}else{
					let isCurrentWeek=!week || week==currentWeek
					if(isCurrentWeek){
						let accomplished=goal<=score
						if(!accomplished){
							return (
								<TodoEditor {...{data,child}}>
									{editing ? <TaskPadEditor/> : <TaskPad current={new Date().getDay()}/>}
								</TodoEditor>
							)
						}else{
							return <ScorePad data={data}/>
						}
					}else{
						return (
							<Fragment>
								<AppBar
									style={{flex:"none"}}
									iconElementRight={
										<IconButton onClick={e=>reset()}>
											<IconDone color="white"/>
										</IconButton>
									}
									title={`保存前${new Date(currentWeek*1000).relative(new Date(week*1000))/7}周完成情况`}
								/>
								<div className="flexV">
									<TaskPad data={data} current={99}/>
								</div>
							</Fragment>
						)
					}
				}
			})(parseInt((d=>d.relativeDate(-1*d.getDay()).toDate())(new Date()).getTime()/1000))
		}
	</Fragment>
)

export default compose(
	getContext({
		muiTheme:PropTypes.object,
		actions:PropTypes.object,
	}),
	connect((state,{actions:{reset},muiTheme})=>({
		reset,
		editing: state.superdaddy.childPlanEdit,
		minHeight:(muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height)/2,
	})),
	withFragment(graphql`
		fragment core on Plan{
			goal
			score
			week
			...scorePad
			...taskPad
			...taskPadEditor
			...printPad
		}
	`),
	withProps(({data:{goal,score,week}, child})=>({
		goal,
		score,
		week,
		child
	})),
)(TimeManage)