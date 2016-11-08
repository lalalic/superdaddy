
export const getCurrentChild=state=>{
	try{
		return state.entities.children[state.superdaddy.child]
	}catch(e){
		null
	}
}

export const getChild=(state,id)=>{
	try{
		return state.entities.children[id]
	}catch(e){
		null
	}
}
