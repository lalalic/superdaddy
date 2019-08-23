import React from "react"
import {hydrate,render} from "react-dom"
import {browserHistory as history, match,Router,Route} from "react-router"
import routes from "./routes"
import {withGraphql} from "qili-app/graphql"
const Context=withGraphql()(Router)
match({ history, routes: React.cloneElement(routes,{path:"1/5746b2c5e4bb3b3700ae1566/static"}) }, (error, redirectLocation, renderProps) => {
    if(renderProps && !renderProps.routes.find(a=>a.onlyBrowser)){
        hydrate(<Context {...renderProps}/>, document.querySelector('#app'))
    }else if(renderProps){
        render(<Context {...renderProps} />, document.querySelector('#app'))
    }
})