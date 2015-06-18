var {React,Component,UI:{List,Loading,Comment,CommandBar,DialogCommand}}=require('dashboard'),
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
                    items={["Back","Comment","Share","Plan"]}/>
                <PlanCommand ref="plan"/>
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
        case 'Plan':
            this.refs.plan.show()
        }
    }
}

Main.contextTypes={
    router: React.PropTypes.func
}

class PlanCommand extends DialogCommand{
    constructor(props){
        super(props)
    }
    /***
     * Today, Tomorrow, Weekend, weekday
     * Evary Day of this [week, weekend, weekday, month]
     * calendar
     */
    render(){
        var days="today,tomorrow,weekend".split(",").map(function(a){
                return (<span>{a}</span>)
            })
        var everydays="week,weekend,weekday,month".split(",").map(function(a){
                return (<span>{a}</span>)
            })
        var Calendar=require('material-ui/lib/js/date-picker/calendar-month')
        this.props.children=[(
            <ul>
                <li>{days}</li>
                <li>{everydays}</li>
            </ul>),(
            <div>
                <Calendar displayDate={new Date()}/>
            </div>)
            ]

        return super.render()
    }
}
