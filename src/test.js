import React, {Component, PropTypes} from "react"
import IconSmile from "material-ui/svg-icons/social/mood"

import {List,ListItem} from "./components/dnd-list"

class Test extends Component{
	render(){
		return (
			<List
				data={["hello","world"]}
				template={a=><ListItem primaryText={a}/>}
				onDrop={(source,target)=>{

				}}
				/>
		)
	}
}



import {DragDropContext} from "react-dnd"
import DndBackend from "react-dnd-html5-backend"

export default DragDropContext(DndBackend)(Test)
