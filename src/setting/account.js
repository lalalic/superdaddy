import React from "react"

import {compose} from "recompose"
import Photo from "qili-app/components/photo"
import Account from "qili-app/components/account"

import {withMutation, withFragment} from "qili-app/graphql"
import {ListItem} from "material-ui/List"

import IconAdd from "material-ui/svg-icons/content/add-circle-outline"

export default compose(
	withFragment({
		user:graphql`
		fragment account_user on User{
			...qili_account_user
			children{
				id
				photo
				name
			}
		}
	`}),
	withMutation(({},{id})=>({
		name:"update",
		patch4:id,
		mutation: graphql`
            mutation account_setPhoto_Mutation($id:ObjectID!, $photo:URL, $name:String, $birthday:Date,$gender:Gender){
                child_update(_id:$id, photo:$photo, name:$name, birthday:$birthday,gender:$gender)
            }
		`,
	})),
)(({user, toCreate, toChild, toGoals, update, ...others})=>(
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
		<ListItem primaryText="我的奖品..."
			leftIcon={<span/>}
			onClick={toGoals}
			/>
    </Account>
))
