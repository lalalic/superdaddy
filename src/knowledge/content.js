import React from "react"

import {compose} from "recompose"
import {withFragment} from "qili-app/graphql"

import {relative} from 'components/calendar'
import MindMap from "components/mindmap"

import IconFavorited from "material-ui/svg-icons/action/favorite"
import IconViewed from "material-ui/svg-icons/action/visibility"
import IconAccomplished from "material-ui/svg-icons/notification/event-available"
import IconTasking from "material-ui/svg-icons/notification/event-note"
import Helmet from "react-helmet"

import smartNum from "../tools/number"

MindMap.asHtmlElement()

export const Content=({
		knowledge:{id, title, content, summary, createdAt, category, tags, figure, author,favorited,viewed,accomplished,tasking},
		titleBar
	})=>{
	const iconStyle={width:10,height:10}
	const keywords=[...(category||[]),...(tags||[])].join(", ")
	return (
		<article>
			<Helmet titleTemplate="激励馆 - %s">
				<title>{title}</title>
				{summary && <meta name="description" content={summary}/>}
				{keywords && <meta name="keywords" content={keywords}/>}
			</Helmet>
			<header  style={{backgroundColor:"transparent", height:"auto"}}>
				{titleBar && React.cloneElement(titleBar, {title})}
				{id && (
					<p>
						<span>{author.name}</span>
						{author.name && "-"} 
						<time>{relative(createdAt)}</time>
						{!!favorited && (
							<span>
								{smartNum(favorited)}<IconFavorited style={iconStyle}/>
							</span>
						)}
						{!!viewed && (
							<span>
								{smartNum(viewed)}<IconViewed  style={iconStyle}/>
							</span>
						)}
						{!!accomplished && (
							<span>
								{smartNum(accomplished)}<IconAccomplished  style={iconStyle}/>
							</span>
						)}
						{!!tasking && (
							<span>
								{smartNum(tasking)}<IconTasking  style={iconStyle}/>
							</span>
						)}
					</p>
				)}
				<p>{keywords}</p>
			</header>
			{figure && (
				<figure style={{margin:10}}>
					<img src={figure}/>
				</figure>
			)}
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
	withFragment({knowledge:graphql`
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

			favorited
			viewed
			accomplished
			tasking
		}
	`}),
)(Content)