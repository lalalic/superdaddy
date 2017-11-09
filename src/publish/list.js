import React, {Component} from "react"
import {compose, mapProps,branch, renderComponent} from "recompose"
import {withFragment, withMutation} from "qili/tools/recompose"

import {FlatButton, List, ListItem, Toggle} from "material-ui"
import CommandBar from "qili/components/command-bar"
import Empty from "qili/components/empty"

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
			<div>
				<AppBar title={"出版列表"}/>
				
				{content}
				
				<CommandBar className="footbar"
                    items={["Back", {
						action:"Create",
						label:"创建",
						onSelect:toCreate,
						icon: <IconCreate/>
					}]}/>
			</div>
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
	branch(({publishes})=> publishes && publishes.length==0, renderComponent(({toInfo})=><Create toInfo={toInfo}/>)),
)(Publishes)