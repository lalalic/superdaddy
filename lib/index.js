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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJkaXNwYXRjaCIsImdldFN0YXRlIiwiZmluZCIsImF1dGhvciIsImN1cnJlbnRBc0F1dGhvciIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cGdyYWRlIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJjaGlsZHJlbiIsIm5leHQiLCJPYmplY3QiLCJrZXlzIiwiQ1VSUkVOVF9DSElMRF9DSEFOR0UiLCJ1cHNlcnQiLCJuYW1lIiwidGFyZ2V0cyIsImJhYnkiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJ0aGVuIiwiY2hpbGQiLCJTV0lUQ0hfQ1VSUkVOVF9DSElMRCIsInN0YXRlIiwiaWQiLCJjdXJyZW50IiwiaWRzIiwiaW5kZXhPZiIsInR5cGUiLCJwYXlsb2FkIiwiUkVEVUNFUiIsImFzc2lnbiIsIl9pZCIsIlN1cGVyRGFkZHkiLCJwcm9wcyIsInJvdXRlcyIsInJvdXRlciIsImNvbnRleHQiLCJjb250ZXh0dWFsU3R5bGUiLCJmb250U2l6ZSIsImEiLCJjb250ZXh0dWFsIiwiZGlzcGxheSIsIm1lZGlhIiwidGl0bGUiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsImxpbmsiLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiU2NvcmVQYWQiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJwYXJhbXMiLCJ0YXJnZXQiLCJpbmZvIiwiaXNDdXJyZW50IiwicWlsaUFwcCIsInVzZXIiLCJrbm93bGVkZ2VzIiwiQ3JlYXRhYmxlIiwidWkiLCJrbm93bGVkZ2UiLCJzZWxlY3RlZERv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QUFTQyxTQUFULENBQW1CQyxZQUEzQixFQUF3QyxXQUF4QyxDQUFQO0FBQUEsSUFBUixtQkFGWixHQUpEO0FBUUMsc0RBQU8sTUFBSyxNQUFaO0FBQ0MsY0FBVyx5QkFBUSxVQUFDakQsS0FBRDtBQUFBLFFBQWdCUyxHQUFoQixTQUFROEIsTUFBUixDQUFnQjlCLEdBQWhCO0FBQUEsV0FBeUI7QUFDM0N1QyxnQkFBVSw0QkFBYWhELEtBQWIsQ0FEaUM7QUFFMUNrRCxlQUFTLENBQUMsQ0FBQ2xELE1BQU0rQyxFQUFOLENBQVNDLFNBQVQsQ0FBbUJDLFlBRlk7QUFHMUNFLGFBQU8sQ0FBQyxDQUFFLG9DQUFxQm5ELEtBQXJCLENBQUQsQ0FBOEJ4QixJQUE5QixDQUFtQztBQUFBLGFBQUd5QyxFQUFFK0IsU0FBRixJQUFhdkMsR0FBaEI7QUFBQSxNQUFuQyxDQUFGLElBQTJELENBQUMsQ0FBRSxvQ0FBcUJULEtBQXJCLEVBQTJCQSxNQUFNMkMsT0FBTixDQUFjQyxJQUFkLENBQW1CbkMsR0FBOUMsQ0FBRCxDQUFxRGpDLElBQXJELENBQTBEO0FBQUEsYUFBR3lDLEVBQUUrQixTQUFGLElBQWF2QyxHQUFoQjtBQUFBLE1BQTFEO0FBSDFCLEtBQXpCO0FBQUEsSUFBUixpQkFEWjtBQVJELEVBL0JHO0FBK0NILHFEQUFPLE1BQUssb0JBQVosRUFBaUMsNEJBQWpDLEdBL0NHO0FBaURILHFEQUFPLE1BQUssTUFBWixFQUFtQix5QkFBbkI7QUFqREcsQ0FEVSxFQTRFYixxQkFDRXZDLE1BREYsRUFDVXFDLE9BRFYsR0FFQyxFQUFDd0MsSUFBSSxzQ0FBd0I7QUFDN0JDLGFBQVUsb0JBQWF6QyxPQURNO0FBRTVCNkMsUUFBSyxxQkFBYUM7QUFGVSxFQUF4QixDQUFMLEVBRkQsQ0E1RWEsQ0FBZjs7QUFxRkEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhciwgUGFwZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmltcG9ydCBDaGVja1VwZGF0ZSBmcm9tIFwicWlsaS1hcHAvbGliL2NvbXBvbmVudHMvY2hlY2stdXBkYXRlXCJcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cblxuXG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT5GYW1pbHkuZmluZCh7YXV0aG9yOlVzZXIuY3VycmVudEFzQXV0aG9yfSlcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwubGVuZ3RoPT0wKVxuXHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQoKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRhbGw9RmFtaWx5LnVwZ3JhZGUoYWxsKVxuXHRcdFx0XHRsZXQgZW50aXRpZXM9bm9ybWFsaXplKGFsbCxhcnJheU9mKEZhbWlseS5zY2hlbWEpKS5lbnRpdGllc1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhlbnRpdGllcykpXG5cdFx0XHRcdGlmKGVudGl0aWVzLmNoaWxkcmVuKXtcblx0XHRcdFx0XHRsZXQgbmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cdFx0XHRcdFx0aWYobmV4dClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShuZXh0KSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCLlrp3lrp1cIix0YXJnZXRzOntiYWJ5OntzY29yZTowLHRvdGFsU2NvcmU6MH19fSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DVVJSRU5UX0NISUxEX0NIQU5HRShjaGlsZCkpXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1VSUkVOVF9DSElMRF9DSEFOR0UoY2hpbGRyZW5baWRdKSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkNVUlJFTlRfQ0hJTERfQ0hBTkdFKGNoaWxkcmVuW25leHRdKSlcblx0XHR9XG5cdH1cblx0LENVUlJFTlRfQ0hJTERfQ0hBTkdFOiBjaGlsZD0+KHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtjaGlsZDpwYXlsb2FkLl9pZH0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRwcm9qZWN0PXtyZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpfVxuXHRcdFx0XHR0dXRvcmlhbD17W1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL3RpbWUucG5nXCIsXG5cdFx0XHRcdFx0XHR0aXRsZTpcIuS7u+WKoeeuoeeQhlwiXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRtZWRpYTpcImltYWdlcy90dXRvcmlhbC9zY29yZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi5q2j6Z2i5r+A5YqxXCJcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG1lZGlhOlwiaW1hZ2VzL3R1dG9yaWFsL2tub3dsZWRnZS5wbmdcIixcblx0XHRcdFx0XHRcdHRpdGxlOlwi55+l6K+G5p+l6K+iXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdF19XG5cdFx0XHRcdGluaXQ9e2E9Pntcblx0XHRcdFx0XHRcdGluaXQoKVxuXHRcdFx0XHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkZFVENIX0ZBTUlMWSgpKVxuXHRcdFx0XHR9fT5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoeeuoeeQhlwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9zY29yZScsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicva25vd2xlZGdlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8Q2hlY2tVcGRhdGU+PEljb25BY2NvdW50Lz48L0NoZWNrVXBkYXRlPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbiovXG5cbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcblxuaW1wb3J0IFRpbWVNYW5hZ2VVSSBmcm9tIFwiLi90aW1lLW1hbmFnZVwiXG5cbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZS9pbmZvJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlL2NyZWF0ZSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2UvJ1xuaW1wb3J0IEtub3dsZWRnZUNvbW1lbnQgZnJvbSBcIi4va25vd2xlZGdlL2NvbW1lbnRcIiBcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmltcG9ydCBUZXN0IGZyb20gXCIuL3Rlc3RcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdCgpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBjb21wb25lbnQ9e1RpbWVNYW5hZ2VVSS5TY29yZVBhZH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtiYWJpZXM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbil9KSkoQWNjb3VudFVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCI+XG5cdFx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XG5cdFx0XHQ8L1JvdXRlPlxuXHRcdDwvUm91dGU+XG5cblxuXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6aWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxuXHRcdFx0XHRcdGxldCB0YXJnZXQ9KGNoaWxkLnRhcmdldHN8fHt9KVtcImJhYnlcIl1cblx0XHRcdFx0XHRsZXQgaW5mbz17Li4uY29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIpLC4uLmNvbXBhY3QodGFyZ2V0LFwidG9kb1wiLFwiZ29hbFwiLFwic2NvcmVcIixcInRvdGFsU2NvcmVcIil9XG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS5xaWxpQXBwLnVzZXIsXCJfaWRcIikpKFRpbWVNYW5hZ2VVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KHN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3gsXCJrbm93bGVkZ2VcIikpKE5ld0tub3dsZWRnZVVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e19pZH19KT0+KHtcblx0XHRcdFx0XHRrbm93bGVkZ2U6Z2V0S25vd2xlZGdlKHN0YXRlKVxuXHRcdFx0XHRcdCxyZXZpc2luZzohIXN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3hcblx0XHRcdFx0XHQsaW5UYXNrOiEhKGdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKSkuZmluZChhPT5hLmtub3dsZWRnZT09X2lkKXx8ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUsc3RhdGUucWlsaUFwcC51c2VyLl9pZCkpLmZpbmQoYT0+YS5rbm93bGVkZ2U9PV9pZClcblx0XHRcdFx0XHR9KSkoS25vd2xlZGdlVUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtLbm93bGVkZ2VDb21tZW50fS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cInRlc3RcIiBjb21wb25lbnQ9e1Rlc3R9Lz5cblxuXHR7LypcbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxuKi99XG4gICAgPC9Sb3V0ZT4pXG5cdCxbXG5cdFx0e1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHt1aTogZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe1xuXHRcdFx0a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSXG5cdFx0XHQsdGltZTpUaW1lTWFuYWdlVUkucmVkdWNlclxuXHRcdH0pfVxuXHRdXG4pXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=