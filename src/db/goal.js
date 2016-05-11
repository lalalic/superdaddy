import {Model} from "qili-app"
import {Family} from "."

var REG_RULE=/[\/-]/
export default class Motivation extends Model{
    static get _name(){
        return "goal"
    }
	
	static get all(){
		return this.find({child:Family.currentChild._id})
	}

    static addRule(rule){
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
    }
}
