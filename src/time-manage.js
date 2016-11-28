import React, {Component, PropTypes} from "react"
import {AppBar,TextField,FlatButton,IconButton, AutoComplete,RaisedButton, Tabs, Tab} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {connect} from "react-redux"
import {compact, ENTITIES, UI} from "qili-app"
import {normalize} from "normalizr"

import SwipeableTabs from "./components/swipe-tabs"

import IconSmile from "material-ui/svg-icons/social/mood"
import IconRemove from "material-ui/svg-icons/action/alarm-off"
import IconAdd from "material-ui/svg-icons/av/playlist-add"

import IconUp from "material-ui/svg-icons/navigation/arrow-upward"
import IconDown from "material-ui/svg-icons/navigation/arrow-downward"
import IconTop from "material-ui/svg-icons/editor/vertical-align-top"
import IconBottom from "material-ui/svg-icons/editor/vertical-align-bottom"

import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"


import IconVisible from "material-ui/svg-icons/action/visibility"
import IconHidden from "material-ui/svg-icons/action/visibility-off"


import {getCurrentChild, getCurrentChildTasks} from "./selector"
import {Family,Task} from "./db"

const {Empty}=UI

const DOMAIN="time"

const changeTodos=f=>(dispatch,getState)=>{
	const state=getState()
	const child=getCurrentChild(state)
	if(child.todoWeek==undefined)
		child.todoWeek=new Date().getWeek()

	let {todos=[]}=child

	let handled=f(child.todos=[...todos], child)
	if(!(handled && handled.then))
		handled=Promise.resolve()
	return handled.then(a=>Family.upsert(child)
		.then(updated=>dispatch(ENTITIES(normalize(updated, Family.schema).entities))))
}
export const ACTION={
	ADD: todo=>(dispatch, getState)=>{
		if(!todo)
			return Promise.resolve()
		return changeTodos(todos=>{
			switch(typeof(todo)){
			case "object":
				todos.push(todo)
				break
			default:
				if(!todos.find(a=>a.content==todo))
					todos.push({content:todo})
			}
		})(dispatch,getState)
	}
	,REMOVE: todo=>changeTodos(todos=>{
		let i=typeof(todo)=='object'
			? todos.findIndex(a=>a._id=todo._id)
			: todos.findIndex(a=>a.content=todo);

		if(i!=-1)
			todos.splice(i,1)
	})
	,REMOVE_BY_INDEX: i=>changeTodos(todos=>todos.splice(i,1))
	,DONE: (todo,day)=>changeTodos((todos,child)=>{
		const task=todos.find(a=>a.content==todo)
		let {dones=[]}=task
		dones.push(day)
		task.dones=dones
		child.score=child.score+1
	})
	,EDITING: (status=0)=>({type:`${DOMAIN}/edit`, payload:status})
	,UP: i=>changeTodos(todos=>{
		let target=todos[i]
		todos.splice(i,1)
		todos.splice((i-1)%(todos.length+1),0,target)
	})
	,DOWN: i=>changeTodos(todos=>{
		let target=todos[i]
		todos.splice(i,1)
		todos.splice((i+1)%(todos.length+1),0,target)
	})
	,TOP: i=>changeTodos(todos=>{
		let target=todos[i]
		todos.splice(i,1)
		todos.unshift(target)
	})
	,BOTTOM: i=>changeTodos(todos=>{
		let target=todos[i]
		todos.splice(i,1)
		todos.push(target)
	})
	,TOGGLE_VISIBLE: i=>changeTodos(todos=>{
		let target=todos[i]
		target.hidden=!!!target.hidden
	})
	,RESET: a=>(dispatch,getState)=>{
		return changeTodos((todos,child)=>{
			//save history
			let dones=todos.filter(({dones=[]})=>dones.length)
			if(dones.length){
				return Task.finishWeekTasks(child, dones).then(a=>{
					todos.forEach(a=>a.dones=[])
					child.todoWeek=new Date().getWeek()
				})
			}else
				child.todoWeek=new Date().getWeek()
		})(dispatch,getState)
	}
}

export const reducer=(state={editing:0},{type,payload})=>{
	switch(type){
	case `${DOMAIN}/edit`:
		return {editing:payload}
	break
	}
	return state
}

export const TimeManage=({dispatch, goal, editing, todoWeek, week=new Date().getWeek(), isCurrentWeek=todoWeek==week})=>(
    <div>
		{goal?
			(<div>
		        {isCurrentWeek
					? <TodoEditor editing={editing}/>
					: <RaisedButton  onClick={e=>dispatch(ACTION.RESET())}
						icon={<IconDone/>}
						label={`保存前${week-todoWeek}周完成情况`}
						/>
				}

		        {isCurrentWeek&&editing
					? <TaskPadEditor/>
					: <TaskPad current={isCurrentWeek ? new Date().getDay() : 7}/>
				}
			</div>) : <ScorePad height={100}/>
		}
    </div>
)

const TodoEditor=connect()(({dispatch, editing, refTask, refForm})=>(
	<AppBar
		iconElementLeft={<span/>}
		iconElementRight={
			<span>
				<IconButton onClick={e=>dispatch(ACTION.ADD(refTask.getValue().trim()))}>
					<IconAdd color="white"/>
				</IconButton>
				<IconButton onClick={e=>dispatch(ACTION.EDITING(editing ? 0 : 1))}>
					{editing?<IconDone color="white"/> : <IconEdit color="white"/>}
				</IconButton>
			</span>
		}
		title={
			<AutoComplete ref={a=>refTask=a}
				dataSource={[]}
				hintText="任务"
				fullWidth={true}
				onKeyDown={e=>e.keyCode==13 && dispatch(ACTION.ADD(refTask.getValue().trim()))}
				/>
		}
		/>
))

import MediaQuery from "react-responsive"
const TaskPad=connect(state=>({todos:getCurrentChildTasks(state).filter(a=>!a.hidden)}))(props=>(
	<MediaQuery maxWidth={960}>
	{
		match=>match ? <TaskPadMobile {...props}/> : <TaskPadWide {...props}/>
	}
	</MediaQuery>
))

const DAYS=(i,a="日一二三四五六".split(""))=>(a.splice(i,1,<b>今天</b>),a)
const TaskPadWide=(({todos=[], dispatch, current=new Date().getDay(),days=DAYS(current)})=>(
    <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>任务\星期</TableHeaderColumn>
            <TableHeaderColumn>{days[0]}</TableHeaderColumn>
            <TableHeaderColumn>{days[1]}</TableHeaderColumn>
            <TableHeaderColumn>{days[2]}</TableHeaderColumn>
            <TableHeaderColumn>{days[3]}</TableHeaderColumn>
            <TableHeaderColumn>{days[4]}</TableHeaderColumn>
            <TableHeaderColumn>{days[5]}</TableHeaderColumn>
            <TableHeaderColumn>{days[6]}</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
            todos.map(({content:task, dones=[]},i)=>(
                <TableRow key={i}>
                    <TableRowColumn>{task}</TableRowColumn>
					{[0,1,2,3,4,5,6].map(a=>(
						<TableRowColumn key={a}>
							<TodoStatus todo={task} done={-1!=dones.indexOf(a)} day={a} current={current}/>
						</TableRowColumn>
					))}
                </TableRow>
            ))
            }
        </TableBody>
    </Table>
))

import SwipeableViews from 'react-swipeable-views'
import {List,ListItem, Subheader, Paper} from "material-ui"

const WEEKDAYS=(i,a="日一二三四五六".split("").map(a=>`${a}`))=>(a.splice(i,1,"今天"),a)
const TaskPadMobile=({todos=[], dispatch, current=new Date().getDay(),days=WEEKDAYS(current)})=>(
	<SwipeableTabs index={current}
		tabs={days.map((day,i)=><Tab key={i} label={day} value={i}/>)}>
		{
			days.map((day,i)=>(
				<Table key={i}>
					<TableBody  displayRowCheckbox={false}>
					{
						todos.map(({content:task,dones=[]},j)=>(
							<TableRow key={j}>
								<TableRowColumn style={{width:60}}>
									<TodoStatus todo={task} done={-1!=dones.indexOf(i)} day={i} current={current}/>
								</TableRowColumn>
								<TableRowColumn>{task}</TableRowColumn>
							</TableRow>
						))
					}
					</TableBody>
				</Table>
			))
		}
	</SwipeableTabs>
)

const TaskPadEditor=connect(state=>({todos:getCurrentChildTasks(state)}))(({todos=[], dispatch})=>(
	<Table>
        <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>任务\操作</TableHeaderColumn>
            <TableHeaderColumn style={{width:60}}>删除</TableHeaderColumn>
			<TableHeaderColumn style={{width:60}}>隐藏</TableHeaderColumn>
			<TableHeaderColumn colSpan={4} style={{width:4*60}}>顺序</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
            todos.map(({content:task, dones=[], hidden},i)=>(
                <TableRow key={i}>
                    <TableRowColumn>{task}</TableRowColumn>
                    <TableRowColumn style={{width:60}}>
						<IconButton  onClick={e=>dispatch(ACTION.REMOVE_BY_INDEX(i))}>
							<IconRemove/>
						</IconButton>
					</TableRowColumn>
                    <TableRowColumn style={{width:60}}>
						<Visibility dispatch={dispatch} i={i} visible={!hidden}/>
					</TableRowColumn>
					<TableRowColumn colSpan={4} style={{width:4*60}}>
						<Order dispatch={dispatch} i={i}/>
					</TableRowColumn>
                </TableRow>
            ))
            }
        </TableBody>
    </Table>
))

const TodoStatus=connect()(({todo,done, day, dispatch, current})=>{
	if(done)
		return (<IconSmile color="yellow"/>)
	else if(day>current)
		return (<IconSmile color="lightgray"/>)
	else
		return (<IconSmile color="lightcyan" hoverColor="yellow" onClick={e=>dispatch(ACTION.DONE(todo,day))}/>)
})

import Score from "./dashboard"
const ScorePad=connect(state=>compact(getCurrentChild(state),"score","goal","todo"))(props=><Score {...props}/>)

const Order=({i,dispatch})=>(
	<span>
		<IconButton onClick={e=>dispatch(ACTION.TOP(i))}><IconTop/></IconButton>
		<IconButton onClick={e=>dispatch(ACTION.UP(i))}><IconUp/></IconButton>
		<IconButton onClick={e=>dispatch(ACTION.DOWN(i))}><IconDown/></IconButton>
		<IconButton onClick={e=>dispatch(ACTION.BOTTOM(i))}><IconBottom/></IconButton>
	</span>
)

const Visibility=({i,dispatch,visible,Icon=(!visible ? IconHidden : IconVisible)})=>(
	<IconButton onClick={e=>dispatch(ACTION.TOGGLE_VISIBLE(i))}><Icon/></IconButton>
)

export default Object.assign(TimeManage,{reducer})
