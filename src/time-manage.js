import React, {Component, PropTypes} from "react"
import {TextField,FlatButton} from "material-ui"
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconSmile from "material-ui/svg-icons/social/mood"


const ACTION={
}

export const TimeManage=({})=>(
    <div>
        <TodoEditor/>

        <TaskPad/>

        <ScorePad/>
    </div>
)

const TodoEditor=({})=>(
    <div className="grid">
        <TextField floatingLabelText="任务" />
        <FlatButton label="添加"/>
    </div>
)

const TaskPad=({tasks=["阅读","钢琴"]})=>(
    <Table>
        <TableHeader   displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>任务\星期</TableHeaderColumn>
            <TableHeaderColumn>一</TableHeaderColumn>
            <TableHeaderColumn>二</TableHeaderColumn>
            <TableHeaderColumn>三</TableHeaderColumn>
            <TableHeaderColumn>四</TableHeaderColumn>
            <TableHeaderColumn>五</TableHeaderColumn>
            <TableHeaderColumn>六</TableHeaderColumn>
            <TableHeaderColumn>日</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
            {
            tasks.map((task,i)=>(
                <TableRow key={i}>
                    <TableRowColumn>{task}</TableRowColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
            ))
            }
        </TableBody>
    </Table>
)

const ScorePad=({score, goal})=>(
    <div>
        <h3>{score}<IconSmile color="yellow"/></h3>
        <h3>你的目标是:{goal}</h3>
    </div>
)

export default TimeManage
