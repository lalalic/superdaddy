import React, {Component, PropTypes} from "react"
import {IconButton, AutoComplete} from "material-ui"

import {connect} from "react-redux"
import {compact, ENTITIES} from "qili-app"
import {normalize} from "normalizr"

import IconDone from "material-ui/svg-icons/file/cloud-done"

import {Family,Task} from "db"

import {TaskPad as _TaskPad} from "./task-pad"
import {TaskPadEditor as _TaskPadEditor} from "./task-pad-editor"
import {TodoEditor as _TodoEdtior} from "./todo-editor"
import {ScorePad as _ScorePad} from "./score-pad"

import {getCurrentChild, getCurrentChildTarget, getCurrentChildTasks} from "$/selector"

import {ACTION as Comment_ACTION} from "qili-app/lib/components/comment"

export function create(AppBar, domain){
	const DOMAIN=domain

	let comment=a=>a
	if(DOMAIN=="baby"){
		comment=(child,content)=>dispatch=>dispatch(Comment_ACTION.CREATE(Family._name,child._id, content,{system:true}))
	}

	const changeTodos=f=>(dispatch,getState)=>{
		const state=getState()
		const child=getCurrentChild(state)
		if(!child.targets)
			child.targets={}
		const target=child.targets[domain]||{}
		if(target.todoWeek==undefined)
			target.todoWeek=Task.getWeekStart()

		let {todos=[]}=target

		let handled=f(target.todos=[...todos], target, child)
		if(handled===false)
			return Promise.resolve()

		if(!(handled && handled.then))
			handled=Promise.resolve()
		child.targets[domain]=target
		return handled.then(a=>Family.upsert(child))
			.then(updated=>{
				dispatch(ENTITIES(normalize(updated, Family.schema).entities))
				return updated
			})
	}
	const ACTION={
		SET_GOAL: (goal, todo)=>(dispatch,getState)=>{
			const child=getCurrentChild(getState())
			if(!child.targets)
				child.targets={}
			const target=child.targets[domain]||{}
			target.score=Math.max((target.score||0)-(target.goal||0),0)
			target.goal=goal
			target.todo=todo
			child.targets[domain]=target
			return Family.upsert(child)
				.then(updated=>dispatch(ENTITIES(normalize(updated,Family.schema).entities)))
				.then(a=>comment(child,`我设置新的目标了，用${goal}个😊就可以得到${todo}`)(dispatch))
		},
		ADD: todo=>(dispatch, getState)=>{
			if(!todo)
				return Promise.resolve()
			return changeTodos(todos=>{
				switch(typeof(todo)){
				case "object":
					if(!todos.find(a=>a.knowledge==todo.knowledge))
						todos.push(todo)
					break
				default:
					if(!todos.find(a=>a.content==todo))
						todos.push({content:todo})
				}
			})(dispatch,getState)
				.then(child=>comment(child,`这周又给我加了个新任务：${todo.content||todo}`)(dispatch))
		}
		,REMOVE: todo=>(dispatch,getState)=>changeTodos(todos=>{
				let i=typeof(todo)=='object'
					? todos.findIndex(a=>a.knowledge==todo._id)
					: todos.findIndex(a=>a.content==todo && !a.knowledge);

				if(i!=-1)
					todos.splice(i,1)
			})(dispatch,getState).then(child=>comment(child,`Yeah, 这周不用做[${todo.content||todo}]了`)(dispatch))

		,REMOVE_BY_INDEX: i=>changeTodos(todos=>todos.splice(i,1))

		,DONE: (todo,day)=>(dispatch,getState)=>changeTodos((todos,target)=>{
				const task=todos.find(a=>a.content==todo)
				let {dones=[]}=task
				dones.push(day)
				task.dones=dones
				target.score=target.score+1
				target.totalScore=(target.totalScore||0)+1
			})(dispatch,getState).then(child=>{
				let {goal,todo:target,score}=child.targets.baby
				let content=null
				let left=goal-score
				if(score==1){
					comment(child,`Yeah, ${todo}完成了，得到本周的第一个笑脸了，加油`)(dispatch)
				}else if(left==0){
					comment(child,`Yeah,任务完成，可以得到[${target}]了`)(dispatch)
				}else if(left<3){
					comment(child,`Yeah, ${todo}完成了，又得到一个笑脸了，还差${left}个笑脸就可以得到${target}了，坚持`)(dispatch)
				}else{
					comment(child,`Yeah, ${todo}完成了，又得到一个笑脸了，一共有${score}个笑脸了，加油`)(dispatch)
				}
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
			return changeTodos((todos,target,child)=>{
				const applyMonthPlan=()=>{
					if(child.plan &&  child.plan.months){
						let {knowledges=[]}=(child.plan.months[new Date().getMonth()]||{})
						knowledges.forEach(({_id,title,score, days})=>{
							if(-1==todos.findIndex(({knowledge})=>knowledge==_id)){
								todos.push({knowledge:_id, content:title, score,  days})
							}
						})
					}
				}
				//save history
				let dones=todos.filter(({dones=[]})=>dones.length)
				if(dones.length){
					return Task.finishWeekTasks(child, dones, domain).then(a=>{
						todos.forEach(a=>a.dones=[])
						target.todoWeek=Task.getWeekStart()
						applyMonthPlan()
					})
				}else{
					target.todoWeek=Task.getWeekStart()
					applyMonthPlan()
				}
			})(dispatch,getState)
		}
	}

	const reducer=(state={},{type,payload})=>{
		switch(type){
		case `${DOMAIN}/edit`:
			return {...state,[domain]:payload}
		break
		}
		return state
	}

	const ScorePad=connect(state=>({...compact(getCurrentChildTarget(state,domain),"score","goal","todo")}))(_ScorePad)
	const TodoEditor=_TodoEdtior
	const TaskPad=connect(state=>({todos:getCurrentChildTasks(state,domain).filter(a=>!a.hidden)}))(_TaskPad)
	const TaskPadEditor=connect(state=>({todos:getCurrentChildTasks(state,domain)}))(_TaskPadEditor)

	const Provider=connect()(class extends Component{
		static childContextTypes={
			appBar: PropTypes.element,
			ACTION: PropTypes.object,
			dispatch: PropTypes.func
		}
		getChildContext(){
			return {
				appBar: (<AppBar/>),
				ACTION,
				dispatch: this.props.dispatch
			}
		}

		render(){
			return React.Children.only(this.props.children)
		}
	})

	const TimeManage=connect(state=>{
		let target=getCurrentChildTarget(state,domain)
		const {todoWeek=Task.getWeekStart(), goal=0, score=0}=target
		return {
			editing:state.ui.time[domain],
			todoWeek,
			goal: domain=="baby" ? goal : Number.MAX_SAFE_INTEGER,
			score
		}
	})(({goal, score, editing, todoWeek, dispatch})=>(
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
									{
										React.createElement(AppBar,{
											iconElementRight:(
												<IconButton onClick={e=>dispatch(ACTION.RESET())}>
													<IconDone color="white"/>
												</IconButton>
											),
											title:`保存前${new Date(week).relative(new Date(todoWeek))/7}周完成情况`
										})
									}
									<TaskPad current={99}/>
								</div>
							)
						}
					}
				})(Task.getWeekStart())
			}
		</div>
	))

	let TimeManager=(props=>(<Provider><TimeManage {...props}/></Provider>))

	TimeManager.reducer=reducer
	TimeManager.ScorePad=props=>(<Provider><ScorePad {...props}/></Provider>)
	TimeManager.ACTION=ACTION

	return TimeManager
}

export default create
