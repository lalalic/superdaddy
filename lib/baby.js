var {React,Component,UI:{List,CommandBar,Photo}}=require('qili-app'),
    {TextField, RadioButtonGroup, RadioButton,DatePicker}=require('material-ui'),
    dbFamily=require('./db/family');

export default class Baby extends Component{
    componentWillUnmount(){
        if(!this.props.child._id)
            dbFamily.currentChild=dbFamily.lastChild
    }

    shouldComponentUpdate(next){
        return this.props.child!=next.child
    }

    render(){
        var {child}=this.props,
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
                        onChange={(e)=>child.name=this.refs.name.getValue()}
                        value={child.name}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        autoOk={true}
                        onChange={(nil, date)=>child.bd=date}
                        value={Date.parse(child.bd)}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender"
                        onChange={(e,selected)=>child.gender=selected}
                        valueSelected={child.gender}
                        defaultSelected="f">
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>
                </div>
                <CommandBar className="footbar"
                    items={cmds}
                    onSelect={()=>this.onSelect()}
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
        var {child}=this.props
        switch(command){
        case "Save":
            dbFamily.upsert(child, (a)=>this.forceUpdate())
            break
        }
    }
}
