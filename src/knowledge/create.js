import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose,branch,renderComponent} from "recompose"
import {withMutation} from "qili/tools/recompose"
import {graphql} from "react-relay"

import CommandBar from "qili/components/command-bar"
import Empty from "qili/components/empty"
import {withGetToken} from "qili/components/file"

import IconInsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconPreview from "material-ui/svg-icons/content/content-copy"

import AutoForm from "components/auto-form"
import {Content} from "./content"
import {ACTION} from "."

export class CreateKnowledge extends Component{
	state={}
	render(){
		const {knowledge, toKnowledge, create, cancel, selectDocx, preview}=this.props
		const {preview: want2Preview}=this.state

		let form=null
		if(knowledge.hasPrint && want2Preview){
			form=(<AutoForm
					title="参数设置"
					fields={knowledge.hasPrint.fields}
					onSubmit={props=>{
						this.setState({preview:false})
						preview(props)
					}}
					onCancel={()=>this.setState({preview:false})}
					/>
				)
		}


		return (
			<div className="post">
				<div className="knowledge">
					<Content knowledge={knowledge||null}/>
					{form}
				</div>
				<CommandBar className="footbar"
					items={[
						{
							action:"Preview"
							,label:"预览打印"
							,onSelect:a=>{
								if(knowledge.hasPrint){
									preview()
								}else{
									this.setState({preview:true})
								}
							}
							,icon:<IconPreview/>
						},
						{
							action:"save"
							,label:"保存"
							,onSelect:create
						}
						,{
							action:"cancel"
							,label:"放弃"
							,onSelect:cancel
						}
						,{
							action:"newVersion"
							,label:"新版本"
							,icon:<IconCreate/>
							,onSelect:selectDocx
						}
					]}/>
			</div>
		)
	}
}

export default compose(
	withMutation({
		promise:true,
		mutation:graphql`
			mutation create_knowledge_Mutation($knowledge:JSON){
				knowledge_create(knowledge:$knowledge){
					id
					createdAt
				}
			}
		`,
	}),
	withGetToken,
	connect(null,(dispatch,{selectedDocx, knowledge, toKnowledge, mutate, getToken})=>({
		create(){
			selectedDocx.upload({
					getToken:key=>getToken(key)
						.then(a=>{
							return {...a,id:`knowledges:${a.id}`}
						})
				})
				.then(knowledge=>mutate({knowledge}))
				.then(({id})=>{
					toKnowledge(id)
					dispatch(ACTION.RESET())
				})
		},
		cancel:()=>dispatch(ACTION.RESET()),
		selectDocx: ()=>dispatch(ACTION.SELECT_DOCX()),
		preview: props=>dispatch(ACTION.PREVIEW(knowledge,props))
	})),
	branch(({knowledge})=>!knowledge, renderComponent(({selectDocx})=>
		<Empty icon={<IconInsertFile onClick={selectDocx}/>} text="选择docx文案文件"/>
	)),
)(CreateKnowledge)
