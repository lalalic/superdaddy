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
	FETCH_FAMILY: function FETCH_FAMILY() {
		return function (dispatch) {
			return _db.Family.find().fetch(function (all) {
				if (all && all.length) {
					var entities = (0, _normalizr.normalize)(all, (0, _normalizr.arrayOf)(_db.Family.schema)).entities;
					dispatch((0, _qiliApp.ENTITIES)(entities));
					var next = void 0;
					if (entities.children) next = entities.children[(0, _keys2.default)(entities.children)[0]];

					if (next) dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: next });else dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD());
				}
			});
		};
	},
	CREATE_DEFAULT_FIRST_CHILD: function CREATE_DEFAULT_FIRST_CHILD() {
		return function (dispatch) {
			return _db.Family.upsert({ name: "", score: 0 }).then(function (child) {
				dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(child, _db.Family.schema).entities));
				dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: child });
			});
		};
	},
	SWITCH_CURRENT_CHILD: function SWITCH_CURRENT_CHILD(id) {
		return function (dispatch, getState) {
			var state = getState();
			var children = state.entities.children;
			if (id) {
				dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: children[id] });
			} else {
				var current = state[DOMAIN].child;
				var ids = (0, _keys2.default)(children);
				var next = ids[(ids.indexOf(current) + 1) % ids.length];
				dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: children[next] });
			}
		};
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
					{ className: "sticky top right",
						mini: true,
						style: contextualStyle,
						onClick: function onClick(e) {
							return dispatch(ACTION.SWITCH_CURRENT_CHILD());
						} },
					childPhoto ? _react2.default.createElement(_materialUi.Avatar, { src: childPhoto }) : childName
				),
				children,
				_react2.default.createElement(CommandBar, { className: "footbar", style: { zIndex: 1 },
					items: [{ label: "任务", action: "tasks",
						link: "/",
						icon: _react2.default.createElement(_formatListNumbered2.default, null) }, { label: "时间管理", action: "time",
						link: "/time",
						icon: _react2.default.createElement(_formatListNumbered2.default, null) },
					/*
     						{label:"成绩", action:"score",
     							onSelect:a=>router.push('/score'),
     							icon:<IconReward/>},
     */
					{ label: "发现", action: "knowledges",
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
	_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
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
	_react2.default.createElement(_reactRouter.Route, { path: "time", component: (0, _reactRedux.connect)(function (state) {
			return (0, _extends3.default)({}, state.ui.time, {
				todoWeek: (0, _selector.getCurrentChild)(state).todoWeek || new Date().getWeek()
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
//# sourceMappingURL=data:application/json;base64,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ZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9GQU1JTFk6ICgpPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbCAmJiBhbGwubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRsZXQgbmV4dFxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbilcblx0XHRcdFx0XHRuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblxuXHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpuZXh0fSlcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGRyZW5baWRdfSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW25leHRdfSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e2NvbnRleHR1YWxTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU1dJVENIX0NVUlJFTlRfQ0hJTEQoKSl9PlxuXHRcdFx0XHRcdHtjaGlsZFBob3RvID8gKDxBdmF0YXIgc3JjPXtjaGlsZFBob3RvfS8+KSA6IGNoaWxkTmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLml7bpl7TnrqHnkIZcIiwgYWN0aW9uOlwidGltZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL3RpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcbi8qXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9zY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuKi9cblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9rbm93bGVkZ2UnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcblxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazonL215JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uQWNjb3VudC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbi8qXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcbmltcG9ydCBJbnZpdGVVSSBmcm9tIFwiLi9pbnZpdGVcIlxuKi9cblxuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrcywgZ2V0S25vd2xlZGdlcywgZ2V0S25vd2xlZGdlfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmNvbnN0IHtTZXR0aW5nOlNldHRpbmdVSSwgUHJvZmlsZTogUHJvZmlsZVVJfT1VSVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJuYW1lXCIsXCJwaG90b1wiKSkoU3VwZXJEYWRkeSl9PlxuXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoRGFzaGJvYXJkVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIsXCJ0b2Rvc1wiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0fSkoQmFieVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cInRpbWVcIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pntcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHQuLi5zdGF0ZS51aS50aW1lLCBcblx0XHRcdFx0XHR0b2RvV2VlazpnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLnRvZG9XZWVrfHxuZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9XG5cdFx0XHR9KShUaW1lTWFuYWdlVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuXHRcdFx0PEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtrbm93bGVkZ2VzOmdldEtub3dsZWRnZXMoc3RhdGUpfSkpKEtub3dsZWRnZXNVSS5DcmVhdGFibGUpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCJcblx0XHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4LFwia25vd2xlZGdlXCIpKShOZXdLbm93bGVkZ2VVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntfaWR9fSk9Pih7XG5cdFx0XHRcdFx0a25vd2xlZGdlOmdldEtub3dsZWRnZShzdGF0ZSlcblx0XHRcdFx0XHQscmV2aXNpbmc6ISFzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4XG5cdFx0XHRcdFx0LGluVGFzazohIShnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkpLmZpbmQoYT0+YS5faWQ9PV9pZClcblx0XHRcdFx0XHR9KSkoS25vd2xlZGdlVUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cblx0ey8qXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFzay86X2lkXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17VGFza1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuXG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6d2hhdFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImludml0ZVwiIGNvbXBvbmVudD17SW52aXRlVUl9Lz5cbiovfVxuICAgIDwvUm91dGU+KVxuXHQsW1xuXHRcdHtbRE9NQUlOXTpSRURVQ0VSfVxuXHRcdCx7dWk6IGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzKHtcblx0XHRcdGtub3dsZWRnZTpLbm93bGVkZ2VzVUkuUkVEVUNFUlxuXHRcdFx0LHRpbWU6VGltZU1hbmFnZVVJLnJlZHVjZXJcblx0XHR9KX1cblx0XVxuKVxuXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=