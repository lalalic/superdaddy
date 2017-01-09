import {Family,Knowledge,Table} from './db'

export const getCurrentChild=state=>{
	try{
		return state.entities.children[state.superdaddy.child]
	}catch(e){

	}
	return null
}

export const getChild=(state,id)=>{
	try{
		return state.entities.children[id]
	}catch(e){

	}
	return null
}

export const getCurrentChildTasks=(state,domain="baby")=>{
	let target=getCurrentChildTarget(state,domain)
	const {todos=[]}=target
	return todos
}

export const getCurrentChildTarget=(state,domain="baby")=>{
	const child=getCurrentChild(state)
	if(child && child.targets && child.targets[domain])
		return child.targets[domain]
	return {}
}

export const getKnowledges=state=>{
	try{
		const key=Knowledge.schema.getKey()
		const all=state.entities[key]
		const ids=state.ui.knowledge.knowledges
		if(all && ids)
			return ids.map(id=>all[id])
	}catch(e){

	}
	return []
}

export const getKnowledge=state=>{
	try{
		const key=Knowledge.schema.getKey()
		const all=state.entities[key]
		const id=state.routing.params._id
		const selectedDocx=state.ui.knowledge.selectedDocx
		if(all && id && all[id]){
			if(selectedDocx)
				return Object.assign({}, all[id], selectedDocx.knowledge)
			else
				return all[id]
		}
	}catch(e){

	}
	return null
}
