import React from "react"
import {Route} from "react-router"
import {withQuery, withPagination} from "qili-app/graphql"
import {compose, mapProps, withProps} from "recompose"

import KnowledgeList from "./knowledge/knowledges"
import Knowledge from "./knowledge/knowledge"
import Dashboard from "./dashboard"

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export const App=({children, req, ...theme})=>{
    if(req && req.headers){
        theme.userAgent=req.headers['user-agent']||"all"
    }
    return (
        <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            {children}
        </MuiThemeProvider> 
    )
}

const _=id=>id.split(":").pop()
var KnowledgeContainer=null

export default (
    <Route path="/" component={Dashboard}>

        <path path="knowledge" component={compose(
            withPagination(({location:{query:{q}}})=>{
                return {
                    variables:JSON.parse(q||"{}")||{},
                    query:graphql`
                        query routes_knowledges_Query($title:String,$categories:[String],$tags:[String],
                            $mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
                            $hasHomework:Boolean, $hasPrint:Boolean, $hasSale:Boolean,
                            $count:Int=10,$cursor:JSON){
                                ...knowledges
                        }
                    `
                }
            }),
            withProps(({routes:[root]})=>({
                toKnowledge:id=>`${root.path}knowledge/${_(id)}.html`//support test to redefine root
            }))
        )(KnowledgeList)}/>
        
        <Route path="knowledge/:id.html" component={
            KnowledgeContainer=compose(
                withQuery(({params:{id}})=>({
                    variables:{id},
                    query:graphql`
                        query routes_knowledge_Query($id:ObjectID){
                            knowledge(_id:$id){
                                ...knowledge
                            }
                        }
                    `,
                })),
                mapProps(({data})=>({
                    knowledge:data.knowledge
                })),
            )(Knowledge)
        }/>

        <Route path="tool" component={compose(
            withPagination(({location:{query:{q}}})=>{
                return {
                    variables:Object.assign(JSON.parse(q||"{}")||{},{hasPrint:true, hasSale:true}),
                    query:graphql`
                        query routes_tools_Query($title:String,$categories:[String],$tags:[String],
                            $mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
                            $hasHomework:Boolean, $hasPrint:Boolean, $hasSale:Boolean,
                            $count:Int=10,$cursor:JSON){
                                ...knowledges
                        }
                    `
                }
            }),
            withProps(({routes:[root]})=>({
                toKnowledge:id=>`${root.path}tool/${_(id)}.html`//support test to redefine root
            }))
        )(KnowledgeList)}/>

        <Route path="tools/:id.html" component={KnowledgeContainer}/>

        <Route path="daka" component={compose(
            withPagination(({location:{query:{q}}})=>{
                return {
                    variables:Object.assign(JSON.parse(q||"{}")||{},{hasHomework:true}),
                    query:graphql`
                        query routes_homeworks_Query($title:String,$categories:[String],$tags:[String],
                            $mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
                            $hasHomework:Boolean, $hasPrint:Boolean, $hasSale:Boolean,
                            $count:Int=10,$cursor:JSON){
                                ...knowledges
                        }
                    `
                }
            }),
            withProps(({routes:[root]})=>({
                toKnowledge:id=>`${root.path}daka/${_(id)}.html`//support test to redefine root
            }))
        )(KnowledgeList)}/>

        <Route path="daka/:id.html" component={KnowledgeContainer}/>

        <Route component={()=><div>404 错误</div>}/>
    </Route>
)



