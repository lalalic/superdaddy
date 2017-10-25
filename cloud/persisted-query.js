//generated from persisted-query.js, don't edit it	
module.exports={
    "app_create_Mutation": "mutation app_create_Mutation(\n  $name: String!\n  $uname: String\n) {\n  app_create(name: $name, uname: $uname) {\n    id\n    name\n    uname\n    apiKey\n  }\n}\n",
    "app_remove_Mutation": "mutation app_remove_Mutation(\n  $id: ObjectID!\n) {\n  app_remove(_id: $id)\n}\n",
    "app_update_Mutation": "mutation app_update_Mutation(\n  $id: ObjectID!\n  $name: String\n  $uname: String\n) {\n  app_update(_id: $id, name: $name, uname: $uname)\n}\n",
    "cloud_update_Mutation": "mutation cloud_update_Mutation(\n  $id: ObjectID!\n  $cloudCode: String!\n) {\n  app_update(_id: $id, cloudCode: $cloudCode)\n}\n",
    "userProfile_update_Mutation": "mutation userProfile_update_Mutation(\n  $photo: String\n  $username: String\n  $birthday: Date\n  $gender: Gender\n  $location: String\n  $signature: String\n) {\n  user_update(photo: $photo, username: $username, birthday: $birthday, gender: $gender, location: $location, signature: $signature)\n}\n",
    "account_update_Mutation": "mutation account_update_Mutation(\n  $photo: String\n) {\n  user_update(photo: $photo)\n}\n",
    "authentication_login_Mutation": "mutation authentication_login_Mutation(\n  $contact: String!\n  $token: String!\n  $name: String\n) {\n  login(contact: $contact, token: $token, name: $name) {\n    id\n    token\n  }\n}\n",
    "authentication_requestToken_Mutation": "mutation authentication_requestToken_Mutation(\n  $contact: String!\n) {\n  requestToken(contact: $contact)\n}\n",
    "comment_create_Mutation": "mutation comment_create_Mutation(\n  $parent: ID!\n  $content: String!\n  $type: CommentType\n) {\n  comment: comment_create(parent: $parent, content: $content, type: $type) {\n    __typename\n    id\n    content\n    type\n    createdAt\n    author {\n      id\n      name\n      photo\n    }\n    isOwner\n  }\n}\n",
    "file_create_Mutation": "mutation file_create_Mutation(\n  $_id: String!\n  $host: ID!\n  $bucket: String\n  $size: Int\n  $crc: Int\n  $mimeType: String\n  $imageInfo: JSON\n) {\n  file_create(_id: $_id, host: $host, bucket: $bucket, size: $size, crc: $crc, mimeType: $mimeType, imageInfo: $imageInfo) {\n    url\n    id\n  }\n}\n",
    "file_token_Mutation": "mutation file_token_Mutation(\n  $key: String\n) {\n  file_token(key: $key) {\n    token\n    id\n  }\n}\n",
    "main_app_update_Query": "query main_app_update_Query(\n  $id: ObjectID!\n) {\n  me {\n    app(_id: $id) {\n      ...app\n      id\n    }\n    id\n  }\n}\n\nfragment app on App {\n  id\n  name\n  uname\n  apiKey\n}\n",
    "main_comment_Query": "query main_comment_Query(\n  $parent: ObjectID!\n  $count: Int = 10\n  $cursor: JSON\n) {\n  ...main_appComments\n}\n\nfragment main_appComments on Query {\n  comments: app_comments(parent: $parent, last: $count, before: $cursor) {\n    edges {\n      node {\n        id\n        content\n        type\n        createdAt\n        author {\n          id\n          name\n          photo\n        }\n        isOwner\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n",
    "main_my_apps_Query": "query main_my_apps_Query {\n  me {\n    ...my\n    id\n  }\n}\n\nfragment my on User {\n  id\n  username\n  photo\n  apps {\n    id\n    name\n  }\n}\n",
    "main_prefetch_Query": "query main_prefetch_Query {\n  me {\n    name\n    token\n    apps {\n      id\n      name\n      uname\n      cloudCode\n      apiKey\n    }\n    id\n  }\n}\n",
    "main_userProfile_me_Query": "query main_userProfile_me_Query {\n  me {\n    id\n    username\n    birthday\n    gender\n    location\n    photo\n    signature\n  }\n}\n",
    "create_knowledge_Mutation": "mutation create_knowledge_Mutation(\n  $knowledge: JSON\n) {\n  knowledge_create(knowledge: $knowledge) {\n    id\n    createdAt\n  }\n}\n",
    "info_update_Mutation": "mutation info_update_Mutation(\n  $id: ObjectID\n  $info: JSON\n) {\n  knowledge_update(_id: $id, knowledge: $info) {\n    ...content_knowledge\n    id\n  }\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n",
    "list_remove_Mutation": "mutation list_remove_Mutation(\n  $id: ObjectID\n) {\n  publish_remove(_id: $id)\n}\n",
    "publish_publish_Mutation": "mutation publish_publish_Mutation(\n  $template: String\n  $startAt: Date\n  $endAt: Date\n  $child: ObjectID\n  $copies: Int = 1\n  $bookName: String\n) {\n  publish_create(template: $template, from: $startAt, to: $endAt, child: $child, copies: $copies, name: $bookName) {\n    id\n    createdAt\n  }\n}\n",
    "account_setPhoto_Mutation": "mutation account_setPhoto_Mutation(\n  $id: ObjectID!\n  $url: String!\n) {\n  child_update(_id: $id, photo: $url)\n}\n",
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
    "src_knowledge_Query": "query src_knowledge_Query(\n  $id: ObjectID\n  $child: ObjectID\n) {\n  knowledge(_id: $id) {\n    ...info_knowledge\n    id\n  }\n}\n\nfragment info_knowledge on Knowledge {\n  title\n  id\n  inTask(child: $child)\n  hasHomework\n  hasPrint\n  sale\n  isMyWork\n  summary\n  figure\n  template\n  files {\n    crc\n    url\n    id\n  }\n  ...content_knowledge\n}\n\nfragment content_knowledge on Knowledge {\n  id\n  title\n  content\n  summary\n  createdAt\n  category\n  keywords\n  figure\n  author {\n    name\n    id\n  }\n}\n",
    "src_knowleges_Query": "query src_knowleges_Query(\n  $title: String\n  $categories: [String]\n  $tags: [String]\n  $count: Int\n  $cursor: JSON\n) {\n  ...list\n}\n\nfragment list on Query {\n  knowledges(title: $title, categories: $categories, tags: $tags, first: $count, after: $cursor) {\n    edges {\n      node {\n        __typename\n        id\n        title\n        ...listItem\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment listItem on Knowledge {\n  id\n  title\n  summary\n  photos\n  zans\n  createdAt\n  updatedAt\n}\n",
    "src_plan_Query": "query src_plan_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...plan\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment plan on Plan {\n  caps\n  goals\n  months {\n    goals\n    knowledges {\n      id\n      title\n    }\n  }\n}\n",
    "src_prefetch_Query": "query src_prefetch_Query {\n  me {\n    id\n    token\n    children {\n      id\n      name\n      photo\n    }\n  }\n}\n",
    "src_profile_Query": "query src_profile_Query {\n  me {\n    id\n    username\n    birthday\n    gender\n    location\n    photo\n    signature\n  }\n}\n",
    "src_publishes_Query": "query src_publishes_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      ...list_publishes\n      id\n    }\n    id\n  }\n}\n\nfragment list_publishes on Child {\n  publishs {\n    id\n    name\n    template\n    from\n    to\n    copies\n  }\n}\n",
    "src_scorepad_Query": "query src_scorepad_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...scorePad\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n",
    "src_timeManage_Query": "query src_timeManage_Query(\n  $child: ObjectID\n) {\n  me {\n    child(_id: $child) {\n      plan {\n        ...core\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment core on Plan {\n  goal\n  score\n  week\n  ...scorePad\n  ...taskPad\n  ...taskPadEditor\n}\n\nfragment scorePad on Plan {\n  todo\n  goal\n  score\n}\n\nfragment taskPad on Plan {\n  todos {\n    knowledge {\n      id\n      fields\n    }\n    content\n    hidden\n    day0\n    day1\n    day2\n    day3\n    day4\n    day5\n    day6\n  }\n}\n\nfragment taskPadEditor on Plan {\n  todos {\n    content\n    hidden\n  }\n}\n"
}