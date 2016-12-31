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

var _selector = require("../../selector");

var _swipeTabs = require("../../components/swipe-tabs");

var _swipeTabs2 = _interopRequireDefault(_swipeTabs);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L3Rhc2stcGFkLmpzIl0sIm5hbWVzIjpbIlRhc2tQYWQiLCJ0b2RvcyIsInN0YXRlIiwiZmlsdGVyIiwiYSIsImhpZGRlbiIsIm1hdGNoIiwicHJvcHMiLCJEQVlTIiwiaSIsInNwbGl0Iiwic3BsaWNlIiwiSVRFTV9TVFlMRSIsImRpc3BsYXkiLCJ3aWR0aCIsInRleHRBbGlnbiIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsIlRhc2tQYWRXaWRlIiwiZGlzcGF0Y2giLCJjdXJyZW50IiwiRGF0ZSIsImdldERheSIsImRheXMiLCJtYXAiLCJ0YXNrIiwiY29udGVudCIsImRvbmVzIiwiaW5kZXhPZiIsInJlZHVjZSIsInB1c2giLCJUYXNrUGFkTW9iaWxlIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImRheSIsImoiLCJET05FIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiVG9kb1N0YXR1cyIsInRvZG8iLCJkb25lIiwib3RoZXJzIiwiV3JhcHBlciIsIm9uS2V5Ym9hcmRGb2N1cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQU9BOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsNEJBQVEseUJBQVE7QUFBQSxRQUFRLEVBQUNDLE9BQU0sb0NBQXFCQyxLQUFyQixFQUE0QkMsTUFBNUIsQ0FBbUM7QUFBQSxVQUFHLENBQUNDLEVBQUVDLE1BQU47QUFBQSxHQUFuQyxDQUFQLEVBQVI7QUFBQSxDQUFSLEVBQTJFO0FBQUEsUUFDL0Y7QUFBQTtBQUFBLElBQVksVUFBVSxHQUF0QjtBQUVDO0FBQUEsVUFBT0MsUUFBUSw4QkFBQyxhQUFELEVBQW1CQyxLQUFuQixDQUFSLEdBQXNDLDhCQUFDLFdBQUQsRUFBaUJBLEtBQWpCLENBQTdDO0FBQUE7QUFG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QUMxQlQsV0FBUyxpQkFBVVU7QUFETyxDQUEzQjs7QUFJQSxJQUFNQyxhQUFXLDJCQUFVLGlCQUFrRDtBQUFBLEtBQWhEQyxJQUFnRCxTQUFoREEsSUFBZ0Q7QUFBQSxLQUEzQ0MsSUFBMkMsU0FBM0NBLElBQTJDO0FBQUEsS0FBckNQLEdBQXFDLFNBQXJDQSxHQUFxQztBQUFBLEtBQWhDbkIsUUFBZ0MsU0FBaENBLFFBQWdDO0FBQUEsS0FBdEJDLE9BQXNCLFNBQXRCQSxPQUFzQjtBQUFBLEtBQVYwQixNQUFVOztBQUM1RSxLQUFHRCxJQUFILEVBQ0MsT0FBUSx5REFBVyx3QkFBWCxJQUFrQ0MsTUFBbEMsRUFBUixDQURELEtBRUssSUFBR1IsTUFBSWxCLE9BQVAsRUFDSixPQUFRLHlEQUFXLHNCQUFYLElBQXNDMEIsTUFBdEMsRUFBUixDQURJLEtBR0osT0FBUSx5REFBVywyQkFBWCxFQUFpQyw2QkFBakMsRUFBMEQsU0FBUztBQUFBLFVBQUczQixTQUFTLFNBQU9xQixJQUFQLENBQVlJLElBQVosRUFBaUJOLEdBQWpCLENBQVQsQ0FBSDtBQUFBLEdBQW5FLElBQTRHUSxNQUE1RyxFQUFSO0FBQ0QsQ0FQZ0IsQ0FBakI7QUFRQSxJQUFNQyxVQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxlQUFGLFNBQUVBLGVBQUY7QUFBQSxLQUFxQkYsTUFBckI7O0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkIiwiZmlsZSI6InRhc2stcGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sIFN1YmhlYWRlcixEaXZpZGVyLFRhYiwgRmxhdEJ1dHRvbixJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuaW1wb3J0IHtcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcblx0LHllbGxvdzIwMCBhcyBDT0xPUl9IT1ZFUlxuXHQsbGlnaHRCbHVlMTAwIGFzIENPTE9SX0VOQUJMRURcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcbn0gZnJvbSBcIm1hdGVyaWFsLXVpL3N0eWxlcy9jb2xvcnNcIlxuXG5pbXBvcnQge0FDVElPTn0gZnJvbSBcIi5cIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcbmltcG9ydCBTd2lwZWFibGVUYWJzIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL3N3aXBlLXRhYnNcIlxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcblxuZXhwb3J0IGNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkocHJvcHM9Pihcblx0PE1lZGlhUXVlcnkgbWF4V2lkdGg9ezk2MH0+XG5cdHtcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XG5cdH1cblx0PC9NZWRpYVF1ZXJ5PlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oaTw3ICYmIGEuc3BsaWNlKGksMSw8Yj7ku4rlpKk8L2I+KSxhKVxuY29uc3QgSVRFTV9TVFlMRT17XG5cdGRpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixcblx0d2lkdGg6NjAsXG5cdHRleHRBbGlnbjpcImNlbnRlclwiLFxuXHRtYXJnaW5Ub3A6MTYsXG5cdG1hcmdpbkJvdHRvbToxNlxufVxuY29uc3QgVGFza1BhZFdpZGU9KCh7dG9kb3M9W10sIGRpc3BhdGNoLCBjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSk9Pihcblx0PExpc3Q+XG5cdFx0PExpc3RJdGVtXG5cdFx0XHRwcmltYXJ5VGV4dD1cIuS7u+WKoVxc5pif5pyfXCJcblx0XHRcdHJpZ2h0SWNvbkJ1dHRvbj17XG5cdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdHtkYXlzLm1hcCgoYSxpKT0+PHNwYW4ga2V5PXtpfSBzdHlsZT17SVRFTV9TVFlMRX0+e2F9PC9zcGFuPil9XG5cdFx0XHRcdDwvV3JhcHBlcj5cblx0XHRcdH1cblx0XHQvPlxuXHRcdDxEaXZpZGVyLz5cblxuXHRcdHt0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdfSxpKT0+KFxuXHRcdFx0PExpc3RJdGVtIGtleT17aX1cblx0XHRcdFx0cHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRcdHJpZ2h0SWNvbkJ1dHRvbj17XG5cdFx0XHRcdFx0PFdyYXBwZXI+XG5cdFx0XHRcdFx0e1swLDEsMiwzLDQsNSw2XS5tYXAoYT0+KFxuXHRcdFx0XHRcdFx0PHNwYW4ga2V5PXthfSBzdHlsZT17SVRFTV9TVFlMRX0+XG5cdFx0XHRcdFx0XHRcdDxUb2RvU3RhdHVzXG5cdFx0XHRcdFx0XHRcdFx0dG9kbz17dGFza31cblx0XHRcdFx0XHRcdFx0XHRkb25lPXstMSE9ZG9uZXMuaW5kZXhPZihhKX1cblx0XHRcdFx0XHRcdFx0XHRkYXk9e2F9XG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudD17Y3VycmVudH1cblx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRcdCkpfVxuXHRcdFx0XHRcdDwvV3JhcHBlcj5cblx0XHRcdFx0fVxuXHRcdFx0XHQvPlxuXHRcdCkpLnJlZHVjZSgoc3RhdGUsYSxpKT0+e1xuXHRcdFx0c3RhdGUucHVzaChhKVxuXHRcdFx0c3RhdGUucHVzaCg8RGl2aWRlciBrZXk9e2BfJHtpfWB9Lz4pXG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LFtdKX1cblx0PC9MaXN0PlxuKSlcblxuY29uc3QgVGFza1BhZE1vYmlsZT0oe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0sXG5cdHttdWlUaGVtZSwgbWluSGVpZ2h0PW11aVRoZW1lLnBhZ2UuaGVpZ2h0LW11aVRoZW1lLmFwcEJhci5oZWlnaHQtbXVpVGhlbWUuZm9vdGJhci5oZWlnaHR9KT0+KFxuXHQ8U3dpcGVhYmxlVGFicyBpbmRleD17Y3VycmVudCU3fVxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxuXHRcdHtcblx0XHRcdGRheXMubWFwKChkYXksaSk9Pihcblx0XHRcdFx0PExpc3Qga2V5PXtpfSBzdHlsZT17e21pbkhlaWdodH19PlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzayxkb25lcz1bXX0saik9Pihcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIGtleT17an1cblx0XHRcdFx0XHRcdFx0XHRwcmltYXJ5VGV4dD17dGFza31cblx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT4tMT09ZG9uZXMuaW5kZXhPZihpKSAmJiBjdXJyZW50Pj1pICYmIGRpc3BhdGNoKEFDVElPTi5ET05FKHRhc2ssaSkpfVxuXHRcdFx0XHRcdFx0XHRcdGxlZnRDaGVja2JveD17PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoaSl9IGRheT17aX0gY3VycmVudD17Y3VycmVudH0vPn1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L0xpc3Q+XG5cdFx0XHQpKVxuXHRcdH1cblx0PC9Td2lwZWFibGVUYWJzPlxuKVxuVGFza1BhZE1vYmlsZS5jb250ZXh0VHlwZXM9e1xuXHRtdWlUaGVtZTpQcm9wVHlwZXMub2JqZWN0XG59XG5cbmNvbnN0IFRvZG9TdGF0dXM9Y29ubmVjdCgpKCh7dG9kbyxkb25lLCBkYXksIGRpc3BhdGNoLCBjdXJyZW50LCAuLi5vdGhlcnN9KT0+e1xuXHRpZihkb25lKVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRE9ORX0gey4uLm90aGVyc30vPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RJU0FCTEVEfSB7Li4ub3RoZXJzfS8+KVxuXHRlbHNlXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfSBob3ZlckNvbG9yPXtDT0xPUl9IT1ZFUn0gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0gIHsuLi5vdGhlcnN9Lz4pXG59KVxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXG4iXX0=