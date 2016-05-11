import {Model,User} from "qili-app"
import {Family} from "."

var rewards=[{amount:1, reason:"smile"}, {amount:5, reason:"reading"}, {amount:10,reason:"english speaking"}]
var goals=[{total:5, reward:"hug"},{total:10, reward:"pencil"}, {total:20, reward:"pencil sharpener"}]
export default class Reward extends Model{
    static get _name(){return "reward"}
	
	static upsert(reward){
		if(reward.reason){
			
		}else{
			rewards.push(reward)
		}
		
		this.emit("change")
	}
	
	static addGoal(goal){
		goals.push(goal)
		this.emit("change")
	}
	
	static getRewards(child){
		return rewards
	}
	
	static getGoals(child){
		return goals
	}
}
