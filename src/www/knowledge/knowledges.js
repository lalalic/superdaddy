import React from "react"
import { compose,mapProps } from "recompose";
import { withFragment } from "qili-app/graphql"
import KnowledgeListItem from "knowledge/list-item"

export class KnowledgeList extends React.Component{
    render(){
        const {knowledges, toKnowledge, pagination}=this.props
        return (
            <div>
                {knowledges.map(knowledge=>(
                    <KnowledgeListItem key={knowledge.id} 
                        model={knowledge} 
                        toKnowledge={toKnowledge}
                        />
                ))}
                {pagination}
            </div>
        )
    }
}
export default compose(
    withFragment(graphql`
        fragment knowledges on Query{
            knowledges(title:$title,categories:$categories,tags:$tags,
                mine:$mine, favorite:$favorite, tasked: $tasked, tasking:$tasking,
                first:$count,after:$cursor) @connection(key:"knowledges_knowledges"){
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
    mapProps(({data, toKnowledge, relay})=>{
        return {
            knowledges:data.knowledges.edges.map(a=>a.node),
            toKnowledge,
            relay
        }
    })
)(KnowledgeList)