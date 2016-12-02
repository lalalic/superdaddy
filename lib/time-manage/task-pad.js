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
	return a.splice(i, 1, _react2.default.createElement(
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

var WEEKDAYS = function WEEKDAYS(i) {
	var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "日一二三四五六".split("").map(function (a) {
		return "" + a;
	});
	return a.splice(i, 1, "今天"), a;
};
var TaskPadMobile = function TaskPadMobile(_ref3) {
	var _ref3$todos = _ref3.todos,
	    todos = _ref3$todos === undefined ? [] : _ref3$todos,
	    dispatch = _ref3.dispatch,
	    _ref3$current = _ref3.current,
	    current = _ref3$current === undefined ? new Date().getDay() : _ref3$current,
	    _ref3$days = _ref3.days,
	    days = _ref3$days === undefined ? WEEKDAYS(current) : _ref3$days;
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

	if (done) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.yellow500 }, others));else if (day > current) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.grey300 }, others));else return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: _colors.lightBlue100, hoverColor: _colors.yellow200, onClick: function onClick(e) {
			return dispatch(_.ACTION.DONE(todo, day));
		} }, others));
});
var Wrapper = function Wrapper(_ref6) {
	var onKeyboardFocus = _ref6.onKeyboardFocus,
	    others = (0, _objectWithoutProperties3.default)(_ref6, ["onKeyboardFocus"]);
	return _react2.default.createElement("span", others);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS90YXNrLXBhZC5qcyJdLCJuYW1lcyI6WyJUYXNrUGFkIiwidG9kb3MiLCJzdGF0ZSIsImZpbHRlciIsImEiLCJoaWRkZW4iLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJzcGxpdCIsInNwbGljZSIsIklURU1fU1RZTEUiLCJkaXNwbGF5Iiwid2lkdGgiLCJ0ZXh0QWxpZ24iLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJUYXNrUGFkV2lkZSIsImRpc3BhdGNoIiwiY3VycmVudCIsIkRhdGUiLCJnZXREYXkiLCJkYXlzIiwibWFwIiwidGFzayIsImNvbnRlbnQiLCJkb25lcyIsImluZGV4T2YiLCJyZWR1Y2UiLCJwdXNoIiwiV0VFS0RBWVMiLCJUYXNrUGFkTW9iaWxlIiwiZGF5IiwiaiIsIlRvZG9TdGF0dXMiLCJ0b2RvIiwiZG9uZSIsIm90aGVycyIsIkRPTkUiLCJXcmFwcGVyIiwib25LZXlib2FyZEZvY3VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBT0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRU8sSUFBTUEsNEJBQVEseUJBQVE7QUFBQSxRQUFRLEVBQUNDLE9BQU0sb0NBQXFCQyxLQUFyQixFQUE0QkMsTUFBNUIsQ0FBbUM7QUFBQSxVQUFHLENBQUNDLEVBQUVDLE1BQU47QUFBQSxHQUFuQyxDQUFQLEVBQVI7QUFBQSxDQUFSLEVBQTJFO0FBQUEsUUFDL0Y7QUFBQTtBQUFBLElBQVksVUFBVSxHQUF0QjtBQUVDO0FBQUEsVUFBT0MsUUFBUSw4QkFBQyxhQUFELEVBQW1CQyxLQUFuQixDQUFSLEdBQXNDLDhCQUFDLFdBQUQsRUFBaUJBLEtBQWpCLENBQTdDO0FBQUE7QUFGRCxFQUQrRjtBQUFBLENBQTNFLENBQWQ7O0FBUVAsSUFBTUMsT0FBSyxTQUFMQSxJQUFLLENBQUNDLENBQUQ7QUFBQSxLQUFHTCxD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QUFsQyxFQUFSLENBREQsS0FFSyxJQUFHTCxNQUFJYixPQUFQLEVBQ0osT0FBUSx1RUFBVyxzQkFBWCxJQUFzQ2tCLE1BQXRDLEVBQVIsQ0FESSxLQUdKLE9BQVEsdUVBQVcsMkJBQVgsRUFBaUMsNkJBQWpDLEVBQTBELFNBQVM7QUFBQSxVQUFHbkIsU0FBUyxTQUFPb0IsSUFBUCxDQUFZSCxJQUFaLEVBQWlCSCxHQUFqQixDQUFULENBQUg7QUFBQSxHQUFuRSxJQUE0R0ssTUFBNUcsRUFBUjtBQUNELENBUGdCLENBQWpCO0FBUUEsSUFBTUUsVUFBUSxTQUFSQSxPQUFRO0FBQUEsS0FBRUMsZUFBRixTQUFFQSxlQUFGO0FBQUEsS0FBcUJILE1BQXJCO0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkIiwiZmlsZSI6InRhc2stcGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sIFN1YmhlYWRlcixEaXZpZGVyLFRhYiwgRmxhdEJ1dHRvbixJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcblx0LHllbGxvdzIwMCBhcyBDT0xPUl9IT1ZFUlxuXHQsbGlnaHRCbHVlMTAwIGFzIENPTE9SX0VOQUJMRURcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcbn0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi5cIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uL3NlbGVjdG9yXCJcbmltcG9ydCBTd2lwZWFibGVUYWJzIGZyb20gXCIuLi9jb21wb25lbnRzL3N3aXBlLXRhYnNcIlxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcblxuZXhwb3J0IGNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkocHJvcHM9Pihcblx0PE1lZGlhUXVlcnkgbWF4V2lkdGg9ezk2MH0+XG5cdHtcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XG5cdH1cblx0PC9NZWRpYVF1ZXJ5PlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBJVEVNX1NUWUxFPXtcblx0ZGlzcGxheTpcImlubGluZS1ibG9ja1wiLFxuXHR3aWR0aDo2MCxcblx0dGV4dEFsaWduOlwiY2VudGVyXCIsXG5cdG1hcmdpblRvcDoxNixcblx0bWFyZ2luQm90dG9tOjE2XG59XG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuXHQ8TGlzdD5cblx0XHQ8TGlzdEl0ZW1cblx0XHRcdHByaW1hcnlUZXh0PVwi5Lu75YqhXFzmmJ/mnJ9cIlxuXHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0PFdyYXBwZXI+XG5cdFx0XHRcdFx0e2RheXMubWFwKChhLGkpPT48c3BhbiBrZXk9e2l9IHN0eWxlPXtJVEVNX1NUWUxFfT57YX08L3NwYW4+KX1cblx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0fVxuXHRcdC8+XG5cdFx0PERpdmlkZXIvPlxuXG5cdFx0e3RvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG5cdFx0XHQ8TGlzdEl0ZW0ga2V5PXtpfVxuXHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcblx0XHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7WzAsMSwyLDMsNCw1LDZdLm1hcChhPT4oXG5cdFx0XHRcdFx0XHQ8c3BhbiBrZXk9e2F9IHN0eWxlPXtJVEVNX1NUWUxFfT5cblx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXNcblx0XHRcdFx0XHRcdFx0XHR0b2RvPXt0YXNrfVxuXHRcdFx0XHRcdFx0XHRcdGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfVxuXHRcdFx0XHRcdFx0XHRcdGRheT17YX1cblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50PXtjdXJyZW50fVxuXHRcdFx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0KSl9XG5cdFx0XHRcdFx0PC9XcmFwcGVyPlxuXHRcdFx0XHR9XG5cdFx0XHRcdC8+XG5cdFx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGtleT17YF8ke2l9YH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pfVxuXHQ8L0xpc3Q+XG4pKVxuXG5jb25zdCBXRUVLREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikubWFwKGE9PmAke2F9YCkpPT4oYS5zcGxpY2UoaSwxLFwi5LuK5aSpXCIpLGEpXG5jb25zdCBUYXNrUGFkTW9iaWxlPSh7dG9kb3M9W10sIGRpc3BhdGNoLCBjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1XRUVLREFZUyhjdXJyZW50KX0pPT4oXG5cdDxTd2lwZWFibGVUYWJzIGluZGV4PXtjdXJyZW50fVxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxuXHRcdHtcblx0XHRcdGRheXMubWFwKChkYXksaSk9Pihcblx0XHRcdFx0PExpc3Qga2V5PXtpfT5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssZG9uZXM9W119LGopPT4oXG5cdFx0XHRcdFx0XHRcdDxMaXN0SXRlbSBrZXk9e2p9XG5cdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0bGVmdENoZWNrYm94PXs8VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZihpKX0gZGF5PXtpfSBjdXJyZW50PXtjdXJyZW50fS8+fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvTGlzdD5cblx0XHRcdCkpXG5cdFx0fVxuXHQ8L1N3aXBlYWJsZVRhYnM+XG4pXG5cbmNvbnN0IFRvZG9TdGF0dXM9Y29ubmVjdCgpKCh7dG9kbyxkb25lLCBkYXksIGRpc3BhdGNoLCBjdXJyZW50LCAuLi5vdGhlcnN9KT0+e1xuXHRpZihkb25lKVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRE9ORX0gey4uLm90aGVyc30vPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RJU0FCTEVEfSB7Li4ub3RoZXJzfS8+KVxuXHRlbHNlXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfSBob3ZlckNvbG9yPXtDT0xPUl9IT1ZFUn0gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0gIHsuLi5vdGhlcnN9Lz4pXG59KVxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXG4iXX0=