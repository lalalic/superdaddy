import React, {Component, PropTypes} from "react"
import IconSmile from "material-ui/svg-icons/social/mood"
import {ENTITIES, UI} from "qili-app"
import {normalize} from "normalizr"
import {AppBar} from "material-ui"

import FamilyDB from "./db/family"
import {getCurrentChild} from "./selector"

const {TextFieldx}=UI

const DOMAIN="score"
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
		child.goal=goal
		child.todo=todo
		child.score=0
		return FamilyDB.upsert(child)
			.then(updated=>dispatch(ENTITIES(normalize(updated,FamilyDB.schema).entities)))
	}
}

export const Dashboard=
({dispatch,todo, goal,totalPerScreen=goal, score=0, width=window.innerWidth>960 ? 960 : window.innerWidth, height=window.innerHeight-60})=>{
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

	return (
		<div>
			{totalPerScreen==score ? (<Editor lastScore={score} lastTodo={todo} dispatch={dispatch}/>) : null}
			<div>
				<AppBar title={todo} iconElementLeft={<span/>}/>
				{smiles}
			</div>
		</div>
	)
}

const Smile=({scored, ...others})=>(
	<IconSmile
		color={scored ? "yellow" :"lightgray"}
		hoverColor={scored ? null : "lightyellow"}
		{...others}
		/>
)

const Editor=({lastScore,lastTodo="目标", dispatch})=>{
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
		<div>
			<AppBar
				iconElementLeft={<span/>}
				title={lastScore ? `恭喜 ${lastTodo} 实现了` : `定下第一个目标描述吧`}/>
			<TextFieldx ref={a=>refGoal=a}
				floatingLabelText={`笑脸目标数:${lastScore ? '下一个' : '第一个'}目标描述`}
				hintText={`${lastScore||20}:小马宝莉书一本`}
			 	onBlur={({target:{value}})=>add(value)}
				onKeyDown={({target:{value},keyCode})=>keyCode==13 && add(value)}
				fullWidth={true}/>
		</div>
	)
}


export default Dashboard
