import React, {Component, PropTypes} from "react"
import {compose, withProps, getContext} from "recompose"
import {withFragment} from "qili/tools/recompose"

import {IconButton, TextField} from 'material-ui'

import PullToRefresh from "pull-to-refresh2"

import IconSearch from "material-ui/svg-icons/action/search"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import AppBar from "components/app-bar"

import Item from "./list-item"

export class Knowledges extends Component{
	state={title:null}
    render(){
        const {knowledges=[],search,minHeight,refresh, loadMore, canBack, goBack, toKnowledge}=this.props
		const {title}=this.state
		let iconElementLeft=null
		if(canBack){
			iconElementLeft=(
				<IconButton onClick={goBack}>
					<IconBack/>
				</IconButton>
			)
		}else{
			iconElementLeft=(<span/>)
		}
        return (
			<div style={{minHeight}}>
				<AppBar
					iconElementLeft={iconElementLeft}
					
					iconElementRight={
						<IconButton onClick={e=>search({title})}>
							<IconSearch/>
						</IconButton>
					}
					
					title={<TextField
						hintText="查询"
						onChange={(e,title)=>this.setState({title})}
						onKeyDown={e=>e.keyCode==13 && search({title})}
						fullWidth={true}/>
					}
					/>
				<PullToRefresh
					onRefresh={refresh}
					onMore={loadMore}
					>
					{
						knowledges
							.filter(a=>title ? -1!=a.title.indexOf(title) : true)
							.map(a=>(<Item model={a} key={a.id} toKnowledge={toKnowledge}/>))
					}
				</PullToRefresh>
			</div>
            
        )
    }
}
	
export default compose(
	withFragment(graphql`
		fragment list_knowledges on Query{
			knowledges(first:$first,after:$after) @connection(key:"list_knowledges"){
				edges{
					node{
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
	getContext({
		muiTheme: PropTypes.object,
	}),
	withProps(({knowledges, muiTheme:{page:{height}, footbar}})=>({
		knowledges:knowledges||[],
		minHeight: height-footbar.height,
		refresh(){
			
		},
		loadMore(){
			
		},
	})),
)(Knowledges)