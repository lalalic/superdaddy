import {Model,User} from 'qili-app';
import FamilyDB from './family';

function cloneAsDate(d) {
  let clonedDate = new Date(d.getTime());
  clonedDate.setHours(0,0,0,0);
  return clonedDate;
}

export default class Task extends Model{
    static get _name(){
        return 'task'
    }

    static approvings(){
        return this.find({status:"finished"})
    }

    static plan(knowledge, dates){
        let {title,keywords,category,summary}=knowledge
            ,a={title,keywords,category,summary}
            ,today=cloneAsDate(new Date())
        if(!Array.isArray(dates))
            dates=[dates]
        return Promise.all(dates.map(function(date){
            let scheduledAt=cloneAsDate(date)
            if(scheduledAt<today)
                return null;//ignore
            return this.upsert({knowledge:a,scheduledAt, status:"scheduled"})
        }.bind(this))).then(tasks=>tasks.filter(a=>a))
    }

    static startNow(knowledge){
        let {title,keywords,category,summary}=knowledge
            ,a={title,keywords,category,summary}
            ,today=cloneAsDate(new Date())
            ,task={knowledge:a, scheduledAt:today,
                startedAt:new Date(),
                startedAuthor:User.currentAsAuthor,
                status:"started"
            }
        return this.upsert(task)
    }

    static start(task){
        if(task.status)
            return Promise.reject(new Error("status is not right"))
        task.startedAt=new Date()
        task.startedAuthor=User.currentAsAuthor
        task.status="started"
        return this.upsert(task)
    }

    static finish(task){
        if(task.status!="started")
            return Promise.reject(new Error("status is not right"))
        task.finishedAt=new Date()
        task.finishedAuthor=User.currentAsAuthor
        task.status="finished"
        return this.upsert(task)
    }

    static approve(task){
        if(task.status!="finished")
            return Promise.reject(new Error("status is not right"))

        if(!FamilyDB.relationship())
            return Promise.reject(new Error("only relatives can approve your task"))

        task.approvedAt=new Date()
        task.approvedAuthor=User.currentAsAuthor
        task.status="approved"
        return this.upsert(task)
    }

    static byDate(date){
        return this.find({scheduledAt:cloneAsDate(date)})
    }
}
