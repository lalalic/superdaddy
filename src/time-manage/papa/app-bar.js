import React from "react"
import {AppBar,FloatingActionButton} from "material-ui"

export const MyAppBar=(props=>(
	<AppBar {...props}
		iconElementLeft={
			<FloatingActionButton
				mini={true}
				style={{fontSize:"xx-small"}}
				>
				爸爸
			</FloatingActionButton>
		}
		/>
))

export default MyAppBar
