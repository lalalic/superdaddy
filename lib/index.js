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
				var info = (0, _qiliApp.compact)(child, "name", "photo", "bd", "gender");
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
				return state.ui.knowledge;
			})(_knowledges2.default.Creatable) }),
		_react2.default.createElement(_reactRouter.Route, { path: "create",
			contextual: false, component: (0, _reactRedux.connect)(function (state) {
				return { docx: state.ui.knowledge.selectedDocx };
			})(_newKnowledge2.default) }),
		_react2.default.createElement(_reactRouter.Route, { path: ":_id", component: _knowledge2.default })
	)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiRW1wdHkiLCJDb21tZW50IiwiQ29tbWFuZEJhciIsIkRPTUFJTiIsIklOSVRfU1RBVEUiLCJBQ1RJT04iLCJGRVRDSF9GQU1JTFkiLCJmaW5kIiwiZmV0Y2giLCJhbGwiLCJsZW5ndGgiLCJlbnRpdGllcyIsInNjaGVtYSIsImRpc3BhdGNoIiwibmV4dCIsImNoaWxkcmVuIiwidHlwZSIsInBheWxvYWQiLCJDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCIsInVwc2VydCIsIm5hbWUiLCJzY29yZSIsInRoZW4iLCJjaGlsZCIsIlNXSVRDSF9DVVJSRU5UX0NISUxEIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImlkIiwiY3VycmVudCIsImlkcyIsImluZGV4T2YiLCJSRURVQ0VSIiwiX2lkIiwiU3VwZXJEYWRkeSIsInByb3BzIiwiY2hpbGROYW1lIiwiY2hpbGRQaG90byIsInBob3RvIiwicm91dGVzIiwicm91dGVyIiwiY29udGV4dCIsImNvbnRleHR1YWxTdHlsZSIsImZvbnRTaXplIiwiYSIsImNvbnRleHR1YWwiLCJkaXNwbGF5IiwiekluZGV4IiwibGFiZWwiLCJhY3Rpb24iLCJsaW5rIiwiaWNvbiIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIlNldHRpbmdVSSIsIlNldHRpbmciLCJQcm9maWxlVUkiLCJQcm9maWxlIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlbmRlciIsImJhYmllcyIsInBhcmFtcyIsImluZm8iLCJpc0N1cnJlbnQiLCJ1aSIsImtub3dsZWRnZSIsIkNyZWF0YWJsZSIsImRvY3giLCJzZWxlY3RlZERvY3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBbUhBOzs7O0FBQ0E7Ozs7QUFD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RUFBZixDQUFWO0FBQ0EsUUFBSW1DLE9BQUssc0JBQVF2QyxLQUFSLEVBQWMsTUFBZCxFQUFxQixPQUFyQixFQUE2QixJQUE3QixFQUFrQyxRQUFsQyxDQUFUO0FBQ0F1QyxTQUFLQyxTQUFMLEdBQWV4QyxTQUFPLCtCQUFnQkcsS0FBaEIsQ0FBdEI7QUFDQSxXQUFPb0MsSUFBUDtBQUNBLElBTFUsaUJBRFo7QUFIRCxFQVpHO0FBd0JILHFEQUFPLE1BQUssTUFBWixFQUFtQiwrQkFBbkIsR0F4Qkc7QUEwQko7QUFBQTtBQUFBLElBQU8sTUFBSyxXQUFaO0FBQ0MsMkRBQVksWUFBWSxLQUF4QjtBQUNDLGNBQVcseUJBQVE7QUFBQSxXQUFPcEMsTUFBTXNDLEVBQU4sQ0FBU0MsU0FBaEI7QUFBQSxJQUFSLEVBQW1DLHFCQUFhQyxTQUFoRCxDQURaLEdBREQ7QUFJQyxzREFBTyxNQUFLLFFBQVo7QUFDQyxlQUFZLEtBRGIsRUFDb0IsV0FBVyx5QkFBUTtBQUFBLFdBQVEsRUFBQ0MsTUFBS3pDLE1BQU1zQyxFQUFOLENBQVNDLFNBQVQsQ0FBbUJHLFlBQXpCLEVBQVI7QUFBQSxJQUFSLHlCQUQvQixHQUpEO0FBT0Msc0RBQU8sTUFBSyxNQUFaLEVBQW1CLDhCQUFuQjtBQVBEO0FBMUJJLENBRFUsRUE2RGIsbUNBQ0VqRSxNQURGLEVBQ1U0QixPQURWLEdBRUMsRUFBQ2lDLElBQUksc0NBQXdCLEVBQUNDLFdBQVUscUJBQWFsQyxPQUF4QixFQUF4QixDQUFMLEVBRkQsQ0E3RGEsQ0FBZjs7QUFvRUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFFpbGlBcHAsIFVJLCBFTlRJVElFUywgY29tcGFjdCwgZW5oYW5jZWRDb21iaW5lUmVkdWNlcnN9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge25vcm1hbGl6ZSxhcnJheU9mfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jb25zdCBET01BSU49J3N1cGVyZGFkZHknXG5cbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9GQU1JTFk6ICgpPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbCAmJiBhbGwubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRsZXQgbmV4dFxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbilcblx0XHRcdFx0XHRuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblxuXHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpuZXh0fSlcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGRyZW5baWRdfSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW25leHRdfSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e2NvbnRleHR1YWxTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU1dJVENIX0NVUlJFTlRfQ0hJTEQoKSl9PlxuXHRcdFx0XHRcdHtjaGlsZFBob3RvID8gKDxBdmF0YXIgc3JjPXtjaGlsZFBob3RvfS8+KSA6IGNoaWxkTmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLml7bpl7TnrqHnkIZcIiwgYWN0aW9uOlwidGltZVwiLFxuXHRcdFx0XHRcdFx0XHRsaW5rOlwiL3RpbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uVGFzay8+fSxcbi8qXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9zY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuKi9cblx0XHRcdFx0XHRcdHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG5cdFx0XHRcdFx0XHRcdGxpbms6Jy9rbm93bGVkZ2UnLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcblxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazonL215JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uQWNjb3VudC8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvUWlsaUFwcD5cbiAgICAgICAgKVxuXHR9XG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxuXHR9XG59XG5cbi8qXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcbmltcG9ydCBJbnZpdGVVSSBmcm9tIFwiLi9pbnZpdGVcIlxuKi9cblxuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5cbmltcG9ydCBUaW1lTWFuYWdlVUkgZnJvbSBcIi4vdGltZS1tYW5hZ2VcIlxuXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmNvbnN0IHtTZXR0aW5nOlNldHRpbmdVSSwgUHJvZmlsZTogUHJvZmlsZVVJfT1VSVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJuYW1lXCIsXCJwaG90b1wiKSkoU3VwZXJEYWRkeSl9PlxuXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoRGFzaGJvYXJkVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGltZVwiIGNvbXBvbmVudD17VGltZU1hbmFnZVVJfS8+XG5cblx0PFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cblx0XHQ8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX1cblx0XHRcdGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+c3RhdGUudWkua25vd2xlZGdlKShLbm93bGVkZ2VzVUkuQ3JlYXRhYmxlKX0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJjcmVhdGVcIlxuXHRcdFx0Y29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17Y29ubmVjdChzdGF0ZT0+KHtkb2N4OnN0YXRlLnVpLmtub3dsZWRnZS5zZWxlY3RlZERvY3h9KSkoTmV3S25vd2xlZGdlVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIjpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZVVJfS8+XG5cdDwvUm91dGU+XG5cblx0ey8qXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFzay86X2lkXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17VGFza1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vycyh7a25vd2xlZGdlOktub3dsZWRnZXNVSS5SRURVQ0VSfSl9XG5cdF1cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19