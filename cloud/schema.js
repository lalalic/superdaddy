module.exports=others=>`
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
		
		caps:[String]
		goals:[String]
		months:[MonthPlan]
	}
	
	type Todo{
		knowledge: Knowledge
		content: String
		hidden: Boolean
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
		fields: [JSON]
		days: [JSON]
		hasHomework: JSON
		hasPrint: JSON
		sale: String
		template: String
		
		
		inTask(child:ObjectID): Boolean
		isMyWork: Boolean
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
		knowledges(title:String, categories:[String], tags: [String], 
			mine: Boolean, favorite: Boolean, tasked:Boolean, tasking:Boolean,
			first:Int, after:JSON):KnowledgeConnection
		knowledge(_id:ObjectID):Knowledge
	}
	
	extend type Mutation{
		child_remove(_id:ObjectID!): Boolean
		child_create(name:String!, photo:String, birthday:Date,gender:Gender):Child
		child_update(_id:ObjectID!, photo:String, name:String, photo:String, birthday:Date,icon:String, gender:Gender): Date
				
		plan_update(_id:ObjectID, plan:JSON):Plan
		plan_task_done(_id:ObjectID, content:String, knowledge:ObjectID, day:Int, props: JSON):Child
		plan_reset(_id:ObjectID):Plan
		plan_todos_add(_id:ObjectID, content:String, knowledge:ObjectID):Plan
		plan_todos_remove(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_removeNth(_id:ObjectID,i:Int):Plan
		plan_todos_up(_id:ObjectID,i:Int):Plan
		plan_todos_down(_id:ObjectID,i:Int):Plan
		plan_todos_top(_id:ObjectID,i:Int):Plan
		plan_todos_bottom(_id:ObjectID,i:Int):Plan
		plan_todos_toggle(_id:ObjectID,i:Int):Plan
		plan_auto(_id:ObjectID):Plan
		
		knowledge_create(knowledge:JSON):Knowledge
		knowledge_update(_id:ObjectID, knowledge:JSON):Knowledge

		publish_create(template:String, child:ObjectID, from: Date, to: Date, name: String, copies: Int):Publish
		publish_remove(_id:ObjectID):Boolean
	}
	
	${others.join("\r\n")}
`