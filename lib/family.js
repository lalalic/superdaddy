var {React,Component,UI:{List,CommandBar}}=require('dashboard'),
    {TextField, RadioButtonGroup, RadioButton,DatePicker}=require('material-ui'),
    Families=require('./db/family');

export default class Main extends Component{
    constructor(props){
        super(props)
        this._id=this.props.params._id
        this.state={
            entity:!this._id && {}
        }
    }
    componentWillMount(){
        if(!this._id)
            return
        Families.findOne({_id:this._id},function(entity){
                this.setState({entity:entity})
            }.bind(this))
    }
    render(){
        var {entity}=this.state
        return (
            <div>
                <div className="form">
                    <div className="child-photo">
                        <img ref="photo" src={entity.photo}
                            onClick={this.takePhoto.bind(this)}/>
                    </div>
                    <TextField ref="name" floatingLabelText="child name"
                        fullWidth={true}
                        value={entity.name}/>

                    <DatePicker ref="birthday" floatingLabelText="birthday"
                        fullWidth={true}
                        value={Date.parse(entity.bd)}/>

                    <RadioButtonGroup
                        style={{marginTop:36}}
                        name="gender" defaultSelected={entity.gender||'f'}>
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
        case "Back":
            this.context.router.goBack()
            break
        case "Save":
            this.save()
            break
        }
    }
    save(){

    }
}
Main.contextTypes={router:React.PropTypes.func}
