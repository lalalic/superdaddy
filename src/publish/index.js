import React, {Component,PropTypes} from "react"
import {UI} from "qili-app"
import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader} from "material-ui"
import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'

import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPrint from "material-ui/svg-icons/action/print"
import IconView from "material-ui/svg-icons/action/pageview"

import dbPublish from "db/publish"
import AppBar from "components/app-bar"

import {getCurrentChild} from "$/selector"

import History from "./list"

import Assembler from "./assemble"

const ACTION={
	PUBLISH: info=>(dispatch,getState)=>{
		let state=getState()
		const child=getCurrentChild(state)
		info.child={_id:child._id, name: child.name}
		dbPublish.upsert(info)
		return {}
	},
	PREVIEW: info=>(dispatch, getState)=>{
		let state=getState()
		const child=getCurrentChild(state)
		info.child=child
		new Assembler(info)
			.assemble()
			.then(docx=>docx.save(`${child.name}.docx`))

		return {}
	}
}


export default class Publisher extends Component{
	state={template:"light", copy:1}

    render(){
		const {child, dispatch}=this.props
		const {template}=this.state
		const {router}=this.context
        return(
            <div>
				<AppBar title={`出版${child}的成长历程,留下永久的回忆`}/>
				<center>
					<TextField
						floatingLabelText="书名"
						/>

					<DatePicker
						floatingLabelText="自从"
						autoOk={true} mode="landscape"/>

					<DatePicker
						floatingLabelText="结束时间"
						autoOk={true} mode="landscape"/>

					<TextField
						floatingLabelText="打印多少本"
						defaultValue={1}
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
                <UI.CommandBar className="footbar"
                    items={["Back",
						{
							action:"Preview",
							label:"预览",
							onSelect:e=>dispatch(ACTION.PREVIEW({...this.state})),
							icon:<IconView/>
						},
						{
							action:"Print",
							label:"出版",
							onSelect:e=>dispatch(ACTION.PUBLISH({...this.state})),
							icon:<IconPrint/>
						},
						{
							action:"history",
							label:"出版列表",
							onSelect:e=>router.push("/publish/list"),
							icon:<IconPrint/>
						}
						]}/>
            </div>
        )
    }

	static contextTypes={router:PropTypes.object}

	static List=History
}
