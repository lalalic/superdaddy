import React, {Component, Fragment} from "react"
import PropTypes from "prop-types"

import {compose, mapProps, getContext, setDisplayName} from "recompose"
import {withFragment} from "qili-app/graphql"

import {IconButton, TextField} from 'material-ui'

import PullToRefresh from "pull-to-refresh2"

import IconSearch from "material-ui/svg-icons/action/search"
import IconDownload from "material-ui/svg-icons/file/cloud-download"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import AppBar from "components/app-bar"

import Item from "./list-item"
import QuickSearch,{toText} from "./quick-search"

export class Knowledges extends Component{
	state={title:this.props.title}
	downloadTemplate(){
		const link=document.createElement("a")
		link.href="/knowledge/template.docx"
		link.download="knowledge-template.docx"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	render(){
        const {knowledges=[],search,qs,minHeight,refresh, loadMore, canBack, goBack, toKnowledge}=this.props
		const {conditionAnchor, title}=this.state
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
			<Fragment>
				<div style={{flex:"none"}}>
					<AppBar
						iconElementLeft={iconElementLeft}

						iconElementRight={
							<span>
								<IconButton onClick={e=>search({title})}>
									<IconSearch/>
								</IconButton>
								<IconButton onClick={e=>this.downloadTemplate()} title="download template">
									<IconDownload color="white"/>
								</IconButton>
							</span>
						}

						title={<TextField
							hintText={`${toText(qs)}`}
							name="search"
							value={title||""}
							onChange={(e,title)=>this.setState({title})}
							onKeyDown={e=>e.keyCode==13 && search({title})}
							onFocus={e=>this.setState({conditionAnchor:e.target})}
							fullWidth={true}/>
						}
						/>
					<QuickSearch
						qs={qs}
						style={{opacity:0.9}}
						open={!!conditionAnchor}
						anchorEl={conditionAnchor}
						anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
						targetOrigin={{horizontal: 'left', vertical: 'top'}}
						search={condition=>{
							this.setState({conditionAnchor:undefined})
							search(condition)
						}}
						/>
				</div>
				<div className="flexV">
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
				
				
			</Fragment>

        )
    }
}

export default compose(
	setDisplayName("knowledges"),
	withFragment(graphql`
		fragment list on Query{
			knowledges(title:$title,categories:$categories,tags:$tags,
				mine:$mine, favorite:$favorite, tasked: $tasked, tasking:$tasking,
				first:$count,after:$cursor) @connection(key:"list_knowledges"){
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
	mapProps(({data:{knowledges}, relay, muiTheme:{page:{height}, footbar},...others})=>{
		return {
			...others,
			knowledges:knowledges ? knowledges.edges.map(a=>a.node) :  [],
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
