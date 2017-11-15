import React from "react"
import PropTypes from "prop-types"

import {graphql} from "react-relay"
import {Link} from "react-router"

import {compose, withProps} from "recompose"
import {withFragment} from "qili/tools/recompose"

import {relative} from 'components/calendar'
import AppBar from "components/app-bar"

export const Content=({
		knowledge:{id, title, content, summary, createdAt, category, tags, figure, author,}
	})=>{
	category=category||[]
	tags=tags||[]	
	content=<div dangerouslySetInnerHTML={{__html:content}}/>

	if(summary && open!==null){
		content=(
			<details open={open}>
				<summary>{summary}</summary>
				{content}
			</details>
		)
	}

	let notNewStuff=null
	if(id){
		notNewStuff=[
			(<AppBar key="appbar" title={title} />),
			(<p key="author">
				{author.name} - <time>{relative(createdAt)}</time>
			</p>)
		]
	}else {
		notNewStuff=(<AppBar title={title}/>)
	}

	if(figure)
		figure=(<img src={figure}/>)

	return (
		<article>
			<figure>{figure}</figure>
			<header  style={{backgroundColor:"transparent"}}>
				{notNewStuff}
				<p>
					{[...category,...tags].join(", ")}
				</p>
			</header>
			<section>
				{content}
			</section>
		</article>
	)
}

export default compose(
	withFragment(graphql`
		fragment content_knowledge on Knowledge{
			id
			title
			content
			summary
			createdAt
			category
			tags 
			figure
			author{
				name
			}
		}
	`),
)(Content)