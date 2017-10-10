import {connect} from "react-redux"
import {compose, withProps, mapProps} from "recompose"
import {withMutation} from "qili/tools/recompose"
import TimeManage from "./core"

export * from "./core"

export default TimeManage

export function reducer(state={},{type,payload}){
	switch(type){
		case "child/plan/edit":
			return {...state, childPlanEdit:payload}
	}
	return state
}

export const withPlanActions=props=>compose(
	connect(state=>({
		child:state.superdaddy.current,
	})),
	
	withMutation(({child}, plan)=>({
		promise:true,
		name:"planUpdate",
		patch4: `plans:${child.split(":").pop()}`,
		variables:{child,plan},
		mutation: graphql`
			mutation timeManage_status_Mutation($child:ObjectID, $plan: JSON){
				plan_update(_id:$child, plan:$plan){
					id
				}
			}
		`,
	})),
	
	withMutation(({child},plan)=>({
		promise:true,
		name:"taskDone",
		patch4: `plans:${child.split(":").pop()}`,
		variables:{child,plan},
		mutation: graphql`
			mutation timeManage_taskDone_Mutation($child:ObjectID, $task:String, $knowledge:ObjectID, $day:Int){
				plan_task_done(_id:$child, content:$task, knowledge:$knowledge, day:$day ){
					score
					...taskPad
				}
			}
		`,
	})),
	
	withMutation(({child},plan)=>({
		promise:true,
		name:"reset",
		patch4: `plans:${child.split(":").pop()}`,
		variables:{child,plan},
		mutation: graphql`
			mutation timeManage_taskDone_Mutation($child:ObjectID){
				plan_reset(_id:$child){
					score
					...taskPad
				}
			}
		`,
	})),	
	
	withFragment(graphql`
		fragment timeManage on Plan{
			...taskPad
		}
	`),
	
	withProps(({dispatch,data, taskDone,planUpdate,reset})=>{
		const todos=data.todos||[]
		const exists=(content,knowledge)=>1+todos.findIndex(a=>knowledge ? a.knowledge===knowledge : a.content===content)
		const actions={
			planUpdate,
			setEditing(payload){
				dispatch({type:"child/plan/edit",payload})
			},
			
			add(content,knowledge){
				if(exists(content,knowledge))
					return Promise.resolve()

				return planUpdate({todos:[...todos,{content,knowledge}]})
			},
			
			remove(content,knowledge,i){
				if(!(i=exists(content,knowledge)))
					return Promise.resolve()
				return actions.removeNth(i-1)
			},
			
			removeNth(i){
				return planUpdate({todos:[...todos].splice(i,1)})
			},
			
			up(i){
				let target=todos[i]
				todos.splice(i,1)
				todos.splice((i-1)%(todos.length+1),0,target)
				return planUpdate({todos})
			},
			down(i){
				let target=todos[i]
				todos.splice(i,1)
				todos.splice((i+1)%(todos.length+1),0,target)
				return planUpdate({todos})
			},
			
			top(i){
				let target=todos[i]
				todos.splice(i,1)
				todos.unshift(target)
				return planUpdate({todos})
			},
			
			bottom(i){
				let target=todos[i]
				todos.splice(i,1)
				todos.push(target)
				return planUpdate({todos})
			},
			
			toggleVisible(i){
				todos[i].hidden=!!!todos[i].hidden
				return planUpdate({todos})
			},
			
			taskDone(content,day,props,knowledge){
				return taskDone({day,content,props,knowledge})
			},
			
			reset,
		}
		return {actions}
	}),
	mapProps(({dispatch,reset, taskDone, planUpdate, ...others})=>{
		if(typeof(props)=="function")
			return {...others, ...props(others)}
		return others
	}),
)