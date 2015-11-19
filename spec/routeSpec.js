describe("route", function(){
    var tester=React.addons.TestUtils
    it("test utils is ready", function(){
        expect(tester).toBeTruthy()
    })

    it("/", function(){
        location=location.pathname+'#/'
        tester.findRenderedDOMComponentWithClass()
    })

    it("/knowledges/",function(){
        location=location.pathname+'#/knowledges/'
    })
})
