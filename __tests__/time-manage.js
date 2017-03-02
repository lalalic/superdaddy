jest.mock("../style/index.less",()=>jest.fn())
jest.mock("react-redux",()=>({connect:()=>component=>component}))
jest.mock("../src/db/task", ()=>({
	getWeekStart(){
		return 3
	}
}))
import {shallow as _shallow, render} from "enzyme"
import React from "react"
import TimeManage, {BabyTimeManage} from "../src/time-manage"

import {TaskPad} from "../src/time-manage/core/task-pad"
import {TaskPadEditor} from "../src/time-manage/core/task-pad-editor"
import {TodoEditor} from "../src/time-manage/core/todo-editor"
import {ScorePad, Editor as ScorePadEditor} from "../src/time-manage/core/score-pad"

const shallow=node=>_shallow(node,{context:{
	muiTheme:{
		page:{height:900, width:600},
		appBar:{height:60},
		footbar:{height:60}
	}
}})

describe("time management", function(){
	it("manageMyTime=false", function(){
		let ui=shallow(<TimeManage manageMyTime={false}/>)
		expect(ui.find(BabyTimeManage).length).toBe(1)
		expect(ui.children().length).toBe(1)
	})

	it("manageMyTime=true", function(){
		let ui=shallow(<TimeManage manageMyTime={true} _id="test"/>)
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
		fit("no goal => show score pad to set new goal",function(){
			let ui=render(<BabyTimeManage {...props} {...{goal:0}}/>)
			let scorePad=ui.find(ScorePad)
			expect(scorePad.length).toBe(1)
			console.dir(scorePad)
			expect(scorePad.find(ScorePadEditor).length).toBe(1)
			//expect(scorePad.props().title).toContain("第一个目标")
		})
	})
})
