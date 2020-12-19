import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose} from "recompose"
import {ACTION as qiliACTION} from "qili-app"
import CommandBar from "qili-app/components/command-bar"
import wechat from "qili-app/components/wechat"
import File from "qili-app/components/file"

import {withMutation, withFragment} from "qili-app/graphql"
import {connect} from "react-redux"

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'

import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconCancel from "material-ui/svg-icons/navigation/cancel"
import IconAddTask from "material-ui/svg-icons/action/alarm-add"
import IconRemoveTask from "material-ui/svg-icons/action/alarm-off"
import IconFavorite from "material-ui/svg-icons/action/favorite-border"
import IconFavorited from "material-ui/svg-icons/action/favorite"

import IconBuy from "material-ui/svg-icons/action/add-shopping-cart"
import IconPreview from "material-ui/svg-icons/action/print"
import IconHomework from "material-ui/svg-icons/notification/event-note"
import IconDownload from "material-ui/svg-icons/file/cloud-download"
import IconTimer from "material-ui/svg-icons/av/av-timer"

import AD from 'components/ad'
import AutoForm from "components/auto-form"
import AppBar from "components/app-bar"

import {ACTION} from "."
import FragmentContent,{Content} from "./content"
import {withPlanActions} from "time-manage"
import {ACTION as superdaddyACTION} from "../state"
import {asModule} from "./code"
import {print} from "components/print-trigger"


export class KnowledgeEditor extends Component{
	static contextTypes={
		client: PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.state={homework:false}
		this.printArea=React.createRef()
		this.crawl=this.crawl.bind(this)
	}

	crawl(url,code, option){
		code=typeof(code)=="function" ? code.toString() : code
		const {client}=this.context
		return client.runQL({
			id:"info_crawl_Query",
			variables:{url,code,option},
			query: graphql` query info_crawl_Query($url:String!, $code:String, $option:JSON){
				crawl(url:$url, code:$code, option:$option)
			}`
		}).then(({data:{crawl,error}})=>crawl)
	}

	download(url,name){
		const link=document.createElement("a")
		link.href=url
		link.download=name
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	preview(knowledge, props){
		props={...props, crawl:this.crawl}
		const {preview}=this.props
		if(knowledge.code){
			asModule(knowledge.code)
				.then(plugin=>plugin.preview(props))
				.then(html=>html && print({html}))
		}else if(knowledge.template){
			preview(knowledge,props)
		}
	}

	outputHomework(knowledge, props){
		props={...props, crawl:this.crawl}
		const {outputHomework}=this.props
		if(knowledge.code){
			asModule(knowledge.code)
				.then(plugin=>plugin.homework(props))
				.then(html=>html && print({html}))
		}else if(knowledge.template){
			outputHomework(knowledge,props)
		}
	}

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

	get printFields(){
		const {knowledge:{fields, hasPrint:props}}=this.props
		if(props){
			return Object.keys(props)
				.map(k=>fields.find(a=>a.name==k))
				.filter(a=>!!a)
				.map(a=>({...a,value:props[a.name]}))
		}
		return []
	}

    render(){
		const {
			knowledge, knowledgeContent, revising=false,
			selectDocx, update, cancel, task, untask, preview, buy,startTimer,
			outputHomework, wechat_session,wechat_timeline, hasWechat,
			toComment,toggleFavorite
		}=this.props

        const commands=["Back"]
		
        if(knowledge.isMyWork){
            commands.push({
				action:"New Version"
                ,label:"新版本"
				,icon:<IconCreate/>
				,onSelect:selectDocx
			})
		} else {
			commands.push({
				action:"Favorite",
				label:"收藏",
				icon:knowledge.isMyFavorite ? <IconFavorited/> : <IconFavorite/>,
				onSelect:()=>toggleFavorite()
			})
		}

        if(revising){
            commands.push({
				action:"Save"
                ,label:"保存"
				,onSelect:update
			})
            commands.push({
				action:"Cancel"
                ,label:"放弃"
                ,onSelect:cancel
                ,icon:<IconCancel/>
			})
        }else{
			if(knowledge.inTask)
				commands.push({
					action:"Remove Task"
					,label:"删除课程"
					,icon: <IconRemoveTask/>
					,onSelect:untask
				})
            else
				commands.push({
					action:"Add Task"
					,label:"添加课程"
					,icon: <IconAddTask/>
					,onSelect:()=>{
						if(this.homeworkFields.length>0){
							this.setState({homework:task})
						}else{
							task()
						}
					}
				})


            commands.push(
				<CommandBar.Comment
					key="Comment"
					label="讨论"
					toComment={toComment}/>
			)
        }

		let tools=[]

		if(hasWechat){
			tools.push(<BottomNavigationItem
				key="wechat.session"
				label="微信好友"
				icon={<wechat.Icon/>}
				onClick={wechat_session}
				/>)
			tools.push(
				<BottomNavigationItem
				key="wechat.timeline"
				label="微信朋友圈"
				icon={<wechat.IconTimeline/>}
				onClick={wechat_timeline}
				/>)
		}

		
		if(knowledge.sale){
			tools.push(<BottomNavigationItem
						key="sale"
						label="购买"
						icon={<IconBuy color="red"/>}
						onClick={buy}
						/>)
		}

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

		if(false && knowledge.isMyWork){
			const url=knowledge.template||knowledge.code
			if(url){
				const ext=knowledge.template ? ".docx" : ".js"
				tools.push(
					<BottomNavigationItem
							key="download"
							label="下载"
							icon={<IconDownload color="black"/>}
							onClick={()=>this.download(url, knowledge.title+ext)}
							/>
				)
			}
		}

		if(knowledge.supportTimer && knowledge.inTask){
			tools.push(
				<BottomNavigationItem
						key="startTimer"
						label="记时器"
						icon={<IconTimer color="black"/>}
						onClick={()=>startTimer(knowledge)}
						/>
			)
		}

        const {homework, preview:want2Preview}=this.state
		let homeworkForm=null, previewForm=null

		if(homework){
			homeworkForm=(<AutoForm
				title="参数设置"
				fields={this.homeworkFields}
				onSubmit={props=>{
					if(typeof(homework)=="function"){
						homework({...props,crawl:this.crawl})
					}else{
						this.outputHomework(knowledge, props)
					}
					
					this.setState({homework:false})
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
					this.preview(knowledge, props)
					this.setState({preview:false})
				}}
				onCancel={()=>this.setState({preview:false})}
				/>
			)
		}

        return (
            <Fragment>
				<div className="flexV">
					<div className="knowledge">
						{React.cloneElement(knowledgeContent,{titleBar:<AppBar/>})}
	                </div>

					<article>
						<section>
							<BottomNavigation>
							{tools}
							</BottomNavigation>

							<AD object={knowledge}/>
						</section>
					</article>

					{homeworkForm}
					{previewForm}
				</div>

                <CommandBar style={{flex:"none"}} items={commands}/>
            </Fragment>
        )
    }
}

export default compose(
	withFragment({knowledge:graphql`
		fragment info_knowledge on Knowledge{
			id
			isMyWork
			isMyFavorite
			inTask(child:$child)
			hasHomework(child:$child)
			hasPrint
			supportTimer
			sale
			title
			summary
			figure
			template
			code
			fields
			files{
				crc
				url
			}

			...content_knowledge
		}
	`}),
	File.withUpload,
	connect(({qili:{user},superdaddy:{current,selectedDocx,}},{knowledge})=>{
		return {
			selectedDocx,
			revising:!!selectedDocx,
			child:current,
			files:knowledge.files,
			knowledge: selectedDocx ? {
					...selectedDocx.knowledge,
					isMyWork:true,
					id:knowledge.id,
					author:{name:""}
				} : knowledge
		}
	}),
	withMutation(({knowledge,child}, info)=>({
		name:"updateKnowledge",
		variables:{info,id:knowledge.id,child},
		mutation:graphql`
			mutation info_update_Mutation($id:ObjectID, $info:JSON, $child:ObjectID){
				knowledge_update(_id:$id, knowledge:$info, child:$child){
					...info_knowledge
				}
			}
		`,
	})),
	withMutation(({knowledge})=>{
		return {
			name:"toggleFavorite",
			variables:{id:knowledge.id},
			patch4:knowledge.id,
			patchData:{isMyFavorite:!knowledge.isMyFavorite},
			mutation:graphql`
				mutation info_favorite_Mutation($id:ObjectID!){
					knowledgeFavorite_toggle(_id:$id){
						isMyFavorite
					}
				}
			`,
		}
	}),
		
	connect(null,
		(dispatch, {knowledge, files,selectedDocx,upload,getToken,updateKnowledge})=>({
			selectedDocx:undefined,
			getTokens:undefined,
			updateKnowledge:undefined,
			files:undefined,
			knowledgeContent:selectedDocx ? <Content knowledge={knowledge}/> : <FragmentContent knowledge={knowledge}/>,
			selectDocx:()=>dispatch(ACTION.SELECT_DOCX()),
			update(){
				dispatch(qiliACTION.LOADING(true))
				getToken()
					.then(({token})=>selectedDocx.upload(knowledge.id,upload,files,token))
					.then(newVersion=>updateKnowledge(newVersion))
					.then(()=>dispatch(ACTION.RESET()))
					.finally(()=>dispatch(qiliACTION.LOADING(false)))
			},
			cancel(){
				dispatch(ACTION.RESET())
			},
			buy(){
				dispatch(ACTION.BUY(knowledge))
			},
			preview(props){
				dispatch(ACTION.PREVIEW(knowledge,props))
			},
			outputHomework(props){
				dispatch(ACTION.HOMEWORK(knowledge,props))
			},
			wechat_session:()=>dispatch(ACTION.WECHAT(knowledge,"SESSION")),
			wechat_timeline:()=>dispatch(ACTION.WECHAT(knowledge,"TIMELINE")),
			hasWechat: typeof(Wechat)!="undefined",
			startTimer(){
				dispatch(superdaddyACTION.TIMER(...arguments))
			}
		})
	),

	withPlanActions(({knowledge:{title,id}, actions:{add, remove}})=>({
		task(fields){
			return add({content:title,knowledge:id, fields})
		},
		untask(){
			return remove({knowledge:id})
		},
	})),
)(KnowledgeEditor)
