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

var _reactRedux = require("react-redux");

var _selector = require("./selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;


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
	var type = _ref.type;
	var payload = _ref.payload;

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
			var _props = this.props;
			var childName = _props.name;
			var childPhoto = _props.photo;
			var children = _props.children;
			var routes = _props.routes;
			var dispatch = _props.dispatch;
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
						onSelect: function onSelect(a) {
							return router.push('/');
						},
						icon: _react2.default.createElement(_formatListNumbered2.default, null) },
					/*
     						{label:"成绩", action:"score",
     							onSelect:a=>router.push('/score'),
     							icon:<IconReward/>},
                             {label:"发现", action:"knowledges",
                                 onSelect:a=>router.push('/knowledges'),
                                 icon:<IconKnowledges/>},
     */
					{ label: "我", action: "my",
						onSelect: function onSelect(a) {
							return router.push('/my');
						},
						icon: _react2.default.createElement(_accountBox2.default, null) }]
				})
			);
		}
	}]);
	return SuperDaddy;
}(_react.Component);

/*
import TaskUI from './task'
import KnowledgesUI from './knowledges'
import KnowledgeUI from './knowledge'
import NewKnowledgeUI from './newKnowledge'
import SettingUI from './setting'
import PublishUI from './publish'
import TasksUI, {Approvings} from "./tasks"
import ScoreUI from "./score"
import InviteUI from "./invite"
*/


SuperDaddy.contextTypes = {
	router: _react.PropTypes.object
};
var SettingUI = _qiliApp.UI.Setting;
var ProfileUI = _qiliApp.UI.Profile;


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
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender");
				info.isCurrent = child == (0, _selector.getCurrentChild)(state);
				return info;
			})(_baby2.default) })
	)
), [(0, _defineProperty3.default)({}, DOMAIN, REDUCER), { ui: function ui() {
		var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		return a;
	} }]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJmaW5kIiwiZmV0Y2giLCJhbGwiLCJsZW5ndGgiLCJlbnRpdGllcyIsInNjaGVtYSIsImRpc3BhdGNoIiwibmV4dCIsImNoaWxkcmVuIiwidHlwZSIsInBheWxvYWQiLCJDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJSRURVQ0VSIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwiY2hpbGROYW1lIiwiY2hpbGRQaG90byIsInBob3RvIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwiekluZGV4IiwibGFiZWwiLCJhY3Rpb24iLCJvblNlbGVjdCIsInB1c2giLCJpY29uIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiU2V0dGluZ1VJIiwiU2V0dGluZyIsIlByb2ZpbGVVSSIsIlByb2ZpbGUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVuZGVyIiwiYmFiaWVzIiwicGFyYW1zIiwiaW5mbyIsImlzQ3VycmVudCIsInVpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQStHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztBQWpJQUEsUUFBUSxxQkFB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LEtBQWhCLENBQXRCO0FBQ0EsV0FBT3FDLElBQVA7QUFDQSxJQUxVLGlCQURaO0FBSEQ7QUFaRyxDQURVLEVBd0RiLG1DQUNFNUQsTUFERixFQUNVNEIsT0FEVixHQUVDLEVBQUNrQyxJQUFJO0FBQUEsTUFBQ3RCLENBQUQsdUVBQUcsRUFBSDtBQUFBLFNBQVFBLENBQVI7QUFBQSxFQUFMLEVBRkQsQ0F4RGEsQ0FBZjs7QUErREEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiAoKT0+ZGlzcGF0Y2g9PkZhbWlseS5maW5kKClcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwgJiYgYWxsLmxlbmd0aCl7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0bGV0IG5leHRcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pXG5cdFx0XHRcdFx0bmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cblx0XHRcdFx0aWYobmV4dClcblx0XHRcdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6bmV4dH0pXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQoKSlcblx0XHRcdH1cblx0XHR9KVxuXHQsQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQ6ICgpPT5kaXNwYXRjaD0+e1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KHtuYW1lOlwiXCIsc2NvcmU6MH0pXG5cdFx0XHQudGhlbihjaGlsZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoY2hpbGQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVxuXHRcdFx0fSlcblx0fVxuXHQsU1dJVENIX0NVUlJFTlRfQ0hJTEQ6IGlkPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkcmVuPXN0YXRlLmVudGl0aWVzLmNoaWxkcmVuXG5cdFx0aWYoaWQpe1xuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW2lkXX0pXG5cdFx0fWVsc2V7XG5cdFx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcblx0XHRcdGNvbnN0IGlkcz1PYmplY3Qua2V5cyhjaGlsZHJlbilcblx0XHRcdGxldCBuZXh0PWlkc1soaWRzLmluZGV4T2YoY3VycmVudCkrMSklaWRzLmxlbmd0aF1cblx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZHJlbltuZXh0XX0pXG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IFJFRFVDRVI9KHN0YXRlPUlOSVRfU1RBVEUse3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSAnQ1VSUkVOVF9DSElMRF9DSEFOR0UnOlxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKHt9LHN0YXRlLHtjaGlsZDpwYXlsb2FkLl9pZH0pXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBDb21wb25lbnR7XG5cdHJlbmRlcigpe1xuXHRcdGNvbnN0IHtuYW1lOmNoaWxkTmFtZSwgcGhvdG86Y2hpbGRQaG90bywgY2hpbGRyZW4sIHJvdXRlcywgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0Y29udGV4dHVhbFN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCJcblx0XHRcdFx0aW5pdD17YT0+e1xuXHRcdFx0XHRcdFx0aW5pdCgpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0hfRkFNSUxZKCkpXG5cdFx0XHRcdH19PlxuXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcblx0XHRcdFx0XHRtaW5pPXt0cnVlfVxuXHRcdFx0XHRcdHN0eWxlPXtjb250ZXh0dWFsU3R5bGV9XG5cdFx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9DVVJSRU5UX0NISUxEKCkpfT5cblx0XHRcdFx0XHR7Y2hpbGRQaG90byA/ICg8QXZhdGFyIHNyYz17Y2hpbGRQaG90b30vPikgOiBjaGlsZE5hbWV9XG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cblx0XHRcdFx0e2NoaWxkcmVufVxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHN0eWxlPXt7ekluZGV4OjF9fVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLku7vliqFcIiwgYWN0aW9uOlwidGFza3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT5yb3V0ZXIucHVzaCgnLycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuLypcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkOe7qVwiLCBhY3Rpb246XCJzY29yZVwiLFxuXHRcdFx0XHRcdFx0XHRvblNlbGVjdDphPT5yb3V0ZXIucHVzaCgnL3Njb3JlJyksXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25SZXdhcmQvPn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcva25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25Lbm93bGVkZ2VzLz59LFxuKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvbXknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uQWNjb3VudC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbi8qXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxuaW1wb3J0IEludml0ZVVJIGZyb20gXCIuL2ludml0ZVwiXG4qL1xuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwibmFtZVwiLFwicGhvdG9cIikpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKERhc2hib2FyZFVJKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtiYWJpZXM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbil9KSkoQWNjb3VudFVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCI6aWRcIlxuXHRcdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3QoKHN0YXRlLHtwYXJhbXM6e2lkfX0pPT57XG5cdFx0XHRcdFx0bGV0IGNoaWxkPWdldENoaWxkKHN0YXRlLGlkKVxuXHRcdFx0XHRcdGxldCBpbmZvPWNvbXBhY3QoY2hpbGQsXCJuYW1lXCIsXCJwaG90b1wiLFwiYmRcIixcImdlbmRlclwiKVxuXHRcdFx0XHRcdGluZm8uaXNDdXJyZW50PWNoaWxkPT1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0XHRcdFx0cmV0dXJuIGluZm9cblx0XHRcdFx0fSkoQmFieVVJKX0vPlxuXHRcdDwvUm91dGU+XG5cbnsvKlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlc1wiIG5hbWU9XCJrbm93bGVkZ2VzXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNyZWF0YWJsZX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY291cnNlc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ291cnNlfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cImRvbmVcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e05ld0tub3dsZWRnZVVJfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZVVJfS8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiaW52aXRlXCIgY29tcG9uZW50PXtJbnZpdGVVSX0vPlxuKi99XG4gICAgPC9Sb3V0ZT4pXG5cdCxbXG5cdFx0e1tET01BSU5dOlJFRFVDRVJ9XG5cdFx0LHt1aTogKGE9e30pPT5hfVxuXHRdXG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==