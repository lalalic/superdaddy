jest.mock("../../src/db/family",()=>({}))
jest.mock("../../src/selector", ()=>({}))
jest.mock("normalizr",()=>({}))

import dbFamily from "../../src/db/family"
const selector=require("../../src/selector")
const normalizr=require("normalizr")
const QiliApp=require("qili-app")

import TimeManage, {BabyTimeManage} from "../../src/time-manage"
const {ACTION,reducer}= BabyTimeManage

describe("action and state", function(){
	beforeEach(()=>{
		selector.getCurrentChild=jest.fn().mockReturnValue({})
		dbFamily.upsert=jest.fn(child=>Promise.resolve(child))
		normalizr.normalize=jest.fn(a=>({entities:{}}))
		QiliApp.ENTITIES=jest.fn()
	})
	let dispatch=jest.fn()
	let getState=jest.fn()

	it("can create goal",function(){
		return ACTION.SET_GOAL(20,"gift")(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				expect(child.targets.baby).toMatchObject({goal:20,todo:"gift",score:0})
			})
	})
	
	it("can create goal after a goal finished",function(){
		let child={
			targets:{
				baby:{
					score:25,
					goal:20
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)
		return ACTION.SET_GOAL(20,"gift")(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				expect(child.targets.baby).toMatchObject({goal:20,todo:"gift",score:5})
			})
	})
	
	fit("can add quick task", function(){
		return ACTION.ADD("gift")(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task).toMatchObject({todos:[{content:"gift"}]})
			})
	})
	
	it("can remove task", function(){
		
	})
	
	it("finish last week's jobs", function(){
		
	})
	
	it("can reorder tasks", function(){
		
	})
})