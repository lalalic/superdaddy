import React from "react"
import {connect} from "react-redux"
import {FloatingActionButton,Avatar} from "material-ui"

import {compact} from "qili-app"

import {getCurrentChild} from "$/selector"
import {ACTION} from "family/baby"

export const CurrentChild=connect(state=>compact(getCurrentChild(state),"name","photo"))(({photo,name,dispatch,...others})=>(
	<FloatingActionButton
		mini={true}
		style={{fontSize:"xx-small"}}
		onClick={e=>dispatch(ACTION.SWITCH_CURRENT_CHILD())}>
		{photo ? (<Avatar src={photo}/>) : name}
	</FloatingActionButton>
))

export default CurrentChild
