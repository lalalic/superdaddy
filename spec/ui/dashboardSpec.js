import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root, clearCurrentUser} from "qili-app/spec/db/helper"
import List, {Item} from "qili-app/lib/components/list"
import App from "qili-app/lib/db/app"
import MyUI, {AuthorDashboard, BabyDashboard} from "../../lib/dashboard"

xdescribe("dashboard", function(){
	let appId=`testModel${uuid()}`
	beforeEach(clearCurrentUser)
	beforeAll(done=>{
		var existingApps=[{_id:"1",name:"test"},{_id:"2",name:"man"}]
		spyOnXHR({results:existingApps})
		
		initWithUser(appId,()=>{
			debugger
			App.init().catch(failx(done))
				.then(()=>{
					ajaxHaveBeenCalled()
					expect(App.all).toBeDefined()
					expect(App.all.length).toBe(existingApps.length)
					expect(App.current).toBeDefined()
					expect(App.current.name).toBe(existingApps[0].name)
					done()
				})
		})
	})
		
    it("can be instaniated without setting", function(){
        let props={}
            ,context={}
            ,ui=render(MyUI,props,context)
    })

    describe("for Author", function(){
        it("can create for author without baby", function(){
            let props={}
                ,context={}
                ,ui=render(MyUI,props,context)
                ,dashboard=TestUtils.scryRenderedComponentsWithType(ui,AuthorDashboard)
            expect(dashboard.length).toBe(1)
        })

        it("can list knowledges author created")

        it("can add new knowledge")

        describe("supported actions", actions)
    })

    describe("for parents", function(){
        it("can create for parents with baby", function(){
            let props={child:{_id:`${uuid()}`, name:`baobao`}, params:{}}
                ,context={}
                ,ui=render(MyUI,props,context)
                ,dashboard=TestUtils.scryRenderedComponentsWithType(ui,BabyDashboard)
            expect(dashboard.length).toBe(1)
        })

        it("can list tasks of author's children")

        describe("supported actions", actions)
    })

    function actions(){
        describe("family command", function(){
            it("can trigger new baby")

            it("can invite relatives")

            it("can trigger current baby information")
        })

        it("can trigger knowledges ui")

        it("can trigger account ui")
    }
})
