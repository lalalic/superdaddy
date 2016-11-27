import React, {Component, PropTypes} from "react"
import {UI,ENTITIES,REMOVE_ENTITIES} from 'qili-app'
import {normalize} from "normalizr"
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'

import {Family as dbFamily} from './db'
import {getCurrentChild, getChild} from "./selector"
import {ACTION as SuperDaddy} from "."

const {CommandBar,Photo, TextFieldx}=UI

export const ACTION={
	CHANGE: (id, key,value)=>(dispatch,getState)=>{
        const child=getChild(getState(),id)
		if(key=="name" && !value){
			return Promise.reject("名字不能空")
		}

		if(child[key]==value)
			return Promise.resolve()

        child[key]=value
        return dbFamily.upsert(child)
            .then(updated=>{
				dispatch(ENTITIES(normalize(updated,dbFamily.schema).entities))
			})
    }
	,CREATE: baby=>(dispatch,getState)=>{
		const {name}=baby
		if(!name)
			return Promise.reject("名字不能空")

		return dbFamily.upsert(baby)
			.then(baby=>{
					dispatch(ENTITIES(normalize(baby,dbFamily.schema).entities))
					return baby
				})
	}
	,REMOVE: id=>(dispatch,getState)=>{
		return dbFamily.remove(id)
			.then(a=>{
				dispatch(SuperDaddy.SWITCH_CURRENT_CHILD(id))
				dispatch(REMOVE_ENTITIES("children",id))
			})
	}
}

export class Baby extends Component{
	state={nameError:null}

	componentDidMount(){
		const {isCurrent,params:{id}, dispatch}=this.props
		if(!isCurrent)
			dispatch(SuperDaddy.SWITCH_CURRENT_CHILD(id))
	}

	componentWillReceiveProps({isCurrent,dispatch,params:{id}}){
		if(!isCurrent)
			dispatch(SuperDaddy.SWITCH_CURRENT_CHILD(id))
	}

	render(){
		const {name,photo,bd:birthday,gender, todos, dispatch,params:{id}}=this.props
		const {nameError}=this.state
		const {router}=this.context

		const changeName=a=>dispatch(ACTION.CHANGE(id,"name",refName.getValue().trim()))
			.then(a=>this.setState({nameError:null}), error=>this.setState({nameError:error}))
		let refName

		return (
			<div>
				<div className="form">
					<div className="child-photo">
						<Photo
							width={150}
							height={150}
							src={photo}
							onPhoto={url=>dispatch(ACTION.CHANGE(id,"photo",url))}/>
					</div>

					<TextFieldx ref={a=>refName=a}
						floatingLabelText="child name"
						fullWidth={true}
						value={name}
						errorText={nameError}
						onChange={({target:{value}})=>refName.value=value}
						onBlur={({target:{value}})=>changeName()}
						onKeyDown={({target:{value},keyCode})=>keyCode==13 && changeName()}
						/>

					<DatePicker
						floatingLabelText="birthday"
						fullWidth={true}
						autoOk={true}
						maxDate={new Date()}
						value={birthday}
						onChange={(nil, value)=>dispatch(ACTION.CHANGE(id,"bd",value))}/>

					<RadioButtonGroup
						style={{marginTop:36}}
						name="gender"
						onChange={(e,value)=>dispatch(ACTION.CHANGE(id,"gender",value))}
						valueSelected={gender||"f"}>
						<RadioButton value="f" label="女孩"/>
						<RadioButton value="m" label="男孩" />
					</RadioButtonGroup>
				</div>

				<CommandBar className="footbar"
					items={[
						"Back"
						, {
							action:"Remove",
							onSelect:a=>dispatch(ACTION.REMOVE(id))
								.then(a=>{
									router.replace("/")
								})}
						]}
					/>
			</div>
		)
	}
	static contextTypes={router:PropTypes.object}
}

export class Creator extends Component{
	state={nameError:null}

	render(){
		const {dispatch}=this.props
		const {router}=this.context
		const {nameError}=this.state

		let photo,refName, refBirthday, refGender

		const send=a=>dispatch(ACTION.CREATE({
			name: refName.getValue()
			,bd: refBirthday.getDate()
			,gender: refGender.getSelectedValue()
			,photo
		})).then(baby=>router.replace(`/baby/${baby._id}`),error=>this.setState({nameError:error}))

		return (
			<div>
				<div className="form">
					<div className="child-photo">
						<Photo onPhoto={url=>photo=url} width={150} height={150}/>
					</div>

					<TextFieldx ref={a=>refName=a}
						floatingLabelText="child name"
						errorText={nameError}
						fullWidth={true}/>

					<DatePicker ref={a=>refBirthday=a}
						floatingLabelText="birthday"
						fullWidth={true}
						autoOk={true}
						maxDate={new Date()}/>

					<RadioButtonGroup ref={a=>refGender=a}
						style={{marginTop:36}}
						name="gender"
						defaultSelected="f">
						<RadioButton value="f" label="girl"/>
						<RadioButton value="m" label="boy" />
					</RadioButtonGroup>
				</div>

				<CommandBar className="footbar"
					items={[
						"Back"
						,{
							action:"Save"
							,onSelect:a=>send()
						}
					]}
				/>
			</div>
		)
	}

	static contextTypes={router: PropTypes.object}
}

export default Object.assign(Baby, {ACTION})
