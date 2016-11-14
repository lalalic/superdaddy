import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import InsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"

import dbKnowledge from './db/knowledge'
import uiKnowledge from './knowledge'
import extractor from './parser/extractor'

import {Knowledges} from "./knowledges"

const {Empty, CommandBar}=UI

const {ACTION}=Knowledges

export default class NewKnowledge extends Component{
    componentWillUnmount(){
        this.props.dispatch(ACTION.CLEAR)
    }

    render(){
        const {docx:{knowledge}, dispatch}=this.props
        let content, primary, commands;
        const {router}=this.context

        if(!entity){
            content=(<Empty icon={<InsertFile onClick={a=>this.selectNewVersion()}/>}
				text="选择docx文案文件"/>)
        }else{
            content=(<div className="knowledge">{uiKnowledge.renderContent(knowledge)}</div>)
            commands=[
                {
                    action:"保存"
                    ,onSelect:a=>dispatch(ACTION.CREATE(this.docx).then(a=>router.replace(`/knowledge/${a._id}`)))
                }
                ,{
                    action:"新版本"
                    ,icon:<IconCreate/>
                    ,onSelect:a=>dispatch(ACTION.SELECT_DOCX())
                }
            ]
            primary="保存"
        }

        return (
            <div className="post">
                {content}
                {commands && (<CommandBar
                    className="footbar"
                    primary={primary}
                    items={commands}/>)}
            </div>
        )
    }

	static contextTypes={router:PropTypes.object}
}
