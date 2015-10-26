var {React,Component,UI:{List,CommandBar,Photo}}=require('dashboard'),
    {TextField, RadioButtonGroup, RadioButton,DatePicker}=require('material-ui'),
    dbFamily=require('./db/family');

export default class Baby extends Component{
    componentWillUnmount(){
        if(!this.props.child._id)
            dbFamily.currentChild=dbFamily.lastChild
    }

    componentWillReceiveProps(newProps){
        if(this.props.child!=newProps.child)
            this.forceUpdate()
    }

    render(){
        var {child}=this.props
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
                        value={child.name}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        value={Date.parse(child.bd)}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender" defaultSelected={child.gender||'f'}>
                        <RadioButton value="f" label="girl"/>
                        <RadioButton value="m" label="boy" />
                    </RadioButtonGroup>
                </div>
                <CommandBar
                    className="footbar"
                    items={["Back","Save"]}
                    onSelect={this.onSelect.bind(this)}
                    />
            </div>
        )
    }
    takePhoto(){
        navigator.camera.getPicture(function(p){
                this.refs.photo.getDOMNode().src=p
            }.bind(this), function(error){

            }.bind(this), {
                quality:50,
                destinationType:Camera.DestinationType.FILE
            });
    }
    onSelect(command){
        switch(command){
        case "Save":
            this.save()
            break
        }
    }
    save(){

    }
}
Baby.contextTypes={router:React.PropTypes.func}
