"use strict"
describe("route", function(){
    var tester=React.addons.TestUtils,
        Root=window.Root,
        TYPEs={}

    fit("Tester and UI is ready", function(){
        expect(tester).toBeTruthy()
        expect(Root).toBeDefined()

        ;(function types(route){
            let type=route.handler
            TYPEs[type.name]=type
            
            let children=route.childRoutes
            children && children.forEach((a)=>types(a))
        })(Root.routes[0])

        expect(Object.keys(TYPEs).length).toBeGreaterThan(3)

        var SuperDaddy=TYPEs['SuperDaddy']
        expect(SuperDaddy).toBeDefined()

        var app=tester.findRenderedComponentWithType(Root, SuperDaddy)
        expect(app).toBeDefined()
    })

    it("/", function(done){
        location=location.pathname+'#/'
        window.Root.then((router)=>{
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
