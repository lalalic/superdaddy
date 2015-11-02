import {React, Component, UI, User} from "dashboard"
import {Avatar} from "material-ui"

var {List, Photo, CommandBar}=UI,
    RightArrow=require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right')

export default class Setting extends Component{
    render(){
        var user=User.current
        var avatar;
        if(user.photo)
            avatar=<Avatar src={user.photo}/>
        else {
            avatar=<Photo
                onPhoto={(url)=>{user.photo=url;User.upsert(user)}}
                iconRatio={2/3} width={40} height={40}/>
        }
        return (
            <div>
                <List>
                    <List.Item primaryText={user.name}
                        leftAvatar={avatar}
                        rightIcon={<RightArrow/>} />

                    <List.Divider inset={true}/>

                    <List.Item primaryText="设置"
                        leftAvatar={<span/>}
                        rightIcon={<RightArrow/>}
                        onTouchTap={()=>this.context.router.transitionTo('setting')}/>
                </List>
                <CommandBar className="footbar" items={["Back"]}/>
            </div>
        )
    }

}

Setting.contextTypes={router:React.PropTypes.func}
