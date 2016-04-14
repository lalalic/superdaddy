import {React, Component, UI, User} from "qili-app"
import {Avatar} from "material-ui"

var {List, Photo, CommandBar}=UI,
    RightArrow=require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right')

export default class Account extends Component{
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
                    <List.Item primaryText={user.name||user.username}
                        leftAvatar={avatar}
                        rightIcon={<RightArrow/>} />

                    <List.Divider inset={true}/>

                </List>
                <CommandBar className="footbar"
                    onSelect={this.onSelect.bind(this)}
                    primary="帐号"
                    items={["Back", "帐号", "设置"]}/>
            </div>
        )
    }

    onSelect(command){
        switch(command){
        case "设置":
            this.context.router.transitionTo('setting')
            break
        }
    }

}

Account.contextTypes={router:React.PropTypes.func}
