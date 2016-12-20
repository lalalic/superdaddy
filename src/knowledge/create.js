import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import InsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"

import uiKnowledge from './info'

import {ACTION, Content} from "."

const {Empty, CommandBar}=UI

export const NewKnowledge=({knowledge, dispatch},{router})=>{
	let content, primary, commands

	if(!knowledge){
		content=(<Empty icon={<InsertFile onClick={a=>dispatch(ACTION.SELECT_DOCX())}/>}
			text="选择docx文案文件"/>)
	}else{
		content=(<div className="knowledge"><Content {...knowledge}/></div>)
		commands=[
			{
				action:"保存"
				,onSelect:a=>dispatch(ACTION.CREATE()).then(a=>router.replace(`/knowledge/${a._id}`))
			}
			,{
				action:"新版本"
				,icon:<IconCreate/>
				,onSelect:a=>dispatch(ACTION.SELECT_DOCX())
			}
		]
		primary="保存"
	}

	return (
		<div className="post">
			{content}
			{commands && (<CommandBar
				className="footbar"
				primary={primary}
				items={commands}/>)}
		</div>
	)
}

NewKnowledge.contextTypes={router:PropTypes.object}

export default NewKnowledge
