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
	var state = arguments.length <= 0 || arguments[0] === undefined ? INIT_STATE : arguments[0];
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
		return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(SuperDaddy).apply(this, arguments));
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
		var a = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
//# sourceMappingURL=data:application/json;base64,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ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTLCBjb21wYWN0LCBlbmhhbmNlZENvbWJpbmVSZWR1Y2Vyc30gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7bm9ybWFsaXplLGFycmF5T2Z9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5jb25zdCB7RW1wdHksIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cbmNvbnN0IERPTUFJTj0nc3VwZXJkYWRkeSdcbmNvbnN0IElOSVRfU1RBVEU9e31cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRGRVRDSF9GQU1JTFk6ICgpPT5kaXNwYXRjaD0+RmFtaWx5LmZpbmQoKVxuXHRcdC5mZXRjaChhbGw9Pntcblx0XHRcdGlmKGFsbCAmJiBhbGwubGVuZ3RoKXtcblx0XHRcdFx0bGV0IGVudGl0aWVzPW5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXNcblx0XHRcdFx0ZGlzcGF0Y2goRU5USVRJRVMoZW50aXRpZXMpKVxuXHRcdFx0XHRsZXQgbmV4dFxuXHRcdFx0XHRpZihlbnRpdGllcy5jaGlsZHJlbilcblx0XHRcdFx0XHRuZXh0PWVudGl0aWVzLmNoaWxkcmVuW09iamVjdC5rZXlzKGVudGl0aWVzLmNoaWxkcmVuKVswXV1cblxuXHRcdFx0XHRpZihuZXh0KVxuXHRcdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpuZXh0fSlcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIixzY29yZTowfSlcblx0XHRcdC50aGVuKGNoaWxkPT57XG5cdFx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShjaGlsZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpXG5cdFx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZH0pXG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogaWQ9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRpZihpZCl7XG5cdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGRyZW5baWRdfSlcblx0XHR9ZWxzZXtcblx0XHRcdGNvbnN0IGN1cnJlbnQ9c3RhdGVbRE9NQUlOXS5jaGlsZFxuXHRcdFx0Y29uc3QgaWRzPU9iamVjdC5rZXlzKGNoaWxkcmVuKVxuXHRcdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdFx0ZGlzcGF0Y2goe3R5cGU6J0NVUlJFTlRfQ0hJTERfQ0hBTkdFJyxwYXlsb2FkOmNoaWxkcmVuW25leHRdfSlcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge25hbWU6Y2hpbGROYW1lLCBwaG90bzpjaGlsZFBob3RvLCBjaGlsZHJlbiwgcm91dGVzLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdGNvbnN0IHtyb3V0ZXJ9PXRoaXMuY29udGV4dFxuXHRcdGxldCBjb250ZXh0dWFsU3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn1cblx0XHRpZihyb3V0ZXMuZmluZChhPT5hLmNvbnRleHR1YWw9PT1mYWxzZSkpXG5cdFx0XHRjb250ZXh0dWFsU3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFFpbGlBcHAgYXBwSWQ9XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIlxuXHRcdFx0XHRpbml0PXthPT57XG5cdFx0XHRcdFx0XHRpbml0KClcblx0XHRcdFx0XHRcdGRpc3BhdGNoKEFDVElPTi5GRVRDSF9GQU1JTFkoKSlcblx0XHRcdFx0fX0+XG5cblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdFx0c3R5bGU9e2NvbnRleHR1YWxTdHlsZX1cblx0XHRcdFx0XHRvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uU1dJVENIX0NVUlJFTlRfQ0hJTEQoKSl9PlxuXHRcdFx0XHRcdHtjaGlsZFBob3RvID8gKDxBdmF0YXIgc3JjPXtjaGlsZFBob3RvfS8+KSA6IGNoaWxkTmFtZX1cblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cblxuXHRcdFx0XHR7Y2hpbGRyZW59XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCIgc3R5bGU9e3t6SW5kZXg6MX19XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG4vKlxuXHRcdFx0XHRcdFx0e2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvc2NvcmUnKSxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvblJld2FyZC8+fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9rbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG4qL1xuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiRXCIsIGFjdGlvbjpcIm15XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9teScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25BY2NvdW50Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG5cdH1cblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuLypcbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcbiovXG5pbXBvcnQgRGFzaGJvYXJkVUkgZnJvbSBcIi4vZGFzaGJvYXJkXCJcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5cbmNvbnN0IHtTZXR0aW5nOlNldHRpbmdVSSwgUHJvZmlsZTogUHJvZmlsZVVJfT1VSVxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJuYW1lXCIsXCJwaG90b1wiKSkoU3VwZXJEYWRkeSl9PlxuXG5cdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoRGFzaGJvYXJkVUkpfS8+XG5cblx0XHQ8Um91dGUgcGF0aD1cIm15XCIgY29udGV4dHVhbD17ZmFsc2V9PlxuXHRcdFx0PEluZGV4Um91dGUgY29tcG9uZW50PXtjb25uZWN0KHN0YXRlPT4oe2JhYmllczpPYmplY3QudmFsdWVzKHN0YXRlLmVudGl0aWVzLmNoaWxkcmVuKX0pKShBY2NvdW50VUkpfS8+XG5cblx0XHRcdDxSb3V0ZSBwYXRoPVwic2V0dGluZ1wiIGNvbXBvbmVudD17U2V0dGluZ1VJfSAvPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cInByb2ZpbGVcIiBjb21wb25lbnQ9e1Byb2ZpbGVVSX0vPlxuXHRcdDwvUm91dGU+XG5cblx0XHQ8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0+XG5cdFx0XHQ8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e2Nvbm5lY3QoKShDcmVhdG9yKX0vPlxuXG5cdFx0XHQ8Um91dGUgcGF0aD1cIjppZFwiXG5cdFx0XHRcdGNvbXBvbmVudD17Y29ubmVjdCgoc3RhdGUse3BhcmFtczp7aWR9fSk9Pntcblx0XHRcdFx0XHRsZXQgY2hpbGQ9Z2V0Q2hpbGQoc3RhdGUsaWQpXG5cdFx0XHRcdFx0bGV0IGluZm89Y29tcGFjdChjaGlsZCxcIm5hbWVcIixcInBob3RvXCIsXCJiZFwiLFwiZ2VuZGVyXCIpXG5cdFx0XHRcdFx0aW5mby5pc0N1cnJlbnQ9Y2hpbGQ9PWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRcdFx0XHRyZXR1cm4gaW5mb1xuXHRcdFx0XHR9KShCYWJ5VUkpfS8+XG5cdFx0PC9Sb3V0ZT5cblxuey8qXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VzXCIgbmFtZT1cImtub3dsZWRnZXNcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtLbm93bGVkZ2VzVUkuQ3JlYXRhYmxlfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJhY2NvdW50XCIgIG5hbWU9XCJhY2NvdW50XCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGFzay86X2lkXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17VGFza1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJpbnZpdGVcIiBjb21wb25lbnQ9e0ludml0ZVVJfS8+XG4qL31cbiAgICA8L1JvdXRlPilcblx0LFtcblx0XHR7W0RPTUFJTl06UkVEVUNFUn1cblx0XHQse3VpOiAoYT17fSk9PmF9XG5cdF1cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19