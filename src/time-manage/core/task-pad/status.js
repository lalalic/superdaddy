import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose, getContext, mapProps} from "recompose"

import {
	yellow500 as COLOR_DONE
	,yellow200 as COLOR_HOVER
	,lightBlue100 as COLOR_ENABLED
	,grey300 as COLOR_DISABLED
} from "material-ui/styles/colors"

import AutoForm from "components/auto-form"

import IconSmile from "icons/task"

export default compose(
	getContext({actions:PropTypes.object}),
	mapProps(({actions:{taskDone},...others})=>({
		taskDone,
		...others
	}))
)(class extends Component{
	state={info:false}
	render(){
		const {todo,done, day, current, fields=[], taskDone, ...others}=this.props
		const {info}=this.state
		if(done){	
			if(!info && fields.length)
				others.onClick=e=>this.setState({info:true})
			let icon=null
			if(fields.length){
				icon=<IconSmile color={COLOR_DONE} {...others} more={true}/>
			}else{
				icon=<IconSmile color={COLOR_DONE} {...others}/>
			}

			if(info){
				return (
					<span>
						<AutoForm
							fields={fields}
							title="信息"
							onCancel={e=>this.setState({info:false})}
							onSubmit={props=>{
								this.setState({info:false})
								taskDone({task:todo,day,props})
							}}
							/>
						{icon}
					</span>
				)
			}else{
				return icon
			}
		}else if(day>current)
			return (<IconSmile color={COLOR_DISABLED} {...others}/>)
		else{
			const icon=(<IconSmile color={COLOR_ENABLED}
						hoverColor={COLOR_HOVER}
						onClick={e=>{
							if(fields.length){
								this.setState({info:true})
							}else{
								taskDone({task:todo,day})
							}
						}}
						{...others}/>)
			if(info && fields.length){
				return (
					<span>
						<AutoForm
							fields={fields}
							title="信息"
							onCancel={e=>this.setState({info:false})}
							onSubmit={props=>{
								this.setState({info:false})
								taskDone({task:todo,day,props})
							}}
							/>
						{icon}
					</span>
				)
			}else{
				return icon
			}
		}
	}
})