import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext, mapProps, withProps} from "recompose"
import {withFragment} from "qili/tools/recompose"

import MediaQuery from "react-responsive"
import {List,ListItem, Subheader,Divider,Tab, FlatButton,IconButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightBlue100 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

import SwipeableTabs from "components/swipe-tabs"
import AutoForm from "components/auto-form"

import Avatar from 'material-ui/Avatar'
import IconSmile from "icons/task"

const DAYS=(i,a="日一二三四五六".split(""))=>(i<7 && a.splice(i,1,<b>今天</b>),a)
const ITEM_STYLE={
	display:"inline-block",
	width:60,
	textAlign:"center",
	marginTop:16,
	marginBottom:16
}

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

const TaskPadWide=(({todos=[],current,days})=>(
	<List>
		<ListItem
			primaryText="任务\星期"
			rightIconButton={
				<Wrapper>
					{days.map((a,i)=><span key={i} style={ITEM_STYLE}>{a}</span>)}
				</Wrapper>
			}
		/>
		<Divider/>

		{todos.map(({toKnowledge, days=[], content:task, dones=[], fields, props},i)=>(
			<ListItem key={i}
				primaryText={<TaskTitle {...{toKnowledge,task}}/>}
				rightIconButton={
					<Wrapper>
					{[0,1,2,3,4,5,6].map(a=>(
						<span key={a} style={ITEM_STYLE}>
							<TodoStatus
								todo={task}
								done={-1!=dones.indexOf(a)}
								day={a}
								current={current}
								fields={fieldsWithValue(a, fields, props)}
								/>
						</span>
					))}
					</Wrapper>
				}
				open={true}
				nestedItems={knowledgeTasks({days,dones,current})}
				/>
		)).reduce((state,a,i)=>{
			state.push(a)
			state.push(<Divider key={`_${i}`}/>)
			return state
		},[])}
	</List>
))

const TaskPadMobile=({todos=[],current,days,minHeight})=>(
	<SwipeableTabs index={current%7}
		tabs={days.map((day,i)=><Tab key={i} label={day} value={i}/>)}>
		{
			days.map((day,i)=>(
				<List key={i} style={{minHeight}}>
					{
						todos.map(({toKnowledge, days=[], content:task,dones=[],fields, props})=>(
							<ListItem key={task}
								primaryText={<TaskTitle {...{toKnowledge,task}}/>}
								leftCheckbox={<TodoStatus 
												todo={task} 
												done={-1!=dones.indexOf(i)} 
												day={i} 
												current={current} 
												fields={fieldsWithValue(i, fields, props)}/>}
								initiallyOpen={true}
								nestedItems={knowledgeTasks({days,dones,current})}
							/>
						))
					}
				</List>
			))
		}
	</SwipeableTabs>
)

const TodoStatus=compose(
	getContext({actions:PropTypes.object}),
	mapProps(({actions:{taskDone},...others})=>({
		taskDone,
		...others
	}))
)(class extends Component{
	state={info:false}
	render(){
		const {todo,done, day, current, fields=[], taskDone, ...others}=this.props
		if(done){
			const {info}=this.state
			if(!info && fields.length)
				others.onClick=e=>this.setState({info:true})
			let icon=null
			if(fields.length){
				icon=<IconSmile color={COLOR_DONE} {...others} more={true}/>
			}else{
				icon=<IconSmile color={COLOR_DONE} {...others}/>
			}
			
			if(info){
				return (
					<span>
						<AutoForm 
							fields={fields} 
							title="信息"
							onCancel={e=>this.setState({info:false})}
							onSubmit={props=>{
								this.setState({info:false})
								taskDone({task:todo,day,props})
							}}
							/>
						{icon}
					</span>
				)
			}else{
				return icon
			}
			
		}else if(day>current)
			return (<IconSmile color={COLOR_DISABLED} {...others}/>)
		else
			return (<IconSmile color={COLOR_ENABLED} 
						hoverColor={COLOR_HOVER} 
						onClick={e=>taskDone({task:todo,day})}  
						{...others}/>)
	}
})

const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)

const TaskTitle=({toKnowledge,task})=>(
	<span onClick={toKnowledge} style={{color:toKnowledge ? "blue" : ""}}>
		{task}
	</span>
)

function knowledgeTasks({days=[], current, dones=[]}){
	return days.map((d,i)=><ListItem key={i}
		style={{fontSize:"smaller"}}
		leftAvatar={<Avatar
				style={{fontSize:"smaller"}}
				color={dones.includes(i) ? COLOR_DONE : (current>i ? COLOR_DISABLED : COLOR_ENABLED)}
				backgroundColor="transparent">D{i+1}</Avatar>}
		primaryText={d}/>)
}

export const TaskPad=(props=>(
	<MediaQuery maxWidth={960}>
	{
		match=>match ? <TaskPadMobile {...props}/> : <TaskPadWide {...props}/>
	}
	</MediaQuery>
))

export default compose(
	getContext({
		router:PropTypes.object,
		muiTheme: PropTypes.object,
	}),
	withFragment(graphql`
		fragment taskPad on Plan{
			todos{
				knowledge{
					id
					fields
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

	mapProps(({router,muiTheme, data,current=new Date().getDay(),...others})=>{
		const toKnowledge=id=>router.push(`/knowledge/${id}`)
		return {
			...others,
			minHeight:(muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height)*3/4,
			current,
			days: DAYS(current),
			todos: (data.todos||[]).map(a=>{
				if(a.hidden)
					return null
				let todo={...a}
				
				if(a.knowledge){
					todo.fields=a.knowledge.fields
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
