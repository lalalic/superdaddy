import React, {PureComponent,Fragment} from "react"
import PropTypes from "prop-types"
import {compose, getContext, withProps} from "recompose"
import {connect} from "react-redux"
import Assembler from "publish/assemble";
import {toHtml, plugin} from "knowledge/parse"

export default compose(
    connect(({superdaddy:{current}})=>({id:current})),
	getContext({client: PropTypes.object}),
	withProps(({client, id, ...props})=>{
		return {
			child:client.get(id),
			...props
		}
	}),
)(class Print extends PureComponent{
    state={show:false}
    render(){
        const {child, todos,days='日,一,二,三,四,五,六'.split(",")}=this.props
        const tasks=todos.map(({days=[], content:task, dones=[], fields, props},i)=>(
			<tr key={i}>
                <td>{task}</td>
                {[0,1,2,3,4,5,6].map(a=>(<td key={a}>{-1!=dones.indexOf(a) ? "V" :""}</td>))}
			</tr>
        ))
        
        const knowledges=todos.filter(a=>!!a.knowledge)
        const classrooms=knowledges.filter(a=>a.knowledge.is4Classroom)
        const homeworks=knowledges.filter(a=>!!a.knowledge.hasHomework || !!a.knowledge.code)
        
        const now=new Date(), today=`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()+1}`

        return (
            <div>
                <div style={{position:"relative",top:-20}}>
                    <span style={{float:'left'}}>{child.name}</span>
                    <span style={{float:'right'}}>生成日期：{today}</span>
                </div>
                <table>
                    <caption style={{marginBottom:10}}>本周挑战:每日一省</caption>
                    <thead>
                        <tr>
                            <td>
                                <span style={{float:'left'}}>任务</span>
                                <span style={{float:'right'}}>星期</span>
                            </td>
                            {days.map((a,i)=><td key={i}>{a}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </table>

                {classrooms.length>0 && <center style={{marginTop:40, marginBottom:10}}>课堂纪律:每课一省</center>}
                {classrooms.map(({knowledge:{summary}, content},key)=><Classroom {...{key,content,summary}}/>)}

                {homeworks.map(({knowledge,fields, props}, key)=><Homework {...{knowledge,child, fields:props||fields, key}}/>)}
            </div>
        )
    }
})

const Classroom=({summary,content})=>(
    <table style={{marginBottom:40}}>
        <caption style={{textAlign:"left"}}>{content}: {summary}</caption>
        <thead>
            <tr>
                <td></td>
                {'一,二,三,四,五,六'.split(',').map((a,i)=><td key={i}>第{a}节课</td>)}
            </tr>
        </thead>
        <tbody>
            {"一,二,三,四,五".split(",").map(i=>(
                <tr key={i}><td>星期{i}</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
            ))}
        </tbody>
    </table>
)

class Homework extends PureComponent{
    state={}
    componentDidMount(){
        const {knowledge:{template,code,hasHomework},fields,child}=this.props
        const data={...fields,child}
        const homeworks=[]
        const done=()=>this.setState({generated:true,homework:homeworks.filter(a=>!!a).join("")})
        if(code){
            homeworks.push(plugin(code).homework(data))
        }

        if(hasHomework){
            new Assembler(knowledge.template, data)
                .assemble()
                .then(docx=>toHtml(docx))
                .then(homework=>homeworks.push(homework))
                .finally(done)
        }else{
            done()
        }
    }

    render(){
        const {homeworks, generated}=this.state
        if(!generated)
            return null
        if(!homework)
            return null
        return <div style={{pageBreakAfter:"always", pageBreakBefore:"always"}} dangerouslySetInnerHTML={{__html:homework}}/>
    }
}