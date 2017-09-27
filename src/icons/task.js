import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {compose, getContext} from "recompose"

import SvgIcon from 'material-ui/SvgIcon'
import IconSmile from "material-ui/svg-icons/social/mood"
import IconFavorite from "material-ui/svg-icons/action/favorite-border"
import IconChildCare from "material-ui/svg-icons/places/child-care"
import IconStar from "material-ui/svg-icons/toggle/star-border"

export const Icons={Smile:IconSmile, Heart:IconFavorite, Laugh:IconChildCare, Star: IconStar}

export const Task=({type,more, color,...others})=>{
	let Icon=Icons[type]
	if(!more){
		return <Icon {...{color,...others}}/>
	}else{
		return (
			<SvgIcon {...{color,...others}}>
				<Icon {...{color}}/>
				<circle cx="21" cy="12" r="3" />
				<circle cx="3"  cy="12" r="3" />
			</SvgIcon>
		)
	}
}

export default compose(
	getContext({client:PropTypes.object}),
	connect(({current}, {client})=>{
		let {icon="Smile"}=client.get(current)
		return {type:icon}
	}),
)(Task)



