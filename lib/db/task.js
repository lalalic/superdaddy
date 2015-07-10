var {Model}=require('dashboard'),
    Promise=require('apromise');

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static approvings(){
        return this.find()
    }

    static plan(knowledge, dates){
        
    }

    static start(task){
        return new Promise()
    }

    static finish(task){
        return new Promise()
    }

    static byDate(){
        return this.find()
    }
}
