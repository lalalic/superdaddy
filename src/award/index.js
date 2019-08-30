import React, {Component,Fragment} from "react"
import {compose,withProps} from "recompose"
import {CommandBar} from "qili-app"
import {withFragment, withMutation} from "qili-app/graphql"

import TextField from "material-ui/TextField"

import IconRemove from "material-ui/svg-icons/content/remove-circle"

class Editor extends Component{
    state={}
    render(){
        const {name,score, url}=this.state
        return (
            <div style={{margin:5}}>
                <TextField name="name" value={name||""} fullWidth={true}
                    onChange={({target:{value:name}})=>this.setState({name})}
                    floatingLabelText="名称"/>
                <TextField name="score" value={score} fullWidth={true}
                    onChange={({target:{value:score}})=>this.setState({score})}
                    floatingLabelText="分数"/>
                <TextField name="url" value={url||""} fullWidth={true}
                    onChange={({target:{value:url}})=>this.setState({url})}
                    floatingLabelText="奖品URL地址"/>
            </div>
        )
    }

    static getDerivedStateFromProps({award:{name,score=1,url}={}}){
        return {name,score,url}
    }
}

class Awards extends Component{
    constructor(){
        super(...arguments)
        this.state={}
        this.editor=React.createRef()
        this.table=React.createRef()
    }

    render(){
        const {awards, create, update, remove}=this.props
        const {active}=this.state
        const save=()=>{
            const {name,score,url}=this.editor.current.state
            return active ? update({id:active, name,score,url}) : create({name,score,url})
        }
        const nameStyle={textAlign:"left"}
        const scoreStyle={textAlign:"left"}
        return (
            <Fragment>
                <div style={{flex:"1 1 100%", overflowY:"scroll"}}>
                    <Editor ref={this.editor} award={awards.find(a=>a.id==active)}/>
                    <table style={{width:"99%"}} ref={this.table}>
                        <thead>
                            <tr style={{background:"lightgray"}}>
                                <th style={{width:10}}></th>
                                <th style={{...nameStyle,color:"gray", fontSize:"smaller"}}>名称</th>
                                <th style={{width:50, color:"gray", fontSize:"smaller",...scoreStyle}}>分数</th>
                            </tr>
                        </thead>
                        <tbody>
                            {awards.map(({id,name,score,url})=>(
                                <tr key={id}
                                    style={{background:active==id ? "lightblue" : ""}}
                                    onClick={()=>{
                                        this.setState(({active})=>{
                                            return {active:active==id ? undefined : id}
                                        })
                                    }}>
                                    <td><input type="checkbox" value={id}/></td>
                                    <td><a href={url}>{name}</a></td>
                                    <td>{score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <CommandBar style={{flex:"none"}}
                    className="bottom"
                    items={[
                        "Back",
                        {
							action:"Save",
							label:"保存",
							onSelect:save
						},
						{
							action:"Remove",
							label:"删除",
							icon:<IconRemove/>,
							onSelect:()=>{
                                const selected=this.table.current.querySelectorAll('input[type="checkbox"][value]:checked')
                                const ids=Array.prototype.map.call(selected,a=>a.value)
                                remove({ids})
                            }
						},
                    ]}
                />
            </Fragment>
        )
    }
}

export default compose(

    withFragment(graphql`
        fragment award on Award @relay(plural: true){
            id
            name
            score
            url
        }
    `),
    withProps(({data, ...others})=>({...others,awards:data})),
    withMutation({
        name:"create",
        promise:true,
        mutation:graphql`
            mutation award_create_Mutation($name:String!,$score:Int, $url:URL){
                award_create(name:$name,score:$score,url:$url){
                    awards{
                        ...award
                    }
                }
            }
        `
    }),
    withMutation(({id})=>({
        name:"update",
        promise:true,
        patch4:id,
        variables:{id},
        mutation:graphql`
            mutation award_update_Mutation($id:ObjectID!, $name:String!,$score:Int,$url:URL){
                award_update(_id:$id, name:$name,score:$score,url:$url){
                    ...award
                }
            }
        `,
    })),
    withMutation(({ids})=>({
        name:"remove",
        mutation:graphql`
            mutation award_remove_Mutation($ids:[ObjectID!]){
                award_remove(ids:$ids){
                    awards{
                        ...award
                    }
                }
            }
        `
    }))
)(Awards)
