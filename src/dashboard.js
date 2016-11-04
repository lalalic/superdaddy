import React, {Component, PropTypes} from "react"
import IconSmile from "material-ui/svg-icons/social/mood"
import {ENTITIES} from "qili-app"

import FamilyDB from "./db/family"

const currentChild=state=>{
	try{
		return state.entities[Family._name][state[DOMAIN].child]
	}catch(e){
		return {
			name:"_default"
		}
	}
}

const DOMAIN="score"
var scores=0, timer=null
export const ACTION={
	ADDING_SCORE: ()=>dispatch=>{
		if(timer)
			clearTimeout(timer)
		scores++
		timer=setTimeout(dispatch(ACTION.ADD_SCORES()),600)
	}
	,ADD_SCORE: ()=>(dispatch,getState)=>{
		const child=currentChild(getState())
		child.score+=scores
		clearTimeout(timer)
		score=0
		return FamilyDB.upsert(child)
			.then(updated=>dispatch(ENTITIES(normalize(updated,FamilyDB.schema).entities)))
	}
}

export const REDUCER=(state,{type,payload})=>{
	switch(type){
	case `@@${DOMAIN}/added`:
		
	}
	return state
	
}

export const Dashboard=({totalPerScreen=20, score=0, width=window.innerWidth>960 ? 960 : window.innerWidth, height=window.innerHeight})=>{
	const less=Math.min(width,height), more=Math.max(width,height)
	let countLess=Math.floor(less*totalPerScreen/(width+height))
	let countMore=totalPerScreen-countLess
	let widthLess=Math.floor(less/countLess)
	let widthMore=Math.floor(more/countMore)
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
			{smiles}
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

export default Dashboard