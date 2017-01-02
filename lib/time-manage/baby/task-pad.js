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

var _reactRedux = require("react-redux");

var _colors = require("material-ui/styles/colors");

var _ = require(".");

var _swipeTabs = require("../../components/swipe-tabs");

var _swipeTabs2 = _interopRequireDefault(_swipeTabs);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _selector = require("../../selector");

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
	    dispatch = _ref.dispatch,
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
	    dispatch = _ref3.dispatch,
	    _ref3$current = _ref3.current,
	    current = _ref3$current === undefined ? new Date().getDay() : _ref3$current,
	    _ref3$days = _ref3.days,
	    days = _ref3$days === undefined ? DAYS(current) : _ref3$days;
	var muiTheme = _ref4.muiTheme,
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
				{ key: i, style: { minHeight: minHeight } },
				todos.map(function (_ref5, j) {
					var task = _ref5.content,
					    _ref5$dones = _ref5.dones,
					    dones = _ref5$dones === undefined ? [] : _ref5$dones;
					return _react2.default.createElement(_materialUi.ListItem, { key: j,
						primaryText: task,
						onClick: function onClick(e) {
							return -1 == dones.indexOf(i) && current >= i && dispatch(_.ACTION.DONE(task, i));
						},
						leftCheckbox: _react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(i), day: i, current: current })
					});
				})
			);
		})
	);
};
TaskPadMobile.contextTypes = {
	muiTheme: _react.PropTypes.object
};

var TodoStatus = (0, _reactRedux.connect)()(function (_ref6) {
	var todo = _ref6.todo,
	    done = _ref6.done,
	    day = _ref6.day,
	    dispatch = _ref6.dispatch,
	    current = _ref6.current,
	    others = _objectWithoutProperties(_ref6, ["todo", "done", "day", "dispatch", "current"]);

	if (done) return _react2.default.createElement(_mood2.default, _extends({ color: _colors.yellow500 }, others));else if (day > current) return _react2.default.createElement(_mood2.default, _extends({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, _extends({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(_.ACTION.DONE(todo, day));
		} }, others));
});
var Wrapper = function Wrapper(_ref7) {
	var onKeyboardFocus = _ref7.onKeyboardFocus,
	    others = _objectWithoutProperties(_ref7, ["onKeyboardFocus"]);

	return _react2.default.createElement("span", others);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state).filter(function (a) {
			return !a.hidden;
		}) };
})(TaskPad);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L3Rhc2stcGFkLmpzIl0sIm5hbWVzIjpbIlRhc2tQYWQiLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJhIiwic3BsaXQiLCJzcGxpY2UiLCJJVEVNX1NUWUxFIiwiZGlzcGxheSIsIndpZHRoIiwidGV4dEFsaWduIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiVGFza1BhZFdpZGUiLCJ0b2RvcyIsImRpc3BhdGNoIiwiY3VycmVudCIsIkRhdGUiLCJnZXREYXkiLCJkYXlzIiwibWFwIiwidGFzayIsImNvbnRlbnQiLCJkb25lcyIsImluZGV4T2YiLCJyZWR1Y2UiLCJzdGF0ZSIsInB1c2giLCJUYXNrUGFkTW9iaWxlIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImRheSIsImoiLCJET05FIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiVG9kb1N0YXR1cyIsInRvZG8iLCJkb25lIiwib3RoZXJzIiwiV3JhcHBlciIsIm9uS2V5Ym9hcmRGb2N1cyIsImZpbHRlciIsImhpZGRlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQU9BOztBQUNBOzs7O0FBQ0E7Ozs7QUEyRkE7Ozs7OztBQXpGTyxJQUFNQSw0QkFBUyxTQUFUQSxPQUFTO0FBQUEsUUFDckI7QUFBQTtBQUFBLElBQVksVUFBVSxHQUF0QjtBQUVDO0FBQUEsVUFBT0MsUUFBUSw4QkFBQyxhQUFELEVBQW1CQyxLQUFuQixDQUFSLEdBQXNDLDhCQUFDLFdBQUQsRUFBaUJBLEtBQWpCLENBQTdDO0FBQUE7QUFGRCxFQURxQjtBQUFBLENBQWY7O0FBUVAsSUFBTUMsT0FBSyxTQUFMQSxJQUFLLENBQUNDLENBQUQ7QUFBQSxLQUFHQyxDQUFILHVFQUFLLFVBQVVDLEtBQVYsQ0FBZ0IsRUFBaEIsQ0FBTDtBQUFB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QTJDO0FBQUEsS0FBckNQLEdBQXFDLFNBQXJDQSxHQUFxQztBQUFBLEtBQWhDcEIsUUFBZ0MsU0FBaENBLFFBQWdDO0FBQUEsS0FBdEJDLE9BQXNCLFNBQXRCQSxPQUFzQjtBQUFBLEtBQVYyQixNQUFVOztBQUM1RSxLQUFHRCxJQUFILEVBQ0MsT0FBUSx5REFBVyx3QkFBWCxJQUFrQ0MsTUFBbEMsRUFBUixDQURELEtBRUssSUFBR1IsTUFBSW5CLE9BQVAsRUFDSixPQUFRLHlEQUFXLHNCQUFYLElBQXNDMkIsTUFBdEMsRUFBUixDQURJLEtBR0osT0FBUSx5REFBVywyQkFBWCxFQUFpQyw2QkFBakMsRUFBMEQsU0FBUztBQUFBLFVBQUc1QixTQUFTLFNBQU9zQixJQUFQLENBQVlJLElBQVosRUFBaUJOLEdBQWpCLENBQVQsQ0FBSDtBQUFBLEdBQW5FLElBQTRHUSxNQUE1RyxFQUFSO0FBQ0QsQ0FQZ0IsQ0FBakI7QUFRQSxJQUFNQyxVQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxlQUFGLFNBQUVBLGVBQUY7QUFBQSxLQUFxQkYsTUFBckI7O0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkOztrQkFHZSx5QkFBUTtBQUFBLFFBQVEsRUFBQzdCLE9BQU0sb0NBQXFCWSxLQUFyQixFQUE0Qm9CLE1BQTVCLENBQW1DO0FBQUEsVUFBRyxDQUFDMUMsRUFBRTJDLE1BQU47QUFBQSxHQUFuQyxDQUFQLEVBQVI7QUFBQSxDQUFSLEVBQTJFaEQsT0FBM0UsQyIsImZpbGUiOiJ0YXNrLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCBTd2lwZWFibGVUYWJzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3N3aXBlLXRhYnNcIlxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcblxuZXhwb3J0IGNvbnN0IFRhc2tQYWQ9KHByb3BzPT4oXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxuXHR7XG5cdFx0bWF0Y2g9Pm1hdGNoID8gPFRhc2tQYWRNb2JpbGUgey4uLnByb3BzfS8+IDogPFRhc2tQYWRXaWRlIHsuLi5wcm9wc30vPlxuXHR9XG5cdDwvTWVkaWFRdWVyeT5cbikpXG5cbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk8NyAmJiBhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcbmNvbnN0IElURU1fU1RZTEU9e1xuXHRkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXG5cdHdpZHRoOjYwLFxuXHR0ZXh0QWxpZ246XCJjZW50ZXJcIixcblx0bWFyZ2luVG9wOjE2LFxuXHRtYXJnaW5Cb3R0b206MTZcbn1cbmNvbnN0IFRhc2tQYWRXaWRlPSgoe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbVxuXHRcdFx0cHJpbWFyeVRleHQ9XCLku7vliqFcXOaYn+acn1wiXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7ZGF5cy5tYXAoKGEsaSk9PjxzcGFuIGtleT17aX0gc3R5bGU9e0lURU1fU1RZTEV9PnthfTwvc3Bhbj4pfVxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0XHQ8RGl2aWRlci8+XG5cblx0XHR7dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9Pihcblx0XHRcdDxMaXN0SXRlbSBrZXk9e2l9XG5cdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdHtbMCwxLDIsMyw0LDUsNl0ubWFwKGE9Pihcblx0XHRcdFx0XHRcdDxzcGFuIGtleT17YX0gc3R5bGU9e0lURU1fU1RZTEV9PlxuXHRcdFx0XHRcdFx0XHQ8VG9kb1N0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdHRvZG89e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0ZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoYSl9XG5cdFx0XHRcdFx0XHRcdFx0ZGF5PXthfVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQ9e2N1cnJlbnR9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0Lz5cblx0XHQpKS5yZWR1Y2UoKHN0YXRlLGEsaSk9Pntcblx0XHRcdHN0YXRlLnB1c2goYSlcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSxbXSl9XG5cdDwvTGlzdD5cbikpXG5cbmNvbnN0IFRhc2tQYWRNb2JpbGU9KHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9LFxuXHR7bXVpVGhlbWUsIG1pbkhlaWdodD1tdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0fSk9Pihcblx0PFN3aXBlYWJsZVRhYnMgaW5kZXg9e2N1cnJlbnQlN31cblx0XHR0YWJzPXtkYXlzLm1hcCgoZGF5LGkpPT48VGFiIGtleT17aX0gbGFiZWw9e2RheX0gdmFsdWU9e2l9Lz4pfT5cblx0XHR7XG5cdFx0XHRkYXlzLm1hcCgoZGF5LGkpPT4oXG5cdFx0XHRcdDxMaXN0IGtleT17aX0gc3R5bGU9e3ttaW5IZWlnaHR9fT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssZG9uZXM9W119LGopPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBrZXk9e2p9XG5cdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+LTE9PWRvbmVzLmluZGV4T2YoaSkgJiYgY3VycmVudD49aSAmJiBkaXNwYXRjaChBQ1RJT04uRE9ORSh0YXNrLGkpKX1cblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0KSlcblx0XHR9XG5cdDwvU3dpcGVhYmxlVGFicz5cbilcblRhc2tQYWRNb2JpbGUuY29udGV4dFR5cGVzPXtcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdFxufVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudCwgLi4ub3RoZXJzfSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ESVNBQkxFRH0gey4uLm90aGVyc30vPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0gaG92ZXJDb2xvcj17Q09MT1JfSE9WRVJ9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9ICB7Li4ub3RoZXJzfS8+KVxufSlcbmNvbnN0IFdyYXBwZXI9KHtvbktleWJvYXJkRm9jdXMsLi4ub3RoZXJzfSk9Pig8c3BhbiB7Li4ub3RoZXJzfS8+KVxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZFRhc2tzfSBmcm9tIFwiLi4vLi4vc2VsZWN0b3JcIlxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkoVGFza1BhZClcbiJdfQ==