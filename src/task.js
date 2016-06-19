import {React,Component,User,UI} from 'qili-app'
import dbTask from './db/task'
import dbFamily from './db/family'
import uiKnowledge from './knowledge'
import Editor from './components/editor'
import Template from './parser/template'

import {Stepper, Step, StepLabel,StepContent} from 'material-ui/Stepper'

const {List, Loading, Comment, CommandBar}=UI

export default class Task extends Component{
    state={entity:null}

	getData(_id){
		let {state}=this.props.location
		if(state && state.task)
			this.setState({entity:state.task})
		else
			dbTask.findOne({_id:this.props.params._id},entity=>this.setState({entity}))
	}

    componentDidMount(){
        this.getData(this.props.params._id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params._id!=nextProps.params._id)
			this.getData(nextProps.params._id)
    }

    render(){
        const {entity}=this.state, {child}=this.props
        if(!entity)
            return (<Loading/>)

        const {knowledge}=entity
        return (
            <div className="post">
                <Stepper>
                {knowledge.steps.map(({key,alt})=>(
                    <Step>
                        <StepLabel>{key}</StepLabel>
                        <StepContent>
                            <p>{alt}</p>
                        </StepContent>
                    </Step>
                ))}
                </Stepper>
                <CommandBar
                    className="footbar"
                    onSelect={cmd=>this.onSelect(cmd)}
                    items={["Back", "Save", action,
                        <CommandBar.Comment type={dbTask} model={entity} key="comment"/>,
                        <CommandBar.Share message={entity} key="share"/>]}/>
            </div>
        )
    }
    onSelect(command){
        switch(command){
        case "Start":
            dbTask.start(this.state.entity)
                .then(function(){
                    this.forceUpdate()
                }.bind(this))
        break
        case "Save":
            this._onSave()
        break
        }
    }
    _onSave(){
        var {entity}=this.state;
        var content={}
        this.keys.forEach((key)=>{
            var editor=this.refs[`editor-${key}`];
            content[key]=editor.value
            if(!entity.thumbnail)
                entity.thumbnail=editor.thumbnail
        })
        entity.content=content

        var editorSummary=this.refs.summary
        if(editorSummary)
            entity.summary=editorSummary.value

        dbTask.upsert(entity, ()=>this.forceUpdate())
    }
	static contextTypes={router:React.PropTypes.object}
}
