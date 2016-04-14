import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root, clearCurrentUser} from "qili-app/spec/db/helper"
import DateUtils from "material-ui/lib/utils/date-time"
import App from "qili-app/lib/db/app"
import User from "qili-app/lib/db/user"
import TaskDB from "../../lib/db/task"
import FamilyDB from "../../lib/db/family"

describe("TaskDB", function(){
    function cloneAsDate(d) {
      let clonedDate = new Date(d.getTime());
      clonedDate.setHours(0,0,0,0);
      return clonedDate;
    }
    let knowledge={_id:`knowledge_${uuid()}`,title:"test",keywords:"test",category:"test",summary:"test"}

    beforeEach(done=>{
        initWithUser(`app${uuid()}`,done)
    })
	
	afterEach(clearCurrentUser)

    describe("planing", function(){
        it("can plan for tomorrow, a future date", function(done){
            spyOnXHR({_id:`${uuid()}`,createdAt:new Date()})
            let when=DateUtils.addDays(new Date(),1)
            TaskDB.plan(knowledge,when).then(function(tasks){
                expect(tasks.length).toBe(1)
                expect(tasks[0].scheduledAt.getTime()).toBe(cloneAsDate(when).getTime())
                ajaxHaveBeenCalled()
                done()
            }).catch(failx(done))
        })

        it("can not plan for yesterday, a past date, ignore without error", function(done){
            spyOnXHR({_id:`${uuid()}`,createdAt:new Date()})
            let when=DateUtils.addDays(new Date(),-1)
            TaskDB.plan(knowledge,when).then(function(tasks){
                expect(tasks.length).toBe(0)
                done()
            }).catch(failx(done))
        })

        it("can plan for dates", function(done){
            spyOnXHR({_id:`${uuid()}`,createdAt:new Date()})
            let day1=DateUtils.addDays(new Date(),1),
                day2=DateUtils.addDays(day1,1),
                day3=DateUtils.addDays(day1,-2)
            TaskDB.plan(knowledge,[day1,day2,day3]).then(function(tasks){
                expect(tasks.length).toBe(2)
                expect(tasks[0].scheduledAt.getTime()).toBe(cloneAsDate(day1).getTime())
                expect(tasks[1].scheduledAt.getTime()).toBe(cloneAsDate(day2).getTime())
                ajaxHaveBeenCalled(2)
                done()
            }).catch(failx(done))
        })

        it("can start from a knowledge directly", function(done){
            spyOnXHR({_id:`${uuid()}`, createdAt:new Date()})
            TaskDB.startNow(knowledge).then(function(task){
                expect(task.status).toBe("started")
                expect(task._id).toBeDefined()
                done()
            }).catch(failx(done))
        })
    })

    describe("query", function(){
        it("can get approvings which tasks have already finished with according 'finished' status", function(){
            spyOn(TaskDB,"find")
            let today=new Date()
            TaskDB.approvings()
            expect(TaskDB.find).toHaveBeenCalledWith({status:"finished"})
        })

        it("can get tasks by date without time", function(){
            spyOn(TaskDB,"find")
            let today=new Date()
            TaskDB.byDate(today)
            expect(TaskDB.find).toHaveBeenCalledWith({scheduledAt:cloneAsDate(today)})
        })
    })

    describe("resolving", function(){
        it("can start a task, with status 'started' and startedAt", function(done){
            let task={_id:`${uuid()}`, title:`${uuid()}task`}
            spyOnXHR({updatedAt:new Date()})
            TaskDB.start(task).then(task=>{
                expect(task.status).toBe("started")
                expect(task.startedAt).toBeDefined()
                done()
            }).catch(failx(done))
        })

        it("can finish a  started task", function(done){
            let task={_id:`${uuid()}`, title:`${uuid()}task`, startedAt: DateUtils.addDays(new Date(),-2), status:"started"}
            spyOnXHR({updatedAt:new Date()})
            TaskDB.finish(task).then(task=>{
                expect(task.status).toBe("finished")
                expect(task.finishedAt).toBeDefined()
                done()
            }).catch(failx(done))
        })

        it("can approve a finished task by a relative", function(done){
            let task={_id:`${uuid()}`, title:`${uuid()}task`,
                startedAt: DateUtils.addDays(new Date(),-2),
                finishedAt: DateUtils.addDays(new Date(),-1),
                status:"finished"}
            spyOn(FamilyDB,"relationship").and.returnValue("naonao")
            spyOnXHR({updatedAt:new Date()})
            TaskDB.approve(task).then(task=>{
                expect(task.status).toBe("approved")
                expect(task.approvedAt).toBeDefined()
                expect(task.approvedAuthor).toBeDefined()
                done()
            }).catch(failx(done))
        })

        describe("exceptions", function(){
            it("can not start a task with status", function(done){
                let task={_id:`${uuid()}`, title:`${uuid()}task`,status:"started"}
                spyOnXHR({updatedAt:new Date()})
                TaskDB.start(task).then(failx(done)).catch(done)
            })

            it("can not finish a task without status 'started'", function(done){
                let task={_id:`${uuid()}`, title:`${uuid()}task`,status:"approving"}
                spyOnXHR({updatedAt:new Date()})
                TaskDB.finish(task).then(failx(done)).catch(done)
            })

            it("can not approve task by anybody other than relatives", function(done){
                let task={_id:`${uuid()}`, title:`${uuid()}task`, status:"finished"}
                spyOnXHR({updatedAt:new Date()})
                spyOn(FamilyDB,"relationship").and.returnValue(null)
                TaskDB.approve(task).then(failx(done)).catch(done)
            })
        })


    })
})
