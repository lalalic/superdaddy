import React from "react"
import {Route,IndexRoute} from "react-router"
import {withQuery, withFragment, withPagination} from "qili-app/graphql"
import {compose} from "recompose"

const List=compose(
    withPagination({
        variables:{title:"hello"},
        query:graphql`
            query routes_knowledges_Query($title:String,$categories:[String],$tags:[String],
                $mine:Boolean, $favorite:Boolean, $tasked:Boolean, $tasking:Boolean,
                $count:Int,$cursor:JSON){
                    ...routes
            }
        `
    }),
    withFragment(graphql`
		fragment routes on Query{
			knowledges(title:$title,categories:$categories,tags:$tags,
				mine:$mine, favorite:$favorite, tasked: $tasked, tasking:$tasking,
				first:$count,after:$cursor) @connection(key:"routes_knowledges"){
				edges{
					node{
						id
						title
						...listItem
					}
				}
				pageInfo{
					hasNextPage
					endCursor
				}
			}
		}
	`),
)(({data})=>{
    debugger
    return data.knowledges.edges.map(a=>a.node.title).join(",")
})

export default (
    <Route path="/" component={List}>
        <IndexRoute component={()=><div>home1</div>}/>
        <Route path="knowledges" component={({children})=><div>searchable: {children}</div>}>
            <Route path=":id.html" component={()=><div>knowledge</div>}/>
        </Route>
        <Route path="good" onlyBrowser={true} component={()=><span>good</span>}/>
    </Route>
)



