import React, {Component, PropTypes} from "react"
import Comment from "qili-app/lib/components/comment"

import {AppBar, FlatButton, Avatar} from "material-ui"

import Wechat from "wechat4u"

export class KnowledgeComment extends Component{
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
				<AppBar style={{position:"fixed"}} iconElementRight={label} title={<span>{err||"微信群"}</span>} />
				<div style={{paddingTop:muiTheme.appBar.height}}>
					<Comment {...this.props}/>
				</div>
			</div>
		)
	}
	
	static contextTypes={
		muiTheme:PropTypes.object
	}
}

export default KnowledgeComment