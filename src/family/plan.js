import React, {Component} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,getContext,mapProps} from "recompose"
import {withFragment,withMutation} from "qili/tools/recompose"
import {graphql} from "react-relay"

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
import Checkbox from 'material-ui/Checkbox'

import CommandBar from "qili/components/command-bar"

import AppBar from "components/app-bar"
import Baby from "family/child"
import Knowledge from "knowledge"

export class Plan extends Component{
	render(){
		let {goals=[], months=[], caps=[],
			autoPlan,update,searchKnowledges,
			addMonthGoal,removeMonthGoal,addMonthTask,removeMonthTask}=this.props
		return (
			<div>
                <AppBar title={`年度目标，计划`}/>

				<YearGoal {...{goals,update,caps}}/>

				<Divider/>

				<MonthGoals {...{searchKnowledges,addMonthGoal,removeMonthGoal,addMonthTask,removeMonthTask,goals,months}}/>

				<CommandBar className="footbar"
					items={[
						"Back"
						,{
							action:"plan",
							label:"自动安排",
							icon:<IconAutoPlan/>,
							onSelect:autoPlan
						}
						]}
					/>
			</div>
		)
	}
}

class YearGoal extends Component{
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
		const {goals=[], caps=[], id}=this.props
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
		let {goals=[],update}=this.props
		if(goals.includes(cap)){
			goals=goals.filter(a=>a!=cap)
		}else{
			goals=[...goals,cap]
		}

		update({goals})
	}
}

class MonthGoals extends Component{
	state={
		month:new Date().getMonth()
	}
	render(){
		let current=new Date().getMonth()
		let {month}=this.state
		let {months=[], addMonthGoal,
			removeMonthGoal, addMonthTask, removeMonthTask,searchKnowledges}=this.props

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
							<MonthPlan {...months[month]} month={month}
								{...{addMonthTask, removeMonthTask,searchKnowledges}}/>
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
		let {months=[], removeMonthGoal}=this.props
        let {goals=[]}=months[m]||{}
        return (
            <span style={{display:"flex", flexWrap:"wrap",zoom:0.8}}>
                {goals.map(a=>
                    <Chip key={a}
                        children={a}
                        backgroundColor="transparent"
                        onRequestDelete={e=>removeMonthGoal(m,a)}/>
                )}
            </span>
        )
    }

    renderGoalSelector(m){
        let {search}=this.state
        let {goals=[],months=[], addMonthGoal}=this.props
        let {goals:used=[]}=months[m]||{}
        let unused=goals.filter(a=>!used.includes(a))
        if(unused.length==0)
            return null

        return <AutoComplete
            style={{width:"1em", marginLeft:10}}
			textFieldStyle={{width:"1em", fontSize:"smaller"}}
			dataSource={unused}
			hintText="..."
            filter={AutoComplete.noFilter}
            searchText={search}
			openOnFocus={true}
            underlineShow={false}
            onNewRequest={(text,i)=>{
                if(i!=-1){
                    addMonthGoal(m,unused[i])
                    this.setState({search:""})
                }else{

                }
            }}
            onUpdateInput={search=>this.setState({search})}
			/>
    }
}

const MonthPlan=compose(
	getContext({client:PropTypes.object}),
	mapProps(({client,...others})=>({
		knowledges:client.getAll("Knowledge"),
		...others,
	})),
)(class extends Component{
    state={
        search:""
    }
	render(){
        const {search}=this.state
		let searched=this.filter(search)
		const {knowledges=[], month, removeMonthTask, addMonthTask}=this.props
		searched=searched.filter(({id})=>!knowledges.find(a=>a==id))
        return (
            <List>
                <Subheader>
                    <center>
                        <AutoComplete
                            hintText="查询教程..."
							textFieldStyle={{fontSize:"smaller"}}
                            searchText={search}
                            onNewRequest={title=>this.searchKnowledge(title)}
                            dataSource={[]}/>
                    </center>
                </Subheader>
                {knowledges.map(({id,title})=>
                    <ListItem key={id}
                        primaryText={title}
						leftCheckbox={
							<Checkbox
								checked={true}
								onCheck={()=>removeMonthTask(month,id)}/>
						}
                        />
                )}

                {searched.map(({id, title})=>
                    <ListItem key={id}
                        primaryText={title}
						leftCheckbox={
							<Checkbox
								checked={false}
								onCheck={()=>addMonthTask(month,id)}/>
						}
                        />
                )}
            </List>
        )
	}

	filter(search){
		if(!search)
			return []

		const {entities:knowledges}=this.props
		let found=[]
		for(let id in knowledges){
			let knowledge=knowledges[id]
			if(knowledge.title.indexOf(search)!=-1){
				found.push(knowledge)
			}
			if(found.length==5)
				break
		}
		return  found
	}

    searchKnowledge(search){
		this.setState({search})
		if(search){
			this.props.searchKnowledges(search,goals)
		}
    }
})

export default compose(
	withFragment(graphql`
		fragment plan on Plan{
			caps
			goals
			months{
				goals
				knowledges{
					id
					title
				}
			}
		}
	`),
	withMutation(({child})=>({
		variables:{child},
		mutation: graphql`
			mutation plan_update_Mutation($child:ObjectID, $plan:JSON){
				plan_update(_id: $child, plan:$plan){
					 ...plan
				}
			}
		`,
	})),
	withMutation(({child})=>({
		name:"autoPlan",
		variables:{child},
		mutation: graphql`
			mutation plan_auto_Mutation($child:ObjectID){
				plan_auto(_id: $child){
					 ...plan
				}
			}
		`,
	})),
	mapProps(({mutate, autoPlan,data:{goals,months,caps},...others})=>({
		...others,
		caps:caps||[],
		goals:goals||[],
		months:months||[],
		autoPlan,
		update(data){
			return mutate({plan:data})
		},
		removeMonthGoal(month,goal){
			let {goals=[]}=(months[month]=months[month]||{})
			goals=goals.filter(a=>a!=goal)
			months=[...months]
			months[month]={...months[month], goals}
			return mutate({plan:{months}})
		},

		addMonthGoal(month,goal){
			let {goals=[]}=(months[month]=months[month]||{})
			if(goals.includes(goal))
				return
			goals=[...goals,goal]
			months=[...months]
			months[month]={...months[month], goals}
			return mutate({plan:{months}})
		},

		removeMonthTask(month,knowledge){
			let {knowledges=[]}=(months[month]=(months[month]||{}))
			knowledges=knowledges.filter(a=>a!=knowledge)
			months=[...months]
			months[month]={...months[month], knowledges}
			return mutate({plan:{months}})
		},

		addMonthTask(month,knowledge){
			let {knowledges=[]}=(months[month]=months[month]||{})
			if(knowledges.includes(knowledge))
				return
			knowledges=[...knowledges,knowledge]
			months=[...months]
			months[month]={...months[month], knowledges}
			return mutate({plan:{months}})
		},
		searchKnowledges(title, caps){

		}
	})),
)(Plan)
