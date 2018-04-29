import React, {createFactory} from "react"
import PropTypes from "prop-types"
import {compose, branch, getContext, withProps, renderNothing} from "recompose"
import {connect} from "react-redux"
import {FloatingActionButton,Avatar} from "material-ui"

import {ACTION} from "main"


export const Current=compose(
	connect(({superdaddy:{current}})=>({id:current})),
	branch(({id})=>!id, renderNothing),
	getContext({client: PropTypes.object}),
	withProps(({dispatch, client, id})=>{
		let child=client.get(id)
		return {
			name: child.name,
			photo:child.photo,
			switchChild(){
				let all=client.getAll("Child")
				let i=all.findIndex(a=>a.id==id)
				dispatch(ACTION.CURRENT_CHILD(all.length ? all[(i+1)%all.length].id : null))
			}
		}
	}),
)(({name,photo,switchChild,switchable=true})=>(
	<FloatingActionButton
		mini={true}
		style={{fontSize:"xx-small"}}
		onClick={switchable ? switchChild : undefined}>
		{photo ? (<Avatar src={photo}/>) : name}
	</FloatingActionButton>
))

export const withCurrent=()=>BaseComponent=>{
	const factory=createFactory(BaseComponent)
	const WithCurrent=props=>(
		<div>
			<div className="sticky top right">
				<Current/>
			</div>
			{factory(props)}
		</div>
	)
	return WithCurrent
}

export default withCurrent
