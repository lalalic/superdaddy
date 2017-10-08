import React, {Component, PropTypes} from "react"
import {compose, getContext, withProps} from "recompose"
import {withMutation, withFragment} from "qili/tools/recompose"
import {graphql} from "react-relay"
import {ListItem} from "material-ui"

import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconInvite from 'material-ui/svg-icons/social/group-add'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconChild from "material-ui/svg-icons/places/child-care"

import Child from "family/child"
import Photo from "qili/components/photo"
import BaseAccount from "qili/components/account"

export const Account=({id,username,photo, babies=[], toCreate, toChild, setPhoto})=>(
    <BaseAccount {...{id,username,photo}}>
        <ListItem primaryText="我的宝贝"
            leftIcon={<IconAdd/>}
            initiallyOpen={true}
            autoGenerateNestedIndicator={false}
            onClick={toCreate}
            nestedItems={
                babies.map(({id,photo,name})=>
					<ListItem key={id} primaryText={name}
						onClick={e=>toChild(id)}
						leftAvatar={
							<Photo src={photo}
								onPhoto={url=>setPhoto({id,url})}
								iconRatio={2/3} width={40} height={40}/>
						}
					/>
                )
            }
        />
    </BaseAccount>
)

export default compose(
	withFragment(graphql`
		fragment account on User{
			id
			username
			photo
			children{
				id
				photo
				name
			}
		}
	`),
	withProps(({data})=>({...data, babies:data.children||[]})),
	withMutation(({},{id})=>({
		name:"setPhoto",
		patch4:id,
		mutation: graphql`
			mutation account_setPhoto_Mutation($id:ObjectID!, $url:String!){
				child_update(_id: $id, photo:$url)
			}
		`,
	})),
)(Account)
