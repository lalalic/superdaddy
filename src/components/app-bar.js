import React from "react"
import {AppBar} from "material-ui"
import {Current} from "components/current-child"
import * as offline from "qili/components/offline"

export const MyAppBar=({switchable, ...props})=>(
	<div>
		<AppBar {...props} iconElementLeft={<Current switchable={switchable}/>}/>
		<offline.Notification/>
	</div>
)

export default MyAppBar
