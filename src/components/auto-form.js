import React, {Component, PropTypes} from "react"
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default class AutoForm extends Component{
	static defaultProps={
		title: PropTypes.string.isRequired,
		onCancel: PropTypes.func.isRequired,
		onSubmit: PropTypes.func.isRequired,
		fields: PropTypes.arrayOf(PropTypes.object)
	}
	
	constructor(props){
		super(...arguments)
		let state={}
		const {fields=[]}=this.props
		fields.forEach(({name,value})=>value!=undefined && (state[name]=value))
		this.state=state
	}
	
	render(){
		const {title,fields=[],onCancel,onSubmit}=this.props
		let actions=[
			<FlatButton 
				label="放弃"
				primary={false}
				onClick={onCancel}	
				/>,
			<FlatButton 
				label="确定"
				primary={true}
				onClick={()=>{
					let props={}
					fields.forEach(({name})=>props[name]=this.state[name])
					onSubmit(props)
				}}			
				/>
		]
		let props=fields.map(({name,title:floatingLabelText,options})=>{
			if(options){
				return (
					<SelectField 
						{...{name,floatingLabelText,key:name}}
						value={this.state[name]}
						onChange={(e,i,value)=>this.setState({[name]:value})}
						>
						{options.map(({displayText,value})=><MenuItem {...{value, primaryText:displayText,key:value}}/>)}
					</SelectField>
				)
			}else{
				return <TextField 
					{...{name,floatingLabelText,key:name}}
					value={this.state[name]}
					onChange={(e,value)=>this.setState({[name]:value})}/>
			}
		})
		return (
			<Dialog 
				{...{title,actions,modal:false,open:true}}
				onRequestClose={onCancel}
				>
				{props}
			</Dialog>
		)
	}
}

