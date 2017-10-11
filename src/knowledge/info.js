import React, {Component, PropTypes} from "react"
import {compose, getContext} from "recompose"
import {withMutation, withFragment} from "qili/tools/recompose"
import {connect} from "react-redux"

import {Link} from "react-router"

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'

import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconCancel from "material-ui/svg-icons/navigation/cancel"
import IconAddTask from "material-ui/svg-icons/action/alarm-add"
import IconRemoveTask from "material-ui/svg-icons/action/alarm-off"
import {
		Icon as IconWechatSession, 
		IconTimeline as IconWechatTimeline
	} from "qili/components/wechat"
import IconBuy from "material-ui/svg-icons/action/add-shopping-cart"
import IconPreview from "material-ui/svg-icons/action/print"
import IconHomework from "material-ui/svg-icons/notification/event-note"

import CommandBar from "qili/components/command-bar"

import AD from 'components/ad'
import AutoForm from "components/auto-form"

import {ACTION} from "."
import Content from "./content"
import {withPlanActions} from "time-manage"

export class KnowledgeEditor extends Component{
	state={homework:false}

    render(){
		const {
			knowledge, isMyWork, minHeight, revising=false, inTask=false,
			selectDocx, update, cancel, task, untask, preview, buy,
			outputHomework, wechat_seesion,wechat_timeline,
			toComment,
		}=this.props

        const commands=["Back"]

        if(isMyWork)
            commands.push({
				action:"New Version"
                ,label:"新版本"
				,icon:<IconCreate/>
				,onSelect:selectDocx
			})

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
			if(inTask)
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
					,onSelect:task
				})


            commands.push(<CommandBar.Comment 
				key="Comment"
				label="讨论"
				toComment={toComment}/>)
        }

		let tools=[
			<BottomNavigationItem
			key="wechat.session"
			label="微信好友"
			icon={<IconWechatSession/>}
			onClick={webchat_session}
			/>,
			<BottomNavigationItem
			key="wechat.timeline"
			label="微信朋友圈"
			icon={<IconWechatTimeline/>}
			onClick={wechat_timeline}
			/>
		]

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
							if(!knowledge.hasHomework.fields){
								outputHomework(knowledge)
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
							if(!knowledge.hasPrint.fields){
								preview(knowledge)
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
				fields={knowledge.hasHomework.fields}
				onSubmit={props=>{
					this.setState({homework:false})
					outputHomework(knowledge, props)
				}}
				onCancel={()=>this.setState({homework:false})}
				/>
			)
		}
		
		if(want2Preview){
			previewForm=(<AutoForm 
				title="参数设置"
				fields={knowledge.hasPrint.fields}
				onSubmit={props=>{
					this.setState({preview:false})
					preview(knowledge, props)
				}}
				onCancel={()=>this.setState({preview:false})}
				/>
			)
		}
    
        return (
            <div className="post">
				<div className="knowledge" style={{minHeight}}>
					<Content knowledge={knowledge}/>
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
				
                <CommandBar className="footbar" items={commands}/>
            </div>
        )
    }
}

export default compose(
	getContext({
    	muiTheme:PropTypes.object,
    	router: PropTypes.object,
		
    }),
	withFragment(graphql`
		fragment info_knowledge on Knowledge{
			id
			inTask(child:$child)
			...content_knowledge
		}
	`),
	connect(
		({qili:{user},superdaddy:{current,selectedDocx}},{id, muiTheme})=>({
			isMyWork: id==user.id,
			revising:!!selectedDocx,
			child:current,
			minHeight:muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height,
		}),
		(dispatch, {knowledge})=>({
			selectDocx:()=>dispatch(ACTION.SELECT_DOCX()),
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
			toComment: ()=>router.push(`comment/${knowledge.id}`),
		})
	),	
	withMutation(({knowledge}, info)=>({
		variables:{info,id:knowledge.id},
		mutation:graphql`
			mutation info_update_Mutation($id:ObjectID, $info:JSON){
				knowledge_update(_id:$id, knowledge:$info)
			}
		`,
	})),
	
	withPlanActions(({knowledge:{title,id},actions:{add, remove}})=>({
		task(){
			return add({content:title,knowledge:id})
		},
		untask(){
			return remove({knowledge:id})
		},
	})),
)(KnowledgeEditor)
