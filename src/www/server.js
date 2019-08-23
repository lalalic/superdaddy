import React from "react"
import {renderToString} from "react-dom/server"
import {match, RouterContext} from "react-router"
import {fetchQuery} from "react-relay"
import routes from "./routes"
import template from "./template"
import {withGraphql, createEnvironment} from "qili-app/graphql"

export default function({path:location, app},res){
    match({routes,location}, (err, redirect, props)=>{
        if(err){
            res.reply(err)
        }else if(props && !props.routes.find(a=>a.onlyBrowser)){
            const environment=createEnvironment({app})
            const tasks=props.components.map((Component,i)=>{
                if(Component.withQuery){
                    const {query, variables}=Component.withQuery(props)
                    return fetchQuery(environment, query, variables)
                        .then(data=>{
                            const DataComponent=class extends React.Component{
                                render(){
                                    return <Component {...props} data={data}/>
                                }
                            }

                            return DataComponent
                        })
                }
                return Promise.resolve(Component)
            })
            const Context=withGraphql({environment})(RouterContext)

            Promise.all(tasks).then((components)=>{
                res.reply(template({
                    content:renderToString(<Context {...props} components={components}/>), 
                    _init:environment.getStore().getSource(),
                }))
            })
        }else{//client handle
            res.reply(template({content:""}))
        }
    })
} 