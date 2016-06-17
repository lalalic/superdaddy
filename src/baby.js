import {React,Component,immutable, UI} from 'qili-app'
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'
import {Family as dbFamily} from './db'
import RewardGoal from './components/rewards'

const {List,CommandBar,Photo, Messager}=UI

export default class Baby extends Component{
	state={}
	shouldComponentUpdate(newProps){
		if(this.state.frozen)
			return false

		return this.props.child!=newProps.child
    }

	componentWillReceiveProps(newProps){
		if(this.props.params.name!=newProps.params.name)
			dbFamily.currentChild=newProps.params.name
	}

    render(){
        let {child}=this.props
        return (
            <div>
                <div className="form">
                    <div className="child-photo">
                        <Photo ref="photo"
                            width={150}
                            height={150}
                            src={child.photo}
							onPhoto={url=>{
								child.photo=url
								dbFamily.upsert(child)
							}}/>
                    </div>

                    <TextField ref="name"
						floatingLabelText="child name"
                        fullWidth={true}
                        value={child.name}
                        onBlur={e=>{
							let value=e.target.value.trim()
							if(child.name!=value){
								child.name=value
								dbFamily.upsert(child)
							}
						}}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        maxDate={new Date()}
                        value={child.bd}
                        onChange={(nil, date)=>{
							if(!child.db || child.db.getTime()!=date.getTime()){
								child.db=date
								dbFamily.upsert(child)
							}
						}}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender"
                        onChange={(e,selected)=>{
							if(child.gender!=selected){
								child.gender=selected
								dbFamily.upsert(child)
							}
						}}
                        valueSelected={child.gender||"f"}>
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>

                    <div>
						<br/>
						<br/>
						<div style={{fontSize:"smaller", color:"gray", borderBottom:"1px dotted lightgray"}}>
							{child.name}的激励计划
						</div>
						<RewardGoal
							editable={true}
							style={{marginTop:30}}
							child={child}/>
					</div>
                </div>

                <CommandBar className="footbar"
                    items={[{action:"Remove", onSelect:a=>this.remove()}]}/>
            </div>
        )
    }

    remove(){
        this.setState({frozen:true})
		dbFamily.remove(this.props.child._id)
			.then(a=>this.context.router.replace("/"))
    }

	static contextTypes={router:React.PropTypes.object}

	static Creator=class extends Component{
		componentWillReceiveProps(newProps){
			return false
		}

		render(){
			return (
				<div>
					<div className="form">
						<div className="child-photo">
							<Photo ref="photo"
								width={150}
								height={150}/>
						</div>

						<TextField ref="name"
							floatingLabelText="child name"
							fullWidth={true}/>

						<DatePicker ref="birthday"
							floatingLabelText="birthday"
							fullWidth={true}
							autoOk={true}
							showYearSelector={true}
							maxDate={new Date()}/>

						<RadioButtonGroup ref="gender"
							style={{marginTop:36}}
							name="gender"
							defaultSelected="f">
							<RadioButton value="f" label="girl"/>
							<RadioButton value="m" label="boy" />
						</RadioButtonGroup>
					</div>

					<CommandBar className="footbar"
						items={[{action:"Save", onSelect:a=>this.save()}]}/>
				</div>
			)
		}

		save(){
			let {photo, name, birthday, gender}=this.refs
			photo=photo.state.url
			name=name.getValue()
			birthday=birthday.getValue()
			gender=gender.getValue()

			if(!name){
				Messager.show("name can't be empty")
				return
			}

			Family.upsert({photo,name, gender, db:birthday})
				.then(baby=>{
					Family.currentChild=baby
					this.context.router.replace(`baby/${name}`)
				})
		}
		static contextTypes={router:React.PropTypes.object}
	}
}
