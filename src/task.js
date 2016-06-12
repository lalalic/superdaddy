var {React,Component,User,UI:{List, Loading, Comment, CommandBar}}=require('qili-app'),
    dbTask=require('./db/task'),
    dbFamily=require('./db/family'),
    uiKnowledge=require('./knowledge'),
    Editor=require('./editor'),
    Template=require('./parser/template');

export default class Task extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null
        }
    }
    componentDidMount(){
        dbTask.findOne({_id:this.props.params._id},entity=>this.setState({entity}))
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

        var hasEditor=false, keys=this.keys=[],
            contentEditor=uiKnowledge.renderContent(entity.knowledge,true, (tmpl)=>{
                return tmpl.contents.map((a, i)=>{
                    if(typeof(a)=='string')
                        return null
                    hasEditor=true
                    var {key, alt}=a
                    keys.push(key)
                    return (
                        <details key={key} open="true">
                            <summary>{key}</summary>
                            <Editor ref={`editor-${key}`} content={content[key]} appendable={!readonly}/>
                        </details>
                    )
                })
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
}
Task.contextTypes={router:React.PropTypes.object}
