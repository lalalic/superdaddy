import React from "react"
import {connect} from "react-redux"
import {AppBar,FloatingActionButton,Avatar} from "material-ui"

import {compact} from "qili-app"

import {getCurrentChild} from "../selector"
import {ACTION} from ".."

export const MyAppBar=connect(state=>compact(getCurrentChild(state),"name","photo"))(({photo,name,dispatch,...others})=>(
	<AppBar {...others}
		iconElementLeft={
			<FloatingActionButton
				mini={true}
				style={{fontSize:"xx-small"}}
				onClick={e=>dispatch(ACTION.SWITCH_CURRENT_CHILD())}>
				{photo ? (<Avatar src={photo}/>) : name}
			</FloatingActionButton>
		}
		/>
))

export default MyAppBar
