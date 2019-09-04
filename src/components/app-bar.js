import React,{Fragment} from "react"
import AppBar from "material-ui/AppBar"
import {Current} from "components/current-child"
import * as OfflineUI from "qili-app/components/offline"

export const MyAppBar=({switchable, ...props})=>(
	<Fragment>
		<AppBar {...props} style={{flex:'none'}} iconElementLeft={<Current switchable={switchable}/>}/>
		<OfflineUI.Notification/>
	</Fragment>
)

export default MyAppBar
