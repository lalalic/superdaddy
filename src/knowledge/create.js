import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import InsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconPreview from "material-ui/svg-icons/content/content-copy"

import uiKnowledge from './info'
import AutoForm from "components/auto-form"

import {ACTION, Content} from "."

const {Empty, CommandBar}=UI

export class NewKnowledge extends Component{
	state={}
	render(){
		const {knowledge, dispatch}=this.props
		const {router}=this.context
		const {preview}=this.state

		let content, commands

		if(!knowledge){
			content=(<Empty icon={<InsertFile onClick={a=>dispatch(ACTION.SELECT_DOCX())}/>}
				text="选择docx文案文件"/>)
		}else{
			let form=null
			if(knowledge.hasPrint && preview){
				form=(<AutoForm 
						title="参数设置"
						fields={knowledge.hasPrint.fields}
						onSubmit={props=>{
							this.setState({preview:false})
							dispatch(ACTION.PREVIEW(knowledge, props))
						}}
						onCancel={()=>this.setState({preview:false})}
						/>
					)
			}
			content=(<div className="knowledge"><Content {...knowledge}/>{form}</div>)
			commands=[
				{
					action:"Preview"
					,label:"预览打印"
					,onSelect:a=>{
						if(knowledge.hasPrint){
							dispatch(ACTION.PREVIEW(knowledge))
						}else{
							this.setState({preview:true})
						}
					}
					,icon:<IconPreview/>
				},
				{
					action:"save"
					,label:"保存"
					,onSelect:a=>dispatch(ACTION.CREATE()).then(a=>router.replace(`/knowledge/${a._id}`))
				}
				,{
					action:"cancel"
					,label:"放弃"
					,onSelect:a=>dispatch(ACTION.CANCEL())
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
}

NewKnowledge.contextTypes={router:PropTypes.object}

export default NewKnowledge
