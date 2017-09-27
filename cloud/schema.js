Cloud.typeDefs=`
	type Child implements Node{
		id:ID!
		name:String!
		birthday:Date
		createdAt: Date
		photo(size: Int = 25): String
		gender: Gender
		author: User
		
		score: Int
		todo: String
		goal: Int
		totalScore: Int
		todos: [String]
		icon: String
	}
	
	type Knowledge implements Node{
		id:ID!
		author:User
	}
	
	type Task implements Node{
		id:ID!
		author:User
		
	}
	
	type FinishedTask implements Node{
		id:ID!
		author:User
	}
	
	type Plan implements Node{
		id:ID!
		author:User
		owner:User
	}
	
	${Cloud.pagination("Knowledge").typeDefs}
	
	
	extend type User{
		children: [Child]
		child(_id:ObjectID): Child
		works: [Knowledge]
	}
	
	extend type Query{
		knowledges(categories:[String], tags: [String], author:ObjectID):KnowledgeConnection
	}
	
	extend type Mutation{
		child_remove(_id:ObjectID!): Boolean
		child_create(name:String!, photo:String, birthday:Date,gender:Gender):Child
		child_update(_id:ObjectID!, name:String, photo:String, birthday:Date,gender:Gender): Date
	}
`

Cloud.resolver={
	Child:{
		birthday:({birthday,bd})=>birthday||bd,
	},
	
	Mutation:{
		child_remove(_,{_id},{app,user}){
			return app.remove1Entity("users",  {_id, author:user._id})
		},
		child_create(_,child, {app,user}){
			return app.createEntity("users", child)
		},
		child_update(_, {_id, $set}, {app,user}){
			if($set.name!==undefined && !$set.name)
				throw new Error("name can't be empty")
			return app.patch1Entity("users", {_id,author:user._id}, {...$set, author:user._id})
		}
	}
}