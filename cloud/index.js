const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

const KnowledgeFavorite=Cloud.buildFavorite("Knowledge")
const KnowledgeStatistics=Cloud.buildStatistics("Knowledge",["viewed","accomplished"])

Cloud.resolver=Cloud.merge(
	KnowledgeComment.resolver,
	KnowledgePagination.resolver,
	ChildComment.resolver,
	KnowledgeFavorite.resolver,
	KnowledgeStatistics.resolver,
	require("./resolver")
)

Cloud.persistedQuery=require("./persisted-query")

Cloud.indexes=require("./db")

require("./static").extend(Cloud.static)

Cloud.typeDefs=require("./schema")([
	KnowledgePagination.typeDefs,
	KnowledgeComment.typeDefs,
	KnowledgeFavorite.typeDefs,
	KnowledgeStatistics.typeDefs,

	ChildComment.typeDefs,
])

//Cloud.canRunInCore=false

module.exports=Cloud
