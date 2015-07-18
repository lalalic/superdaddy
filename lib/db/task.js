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
        return Promise.as()
    }

    static start(task){
        task.started=new Date()
        return Promise.as()
    }

    static finish(task){
        task.finished=new Date()
        return Promise.as()
    }

    static byDate(){
        return this.find()
    }
}
