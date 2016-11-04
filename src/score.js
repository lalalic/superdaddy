import React, {Component, PropTypes} from "react"
import {UI} from "qili-app"
import {Link} from "react-router"

import Rewards from "./components/rewards"
import Logo from './icons/logo'
import {FloatingActionButton} from "material-ui"
import IconPublish from "material-ui/svg-icons/image/camera-roll"

const {CommandBar, Empty}=UI

export default class Score extends Component{
	render(){
		return (
			<div className="page">
				<FloatingActionButton
					className="floating sticky bottom right"
					mini={true} onClick={e=>this.context.router.push("publish")}>
					<IconPublish/>$
				</FloatingActionButton>
				<Rewards child={this.context.child}/>
			</div>
		)
	}
	static contextTypes={
		router: PropTypes.object
		,child: PropTypes.object
	}
}
