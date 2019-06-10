import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,getContext,withProps,withState} from "recompose"
import {withFragment} from "qili-app"

import AppBar from "components/app-bar"
import Goods from "components/goods"

import {IconButton,TextField} from 'material-ui'
import IconComment from "material-ui/svg-icons/communication/comment"
import IconAward from "material-ui/svg-icons/action/card-giftcard"
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
	toComment,setTodoGoal,toAward,
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
		title=`${todo}(${score}/${goal})`;
	}
	let iconElementRight=(
		<span>
			<IconButton onClick={toComment}>
				<IconComment/>
			</IconButton>
			<IconButton onClick={toAward}>
				<IconAward color="white"/>
			</IconButton>
		</span>
	)

	return (
		<Fragment>
			<AppBar {...{title,iconElementRight}}/>
			{action}
			<div className="flexV">
				<Fun smiles={smiles} interval={2000}/>
			</div>
		</Fragment>
	)
}

class Fun extends Component{
	state={x:this.random(),catched:0}
	random(){
		let max=this.props.smiles.length
		let min=0
		return parseInt(Math.random() * (max - min) + min);
	}

	componentDidMount(){
		const {interval=1000}=this.props
		this.timer=setInterval(()=>this.setState({x:this.random()}),interval)
	}

	componentWillUnmount(){
		clearInterval(this.timer)
	}

	render(){
		const {smiles}=this.props
		const {x,catched}=this.state
		return (
			<Fragment>
				{smiles.length>0 ?
					(<div className="sticky bottom right _2"
						style={{fontSize:"xx-large",color:"orange"}}>
						{catched}
					</div>) : null
				}
				{smiles.map((a,i)=>x==i ? React.cloneElement(a,{
					className:`${a.props.className} pulse`,
					onClick:()=>this.setState(({catched})=>({catched:catched+1}))
				}) : a)}
			</Fragment>
		)
	}
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

export const Editor=withState("errorText","setError")(({lastScore,setError,errorText, setTodoGoal})=>{
	const add=value=>{
		value=value.trim()
		if(!value)
			return
		let [goal, ...desc]=value.split(":")
		try{
			goal=parseInt(goal)
		}catch(e){
			setError(`格式错误`)
			return
		}
		setTodoGoal({goal,todo:desc.join(":")})
	}
	return (
		<Goods onChange={add}
			openOnFocus={true}
			errorText={errorText}
			floatingLabelText="目标"
			hintText={`${lastScore||20}:小马宝莉书一本`}
			fullWidth={true}/>
	)
})

export default compose(
	getContext({
		client:PropTypes.object,
		muiTheme: PropTypes.object,
		router: PropTypes.object,
		actions: PropTypes.object,
	}),
	connect((state,{client,width,height,muiTheme,router, actions:{planUpdate}})=>({
		child: state.superdaddy.current,
		width: width||muiTheme.page.width,
		height: height||muiTheme.page.height-muiTheme.appBar.height-muiTheme.footbar.height-50,
		toComment:()=>router.push(`/child/${state.superdaddy.current}/comment`),
		toAward:()=>router.push(`/child/${state.superdaddy.current}/award`),
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
