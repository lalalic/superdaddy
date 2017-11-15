//generated from persisted-query.js, don't edit it
module.exports={
	"create_knowledge_Mutation":`mutation create_knowledge_Mutation(
		  $knowledge: JSON
		) {
		  knowledge_create(knowledge: $knowledge) {
		    id
		    createdAt
		  }
		}
		`,
	"info_update_Mutation":`mutation info_update_Mutation(
		  $id: ObjectID
		  $info: JSON
		) {
		  knowledge_update(_id: $id, knowledge: $info) {
		    ...content_knowledge
		    id
		  }
		}
		
		fragment content_knowledge on Knowledge {
		  id
		  title
		  content
		  summary
		  createdAt
		  category
		  tags
		  figure
		  author {
		    name
		    id
		  }
		}
		`,
	"publish_create_Mutation":`mutation publish_create_Mutation(
		  $template: String
		  $from: Date
		  $to: Date
		  $child: ObjectID
		  $copies: Int = 1
		  $name: String
		) {
		  publish_create(template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name) {
		    id
		    name
		    template
		    from
		    to
		    copies
		    status
		  }
		}
		`,
	"publish_done_Mutation":`mutation publish_done_Mutation(
		  $id: ObjectID
		) {
		  publish_done(_id: $id)
		}
		`,
	"publish_remove_Mutation":`mutation publish_remove_Mutation(
		  $id: ObjectID
		) {
		  publish_remove(_id: $id)
		}
		`,
	"publish_update_Mutation":`mutation publish_update_Mutation(
		  $id: ObjectID
		  $template: String
		  $from: Date
		  $to: Date
		  $child: ObjectID
		  $copies: Int = 1
		  $name: String
		) {
		  publish_update(_id: $id, template: $template, from: $from, to: $to, child: $child, copies: $copies, name: $name)
		}
		`,
	"account_setPhoto_Mutation":`mutation account_setPhoto_Mutation(
		  $id: ObjectID!
		  $photo: String
		  $name: String
		  $birthday: Date
		  $gender: Gender
		) {
		  child_update(_id: $id, photo: $photo, name: $name, birthday: $birthday, gender: $gender)
		}
		`,
	"timeManage_add_Mutation":`mutation timeManage_add_Mutation(
		  $child: ObjectID
		  $content: String
		  $knowledge: ObjectID
		) {
		  plan_todos_add(_id: $child, content: $content, knowledge: $knowledge) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_bottom_Mutation":`mutation timeManage_bottom_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_bottom(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_down_Mutation":`mutation timeManage_down_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_down(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_removeNth_Mutation":`mutation timeManage_removeNth_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_removeNth(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_remove_Mutation":`mutation timeManage_remove_Mutation(
		  $child: ObjectID
		  $content: String
		  $knowledge: ObjectID
		) {
		  plan_todos_remove(_id: $child, content: $content, knowledge: $knowledge) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_reset_Mutation":`mutation timeManage_reset_Mutation(
		  $child: ObjectID
		) {
		  plan_reset(_id: $child) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_status_Mutation":`mutation timeManage_status_Mutation(
		  $child: ObjectID
		  $plan: JSON
		) {
		  plan_update(_id: $child, plan: $plan) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_taskDone_Mutation":`mutation timeManage_taskDone_Mutation(
		  $child: ObjectID
		  $task: String
		  $knowledge: ObjectID
		  $day: Int
		) {
		  plan_task_done(_id: $child, content: $task, knowledge: $knowledge, day: $day) {
		    score
		    plan {
		      ...core
		      id
		    }
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_toggle_Mutation":`mutation timeManage_toggle_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_toggle(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_top_Mutation":`mutation timeManage_top_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_top(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"timeManage_up_Mutation":`mutation timeManage_up_Mutation(
		  $child: ObjectID
		  $i: Int
		) {
		  plan_todos_up(_id: $child, i: $i) {
		    ...core
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`,
	"child_create_Mutation":`mutation child_create_Mutation(
		  $name: String!
		  $photo: String
		  $birthday: Date
		  $gender: Gender
		) {
		  child_create(name: $name, photo: $photo, birthday: $birthday, gender: $gender) {
		    id
		    createdAt
		  }
		}
		`,
	"child_planupdate_Mutation":`mutation child_planupdate_Mutation(
		  $id: ObjectID
		  $plan: JSON
		) {
		  plan_update(_id: $id, plan: $plan) {
		    id
		    icon
		    todo
		  }
		}
		`,
	"child_remove_Mutation":`mutation child_remove_Mutation(
		  $id: ObjectID!
		) {
		  child_remove(_id: $id)
		}
		`,
	"child_update_Mutation":`mutation child_update_Mutation(
		  $id: ObjectID!
		  $photo: String
		  $name: String
		  $birthday: Date
		  $gender: Gender
		) {
		  child_update(_id: $id, photo: $photo, name: $name, birthday: $birthday, gender: $gender)
		}
		`,
	"plan_addMonthGoal_Mutation":`mutation plan_addMonthGoal_Mutation(
		  $child: ObjectID
		  $month: Int
		  $goal: String
		) {
		  plan_monthgoal_add(_id: $child, goal: $goal, month: $month) {
		    months {
		      goals
		      knowledges {
		        id
		        title
		      }
		    }
		    id
		  }
		}
		`,
	"plan_addMonthTask_Mutation":`mutation plan_addMonthTask_Mutation(
		  $child: ObjectID
		  $month: Int
		  $knowledge: ObjectID
		) {
		  plan_monthtask_add(_id: $child, knowledge: $knowledge, month: $month) {
		    months {
		      goals
		      knowledges {
		        id
		        title
		      }
		    }
		    id
		  }
		}
		`,
	"plan_auto_Mutation":`mutation plan_auto_Mutation(
		  $child: ObjectID
		) {
		  plan_auto(_id: $child) {
		    ...plan
		    id
		  }
		}
		
		fragment plan on Plan {
		  caps
		  goals
		  months {
		    goals
		    knowledges {
		      id
		      title
		    }
		  }
		  pendingKnowledges {
		    id
		    category
		    title
		  }
		}
		`,
	"plan_knowledge_Query":`query plan_knowledge_Query(
		  $title: String
		  $caps: [String]
		  $first: Int = 5
		) {
		  knowledges(title: $title, categories: $caps, first: $first) {
		    edges {
		      node {
		        id
		        title
		      }
		    }
		  }
		}
		`,
	"plan_removeMonthGoal_Mutation":`mutation plan_removeMonthGoal_Mutation(
		  $child: ObjectID
		  $month: Int
		  $goal: String
		) {
		  plan_monthgoal_remove(_id: $child, goal: $goal, month: $month) {
		    months {
		      goals
		      knowledges {
		        id
		        title
		      }
		    }
		    id
		  }
		}
		`,
	"plan_removeMonthTask_Mutation":`mutation plan_removeMonthTask_Mutation(
		  $child: ObjectID
		  $month: Int
		  $knowledge: ObjectID
		) {
		  plan_monthtask_remove(_id: $child, knowledge: $knowledge, month: $month) {
		    months {
		      goals
		      knowledges {
		        id
		        title
		      }
		    }
		    id
		  }
		}
		`,
	"plan_updategoals_Mutation":`mutation plan_updategoals_Mutation(
		  $child: ObjectID
		  $goals: [String]
		) {
		  plan_update_goals(_id: $child, goals: $goals) {
		    goals
		    pendingKnowledges {
		      id
		      category
		      title
		    }
		    id
		  }
		}
		`,
	"src_account_Query":`query src_account_Query {
		  me {
		    ...account
		    id
		  }
		}
		
		fragment account on User {
		  id
		  username
		  photo
		  children {
		    id
		    photo
		    name
		  }
		}
		`,
	"src_childComments_Query":`query src_childComments_Query(
		  $parent: ObjectID!
		  $count: Int = 10
		  $cursor: JSON
		) {
		  ...src_childComments
		}
		
		fragment src_childComments on Query {
		  comments: child_comments(parent: $parent, last: $count, before: $cursor) {
		    edges {
		      node {
		        __typename
		        id
		        content
		        type
		        createdAt
		        author {
		          id
		          name
		          photo
		        }
		        isOwner
		      }
		      cursor
		    }
		    pageInfo {
		      hasPreviousPage
		      startCursor
		    }
		  }
		}
		`,
	"src_child_Query":`query src_child_Query(
		  $id: ObjectID
		) {
		  me {
		    child(_id: $id) {
		      ...child
		      id
		    }
		    id
		  }
		}
		
		fragment child on Child {
		  id
		  name
		  photo
		  birthday
		  gender
		  totalScore: score
		  plan {
		    score
		    goal
		    todo
		    icon
		    id
		  }
		}
		`,
	"src_comment_Query":`query src_comment_Query(
		  $parent: ObjectID!
		  $count: Int = 10
		  $cursor: JSON
		) {
		  ...src_knowledgeComments
		}
		
		fragment src_knowledgeComments on Query {
		  comments: knowledge_comments(parent: $parent, last: $count, before: $cursor) {
		    edges {
		      node {
		        __typename
		        id
		        content
		        type
		        createdAt
		        author {
		          id
		          name
		          photo
		        }
		        isOwner
		      }
		      cursor
		    }
		    pageInfo {
		      hasPreviousPage
		      startCursor
		    }
		  }
		}
		`,
	"src_knowledge_Query":`query src_knowledge_Query(
		  $id: ObjectID
		  $child: ObjectID
		) {
		  knowledge(_id: $id) {
		    ...info_knowledge
		    id
		  }
		}
		
		fragment info_knowledge on Knowledge {
		  title
		  id
		  inTask(child: $child)
		  hasHomework
		  hasPrint
		  sale
		  isMyWork
		  summary
		  figure
		  template
		  files {
		    crc
		    url
		    id
		  }
		  ...content_knowledge
		}
		
		fragment content_knowledge on Knowledge {
		  id
		  title
		  content
		  summary
		  createdAt
		  category
		  tags
		  figure
		  author {
		    name
		    id
		  }
		}
		`,
	"src_knowleges_Query":`query src_knowleges_Query(
		  $title: String
		  $categories: [String]
		  $tags: [String]
		  $mine: Boolean
		  $favorite: Boolean
		  $tasked: Boolean
		  $tasking: Boolean
		  $count: Int
		  $cursor: JSON
		) {
		  ...list
		}
		
		fragment list on Query {
		  knowledges(title: $title, categories: $categories, tags: $tags, mine: $mine, favorite: $favorite, tasked: $tasked, tasking: $tasking, first: $count, after: $cursor) {
		    edges {
		      node {
		        __typename
		        id
		        title
		        ...listItem
		      }
		      cursor
		    }
		    pageInfo {
		      hasNextPage
		      endCursor
		    }
		  }
		}
		
		fragment listItem on Knowledge {
		  id
		  title
		  summary
		  photos
		  zans
		  createdAt
		  updatedAt
		}
		`,
	"src_plan_Query":`query src_plan_Query(
		  $child: ObjectID
		) {
		  me {
		    child(_id: $child) {
		      plan {
		        ...plan
		        id
		      }
		      id
		    }
		    id
		  }
		}
		
		fragment plan on Plan {
		  caps
		  goals
		  months {
		    goals
		    knowledges {
		      id
		      title
		    }
		  }
		  pendingKnowledges {
		    id
		    category
		    title
		  }
		}
		`,
	"src_prefetch_Query":`query src_prefetch_Query {
		  me {
		    id
		    token
		    children {
		      id
		      name
		      photo
		    }
		  }
		}
		`,
	"src_profile_Query":`query src_profile_Query {
		  me {
		    id
		    username
		    birthday
		    gender
		    location
		    photo
		    signature
		  }
		}
		`,
	"src_publishes_Query":`query src_publishes_Query(
		  $child: ObjectID
		) {
		  me {
		    child(_id: $child) {
		      ...list_publishes
		      id
		    }
		    id
		  }
		}
		
		fragment list_publishes on Child {
		  publishes {
		    id
		    name
		    template
		    from
		    to
		    copies
		    status
		  }
		}
		`,
	"src_publish_Query":`query src_publish_Query(
		  $child: ObjectID
		  $id: ObjectID
		) {
		  me {
		    child(_id: $child) {
		      publish(_id: $id) {
		        ...publish_info
		        id
		      }
		      id
		    }
		    id
		  }
		}
		
		fragment publish_info on Publish {
		  template
		  copies
		  name
		  from
		  to
		}
		`,
	"src_scorepad_Query":`query src_scorepad_Query(
		  $child: ObjectID
		) {
		  me {
		    child(_id: $child) {
		      plan {
		        ...scorePad
		        id
		      }
		      id
		    }
		    id
		  }
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		`,
	"src_timeManage_Query":`query src_timeManage_Query(
		  $child: ObjectID
		) {
		  me {
		    child(_id: $child) {
		      plan {
		        ...core
		        id
		      }
		      id
		    }
		    id
		  }
		}
		
		fragment core on Plan {
		  goal
		  score
		  week
		  ...scorePad
		  ...taskPad
		  ...taskPadEditor
		}
		
		fragment scorePad on Plan {
		  todo
		  goal
		  score
		}
		
		fragment taskPad on Plan {
		  todos {
		    knowledge {
		      id
		      fields
		    }
		    content
		    hidden
		    day0
		    day1
		    day2
		    day3
		    day4
		    day5
		    day6
		  }
		}
		
		fragment taskPadEditor on Plan {
		  todos {
		    content
		    hidden
		  }
		}
		`
}