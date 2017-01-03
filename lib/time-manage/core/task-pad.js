"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TaskPad = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _materialUi = require("material-ui");

var _Table = require("material-ui/Table");

var _colors = require("material-ui/styles/colors");

var _swipeTabs = require("../../components/swipe-tabs");

var _swipeTabs2 = _interopRequireDefault(_swipeTabs);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TaskPad = exports.TaskPad = function TaskPad(props) {
	return _react2.default.createElement(
		_reactResponsive2.default,
		{ maxWidth: 960 },
		function (match) {
			return match ? _react2.default.createElement(TaskPadMobile, props) : _react2.default.createElement(TaskPadWide, props);
		}
	);
};

var DAYS = function DAYS(i) {
	var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "日一二三四五六".split("");
	return i < 7 && a.splice(i, 1, _react2.default.createElement(
		"b",
		null,
		"\u4ECA\u5929"
	)), a;
};
var ITEM_STYLE = {
	display: "inline-block",
	width: 60,
	textAlign: "center",
	marginTop: 16,
	marginBottom: 16
};
var TaskPadWide = function TaskPadWide(_ref) {
	var _ref$todos = _ref.todos,
	    todos = _ref$todos === undefined ? [] : _ref$todos,
	    _ref$current = _ref.current,
	    current = _ref$current === undefined ? new Date().getDay() : _ref$current,
	    _ref$days = _ref.days,
	    days = _ref$days === undefined ? DAYS(current) : _ref$days;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, {
			primaryText: "\u4EFB\u52A1\\\u661F\u671F",
			rightIconButton: _react2.default.createElement(
				Wrapper,
				null,
				days.map(function (a, i) {
					return _react2.default.createElement(
						"span",
						{ key: i, style: ITEM_STYLE },
						a
					);
				})
			)
		}),
		_react2.default.createElement(_materialUi.Divider, null),
		todos.map(function (_ref2, i) {
			var task = _ref2.content,
			    _ref2$dones = _ref2.dones,
			    dones = _ref2$dones === undefined ? [] : _ref2$dones;
			return _react2.default.createElement(_materialUi.ListItem, { key: i,
				primaryText: task,
				rightIconButton: _react2.default.createElement(
					Wrapper,
					null,
					[0, 1, 2, 3, 4, 5, 6].map(function (a) {
						return _react2.default.createElement(
							"span",
							{ key: a, style: ITEM_STYLE },
							_react2.default.createElement(TodoStatus, {
								todo: task,
								done: -1 != dones.indexOf(a),
								day: a,
								current: current
							})
						);
					})
				)
			});
		}).reduce(function (state, a, i) {
			state.push(a);
			state.push(_react2.default.createElement(_materialUi.Divider, { key: "_" + i }));
			return state;
		}, [])
	);
};

var TaskPadMobile = function TaskPadMobile(_ref3, _ref4) {
	var _ref3$todos = _ref3.todos,
	    todos = _ref3$todos === undefined ? [] : _ref3$todos,
	    _ref3$current = _ref3.current,
	    current = _ref3$current === undefined ? new Date().getDay() : _ref3$current,
	    _ref3$days = _ref3.days,
	    days = _ref3$days === undefined ? DAYS(current) : _ref3$days;
	var dispatch = _ref4.dispatch,
	    ACTION = _ref4.ACTION,
	    muiTheme = _ref4.muiTheme,
	    _ref4$minHeight = _ref4.minHeight,
	    minHeight = _ref4$minHeight === undefined ? muiTheme.page.height - muiTheme.appBar.height - muiTheme.footbar.height : _ref4$minHeight;
	return _react2.default.createElement(
		_swipeTabs2.default,
		{ index: current % 7,
			tabs: days.map(function (day, i) {
				return _react2.default.createElement(_materialUi.Tab, { key: i, label: day, value: i });
			}) },
		days.map(function (day, i) {
			return _react2.default.createElement(
				_materialUi.List,
				{ key: i, style: { minHeight: minHeight * 3 / 4 } },
				todos.map(function (_ref5, j) {
					var task = _ref5.content,
					    _ref5$dones = _ref5.dones,
					    dones = _ref5$dones === undefined ? [] : _ref5$dones;
					return _react2.default.createElement(_materialUi.ListItem, { key: j,
						primaryText: task,
						onClick: function onClick(e) {
							return -1 == dones.indexOf(i) && current >= i && dispatch(ACTION.DONE(task, i));
						},
						leftCheckbox: _react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(i), day: i, current: current })
					});
				})
			);
		})
	);
};
TaskPadMobile.contextTypes = {
	muiTheme: _react.PropTypes.object,
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};

var TodoStatus = function TodoStatus(_ref6, _ref7) {
	var dispatch = _ref7.dispatch,
	    ACTION = _ref7.ACTION;

	var todo = _ref6.todo,
	    done = _ref6.done,
	    day = _ref6.day,
	    current = _ref6.current,
	    others = _objectWithoutProperties(_ref6, ["todo", "done", "day", "current"]);

	if (done) return _react2.default.createElement(_mood2.default, _extends({ color: _colors.yellow500 }, others));else if (day > current) return _react2.default.createElement(_mood2.default, _extends({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, _extends({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} }, others));
};

TodoStatus.contextTypes = {
	ACTION: _react.PropTypes.object,
	dispatch: _react.PropTypes.func
};
var Wrapper = function Wrapper(_ref8) {
	var onKeyboardFocus = _ref8.onKeyboardFocus,
	    others = _objectWithoutProperties(_ref8, ["onKeyboardFocus"]);

	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Rhc2stcGFkLmpzIl0sIm5hbWVzIjpbIlRhc2tQYWQiLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJhIiwic3BsaXQiLCJzcGxpY2UiLCJJVEVNX1NUWUxFIiwiZGlzcGxheSIsIndpZHRoIiwidGV4dEFsaWduIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiVGFza1BhZFdpZGUiLCJ0b2RvcyIsImN1cnJlbnQiLCJEYXRlIiwiZ2V0RGF5IiwiZGF5cyIsIm1hcCIsInRhc2siLCJjb250ZW50IiwiZG9uZXMiLCJpbmRleE9mIiwicmVkdWNlIiwic3RhdGUiLCJwdXNoIiwiVGFza1BhZE1vYmlsZSIsImRpc3BhdGNoIiwiQUNUSU9OIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImRheSIsImoiLCJET05FIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIlRvZG9TdGF0dXMiLCJ0b2RvIiwiZG9uZSIsIm90aGVycyIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFPQTs7OztBQUNBOzs7Ozs7OztBQUVPLElBQU1BLDRCQUFTLFNBQVRBLE9BQVM7QUFBQSxRQUNyQjtBQUFBO0FBQUEsSUFBWSxVQUFVLEdBQXRCO0FBRUM7QUFBQSxVQUFPQyxRQUFRLDhCQUFDLGFBQUQsRUFBbUJDLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQkEsS0FBakIsQ0FBN0M7QUFBQTtBQUZELEVBRHFCO0FBQUEsQ0FBZjs7QUFRUCxJQUFNQyxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsQ0FBRDtBQUFBLEtBQUdDLENBQUgsdUVBQUssVUFBVUMsS0FBVixDQUFnQixFQUFoQixDQUFMO0FBQUEsUUFBNEJGLElBQUUsQ0FBRixJQUFP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UUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUFBLEtBQXhEYyxJQUF3RCxTQUF4REEsSUFBd0Q7QUFBQSxLQUFuREMsSUFBbUQsU0FBbkRBLElBQW1EO0FBQUEsS0FBN0NSLEdBQTZDLFNBQTdDQSxHQUE2QztBQUFBLEtBQXhDckIsT0FBd0MsU0FBeENBLE9BQXdDO0FBQUEsS0FBNUI4QixNQUE0Qjs7QUFDMUUsS0FBR0QsSUFBSCxFQUNDLE9BQVEseURBQVcsd0JBQVgsSUFBa0NDLE1BQWxDLEVBQVIsQ0FERCxLQUVLLElBQUdULE1BQUlyQixPQUFQLEVBQ0osT0FBUSx5REFBVyxzQkFBWCxJQUFzQzhCLE1BQXRDLEVBQVIsQ0FESSxLQUdKLE9BQVEseURBQVcsMkJBQVgsRUFBaUMsNkJBQWpDLEVBQTBELFNBQVM7QUFBQSxVQUFHakIsU0FBU0MsT0FBT1MsSUFBUCxDQUFZSyxJQUFaLEVBQWlCUCxHQUFqQixDQUFULENBQUg7QUFBQSxHQUFuRSxJQUE0R1MsTUFBNUcsRUFBUjtBQUNELENBUEQ7O0FBU0FILFdBQVdILFlBQVgsR0FBd0I7QUFDdkJWLFNBQVEsaUJBQVVXLE1BREs7QUFFdkJaLFdBQVUsaUJBQVVhO0FBRkcsQ0FBeEI7QUFJQSxJQUFNSyxVQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxlQUFGLFNBQUVBLGVBQUY7QUFBQSxLQUFxQkYsTUFBckI7O0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkIiwiZmlsZSI6InRhc2stcGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcclxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXHJcblxyXG5pbXBvcnQge1xyXG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXHJcblx0LHllbGxvdzIwMCBhcyBDT0xPUl9IT1ZFUlxyXG5cdCxsaWdodEJsdWUxMDAgYXMgQ09MT1JfRU5BQkxFRFxyXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXHJcbn0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxyXG5cclxuaW1wb3J0IFN3aXBlYWJsZVRhYnMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvc3dpcGUtdGFic1wiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcblxyXG5leHBvcnQgY29uc3QgVGFza1BhZD0ocHJvcHM9PihcclxuXHQ8TWVkaWFRdWVyeSBtYXhXaWR0aD17OTYwfT5cclxuXHR7XHJcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XHJcblx0fVxyXG5cdDwvTWVkaWFRdWVyeT5cclxuKSlcclxuXHJcbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk8NyAmJiBhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcclxuY29uc3QgSVRFTV9TVFlMRT17XHJcblx0ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFxyXG5cdHdpZHRoOjYwLFxyXG5cdHRleHRBbGlnbjpcImNlbnRlclwiLFxyXG5cdG1hcmdpblRvcDoxNixcclxuXHRtYXJnaW5Cb3R0b206MTZcclxufVxyXG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSxjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSk9PihcclxuXHQ8TGlzdD5cclxuXHRcdDxMaXN0SXRlbVxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIuS7u+WKoVxc5pif5pyfXCJcclxuXHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcclxuXHRcdFx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0XHRcdHtkYXlzLm1hcCgoYSxpKT0+PHNwYW4ga2V5PXtpfSBzdHlsZT17SVRFTV9TVFlMRX0+e2F9PC9zcGFuPil9XHJcblx0XHRcdFx0PC9XcmFwcGVyPlxyXG5cdFx0XHR9XHJcblx0XHQvPlxyXG5cdFx0PERpdmlkZXIvPlxyXG5cclxuXHRcdHt0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdfSxpKT0+KFxyXG5cdFx0XHQ8TGlzdEl0ZW0ga2V5PXtpfVxyXG5cdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxyXG5cdFx0XHRcdHJpZ2h0SWNvbkJ1dHRvbj17XHJcblx0XHRcdFx0XHQ8V3JhcHBlcj5cclxuXHRcdFx0XHRcdHtbMCwxLDIsMyw0LDUsNl0ubWFwKGE9PihcclxuXHRcdFx0XHRcdFx0PHNwYW4ga2V5PXthfSBzdHlsZT17SVRFTV9TVFlMRX0+XHJcblx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXNcclxuXHRcdFx0XHRcdFx0XHRcdHRvZG89e3Rhc2t9XHJcblx0XHRcdFx0XHRcdFx0XHRkb25lPXstMSE9ZG9uZXMuaW5kZXhPZihhKX1cclxuXHRcdFx0XHRcdFx0XHRcdGRheT17YX1cclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQ9e2N1cnJlbnR9XHJcblx0XHRcdFx0XHRcdFx0XHQvPlxyXG5cdFx0XHRcdFx0XHQ8L3NwYW4+XHJcblx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvV3JhcHBlcj5cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Lz5cclxuXHRcdCkpLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xyXG5cdFx0XHRzdGF0ZS5wdXNoKGEpXHJcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0sW10pfVxyXG5cdDwvTGlzdD5cclxuKSlcclxuXHJcbmNvbnN0IFRhc2tQYWRNb2JpbGU9KHt0b2Rvcz1bXSxjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSxcclxuXHR7ZGlzcGF0Y2gsQUNUSU9OLG11aVRoZW1lLCBtaW5IZWlnaHQ9bXVpVGhlbWUucGFnZS5oZWlnaHQtbXVpVGhlbWUuYXBwQmFyLmhlaWdodC1tdWlUaGVtZS5mb290YmFyLmhlaWdodH0pPT4oXHJcblx0PFN3aXBlYWJsZVRhYnMgaW5kZXg9e2N1cnJlbnQlN31cclxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxyXG5cdFx0e1xyXG5cdFx0XHRkYXlzLm1hcCgoZGF5LGkpPT4oXHJcblx0XHRcdFx0PExpc3Qga2V5PXtpfSBzdHlsZT17e21pbkhlaWdodDptaW5IZWlnaHQqMy80fX0+XHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzayxkb25lcz1bXX0saik9PihcclxuXHRcdFx0XHRcdFx0XHQ8TGlzdEl0ZW0ga2V5PXtqfVxyXG5cdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XHJcblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT4tMT09ZG9uZXMuaW5kZXhPZihpKSAmJiBjdXJyZW50Pj1pICYmIGRpc3BhdGNoKEFDVElPTi5ET05FKHRhc2ssaSkpfVxyXG5cdFx0XHRcdFx0XHRcdFx0bGVmdENoZWNrYm94PXs8VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZihpKX0gZGF5PXtpfSBjdXJyZW50PXtjdXJyZW50fS8+fVxyXG5cdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdCkpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9MaXN0PlxyXG5cdFx0XHQpKVxyXG5cdFx0fVxyXG5cdDwvU3dpcGVhYmxlVGFicz5cclxuKVxyXG5UYXNrUGFkTW9iaWxlLmNvbnRleHRUeXBlcz17XHJcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdCxcclxuXHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXHJcblx0ZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jXHJcbn1cclxuXHJcbmNvbnN0IFRvZG9TdGF0dXM9KHt0b2RvLGRvbmUsIGRheSwgY3VycmVudCwgLi4ub3RoZXJzfSx7ZGlzcGF0Y2gsQUNUSU9OfSk9PntcclxuXHRpZihkb25lKVxyXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ET05FfSB7Li4ub3RoZXJzfS8+KVxyXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXHJcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RJU0FCTEVEfSB7Li4ub3RoZXJzfS8+KVxyXG5cdGVsc2VcclxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0gaG92ZXJDb2xvcj17Q09MT1JfSE9WRVJ9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9ICB7Li4ub3RoZXJzfS8+KVxyXG59XHJcblxyXG5Ub2RvU3RhdHVzLmNvbnRleHRUeXBlcz17XHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxyXG5cdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG59XHJcbmNvbnN0IFdyYXBwZXI9KHtvbktleWJvYXJkRm9jdXMsLi4ub3RoZXJzfSk9Pig8c3BhbiB7Li4ub3RoZXJzfS8+KVxyXG4iXX0=