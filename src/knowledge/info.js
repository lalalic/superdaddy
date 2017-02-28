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
import IconPreview from "material-ui/svg-icons/content/content-copy"

import Calendar, {cnDateTimeFormat, addDays, relative, isEqualDate, getLastDayOfMonth} from '../components/calendar'
import dbKnowledge from '../db/knowledge'
import dbTask from '../db/task'
import AD from '../components/ad'

import {ACTION, Content} from "."

const {List,Loading,Comment,CommandBar,fileSelector, Messager}=UI
const {DialogCommand}=CommandBar

const COLORS="red,aqua,fuchsia,darkorange,darkmagenta".split(",")

export default class KnowledgeEditor extends Component{
    componentDidMount(){
		this.props.dispatch(ACTION.FETCH1())
    }

    componentWillReceiveProps(next){
		const {knowledge}=this.props
        if(knowledge && knowledge._id!=next.params._id)
            next.dispatch(ACTION.FETCH1())
    }

    render(){
		const {knowledge, revising=false, inTask=false, dispatch}=this.props

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
				action:"Preview"
                ,label:"预览打印"
                ,onSelect:a=>dispatch(ACTION.PREVIEW())
                ,icon:<IconPreview/>
			})			
            commands.push({
				action:"Save"
                ,label:"保存"
				,onSelect: a=>dispatch(ACTION.UPDATE())
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
		
		let tools=(knowledge.applets||[]).slice(0,2).map(({data,title,desc},i)=>
			<BottomNavigationItem 
				key={`_${i}_${title}`} 
				label={title} 
				icon={<IconApplet color={COLORS[Math.floor((Math.random() * 10))%5]}/>}
				onClick={()=>dispatch(ACTION.APPLET(data,title,knowledge))}
				/>
		)
		
		tools.unshift(<BottomNavigationItem 
			key="wechat.session"
			label="微信好友" 
			icon={<IconWechatSession/>}
			onClick={()=>dispatch(ACTION.WECHAT(knowledge,"SESSION"))}
			/>
		)
		
		tools.unshift(<BottomNavigationItem 
			key="wechat.timeline"
			label="微信朋友圈" 
			icon={<IconWechatTimeline/>}
			onClick={()=>dispatch(ACTION.WECHAT(knowledge,"TIMELINE"))}
			/>
		)
		
		if(knowledge.sale)
			tools.push(<BottomNavigationItem 
						key="sale"
						label="购买"
						icon={<IconBuy color="red"/>}
						onClick={()=>dispatch(ACTION.BUY(knowledge))}
						/>)
		
		
		
        return (
            <div className="post">
                <div className="knowledge">
					<Content {...knowledge}/>
                </div>
				
				<article>
					<section>
						<BottomNavigation>
						{tools}
						</BottomNavigation>
						
						<AD object={knowledge}/>
				
						
						<Comment.Inline type={dbKnowledge} model={knowledge}/>
					</section>
				</article>
				
                <CommandBar className="footbar" items={commands}/>
            </div>
        )
    }
}
