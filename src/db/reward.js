import {Model,User} from "qili-app"
import {Family} from "."

export default class Reward extends Model{
    static get _name(){return "reward"}

	static get all(){
		return this.find({child:Family.currentChild._id})
	}
}
