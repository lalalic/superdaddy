var {Model}=require('dashboard'),
    Promise=require('apromise');

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static todayTasks(){
        var p=new Promise()
        this.find().fetch(p.resolve.bind(p),p.reject.bind(p))
        return p
    }

    static approvings(){
        return this.todayTasks()
    }

    static plan(knowledge, dates){
        
    }

}
