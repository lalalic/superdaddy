import React, {Component,Fragment} from "react"

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'

import {connect} from "react-redux"
import {compose,branch,renderComponent} from "recompose"
import { CommandBar, Empty, File, ACTION as qiliACTION} from "qili-app"
import {withMutation} from "qili-app/graphql"

import IconInsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconPreview from "material-ui/svg-icons/content/content-copy"
import IconHomework from "material-ui/svg-icons/notification/event-note"

import AutoForm from "components/auto-form"
import {Content} from "./content"
import {ACTION} from "."
import {asModule} from "./code"

import {print} from "components/print-trigger"

export class CreateKnowledge extends Component{
	state={}
	get homeworkFields(){
		const {knowledge:{fields, hasHomework:props}}=this.props
		if(props){
			return Object.keys(props)
				.map(k=>fields.find(a=>a.name==k))
				.filter(a=>!!a)
				.map(a=>({...a,value:props[a.name]}))
		}
		return []
	}

	get previewFields(){
		const {knowledge:{fields, hasPrint:props}}=this.props
		if(props){
			return Object.keys(props)
				.map(k=>fields.find(a=>a.name==k))
				.filter(a=>!!a)
				.map(a=>({...a,value:props[a.name]}))
		}
		return []
	}

	preview(knowledge, props){
		const {preview}=this.props
		if(knowledge.code){
			asModule(knowledge.code)
				.then(plugin=>print({html:plugin.preview(props)}))
		}else if(knowledge.template){
			preview(...arguments)
		}
	}

	outputHomework(knowledge, props){
		const {outputHomework}=this.props
		if(knowledge.code){
			asModule(knowledge.code)
				.then(plugin=>print({html:plugin.homework(props)}))
		}else if(knowledge.template){
			outputHomework(...arguments)
		}
	}

	render(){
		const {knowledge, create, cancel, selectDocx}=this.props
		const tools=[]
		if(knowledge.hasHomework){
			tools.push(<BottomNavigationItem
						key="homework"
						label="作业"
						icon={<IconHomework color="aqua"/>}
						onClick={()=>{
							if(this.homeworkFields.length==0){
								this.outputHomework(knowledge)
							}else{
								this.setState({homework:true})
							}
						}}
						/>)
		}

		if(knowledge.hasPrint){
			tools.push(<BottomNavigationItem
						key="preview"
						label="预览打印"
						icon={<IconPreview color="fuchsia"/>}
						onClick={()=>{
							if(this.printFields.length==0){
								this.preview(knowledge)
							}else{
								this.setState({preview:true})
							}
						}}
						/>)
		}

		const {homework, preview:want2Preview}=this.state
		let homeworkForm=null, previewForm=null
		if(homework){
			homeworkForm=(<AutoForm
				title="参数设置"
				fields={this.homeworkFields}
				onSubmit={props=>{
					this.setState({homework:false})
					this.outputHomework(knowledge, props)
				}}
				onCancel={()=>this.setState({homework:false})}
				/>
			)
		}

		if(want2Preview){
			previewForm=(<AutoForm
					title="参数设置"
					fields={this.printFields}
					onSubmit={props=>{
						this.setState({preview:false})
						this.preview(knowledge,props)
					}}
					onCancel={()=>this.setState({preview:false})}
					/>
				)
		}


		return (
			<Fragment>
				<div style={{flex:"1 1 100%", overflowY:"scroll"}}>
					<Content knowledge={knowledge||null}/>
					<article>
						<section>
							<BottomNavigation>
							{tools}
							</BottomNavigation>
						</section>
					</article>
					{previewForm}
					{homeworkForm}
				</div>
				<CommandBar style={{flex:"none"}}
					items={[
						{
							action:"Back",
							label:"放弃",
							onSelect:{cancel}
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
						},
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
					.then(({_id,token})=>selectedDocx.upload(`Knowledge:${_id}`,upload,null,token))
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
