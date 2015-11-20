describe("route", function(){
    var tester=React.addons.TestUtils
    it("test utils is ready", function(){
        expect(tester).toBeTruthy()
    })

    it("/", function(done){
        location=location.pathname+'#/'
        window.routed.then((router)=>{
            var entry=tester.findRenderedDOMComponentWithClass(router,"Entry")
            expect(entry).toBeDefined()
            done()
        },()=>{fail();done()})
    })

    it("/knowledges/",function(){
        location=location.pathname+'#/knowledges/'
        window.routed.then((router)=>{
            var entry=tester.findRenderedDOMComponentWithClass(router,"Entry")
            expect(entry).toBeDefined()
            done()
        },()=>{fail();done()})
    })
})
