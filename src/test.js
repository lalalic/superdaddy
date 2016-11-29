import React, {Component, PropTypes} from "react"

import {List,ListItem,Subheader} from "material-ui"

import IconSmile from "material-ui/svg-icons/social/mood"

const Test=props=>(
	<List>
		<ListItem
			primaryText="work"
			leftIcon={<TodoStatus/>}
		/>
	</List>
)

const TodoStatus=(({todo,done, day, dispatch, current, ...others})=><IconSmile {...others}/>)

export default Test