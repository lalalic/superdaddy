/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

var KnowledgeComment = Cloud.buildComment("Knowledge");
var KnowledgePagination = Cloud.buildPagination("Knowledge");
var ChildComment = Cloud.buildComment("Child");

Cloud.persistedQuery = __webpack_require__(1);

__webpack_require__(2).extend(Cloud.static);

Cloud.typeDefs = __webpack_require__(3)([KnowledgePagination.typeDefs, KnowledgeComment.typeDefs, ChildComment.typeDefs]);

Cloud.resolver = Cloud.merge(KnowledgeComment.resolver, KnowledgePagination.resolver, ChildComment.resolver, __webpack_require__(4));

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

module.exports = {
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
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "persisted-query.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

exports.extend = function (service) {
	service.on(/knowledge/, function (_ref, _ref2) {
		var path = _ref.path,
		    app = _ref.app;
		var send = _ref2.send;

		var infos = path.split(/[\/\.]/);
		var id = infos.pop();
		app.runQL('query knowledge($id:String){\n\t\t\t\t\tknowledge(_id:$id){\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tcontent\n\t\t\t\t\t\tfigure\n\t\t\t\t\t\tauthor{\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t}', { id: id }).then(function (_ref3) {
			var _ref3$data$knowledge = _ref3.data.knowledge,
			    title = _ref3$data$knowledge.title,
			    content = _ref3$data$knowledge.content,
			    figure = _ref3$data$knowledge.figure,
			    author = _ref3$data$knowledge.author,
			    createdAt = _ref3$data$knowledge.createdAt,
			    errors = _ref3.errors;
			return send('\n\t\t\t\t<html>\n\t\t\t\t\t<head>\n\t\t\t\t\t\t<title>' + title + '</title>\n\t\t\t\t\t</head>\n\t\t\t\t\t<body>\n\t\t\t\t\t\t<article>\n\t\t\t\t\t\t\t' + (figure ? '<figure><img src="${figure}"></figure>' : '') + '\n\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<span>' + author.username + '</span>  \n\t\t\t\t\t\t\t\t\t<time>' + createdAt + '</time>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t<section>\n\t\t\t\t\t\t\t\t' + content + '\n\t\t\t\t\t\t\t</section>\n\t\t\t\t\t\t</article>\n\t\t\t\t\t</body>\n\t\t\t\t</html>\n\t\t\t');
		}).catch(send);
	});
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "static.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

module.exports = function (others) {
	return "\n\ttype Child implements Node{\n\t\tid:ID!\n\t\tname:String!\n\t\tbirthday:Date\n\t\tcreatedAt: Date\n\t\tphoto(size: Int = 25): String\n\t\tgender: Gender\n\t\tauthor: User\n\t\tscore: Int\n\t\t\n\t\tpublishs: [Publish]\n\t\t\n\t\tplan: Plan\n\t}\n\t\n\ttype Plan implements Node{\n\t\tid:ID!\n\t\ticon: String\n\t\tgoal: Int\n\t\tscore: Int\n\t\ttodo: String\n\t\tweek: Int\n\t\t\n\t\ttodos: [Todo]\n\t\t\n\t\tcaps:[String]\n\t\tgoals:[String]\n\t\tmonths:[MonthPlan]\n\t}\n\t\n\ttype Todo{\n\t\tknowledge: Knowledge\n\t\tcontent: String\n\t\thidden: Boolean\n\t\tday0: JSON\n\t\tday1: JSON\n\t\tday2: JSON\n\t\tday3: JSON\n\t\tday4: JSON\n\t\tday5: JSON\n\t\tday6: JSON\n\t}\n\t\n\ttype MonthPlan{\n\t\tgoals:[String]\n\t\tknowledges:[Knowledge]\n\t}\n\t\n\ttype Knowledge implements Node{\n\t\tid:ID!\n\t\tauthor:User\n\t\ttitle:String!\n\t\tcontent:String\n\t\tcreatedAt:Date\n\t\tupdatedAt:Date\n\t\tsummary: String\n\t\tfigure: String\n\t\tphotos: [String]\n\t\tzans: Int\n\t\tcategory: [String]\n\t\tkeywords: [String]\n\t\tfields: [JSON]\n\t\tdays: [JSON]\n\t\thasHomework: JSON\n\t\thasPrint: JSON\n\t\tsale: String\n\t\ttemplate: String\n\t\t\n\t\t\n\t\tinTask(child:ObjectID): Boolean\n\t\tisMyWork: Boolean\n\t\tfiles: [File]\n\t}\n\t\n\ttype Task implements Node{\n\t\tid:ID!\n\t\tauthor:User\n\t\t\n\t}\n\t\n\ttype FinishedTask implements Node{\n\t\tid:ID!\n\t\tauthor:User\n\t}\n\t\n\ttype Publish implements Node{\n\t\tid:ID!\n\t\tauthor: User\n\t\tchild: Child\n\t\tname: String\n\t\ttemplate: String\n\t\tcopies: Int\n\t\tfrom: Date\n\t\tto: Date\n\t\tcreatedAt: Date\n\t}\n\t\n\textend type User{\n\t\tchildren: [Child]\n\t\tchild(_id:ObjectID): Child\n\t\tworks: [Knowledge]\n\t}\n\t\n\textend type Query{\n\t\tknowledges(title:String, categories:[String], tags: [String], first:Int, after:JSON):KnowledgeConnection\n\t\tknowledge(_id:ObjectID):Knowledge\n\t}\n\t\n\textend type Mutation{\n\t\tchild_remove(_id:ObjectID!): Boolean\n\t\tchild_create(name:String!, photo:String, birthday:Date,gender:Gender):Child\n\t\tchild_update(_id:ObjectID!, name:String, photo:String, birthday:Date,icon:String, gender:Gender): Date\n\t\t\t\t\n\t\tplan_update(_id:ObjectID, plan:JSON):Plan\n\t\tplan_task_done(_id:ObjectID, content:String, knowledge:ObjectID, day:Int, props: JSON):Child\n\t\tplan_reset(_id:ObjectID):Plan\n\t\tplan_todos_add(_id:ObjectID, content:String, knowledge:ObjectID):Plan\n\t\tplan_todos_remove(_id:ObjectID,content:String, knowledge:ObjectID):Plan\n\t\tplan_todos_removeNth(_id:ObjectID,i:Int):Plan\n\t\tplan_todos_up(_id:ObjectID,i:Int):Plan\n\t\tplan_todos_down(_id:ObjectID,i:Int):Plan\n\t\tplan_todos_top(_id:ObjectID,i:Int):Plan\n\t\tplan_todos_bottom(_id:ObjectID,i:Int):Plan\n\t\tplan_todos_toggle(_id:ObjectID,i:Int):Plan\n\t\tplan_auto(_id:ObjectID):Plan\n\t\t\n\t\tknowledge_create(knowledge:JSON):Knowledge\n\t\tknowledge_update(_id:ObjectID, knowledge:JSON):Knowledge\n\n\t\tpublish_create(template:String, child:ObjectID, from: Date, to: Date, name: String, copies: Int):Publish\n\t\tpublish_remove(_id:ObjectID):Boolean\n\t}\n\t\n\t" + others.join("\r\n") + "\n";
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "schema.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var CAPS = ["观察能力", "自制力", "专注力", "记忆力"];
var relativeDate = function relativeDate(d, days) {
	return new Date(d.getTime() + 24 * 60 * 60 * 1000 * days);
};
var exists = function exists(todos, content, knowledge) {
	return 1 + todos.findIndex(function (a) {
		return knowledge ? a.knowledge === knowledge : a.content === content;
	});
};
var currentWeek = function currentWeek() {
	var week = new Date();
	week = relativeDate(week, -1 * week.getDay());
	week.setHours(0, 0, 0, 0);
	return parseInt(week.getTime() / 1000);
};

module.exports = {
	Child: {
		birthday: function birthday(_ref) {
			var _birthday = _ref.birthday,
			    bd = _ref.bd;
			return _birthday || bd;
		},
		id: function id(_ref2) {
			var _id = _ref2._id;
			return "childs:" + _id;
		},
		score: function score(_ref3) {
			var _score = _ref3.score;
			return _score || 0;
		},
		publishs: function publishs(child, _ref4, _ref5) {
			var app = _ref5.app;

			_objectDestructuringEmpty(_ref4);

			return app.findEntity("publishs", { child: child._id });
		},
		plan: function plan(_ref6, _ref7, _ref8) {
			var _id = _ref6._id;
			var app = _ref8.app;

			_objectDestructuringEmpty(_ref7);

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				if (!plan) {
					return app.createEntity("plans", { _id: _id, week: currentWeek(), score: 0, goal: 0, todos: [] });
				}
				return plan;
			});
		}
	},

	Plan: {
		id: function id(_ref9) {
			var _id = _ref9._id;
			return "plans:" + _id;
		},

		caps: function caps() {
			return CAPS;
		}
	},

	User: {
		child: function child(_child, _ref10, _ref11) {
			var _id = _ref10._id;
			var app = _ref11.app,
			    user = _ref11.user;

			return app.getDataLoader("users").load(_id).then(function (a) {
				return a.author == user._id ? a : null;
			});
		},
		children: function children(me, _ref12, _ref13) {
			var app = _ref13.app,
			    user = _ref13.user;

			_objectDestructuringEmpty(_ref12);

			return app.findEntity("users", { author: user._id });
		}
	},

	Query: {
		knowledge: function knowledge(_, _ref14, _ref15) {
			var _id = _ref14._id;
			var app = _ref15.app;

			return app.get1Entity("knowledges", { _id: _id });
		},
		knowledges: function knowledges(_, _ref16, _ref17) {
			var title = _ref16.title,
			    categories = _ref16.categories,
			    tags = _ref16.tags,
			    _ref16$first = _ref16.first,
			    first = _ref16$first === undefined ? 10 : _ref16$first,
			    after = _ref16.after;
			var app = _ref17.app;

			var _split = (after || ":").split(":"),
			    _split2 = _slicedToArray(_split, 2),
			    createdAt = _split2[0],
			    _id = _split2[1];

			return app.findEntity("knowledges", {}, function (cursor) {
				var filtered = cursor.sort([["createdAt", -1]]).limit(first + parseInt(first / 2));
				if (createdAt) {
					filtered = filtered.filter({ createdAt: { $lte: new Date(parseInt(createdAt)) } });
				}

				if (title) {
					filtered = filtered.filter({ title: new RegExp(title + ".*", "i") });
				}

				if (categories && categories.length) {}
				if (tags && tags.length) {}
				return filtered;
			}).then(function (docs) {
				var edges = _id ? docs.slice(docs.findIndex(function (a) {
					return a._id == _id;
				}) + 1) : docs;
				var hasNextPage = false;

				if (edges.length >= first) {
					edges = edges.slice(0, first);
					hasNextPage = true;
				}
				return {
					edges: edges,
					hasNextPage: hasNextPage
				};
			});
		}
	},

	Mutation: {
		child_remove: function child_remove(_, _ref18, _ref19) {
			var _id = _ref18._id;
			var app = _ref19.app,
			    user = _ref19.user;

			return app.remove1Entity("users", { _id: _id, author: user._id });
		},
		child_create: function child_create(_, child, _ref20) {
			var app = _ref20.app,
			    user = _ref20.user;

			return app.createEntity("users", _extends({}, child, { author: user._id }));
		},
		child_update: function child_update(_, _ref21, _ref22) {
			var _id = _ref21._id,
			    $set = _objectWithoutProperties(_ref21, ["_id"]);

			var app = _ref22.app,
			    user = _ref22.user;

			if ($set.name !== undefined && !$set.name) throw new Error("name can't be empty");
			return app.patchEntity("users", { _id: _id, author: user._id }, _extends({}, $set, { author: user._id }));
		},
		knowledge_create: function knowledge_create(_, _ref23, _ref24) {
			var _ref23$knowledge = _ref23.knowledge,
			    _ref23$knowledge$phot = _ref23$knowledge.photos,
			    photos = _ref23$knowledge$phot === undefined ? [] : _ref23$knowledge$phot,
			    knowledge = _objectWithoutProperties(_ref23$knowledge, ["photos"]);

			var app = _ref24.app,
			    user = _ref24.user;

			return app.createEntity("knowledges", _extends({}, knowledge, { photos: photos, author: user._id })).then(function (knowledge) {
				if (photos.length) {
					Cloud.file_link("knowledges:" + knowledge._id, photos);
				}
				return knowledge;
			});
		},
		knowledge_update: function knowledge_update(_, _ref25, _ref26) {
			var _id = _ref25._id,
			    newPhotos = _ref25.newPhotos,
			    knowledge = _ref25.knowledge;
			var app = _ref26.app,
			    user = _ref26.user;

			return app.patchEntity("knowledges", { _id: _id }, _extends({}, knowledge, { author: user._id })).then(function (updatedAt) {
				if (newPhotos) {
					Cloud.file_link("knowledges:" + _id, newPhotos);
				}
			}).then(function () {
				return app.get1Entity("knowledges", { _id: _id });
			});
		},
		publish_create: function publish_create(_, doc, _ref27) {
			var app = _ref27.app,
			    user = _ref27.user;

			return app.createEntity("publishs", _extends({}, doc, { author: user._id }));
		},
		publish_remove: function publish_remove(_, _ref28, _ref29) {
			var _id = _ref28._id;
			var app = _ref29.app,
			    user = _ref29.user;

			return app.remove1Entity("publishs", { _id: _id, author: user._id });
		},
		plan_update: async function plan_update(_, _ref30, _ref31) {
			var _id = _ref30._id,
			    plan = _ref30.plan;
			var app = _ref31.app,
			    user = _ref31.user;

			var conn = await app.collection("plans");
			try {
				var _ref32 = await conn.updateOne({ _id: _id }, { $set: plan }, { upsert: true }),
				    modifiedCount = _ref32.modifiedCount,
				    upsertedId = _ref32.upsertedId;

				return await conn.findOne({ _id: _id });
			} finally {
				conn.close();
			}
		},
		plan_task_done: async function plan_task_done(_, _ref33, _ref34) {
			var _id = _ref33._id,
			    content = _ref33.content,
			    knowledge = _ref33.knowledge,
			    props = _ref33.props,
			    day = _ref33.day;
			var app = _ref34.app,
			    user = _ref34.user;

			var score = 1;
			if (knowledge) {
				var kl = await app.get1Entity("knowledges", { _id: knowledge });
				if (kl && kl.score) score = kl.score;
			}
			var childScore = app.updateEntity("users", { _id: _id }, { $inc: { score: 1 } });
			var plan = await app.get1Entity("plans", { _id: _id });
			var task = plan.todos.find(function (a) {
				return knowledge ? a.knowledge == knowledge : a.content == content;
			});
			task["day" + day] = props || true;
			var planScore = app.updateEntity("plans", { _id: _id }, { $inc: { score: 1 }, $set: { todos: plan.todos } });
			return Promise.all([childScore, planScore]).then(function () {
				return app.getDataLoader("users").clear(_id).loade(_id);
			});
		},
		plan_reset: async function plan_reset(_, _ref35, _ref36) {
			var _id = _ref35._id;
			var app = _ref36.app,
			    user = _ref36.user;

			var plan = await app.getDataLoader("plans").load(_id);

			function saveFinishedTasks() {
				var week = plan.week,
				    todos = plan.todos;

				var startDate = new Date(week * 1000);
				var tasks = todos.map(function (_ref37) {
					var content = _ref37.content,
					    knowledge = _ref37.knowledge,
					    others = _objectWithoutProperties(_ref37, ["content", "knowledge"]);

					return [0, 1, 2, 3, 4, 5, 6].map(function (i) {
						var day = others["day" + i];
						if (day) {
							var when = relativeDate(startDate, i);
							when.setHours(0, 0, 0, 0);
							var task = { owner: "childs:" + _id, when: when, content: content, knowledge: knowledge, createdAt: new Date() };
							if ((typeof day === "undefined" ? "undefined" : _typeof(day)) == "object") task.props = day;
							return task;
						}
					}).filter(function (a) {
						return !!a;
					});
				}).reduce(function (collected, a) {
					return collected.splice.apply(collected, [-1, 0].concat(_toConsumableArray(a))), collected;
				}, []);
				//save tasks
				if (tasks.length == 0) return Promise.resolve();

				return app.collection("historys").then(function (conn) {
					return conn.insertMany(tasks).then(function () {
						return conn.close();
					}).catch(function () {
						return conn.close();
					});
				});
			}

			function reset4CurrentWeek() {
				var todos = plan.todos,
				    months = plan.months;

				var week = currentWeek();
				todos = todos.map(function (_ref38) {
					var day0 = _ref38.day0,
					    day1 = _ref38.day1,
					    day2 = _ref38.day2,
					    day3 = _ref38.day3,
					    day4 = _ref38.day4,
					    day5 = _ref38.day5,
					    day6 = _ref38.day6,
					    others = _objectWithoutProperties(_ref38, ["day0", "day1", "day2", "day3", "day4", "day5", "day6"]);

					return others;
				});

				var applyPlan = null;
				if (months) {
					var _ref39 = months[new Date().getMonth()] || {},
					    _ref39$knowledges = _ref39.knowledges,
					    knowledges = _ref39$knowledges === undefined ? [] : _ref39$knowledges;

					applyPlan = Promise.all(knowledges.map(function (a) {
						if (-1 == todos.findIndex(function (_ref40) {
							var knowledge = _ref40.knowledge;
							return knowledge == a;
						})) {
							return app.getDataLoader("knowledges").load(a).then(function (_ref41) {
								var title = _ref41.title;
								return todos.push({ knowledge: a, content: title });
							});
						}
					}).filter(function (a) {
						return !!a;
					}));
				} else {
					applyPlan = Promise.resolve();
				}

				return applyPlan.then(function () {
					plan.todos = todos;
					return app.patchEntity("plans", { _id: _id }, { todos: todos });
				}).then(function () {
					return plan;
				});
			}

			saveFinishedTasks();

			return reset4CurrentWeek();
		},
		plan_todos_add: function plan_todos_add(_, _ref42, _ref43) {
			var _id = _ref42._id,
			    content = _ref42.content,
			    knowledge = _ref42.knowledge;
			var app = _ref43.app,
			    user = _ref43.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos = plan.todos,
				    todos = _plan$todos === undefined ? [] : _plan$todos;

				if (exists(todos, content, knowledge)) return plan;
				todos = [].concat(_toConsumableArray(todos), [{ content: content, knowledge: knowledge || undefined }]);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_remove: function plan_todos_remove(_, _ref44, _ref45) {
			var _id = _ref44._id,
			    content = _ref44.content,
			    knowledge = _ref44.knowledge;
			var app = _ref45.app,
			    user = _ref45.user;

			return app.getDataLoader("plans").load(_id).then(function (plan, i) {
				var _plan$todos2 = plan.todos,
				    todos = _plan$todos2 === undefined ? [] : _plan$todos2;

				if (!(i = exists(todos, content, knowledge))) return plan;
				todos.splice(i - 1, 1);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_removeNth: function plan_todos_removeNth(_, _ref46, _ref47) {
			var _id = _ref46._id,
			    i = _ref46.i;
			var app = _ref47.app,
			    user = _ref47.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos3 = plan.todos,
				    todos = _plan$todos3 === undefined ? [] : _plan$todos3;

				todos.splice(i, 1);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_up: function plan_todos_up(_, _ref48, _ref49) {
			var _id = _ref48._id,
			    i = _ref48.i;
			var app = _ref49.app,
			    user = _ref49.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos4 = plan.todos,
				    todos = _plan$todos4 === undefined ? [] : _plan$todos4;

				var target = todos[i];
				todos.splice(i, 1);
				todos.splice((i - 1) % (todos.length + 1), 0, target);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_down: function plan_todos_down(_, _ref50, _ref51) {
			var _id = _ref50._id,
			    i = _ref50.i;
			var app = _ref51.app,
			    user = _ref51.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos5 = plan.todos,
				    todos = _plan$todos5 === undefined ? [] : _plan$todos5;

				var target = todos[i];
				todos.splice(i, 1);
				todos.splice((i + 1) % (todos.length + 1), 0, target);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_top: function plan_todos_top(_, _ref52, _ref53) {
			var _id = _ref52._id,
			    i = _ref52.i;
			var app = _ref53.app,
			    user = _ref53.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos6 = plan.todos,
				    todos = _plan$todos6 === undefined ? [] : _plan$todos6;

				var target = todos[i];
				todos.splice(i, 1);
				todos.unshift(target);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_bottom: function plan_todos_bottom(_, _ref54, _ref55) {
			var _id = _ref54._id,
			    i = _ref54.i;
			var app = _ref55.app,
			    user = _ref55.user;

			return app.getDataLoader("plans").load(_id).then(function (plan) {
				var _plan$todos7 = plan.todos,
				    todos = _plan$todos7 === undefined ? [] : _plan$todos7;

				var target = todos[i];
				todos.splice(i, 1);
				todos.push(target);
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_todos_toggle: function plan_todos_toggle(_, _ref56, _ref57) {
			var _id = _ref56._id,
			    i = _ref56.i;
			var app = _ref57.app,
			    user = _ref57.user;

			return app.get1Entity("plans", { _id: _id }).then(function (plan) {
				var _plan$todos8 = plan.todos,
				    todos = _plan$todos8 === undefined ? [] : _plan$todos8;

				var target = todos[i];
				target.hidden = !!!target.hidden;
				plan.todos = todos;
				return app.patchEntity("plans", { _id: _id }, { todos: todos }).then(function () {
					return plan;
				});
			});
		},
		plan_auto: function plan_auto(_, _ref58, _ref59) {
			var _id = _ref58._id;
			var app = _ref59.app,
			    user = _ref59.user;

			return app.get1Entity("plans", { _id: _id }).then(function (plan) {
				var _plan$goals = plan.goals,
				    goals = _plan$goals === undefined ? [] : _plan$goals,
				    _plan$months = plan.months,
				    months = _plan$months === undefined ? [] : _plan$months;

				var month = new Date().getMonth();
				var count = 12 - month;
				if (goals.length == 0) {
					goals = CAPS.slice(0, Math.floor(count / 3));
				}

				var pending = new Array(count);
				pending.fill(1);
				pending.forEach(function (a, i) {
					var _ref60 = months[i + month] || {},
					    _ref60$goals = _ref60.goals,
					    currentGoals = _ref60$goals === undefined ? [] : _ref60$goals,
					    _ref60$knowledges = _ref60.knowledges,
					    knowledges = _ref60$knowledges === undefined ? [] : _ref60$knowledges;

					if (currentGoals.length == 0) currentGoals[0] = goals[i % goals.length];
					months[i + month] = { goals: currentGoals, knowledges: knowledges };
				});

				var all = pending.map(function (a, i) {
					return new Promise(function (resolve, reject) {
						var _months = months[i + month],
						    goals = _months.goals,
						    _months$knowledges = _months.knowledges,
						    knowledges = _months$knowledges === undefined ? [] : _months$knowledges;

						if (knowledges.length == 0) {
							app.findEntity("knowledges", { categories: { $in: goals } }, function (cursor) {
								return cursor.limit(3);
							}).then(function (array) {
								months[i + month].knowledges = array.map(function (_ref61) {
									var _id = _ref61._id;
									return _id;
								});
								resolve();
							}, reject);
						} else {
							resolve();
						}
					});
				});
				return Promise.all(all).then(function () {
					plan.months = [].concat(_toConsumableArray(months));
					plan.goals = [].concat(_toConsumableArray(goals));

					var all = [];
					if (!plan.todos || plan.todos.length == 0) {
						months[month].knowledges.forEach(function (a) {
							return all.push(app.getDataLoader("knowledges").load(a));
						});
					}
					return Promise.all(all).then(function (knowledges) {
						if (knowledges) plan.todos = knowledges.map(function (_ref62) {
							var _id = _ref62._id,
							    title = _ref62.title;
							return { knowledge: _id, content: title };
						});
						return app.updateEntity("plan", { _id: _id }, {
							months: plan.months,
							goals: plan.goals,
							todos: plan.todos
						});
					});
				}).then(function () {
					return plan;
				});
			});
		}
	},

	Knowledge: {
		id: function id(_ref63) {
			var _id = _ref63._id;
			return "knowledges:" + _id;
		},

		files: function files(_ref64, _ref65, _ref66) {
			var _id = _ref64._id;
			var app = _ref66.app,
			    user = _ref66.user;

			_objectDestructuringEmpty(_ref65);

			return app.findEntity("files", { host: "knowledges:" + _id });
		},
		inTask: function inTask(_ref67, _ref68, _ref69) {
			var _id = _ref67._id;
			var child = _ref68.child;
			var app = _ref69.app,
			    user = _ref69.user;

			return app.getDataLoader("plans").load(child).then(function (plan) {
				if (!plan || !plan.todos) return false;
				return !!plan.todos.find(function (_ref70) {
					var knowledge = _ref70.knowledge;
					return knowledge == _id;
				});
			});
		},


		isMyWork: function isMyWork(_ref71, _ref72, _ref73) {
			var author = _ref71.author;
			var app = _ref73.app,
			    user = _ref73.user;

			_objectDestructuringEmpty(_ref72);

			return author == user._id;
		},

		author: function author(_ref74, _ref75, _ref76) {
			var _author = _ref74.author;
			var app = _ref76.app,
			    user = _ref76.user;

			_objectDestructuringEmpty(_ref75);

			return app.getDataLoader("users").load(_author);
		}
	},

	Publish: {
		id: function id(_ref77) {
			var _id = _ref77._id;
			return "publishs:" + _id;
		},

		author: function author(_ref78, _ref79, _ref80) {
			var _author2 = _ref78.author;
			var app = _ref80.app,
			    user = _ref80.user;

			_objectDestructuringEmpty(_ref79);

			return app.getDataLoader("users").load(_author2);
		},
		child: function child(_ref81, _ref82, _ref83) {
			var _child2 = _ref81.child;
			var app = _ref83.app,
			    user = _ref83.user;

			_objectDestructuringEmpty(_ref82);

			return app.getDataLoader("users").load(_child2).then(function (child) {
				return child.author == user._id ? child : null;
			});
		}
	},

	MonthPlan: {
		knowledges: function knowledges(_ref84, _ref85, _ref86) {
			var _ref84$knowledges = _ref84.knowledges,
			    _knowledges = _ref84$knowledges === undefined ? [] : _ref84$knowledges;

			var app = _ref86.app,
			    user = _ref86.user;

			_objectDestructuringEmpty(_ref85);

			return Promise.all(_knowledges.map(function (_id) {
				return app.getDataLoader("knowledges").load(knowledge);
			}));
		}
	},
	Todo: {
		knowledge: function (_knowledge) {
			function knowledge(_x, _x2, _x3) {
				return _knowledge.apply(this, arguments);
			}

			knowledge.toString = function () {
				return _knowledge.toString();
			};

			return knowledge;
		}(function (_ref87, _ref88, _ref89) {
			var knowledge = _ref87.knowledge;
			var app = _ref89.app,
			    user = _ref89.user;

			_objectDestructuringEmpty(_ref88);

			if (knowledge) return app.getDataLoader("knowledges").load(knowledge);
		})
	}
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("c:\\work\\spool\\superdaddy\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "resolver.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ })
/******/ ]);