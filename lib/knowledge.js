var {React,Component,UI:{List,Loading,Comment,CommandBar,DialogCommand}}=require('dashboard'),
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task');
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

export default class Knowledge extends Component{
    constructor(props){
        super(props)
        this.state={
            entity:dbKnowledge.current
        }
    }

    componentWillMount(){
        if(!this.state.entity){
            var id=this.props.params._id
            dbKnowledge.findOne({_id:id},function(entity){
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
                {_id:this.state.entity._id,type:dbKnowledge._name})
            break
        case 'Share':
            break
        case 'Plan':
            this.refs.plan.show()
        }
    }
}

Knowledge.contextTypes={
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

        var now=new Date(),
            DateTime=require('material-ui/lib/utils/date-time'),
            Calendar=require('material-ui/lib/date-picker/calendar-month');

        this.props.children=[(
            <ul>
                <li>{days}</li>
                <li>{everydays}</li>
            </ul>),(
            <div>
                <Calendar
                    minDate={now}
                    maxDate={DateTime.addDays(now,31)}
                    selectedDate={now}
                    displayDate={now}/>
            </div>)
            ]

        return super.render()
    }
}
