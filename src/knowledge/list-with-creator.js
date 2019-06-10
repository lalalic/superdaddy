import React, {Fragment} from "react"
import PropTypes from "prop-types"

import {compose, getContext, branch, renderComponent} from "recompose"
import {connect} from "react-redux"

import FloatingAdd from "components/floating-add"
import Knowledges from "./list"
import {ACTION} from "."

export const Creatable=({selectDocx, ...props})=>(
	<Fragment>
		<FloatingAdd onClick={selectDocx} mini={true}/>
		<Knowledges {...props}/>
	</Fragment>
)

export default compose(
	getContext({
		is:PropTypes.object
	}),
	branch(({is})=>is.app, renderComponent(Knowledges)),

	connect(null,(dispatch,{toCreate})=>({
		selectDocx: ()=>dispatch(ACTION.SELECT_DOCX()).then(toCreate)
	}))
)(Creatable)
