jest.mock("../../style/index.less",()=>jest.fn())
jest.mock("react-redux",()=>({connect:()=>component=>component}))
jest.mock("../../src/db/task", ()=>({
	getWeekStart(){
		return 3
	}
}))

import {shallow, render, mount} from "enzyme"
import React from "react"
import {AppBar} from "material-ui"


import BabyAppBar from "../../src/components/app-bar"
import TimeManage, {BabyTimeManage} from "../../src/time-manage"


import {TaskPad} from "../../src/time-manage/core/task-pad"
import {TaskPadEditor} from "../../src/time-manage/core/task-pad-editor"
import {TodoEditor} from "../../src/time-manage/core/todo-editor"
import {ScorePad, Editor as ScorePadEditor} from "../../src/time-manage/core/score-pad"

import {QiliApp} from "qili-app/lib/qiliApp"

const context={muiTheme:QiliApp.defaultProps.theme}
const childContextTypes={muiTheme:React.PropTypes.object}

describe("time management", function(){
	
	it("manageMyTime=false", function(){
		let ui=shallow(<TimeManage manageMyTime={false}/>, {context})
		expect(ui.find(BabyTimeManage).length).toBe(1)
		expect(ui.children().length).toBe(1)
	})

	it("manageMyTime=true", function(){
		let ui=shallow(<TimeManage manageMyTime={true} _id="test"/>, {context})
		expect(ui.find(BabyTimeManage).length).toBe(1)
		expect(ui.children().length).toBe(2)
	})


	describe("for baby", function(){
		let props={
			editing:false,
			todoWeek:3,
			goal:20,
			score:10
		}
		beforeAll(()=>console.error=jest.fn())
		it("no goal => show score pad to set first goal",function(){
			let ui=mount(<BabyTimeManage {...props} {...{goal:0}}/>,{context,childContextTypes})
			expect(ui.find(ScorePad).length).toBe(1)
		})
		it("goal==score: show score pad to set new goal",function(){
			let ui=mount(<BabyTimeManage {...props} {...{score:20}}/>, {context,childContextTypes})
			expect(ui.find(ScorePad).length).toBe(1)
		})
		
		it("goal not done yet at current week: show task pad",function(){
			let ui=mount(<BabyTimeManage {...props}/>, {context,childContextTypes})
			expect(ui.find(TaskPad).length).toBe(1)
			expect(ui.find(TodoEditor).length).toBe(1)
		})
		
		it("goal not done yet(goal>score),but current week is not todo week: show finish pad",function(){
			let ui=mount(<BabyTimeManage {...props} {...{todoWeek:2}}/>, {context,childContextTypes})
			expect(ui.find(TaskPad).length).toBe(1)
			expect(ui.find(BabyAppBar).length).toBe(1)
			expect(ui.find(BabyAppBar).prop("title")).toContain("保存前")
			expect(ui.find(TodoEditor).length).toBe(0)
		})
		
		it("edit tasks, goal not done yet at current week",function(){
			let ui=mount(<BabyTimeManage {...props} editing={true}/>, {context,childContextTypes})
			expect(ui.find(TaskPadEditor).length).toBe(1)
			expect(ui.find(TodoEditor).length).toBe(1)
		})
		
		describe("score pad",function(){
			it("alone", function(){
				let ui=mount(<TimeManage.ScorePad {...props} {...{todo:"gift"}}/>, {context,childContextTypes})
				expect(ui.find(BabyAppBar).length).toBe(1)
				expect(ui.text()).toContain("gift")
				expect(ui.find("span.smile").length).toBe(20)
				expect(ui.find("span.smile").children().getNodes().filter(a=>a.props.scored).length).toBe(10)
			})
			
		})
	})
	
})
