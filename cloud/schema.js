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
		
		publishs: [Publish]
		
		plan: Plan
	}
	
	type Plan implements Node{
		id:ID!
		icon: String
		goal: Int
		score: Int
		todo: String
		week: Int
		
		todos: [Todo]
		
		goals:[String]
		months:[MonthPlan]
	}
	
	type Todo{
		knowledge: ObjectID
		content: String
		day0: JSON
		day1: JSON
		day2: JSON
		day3: JSON
		day4: JSON
		day5: JSON
		day6: JSON
	}
	
	type MonthPlan{
		goals:[String]
		knowledges:[Knowledge]
	}
	
	type Knowledge implements Node{
		id:ID!
		author:User
		title:String!
		content:String
		createdAt:Date
		updatedAt:Date
		summary: String
		figure: String
		photos: [String]
		zans: Int
		category: [String]
		keywords: [String]
		inTask(child:ObjectID): Boolean
		
		files: [File]
	}
	
	type Task implements Node{
		id:ID!
		author:User
		
	}
	
	type FinishedTask implements Node{
		id:ID!
		author:User
	}
	
	${Cloud.pagination("Knowledge").typeDefs}
	
	type Publish implements Node{
		id:ID!
		author: User
		child: Child
		name: String
		template: String
		copies: Int
		from: Date
		to: Date
		createdAt: Date
	}
	
	extend type User{
		children: [Child]
		child(_id:ObjectID): Child
		works: [Knowledge]
	}
	
	extend type Query{
		knowledges(first:Int, after:JSON):KnowledgeConnection
		knowledge(_id:ObjectID):Knowledge
	}
	
	extend type Mutation{
		child_remove(_id:ObjectID!): Boolean
		child_create(name:String!, photo:String, birthday:Date,gender:Gender):Child
		child_update(_id:ObjectID!, name:String, photo:String, birthday:Date,icon:String, gender:Gender): Date
				
		plan_update(_id:ObjectID, plan:JSON):Plan
		plan_task(_id:ObjectID, content:String, knowledge:ObjectID):Plan
		plan_untask(_id:ObjectID, content:String, knowledge:ObjectID):Plan
		
		knowledge_create(knowledge:JSON):Knowledge
		knowledge_update(_id:ObjectID, knowledge:JSON):Date

		publish_create(template:String, child:ObjectID, from: Date, to: Date, name: String, copies: Int):Publish
		publish_remove(_id:ObjectID):Boolean
	}
`

Cloud.resolver={
	Child:{
		birthday:({birthday,bd})=>birthday||bd,
        id: ({_id})=>`childs:${_id}`,
		score: ({score})=>score||0,
		publishs(child, {}, {app}){
			return app.findEntity("publishs", {child:child._id})
		},
		plan({_id},{},{app}){
			return app.get1Entity("plans",{_id})
				.then(plan=>plan||{_id,score:0})
		}
	},
	
	Plan:{
		id: ({_id})=>`plans:${_id}`,
		score: ({score})=>score||0,
	},
	
	User:{
		child(child, {_id}, {app,user}){
			return app.get1Entity("users", {_id,author:user._id})
		},
		
		children(me, {}, {app,user}){
			return app.findEntity("users", {author:user._id})
		}
	},
	
	Query:{
		knowledges(_,{first=10,after={}},{app}){
			const {title,categories,tags,createdAt,_id}=after
			const query={}
			return app.findEntity("knowledges", {}, cursor=>{
					let filtered=cursor.batchSize(first).sort([["createdAt",1]]).limit(2*first)
					if(title){
						filtered=filtered.filter({title: new RegExp(`${title}.*`,"i")})
					}
					if(categories && categories.length){
						
					}
					if(tags && tags.length){
						
					}
					
					if(createdAt){
						filtered=filtered.filter({createdAt:{$le:createdAt}})
					}
					
					return filtered
				})
				.then(docs=>({
					nodes: _id ? docs.slice(docs.findIndex(a=>a._id==id)) : docs,
					hasNextPage: docs.length>2*first,
				}))
				.then(({nodes,hasNextPage})=>{
					let last=nodes[nodes.length-1]
					return {
						edges:nodes.map(node=>({node})),
						pageInfo:{
							hasNextPage,
							endCursor: {
								title,categories,tags,
								...(!!last ? {_id: last._id, createdAt:last.createdAt} : {_id, createdAt} )
							}
						}
					}
				})
		},
	},
	
	Mutation:{
		child_remove(_,{_id},{app,user}){
			return app.remove1Entity("users",  {_id, author:user._id})
		},
		child_create(_,child, {app,user}){
			return app.createEntity("users", {...child,author:user._id})
		},
		child_update(_, {_id, ...$set}, {app,user}){
			if($set.name!==undefined && !$set.name)
				throw new Error("name can't be empty")
			return app.patchEntity("users", {_id,author:user._id}, {...$set, author:user._id})
		},
		
		knowledge_create(_, {knowledge:{photos=[], ...knowledge}}, {app,user}){
			return app.createEntity("knowledges", {...knowledge, photos, author:user._id})
				.then(knowledge=>{
					if(photos.length){
						Cloud.file_link(`knowledges:${knowledge._id}`,photos)
					}
					return knowledge
				})
		},
		
		knowledge_update(_, {_id, newPhotos, knowledge}, {app,user}){
			return app.patchEntity("knowledges", {_id}, {...knowledge,author:user._id})
				.then(updatedAt=>{
					if(newPhotos){
						Cloud.file_link(`knowledges:${_id}`,newPhotos)
					}
					return updatedAt
				})
		},
		
		publish_create(_, doc, {app,user}){
			return app.createEntity("publishs", {...doc, author:user._id})
		},
		
		publish_remove(_, {_id}, {app,user}){
			return app.remove1Entity("publishs",{_id, author: user._id})
		},
		
		async plan_update(_,{_id, plan},{app,user}){
			let conn = await app.collection("plans")
			try{
				let {modifiedCount,upsertedId}=await conn.updateOne({_id},{$set:plan},{upsert:true})
				debugger
				return await conn.findOne({_id})
			}finally{
				conn.close()
			}
		},
		
		plan_task(_,{_id, content,knowledge}, {app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let todos=null
					if(!plan || !plan.todos){
						todos=[]
					}else{
						todos=plan.todos
					}
					
					if(!todos.find(a=>knowledge ? a.knowledge===knowledge : a.content===content)){
						todos.push({content,knowledge})
						return Cloud.resolver.Mutation.plan_update(_,{_id,todos},{app,user})
					}
					
					return plan
				})
		},
		plan_untask(_,{_id, content,knowledge}, {app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let todos=null
					if(!plan || !plan.todos){
						todos=[]
					}else{
						todos=plan.todos
					}
					
					let index=todos.findIndex(a=>knowledge ? a.knowledge===knowledge : a.content===content)
					if(index!=-1){
						todos.splice(index,1)
						return Cloud.resolver.Mutation.plan_update(_,{_id,todos},{app,user})
					}
					
					return plan
				})
		},				
	},
	
	Knowledge: {
		id: ({_id})=>`knowledges:${_id}`,
		
		files({_id},{},{app,user}){
			return app.findEntity("files",{host:`knowledges:${_id}`})
		},
		
		inTask({_id},{child},{app,user}){
			return app.get1Entity("plans",{_id:child})
				.then(plan=>{
					if(!plan || !plan.todos)
						return false
					return !!plan.todos.find(({knowledge})=>knowledge==_id)
				})
		},
	},
	
	Publish: {
		id: ({_id})=>`publishs:${_id}`,
		
		author({author}, {}, {app,user}){
			if(author==user._id)
				return user
			
			return app.get1Entity("users", {_id:author})
		},
		
		child({child}, {}, {app,user}){
			return app.get1Entity("users", {_id: child, author: user._id})
		},
	},
	
	MonthPlan:{
		knowledges({knowledges=[]},{},{app,user}){
			return Promise.all(knowledges.map(_id=>app.get1Entity("knowledges",{_id})))
		}
	}
}