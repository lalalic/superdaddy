"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _normalizr = require("normalizr");

var _dialpad = require("material-ui/svg-icons/communication/dialpad");

var _dialpad2 = _interopRequireDefault(_dialpad);

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _formatListNumbered = require("material-ui/svg-icons/editor/format-list-numbered");

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _childCare = require("material-ui/svg-icons/places/child-care");

var _childCare2 = _interopRequireDefault(_childCare);

var _db = require("./db");

var _checkUpdate = require("qili-app/lib/components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _baby = require("./baby");

var _baby2 = _interopRequireDefault(_baby);

var _timeManage = require("./time-manage");

var _timeManage2 = _interopRequireDefault(_timeManage);

var _info = require("./knowledge/info");

var _info2 = _interopRequireDefault(_info);

var _create = require("./knowledge/create");

var _create2 = _interopRequireDefault(_create);

var _knowledge = require("./knowledge/");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _comment = require("./knowledge/comment");

var _comment2 = _interopRequireDefault(_comment);

var _reactRedux = require("react-redux");

var _selector = require("./selector");

var _test = require("./test");

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar;


var DOMAIN = 'superdaddy';

var INIT_STATE = {};

var ACTION = exports.ACTION = {
	FETCH_FAMILY: function FETCH_FAMILY(a) {
		return function (dispatch, getState) {
			return _db.Family.find({ author: _qiliApp.User.currentAsAuthor }).fetch(function (all) {
				if (all.length == 0) dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD());else {
					all = _db.Family.upgrade(all);
					var entities = (0, _normalizr.normalize)(all, (0, _normalizr.arrayOf)(_db.Family.schema)).entities;
					dispatch((0, _qiliApp.ENTITIES)(entities));
					if (entities.children) {
						var next = entities.children[Object.keys(entities.children)[0]];
						if (next) dispatch(ACTION.CURRENT_CHILD_CHANGE(next));
					}
				}
			});
		};
	},
	CREATE_DEFAULT_FIRST_CHILD: function CREATE_DEFAULT_FIRST_CHILD() {
		return function (dispatch) {
			return _db.Family.upsert({ name: "宝宝", targets: { baby: { score: 0, totalScore: 0 } } }).then(function (child) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(child, _db.Family.schema).entities));
				dispatch(ACTION.CURRENT_CHILD_CHANGE(child));
			});
		};
	},
	SWITCH_CURRENT_CHILD: function SWITCH_CURRENT_CHILD(id) {
		return function (dispatch, getState) {
			var state = getState();
			var children = state.entities.children;
			if (id) {
				dispatch(ACTION.CURRENT_CHILD_CHANGE(children[id]));
			} else {
				var current = state[DOMAIN].child;
				var ids = Object.keys(children);
				var next = ids[(ids.indexOf(current) + 1) % ids.length];
				dispatch(ACTION.CURRENT_CHILD_CHANGE(children[next]));
			}
		};
	},
	CURRENT_CHILD_CHANGE: function CURRENT_CHILD_CHANGE(child) {
		return { type: 'CURRENT_CHILD_CHANGE', payload: child };
	}
};

var REDUCER = function REDUCER() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INIT_STATE;
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case 'CURRENT_CHILD_CHANGE':
			return Object.assign({}, state, { child: payload._id });
	}
	return state;
};

var SuperDaddy = function (_Component) {
	_inherits(SuperDaddy, _Component);

	function SuperDaddy() {
		_classCallCheck(this, SuperDaddy);

		return _possibleConstructorReturn(this, (SuperDaddy.__proto__ || Object.getPrototypeOf(SuperDaddy)).apply(this, arguments));
	}

	_createClass(SuperDaddy, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    children = _props.children,
			    routes = _props.routes,
			    dispatch = _props.dispatch;
			var router = this.context.router;

			var contextualStyle = { fontSize: "xx-small" };
			if (routes.find(function (a) {
				return a.contextual === false;
			})) contextualStyle.display = "none";
			return _react2.default.createElement(
				_qiliApp.QiliApp,
				{ appId: "5746b2c5e4bb3b3700ae1566",
					project: require("../package.json"),
					tutorial: [{
						media: "images/tutorial/time.png",
						title: "任务管理"
					}, {
						media: "images/tutorial/score.png",
						title: "正面激励"
					}, {
						media: "images/tutorial/knowledge.png",
						title: "知识查询"
					}],
					init: function init(a) {
						(0, _db.init)();
						dispatch(ACTION.FETCH_FAMILY());
					} },
				children,
				_react2.default.createElement(CommandBar, { className: "footbar", style: { zIndex: 1 },
					items: [{ label: "任务管理", action: "tasks",
						link: "/",
						icon: _react2.default.createElement(_formatListNumbered2.default, null) }, { label: "成绩", action: "score",
						link: '/score',
						icon: _react2.default.createElement(_childCare2.default, null) }, { label: "发现", action: "knowledges",
						link: '/knowledge',
						icon: _react2.default.createElement(_dialpad2.default, null) }, { label: "我", action: "my",
						link: '/my',
						icon: _react2.default.createElement(
							_checkUpdate2.default,
							null,
							_react2.default.createElement(_accountBox2.default, null)
						) }]
				})
			);
		}
	}]);

	return SuperDaddy;
}(_react.Component);

/*
import TaskUI from './task'
import SettingUI from './setting'
import PublishUI from './publish'
import TasksUI, {Approvings} from "./tasks"
import ScoreUI from "./score"
import InviteUI from "./invite"
*/

SuperDaddy.contextTypes = {
	router: _react.PropTypes.object
};
var SettingUI = _qiliApp.UI.Setting,
    ProfileUI = _qiliApp.UI.Profile;


module.exports = _qiliApp.QiliApp.render(_react2.default.createElement(
	_reactRouter.Route,
	{ path: "/", component: (0, _reactRedux.connect)()(SuperDaddy) },
	_react2.default.createElement(_reactRouter.Route, { path: "score", component: _timeManage2.default.ScorePad }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
				var children = state.entities.children;
				return { babies: children ? Object.keys(children).map(function (k) {
						return children[k];
					}) : [] };
			})(_account2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: SettingUI }),
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: "profile" },
			_react2.default.createElement(_reactRouter.IndexRoute, { component: ProfileUI })
		)
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "baby", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)()(_baby.Creator) }),
		_react2.default.createElement(_reactRouter.Route, { path: ":id",
			component: (0, _reactRedux.connect)(function (state, _ref2) {
				var id = _ref2.params.id;

				var child = (0, _selector.getChild)(state, id);
				var target = (child.targets || {})["baby"];
				var info = _extends({}, (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender"), (0, _qiliApp.compact)(target, "todo", "goal", "score", "totalScore"));
				info.isCurrent = child == (0, _selector.getCurrentChild)(state);
				return info;
			})(_baby2.default) })
	),
	_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
			return (0, _qiliApp.compact)(state.qiliApp.user, "_id");
		})(_timeManage2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "knowledge" },
		_react2.default.createElement(_reactRouter.IndexRoute, { contextual: false,
			component: (0, _reactRedux.connect)(function (state) {
				return { knowledges: (0, _selector.getKnowledges)(state) };
			})(_knowledge2.default.Creatable) }),
		_react2.default.createElement(_reactRouter.Route, { path: "create",
			contextual: false,
			component: (0, _reactRedux.connect)(function (state) {
				return (0, _qiliApp.compact)(state.ui.knowledge.selectedDocx, "knowledge");
			})(_create2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: ":_id",
			component: (0, _reactRedux.connect)(function (state, _ref3) {
				var _id = _ref3.params._id;
				return {
					knowledge: (0, _selector.getKnowledge)(state),
					revising: !!state.ui.knowledge.selectedDocx,
					inTask: !!(0, _selector.getCurrentChildTasks)(state).find(function (a) {
						return a.knowledge == _id;
					}) || !!(0, _selector.getCurrentChildTasks)(state, state.qiliApp.user._id).find(function (a) {
						return a.knowledge == _id;
					})
				};
			})(_info2.default) })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: _comment2.default }),
	_react2.default.createElement(_reactRouter.Route, { path: "test", component: _test2.default })
), [_defineProperty({}, DOMAIN, REDUCER), { ui: (0, _qiliApp.enhancedCombineReducers)({
		knowledge: _knowledge2.default.REDUCER,
		time: _timeManage2.default.reducer
	}) }]);

/**
* quickAction position doesn't change when resizing
* server render ready
    * dom and data retrieving from server should be in componentDidMount
* immutable setState to improve performance
*done: baby feature
    * create first baby
    * delete last baby
    * create baby
    * delete baby
    * Family list update along with baby addition and deletion
*done: Not baby centric
* logo
    * loading
* flux refactor
* form refactor
    *done: auto update: baby, controlled input onchange->setState->onBlur->upsert
* Family list UI
    * remove->dashboard->family list: setState warning, not pure render?
* change child name ->shortcut name should be changed accordingly
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cGdyYWRlIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJPYmplY3QiLCJrZXlzIiwiQ1VSUkVOVF9DSElMRF9DSEFOR0UiLCJ1cHNlcnQiLCJuYW1lIiwidGFyZ2V0cyIsImJhYnkiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJ0aGVuIiwiY2hpbGQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInN0YXRlIiwiaWQiLCJjdXJyZW50IiwiaWRzIiwiaW5kZXhPZiIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsImFzc2lnbiIsIl9pZCIsIlN1cGVyRGFkZHkiLCJwcm9wcyIsInJvdXRlcyIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0dWFsU3R5bGUiLCJmb250U2l6ZSIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIm1lZGlhIiwidGl0bGUiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiU2NvcmVQYWQiLCJiYWJpZXMiLCJtYXAiLCJrIiwicGFyYW1zIiwidGFyZ2V0IiwiaW5mbyIsImlzQ3VycmVudCIsInFpbGlBcHAiLCJ1c2VyIiwia25vd2xlZGdlcyIsIkNyZWF0YWJsZSIsInVpIiwia25vd2xlZGdlIiwic2VsZWN0ZWRE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IjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhciwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cblxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT5GYW1pbHkuZmluZCh7YXV0aG9yOlVzZXIuY3VycmVudEFzQXV0aG9yfSlcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQoKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGw9RmFtaWx5LnVwZ3JhZGUoYWxsKVxuXHRcdFx0XHRsZXQgZW50aXRpZXM9bm9ybWFsaXplKGFsbCxhcnJheU9mKEZhbWlseS5zY2hlbWEpKS5lbnRpdGllc1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhlbnRpdGllcykpXG5cdFx0XHRcdGlmKGVudGl0aWVzLmNoaWxkcmVuKXtcblx0XHRcdFx0XHRsZXQgbmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cdFx0XHRcdFx0aWYobmV4dClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShuZXh0KSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCLlrp3lrp1cIix0YXJnZXRzOntiYWJ5OntzY29yZTowLHRvdGFsU2NvcmU6MH19fSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZCkpXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5baWRdKSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW25leHRdKSlcblx0XHR9XG5cdH1cblx0LENVUlJFTlRfQ0hJTERfQ0hBTkdFOiBjaGlsZD0+KHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtjaGlsZDpwYXlsb2FkLl9pZH0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRwcm9qZWN0PXtyZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpfVxuXHRcdFx0XHR0dXRvcmlhbD17W1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3RpbWUucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuS7u+WKoeeuoeeQhlwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9zY29yZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi5q2j6Z2i5r+A5YqxXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL2tub3dsZWRnZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi55+l6K+G5p+l6K+iXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19XG5cdFx0XHRcdGluaXQ9e2E9Pntcblx0XHRcdFx0XHRcdGluaXQoKVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxuXHRcdFx0XHR9fT5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoeeuoeeQhlwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9zY29yZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicva25vd2xlZGdlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8Q2hlY2tVcGRhdGU+PEljb25BY2NvdW50Lz48L0NoZWNrVXBkYXRlPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbiovXG5cbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcblxuaW1wb3J0IFRpbWVNYW5hZ2VVSSBmcm9tIFwiLi90aW1lLW1hbmFnZVwiXG5cbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9pbmZvJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2NyZWF0ZSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2UvJ1xuaW1wb3J0IEtub3dsZWRnZUNvbW1lbnQgZnJvbSBcIi4va25vd2xlZGdlL2NvbW1lbnRcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzLCBnZXRLbm93bGVkZ2VzLCBnZXRLbm93bGVkZ2V9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxuaW1wb3J0IFRlc3QgZnJvbSBcIi4vdGVzdFwiXG5cbmNvbnN0IHtTZXR0aW5nOlNldHRpbmdVSSwgUHJvZmlsZTogUHJvZmlsZVVJfT1VSVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtjb25uZWN0KCkoU3VwZXJEYWRkeSl9PlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJzY29yZVwiIGNvbXBvbmVudD17VGltZU1hbmFnZVVJLlNjb3JlUGFkfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT57XG5cdFx0XHRcdGxldCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxuXHRcdFx0XHRyZXR1cm4ge2JhYmllczpjaGlsZHJlbiA/IE9iamVjdC5rZXlzKGNoaWxkcmVuKS5tYXAoaz0+Y2hpbGRyZW5ba10pIDogW119XG5cdFx0XHR9KShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIj5cblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cblx0XHRcdDwvUm91dGU+XG5cdFx0PC9Sb3V0ZT5cblxuXG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IHRhcmdldD0oY2hpbGQudGFyZ2V0c3x8e30pW1wiYmFieVwiXVxuXHRcdFx0XHRcdGxldCBpbmZvPXsuLi5jb21wYWN0KGNoaWxkLFwibmFtZVwiLFwicGhvdG9cIixcImJkXCIsXCJnZW5kZXJcIiksLi4uY29tcGFjdCh0YXJnZXQsXCJ0b2RvXCIsXCJnb2FsXCIsXCJzY29yZVwiLFwidG90YWxTY29yZVwiKX1cblx0XHRcdFx0XHRpbmZvLmlzQ3VycmVudD1jaGlsZD09Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdFx0XHRcdHJldHVybiBpbmZvXG5cdFx0XHRcdH0pKEJhYnlVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnFpbGlBcHAudXNlcixcIl9pZFwiKSkoVGltZU1hbmFnZVVJKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cblx0XHRcdDxJbmRleFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7a25vd2xlZGdlczpnZXRLbm93bGVkZ2VzKHN0YXRlKX0pKShLbm93bGVkZ2VzVUkuQ3JlYXRhYmxlKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cImNyZWF0ZVwiXG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeCxcImtub3dsZWRnZVwiKSkoTmV3S25vd2xlZGdlVUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT4oe1xuXHRcdFx0XHRcdGtub3dsZWRnZTpnZXRLbm93bGVkZ2Uoc3RhdGUpXG5cdFx0XHRcdFx0LHJldmlzaW5nOiEhc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuXHRcdFx0XHRcdCxpblRhc2s6ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpKS5maW5kKGE9PmEua25vd2xlZGdlPT1faWQpfHwhIShnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxzdGF0ZS5xaWxpQXBwLnVzZXIuX2lkKSkuZmluZChhPT5hLmtub3dsZWRnZT09X2lkKVxuXHRcdFx0XHRcdH0pKShLbm93bGVkZ2VVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZUNvbW1lbnR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxuXG5cdHsvKlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY291cnNlc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cImRvbmVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRrbm93bGVkZ2U6S25vd2xlZGdlc1VJLlJFRFVDRVJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXG5cdFx0fSl9XG5cdF1cbilcblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==