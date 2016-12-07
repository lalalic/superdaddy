import React, {Component, PropTypes} from "react"
import MediaQuery from "react-responsive"
import {List,ListItem, Subheader,Divider,Tab, FlatButton,IconButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {connect} from "react-redux"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightBlue100 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

import {ACTION} from "."
import {getCurrentChildTasks} from "../selector"
import SwipeableTabs from "../components/swipe-tabs"
import IconSmile from "material-ui/svg-icons/social/mood"

export const TaskPad=connect(state=>({todos:getCurrentChildTasks(state).filter(a=>!a.hidden)}))(props=>(
	<MediaQuery maxWidth={960}>
	{
		match=>match ? <TaskPadMobile {...props}/> : <TaskPadWide {...props}/>
	}
	</MediaQuery>
))

const DAYS=(i,a="日一二三四五六".split(""))=>(i>-1 && a.splice(i,1,<b>今天</b>),a)
const ITEM_STYLE={
	display:"inline-block",
	width:60,
	textAlign:"center",
	marginTop:16,
	marginBottom:16
}
const TaskPadWide=(({todos=[], dispatch, current=new Date().getDay(),days=DAYS(current)})=>(
	<List>
		<ListItem
			primaryText="任务\星期"
			rightIconButton={
				<Wrapper>
					{days.map((a,i)=><span key={i} style={ITEM_STYLE}>{a}</span>)}
				</Wrapper>
			}
		/>
		<Divider/>

		{todos.map(({content:task, dones=[]},i)=>(
			<ListItem key={i}
				primaryText={task}
				rightIconButton={
					<Wrapper>
					{[0,1,2,3,4,5,6].map(a=>(
						<span key={a} style={ITEM_STYLE}>
							<TodoStatus
								todo={task}
								done={-1!=dones.indexOf(a)}
								day={a}
								current={current}
								/>
						</span>
					))}
					</Wrapper>
				}
				/>
		)).reduce((state,a,i)=>{
			state.push(a)
			state.push(<Divider key={`_${i}`}/>)
			return state
		},[])}
	</List>
))

const TaskPadMobile=({todos=[], dispatch, current=new Date().getDay(),days=DAYS(current)})=>(
	<SwipeableTabs index={current}
		tabs={days.map((day,i)=><Tab key={i} label={day} value={i}/>)}>
		{
			days.map((day,i)=>(
				<List key={i}>
					{
						todos.map(({content:task,dones=[]},j)=>(
							<ListItem key={j}
								primaryText={task}
								leftCheckbox={<TodoStatus todo={task} done={-1!=dones.indexOf(i)} day={i} current={current}/>}
							/>
						))
					}
				</List>
			))
		}
	</SwipeableTabs>
)

const TodoStatus=connect()(({todo,done, day, dispatch, current, ...others})=>{
	if(done)
		return (<IconSmile color={COLOR_DONE} {...others}/>)
	else if(current<0 || day>current)
		return (<IconSmile color={COLOR_DISABLED} {...others}/>)
	else
		return (<IconSmile color={COLOR_ENABLED} hoverColor={COLOR_HOVER} onClick={e=>dispatch(ACTION.DONE(todo,day))}  {...others}/>)
})
const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)