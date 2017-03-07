jest.mock("../../src/db/family",()=>({}))
jest.mock("../../src/db/finished",()=>({}))
jest.mock("../../src/db/knowledge",()=>({isForBaby:a=>true, isForParent:a=>false}))
jest.mock("../../src/selector", ()=>({}))
jest.mock("normalizr",()=>({}))

import dbFamily from "../../src/db/family"
import dbKnowledge from "../../src/db/knowledge"
import dbFinished from "../../src/db/finished"
import dbTask from "../../src/db/task"

const selector=require("../../src/selector")
const normalizr=require("normalizr")
const QiliApp=require("qili-app")

import TimeManage, {BabyTimeManage, ACTION as TimeManage_ACTION} from "../../src/time-manage"
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

	it("can add quick task", function(){
		return ACTION.ADD("gift")(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task).toMatchObject({todos:[{content:"gift"}]})
			})
	})

	it("ADD({knowledge})", function(){
		dbKnowledge.isForBaby=jest.fn().mockReturnValue(true)
		let knowledge={_id:"sfa",title:"hello",score:2}
		return TimeManage_ACTION.ADD(knowledge)(dispatch,getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task).toMatchObject({todos:[{knowledge:"sfa",content:"hello",score:2}]})
			})
	})

	it("can remove knowledge task", function(){
		let child={
			targets:{
				baby:{
					score:10,
					goal:20,
					todos:[{content:"gift"},{knowledge:"sfa",content:"hello",score:2}]
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)
		dbKnowledge.isForBaby=jest.fn().mockReturnValue(true)

		return TimeManage_ACTION.REMOVE({_id:"sfa"})(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task.todos.length).toBe(1)
				expect(task.todos[0]).toMatchObject({content:"gift"})
			})
	})

	it("can remove task", function(){
		let child={
			targets:{
				baby:{
					score:10,
					goal:20,
					todos:[{content:"gift2"},{content:"gift"},{content:"bear"}]
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)

		return ACTION.REMOVE("gift")(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task.todos.length).toBe(2)
				expect(task).toMatchObject({todos:[{content:"gift2"},{content:"bear"}]})
			})
	})

	it("can remove task by index", function(){
		let child={
			targets:{
				baby:{
					score:10,
					goal:20,
					todos:[{content:"gift"},{content:"bear"}]
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)

		return ACTION.REMOVE_BY_INDEX(1)(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task.todos.length).toBe(1)
				expect(task).toMatchObject({todos:[{content:"gift"}]})
			})
	})

	it("can finish one task", function(){
		let child={
			targets:{
				baby:{
					score:10,
					goal:20,
					todos:[{content:"gift", dones:[1]},{content:"bear"}]
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)

		return ACTION.DONE("gift",2)(dispatch, getState)
			.then(a=>{
				expect(dbFamily.upsert).toHaveBeenCalled()
				let child=dbFamily.upsert.mock.calls[0][0]
				let task=child.targets.baby
				expect(task.todos[0]).toMatchObject({content:"gift", dones:[1,2]})
				expect(task.score).toBe(11)
				expect(task.totalScore).toBe(1)
			})
	})

	describe("edit todos by order, visible", function(){
		let child={
			targets:{
				baby:{
					score:10,
					goal:20,
					todos:[{content:"gift"},{content:"pig"},{content:"bear"}]
				}
			}
		}

		beforeEach(()=>{
			child.targets.baby.todos=[{content:"gift"},{content:"pig"},{content:"bear"}]
		})

		it("up", function(){
			selector.getCurrentChild=jest.fn().mockReturnValue(child)
			return ACTION.UP(1)(dispatch, getState)
				.then(a=>{
					expect(dbFamily.upsert).toHaveBeenCalled()
					let child=dbFamily.upsert.mock.calls[0][0]
					let task=child.targets.baby
					expect(task.todos.length).toBe(3)
					expect(task.todos).toMatchObject([{content:"pig"},{content:"gift"},{content:"bear"}])
				})
		})

		it("down", function(){
			selector.getCurrentChild=jest.fn().mockReturnValue(child)
			return ACTION.DOWN(1)(dispatch, getState)
				.then(a=>{
					expect(dbFamily.upsert).toHaveBeenCalled()
					let child=dbFamily.upsert.mock.calls[0][0]
					let task=child.targets.baby
					expect(task.todos.length).toBe(3)
					expect(task.todos).toMatchObject([{content:"gift"},{content:"bear"},{content:"pig"}])
				})
		})

		it("top", function(){
			selector.getCurrentChild=jest.fn().mockReturnValue(child)
			return ACTION.TOP(2)(dispatch, getState)
				.then(a=>{
					expect(dbFamily.upsert).toHaveBeenCalled()
					let child=dbFamily.upsert.mock.calls[0][0]
					let task=child.targets.baby
					expect(task.todos.length).toBe(3)
					expect(task.todos).toMatchObject([{content:"bear"},{content:"gift"},{content:"pig"}])
				})
		})

		it("bottom", function(){
			selector.getCurrentChild=jest.fn().mockReturnValue(child)
			return ACTION.BOTTOM(0)(dispatch, getState)
				.then(a=>{
					expect(dbFamily.upsert).toHaveBeenCalled()
					let child=dbFamily.upsert.mock.calls[0][0]
					let task=child.targets.baby
					expect(task.todos.length).toBe(3)
					expect(task.todos).toMatchObject([{content:"pig"},{content:"bear"},{content:"gift"}])
				})
		})

		it("hidden", function(){
			selector.getCurrentChild=jest.fn().mockReturnValue(child)
			return ACTION.TOGGLE_VISIBLE(0)(dispatch, getState)
				.then(a=>{
					expect(dbFamily.upsert).toHaveBeenCalled()
					let child=dbFamily.upsert.mock.calls[0][0]
					let task=child.targets.baby
					expect(task.todos.length).toBe(3)
					expect(task.todos[0]).toMatchObject({content:"gift",hidden:true})
				})
		})
	})

	it("finish last week's jobs", function(){
		let child={
			_id:"test",
			targets:{
				baby:{
					todoWeek:dbTask.getWeekStart(new Date("March 2, 2017")),
					goal:20,
					score:18,
					todos:[{content:"gift", dones:[2,4,5]}, {content:"bike"}]
				}
			}
		}
		selector.getCurrentChild=jest.fn().mockReturnValue(child)
		dbFinished.upsert=jest.fn(a=>Promise.resolve(a))
		
		return ACTION.RESET()(dispatch, getState)
			.then(a=>{
				expect(dbFinished.upsert).toHaveBeenCalled()
				let finished=dbFinished.upsert.mock.calls[0][0]
				expect(finished.length).toBe(3)
				let [first]=finished
				expect(first).toMatchObject({baby:"test", content:"gift", owner:"baby"})
				let date=first.date
				expect(date.getMonth()).toBe(1)
				expect(date.getDate()).toBe(28)
			})
	})

	it("editing(1)", function(){
		let state=reducer({},ACTION.EDITING(1))
		expect(state.baby).toBe(1)
	})

	it("editing()", function(){
		let state=reducer({},ACTION.EDITING())
		expect(state.baby).toBe(0)
	})

	it("editing()", function(){
		let state=reducer({},ACTION.EDITING(0))
		expect(state.baby).toBe(0)
	})
})
