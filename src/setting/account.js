import React, {Component, PropTypes} from "react"
import {ListItem} from "material-ui"

import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import RightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import SettingIcon from 'material-ui/svg-icons/action/settings'
import InviteIcon from 'material-ui/svg-icons/social/group-add'
import PublishIcon from "material-ui/svg-icons/image/camera-roll"
import BabyIcon from "material-ui/svg-icons/places/child-care"

import Baby from "family/baby"


const {Photo,Account:BaseAccount}=UI

export const Account=({dispatch,children,router, })=>(
    <BaseAccount>
        <ListItem primaryText="我的宝贝"
            leftIcon={<IconAdd/>}
            initiallyOpen={true}
            autoGenerateNestedIndicator={false}
            onClick={a=>router.push("/baby")}
            nestedItems={
                children.map(({_id,photo,name})=>
                        <ListItem key={_id} primaryText={name}
                            onClick={e=>router.push(`/baby/${_id}`)}
                            leftAvatar={
                                <Photo src={photo}
                                    onPhoto={url=>dispatch(Baby.ACTION.CHANGE("photo",url))}
                                    iconRatio={2/3} width={40} height={40}/>
                            }
                        />
                )
            }
        />
    </BaseAccount>
)

Account.contextTypes={
    router: PropTypes.object
}

export default compose(
	getContext({router: PropTypes.object}),
	withMutation({
		name:"setPhoto",
	})
)(Account)
