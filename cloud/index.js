
Cloud.persistedQuery={
    "app_create_Mutation": "mutation app_create_Mutation(\n  $name: String!\n  $uname: String\n) {\n  app_create(name: $name, uname: $uname) {\n    id\n    name\n    uname\n    apiKey\n  }\n}\n",
    "app_remove_Mutation": "mutation app_remove_Mutation(\n  $id: ObjectID!\n) {\n  app_remove(_id: $id)\n}\n",
    "app_update_Mutation": "mutation app_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $uname: String\n) {\n  app_update(_id: $id, name: $name, uname: $uname)\n}\n",
    "cloud_update_Mutation": "mutation cloud_update_Mutation(\n  $id: ObjectID!\n  $cloudCode: String!\n) {\n  app_update(_id: $id, cloudCode: $cloudCode)\n}\n",
    "userProfile_setPhoto_Mutation": "mutation userProfile_setPhoto_Mutation(\n  $url: String!\n  $id: ID!\n  $field: String = \"photo\"\n) {\n  file_link(url: $url, id: $id, field: $field)\n}\n",
    "userProfile_update_Mutation": "mutation userProfile_update_Mutation(\n  $username: String\n  $birthday: Date\n  $gender: Gender\n  $location: String\n  $signature: String\n) {\n  user_update(username: $username, birthday: $birthday, gender: $gender, location: $location, signature: $signature)\n}\n",
    "account_setPhoto_Mutation": "mutation account_setPhoto_Mutation(\n  $id: ObjectID!\n  $url: String!\n) {\n  child_update(_id: $id, photo: $url)\n}\n",
    "authentication_login_Mutation": "mutation authentication_login_Mutation(\n  $contact: String!\n  $token: String!\n  $name: String\n) {\n  login(contact: $contact, token: $token, name: $name) {\n    token\n    id\n  }\n}\n",
    "authentication_requestToken_Mutation": "mutation authentication_requestToken_Mutation(\n  $contact: String!\n) {\n  requestToken(contact: $contact)\n}\n",
    "comment_update_Mutation": "mutation comment_update_Mutation(\n  $id: ID!\n  $content: String!\n  $type: CommentType\n) {\n  comment(host: $id, content: $content, type: $type) {\n    id\n    createdAt\n  }\n}\n",
    "main_app_update_Query": "query main_app_update_Query(\n  $id: ObjectID!\n) {\n  me {\n    app(_id: $id) {\n      ...app\n      id\n    }\n    id\n  }\n}\n\nfragment app on App {\n  id\n  name\n  uname\n  apiKey\n}\n",
    "main_comment_Query": "query main_comment_Query(\n  $id: ObjectID!\n  $count: Int = 10\n  $cursor: String\n) {\n  me {\n    id\n    app(_id: $id) {\n      ...comment\n      id\n    }\n  }\n}\n\nfragment comment on App {\n  comments(last: $count, before: $cursor) {\n    edges {\n      node {\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "main_my_apps_Query": "query main_my_apps_Query {\n  me {\n    ...my\n    id\n  }\n}\n\nfragment my on User {\n  ...account\n  apps {\n    id\n    name\n  }\n}\n\nfragment account on User {\n  id\n  username\n  photo\n}\n",
    "main_prefetch_Query": "query main_prefetch_Query {\n  me {\n    name\n    token\n    apps {\n      id\n      name\n      uname\n      cloudCode\n      apiKey\n    }\n    id\n  }\n}\n",
    "main_userProfile_me_Query": "query main_userProfile_me_Query {\n  me {\n    ...userProfile\n    id\n  }\n}\n\nfragment userProfile on User {\n  id\n  username\n  birthday\n  gender\n  location\n  photo\n  signature\n}\n",
    "create_knowledge_Mutation": "mutation create_knowledge_Mutation(\n  $knowledge: JSON\n) {\n  knowledge_create(knowledge: $knowledge) {\n    id\n    createdAt\n  }\n}\n",
    "create_tokens_Mutation": "mutation create_tokens_Mutation(\n  $count: Int\n) {\n  file_tokens(count: $count) {\n    token\n  }\n}\n",
    "info_tokens_Mutation": "mutation info_tokens_Mutation(\n  $count: Int\n) {\n  file_tokens(count: $count) {\n    token\n  }\n}\n",
    "info_update_Mutation": "mutation info_update_Mutation(\n  $id: ObjectID\n  $info: JSON\n) {\n  knowledge_update(_id: $id, knowledge: $info) {\n    ...content_knowledge\n    id\n  }\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n",
    "list_remove_Mutation": "mutation list_remove_Mutation(\n  $id: ObjectID\n) {\n  publish_remove(_id: $id)\n}\n",
    "publish_publish_Mutation": "mutation publish_publish_Mutation(\n  $template: String\n  $startAt: Date\n  $endAt: Date\n  $child: ObjectID\n  $copies: Int = 1\n  $bookName: String\n) {\n  publish_create(template: $template, from: $startAt, to: $endAt, child: $child, copies: $copies, name: $bookName) {\n    id\n    createdAt\n  }\n}\n",
    "timeManage_add_Mutation": "mutation timeManage_add_Mutation(\n  $child: ObjectID\n  $content: String\n  $knowledge: ObjectID\n) {\n  plan_todos_add(_id: $child, content: $content, knowledge: $knowledge) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_bottom_Mutation": "mutation timeManage_bottom_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_bottom(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_down_Mutation": "mutation timeManage_down_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_down(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_removeNth_Mutation": "mutation timeManage_removeNth_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_removeNth(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_remove_Mutation": "mutation timeManage_remove_Mutation(\n  $child: ObjectID\n  $content: String\n  $knowledge: ObjectID\n) {\n  plan_todos_remove(_id: $child, content: $content, knowledge: $knowledge) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_reset_Mutation": "mutation timeManage_reset_Mutation(\n  $child: ObjectID\n) {\n  plan_reset(_id: $child) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_status_Mutation": "mutation timeManage_status_Mutation(\n  $child: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $child, plan: $plan) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_taskDone_Mutation": "mutation timeManage_taskDone_Mutation(\n  $child: ObjectID\n  $task: String\n  $knowledge: ObjectID\n  $day: Int\n) {\n  plan_task_done(_id: $child, content: $task, knowledge: $knowledge, day: $day) {\n    score\n    plan {\n      ...core\n      id\n    }\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_toggle_Mutation": "mutation timeManage_toggle_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_toggle(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_top_Mutation": "mutation timeManage_top_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_top(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "timeManage_up_Mutation": "mutation timeManage_up_Mutation(\n  $child: ObjectID\n  $i: Int\n) {\n  plan_todos_up(_id: $child, i: $i) {\n    ...core\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n",
    "child_create_Mutation": "mutation child_create_Mutation(\n  $name: String!\n  $photo: String\n  $birthday: Date\n  $gender: Gender\n) {\n  child_create(name: $name, photo: $photo, birthday: $birthday, gender: $gender) {\n    id\n    createdAt\n  }\n}\n",
    "child_planupdate_Mutation": "mutation child_planupdate_Mutation(\n  $id: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $id, plan: $plan) {\n    id\n    icon\n    todo\n  }\n}\n",
    "child_remove_Mutation": "mutation child_remove_Mutation(\n  $id: ObjectID!\n) {\n  child_remove(_id: $id)\n}\n",
    "child_update_Mutation": "mutation child_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $birthday: Date\n  $gender: Gender\n) {\n  child_update(_id: $id, name: $name, birthday: $birthday, gender: $gender)\n}\n",
    "plan_auto_Mutation": "mutation plan_auto_Mutation(\n  $child: ObjectID\n) {\n  plan_auto(_id: $child) {\n    ...plan\n    id\n  }\n}\n\nfragment plan on Plan {\n  caps\n  goals\n  months {\n    goals\n    knowledges {\n      id\n      title\n    }\n  }\n}\n",
    "plan_update_Mutation": "mutation plan_update_Mutation(\n  $child: ObjectID\n  $plan: JSON\n) {\n  plan_update(_id: $child, plan: $plan) {\n    ...plan\n    id\n  }\n}\n\nfragment plan on Plan {\n  caps\n  goals\n  months {\n    goals\n    knowledges {\n      id\n      title\n    }\n  }\n}\n",
    "src_account_Query": "query src_account_Query {\n  me {\n    ...account\n    id\n  }\n}\n\nfragment account on User {\n  id\n  username\n  photo\n  children {\n    id\n    photo\n    name\n  }\n}\n",
    "src_childComments_Query": "query src_childComments_Query(\n  $parent: ObjectID!\n  $count: Int = 10\n  $cursor: JSON\n) {\n  ...src_childComments\n}\n\nfragment src_childComments on Query {\n  comments: child_comments(parent: $parent, last: $count, before: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        isOwner\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "src_child_Query": "query src_child_Query(\n  $id: ObjectID\n) {\n  me {\n    child(_id: $id) {\n      ...child\n      id\n    }\n    id\n  }\n}\n\nfragment child on Child {\n  id\n  name\n  photo\n  birthday\n  gender\n  totalScore: score\n  plan {\n    score\n    goal\n    todo\n    icon\n    id\n  }\n}\n",
    "src_comment_Query": "query src_comment_Query(\n  $parent: ObjectID!\n  $count: Int = 10\n  $cursor: JSON\n) {\n  ...src_knowledgeComments\n}\n\nfragment src_knowledgeComments on Query {\n  comments: knowledge_comments(parent: $parent, last: $count, before: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        isOwner\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "src_knowledge_Query": "query src_knowledge_Query(\n  $id: ObjectID\n  $child: ObjectID\n) {\n  knowledge(_id: $id) {\n    ...info_knowledge\n    id\n  }\n}\n\nfragment info_knowledge on Knowledge {\n  sale\n  id\n  inTask(child: $child)\n  hasHomework\n  hasPrint\n  isMyWork\n  title\n  summary\n  figure\n  template\n  ...content_knowledge\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n",
    "src_knowleges_Query": "query src_knowleges_Query(\n  $title: String\n  $categories: [String]\n  $tags: [String]\n  $count: Int\n  $cursor: JSON\n) {\n  ...list\n}\n\nfragment list on Query {\n  knowledges(title: $title, categories: $categories, tags: $tags, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        title\n        ...listItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment listItem on Knowledge {\n  id\n  title\n  summary\n  photos\n  zans\n  createdAt\n  updatedAt\n}\n",
    "src_plan_Query": "query src_plan_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...plan\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment plan on Plan {\n  caps\n  goals\n  months {\n    goals\n    knowledges {\n      id\n      title\n    }\n  }\n}\n",
    "src_prefetch_Query": "query src_prefetch_Query {\n  me {\n    id\n    token\n    children {\n      id\n      name\n      photo\n    }\n  }\n}\n",
    "src_profile_Query": "query src_profile_Query {\n  me {\n    id\n    username\n    birthday\n    gender\n    location\n    photo\n    signature\n  }\n}\n",
    "src_publishes_Query": "query src_publishes_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      ...list_publishes\n      id\n    }\n    id\n  }\n}\n\nfragment list_publishes on Child {\n  publishs {\n    id\n    name\n    template\n    from\n    to\n    copies\n  }\n}\n",
    "src_scorepad_Query": "query src_scorepad_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...scorePad\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n",
    "src_timeManage_Query": "query src_timeManage_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...core\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n"
}


Cloud.static.on(/knowledge/,function({path,app}, {send}){
	let infos=path.split(/[\/\.]/)
	let id=infos.pop()
	app.runQL(`query knowledge($id:String){
				knowledge(_id:$id){
					title
					content
					figure
					author{
						username
					}
					createdAt
				}
			}`,{id})
		.then(({data:{knowledge:{title,content,figure,author,createdAt}},errors})=>send(`
			<html>
				<head>
					<title>${title}</title>
				</head>
				<body>
					<article>
						${figure ? '<figure><img src="${figure}"></figure>' : ''}
						<header>
							<p>
								<span>${author.username}</span>  
								<time>${createdAt}</time>
							</p>
						</header>
						<section>
							${content}
						</section>
					</article>
				</body>
			</html>
		`))
		.catch(send)
})

const KnowledgeComment=Cloud.buildComment("Knowledge")
const KnowledgePagination=Cloud.buildPagination("Knowledge")
const ChildComment=Cloud.buildComment("Child")

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
	
	${ChildComment.typeDefs}
	
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
	
	${KnowledgePagination.typeDefs}
	${KnowledgeComment.typeDefs}	
	
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
		knowledges(title:String, categories:[String], tags: [String], first:Int, after:JSON):KnowledgeConnection
		knowledge(_id:ObjectID):Knowledge
	}
	
	extend type Mutation{
		child_remove(_id:ObjectID!): Boolean
		child_create(name:String!, photo:String, birthday:Date,gender:Gender):Child
		child_update(_id:ObjectID!, name:String, photo:String, birthday:Date,icon:String, gender:Gender): Date
				
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
`

function relativeDate(d, days){
	return new Date(d.getTime()+24*60*60*1000*days)
}

function currentWeek(){
	let week=new Date()
	week=relativeDate(week,-1*week.getDay())
	week.setHours(0,0,0,0)
	return parseInt(week.getTime()/1000)
}

const exists=(todos, content,knowledge)=>1+todos.findIndex(a=>knowledge ? a.knowledge===knowledge : a.content===content)

const CAPS=["观察能力","自制力","专注力","记忆力"]
Cloud.resolver=Cloud.merge(
	KnowledgeComment.resolver,
	KnowledgePagination.resolver,
	ChildComment.resolver,{
	Child:{
		birthday:({birthday,bd})=>birthday||bd,
        id: ({_id})=>`childs:${_id}`,
		score: ({score})=>score||0,
		publishs(child, {}, {app}){
			return app.findEntity("publishs", {child:child._id})
		},
		plan({_id},{},{app}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					if(!plan){
						return app.createEntity("plans",{_id,week:currentWeek(),score:0,goal:0,todos:[]})
					}
					return plan
				})
		}
	},
	
	Plan:{
		id: ({_id})=>`plans:${_id}`,

		caps: ()=>CAPS,
	},
	
	User:{
		child(child, {_id}, {app,user}){
			return app.getDataLoader("users")
				.load(_id)
				.then(a=>a.author==user._id ? a : null)
		},
		
		children(me, {}, {app,user}){
			return app.findEntity("users", {author:user._id})
		}
	},
	
	Query:{
		knowledge(_,{_id},{app}){
			return app.get1Entity("knowledges",{_id})
		},
		knowledges(_,{title,categories,tags,first=10,after},{app}){
			const [createdAt,_id]=(after||":").split(":")
			return app.findEntity("knowledges", {}, cursor=>{
					let filtered=cursor.sort([["createdAt",-1]]).limit(first+parseInt(first/2))
					if(createdAt){
						filtered=filtered.filter({createdAt:{$lte:new Date(parseInt(createdAt))}})
					}
					
					if(title){
						filtered=filtered.filter({title: new RegExp(`${title}.*`,"i")})
					}
					
					if(categories && categories.length){
						
					}
					if(tags && tags.length){
						
					}
					return filtered
				})
				.then(docs=>{
					let edges=_id ? docs.slice(docs.findIndex(a=>a._id==_id)+1) : docs
					let hasNextPage=false
					
					if(edges.length>=first){
						edges=edges.slice(0,first)
						hasNextPage=true
					}
					return {
						edges,
						hasNextPage,
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
				})
				.then(()=>app.get1Entity("knowledges", {_id}))
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
				return await conn.findOne({_id})
			}finally{
				conn.close()
			}
		},	

		async plan_task_done(_,{_id,content,knowledge,props,day},{app,user}){
			let score=1
			if(knowledge){
				let kl=await app.get1Entity("knowledges",{_id:knowledge})
				if(kl && kl.score)
					score=kl.score
			}
			let childScore=app.updateEntity("users", {_id}, {$inc:{score:1}})
			let plan=await app.get1Entity("plans",{_id})
			let task=plan.todos.find(a=>knowledge ? a.knowledge==knowledge : a.content==content)
			task[`day${day}`]=props||true
			let planScore=app.updateEntity("plans",{_id},{$inc:{score:1},$set:{todos:plan.todos}})
			return Promise.all([childScore,planScore])
				.then(()=>app.getDataLoader("users").clear(_id).loade(_id))
		},
		
		async plan_reset(_,{_id},{app,user}){
			let plan=await app.getDataLoader("plans").load(_id)

			function saveFinishedTasks(){
				let {week,todos}=plan
				let startDate=new Date(week*1000)
				let tasks=todos.map(({content,knowledge,...others})=>{
					return [0,1,2,3,4,5,6].map(i=>{
						let day=others[`day${i}`]
						if(day){
							let when=relativeDate(startDate,i)
							when.setHours(0,0,0,0)
							let task={owner:"childs:"+_id,when,content,knowledge,createdAt:new Date()}
							if(typeof(day)=="object")
								task.props=day
							return task
						}
					}).filter(a=>!!a)
				}).reduce((collected,a)=>(collected.splice(-1,0,...a),collected),[])
				//save tasks
				if(tasks.length==0)
					return Promise.resolve()

				return app.collection("historys")
					.then(conn=>conn.insertMany(tasks)
							.then(()=>conn.close())
							.catch(()=>conn.close())
						)
			}
			
			function reset4CurrentWeek(){
				let {todos, months}=plan
				let week=currentWeek()
				todos=todos.map(({day0,day1,day2,day3,day4,day5,day6,...others})=>others)
				
				let applyPlan=null
				if(months){
					let {knowledges=[]}=(months[new Date().getMonth()]||{})
					applyPlan=Promise.all(
						knowledges.map(a=>{
							if(-1==todos.findIndex(({knowledge})=>knowledge==a)){
								return app.getDataLoader("knowledges")
									.load(a)
									.then(({title})=>todos.push({knowledge:a, content:title}))
								
							}
						}).filter(a=>!!a)
					)
				}else{
					applyPlan=Promise.resolve()
				}
				
				return applyPlan.then(()=>{
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
				}).then(()=>plan)
			}
			
			saveFinishedTasks()
			
			return reset4CurrentWeek()
		},
		
		plan_todos_add(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					if(exists(todos,content,knowledge))
						return plan
					todos=[...todos,{content,knowledge:knowledge||undefined}]
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_remove(_,{_id, content, knowledge},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then((plan,i)=>{
					let {todos=[]}=plan
					if(!(i=exists(todos,content,knowledge)))
						return plan
					todos.splice(i-1,1)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_removeNth(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					todos.splice(i,1)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_up(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.splice((i-1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_down(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.splice((i+1)%(todos.length+1),0,target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_top(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.unshift(target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_bottom(_,{_id, i},{app,user}){
			return app.getDataLoader("plans")
				.load(_id)
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					todos.splice(i,1)
					todos.push(target)
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_todos_toggle(_,{_id,i},{app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let {todos=[]}=plan
					let target=todos[i]
					target.hidden=!!!target.hidden
					plan.todos=todos
					return app.patchEntity("plans",{_id},{todos})
						.then(()=>plan)
				})
		},
		plan_auto(_,{_id},{app,user}){
			return app.get1Entity("plans",{_id})
				.then(plan=>{
					let {goals=[], months=[]}=plan
					let month=new Date().getMonth()
					let count=12-month
					if(goals.length==0){
						goals=CAPS.slice(0,Math.floor(count/3))
					}
					
					let pending=new Array(count)
					pending.fill(1)
					pending.forEach((a,i)=>{
						let {goals:currentGoals=[],knowledges=[]}=months[i+month]||{}
						if(currentGoals.length==0)
							currentGoals[0]=goals[i%goals.length]
						months[i+month]={goals:currentGoals, knowledges}
					})
					
					let all=pending.map((a,i)=>{
						return new Promise((resolve, reject)=>{
							let {goals,knowledges=[]}=months[i+month]
							if(knowledges.length==0){
								app.findEntity("knowledges",{categories:{$in:goals}}, (cursor)=>cursor.limit(3))
									.then(array=>{
										months[i+month].knowledges=array.map(({_id})=>_id)
										resolve()
									},reject)
							}else{
								resolve()
							}
						})
					})
					return Promise.all(all)
						.then(()=>{
							plan.months=[...months]
							plan.goals=[...goals]
							
							let all=[]
							if(!plan.todos || plan.todos.length==0){
								months[month].knowledges
									.forEach(a=>all.push(app.getDataLoader("knowledges").load(a)))
							}
							return Promise.all(all)
								.then(knowledges=>{
									if(knowledges)
										plan.todos=knowledges.map(({_id,title})=>({knowledge:_id,content:title}))
									return app.updateEntity("plan",{_id},{
										months:plan.months,
										goals:plan.goals, 
										todos:plan.todos,
									})
								})
						})
						.then(()=>plan)
				})
		},
	},
	
	Knowledge: {
		id: ({_id})=>`knowledges:${_id}`,
		
		files({_id},{},{app,user}){
			return app.findEntity("files",{host:`knowledges:${_id}`})
		},
		
		inTask({_id},{child},{app,user}){
			return app.getDataLoader("plans")
				.load(child)
				.then(plan=>{
					if(!plan || !plan.todos)
						return false
					return !!plan.todos.find(({knowledge})=>knowledge==_id)
				})
		},
		
		isMyWork:({author},{},{app,user})=>author==user._id,
		
		author({author},{},{app,user}){
			return app.getDataLoader("users").load(author)
		}
	},
	
	Publish: {
		id: ({_id})=>`publishs:${_id}`,
		
		author({author}, {}, {app,user}){
			return app.getDataLoader("users").load(author)
		},
		
		child({child}, {}, {app,user}){
			return app.getDataLoader("users")
				.load(child)
				.then(child=>child.author==user._id ? child : null)
		},
	},
	
	MonthPlan:{
		knowledges({knowledges=[]},{},{app,user}){
			return Promise.all(knowledges.map(_id=>app.getDataLoader("knowledges").load(knowledge)))
		}
	},
	Todo: {
		knowledge({knowledge},{},{app,user}){
			if(knowledge)
				return app.getDataLoader("knowledges").load(knowledge)
		}
	}
})
