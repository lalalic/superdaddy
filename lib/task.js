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
        if(!this.entity)
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
                <Comment entity={entity}/>
            </div>
        )

        return (
            <div className="post">
                {task}

                {knowledge}

                <CommandBar primary="plan"
                    onChange={this._onCommand.bind(this)}
                    items={["back","share","zan","plan"]}/>
            </div>
        )
    }
}
