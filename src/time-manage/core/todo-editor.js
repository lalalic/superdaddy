import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, getContext} from "recompose"

import IconButton from "material-ui/IconButton"
import AutoComplete from "material-ui/AutoComplete"

import AppBar from "components/app-bar"

import ReactPrint from "components/print-trigger"

import IconAdd from "material-ui/svg-icons/av/playlist-add"
import IconEdit from "material-ui/svg-icons/editor/mode-edit"
import IconDone from "material-ui/svg-icons/file/cloud-done"
import { PrintPad } from "."


export class TodoEditor extends Component{
	constructor(){
		super(...arguments)
		this.state={}
		this.printArea=React.createRef()
	}
	render(){
		const {print}=this.state
		const {editing, setEditing, add, children, data, child}=this.props
		var refTask
		return (
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
							
							{
							<ReactPrint 
								onClick={()=>this.setState({print:1})} 
								autoPrint={print==2}
								content={()=>this.printArea.current}
								onAfterPrint={()=>this.setState({print:false})}
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
				<div className="flexV">
					{React.cloneElement(children,{data})}
				</div>
				{print && 
				<div style={{display:"none"}}>
					<PrintPad ref={this.printArea} 
						{...{data,child}} 
						onReady={()=>this.setState({print:2})}/>
				</div>}
			</Fragment>
		)
				
	}
}

export default compose(
	getContext({actions:PropTypes.object,router: PropTypes.object}),
	connect((state,{actions:{add,setEditing}})=>({
		add,setEditing,
		editing: state.superdaddy.childPlanEdit,
	})),
)(TodoEditor)
