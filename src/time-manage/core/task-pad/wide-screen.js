import React from "react"
import {List,ListItem,Divider} from "material-ui"
import TodoStatus from "./status"
import TaskTitle from "./title"

export default (({todos=[],current,days, knowledgeTasks, fieldsWithValue})=>(
	<List>
		<ListItem
			primaryText="任务\星期"
			rightIconButton={
				<Wrapper>
					{days.map((a,i)=><span key={i} style={ITEM_STYLE}>{a}</span>)}
				</Wrapper>
			}
		/>
		<Divider/>

		{todos.map(({toKnowledge, days=[], content:task, dones=[], fields, props},i)=>(
			<ListItem key={i}
				primaryText={<TaskTitle {...{toKnowledge,task}}/>}
				rightIconButton={
					<Wrapper>
					{[0,1,2,3,4,5,6].map(a=>(
						<span key={a} style={ITEM_STYLE}>
							<TodoStatus
								todo={task}
								done={-1!=dones.indexOf(a)}
								day={a}
								current={current}
								fields={fieldsWithValue(a, fields, props)}
								/>
						</span>
					))}
					</Wrapper>
				}
				open={true}
				nestedItems={knowledgeTasks({days,dones,current})}
				/>
		)).reduce((state,a,i)=>{
			state.push(a)
			state.push(<Divider key={`_${i}`}/>)
			return state
		},[])}
	</List>
))

const Wrapper=({onKeyboardFocus,...others})=>(<span {...others}/>)
const ITEM_STYLE={
	display:"inline-block",
	width:60,
	textAlign:"center",
	marginTop:16,
	marginBottom:16
}
