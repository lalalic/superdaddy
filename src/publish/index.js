import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext} from "recompose"
import {connect} from "react-redux"
import {withMutation} from "qili/tools/recompose"

import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader} from "material-ui"

import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPrint from "material-ui/svg-icons/action/print"
import IconView from "material-ui/svg-icons/action/pageview"

import AppBar from "components/app-bar"
import CommandBar from "qili/components/command-bar"

import Assembler from "./assemble"

export {default as Publishes} from "./list"

export class Publisher extends Component{
	state={
		template:"light", 
		copies:1,
		bookName: `我的${new Date().getFullYear()-1}`,
		startAt:(d=>{d.setFullYear(d.getFullYear()-1);return d})(new Date()),
		endAt: new Date()
	}

    render(){
		const {child, preview, publish, toList}=this.props
		const {template, copies, bookName, startAt, endAt}=this.state
        return(
            <div>
				<AppBar title={`出版${child.name}的成长历程,留下永久的回忆`}/>
				<center>
					<TextField
						floatingLabelText="书名"
						value={bookName}
						onChange={({target:{value}})=>this.setState({bookName:value})}
						/>

					<DatePicker
						floatingLabelText="自从"
						autoOk={true} 
						value={startAt}
						onChange={({target:{date}})=>this.setState({startAt:date})}
						mode="landscape"/>

					<DatePicker
						floatingLabelText="结束时间"
						autoOk={true} 
						value={endAt}
						onChange={({target:{date}})=>this.setState({endAt:date})}
						mode="landscape"/>

					<TextField
						floatingLabelText="打印多少本"
						value={copies}
						onChange={({target:{value}})=>this.setState({copies:value})}
						type="number"/>
				</center>
				<GridList style={{padding:10}} padding={10}>
					<Subheader>选择出版模板</Subheader>

					{"light,dark,modern,gift".split(",").map(a=>(
						<GridTile key={a} title={a}
							actionIcon={<IconButton onClick={e=>this.setState({template:a})}>
									{template==a ?
										<IconSelected hoverColor="blue" color="yellow"/> :
										<IconUnSelected hoverColor="blue" color="white"/>
									}
								</IconButton>}>
							<div style={{textAlign:"center"}}>
								<img src={`images/template/${a}.jpg`}/>
							</div>
						</GridTile>
					))}
				</GridList>
                <CommandBar className="footbar"
                    items={["Back",
						{
							action:"Preview",
							label:"预览",
							onSelect:e=>preview({...this.state}),
							icon:<IconView/>
						},
						{
							action:"Print",
							label:"出版",
							onSelect:e=>publish({...this.state}),
							icon:<IconPrint/>
						},
						{
							action:"history",
							label:"出版列表",
							onSelect:toList,
							icon:<IconPrint/>
						}
						]}/>
            </div>
        )
    }
}

export default compose(
	getContext({
		client: PropTypes.object,
	}),
	connect((state,{client})=>({
		child: client.get(state.superdaddy.current)
	}),(dispatch,{child})=>({
		preview: info=>()=>{
			info.child=child
			return new Assembler(info)
			.assemble()
			.then(docx=>docx.save(`${child.name}.docx`))
		}
	})),
	
	withMutation(({child:{id}, })=>({
		variables:{
			child:id
		},
		mutation: graphql`
			mutation publish_publish_Mutation($template:String, $startAt:Date, $endAt:Date, $child:ObjectID, $copies: Int=1, $bookName:String){
				publish_create(template:$template, from:$startAt, to:$endAt, child:$child, copies: $copies, name:$bookName){
					id
					createdAt
				}
			}
		`,
	}))
)(Publisher)
