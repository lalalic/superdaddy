import {React, Component, render, TestUtils, newPromise,uuid,expectHasType,Any, findCommand} from 'qili-app/spec/components/helper'
import {initWithUser, spyOnXHR, ajaxHaveBeenCalled, failx, root, clearCurrentUser} from "qili-app/spec/db/helper"
import App from "qili-app/lib/db/app"
import User from "qili-app/lib/db/user"
import FamilyDB from "../../lib/db/family"

describe("FamilyDB", function(){
    beforeEach((done)=>{
        initWithUser(`familyDbTest${uuid()}`).catch(failx(done)).then(done)
    })
	afterEach(clearCurrentUser)

    it("can reset", function(done){
        spyOnXHR({results:[]})
        FamilyDB.init().catch(failx(done)).then(function(){
            expect(FamilyDB.all.length).toBe(0)
            done()
        })
    })

    it("can get all children and relatives", function(done){
        spyOnXHR({results:[{_id:`${uuid()}`,name:`child${uuid()}`},
            {_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        FamilyDB.init().then(function(){
            expect(FamilyDB.all.length).toBe(2)
            expect(FamilyDB.children.length).toBe(1)
            expect(FamilyDB.currentChild.name).not.toBe("aa")
            done()
        }).catch(failx(done))
    })

    it("can create child, and update children", function(done){
        spyOnXHR({results:[{_id:`${uuid()}`,name:`child${uuid()}`},
            {_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        FamilyDB.init().then(function(){
            FamilyDB.upsert({name:`${uuid()}`}).then(function(){
                expect(FamilyDB.all.length).toBe(3)
                expect(FamilyDB.children.length).toBe(2)
                done()
            })
        }).catch(failx(done))
    })

    it("can update child, and update children", function(done){
        let aChild={_id:`${uuid()}`,name:`${uuid()}`}
        spyOnXHR({results:[aChild,{_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        FamilyDB.init().then(function(){
            expect(FamilyDB.all.length).toBe(2)
            expect(FamilyDB.currentChild._id).toBe(aChild._id)
            expect(FamilyDB.currentChild.name).toBe(aChild.name)
            let current=FamilyDB.currentChild,
                newName=`${uuid()}`
            current.name=newName
            FamilyDB.upsert(current).then(function(){
                expect(FamilyDB.all.length).toBe(2)
                expect(FamilyDB.children.length).toBe(1)
                expect(FamilyDB.currentChild._id).toBe(aChild._id)
                expect(FamilyDB.currentChild.name).toBe(newName)
                done()
            })
        }).catch(failx(done))
    })

    it("can remove the only child, and update children", function(done){
        let aChild={_id:`${uuid()}`,name:`${uuid()}`}
        spyOnXHR({results:[aChild,{_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        FamilyDB.init().then(function(){
            expect(FamilyDB.all.length).toBe(2)
            expect(FamilyDB.currentChild._id).toBe(aChild._id)
            expect(FamilyDB.currentChild.name).toBe(aChild.name)
            let current=FamilyDB.currentChild
            FamilyDB.remove(current._id).then(function(){
                expect(FamilyDB.all.length).toBe(1)
                expect(FamilyDB.children.length).toBe(0)
                expect(FamilyDB.currentChild).toBe(undefined)
                done()
            })
        }).catch(failx(done))
    })

    it("can remove non-current child", function(done){
        let aChild={_id:`${uuid()}`,name:`${uuid()}`}
            ,child1={_id:`${uuid()}`,name:"good"}
        spyOnXHR({results:[aChild,child1, {_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        FamilyDB.init().then(function(){
            expect(FamilyDB.all.length).toBe(3)
            expect(FamilyDB.children.length).toBe(2)
            expect(FamilyDB.currentChild._id).toBe(aChild._id)
            expect(FamilyDB.currentChild.name).toBe(aChild.name)
            let non_current=FamilyDB.children[1]
            FamilyDB.remove(non_current._id).then(function(){
                expect(FamilyDB.all.length).toBe(2)
                expect(FamilyDB.children.length).toBe(1)
                expect(FamilyDB.currentChild._id).toBe(aChild._id)
                done()
            })
        }).catch(failx(done))
    })

    it("can invite relatives", function(done){
        spyOnXHR({results:[{_id:`${uuid()}`,name:`child${uuid()}`},
            {_id:`${uuid}`,name:"aa",relationShip:"baba"}]})
        let phone=""
            ,relationShip="brother-of-mother"
        FamilyDB.init().then(function(){
            FamilyDB.invite(phone,relationShip).then(function(){
                //@TODO:not implemented
                done()
            })
        }).catch(failx(done))
    })
})
