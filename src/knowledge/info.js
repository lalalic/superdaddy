import React, {Component, PropTypes} from "react"
import {File,UI, User} from 'qili-app'
import {RaisedButton, DatePicker,IconButton} from 'material-ui'
import {Link} from "react-router"
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'

import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconCancel from "material-ui/svg-icons/navigation/cancel"
import IconAddTask from "material-ui/svg-icons/action/alarm-add"
import IconRemoveTask from "material-ui/svg-icons/action/alarm-off"
import {Icon as IconWechatSession, IconTimeline as IconWechatTimeline} from "qili-app/lib/components/wechat"
import IconApplet from "material-ui/svg-icons/social/pages"
import IconBuy from "material-ui/svg-icons/action/add-shopping-cart"
import IconPreview from "material-ui/svg-icons/action/print"
import IconHomework from "material-ui/svg-icons/notification/event-note"

import Calendar, {cnDateTimeFormat, addDays, relative, isEqualDate, getLastDayOfMonth} from 'components/calendar'
import dbKnowledge from 'db/knowledge'
import dbTask from 'db/task'
import AD from 'components/ad'

import {ACTION, Content} from "."
import AutoForm from "components/auto-form"

const {List,Loading,Comment,CommandBar,fileSelector, Messager}=UI
const {DialogCommand}=CommandBar

export default class KnowledgeEditor extends Component{
    static contextTypes={
    	muiTheme:PropTypes.object,
    	appBar: PropTypes.element
    }
	
	state={
		homework:false
	}

    componentDidMount(){
		this.props.dispatch(ACTION.FETCH1(this.props.params._id))
    }

    componentWillReceiveProps(next){
        const {knowledge}=this.props
        if(knowledge && knowledge._id!=next.params._id)
            next.dispatch(ACTION.FETCH1(next.params._id))
    }

    render(){
		const {knowledge, revising=false, inTask=false, dispatch, params:{_id:id}}=this.props

        if(!knowledge)
            return (<Loading/>)

        var commands=["Back"]

        if(true || User.current._id==knowledge.author._id)
            commands.push({
				action:"New Version"
                ,label:"新版本"
				,icon:<IconCreate/>
				,onSelect: a=>dispatch(ACTION.SELECT_DOCX())
			})

        if(revising){
            commands.push({
				action:"Save"
                ,label:"保存"
				,onSelect: a=>dispatch(ACTION.UPDATE(id))
			})
            commands.push({
				action:"Cancel"
                ,label:"放弃"
                ,onSelect:a=>dispatch(ACTION.CANCEL())
                ,icon:<IconCancel/>
			})
        }else{
			if(inTask)
				commands.push({
					action:"Remove Task"
					,label:"删除课程"
					,icon: <IconRemoveTask/>
					,onSelect:e=>dispatch(ACTION.UNTASK(knowledge))
				})
            else
				commands.push({
					action:"Add Task"
					,label:"添加课程"
					,icon: <IconAddTask/>
					,onSelect:e=>dispatch(ACTION.TASK(knowledge))
				})


            commands.push(<CommandBar.Comment key="Comment"
				label="讨论"
				type={dbKnowledge}
				model={knowledge}/>)
        }

		let tools=[
			<BottomNavigationItem
			key="wechat.session"
			label="微信好友"
			icon={<IconWechatSession/>}
			onClick={()=>dispatch(ACTION.WECHAT(knowledge,"SESSION"))}
			/>,
			<BottomNavigationItem
			key="wechat.timeline"
			label="微信朋友圈"
			icon={<IconWechatTimeline/>}
			onClick={()=>dispatch(ACTION.WECHAT(knowledge,"TIMELINE"))}
			/>
		]

		if(knowledge.sale){
			tools.push(<BottomNavigationItem
						key="sale"
						label="购买"
						icon={<IconBuy color="red"/>}
						onClick={()=>dispatch(ACTION.BUY(knowledge))}
						/>)
		}
						
		if(knowledge.hasHomework){
			tools.push(<BottomNavigationItem
						key="homework"
						label="作业"
						icon={<IconHomework color="aqua"/>}
						onClick={()=>{
							if(!knowledge.hasHomework.fields){
								dispatch(ACTION.HOMEWORK(knowledge))
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
								dispatch(ACTION.PREVIEW(knowledge))
							}else{
								this.setState({preview:true})
							}
						}}
						/>)
		}

        const {muiTheme}=this.context
        let minHeight=muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height
		const {homework, preview}=this.state
		let homeworkForm=null, previewForm=null
		
		if(homework){
			homeworkForm=(<AutoForm 
				title="参数设置"
				fields={knowledge.hasHomework.fields}
				onSubmit={props=>{
					this.setState({homework:false})
					dispatch(ACTION.HOMEWORK(knowledge, props))
				}}
				onCancel={()=>this.setState({homework:false})}
				/>
			)
		}
		
		if(preview){
			previewForm=(<AutoForm 
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
    
        return (
            <div className="post">
                <div className="knowledge" style={{minHeight}}>
					<Content {...knowledge}/>
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
