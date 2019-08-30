import React from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps, setDisplayName} from "recompose"
import AutoComplete from "material-ui/AutoComplete"

export default compose(
	  setDisplayName("MyAward"),
    getContext({client: PropTypes.object}),
    mapProps(({client,onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus})=>{
		return {
            awards:client.getAll("Award").map(({score,name})=>`${score}:${name}`),
            onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus,
        }
	})
)(({awards, onChange=a=>a, ...props})=>(
    <AutoComplete
		openOnFocus={true}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={awards}
        onNewRequest={onChange}
        {...props}
     />
))
