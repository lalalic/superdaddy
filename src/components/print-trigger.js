import React, {Component} from "react"
import {IconButton} from "material-ui"
import IconPrint from "material-ui/svg-icons/action/print"

export default class PrintTrigger extends Component{
	render(){
		const {onNativeClick}=this.props
		return (
			<IconButton onClick={onNativeClick}>
				<IconPrint color="white"/>
			</IconButton>
		)
	}

	shouldComponentUpdate({printReady, onClick:print}){
		if(printReady){
			print()
		}
		return false
	}
}