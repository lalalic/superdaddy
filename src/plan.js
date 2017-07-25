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
import Checkbox from 'material-ui/Checkbox'

import {UI,compact} from 'qili-app'
import {connect} from "react-redux"
import AppBar from "./components/app-bar"
import {getChildPlan, getKnowledge, getKnowledges, getCaps} from "./selector"

import Baby from "./baby"
import Knowledge from "./knowledge"

const {CommandBar}=UI

const ACTION={
	PLAN: (child,pending)=>(dispatch,getState)=>{
		 const plan=getChildPlan(getState(),child)
		 return Baby.ACTION.CHANGE(child, "plan", {...plan, ...pending})(dispatch,getState)
	},
	REMOVE_MONTH_GOAL:(child,month,goal)=>(dispatch,getState)=>{
		 const plan=getChildPlan(getState(),child)
		 let {months=[]}=plan
		 let {goals=[]}=(months[month]=months[month]||{})
		 goals=goals.filter(a=>a!=goal)
		 months=[...months]
		 months[month]={...months[month], goals}
		 return Baby.ACTION.CHANGE(child, "plan", {...plan, months})(dispatch,getState)
	},
	ADD_MONTH_GOAL:(child,month,goal)=>(dispatch,getState)=>{
		 const plan=getChildPlan(getState(),child)
		 let {months=[]}=plan
		 let {goals=[]}=(months[month]=months[month]||{})
		 goals=[...goals,goal]
		 months=[...months]
		 months[month]={...months[month], goals}
		 return Baby.ACTION.CHANGE(child, "plan", {...plan, months})(dispatch,getState)
	},
	REMOVE_MONTH_KNOWLEDGE:(child,month,knowledge)=>(dispatch,getState)=>{
		 const plan=getChildPlan(getState(),child)
		 let {months=[]}=plan
		 let {knowledges=[]}=(months[month]=(months[month]||{}))
		 knowledges=knowledges.filter(({_id})=>_id!=knowledge)
		 months=[...months]
		 months[month]={...months[month], knowledges}
		 return Baby.ACTION.CHANGE(child, "plan", {...plan, months})(dispatch,getState)
	},
	ADD_MONTH_KNOWLEDGE:(child,month,knowledge)=>(dispatch,getState)=>{
		 const state=getState()
		 const plan=getChildPlan(state,child)
		 let {months=[]}=plan
		 let {knowledges=[]}=(months[month]=months[month]||{})
		 knowledges=[...knowledges,compact(getKnowledge(state,knowledge), "_id","title","props")]
		 months=[...months]
		 months[month]={...months[month], knowledges}
		 return Baby.ACTION.CHANGE(child, "plan", {...plan, months})(dispatch,getState)
	},
	SEARCH_KNOWLEDGE:(child, filter, goals, done)=>(dispatch,getState)=>{
		 return Knowledge.ACTION.FETCH({limit:3}, done)(dispatch,getState)
	},
	AUTO_PLAN:(child)=>(dispatch,getState)=>{
		const state=getState()
		const plan=getChildPlan(state,child)
		const caps=getCaps(state)
		let {goals=[], months=[]}=plan
		
		let month=new Date().getMonth()
		let count=12-month
		if(goals.length==0){
			goals=caps.slice(0,Math.floor(count/3))
		}
		
		let pending=new Array(count)
		pending.fill(1)
		pending.forEach((a,i)=>{
			let {goals:currentGoals=[],knowledges=[]}=months[i+month]||{}
			if(currentGoals.length==0)
				currentGoals[0]=goals[i%goals.length]
			months[i+month]={goals:currentGoals, knowledges}
		})
		
		return Baby.ACTION.CHANGE(child, "plan", {...plan, months:[...months]})(dispatch,getState)
			.then(a=>{
				let all=pending.map((a,i)=>{
					return new Promise((resolve, reject)=>{
						let {goals,knowledges=[]}=months[i+month]
						if(knowledges.length==0){
							ACTION.SEARCH_KNOWLEDGE(child, undefined, goals, data=>{
								months[i+month]={goals, knowledges:data}
								resolve()
							})(dispatch, getState)
						}else{
							resolve()
						}
					})
				})
				return Promise.all(all)
			})
			.then(a=>{
				return Baby.ACTION.CHANGE(child, "plan", {...plan, months:[...months]})(dispatch,getState)
			})
	}
}

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
 */
export class Plan extends Component{
	static defaultProps={
		goals:"专注力".split(","),
        search:""
	}
	render(){
		let {year=new Date().getFullYear(), goals, dispatch, id}=this.props
		let years=[year].map(y=><MenuItem key={year} value={year} primaryText={year}/>)
		return (
			<div>
                <AppBar title={`年度目标，计划`}/>
				<center>
					<SelectField hintText="年" value={year}>
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
								dispatch(ACTION.AUTO_PLAN(id))
							}
						}
						]}
					/>
			</div>
		)
	}
}

const YearGoal=connect(state=>({caps:getCaps(state)}))(class  extends Component{
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
		let {goals=[], dispatch, id}=this.props
		if(goals.includes(cap)){
			goals=goals.filter(a=>a!=cap)
		}else{
			goals=[...goals,cap]
		}

		dispatch(ACTION.PLAN(id,{goals}))
	}
})

class MonthGoals extends Component{
	state={
		month:new Date().getMonth()
	}
	render(){
		let current=new Date().getMonth()
		let {month}=this.state
		let {goals,dispatch, id, months=[]}=this.props

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
							<MonthPlan {...months[month]} dispatch={dispatch} id={id} month={month}/>
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
		let {months=[], dispatch, id}=this.props
        let {goals=[]}=months[m]||{}
        return (
            <span style={{display:"flex", flexWrap:"wrap",zoom:0.8}}>
                {goals.map(a=>
                    <Chip key={a}
                        children={a}
                        backgroundColor="transparent"
                        onRequestDelete={e=>dispatch(ACTION.REMOVE_MONTH_GOAL(id,m,a))}/>
                )}
            </span>
        )
    }

    renderGoalSelector(m){
        let {search}=this.state
        let {goals=[],months=[], dispatch, id}=this.props
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
                    dispatch(ACTION.ADD_MONTH_GOAL(id,m,unused[i]))
                    this.setState({search:""})
                }else{

                }
            }}
            onUpdateInput={search=>this.setState({search})}
			/>
    }
}

const MonthPlan=connect(state=>({entities:getKnowledges(state)}))(class extends Component{
    state={
        search:""
    }
	render(){
        const {search}=this.state
		let searched=this.filter(search)
		const {goals,knowledges=[], dispatch, id:child, month}=this.props
		searched=searched.filter(({_id})=>!knowledges.find(a=>a._id===_id))
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
                {knowledges.map(({_id,title})=>
                    <ListItem key={_id}
                        primaryText={title}
						leftCheckbox={
							<Checkbox 
								checked={true} 
								onCheck={()=>dispatch(ACTION.REMOVE_MONTH_KNOWLEDGE(child,month,_id))}/>
						}
                        />
                )}

                {searched.map(({_id, title})=>
                    <ListItem key={_id}
                        primaryText={title}
						leftCheckbox={
							<Checkbox 
								checked={false}
								onCheck={()=>dispatch(ACTION.ADD_MONTH_KNOWLEDGE(child,month,_id))}/>
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
			const {dispatch, goals, id}=this.props
			dispatch(ACTION.SEARCH_KNOWLEDGE(id,search,goals))
		}
    }
})

export default Plan
