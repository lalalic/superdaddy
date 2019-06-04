import {REDUCER as knowledge_reducer} from "knowledge"
import {reducer as plan_reducer} from "time-manage"
import { Knowledge } from "./knowledge";


export const DOMAIN="superdaddy"

export const ACTION={
	CURRENT_CHILD: payload=>({
		type:`@@${DOMAIN}/CURRENT_CHILD`,
		payload,
	}),
	QUERY: payload=>({
		type:`@@${DOMAIN}/QUERY`,
		payload,
	})
}

export function reducer(state={
		qs:{
			title:"",
			mine:false,
			favorite:false,
			tasked:false,
			tasking:false,
			categories:[],
			tags:[]
		}
	},action){
	const {type,payload}=action
	state=knowledge_reducer(state,action)
	state=plan_reducer(state,action)
	switch(type){
	case `@@${DOMAIN}/CURRENT_CHILD`:
		return {...state, current:payload}
	case `@@${DOMAIN}/QUERY`:
		return {...state, qs:{...state.qs,...payload}}
	}
	return state
}
