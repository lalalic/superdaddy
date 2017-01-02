import React, {Component, PropTypes} from "react"
import {List,ListItem, Subheader,Divider,Tab, IconButton} from "material-ui"
import MediaQuery from "react-responsive"

import {connect} from "react-redux"

import {lightBlue100 as COLOR_ENABLED} from "material-ui/styles/colors"

import IconSmile from "material-ui/svg-icons/social/mood"
import IconUp from "material-ui/svg-icons/navigation/arrow-upward"
import IconDown from "material-ui/svg-icons/navigation/arrow-downward"
import IconTop from "material-ui/svg-icons/editor/vertical-align-top"
import IconBottom from "material-ui/svg-icons/editor/vertical-align-bottom"

import IconVisible from "material-ui/svg-icons/action/visibility"
import IconHidden from "material-ui/svg-icons/action/visibility-off"

import IconRemove from "material-ui/svg-icons/action/alarm-off"

import {ACTION} from "."

export const TaskPadEditor=(({todos=[], dispatch})=>(
	<List>
		<ListItem primaryText="任务"/>
		<Divider/>
	{
	todos.map(({content:task, hidden},i)=>(
		<ListItem key={i} primaryText={task}
			rightIconButton={
				<Wrapper>
					<Remover i={i} dispatch={dispatch}/>
					<Visibility i={i} dispatch={dispatch} visible={!hidden}/>
					<Order  i={i} dispatch={dispatch}/>
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

const Order=({i,dispatch})=>(
	<Wrapper>
		<MediaQuery minWidth={960}>
            <IconButton onClick={e=>dispatch(ACTION.TOP(i))}>
                <IconTop color={COLOR_ENABLED}/>
            </IconButton>
        </MediaQuery>
		<IconButton onClick={e=>dispatch(ACTION.UP(i))}>
            <IconUp color={COLOR_ENABLED}/>
        </IconButton>
		<IconButton onClick={e=>dispatch(ACTION.DOWN(i))}>
            <IconDown color={COLOR_ENABLED}/>
        </IconButton>
        <MediaQuery minWidth={960}>
		      <IconButton onClick={e=>dispatch(ACTION.BOTTOM(i))}>
                <IconBottom color={COLOR_ENABLED}/>
            </IconButton>
        </MediaQuery>
	</Wrapper>
)

const Visibility=({i,dispatch,visible,Icon=(!visible ? IconHidden : IconVisible),style})=>(
	<IconButton onClick={e=>dispatch(ACTION.TOGGLE_VISIBLE(i))} style={style}>
		<Icon color={COLOR_ENABLED}/>
	</IconButton>
)

const Remover=({i,dispatch, style})=>(
	<IconButton onClick={e=>dispatch(ACTION.REMOVE_BY_INDEX(i))} style={style}>
		<IconRemove color={COLOR_ENABLED}/>
	</IconButton>
)

const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)



import {getCurrentChildTasks} from "../../selector"
export default connect(state=>({todos:getCurrentChildTasks(state)}))(TaskPadEditor)
