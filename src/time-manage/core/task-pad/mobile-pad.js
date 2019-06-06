import React from "react"
import {List,ListItem,Tab} from "material-ui"

import SwipeableTabs from "components/swipe-tabs"
import TodoStatus from "./status"
import TaskTitle from "./title"

export default ({todos=[],current,days, knowledgeTasks, fieldsWithValue})=>(
	<SwipeableTabs index={current%7}
		tabs={days.map((day,i)=><Tab key={i} label={day} value={i}/>)}
		>
		{
			days.map((day,i)=>(
				<List key={i}>
					{
						todos.map(({toKnowledge, knowledge, days=[], content:task,dones=[],props})=>{
							const status={todo:task, day:i, done:-1!=dones.indexOf(i), current, fields:[]}	
							if(knowledge){
								status.knowledge=knowledge.id
								status.fields=fieldsWithValue(props[i], knowledge.fields)
							}
							return (
							<ListItem key={task}
								primaryText={<TaskTitle {...{toKnowledge,task}}/>}
								leftCheckbox={<TodoStatus {...status}/>}
								initiallyOpen={true}
								nestedItems={knowledgeTasks({days,dones,current})}
							/>
						)
					})
					}
				</List>
			))
		}
	</SwipeableTabs>
)