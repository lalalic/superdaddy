import React, {Component, PropTypes} from "react"
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import Chip from 'material-ui/Chip'
import {blue300 as COLOR_SELECTED, indigo900 as COLOR_UNSELECTED} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import Divider from "material-ui/Divider"
import AutoComplete from 'material-ui/AutoComplete'
import IconAutoPlan from "material-ui/svg-icons/editor/linear-scale"
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import {UI} from 'qili-app'
import {connect} from "react-redux"
import AppBar from "./components/app-bar"


import {ACTION} from "./baby"

const {CommandBar}=UI

/**
{
    plan: {
        year:2017,
        goals:[],
        months:[
            {
                goals:[],
                knowledges:[]
            }
        ]
    }
}
 *
 *
 *
 *
 */
export class Plan extends Component{
	static defaultProps={
		goals:"专注力".split(","),
        search:""
	}
	render(){
		let {year=new Date().getFullYear(), goals, dispatch}=this.props
		let years=[year].map(y=><MenuItem key={year} value={year} primaryText={year}/>)
		return (
			<div>
                <AppBar title={`年度计划`}/>
				<center>
					<SelectField hintText="年">
					{years}
					</SelectField>
				</center>

				<YearGoal {...this.props}/>

				<Divider/>

				<MonthGoals  months={[,,,,,,{goals:["专注力","记忆力"],knowledges:[{id:"1",title:"how to"}]}]} {...this.props}/>

				<CommandBar className="footbar"
					items={[
						"Back"
						,{
							action:"plan",
							label:"自动安排",
							icon:<IconAutoPlan/>,
							onSelect:a=>{
								dispatch(ACTION.AUTO_PLAN())
							}
						}
						]}
					/>
			</div>
		)
	}
}

const YearGoal=connect()(class  extends Component{
	static defaultProps={
		caps:"专注力,记忆力".split(",")
	}
	render(){
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
		const {goals=[], caps=[]}=this.props
		return (
			<div style={style.wrapper}>
			{caps.map(cap=>
				<Chip key={cap}
					backgroundColor={goals.includes(cap) ? COLOR_SELECTED : ""}
					onTouchTap={e=>this.toggle(cap)}
					style={style.chip}>
					{cap}
				</Chip>)
			}
			</div>
		)
	}

	toggle(cap){
		let {goals=[], dispatch}=this.props
		if(goals.include(cap)){
			goals=goals.filter(a=>a!=cap)
		}else{
			goals=[...goals,cap]
		}

		dispatch(ACTION.PLAN({goals}))
	}
})

class MonthGoals extends Component{
	state={
		month:new Date().getMonth()
	}
	render(){
		let current=new Date().getMonth()
		let {month}=this.state
		let {goals,dispatch}=this.props

		let steps=new Array(12)
		steps.fill(1)
		steps=steps.map((a,i)=>{
			if(i==month){
				return (
					<Step key={i}>
						<StepLabel>
							<span>月</span>
                            {this.renderMonthGoals(month)}
                            {this.renderGoalSelector(month)}
						</StepLabel>
						<StepContent>
							<MonthPlan {...this.props.months[month]} dispatch={dispatch}/>
						</StepContent>
					</Step>
				)
			}else{
				return (
					<Step key={i}
						disabled={i<current}
						onTouchTap={e=>i>=current && this.setState({month:i})}>
						<StepLabel>
                            <span>月</span>
                            {this.renderMonthGoals(i)}
                        </StepLabel>
					</Step>
				)
			}
		})

		return (
			<Stepper activeStep={month} orientation="vertical" linear={false}>
				{steps}
			</Stepper>
		)
	}

    renderMonthGoals(m){
        let {goals=[]}=this.props.months[m]||{}
        return (
            <span style={{display:"flex", flexWrap:"wrap",zoom:0.8}}>
                {goals.map(a=>
                    <Chip key={a}
                        children={a}
                        backgroundColor="transparent"
                        onRequestDelete={e=>dispatch(ACTION.REMOVE_MONTH_GOAL(m,a))}/>
                )}
            </span>
        )
    }

    renderGoalSelector(m){
        let {search}=this.state
        let {goals=[],months=[]}=this.props
        let {goals:used=[]}=months[m]||{}
        let unused=goals.filter(a=>!used.includes(a))
        if(unused.length==0)
            return null

        return <AutoComplete
            style={{width:"1em", marginLeft:10}}
			textFieldStyle={{width:"1em"}}
			dataSource={unused}
			hintText="..."
            filter={AutoComplete.noFilter}
            searchText={search}
			openOnFocus={true}
            underlineShow={false}
            onNewRequest={(text,i)=>{
                if(i!=-1){
                    dispatch(ACTION.ADD_MONTH_GOAL(m,unused[i]))
                    this.setState({search:""})
                }else{

                }
            }}
            onUpdateInput={search=>this.setState({search})}
			/>
    }
}

class MonthPlan extends Component{
    state={
        search:"",
        searched:[]
    }
	render(){
        const {search, searched=[]}=this.state
		const {goals,knowledges=[], dispatch}=this.props
        return (
            <List>
                <Subheader>
                    <center>
                        <AutoComplete
                            hintText="查询教程..."
                            searchText={search}
                            onUpdateInput={search=>this.setState({search})}
                            onNewRequest={title=>this.searchKnowledge(title)}
                            dataSource={[]}/>
                    </center>
                </Subheader>
                {knowledges.map(({id,title})=>
                    <ListItem key={id}
                        primaryText={title}

                        />
                )}

                {searched.map(({title})=>
                    <ListItem key={id}
                        primaryText={title}

                        />
                )}
            </List>
        )
	}

    searchKnowledge(title){

    }
}

export default Plan
