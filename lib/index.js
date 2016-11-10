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
     
     						{label:"发现", action:"knowledges",
     							link:'/knowledges',
     							icon:<IconKnowledges/>},
     */
					{ label: "我", action: "my",
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
import KnowledgeUI from './knowledge'
import NewKnowledgeUI from './newKnowledge'
import KnowledgesUI from './knowledges'
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
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender");
				info.isCurrent = child == (0, _selector.getCurrentChild)(state);
				return info;
			})(_baby2.default) })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "time", component: _timeManage2.default })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJmaW5kIiwiZmV0Y2giLCJhbGwiLCJsZW5ndGgiLCJlbnRpdGllcyIsInNjaGVtYSIsImRpc3BhdGNoIiwibmV4dCIsImNoaWxkcmVuIiwidHlwZSIsInBheWxvYWQiLCJDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJSRURVQ0VSIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwiY2hpbGROYW1lIiwiY2hpbGRQaG90byIsInBob3RvIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwiekluZGV4IiwibGFiZWwiLCJhY3Rpb24iLCJsaW5rIiwiaWNvbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIlNldHRpbmdVSSIsIlNldHRpbmciLCJQcm9maWxlVUkiLCJQcm9maWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlbmRlciIsImJhYmllcyIsInBhcmFtcyIsImluZm8iLCJpc0N1cnJlbnQiLCJ1aSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFzSEE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7OztBQTFJQUEsUUFBUSxxQkFBUjs7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QjtBQUNBLFdBQU9vQyxJQUFQO0FBQ0EsSUFMVSxpQkFEWjtBQUhELEVBWkc7QUF3QkgscURBQU8sTUFBSyxNQUFaLEVBQW1CLCtCQUFuQjtBQXhCRyxDQURVLEVBNkRiLG1DQUNFM0QsTUFERixFQUNVNEIsT0FEVixHQUVDLEVBQUNpQyxJQUFJO0FBQUEsTUFBQ3JCLENBQUQsdUVBQUcsRUFBSDtBQUFBLFNBQVFBLENBQVI7QUFBQSxFQUFMLEVBRkQsQ0E3RGEsQ0FBZjs7QUFvRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9GQU1JTFk6ICgpPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbCAmJiBhbGwubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRsZXQgbmV4dFxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbilcblx0XHRcdFx0XHRuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblxuXHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpuZXh0fSlcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGRyZW5baWRdfSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW25leHRdfSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e2NvbnRleHR1YWxTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU1dJVENIX0NVUlJFTlRfQ0hJTEQoKSl9PlxuXHRcdFx0XHRcdHtjaGlsZFBob3RvID8gKDxBdmF0YXIgc3JjPXtjaGlsZFBob3RvfS8+KSA6IGNoaWxkTmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLml7bpl7TnrqHnkIZcIiwgYWN0aW9uOlwidGltZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL3RpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcbi8qXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9zY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLlj5HnjrBcIiwgYWN0aW9uOlwia25vd2xlZGdlc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOicva25vd2xlZGdlcycsXG5cdFx0XHRcdFx0XHRcdGljb246PEljb25Lbm93bGVkZ2VzLz59LFxuKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJteVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6Jy9teScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbkFjY291bnQvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuKi9cblxuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q2hpbGR9IGZyb20gXCIuL3NlbGVjdG9yXCJcblxuY29uc3Qge1NldHRpbmc6U2V0dGluZ1VJLCBQcm9maWxlOiBQcm9maWxlVUl9PVVJXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcIm5hbWVcIixcInBob3RvXCIpKShTdXBlckRhZGR5KX0+XG5cblx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKShEYXNoYm9hcmRVSSl9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwibXlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9Pih7YmFiaWVzOk9iamVjdC52YWx1ZXMoc3RhdGUuZW50aXRpZXMuY2hpbGRyZW4pfSkpKEFjY291bnRVSSl9Lz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwicHJvZmlsZVwiIGNvbXBvbmVudD17UHJvZmlsZVVJfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdCgpKENyZWF0b3IpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwiOmlkXCJcblx0XHRcdFx0Y29tcG9uZW50PXtjb25uZWN0KChzdGF0ZSx7cGFyYW1zOntpZH19KT0+e1xuXHRcdFx0XHRcdGxldCBjaGlsZD1nZXRDaGlsZChzdGF0ZSxpZClcblx0XHRcdFx0XHRsZXQgaW5mbz1jb21wYWN0KGNoaWxkLFwibmFtZVwiLFwicGhvdG9cIixcImJkXCIsXCJnZW5kZXJcIilcblx0XHRcdFx0XHRpbmZvLmlzQ3VycmVudD1jaGlsZD09Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdFx0XHRcdHJldHVybiBpbmZvXG5cdFx0XHRcdH0pKEJhYnlVSSl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJ0aW1lXCIgY29tcG9uZW50PXtUaW1lTWFuYWdlVUl9Lz5cblxuey8qXG5cdDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG5cdFx0PEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9XG5cdFx0XHRjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5DcmVhdGFibGV9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiY3JlYXRlXCJcblx0XHRcdGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e05ld0tub3dsZWRnZVVJfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZVVJfS8+XG5cdDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6d2hhdFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImludml0ZVwiIGNvbXBvbmVudD17SW52aXRlVUl9Lz5cbiovfVxuICAgIDwvUm91dGU+KVxuXHQsW1xuXHRcdHtbRE9NQUlOXTpSRURVQ0VSfVxuXHRcdCx7dWk6IChhPXt9KT0+YX1cblx0XVxuKVxuXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=