import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import InsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconPreview from "material-ui/svg-icons/content/content-copy"

import uiKnowledge from './info'

import {ACTION, Content} from "."

const {Empty, CommandBar}=UI

export const NewKnowledge=({knowledge, dispatch},{router})=>{
	let content, commands

	if(!knowledge){
		content=(<Empty icon={<InsertFile onClick={a=>dispatch(ACTION.SELECT_DOCX())}/>}
			text="选择docx文案文件"/>)
	}else{
		content=(<div className="knowledge"><Content {...knowledge}/></div>)
		commands=[
			"back",
			{
				action:"Preview"
                ,label:"预览打印"
                ,onSelect:a=>dispatch(ACTION.PREVIEW())
                ,icon:<IconPreview/>
			},
			{
				action:"save"
				,label:"保存"
				,onSelect:a=>dispatch(ACTION.CREATE()).then(a=>router.replace(`/knowledge/${a._id}`))
			}
			,{
				action:"newVersion"	
				,label:"新版本"
				,icon:<IconCreate/>
				,onSelect:a=>dispatch(ACTION.SELECT_DOCX())
			}
		]
	}

	return (
		<div className="post">
			{content}
			{commands && (<CommandBar
				className="footbar"
				items={commands}/>)}
		</div>
	)
}

NewKnowledge.contextTypes={router:PropTypes.object}

export default NewKnowledge
