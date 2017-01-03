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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Rhc2stcGFkLmpzIl0sIm5hbWVzIjpbIlRhc2tQYWQiLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJhIiwic3BsaXQiLCJzcGxpY2UiLCJJVEVNX1NUWUxFIiwiZGlzcGxheSIsIndpZHRoIiwidGV4dEFsaWduIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiVGFza1BhZFdpZGUiLCJ0b2RvcyIsImN1cnJlbnQiLCJEYXRlIiwiZ2V0RGF5IiwiZGF5cyIsIm1hcCIsInRhc2siLCJjb250ZW50IiwiZG9uZXMiLCJpbmRleE9mIiwicmVkdWNlIiwic3RhdGUiLCJwdXNoIiwiVGFza1BhZE1vYmlsZSIsImRpc3BhdGNoIiwiQUNUSU9OIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImRheSIsImoiLCJET05FIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIlRvZG9TdGF0dXMiLCJ0b2RvIiwiZG9uZSIsIm90aGVycyIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFPQTs7OztBQUNBOzs7Ozs7OztBQUVPLElBQU1BLDRCQUFTLFNBQVRBLE9BQVM7QUFBQSxRQUNyQjtBQUFBO0FBQUEsSUFBWSxVQUFVLEdBQXRCO0FBRUM7QUFBQSxVQUFPQyxRQUFRLDhCQUFDLGFBQUQsRUFBbUJDLEtBQW5CLENBQVIsR0FBc0MsOEJBQUMsV0FBRCxFQUFpQkEsS0FBakIsQ0FBN0M7QUFBQTtBQUZELEVBRHFCO0FBQUEsQ0FBZjs7QUFRUCxJQUFNQyxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsQ0FBRDtBQUFBLEtBQUdDLENBQUgsdUVBQUssVUFBVUMsS0FBVixDQUFnQixFQUFoQixDQUFMO0FBQUEsUUFBNEJGLElBQUUsQ0FBRixJQUFP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UUFBbUIsU0FBbkJBLFFBQW1CO0FBQUEsS0FBVkMsTUFBVSxTQUFWQSxNQUFVOztBQUFBLEtBQXhEYyxJQUF3RCxTQUF4REEsSUFBd0Q7QUFBQSxLQUFuREMsSUFBbUQsU0FBbkRBLElBQW1EO0FBQUEsS0FBN0NSLEdBQTZDLFNBQTdDQSxHQUE2QztBQUFBLEtBQXhDckIsT0FBd0MsU0FBeENBLE9BQXdDO0FBQUEsS0FBNUI4QixNQUE0Qjs7QUFDMUUsS0FBR0QsSUFBSCxFQUNDLE9BQVEseURBQVcsd0JBQVgsSUFBa0NDLE1BQWxDLEVBQVIsQ0FERCxLQUVLLElBQUdULE1BQUlyQixPQUFQLEVBQ0osT0FBUSx5REFBVyxzQkFBWCxJQUFzQzhCLE1BQXRDLEVBQVIsQ0FESSxLQUdKLE9BQVEseURBQVcsMkJBQVgsRUFBaUMsNkJBQWpDLEVBQTBELFNBQVM7QUFBQSxVQUFHakIsU0FBU0MsT0FBT1MsSUFBUCxDQUFZSyxJQUFaLEVBQWlCUCxHQUFqQixDQUFULENBQUg7QUFBQSxHQUFuRSxJQUE0R1MsTUFBNUcsRUFBUjtBQUNELENBUEQ7O0FBU0FILFdBQVdILFlBQVgsR0FBd0I7QUFDdkJWLFNBQVEsaUJBQVVXLE1BREs7QUFFdkJaLFdBQVUsaUJBQVVhO0FBRkcsQ0FBeEI7QUFJQSxJQUFNSyxVQUFRLFNBQVJBLE9BQVE7QUFBQSxLQUFFQyxlQUFGLFNBQUVBLGVBQUY7QUFBQSxLQUFxQkYsTUFBckI7O0FBQUEsUUFBZ0Msc0NBQVVBLE1BQVYsQ0FBaEM7QUFBQSxDQUFkIiwiZmlsZSI6InRhc2stcGFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgTWVkaWFRdWVyeSBmcm9tIFwicmVhY3QtcmVzcG9uc2l2ZVwiXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sIFN1YmhlYWRlcixEaXZpZGVyLFRhYiwgRmxhdEJ1dHRvbixJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7XG5cdHllbGxvdzUwMCBhcyBDT0xPUl9ET05FXG5cdCx5ZWxsb3cyMDAgYXMgQ09MT1JfSE9WRVJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXG5cdCxncmV5MzAwIGFzIENPTE9SX0RJU0FCTEVEXG59IGZyb20gXCJtYXRlcmlhbC11aS9zdHlsZXMvY29sb3JzXCJcblxuaW1wb3J0IFN3aXBlYWJsZVRhYnMgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvc3dpcGUtdGFic1wiXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxuXG5leHBvcnQgY29uc3QgVGFza1BhZD0ocHJvcHM9Pihcblx0PE1lZGlhUXVlcnkgbWF4V2lkdGg9ezk2MH0+XG5cdHtcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XG5cdH1cblx0PC9NZWRpYVF1ZXJ5PlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oaTw3ICYmIGEuc3BsaWNlKGksMSw8Yj7ku4rlpKk8L2I+KSxhKVxuY29uc3QgSVRFTV9TVFlMRT17XG5cdGRpc3BsYXk6XCJpbmxpbmUtYmxvY2tcIixcblx0d2lkdGg6NjAsXG5cdHRleHRBbGlnbjpcImNlbnRlclwiLFxuXHRtYXJnaW5Ub3A6MTYsXG5cdG1hcmdpbkJvdHRvbToxNlxufVxuY29uc3QgVGFza1BhZFdpZGU9KCh7dG9kb3M9W10sY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG5cdDxMaXN0PlxuXHRcdDxMaXN0SXRlbVxuXHRcdFx0cHJpbWFyeVRleHQ9XCLku7vliqFcXOaYn+acn1wiXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8V3JhcHBlcj5cblx0XHRcdFx0XHR7ZGF5cy5tYXAoKGEsaSk9PjxzcGFuIGtleT17aX0gc3R5bGU9e0lURU1fU1RZTEV9PnthfTwvc3Bhbj4pfVxuXHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHR9XG5cdFx0Lz5cblx0XHQ8RGl2aWRlci8+XG5cblx0XHR7dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9Pihcblx0XHRcdDxMaXN0SXRlbSBrZXk9e2l9XG5cdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHRcdDxXcmFwcGVyPlxuXHRcdFx0XHRcdHtbMCwxLDIsMyw0LDUsNl0ubWFwKGE9Pihcblx0XHRcdFx0XHRcdDxzcGFuIGtleT17YX0gc3R5bGU9e0lURU1fU1RZTEV9PlxuXHRcdFx0XHRcdFx0XHQ8VG9kb1N0YXR1c1xuXHRcdFx0XHRcdFx0XHRcdHRvZG89e3Rhc2t9XG5cdFx0XHRcdFx0XHRcdFx0ZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoYSl9XG5cdFx0XHRcdFx0XHRcdFx0ZGF5PXthfVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQ9e2N1cnJlbnR9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0XHQpKX1cblx0XHRcdFx0XHQ8L1dyYXBwZXI+XG5cdFx0XHRcdH1cblx0XHRcdFx0Lz5cblx0XHQpKS5yZWR1Y2UoKHN0YXRlLGEsaSk9Pntcblx0XHRcdHN0YXRlLnB1c2goYSlcblx0XHRcdHN0YXRlLnB1c2goPERpdmlkZXIga2V5PXtgXyR7aX1gfS8+KVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSxbXSl9XG5cdDwvTGlzdD5cbikpXG5cbmNvbnN0IFRhc2tQYWRNb2JpbGU9KHt0b2Rvcz1bXSxjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1EQVlTKGN1cnJlbnQpfSxcblx0e2Rpc3BhdGNoLEFDVElPTixtdWlUaGVtZSwgbWluSGVpZ2h0PW11aVRoZW1lLnBhZ2UuaGVpZ2h0LW11aVRoZW1lLmFwcEJhci5oZWlnaHQtbXVpVGhlbWUuZm9vdGJhci5oZWlnaHR9KT0+KFxuXHQ8U3dpcGVhYmxlVGFicyBpbmRleD17Y3VycmVudCU3fVxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxuXHRcdHtcblx0XHRcdGRheXMubWFwKChkYXksaSk9Pihcblx0XHRcdFx0PExpc3Qga2V5PXtpfSBzdHlsZT17e21pbkhlaWdodDptaW5IZWlnaHQqMy80fX0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLGRvbmVzPVtdfSxqKT0+KFxuXHRcdFx0XHRcdFx0XHQ8TGlzdEl0ZW0ga2V5PXtqfVxuXHRcdFx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pi0xPT1kb25lcy5pbmRleE9mKGkpICYmIGN1cnJlbnQ+PWkgJiYgZGlzcGF0Y2goQUNUSU9OLkRPTkUodGFzayxpKSl9XG5cdFx0XHRcdFx0XHRcdFx0bGVmdENoZWNrYm94PXs8VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZihpKX0gZGF5PXtpfSBjdXJyZW50PXtjdXJyZW50fS8+fVxuXHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0KSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvTGlzdD5cblx0XHRcdCkpXG5cdFx0fVxuXHQ8L1N3aXBlYWJsZVRhYnM+XG4pXG5UYXNrUGFkTW9iaWxlLmNvbnRleHRUeXBlcz17XG5cdG11aVRoZW1lOlByb3BUeXBlcy5vYmplY3QsXG5cdEFDVElPTjogUHJvcFR5cGVzLm9iamVjdCxcblx0ZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jXG59XG5cbmNvbnN0IFRvZG9TdGF0dXM9KHt0b2RvLGRvbmUsIGRheSwgY3VycmVudCwgLi4ub3RoZXJzfSx7ZGlzcGF0Y2gsQUNUSU9OfSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9ESVNBQkxFRH0gey4uLm90aGVyc30vPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRU5BQkxFRH0gaG92ZXJDb2xvcj17Q09MT1JfSE9WRVJ9IG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9ICB7Li4ub3RoZXJzfS8+KVxufVxuXG5Ub2RvU3RhdHVzLmNvbnRleHRUeXBlcz17XG5cdEFDVElPTjogUHJvcFR5cGVzLm9iamVjdCxcblx0ZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jXG59XG5jb25zdCBXcmFwcGVyPSh7b25LZXlib2FyZEZvY3VzLC4uLm90aGVyc30pPT4oPHNwYW4gey4uLm90aGVyc30vPilcbiJdfQ==