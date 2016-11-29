"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MyAppBar = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _materialUi = require("material-ui");

var _qiliApp = require("qili-app");

var _selector = require("../selector");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAppBar = exports.MyAppBar = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "name", "photo");
})(function (_ref) {
	var photo = _ref.photo,
	    name = _ref.name,
	    dispatch = _ref.dispatch,
	    others = (0, _objectWithoutProperties3.default)(_ref, ["photo", "name", "dispatch"]);
	return _react2.default.createElement(_materialUi.AppBar, (0, _extends3.default)({}, others, {
		iconElementLeft: _react2.default.createElement(
			_materialUi.FloatingActionButton,
			{
				mini: true,
				style: { fontSize: "xx-small" },
				onClick: function onClick(e) {
					return dispatch(_.ACTION.SWITCH_CURRENT_CHILD());
				} },
			photo ? _react2.default.createElement(_materialUi.Avatar, { src: photo }) : name
		)
	}));
});

exports.default = MyAppBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2FwcC1iYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFDQTs7OztBQUVPLElBQU0sOEJBQVMseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixNQUEvQixFQUFzQyxPQUF0QztDQUFQLENBQVIsQ0FBK0Q7S0FBRTtLQUFNO0tBQUs7S0FBWTtRQUM3Ryw2RUFBWTtBQUNYLG1CQUNDOzs7QUFDQyxVQUFNLElBQU47QUFDQSxXQUFPLEVBQUMsVUFBUyxVQUFULEVBQVI7QUFDQSxhQUFTO1lBQUcsU0FBUyxTQUFPLG9CQUFQLEVBQVQ7S0FBSCxFQUhWO0dBSUUsUUFBUyxvREFBUSxLQUFLLEtBQUwsRUFBUixDQUFULEdBQWtDLElBQWxDO0dBTEg7R0FERDtDQURvRixDQUF4RTs7a0JBYUUiLCJmaWxlIjoiYXBwLWJhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXHJcbmltcG9ydCB7QXBwQmFyLEZsb2F0aW5nQWN0aW9uQnV0dG9uLEF2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCB7Y29tcGFjdH0gZnJvbSBcInFpbGktYXBwXCJcclxuXHJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxyXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi4uXCJcclxuXHJcbmV4cG9ydCBjb25zdCBNeUFwcEJhcj1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJuYW1lXCIsXCJwaG90b1wiKSkoKHtwaG90byxuYW1lLGRpc3BhdGNoLC4uLm90aGVyc30pPT4oXHJcblx0PEFwcEJhciB7Li4ub3RoZXJzfVxyXG5cdFx0aWNvbkVsZW1lbnRMZWZ0PXtcclxuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0bWluaT17dHJ1ZX1cclxuXHRcdFx0XHRzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19XHJcblx0XHRcdFx0b25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlNXSVRDSF9DVVJSRU5UX0NISUxEKCkpfT5cclxuXHRcdFx0XHR7cGhvdG8gPyAoPEF2YXRhciBzcmM9e3Bob3RvfS8+KSA6IG5hbWV9XHJcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHR9IFxyXG5cdFx0Lz5cclxuKSlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE15QXBwQmFyXHJcblxyXG4iXX0=