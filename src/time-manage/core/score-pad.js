import React, {Component, PropTypes} from "react"
import IconSmile from "material-ui/svg-icons/social/mood"
import Comment from "qili-app/lib/components/comment"
import TextFieldx from "qili-app/lib/components/text-field"
import Paper from 'material-ui/Paper'

import {Family} from "../../db"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightblue500 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

export const ScorePad=({todo, goal=0,totalPerScreen=goal, score=0, child={}},context)=>{
	const {appBar, muiTheme}=context

	let width=muiTheme.page.width
	let height=muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height

	if(totalPerScreen==score){
		width=width/2
		height=height/2
	}else{
		width=width*7/8
		height=height*7/8
	}
	const less=Math.min(width,height), more=Math.max(width,height)
	let widthLess=Math.floor(Math.sqrt(Math.floor(less*less/totalPerScreen)))
	let widthMore=Math.floor(Math.sqrt(Math.floor(more*more/totalPerScreen)))
	let style={}
	if(less==width){
		style.width=widthLess
		style.height=widthMore
	}else{
		style.width=widthMore
		style.height=widthLess
	}

	let smiles=[]
	for(let i=0;i<totalPerScreen;i++)
		smiles.push(
			<span key={i} style={{display:"inline-block"}} className="smile">
				<Smile style={style} scored={i<score}/>
			</span>
		)

	let title=todo, action=null, comment=null
	if(goal==0){
		title="开始第一个目标"
		action=(<Editor/>)
	}else if(goal<=score){
		title=`[${todo}]已完成,开始下一个目标吧`
		action=(<Editor lastScore={score}/>)
	}else{
		title=todo;
		comment=(
			<Paper zDepth={1} style={{padding:10}}>
				<Comment.Inline type={Family} 
					model={child} 
					hint="评论鼓励一下"
					system={{thumbnail:child.thumbnail, name:child.name}}/>
			</Paper>
		)
	}

	return (
		<div>
			{React.cloneElement(appBar, {title})}
			{action}
			<div>
				{smiles}
			</div>
			{comment}
		</div>
	)
}

ScorePad.contextTypes={
	muiTheme:PropTypes.object,
	appBar: PropTypes.element,
	ACTION: PropTypes.object,
	dispatch: PropTypes.func
}

const Smile=({scored, ...others})=>(
	<IconSmile
		color={scored ? COLOR_DONE : COLOR_DISABLED}
		{...others}
		/>
)

export const Editor=({lastScore},{dispatch,ACTION})=>{
	let refGoal
	const add=value=>{
		value=value.trim()
		if(!value)
			return
		let [goal, ...desc]=value.split(":")
		try{
			goal=parseInt(goal)
		}catch(e){
			refGoal.errorText=`格式错误`
			return
		}
		dispatch(ACTION.SET_GOAL(goal,desc.join(":")))
	}
	return (
		<TextFieldx ref={a=>refGoal=a}
			floatingLabelText="目标"
			hintText={`${lastScore||20}:小马宝莉书一本`}
			onBlur={({target:{value}})=>add(value)}
			onKeyDown={({target:{value},keyCode})=>keyCode==13 && add(value)}
			fullWidth={true}/>
	)
}

Editor.contextTypes={
	ACTION: PropTypes.object,
	dispatch: PropTypes.func
}
