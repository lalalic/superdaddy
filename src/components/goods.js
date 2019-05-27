import React from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps, setDisplayName} from "recompose"
import {AutoComplete} from "material-ui"

export default compose(
	setDisplayName("MyGoods"),
    getContext({client: PropTypes.object}),
    mapProps(({client,onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus})=>{
		return {
            goods:client.getAll("Good").map(({score,name})=>`${score}:${name}`),
            onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus,
        }
	})
)(({goods, onChange=a=>a, ...props})=>(
    <AutoComplete
		openOnFocus={true}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={goods}
        onNewRequest={onChange}
        {...props}
     />
))
