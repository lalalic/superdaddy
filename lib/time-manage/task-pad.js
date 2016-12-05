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
	return i > -1 && a.splice(i, 1, _react2.default.createElement(
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

var TaskPadMobile = function TaskPadMobile(_ref3) {
	var _ref3$todos = _ref3.todos,
	    todos = _ref3$todos === undefined ? [] : _ref3$todos,
	    dispatch = _ref3.dispatch,
	    _ref3$current = _ref3.current,
	    current = _ref3$current === undefined ? new Date().getDay() : _ref3$current,
	    _ref3$days = _ref3.days,
	    days = _ref3$days === undefined ? DAYS(current) : _ref3$days;
	return _react2.default.createElement(
		_swipeTabs2.default,
		{ index: current,
			tabs: days.map(function (day, i) {
				return _react2.default.createElement(_materialUi.Tab, { key: i, label: day, value: i });
			}) },
		days.map(function (day, i) {
			return _react2.default.createElement(
				_materialUi.List,
				{ key: i },
				todos.map(function (_ref4, j) {
					var task = _ref4.content,
					    _ref4$dones = _ref4.dones,
					    dones = _ref4$dones === undefined ? [] : _ref4$dones;
					return _react2.default.createElement(_materialUi.ListItem, { key: j,
						primaryText: task,
						leftCheckbox: _react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(i), day: i, current: current })
					});
				})
			);
		})
	);
};

var TodoStatus = (0, _reactRedux.connect)()(function (_ref5) {
	var todo = _ref5.todo,
	    done = _ref5.done,
	    day = _ref5.day,
	    dispatch = _ref5.dispatch,
	    current = _ref5.current,
	    others = (0, _objectWithoutProperties3.default)(_ref5, ["todo", "done", "day", "dispatch", "current"]);

	if (done) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.yellow500 }, others));else if (current < 0 || day > current) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(_.ACTION.DONE(todo, day));
		} }, others));
});
var Wrapper = function Wrapper(_ref6) {
	var onKeyboardFocus = _ref6.onKeyboardFocus,
	    others = (0, _objectWithoutProperties3.default)(_ref6, ["onKeyboardFocus"]);
	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBT0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTSw0QkFBUSx5QkFBUTtRQUFRLEVBQUMsT0FBTSxvQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsQ0FBbUM7VUFBRyxDQUFDLEVBQUUsTUFBRjtHQUFKLENBQXpDO0NBQVQsQ0FBUixDQUEyRTtRQUMvRjs7SUFBWSxVQUFVLEdBQVYsRUFBWjtFQUVDO1VBQU8sUUFBUSw4QkFBQyxhQUFELEVBQW1CLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQixLQUFqQixDQUF0QztHQUFQOztDQUg4RixDQUFuRjs7QUFRYixJQUFNLE9BQUssU0FBTCxJQUFLLENBQUMsQ0FBRDtLQUFHLHdFQUFFLFVBQVUsS0FBVixDQUFnQixFQUFoQjtRQUF1QixJQUFFLENBQUMsQ0FBRCxJQUFNLEVBQUUsTUFBRixDQUFTLENBQVQsRUFBVyxDQUFYLEVBQWE7Ozs7RUFBYixDQUFSLEVBQWdDLENBQWhDO0NBQTVCO0FBQ1gsSUFBTSxhQUFXO0FBQ2hCLFVBQVEsY0FBUjtBQUNBLFFBQU0sRUFBTjtBQUNBLFlBQVUsUUFBVjtBQUNBLFlBQVUsRUFBVjtBQUNBLGVBQWEsRUFBYjtDQUxLO0FBT04sSUFBTSxjQUFhLFNBQWIsV0FBYTt1QkFBRTt3Q0FBTTtLQUFJO3lCQUFVOzRDQUFRLElBQUksSUFBSixHQUFXLE1BQVg7c0JBQW9CO3NDQUFLLEtBQUssT0FBTDtRQUN6RTs7O0VBQ0M7QUFDQyxnQkFBWSxRQUFaO0FBQ0Esb0JBQ0M7QUFBQyxXQUFEOztJQUNFLEtBQUssR0FBTCxDQUFTLFVBQUMsQ0FBRCxFQUFHLENBQUg7WUFBTzs7UUFBTSxLQUFLLENBQUwsRUFBUSxPQUFPLFVBQVAsRUFBZDtNQUFrQyxDQUFsQzs7S0FBUCxDQURYO0lBREQ7R0FGRCxDQUREO0VBU0Msd0RBVEQ7RUFXRSxNQUFNLEdBQU4sQ0FBVSxpQkFBMEIsQ0FBMUI7T0FBVSxhQUFSOzJCQUFjOzJDQUFNO1VBQ2hDLHNEQUFVLEtBQUssQ0FBTDtBQUNULGlCQUFhLElBQWI7QUFDQSxxQkFDQztBQUFDLFlBQUQ7O0tBQ0MsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWdCLEdBQWhCLENBQW9CO2FBQ3BCOztTQUFNLEtBQUssQ0FBTCxFQUFRLE9BQU8sVUFBUCxFQUFkO09BQ0MsOEJBQUMsVUFBRDtBQUNDLGNBQU0sSUFBTjtBQUNBLGNBQU0sQ0FBQyxDQUFELElBQUksTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFKO0FBQ04sYUFBSyxDQUFMO0FBQ0EsaUJBQVMsT0FBVDtRQUpELENBREQ7O01BRG9CLENBRHJCO0tBREQ7SUFGRDtHQURVLENBQVYsQ0FrQkUsTUFsQkYsQ0FrQlMsVUFBQyxLQUFELEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBYTtBQUN0QixTQUFNLElBQU4sQ0FBVyxDQUFYLEVBRHNCO0FBRXRCLFNBQU0sSUFBTixDQUFXLHFEQUFTLFdBQVMsQ0FBVCxFQUFULENBQVgsRUFGc0I7QUFHdEIsVUFBTyxLQUFQLENBSHNCO0dBQWIsRUFJUixFQXRCRCxDQVhGOztDQURrQjs7QUFzQ25CLElBQU0sZ0JBQWMsU0FBZCxhQUFjO3lCQUFFO3lDQUFNO0tBQUk7MkJBQVU7NkNBQVEsSUFBSSxJQUFKLEdBQVcsTUFBWDt3QkFBb0I7dUNBQUssS0FBSyxPQUFMO1FBQzFFOztJQUFlLE9BQU8sT0FBUDtBQUNkLFNBQU0sS0FBSyxHQUFMLENBQVMsVUFBQyxHQUFELEVBQUssQ0FBTDtXQUFTLGlEQUFLLEtBQUssQ0FBTCxFQUFRLE9BQU8sR0FBUCxFQUFZLE9BQU8sQ0FBUCxFQUF6QjtJQUFULENBQWYsRUFERDtFQUdFLEtBQUssR0FBTCxDQUFTLFVBQUMsR0FBRCxFQUFLLENBQUw7VUFDUjs7TUFBTSxLQUFLLENBQUwsRUFBTjtJQUVFLE1BQU0sR0FBTixDQUFVLGlCQUF5QixDQUF6QjtTQUFVLGFBQVI7NkJBQWE7NkNBQU07WUFDOUIsc0RBQVUsS0FBSyxDQUFMO0FBQ1QsbUJBQWEsSUFBYjtBQUNBLG9CQUFjLDhCQUFDLFVBQUQsSUFBWSxNQUFNLElBQU4sRUFBWSxNQUFNLENBQUMsQ0FBRCxJQUFJLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBSixFQUFzQixLQUFLLENBQUwsRUFBUSxTQUFTLE9BQVQsRUFBNUQsQ0FBZDtNQUZEO0tBRFMsQ0FGWjs7R0FEUSxDQUhYOztDQURtQjs7QUFvQnBCLElBQU0sYUFBVywyQkFBVSxpQkFBa0Q7S0FBaEQ7S0FBSztLQUFNO0tBQUs7S0FBVTtLQUFZLHVHQUFVOztBQUM1RSxLQUFHLElBQUgsRUFDQyxPQUFRLHVFQUFXLDRCQUF1QixPQUFsQyxDQUFSLENBREQsS0FFSyxJQUFHLFVBQVEsQ0FBUixJQUFhLE1BQUksT0FBSixFQUNwQixPQUFRLHVFQUFXLDBCQUEyQixPQUF0QyxDQUFSLENBREksS0FHSixPQUFRLHVFQUFXLDZCQUFzQiwrQkFBeUIsU0FBUztVQUFHLFNBQVMsU0FBTyxJQUFQLENBQVksSUFBWixFQUFpQixHQUFqQixDQUFUO0dBQUgsSUFBeUMsT0FBNUcsQ0FBUixDQUhJO0NBSHFCLENBQXJCO0FBUU4sSUFBTSxVQUFRLFNBQVIsT0FBUTtLQUFFO0tBQW1CO1FBQVcsc0NBQVUsTUFBVjtDQUFoQyIsImZpbGUiOiJ0YXNrLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi4vY29tcG9uZW50cy9zd2lwZS10YWJzXCJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKHByb3BzPT4oXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxuXHR7XG5cdFx0bWF0Y2g9Pm1hdGNoID8gPFRhc2tQYWRNb2JpbGUgey4uLnByb3BzfS8+IDogPFRhc2tQYWRXaWRlIHsuLi5wcm9wc30vPlxuXHR9XG5cdDwvTWVkaWFRdWVyeT5cbikpXG5cbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk+LTEgJiYgYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBJVEVNX1NUWUxFPXtcblx0ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFxuXHR3aWR0aDo2MCxcblx0dGV4dEFsaWduOlwiY2VudGVyXCIsXG5cdG1hcmdpblRvcDoxNixcblx0bWFyZ2luQm90dG9tOjE2XG59XG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuXHQ8TGlzdD5cblx0XHQ8TGlzdEl0ZW1cblx0XHRcdHByaW1hcnlUZXh0PVwi5Lu75YqhXFzmmJ/mnJ9cIlxuXHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0PFdyYXBwZXI+XG5cdFx0XHRcdFx0e2RheXMubWFwKChhLGkpPT48c3BhbiBrZXk9e2l9IHN0eWxlPXtJVEVNX1NUWUxFfT57YX08L3NwYW4+KX1cblx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0fVxuXHRcdC8+XG5cdFx0PERpdmlkZXIvPlxuXG5cdFx0e3RvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG5cdFx0XHQ8TGlzdEl0ZW0ga2V5PXtpfVxuXHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7WzAsMSwyLDMsNCw1LDZdLm1hcChhPT4oXG5cdFx0XHRcdFx0XHQ8c3BhbiBrZXk9e2F9IHN0eWxlPXtJVEVNX1NUWUxFfT5cblx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXNcblx0XHRcdFx0XHRcdFx0XHR0b2RvPXt0YXNrfVxuXHRcdFx0XHRcdFx0XHRcdGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfVxuXHRcdFx0XHRcdFx0XHRcdGRheT17YX1cblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50PXtjdXJyZW50fVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pfVxuXHQ8L0xpc3Q+XG4pKVxuXG5jb25zdCBUYXNrUGFkTW9iaWxlPSh7dG9kb3M9W10sIGRpc3BhdGNoLCBjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSk9Pihcblx0PFN3aXBlYWJsZVRhYnMgaW5kZXg9e2N1cnJlbnR9XG5cdFx0dGFicz17ZGF5cy5tYXAoKGRheSxpKT0+PFRhYiBrZXk9e2l9IGxhYmVsPXtkYXl9IHZhbHVlPXtpfS8+KX0+XG5cdFx0e1xuXHRcdFx0ZGF5cy5tYXAoKGRheSxpKT0+KFxuXHRcdFx0XHQ8TGlzdCBrZXk9e2l9PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzayxkb25lcz1bXX0saik9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIGtleT17an1cblx0XHRcdFx0XHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0KSlcblx0XHR9XG5cdDwvU3dpcGVhYmxlVGFicz5cbilcblxuY29uc3QgVG9kb1N0YXR1cz1jb25uZWN0KCkoKHt0b2RvLGRvbmUsIGRheSwgZGlzcGF0Y2gsIGN1cnJlbnQsIC4uLm90aGVyc30pPT57XG5cdGlmKGRvbmUpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ET05FfSB7Li4ub3RoZXJzfS8+KVxuXHRlbHNlIGlmKGN1cnJlbnQ8MCB8fCBkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RJU0FCTEVEfSB7Li4ub3RoZXJzfS8+KVxuXHRlbHNlXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfSBob3ZlckNvbG9yPXtDT0xPUl9IT1ZFUn0gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0gIHsuLi5vdGhlcnN9Lz4pXG59KVxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXG4iXX0=