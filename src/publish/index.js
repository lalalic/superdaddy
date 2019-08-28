import React, {Component,Fragment} from "react"
import PropTypes from "prop-types"

import {compose, getContext,withProps,setPropTypes} from "recompose"

import pick from "lodash.pick"

import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader} from "material-ui"

import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPublish from "material-ui/svg-icons/action/print"
import IconPreview from "material-ui/svg-icons/action/pageview"
import IconRemove from "material-ui/svg-icons/action/alarm-off"


import AppBar from "components/app-bar"
import {CommandBar} from "qili-app"
import {withMutation,withFragment} from "qili-app/graphql"

import Assembler from "./assemble"

export {default as Publishes} from "./list"

export class Publisher extends Component{
	state={
		template:"light",
		copies:1,
		name: `我的${new Date().getFullYear()-1}`,
		from:(d=>{d.setFullYear(d.getFullYear()-1);return d})(new Date()),
		to: new Date(),
		...pick(this.props.info,["template","copies","name","from","to"])
	}

    render(){
		const {id, info, child, preview, published, create,update,remove, toInfo,toList}=this.props
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
			const changed=["template","copies","name","from","to"].reduce((collected,k)=>{
				if(info[k]!=this.state[k])
					collected[k]=this.state[k]
				return collected
			},{})
			const isChanged=Object.keys(changed).length>0

			actions.push({
				action:"Remove",
				label:"删除",
				onSelect:()=>remove().then(()=>toList(true)),
				icon:<IconRemove/>
			})

			if(isChanged){
				actions.push({
					action:"Save",
					label:"保存",
					primary:true,
					onSelect:e=>update(changed)
				})
			}else{
				actions.push({
					action:"Publish",
					label:"出版",
					onSelect:()=>published().then(toList),
					icon:<IconPublish/>
				})
			}
		}else{
			actions.push({
				action:"Save",
				label:"创建",
				onSelect:e=>create({...this.state}).then(({id})=>toInfo(id)),
			})
		}

        return(
            <Fragment>
				<div style={{flex:"none"}}>
					<AppBar title={id ? name : `出版${child.name}的成长历程,留下永久的回忆`} switchable={!!!id}/>
				</div>
				<div style={{flex:"1 1 100%", overflowY:"scroll"}}>
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
							onChange={(e,copies)=>this.setState({copies:parseInt(copies)})}
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
				</div>

                <CommandBar style={{flex:"none"}} items={actions}/>
            </Fragment>
        )
    }
}

export default compose(
	setPropTypes({
		child:PropTypes.object.isRequired,
	}),
	withFragment({
		info:graphql`
			fragment publish_info on Publish{
				template
				copies
				name
				from
				to
			}
		`
	}),
	withProps(({child,info})=>({
		preview: info=>()=>{
			info.child=child
			return new Assembler(info)
			.assemble()
			.then(docx=>docx.save(`${child.name}.docx`))
		},
		info: info&&(({from,to})=>({...info, from:new Date(from), to:new Date(to)}))(info)
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
