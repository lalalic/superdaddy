"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _values = require("babel-runtime/core-js/object/values");

var _values2 = _interopRequireDefault(_values);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

var _dashboard = require("./dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _baby = require("./baby");

var _baby2 = _interopRequireDefault(_baby);

var _timeManage = require("./time-manage");

var _timeManage2 = _interopRequireDefault(_timeManage);

var _knowledge = require("./knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _newKnowledge = require("./newKnowledge");

var _newKnowledge2 = _interopRequireDefault(_newKnowledge);

var _knowledges = require("./knowledges");

var _knowledges2 = _interopRequireDefault(_knowledges);

var _reactRedux = require("react-redux");

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty,
    Comment = _qiliApp.UI.Comment,
    CommandBar = _qiliApp.UI.CommandBar;


var DOMAIN = 'superdaddy';

var INIT_STATE = {};
var ACTION = exports.ACTION = {
	FETCH_FAMILY: function FETCH_FAMILY(a) {
		return function (dispatch) {
			return _db.Family.find().fetch(function (all) {
				if (all.length == 0) dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD());else {
					var entities = (0, _normalizr.normalize)(all, (0, _normalizr.arrayOf)(_db.Family.schema)).entities;
					dispatch((0, _qiliApp.ENTITIES)(entities));
					if (entities.children) {
						var next = entities.children[(0, _keys2.default)(entities.children)[0]];
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
				var ids = (0, _keys2.default)(children);
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
			return (0, _assign2.default)({}, state, { child: payload._id });
	}
	return state;
};

var SuperDaddy = function (_Component) {
	(0, _inherits3.default)(SuperDaddy, _Component);

	function SuperDaddy() {
		(0, _classCallCheck3.default)(this, SuperDaddy);
		return (0, _possibleConstructorReturn3.default)(this, (SuperDaddy.__proto__ || (0, _getPrototypeOf2.default)(SuperDaddy)).apply(this, arguments));
	}

	(0, _createClass3.default)(SuperDaddy, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    childName = _props.name,
			    childPhoto = _props.photo,
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
					init: function init(a) {
						(0, _db.init)();
						dispatch(ACTION.FETCH_FAMILY());
					} },
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "sticky top right _3",
						mini: true,
						style: contextualStyle,
						onClick: function onClick(e) {
							return dispatch(ACTION.SWITCH_CURRENT_CHILD());
						} },
					childPhoto ? _react2.default.createElement(_materialUi.Avatar, { src: childPhoto }) : childName
				),
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
						icon: _react2.default.createElement(_accountBox2.default, null) }]
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
	{ path: "/", component: (0, _reactRedux.connect)(function (state) {
			return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "name", "photo");
		})(SuperDaddy) },
	_react2.default.createElement(_reactRouter.Route, { path: "score", component: (0, _reactRedux.connect)(function (state) {
			return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
		})(_dashboard2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
				return { babies: (0, _values2.default)(state.entities.children) };
			})(_account2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: SettingUI }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: ProfileUI })
	),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "baby", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)()(_baby.Creator) }),
		_react2.default.createElement(_reactRouter.Route, { path: ":id",
			component: (0, _reactRedux.connect)(function (state, _ref2) {
				var id = _ref2.params.id;

				var child = (0, _selector.getChild)(state, id);
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender", "todos");
				info.isCurrent = child == (0, _selector.getCurrentChild)(state);
				return info;
			})(_baby2.default) })
	),
	_react2.default.createElement(_reactRouter.IndexRoute, { path1: "time", component: (0, _reactRedux.connect)(function (state) {
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todoWeek = child.todoWeek,
			    todoWeek = _child$todoWeek === undefined ? new Date().getWeek() : _child$todoWeek,
			    _child$goal = child.goal,
			    goal = _child$goal === undefined ? 0 : _child$goal;

			return (0, _extends3.default)({}, state.ui.time, {
				todoWeek: todoWeek,
				goal: goal
			});
		})(_timeManage2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "knowledge" },
		_react2.default.createElement(_reactRouter.IndexRoute, { contextual: false,
			component: (0, _reactRedux.connect)(function (state) {
				return { knowledges: (0, _selector.getKnowledges)(state) };
			})(_knowledges2.default.Creatable) }),
		_react2.default.createElement(_reactRouter.Route, { path: "create",
			contextual: false,
			component: (0, _reactRedux.connect)(function (state) {
				return (0, _qiliApp.compact)(state.ui.knowledge.selectedDocx, "knowledge");
			})(_newKnowledge2.default) }),
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
			})(_knowledge2.default) })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: Comment })
), [(0, _defineProperty3.default)({}, DOMAIN, REDUCER), { ui: (0, _qiliApp.enhancedCombineReducers)({
		knowledge: _knowledges2.default.REDUCER,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJmaW5kIiwiZmV0Y2giLCJhbGwiLCJsZW5ndGgiLCJkaXNwYXRjaCIsIkNSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJDVVJSRU5UX0NISUxEX0NIQU5HRSIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJ0eXBlIiwicGF5bG9hZCIsIlJFRFVDRVIiLCJfaWQiLCJTdXBlckRhZGR5IiwicHJvcHMiLCJjaGlsZE5hbWUiLCJjaGlsZFBob3RvIiwicGhvdG8iLCJyb3V0ZXMiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY29udGV4dHVhbFN0eWxlIiwiZm9udFNpemUiLCJhIiwiY29udGV4dHVhbCIsImRpc3BsYXkiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiYmFiaWVzIiwicGFyYW1zIiwiaW5mbyIsImlzQ3VycmVudCIsInRvZG9XZWVrIiwiRGF0ZSIsImdldFdlZWsiLCJnb2FsIiwidWkiLCJ0aW1lIiwia25vd2xlZGdlcyIsIkNyZWF0YWJsZSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInJldmlzaW5nIiwiaW5UYXNrIiwicmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LENBQVNJLFNBQVQsQ0FBbUJDLFlBQTNCLEVBQXdDLFdBQXhDLENBQVA7QUFBQSxJQUFSLHlCQUZaLEdBSkQ7QUFRQyxzREFBTyxNQUFLLE1BQVo7QUFDQyxjQUFXLHlCQUFRLFVBQUNqRCxLQUFEO0FBQUEsUUFBZ0JRLEdBQWhCLFNBQVE2QixNQUFSLENBQWdCN0IsR0FBaEI7QUFBQSxXQUF5QjtBQUMzQ3dDLGdCQUFVLDRCQUFhaEQsS0FBYixDQURpQztBQUUxQ2tELGVBQVMsQ0FBQyxDQUFDbEQsTUFBTTRDLEVBQU4sQ0FBU0ksU0FBVCxDQUFtQkMsWUFGWTtBQUcxQ0UsYUFBTyxDQUFDLENBQUUsb0NBQXFCbkQsS0FBckIsQ0FBRCxDQUE4QmxCLElBQTlCLENBQW1DO0FBQUEsYUFBR3FDLEVBQUVYLEdBQUYsSUFBT0EsR0FBVjtBQUFBLE1BQW5DO0FBSGlDLEtBQXpCO0FBQUEsSUFBUixzQkFEWjtBQVJELEVBbENHO0FBa0RILHFEQUFPLE1BQUssb0JBQVosRUFBaUMsV0FBV2hDLE9BQTVDO0FBbERHLENBRFUsRUE2RWIsbUNBQ0VFLE1BREYsRUFDVTZCLE9BRFYsR0FFQyxFQUFDcUMsSUFBSSxzQ0FBd0I7QUFDN0JJLGFBQVUscUJBQWF6QyxPQURNO0FBRTVCc0MsUUFBSyxxQkFBYU87QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0E3RWEsQ0FBZjs7QUF1RkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhciwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY29uc3QgRE9NQUlOPSdzdXBlcmRhZGR5J1xuXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiBhPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbC5sZW5ndGg9PTApXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pe1xuXHRcdFx0XHRcdGxldCBuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblx0XHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKG5leHQpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0LENSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEOiAoKT0+ZGlzcGF0Y2g9Pntcblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydCh7bmFtZTpcIuWuneWunVwiLHNjb3JlOjB9KVxuXHRcdFx0LnRoZW4oY2hpbGQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGNoaWxkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkKSlcblx0XHRcdH0pXG5cdH1cblx0LFNXSVRDSF9DVVJSRU5UX0NISUxEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxuXHRcdGlmKGlkKXtcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltpZF0pKVxuXHRcdH1lbHNle1xuXHRcdFx0Y29uc3QgY3VycmVudD1zdGF0ZVtET01BSU5dLmNoaWxkXG5cdFx0XHRjb25zdCBpZHM9T2JqZWN0LmtleXMoY2hpbGRyZW4pXG5cdFx0XHRsZXQgbmV4dD1pZHNbKGlkcy5pbmRleE9mKGN1cnJlbnQpKzEpJWlkcy5sZW5ndGhdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5bbmV4dF0pKVxuXHRcdH1cblx0fVxuXHQsQ1VSUkVOVF9DSElMRF9DSEFOR0U6IGNoaWxkPT4oe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkfSlcbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodCBfM1wiXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0XHRzdHlsZT17Y29udGV4dHVhbFN0eWxlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TV0lUQ0hfQ1VSUkVOVF9DSElMRCgpKX0+XG5cdFx0XHRcdFx0e2NoaWxkUGhvdG8gPyAoPEF2YXRhciBzcmM9e2NoaWxkUGhvdG99Lz4pIDogY2hpbGROYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXG5cdFx0XHRcdHtjaGlsZHJlbn1cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDoxfX1cblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5pe26Ze0566h55CGXCIsIGFjdGlvbjpcInRhc2tzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6XCIvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG4vKlxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5pe26Ze0566h55CGXCIsIGFjdGlvbjpcInRpbWVcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi90aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG5cdFx0XHRcdFx0XHRcdCovXG5cblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkOe7qVwiLCBhY3Rpb246XCJzY29yZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicvc2NvcmUnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcblx0XHRcdFx0XHRcdFx0bGluazonL2tub3dsZWRnZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25Lbm93bGVkZ2VzLz59LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOicvbXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25BY2NvdW50Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuLypcbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxuaW1wb3J0IEludml0ZVVJIGZyb20gXCIuL2ludml0ZVwiXG4qL1xuXG5pbXBvcnQgRGFzaGJvYXJkVUkgZnJvbSBcIi4vZGFzaGJvYXJkXCJcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcblxuaW1wb3J0IFRpbWVNYW5hZ2VVSSBmcm9tIFwiLi90aW1lLW1hbmFnZVwiXG5cbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzLCBnZXRLbm93bGVkZ2VzLCBnZXRLbm93bGVkZ2V9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxuY29uc3Qge1NldHRpbmc6U2V0dGluZ1VJLCBQcm9maWxlOiBQcm9maWxlVUl9PVVJXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcIm5hbWVcIixcInBob3RvXCIpKShTdXBlckRhZGR5KX0+XG5cblx0XHQ8Um91dGUgcGF0aD1cInNjb3JlXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoRGFzaGJvYXJkVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIsXCJ0b2Rvc1wiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0fSkoQmFieVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8SW5kZXhSb3V0ZSBwYXRoMT1cInRpbWVcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pntcblx0XHRcdFx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0Y29uc3Qge3RvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBnb2FsPTB9PWNoaWxkXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Li4uc3RhdGUudWkudGltZSxcblx0XHRcdFx0XHR0b2RvV2Vlayxcblx0XHRcdFx0XHRnb2FsXG5cdFx0XHRcdH1cblx0XHRcdH0pKFRpbWVNYW5hZ2VVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcblx0XHRcdFx0XHRrbm93bGVkZ2U6Z2V0S25vd2xlZGdlKHN0YXRlKVxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLl9pZD09X2lkKVxuXHRcdFx0XHRcdH0pKShLbm93bGVkZ2VVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuXHR7LypcbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxuKi99XG4gICAgPC9Sb3V0ZT4pXG5cdCxbXG5cdFx0e1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHt1aTogZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXG5cdFx0XHQsdGltZTpUaW1lTWFuYWdlVUkucmVkdWNlclxuXHRcdH0pfVxuXHRdXG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==