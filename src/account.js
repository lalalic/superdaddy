import {React, Component, UI, User} from "qili-app"
import {Avatar} from "material-ui"
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import InviteIcon from 'material-ui/svg-icons/social/group-add'
import PublishIcon from "material-ui/svg-icons/image/camera-roll"

var {List, Photo, CommandBar}=UI

import {Family as dbFamily} from "./db"

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

        let router=this.context.router,
            children=dbFamily.children,
            len=children.length,
            uiChildren=children.map(function(a){
                var avatar;
                if(a.photo)
                    avatar=(<Avatar src={a.photo}/>)
                else{
                    let photo=(<Photo
                        onPhoto={(url)=>this.shortcutPhoto(a,url)}
                        iconRatio={2/3} width={40} height={40}/>)

                    avatar=photo
                }

                return (
                    <List.Item key={a._id}
                        onClick={$=>router.push(`baby/${(dbFamily.currentChild=a)._id}`)}
                        leftAvatar={avatar}>
                        {a.name}
                    </List.Item>
                )
            })

        return (
            <div>
                <List>
                    <List.Item primaryText={user.name||user.username}
                        leftAvatar={avatar}
                        rightIcon={<RightArrow/>} />

                    <List.Divider inset={true}/>

                    <List.Item primaryText="我的宝贝"
                        leftIcon={<span/>}
                        open={true}
                        onClick={a=>router.push("baby")}
                        rightAvatar={<Avatar>+</Avatar>}>
                        {uiChildren}
                    </List.Item>

                    <List.Divider inset={true}/>

                    <List.Item primaryText="邀请家人"
                        leftIcon={<InviteIcon/>}
                        onClick={a=>router.push("invite")}
                        />

                    <List.Item primaryText="出书"
                        leftIcon={<PublishIcon/>}
                        onClick={a=>router.push("publish")}
                        />

                    <List.Item primaryText="设置"
                        leftIcon={<SettingIcon/>}
                        onClick={e=>this.context.router.push('setting')}
                        />
                </List>
				<CommandBar className="footbar"
                    items={["Back"]}
                    />
            </div>
        )
    }

    shortcutPhoto(child, url){
        dbFamily.upsert(child,{photo:url})
    }
}

Account.contextTypes={router:React.PropTypes.object}
