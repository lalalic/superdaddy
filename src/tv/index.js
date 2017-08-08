require('./style.less')

import React, {Component, PropTypes} from "react"
import {combineReducers} from "redux"
import {connect} from "react-redux"
import {QiliApp,compact} from "qili-app"
import Comment from "qili-app/lib/components/comment"

import {GridList, GridTile} from 'material-ui/GridList'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import IconStatus from "material-ui/svg-icons/social/mood"
import IconComment from "material-ui/svg-icons/communication/comment"

import {Family,init} from "../db"
import {getCurrentChild, getCurrentChildTarget} from "../selector"
import {ACTION,REDUCER} from "../baby"
import TimeManageUI from "../time-manage"
import {layout} from "../time-manage/core/score-pad"

class TV extends Component{
	state={
		focus: "status",
		active: "status"
	}
	focuses=[]
	preFocus(e){
		e.preventDefault()
		let focus=this.focuses[(this.focuses.indexOf(this.state.focus)-1+this.focuses.length)%this.focuses.length]
		this.setState({focus})
	}
	
	nextFocus(e){
		e.preventDefault()
		let focus=this.focuses[(this.focuses.indexOf(this.state.focus)+1)%this.focuses.length]
		this.setState({focus})
	}
	componentDidMount(){
		window.addEventListener("keydown", e=>{
			switch(e.key) {
		        case "ArrowLeft":
		            this.preFocus(e)//tab(e, true)// left key pressed
		            break;
		        case "ArrowUp":
		            this.preFocus(e)// up key pressed
		            break;
		        case "ArrowRight":
		            this.nextFocus(e)// right key pressed
		            break;
		        case "ArrowDown":
		            this.nextFocus(e)// down key pressed
		            break;
		    }
			
		}, false)
		this.focus()
	}
	focus(){
		let shouldFocused=this.refs[this.state.focus]
		if(shouldFocused)
			shouldFocused.focus()
	}
	componentDidUpdate(){
		this.focus()
	}
	render(){
		const {active}=this.state
		const {child, switchable,dispatch, score, goal,todo}=this.props
		const menuWidth=150
		const style={
			root: {display:"flex",height:window.innerHeight-40,padding:5, overflow:"hidden"},
			menu: {height:100,padding:20},
			icon: {width:60,height:60},
			menuLayout: {width:"100%",height:"100%",padding:4},
			child: {height:menuWidth,padding:20},
			active: {transform: "scale(1.2)",display:"block"}
		}
		let content=null
		switch(active){
		case "status":
			content=(
				<div>
					<Subheader>{todo}</Subheader>
					{layout(window.innerWidth-menuWidth, window.innerHeight-100,score,goal)}
				</div>
				)
			break
		case "comment":
			content=(<Comment.Inline
				model={child}
				commentable={false}
				system={{thumbnail:child.thumbnail, name:child.name}}
				type={Family}/>
			)
			break
		}
		
		this.focuses.splice(0, this.focuses.length)

		let head=null, tab=0
		if(switchable){
			head=(<a tabIndex={++tab} ref="child">
				<Avatar size={110}
					style={{fontSize:"larger"}}
                    onTouchTap={e=>dispatch(ACTION.SWITCH_CURRENT_CHILD())}
					src={child.thumbnail}
					color="lightgray">{child.name}</Avatar>
			</a>)
			this.focuses.push("child")
		}else{
			head=(<Avatar size={110}
					style={{fontSize:"larger"}}
					src={child.thumbnail}
					color="lightgray">{child.name}</Avatar>)
		}
		this.focuses.push("status")
		this.focuses.push("comment")
		return (
			<QiliApp appId="5746b2c5e4bb3b3700ae1566"
				project={require("../../package.json")}
				init={a=>{
						init()
						return dispatch(ACTION.FETCH_FAMILY())
				}}>
				<div style={style.root}>
					<div style={{width:menuWidth,height:"100%"}}>
						<div style={{display:"flex",flexDirection:"column"}}>
							<div style={style.child}>
								{head}
							</div>
							<div style={style.menu}>
								<a ref="status" style={active=="status" ? style.active : {}}
									onTouchTap={e=>this.setState({active:"status", focus:"status"})}
									onFocus={e=>this.setState({active:"status"})}
									tabIndex={++tab}>
									<Paper zDepth={1} style={style.menuLayout}>
										<center><IconStatus style={style.icon}/></center>
									</Paper>
								</a>
							</div>
							<div style={style.menu}>
								<a ref="comment" style={active=="comment" ? style.active : {}}
									onTouchTap={e=>this.setState({active:"comment", focus:"comment"})}
									onFocus={e=>this.setState({active:"comment"})}
									tabIndex={++tab}>
									<Paper zDepth={1} style={style.menuLayout}>
										<center><IconComment  style={style.icon}/></center>
									</Paper>
								</a>
							</div>
						</div>
					</div>
					<div style={{flex:1}}>
						<Paper zDepth={1} style={{width:"100%",height:"100%"}}>
						{content}
						</Paper>
					</div>
				</div>
			</QiliApp>
		)
	}
}

const App=connect(state=>({
	child:getCurrentChild(state)||{},
	...compact(getCurrentChildTarget(state,"baby"),"score","goal","todo"),
	switchable: state.entities.children && Object.keys(state.entities.children).length>1
}))(TV)


QiliApp.render(<App/>, {
	superdaddy:REDUCER,
	ui:combineReducers({
		time:TimeManageUI.reducer
	})
})

function tab(event, shift=false){
	event.preventDefault()
	let e = new KeyboardEvent("keydown",{code:"Tab", key: "Tab", shiftKey:shift});
	window.dispatchEvent(e);
}
