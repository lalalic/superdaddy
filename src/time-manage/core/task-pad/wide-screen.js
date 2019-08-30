import React from "react"
import {List,ListItem} from "material-ui/List"
import Divider from "material-ui/Divider"
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

		{todos.map(({toKnowledge,knowledge, days=[], content:task, dones=[], props},j)=>{
			return (
				<ListItem key={j}
					primaryText={<TaskTitle {...{toKnowledge,task}}/>}
					rightIconButton={
						<Wrapper>
						{[0,1,2,3,4,5,6].map(i=>{
							const status={todo:task, day:i, done:-1!=dones.indexOf(i), current, fields:[]}	
							if(knowledge){
								status.knowledge=knowledge.id
								status.fields=fieldsWithValue(props[i], knowledge.fields)
							}
							
							return (
								<span key={i} style={ITEM_STYLE}>
									<TodoStatus {...status}/>
								</span>
							)
						})}
						</Wrapper>
					}
					open={true}
					nestedItems={knowledgeTasks({days,dones,current})}
					/>
			)
		}).reduce((state,a,i)=>{
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
