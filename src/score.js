import {React, Component, UI} from "qili-app"
import {Link} from "react-router"

import Rewards from "./components/rewards"
import Logo from './icons/logo'

const {CommandBar, Empty}=UI

export default class Score extends Component{
	render(){
		return (
			<div className="page">
				<Rewards child={this.props.child}/>
			</div>
		)
	}
	static contextTypes={router: React.PropTypes.object}
}
