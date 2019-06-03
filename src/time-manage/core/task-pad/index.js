import React from "react"
import PropTypes from "prop-types"

import {compose, getContext, mapProps} from "recompose"
import {withFragment} from "qili-app"

import MediaQuery from "react-responsive"
import {ListItem,Avatar} from "material-ui"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightBlue100 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

import TaskPadWide from "./wide-screen"
import TaskPadMobile from "./mobile-pad"


const TaskPad=props=>{
    props={...props,knowledgeTasks, fieldsWithValue}
    return (
        <MediaQuery maxWidth={960}>
            {match=>match ? <TaskPadMobile {...props}/> : <TaskPadWide {...props}/>}
        </MediaQuery>
    )
}

export default compose(
	getContext({
		router:PropTypes.object,
	}),
	withFragment(graphql`
		fragment taskPad on Plan{
			todos{
				knowledge{
					id
					fields
					
					summary
					template
					is4Classroom
					code
				}
				content
				hidden
				day0
				day1
				day2
				day3
				day4
				day5
				day6
			}
		}
	`),

	mapProps(({router,muiTheme, data,current=new Date().getDay(), ...others})=>{
		const toKnowledge=id=>router.push(`/knowledge/${id}`)
		return {
			...others,
			current,
			days: DAYS(current),
			todos: (data.todos||[]).map(a=>{
				if(a.hidden)
					return null
				let todo={...a}

				if(a.knowledge){
					todo.fields=a.fields||a.knowledge.fields
					todo.toKnowledge=()=>toKnowledge(a.knowledge.id)
				}
				let {dones, props}=[0,1,2,3,4,5,6].reduce((state,i)=>{
					const {dones,props}=state
					let prop=props[`${i}`]=a[`day${i}`]
					if(prop){
						dones.push(i)
					}
					return state
				}, {dones:[], props:{}})
				todo.dones=dones
				todo.props=props
				return todo
			}).filter(a=>!!a)
		}
	}),
)(TaskPad)

const DAYS=(i,a="日一二三四五六".split(""))=>(i<7 && a.splice(i,1,<b>今天</b>),a)

function fieldsWithValue(i, fields, props={}){
	let values=props[i+""]
	if(fields && values){
		return fields.map(a=>{
			if(typeof(values[a.name])!="undefined")
				return {...a, value: values[a.name]}
			return a
		})
	}
	return fields
}

function knowledgeTasks({days=[], current, dones=[]}){
	return days.map((d,i)=><ListItem key={i}
		style={{fontSize:"smaller"}}
		leftAvatar={<Avatar
				style={{fontSize:"smaller"}}
				color={dones.includes(i) ? COLOR_DONE : (current>i ? COLOR_DISABLED : COLOR_ENABLED)}
				backgroundColor="transparent">D{i+1}</Avatar>}
		primaryText={d}/>)
}