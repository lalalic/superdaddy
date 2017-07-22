import React, {Component, PropTypes} from "react"
import MediaQuery from "react-responsive"
import {List,ListItem, Subheader,Divider,Tab, FlatButton,IconButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightBlue100 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

import SwipeableTabs from "../../components/swipe-tabs"
import IconSmile from "material-ui/svg-icons/social/mood"

export const TaskPad=(props=>(
	<MediaQuery maxWidth={960}>
	{
		match=>match ? <TaskPadMobile {...props}/> : <TaskPadWide {...props}/>
	}
	</MediaQuery>
))

const DAYS=(i,a="日一二三四五六".split(""))=>(i<7 && a.splice(i,1,<b>今天</b>),a)
const ITEM_STYLE={
	display:"inline-block",
	width:60,
	textAlign:"center",
	marginTop:16,
	marginBottom:16
}
const TaskPadWide=(({todos=[],current=new Date().getDay(),days=DAYS(current)})=>(
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

		{todos.map(({knowledge, days=[], content:task, dones=[]},i)=>(
			<ListItem key={i}
				primaryText={knowledge ? <TaskTitle {...{knowledge,task}}/> : task}
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
				open={true}
				nestedItems={
					days.map((d,i)=><ListItem key={i} primaryText={d}/>)
				}
				/>
		)).reduce((state,a,i)=>{
			state.push(a)
			state.push(<Divider key={`_${i}`}/>)
			return state
		},[])}
	</List>
))

const TaskPadMobile=({todos=[],current=new Date().getDay(),days=DAYS(current)},
	{dispatch,ACTION,muiTheme, minHeight=muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height})=>(
	<SwipeableTabs index={current%7}
		tabs={days.map((day,i)=><Tab key={i} label={day} value={i}/>)}>
		{
			days.map((day,i)=>(
				<List key={i} style={{minHeight:minHeight*3/4}}>
					{
						todos.map(({knowledge, days=[], content:task,dones=[]},j)=>(
							<ListItem key={j}
								primaryText={knowledge ? <TaskTitle {...{knowledge,task}}/> : task}
								leftCheckbox={<TodoStatus todo={task} done={-1!=dones.indexOf(i)} day={i} current={current}/>}
								nestedItems={
									days.map((d,i)=><ListItem key={i} leftCheckbox={<span/>} primaryText={d}/>)
								}
							/>
						))
					}
				</List>
			))
		}
	</SwipeableTabs>
)
TaskPadMobile.contextTypes={
	muiTheme:PropTypes.object,
	ACTION: PropTypes.object,
	dispatch: PropTypes.func
}

const TodoStatus=({todo,done, day, current, ...others},{dispatch,ACTION})=>{
	if(done)
		return (<IconSmile color={COLOR_DONE} {...others}/>)
	else if(day>current)
		return (<IconSmile color={COLOR_DISABLED} {...others}/>)
	else
		return (<IconSmile color={COLOR_ENABLED} hoverColor={COLOR_HOVER} onTouchTap={e=>dispatch(ACTION.DONE(todo,day))}  {...others}/>)
}

TodoStatus.contextTypes={
	ACTION: PropTypes.object,
	dispatch: PropTypes.func
}
const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)

const TaskTitle=({knowledge,task},{router,dispatch,ACTION})=>(
	<span onClick={e=>router.push(`/knowledge/${knowledge}`)} style={{color:"blue"}}>
		{task}
	</span>
)

TaskTitle.contextTypes={
	router: PropTypes.object,
	dispatch: PropTypes.func,
	ACTION: PropTypes.object
}
