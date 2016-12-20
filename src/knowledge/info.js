import React, {Component, PropTypes} from "react"
import {File,UI, User} from 'qili-app'
import {RaisedButton, DatePicker} from 'material-ui'
import {Link} from "react-router"

import IconCreate from "material-ui/svg-icons/editor/border-color"
import IconCancel from "material-ui/svg-icons/navigation/cancel"
import IconAddTask from "material-ui/svg-icons/action/alarm-add"
import IconRemoveTask from "material-ui/svg-icons/action/alarm-off"

import Calendar, {cnDateTimeFormat, addDays, relative, isEqualDate, getLastDayOfMonth} from '../components/calendar'
import dbKnowledge from '../db/knowledge'
import dbTask from '../db/task'

import {ACTION, Content} from "."

const {List,Loading,Comment,CommandBar,fileSelector, Messager}=UI
const {DialogCommand}=CommandBar


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
				,icon:<IconCreate/>
				,onSelect: a=>dispatch(ACTION.SELECT_DOCX())
			})

        if(revising){
            commands.push({
				action:"Save"
				,onSelect: a=>dispatch(ACTION.UPDATE())
			})
            commands.push({
				action:"Cancel"
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

            commands.push(<CommandBar.Comment key="Comment" type={dbKnowledge} model={knowledge}/>)
            commands.push(<CommandBar.Share key="Share" message={knowledge}/>)
        }

        return (
            <div className="post">
                <div className="knowledge">
					<Content {...knowledge}/>
                </div>

                <CommandBar className="footbar" items={commands}/>
            </div>
        )
    }
}
