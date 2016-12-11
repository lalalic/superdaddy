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
		{ index: current,
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

	if (done) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.yellow500 }, others));else if (current < 0 || day > current) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(_.ACTION.DONE(todo, day));
		} }, others));
});
var Wrapper = function Wrapper(_ref7) {
	var onKeyboardFocus = _ref7.onKeyboardFocus,
	    others = (0, _objectWithoutProperties3.default)(_ref7, ["onKeyboardFocus"]);
	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkIiwidG9kb3MiLCJzdGF0ZSIsImZpbHRlciIsImEiLCJoaWRkZW4iLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJzcGxpdCIsInNwbGljZSIsIklURU1fU1RZTEUiLCJkaXNwbGF5Iiwid2lkdGgiLCJ0ZXh0QWxpZ24iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJUYXNrUGFkV2lkZSIsImRpc3BhdGNoIiwiY3VycmVudCIsIkRhdGUiLCJnZXREYXkiLCJkYXlzIiwibWFwIiwidGFzayIsImNvbnRlbnQiLCJkb25lcyIsImluZGV4T2YiLCJyZWR1Y2UiLCJwdXNoIiwiVGFza1BhZE1vYmlsZSIsIm11aVRoZW1lIiwibWluSGVpZ2h0IiwicGFnZSIsImhlaWdodCIsImFwcEJhciIsImZvb3RiYXIiLCJkYXkiLCJqIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiVG9kb1N0YXR1cyIsInRvZG8iLCJkb25lIiwib3RoZXJzIiwiRE9ORSIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFPQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSw0QkFBUSx5QkFBUTtBQUFBLFFBQVEsRUFBQ0MsT0FBTSxvQ0FBcUJDLEtBQXJCLEVBQTRCQyxNQUE1QixDQUFtQztBQUFBLFVBQUcsQ0FBQ0MsRUFBRUMsTUFBTjtBQUFBLEdBQW5DLENBQVAsRUFBUjtBQUFBLENBQVIsRUFBMkU7QUFBQSxRQUMvRjtBQUFBO0FBQUEsSUFBWSxVQUFVLEdBQXRCO0FBRUM7QUFBQSxVQUFPQyxRQUFRLDhCQUFDLGFBQUQsRUFBbUJDLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQkEsS0FBakIsQ0FBN0M7QUFBQTtBQUZELEVBRCtGO0FBQUEsQ0FBM0UsQ0FBZDs7QUFRUCxJQUFNQyxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsQ0FBRDtBQUFBLEtBQUdMLENBQUgsdUVBQUssVUFBVU0sS0FBVixDQUFnQixFQUFoQixDQUFMO0FBQUEsUUFBNEJELElBQUUsQ0FBQyxDQUFILElBQVFMLEVBQUVPLE1BQUYsQ0FBU0YsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBQWIsQ0FBUixFQUFnQ0wsQ0FBNUQ7QUFBQSxDQUFYO0FBQ0EsSUFBTVEsYUFBVztBQUNoQkMsVUFBUSxjQURRO0FBRWhCQyxRQUFNLEVBRlU7QUFHaEJDLFlBQVUsUUFITTtBQUloQkMsWUFBVSxFQUpNO0FBS2hCQyxlQUFhO0FBTEcsQ0FBakI7QUFPQSxJQUFNQyxjQUFhLFNBQWJBLFdBQWE7QUFBQSx1QkFBRWpCLEtBQUY7QUFBQSxLQUFFQSxLQUFGLDhCQUFRLEVBQVI7QUFBQSxLQUFZa0IsUUFBWixRQUFZQSxRQUFaO0FBQUEseUJBQXNCQyxPQUF0QjtBQUFBLEtBQXNCQSxPQUF0QixnQ0FBOEIsSUFBSUMsSUFBSixHQUFXQyxNQUFYLEVBQTlCO0FBQUEsc0JBQWtEQyxJQUFsRDtBQUFBLEtBQWtEQSxJQUFsRCw2QkFBdURmLEtBQUtZLE9BQUwsQ0FBdkQ7QUFBQSxRQUNsQjtBQUFBO0FBQUE7QUFDQztBQUNDLGdCQUFZLDRCQURiO0FBRUMsb0JBQ0M7QUFBQyxXQUFEO0FBQUE7QUFDRUcsU0FBS0MsR0FBTCxDQUFTLFVBQUNwQixDQUFELEVBQUdLLENBQUg7QUFBQSxZQUFPO0FBQUE7QUFBQSxRQUFNLEtBQUtBLENBQVgsRUFBYyxPQUFPRyxVQUFyQjtBQUFrQ1I7QUFBbEMsTUFBUDtBQUFBLEtBQVQ7QUFERjtBQUhGLElBREQ7QUFTQywwREFURDtBQVdFSCxRQUFNdUIsR0FBTixDQUFVLGlCQUEwQmYsQ0FBMUI7QUFBQSxPQUFVZ0IsSUFBVixTQUFFQyxPQUFGO0FBQUEsMkJBQWdCQyxLQUFoQjtBQUFBLE9BQWdCQSxLQUFoQiwrQkFBc0IsRUFBdEI7QUFBQSxVQUNWLHNEQUFVLEtBQUtsQixDQUFmO0FBQ0MsaUJBQWFnQixJQURkO0FBRUMscUJBQ0M7QUFBQyxZQUFEO0FBQUE7QUFDQyxNQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZ0JELEdBQWhCLENBQW9CO0FBQUEsYUFDcEI7QUFBQTtBQUFBLFNBQU0sS0FBS3BCLENBQVgsRUFBYyxPQUFPUSxVQUFyQjtBQUNDLHFDQUFDLFVBQUQ7QUFDQyxjQUFNYSxJQURQO0FBRUMsY0FBTSxDQUFDLENBQUQsSUFBSUUsTUFBTUMsT0FBTixDQUFjeEIsQ0FBZCxDQUZYO0FBR0MsYUFBS0EsQ0FITjtBQUlDLGlCQUFTZ0I7QUFKVjtBQURELE9BRG9CO0FBQUEsTUFBcEI7QUFERDtBQUhGLEtBRFU7QUFBQSxHQUFWLEVBa0JFUyxNQWxCRixDQWtCUyxVQUFDM0IsS0FBRCxFQUFPRSxDQUFQLEVBQVNLLENBQVQsRUFBYTtBQUN0QlAsU0FBTTRCLElBQU4sQ0FBVzFCLENBQVg7QUFDQUYsU0FBTTRCLElBQU4sQ0FBVyxxREFBUyxXQUFTckIsQ0FBbEIsR0FBWDtBQUNBLFVBQU9QLEtBQVA7QUFDQSxHQXRCQSxFQXNCQyxFQXRCRDtBQVhGLEVBRGtCO0FBQUEsQ0FBbkI7O0FBc0NBLElBQU02QixnQkFBYyxTQUFkQSxhQUFjO0FBQUEseUJBQUU5QixLQUFGO0FBQUEsS0FBRUEsS0FBRiwrQkFBUSxFQUFSO0FBQUEsS0FBWWtCLFFBQVosU0FBWUEsUUFBWjtBQUFBLDJCQUFzQkMsT0FBdEI7QUFBQSxLQUFzQkEsT0FBdEIsaUNBQThCLElBQUlDLElBQUosR0FBV0MsTUFBWCxFQUE5QjtBQUFBLHdCQUFrREMsSUFBbEQ7QUFBQSxLQUFrREEsSUFBbEQsOEJBQXVEZixLQUFLWSxPQUFMLENBQXZEO0FBQUEsS0FDbEJZLFFBRGtCLFNBQ2xCQSxRQURrQjtBQUFBLDZCQUNSQyxTQURRO0FBQUEsS0FDUkEsU0FEUSxtQ0FDRUQsU0FBU0UsSUFBVCxDQUFjQyxNQUFkLEdBQXFCSCxTQUFTSSxNQUFULENBQWdCRCxNQUFyQyxHQUE0Q0gsU0FBU0ssT0FBVCxDQUFpQkYsTUFEL0Q7QUFBQSxRQUVuQjtBQUFBO0FBQUEsSUFBZSxPQUFPZixPQUF0QjtBQUNDLFNBQU1HLEtBQUtDLEdBQUwsQ0FBUyxVQUFDYyxHQUFELEVBQUs3QixDQUFMO0FBQUEsV0FBUyxpREFBSyxLQUFLQSxDQUFWLEVBQWEsT0FBTzZCLEdBQXBCLEVBQXlCLE9BQU83QixDQUFoQyxHQUFUO0FBQUEsSUFBVCxDQURQO0FBR0VjLE9BQUtDLEdBQUwsQ0FBUyxVQUFDYyxHQUFELEVBQUs3QixDQUFMO0FBQUEsVUFDUjtBQUFBO0FBQUEsTUFBTSxLQUFLQSxDQUFYLEVBQWMsT0FBTyxFQUFDd0Isb0JBQUQsRUFBckI7QUFFRWhDLFVBQU11QixHQUFOLENBQVUsaUJBQXlCZSxDQUF6QjtBQUFBLFNBQVVkLElBQVYsU0FBRUMsT0FBRjtBQUFBLDZCQUFlQyxLQUFmO0FBQUEsU0FBZUEsS0FBZiwrQkFBcUIsRUFBckI7QUFBQSxZQUNULHNEQUFVLEtBQUtZLENBQWY7QUFDQyxtQkFBYWQsSUFEZDtBQUVDLG9CQUFjLDhCQUFDLFVBQUQsSUFBWSxNQUFNQSxJQUFsQixFQUF3QixNQUFNLENBQUMsQ0FBRCxJQUFJRSxNQUFNQyxPQUFOLENBQWNuQixDQUFkLENBQWxDLEVBQW9ELEtBQUtBLENBQXpELEVBQTRELFNBQVNXLE9BQXJFO0FBRmYsT0FEUztBQUFBLEtBQVY7QUFGRixJQURRO0FBQUEsR0FBVDtBQUhGLEVBRm1CO0FBQUEsQ0FBcEI7QUFvQkFXLGNBQWNTLFlBQWQsR0FBMkI7QUFDMUJSLFdBQVMsaUJBQVVTO0FBRE8sQ0FBM0I7O0FBSUEsSUFBTUMsYUFBVywyQkFBVSxpQkFBa0Q7QUFBQSxLQUFoREMsSUFBZ0QsU0FBaERBLElBQWdEO0FBQUEsS0FBM0NDLElBQTJDLFNBQTNDQSxJQUEyQztBQUFBLEtBQXJDTixHQUFxQyxTQUFyQ0EsR0FBcUM7QUFBQSxLQUFoQ25CLFFBQWdDLFNBQWhDQSxRQUFnQztBQUFBLEtBQXRCQyxPQUFzQixTQUF0QkEsT0FBc0I7QUFBQSxLQUFWeUIsTUFBVTs7QUFDNUUsS0FBR0QsSUFBSCxFQUNDLE9BQVEsdUVBQVcsd0JBQVgsSUFBa0NDLE1BQWxDLEVBQVIsQ0FERCxLQUVLLElBQUd6QixVQUFRLENBQVIsSUFBYWtCLE1BQUlsQixPQUFwQixFQUNKLE9BQVEsdUVBQVcsc0JBQVgsSUFBc0N5QixNQUF0QyxFQUFSLENBREksS0FHSixPQUFRLHVFQUFXLDJCQUFYLEVBQWlDLDZCQUFqQyxFQUEwRCxTQUFTO0FBQUEsVUFBRzFCLFNBQVMsU0FBTzJCLElBQVAsQ0FBWUgsSUFBWixFQUFpQkwsR0FBakIsQ0FBVCxDQUFIO0FBQUEsR0FBbkUsSUFBNEdPLE1BQTVHLEVBQVI7QUFDRCxDQVBnQixDQUFqQjtBQVFBLElBQU1FLFVBQVEsU0FBUkEsT0FBUTtBQUFBLEtBQUVDLGVBQUYsU0FBRUEsZUFBRjtBQUFBLEtBQXFCSCxNQUFyQjtBQUFBLFFBQWdDLHNDQUFVQSxNQUFWLENBQWhDO0FBQUEsQ0FBZCIsImZpbGUiOiJ0YXNrLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi4vY29tcG9uZW50cy9zd2lwZS10YWJzXCJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKHByb3BzPT4oXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxuXHR7XG5cdFx0bWF0Y2g9Pm1hdGNoID8gPFRhc2tQYWRNb2JpbGUgey4uLnByb3BzfS8+IDogPFRhc2tQYWRXaWRlIHsuLi5wcm9wc30vPlxuXHR9XG5cdDwvTWVkaWFRdWVyeT5cbikpXG5cbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk+LTEgJiYgYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBJVEVNX1NUWUxFPXtcblx0ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFxuXHR3aWR0aDo2MCxcblx0dGV4dEFsaWduOlwiY2VudGVyXCIsXG5cdG1hcmdpblRvcDoxNixcblx0bWFyZ2luQm90dG9tOjE2XG59XG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuXHQ8TGlzdD5cblx0XHQ8TGlzdEl0ZW1cblx0XHRcdHByaW1hcnlUZXh0PVwi5Lu75YqhXFzmmJ/mnJ9cIlxuXHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0PFdyYXBwZXI+XG5cdFx0XHRcdFx0e2RheXMubWFwKChhLGkpPT48c3BhbiBrZXk9e2l9IHN0eWxlPXtJVEVNX1NUWUxFfT57YX08L3NwYW4+KX1cblx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0fVxuXHRcdC8+XG5cdFx0PERpdmlkZXIvPlxuXG5cdFx0e3RvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG5cdFx0XHQ8TGlzdEl0ZW0ga2V5PXtpfVxuXHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7WzAsMSwyLDMsNCw1LDZdLm1hcChhPT4oXG5cdFx0XHRcdFx0XHQ8c3BhbiBrZXk9e2F9IHN0eWxlPXtJVEVNX1NUWUxFfT5cblx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXNcblx0XHRcdFx0XHRcdFx0XHR0b2RvPXt0YXNrfVxuXHRcdFx0XHRcdFx0XHRcdGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfVxuXHRcdFx0XHRcdFx0XHRcdGRheT17YX1cblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50PXtjdXJyZW50fVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pfVxuXHQ8L0xpc3Q+XG4pKVxuXG5jb25zdCBUYXNrUGFkTW9iaWxlPSh7dG9kb3M9W10sIGRpc3BhdGNoLCBjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSxcblx0e211aVRoZW1lLCBtaW5IZWlnaHQ9bXVpVGhlbWUucGFnZS5oZWlnaHQtbXVpVGhlbWUuYXBwQmFyLmhlaWdodC1tdWlUaGVtZS5mb290YmFyLmhlaWdodH0pPT4oXG5cdDxTd2lwZWFibGVUYWJzIGluZGV4PXtjdXJyZW50fVxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxuXHRcdHtcblx0XHRcdGRheXMubWFwKChkYXksaSk9Pihcblx0XHRcdFx0PExpc3Qga2V5PXtpfSBzdHlsZT17e21pbkhlaWdodH19PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzayxkb25lcz1bXX0saik9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIGtleT17an1cblx0XHRcdFx0XHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0KSlcblx0XHR9XG5cdDwvU3dpcGVhYmxlVGFicz5cbilcblRhc2tQYWRNb2JpbGUuY29udGV4dFR5cGVzPXtcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdFxufVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudCwgLi4ub3RoZXJzfSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoY3VycmVudDwwIHx8IGRheT5jdXJyZW50KVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRElTQUJMRUR9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2Vcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0VOQUJMRUR9IGhvdmVyQ29sb3I9e0NPTE9SX0hPVkVSfSBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9ORSh0b2RvLGRheSkpfSAgey4uLm90aGVyc30vPilcbn0pXG5jb25zdCBXcmFwcGVyPSh7b25LZXlib2FyZEZvY3VzLC4uLm90aGVyc30pPT4oPHNwYW4gey4uLm90aGVyc30vPilcbiJdfQ==