import React, {Component, PropTypes} from "react"
import IconSmile from "material-ui/svg-icons/social/mood"
import {ENTITIES, UI, compact} from "qili-app"
import {normalize} from "normalizr"
import {connect} from "react-redux"

import FamilyDB from "../db/family"
import {getCurrentChild} from "../selector"
import AppBar from "../components/app-bar"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightblue500 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

const {TextFieldx}=UI

var scores=0, timer=null
export const ACTION={
	ADDING_SCORE: ()=>dispatch=>{
		if(timer)
			clearTimeout(timer)
		scores++
		timer=setTimeout(dispatch(ACTION.ADD_SCORES()),600)
	}
	,ADD_SCORES: ()=>(dispatch,getState)=>{
		const child=getCurrentChild(getState())
		child.score=scores+(child.score||0)
		clearTimeout(timer)
		scores=0
		FamilyDB.upsert(child)
			.then(updated=>dispatch(ENTITIES(normalize(updated,FamilyDB.schema).entities)))
	}
	,ADD_TASK: (goal, todo)=>(dispatch,getState)=>{
		const child=getCurrentChild(getState())
		child.score=Math.max((child.score||0)-(child.goal||0),0)
		child.goal=goal
		child.todo=todo
		return FamilyDB.upsert(child)
			.then(updated=>dispatch(ENTITIES(normalize(updated,FamilyDB.schema).entities)))
	}
}

export const ScorePad=
({dispatch,todo, goal=0,totalPerScreen=goal, score=0, width=window.innerWidth>960 ? 960 : window.innerWidth, height=window.innerHeight-60})=>{
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
			<span key={i} style={{display:"inline-block"}}>
				<Smile style={style} scored={i<score} onClick={e=>i>=score && dispatch(ACTION.ADDING_SCORE())}/>
			</span>
		)

	let title=todo, action=null
	if(goal==0){
		title="开始第一个目标"
		action=(<Editor/>)
	}else if(goal<=score){
		title="开始下一个目标"
		action=(<Editor lastScore={score} dispatch={dispatch}/>)
	}else
		title=todo;

	return (
		<div>
			<AppBar title={title}/>
			{action}
			<div>
				{smiles}
			</div>
		</div>
	)
}

const Smile=({scored, ...others})=>(
	<IconSmile
		color={scored ? COLOR_DONE : COLOR_DISABLED}
		hoverColor={scored ? null : COLOR_HOVER}
		{...others}
		/>
)

const Editor=({lastScore,dispatch})=>{
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
		dispatch(ACTION.ADD_TASK(goal,desc.join(":")))
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


export default connect(state=>compact(getCurrentChild(state),"score","goal","todo"))(ScorePad)
