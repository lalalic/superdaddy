import {React} from "qili-app"
import {TextField, IconButton} from 'material-ui'
import RewardIcon from 'material-ui/lib/svg-icons/social/mood'
import Timeline from './timeline'

var REG_RULE=/[\/-]/

export default class Rewards extends React.Component{
	static defaultProps={
		rules:[{//you can get ${reward} when get ${target} stars
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
		}],
		rewardDetail:[],
		editable:false
	}

	static propTypes={
		rules: React.PropTypes.array,
		rewardDetail: React.PropTypes.array,
		onRule: React.PropTypes.func,
		onReward: React.PropTypes.func,
		editable: React.PropTypes.bool
	}

    render(){
		let {editable}=this.props
		let [rewardsFromRules,min1,max1]=this._getResolvedRules()
		let [total,rewarded,min2,max2]=this._getRewardedDetail()
		let min=Math.min(min1,min2), max=Math.max(max1,max2)
		let height=20*max+20

		let editor= editable ? this._renderEditor() : null

        return (
            <div>
				<div className="rewards_reward">
					{ total }
					<IconButton>
						<RewardIcon />
					</IconButton>
				</div>

				<div className="rewards_detail grid" style={{height}}>
					<ul ref="rewarded" className="rewarded" style={{height}}>
						{
							function(a){
								let sum=0
								rewarded.forEach((detail,k)=>
									a.push(<li style={{top:(sum+=detail.count)*20}} key={k}>{k} ->{`${detail.count} for ${detail.comment} at ${detail.createdAt}`}</li>)
								)
								return a
							}([])
						}
					</ul>
					<ul ref="rules" className="rules">
						{
							function(a){
								rewardsFromRules.forEach((details,k)=>
									a.push(<li style={{top:k*20}}>{k} -> {details.join(",")}</li>)
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

	_getResolvedRules(){
		var rewards=new Map(), min=0, max=0
		this.props.rules.forEach(rule=>{
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
						min=Math.min(start,min)
						max=Math.max(start,max)
					}
				break
				}
			})
		})
		return [rewards,min,max]
	}

	_renderEditor(){
		return (
			<div className="rewards_editor">
				<input placeholder="1, or 1-5 for a range, or 10-20/2, every 2 from 10 to 20"/>
				<input placeholder="reward:a chocolate or a set of lego ..."/>
			</div>
		)
	}

	_getRewardedDetail(){
		var details=new Map(), sum=0, min=0
		this.props.rewardDetail.forEach(a=>{
			if(min==0)
				min=a.count;

			sum+=a.count
			details.set(sum,a)
		})
		return [sum,details, min, sum]
	}
}
