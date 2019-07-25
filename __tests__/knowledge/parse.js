import parse from "knowledge/parse"

const TEST=`${__dirname}/test.docx`
describe("knowledge parser", function(){
	var knowledge
	beforeAll(()=>{
		return parse(TEST).then(a=>knowledge=a)
	})

	it("load",()=>{
		expect(knowledge).toMatchObject({})
		expect(knowledge.html.length>100).toBe(true)
		"keywords,category,properties,sale,mindmaps,images,html,toc,fields"
			.split(",")
			.forEach(a=>expect(a in knowledge).toBe(true))
	})

	it("properties", function(){
		const properties=knowledge.properties
		expect(properties).toMatchObject({})
		expect(properties.title).toBeTruthy()
	})
	
	it("mindmaps", function(){
		expect(knowledge.mindmaps.length).toBe(2)
		expect(knowledge.html.indexOf("<x-mindmap")!=-1).toBe(true)
	})

	it("html",()=>{
		expect(knowledge.html.indexOf("<p")!=-1).toBe(true)
	})

	it("toc",()=>{
		expect(knowledge.toc).toBeDefined()
	})

	it("sale",()=>{

	})

	it("fields",()=>{

	})

	it("images",()=>{

	})

	it("homework area",()=>{

	})

	it("print area",()=>{

	})

	it("code",()=>{

	})

	it("days",()=>{

	})

	it("steps",()=>{

	})
})