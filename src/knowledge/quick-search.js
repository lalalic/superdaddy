import React from "react"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {compose, getContext, withProps, withStateHandlers} from "recompose"

import {Popover, Menu, MenuItem, Divider, Chip} from "material-ui"
import IconArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'

const CAPS=["观察能力","自制力","专注力","记忆力"]
const TAGS=["观察能力","自制力","专注力","记忆力"]

export const QuickSearch=({qs, childName, setState, toggleTheme, toggleTag, close, ...others})=>(
	<Popover {...others}>
		<Menu>
			<MenuItem primaryText="我自己写的" 
				onClick={e=>setState({mine:!qs.mine})}
				checked={qs.mine}/>
			<MenuItem primaryText="我的收藏" 
				onClick={e=>setState({favorite:!qs.favorite})}
				checked={qs.favorite}/>
			<Divider/>
			<MenuItem primaryText="曾经作为任务的" 
				onClick={e=>setState({tasked:!qs.tasked})}
				checked={qs.tasked}/>
			<MenuItem primaryText="现在作为任务的" 
				onClick={e=>setState({tasking:!qs.tasking})}
				checked={qs.tasking}/>
			<Divider/>
			<MenuItem 
				onClick={e=>setState({child:!qs.child})}
				checked={qs.child}
				primaryText={
					<span>
						<span>适合</span>
						<b>{childName}</b>
						<span>的</span>
					</span>
				}/>
			<Divider/>
			<MenuItem primaryText="主题" 
				rightIcon={<IconArrowDropRight/>} 
				menuItems={
					CAPS.map(a=><MenuItem primaryText={a} key={a} 
						onClick={e=>toggleTheme(a)}
						checked={(qs.theme||[]).includes(a)}/>)
				}/>
			<MenuItem primaryText="常用标签" 
				rightIcon={<IconArrowDropRight/>} 
				menuItems={
					TAGS.map(a=><MenuItem primaryText={a} key={a}
						onClick={e=>toggleTag(a)}
						 checked={(qs.tags||[]).includes(a)}/>)
				}/>
		</Menu>
	</Popover>
)

export default compose(
	connect(({superdaddy:{current}})=>({id:current})),
	getContext({client: PropTypes.object}),
	withProps(({dispatch, client, id})=>{
		let child=client.get(id)
		return {
			childName: child.name
		}
	}),/*
	withStateHandlers(
		({qs})=>({}),
		{
			setState:({},{close})=>state=>{
				close(state)
				return state
			},
			toggleTag: ({},{qs:{tags=[]}})=>a=>{
				let i=tags.findIndex(a)
				if(i==-1){
					return {tags:[...tags,a]}
				}else{
					tags.splice(i,1)
					return {tags:[...tags]}
				}
			},
			toggleTheme: ({},{qs:{theme=[]}})=>a=>{
				let i=theme.findIndex(a)
				if(i==-1){
					return {theme:[...theme,a]}
				}else{
					theme.splice(i,1)
					return {theme:[...theme]}
				}
			},
		}
	)*/
)(QuickSearch)