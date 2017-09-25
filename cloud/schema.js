Cloud.typeDefs=`
	type Child{
		id
		name
		birthday
	}
	
	type Knowledge{
	
	}
	
	type Task{
	
	}
	
	type FinishedTask{
	
	}
	
	type Plan{
	
	}
	
	${Cloud.pagination("Knowledge")}
	
	
	extend type User{
		children: [Child]
		works: [Knowledge]
	}
	
	extend type Query{
		knowledges(categories:[String], tags: [String], author:ObjectID):KnowledgeConnection
	}
`