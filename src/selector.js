const DOMAIN="superdaddy"
export const currentChild=state=>{
	try{
		return state.entities.children[state[DOMAIN].child]
	}catch(e){
		null
	}
}
