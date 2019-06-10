import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,branch,renderComponent,getContext} from "recompose"
import {withMutation, CommandBar, Empty, File, ACTION as qiliACTION} from "qili-app"
import {graphql} from "react-relay"

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
			<Fragment>
				<div style={{flex:"1 1 100%", overflowY:"scroll"}}>
					<Content knowledge={knowledge||null}/>
					{form}
				</div>
				<CommandBar style={{flex:"none"}}
					items={[
						{
							action:"Back",
							label:"放弃",
							onSelect:{cancel}
						}
						,{
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
							action:"newVersion"
							,label:"新版本"
							,icon:<IconCreate/>
							,onSelect:selectDocx
						}
					]}/>
			</Fragment>
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
	File.withUpload,
	connect(null,(dispatch,{selectedDocx, knowledge, toKnowledge, mutate, upload,getToken,goBack})=>({
		create(){
				dispatch(qiliACTION.LOADING(true))
				return getToken()
					.then(({_id,token})=>selectedDocx.upload(`knowledges:${_id}`,upload,null,token))
					.then(knowledge=>mutate({knowledge}))
					.then(({id})=>{
						toKnowledge(id)
						dispatch(ACTION.RESET())
					})
					.finally(()=>dispatch(qiliACTION.LOADING(false)))
		},
		cancel:()=>{
			goBack()
			dispatch(ACTION.RESET())
		},
		selectDocx: ()=>dispatch(ACTION.SELECT_DOCX()),
		preview: props=>dispatch(ACTION.PREVIEW(knowledge,props))
	})),
	branch(({knowledge})=>!knowledge, renderComponent(({selectDocx})=>
		<Empty icon={<IconInsertFile onClick={selectDocx}/>} text="选择docx文案文件"/>
	)),
)(CreateKnowledge)
