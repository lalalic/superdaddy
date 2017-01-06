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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cGdyYWRlIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJPYmplY3QiLCJrZXlzIiwiQ1VSUkVOVF9DSElMRF9DSEFOR0UiLCJ1cHNlcnQiLCJuYW1lIiwidGFyZ2V0cyIsImJhYnkiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJ0aGVuIiwiY2hpbGQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInN0YXRlIiwiaWQiLCJjdXJyZW50IiwiaWRzIiwiaW5kZXhPZiIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsImFzc2lnbiIsIl9pZCIsIlN1cGVyRGFkZHkiLCJwcm9wcyIsInJvdXRlcyIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0dWFsU3R5bGUiLCJmb250U2l6ZSIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIm1lZGlhIiwidGl0bGUiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiU2NvcmVQYWQiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJ0YXJnZXQiLCJpbmZvIiwiaXNDdXJyZW50IiwicWlsaUFwcCIsInVzZXIiLCJrbm93bGVkZ2VzIiwiQ3JlYXRhYmxlIiwidWkiLCJrbm93bGVkZ2UiLCJzZWxlY3RlZERv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QUFTQyxTQUFULENBQW1CQyxZQUEzQixFQUF3QyxXQUF4QyxDQUFQO0FBQUEsSUFBUixtQkFGWixHQUpEO0FBUUMsc0RBQU8sTUFBSyxNQUFaO0FBQ0MsY0FBVyx5QkFBUSxVQUFDakQsS0FBRDtBQUFBLFFBQWdCUyxHQUFoQixTQUFROEIsTUFBUixDQUFnQjlCLEdBQWhCO0FBQUEsV0FBeUI7QUFDM0N1QyxnQkFBVSw0QkFBYWhELEtBQWIsQ0FEaUM7QUFFMUNrRCxlQUFTLENBQUMsQ0FBQ2xELE1BQU0rQyxFQUFOLENBQVNDLFNBQVQsQ0FBbUJDLFlBRlk7QUFHMUNFLGFBQU8sQ0FBQyxDQUFFLG9DQUFxQm5ELEtBQXJCLENBQUQsQ0FBOEJ4QixJQUE5QixDQUFtQztBQUFBLGFBQUd5QyxFQUFFK0IsU0FBRixJQUFhdkMsR0FBaEI7QUFBQSxNQUFuQyxDQUFGLElBQTJELENBQUMsQ0FBRSxvQ0FBcUJULEtBQXJCLEVBQTJCQSxNQUFNMkMsT0FBTixDQUFjQyxJQUFkLENBQW1CbkMsR0FBOUMsQ0FBRCxDQUFxRGpDLElBQXJELENBQTBEO0FBQUEsYUFBR3lDLEVBQUUrQixTQUFGLElBQWF2QyxHQUFoQjtBQUFBLE1BQTFEO0FBSDFCLEtBQXpCO0FBQUEsSUFBUixpQkFEWjtBQVJELEVBL0JHO0FBK0NILHFEQUFPLE1BQUssb0JBQVosRUFBaUMsNEJBQWpDLEdBL0NHO0FBaURILHFEQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFqREcsQ0FEVSxFQTRFYixxQkFDRXZDLE1BREYsRUFDVXFDLE9BRFYsR0FFQyxFQUFDd0MsSUFBSSxzQ0FBd0I7QUFDN0JDLGFBQVUsb0JBQWF6QyxPQURNO0FBRTVCNkMsUUFBSyxxQkFBYUM7QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0E1RWEsQ0FBZjs7QUFxRkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXIsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXHJcblxyXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcclxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXHJcblxyXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcclxuXHJcbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcclxuXHJcbmNvbnN0IERPTUFJTj0nc3VwZXJkYWRkeSdcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e31cclxuXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRGRVRDSF9GQU1JTFk6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PkZhbWlseS5maW5kKHthdXRob3I6VXNlci5jdXJyZW50QXNBdXRob3J9KVxyXG5cdFx0LmZldGNoKGFsbD0+e1xyXG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRhbGw9RmFtaWx5LnVwZ3JhZGUoYWxsKVxyXG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxyXG5cdFx0XHRcdGlmKGVudGl0aWVzLmNoaWxkcmVuKXtcclxuXHRcdFx0XHRcdGxldCBuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cclxuXHRcdFx0XHRcdGlmKG5leHQpXHJcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShuZXh0KSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0LENSRUFURV9ERUZBVUxUX0ZJUlNUX0NISUxEOiAoKT0+ZGlzcGF0Y2g9PntcclxuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwi5a6d5a6dXCIsdGFyZ2V0czp7YmFieTp7c2NvcmU6MCx0b3RhbFNjb3JlOjB9fX0pXHJcblx0XHRcdC50aGVuKGNoaWxkPT57XHJcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKGNoaWxkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSlcclxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGQpKVxyXG5cdFx0XHR9KVxyXG5cdH1cclxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXHJcblx0XHRjb25zdCBjaGlsZHJlbj1zdGF0ZS5lbnRpdGllcy5jaGlsZHJlblxyXG5cdFx0aWYoaWQpe1xyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5baWRdKSlcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcclxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxyXG5cdFx0XHRsZXQgbmV4dD1pZHNbKGlkcy5pbmRleE9mKGN1cnJlbnQpKzEpJWlkcy5sZW5ndGhdXHJcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZHJlbltuZXh0XSkpXHJcblx0XHR9XHJcblx0fVxyXG5cdCxDVVJSRU5UX0NISUxEX0NIQU5HRTogY2hpbGQ9Pih7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxyXG59XHJcblxyXG5jb25zdCBSRURVQ0VSPShzdGF0ZT1JTklUX1NUQVRFLHt0eXBlLHBheWxvYWR9KT0+e1xyXG5cdHN3aXRjaCh0eXBlKXtcclxuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XHJcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbih7fSxzdGF0ZSx7Y2hpbGQ6cGF5bG9hZC5faWR9KVxyXG5cdH1cclxuXHRyZXR1cm4gc3RhdGVcclxufVxyXG5cclxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdGNvbnN0IHtjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG5cdFx0Y29uc3Qge3JvdXRlcn09dGhpcy5jb250ZXh0XHJcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XHJcblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXHJcblx0XHRcdGNvbnRleHR1YWxTdHlsZS5kaXNwbGF5PVwibm9uZVwiXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxyXG5cdFx0XHRcdHByb2plY3Q9e3JlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIil9XHJcblx0XHRcdFx0dHV0b3JpYWw9e1tcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvdGltZS5wbmdcIixcclxuXHRcdFx0XHRcdFx0dGl0bGU6XCLku7vliqHnrqHnkIZcIlxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0bWVkaWE6XCJpbWFnZXMvdHV0b3JpYWwvc2NvcmUucG5nXCIsXHJcblx0XHRcdFx0XHRcdHRpdGxlOlwi5q2j6Z2i5r+A5YqxXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL2tub3dsZWRnZS5wbmdcIixcclxuXHRcdFx0XHRcdFx0dGl0bGU6XCLnn6Xor4bmn6Xor6JcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdF19XHJcblx0XHRcdFx0aW5pdD17YT0+e1xyXG5cdFx0XHRcdFx0XHRpbml0KClcclxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxyXG5cdFx0XHRcdH19PlxyXG5cclxuXHRcdFx0XHR7Y2hpbGRyZW59XHJcblxyXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxyXG5cdFx0XHRcdFx0aXRlbXM9e1tcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Lu75Yqh566h55CGXCIsIGFjdGlvbjpcInRhc2tzXCIsXHJcblx0XHRcdFx0XHRcdFx0bGluazpcIi9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcclxuXHRcdFx0XHRcdFx0XHRsaW5rOicvc2NvcmUnLFxyXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXHJcblx0XHRcdFx0XHRcdFx0bGluazonL2tub3dsZWRnZScsXHJcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxDaGVja1VwZGF0ZT48SWNvbkFjY291bnQvPjwvQ2hlY2tVcGRhdGU+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvUWlsaUFwcD5cclxuICAgICAgICApXHJcblx0fVxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcblxyXG4vKlxyXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcclxuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXHJcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xyXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcclxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxyXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcclxuKi9cclxuXHJcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xyXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xyXG5cclxuaW1wb3J0IFRpbWVNYW5hZ2VVSSBmcm9tIFwiLi90aW1lLW1hbmFnZVwiXHJcblxyXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UvaW5mbydcclxuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2NyZWF0ZSdcclxuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZS8nXHJcbmltcG9ydCBLbm93bGVkZ2VDb21tZW50IGZyb20gXCIuL2tub3dsZWRnZS9jb21tZW50XCIgXHJcblxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3MsIGdldEtub3dsZWRnZXMsIGdldEtub3dsZWRnZX0gZnJvbSBcIi4vc2VsZWN0b3JcIlxyXG5cclxuaW1wb3J0IFRlc3QgZnJvbSBcIi4vdGVzdFwiXHJcblxyXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcclxuXHJcbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxyXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cInNjb3JlXCIgY29tcG9uZW50PXtUaW1lTWFuYWdlVUkuU2NvcmVQYWR9Lz5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxyXG5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCI+XHJcblx0XHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cclxuXHRcdFx0PC9Sb3V0ZT5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntpZH19KT0+e1xyXG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxyXG5cdFx0XHRcdFx0bGV0IHRhcmdldD0oY2hpbGQudGFyZ2V0c3x8e30pW1wiYmFieVwiXVxyXG5cdFx0XHRcdFx0bGV0IGluZm89ey4uLmNvbXBhY3QoY2hpbGQsXCJuYW1lXCIsXCJwaG90b1wiLFwiYmRcIixcImdlbmRlclwiKSwuLi5jb21wYWN0KHRhcmdldCxcInRvZG9cIixcImdvYWxcIixcInNjb3JlXCIsXCJ0b3RhbFNjb3JlXCIpfVxyXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcclxuXHRcdFx0XHRcdHJldHVybiBpbmZvXHJcblx0XHRcdFx0fSkoQmFieVVJKX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUucWlsaUFwcC51c2VyLFwiX2lkXCIpKShUaW1lTWFuYWdlVUkpfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cclxuXHRcdFx0PEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9XHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCJcclxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cclxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3Qoc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeCxcImtub3dsZWRnZVwiKSkoTmV3S25vd2xlZGdlVUkpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxyXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT4oe1xyXG5cdFx0XHRcdFx0a25vd2xlZGdlOmdldEtub3dsZWRnZShzdGF0ZSlcclxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcclxuXHRcdFx0XHRcdCxpblRhc2s6ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpKS5maW5kKGE9PmEua25vd2xlZGdlPT1faWQpfHwhIShnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxzdGF0ZS5xaWxpQXBwLnVzZXIuX2lkKSkuZmluZChhPT5hLmtub3dsZWRnZT09X2lkKVxyXG5cdFx0XHRcdFx0fSkpKEtub3dsZWRnZVVJKX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlQ29tbWVudH0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxyXG5cclxuXHR7LypcclxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cclxuXHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cclxuICAgICAgICA8L1JvdXRlPlxyXG5cclxuXHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxyXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxyXG4gICAgICAgIDwvUm91dGU+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxyXG4qL31cclxuICAgIDwvUm91dGU+KVxyXG5cdCxbXHJcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cclxuXHRcdCx7dWk6IGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXHJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXHJcblx0XHR9KX1cclxuXHRdXHJcbilcclxuXHJcbi8qKlxyXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcclxuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XHJcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxyXG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXHJcbipkb25lOiBiYWJ5IGZlYXR1cmVcclxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcclxuICAgICogZGVsZXRlIGxhc3QgYmFieVxyXG4gICAgKiBjcmVhdGUgYmFieVxyXG4gICAgKiBkZWxldGUgYmFieVxyXG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxyXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xyXG4qIGxvZ29cclxuICAgICogbG9hZGluZ1xyXG4qIGZsdXggcmVmYWN0b3JcclxuKiBmb3JtIHJlZmFjdG9yXHJcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxyXG4qIEZhbWlseSBsaXN0IFVJXHJcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xyXG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxyXG4qL1xyXG4iXX0=