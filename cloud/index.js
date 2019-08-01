const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

const KnowledgeStatistics=Cloud.buildStatistics("Knowledge",["viewed","accomplished","tasking","favorited"])
const KnowledgeFavorite=Cloud.buildFavorite("Knowledge","favorited")

Cloud.addModule({
	typeDefs:require("./schema")([
		KnowledgePagination.typeDefs,
		KnowledgeComment.typeDefs,
		KnowledgeFavorite.typeDefs,
		KnowledgeStatistics.typeDefs,
	
		ChildComment.typeDefs,
	]),
	resolver:Cloud.merge({},
		KnowledgeComment.resolver,
		KnowledgePagination.resolver,
		ChildComment.resolver,
		KnowledgeFavorite.resolver,
		KnowledgeStatistics.resolver,
		require("./resolver")
	),
	persistedQuery:require("./persisted-query"),
	indexes:require("./db"),
	static:require("./static"),
})


