import React from "react"
const TaskTitle=({toKnowledge,task})=>(
	<span onClick={toKnowledge} style={{color:toKnowledge ? "blue" : ""}}>
		{task}
	</span>
)

export default TaskTitle
