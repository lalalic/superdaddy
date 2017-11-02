import React, {Component, PropTypes} from "react"
import {compose} from "recompose"
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
	connect(null,(dispatch,{toCreate})=>({
		selectDocx: ()=>dispatch(ACTION.SELECT_DOCX()).then(toCreate)
	}))
)(Creatable)