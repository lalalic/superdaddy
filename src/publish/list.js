import React, {Component} from "react"
import {compose, withProps} from "recompose"
import {withFragment, withMutation} from "qili/tools/recompose"

import {FlatButton} from "material-ui"
import CommandBar from "qili/components/command-bar"

import AppBar from "components/app-bar"

import IconEdit from "material-ui/svg-icons/image/edit"

export class List extends Component{
	state={editing:0}
	render(){
		const {data=[]}=this.props
		const {editing}=this.state
		return (
			<div>
				<AppBar title={"出版列表"} 
					iconElementRight={
						<FlatButton label="编辑" 
							icon={<IconEdit/>}
							onClick={e=>this.setState({editing:1})}
						/>
					}
				/>
				<div>
				{
					data.map(({id,name})=>{
						return <div>{name}</div>
					})
				}
				</div>
				
				<CommandBar className="footbar"
                    items={["Back","取消订单"]}/>
			</div>
		)
	}
}

export default compose(
	withFragment(graphql`
		fragment list_publishes on Child{
			publishs{
				id
				name
				template
				from
				to
				copies
			}
		} 
	`),
	withProps((publishs)=>({
		data:publishs.publishs
	})),
	withMutation(({})=>({
		mutation: graphql`
			mutation list_remove_Mutation($id:ObjectID){
				publish_remove(_id:$id)
			}
		`,
	}))
)(List)