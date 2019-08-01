const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

const KnowledgeStatistics=Cloud.buildStatistics("Knowledge",["viewed","accomplished","tasking","favorited","selled","sellSum"])
const KnowledgeFavorite=Cloud.buildFavorite("Knowledge","favorited")

Cloud.addModule(require("./market"))

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

Cloud.addModule({
	typeDefs:`
		extend type Award{
			merchandise: Merchandise
		}

		extend type Merchandise{
			knowledge: Knowledge
		}
	`,
	Award:{
		merchandise({merchandise},_,{app}){
			return app.get1Entity("Merchandise",{_id:merchandise})
		},
	},
	Merchandise:{
		knowledge({knowledge},_,{app}){
			return app.get1Entity("Knowledge",{_id:knowledge})
		}
	}
})