import React from "react"

import BabyTimeManage from "./baby"
import PapaTimeManage from "./papa"

export const reducer=(state={editingBaby:0,editingPapa:0},{type,payload})=>{
	switch(type){
	case `baby/edit`:
		return {...state,editingBaby:payload}
	break
    case `papa/edit`:
		return {...state,editingPapa:payload}
	break
	}
	return state
}

export const TimeManage=props=>(
    <div>
        
        <PapaTimeManage/>
    </div>
)

export default Object.assign(TimeManage,{reducer})
