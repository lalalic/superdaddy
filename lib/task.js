var {React,Component,UI:{List, Loading, Comment}}=require('dashboard'),
    Entity=require('./db/knowledge'),
    Family=require('./db/family'),
    Editor=require('./editor');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null,
            child:Family.currentChild
        }
    }
    componentWillMount(){
        if(!this.state.entity){
            var id=this.props.params._id
            Entity.findOne({_id:id},function(entity){
                this.setState({entity:entity})
            }.bind(this))
        }
    }
    render(){
        var {entity}=this.state
        if(!entity)
            return (<Loading/>)

        return (
            <div className="post">
                <h1>
                    <ul>
                        <li>{child.name}</li>
                        <li>{entity.knowledge.title}</li>
                        <li>{entity.goal}</li>
                    </ul>
                </h1>
                <vote>{entity.knowledge.summary}</vote>
                <Editor content={entity.content}/>

                <CommandBar
                    className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back","Comment","Share"]}/>
            </div>
        )
    }
    onSelect(command){
        switch(command){
        case "Back":
            this.context.router.goBack()
            break
        case "Comment":
            this.context.router.transitionTo("comment",{type:Entity._name,_id:this.state.entity._id})
            break
        case "Share":

            break
        }
    }
}
Main.contextTypes={
    router:React.PropTypes.func
}
