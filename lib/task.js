var {React,Component,User,UI:{List, Loading, Comment, CommandBar}}=require('qili-app'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family'),
    uiKnowledge=require('./knowledge'),
    Editor=require('./editor'),
    {Template}=require('./extractor');

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

        var {started, finished,knowledge:{goal=[]},content={}, summary=[]}=entity,
            readonly=entity.author._id!=User.current._id,
            action=readonly ? null : (finished ? "Publish" : (started ? "Finish" : "Start")),
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'};

        this.template=new Template(entity.knowledge.content)
        var hasEditor=false,
            contentEditor=uiKnowledge.renderContent(entity.knowledge,true, (a, i)=>{
                if(typeof(a)=='string')
                    return false
                hasEditor=true
                var {key, alt}=a
                return (
                    <details key={key} open="true">
                        <summary>{key}</summary>
                        <Editor ref={`editor-${key}`} content={content[key]} appendable={!readonly}/>
                    </details>
                )
            })
        var summaryEditor
        if(summary.length || !hasEditor){
            summaryEditor=(<Editor ref="summary" content={summary} appendable={!readonly}/>)
            if(hasEditor)
                summaryEditor=(
                    <details open="true">
                        <summary>summary</summary>
                        {summaryEditor}
                    </details>
                )
        }

        return (
            <div className="post">
                {contentEditor}
                {summaryEditor}
                <CommandBar
                    className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    primary={action}
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
        case "Finish":
            dbTask.finish(this.state.entity)
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
        this.template.contents.forEach((a)=>{
            if(typeof(a)=='string') return;
            var {key,alt}=a,
                editor=this.refs[`editor-${key}`];
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
}
Task.contextTypes={
    router:React.PropTypes.func
}
