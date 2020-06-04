import React, {Component, Fragment} from "react"

import {compose, mapProps, setDisplayName} from "recompose"
import {withFragment} from "qili-app/graphql"

import {IconButton, TextField} from 'material-ui'

import Pull2Refresh from "qili-app/components/pull-to-refresh"

import IconSearch from "material-ui/svg-icons/action/search"
import IconDownload from "material-ui/svg-icons/file/cloud-download"
import IconBack from "material-ui/svg-icons/hardware/keyboard-arrow-left"

import AppBar from "components/app-bar"

import Item from "./list-item"
import QuickSearch,{toText} from "./quick-search"

export class Knowledges extends Component{
	constructor(){
		super(...arguments)
		this.state={}
	}

	static getDerivedStateFromProps(props, state){
		return {title:props.title, ...state}
	}

	downloadDocxTemplate(){
		const link=document.createElement("a")
		link.href="/knowledge/template.docx"
		link.download="knowledge-template.docx"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	downloadJSTemplate(){
		const link=document.createElement("a")
		link.href="/knowledge/template.js"
		link.download="knowledge-template.js"
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	render(){
        const {knowledges=[],search,qs,refresh, loadMore, canBack, goBack, toKnowledge, pagination}=this.props
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
								<IconButton onClick={e=>this.downloadDocxTemplate()} title="download docx template">
									<IconDownload color="white"/>
								</IconButton>
								<IconButton onClick={e=>this.downloadJSTemplate()} title="download javascript template">
									<IconDownload color="red"/>
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
					<Pull2Refresh
						onRefresh={refresh}
						onMore={loadMore}
						>
						{
							knowledges
								.map(a=>(<Item model={a} key={a.id} toKnowledge={toKnowledge}/>))
						}
						{pagination}
					</Pull2Refresh>
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
					hasPreviousPage
					startCursor
				}
			}
		}
	`),
	mapProps(({data:{knowledges}, qs:{title, ...qs},loadMore,pagination,...others})=>{
		return {
			...others,
			title,
			qs,
			knowledges:knowledges ? knowledges.edges.map(a=>a.node) :  [],
			refresh: ok=>ok(),
			loadMore,
		}
	}),
)(Knowledges)
