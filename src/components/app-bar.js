import React from "react"
import {AppBar} from "material-ui"
import CurrentChild from "components/current-child"

export const MyAppBar=props=>(
	<AppBar {...props} iconElementLeft={<CurrentChild/>}/>
)

export default MyAppBar
