var {React,Component,UI:{List,Loading,Comment,CommandBar}}=require('dashboard'),
    Knowledges=require('./db/knowledge'),
    Task=require('./db/task');

export default class Main extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:Knowledges.current
        }
    }

    componentWillMount(){
        if(!this.state.entity){
            var id=this.props.params._id
            Knowledges.findOne({_id:id},function(entity){
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
                <h3>{entity.title}</h3>

                {entity.content}

                <Comment entity={entity}/>

                <CommandBar primary="plan"
                    onChange={this._onCommand.bind(this)}
                    items={["back","share","zan","plan"]}/>
            </div>
        )
    }

    getExperience(){

    }

    _onCommand(e,command){
        switch(command){

        }
    }
}
