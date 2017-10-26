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

export const Account=({id,username,photo, babies=[], toCreate, toChild, update, toSetting, toProfile})=>(
    <BaseAccount {...{id,username,photo,toSetting,toProfile}}>
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
							<Photo src={photo} size={40}
								autoUpload={{id,key:'photo.jpg'}}
								onPhoto={photo=>update({id,photo})}
								/>
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
	withProps(({data:{id,username,photo,children:babies}})=>({
        id,username,photo,
        babies:babies||[]
    })),
	withMutation(({},{id})=>({
		name:"update",
		patch4:id,
		mutation: graphql`
            mutation account_setPhoto_Mutation($id:ObjectID!, $photo:String, $name:String, $birthday:Date,$gender:Gender){
                child_update(_id:$id, photo:$photo, name:$name, birthday:$birthday,gender:$gender)
            }
		`,
	})),
)(Account)
