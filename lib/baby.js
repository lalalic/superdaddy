var {React,Component,immutable, UI:{List,CommandBar,Photo}}=require('qili-app'),
    {TextField, RadioButtonGroup, RadioButton,DatePicker}=require('material-ui'),
    {Family:dbFamily}=require('./db');

export default class Baby extends Component{
    constructor(props){
        super(props)
        this.state={child:this.props.child}
    }

    componentWillReceiveProps(nextProps){
        if(this.props.child!=nextProps.child){
            this.context.router.replaceWith('baby',nextProps.child)
            this.setState({child:nextProps.child})
        }
    }

    render(){
        var {child}=this.state,
            cmds=["Back"];
        if(child._id)
            cmds.push("Remove")
        cmds.push("Save")

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
                        onChange={(e)=>this.setState(Object.assign(child,{name:e.target.value}))}
                        value={child.name}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        autoOk={true}
                        showYearSelector={true}
                        maxDate={new Date()}
                        onChange={(nil, date)=>this.setState(Object.assign(child,{bd:date}))}
                        value={child.bd}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender"
                        onChange={(e,selected)=>this.setState(Object.assign(child,{gender:selected}))}
                        valueSelected={child.gender||"f"}>
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>
                </div>
                <CommandBar className="footbar"
                    items={cmds}
                    onSelect={(a)=>this.onSelect(a)}
                    />
            </div>
        )
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
        var {child, first=false}=this.props
        switch(command){
        case "Save":
            dbFamily.upsert(child, (a)=>dbFamily.currentChild=a)
            break
        case "Remove":
            var isLastChild=dbFamily.children.length==1
            dbFamily.remove(child,()=>{
                if(isLastChild)
                    this.context.router.replaceWith("/")
                dbFamily.restoreLast()
            })
            break
        }
    }
}

Baby.contextTypes={router:React.PropTypes.func}
