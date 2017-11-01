import React, {Component, PropTypes} from "react"
import {compose, mapProps, getContext} from "recompose"
import {withFragment} from "qili/tools/recompose"

import {IconButton, TextField} from 'material-ui'

import PullToRefresh from "pull-to-refresh2"

import IconSearch from "material-ui/svg-icons/action/search"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import AppBar from "components/app-bar"

import Item from "./list-item"
import QuickSearch from "./quick-search"

export class Knowledges extends Component{
	state={title:""}
	componentDidMount(){
		this.setState({title:this.props.title})
	}
	render(){
        const {knowledges=[],search,minHeight,refresh, loadMore, canBack, goBack, toKnowledge}=this.props
		const {title,conditionAnchor, ...qs}=this.state
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
						<IconButton onClick={e=>search(this.state)}>
							<IconSearch/>
						</IconButton>
					}

					title={<TextField
						hintText="查询"
						value={title||""}
						onChange={(e,title)=>this.setState({title})}
						onKeyDown={e=>e.keyCode==13 && search(this.state)}
						onFocus={e=>this.setState({conditionAnchor:e.target})}
						fullWidth={true}/>
					}
					/>
				<QuickSearch
					qs={qs}
					open={!!conditionAnchor}
					anchorEl={conditionAnchor}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					close={condition=>{
						this.setState({conditionAnchor:undefined,...condition}, ()=>{
							if(condition){
								search(this.state)
							}
						})
					}}
					/>
				<PullToRefresh
					onRefresh={refresh}
					onMore={loadMore}
					>
					{
						knowledges
							.map(a=>(<Item model={a} key={a.id} toKnowledge={toKnowledge}/>))
					}
				</PullToRefresh>
			</div>

        )
    }
}

export default compose(
	withFragment(graphql`
		fragment list on Query{
			knowledges(title:$title,categories:$categories,tags:$tags,first:$count,after:$cursor) @connection(key:"list_knowledges"){
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
	getContext({
		muiTheme: PropTypes.object,
	}),
	mapProps(({data:{knowledges:{edges}}, relay, muiTheme:{page:{height}, footbar},...others})=>{
		return {
			...others,
			knowledges:edges.map(a=>a.node),
			minHeight: height-footbar.height,
			refresh(ok){
				ok()
			},
			loadMore(ok){
				if(relay.hasMore() && !relay.isLoading()){
					relay.loadMore(10, e=>{
						ok()
						if(e){
							console.error(e)
						}
					})
				}else
					ok()
			}
		}
	}),
)(Knowledges)
