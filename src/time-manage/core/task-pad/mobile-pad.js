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
						todos.map(({toKnowledge, knowledge, days=[], content:task,dones=[],fields,props})=>(
							<ListItem key={task}
								primaryText={<TaskTitle {...{toKnowledge,task}}/>}
								leftCheckbox={<TodoStatus
												todo={task}
												knowledge={knowledge ? knowledge.id : undefined}
												done={-1!=dones.indexOf(i)}
												day={i}
												current={current}
												fields={fieldsWithValue(i, fields, props)}/>}
								initiallyOpen={true}
								nestedItems={knowledgeTasks({days,dones,current})}
							/>
						))
					}
				</List>
			))
		}
	</SwipeableTabs>
)