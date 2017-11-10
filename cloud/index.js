const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

Cloud.resolver=Cloud.merge(
	KnowledgeComment.resolver,
	KnowledgePagination.resolver,
	ChildComment.resolver,
	require("./resolver")
)

Cloud.persistedQuery=require("./persisted-query")

Cloud.indexes=require("./db")

require("./static").extend(Cloud.static)

Cloud.typeDefs=require("./schema")([
	KnowledgePagination.typeDefs,
	KnowledgeComment.typeDefs,
	ChildComment.typeDefs
])

