import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import Comment from "qili-app/components/comment"

import AppBar from "components/app-bar"
import FlatButton from "material-ui/FlatButton"
import Avatar from "material-ui/Avatar"

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
		const {title,dispatch}=this.props
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
			<Fragment>
				{code}
				<AppBar iconElementRight={label}
					title={<span>{err||title}</span>} />
				<Comment {...this.props}/>
			</Fragment>
		)
	}

	static contextTypes={
		muiTheme:PropTypes.object
	}
}

export default WechatComment
