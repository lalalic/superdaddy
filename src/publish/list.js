import React, {Component} from "react"
import {FlatButton} from "material-ui"
import {UI} from "qili-app"

import {ACTION} from "."
import AppBar from "../components/app-bar"

import IconEdit from "material-ui/svg-icons/image/edit"

export default class List extends Component{
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
					data.map(({_id,name})=>{
						return <div>{name}</div>
					})
				}
				</div>
				
				<UI.CommandBar className="footbar"
                    items={["Back","取消订单"]}/>
			</div>
		)
	}
}