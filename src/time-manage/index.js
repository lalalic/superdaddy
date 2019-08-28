import {connect} from "react-redux"
import {compose, mapProps} from "recompose"
import {withMutation} from "qili-app/graphql"
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
		patch4: `Plan:${child.split(":").pop()}`,
		variables:{child,plan},
		mutation: graphql`
			mutation timeManage_status_Mutation($child:ObjectID, $goal:Int, $todo:String){
				plan_reset_achievement(_id:$child, goal:$goal, todo:$todo){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"taskDone",
		variables:{child},
		mutation: graphql`
			mutation timeManage_taskDone_Mutation($child:ObjectID, $task:String, $knowledge:ObjectID, $day:Int, $props:JSON){
				plan_task_done(_id:$child, content:$task, knowledge:$knowledge, day:$day, props:$props ){
					score
					plan{
						...core
					}
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"reset",
		variables:{child},
		mutation: graphql`
			mutation timeManage_reset_Mutation($child:ObjectID){
				plan_reset_week(_id:$child){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},{knowledge})=>{
		const updater=(store,data)=>{
			if(knowledge){
				let node=store.get(knowledge)
				node.setValue(true,"inTask",{child})
			}
		}
		return {
			promise:true,
			name:"add",
			variables:{child},
			mutation: graphql`
				mutation timeManage_add_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID, $fields:JSON){
					plan_todos_add(_id:$child, content:$content, knowledge:$knowledge, fields:$fields){
						...core
					}
				}
			`,
			updater,
			optimisticUpdater:updater,
		}
	}),
	
	withMutation(({child},{knowledge})=>{
		const updater=(store,data)=>{
			if(knowledge){
				let node=store.get(knowledge)
				node.setValue(false,"inTask",{child})
			}
		}
		return {
			promise:true,
			name:"remove",
			variables:{child},
			mutation: graphql`
				mutation timeManage_remove_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
					plan_todos_remove(_id:$child, content:$content, knowledge:$knowledge){
						...core
					}
				}
			`,
			updater,
			optimisticUpdater:updater,
		}
	}),
	
	withMutation(({child})=>({
		promise:true,
		name:"top",
		variables:{child},
		mutation: graphql`
			mutation timeManage_top_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
				plan_todos_top(_id:$child, content:$content, knowledge:$knowledge){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"up",
		variables:{child},
		mutation: graphql`
			mutation timeManage_up_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
				plan_todos_up(_id:$child, content:$content, knowledge:$knowledge){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"down",
		variables:{child},
		mutation: graphql`
			mutation timeManage_down_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
				plan_todos_down(_id:$child, content:$content, knowledge:$knowledge){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"bottom",
		variables:{child},
		mutation: graphql`
			mutation timeManage_bottom_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
				plan_todos_bottom(_id:$child, content:$content, knowledge:$knowledge){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child})=>({
		promise:true,
		name:"toggle",
		variables:{child},
		mutation: graphql`
			mutation timeManage_toggle_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
				plan_todos_toggle(_id:$child, content:$content, knowledge:$knowledge){
					...core
				}
			}
		`,
	})),
	
	mapProps(({dispatch, taskDone,planUpdate,reset,add,remove,removeNth,up,down,top,bottom,toggle, me,...others})=>{
		if(me){
			others.child=me.child.name
		}
		let actions={
			setEditing(payload){
				dispatch({type:"child/plan/edit",payload})
			},
			taskDone,planUpdate,reset,
			add({content,knowledge}){
				if(!content && !knowledge){
					return 
				}
				return add(...arguments)
			},
			remove,removeNth,up,down,top,bottom,toggle,
		}
		if(typeof(props)=="function")
			return {...others,...props({...others,actions})}
		return {...others,actions}
	})
)