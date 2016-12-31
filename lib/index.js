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

var _scorePad = require("./time-manage/baby/score-pad");

var _scorePad2 = _interopRequireDefault(_scorePad);

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
			return _db.Family.upsert({ name: "宝宝", score: 0 }).then(function (child) {
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
					items: [{ label: "时间管理", action: "tasks",
						link: "/",
						icon: _react2.default.createElement(_formatListNumbered2.default, null) },
					/*
     						{label:"时间管理", action:"time",
     							link:"/time",
                                 icon:<IconTask/>},
     							*/

					{ label: "成绩", action: "score",
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
	_react2.default.createElement(_reactRouter.Route, { path: "score", component: _scorePad2.default }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
				return { babies: Object.values(state.entities.children) };
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
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender", "todo", "goal", "score", "totalScore");
				info.isCurrent = child == (0, _selector.getCurrentChild)(state);
				return info;
			})(_baby2.default) })
	),
	_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todoWeek = child.todoWeek,
			    todoWeek = _child$todoWeek === undefined ? new Date().getWeek() : _child$todoWeek,
			    _child$goal = child.goal,
			    goal = _child$goal === undefined ? 0 : _child$goal,
			    _child$score = child.score,
			    score = _child$score === undefined ? 0 : _child$score;

			return _extends({}, state.ui.time, {
				todoWeek: todoWeek,
				goal: goal,
				score: score
			});
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
						return a._id == _id;
					})
				};
			})(_info2.default) })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: Comment }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJlbnRpdGllcyIsInNjaGVtYSIsImNoaWxkcmVuIiwibmV4dCIsIk9iamVjdCIsImtleXMiLCJDVVJSRU5UX0NISUxEX0NIQU5HRSIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwic3RhdGUiLCJpZCIsImN1cnJlbnQiLCJpZHMiLCJpbmRleE9mIiwidHlwZSIsInBheWxvYWQiLCJSRURVQ0VSIiwiYXNzaWduIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwibWVkaWEiLCJ0aXRsZSIsInpJbmRleCIsImxhYmVsIiwiYWN0aW9uIiwibGluayIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJTZXR0aW5nVUkiLCJTZXR0aW5nIiwiUHJvZmlsZVVJIiwiUHJvZmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJpbmZvIiwiaXNDdXJyZW50IiwidG9kb1dlZWsiLCJEYXRlIiwiZ2V0V2VlayIsImdvYWwiLCJ1aSIsInRpbWUiLCJrbm93bGVkZ2VzIiwiQ3JlYXRhYmxlIiwia25vd2xlZGdlIiwic2VsZWN0ZWREb2N4IiwicmV2aXNpbmciLCJpblRhc2siLCJyZWR1Y2VyIl0s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Vyx5QkFBUTtBQUFBLFdBQU8sc0JBQVFoRCxNQUFNNkMsRUFBTixDQUFTSSxTQUFULENBQW1CQyxZQUEzQixFQUF3QyxXQUF4QyxDQUFQO0FBQUEsSUFBUixtQkFGWixHQUpEO0FBUUMsc0RBQU8sTUFBSyxNQUFaO0FBQ0MsY0FBVyx5QkFBUSxVQUFDbEQsS0FBRDtBQUFBLFFBQWdCUyxHQUFoQixTQUFRNkIsTUFBUixDQUFnQjdCLEdBQWhCO0FBQUEsV0FBeUI7QUFDM0N3QyxnQkFBVSw0QkFBYWpELEtBQWIsQ0FEaUM7QUFFMUNtRCxlQUFTLENBQUMsQ0FBQ25ELE1BQU02QyxFQUFOLENBQVNJLFNBQVQsQ0FBbUJDLFlBRlk7QUFHMUNFLGFBQU8sQ0FBQyxDQUFFLG9DQUFxQnBELEtBQXJCLENBQUQsQ0FBOEJwQixJQUE5QixDQUFtQztBQUFBLGFBQUdxQyxFQUFFUixHQUFGLElBQU9BLEdBQVY7QUFBQSxNQUFuQztBQUhpQyxLQUF6QjtBQUFBLElBQVIsaUJBRFo7QUFSRCxFQXZDRztBQXVESCxxREFBTyxNQUFLLG9CQUFaLEVBQWlDLFdBQVdyQyxPQUE1QyxHQXZERztBQXlESCxxREFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CO0FBekRHLENBRFUsRUFvRmIscUJBQ0VFLE1BREYsRUFDVWlDLE9BRFYsR0FFQyxFQUFDc0MsSUFBSSxzQ0FBd0I7QUFDN0JJLGFBQVUsb0JBQWExQyxPQURNO0FBRTVCdUMsUUFBSyxxQkFBYU87QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0FwRmEsQ0FBZjs7QUE2RkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhciwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cblxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT5GYW1pbHkuZmluZCh7YXV0aG9yOlVzZXIuY3VycmVudEFzQXV0aG9yfSlcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQoKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRsZXQgZW50aXRpZXM9bm9ybWFsaXplKGFsbCxhcnJheU9mKEZhbWlseS5zY2hlbWEpKS5lbnRpdGllc1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhlbnRpdGllcykpXG5cdFx0XHRcdGlmKGVudGl0aWVzLmNoaWxkcmVuKXtcblx0XHRcdFx0XHRsZXQgbmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cdFx0XHRcdFx0aWYobmV4dClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShuZXh0KSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCLlrp3lrp1cIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZCkpXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5baWRdKSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW25leHRdKSlcblx0XHR9XG5cdH1cblx0LENVUlJFTlRfQ0hJTERfQ0hBTkdFOiBjaGlsZD0+KHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtjaGlsZDpwYXlsb2FkLl9pZH0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRwcm9qZWN0PXtyZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpfVxuXHRcdFx0XHR0dXRvcmlhbD17W1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3RpbWUucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuS7u+WKoeeuoeeQhlwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9zY29yZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi5q2j6Z2i5r+A5YqxXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL2tub3dsZWRnZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi55+l6K+G5p+l6K+iXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19XG5cdFx0XHRcdGluaXQ9e2E9Pntcblx0XHRcdFx0XHRcdGluaXQoKVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxuXHRcdFx0XHR9fT5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaXtumXtOeuoeeQhlwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuLypcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaXtumXtOeuoeeQhlwiLCBhY3Rpb246XCJ0aW1lXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6XCIvdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXHRcdFx0XHRcdFx0XHQqL1xuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0bGluazonL3Njb3JlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvblJld2FyZC8+fSxcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9rbm93bGVkZ2UnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcblxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazonL215JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxDaGVja1VwZGF0ZT48SWNvbkFjY291bnQvPjwvQ2hlY2tVcGRhdGU+fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbi8qXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcbmltcG9ydCBJbnZpdGVVSSBmcm9tIFwiLi9pbnZpdGVcIlxuKi9cblxuaW1wb3J0IFNjb3JlUGFkVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2UvYmFieS9zY29yZS1wYWRcIlxuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuXG5pbXBvcnQgVGltZU1hbmFnZVVJIGZyb20gXCIuL3RpbWUtbWFuYWdlXCJcblxuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2luZm8nXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvY3JlYXRlJ1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZS8nXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3MsIGdldEtub3dsZWRnZXMsIGdldEtub3dsZWRnZX0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5pbXBvcnQgVGVzdCBmcm9tIFwiLi90ZXN0XCJcblxuY29uc3Qge1NldHRpbmc6U2V0dGluZ1VJLCBQcm9maWxlOiBQcm9maWxlVUl9PVVJXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3QoKShTdXBlckRhZGR5KX0+XG5cblx0XHQ8Um91dGUgcGF0aD1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVBhZFVJfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIj5cblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cblx0XHRcdDwvUm91dGU+XG5cdFx0PC9Sb3V0ZT5cblxuXG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIsXCJ0b2RvXCIsXCJnb2FsXCIsXCJzY29yZVwiLFwidG90YWxTY29yZVwiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0fSkoQmFieVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pntcblx0XHRcdFx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0Y29uc3Qge3RvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBnb2FsPTAsIHNjb3JlPTB9PWNoaWxkXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Li4uc3RhdGUudWkudGltZSxcblx0XHRcdFx0XHR0b2RvV2Vlayxcblx0XHRcdFx0XHRnb2FsLFxuXHRcdFx0XHRcdHNjb3JlXG5cdFx0XHRcdH1cblx0XHRcdH0pKFRpbWVNYW5hZ2VVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcblx0XHRcdFx0XHRrbm93bGVkZ2U6Z2V0S25vd2xlZGdlKHN0YXRlKVxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLl9pZD09X2lkKVxuXHRcdFx0XHRcdH0pKShLbm93bGVkZ2VVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxuXG5cdHsvKlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY291cnNlc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cImRvbmVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRrbm93bGVkZ2U6S25vd2xlZGdlc1VJLlJFRFVDRVJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXG5cdFx0fSl9XG5cdF1cbilcblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==