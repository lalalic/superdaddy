require('../../style/index.less')

import React, {Component, PropTypes} from "react"
import {combineReducers} from "redux"
import {connect} from "react-redux"
import {QiliApp} from "qili-app"
import Comment from "qili-app/lib/components/comment"

import {GridList, GridTile} from 'material-ui/GridList'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import IconStatus from "material-ui/svg-icons/social/mood"
import IconComment from "material-ui/svg-icons/communication/comment"

import {Family,init} from "../db"
import {getCurrentChild} from "../selector"
import {ACTION,REDUCER} from "../baby"
import TimeManageUI from "../time-manage"

class TV extends Component{
	state={
		active: "status"
	}
	componentDidMount(){
		window.addEventListener("keydown", e=>{
			switch(e.keyCode) {
		        case 37:
		            tab(true)// left key pressed
		            break;
		        case 38:
		            tab(true)// up key pressed
		            break;
		        case 39:
		            tab()// right key pressed
		            break;
		        case 40:
		            tab()// down key pressed
		            break;
		    }
		}, false)
	}
	render(){
		const {active}=this.state
		const {child, switchable,dispatch}=this.props
		const menuWidth=150
		const style={
			root: {display:"flex",height:window.innerHeight,padding:5, overflowY:"hidden"},
			menu: {height:100,padding:20},
			icon: {width:60,height:60},
			menuLayout: {width:"100%",height:"100%",padding:4},
			child: {height:menuWidth,padding:20},
			active: {transform: "scale(1.2)",display:"block"}
		}
		let content=null
		switch(active){
		case "status":
			content=(<TimeManageUI.ScorePad
				child={child}
				showComment={false}
				height={window.innerHeight-100}
				width={window.innerWidth-menuWidth}/>)
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

		let head=null, tab=0
		if(switchable){
			head=(<a tabIndex={++tab}>
				<Avatar size={110}
					style={{fontSize:"larger"}}
                    onTouchTap={e=>dispatch(ACTION.SWITCH_CURRENT_CHILD())}
					src={child.thumbnail}
					color="lightgray">{child.name}</Avatar>
			</a>)

		}else{
			head=(<Avatar size={110}
					style={{fontSize:"larger"}}
					src={child.thumbnail}
					color="lightgray">{child.name}</Avatar>)
		}
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
								<a style={active=="status" ? style.active : {}}
									onFocus={e=>this.setState({active:"status"})}
									tabIndex={++tab}>
									<Paper zDepth={1} style={style.menuLayout}>
										<center><IconStatus style={style.icon}/></center>
									</Paper>
								</a>
							</div>
							<div style={style.menu}>
								<a style={active=="comment" ? style.active : {}}
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
	switchable: state.entities.children && Object.keys(state.entities.children).length>1
}))(TV)


QiliApp.render(<App/>, {
	superdaddy:REDUCER,
	ui:combineReducers({
		time:TimeManageUI.reducer
	})
})

function tab(shift=false){
	let e = new KeyboardEvent("keydown",{code:"Tab", shiftKey:shift});
	window.dispatchEvent(e);
}
