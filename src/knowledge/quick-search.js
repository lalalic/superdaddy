import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, withProps, withStateHandlers} from "recompose"

import {Popover, Menu, MenuItem, Divider, Chip, Subheader} from "material-ui"
import IconArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import {blue300 as SELECTED, indigo900} from 'material-ui/styles/colors'

const CAPS=["观察能力","自制力","专注力","记忆力"]
const TAGS=["数学","语文","英语","二年级"]
const CONDS=[
	{label:"自己写的",key:"mine"},
	{label:"收藏的",key:"favorite"},
	{label:"作为任务的",key:"tasking"},
	{label:"曾经作为任务的",key:"tasked"}
]
const style={
	 chip: {
		margin: 4,
	  },
	  wrapper: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: 10
	  }
}
export const QuickSearch=({
	mine,favorite,tasking,tasked,ph={mine,favorite,tasking,tasked},
	categories=[],tags=[], childName,
	toggle, toggleCategory, toggleTag, search,
	...others})=>(
	<Popover {...others} onRequestClose={()=>{
			search({mine,favorite,tasking,tasked,categories,tags})
		}}>
		<div>
			<Subheader>常用</Subheader>
			<div style={style.wrapper}>
				{
					CONDS.map(({label,key})=>(
						<Chip key={label}
							style={style.chip}
							backgroundColor={ph[key] ? SELECTED: undefined}
							onClick={()=>toggle(key)}>{label}</Chip>
					))
				}
			</div>
		</div>
		<div>
			<Subheader>主题</Subheader>
			<div style={style.wrapper}>
				{CAPS.map(a=>(
					<Chip key={a}
						backgroundColor={categories.includes(a)? SELECTED : undefined}
						style={style.chip}
						onClick={()=>toggleCategory(a)}>
						{a}
					</Chip>
				))}
			</div>
		</div>
		<div>
			<Subheader>标签</Subheader>
			<div style={style.wrapper}>
				{TAGS.map(a=>(
					<Chip key={a}
						backgroundColor={tags.includes(a)? SELECTED : undefined}
						style={style.chip}
						onClick={()=>toggleTag(a)}>
						{a}
					</Chip>
				))}
				<Chip style={style.chip} >更多...</Chip>
			</div>
		</div>
	</Popover>
)

export const toText=({categories,tags,...qs})=>{
	let conds=[...categories, ...tags]
	CONDS.forEach(({key,label})=>qs[key] && conds.push(label))
	return conds.join(",")
}

export default compose(
	connect(({superdaddy:{current}})=>({id:current})),
	getContext({client: PropTypes.object}),
	withProps(({dispatch, client, id, close,qs})=>{
		let child=client.get(id)
		return {
			childName: child.name,
		}
	}),
	withStateHandlers(
		({qs})=>({...qs}),
		{
			toggle:(state,{})=>key=>{
				let prev=!!state[key]
				return {[key]:!prev}
			},
			toggleTag: ({tags})=>a=>{
				let i=tags.indexOf(a)
				if(i==-1){
					return {tags:[...tags,a]}
				}else{
					let changing=[...tags]
					changing.splice(i,1)
					return {tags:changing}
				}
			},
			toggleCategory: ({categories})=>a=>{
				let i=categories.indexOf(a)
				if(i==-1){
					return {categories:[...categories,a]}
				}else{
					let changing=[...categories]
					changing.splice(i,1)
					return {categories:changing}
				}
			},
		}
	),
)(QuickSearch)
