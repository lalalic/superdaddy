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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cGdyYWRlIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJPYmplY3QiLCJrZXlzIiwiQ1VSUkVOVF9DSElMRF9DSEFOR0UiLCJ1cHNlcnQiLCJuYW1lIiwidGFyZ2V0cyIsImJhYnkiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJ0aGVuIiwiY2hpbGQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInN0YXRlIiwiaWQiLCJjdXJyZW50IiwiaWRzIiwiaW5kZXhPZiIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsImFzc2lnbiIsIl9pZCIsIlN1cGVyRGFkZHkiLCJwcm9wcyIsInJvdXRlcyIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0dWFsU3R5bGUiLCJmb250U2l6ZSIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIm1lZGlhIiwidGl0bGUiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiU2NvcmVQYWQiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJ0YXJnZXQiLCJpbmZvIiwiaXNDdXJyZW50IiwicWlsaUFwcCIsInVzZXIiLCJrbm93bGVkZ2VzIiwiQ3JlYXRhYmxlIiwidWkiLCJrbm93bGVkZ2UiLCJzZWxlY3RlZERvY3giLCJyZXZpc2luZyIsImluVGFzayIsInRpbWUiLCJyZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFQTs7OztBQXdIQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFuSkFBLFFBQVEscUJBQVI7O0lBaUJPQyxLLGVBQUFBLEs7SUFBT0MsTyxlQUFBQSxPO0lBQVNDLFUsZUFBQUEsVTs7O0FBRXZCLElBQU1DLFNBQU8sWUFBYjs7QUFFQSxJQUFNQyxhQUFXLEVBQWpCOztBQUdPLElBQU1DLDBCQUFPO0FBQ25CQyxlQUFjO0FBQUEsU0FBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVY7QUFBQSxVQUFxQixXQUFPQyxJQUFQLENBQVksRUFBQ0MsUUFBTyxjQUFLQyxlQUFiLEVBQVosRUFDcENDLEtBRG9DLENBQzlCLGVBQUs7QUFDWCxRQUFHQyxJQUFJQyxNQUFKLElBQVksQ0FBZixFQUNDUCxTQUFTRixPQUFPVSwwQkFBUCxFQUFULEVBREQsS0FFSztBQUNKRixXQUFJLFdBQU9HLE9BQVAsQ0FBZUgsR0FBZixDQUFKO0FBQ0EsU0FBSUksV0FBUywwQkFBVUosR0FBVixFQUFjLHdCQUFRLFdBQU9LLE1BQWYsQ0FBZCxFQUFzQ0QsUUFBbkQ7QUFDQVYsY0FBUyx1QkFBU1UsUUFBVCxDQUFUO0FBQ0EsU0FBR0EsU0FBU0UsUUFBWixFQUFxQjtBQUNwQixVQUFJQyxPQUFLSCxTQUFTRSxRQUFULENBQWtCRSxPQUFPQyxJQUFQLENBQVlMLFNBQVNFLFFBQXJCLEVBQStCLENBQS9CLENBQWxCLENBQVQ7QUFDQSxVQUFHQyxJQUFILEVBQ0NiLFNBQVNGLE9BQU9rQixvQkFBUCxDQUE0QkgsSUFBNUIsQ0FBVDtBQUNEO0FBQ0Q7QUFDRCxJQWRvQyxDQUFyQjtBQUFBLEdBQUg7QUFBQSxFQURLO0FBZ0JsQkwsNkJBQTRCO0FBQUEsU0FBSSxvQkFBVTtBQUMxQyxVQUFPLFdBQU9TLE1BQVAsQ0FBYyxFQUFDQyxNQUFLLElBQU4sRUFBV0MsU0FBUSxFQUFDQyxNQUFLLEVBQUNDLE9BQU0sQ0FBUCxFQUFTQyxZQUFXLENBQXBCLEVBQU4sRUFBbkIsRUFBZCxFQUNMQyxJQURLLENBQ0EsaUJBQU87QUFDWnZCLGFBQVMsdUJBQVMsMEJBQVV3QixLQUFWLEVBQWdCLFdBQU9iLE1BQXZCLEVBQStCRCxRQUF4QyxDQUFUO0FBQ0FWLGFBQVNGLE9BQU9rQixvQkFBUCxDQUE0QlEsS0FBNUIsQ0FBVDtBQUNBLElBSkssQ0FBUDtBQUtBLEdBTjRCO0FBQUEsRUFoQlY7QUF1QmxCQyx1QkFBc0I7QUFBQSxTQUFJLFVBQUN6QixRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDL0MsT0FBTXlCLFFBQU16QixVQUFaO0FBQ0EsT0FBTVcsV0FBU2MsTUFBTWhCLFFBQU4sQ0FBZUUsUUFBOUI7QUFDQSxPQUFHZSxFQUFILEVBQU07QUFDTDNCLGFBQVNGLE9BQU9rQixvQkFBUCxDQUE0QkosU0FBU2UsRUFBVCxDQUE1QixDQUFUO0FBQ0EsSUFGRCxNQUVLO0FBQ0osUUFBTUMsVUFBUUYsTUFBTTlCLE1BQU4sRUFBYzRCLEtBQTVCO0FBQ0EsUUFBTUssTUFBSWYsT0FBT0MsSUFBUCxDQUFZSCxRQUFaLENBQVY7QUFDQSxRQUFJQyxPQUFLZ0IsSUFBSSxDQUFDQSxJQUFJQyxPQUFKLENBQVlGLE9BQVosSUFBcUIsQ0FBdEIsSUFBeUJDLElBQUl0QixNQUFqQyxDQUFUO0FBQ0FQLGFBQVNGLE9BQU9rQixvQkFBUCxDQUE0QkosU0FBU0MsSUFBVCxDQUE1QixDQUFUO0FBQ0E7QUFDRCxHQVhzQjtBQUFBLEVBdkJKO0FBbUNsQkcsdUJBQXNCO0FBQUEsU0FBUSxFQUFDZSxNQUFLLHNCQUFOLEVBQTZCQyxTQUFRUixLQUFyQyxFQUFSO0FBQUE7QUFuQ0osQ0FBYjs7QUFzQ1AsSUFBTVMsVUFBUSxTQUFSQSxPQUFRLEdBQW1DO0FBQUEsS0FBbENQLEtBQWtDLHVFQUE1QjdCLFVBQTRCO0FBQUE7QUFBQSxLQUFoQmtDLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDaEQsU0FBT0QsSUFBUDtBQUNBLE9BQUssc0JBQUw7QUFDQyxVQUFPakIsT0FBT29CLE1BQVAsQ0FBYyxFQUFkLEVBQWlCUixLQUFqQixFQUF1QixFQUFDRixPQUFNUSxRQUFRRyxHQUFmLEVBQXZCLENBQVA7QUFGRDtBQUlBLFFBQU9ULEtBQVA7QUFDQSxDQU5EOztJQVFNVSxVOzs7Ozs7Ozs7OzsyQkFDRztBQUFBLGdCQUM0QixLQUFLQyxLQURqQztBQUFBLE9BQ0F6QixRQURBLFVBQ0FBLFFBREE7QUFBQSxPQUNVMEIsTUFEVixVQUNVQSxNQURWO0FBQUEsT0FDa0J0QyxRQURsQixVQUNrQkEsUUFEbEI7QUFBQSxPQUVBdUMsTUFGQSxHQUVRLEtBQUtDLE9BRmIsQ0FFQUQsTUFGQTs7QUFHUCxPQUFJRSxrQkFBZ0IsRUFBQ0MsVUFBUyxVQUFWLEVBQXBCO0FBQ0EsT0FBR0osT0FBT3BDLElBQVAsQ0FBWTtBQUFBLFdBQUd5QyxFQUFFQyxVQUFGLEtBQWUsS0FBbEI7QUFBQSxJQUFaLENBQUgsRUFDQ0gsZ0JBQWdCSSxPQUFoQixHQUF3QixNQUF4QjtBQUNLLFVBQ0k7QUFBQTtBQUFBLE1BQVMsT0FBTSwwQkFBZjtBQUNSLGNBQVNyRCxRQUFRLGlCQUFSLENBREQ7QUFFUixlQUFVLENBQ1Q7QUFDQ3NELGFBQU0sMEJBRFA7QUFFQ0MsYUFBTTtBQUZQLE1BRFMsRUFLVDtBQUNDRCxhQUFNLDJCQURQO0FBRUNDLGFBQU07QUFGUCxNQUxTLEVBU1Q7QUFDQ0QsYUFBTSwrQkFEUDtBQUVDQyxhQUFNO0FBRlAsTUFUUyxDQUZGO0FBZ0JSLFdBQU0saUJBQUc7QUFDUDtBQUNBL0MsZUFBU0YsT0FBT0MsWUFBUCxFQUFUO0FBQ0QsTUFuQk87QUFxQlBhLFlBckJPO0FBdUJJLGtDQUFDLFVBQUQsSUFBWSxXQUFVLFNBQXRCLEVBQWdDLE9BQU8sRUFBQ29DLFFBQU8sQ0FBUixFQUF2QztBQUNYLFlBQU8sQ0FDTixFQUFDQyxPQUFNLE1BQVAsRUFBZUMsUUFBTyxPQUF0QjtBQUNDQyxZQUFLLEdBRE47QUFFc0JDLFlBQUssaUVBRjNCLEVBRE0sRUFJTixFQUFDSCxPQUFNLElBQVAsRUFBYUMsUUFBTyxPQUFwQjtBQUNDQyxZQUFLLFFBRE47QUFFQ0MsWUFBSyx3REFGTixFQUpNLEVBT04sRUFBQ0gsT0FBTSxJQUFQLEVBQWFDLFFBQU8sWUFBcEI7QUFDQ0MsWUFBSyxZQUROO0FBRUNDLFlBQUssc0RBRk4sRUFQTSxFQVdZLEVBQUNILE9BQU0sR0FBUCxFQUFZQyxRQUFPLElBQW5CO0FBQ0lDLFlBQUssS0FEVDtBQUVJQyxZQUFLO0FBQUE7QUFBQTtBQUFhO0FBQWIsT0FGVCxFQVhaO0FBREk7QUF2QkosSUFESjtBQTJDTjs7Ozs7O0FBTUY7Ozs7Ozs7OztBQXhETWhCLFUsQ0FtREVpQixZLEdBQWE7QUFDbkJkLFNBQVEsaUJBQVVlO0FBREMsQztJQTRCTkMsUyxlQUFSQyxPO0lBQTRCQyxTLGVBQVRDLE87OztBQUUxQkMsT0FBT0MsT0FBUCxHQUFlLGlCQUFRQyxNQUFSLENBQ1Y7QUFBQTtBQUFBLEdBQU8sTUFBSyxHQUFaLEVBQWdCLFdBQVcsMkJBQVV6QixVQUFWLENBQTNCO0FBRUgscURBQU8sTUFBSyxPQUFaLEVBQW9CLFdBQVcscUJBQWEwQixRQUE1QyxHQUZHO0FBSUg7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaLEVBQWlCLFlBQVksS0FBN0I7QUFDQywyREFBWSxXQUFXLHlCQUFRO0FBQUEsV0FBUSxFQUFDQyxRQUFPakQsT0FBT2tELE1BQVAsQ0FBY3RDLE1BQU1oQixRQUFOLENBQWVFLFFBQTdCLENBQVIsRUFBUjtBQUFBLElBQVIsb0JBQXZCLEdBREQ7QUFHQyxzREFBTyxNQUFLLFNBQVosRUFBc0IsV0FBVzJDLFNBQWpDLEdBSEQ7QUFLQztBQUFBO0FBQUEsS0FBTyxNQUFLLFNBQVo7QUFDQyw0REFBWSxXQUFXRSxTQUF2QjtBQUREO0FBTEQsRUFKRztBQWdCSDtBQUFBO0FBQUEsSUFBTyxNQUFLLE1BQVosRUFBbUIsWUFBWSxLQUEvQjtBQUNDLDJEQUFZLFdBQVcseUNBQXZCLEdBREQ7QUFHQyxzREFBTyxNQUFLLEtBQVo7QUFDQyxjQUFXLHlCQUFRLFVBQUMvQixLQUFELFNBQXVCO0FBQUEsUUFBUEMsRUFBTyxTQUFmc0MsTUFBZSxDQUFQdEMsRUFBTzs7QUFDekMsUUFBSUgsUUFBTSx3QkFBU0UsS0FBVCxFQUFlQyxFQUFmLENBQVY7QUFDQSxRQUFJdUMsU0FBTyxDQUFDMUMsTUFBTUwsT0FBTixJQUFlLEVBQWhCLEVBQW9CLE1BQXBCLENBQVg7QUFDQSxRQUFJZ0Qsb0JBQVMsc0JBQVEzQyxLQUFSLEVBQWMsTUFBZCxFQUFxQixPQUFyQixFQUE2QixJQUE3QixFQUFrQyxRQUFsQyxDQUFULEVBQXdELHNCQUFRMEMsTUFBUixFQUFlLE1BQWYsRUFBc0IsTUFBdEIsRUFBNkIsT0FBN0IsRUFBcUMsWUFBckMsQ0FBeEQsQ0FBSjtBQUNBQyxTQUFLQyxTQUFMLEdBQWU1QyxTQUFPLCtCQUFnQkUsS0FBaEIsQ0FBdEI7QUFDQSxXQUFPeUMsSUFBUDtBQUNBLElBTlUsaUJBRFo7QUFIRCxFQWhCRztBQTZCSCwwREFBWSxXQUFXLHlCQUFRO0FBQUEsVUFBTyxzQkFBUXpDLE1BQU0yQyxPQUFOLENBQWNDLElBQXRCLEVBQTJCLEtBQTNCLENBQVA7QUFBQSxHQUFSLHVCQUF2QixHQTdCRztBQStCSDtBQUFBO0FBQUEsSUFBTyxNQUFLLFdBQVo7QUFDQywyREFBWSxZQUFZLEtBQXhCO0FBQ0MsY0FBVyx5QkFBUTtBQUFBLFdBQVEsRUFBQ0MsWUFBVyw2QkFBYzdDLEtBQWQsQ0FBWixFQUFSO0FBQUEsSUFBUixFQUFvRCxvQkFBYThDLFNBQWpFLENBRFosR0FERDtBQUlDLHNEQUFPLE1BQUssUUFBWjtBQUNDLGVBQVksS0FEYjtBQUVDLGNBQVcseUJBQVE7QUFBQSxXQUFPLHNCQUFROUMsTUFBTStDLEVBQU4sQ0FBU0MsU0FBVCxDQUFtQkMsWUFBM0IsRUFBd0MsV0FBeEMsQ0FBUDtBQUFBLElBQVIsbUJBRlosR0FKRDtBQVFDLHNEQUFPLE1BQUssTUFBWjtBQUNDLGNBQVcseUJBQVEsVUFBQ2pELEtBQUQ7QUFBQSxRQUFnQlMsR0FBaEIsU0FBUThCLE1BQVIsQ0FBZ0I5QixHQUFoQjtBQUFBLFdBQXlCO0FBQzNDdUMsZ0JBQVUsNEJBQWFoRCxLQUFiLENBRGlDO0FBRTFDa0QsZUFBUyxDQUFDLENBQUNsRCxNQUFNK0MsRUFBTixDQUFTQyxTQUFULENBQW1CQyxZQUZZO0FBRzFDRSxhQUFPLENBQUMsQ0FBRSxvQ0FBcUJuRCxLQUFyQixDQUFELENBQThCeEIsSUFBOUIsQ0FBbUM7QUFBQSxhQUFHeUMsRUFBRVIsR0FBRixJQUFPQSxHQUFWO0FBQUEsTUFBbkM7QUFIaUMsS0FBekI7QUFBQSxJQUFSLGlCQURaO0FBUkQsRUEvQkc7QUErQ0gscURBQU8sTUFBSyxvQkFBWixFQUFpQyxXQUFXekMsT0FBNUMsR0EvQ0c7QUFpREgscURBQU8sTUFBSyxNQUFaLEVBQW1CLHlCQUFuQjtBQWpERyxDQURVLEVBNEViLHFCQUNFRSxNQURGLEVBQ1VxQyxPQURWLEdBRUMsRUFBQ3dDLElBQUksc0NBQXdCO0FBQzdCQyxhQUFVLG9CQUFhekMsT0FETTtBQUU1QjZDLFFBQUsscUJBQWFDO0FBRlUsRUFBeEIsQ0FBTCxFQUZELENBNUVhLENBQWY7O0FBcUZBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixRaWxpQXBwLCBVSSwgRU5USVRJRVMsIGNvbXBhY3QsIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXIsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5pbXBvcnQgQ2hlY2tVcGRhdGUgZnJvbSBcInFpbGktYXBwL2xpYi9jb21wb25lbnRzL2NoZWNrLXVwZGF0ZVwiXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY29uc3QgRE9NQUlOPSdzdXBlcmRhZGR5J1xuXG5jb25zdCBJTklUX1NUQVRFPXt9XG5cblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEZFVENIX0ZBTUlMWTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+RmFtaWx5LmZpbmQoe2F1dGhvcjpVc2VyLmN1cnJlbnRBc0F1dGhvcn0pXG5cdFx0LmZldGNoKGFsbD0+e1xuXHRcdFx0aWYoYWxsLmxlbmd0aD09MClcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEKCkpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YWxsPUZhbWlseS51cGdyYWRlKGFsbClcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbil7XG5cdFx0XHRcdFx0bGV0IG5leHQ9ZW50aXRpZXMuY2hpbGRyZW5bT2JqZWN0LmtleXMoZW50aXRpZXMuY2hpbGRyZW4pWzBdXVxuXHRcdFx0XHRcdGlmKG5leHQpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UobmV4dCkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHQsQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQ6ICgpPT5kaXNwYXRjaD0+e1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwi5a6d5a6dXCIsdGFyZ2V0czp7YmFieTp7c2NvcmU6MCx0b3RhbFNjb3JlOjB9fX0pXG5cdFx0XHQudGhlbihjaGlsZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoY2hpbGQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGQpKVxuXHRcdFx0fSlcblx0fVxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkcmVuPXN0YXRlLmVudGl0aWVzLmNoaWxkcmVuXG5cdFx0aWYoaWQpe1xuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW2lkXSkpXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcblx0XHRcdGNvbnN0IGlkcz1PYmplY3Qua2V5cyhjaGlsZHJlbilcblx0XHRcdGxldCBuZXh0PWlkc1soaWRzLmluZGV4T2YoY3VycmVudCkrMSklaWRzLmxlbmd0aF1cblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltuZXh0XSkpXG5cdFx0fVxuXHR9XG5cdCxDVVJSRU5UX0NISUxEX0NIQU5HRTogY2hpbGQ9Pih7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxufVxuXG5jb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgJ0NVUlJFTlRfQ0hJTERfQ0hBTkdFJzpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7Y2hpbGQ6cGF5bG9hZC5faWR9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jbGFzcyBTdXBlckRhZGR5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIHJvdXRlcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0Y29udGV4dHVhbFN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCJcblx0XHRcdFx0cHJvamVjdD17cmVxdWlyZShcIi4uL3BhY2thZ2UuanNvblwiKX1cblx0XHRcdFx0dHV0b3JpYWw9e1tcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC90aW1lLnBuZ1wiLFxuXHRcdFx0XHRcdFx0dGl0bGU6XCLku7vliqHnrqHnkIZcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvc2NvcmUucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuato+mdoua/gOWKsVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9rbm93bGVkZ2UucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuefpeivhuafpeivolwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0e2NoaWxkcmVufVxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLku7vliqHnrqHnkIZcIiwgYWN0aW9uOlwidGFza3NcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkOe7qVwiLCBhY3Rpb246XCJzY29yZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicvc2NvcmUnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcblx0XHRcdFx0XHRcdFx0bGluazonL2tub3dsZWRnZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25Lbm93bGVkZ2VzLz59LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOicvbXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PENoZWNrVXBkYXRlPjxJY29uQWNjb3VudC8+PC9DaGVja1VwZGF0ZT59XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuLypcbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxuaW1wb3J0IEludml0ZVVJIGZyb20gXCIuL2ludml0ZVwiXG4qL1xuXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvaW5mbydcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9jcmVhdGUnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlLydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBjb21wb25lbnQ9e1RpbWVNYW5hZ2VVSS5TY29yZVBhZH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtiYWJpZXM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbil9KSkoQWNjb3VudFVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCI+XG5cdFx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XG5cdFx0XHQ8L1JvdXRlPlxuXHRcdDwvUm91dGU+XG5cblxuXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6aWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxuXHRcdFx0XHRcdGxldCB0YXJnZXQ9KGNoaWxkLnRhcmdldHN8fHt9KVtcImJhYnlcIl1cblx0XHRcdFx0XHRsZXQgaW5mbz17Li4uY29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIpLC4uLmNvbXBhY3QodGFyZ2V0LFwidG9kb1wiLFwiZ29hbFwiLFwic2NvcmVcIixcInRvdGFsU2NvcmVcIil9XG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS5xaWxpQXBwLnVzZXIsXCJfaWRcIikpKFRpbWVNYW5hZ2VVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcblx0XHRcdFx0XHRrbm93bGVkZ2U6Z2V0S25vd2xlZGdlKHN0YXRlKVxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLl9pZD09X2lkKVxuXHRcdFx0XHRcdH0pKShLbm93bGVkZ2VVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxuXG5cdHsvKlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY291cnNlc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cImRvbmVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRrbm93bGVkZ2U6S25vd2xlZGdlc1VJLlJFRFVDRVJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXG5cdFx0fSl9XG5cdF1cbilcblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==