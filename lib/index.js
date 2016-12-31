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

var _checkUpdate = require("qili-app/lib/components/check-update");

var _checkUpdate2 = _interopRequireDefault(_checkUpdate);

var _scorePad = require("./time-manage/score-pad");

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
				return { babies: (0, _values2.default)(state.entities.children) };
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

			return (0, _extends3.default)({}, state.ui.time, {
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
), [(0, _defineProperty3.default)({}, DOMAIN, REDUCER), { ui: (0, _qiliApp.enhancedCombineReducers)({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJlbnRpdGllcyIsInNjaGVtYSIsImNoaWxkcmVuIiwibmV4dCIsIkNVUlJFTlRfQ0hJTERfQ0hBTkdFIiwidXBzZXJ0IiwibmFtZSIsInNjb3JlIiwidGhlbiIsImNoaWxkIiwiU1dJVENIX0NVUlJFTlRfQ0hJTEQiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJ0eXBlIiwicGF5bG9hZCIsIlJFRFVDRVIiLCJfaWQiLCJTdXBlckRhZGR5IiwicHJvcHMiLCJyb3V0ZXMiLCJyb3V0ZXIiLCJjb250ZXh0IiwiY29udGV4dHVhbFN0eWxlIiwiZm9udFNpemUiLCJhIiwiY29udGV4dHVhbCIsImRpc3BsYXkiLCJtZWRpYSIsInRpdGxlIiwiekluZGV4IiwibGFiZWwiLCJhY3Rpb24iLCJsaW5rIiwiaWNvbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIlNldHRpbmdVSSIsIlNldHRpbmciLCJQcm9maWxlVUkiLCJQcm9maWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlbmRlciIsImJhYmllcyIsInBhcmFtcyIsImluZm8iLCJpc0N1cnJlbnQiLCJ0b2RvV2VlayIsIkRhdGUiLCJnZXRXZWVrIiwiZ29hbCIsInVpIiwidGltZSIsImtub3dsZWRnZXMiLCJDcmVhdGFibGUiLCJrbm93bGVkZ2UiLCJzZWxlY3RlZERvY3giLCJyZXZpc2luZyIsImluVGFzayIsInJlZHVjZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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M0IsRUFBd0MsV0FBeEMsQ0FBUDtBQUFBLElBQVIsbUJBRlosR0FKRDtBQVFDLHNEQUFPLE1BQUssTUFBWjtBQUNDLGNBQVcseUJBQVEsVUFBQ2hELEtBQUQ7QUFBQSxRQUFnQlEsR0FBaEIsU0FBUTRCLE1BQVIsQ0FBZ0I1QixHQUFoQjtBQUFBLFdBQXlCO0FBQzNDdUMsZ0JBQVUsNEJBQWEvQyxLQUFiLENBRGlDO0FBRTFDaUQsZUFBUyxDQUFDLENBQUNqRCxNQUFNMkMsRUFBTixDQUFTSSxTQUFULENBQW1CQyxZQUZZO0FBRzFDRSxhQUFPLENBQUMsQ0FBRSxvQ0FBcUJsRCxLQUFyQixDQUFELENBQThCbEIsSUFBOUIsQ0FBbUM7QUFBQSxhQUFHa0MsRUFBRVIsR0FBRixJQUFPQSxHQUFWO0FBQUEsTUFBbkM7QUFIaUMsS0FBekI7QUFBQSxJQUFSLGlCQURaO0FBUkQsRUF2Q0c7QUF1REgscURBQU8sTUFBSyxvQkFBWixFQUFpQyxXQUFXbEMsT0FBNUMsR0F2REc7QUF5REgscURBQU8sTUFBSyxNQUFaLEVBQW1CLHlCQUFuQjtBQXpERyxDQURVLEVBb0ZiLG1DQUNFRSxNQURGLEVBQ1UrQixPQURWLEdBRUMsRUFBQ29DLElBQUksc0NBQXdCO0FBQzdCSSxhQUFVLG9CQUFheEMsT0FETTtBQUU1QnFDLFFBQUsscUJBQWFPO0FBRlUsRUFBeEIsQ0FBTCxFQUZELENBcEZhLENBQWY7O0FBNkZBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixRaWxpQXBwLCBVSSwgRU5USVRJRVMsIGNvbXBhY3QsIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXIsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5pbXBvcnQgQ2hlY2tVcGRhdGUgZnJvbSBcInFpbGktYXBwL2xpYi9jb21wb25lbnRzL2NoZWNrLXVwZGF0ZVwiXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY29uc3QgRE9NQUlOPSdzdXBlcmRhZGR5J1xuXG5jb25zdCBJTklUX1NUQVRFPXt9XG5cblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEZFVENIX0ZBTUlMWTogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+RmFtaWx5LmZpbmQoe2F1dGhvcjpVc2VyLmN1cnJlbnRBc0F1dGhvcn0pXG5cdFx0LmZldGNoKGFsbD0+e1xuXHRcdFx0aWYoYWxsLmxlbmd0aD09MClcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEKCkpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbil7XG5cdFx0XHRcdFx0bGV0IG5leHQ9ZW50aXRpZXMuY2hpbGRyZW5bT2JqZWN0LmtleXMoZW50aXRpZXMuY2hpbGRyZW4pWzBdXVxuXHRcdFx0XHRcdGlmKG5leHQpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UobmV4dCkpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KVxuXHQsQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQ6ICgpPT5kaXNwYXRjaD0+e1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwi5a6d5a6dXCIsc2NvcmU6MH0pXG5cdFx0XHQudGhlbihjaGlsZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoY2hpbGQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGQpKVxuXHRcdFx0fSlcblx0fVxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkcmVuPXN0YXRlLmVudGl0aWVzLmNoaWxkcmVuXG5cdFx0aWYoaWQpe1xuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW2lkXSkpXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcblx0XHRcdGNvbnN0IGlkcz1PYmplY3Qua2V5cyhjaGlsZHJlbilcblx0XHRcdGxldCBuZXh0PWlkc1soaWRzLmluZGV4T2YoY3VycmVudCkrMSklaWRzLmxlbmd0aF1cblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltuZXh0XSkpXG5cdFx0fVxuXHR9XG5cdCxDVVJSRU5UX0NISUxEX0NIQU5HRTogY2hpbGQ9Pih7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxufVxuXG5jb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgJ0NVUlJFTlRfQ0hJTERfQ0hBTkdFJzpcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7Y2hpbGQ6cGF5bG9hZC5faWR9KVxuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5jbGFzcyBTdXBlckRhZGR5IGV4dGVuZHMgQ29tcG9uZW50e1xuXHRyZW5kZXIoKXtcblx0XHRjb25zdCB7Y2hpbGRyZW4sIHJvdXRlcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0Y29udGV4dHVhbFN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCJcblx0XHRcdFx0cHJvamVjdD17cmVxdWlyZShcIi4uL3BhY2thZ2UuanNvblwiKX1cblx0XHRcdFx0dHV0b3JpYWw9e1tcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC90aW1lLnBuZ1wiLFxuXHRcdFx0XHRcdFx0dGl0bGU6XCLku7vliqHnrqHnkIZcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvc2NvcmUucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuato+mdoua/gOWKsVwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9rbm93bGVkZ2UucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuefpeivhuafpeivolwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRdfVxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0e2NoaWxkcmVufVxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLml7bpl7TnrqHnkIZcIiwgYWN0aW9uOlwidGFza3NcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcbi8qXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLml7bpl7TnrqHnkIZcIiwgYWN0aW9uOlwidGltZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL3RpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcblx0XHRcdFx0XHRcdFx0Ki9cblxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9zY29yZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicva25vd2xlZGdlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8Q2hlY2tVcGRhdGU+PEljb25BY2NvdW50Lz48L0NoZWNrVXBkYXRlPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbiovXG5cbmltcG9ydCBTY29yZVBhZFVJIGZyb20gXCIuL3RpbWUtbWFuYWdlL3Njb3JlLXBhZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvaW5mbydcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9jcmVhdGUnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlLydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlUGFkVUl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiPlxuXHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdFx0PC9Sb3V0ZT5cblx0XHQ8L1JvdXRlPlxuXG5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOmlkXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntpZH19KT0+e1xuXHRcdFx0XHRcdGxldCBjaGlsZD1nZXRDaGlsZChzdGF0ZSxpZClcblx0XHRcdFx0XHRsZXQgaW5mbz1jb21wYWN0KGNoaWxkLFwibmFtZVwiLFwicGhvdG9cIixcImJkXCIsXCJnZW5kZXJcIixcInRvZG9cIixcImdvYWxcIixcInNjb3JlXCIsXCJ0b3RhbFNjb3JlXCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+e1xuXHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdFx0XHRjb25zdCB7dG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKCksIGdvYWw9MCwgc2NvcmU9MH09Y2hpbGRcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHQuLi5zdGF0ZS51aS50aW1lLFxuXHRcdFx0XHRcdHRvZG9XZWVrLFxuXHRcdFx0XHRcdGdvYWwsXG5cdFx0XHRcdFx0c2NvcmVcblx0XHRcdFx0fVxuXHRcdFx0fSkoVGltZU1hbmFnZVVJKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cblx0XHRcdDxJbmRleFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7a25vd2xlZGdlczpnZXRLbm93bGVkZ2VzKHN0YXRlKX0pKShLbm93bGVkZ2VzVUkuQ3JlYXRhYmxlKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cImNyZWF0ZVwiXG5cdFx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfVxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeCxcImtub3dsZWRnZVwiKSkoTmV3S25vd2xlZGdlVUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOl9pZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT4oe1xuXHRcdFx0XHRcdGtub3dsZWRnZTpnZXRLbm93bGVkZ2Uoc3RhdGUpXG5cdFx0XHRcdFx0LHJldmlzaW5nOiEhc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuXHRcdFx0XHRcdCxpblRhc2s6ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpKS5maW5kKGE9PmEuX2lkPT1faWQpXG5cdFx0XHRcdFx0fSkpKEtub3dsZWRnZVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJ0ZXN0XCIgY29tcG9uZW50PXtUZXN0fS8+XG5cblx0ey8qXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFzay86X2lkXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17VGFza1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6d2hhdFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImludml0ZVwiIGNvbXBvbmVudD17SW52aXRlVUl9Lz5cbiovfVxuICAgIDwvUm91dGU+KVxuXHQsW1xuXHRcdHtbRE9NQUlOXTpSRURVQ0VSfVxuXHRcdCx7dWk6IGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdGtub3dsZWRnZTpLbm93bGVkZ2VzVUkuUkVEVUNFUlxuXHRcdFx0LHRpbWU6VGltZU1hbmFnZVVJLnJlZHVjZXJcblx0XHR9KX1cblx0XVxuKVxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19