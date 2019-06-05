import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {connect} from "react-redux"
import {compose,getContext,mapProps} from "recompose"
import {withFragment,withMutation, CommandBar} from "qili-app"
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

import AppBar from "components/app-bar"
import Baby from "family/child"
import Knowledge from "knowledge"

export class Plan extends Component{
	render(){
		let {goals, months, caps,pendingKnowledges,
			autoPlan,setGoals,searchKnowledges,
			addMonthGoal,removeMonthGoal,addMonthTask,removeMonthTask}=this.props
		return (
			<Fragment>
                <div style={{flex:"none"}}>
                    <AppBar title={`年度目标，计划`}/>
                </div>

                <div style={{flex:"1 1 100%", overflowY:"scroll", overflowY:"scroll"}}>
                    <YearGoal {...{goals,setGoals,caps}}/>

    				<Divider/>

    				<MonthGoals {...{pendingKnowledges,searchKnowledges,addMonthGoal,removeMonthGoal,addMonthTask,removeMonthTask,goals,months}}/>
                </div>

                <CommandBar style={{flex:"none"}}
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
			</Fragment>
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
		let {goals,setGoals}=this.props
		if(goals.includes(cap)){
			goals=goals.filter(a=>a!=cap)
		}else{
			goals=[...goals,cap]
		}

		setGoals({goals})
	}
}

class MonthGoals extends Component{
	state={
		month:new Date().getMonth()
	}
	render(){
		let current=new Date().getMonth()
		let {month}=this.state
		let {months, addMonthGoal,pendingKnowledges,
			removeMonthGoal, addMonthTask, removeMonthTask,searchKnowledges}=this.props

		let steps=new Array(12).fill(1).map((a,i)=>{
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
								{...{pendingKnowledges,addMonthTask, removeMonthTask,searchKnowledges}}/>
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
		let {months, removeMonthGoal}=this.props
        let {goals}=months[m]
        return (
            <span style={{display:"flex", flexWrap:"wrap",zoom:0.8}}>
                {goals.map(a=>
                    <Chip key={a}
                        children={a}
                        backgroundColor="transparent"
                        onRequestDelete={e=>removeMonthGoal({month:m,goal:a})}/>
                )}
            </span>
        )
    }

    renderGoalSelector(m){
        let {search}=this.state
        let {goals,months, addMonthGoal}=this.props
        let {goals:used}=months[m]
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
                    addMonthGoal({month:m,goal:unused[i]})
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
		pending:this.myPendingKnowledges()
    }

	myPendingKnowledges(){
		const {goals, pendingKnowledges}=this.props
		return pendingKnowledges.filter(({category})=>{
			return goals.reduce((b,a)=>b&&category.includes(a),true)
		})
	}

	render(){
        const {search,pending}=this.state
		const {month, knowledges,removeMonthTask, addMonthTask}=this.props
		let searched=pending.filter(({id})=>!knowledges.find(a=>a.id==id)).slice(0,5)
        return (
            <List>
                <Subheader>
                    <center>
                        <AutoComplete
                            hintText="查询教程..."
							textFieldStyle={{fontSize:"smaller"}}
							filter={(searchText,key)=>!searchText || key.indexOf(searchText) !== -1}
                            searchText={search}
							openOnFocus={true}
							onUpdateInput={title=>this.setState({search:title})}
                            onNewRequest={(title,i)=>{
								if(i==-1){
									this.searchKnowledge(title)
								}else{
									addMonthTask({month, knowledge:searched[i].id})
								}
							}}
							dataSourceConfig={{text:"title",value:"id"}}
                            dataSource={searched}/>
                    </center>
                </Subheader>
                {knowledges.map(({id,title})=>
                    <ListItem key={id}
                        primaryText={title}
						leftCheckbox={
							<Checkbox
								checked={true}
								onCheck={()=>removeMonthTask({month,knowledge:id})}/>
						}
                        />
                )}
            </List>
        )
	}

    searchKnowledge(search){
		this.setState({search},()=>{
			const {searchKnowledges,goals}=this.props
			const {search}=this.state
			searchKnowledges(search,goals)
				.then(pending=>this.setState({pending}))
		})
    }
}

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
			pendingKnowledges{
				id
				category
				title
			}
		}
	`),
	withMutation(({child})=>({
		name:"removeMonthGoal",
		variables:{child},
		mutation: graphql`
			mutation plan_removeMonthGoal_Mutation($child:ObjectID, $month:Int, $goal:String){
				plan_monthgoal_remove(_id: $child, goal:$goal, month:$month){
					 months{
						goals
						knowledges{
							id
							title
						}
					}
				}
			}
		`,
	})),
	withMutation(({child})=>({
		name:"addMonthGoal",
		variables:{child},
		mutation: graphql`
			mutation plan_addMonthGoal_Mutation($child:ObjectID, $month:Int, $goal:String){
				plan_monthgoal_add(_id: $child, goal:$goal, month:$month){
					 months{
						goals
						knowledges{
							id
							title
						}
					}
				}
			}
		`,
	})),
	withMutation(({child})=>({
		name:"removeMonthTask",
		variables:{child},
		mutation: graphql`
			mutation plan_removeMonthTask_Mutation($child:ObjectID, $month:Int, $knowledge:ObjectID){
				plan_monthtask_remove(_id: $child, knowledge:$knowledge, month:$month){
					 months{
						goals
						knowledges{
							id
							title
						}
					}
				}
			}
		`,
	})),
	withMutation(({child})=>({
		name:"addMonthTask",
		variables:{child},
		mutation: graphql`
			mutation plan_addMonthTask_Mutation($child:ObjectID, $month:Int, $knowledge:ObjectID){
				plan_monthtask_add(_id: $child, knowledge:$knowledge, month:$month){
					 months{
						goals
						knowledges{
							id
							title
						}
					}
				}
			}
		`,
	})),
	withMutation(({child})=>({
		name:"setGoals",
		variables:{child},
		mutation: graphql`
			mutation plan_updategoals_Mutation($child:ObjectID, $goals:[String]){
				plan_update_goals(_id: $child, goals:$goals){
					 goals
					 pendingKnowledges{
						id
						category
						title
					}
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
	getContext({client:PropTypes.object}),
	mapProps(({data:{goals,months,caps,pendingKnowledges},client,child,...others})=>{
		return {
			...others,
			goals,months,caps,
			pendingKnowledges,
			searchKnowledges(title, caps){
				return client.runQL({
					query:graphql`
						query plan_knowledge_Query($title:String, $caps:[String],$first:Int=5){
							knowledges(title:$title, categories:$caps,first:$first){
								edges{
									node{
										id
										title
									}
								}
							}
						}
					`,
					id:"plan_knowledge_Query",
					variables:{child,title,caps}
				}).then(({data:{knowledges}})=>({knowledges:knowledges.edges.map(a=>a.node)}))
			}
		}
	}),
)(Plan)
