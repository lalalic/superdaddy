var {React,Component,UI:{List}}=require('dashboard'),
    {TextField, RadioButtonGroup, RadioButton}=require('material-ui'),
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
        if(this._id)
            return
        Families.findOne({_id:this._id},function(entity){
                this.setState({entity:entity})
            }.bind(this))
    }
    render(){
        var {entity}=this.state
        return (
            <div className="form">
                <div className="child-photo">
                    <img ref="photo" src={entity.photo}
                        onClick={this.takePhoto.bind(this)}/>
                </div>
                <TextField ref="name" floatingLabelText="child name" defaultValue={entity.name}/>

                <TextField ref="birthday" floatingLabelText="birthday" type="date"
                    defaultValue={entity.birthday}/>

                <RadioButtonGroup
                    label="gender"
                    name="gender" defaultSelected={entity.gender||'f'}>
                    <RadioButton value="f" label="girl"/>
                    <RadioButton value="m" label="boy" />
                </RadioButtonGroup>
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
}
