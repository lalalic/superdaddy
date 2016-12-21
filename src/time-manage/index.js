import React, {Component, PropTypes} from "react"
import {IconButton, AutoComplete} from "material-ui"

import {connect} from "react-redux"
import {compact, ENTITIES} from "qili-app"
import {normalize} from "normalizr"

import {getCurrentChild} from "../selector"

import {Family,Task} from "../db"

import AppBar from "../components/app-bar"
import {TaskPad} from "./task-pad"
import {TaskPadEditor} from "./task-pad-editor"
import {TodoEditor} from "./todo-editor"

import IconDone from "material-ui/svg-icons/file/cloud-done"

import ScorePad from "./score-pad"

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
		child.totalScore=(child.totalScore||0)+1
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

export const TimeManage=({dispatch, goal, score, editing, todoWeek})=>(
    <div>
		{
			(week=>{
				if(!goal){
					return <ScorePad/>
				}else{
					let isCurrentWeek=todoWeek==week
					if(isCurrentWeek){
						let accomplished=goal<=score
						if(!accomplished){
							return (
								<div>
									<TodoEditor editing={editing}/>
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
										<IconButton onClick={e=>dispatch(ACTION.RESET())}>
											<IconDone color="white"/>
										</IconButton>
									}
									title={`保存前${week-todoWeek}周完成情况`}
									/>
								<TaskPad current={99}/>
							</div>
						)
					}
				} 
			})(new Date().getWeek())
		}
    </div>
)

export default Object.assign(TimeManage,{reducer})
