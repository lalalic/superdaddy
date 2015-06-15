var {React,Component,UI:{List, Loading, Comment}}=require('dashboard'),
    Entity=require('./db/knowledge');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:null
        }
    }

    render(){
        var {entity}=this.state
        if(!entity)
            return (<Loading/>)

        var task,knowledge,editor;

        knowledge=(
            <div className="secondary">
                <h4>{entity.knowledge.title}</h4>
                    {entity.knowledge.content.substr(256)}
            </div>
        )

        task=(
            <div className="primary">
                <h3>{entity.title}</h3>
                    {entity.content}
                    {editor}
            </div>
        )

        return (
            <div className="post">
                {task}

                {knowledge}

                {plan}
                <CommandBar
                    className="footbar"
                    primary="plan"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back","Comment","Share","Favorite","Plan"]}/>
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
        case "Favorite":
            break
        case "Plan":
            this.setState({planing:true})
            break
        }
    }
}
Main.contextTypes={
    router:React.PropTypes.func
}
