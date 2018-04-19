import {connect} from "react-redux"
import {compose, mapProps} from "recompose"
import {withMutation} from "qili"
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
			mutation timeManage_taskDone_Mutation($child:ObjectID, $task:String, $knowledge:ObjectID, $day:Int){
				plan_task_done(_id:$child, content:$task, knowledge:$knowledge, day:$day ){
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
				plan_reset(_id:$child){
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
				mutation timeManage_add_Mutation($child:ObjectID, $content:String, $knowledge:ObjectID){
					plan_todos_add(_id:$child, content:$content, knowledge:$knowledge){
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
	

	withMutation(({child},i)=>({
		promise:true,
		name:"removeNth",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_removeNth_Mutation($child:ObjectID, $i:Int){
				plan_todos_removeNth(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},i)=>({
		promise:true,
		name:"top",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_top_Mutation($child:ObjectID, $i:Int){
				plan_todos_top(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},i)=>({
		promise:true,
		name:"up",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_up_Mutation($child:ObjectID, $i:Int){
				plan_todos_up(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},i)=>({
		promise:true,
		name:"down",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_down_Mutation($child:ObjectID, $i:Int){
				plan_todos_down(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},i)=>({
		promise:true,
		name:"bottom",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_bottom_Mutation($child:ObjectID, $i:Int){
				plan_todos_bottom(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	withMutation(({child},i)=>({
		promise:true,
		name:"toggle",
		variables:{child,i},
		mutation: graphql`
			mutation timeManage_toggle_Mutation($child:ObjectID, $i:Int){
				plan_todos_toggle(_id:$child, i:$i){
					...core
				}
			}
		`,
	})),
	
	mapProps(({dispatch, taskDone,planUpdate,reset,add,remove,removeNth,up,down,top,bottom,toggle,...others})=>{
		let actions={
			setEditing(payload){
				dispatch({type:"child/plan/edit",payload})
			},
			taskDone,planUpdate,reset,add,remove,removeNth,up,down,top,bottom,toggle,
		}
		if(typeof(props)=="function")
			return {...others,...props({...others,actions})}
		return {...others,actions}
	})
)