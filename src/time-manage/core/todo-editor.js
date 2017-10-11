import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose, getContext} from "recompose"

import {IconButton, AutoComplete} from "material-ui"
import AppBar from "components/app-bar"

import IconAdd from "material-ui/svg-icons/av/playlist-add"
import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"

export const TodoEditor=({editing, setEditing, add, refTask})=><AppBar 
	iconElementRight={
		<span>
			<IconButton onClick={e=>add({content:refTask.state.searchText.trim()})}>
				<IconAdd color="white"/>
			</IconButton>
			<IconButton onClick={e=>setEditing(editing ? 0 : 1)}>
				{editing?<IconDone color="white"/> : <IconEdit color="white"/>}
			</IconButton>
		</span>
	}
	title={
		<AutoComplete ref={a=>refTask=a}
			dataSource={[]}
			hintText="任务"
			fullWidth={true}
			onKeyDown={e=>e.keyCode==13 && add({content:refTask.state.searchText.trim()})}
			/>
	}
/>

export default compose(
	getContext({actions:PropTypes.object}),
	connect((state,{actions:{add,setEditing}})=>({
		add,setEditing,
		editing: state.superdaddy.childPlanEdit,
	})),
)(TodoEditor)
