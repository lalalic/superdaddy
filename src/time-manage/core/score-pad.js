import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose,getContext,withProps} from "recompose"
import {withFragment} from "qili/tools/recompose"

import TextFieldx from "qili/components/text-field"
import AppBar from "components/app-bar"

import IconButton from 'material-ui/IconButton'
import IconComment from "material-ui/svg-icons/communication/comment"
import IconSmile from "icons/task"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightblue500 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

export const ScorePad=({
	todo, goal,score,totalPerScreen=goal, 
	width=0, height=0,
	toComment,setTodoGoal
	})=>{
	let smiles=layout(width,height,score,totalPerScreen)

	let title=todo, action=null
	if(!goal){
		title="开始第一个目标"
		action=(<Editor setTodoGoal={setTodoGoal}/>)
	}else if(todo && goal<=score){
		title=`[${todo}]已完成,开始下一个目标吧`
		action=(<Editor lastScore={score} setTodoGoal={setTodoGoal}/>)
	}else{
		title=todo;
	}
	let iconElementRight=(
		<IconButton onClick={toComment}>
			<IconComment/>
		</IconButton>
	)
	
	return (
		<div>
			<AppBar {...{title,iconElementRight}}/>
			{action}
			<div>
				{smiles}
			</div>
		</div>
	)
}

export function layout(width,height,score,totalPerScreen){
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
	for(let i=0;i<totalPerScreen;i++){
		smiles.push(
			<span key={i} style={{display:"inline-block"}} className="smile">
				<Smile style={style} scored={i<score}/>
			</span>
		)
	}
	return smiles
}

const Smile=({scored, ...others})=>(
	<IconSmile
		color={scored ? COLOR_DONE : COLOR_DISABLED}
		{...others}
		/>
)

export const Editor=({lastScore, setTodoGoal})=>{
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
		setTodoGoal({goal,todo:desc.join(":")})
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

export default compose(
	getContext({
		client:PropTypes.object,
		muiTheme: PropTypes.object,
		router: PropTypes.object,
		actions: PropTypes.object,
	}),
	connect((state,{client,width,height,muiTheme, actions:{planUpdate}})=>({
		child: state.superdaddy.current,
		width: width||muiTheme.page.width,
		height: height||muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height-50,
		toComment:()=>router.push(`/comment/${state.superdaddy.current}`),
		setTodoGoal(plan){
			return planUpdate(plan)
		}
	})),
	withFragment(graphql`
		fragment scorePad on Plan{
			todo
			goal
			score
		}
	`),
	withProps(({data:{todo,goal,score}})=>({
		todo,goal,score
	}))
)(ScorePad)
