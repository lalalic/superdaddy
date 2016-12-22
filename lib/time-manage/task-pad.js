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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkIiwidG9kb3MiLCJzdGF0ZSIsImZpbHRlciIsImEiLCJoaWRkZW4iLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJzcGxpdCIsInNwbGljZSIsIklURU1fU1RZTEUiLCJkaXNwbGF5Iiwid2lkdGgiLCJ0ZXh0QWxpZ24iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJUYXNrUGFkV2lkZSIsImRpc3BhdGNoIiwiY3VycmVudCIsIkRhdGUiLCJnZXREYXkiLCJkYXlzIiwibWFwIiwidGFzayIsImNvbnRlbnQiLCJkb25lcyIsImluZGV4T2YiLCJyZWR1Y2UiLCJwdXNoIiwiVGFza1BhZE1vYmlsZSIsIm11aVRoZW1lIiwibWluSGVpZ2h0IiwicGFnZSIsImhlaWdodCIsImFwcEJhciIsImZvb3RiYXIiLCJkYXkiLCJqIiwiRE9ORSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsIlRvZG9TdGF0dXMiLCJ0b2RvIiwiZG9uZSIsIm90aGVycyIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFPQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFTyxJQUFNQSw0QkFBUSx5QkFBUTtBQUFBLFFBQVEsRUFBQ0MsT0FBTSxvQ0FBcUJDLEtBQXJCLEVBQTRCQyxNQUE1QixDQUFtQztBQUFBLFVBQUcsQ0FBQ0MsRUFBRUMsTUFBTjtBQUFBLEdBQW5DLENBQVAsRUFBUjtBQUFBLENBQVIsRUFBMkU7QUFBQSxRQUMvRjtBQUFBO0FBQUEsSUFBWSxVQUFVLEdBQXRCO0FBRUM7QUFBQSxVQUFPQyxRQUFRLDhCQUFDLGFBQUQsRUFBbUJDLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQkEsS0FBakIsQ0FBN0M7QUFBQTtBQUZELEVBRCtGO0FBQUEsQ0FBM0UsQ0FBZDs7QUFRUCxJQUFNQyxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsQ0FBRDtBQUFBLEtBQUdMLENBQUgsdUVBQUssVUFBVU0sS0FBVixDQUFnQixFQUFoQixDQUFMO0FBQUEsUUFBNEJELElBQUUsQ0FBRixJQUFPTCxFQUFFTyxNQUFGLENBQVNGLENBQVQsRUFBVyxDQUFYLEVBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUFiLENBQVAsRUFBK0JMLENBQTNEO0FBQUEsQ0FBWDtBQUNBLElBQU1RLGFBQVc7QUFDaEJDLFVBQVEsY0FEUTtBQUVoQkMsUUFBTSxFQUZVO0FBR2hCQyxZQUFVLFFBSE07QUFJaEJDLFlBQVUsRUFKTTtBQUtoQkMsZUFBYTtBQUxHLENBQWpCO0FBT0EsSUFBTUMsY0FBYSxTQUFiQSxXQUFhO0FBQUEsdUJBQUVqQixLQUFGO0FBQUEsS0FBRUEsS0FBRiw4QkFBUSxFQUFSO0FBQUEsS0FBWWtCLFFBQVosUUFBWUEsUUFBWjtBQUFBLHlCQUFzQkMsT0FBdEI7QUFBQSxLQUFzQkEsT0FBdEIsZ0NBQThCLElBQUlDLElBQUosR0FBV0MsTUFBWCxFQUE5QjtBQUFBLHNCQUFrREMsSUFBbEQ7QUFBQSxLQUFrREEsSUFBbEQsNkJBQXVEZixLQUFLWSxPQUFMLENBQXZEO0FBQUEsUUFDbEI7QUFBQTtBQUFBO0FBQ0M7QUFDQyxnQkFBWSw0QkFEYjtBQUVDLG9CQUNDO0FBQUMsV0FBRDtBQUFBO0FBQ0VHLFNBQUtDLEdBQUwsQ0FBUyxVQUFDcEIsQ0FBRCxFQUFHSyxDQUFIO0FBQUEsWUFBTztBQUFBO0FBQUEsUUFBTSxLQUFLQSxDQUFYLEVBQWMsT0FBT0csVUFBckI7QUFBa0NSO0FBQWxDLE1BQVA7QUFBQSxLQUFUO0FBREY7QUFIRixJQUREO0FBU0MsMERBVEQ7QUFXRUgsUUFBTXVCLEdBQU4sQ0FBVSxpQkFBMEJmLENBQTFCO0FBQUEsT0FBVWdCLElBQVYsU0FBRUMsT0FBRjtBQUFBLDJCQUFnQkMsS0FBaEI7QUFBQSxPQUFnQkEsS0FBaEIsK0JBQXNCLEVBQXRCO0FBQUEsVUFDVixzREFBVSxLQUFLbEIsQ0FBZjtBQUNDLGlCQUFhZ0IsSUFEZDtBQUVDLHFCQUNDO0FBQUMsWUFBRDtBQUFBO0FBQ0MsTUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWdCRCxHQUFoQixDQUFvQjtBQUFBLGFBQ3BCO0FBQUE7QUFBQSxTQUFNLEtBQUtwQixDQUFYLEVBQWMsT0FBT1EsVUFBckI7QUFDQyxxQ0FBQyxVQUFEO0FBQ0MsY0FBTWEsSUFEUDtBQUVDLGNBQU0sQ0FBQyxDQUFELElBQUlFLE1BQU1DLE9BQU4sQ0FBY3hCLENBQWQsQ0FGWDtBQUdDLGFBQUtBLENBSE47QUFJQyxpQkFBU2dCO0FBSlY7QUFERCxPQURvQjtBQUFBLE1BQXBCO0FBREQ7QUFIRixLQURVO0FBQUEsR0FBVixFQWtCRVMsTUFsQkYsQ0FrQlMsVUFBQzNCLEtBQUQsRUFBT0UsQ0FBUCxFQUFTSyxDQUFULEVBQWE7QUFDdEJQLFNBQU00QixJQUFOLENBQVcxQixDQUFYO0FBQ0FGLFNBQU00QixJQUFOLENBQVcscURBQVMsV0FBU3JCLENBQWxCLEdBQVg7QUFDQSxVQUFPUCxLQUFQO0FBQ0EsR0F0QkEsRUFzQkMsRUF0QkQ7QUFYRixFQURrQjtBQUFBLENBQW5COztBQXNDQSxJQUFNNkIsZ0JBQWMsU0FBZEEsYUFBYztBQUFBLHlCQUFFOUIsS0FBRjtBQUFBLEtBQUVBLEtBQUYsK0JBQVEsRUFBUjtBQUFBLEtBQVlrQixRQUFaLFNBQVlBLFFBQVo7QUFBQSwyQkFBc0JDLE9BQXRCO0FBQUEsS0FBc0JBLE9BQXRCLGlDQUE4QixJQUFJQyxJQUFKLEdBQVdDLE1BQVgsRUFBOUI7QUFBQSx3QkFBa0RDLElBQWxEO0FBQUEsS0FBa0RBLElBQWxELDhCQUF1RGYsS0FBS1ksT0FBTCxDQUF2RDtBQUFBLEtBQ2xCWSxRQURrQixTQUNsQkEsUUFEa0I7QUFBQSw2QkFDUkMsU0FEUTtBQUFBLEtBQ1JBLFNBRFEsbUNBQ0VELFNBQVNFLElBQVQsQ0FBY0MsTUFBZCxHQUFxQkgsU0FBU0ksTUFBVCxDQUFnQkQsTUFBckMsR0FBNENILFNBQVNLLE9BQVQsQ0FBaUJGLE1BRC9EO0FBQUEsUUFFbkI7QUFBQTtBQUFBLElBQWUsT0FBT2YsVUFBUSxDQUE5QjtBQUNDLFNBQU1HLEtBQUtDLEdBQUwsQ0FBUyxVQUFDYyxHQUFELEVBQUs3QixDQUFMO0FBQUEsV0FBUyxpREFBSyxLQUFLQSxDQUFWLEVBQWEsT0FBTzZCLEdBQXBCLEVBQXlCLE9BQU83QixDQUFoQyxHQUFUO0FBQUEsSUFBVCxDQURQO0FBR0VjLE9BQUtDLEdBQUwsQ0FBUyxVQUFDYyxHQUFELEVBQUs3QixDQUFMO0FBQUEsVUFDUjtBQUFBO0FBQUEsTUFBTSxLQUFLQSxDQUFYLEVBQWMsT0FBTyxFQUFDd0Isb0JBQUQsRUFBckI7QUFFRWhDLFVBQU11QixHQUFOLENBQVUsaUJBQXlCZSxDQUF6QjtBQUFBLFNBQVVkLElBQVYsU0FBRUMsT0FBRjtBQUFBLDZCQUFlQyxLQUFmO0FBQUEsU0FBZUEsS0FBZiwrQkFBcUIsRUFBckI7QUFBQSxZQUNULHNEQUFVLEtBQUtZLENBQWY7QUFDQyxtQkFBYWQsSUFEZDtBQUVDLGVBQVM7QUFBQSxjQUFHLENBQUMsQ0FBRCxJQUFJRSxNQUFNQyxPQUFOLENBQWNuQixDQUFkLENBQUosSUFBd0JXLFdBQVNYLENBQWpDLElBQXNDVSxTQUFTLFNBQU9xQixJQUFQLENBQVlmLElBQVosRUFBaUJoQixDQUFqQixDQUFULENBQXpDO0FBQUEsT0FGVjtBQUdDLG9CQUFjLDhCQUFDLFVBQUQsSUFBWSxNQUFNZ0IsSUFBbEIsRUFBd0IsTUFBTSxDQUFDLENBQUQsSUFBSUUsTUFBTUMsT0FBTixDQUFjbkIsQ0FBZCxDQUFsQyxFQUFvRCxLQUFLQSxDQUF6RCxFQUE0RCxTQUFTVyxPQUFyRTtBQUhmLE9BRFM7QUFBQSxLQUFWO0FBRkYsSUFEUTtBQUFBLEdBQVQ7QUFIRixFQUZtQjtBQUFBLENBQXBCO0FBcUJBVyxjQUFjVSxZQUFkLEdBQTJCO0FBQzFCVCxXQUFTLGlCQUFVVTtBQURPLENBQTNCOztBQUlBLElBQU1DLGFBQVcsMkJBQVUsaUJBQWtEO0FBQUEsS0FBaERDLElBQWdELFNBQWhEQSxJQUFnRDtBQUFBLEtBQTNDQyxJQUEyQyxTQUEzQ0EsSUFBMkM7QUFBQSxLQUFyQ1AsR0FBcUMsU0FBckNBLEdBQXFDO0FBQUEsS0FBaENuQixRQUFnQyxTQUFoQ0EsUUFBZ0M7QUFBQSxLQUF0QkMsT0FBc0IsU0FBdEJBLE9BQXNCO0FBQUEsS0FBVjBCLE1BQVU7O0FBQzVFLEtBQUdELElBQUgsRUFDQyxPQUFRLHVFQUFXLHdCQUFYLElBQWtDQyxNQUFsQyxFQUFSLENBREQsS0FFSyxJQUFHUixNQUFJbEIsT0FBUCxFQUNKLE9BQVEsdUVBQVcsc0JBQVgsSUFBc0MwQixNQUF0QyxFQUFSLENBREksS0FHSixPQUFRLHVFQUFXLDJCQUFYLEVBQWlDLDZCQUFqQyxFQUEwRCxTQUFTO0FBQUEsVUFBRzNCLFNBQVMsU0FBT3FCLElBQVAsQ0FBWUksSUFBWixFQUFpQk4sR0FBakIsQ0FBVCxDQUFIO0FBQUEsR0FBbkUsSUFBNEdRLE1BQTVHLEVBQVI7QUFDRCxDQVBnQixDQUFqQjtBQVFBLElBQU1DLFVBQVEsU0FBUkEsT0FBUTtBQUFBLEtBQUVDLGVBQUYsU0FBRUEsZUFBRjtBQUFBLEtBQXFCRixNQUFyQjtBQUFBLFFBQWdDLHNDQUFVQSxNQUFWLENBQWhDO0FBQUEsQ0FBZCIsImZpbGUiOiJ0YXNrLXBhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcixUYWIsIEZsYXRCdXR0b24sSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IHtBQ1RJT059IGZyb20gXCIuXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi4vY29tcG9uZW50cy9zd2lwZS10YWJzXCJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5cbmV4cG9ydCBjb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKHByb3BzPT4oXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxuXHR7XG5cdFx0bWF0Y2g9Pm1hdGNoID8gPFRhc2tQYWRNb2JpbGUgey4uLnByb3BzfS8+IDogPFRhc2tQYWRXaWRlIHsuLi5wcm9wc30vPlxuXHR9XG5cdDwvTWVkaWFRdWVyeT5cbikpXG5cbmNvbnN0IERBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpKT0+KGk8NyAmJiBhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcbmNvbnN0IElURU1fU1RZTEU9e1xuXHRkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXG5cdHdpZHRoOjYwLFxuXHR0ZXh0QWxpZ246XCJjZW50ZXJcIixcblx0bWFyZ2luVG9wOjE2LFxuXHRtYXJnaW5Cb3R0b206MTZcbn1cbmNvbnN0IFRhc2tQYWRXaWRlPSgoe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbVxuXHRcdFx0cHJpbWFyeVRleHQ9XCLku7vliqFcXOaYn+acn1wiXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7ZGF5cy5tYXAoKGEsaSk9PjxzcGFuIGtleT17aX0gc3R5bGU9e0lURU1fU1RZTEV9PnthfTwvc3Bhbj4pfVxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0XHQ8RGl2aWRlci8+XG5cblx0XHR7dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9Pihcblx0XHRcdDxMaXN0SXRlbSBrZXk9e2l9XG5cdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdHtbMCwxLDIsMyw0LDUsNl0ubWFwKGE9Pihcblx0XHRcdFx0XHRcdDxzcGFuIGtleT17YX0gc3R5bGU9e0lURU1fU1RZTEV9PlxuXHRcdFx0XHRcdFx0XHQ8VG9kb1N0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdHRvZG89e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0ZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoYSl9XG5cdFx0XHRcdFx0XHRcdFx0ZGF5PXthfVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQ9e2N1cnJlbnR9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0Lz5cblx0XHQpKS5yZWR1Y2UoKHN0YXRlLGEsaSk9Pntcblx0XHRcdHN0YXRlLnB1c2goYSlcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSxbXSl9XG5cdDwvTGlzdD5cbikpXG5cbmNvbnN0IFRhc2tQYWRNb2JpbGU9KHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9LFxuXHR7bXVpVGhlbWUsIG1pbkhlaWdodD1tdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0fSk9Pihcblx0PFN3aXBlYWJsZVRhYnMgaW5kZXg9e2N1cnJlbnQlN31cblx0XHR0YWJzPXtkYXlzLm1hcCgoZGF5LGkpPT48VGFiIGtleT17aX0gbGFiZWw9e2RheX0gdmFsdWU9e2l9Lz4pfT5cblx0XHR7XG5cdFx0XHRkYXlzLm1hcCgoZGF5LGkpPT4oXG5cdFx0XHRcdDxMaXN0IGtleT17aX0gc3R5bGU9e3ttaW5IZWlnaHR9fT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssZG9uZXM9W119LGopPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBrZXk9e2p9XG5cdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+LTE9PWRvbmVzLmluZGV4T2YoaSkgJiYgY3VycmVudD49aSAmJiBkaXNwYXRjaChBQ1RJT04uRE9ORSh0YXNrLGkpKX1cblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XG5cdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9MaXN0PlxuXHRcdFx0KSlcblx0XHR9XG5cdDwvU3dpcGVhYmxlVGFicz5cbilcblRhc2tQYWRNb2JpbGUuY29udGV4dFR5cGVzPXtcblx0bXVpVGhlbWU6UHJvcFR5cGVzLm9iamVjdFxufVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudCwgLi4ub3RoZXJzfSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ESVNBQkxFRH0gey4uLm90aGVyc30vPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0gaG92ZXJDb2xvcj17Q09MT1JfSE9WRVJ9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9ICB7Li4ub3RoZXJzfS8+KVxufSlcbmNvbnN0IFdyYXBwZXI9KHtvbktleWJvYXJkRm9jdXMsLi4ub3RoZXJzfSk9Pig8c3BhbiB7Li4ub3RoZXJzfS8+KVxuIl19