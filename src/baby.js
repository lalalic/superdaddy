import {React,Component,immutable, UI} from 'qili-app'
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'
import {Family as dbFamily} from './db'
import RewardGoal from './components/rewards'

var {List,CommandBar,Photo}=UI

export default class Baby extends Component{
    constructor(props){
        super(props)
        var {params={}}=this.props,
            {_id:targetId}=params,
            currentChild=dbFamily.currentChild,
            {_id:currentId}=currentChild||{}

        if(!targetId)
            this.state={child:{}}
        else if(targetId==currentId)
            this.state=({child:dbFamily.currentChild})
        else
            dbFamily.find({_id:targetId},(a)=>dbFamily.currentChild=a[0])
    }

    componentWillReceiveProps(nextProps){
        if(this.state.changing)
            return;
        var {params:{_id:targetId}}=nextProps,
            {child:{_id:currentId}}=this.state

        if(!targetId)
            this.setState({child:{}})
        else if(targetId==currentId)
            return;
        else
            dbFamily.find({_id:targetId},(a)=>dbFamily.currentChild=a[0])
    }

    render(){
        var {child,removing}=this.state
        if(removing)
            return (<span>"removing..."</span>)

        var cmds=["Back"], rewards
        cmds.push(child._id ? "Remove" : "Save")
		if(child._id){
			rewards=(
				<div>
					<br/>
						<br/>
						<div style={{fontSize:"smaller", color:"gray", borderBottom:"1px dotted lightgray"}}>{child.name}的激励计划</div>
						<RewardGoal
							editable={true}
							style={{marginTop:30}}
							child={child}/>
				</div>
			)
		}
        return (
            <div>
                <div className="form">
                    <div className="child-photo">
                        <Photo ref="photo"
                            width={150}
                            height={150}
                            src={child.photo} />
                    </div>
                    <TextField ref="name" floatingLabelText="child name"
                        fullWidth={true}
                        onChange={(e)=>this.setState({child:Object.assign(child,{name:e.target.value})})}
                        onBlur={()=>(child._id && dbFamily.upsert(child))}
                        value={child.name}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        maxDate={new Date()}
                        onChange={(nil, date)=>this.onChange(Object.assign(child,{bd:date}))}
                        value={child.bd}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender"
                        onChange={(e,selected)=>this.onChange(Object.assign(child,{gender:selected}))}
                        valueSelected={child.gender||"f"}>
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>
                    {rewards}
                </div>
                <CommandBar className="footbar"
                    items={cmds}
                    onSelect={(a)=>this.onSelect(a)}
                    />
            </div>
        )
    }
    onRewardRule(rule){
        let {child}=this.state,
            {rewardRules=[]}=child
        rewardRules.push(rule)
        child.rewardRules=rewardRules
        this.onChange(child)
    }

    onReward(reward){
        let {child}=this.state,
            {rewardDetail=[]}=child
        rewardDetail.push(reward)
        child.rewardDetail=rewardDetail
        this.onChange(child)
    }

    onChange(child){
        this.setState({child})
        if(child._id)
            dbFamily.upsert(child)
    }
    takePhoto(){
        navigator.camera.getPicture((p)=>{
                this.refs.photo.getDOMNode().src=p
            }, (error)=>{

            }, {
                quality:50,
                destinationType:Camera.DestinationType.FILE
            });
    }
    onSelect(command){
        var {child}=this.state
        switch(command){
        case "Save":
            this.setState({changing:true})
            dbFamily.upsert(child, null, (a)=>{
                this.context.router.replace("baby",a)
            })
            break
        case "Remove":
            this.setState({removing:true})
            dbFamily.remove(child._id,()=>{
                this.context.router.replace("/")
            })
            break
        }
    }
}

Baby.contextTypes={router:React.PropTypes.object}
