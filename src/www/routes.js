import React,{Fragment} from "react"
import {Route,IndexRoute} from "react-router"
import {withQuery, withPagination} from "qili-app/graphql"
import {compose, mapProps, withProps} from "recompose"

import KnowledgeList from "./knowledge/knowledges"
import Knowledge from "./knowledge/knowledge"

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

export default (
    <Route path="/" component={({children})=><Fragment>{children}</Fragment>}>
        <IndexRoute component={compose(
            withPagination(({location:{query:{q}}})=>{
                return {
                    variables:JSON.parse(q||"{}")||{},
                    query:graphql`
                        query routes_knowledges_Query($title:String,$categories:[String],$tags:[String],
                            $mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
                            $count:Int=5,$cursor:JSON){
                                ...knowledges
                        }
                    `
                }
            }),
            withProps(props=>({
                toKnowledge:id=>`/knowledges/${_(id)}.html`
            }))
        )(KnowledgeList)}/>
        
        <Route path="knowledges/:id.html" component={
            compose(
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
    </Route>
)



