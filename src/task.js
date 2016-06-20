import {React,Component,User,UI} from 'qili-app'
import dbTask from './db/task'
import dbFamily from './db/family'
import uiKnowledge from './knowledge'
import Editor from './components/editor'

import {RaisedButton} from "material-ui"
import {Stepper, Step, StepContent,StepButton} from 'material-ui/Stepper'


const {List, Loading, Comment, CommandBar}=UI


export default class Task extends Component{
    state={task:null, active:0, completed:false}

	getData(_id){
		let {state}=this.props.location
		if(state && state.task)
			this.setState({task:state.task, active:state.task.current})
		else
			dbTask.findOne({_id:this.props.params._id},task=>this.setState({task, active:task.current}))
	}

    componentDidMount(){
        this.getData(this.props.params._id)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.params._id!=nextProps.params._id)
			this.getData(nextProps.params._id)
    }

    render(){
        const {task, active, completed}=this.state, {child}=this.props
        if(!task)
            return (<Loading/>)

        const {knowledge, content, current}=task
		const {steps}=knowledge

        return (
			<article>
				<header>
					<h1 onClick={e=>this.context.router.push(`knowledge/${knowledge._id}`)}>{knowledge.title}</h1>
				</header>

				<section>
					{completed && <div>"恭喜${child.name},你已经完成了本课程!"</div>}
					<Stepper orientation="vertical" linear={false} activeStep={active}>
					{knowledge.steps.map(({key,alt}, index)=>(
						<Step key={key} completed={index<current}>
							<StepButton onClick={e=>this.setState({active:index})}>{key}</StepButton>
							<StepContent>
								{alt && <p>{alt}</p>}
								<Editor ref={`editor-${key}`}
									content={content[key]}
									appendable={index==current}/>

								<div style={{margin:10}}>
									{index==current &&
									(<RaisedButton primary={true} label="完成"
										onClick={e=>{
											task.content[key]=this.refs[`editor-${key}`].value
											task.current=index
											if(steps.length==index+1)
												dbTask.finish(task)
													.then(a=>this.setState({completed:true}))
											else
												dbTask.upsert(task)
													.then(updated=>this.setState({active:updated.current+1}))
										}}/>)}
								</div>
							</StepContent>
						</Step>
					))}
					</Stepper>
				</section>

				<CommandBar
                    className="footbar"
                    onSelect={cmd=>this.onSelect(cmd)}
                    items={["Back",
                        <CommandBar.Comment type={dbTask} model={task} key="comment"/>,
                        <CommandBar.Share message={task} key="share"/>]}/>
			</article>
        )
    }

	static contextTypes={router:React.PropTypes.object}
}
