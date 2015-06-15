var {React,Component,UI:{List,Loading,Comment,CommandBar}}=require('dashboard'),
    Knowledges=require('./db/knowledge'),
    Task=require('./db/task');
class Plan extends Component{
    render(){
        var {className,open}=this.props
        if(!className)
            className=""

        if(!open)
            className+=" hidden"

        return (
            <div className={className}>

            </div>
        )
    }
}

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
        var {entity, planing}=this.state

        if(!entity)
            return (<Loading/>)

        return (
            <div className="post">
                <h1>{entity.title}</h1>

                <div className="content">{entity.content}</div>

                <Plan open={planing} entity={entity}/>

                <CommandBar
                    className="footbar"
                    primary="plan"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back","Comment","Share","Favorite","Plan"]}/>
            </div>
        )
    }

    getExperience(){

    }

    onSelect(command){
        switch(command){
        case 'Back':
            this.context.router.goBack();
            break
        case 'Comment':
            this.context.router.transitionTo('comment',
                {_id:this.state.entity._id,type:Knowledges._name})
            break
        case 'Share':
            break
        case 'Favorite':
            break
        case 'Plan':
            this.setState({planing:true})
        }
    }
}

Main.contextTypes={
    router: React.PropTypes.func
}
