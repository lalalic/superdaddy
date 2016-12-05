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

var _test = require("./test");

var _test2 = _interopRequireDefault(_test);

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
	{ path: "/", component: (0, _reactRedux.connect)()(SuperDaddy) },
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
	_react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: Comment }),
	_react2.default.createElement(_reactRouter.Route, { path: "test", component: _test2.default })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUE4R0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7O0FBeElBLFFBQVEscUJBQVI7O0lBZU87SUFBTztJQUFTOzs7QUFFdkIsSUFBTSxTQUFPLFlBQVA7O0FBRU4sSUFBTSxhQUFXLEVBQVg7O0FBR0MsSUFBTSwwQkFBTztBQUNuQixlQUFjO1NBQUc7VUFBVSxXQUFPLElBQVAsR0FDekIsS0FEeUIsQ0FDbkIsZUFBSztBQUNYLFFBQUcsSUFBSSxNQUFKLElBQVksQ0FBWixFQUNGLFNBQVMsT0FBTywwQkFBUCxFQUFULEVBREQsS0FFSztBQUNKLFNBQUksV0FBUywwQkFBVSxHQUFWLEVBQWMsd0JBQVEsV0FBTyxNQUFQLENBQXRCLEVBQXNDLFFBQXRDLENBRFQ7QUFFSixjQUFTLHVCQUFTLFFBQVQsQ0FBVCxFQUZJO0FBR0osU0FBRyxTQUFTLFFBQVQsRUFBa0I7QUFDcEIsVUFBSSxPQUFLLFNBQVMsUUFBVCxDQUFrQixvQkFBWSxTQUFTLFFBQVQsQ0FBWixDQUErQixDQUEvQixDQUFsQixDQUFMLENBRGdCO0FBRXBCLFVBQUcsSUFBSCxFQUNDLFNBQVMsT0FBTyxvQkFBUCxDQUE0QixJQUE1QixDQUFULEVBREQ7TUFGRDtLQUxEO0lBRE07R0FEUztFQUFIO0FBY2IsNkJBQTRCO1NBQUksb0JBQVU7QUFDMUMsVUFBTyxXQUFPLE1BQVAsQ0FBYyxFQUFDLE1BQUssSUFBTCxFQUFVLE9BQU0sQ0FBTixFQUF6QixFQUNMLElBREssQ0FDQSxpQkFBTztBQUNaLGFBQVMsdUJBQVMsMEJBQVUsS0FB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Q0ExQkc7Q0FvQ0g7O0lBQU8sTUFBSyxXQUFMLEVBQVA7RUFDQyx5REFBWSxZQUFZLEtBQVo7QUFDWCxjQUFXLHlCQUFRO1dBQVEsRUFBQyxZQUFXLDZCQUFjLEtBQWQsQ0FBWDtJQUFULENBQVIsQ0FBb0QscUJBQWEsU0FBYixDQUEvRCxFQURELENBREQ7RUFJQyxvREFBTyxNQUFLLFFBQUw7QUFDTixlQUFZLEtBQVo7QUFDQSxjQUFXLHlCQUFRO1dBQU8sc0JBQVEsTUFBTSxFQUFOLENBQVMsU0FBVCxDQUFtQixZQUFuQixFQUFnQyxXQUF4QztJQUFQLENBQVIsd0JBQVgsRUFGRCxDQUpEO0VBUUMsb0RBQU8sTUFBSyxNQUFMO0FBQ04sY0FBVyx5QkFBUSxVQUFDLEtBQUQ7UUFBZ0IsWUFBUixPQUFRO1dBQVM7QUFDM0MsZ0JBQVUsNEJBQWEsS0FBYixDQUFWO0FBQ0MsZUFBUyxDQUFDLENBQUMsTUFBTSxFQUFOLENBQVMsU0FBVCxDQUFtQixZQUFuQjtBQUNYLGFBQU8sQ0FBQyxDQUFDLG1DQUFDLENBQXFCLEtBQXJCLENBQUQsQ0FBOEIsSUFBOUIsQ0FBbUM7YUFBRyxFQUFFLEdBQUYsSUFBTyxHQUFQO01BQUgsQ0FBcEM7O0lBSFMsQ0FBUixxQkFBWCxFQURELENBUkQ7RUFwQ0c7Q0FvREgsb0RBQU8sTUFBSyxvQkFBTCxFQUEwQixXQUFXLE9BQVgsRUFBakMsQ0FwREc7Q0FzREgsb0RBQU8sTUFBSyxNQUFMLEVBQVksMkJBQW5CLENBdERHO0NBRFUsRUFpRmIsbUNBQ0UsUUFBUSxRQURWLEVBRUMsRUFBQyxJQUFJLHNDQUF3QjtBQUM3QixhQUFVLHFCQUFhLE9BQWI7QUFDVCxRQUFLLHFCQUFhLE9BQWI7RUFGRCxDQUFKLEVBRkYsQ0FqRmEsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyLCBQYXBlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cblxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiBhPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbC5sZW5ndGg9PTApXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pe1xuXHRcdFx0XHRcdGxldCBuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblx0XHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKG5leHQpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0LENSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEOiAoKT0+ZGlzcGF0Y2g9Pntcblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydCh7bmFtZTpcIuWuneWunVwiLHNjb3JlOjB9KVxuXHRcdFx0LnRoZW4oY2hpbGQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGNoaWxkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkKSlcblx0XHRcdH0pXG5cdH1cblx0LFNXSVRDSF9DVVJSRU5UX0NISUxEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxuXHRcdGlmKGlkKXtcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltpZF0pKVxuXHRcdH1lbHNle1xuXHRcdFx0Y29uc3QgY3VycmVudD1zdGF0ZVtET01BSU5dLmNoaWxkXG5cdFx0XHRjb25zdCBpZHM9T2JqZWN0LmtleXMoY2hpbGRyZW4pXG5cdFx0XHRsZXQgbmV4dD1pZHNbKGlkcy5pbmRleE9mKGN1cnJlbnQpKzEpJWlkcy5sZW5ndGhdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5bbmV4dF0pKVxuXHRcdH1cblx0fVxuXHQsQ1VSUkVOVF9DSElMRF9DSEFOR0U6IGNoaWxkPT4oe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkfSlcbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCByb3V0ZXMsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0bGV0IGNvbnRleHR1YWxTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdGNvbnRleHR1YWxTdHlsZS5kaXNwbGF5PVwibm9uZVwiXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCBhcHBJZD1cIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiXG5cdFx0XHRcdGluaXQ9e2E9Pntcblx0XHRcdFx0XHRcdGluaXQoKVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxuXHRcdFx0XHR9fT5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaXtumXtOeuoeeQhlwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuLypcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaXtumXtOeuoeeQhlwiLCBhY3Rpb246XCJ0aW1lXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6XCIvdGltZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXHRcdFx0XHRcdFx0XHQqL1xuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0bGluazonL3Njb3JlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvblJld2FyZC8+fSxcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9rbm93bGVkZ2UnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcblxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazonL215JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uQWNjb3VudC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbi8qXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcbmltcG9ydCBJbnZpdGVVSSBmcm9tIFwiLi9pbnZpdGVcIlxuKi9cblxuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKShEYXNoYm9hcmRVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIsXCJ0b2Rvc1wiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0fSkoQmFieVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8SW5kZXhSb3V0ZSBwYXRoMT1cInRpbWVcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pntcblx0XHRcdFx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0Y29uc3Qge3RvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBnb2FsPTB9PWNoaWxkXG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0Li4uc3RhdGUudWkudGltZSxcblx0XHRcdFx0XHR0b2RvV2Vlayxcblx0XHRcdFx0XHRnb2FsXG5cdFx0XHRcdH1cblx0XHRcdH0pKFRpbWVNYW5hZ2VVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcblx0XHRcdFx0XHRrbm93bGVkZ2U6Z2V0S25vd2xlZGdlKHN0YXRlKVxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLl9pZD09X2lkKVxuXHRcdFx0XHRcdH0pKShLbm93bGVkZ2VVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxuXG5cdHsvKlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY291cnNlc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cImRvbmVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cblxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7XG5cdFx0XHRrbm93bGVkZ2U6S25vd2xlZGdlc1VJLlJFRFVDRVJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXG5cdFx0fSl9XG5cdF1cbilcblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==