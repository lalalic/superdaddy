"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TaskPad = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _materialUi = require("material-ui");

var _Table = require("material-ui/Table");

var _reactRedux = require("react-redux");

var _colors = require("material-ui/styles/colors");

var _ = require(".");

var _selector = require("../selector");

var _swipeTabs = require("../components/swipe-tabs");

var _swipeTabs2 = _interopRequireDefault(_swipeTabs);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskPad = exports.TaskPad = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state).filter(function (a) {
			return !a.hidden;
		}) };
})(function (props) {
	return _react2.default.createElement(
		_reactResponsive2.default,
		{ maxWidth: 960 },
		function (match) {
			return match ? _react2.default.createElement(TaskPadMobile, props) : _react2.default.createElement(TaskPadWide, props);
		}
	);
});

var DAYS = function DAYS(i) {
	var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "日一二三四五六".split("");
	return i < 7 && a.splice(i, 1, _react2.default.createElement(
		"b",
		null,
		"今天"
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
			primaryText: "任务\\星期",
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
	    others = (0, _objectWithoutProperties3.default)(_ref6, ["todo", "done", "day", "dispatch", "current"]);

	if (done) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.yellow500 }, others));else if (day > current) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(_.ACTION.DONE(todo, day));
		} }, others));
});
var Wrapper = function Wrapper(_ref7) {
	var onKeyboardFocus = _ref7.onKeyboardFocus,
	    others = (0, _objectWithoutProperties3.default)(_ref7, ["onKeyboardFocus"]);
	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBT0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSw0QkFBUSx5QkFBUTtRQUFRLEVBQUMsT0FBTSxvQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsQ0FBbUM7VUFBRyxDQUFDLEVBQUUsTUFBRjtHQUFKLENBQXpDO0NBQVQsQ0FBUixDQUEyRTtRQUMvRjs7SUFBWSxVQUFVLEdBQVYsRUFBWjtFQUVDO1VBQU8sUUFBUSw4QkFBQyxhQUFELEVBQW1CLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQixLQUFqQixDQUF0QztHQUFQOztDQUg4RixDQUFuRjs7QUFRYixJQUFNLE9BQUssU0FBTCxJQUFLLENBQUMsQ0FBRDtLQUFHLHdFQUFFLFVBQVUsS0FBVixDQUFnQixFQUFoQjtRQUF1QixJQUFFLENBQUYsSUFBTyxFQUFFLE1BQUYsQ0FBUyxDQUFULEVBQVcsQ0FBWCxFQUFhOzs7O0VBQWIsQ0FBUCxFQUErQixDQUEvQjtDQUE1QjtBQUNYLElBQU0sYUFBVztBQUNoQixVQUFRLGNBQVI7QUFDQSxRQUFNLEVBQU47QUFDQSxZQUFVLFFBQVY7QUFDQSxZQUFVLEVBQVY7QUFDQSxlQUFhLEVBQWI7Q0FMSztBQU9OLElBQU0sY0FBYSxTQUFiLFdBQWE7dUJBQUU7d0NBQU07S0FBSTt5QkFBVTs0Q0FBUSxJQUFJLElBQUosR0FBVyxNQUFYO3NCQUFvQjtzQ0FBSyxLQUFLLE9BQUw7UUFDekU7OztFQUNDO0FBQ0MsZ0JBQVksUUFBWjtBQUNBLG9CQUNDO0FBQUMsV0FBRDs7SUFDRSxLQUFLLEdBQUwsQ0FBUyxVQUFDLENBQUQsRUFBRyxDQUFIO1lBQU87O1FBQU0sS0FBSyxDQUFMLEVBQVEsT0FBTyxVQUFQLEVBQWQ7TUFBa0MsQ0FBbEM7O0tBQVAsQ0FEWDtJQUREO0dBRkQsQ0FERDtFQVNDLHdEQVREO0VBV0UsTUFBTSxHQUFOLENBQVUsaUJBQTBCLENBQTFCO09BQVUsYUFBUjsyQkFBYzsyQ0FBTTtVQUNoQyxzREFBVSxLQUFLLENBQUw7QUFDVCxpQkFBYSxJQUFiO0FBQ0EscUJBQ0M7QUFBQyxZQUFEOztLQUNDLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFnQixHQUFoQixDQUFvQjthQUNwQjs7U0FBTSxLQUFLLENBQUwsRUFBUSxPQUFPLFVBQVAsRUFBZDtPQUNDLDhCQUFDLFVBQUQ7QUFDQyxjQUFNLElBQU47QUFDQSxjQUFNLENBQUMsQ0FBRCxJQUFJLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBSjtBQUNOLGFBQUssQ0FBTDtBQUNBLGlCQUFTLE9BQVQ7UUFKRCxDQUREOztNQURvQixDQURyQjtLQUREO0lBRkQ7R0FEVSxDQUFWLENBa0JFLE1BbEJGLENBa0JTLFVBQUMsS0FBRCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQWE7QUFDdEIsU0FBTSxJQUFOLENBQVcsQ0FBWCxFQURzQjtBQUV0QixTQUFNLElBQU4sQ0FBVyxxREFBUyxXQUFTLENBQVQsRUFBVCxDQUFYLEVBRnNCO0FBR3RCLFVBQU8sS0FBUCxDQUhzQjtHQUFiLEVBSVIsRUF0QkQsQ0FYRjs7Q0FEa0I7O0FBc0NuQixJQUFNLGdCQUFjLFNBQWQsYUFBYzt5QkFBRTt5Q0FBTTtLQUFJOzJCQUFVOzZDQUFRLElBQUksSUFBSixHQUFXLE1BQVg7d0JBQW9CO3VDQUFLLEtBQUssT0FBTDtLQUN6RTs2QkFBVTtpREFBVSxTQUFTLElBQVQsQ0FBYyxNQUFkLEdBQXFCLFNBQVMsTUFBVCxDQUFnQixNQUFoQixHQUF1QixTQUFTLE9BQVQsQ0FBaUIsTUFBakI7UUFDakU7O0lBQWUsT0FBTyxVQUFRLENBQVI7QUFDckIsU0FBTSxLQUFLLEdBQUwsQ0FBUyxVQUFDLEdBQUQsRUFBSyxDQUFMO1dBQVMsaURBQUssS0FBSyxDQUFMLEVBQVEsT0FBTyxHQUFQLEVBQVksT0FBTyxDQUFQLEVBQXpCO0lBQVQsQ0FBZixFQUREO0VBR0UsS0FBSyxHQUFMLENBQVMsVUFBQyxHQUFELEVBQUssQ0FBTDtVQUNSOztNQUFNLEtBQUssQ0FBTCxFQUFRLE9BQU8sRUFBQyxvQkFBRCxFQUFQLEVBQWQ7SUFFRSxNQUFNLEdBQU4sQ0FBVSxpQkFBeUIsQ0FBekI7U0FBVSxhQUFSOzZCQUFhOzZDQUFNO1lBQzlCLHNEQUFVLEtBQUssQ0FBTDtBQUNULG1CQUFhLElBQWI7QUFDQSxlQUFTO2NBQUcsQ0FBQyxDQUFELElBQUksTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFKLElBQXdCLFdBQVMsQ0FBVCxJQUFjLFNBQVMsU0FBTyxJQUFQLENBQVksSUFBWixFQUFpQixDQUFqQixDQUFULENBQXRDO09BQUg7QUFDVCxvQkFBYyw4QkFBQyxVQUFELElBQVksTUFBTSxJQUFOLEVBQVksTUFBTSxDQUFDLENBQUQsSUFBSSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUosRUFBc0IsS0FBSyxDQUFMLEVBQVEsU0FBUyxPQUFULEVBQTVELENBQWQ7TUFIRDtLQURTLENBRlo7O0dBRFEsQ0FIWDs7Q0FGbUI7QUFxQnBCLGNBQWMsWUFBZCxHQUEyQjtBQUMxQixXQUFTLGlCQUFVLE1BQVY7Q0FEVjs7QUFJQSxJQUFNLGFBQVcsMkJBQVUsaUJBQWtEO0tBQWhEO0tBQUs7S0FBTTtLQUFLO0tBQVU7S0FBWSx1R0FBVTs7QUFDNUUsS0FBRyxJQUFILEVBQ0MsT0FBUSx1RUFBVyw0QkFBdUIsT0FBbEMsQ0FBUixDQURELEtBRUssSUFBRyxNQUFJLE9BQUosRUFDUCxPQUFRLHVFQUFXLDBCQUEyQixPQUF0QyxDQUFSLENBREksS0FHSixPQUFRLHVFQUFXLDZCQUFzQiwrQkFBeUIsU0FBUztVQUFHLFNBQVMsU0FBTyxJQUFQLENBQVksSUFBWixFQUFpQixHQUFqQixDQUFUO0dBQUgsSUFBeUMsT0FBNUcsQ0FBUixDQUhJO0NBSHFCLENBQXJCO0FBUU4sSUFBTSxVQUFRLFNBQVIsT0FBUTtLQUFFO0tBQW1CO1FBQVcsc0NBQVUsTUFBVjtDQUFoQyIsImZpbGUiOiJ0YXNrLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi4vY29tcG9uZW50cy9zd2lwZS10YWJzXCJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKHByb3BzPT4oXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxuXHR7XG5cdFx0bWF0Y2g9Pm1hdGNoID8gPFRhc2tQYWRNb2JpbGUgey4uLnByb3BzfS8+IDogPFRhc2tQYWRXaWRlIHsuLi5wcm9wc30vPlxuXHR9XG5cdDwvTWVkaWFRdWVyeT5cbikpXG5cbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk8NyAmJiBhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcbmNvbnN0IElURU1fU1RZTEU9e1xuXHRkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXG5cdHdpZHRoOjYwLFxuXHR0ZXh0QWxpZ246XCJjZW50ZXJcIixcblx0bWFyZ2luVG9wOjE2LFxuXHRtYXJnaW5Cb3R0b206MTZcbn1cbmNvbnN0IFRhc2tQYWRXaWRlPSgoe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbVxuXHRcdFx0cHJpbWFyeVRleHQ9XCLku7vliqFcXOaYn+acn1wiXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7ZGF5cy5tYXAoKGEsaSk9PjxzcGFuIGtleT17aX0gc3R5bGU9e0lURU1fU1RZTEV9PnthfTwvc3Bhbj4pfVxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0XHQ8RGl2aWRlci8+XG5cblx0XHR7dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9Pihcblx0XHRcdDxMaXN0SXRlbSBrZXk9e2l9XG5cdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdHtbMCwxLDIsMyw0LDUsNl0ubWFwKGE9Pihcblx0XHRcdFx0XHRcdDxzcGFuIGtleT17YX0gc3R5bGU9e0lURU1fU1RZTEV9PlxuXHRcdFx0XHRcdFx0XHQ8VG9kb1N0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdHRvZG89e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0ZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoYSl9XG5cdFx0XHRcdFx0XHRcdFx0ZGF5PXthfVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQ9e2N1cnJlbnR9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0Lz5cblx0XHQpKS5yZWR1Y2UoKHN0YXRlLGEsaSk9Pntcblx0XHRcdHN0YXRlLnB1c2goYSlcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSxbXSl9XG5cdDwvTGlzdD5cbikpXG5cbmNvbnN0IFRhc2tQYWRNb2JpbGU9KHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9LFxuXHR7bXVpVGhlbWUsIG1pbkhlaWdodD1tdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0fSk9Pihcblx0PFN3aXBlYWJsZVRhYnMgaW5kZXg9e2N1cnJlbnQlN31cblx0XHR0YWJzPXtkYXlzLm1hcCgoZGF5LGkpPT48VGFiIGtleT17aX0gbGFiZWw9e2RheX0gdmFsdWU9e2l9Lz4pfT5cblx0XHR7XG5cdFx0XHRkYXlzLm1hcCgoZGF5LGkpPT4oXG5cdFx0XHRcdDxMaXN0IGtleT17aX0gc3R5bGU9e3ttaW5IZWlnaHR9fT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssZG9uZXM9W119LGopPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBrZXk9e2p9XG5cdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+LTE9PWRvbmVzLmluZGV4T2YoaSkgJiYgY3VycmVudD49aSAmJiBkaXNwYXRjaChBQ1RJT04uRE9ORSh0YXNrLGkpKX1cblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0KSlcblx0XHR9XG5cdDwvU3dpcGVhYmxlVGFicz5cbilcblRhc2tQYWRNb2JpbGUuY29udGV4dFR5cGVzPXtcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdFxufVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudCwgLi4ub3RoZXJzfSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ESVNBQkxFRH0gey4uLm90aGVyc30vPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0gaG92ZXJDb2xvcj17Q09MT1JfSE9WRVJ9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9ICB7Li4ub3RoZXJzfS8+KVxufSlcbmNvbnN0IFdyYXBwZXI9KHtvbktleWJvYXJkRm9jdXMsLi4ub3RoZXJzfSk9Pig8c3BhbiB7Li4ub3RoZXJzfS8+KVxuIl19