import React, {Component, PropTypes} from "react"
import {compose, getContext, withProps} from "recompose"
import {connect} from "react-redux"

import FloatingAdd from "components/floating-add"
import Knowledges from "./list"
import {ACTION} from "."

export const Creatable=({selectDocx, ...props})=>(
	<div>
		<FloatingAdd onClick={selectDocx} mini={true}/>
		<Knowledges {...props}/>
	</div>
)

export default compose(
	getContext({router:PropTypes.object}),
	connect(),
	withProps(({router,dispatch})=>({
		selectDocx: ()=>dispatch(ACTION.SELECT_DOCX())
			.then(a=>router.replace('/knowledge/create'))
	}))
)(Creatable)