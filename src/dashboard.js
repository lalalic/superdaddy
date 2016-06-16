import {React, Component, UI} from "qili-app"
import {Link} from "react-router"

import IconKnowledges from "material-ui/svg-icons/communication/dialpad"
import IconAccount from 'material-ui/svg-icons/action/account-box'
import IconTask from "material-ui/svg-icons/editor/format-list-numbered"
import IconReward from "material-ui/svg-icons/places/child-care"

import Rewards from "./components/rewards"
import Logo from './icons/logo'

const {CommandBar, Empty}=UI

export default class Dashboard extends Component{
	render4NoChild(){
		return (
			<div className="page">
				<Link to="baby" style={{textDecoration:"none"}}>
					<Empty text={"click to start from your first baby"}
						icon={<Logo/>}/>
				</Link>
			</div>
			)
	}
	render(){
		if(!this.props.child)
			return this.render4NoChild()

		return (
			<div className="page">
				<Rewards child={this.props.child}/>

				<CommandBar className="footbar"
					primary="Reward"
                    items={[
						{action:"Reward",
							onSelect:a=>this.context.router.push('/'),
							icon:IconReward},
                        {action:"Tasks",
                            onSelect:()=>this.context.router.push('tasks'),
                            icon:IconTask},
                        {action:"Knowledges",
                            onSelect:()=>this.context.router.push('knowledges'),
                            icon:IconKnowledges},
                        {action:"setting", label:"Account",
                            onSelect:()=>this.context.router.push('account'),
                            icon: IconAccount}
                        ]}
                    />
			</div>
		)
	}
	static contextTypes={router: React.PropTypes.object}
}
