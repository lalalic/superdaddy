var {React,Component,UI:{List, Loading, Empty,Comment,CommandBar,DialogCommand}}=require('dashboard'),
    {Paper, RadioGroup, Radio}=require('material-ui'),
    Tasks=require('./db/task'),
    Family=require('./db/family');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            todayTasks:null,
            approvings:null,
            child:Family.currentChild,
            children:Family.children
        }
    }

    componentDidMount(){
        Tasks.todayTasks()
            .then(function(data){
                this.setState({todayTasks:data})
            }.bind(this))

        Tasks.approvings()
            .then(function(data){
                this.setState({approvings:data})
            }.bind(this))
    }

    render(){
        var depth=1
        var {todayTasks,approvings,children}=this.state;

        var todayTask, approving;

        if(todayTasks){
            if(todayTasks.length){
                todayTask=(
                    <Paper zDepth={depth}>
                        <h1 style={{textAlign:"center"}}>Today Task</h1>
                        <List model={todayTasks} template={TaskItem}/>
                    </Paper>
                    )
            }else{
                todayTask=(<Empty text="Magic Task"/>)
            }
        }else
            todayTask=(<Loading text="loading tasks"/>);

        if(approvings){
            approving=(
                <div>
                    <h2 style={{textAlign:"center"}}>Approvings</h2>
                    <List model={approvings} template={ProvingItem}/>
                </div>)
        }else
            approving=(<Loading text="loading approvings"/>)

        return (
            <div>
                {todayTask}
                {approving}
                <CommandBar
                    className="footbar"
                    items={["Knowledges", "Invite", "More", "Family"]}
                    onSelect={this.onSelect.bind(this)}
                    />
                <DialogCommand
                    ref="family">
                    <span>family here</span>
                </DialogCommand>
            </div>
        )
    }

    onSelect(command,e){
        if(this.refs.family.state.open){
            this.refs.family.dismiss()
            e.preventDefault()
            e.stopPropagation()
            return false
        }
        switch(command){
        case 'Knowledges':
            this.context.router.transitionTo('knowledges')
            break
        case 'Family':
            this.refs.family.show()
            break
        }
    }
}

class TaskItem extends Component{
    render(){
        var {model, image, actions, ...others}=this.props;
        return (
            <div className="li">
                <div className="content" onClick={this.onDetail.bind(this)}>
                    <div>
                        <h4>{model.knowledge.title}</h4>
                    </div>
                    <div className="photo">
                        <img src={model.photo||image}/>
                    </div>
                </div>
            </div>
        )
    }
    onDetail(){
        this.context.router.transitionTo('knowledge',this.props.model.knowledge)
    }
}
TaskItem.defaultProps={
    image:"images/task.jpg"
}

class ProvingItem extends TaskItem{

}

Main.contextTypes=TaskItem.contextTypes={
    router:React.PropTypes.func
}
