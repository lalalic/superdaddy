import React,{Fragment} from "react"
import {AppBar} from "material-ui"
import {Current} from "components/current-child"
import {OfflineUI} from "qili-app"

export const MyAppBar=({switchable, ...props})=>(
	<Fragment>
		<AppBar {...props} iconElementLeft={<Current switchable={switchable}/>}/>
		<OfflineUI.Notification/>
	</Fragment>
)

export default MyAppBar
