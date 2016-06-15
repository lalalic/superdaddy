import {React,Component,immutable, UI} from 'qili-app'
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'
import {Family as dbFamily} from './db'
import RewardGoal from './components/rewards'

const {List,CommandBar,Photo}=UI

export default class Baby extends Component{
	constructor(){
		super(...arguments)
		this.state={}
	}

	componentWillReceiveProps(newProps){
		if(this.props.params.name!=newProps.params.name)
			dbFamily.currentChild=newProps.params.name
	}

	shouldComponentUpdate(newProps){
		if(this.state.frozen)
			return false

		return this.props.child!=newProps.child
    }

    render(){
        let {child}=this.props
			,cmds=[]
			,rewards

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
                        value={child.name}
                        onBlur={e=>{
							if(this.props.value!=e.target.value){
								child.name=e.target.value
								this.onChange(child)
							}
						}}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        maxDate={new Date()}
                        value={child.bd}
                        onChange={(nil, date)=>{
							if(this.props.value && this.props.value.getTime()!==date.getTime()){
								child.db=date
								this.onChange(child)
							}
						}}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender"
                        onChange={(e,selected)=>{
							if(this.props.valueSelected!=selected){
								child.gender=selected
								this.onChange(child)
							}
						}}
                        valueSelected={child.gender||"f"}>
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>
                    {rewards}
                </div>
                <CommandBar className="footbar"
                    items={cmds}
                    onSelect={cmd=>this.onSelect(cmd)}
                    />
            </div>
        )
    }
    onRewardRule(rule){
        let {child}=this.props,
            {rewardRules=[]}=child
        rewardRules.push(rule)
        child.rewardRules=rewardRules
        this.onChange(child)
    }

    onReward(reward){
        let {child}=this.props,
            {rewardDetail=[]}=child
        rewardDetail.push(reward)
        child.rewardDetail=rewardDetail
        this.onChange(child)
    }

    onChange(child){
        if(!child._id)
			return
        dbFamily.upsert(child)
			.then(a=>this.forceUpdate())
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
        var {child}=this.props
        switch(command){
        case "Save":
            dbFamily.upsert(child)
				.then(a=>this.context.router.replace(`baby/${child.name}`))
            break
        case "Remove":
            this.setState({frozen:true})
            dbFamily.remove(child._id)
				.then(a=>this.context.router.replace("/"))
            break
        }
    }

	static contextTypes={router:React.PropTypes.object}

	static Creator=class extends Baby{
		componentWillUnmount(){
			if(!this.props.child._id)
				dbFamily.restoreLast()
		}

		componentWillReceiveProps(newProps){
			return false
		}
	}
}
