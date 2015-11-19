
import {React, Component, UI} from 'dashboard'
import dbKnowledge from './db/Knowledge'
import uiKnowledge from './knowledge'
import extractor from './extractor'
import InsertFile from 'material-ui/lib/svg-icons/action/note-add'

var {Empty, CommandBar}=UI

export default class NewKnowledge extends Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        this.onSelect('New Version')
    }

    componentWillUnmount(){
        this.docx && this.docx.invoke()
    }

    render(){
        var {entity}=this.state, content, primary, commands;
        if(!entity){
            content=(<Empty icon={<InsertFile onClick={()=>this.onSelect('New Version')}/>} text="Select word docx file to create"/>)
            commands=["Back"]
        }else{
            content=(<div className="knowledge">{uiKnowledge.renderContent(entity)}</div>)
            commands=["Back","Save",
                {action:"New Version",icon:require("material-ui/lib/svg-icons/editor/border-color")}]
            primary="Save"
        }

        return (
            <div className="post">
                {content}
                <CommandBar
                    className="footbar"
                    primary={primary}
                    onSelect={this.onSelect.bind(this)}
                    items={commands}/>
            </div>
        )
    }


    onSelect(command){
        switch(command){
        case 'New Version':
            uiKnowledge.selectDocx()
                .then((docx)=>{
                    this.docx && this.docx.invoke()
                    delete this.docx

                    this.docx=docx
                    var {knowledge}=docx
                    this.setState({entity:knowledge})
                })
            break
        case 'Save':
            this.state.entity.content=""
            dbKnowledge.upsert(this.state.entity,null,()=>{
                this.docx.upload(this.state.entity).then((content)=>{
                    this.state.entity.content=content
                    dbKnowledge.upsert(this.state.entity,null,
                            ()=>this.context.router.replaceWith("knowledge",this.state.entity))
                }, ()=>{delete this.state.entity._id;dbKnowledge.remove(this.state.entity)})
            })
            break
        }
    }
}

NewKnowledge.contextTypes={
    router: React.PropTypes.func
}
