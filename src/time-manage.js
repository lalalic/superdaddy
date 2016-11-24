import React, {Component, PropTypes} from "react"
import {TextField,FlatButton,IconButton, AutoComplete} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {connect} from "react-redux"
import {compact, ENTITIES, UI} from "qili-app"
import {normalize} from "normalizr"

import IconSmile from "material-ui/svg-icons/social/mood"
import IconRemove from "material-ui/svg-icons/action/alarm-off"
import IconAdd from "material-ui/svg-icons/content/add-circle-outline"

import IconUp from "material-ui/svg-icons/navigation/arrow-upward"
import IconDown from "material-ui/svg-icons/navigation/arrow-downward"
import IconTop from "material-ui/svg-icons/editor/vertical-align-top"
import IconBottom from "material-ui/svg-icons/editor/vertical-align-bottom"

import IconVisible from "material-ui/svg-icons/action/visibility"
import IconHidden from "material-ui/svg-icons/action/visibility-off"


import {getCurrentChild, getCurrentChildTasks} from "./selector"
import {Family,Finished} from "./db"

const {Empty}=UI

const DOMAIN="time"

const changeTodos=f=>(dispatch,getState)=>{
	const state=getState()
	const child=getCurrentChild(state)
	let {todos=[]}=child
	f(child.todos=[...todos])
	return Family.upsert(child)
		.then(updated=>dispatch(ENTITIES(normalize(updated, Family.schema).entities)))
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
	,DONE: (todo,day)=>changeTodos(todos=>{
		const task=todos.find(a=>a.content==todo)
		let {dones=[]}=task
		dones.push(day)
		task.dones=dones
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
	,TOGGLE_VISIBLE: i=>changeTodos((todos,target=todos[i])=>target.hidden=!!!target.hidden)
	,RESET: a=>(dispatch,getState)=>{
		return changeTodos(todos=>{
			//save history
			let dones=todos.filter(({dones=[]})=>dones.length)
			//Finished.upsert(dones)
			//reset
			todos.forEach(a=>a.dones=[])
		})(disptach,getState)
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

export const TimeManage=({editing})=>(
    <div>
        <center><TodoEditor editing={editing}/></center>

        {editing ? <TaskPadEditor/> : <TaskPad/>}

        <ScorePad/>
    </div>
)

const TodoEditor=connect()(({dispatch, editing, refTask, refForm})=>(
    <form ref={a=>refForm=a} className="grid" onSubmit={e=>{
			e.preventDefault()
			dispatch(ACTION.ADD(refTask.getValue().trim()))
			return false
		}}>
		<AutoComplete ref={a=>refTask=a}
			dataSource={[]}
			floatingLabelText="任务"/>
		<FlatButton label="添加" onClick={e=>refForm.submit()}/>
		{
			editing ?
		 	(<FlatButton label="完成" onClick={e=>dispatch(ACTION.EDITING(0))}/>)
			:(<FlatButton label="编辑" onClick={e=>dispatch(ACTION.EDITING(1))}/>)
		}
    </form>
))

const DAYS=(i,a="日一二三四五六".split(""))=>(a.splice(i,1,<b>今天</b>),a)
const TaskPad=connect(state=>({todos:getCurrentChildTasks(state).filter(a=>!a.hidden)}))
(({todos=[], dispatch, current=new Date().getDay(),days=DAYS(current)})=>(
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
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(0)} day={0} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(1)} day={1} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(2)} day={2} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(3)} day={3} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(4)} day={4} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(5)} day={5} current={current}/></TableRowColumn>
                    <TableRowColumn><TodoStatus todo={task} done={-1!=dones.indexOf(6)} day={6} current={current}/></TableRowColumn>
                </TableRow>
            ))
            }
        </TableBody>
    </Table>
))

const TaskPadEditor=connect(state=>({todos:getCurrentChildTasks(state)}))(({todos=[], dispatch})=>(
	<Table>
        <TableHeader  displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>任务\操作</TableHeaderColumn>
            <TableHeaderColumn>删除</TableHeaderColumn>
			<TableHeaderColumn>隐藏</TableHeaderColumn>
			<TableHeaderColumn colSpan={4}>顺序</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
            todos.map(({content:task, dones=[], hidden},i)=>(
                <TableRow key={i}>
                    <TableRowColumn>{task}</TableRowColumn>
                    <TableRowColumn>
						<IconButton  onClick={e=>dispatch(ACTION.REMOVE_BY_INDEX(i))}>
							<IconRemove/>
						</IconButton>
					</TableRowColumn>
                    <TableRowColumn>
						<Visibility dispatch={dispatch} i={i} visible={!hidden}/>
					</TableRowColumn>
					<TableRowColumn colSpan={4}>
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

const ScorePad=connect(state=>compact(getCurrentChild(state),"score","goal","todo"))(({score, goal,todo})=>(
    <Empty icon={<IconSmile color="yellow"/>} text={`${score}/${goal}`}/>
))

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
