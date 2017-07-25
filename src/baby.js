import React, {Component, PropTypes} from "react"
import {UI,ENTITIES,REMOVE_ENTITIES,User} from 'qili-app'
import {normalize,arrayOf} from "normalizr"
import {TextField, RadioButtonGroup, RadioButton,DatePicker,Subheader} from 'material-ui'

import {Family as dbFamily} from './db'
import {getCurrentChild, getChild} from "./selector"

import PublishUI from "./publish"
import Plan from "./plan"

import IconRemove from "material-ui/svg-icons/content/remove-circle"
import IconPublish from "material-ui/svg-icons/action/card-giftcard"
import IconPlan from "material-ui/svg-icons/editor/linear-scale"

import {InfoForm, Field} from "qili-app/lib/components/info-form"

const {CommandBar,Photo, TextFieldx}=UI

export const ACTION={
	CHANGE_TODO: (id,value)=>(dispatch,getState)=>{
        const child=getChild(getState(),id)
		let target=child.targets["baby"]
		if(target.todo==value)
			return Promise.resolve()

        target.todo=value
        return dbFamily.upsert(child)
            .then(updated=>{
				dispatch(ENTITIES(normalize(updated,dbFamily.schema).entities))
			})
    }
	,CHANGE: (id, key,value)=>(dispatch,getState)=>{
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
	,REMOVE: (id,uiHandle)=>(dispatch,getState)=>{
		return dbFamily.remove(id)
			.then(a=>{
				uiHandle()
				dispatch(REMOVE_ENTITIES("children",id))
				dispatch(ACTION.SWITCH_CURRENT_CHILD())
			})
	}
	,FETCH_FAMILY: a=>(dispatch,getState)=>new Promise((resolve,reject)=>
			dbFamily.find({author:User.currentAsAuthor})
			.fetch(all=>{
				if(all.length==0)
					dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD()).then(resolve,reject)
				else {
					all=dbFamily.upgrade(all)
					let entities=normalize(all,arrayOf(dbFamily.schema)).entities
					dispatch(ENTITIES(entities))
					if(entities.children){
						let next=entities.children[Object.keys(entities.children)[0]]
						if(next){
							dispatch(ACTION.CURRENT_CHILD_CHANGE(next))
							resolve()
						}
					}else
						dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD()).then(resolve,reject)
				}
			})
	)
	,CREATE_DEFAULT_FIRST_CHILD: ()=>dispatch=>{
		return dbFamily.upsert({name:"宝宝",targets:{baby:{score:0,totalScore:0}}})
			.then(child=>{
				dispatch(ENTITIES(normalize(child,Family.schema).entities))
				dispatch(ACTION.CURRENT_CHILD_CHANGE(child))
			})
	}
	,SWITCH_CURRENT_CHILD: id=>(dispatch,getState)=>{
		const state=getState()
		const children=state.entities.children
		if(id){
			dispatch(ACTION.CURRENT_CHILD_CHANGE(children[id]))
		}else{
			const current=state.superdaddy.child
			const ids=Object.keys(children)
			let next=ids[(ids.indexOf(current)+1)%ids.length]
			dispatch(ACTION.CURRENT_CHILD_CHANGE(children[next]))
		}
	}
	,CURRENT_CHILD_CHANGE: child=>({type:'CURRENT_CHILD_CHANGE',payload:child})
	,PLAN: plan=>{
		return {}
	}
}

export class Baby extends Component{
	state={nameError:null}

	componentDidMount(){
		const {isCurrent,params:{id}, dispatch}=this.props
		if(!isCurrent)
			dispatch(ACTION.SWITCH_CURRENT_CHILD(id))
	}

	componentWillReceiveProps({isCurrent,dispatch,params:{id}}){
		if(!isCurrent)
			dispatch(ACTION.SWITCH_CURRENT_CHILD(id))
	}

	render(){
		const {name,photo,bd:birthday,gender, score=0, todo, goal, totalScore=score, todos, dispatch,params:{id}}=this.props
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
							overwritable={true}
							onPhoto={url=>dispatch(ACTION.CHANGE(id,"photo",url))}/>
					</div>

					<InfoForm>
						<Field primaryText="宝宝名" value={name}
							onEdit={value=>dispatch(ACTION.CHANGE(id,"name",value))}/>

						<Field primaryText="生日" value={birthday}
							type="date"
							onEdit={value=>dispatch(ACTION.CHANGE(id,"bd",value))}/>

						<Field primaryText="性别" value={gender||"f"}
							type="single"
							options={[{value:"f",label:"女孩"},{value:"m", label:"男孩"}]}
							onEdit={value=>dispatch(ACTION.CHANGE(id,"gender",value))}
							/>

						<Subheader>当前任务</Subheader>

						<Field primaryText="成绩" value={`${score}${totalScore==score ? "" : `/${totalScore}`}`}/>

						<Field primaryText="目标" value={todo}
							type="input"
							onEdit={goal ? value=>dispatch(ACTION.CHANGE_TODO(id,value)) : null}
							/>
					</InfoForm>
				</div>

				<CommandBar className="footbar"
					items={[
						"Back"
						,{
							action:"publish",
							label:"出版",
							icon:<IconPublish/>,
							onSelect:a=>router.push("/publish")
						}
						,{
							action:"plan",
							label:"年度计划",
							icon:<IconPlan/>,
							onSelect:a=>router.push("/plan")
						}
						,{
							action:"Remove",
							label:"删除",
							icon:<IconRemove/>,
							onSelect:a=>{
								dispatch(ACTION.REMOVE(id, a=>router.replace("/my")))
							}
						}
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

		let refName, refBirthday, refGender

		const send=a=>dispatch(ACTION.CREATE({
			name: refName.getValue()
			,bd: refBirthday.getDate()
			,gender: refGender.getSelectedValue()
		})).then(baby=>router.replace(`/baby/${baby._id}`),error=>this.setState({nameError:error}))

		return (
			<div>
				<div className="form">
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
