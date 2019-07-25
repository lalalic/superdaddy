import extract from "knowledge/extract"

const TEST=`${__dirname}/test.docx`
describe("extract",()=>{
    var doc, knowledge
    beforeAll(()=>{
        return extract(TEST).then(a=>{
            doc=a
            knowledge=a.knowledge
        })
    })

    it("title,sumary",()=>{
        expect(knowledge.title).toBeDefined()
        expect(knowledge.summary).toBeDefined()
        expect(doc.upload).toBeDefined()
        expect(knowledge.tags).toBeDefined()
    })

    it("should upload code",()=>{

    })

    it("should externalify images",()=>{

    })

    it("should upload template",()=>{

    })
})