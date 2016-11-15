import React, {Component, PropTypes} from "react"
import {TextField,FlatButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {connect} from "react-redux"
import {compact, ENTITIES, UI} from "qili-app"
import {normalize} from "normalizr"

import IconSmile from "material-ui/svg-icons/social/mood"
import {getCurrentChild, getCurrentChildTasks} from "./selector"
import {Family} from "./db"

const {Empty}=UI

export const ACTION={
	ADD: todo=>(dispatch, getState)=>{
		if(!todo)
			return Promise.resolve()
		const state=getState()
		const child=getCurrentChild(state)
		let {todos=[]}=child
		switch(typeof(todo)){
		case "object":
			child.todos=[...todos, todo]
			break
		default:
			if(!todos.find(a=>a.content==todo))
				child.todos=[...todos, {content:todo}]
		}
		if(child.todos!=todos){
			return Family.upsert(child)
				.then(updated=>dispatch(ENTITIES(normalize(updated, Family.schema).entities)))
		}else{
			return Promise.resolve()
		}
	}
	,REMOVE: todo=>(dispatch, getState)=>{
		if(!todo)
			return Promise.resolve()
		const state=getState()
		const child=getCurrentChild(state)
		let {todos=[]}=child
		switch(typeof(todo)){
		case "object":
			child.todos=todos.filter(a=>a._id!=todo._id)
			break
		default:
			child.todos=todos.filter(a=>a.content!=todo)
		}
		
		if(child.todos!=todos){	
			return Family.upsert(child)
				.then(updated=>dispatch(ENTITIES(normalize(updated, Family.schema).entities)))
		}else{
			return Promise.resolve()
		}
	}
	,DONE: (todo,day)=>(dispatch, getState)=>{
		const state=getState()
		const child=getCurrentChild(state)
		const {todos}=child
		const task=todos.find(a=>a.content==todo)
		let {dones=[]}=task
		dones.push(day)
		task.dones=dones
		child.todos=[...todos]
		return Family.upsert(child)
				.then(updated=>dispatch(ENTITIES(normalize(updated, Family.schema).entities)))
	}
}

export const TimeManage=({})=>(
    <div>
        <center><TodoEditor/></center>

        <TaskPad/>

        <ScorePad/>
    </div>
)

const TodoEditor=connect()(({dispatch, refTask, refForm})=>(
    <form ref={a=>refForm=a} className="grid" onSubmit={e=>{
			e.preventDefault()
			dispatch(ACTION.ADD(refTask.getValue().trim()))	
			return false
		}}>
        
		<TextField ref={a=>refTask=a} floatingLabelText="任务" />
        <FlatButton label="添加" onClick={e=>refForm.submit()}/>
    </form>
))

const TaskPad=connect(state=>({todos:getCurrentChildTasks(state)}))(({todos=[]})=>(
    <Table>
        <TableHeader   displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>任务\星期</TableHeaderColumn>
            <TableHeaderColumn>日</TableHeaderColumn>
            <TableHeaderColumn>一</TableHeaderColumn>
            <TableHeaderColumn>二</TableHeaderColumn>
            <TableHeaderColumn>三</TableHeaderColumn>
            <TableHeaderColumn>四</TableHeaderColumn>
            <TableHeaderColumn>五</TableHeaderColumn>
            <TableHeaderColumn>六</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
            todos.map(({content:task, dones=[]},i)=>(
                <TableRow key={i}>
                    <TableRowColumn>{task}</TableRowColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(0)} day={0}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(1)} day={1}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(2)} day={2}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(3)} day={3}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(4)} day={4}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(5)} day={5}/></TableHeaderColumn>
                    <TableHeaderColumn><TodoStatus todo={task} done={-1!=dones.indexOf(6)} day={6}/></TableHeaderColumn>
                </TableRow>
            ))
            }
        </TableBody>
    </Table>
))

const TodoStatus=connect()(({todo,done, day, dispatch, current=new Date().getDay()})=>{
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

export default TimeManage
