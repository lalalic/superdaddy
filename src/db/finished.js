import {Model,User} from 'qili-app'

export default class Finished extends Model{
	static get _name(){
		return 'finished_task'
	}
}
