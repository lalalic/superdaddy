import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose, setStatic, getContext, withProps} from "recompose"
import {withMutation, withFragment,InfoForm, CommandBar, Photo} from "qili-app"
import {graphql} from "react-relay"

import {TextField, RadioButtonGroup, RadioButton,DatePicker,Subheader} from 'material-ui'

import {Icons} from "icons/task"

import {yellow500 as COLOR_DONE} from "material-ui/styles/colors"

import IconRemove from "material-ui/svg-icons/content/remove-circle"
import IconPublish from "material-ui/svg-icons/action/card-giftcard"
import IconPlan from "material-ui/svg-icons/editor/linear-scale"

import {ACTION} from "../state"

export class Child extends Component{
	state={nameError:null}

	componentDidMount(){
		this.props.syncCurrent()
	}

	render(){
		const {id, name,photo,birthday,gender, totalScore=score,
				plan:{icon,todo,goal,score=0},
				update, remove, toPublish, toPlan, updatePlan,
				}=this.props
		const {nameError}=this.state

		return (
			<Fragment>
				<div className="form" style={{flex:"1 100%"}}>
					<div className="child-photo">
						<Photo size={150} src={photo}
							autoUpload={{host:id,path:"photo.jpg"}}
							onPhoto={photo=>update({photo})}/>
					</div>

					<InfoForm>
						<InfoForm.Field primaryText="宝宝名" value={name}
							onEdit={
								name=>update({name})
									.then(
										a=>this.setState({nameError:null}),
										error=>this.setState({nameError:error})
										)
								}/>

						<InfoForm.Field primaryText="生日" value={birthday}
							type="date"
							onEdit={birthday=>update({birthday})}/>

						<InfoForm.Field primaryText="性别" value={gender||"girl"}
							type="single"
							options={[{value:"girl",label:"女孩"},{value:"boy", label:"男孩"}]}
							onEdit={gender=>update({gender})}
							/>

						<InfoForm.Field primaryText="个性图标" value={icon||"Smile"}
							type="single"
							options={
								Object.keys(Icons)
									.map(k=>{
										let Icon=Icons[k]
										return {
											value:k,
											label: (<Icon color={COLOR_DONE}/>)
										}
									})
							}
							onEdit={icon=>updatePlan({icon})}
							/>

						<Subheader>当前任务</Subheader>

						<InfoForm.Field primaryText="成绩" value={`${score}/${goal}${totalScore==score ? "" : `/${totalScore}`}`}/>

						<InfoForm.Field primaryText="目标" value={todo}
							type="input"
							onEdit={goal ? todo=>updatePlan({todo}) : null}
							/>
					</InfoForm>
				</div>

				<CommandBar style={{flex:1}}
					items={[
						"Back"
						/*,{
							action:"publish",
							label:"出版",
							icon:<IconPublish/>,
							onSelect:toPublish
						}*/
						,{
							action:"plan",
							label:"年度计划",
							icon:<IconPlan/>,
							onSelect:toPlan
						}
						,{
							action:"Remove",
							label:"删除",
							icon:<IconRemove/>,
							onSelect:remove
						}
						]}
					/>
			</Fragment>
		)
	}
}

export class Creator extends Component{
	state={nameError:null,name:this.props.name}

	render(){
		const {create, style={}}=this.props
		const {nameError,name}=this.state

		let refBirthday, refGender

		return (
			<Fragment>
				<div style={{padding:10,...style, flex:"1 100%"}}>
					<TextField
						floatingLabelText="宝宝名称"
						errorText={nameError}
						value={name}
						onChange={(e,name)=>this.setState({name})}
						fullWidth={true}/>

					<DatePicker ref={a=>refBirthday=a}
						floatingLabelText="生日"
						fullWidth={true}
						autoOk={true}
						maxDate={new Date()}/>

					<RadioButtonGroup ref={a=>refGender=a}
						style={{marginTop:36}}
						name="性别"
						defaultSelected="girl">
						<RadioButton value="girl" label="女孩"/>
						<RadioButton value="boy" label="男孩" />
					</RadioButtonGroup>
				</div>

				<CommandBar style={{flex:1}}
					items={[
						"Back",
						{
							action:"Save",
							onSelect:()=>create({
									name,
									birthday: refBirthday.getDate(),
									gender: refGender.getSelectedValue(),
								})
								.catch(nameError=>this.setState({nameError})),
						}
					]}
				/>
			</Fragment>
		)
	}
}

export default compose(
	setStatic("Creator",compose(
		withMutation({
			promise: true,
			mutation: graphql`
				mutation child_create_Mutation($name:String!, $photo:String, $birthday:Date,$gender:Gender){
					child_create(name:$name, photo:$photo, birthday:$birthday,gender:$gender){
						id
						createdAt
					}
				}
			`
		}),
		withProps(({mutate,toChild})=>({
			create:data=>mutate(data).then(({id})=>toChild(id)),
		})),
	)(Creator)),

	withFragment(graphql`
		fragment child on Child{
			id
			name
			photo
			birthday
			gender
			totalScore:score

			plan{
				score
				goal
				todo
				icon
			}
		}
	`),
	withProps(({data})=>({...data,birthday:data.birthday ? new Date(data.birthday) : undefined})),
	withMutation(({id})=>({
		name:"update",
		patch4:id,
		promise:true,
		variables:{id},
		mutation: graphql`
			mutation child_update_Mutation($id:ObjectID!, $photo:String, $name:String, $birthday:Date,$gender:Gender){
				child_update(_id:$id, photo:$photo, name:$name, birthday:$birthday,gender:$gender)
			}
		`
	})),
	withMutation(({id}, plan)=>({
		name: "updatePlan",
		patch4: `plans:${id.split(":").pop()}`,
		variables:{id,  plan},
		mutation:graphql`
			mutation child_planupdate_Mutation($id:ObjectID,$plan:JSON){
				plan_update(_id:$id, plan:$plan){
					id
					icon
					todo
				}
			}
		`,
	})),
	withMutation(({id})=>({
		name:"doRemove",
		variables:{id},
		mutation:graphql`
			mutation child_remove_Mutation($id:ObjectID!){
				child_remove(_id:$id)
			}
		`,
		delete4:id
	})),
	connect(state=>({current:state.superdaddy.current}),
		(dispatch,{id, current, name, doRemove,showMessage,switchChild, toMy})=>({
			syncCurrent(){
				if(current!=id)
					dispatch(ACTION.CURRENT_CHILD(id))
			},

			remove(){
				let removing=prompt("请输入要删除的宝宝名称").trim()
				if(removing && removing==name){
					doRemove()
					toMy()
					switchChild()
				}else{
					showMessage({
						message:"宝宝名称错误，不能删除",
						level:"warning",
					})
				}
			},
		})
	),
)(Child)
