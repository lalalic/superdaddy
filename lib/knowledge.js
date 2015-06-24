var {React,Component,UI:{List,Loading,Comment,CommandBar,DialogCommand}}=require('dashboard'),
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task'),
    {RaisedButton}=require('material-ui');
class Plan extends Component{
    render(){
        var {className,open,...others}=this.props
        if(!className)
            className=""

        if(!open)
            className+=" hidden"

        return (
            <div className={className} {...others}>

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
                <h1 style={{padding:10}}>{entity.title}</h1>

                <details style={{padding:10}}>
                    <summary>{entity.summary}</summary>
                    <div className="content">{entity.content}</div>
                </details>

                <Plan style={{padding:10}} open={planing} entity={entity}/>

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

class PlanCommand extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedDays:
        }
    }
    /***
     * Evary Day of this [weekend, weekday, month]
     * calendar
     */
    render(){
        var everydays="week,weekend,weekday,month".split(",").map(function(a){
                return (<RaisedButton onClick={()=>this.selectDays(a)}>{a}</RaisedButton>)
            }),
            now=new Date(),
            DateTime=require('material-ui/lib/utils/date-time'),
            CalendarMonth=require('material-ui/lib/date-picker/calendar-month');
        var styles={
            everydays:{
                textAlign:'center'
            },
            weekTitle: {
              padding: '0 14px',
              lineHeight: '12px',
              opacity: '0.5',
              height: '12px',
              fontWeight: '500',
              margin: 0
            },
            weekTitleDay: {
              listStyle: 'none',
              float: 'left',
              width: '32px',
              textAlign: 'center',
              margin: '0 2px'
            }
        }
        return (
            <DialogCommand ref="root" {...this.props}>
                <div style={styles.everydays}>{everydays}</div>
                <ul style={styles.weekTitle}>
                  <li style={styles.weekTitleDay}>S</li>
                  <li style={styles.weekTitleDay}>M</li>
                  <li style={styles.weekTitleDay}>T</li>
                  <li style={styles.weekTitleDay}>W</li>
                  <li style={styles.weekTitleDay}>T</li>
                  <li style={styles.weekTitleDay}>F</li>
                  <li style={styles.weekTitleDay}>S</li>
                </ul>
                <CalendarMonth
                    minDate={now}
                    maxDate={DateTime.addDays(now,31)}
                    selectedDate={now}
                    displayDate={now}
                    onDayTouchTap={this.onDay.bind(this)}/>
            </DialogCommand>
        )
    }
    show(){
        this.refs.root.show()
    }
    onDay(e, date){

    }
    selectDays(a){
        switch(a){
        case 'week':

        break
        case 'weekend':

        break
        case 'weekday':

        break
        case 'month':

        break
        }
    }
}
