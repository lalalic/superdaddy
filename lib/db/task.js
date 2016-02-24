var {Model,User}=require('qili-app');

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static approvings(){
        return this.find({appproving:true})
    }

    static plan(knowledge, dates){
        let {title,keywords,category,summary}=knowledge
            ,a={title,keywords,category,summary}
        if(!Array.isArray(dates))
            dates=[dates]
        return Promise.all(dates.map(function(date){
            return this.upsert({knowledge:a,when:date})
        }.bind(this)))
    }

    static start(task){
        task.started=new Date()
        task.startedAuthor=User.currentAsAuthor
        return this.upsert(task)
    }

    static finish(task){
        task.finished=new Date()
        task.finishedAuthor=User.currentAsAuthor
        task.approving=true
        return this.upsert(task)
    }

    static approve(task){
        task.approved=true
        delete task.approving
        return this.upsert(task)
    }

    static byDate(date){
        return this.find({when:date})
    }
}
