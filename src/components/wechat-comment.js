import React, {Component, PropTypes} from "react"
import Comment from "qili-app/lib/components/comment"

import AppBar from "components/app-bar"
import {FlatButton, Avatar} from "material-ui"
import PullToRefresh from "components/pull-to-refresh"

import Wechat from "wechat4u"

export class WechatComment extends Component{
	state={connected:false}
	constructor(){
		super() 
		this.bot=new Wechat()
		this.bot.on("uuid",uuid=>this.setState({uuid}))
		this.bot.on("user-avatar", avatar=>this.setState({avatar}))
		this.bot.on("login",a=>this.setState({connected:true}))
		this.bot.on("logout",a=>this.setState({connected:false,uuid:undefind, avatar:undefined}))
		this.bot.on("error",err=>this.setState({err}))
	}
	render(){
		const {connected,avatar,uuid,err}=this.state
		const {title}=this.props
		const {muiTheme}=this.context
		let label=null, code
		if(connected){
			if(avatar)
				label=<Avatar src={avatar}/>
			else
				label=<FlatButton label="断开微信"/>
		}else{
			if(uuid)
				code=<Dialog open={true}><img src={`https://login.weixin.qq.com/l/${uuid}`}/></Dialog>;
			else
				label=<FlatButton label="连接微信" onClick={e=>this.bot.start()}/>
		}
		return (
			<div>
				{code}
				<AppBar iconElementRight={label} 
					title={<span>{err||title}</span>} />
				<PullToRefresh 
					onMore={(resolve,reject)=>dispatch(Comment.ACTION.FETCH_MORE()).then(resolve,reject)}
					onRefresh={(resolve,reject)=>dispatch(Comment.ACTION.FETCH_FRESH()).then(resolve,reject)}
					>
					<Comment {...this.props}/>
				</PullToRefresh>
			</div>
		)
	}
	
	static contextTypes={
		muiTheme:PropTypes.object
	}
}

export default WechatComment