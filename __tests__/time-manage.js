import {mount, shallow} from "enzyme"
import React from "react"
import TimeManage from "../src/time-manage"

xdescribe("child time management", function(){
	it("manageMyTime", function(){
		let el=shallow(<TimeManage manageMyTime={false}/>)
		
	})
})