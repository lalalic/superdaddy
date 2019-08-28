const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

const KnowledgeStatistics=Cloud.buildStatistics("Knowledge",["viewed","accomplished","tasking","favorited","selled","sells"])
const KnowledgeFavorite=Cloud.buildFavorite("Knowledge","favorited")

const UserStatistics=Cloud.buildStatistics("User",["knowledges", "sells", "contribution"])

Cloud.addModule(require("./market"))

Cloud.addModule({
	typeDefs:require("./schema")([
		KnowledgePagination.typeDefs,
		KnowledgeComment.typeDefs,
		KnowledgeFavorite.typeDefs,
		KnowledgeStatistics.typeDefs,
		UserStatistics.typeDefs,
	
		ChildComment.typeDefs,
	]),
	resolver:Cloud.merge({},
		KnowledgeComment.resolver,
		KnowledgePagination.resolver,
		ChildComment.resolver,
		KnowledgeFavorite.resolver,
		KnowledgeStatistics.resolver,
		UserStatistics.resolver,
		require("./resolver")
	),
	persistedQuery:require("./persisted-query"),
	indexes:require("./db"),
	static(service){
		service.on(/.*/,require("../src/www/server"))
	},
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

Cloud.supportAnonymous=true