var {React,Component,UI:{List,Loading,Comment,CommandBar}}=require('dashboard'),
    {DialogCommand}=CommandBar,
    dbKnowledge=require('./db/knowledge'),
    dbTask=require('./db/task'),
    {RaisedButton}=require('material-ui');
class Plan extends Component{
    render(){
        var {className,open,...others}=this.props

        return (
            <div className={`${className} ${!open && "hidden" ||""}`} {...others}>

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
        var {goal=[]}=entity,
            sencondaryStyle={fontSize:'small',fontWeight:'normal', textAlign:'right'}
        return (
            <div className="post">
                <h1 style={{padding:10}}>
                    <ul style={{listStyle:'none',margin:0, padding:0}}>
                        <li>{entity.title}</li>
                        <li style={sencondaryStyle}>
                            {entity.author.name} - <time>{entity.createdAt}</time>
                        </li>
                        <li style={sencondaryStyle}>
                            {goal.join(", ")}
                        </li>
                    </ul>
                </h1>

                <details style={{padding:10}} open={true}>
                    <summary>{entity.summary}</summary>
                    <div className="content">{entity.content}</div>
                </details>

                <Plan style={{padding:10}} open={planing} entity={entity}/>

                <CommandBar
                    className="footbar"
                    primary="plan"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back",
                        <CommandBar.Comment type={dbKnowledge} model={entity}/>,
                        <CommandBar.Share message={entity}/>,
                        <PlanCommand label="Plan" ref="plan"
                            onDismiss={this.createPlan.bind(this)}
                            self={()=>this.refs.plan}/>]}/>
            </div>
        )
    }

    getExperience(){

    }

    onSelect(command){
        switch(command){
        case 'Plan':
            this.refs.plan.show()
        }
    }

    createPlan(){
        var {entity}=this.state,
            {selectedDays}=this.refs.plan.state

        dbTask.plan(entity,selectedDays)
    }
}

Knowledge.contextTypes={
    router: React.PropTypes.func
}

class PlanCommand extends CommandBar.DialogCommand{
    constructor(props){
        super(props)
        this.state={
            selectedDays:[]
        }
    }
    renderContent(){
        var everydays="week,weekend,weekday,month".split(",").map(function(a){
                return (<RaisedButton onClick={()=>this.selectDays(a)}>{a}</RaisedButton>)
            }.bind(this)),
            now=new Date(),
            Calendar=require('./components/calendar'),
            {selectedDays}=this.state;

        return [(<div style={{textAlign:'center',padding:10}}>{everydays}</div>),
                (<div>
                    <Calendar
                        ref="calendar"
                        minDate={now}
                        maxDate={Date.Helper.addDays(now,31)}
                        displayDate={now} />
                </div>)]
    }

    selectDays(a){

    }
}
