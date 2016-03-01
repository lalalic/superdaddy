import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root} from "qili-app/spec/db/helper"
import List, {Item} from "qili-app/lib/components/list"
import MyUI, {AuthorDashboard, BabyDashboard} from "../../lib/dashboard"



describe("dashboard", function(){
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

        it("can list knowledges author created", function(){

        })

        it("can add new knowledge", function(){

        })

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

        it("can list tasks of author's children", function(){

        })

        describe("supported actions", actions)
    })

    function actions(){
        describe("family command", function(){
            it("can trigger new baby", function(){

            })

            it("can invite relatives", function(){

            })

            it("can trigger current baby information", function(){

            })
        })

        it("can trigger knowledges ui", function(){

        })

        it("can trigger account ui", function(){

        })
    }
})
