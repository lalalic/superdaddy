var {Model}=require('dashboard');

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static approvings(){
        return this.find()
    }

    static plan(knowledge, dates){
        return Promise.resolve()
    }

    static start(task){
        task.started=new Date()
        return Promise.resolve()
    }

    static finish(task){
        task.finished=new Date()
        return Promise.resolve()
    }

    static byDate(){
        return this.find()
    }
}
