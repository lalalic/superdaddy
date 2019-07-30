const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

const KnowledgeStatistics=Cloud.buildStatistics("Knowledge",["viewed","accomplished","tasking","favorited"])
const KnowledgeFavorite=Cloud.buildFavorite("Knowledge","favorited")

require("./static").extend(Cloud.static)

module.exports=Object.assign(Cloud,{
	resolver:Cloud.merge(
		KnowledgeComment.resolver,
		KnowledgePagination.resolver,
		ChildComment.resolver,
		KnowledgeFavorite.resolver,
		KnowledgeStatistics.resolver,
		require("./resolver")
	),
	persistedQuery:require("./persisted-query"),
	indexes:require("./db"),
	typeDefs:require("./schema")([
		KnowledgePagination.typeDefs,
		KnowledgeComment.typeDefs,
		KnowledgeFavorite.typeDefs,
		KnowledgeStatistics.typeDefs,
	
		ChildComment.typeDefs,
	]),
})
