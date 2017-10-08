import React from "react"
import {AppBar} from "material-ui"
import {Current} from "components/current-child"

export const MyAppBar=props=>(
	<AppBar {...props} iconElementLeft={<Current/>}/>
)

export default MyAppBar
