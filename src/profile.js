import React from "react"
import Profile, {ACTION} from "qili-app/lib/user-profile"
import {Field} from "qili-app/lib/components/info-form"
import {connect} from "react-redux"

export const MyProfile=props=>(
	<Profile>
		<div style={{minHeight:30}}/>
		<Field primaryText="需要管理你的任务吗?"
			value={props.manageMyTime||0}
			type="single"
			options={[{value:1,label:"需要，看看我有多爱宝宝"},{value:0,label:"清净些，不需要"}]}
			onEdit={value=>props.dispatch(Profile.ACTION.UPDATE("manageMyTime",value))}/>
	</Profile>
)

export default connect(state=>({manageMyTime:state.qiliApp.user.manageMyTime}))(MyProfile)
