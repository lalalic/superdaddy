import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import Comment from "qili-app/lib/components/comment"

import {GridList, GridTile} from 'material-ui/GridList'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'

import IconStatus from "material-ui/svg-icons/social/mood"
import IconComment from "material-ui/svg-icons/communication/comment"


import TimeManageUI from "../time-manage"
import {Family} from "../db"
import {getCurrentChild} from "../selector"
	

export class TV extends Component{
	state={
		active: "status"
	}
	render(){
		const {active}=this.state
		const {child, switchable}=this.props
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
		)
	}
}

export default connect(state=>({
	child:getCurrentChild(state), 
	switchable: Object.keys(state.entities.children).length>1
}))(TV)