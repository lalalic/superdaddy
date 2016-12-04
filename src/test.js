import React, {Component, PropTypes} from "react"

import {List} from "material-ui"

import IconSmile from "material-ui/svg-icons/social/mood"

import {dnd} from "./components/dnd-list"

const ListItem=dnd((source,target)=>{
	console.log(`source.text=${source.primaryText}`)
	console.log(`target.text=${target.primaryText}`)
})

class Test extends Component{
	render(){
		return (
			<List>
				<ListItem
					primaryText="work"
					leftIcon={<IconSmile/>}
				/>

				<ListItem
					primaryText="english"
					leftIcon={<IconSmile/>}
				/>
			</List>
		)
	}
}



import {DragDropContext} from "react-dnd"
import DndBackend from "react-dnd-html5-backend"

export default DragDropContext(DndBackend)(Test)
