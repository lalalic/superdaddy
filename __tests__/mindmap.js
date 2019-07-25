import parse from "../src/components/mindmap/parse"

describe("mindmap parser",()=>{
    it("[empty] should return null",()=>{
        expect(parse("")).toBe(null)
        expect(parse()).toBe(null)
        expect(parse(null)).toBe(null)
    })

    it("b(1,2,3,4)",()=>{
        expect(parse("b(1,2,3,4)")).toMatchObject({
            name:"b",children:[{name:"1"},{name:"2"},{name:"3"},{name:"4"}]
        })
    })

    it("a(b(1,2,3,4))",()=>{
        expect(parse("a(b(1,2,3,4))")).toMatchObject({
            name:"a",children:[{name:"b",children:[{name:"1"},{name:"2"},{name:"3"},{name:"4"}]}]
        })
    })

    it("b(,2,3,4)",()=>{
        expect(parse("b(,2,3,4)")).toMatchObject({
            name:"b",children:[{name:""},{name:"2"},{name:"3"},{name:"4"}]
        })
    })

    it("b(,,,)",()=>{
        expect(parse("b(,,,)")).toMatchObject({
            name:"b",children:[{name:""},{name:""},{name:""},{name:""}]
        })
    })

    it("b()",()=>{
        expect(parse("b()")).toMatchObject({
            name:"b",children:[{name:""}]
        })
    })

    it("()",()=>{
        expect(parse("()")).toMatchObject({
            name:"",children:[{name:""}]
        })
    })

    it(" ",()=>{
        expect(parse(" ")).toMatchObject({
            name:" ",
        })
    })

    describe("exceptions",()=>{
        it("a(b",()=>{
            expect(parse("a(b")).toMatchObject({
                name:"a",children:[{name:"b"}]
            })
        })

        it("a(b,c",()=>{
            expect(parse("a(b,c")).toMatchObject({
                name:"a",children:[{name:"b"},{name:"c"}]
            })
        })

        it("a(b,c(,1)",()=>{
            expect(parse("a(b,c(,1)")).toMatchObject({
                name:"a",children:[{name:"b"},{name:"c",children:[{name:""},{name:"1"}]}]
            })
        })
    })
})