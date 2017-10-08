import React, {Component, PropTypes} from "react"
import {IconButton, AutoComplete} from "material-ui"

import IconAdd from "material-ui/svg-icons/av/playlist-add"
import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"

export const TodoEditor=({editing, refTask, refForm},{dispatch,ACTION,appBar})=>React.cloneElement(appBar, {
	iconElementRight:(
		<span>
			<IconButton onClick={e=>dispatch(ACTION.ADD(refTask.state.searchText.trim()))}>
				<IconAdd color="white"/>
			</IconButton>
			<IconButton onClick={e=>dispatch(ACTION.EDITING(editing ? 0 : 1))}>
				{editing?<IconDone color="white"/> : <IconEdit color="white"/>}
			</IconButton>
		</span>
	),
	title:(
		<AutoComplete ref={a=>refTask=a}
			dataSource={[]}
			hintText="任务"
			fullWidth={true}
			onKeyDown={e=>e.keyCode==13 && dispatch(ACTION.ADD(refTask.state.searchText.trim()))}
			/>
	)
})

TodoEditor.contextTypes={
	appBar: PropTypes.element,
	ACTION: PropTypes.object,
	dispatch: PropTypes.func
}
