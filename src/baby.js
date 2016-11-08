import React, {Component, PropTypes} from "react"
import {UI,ENTITIES,REMOVE_ENTITIES} from 'qili-app'
import {normalize} from "normalizr"
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'

import {Family as dbFamily} from './db'
import RewardGoal from './components/rewards'
import {getCurrentChild} from "./selector"
import {ACTION as SuperDaddy} from "."

const {CommandBar,Photo, TextFieldx}=UI

export const ACTION={
	CHANGE: (key,value)=>(dispatch,getState)=>{
        const child=getCurrentChild(getState())
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
	,CREATE: baby=>dispatch=>{
		const {name}=baby
		if(!name)
			return Promise.reject("名字不能空")

		return dbFamily.upsert(baby)
			.then(baby=>{
					dispatch(ENITITIES(normalize(baby,dbFamily.schema).entities))
					return baby
				})
	}
	,REMOVE: a=>(dispatch,getState)=>{
		const child=getCurrentChild(getState())
		return dbFamily.remove(child._id)
			.then(a=>{
				dispatch(REMOVE_ENTITIES("children",child.id))
			})
	}
}

export class Baby extends Component{
	state={nameError:null}

	componentWillReceiveProps(next){
		if(!next.isCurrent)
			next.dispatch(SuperDaddy.SWITCH_CURRENT_CHILD(next.params.id))
	}

	render(){
		const {name,photo,bd:birthday,gender, dispatch}=this.props
		const {nameError}=this.state
		const {router}=this.context

		const changeName=a=>dispatch(ACTION.CHANGE("name",refName.getValue().trim()))
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
							onPhoto={url=>dispatch(ACTION.CHANGE("photo",url))}/>
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
						onChange={(nil, value)=>dispatch(ACTION.CHANGE("bd",value))}/>

					<RadioButtonGroup
						style={{marginTop:36}}
						name="gender"
						onChange={(e,value)=>dispatch(ACTION.CHANGE("gender",value))}
						valueSelected={gender||"f"}>
						<RadioButton value="f" label="女孩"/>
						<RadioButton value="m" label="男孩" />
					</RadioButtonGroup>

					<div>
						<br/>
						<br/>
						<div style={{fontSize:"smaller", color:"gray", borderBottom:"1px dotted lightgray"}}>
							{name}的激励计划
						</div>
						{/*
						<RewardGoal
							editable={true}
							style={{marginTop:30}}
							child={child}/>*/}
					</div>
				</div>

				<CommandBar className="footbar"
					items={[
						"Back"
						, {action:"Remove", onSelect:a=>dispatch(ACTION.REMOVE()).then(a=>router.replace("/"))}]}/>
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
						showYearSelector={true}
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
