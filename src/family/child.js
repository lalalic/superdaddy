import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose, setStatic, getContext, withProps} from "recompose"
import {withMutation, withFragment} from "qili-app/lib/tools/recompose"
import {graphql} from "react-relay"

import {TextField, RadioButtonGroup, RadioButton,DatePicker,Subheader} from 'material-ui'

import {Icons} from "icons/task"

import {yellow500 as COLOR_DONE} from "material-ui/styles/colors"

import IconRemove from "material-ui/svg-icons/content/remove-circle"
import IconPublish from "material-ui/svg-icons/action/card-giftcard"
import IconPlan from "material-ui/svg-icons/editor/linear-scale"

import {InfoForm, Field} from "qili-app/lib/components/info-form"
import CommandBar from "qili-app/lib/components/command-bar"
import Photo from "qili-app/lib/components/photo"
import TextFieldx from "qili-app/lib/components/text-field"

import {ACTION} from "main"

export class Child extends Component{
	state={nameError:null}

	componentWillReceiveProps(next){
		next.syncCurrent(next.id)
	}

	render(){
		const {name,photo,birthday,gender, 
				score=0,todo, goal, totalScore=score,icon,
				update, remove, publish, plan
				}=this.props
		const {nameError}=this.state

		return (
			<div>
				<div className="form">
					<div className="child-photo">
						<Photo
							width={150}
							height={150}
							src={photo}
							overwritable={true}
							onPhoto={photo=>update({photo})}/>
					</div>

					<InfoForm>
						<Field primaryText="宝宝名" value={name}
							onEdit={
								name=>update({name})
									.then(
										a=>this.setState({nameError:null}), 
										error=>this.setState({nameError:error})
										)
								}/>

						<Field primaryText="生日" value={birthday}
							type="date"
							onEdit={birthday=>update({birthday})}/>

						<Field primaryText="性别" value={gender||"girl"}
							type="single"
							options={[{value:"girl",label:"女孩"},{value:"boy", label:"男孩"}]}
							onEdit={gender=>update({gender})}
							/>
							
						<Field primaryText="个性图标" value={icon||"Smile"}
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
							onEdit={icon=>update({icon})}
							/>

						<Subheader>当前任务</Subheader>

						<Field primaryText="成绩" value={`${score}${totalScore==score ? "" : `/${totalScore}`}`}/>

						<Field primaryText="目标" value={todo}
							type="input"
							onEdit={goal ? todo=>update({todo}) : null}
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
							onSelect:publish
						}
						,{
							action:"plan",
							label:"年度计划",
							icon:<IconPlan/>,
							onSelect:plan
						}
						,{
							action:"Remove",
							label:"删除",
							icon:<IconRemove/>,
							onSelect:remove
						}
						]}
					/>
			</div>
		)
	}
}

export class Creator extends Component{
	state={nameError:null}

	render(){
		const {create}=this.props
		const {nameError}=this.state

		let refName, refBirthday, refGender

		return (
			<div>
				<div className="form">
					<TextFieldx ref={a=>refName=a}
						floatingLabelText="宝宝名称"
						errorText={nameError}
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

				<CommandBar className="footbar"
					items={[
						"Back",
						{
							action:"Save",
							onSelect:()=>create({
									name: refName.getValue(),
									birthday: refBirthday.getDate(),
									gender: refGender.getSelectedValue(),
								})
								.catch(error=>this.setState({nameError:error})),
						}
					]}
				/>
			</div>
		)
	}

	static contextTypes={router: PropTypes.object}
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
		getContext({router: PropTypes.object}),
		withProps(({mutate,router})=>({
			create(data){
				return mutate(data)
					.then(({id})=>router.replace(`/child/${id}`))
			}
		})),
	)(Creator)),
	
	withFragment(graphql`
		fragment child on Child{
			id
			name
			photo
			birthday
			gender
			
			score
			totalScore
			goal
			todo
			icon
		}
	`),
	withProps(({data})=>({...data,birthday:data.birthday ? new Date(data.birthday) : undefined})),
	withMutation(({id})=>({
		name:"update",
		patch4:id,
		promise:true,
		mutation: graphql`
			mutation child_update_Mutation($id:ObjectID!, $name:String, $photo:String, $birthday:Date,$gender:Gender){
				child_update(_id:$id, name:$name, photo:$photo, birthday:$birthday,gender:$gender)
			}
		`
	})),
	withMutation(({id})=>({
		name:"doRemove",
		variables:{id},
		mutation:graphql`
			mutation child_remove_Mutation($id:ObjectID!){
				child_remove(_id:$id)
			}
		`,
	})),
	connect(null,
		(dispatch,{doUpload, router,id, name, doRemove,showMessage,switchChild})=>({
			syncCurrent(newID){
				if(newID!=id)
					dispatch(ACTION.CURRENT_CHILD(newID))
			},

			upload(){
				file.select()
					.then(doUpload)
			},
			
			remove(){
				let removing=prompt("请输入要删除的宝宝名称").trim()
				if(removing && removing==name){
					doRemove()
					router.replace("/my")
					switchChild()
				}else{
					showMessage({
						message:"宝宝名称错误，不能删除",
						level:"warning",
					})
				}
			},
			
			publish(){
				router.push("/publish")
			},
			
			plan(){
				router.push("/plan")
			}
		})
	),
)(Child)
