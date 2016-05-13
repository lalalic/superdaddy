import {Model,User} from "qili-app"
import {Family, Goal} from "."

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
		return Promise.resolve(rewards)
		return new Promise((resolve,reject)=>this.find({child:child._id}).fetch(resolve,reject))
	}
	
	static getGoals(child){
		return Promise.resolve(goals)
		return new Promise((resolve,reject)=>Goal.find({child:child._id}).fetch(resolve,reject))
		
	}
}
