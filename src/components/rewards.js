import {React, UI} from "qili-app"
import ReactDOM from "react-dom"
import {TextField, IconButton, Avatar} from 'material-ui'
import PlusIcon from 'material-ui/svg-icons/action/alarm-add'
import ForwardIcon from "material-ui/svg-icons/navigation/arrow-forward"
import {Family as dbFamily, Reward as dbReward, Goal as dbGoal} from '../db'

export default class Rewards extends React.Component{
	static defaultProps={
		editable:false,
		height:20,
		minY:0,
		maxY:window.innerHeight
	}
	static propTypes={
		editable:React.PropTypes.bool,
		height:React.PropTypes.number,
		maxY:React.PropTypes.number,
		minY:React.PropTypes.number
	}

	static contextTypes={
		child: React.PropTypes.object
	}

	constructor(){
		super(...arguments)
		this.state={
			goals:null,
			rewards:null
		}
		this.onChange=this.onChange.bind(this)
		this.onScroll=this.onScroll.bind(this)
	}

	onChange(condition){
		condition={child:condition.child}

		Promise.all([
			new Promise((resolve,reject)=>dbReward.find(condition).fetch(resolve,reject)),
			new Promise((resolve,reject)=>dbGoal.find(condition).fetch(resolve,reject))
		]).then(a=>{
			let [rewards, goals]=a
			this.setState({rewards,goals})
		})
	}

	onScroll(e){
		if(this._scrollTimer)
			clearTimeout(this._scrollTimer)
		this._scrollTimer=setTimeout(e=>{
			var {top,height}=ReactDOM.findDOMNode(this).getBoundingClientRect()
			,bottom=top+height
			,{minY,maxY,editable}=this.props
			,{pendingGoal, rewardor}=this.refs

			if(pendingGoal){
				let classes=ReactDOM.findDOMNode(pendingGoal).classList
				let act=top<=minY ? "add" : "remove";
				"sticky top left".split(" ").forEach(a=>classes[act](a))
			}

			if(rewardor){
				let classes=ReactDOM.findDOMNode(rewardor).classList
				let act=(top>maxY || bottom<minY) ? "add" : "remove"
				classes[act]("hide")
			}
		},300)
	}

	componentDidMount(){
		dbReward.on("upserted", this.onChange)
		dbGoal.on("upserted", this.onChange)
		window.addEventListener("scroll",this.onScroll)
		this.onChange({child:this.context.child._id})
	}

	componentWillUnmount(){
		dbReward.removeListener("upserted", this.onChange)
		dbGoal.removeListener("upserted", this.onChange)
		window.removeEventListener("scroll",this.onScroll)
	}


	componentWillReceiveProps(nextProps, nextContext){
		if(this.context.child!=nextContext.child)
			this.onChange({child:nextContext.child._id})
	}

	componentDidUpdate(){
		if(this.refs.pendingGoal)
			this.refs.pendingGoal.setState({reward:"",total:""})
	}

	render(){
		let {goals, rewards, outView, outTop}=this.state
		let {height,editable, style={}}=this.props
		let total=0, max=0, action=null, buf=7
		goals=goals && goals.map(a=><AGoal
					key={`goal_${a.total}`}
					height={height}
					reward={a.reward}
					total={max=Math.max(max,a.total), a.total}/>)

		rewards=rewards && rewards.map(a=><AReward
					key={`reward_${total+=a.amount}`}
					onReasonChange={newReason=>this.onReasonChange(a,newReason)}
					height={height}
					reason={a.reason}
					amount={a.amount}
					total={total}/>)

		max=Math.max(total,max)

		if(editable){
			action=(<PendingGoal ref="pendingGoal" bottom={(max+buf)*height} current={total} height={height} onPendGoal={goal=>this.pendGoal(goal)}/>)
		}else if(!outView){
			action=(<Rewardor ref="rewardor" current={total} height={height} onReward={amount=>this.reward(amount)}/>)
		}

		style.height=(max+buf)*height
		return (
			<div className="rewards page" style={style}>
				<svg className="arrow" width="100%" height="100%" viewBox="0 0 10 10">
					<path d="M0,10 L5,0 L10,10" stroke-width="0.2"/>
				</svg>
				{goals}

				{rewards}

				{action}
			</div>
		)
	}

	pendGoal(goal){
		goal.child=this.context.child._id
		dbGoal.upsert(goal)
	}

	reward(amount){
		let newReward={amount, child:this.context.child._id}
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

	render(){
		let {current, bottom}=this.props
		let {reward, total}=this.state
		return (
			<div className="goal pending" style={{bottom}}>
				<div>
					<input onBlur={e=>this.tryPend({reward:e.target.value})}
						value={reward||""}
						onChange={e=>this.setState({reward:e.target.value})}
						className="pendingReward"
						placeholder="New Reward..."
						style={{textAlign:"right",width:"100%"}}/>
				</div>
				<div className="icon">&raquo;</div>
				<div>
					<input onBlur={e=>this.tryPend({total:e.target.value})}
						type="number"
						value={total||""}
						onChange={e=>this.setState({total:e.target.value})}
						placeholder={`Goal:>${current}`}
						style={{width:"6em"}}/>
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
				ReactDOM.findDOMNode(this.refs.goal).focus()
			}
		}
		this.setState({reward,total})
	}
}

class AGoal extends Item{
	render(){
		let {reward,total,height}=this.props
		let style={fontSize:"x-small", whiteSpace:"nowrap",backgroundColor:"lightgreen"}
		return (
			<div className="goal" style={{bottom:height*total}}>
				<div><Avatar style={style}>{reward}</Avatar></div>
				<div className="icon">&bull;</div>
				<div>{total}</div>
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
		let {reason}=this.refs
		reason && reason.focus()
	}

	render(){
		let {reason,amount,total,height}=this.props
		let {newReason}=this.state

		if(newReason){
			reason=(<TextField ref="reason" defaultValue={newReason}
				onEnterKeyDown={e=>e.target.blur()}
				onBlur={e=>this.reasonChanged(e.target.value.trim())}/>)
		}

		return (
			<div className="reward" style={{bottom:height*total}}>
				<div className="icon">&bull;</div>
				<div className="reason" onClick={e=>this.setState({newReason:reason||" "})}>
				{reason||"..."}
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


import RewardIcon from 'material-ui/svg-icons/social/mood'
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
				<div className="reason">
					<RewardIcon className="rewarder" onClick={e=>this.plus()} />
					<span>{current}</span>
					<span className={`plus ${plus ? "plusing" : ""}`}>+{plus||'x'}</span>
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
