import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext,withProps} from "recompose"
import {connect} from "react-redux"
import {withMutation} from "qili/tools/recompose"

import pick from "lodash.pick"

import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader} from "material-ui"

import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPublish from "material-ui/svg-icons/action/print"
import IconPreview from "material-ui/svg-icons/action/pageview"
import IconRemove from "material-ui/svg-icons/action/alarm-off"


import AppBar from "components/app-bar"
import CommandBar from "qili/components/command-bar"

import Assembler from "./assemble"

export {default as Publishes} from "./list"

export class Publisher extends Component{
	state={
		template:"light", 
		copies:1,
		name: `我的${new Date().getFullYear()-1}`,
		from:(d=>{d.setFullYear(d.getFullYear()-1);return d})(new Date()),
		to: new Date(),
		...this.props.info
	}

    render(){
		const {id, child, preview, published, create,update,remove, toInfo,toList}=this.props
		const {template, copies, name, from, to}=this.state
		const actions=["Back",
			{
				action:"Preview",
				label:"预览",
				onSelect:e=>preview({...this.state}),
				icon:<IconPreview/>
			}
		]
		
		if(id){
			actions.push({
				action:"Save",
				label:"保存",
				onSelect:e=>update({...this.state})
			})
			
			actions.push({
				action:"Remove",
				label:"删除",
				onSelect:()=>remove().then(toList),
				icon:<IconRemove/>
			})
			
			actions.push({
				action:"Publish",
				label:"出版",
				onSelect:()=>published().then(toList),
				icon:<IconPublish/>
			})
		}else{
			actions.push({
				action:"Save",
				label:"创建",
				onSelect:e=>create({...this.state}).then(({id})=>toInfo(id)),
			})
		}
		
        return(
            <div>
				<AppBar title={`出版${child.name}的成长历程,留下永久的回忆`} switchable={!!!id}/>
				<center>
					<TextField
						floatingLabelText="书名"
						value={name}
						onChange={(e,name)=>this.setState({name})}
						/>

					<DatePicker
						floatingLabelText="自从"
						autoOk={true} 
						value={from}
						onChange={(e,from)=>this.setState({from})}
						mode="landscape"/>

					<DatePicker
						floatingLabelText="结束时间"
						autoOk={true} 
						value={to}
						onChange={(e,to)=>this.setState({to})}
						mode="landscape"/>

					<TextField
						floatingLabelText="打印多少本"
						value={copies}
						onChange={(e,copies)=>this.setState({copies})}
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
                <CommandBar className="footbar" items={actions}/>
            </div>
        )
    }
}

export default compose(
	getContext({
		client: PropTypes.object,
	}),
	
	withProps(({client,id})=>{
		let info=id ? pick(client.get(id),"template,copies,name,from,to".split(",")) : {}
		if(info.from)
			info.from=new Date(info.from)
		if(info.to)
			info.to=new Date(info.to)
		return {info}
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
	
	withMutation(({child})=>({
		name:"create",
		promise:true,
		variables:{child:child.id},
		mutation: graphql`
			mutation publish_create_Mutation($template:String, $from:Date, $to:Date, $child:ObjectID, $copies: Int=1, $name:String){
				publish_create(template:$template, from:$from, to:$to, child:$child, copies: $copies, name:$name){
					id
					name
					template
					from
					to
					copies
					status
				}
			}
		`,
	})),
	
	withMutation(({id})=>({
		name:"update",
		patch4: id,
		variables:{id},
		mutation: graphql`
			mutation publish_update_Mutation($id:ObjectID, $template:String, $from:Date, $to:Date, $child:ObjectID, $copies: Int=1, $name:String){
				publish_update(_id:$id, template:$template, from:$from, to:$to, child:$child, copies: $copies, name:$name)
			}
		`,
	})),
	
	withMutation(({id})=>({
		name:"remove",
		promise:true,
		variables:{id},
		mutation: graphql`
			mutation publish_remove_Mutation($id:ObjectID){
				publish_remove(_id:$id)
			}
		`,
	})),

	withMutation(({id})=>({
		name:"published",
		promise:true,
		variables:{id},
		mutation: graphql`
			mutation publish_done_Mutation($id:ObjectID){
				publish_done(_id:$id)
			}
		`,
	})),
)(Publisher)
