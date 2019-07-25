import React from "react"

import {graphql} from "react-relay"

import {compose} from "recompose"
import {withFragment} from "qili-app"

import {relative} from 'components/calendar'
import AppBar from "components/app-bar"
import MindMap from "components/mindmap"

MindMap.asHtmlElement()

export const Content=({
		knowledge:{id, title, content, summary, createdAt, category, tags, figure, author,toc}
	})=>{
	const tocLen=()=>toc.children ? toc.children.length : 1
	return (
		<article>
			<header  style={{backgroundColor:"transparent", height:"auto"}}>
				<AppBar title={title} />
				{id && (<p><span>{author.name}</span> - <time>{relative(createdAt)}</time></p>)}
				<p>{[...(category||[]),...(tags||[])].join(", ")}</p>
			</header>
			<figure style={{margin:10}}>
				{figure ? (<img src={figure}/>) : (
					toc ? <MindMap data={toc}/> : null
				)}
				</figure>
			<section>
				<details open>
					<summary>{summary}</summary>
					<div dangerouslySetInnerHTML={{__html:content}}/>
				</details>
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
			toc
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