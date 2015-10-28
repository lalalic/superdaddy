var {React,Component,User,UI:{List, Loading, Comment, CommandBar},Router:{Link}}=require('dashboard'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family'),
    Editor=require('./editor');

export default class Task extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null
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
    componentWillReceiveProps(next){
        if (next.child!=this.props.child)
            this.forceUpdate()
    }
    render(){
        var {entity}=this.state, {child}=this.props
        if(!entity)
            return (<Loading/>)

        var {started, finished,knowledge:{goal=[]}}=entity,
            readonly=entity.author._id!=User.current._id,
            action=readonly ? null : (finished ? null : (started ? "Finish" : "Start")),
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'};

        return (
            <div className="post">
                <h1 style={{padding:10}}>
                    <ul style={{listStyle:'none',margin:0, padding:0}}>
                        <li><Link to={`/knowledge/${entity._id}`}>{entity.knowledge.title}</Link></li>
                        <li style={sencondaryStyle}>
                            {child.name} - <time>{entity.when}</time>
                        </li>
                        <li style={sencondaryStyle}>
                            {goal.join(", ")}
                        </li>
                    </ul>
                </h1>

                <details style={{padding:10}} open={true}>
                    <summary>{entity.knowledge.summary}</summary>
                    <Editor ref="editor" content={entity.content} appendable={!readonly}/>
                </details>

                <CommandBar
                    className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back", action, "Save",
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
        case "Finish":
            dbTask.finish(this.state.entity)
                .then(function(){
                    this.forceUpdate()
                }.bind(this))
        break
        case "Save":
            var {entity}=this.state,
                editor=this.refs.editor;
            entity.content=editor.value
            entity.thumbnail=editor.thumbnail
            dbTask.upsert(entity, function(){
                this.forceUpdate()
            }.bind(this))
        break
        }
    }
}
Task.contextTypes={
    router:React.PropTypes.func
}
