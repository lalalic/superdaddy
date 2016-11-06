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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;


var initChildName = null;

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
					if (entities.children) {
						if (initChildName) next = entities.children.find(function (a) {
							return a.name == initChildName;
						});
						if (!next) next = entities.children[Object.keys(entities.children)[0]];
					}

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
				var ids = Object.keys(children);
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
					init: function init() {
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
			return (0, _qiliApp.compact)((0, _selector.currentChild)(state), "name", "photo");
		})(SuperDaddy) },
	_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
			return (0, _qiliApp.compact)((0, _selector.currentChild)(state), "score", "goal", "todo");
		})(_dashboard2.default) }),
	_react2.default.createElement(
		_reactRouter.Route,
		{ path: "my", contextual: false },
		_react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (state) {
				return { babies: Object.values(state.entities.children) };
			})(_account2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: "setting", component: SettingUI }),
		_react2.default.createElement(_reactRouter.Route, { path: "profile", component: ProfileUI })
	),
	_react2.default.createElement(_reactRouter.Route, { path: "baby/:id",
		component: (0, _reactRedux.connect)(function (state) {
			return (0, _qiliApp.compact)((0, _selector.currentChild)(state), "name", "photo", "bd", "gender", "_id");
		})(_baby2.default) }),
	_react2.default.createElement(_reactRouter.Route, { path: "baby", contextual: false, component: (0, _reactRedux.connect)()(_baby.Creator) })
), [_defineProperty({}, DOMAIN, REDUCER), { ui: function ui() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsImluaXRDaGlsZE5hbWUiLCJET01BSU4iLCJJTklUX1NUQVRFIiwiQUNUSU9OIiwiRkVUQ0hfRkFNSUxZIiwiZmluZCIsImZldGNoIiwiYWxsIiwibGVuZ3RoIiwiZW50aXRpZXMiLCJzY2hlbWEiLCJkaXNwYXRjaCIsIm5leHQiLCJjaGlsZHJlbiIsImEiLCJuYW1lIiwiT2JqZWN0Iiwia2V5cyIsInR5cGUiLCJwYXlsb2FkIiwiQ1JFQVRFX0RFRkFVTFRfRklSU1RfQ0hJTEQiLCJ1cHNlcnQiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJSRURVQ0VSIiwiYXNzaWduIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwiY2hpbGROYW1lIiwiY2hpbGRQaG90byIsInBob3RvIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiY29udGV4dHVhbCIsImRpc3BsYXkiLCJ6SW5kZXgiLCJsYWJlbCIsImFjdGlvbiIsIm9uU2VsZWN0IiwicHVzaCIsImljb24iLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJTZXR0aW5nVUkiLCJTZXR0aW5nIiwiUHJvZmlsZVVJIiwiUHJvZmlsZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZW5kZXIiLCJiYWJpZXMiLCJ2YWx1ZXMiLCJ1aSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBcUhBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUF4SUFBLFFBQVEscUJBQVI7O0lBZ0JPQyxLLGVBQUFBLEs7SUFBT0MsTyxlQUFBQSxPO0lBQVNDLFUsZUFBQUEsVTs7O0FBRXZCLElBQUlDLGdCQUFjLElBQWxCOztBQUVBLElBQU1DLFNBQU8sWUFBYjtBQUNBLElBQU1DLGFBQVcsRUFBakI7QUFDTyxJQUFNQywwQkFBTztBQUNuQkMsZUFBYztBQUFBLFNBQUk7QUFBQSxVQUFVLFdBQU9DLElBQVAsR0FDMUJDLEtBRDBCLENBQ3BCLGVBQUs7QUFDWCxRQUFHQyxPQUFPQSxJQUFJQyxNQUFkLEVBQXFCO0FBQ3BCLFNBQUlDLFdBQVMsMEJBQVVGLEdBQVYsRUFBYyx3QkFBUSxXQUFPRyxNQUFmLENBQWQsRUFBc0NELFFBQW5EO0FBQ0FFLGNBQVMsdUJBQVNGLFFBQVQsQ0FBVDtBQUNBLFNBQUlHLGFBQUo7QUFDQSxTQUFHSCxTQUFTSSxRQUFaLEVBQXFCO0FBQ3BCLFVBQUdiLGFBQUgsRUFDQ1ksT0FBS0gsU0FBU0ksUUFBVCxDQUFrQlIsSUFBbEIsQ0FBdUI7QUFBQSxjQUFHUyxFQUFFQyxJQUFGLElBQVFmLGFBQVg7QUFBQSxPQUF2QixDQUFMO0FBQ0QsVUFBRyxDQUFDWSxJQUFKLEVBQ0NBLE9BQUtILFNBQVNJLFFBQVQsQ0FBa0JHLE9BQU9DLElBQVAsQ0FBWVIsU0FBU0ksUUFBckIsRUFBK0IsQ0FBL0IsQ0FBbEIsQ0FBTDtBQUNEOztBQUVELFNBQUdELElBQUgsRUFDQ0QsU0FBUyxFQUFDTyxNQUFLLHNCQUFOLEVBQTZCQyxTQUFRUCxJQUFyQyxFQUFULEVBREQsS0FHQ0QsU0FBU1IsT0FBT2lCLDBCQUFQLEVBQVQ7QUFDRDtBQUNELElBbEIwQixDQUFWO0FBQUEsR0FBSjtBQUFBLEVBREs7QUFvQmxCQSw2QkFBNEI7QUFBQSxTQUFJLG9CQUFVO0FBQzFDLFVBQU8sV0FBT0MsTUFBUCxDQUFjLEVBQUNOLE1BQUssRUFBTixFQUFTTyxPQUFNLENBQWYsRUFBZCxFQUNMQyxJQURLLENBQ0EsaUJBQU87QUFDWlosYUFBUyx1QkFBUywwQkFBVWEsS0FBVixFQUFnQixXQUFPZCxNQUF2QixFQUErQkQsUUFBeEMsQ0FBVDtBQUNBRSxhQUFTLEVBQUNPLE1BQUssc0JBQU4sRUFBNkJDLFNBQVFLLEtBQXJDLEVBQVQ7QUFDQSxJQUpLLENBQVA7QUFLQSxHQU40QjtBQUFBLEVBcEJWO0FBMkJsQkMsdUJBQXNCO0FBQUEsU0FBSSxVQUFDZCxRQUFELEVBQVVlLFFBQVYsRUFBcUI7QUFDL0MsT0FBTUMsUUFBTUQsVUFBWjtBQUNBLE9BQU1iLFdBQVNjLE1BQU1sQixRQUFOLENBQWVJLFFBQTlCO0FBQ0EsT0FBR2UsRUFBSCxFQUFNO0FBQ0xqQixhQUFTLEVBQUNPLE1BQUssc0JBQU4sRUFBNkJDLFNBQVFOLFNBQVNlLEVBQVQsQ0FBckMsRUFBVDtBQUNBLElBRkQsTUFFSztBQUNKLFFBQU1DLFVBQVFGLE1BQU0xQixNQUFOLEVBQWN1QixLQUE1QjtBQUNBLFFBQU1NLE1BQUlkLE9BQU9DLElBQVAsQ0FBWUosUUFBWixDQUFWO0FBQ0EsUUFBSUQsT0FBS2tCLElBQUksQ0FBQ0EsSUFBSUMsT0FBSixDQUFZRixPQUFaLElBQXFCLENBQXRCLElBQXlCQyxJQUFJdEIsTUFBakMsQ0FBVDtBQUNBRyxhQUFTLEVBQUNPLE1BQUssc0JBQU4sRUFBNkJDLFNBQVFOLFNBQVNELElBQVQsQ0FBckMsRUFBVDtBQUNBO0FBQ0QsR0FYc0I7QUFBQTtBQTNCSixDQUFiOztBQXlDUCxJQUFNb0IsVUFBUSxTQUFSQSxPQUFRLEdBQW1DO0FBQUEsS0FBbENMLEtBQWtDLHVFQUE1QnpCLFVBQTRCO0FBQUE7QUFBQSxLQUFoQmdCLElBQWdCLFFBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsUUFBWEEsT0FBVzs7QUFDaEQsU0FBT0QsSUFBUDtBQUNBLE9BQUssc0JBQUw7QUFDQyxVQUFPRixPQUFPaUIsTUFBUCxDQUFjLEVBQWQsRUFBaUJOLEtBQWpCLEVBQXVCLEVBQUNILE9BQU1MLFFBQVFlLEdBQWYsRUFBdkIsQ0FBUDtBQUZEO0FBSUEsUUFBT1AsS0FBUDtBQUNBLENBTkQ7O0lBUU1RLFU7Ozs7Ozs7Ozs7OzJCQUNHO0FBQUEsZ0JBQzhELEtBQUtDLEtBRG5FO0FBQUEsT0FDS0MsU0FETCxVQUNBdEIsSUFEQTtBQUFBLE9BQ3NCdUIsVUFEdEIsVUFDZ0JDLEtBRGhCO0FBQUEsT0FDa0MxQixRQURsQyxVQUNrQ0EsUUFEbEM7QUFBQSxPQUM0QzJCLE1BRDVDLFVBQzRDQSxNQUQ1QztBQUFBLE9BQ29EN0IsUUFEcEQsVUFDb0RBLFFBRHBEO0FBQUEsT0FFQThCLE1BRkEsR0FFUSxLQUFLQyxPQUZiLENBRUFELE1BRkE7O0FBR1AsT0FBSUUsa0JBQWdCLEVBQUNDLFVBQVMsVUFBVixFQUFwQjtBQUNBLE9BQUdKLE9BQU9uQyxJQUFQLENBQVk7QUFBQSxXQUFHUyxFQUFFK0IsVUFBRixLQUFlLEtBQWxCO0FBQUEsSUFBWixDQUFILEVBQ0NGLGdCQUFnQkcsT0FBaEIsR0FBd0IsTUFBeEI7QUFDSyxVQUNJO0FBQUE7QUFBQSxNQUFTLE9BQU0sMEJBQWY7QUFDUixXQUFNLGdCQUFJO0FBQ1I7QUFDQW5DLGVBQVNSLE9BQU9DLFlBQVAsRUFBVDtBQUNBLE1BSk07QUFNUjtBQUFBO0FBQUEsT0FBc0IsV0FBVSxrQkFBaEM7QUFDQyxZQUFNLElBRFA7QUFFQyxhQUFPdUMsZUFGUjtBQUdDLGVBQVM7QUFBQSxjQUFHaEMsU0FBU1IsT0FBT3NCLG9CQUFQLEVBQVQsQ0FBSDtBQUFBLE9BSFY7QUFJRWEsa0JBQWMsb0RBQVEsS0FBS0EsVUFBYixHQUFkLEdBQTRDRDtBQUo5QyxLQU5RO0FBYVB4QixZQWJPO0FBZUksa0NBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEIsRUFBZ0MsT0FBTyxFQUFDa0MsUUFBTyxDQUFSLEVBQXZDO0FBQ1gsWUFBTyxDQUNOLEVBQUNDLE9BQU0sSUFBUCxFQUFhQyxRQUFPLE9BQXBCO0FBQ3NCQyxnQkFBUztBQUFBLGNBQUdULE9BQU9VLElBQVAsQ0FBWSxHQUFaLENBQUg7QUFBQSxPQUQvQjtBQUVzQkMsWUFBSyxpRUFGM0IsRUFETTtBQUlaOzs7Ozs7OztBQVF3QixPQUFDSixPQUFNLEdBQVAsRUFBWUMsUUFBTyxJQUFuQjtBQUNJQyxnQkFBUztBQUFBLGNBQUdULE9BQU9VLElBQVAsQ0FBWSxLQUFaLENBQUg7QUFBQSxPQURiO0FBRUlDLFlBQUsseURBRlQsRUFaWjtBQURJO0FBZkosSUFESjtBQW9DTjs7Ozs7O0FBTUY7Ozs7Ozs7Ozs7Ozs7QUFqRE1qQixVLENBNENFa0IsWSxHQUFhO0FBQ25CWixTQUFRLGlCQUFVYTtBQURDLEM7SUF1Qk5DLFMsZUFBUkMsTztJQUE0QkMsUyxlQUFUQyxPOzs7QUFFMUJDLE9BQU9DLE9BQVAsR0FBZSxpQkFBUUMsTUFBUixDQUNWO0FBQUE7QUFBQSxHQUFPLE1BQUssR0FBWixFQUFnQixXQUFXLHlCQUFRO0FBQUEsVUFBTyxzQkFBUSw0QkFBYWxDLEtBQWIsQ0FBUixFQUE0QixNQUE1QixFQUFtQyxPQUFuQyxDQUFQO0FBQUEsR0FBUixFQUE0RFEsVUFBNUQsQ0FBM0I7QUFFSCwwREFBWSxXQUFXLHlCQUFRO0FBQUEsVUFBTyxzQkFBUSw0QkFBYVIsS0FBYixDQUFSLEVBQTRCLE9BQTVCLEVBQW9DLE1BQXBDLEVBQTJDLE1BQTNDLENBQVA7QUFBQSxHQUFSLHNCQUF2QixHQUZHO0FBSUg7QUFBQTtBQUFBLElBQU8sTUFBSyxJQUFaLEVBQWlCLFlBQVksS0FBN0I7QUFDQywyREFBWSxXQUFXLHlCQUFRO0FBQUEsV0FBUSxFQUFDbUMsUUFBTzlDLE9BQU8rQyxNQUFQLENBQWNwQyxNQUFNbEIsUUFBTixDQUFlSSxRQUE3QixDQUFSLEVBQVI7QUFBQSxJQUFSLG9CQUF2QixHQUREO0FBR0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLFdBQVcwQyxTQUFqQyxHQUhEO0FBS0Msc0RBQU8sTUFBSyxTQUFaLEVBQXNCLFdBQVdFLFNBQWpDO0FBTEQsRUFKRztBQVlILHFEQUFPLE1BQUssVUFBWjtBQUNDLGFBQVcseUJBQVE7QUFBQSxVQUFPLHNCQUFRLDRCQUFhOUIsS0FBYixDQUFSLEVBQTRCLE1BQTVCLEVBQW1DLE9BQW5DLEVBQTJDLElBQTNDLEVBQWdELFFBQWhELEVBQXlELEtBQXpELENBQVA7QUFBQSxHQUFSLGlCQURaLEdBWkc7QUFjSCxxREFBTyxNQUFLLE1BQVosRUFBbUIsWUFBWSxLQUEvQixFQUFzQyxXQUFXLHlDQUFqRDtBQWRHLENBRFUsRUFnRGIscUJBQ0UxQixNQURGLEVBQ1UrQixPQURWLEdBRUMsRUFBQ2dDLElBQUk7QUFBQSxNQUFDbEQsQ0FBRCx1RUFBRyxFQUFIO0FBQUEsU0FBUUEsQ0FBUjtBQUFBLEVBQUwsRUFGRCxDQWhEYSxDQUFmOztBQXVEQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxudmFyIGluaXRDaGlsZE5hbWU9bnVsbFxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5jb25zdCBJTklUX1NUQVRFPXt9XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0RkVUQ0hfRkFNSUxZOiAoKT0+ZGlzcGF0Y2g9PkZhbWlseS5maW5kKClcblx0XHQuZmV0Y2goYWxsPT57XG5cdFx0XHRpZihhbGwgJiYgYWxsLmxlbmd0aCl7XG5cdFx0XHRcdGxldCBlbnRpdGllcz1ub3JtYWxpemUoYWxsLGFycmF5T2YoRmFtaWx5LnNjaGVtYSkpLmVudGl0aWVzXG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKGVudGl0aWVzKSlcblx0XHRcdFx0bGV0IG5leHRcblx0XHRcdFx0aWYoZW50aXRpZXMuY2hpbGRyZW4pe1xuXHRcdFx0XHRcdGlmKGluaXRDaGlsZE5hbWUpXG5cdFx0XHRcdFx0XHRuZXh0PWVudGl0aWVzLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1pbml0Q2hpbGROYW1lKVxuXHRcdFx0XHRcdGlmKCFuZXh0KVxuXHRcdFx0XHRcdFx0bmV4dD1lbnRpdGllcy5jaGlsZHJlbltPYmplY3Qua2V5cyhlbnRpdGllcy5jaGlsZHJlbilbMF1dXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpuZXh0fSlcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGRyZW5baWRdfSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW25leHRdfSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXsoKT0+e1xuXHRcdFx0XHRcdFx0aW5pdCgpXG5cdFx0XHRcdFx0XHRkaXNwYXRjaChBQ1RJT04uRkVUQ0hfRkFNSUxZKCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0XHRzdHlsZT17Y29udGV4dHVhbFN0eWxlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TV0lUQ0hfQ1VSUkVOVF9DSElMRCgpKX0+XG5cdFx0XHRcdFx0e2NoaWxkUGhvdG8gPyAoPEF2YXRhciBzcmM9e2NoaWxkUGhvdG99Lz4pIDogY2hpbGROYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXG5cdFx0XHRcdHtjaGlsZHJlbn1cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBzdHlsZT17e3pJbmRleDoxfX1cblx0XHRcdFx0XHRpdGVtcz17W1xuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5Lu75YqhXCIsIGFjdGlvbjpcInRhc2tzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy8nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcbi8qXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9zY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT5yb3V0ZXIucHVzaCgnL2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcbiovXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwibXlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT5yb3V0ZXIucHVzaCgnL215JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbkFjY291bnQvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L1FpbGlBcHA+XG4gICAgICAgIClcblx0fVxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3Rcblx0fVxufVxuXG4vKlxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcbmltcG9ydCBJbnZpdGVVSSBmcm9tIFwiLi9pbnZpdGVcIlxuKi9cbmltcG9ydCBEYXNoYm9hcmRVSSBmcm9tIFwiLi9kYXNoYm9hcmRcIlxuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2N1cnJlbnRDaGlsZH0gZnJvbSBcIi4vc2VsZWN0b3JcIlxuXG5jb25zdCB7U2V0dGluZzpTZXR0aW5nVUksIFByb2ZpbGU6IFByb2ZpbGVVSX09VUlcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChjdXJyZW50Q2hpbGQoc3RhdGUpLFwibmFtZVwiLFwicGhvdG9cIikpKFN1cGVyRGFkZHkpfT5cblxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChjdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKERhc2hib2FyZFVJKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJteVwiIGNvbnRleHR1YWw9e2ZhbHNlfT5cblx0XHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtiYWJpZXM6T2JqZWN0LnZhbHVlcyhzdGF0ZS5lbnRpdGllcy5jaGlsZHJlbil9KSkoQWNjb3VudFVJKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInNldHRpbmdcIiBjb21wb25lbnQ9e1NldHRpbmdVSX0gLz5cblxuXHRcdFx0PFJvdXRlIHBhdGg9XCJwcm9maWxlXCIgY29tcG9uZW50PXtQcm9maWxlVUl9Lz5cblx0XHQ8L1JvdXRlPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJiYWJ5LzppZFwiXG5cdFx0XHRjb21wb25lbnQ9e2Nvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoY3VycmVudENoaWxkKHN0YXRlKSxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIsXCJfaWRcIikpKEJhYnlVSSl9Lz5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtjb25uZWN0KCkoQ3JlYXRvcil9Lz5cblxuey8qXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VzXCIgbmFtZT1cImtub3dsZWRnZXNcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ3JlYXRhYmxlfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFzay86X2lkXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17VGFza1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiAoYT17fSk9PmF9XG5cdF1cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19