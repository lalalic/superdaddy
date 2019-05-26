import React, {Component} from "react"
import PropTypes from "prop-types"

import {compose, getContext, withProps} from "recompose"
import {withMutation, withFragment, Photo, Account} from "qili-app"
import {graphql} from "react-relay"
import {ListItem} from "material-ui"

import IconAdd from "material-ui/svg-icons/content/add-circle-outline"
import IconRightArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import IconSetting from 'material-ui/svg-icons/action/settings'
import IconInvite from 'material-ui/svg-icons/social/group-add'
import IconPublish from "material-ui/svg-icons/image/camera-roll"
import IconChild from "material-ui/svg-icons/places/child-care"

import Child from "family/child"

export default compose(
	withFragment(graphql`
		fragment account_user on User{
			...qili_account_user
			children{
				id
				photo
				name
			}
		}
	`),
	withMutation(({},{id})=>({
		name:"update",
		patch4:id,
		mutation: graphql`
            mutation account_setPhoto_Mutation($id:ObjectID!, $photo:URL, $name:String, $birthday:Date,$gender:Gender){
                child_update(_id:$id, photo:$photo, name:$name, birthday:$birthday,gender:$gender)
            }
		`,
	})),
)(({user, toCreate, toChild, update, ...others})=>(
    <Account user={user} update={update} {...others}>
        <ListItem primaryText="我的宝贝"
            leftIcon={<IconAdd/>}
            initiallyOpen={true}
            autoGenerateNestedIndicator={false}
            onClick={toCreate}
            nestedItems={
                user.children.map(({id,photo,name})=>
					<ListItem key={id}
						primaryText={name}
						onClick={e=>toChild(id)}
						leftIcon={
							<Photo src={photo}
								autoUpload={{id,key:'photo.jpg'}}
								onPhoto={photo=>update({id,photo})}
								/>
						}
					/>
                )
            }
        />
    </Account>
))
