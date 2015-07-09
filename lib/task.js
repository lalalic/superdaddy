var {React,Component,User,UI:{List, Loading, Comment, CommandBar}}=require('dashboard'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family'),
    Editor=require('./editor');

export default class Task extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null,
            child:dbFamily.currentChild
        }
    }
    componentWillMount(){
        if(!this.state.entity){
            var id=this.props.params._id
            dbTask.findOne({_id:id},function(entity){
                this.setState({entity:entity})
            }.bind(this))
        }
    }
    render(){
        var {entity, child}=this.state
        if(!entity)
            return (<Loading/>)

        var {started, finished}=entity,
            readonly=entity.author._id!=User.current._id,
            action=readonly ? null : (finished==true ? null : (started==true ? "Finish" : "Start"));

        return (
            <div className="post">
                <h1 style={{padding:10}}>
                    <ul style={{listStyle:'none',margin:0}}>
                        <li>{child.name}</li>
                        <li>{entity.knowledge.title}</li>
                        <li>{entity.goal}</li>
                    </ul>
                </h1>

                <details style={{padding:10}} open={true}>
                    <summary>{entity.knowledge.summary}</summary>
                    <Editor content={entity.content} readonly={readonly}/>
                </details>

                <CommandBar
                    className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back", action,
                        <CommandBar.Comment type={dbTask} model={entity}/>,
                        <CommandBar.Share message={this.getSharedMessage.bind(this)} />]}/>
            </div>
        )
    }
    onSelect(command){
        switch(command){
        case "Start":
            dbTask.start(entity)
                .then(function(){
                    this.setState({started:true})
                }.bind(this))
        break
        case "Finish":
            dbTask.finish(entity)
                .then(function(){
                    this.setState({finished:true})
                }.bind(this))
        break
        }
    }

    getSharedMessage(){
        return this.state.entity
    }
}
Task.contextTypes={
    router:React.PropTypes.func
}
