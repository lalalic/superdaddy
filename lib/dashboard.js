var {React,Component,UI:{List, Loading, Empty,Comment}}=require('dashboard'),
    {Paper}=require('material-ui'),
    Tasks=require('./db/task');



class TaskItem extends Component{
    render(){
        var {model, image, actions, ...others}=this.props;
        return (
            <div className="li">
                <div className="list-content" onClick={this.onDetail.bind(this)}>
                    <p>{model.knowledge.title}</p>
                    <div className="list-photo">
                        <img src={model.photo||image}/>
                    </div>
                </div>
                <div className="list-toolbar">
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
TaskItem.contextTypes={
    router:React.PropTypes.func
}

class ProvingItem extends TaskItem{

}

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            todayTasks:null,
            approvings:null
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
        var depth=2
        var {todayTasks,approvings}=this.state;

        var todayTask, approving, moreTask;

        if(todayTasks){
            if(todayTasks.length){
                todayTask=(
                    <Paper zDepth={depth}>
                        <h3 style={{textAlign:"center"}}>Today Task</h3>
                        <List model={todayTasks} template={TaskItem}/>
                    </Paper>
                    )
                moreTask=(<Empty text="More Task"/>)
            }else{
                todayTask=(<Empty text="Magic Task"/>)
            }
        }else
            todayTask=(<Loading text="loading tasks"/>);

        if(approvings){
            approving=(
                <Paper zDepth={depth-1}>
                    <h4 style={{textAlign:"center"}}>Approvings</h4>
                    <List model={approvings} template={ProvingItem}/>
                </Paper>)
        }else
            approving=(<Loading text="loading approvings"/>)

        return (
            <div>
                {todayTask}
                {approving}
                {moreTask}
            </div>
        )
    }
}
