import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, getContext} from "recompose"

import {IconButton, AutoComplete} from "material-ui"
import ReactPrint from "react-to-print"

import AppBar from "components/app-bar"

import IconAdd from "material-ui/svg-icons/av/playlist-add"
import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"
import IconPrint from "material-ui/svg-icons/action/print"


export const TodoEditor=({editing, setEditing, add, refTask, children, refPrint=React.createRef()})=>(
	<Fragment>
		<AppBar 
			iconElementRight={
				<span>
					<IconButton onClick={e=>add({content:refTask.state.searchText.trim()})}>
						<IconAdd color="white"/>
					</IconButton>
					<IconButton onClick={e=>setEditing(editing ? 0 : 1)}>
						{editing?<IconDone color="white"/> : <IconEdit color="white"/>}
					</IconButton>
					{!editing &&
					<ReactPrint
						trigger={()=><IconButton><IconPrint color="white"/></IconButton>}
						content={()=>refPrint.current}
						pageStyle={`
							body{margin:48px}
							table{width:100%;border-collapse:collapse;page-break-inside: avoid;}
							td{border:1px solid gray;}
							thead{text-align:center;background:lightgray}
						`}
						/>
					}
				</span>
			}
			title={
				<AutoComplete 
					ref={a=>refTask=a}
					dataSource={[]}
					hintText="任务"
					fullWidth={true}
					onKeyDown={e=>e.keyCode==13 && add({content:refTask.state.searchText.trim()})
						.then(refTask.setState({searchText:""}))}
					/>
			}
		/>
		{React.cloneElement(children,{refPrint})}
	</Fragment>
)

export default compose(
	getContext({actions:PropTypes.object}),
	connect((state,{actions:{add,setEditing}})=>({
		add,setEditing,
		editing: state.superdaddy.childPlanEdit,
	})),
)(TodoEditor)
