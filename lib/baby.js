var {React,Component,immutable, UI:{List,CommandBar,Photo}}=require('qili-app'),
    {TextField, RadioButtonGroup, RadioButton,DatePicker}=require('material-ui'),
    {Family:dbFamily}=require('./db');

export default class Baby extends Component{
    constructor(props){
        super(props)
        var {params:{_id:targetId}}=this.props,
            currentChild=dbFamily.currentChild,
            {_id:currentId}=currentChild||{}

        if(!targetId)
            this.state={child:{}}
        else if(targetId==currentId)
            this.state=({child:dbFamily.currentChild})
        else
            dbFamily.find({_id:targetId},(a)=>dbFamily.currentChild=a)
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
            dbFamily.find({_id:targetId},(a)=>dbFamily.currentChild=a)
    }

    render(){
        var {child,removing}=this.state
        if(removing)
            return (<span>"removing..."</span>)

        var cmds=["Back"];
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
        var {child}=this.state,
            isNew=typeof(child._id)=='undefined';
        switch(command){
        case "Save":
            dbFamily.upsert(child, (a)=>{
                if(isNew){
                    this.setState({changing:true})
                    this.context.router.replaceWith("baby",a)
                    dbFamily.currentChild=a
                    
                }
            })
            break
        case "Remove":
            dbFamily.remove(child,()=>{
                this.setState({changing:true})
                dbFamily.currentChild=dbFamily.children[0]
                this.context.router.replaceWith("/")
            })
            break
        }
    }
}

Baby.contextTypes={router:React.PropTypes.func}
