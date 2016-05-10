import {React} from "qili-app"
import {TextField, IconButton} from 'material-ui'
import PlusIcon from 'material-ui/lib/svg-icons/action/alarm-add'
import ForwardIcon from "material-ui/lib/svg-icons/navigation/arrow-forward"
import {Family as dbFamily, Reward as dbReward, Goal as dbGoal} from '../db'

export default class Rewards extends React.Component{
	static defaultProps={
		height:20,
		goals:[{total:5, reward:"hug"},{total:10, reward:"pencil"}, {total:20, reward:"pencil sharpener"}],
		rewards:[{amount:1, reason:"smile"}, {amount:5, reason:"reading"}, {amount:10,reason:"english speaking"}]
	}
	static propTypes={
		child:React.PropTypes.object,
		goals:React.PropTypes.array,
		rewards:React.PropTypes.array
	}
	
	render(){
		let {goals, rewards,height}=this.props
		let total=0, max=0
		goals=goals.map(a=><AGoal
					key={`goal_${a.total}`}
					height={height}
					reward={a.reward} 
					total={max=Math.max(max,a.total), a.total}/>)
		
		rewards=rewards.map(a=><AReward 
					key={`reward_${total+=a.amount}`}
					onReasonChange={newReason=>this.onReasonChange(a,newReason)}
					height={height}
					reason={a.reason} 
					amount={a.amount} 
					total={total}/>)
		
		max=Math.max(total,max)
		
		return (
			<div className="rewards" style={{height:max*20+40}}>
				{goals}
					
				{rewards}
			</div>
		)
	}
	
	onReasonChange(reward, newReason){
		reward.reason=newReason
		dbReward.upsert(reward)
	}
}

class Item extends React.Component{
	static defaultProps={
		height:20
	}
}

class AGoal extends Item{
	render(){
		let {reward,total,height}=this.props
		return (
			<div className="goal" style={{bottom:height*total}}>
				<div>{reward}</div>
				<div className="icon">&bull;</div>
				<div>{total}</div>
			</div>
		)
	}
}

class AReward extends Item{
	constructor(){
		super(...arguments)
		this.state={}
	}
	render(){
		let {reason="...",amount,total,height}=this.props
		let {editing=false, editingReason=reason}=this.state

		if(editing)
			reason=(<input ref="reason" value={editingReason}
				onBlur={e=>(e.target.value!=reason && this.reasonChanged(e.target.value))}
				onChange={e=>this.setState({editingReason:e.target.value})}/>)	
		
		return (
			<div className="reward" style={{bottom:height*total}}>
				<div className="icon">&bull;</div>
				<div className="reason" onClick={e=>this.setState({editing:true})}>
				{reason}
				</div>
				<div>+{amount}/{total}</div>
			</div>
			)
	}
	
	reasonChanged(editingReason){
		let {onReasonChange}=this.props
		this.setState({editing:undefined})
		onReasonChange && onReasonChange(editingReason)
	}
}


import RewardIcon from 'material-ui/lib/svg-icons/social/mood'
class Rewardor extends React.Component{
	static propTypes={
		current:React.PropTypes.number,
		onChange: React.PropTypes.func
	}

	static defaultProps={
		current:0,
		onChange: function(delta){}
	}

	constructor(props){
		super(props)
		this.state={current:this.props.current}
	}

	render(){
		let {current}=this.state
		return (
			<div className="rewards_reward">
				{ current }
				<IconButton onClick={()=>this.reward()}>
					<RewardIcon />
				</IconButton>
			</div>
		)
	}

	reward(){
		let {current}=this.state
		current++
		this.setState({current})
		this.props.onChange(1)
	}
}
