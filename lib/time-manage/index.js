"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _colors = require("material-ui/styles/colors");

var _appBar = require("../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _core = require("./core");

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAppBar = function MyAppBar(props) {
	return _react2.default.createElement(_materialUi.AppBar, _extends({}, props, { style: { backgroundColor: _colors.cyan300 },
		iconElementLeft: _react2.default.createElement(
			_materialUi.FloatingActionButton,
			{
				mini: true,
				disabled: true,
				style: { fontSize: "xx-small", backgroundColor: _colors.cyan300 }
			},
			"\u6211"
		)
	}));
};

var BabyTimeManage = (0, _core2.default)(_appBar2.default, "baby");
var MyTimeManage = void 0;

var reducer = exports.reducer = function reducer(state, next) {
	var nextState = BabyTimeManage.reducer(state, next);
	if (nextState == state && MyTimeManage) nextState = MyTimeManage.reducer(state, next);
	return nextState;
};

var TimeManage = exports.TimeManage = function TimeManage(_ref, _ref2) {
	var _id = _ref._id;
	var muiTheme = _ref2.muiTheme,
	    _ref2$minHeight = _ref2.minHeight,
	    minHeight = _ref2$minHeight === undefined ? (muiTheme.page.height - muiTheme.appBar.height - muiTheme.footbar.height) / 2 : _ref2$minHeight;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"div",
			{ style: { minHeight: minHeight } },
			_react2.default.createElement(BabyTimeManage, null)
		),
		function () {
			if (!MyTimeManage) MyTimeManage = (0, _core2.default)(MyAppBar, _id);
			return _react2.default.createElement(MyTimeManage);
		}()
	);
};

TimeManage.contextTypes = {
	muiTheme: _react.PropTypes.object
};

exports.default = Object.assign(TimeManage, { reducer: reducer, ScorePad: BabyTimeManage.ScorePad });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJNeUFwcEJhciIsInByb3BzIiwiYmFja2dyb3VuZENvbG9yIiwiZm9udFNpemUiLCJCYWJ5VGltZU1hbmFnZSIsIk15VGltZU1hbmFnZSIsInJlZHVjZXIiLCJzdGF0ZSIsIm5leHQiLCJuZXh0U3RhdGUiLCJUaW1lTWFuYWdlIiwiX2lkIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiLCJPYmplY3QiLCJhc3NpZ24iLCJTY29yZVBhZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxXQUFVLFNBQVZBLFFBQVU7QUFBQSxRQUNmLCtEQUFZQyxLQUFaLElBQW1CLE9BQU8sRUFBQ0MsZ0NBQUQsRUFBMUI7QUFDQyxtQkFDQztBQUFBO0FBQUE7QUFDQyxVQUFNLElBRFA7QUFFQyxjQUFVLElBRlg7QUFHQyxXQUFPLEVBQUNDLFVBQVMsVUFBVixFQUFxQkQsZ0NBQXJCO0FBSFI7QUFBQTtBQUFBO0FBRkYsSUFEZTtBQUFBLENBQWhCOztBQWNBLElBQU1FLGlCQUFlLHNDQUE2QixNQUE3QixDQUFyQjtBQUNBLElBQUlDLHFCQUFKOztBQUdPLElBQU1DLDRCQUFRLFNBQVJBLE9BQVEsQ0FBQ0MsS0FBRCxFQUFPQyxJQUFQLEVBQWM7QUFDbEMsS0FBSUMsWUFBVUwsZUFBZUUsT0FBZixDQUF1QkMsS0FBdkIsRUFBNkJDLElBQTdCLENBQWQ7QUFDQSxLQUFHQyxhQUFXRixLQUFYLElBQW9CRixZQUF2QixFQUNDSSxZQUFVSixhQUFhQyxPQUFiLENBQXFCQyxLQUFyQixFQUEyQkMsSUFBM0IsQ0FBVjtBQUNELFFBQU9DLFNBQVA7QUFDQSxDQUxNOztBQU9BLElBQU1DLGtDQUFXLFNBQVhBLFVBQVc7QUFBQSxLQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxLQUFRQyxRQUFSLFNBQVFBLFFBQVI7QUFBQSw2QkFBa0JDLFNBQWxCO0FBQUEsS0FBa0JBLFNBQWxCLG1DQUE0QixDQUFDRCxTQUFTRSxJQUFULENBQWNDLE1BQWQsR0FBcUJILFNBQVNJLE1BQVQsQ0FBZ0JELE1BQXJDLEdBQTRDSCxTQUFTSyxPQUFULENBQWlCRixNQUE5RCxJQUFzRSxDQUFsRztBQUFBLFFBQ3BCO0FBQUE7QUFBQTtBQUNGO0FBQUE7QUFBQSxLQUFLLE9BQU8sRUFBQ0Ysb0JBQUQsRUFBWjtBQUNDLGlDQUFDLGNBQUQ7QUFERCxHQURFO0FBS0EsY0FBVTtBQUNWLE9BQUcsQ0FBQ1IsWUFBSixFQUNDQSxlQUFhLG9CQUFrQkwsUUFBbEIsRUFBMkJXLEdBQTNCLENBQWI7QUFDRCxVQUFPLGdCQUFNTyxhQUFOLENBQW9CYixZQUFwQixDQUFQO0FBQ0EsR0FKRDtBQUxDLEVBRG9CO0FBQUEsQ0FBakI7O0FBZVBLLFdBQVdTLFlBQVgsR0FBd0I7QUFDdkJQLFdBQVMsaUJBQVVRO0FBREksQ0FBeEI7O2tCQUllQyxPQUFPQyxNQUFQLENBQWNaLFVBQWQsRUFBeUIsRUFBQ0osZ0JBQUQsRUFBU2lCLFVBQVNuQixlQUFlbUIsUUFBakMsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7QXBwQmFyLEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBQYXBlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtjeWFuMzAwIGFzIGJnY30gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5cclxuaW1wb3J0IEJhYnlBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXHJcblxyXG5pbXBvcnQgVGltZU1hbmFnZUNyZWF0b3IgZnJvbSBcIi4vY29yZVwiXHJcblxyXG5jb25zdCBNeUFwcEJhcj0ocHJvcHM9PihcclxuXHQ8QXBwQmFyIHsuLi5wcm9wc30gc3R5bGU9e3tiYWNrZ3JvdW5kQ29sb3I6YmdjfX1cclxuXHRcdGljb25FbGVtZW50TGVmdD17XHJcblx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdG1pbmk9e3RydWV9XHJcblx0XHRcdFx0ZGlzYWJsZWQ9e3RydWV9XHJcblx0XHRcdFx0c3R5bGU9e3tmb250U2l6ZTpcInh4LXNtYWxsXCIsYmFja2dyb3VuZENvbG9yOmJnY319XHJcblx0XHRcdFx0PlxyXG5cdFx0XHRcdOaIkVxyXG5cdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cdFx0fVxyXG5cdFx0Lz5cclxuKSlcclxuXHJcbmNvbnN0IEJhYnlUaW1lTWFuYWdlPVRpbWVNYW5hZ2VDcmVhdG9yKEJhYnlBcHBCYXIsXCJiYWJ5XCIpXHJcbmxldCBNeVRpbWVNYW5hZ2VcclxuXHJcblxyXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGUsbmV4dCk9PntcclxuXHRsZXQgbmV4dFN0YXRlPUJhYnlUaW1lTWFuYWdlLnJlZHVjZXIoc3RhdGUsbmV4dClcclxuXHRpZihuZXh0U3RhdGU9PXN0YXRlICYmIE15VGltZU1hbmFnZSlcclxuXHRcdG5leHRTdGF0ZT1NeVRpbWVNYW5hZ2UucmVkdWNlcihzdGF0ZSxuZXh0KVxyXG5cdHJldHVybiBuZXh0U3RhdGVcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHtfaWR9LHttdWlUaGVtZSwgbWluSGVpZ2h0PShtdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0KS8yfSk9PihcclxuICAgIDxkaXY+XHJcblx0XHQ8ZGl2IHN0eWxlPXt7bWluSGVpZ2h0fX0+XHJcblx0XHRcdDxCYWJ5VGltZU1hbmFnZS8+XHJcblx0XHQ8L2Rpdj5cclxuXHRcdHtcclxuXHRcdFx0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0aWYoIU15VGltZU1hbmFnZSlcclxuXHRcdFx0XHRcdE15VGltZU1hbmFnZT1UaW1lTWFuYWdlQ3JlYXRvcihNeUFwcEJhcixfaWQpXHJcblx0XHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTXlUaW1lTWFuYWdlKVxyXG5cdFx0XHR9KSgpXHJcblx0XHR9XHJcbiAgICA8L2Rpdj5cclxuKVxyXG5cclxuVGltZU1hbmFnZS5jb250ZXh0VHlwZXM9e1xyXG5cdG11aVRoZW1lOlByb3BUeXBlcy5vYmplY3RcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyLFNjb3JlUGFkOkJhYnlUaW1lTWFuYWdlLlNjb3JlUGFkfSlcclxuIl19