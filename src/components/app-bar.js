import React from "react"
import {AppBar} from "material-ui"
import {Current} from "components/current-child"

export const MyAppBar=({switchable, ...props})=>(
	<AppBar {...props} iconElementLeft={<Current switchable={switchable}/>}/>
)

export default MyAppBar
