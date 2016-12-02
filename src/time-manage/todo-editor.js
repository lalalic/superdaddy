import React, {Component, PropTypes} from "react"
import {IconButton, AutoComplete} from "material-ui"

import {connect} from "react-redux"

import IconAdd from "material-ui/svg-icons/av/playlist-add"
import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"

import AppBar from "../components/app-bar"

import {ACTION} from "."


export const TodoEditor=connect()(({dispatch, editing, refTask, refForm})=>(
	<AppBar
		iconElementRight={
			<span>
				<IconButton onClick={e=>dispatch(ACTION.ADD(refTask.getValue().trim()))}>
					<IconAdd color="white"/>
				</IconButton>
				<IconButton onClick={e=>dispatch(ACTION.EDITING(editing ? 0 : 1))}>
					{editing?<IconDone color="white"/> : <IconEdit color="white"/>}
				</IconButton>
			</span>
		}
		title={
			<AutoComplete ref={a=>refTask=a}
				dataSource={[]}
				hintText="任务"
				fullWidth={true}
				onKeyDown={e=>e.keyCode==13 && dispatch(ACTION.ADD(refTask.getValue().trim()))}
				/>
		}
		/>
))
