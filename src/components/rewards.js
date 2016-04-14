import {React} from "qili-app"
import {TextField} from 'material-ui'

var REG_RULE=/[\/-]/

export default class Rewards extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
		let modeUI
		let rewardsFromRules=this._getResolvedRules()
		let [total,rewarded]=this._getRewardedDetail()
		
		switch(this.props.mode){
		case "edit": 
			modeUI=this._renderEdit()	
		break
		case "view": 
			modeUI=this._renderView()	
		break
		case "reward": 
			modeUI=this._renderReward()	
		break
		}
		
        return (
            <div>
				<ul ref="rewarded">
					{
						function(a){
							rewarded.forEach((detail,k)=>
								a.push(<li>{k} -> {`${detail.count} for ${detail.comment} at ${detail.createdAt}`}</li>)
							)
							return a
						}([])
					}
				</ul>
                <ul ref="rules">
					{
						function(a){
							rewardsFromRules.forEach((details,k)=>
								a.push(<li>{k} -> {details.join(",")}</li>)
							)
							return a
						}([])
					}
				</ul>
				{ total && (<div className="rewards_total">total:${total}</div>)}
				
				{modeUI}
            </div>
        )
    }
	
	_getResolvedRules(){
		var rewards=new Map()
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
					}
				break
				}
			})
		})
		return rewards
	}

	_renderEdit(){
		return (
			<div>
				<input placeholder="1, or 1-5 for a range, or 10-20/2, every 2 from 10 to 20"/>
				<input placeholder="reward:a chocolate or a set of lego ..."/>
			</div>
		)
	}
	
	_renderReward(){
		return (
			<div>
				click here to add 1 point
			</div>
		)
	}
	
	_renderView(){
		return null
	}
	
	_getRewardedDetail(){
		var details=new Map(), sum=0
		this.props.rewardDetail.forEach(a=>{
			sum+=a.count
			details.set(sum,a)
		})
		return [sum,details]
	}
}

Rewards.defaultProps={
    rules:[],
	rewardDetail:[],
	mode:"reward"
}

Rewards.propTypes={
	rules: React.PropTypes.array,
	rewardDetail: React.PropTypes.array,
	total:React.PropTypes.num,
	mode: React.PropTypes.oneOf("edit","reward","view")
}
