import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "qili-app/spec/db/helper"
import DateUtils from "material-ui/lib/utils/date-time"
import App from "qili-app/lib/db/app"
import User from "qili-app/lib/db/user"
import TaskDB from "../../lib/db/task"

describe("TaskDB", function(){
    let knowledge={_id:`knowledge_${uuid()}`,title:"test",keywords:"test",category:"test",summary:"test"}
    beforeAll(done=>{
        initWithUser(`app${uuid()}`,done)
    })

    describe("planing", function(){
        it("can plan for tomorrow, a future date", function(done){
            spyOnXHR({_id:`${uuid()}`,createdAt:new Date()})
            let when=DateUtils.addDays(new Date(),1)
            TaskDB.plan(knowledge,when).then(function(tasks){
                expect(tasks.length).toBe(1)
                expect(tasks[0].when).toBe(when)
                ajaxHaveBeenCalled()
                done()
            }).catch(failx(done))
        })

        it("can not plan for yesterday, a past date", function(){
            //@Todo: not implemented
        })

        it("can plan for future dates", function(done){
            spyOnXHR({_id:`${uuid()}`,createdAt:new Date()})
            let day1=DateUtils.addDays(new Date(),1),
                day2=DateUtils.addDays(day1,1)
            TaskDB.plan(knowledge,[day1,day2]).then(function(tasks){
                expect(tasks.length).toBe(2)
                expect(tasks[0].when).toBe(day1)
                expect(tasks[1].when).toBe(day2)
                ajaxHaveBeenCalled(2)
                done()
            }).catch(failx(done))
        })
    })

    describe("query", function(){
        it("can get approvings", function(){
            //@Todo
        })

        fit("can get tasks by date", function(){
            spyOn(TaskDB,"find")
            let today=new Date()
            TaskDB.byDate(today)
            //expect(TaskDB.find).toBeCalledWith({when:today})
        })
    })

    describe("resolving", function(){
        it("can start a task", function(){

        })

        it("can finish a task", function(){

        })
    })
})
