module.exports=others=>`
	type Child implements Node{
		id:ID!
		name:String!
		birthday:Date
		createdAt: Date
		photo(size: Int = 25): URL
		gender: Gender
		author: User
		score: Int

		publishes: [Publish]
		publish(_id:ObjectID):Publish

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

		pendingKnowledges: [Knowledge]
	}

	type Todo{
		knowledge: Knowledge
		content: String
		hidden: Boolean
		fields: JSON #default fields values
		day0: JSON #fields values for day0
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
		figure: URL
		toc: JSON
		photos: [URL]
		category: [String]
		tags: [String]
		fields: [JSON]
		days: [JSON]
		hasHomework(child:ObjectID): JSON
		hasPrint: JSON
		sale: String
		template: URL
		code: URL
		score: Int


		inTask(child:ObjectID): Boolean
		isMyWork: Boolean
		is4Classroom: Boolean
		supportTimer: Boolean
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
		updatedAt: Date
		status: Int
	}

	type Award implements Node{
		id: ID!
		author: User
		name: String!
		score: Int
		url: URL
		createdAt:Date
		updatedAt:Date
	}

	extend type User{
		children: [Child]
		child(_id:ObjectID): Child
		works: [Knowledge]
		awards: [Award]
	}

	extend type Query{
		knowledges(title:String, categories:[String], tags: [String],
			mine: Boolean, favorite: Boolean, tasked:Boolean, tasking:Boolean,
			hasHomework:Boolean, hasPrint:Boolean, hasSale:Boolean,
			first:Int, after:JSON):KnowledgeConnection
		knowledge(_id:ObjectID):Knowledge
		plan(_id:ObjectID):Plan
		crawl(url:String!, code:String, option:JSON):JSON
	}

	extend type Mutation{
		child_create(name:String!, photo:URL, birthday:Date,gender:Gender):Child
		child_update(_id:ObjectID!, photo:URL, name:String, birthday:Date,icon:String, gender:Gender): Date
		child_remove(_id:ObjectID!): Boolean
		
		plan_update_icon(_id:ObjectID, icon:String):Plan
		plan_reset_week(_id:ObjectID):Plan
		plan_reset_achievement(_id:ObjectID, goal:Int, todo:String):Plan
		plan_task_done(_id:ObjectID, content:String, knowledge:ObjectID, day:Int, props: JSON):Child
		
		plan_todos_add(_id:ObjectID, content:String, knowledge:ObjectID, fields:JSON):Plan
		plan_todos_remove(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_up(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_down(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_top(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_bottom(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		plan_todos_toggle(_id:ObjectID,content:String, knowledge:ObjectID):Plan
		
		knowledge_create(knowledge:JSON):Knowledge
		knowledge_update(_id:ObjectID, knowledge:JSON, child:ObjectID):Knowledge

		publish_create(template:String, child:ObjectID, from: Date, to: Date, name: String, copies: Int):Publish
		publish_update(_id:ObjectID, template:String, child:ObjectID, from: Date, to: Date, name: String, copies: Int): Date
		publish_done(_id:ObjectID):Date
		publish_remove(_id:ObjectID):Boolean

		award_create(name:String, score:Int, url: URL):User
		award_update(_id:ObjectID, name:String, score:Int, url: URL):Award
		award_remove(ids:[ObjectID!]):User
	}

	${others.join("\r\n")}
`
