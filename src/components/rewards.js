import {React} from "qili-app"
import {TextField, IconButton} from 'material-ui'
import PlusIcon from 'material-ui/lib/svg-icons/action/alarm-add'
import ForwardIcon from "material-ui/lib/svg-icons/navigation/arrow-forward"
import {Family as dbFamily} from '../db'

var REG_RULE=/[\/-]/

export default class Rewards extends React.Component{
	static defaultProps={
		editable:false
	}

	static propTypes={
		child: React.PropTypes.object,
		editable: React.PropTypes.bool
	}

	constructor(props){
		super(props)

		this.state={
			rewards:new Map(),
			rewarded:new Map(),
			max:0,
			min:0,
			total:0
		}

	}

	componentWillMount(){
		this._resolveRules(this.props.child)
		this._resolveRewarded(this.props.child)
	}

	componentWillReceiveProps(nextProps){
		let {child:newChild}=nextProps
		let {child}=this.props
		if(child!=newChild){
			this.state.rewards.clear()
			this.state.rewarded.clear()
			this._resolveRules(newChild)
			this._resolveRewarded(newChild)
		}
	}

	render(){
		let {editable}=this.props
		let {rewards, rewarded, max, total}=this.state
		let height=20*Math.max(max,total)+20

		let editor= editable ? this._renderEditor() : null

        return (
            <div>

				<Rewardor current={total} onChange={n=>this._reward(n)}/>

				<div className="rewards_detail grid" style={{height}}>
					<ul ref="rewarded" className="rewarded" style={{height}}>
						<li style={{top:total*20}}/>
						{/*
							function(a){
								let sum=0
								rewarded.forEach((detail,k)=>
									a.push(<li style={{top:(sum+=detail.count)*20}} key={k}></li>)
								)
								return a
							}([])
						*/}
					</ul>
					<ul ref="rules" className="rules">
						{
							function(a){
								rewards.forEach((details,k)=>
									a.push(<li style={{top:k*20}} key={-k}><span>{k}</span>--><span>{details.join(",")}</span></li>)
								)
								return a
							}([])
						}
					</ul>
				</div>

				{editor}

            </div>
        )
    }



	_insert(){
		let {target, reward}=this.refs, rule
		target=target.getDOMNode().value.trim()
		reward=reward.getDOMNode().value.trim()
		if(target.length && reward.length){
			this._resolveRule(rule={target, reward})
			this.forceUpdate()
			let {child}=this.props
			child.rewardDetail.push(rule)
			if(child._id)
	            dbFamily.upsert(child)
		}
	}

	_reward(count){
		let {rewarded, total}=this.state
		let reward={count,comment:"", createdAt:new Date()}
		rewarded.set(total+=count, reward)
		this.setState({total})
		let {child}=this.props
		child.rewardRules.push(reward)
		if(child._id)
			dbFamily.upsert(child)
	}

	_resolveRules(child){
		let {rewardRules:rules=[{//you can get ${reward} when get ${target} stars
			target: "1-10",//5 | 5-10[/1] | 10-20/5 | ,,,
			reward: "hug"
		},{
			target: "10-100/10",
			reward: "kiss"
		},{
			target: "50",
			reward: "pen box"
		},{
			target: "100",
			reward: "Barbie doy"
		}]}=child
		rules.forEach(rule=>this._resolveRule(rule))
		child.rewardRules=rules
	}


	_resolveRule(rule){
		let {rewards,min,max}=this.state
		let {target, reward}=rule
		target.split(",").forEach(seg=>{
			let els=seg.split(REG_RULE), temp
			switch(els.length){
			case 1://5
				let n=parseInt(els[0].trim())
				temp=rewards.get(n)||[]
				temp.push(reward)
				rewards.set(n,temp)
				min=Math.min(min,n)
				max=Math.max(max,n)
			break
			case 2://5-10, step=1
			case 3:// 10-20/5, every 5 from 10 to 20
				let [a,b,step="1"]=els,
					ia=parseInt(a.trim()),
					ib=parseInt(b.trim()),
					start=Math.min(ia,ib),
					end=Math.max(ia,ib)
				step=parseInt(step.trim())
				for(;start<end+1;start+=step){
					temp=rewards.get(start)||[]
					temp.push(reward)
					rewards.set(start,temp)
					min=Math.min(min,start)
					max=Math.max(max,start)
				}
			break
			}
		})
		this.setState({min,max})
	}


	_resolveRewarded(child){
		let {rewarded:details,min, total}=this.state
		let {rewardDetail=[]}=child
		rewardDetail.forEach(a=>{
			if(min==0)
				min=a.count;

			total+=a.count
			details.set(total,a)
		})
		this.setState({total, min})
		child.rewardDetail=rewardDetail
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
