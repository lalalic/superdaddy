import React from "react"
import {AppBar} from "material-ui"
import {Current} from "components/current-child"
import {OfflineUI} from "qili"

export const MyAppBar=({switchable, ...props})=>(
	<div>
		<AppBar {...props} iconElementLeft={<Current switchable={switchable}/>}/>
		<OfflineUI.Notification/>
	</div>
)

export default MyAppBar
