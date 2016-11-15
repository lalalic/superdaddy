"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ACTION = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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
	_react2.default.createElement(_reactRouter.Route, { path: "time", component: _timeManage2.default }),
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
), [(0, _defineProperty3.default)({}, DOMAIN, REDUCER), { ui: (0, _qiliApp.enhancedCombineReducers)({ knowledge: _knowledges2.default.REDUCER }) }]);

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
//# sourceMappingURL=data:application/json;base64,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LE1BQUwsRUFBWSxpQ0FBbkIsQ0F4Qkc7Q0EwQkg7O0lBQU8sTUFBSyxXQUFMLEVBQVA7RUFDQyx5REFBWSxZQUFZLEtBQVo7QUFDWCxjQUFXLHlCQUFRO1dBQVEsRUFBQyxZQUFXLDZCQUFjLEtBQWQsQ0FBWDtJQUFULENBQVIsQ0FBb0QscUJBQWEsU0FBYixDQUEvRCxFQURELENBREQ7RUFJQyxvREFBTyxNQUFLLFFBQUw7QUFDTixlQUFZLEtBQVo7QUFDQSxjQUFXLHlCQUFRO1dBQU8sc0JBQVEsTUFBTSxFQUFOLENBQVMsU0FBVCxDQUFtQixZQUFuQixFQUFnQyxXQUF4QztJQUFQLENBQVIsd0JBQVgsRUFGRCxDQUpEO0VBUUMsb0RBQU8sTUFBSyxNQUFMO0FBQ04sY0FBVyx5QkFBUSxVQUFDLEtBQUQ7UUFBZ0IsWUFBUixPQUFRO1dBQVM7QUFDM0MsZ0JBQVUsNEJBQWEsS0FBYixDQUFWO0FBQ0MsZUFBUyxDQUFDLENBQUMsTUFBTSxFQUFOLENBQVMsU0FBVCxDQUFtQixZQUFuQjtBQUNYLGFBQU8sQ0FBQyxDQUFDLG1DQUFDLENBQXFCLEtBQXJCLENBQUQsQ0FBOEIsSUFBOUIsQ0FBbUM7YUFBRyxFQUFFLEdBQUYsSUFBTyxHQUFQO01BQUgsQ0FBcEM7O0lBSFMsQ0FBUixxQkFBWCxFQURELENBUkQ7RUExQkc7Q0EwQ0gsb0RBQU8sTUFBSyxvQkFBTCxFQUEwQixXQUFXLE9BQVgsRUFBakMsQ0ExQ0c7Q0FEVSxFQXFFYixtQ0FDRSxRQUFRLFFBRFYsRUFFQyxFQUFDLElBQUksc0NBQXdCLEVBQUMsV0FBVSxxQkFBYSxPQUFiLEVBQW5DLENBQUosRUFGRixDQXJFYSxDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixRaWxpQXBwLCBVSSwgRU5USVRJRVMsIGNvbXBhY3QsIGVuaGFuY2VkQ29tYmluZVJlZHVjZXJzfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY29uc3QgRE9NQUlOPSdzdXBlcmRhZGR5J1xuXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiAoKT0+ZGlzcGF0Y2g9PkZhbWlseS5maW5kKClcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwgJiYgYWxsLmxlbmd0aCl7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0bGV0IG5leHRcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pXG5cdFx0XHRcdFx0bmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cblx0XHRcdFx0aWYobmV4dClcblx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6bmV4dH0pXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQoKSlcblx0XHRcdH1cblx0XHR9KVxuXHQsQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQ6ICgpPT5kaXNwYXRjaD0+e1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwiXCIsc2NvcmU6MH0pXG5cdFx0XHQudGhlbihjaGlsZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoY2hpbGQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxuXHRcdFx0fSlcblx0fVxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkcmVuPXN0YXRlLmVudGl0aWVzLmNoaWxkcmVuXG5cdFx0aWYoaWQpe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW2lkXX0pXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcblx0XHRcdGNvbnN0IGlkcz1PYmplY3Qua2V5cyhjaGlsZHJlbilcblx0XHRcdGxldCBuZXh0PWlkc1soaWRzLmluZGV4T2YoY3VycmVudCkrMSklaWRzLmxlbmd0aF1cblx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZHJlbltuZXh0XX0pXG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtjaGlsZDpwYXlsb2FkLl9pZH0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtuYW1lOmNoaWxkTmFtZSwgcGhvdG86Y2hpbGRQaG90bywgY2hpbGRyZW4sIHJvdXRlcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0Y29udGV4dHVhbFN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCJcblx0XHRcdFx0aW5pdD17YT0+e1xuXHRcdFx0XHRcdFx0aW5pdCgpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0hfRkFNSUxZKCkpXG5cdFx0XHRcdH19PlxuXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcblx0XHRcdFx0XHRtaW5pPXt0cnVlfVxuXHRcdFx0XHRcdHN0eWxlPXtjb250ZXh0dWFsU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9DVVJSRU5UX0NISUxEKCkpfT5cblx0XHRcdFx0XHR7Y2hpbGRQaG90byA/ICg8QXZhdGFyIHNyYz17Y2hpbGRQaG90b30vPikgOiBjaGlsZE5hbWV9XG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cblx0XHRcdFx0e2NoaWxkcmVufVxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLku7vliqFcIiwgYWN0aW9uOlwidGFza3NcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcblxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5pe26Ze0566h55CGXCIsIGFjdGlvbjpcInRpbWVcIixcblx0XHRcdFx0XHRcdFx0bGluazpcIi90aW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG4vKlxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvc2NvcmUnKSxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvblJld2FyZC8+fSxcbiovXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicva25vd2xlZGdlJyxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbkFjY291bnQvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbiovXG5cbmltcG9ydCBEYXNoYm9hcmRVSSBmcm9tIFwiLi9kYXNoYm9hcmRcIlxuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuXG5pbXBvcnQgVGltZU1hbmFnZVVJIGZyb20gXCIuL3RpbWUtbWFuYWdlXCJcblxuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3MsIGdldEtub3dsZWRnZXMsIGdldEtub3dsZWRnZX0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwibmFtZVwiLFwicGhvdG9cIikpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKERhc2hib2FyZFVJKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtiYWJpZXM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbil9KSkoQWNjb3VudFVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6aWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxuXHRcdFx0XHRcdGxldCBpbmZvPWNvbXBhY3QoY2hpbGQsXCJuYW1lXCIsXCJwaG90b1wiLFwiYmRcIixcImdlbmRlclwiLFwidG9kb3NcIilcblx0XHRcdFx0XHRpbmZvLmlzQ3VycmVudD1jaGlsZD09Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdFx0XHRcdHJldHVybiBpbmZvXG5cdFx0XHRcdH0pKEJhYnlVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJ0aW1lXCIgY29tcG9uZW50PXtUaW1lTWFuYWdlVUl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2tub3dsZWRnZXM6Z2V0S25vd2xlZGdlcyhzdGF0ZSl9KSkoS25vd2xlZGdlc1VJLkNyZWF0YWJsZSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0XHRjb250ZXh0dWFsPXtmYWxzZX0gXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChzdGF0ZS51aS5rbm93bGVkZ2Uuc2VsZWN0ZWREb2N4LFwia25vd2xlZGdlXCIpKShOZXdLbm93bGVkZ2VVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6X2lkXCIgXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7X2lkfX0pPT4oe1xuXHRcdFx0XHRcdGtub3dsZWRnZTpnZXRLbm93bGVkZ2Uoc3RhdGUpXG5cdFx0XHRcdFx0LHJldmlzaW5nOiEhc3RhdGUudWkua25vd2xlZGdlLnNlbGVjdGVkRG9jeFxuXHRcdFx0XHRcdCxpblRhc2s6ISEoZ2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpKS5maW5kKGE9PmEuX2lkPT1faWQpXG5cdFx0XHRcdFx0fSkpKEtub3dsZWRnZVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cdFx0XG5cdFx0PFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuXHR7LypcbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxuKi99XG4gICAgPC9Sb3V0ZT4pXG5cdCxbXG5cdFx0e1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHt1aTogZW5oYW5jZWRDb21iaW5lUmVkdWNlcnMoe2tub3dsZWRnZTpLbm93bGVkZ2VzVUkuUkVEVUNFUn0pfVxuXHRdXG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==