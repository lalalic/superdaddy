"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

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
	_react2.default.createElement(_reactRouter.IndexRoute, { component: _timeManage2.default }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJlbnRpdGllcyIsInNjaGVtYSIsImNoaWxkcmVuIiwibmV4dCIsIk9iamVjdCIsImtleXMiLCJDVVJSRU5UX0NISUxEX0NIQU5HRSIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwic3RhdGUiLCJpZCIsImN1cnJlbnQiLCJpZHMiLCJpbmRleE9mIiwidHlwZSIsInBheWxvYWQiLCJSRURVQ0VSIiwiYXNzaWduIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwibWVkaWEiLCJ0aXRsZSIsInpJbmRleCIsImxhYmVsIiwiYWN0aW9uIiwibGluayIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJTZXR0aW5nVUkiLCJTZXR0aW5nIiwiUHJvZmlsZVVJIiwiUHJvZmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJpbmZvIiwiaXNDdXJyZW50Iiwia25vd2xlZGdlcyIsIkNyZWF0YWJsZSIsInVpIiwia25vd2xlZGdlIiwic2VsZWN0ZWREb2N4IiwicmV2aXNpbmciLCJpblRhc2siLCJ0aW1lIiwicmVkdWNlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7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SUFBT0EsR0FBVjtBQUFBLE1BQW5DO0FBSGlDLEtBQXpCO0FBQUEsSUFBUixpQkFEWjtBQVJELEVBOUJHO0FBOENILHFEQUFPLE1BQUssb0JBQVosRUFBaUMsV0FBV3JDLE9BQTVDLEdBOUNHO0FBZ0RILHFEQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFoREcsQ0FEVSxFQTJFYixxQkFDRUUsTUFERixFQUNVaUMsT0FEVixHQUVDLEVBQUNvQyxJQUFJLHNDQUF3QjtBQUM3QkMsYUFBVSxvQkFBYXJDLE9BRE07QUFFNUJ5QyxRQUFLLHFCQUFhQztBQUZVLEVBQXhCLENBQUwsRUFGRCxDQTNFYSxDQUFmOztBQW9GQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyLCBQYXBlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuaW1wb3J0IENoZWNrVXBkYXRlIGZyb20gXCJxaWxpLWFwcC9saWIvY29tcG9uZW50cy9jaGVjay11cGRhdGVcIlxuXG5jb25zdCB7RW1wdHksIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cbmNvbnN0IERPTUFJTj0nc3VwZXJkYWRkeSdcblxuY29uc3QgSU5JVF9TVEFURT17fVxuXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9GQU1JTFk6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PkZhbWlseS5maW5kKHthdXRob3I6VXNlci5jdXJyZW50QXNBdXRob3J9KVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbC5sZW5ndGg9PTApXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pe1xuXHRcdFx0XHRcdGxldCBuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblx0XHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKG5leHQpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSlcblx0LENSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEOiAoKT0+ZGlzcGF0Y2g9Pntcblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydCh7bmFtZTpcIuWuneWunVwiLHNjb3JlOjB9KVxuXHRcdFx0LnRoZW4oY2hpbGQ9Pntcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGNoaWxkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkKSlcblx0XHRcdH0pXG5cdH1cblx0LFNXSVRDSF9DVVJSRU5UX0NISUxEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxuXHRcdGlmKGlkKXtcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltpZF0pKVxuXHRcdH1lbHNle1xuXHRcdFx0Y29uc3QgY3VycmVudD1zdGF0ZVtET01BSU5dLmNoaWxkXG5cdFx0XHRjb25zdCBpZHM9T2JqZWN0LmtleXMoY2hpbGRyZW4pXG5cdFx0XHRsZXQgbmV4dD1pZHNbKGlkcy5pbmRleE9mKGN1cnJlbnQpKzEpJWlkcy5sZW5ndGhdXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5bbmV4dF0pKVxuXHRcdH1cblx0fVxuXHQsQ1VSUkVOVF9DSElMRF9DSEFOR0U6IGNoaWxkPT4oe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkfSlcbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkcmVuLCByb3V0ZXMsIGRpc3BhdGNofT10aGlzLnByb3BzXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XG5cdFx0bGV0IGNvbnRleHR1YWxTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxuXHRcdGlmKHJvdXRlcy5maW5kKGE9PmEuY29udGV4dHVhbD09PWZhbHNlKSlcblx0XHRcdGNvbnRleHR1YWxTdHlsZS5kaXNwbGF5PVwibm9uZVwiXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UWlsaUFwcCBhcHBJZD1cIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiXG5cdFx0XHRcdHByb2plY3Q9e3JlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIil9XG5cdFx0XHRcdHR1dG9yaWFsPXtbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvdGltZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi5Lu75Yqh566h55CGXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3Njb3JlLnBuZ1wiLFxuXHRcdFx0XHRcdFx0dGl0bGU6XCLmraPpnaLmv4DlirFcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwva25vd2xlZGdlLnBuZ1wiLFxuXHRcdFx0XHRcdFx0dGl0bGU6XCLnn6Xor4bmn6Xor6JcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XX1cblx0XHRcdFx0aW5pdD17YT0+e1xuXHRcdFx0XHRcdFx0aW5pdCgpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0hfRkFNSUxZKCkpXG5cdFx0XHRcdH19PlxuXG5cdFx0XHRcdHtjaGlsZHJlbn1cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDoxfX1cblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5pe26Ze0566h55CGXCIsIGFjdGlvbjpcInRhc2tzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6XCIvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG4vKlxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5pe26Ze0566h55CGXCIsIGFjdGlvbjpcInRpbWVcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi90aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG5cdFx0XHRcdFx0XHRcdCovXG5cblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkOe7qVwiLCBhY3Rpb246XCJzY29yZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicvc2NvcmUnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcblx0XHRcdFx0XHRcdFx0bGluazonL2tub3dsZWRnZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25Lbm93bGVkZ2VzLz59LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOicvbXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PENoZWNrVXBkYXRlPjxJY29uQWNjb3VudC8+PC9DaGVja1VwZGF0ZT59XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuLypcbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxuaW1wb3J0IEludml0ZVVJIGZyb20gXCIuL2ludml0ZVwiXG4qL1xuXG5pbXBvcnQgU2NvcmVQYWRVSSBmcm9tIFwiLi90aW1lLW1hbmFnZS9iYWJ5L3Njb3JlLXBhZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvaW5mbydcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9jcmVhdGUnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlLydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlUGFkVUl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiPlxuXHRcdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdFx0PC9Sb3V0ZT5cblx0XHQ8L1JvdXRlPlxuXG5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOmlkXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntpZH19KT0+e1xuXHRcdFx0XHRcdGxldCBjaGlsZD1nZXRDaGlsZChzdGF0ZSxpZClcblx0XHRcdFx0XHRsZXQgaW5mbz1jb21wYWN0KGNoaWxkLFwibmFtZVwiLFwicGhvdG9cIixcImJkXCIsXCJnZW5kZXJcIixcInRvZG9cIixcImdvYWxcIixcInNjb3JlXCIsXCJ0b3RhbFNjb3JlXCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17VGltZU1hbmFnZVVJfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtrbm93bGVkZ2VzOmdldEtub3dsZWRnZXMoc3RhdGUpfSkpKEtub3dsZWRnZXNVSS5DcmVhdGFibGUpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCJcblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4LFwia25vd2xlZGdlXCIpKShOZXdLbm93bGVkZ2VVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntfaWR9fSk9Pih7XG5cdFx0XHRcdFx0a25vd2xlZGdlOmdldEtub3dsZWRnZShzdGF0ZSlcblx0XHRcdFx0XHQscmV2aXNpbmc6ISFzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG5cdFx0XHRcdFx0LGluVGFzazohIShnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkpLmZpbmQoYT0+YS5faWQ9PV9pZClcblx0XHRcdFx0XHR9KSkoS25vd2xlZGdlVUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cInRlc3RcIiBjb21wb25lbnQ9e1Rlc3R9Lz5cblxuXHR7LypcbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxuKi99XG4gICAgPC9Sb3V0ZT4pXG5cdCxbXG5cdFx0e1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHt1aTogZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXG5cdFx0XHQsdGltZTpUaW1lTWFuYWdlVUkucmVkdWNlclxuXHRcdH0pfVxuXHRdXG4pXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=