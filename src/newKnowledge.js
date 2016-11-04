import React, {Component, PropTypes} from "react"
import {UI} from 'qili-app'
import InsertFile from 'material-ui/svg-icons/action/note-add'
import IconCreate from "material-ui/svg-icons/editor/border-color"

import dbKnowledge from './db/knowledge'
import uiKnowledge from './knowledge'
import extractor from './parser/extractor'

const {Empty, CommandBar}=UI

export default class NewKnowledge extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        this.onSelect('New Version')
    }

    componentWillUnmount(){
        this.docx && this.docx.revoke()
    }

    render(){
        var {entity}=this.state, content, primary, commands;
        if(!entity){
            content=(<Empty icon={<InsertFile onClick={()=>this.onSelect('New Version')}/>}
				text="选择docx文案文件"/>)
        }else{
            content=(<div className="knowledge">{uiKnowledge.renderContent(entity)}</div>)
            commands=["Save",
                {action:"New Version",icon:<IconCreate/>}]
            primary="Save"
        }

        return (
            <div className="post">
                {content}
                {commands && (<CommandBar
                    className="footbar"
                    primary={primary}
                    onSelect={this.onSelect.bind(this)}
                    items={commands}/>)}
            </div>
        )
    }


    onSelect(command){
        switch(command){
        case 'New Version':
            uiKnowledge.selectDocx()
                .then(docx=>{
                    this.docx && this.docx.revoke()
                    delete this.docx

                    this.docx=docx
                    var {knowledge}=docx
                    this.setState({entity:knowledge})
                })
            break
        case 'Save':
            var {entity}=this.state
            entity.content=""
            dbKnowledge.upsert(entity).then(a=>{
                this.docx.upload(entity).then(content=>{
                    entity.photos=this.docx.getPhotos()
                    entity.content=content
                    dbKnowledge.upsert(this.state.entity)
                        .then(a=>this.context.router.replace(`knowledge/${this.state.entity._id}`))
                }, a=>{
                    delete this.state.entity._id;
                    dbKnowledge.remove(this.state.entity)
                })
            })
            break
        }
    }

	static contextTypes={router:PropTypes.object}
}
