import {render,TestUtils} from 'qili-app/spec/components/helper'
import MyUI from "../../lib/components/rewards"

fdescribe("rewards component",()=>{
	it("can be initialized with default props", ()=>{
		let ui=render(MyUI)
		expect(!!ui).toBe(true)
	})
	
	describe("rule supports",()=>{
		it("number, 5",()=>{
			let props={rules:[{target:"5",reward:"hug"}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			let li=lists[0]
			expect(lists.length).toBe(1)
			expect(!!li).toBe(true)
			expect(li.getDOMNode().textContent).toMatch(/hug/)
		})
		
		it("range, 5-10: 5,6,7,8,9,10", ()=>{
			let props={rules:[{target:"5-10",reward:"hug"}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			let li=lists[0]
			expect(lists.length).toBe(6)
			expect(!!li).toBe(true)
			expect(li.getDOMNode().textContent).toMatch(/hug/)
		})
		
		it("range with step, 10-20/5: 10, 15, 20", ()=>{
			let props={rules:[{target:"10-20/5",reward:"hug"}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			let li=lists[0]
			expect(lists.length).toBe(3)
			expect(!!li).toBe(true)
			expect(li.getDOMNode().textContent).toMatch(/hug/)
		})
		
		it("list with ',' as seperator, 5,8,10", ()=>{
			let props={rules:[{target:"5,8,10",reward:"hug"}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			let li=lists[0]
			expect(lists.length).toBe(3)
			expect(!!li).toBe(true)
			expect(li.getDOMNode().textContent).toMatch(/hug/)
		})
		
		it("list with mixed types, such as 5,7-9,10-20/5=> 5,7,8,9,10,15,20", ()=>{
			let props={rules:[{target:"5,7-9,10-20/5",reward:"hug"}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			let li=lists[0]
			expect(lists.length).toBe(7)
			expect(!!li).toBe(true)
			expect(li.getDOMNode().textContent).toMatch(/hug/)
		})
	})
	
	it("can add rules")
	
	it("can remove rules")
	
	it("can reward")
	
	describe("can show reward detail", ()=>{
		it("simple",()=>{
			let props={rewardDetail:[{count:1,comment:'polite',createdAt:new Date()}]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			expect(lists.length).toBe(1)
		})
		
		it("complex",()=>{
			let props={rewardDetail:[
				{count:1,comment:'polite',createdAt:new Date()},
				{count:4,comment:'polite',createdAt:new Date()},
				{count:5,comment:'polite',createdAt:new Date()},
				]}
			let ui=render(MyUI, props)
			let lists=TestUtils.scryRenderedDOMComponentsWithTag(ui,"li")
			expect(lists.length).toBe(3)
		})
	})
	
	describe("total",()=>{
		it("can show current reward total", ()=>{
			let props={rewardDetail:[
					{count:1,comment:'polite',createdAt:new Date()},
					{count:4,comment:'polite',createdAt:new Date()},
					{count:5,comment:'polite',createdAt:new Date()},
					]}
			let ui=render(MyUI, props)
			let total=TestUtils.findRenderedDOMComponentWithClass(ui,"rewards_total")
			expect(!!total).toBe(true)
			expect(total.getDOMNode().textContent).toMatch(/10/)
		})
		
		it("no total with 0", ()=>{
			let props={}
			let ui=render(MyUI, props)
			let a=TestUtils.scryRenderedDOMComponentsWithClass(ui,"rewards_total")
			expect(a.length).toBe(0)
		})
	})
	
	
	
})