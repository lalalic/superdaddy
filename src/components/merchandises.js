import React from "react"
import PropTypes from "prop-types"
import {compose, getContext, mapProps, setDisplayName} from "recompose"
import {AutoComplete} from "material-ui"

export default compose(
	  setDisplayName("MyMerchandise"),
    getContext({client: PropTypes.object}),
    mapProps(({client,onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus})=>{
		return {
            merchandises:client.getAll("Merchandise").map(({score,name})=>`${score}:${name}`),
            onChange,value,fullWidth,floatingLabelText,hintText,openOnFocus,
        }
	})
)(({merchandises, onChange=a=>a, ...props})=>(
    <AutoComplete
		openOnFocus={true}
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={merchandises}
        onNewRequest={onChange}
        {...props}
     />
))
