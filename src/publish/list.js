import React, {Component,Fragment} from "react"
import {compose, mapProps,branch, renderComponent} from "recompose"
import {withFragment, withMutation, CommandBar, Empty} from "qili-app"

import {FlatButton, List, ListItem, Toggle} from "material-ui"

import AppBar from "components/app-bar"

import IconEdit from "material-ui/svg-icons/image/edit"
import IconArrowRight from "material-ui/svg-icons/hardware/keyboard-arrow-right"
import IconCreate from "material-ui/svg-icons/editor/border-color"

import Create from "."

export class Publishes extends Component{
	render(){
		const {publishes=[], toInfo,toCreate}=this.props
		let content=<Empty/>
		if(publishes.length){
			content=publishes.map(({id,name,status, done=status==0})=><ListItem
				key={id}
				primaryText={name}
				rightIcon={!done ? <IconArrowRight onClick={()=>toInfo(id)}/> : <span/>}
				/>)

			content=<List>{content}</List>
		}

		return (
			<Fragment>
				<div style={{flex:"none"}}>
					<AppBar title={"出版列表"}/>
				</div>

				<div style={{flex:"1 1 100%", overflowY:"scroll"}}>
					{content}
				</div>
				
				<CommandBar style={{flex:"none"}}
                    items={["Back", {
						action:"Create",
						label:"创建",
						onSelect:toCreate,
						icon: <IconCreate/>
					}]}/>
			</Fragment>
		)
	}
}

export default compose(
	withFragment({child:graphql`
		fragment list_publishes on Child{
			publishes{
				id
				name
				template
				from
				to
				copies
				status
			}
		}
	`}),
	mapProps(({child:{publishes},toInfo,toCreate})=>({publishes:publishes||[],toInfo,toCreate})),
	branch(
		({publishes})=> publishes && publishes.length==0,
		renderComponent(class extends Component{
			componentWillMount(){
				this.props.toCreate(true)
			}
			render(){
				return null
			}
		})
	),
)(Publishes)
