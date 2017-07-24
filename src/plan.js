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
import {UI} from 'qili-app'
import {connect} from "react-redux"


import {ACTION} from "./baby"

const {CommandBar}=UI

export class Plan extends Component{
	static defaultProps={
		goals:"专注力".split(",")
	}
	render(){
		let {year=new Date().getFullYear(), goals, dispatch}=this.props
		let years=[year].map(y=><MenuItem key={year} value={year} primaryText={year}/>)
		return (
			<div>
				<center>
					<SelectField>
					{years}
					</SelectField>
				</center>
				
				<YearGoal {...this.props}/>

				<Divider/>
				
				<MonthGoals {...this.props}/>
				
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
		let {month, goal}=this.state
		let {goals}=this.props
		let monthGoals=(this.props[month]||{}).goals||[]
		let goalSelector=null
		if(goals.length>0){
			goalSelector=<AutoComplete 
				textFieldStyle={{textAlign:"center",width:"5em"}}
				dataSource={goals} 
				hintText="...目标"
				openOnFocus={true}
				/>
		}
		let steps=new Array(12)
		steps.fill(1)
		steps=steps.map((a,i)=>{
			if(i==month){
				return (
					<Step key={i}>
						<StepLabel>
							<span style={{marginRight:10}}>月</span>
							{goalSelector}
							<span>{monthGoals.join(",")}</span>
						</StepLabel>
						<StepContent>
							<MonthPlan goal={goal}/>
						</StepContent>
					</Step>
				)
			}else{
				return (
					<Step key={i} 
						disabled={i<current}
						onTouchTap={e=>i>=current && this.setState({month:i})}>
						<StepLabel>月</StepLabel>
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
}

class MonthPlan extends Component{
	render(){
		const {goal}=this.props
		return (
			<div></div>
		)
	}
}

export default Plan