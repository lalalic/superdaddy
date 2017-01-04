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
						return a.knowledge == _id;
					}) || !!(0, _selector.getCurrentChildTasks)(state, state.qiliApp.user._id).find(function (a) {
						return a.knowledge == _id;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cGdyYWRlIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJPYmplY3QiLCJrZXlzIiwiQ1VSUkVOVF9DSElMRF9DSEFOR0UiLCJ1cHNlcnQiLCJuYW1lIiwidGFyZ2V0cyIsImJhYnkiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJ0aGVuIiwiY2hpbGQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInN0YXRlIiwiaWQiLCJjdXJyZW50IiwiaWRzIiwiaW5kZXhPZiIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsImFzc2lnbiIsIl9pZCIsIlN1cGVyRGFkZHkiLCJwcm9wcyIsInJvdXRlcyIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0dWFsU3R5bGUiLCJmb250U2l6ZSIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIm1lZGlhIiwidGl0bGUiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiU2NvcmVQYWQiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJ0YXJnZXQiLCJpbmZvIiwiaXNDdXJyZW50IiwicWlsaUFwcCIsInVzZXIiLCJrbm93bGVkZ2VzIiwiQ3JlYXRhYmxlIiwidWkiLCJrbm93bGVkZ2UiLCJzZWxlY3RlZERv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VCxDQUFtQkMsWUFBM0IsRUFBd0MsV0FBeEMsQ0FBUDtBQUFBLElBQVIsbUJBRlosR0FKRDtBQVFDLHNEQUFPLE1BQUssTUFBWjtBQUNDLGNBQVcseUJBQVEsVUFBQ2pELEtBQUQ7QUFBQSxRQUFnQlMsR0FBaEIsU0FBUThCLE1BQVIsQ0FBZ0I5QixHQUFoQjtBQUFBLFdBQXlCO0FBQzNDdUMsZ0JBQVUsNEJBQWFoRCxLQUFiLENBRGlDO0FBRTFDa0QsZUFBUyxDQUFDLENBQUNsRCxNQUFNK0MsRUFBTixDQUFTQyxTQUFULENBQW1CQyxZQUZZO0FBRzFDRSxhQUFPLENBQUMsQ0FBRSxvQ0FBcUJuRCxLQUFyQixDQUFELENBQThCeEIsSUFBOUIsQ0FBbUM7QUFBQSxhQUFHeUMsRUFBRStCLFNBQUYsSUFBYXZDLEdBQWhCO0FBQUEsTUFBbkMsQ0FBRixJQUEyRCxDQUFDLENBQUUsb0NBQXFCVCxLQUFyQixFQUEyQkEsTUFBTTJDLE9BQU4sQ0FBY0MsSUFBZCxDQUFtQm5DLEdBQTlDLENBQUQsQ0FBcURqQyxJQUFyRCxDQUEwRDtBQUFBLGFBQUd5QyxFQUFFK0IsU0FBRixJQUFhdkMsR0FBaEI7QUFBQSxNQUExRDtBQUgxQixLQUF6QjtBQUFBLElBQVIsaUJBRFo7QUFSRCxFQS9CRztBQStDSCxxREFBTyxNQUFLLG9CQUFaLEVBQWlDLFdBQVd6QyxPQUE1QyxHQS9DRztBQWlESCxxREFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CO0FBakRHLENBRFUsRUE0RWIscUJBQ0VFLE1BREYsRUFDVXFDLE9BRFYsR0FFQyxFQUFDd0MsSUFBSSxzQ0FBd0I7QUFDN0JDLGFBQVUsb0JBQWF6QyxPQURNO0FBRTVCNkMsUUFBSyxxQkFBYUM7QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0E1RWEsQ0FBZjs7QUFxRkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXIsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXHJcblxyXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcclxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXHJcblxyXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcclxuXHJcbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcclxuXHJcbmNvbnN0IERPTUFJTj0nc3VwZXJkYWRkeSdcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e31cclxuXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRGRVRDSF9GQU1JTFk6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PkZhbWlseS5maW5kKHthdXRob3I6VXNlci5jdXJyZW50QXNBdXRob3J9KVxyXG5cdFx0LmZldGNoKGFsbD0+e1xyXG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRhbGw9RmFtaWx5LnVwZ3JhZGUoYWxsKVxyXG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxyXG5cdFx0XHRcdGlmKGVudGl0aWVzLmNoaWxkcmVuKXtcclxuXHRcdFx0XHRcdGxldCBuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cclxuXHRcdFx0XHRcdGlmKG5leHQpXHJcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShuZXh0KSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0LENSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEOiAoKT0+ZGlzcGF0Y2g9PntcclxuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwi5a6d5a6dXCIsdGFyZ2V0czp7YmFieTp7c2NvcmU6MCx0b3RhbFNjb3JlOjB9fX0pXHJcblx0XHRcdC50aGVuKGNoaWxkPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGNoaWxkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGQpKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxyXG5cdFx0aWYoaWQpe1xyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5baWRdKSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcclxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxyXG5cdFx0XHRsZXQgbmV4dD1pZHNbKGlkcy5pbmRleE9mKGN1cnJlbnQpKzEpJWlkcy5sZW5ndGhdXHJcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltuZXh0XSkpXHJcblx0XHR9XHJcblx0fVxyXG5cdCxDVVJSRU5UX0NISUxEX0NIQU5HRTogY2hpbGQ9Pih7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxyXG59XHJcblxyXG5jb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7Y2hpbGQ6cGF5bG9hZC5faWR9KVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XHJcblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXHJcblx0XHRcdGNvbnRleHR1YWxTdHlsZS5kaXNwbGF5PVwibm9uZVwiXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxyXG5cdFx0XHRcdHByb2plY3Q9e3JlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIil9XHJcblx0XHRcdFx0dHV0b3JpYWw9e1tcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvdGltZS5wbmdcIixcclxuXHRcdFx0XHRcdFx0dGl0bGU6XCLku7vliqHnrqHnkIZcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvc2NvcmUucG5nXCIsXHJcblx0XHRcdFx0XHRcdHRpdGxlOlwi5q2j6Z2i5r+A5YqxXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL2tub3dsZWRnZS5wbmdcIixcclxuXHRcdFx0XHRcdFx0dGl0bGU6XCLnn6Xor4bmn6Xor6JcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF19XHJcblx0XHRcdFx0aW5pdD17YT0+e1xyXG5cdFx0XHRcdFx0XHRpbml0KClcclxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxyXG5cdFx0XHRcdH19PlxyXG5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Lu75Yqh566h55CGXCIsIGFjdGlvbjpcInRhc2tzXCIsXHJcblx0XHRcdFx0XHRcdFx0bGluazpcIi9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcclxuXHRcdFx0XHRcdFx0XHRsaW5rOicvc2NvcmUnLFxyXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXHJcblx0XHRcdFx0XHRcdFx0bGluazonL2tub3dsZWRnZScsXHJcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxDaGVja1VwZGF0ZT48SWNvbkFjY291bnQvPjwvQ2hlY2tVcGRhdGU+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvUWlsaUFwcD5cclxuICAgICAgICApXHJcblx0fVxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG4vKlxyXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xyXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcclxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxyXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcclxuKi9cclxuXHJcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xyXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xyXG5cclxuaW1wb3J0IFRpbWVNYW5hZ2VVSSBmcm9tIFwiLi90aW1lLW1hbmFnZVwiXHJcblxyXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvaW5mbydcclxuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2NyZWF0ZSdcclxuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZS8nXHJcblxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3MsIGdldEtub3dsZWRnZXMsIGdldEtub3dsZWRnZX0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IFRlc3QgZnJvbSBcIi4vdGVzdFwiXHJcblxyXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcclxuXHJcbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxyXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInNjb3JlXCIgY29tcG9uZW50PXtUaW1lTWFuYWdlVUkuU2NvcmVQYWR9Lz5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntpZH19KT0+e1xyXG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxyXG5cdFx0XHRcdFx0bGV0IHRhcmdldD0oY2hpbGQudGFyZ2V0c3x8e30pW1wiYmFieVwiXVxyXG5cdFx0XHRcdFx0bGV0IGluZm89ey4uLmNvbXBhY3QoY2hpbGQsXCJuYW1lXCIsXCJwaG90b1wiLFwiYmRcIixcImdlbmRlclwiKSwuLi5jb21wYWN0KHRhcmdldCxcInRvZG9cIixcImdvYWxcIixcInNjb3JlXCIsXCJ0b3RhbFNjb3JlXCIpfVxyXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBpbmZvXHJcblx0XHRcdFx0fSkoQmFieVVJKX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwiX2lkXCIpKShUaW1lTWFuYWdlVUkpfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9XHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCJcclxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cclxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeCxcImtub3dsZWRnZVwiKSkoTmV3S25vd2xlZGdlVUkpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxyXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT4oe1xyXG5cdFx0XHRcdFx0a25vd2xlZGdlOmdldEtub3dsZWRnZShzdGF0ZSlcclxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcclxuXHRcdFx0XHRcdCxpblRhc2s6ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpKS5maW5kKGE9PmEua25vd2xlZGdlPT1faWQpfHwhIShnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxzdGF0ZS5xaWxpQXBwLnVzZXIuX2lkKSkuZmluZChhPT5hLmtub3dsZWRnZT09X2lkKVxyXG5cdFx0XHRcdFx0fSkpKEtub3dsZWRnZVVJKX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxyXG5cclxuXHR7LypcclxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cclxuXHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cclxuICAgICAgICA8L1JvdXRlPlxyXG5cclxuXHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxyXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxyXG4gICAgICAgIDwvUm91dGU+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxyXG4qL31cclxuICAgIDwvUm91dGU+KVxyXG5cdCxbXHJcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cclxuXHRcdCx7dWk6IGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXHJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXHJcblx0XHR9KX1cclxuXHRdXHJcbilcclxuXHJcbi8qKlxyXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcclxuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XHJcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxyXG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXHJcbipkb25lOiBiYWJ5IGZlYXR1cmVcclxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcclxuICAgICogZGVsZXRlIGxhc3QgYmFieVxyXG4gICAgKiBjcmVhdGUgYmFieVxyXG4gICAgKiBkZWxldGUgYmFieVxyXG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxyXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xyXG4qIGxvZ29cclxuICAgICogbG9hZGluZ1xyXG4qIGZsdXggcmVmYWN0b3JcclxuKiBmb3JtIHJlZmFjdG9yXHJcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxyXG4qIEZhbWlseSBsaXN0IFVJXHJcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xyXG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxyXG4qL1xyXG4iXX0=