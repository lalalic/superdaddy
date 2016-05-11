import {React, UI} from "qili-app"
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
		goals:React.PropTypes.array,
		rewards:React.PropTypes.array
	}
	
	componentWillReceiveProps(){
		this.forceUpdate()
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
				
				<Rewardor current={total} height={height} onReward={amount=>this.reward(amount)}/>
				
				<PendingGoal current={total} height={height} onPendGoal={goal=>this.pendGoal(goal)}/>
			</div>
		)
	}
	
	pendGoal(goal){
		dbReward.addGoal(goal)
	}
	
	reward(amount){
		let newReward={amount}
		dbReward.upsert(newReward)
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

class PendingGoal extends Item{
	static defaultProps={
		onPendGoal:a=>1
	}
	constructor(){
		super(...arguments)
		this.state={
			reward:"",
			total:""
		}
	}
	
	componentWillReceiveProps(){
		
	}
	
	render(){
		let {current}=this.props
		let {reward, total}=this.state
		return (
			<div className="goal pending">
				<div>
					<input onBlur={e=>this.tryPend({reward:e.target.value})}
						ref="reward"
						defaultValue={reward}
						className="pendingReward" 
						placeholder="New Reward..." 
						style={{textAlign:"right"}}/>
				</div>
				<div className="icon">&raquo;</div>
				<div>
					<input onBlur={e=>this.tryPend({total:e.target.value})} 
						ref="goal" 
						defaultValue={total||""}
						placeholder={`Goal:>${current}`}
						style={{width:"2.5em"}}/>
				</div>
			</div>
		)
	}
	
	tryPend(state){
		let {reward:newReward, total:newTotal}=state
		let {current,onPendGoal}=this.props
		let {reward, total}=this.state
		if(newReward)
			reward=newReward
		if(newTotal)
			total=newTotal
		if(reward.trim() && total.trim()){
			total=parseInt(total.trim())
			if(total>current){
				reward=reward.trim()
				onPendGoal({reward,total})
				return
			}else{
				UI.Messager.show(`new goal must greater than current total ${current}`)
				this.refs.goal.getDOMNode().focus()
			}
		}
		this.setState({reward,total})
	}
}

class AGoal extends Item{
	render(){
		let {reward,total,height}=this.props
		return (
			<div className="goal" style={{bottom:height*total}}>
				<div>{reward}</div>
				<div className="icon">&bull;</div>
				<div></div>
			</div>
		)
	}
}

class AReward extends Item{
	constructor(){
		super(...arguments)
		this.state={newReason:null}
	}
	
	componentWillReceiveProps(){
		this.setState({newReason:null})
	}
	
	componentDidUpdate(){
		let {newReason}=this.state
		let {reason}=this.refs
		if(newReason && reason)
			reason.getDOMNode().focus()
	}
	
	render(){
		let {reason,amount,total,height}=this.props
		let {newReason}=this.state

		if(newReason){
			reason=(<TextField ref="reason" defaultValue={reason}
				onEnterKeyDown={e=>e.target.blur()}
				onBlur={e=>this.reasonChanged(e.target.value.trim())}/>)	
		}
		
		return (
			<div className="reward" style={{bottom:height*total}}>
				<div className="icon">&bull;</div>
				<div className="reason" onClick={e=>this.setState({newReason:reason||" "})}>
				{newReason||reason||"..."}
				</div>
				<div>+{amount}/{total}</div>
			</div>
			)
	}
	
	reasonChanged(newReason){
		let {reason, onReasonChange}=this.props
		if(!newReason || newReason==reason){
			this.setState({newReason:undefined})
			return;
		}
		
		onReasonChange && onReasonChange(newReason)
	}
}


import RewardIcon from 'material-ui/lib/svg-icons/social/mood'
class Rewardor extends Item{
	static propTypes={
		current:React.PropTypes.number,
		onReward: React.PropTypes.func
	}

	static defaultProps={
		current:0,
		onReward: a=>1
	}

	constructor(){
		super(...arguments)
		this.state={plus:0,ticker:null}
	}
	
	componentWillReceiveProps(){
		this.setState({plus:0,ticker:null})
	}

	render(){
		let {plus}=this.state
		let {height,current}=this.props
		return (
			<div className="reward pending">
				<div className="icon"></div>
				<div className="reason">
					<RewardIcon style={{width:50,height:50}} color={"green"} onClick={e=>this.plus()} />
					<span>{current}</span>
					<span style={{fontSize:"10pt"}}>+{plus||'x'}</span>
				</div>
				
			</div>
		)
	}
	
	plus(){
		let {plus,ticker}=this.state
		ticker && clearTimeout(ticker)
		plus++
		ticker=setTimeout(this.reward.bind(this),1000)
		this.setState({plus,ticker})
	}

	reward(){
		let {plus,ticker}=this.state
		ticker && clearTimeout(ticker)
		this.props.onReward(plus)
	}
}
