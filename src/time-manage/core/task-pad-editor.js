import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext,withProps} from "recompose"
import {withFragment} from "qili-app/graphql"

import {List,ListItem, Subheader,Divider,Tab, IconButton} from "material-ui"
import MediaQuery from "react-responsive"

import {lightBlue100 as COLOR_ENABLED} from "material-ui/styles/colors"

import IconSmile from "material-ui/svg-icons/social/mood"
import IconUp from "material-ui/svg-icons/navigation/arrow-upward"
import IconDown from "material-ui/svg-icons/navigation/arrow-downward"
import IconTop from "material-ui/svg-icons/editor/vertical-align-top"
import IconBottom from "material-ui/svg-icons/editor/vertical-align-bottom"
import IconVisible from "material-ui/svg-icons/action/visibility"
import IconHidden from "material-ui/svg-icons/action/visibility-off"
import IconRemove from "material-ui/svg-icons/action/alarm-off"

export const TaskPadEditor=(({todos=[]})=>(
	<List>
		<ListItem primaryText="任务"/>
		<Divider/>
	{
	todos.map(({content, hidden, knowledge, i={content,knowledge:knowledge&&knowledge.id}},key)=>(
		<ListItem key={key} primaryText={content}
			rightIconButton={
				<Wrapper>
					<Remover i={i}/>
					<Visibility i={i} visible={!hidden}/>
					<Order  i={i}/>
				</Wrapper>
			}
		/>
	)).reduce((state,a,i)=>{
			state.push(a)
			state.push(<Divider key={`_${i}`}/>)
			return state
		},[])
	}
	</List>
))

const Order=compose(
	getContext({actions:PropTypes.object}),
	withProps(({actions:{top,bottom,up,down}})=>({
		top,bottom,up,down
	}))
)(({top,bottom,up,down,content,knowledge, i={content,knowledge}})=>(
	<Wrapper>
		<MediaQuery minWidth={960}>
            <IconButton onClick={e=>top(i)}>
                <IconTop color={COLOR_ENABLED}/>
            </IconButton>
        </MediaQuery>
		<IconButton onClick={e=>up(i)}>
            <IconUp color={COLOR_ENABLED}/>
        </IconButton>
		<IconButton onClick={e=>down(i)}>
            <IconDown color={COLOR_ENABLED}/>
        </IconButton>
        <MediaQuery minWidth={960}>
		      <IconButton onClick={e=>bottom(i)}>
                <IconBottom color={COLOR_ENABLED}/>
            </IconButton>
        </MediaQuery>
	</Wrapper>
))


const Visibility=compose(
	getContext({actions:PropTypes.object}),
	withProps(({actions:{toggle}})=>({
		toggle
	}))
)(({i,toggle,visible,Icon=(!visible ? IconHidden : IconVisible),style})=>(
	<IconButton onClick={e=>toggle(i)} style={style}>
		<Icon color={COLOR_ENABLED}/>
	</IconButton>
))

const Remover=compose(
	getContext({actions:PropTypes.object}),
	withProps(({actions:{remove}})=>({
		remove
	}))
)(({i,remove,style})=>(
	<IconButton onClick={e=>remove(i)} style={style}>
		<IconRemove color={COLOR_ENABLED}/>
	</IconButton>
))

const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)

export default compose(
	withFragment(graphql`
		fragment taskPadEditor on Plan{
			todos{
				content
				hidden
				knowledge{
					id
				}
			}
		}
	`),
	withProps(({data})=>({
		todos:data.todos||[]
	}))
)(TaskPadEditor)
