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
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender", "todo", "goal", "score", "totalScore");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJlbnRpdGllcyIsInNjaGVtYSIsImNoaWxkcmVuIiwibmV4dCIsIk9iamVjdCIsImtleXMiLCJDVVJSRU5UX0NISUxEX0NIQU5HRSIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwic3RhdGUiLCJpZCIsImN1cnJlbnQiLCJpZHMiLCJpbmRleE9mIiwidHlwZSIsInBheWxvYWQiLCJSRURVQ0VSIiwiYXNzaWduIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwibWVkaWEiLCJ0aXRsZSIsInpJbmRleCIsImxhYmVsIiwiYWN0aW9uIiwibGluayIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJTZXR0aW5nVUkiLCJTZXR0aW5nIiwiUHJvZmlsZVVJIiwiUHJvZmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJTY29yZVBhZCIsImJhYmllcyIsInZhbHVlcyIsInBhcmFtcyIsImluZm8iLCJpc0N1cnJlbnQiLCJxaWxpQXBwIiwidXNlciIsImtub3dsZWRnZXMiLCJDcmVhdGFibGUiLCJ1aSIsImtub3dsZWRnZSIsInNlbGVjdGVkRG9jeCIsInJldmlzaW5nIiwiaW5UYXNrIiwidGltZSIsInJlZHVjZXIiXSwibWFwcGlu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QVQsQ0FBbUJDLFlBRlk7QUFHMUNFLGFBQU8sQ0FBQyxDQUFFLG9DQUFxQmxELEtBQXJCLENBQUQsQ0FBOEJwQixJQUE5QixDQUFtQztBQUFBLGFBQUdxQyxFQUFFUixHQUFGLElBQU9BLEdBQVY7QUFBQSxNQUFuQztBQUhpQyxLQUF6QjtBQUFBLElBQVIsaUJBRFo7QUFSRCxFQTlCRztBQThDSCxxREFBTyxNQUFLLG9CQUFaLEVBQWlDLFdBQVdyQyxPQUE1QyxHQTlDRztBQWdESCxxREFBTyxNQUFLLE1BQVosRUFBbUIseUJBQW5CO0FBaERHLENBRFUsRUEyRWIscUJBQ0VFLE1BREYsRUFDVWlDLE9BRFYsR0FFQyxFQUFDdUMsSUFBSSxzQ0FBd0I7QUFDN0JDLGFBQVUsb0JBQWF4QyxPQURNO0FBRTVCNEMsUUFBSyxxQkFBYUM7QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0EzRWEsQ0FBZjs7QUFvRkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcclxuXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXHJcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXIsIFBhcGVyfSBmcm9tICdtYXRlcmlhbC11aSdcclxuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXHJcblxyXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxyXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcclxuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcclxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXHJcblxyXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcclxuXHJcbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcclxuXHJcbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcclxuXHJcbmNvbnN0IERPTUFJTj0nc3VwZXJkYWRkeSdcclxuXHJcbmNvbnN0IElOSVRfU1RBVEU9e31cclxuXHJcblxyXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcclxuXHRGRVRDSF9GQU1JTFk6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PkZhbWlseS5maW5kKHthdXRob3I6VXNlci5jdXJyZW50QXNBdXRob3J9KVxyXG5cdFx0LmZldGNoKGFsbD0+e1xyXG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRsZXQgZW50aXRpZXM9bm9ybWFsaXplKGFsbCxhcnJheU9mKEZhbWlseS5zY2hlbWEpKS5lbnRpdGllc1xyXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcclxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbil7XHJcblx0XHRcdFx0XHRsZXQgbmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXHJcblx0XHRcdFx0XHRpZihuZXh0KVxyXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UobmV4dCkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XHJcblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydCh7bmFtZTpcIuWuneWunVwiLHNjb3JlOjB9KVxyXG5cdFx0XHQudGhlbihjaGlsZD0+e1xyXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXHJcblx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkKSlcclxuXHRcdFx0fSlcclxuXHR9XHJcblx0LFNXSVRDSF9DVVJSRU5UX0NISUxEOiBpZD0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxyXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cclxuXHRcdGlmKGlkKXtcclxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW2lkXSkpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0Y29uc3QgY3VycmVudD1zdGF0ZVtET01BSU5dLmNoaWxkXHJcblx0XHRcdGNvbnN0IGlkcz1PYmplY3Qua2V5cyhjaGlsZHJlbilcclxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxyXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5bbmV4dF0pKVxyXG5cdFx0fVxyXG5cdH1cclxuXHQsQ1VSUkVOVF9DSElMRF9DSEFOR0U6IGNoaWxkPT4oe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkfSlcclxufVxyXG5cclxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9PntcclxuXHRzd2l0Y2godHlwZSl7XHJcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcclxuXHR9XHJcblx0cmV0dXJuIHN0YXRlXHJcbn1cclxuXHJcbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRjb25zdCB7Y2hpbGRyZW4sIHJvdXRlcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcclxuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxyXG5cdFx0bGV0IGNvbnRleHR1YWxTdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifVxyXG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxyXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCJcclxuXHRcdFx0XHRwcm9qZWN0PXtyZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpfVxyXG5cdFx0XHRcdHR1dG9yaWFsPXtbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3RpbWUucG5nXCIsXHJcblx0XHRcdFx0XHRcdHRpdGxlOlwi5Lu75Yqh566h55CGXCJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3Njb3JlLnBuZ1wiLFxyXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuato+mdoua/gOWKsVwiXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9rbm93bGVkZ2UucG5nXCIsXHJcblx0XHRcdFx0XHRcdHRpdGxlOlwi55+l6K+G5p+l6K+iXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRdfVxyXG5cdFx0XHRcdGluaXQ9e2E9PntcclxuXHRcdFx0XHRcdFx0aW5pdCgpXHJcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcclxuXHRcdFx0XHR9fT5cclxuXHJcblx0XHRcdFx0e2NoaWxkcmVufVxyXG5cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDoxfX1cclxuXHRcdFx0XHRcdGl0ZW1zPXtbXHJcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoeeuoeeQhlwiLCBhY3Rpb246XCJ0YXNrc1wiLFxyXG5cdFx0XHRcdFx0XHRcdGxpbms6XCIvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcclxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXHJcblx0XHRcdFx0XHRcdFx0bGluazonL3Njb3JlJyxcclxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxyXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxyXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9rbm93bGVkZ2UnLFxyXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25Lbm93bGVkZ2VzLz59LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOicvbXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8Q2hlY2tVcGRhdGU+PEljb25BY2NvdW50Lz48L0NoZWNrVXBkYXRlPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L1FpbGlBcHA+XHJcbiAgICAgICAgKVxyXG5cdH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG5cclxuLypcclxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXHJcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xyXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcclxuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXHJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcclxuaW1wb3J0IEludml0ZVVJIGZyb20gXCIuL2ludml0ZVwiXHJcbiovXHJcblxyXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcclxuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcclxuXHJcbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxyXG5cclxuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2luZm8nXHJcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9jcmVhdGUnXHJcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2UvJ1xyXG5cclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzLCBnZXRLbm93bGVkZ2VzLCBnZXRLbm93bGVkZ2V9IGZyb20gXCIuL3NlbGVjdG9yXCJcclxuXHJcbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxyXG5cclxuY29uc3Qge1NldHRpbmc6U2V0dGluZ1VJLCBQcm9maWxlOiBQcm9maWxlVUl9PVVJXHJcblxyXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcclxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3QoKShTdXBlckRhZGR5KX0+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJzY29yZVwiIGNvbXBvbmVudD17VGltZU1hbmFnZVVJLlNjb3JlUGFkfS8+XHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cclxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cclxuXHJcblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiPlxyXG5cdFx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XHJcblx0XHRcdDwvUm91dGU+XHJcblx0XHQ8L1JvdXRlPlxyXG5cclxuXHJcblxyXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5XCIgY29udGV4dHVhbD17ZmFsc2V9PlxyXG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxyXG5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6aWRcIlxyXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9PntcclxuXHRcdFx0XHRcdGxldCBjaGlsZD1nZXRDaGlsZChzdGF0ZSxpZClcclxuXHRcdFx0XHRcdGxldCBpbmZvPWNvbXBhY3QoY2hpbGQsXCJuYW1lXCIsXCJwaG90b1wiLFwiYmRcIixcImdlbmRlclwiLFwidG9kb1wiLFwiZ29hbFwiLFwic2NvcmVcIixcInRvdGFsU2NvcmVcIilcclxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xyXG5cdFx0XHRcdH0pKEJhYnlVSSl9Lz5cclxuXHRcdDwvUm91dGU+XHJcblxyXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnFpbGlBcHAudXNlcixcIl9pZFwiKSkoVGltZU1hbmFnZVVJKX0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XHJcblx0XHRcdDxJbmRleFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfVxyXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtrbm93bGVkZ2VzOmdldEtub3dsZWRnZXMoc3RhdGUpfSkpKEtub3dsZWRnZXNVSS5DcmVhdGFibGUpfS8+XHJcblxyXG5cdFx0XHQ8Um91dGUgcGF0aD1cImNyZWF0ZVwiXHJcblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9XHJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxyXG5cclxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCJcclxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcclxuXHRcdFx0XHRcdGtub3dsZWRnZTpnZXRLbm93bGVkZ2Uoc3RhdGUpXHJcblx0XHRcdFx0XHQscmV2aXNpbmc6ISFzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XHJcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLl9pZD09X2lkKVxyXG5cdFx0XHRcdFx0fSkpKEtub3dsZWRnZVVJKX0vPlxyXG5cdFx0PC9Sb3V0ZT5cclxuXHJcblx0XHQ8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxyXG5cclxuXHRcdDxSb3V0ZSBwYXRoPVwidGVzdFwiIGNvbXBvbmVudD17VGVzdH0vPlxyXG5cclxuXHR7LypcclxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cclxuXHJcbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxyXG5cclxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XHJcbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cclxuICAgICAgICA8L1JvdXRlPlxyXG5cclxuXHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cclxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxyXG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxyXG4gICAgICAgIDwvUm91dGU+XHJcblxyXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxyXG4qL31cclxuICAgIDwvUm91dGU+KVxyXG5cdCxbXHJcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cclxuXHRcdCx7dWk6IGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcclxuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXHJcblx0XHRcdCx0aW1lOlRpbWVNYW5hZ2VVSS5yZWR1Y2VyXHJcblx0XHR9KX1cclxuXHRdXHJcbilcclxuXHJcbi8qKlxyXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcclxuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XHJcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxyXG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXHJcbipkb25lOiBiYWJ5IGZlYXR1cmVcclxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcclxuICAgICogZGVsZXRlIGxhc3QgYmFieVxyXG4gICAgKiBjcmVhdGUgYmFieVxyXG4gICAgKiBkZWxldGUgYmFieVxyXG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxyXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xyXG4qIGxvZ29cclxuICAgICogbG9hZGluZ1xyXG4qIGZsdXggcmVmYWN0b3JcclxuKiBmb3JtIHJlZmFjdG9yXHJcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxyXG4qIEZhbWlseSBsaXN0IFVJXHJcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xyXG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxyXG4qL1xyXG4iXX0=