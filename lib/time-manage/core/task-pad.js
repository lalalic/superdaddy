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
			var knowledge = _ref2.knowledge,
			    task = _ref2.content,
			    _ref2$dones = _ref2.dones,
			    dones = _ref2$dones === undefined ? [] : _ref2$dones;
			return _react2.default.createElement(_materialUi.ListItem, { key: i,
				primaryText: knowledge ? _react2.default.createElement(TaskTitle, { knowledge: knowledge, task: task }) : task,
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
					var knowledge = _ref5.knowledge,
					    task = _ref5.content,
					    _ref5$dones = _ref5.dones,
					    dones = _ref5$dones === undefined ? [] : _ref5$dones;
					return _react2.default.createElement(_materialUi.ListItem, { key: j,
						primaryText: knowledge ? _react2.default.createElement(TaskTitle, { knowledge: knowledge, task: task }) : task,
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

var TaskTitle = function TaskTitle(_ref9, _ref10) {
	var knowledge = _ref9.knowledge,
	    task = _ref9.task;
	var router = _ref10.router,
	    dispatch = _ref10.dispatch,
	    ACTION = _ref10.ACTION;
	return _react2.default.createElement(
		"span",
		{ onClick: function onClick(e) {
				return router.push("/knowledge/" + knowledge);
			}, style: { color: "blue" } },
		task
	);
};

TaskTitle.contextTypes = {
	router: _react.PropTypes.object,
	dispatch: _react.PropTypes.func,
	ACTION: _react.PropTypes.object
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL3Rhc2stcGFkLmpzIl0sIm5hbWVzIjpbIlRhc2tQYWQiLCJtYXRjaCIsInByb3BzIiwiREFZUyIsImkiLCJhIiwic3BsaXQiLCJzcGxpY2UiLCJJVEVNX1NUWUxFIiwiZGlzcGxheSIsIndpZHRoIiwidGV4dEFsaWduIiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiVGFza1BhZFdpZGUiLCJ0b2RvcyIsImN1cnJlbnQiLCJEYXRlIiwiZ2V0RGF5IiwiZGF5cyIsIm1hcCIsImtub3dsZWRnZSIsInRhc2siLCJjb250ZW50IiwiZG9uZXMiLCJpbmRleE9mIiwicmVkdWNlIiwic3RhdGUiLCJwdXNoIiwiVGFza1BhZE1vYmlsZSIsImRpc3BhdGNoIiwiQUNUSU9OIiwibXVpVGhlbWUiLCJtaW5IZWlnaHQiLCJwYWdlIiwiaGVpZ2h0IiwiYXBwQmFyIiwiZm9vdGJhciIsImRheSIsImoiLCJET05FIiwiY29udGV4dFR5cGVzIiwib2JqZWN0IiwiZnVuYyIsIlRvZG9TdGF0dXMiLCJ0b2RvIiwiZG9uZSIsIm90aGVycyIsIldyYXBwZXIiLCJvbktleWJvYXJkRm9jdXMiLCJUYXNrVGl0bGUiLCJyb3V0ZXIiLCJjb2xvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUVBOztBQU9BOzs7O0FBQ0E7Ozs7Ozs7O0FBRU8sSUFBTUEsNEJBQVMsU0FBVEEsT0FBUztBQUFBLFFBQ3JCO0FBQUE7QUFBQSxJQUFZLFVBQVUsR0FBdEI7QUFFQztBQUFBLFVBQU9DLFFBQVEsOEJBQUMsYUFBRCxFQUFtQkMsS0FBbkIsQ0FBUixHQUFzQyw4QkFBQyxXQUFELEVBQWlCQSxLQUFqQixDQUE3QztBQUFBO0FBRkQsRUFEcUI7QUFBQSxDQUFmOztBQVFQLElBQU1DLE9BQUssU0FBTEEsSUFBSyxDQUFDQyxDQUFEO0FBQUEsS0FBR0MsQ0FBSCx1RUFBSyxVQUFVQyxLQUFWLENBQWdCLEVBQWhCLENBQUw7QUFBQSxRQUE0QkYsSUFBRSxDQUFGLElBQU9DLEVBQUVFLE1BQUYsQ0FBU0gsQ0FBVCxFQUFXLENBQVgsRUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBQWIsQ0FBUCxFQUErQkMsQ0FBM0Q7QUFBQSxDQUFYO0FBQ0EsSUFBTUcsYUFBVztBQUNoQkMsVUFBUSxjQURRO0FBRWhCQyxRQUFNLEVBRlU7QUFHaEJDLFlBQVUsUUFITTtBQUloQkMsWUFBVSxFQUpNO0FBS2hCQyxlQUFhO0FBTEcsQ0FBakI7QUFPQSxJQUFNQyxjQUFhLFNBQWJBLFdBQWE7QUFBQSx1QkFBRUMsS0FBRjtBQUFBLEtBQUVBLEtBQUYsOEJBQVEsRUFBUjtBQUFBLHlCQUFXQyxPQUFYO0FBQUEsS0FBV0EsT0FBWCxnQ0FBbUIsSUFBSUMsSUFBSixHQUFXQyxNQUFYLEVBQW5CO0FBQUEsc0JBQXVDQyxJQUF2QztBQUFBLEtBQXVDQSxJQUF2Qyw2QkFBNENoQixLQUFLYSxPQUFMLENBQTVDO0FBQUEsUUFDbEI7QUFBQTtBQUFBO0FBQ0M7QUFDQyxnQkFBWSw0QkFEYjtBQUVDLG9CQUNDO0FBQUMsV0FBRDtBQUFBO0FBQ0VHLFNBQUtDLEdBQUwsQ0FBUyxVQUFDZixDQUFELEVBQUdELENBQUg7QUFBQSxZQUFPO0FBQUE7QUFBQSxRQUFNLEtBQUtBLENBQVgsRUFBYyxPQUFPSSxVQUFyQjtBQUFrQ0g7QUFBbEMsTUFBUDtBQUFBLEtBQVQ7QUFERjtBQUhGLElBREQ7QUFTQywwREFURDtBQVdFVSxRQUFNSyxHQUFOLENBQVUsaUJBQXFDaEIsQ0FBckM7QUFBQSxPQUFFaUIsU0FBRixTQUFFQSxTQUFGO0FBQUEsT0FBcUJDLElBQXJCLFNBQWFDLE9BQWI7QUFBQSwyQkFBMkJDLEtBQTNCO0FBQUEsT0FBMkJBLEtBQTNCLCtCQUFpQyxFQUFqQztBQUFBLFVBQ1Ysc0RBQVUsS0FBS3BCLENBQWY7QUFDQyxpQkFBYWlCLFlBQVksOEJBQUMsU0FBRCxFQUFlLEVBQUNBLG9CQUFELEVBQVdDLFVBQVgsRUFBZixDQUFaLEdBQWlEQSxJQUQvRDtBQUVDLHFCQUNDO0FBQUMsWUFBRDtBQUFBO0FBQ0MsTUFBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWdCRixHQUFoQixDQUFvQjtBQUFBLGFBQ3BCO0FBQUE7QUFBQSxTQUFNLEtBQUtmLENBQVgsRUFBYyxPQUFPRyxVQUFyQjtBQUNDLHFDQUFDLFVBQUQ7QUFDQyxjQUFNYyxJQURQO0FBRUMsY0FBTSxDQUFDLENBQUQsSUFBSUUsTUFBTUMsT0FBTixDQUFjcEIsQ0FBZCxDQUZYO0FBR0MsYUFBS0EsQ0FITjtBQUlDLGlCQUFTVztBQUpWO0FBREQsT0FEb0I7QUFBQSxNQUFwQjtBQUREO0FBSEYsS0FEVTtBQUFBLEdBQVYsRUFrQkVVLE1BbEJGLENBa0JTLFVBQUNDLEtBQUQsRUFBT3RCLENBQVAsRUFBU0QsQ0FBVCxFQUFhO0FBQ3RCdUIsU0FBTUMsSUFBTixDQUFXdkIsQ0FBWDtBQUNBc0IsU0FBTUMsSUFBTixDQUFXLHFEQUFTLFdBQVN4QixDQUFsQixHQUFYO0FBQ0EsVUFBT3VCLEtBQVA7QUFDQSxHQXRCQSxFQXNCQyxFQXRCRDtBQVhGLEVBRGtCO0FBQUEsQ0FBbkI7O0FBc0NBLElBQU1FLGdCQUFjLFNBQWRBLGFBQWM7QUFBQSx5QkFBRWQsS0FBRjtBQUFBLEtBQUVBLEtBQUYsK0JBQVEsRUFBUjtBQUFBLDJCQUFXQyxPQUFYO0FBQUEsS0FBV0EsT0FBWCxpQ0FBbUIsSUFBSUMsSUFBSixHQUFXQyxNQUFYLEVBQW5CO0FBQUEsd0JBQXVDQyxJQUF2QztBQUFBLEtBQXVDQSxJQUF2Qyw4QkFBNENoQixLQUFLYSxPQUFMLENBQTVDO0FBQUEsS0FDbEJjLFFBRGtCLFNBQ2xCQSxRQURrQjtBQUFBLEtBQ1RDLE1BRFMsU0FDVEEsTUFEUztBQUFBLEtBQ0ZDLFFBREUsU0FDRkEsUUFERTtBQUFBLDZCQUNRQyxTQURSO0FBQUEsS0FDUUEsU0FEUixtQ0FDa0JELFNBQVNFLElBQVQsQ0FBY0MsTUFBZCxHQUFxQkgsU0FBU0ksTUFBVCxDQUFnQkQsTUFBckMsR0FBNENILFNBQVNLLE9BQVQsQ0FBaUJGLE1BRC9FO0FBQUEsUUFFbkI7QUFBQTtBQUFBLElBQWUsT0FBT25CLFVBQVEsQ0FBOUI7QUFDQyxTQUFNRyxLQUFLQyxHQUFMLENBQVMsVUFBQ2tCLEdBQUQsRUFBS2xDLENBQUw7QUFBQSxXQUFTLGlEQUFLLEtBQUtBLENBQVYsRUFBYSxPQUFPa0MsR0FBcEIsRUFBeUIsT0FBT2xDLENBQWhDLEdBQVQ7QUFBQSxJQUFULENBRFA7QUFHRWUsT0FBS0MsR0FBTCxDQUFTLFVBQUNrQixHQUFELEVBQUtsQyxDQUFMO0FBQUEsVUFDUjtBQUFBO0FBQUEsTUFBTSxLQUFLQSxDQUFYLEVBQWMsT0FBTyxFQUFDNkIsV0FBVUEsWUFBVSxDQUFWLEdBQVksQ0FBdkIsRUFBckI7QUFFRWxCLFVBQU1LLEdBQU4sQ0FBVSxpQkFBb0NtQixDQUFwQztBQUFBLFNBQUVsQixTQUFGLFNBQUVBLFNBQUY7QUFBQSxTQUFxQkMsSUFBckIsU0FBYUMsT0FBYjtBQUFBLDZCQUEwQkMsS0FBMUI7QUFBQSxTQUEwQkEsS0FBMUIsK0JBQWdDLEVBQWhDO0FBQUEsWUFDVCxzREFBVSxLQUFLZSxDQUFmO0FBQ0MsbUJBQWFsQixZQUFZLDhCQUFDLFNBQUQsRUFBZSxFQUFDQSxvQkFBRCxFQUFXQyxVQUFYLEVBQWYsQ0FBWixHQUFpREEsSUFEL0Q7QUFFQyxlQUFTO0FBQUEsY0FBRyxDQUFDLENBQUQsSUFBSUUsTUFBTUMsT0FBTixDQUFjckIsQ0FBZCxDQUFKLElBQXdCWSxXQUFTWixDQUFqQyxJQUFzQzBCLFNBQVNDLE9BQU9TLElBQVAsQ0FBWWxCLElBQVosRUFBaUJsQixDQUFqQixDQUFULENBQXpDO0FBQUEsT0FGVjtBQUdDLG9CQUFjLDhCQUFDLFVBQUQsSUFBWSxNQUFNa0IsSUFBbEIsRUFBd0IsTUFBTSxDQUFDLENBQUQsSUFBSUUsTUFBTUMsT0FBTixDQUFjckIsQ0FBZCxDQUFsQyxFQUFvRCxLQUFLQSxDQUF6RCxFQUE0RCxTQUFTWSxPQUFyRTtBQUhmLE9BRFM7QUFBQSxLQUFWO0FBRkYsSUFEUTtBQUFBLEdBQVQ7QUFIRixFQUZtQjtBQUFBLENBQXBCO0FBcUJBYSxjQUFjWSxZQUFkLEdBQTJCO0FBQzFCVCxXQUFTLGlCQUFVVSxNQURPO0FBRTFCWCxTQUFRLGlCQUFVVyxNQUZRO0FBRzFCWixXQUFVLGlCQUFVYTtBQUhNLENBQTNCOztBQU1BLElBQU1DLGFBQVcsU0FBWEEsVUFBVyxlQUEwRDtBQUFBLEtBQW5CZCxRQUFtQixTQUFuQkEsUUFBbUI7QUFBQSxLQUFWQyxNQUFVLFNBQVZBLE1BQVU7O0FBQUEsS0FBeERjLElBQXdELFNBQXhEQSxJQUF3RDtBQUFBLEtBQW5EQyxJQUFtRCxTQUFuREEsSUFBbUQ7QUFBQSxLQUE3Q1IsR0FBNkMsU0FBN0NBLEdBQTZDO0FBQUEsS0FBeEN0QixPQUF3QyxTQUF4Q0EsT0FBd0M7QUFBQSxLQUE1QitCLE1BQTRCOztBQUMxRSxLQUFHRCxJQUFILEVBQ0MsT0FBUSx5REFBVyx3QkFBWCxJQUFrQ0MsTUFBbEMsRUFBUixDQURELEtBRUssSUFBR1QsTUFBSXRCLE9BQVAsRUFDSixPQUFRLHlEQUFXLHNCQUFYLElBQXNDK0IsTUFBdEMsRUFBUixDQURJLEtBR0osT0FBUSx5REFBVywyQkFBWCxFQUFpQyw2QkFBakMsRUFBMEQsU0FBUztBQUFBLFVBQUdqQixTQUFTQyxPQUFPUyxJQUFQLENBQVlLLElBQVosRUFBaUJQLEdBQWpCLENBQVQsQ0FBSDtBQUFBLEdBQW5FLElBQTRHUyxNQUE1RyxFQUFSO0FBQ0QsQ0FQRDs7QUFTQUgsV0FBV0gsWUFBWCxHQUF3QjtBQUN2QlYsU0FBUSxpQkFBVVcsTUFESztBQUV2QlosV0FBVSxpQkFBVWE7QUFGRyxDQUF4QjtBQUlBLElBQU1LLFVBQVEsU0FBUkEsT0FBUTtBQUFBLEtBQUVDLGVBQUYsU0FBRUEsZUFBRjtBQUFBLEtBQXFCRixNQUFyQjs7QUFBQSxRQUFnQyxzQ0FBVUEsTUFBVixDQUFoQztBQUFBLENBQWQ7O0FBRUEsSUFBTUcsWUFBVSxTQUFWQSxTQUFVO0FBQUEsS0FBRTdCLFNBQUYsU0FBRUEsU0FBRjtBQUFBLEtBQVlDLElBQVosU0FBWUEsSUFBWjtBQUFBLEtBQW1CNkIsTUFBbkIsVUFBbUJBLE1BQW5CO0FBQUEsS0FBMEJyQixRQUExQixVQUEwQkEsUUFBMUI7QUFBQSxLQUFtQ0MsTUFBbkMsVUFBbUNBLE1BQW5DO0FBQUEsUUFDZjtBQUFBO0FBQUEsSUFBTSxTQUFTO0FBQUEsV0FBR29CLE9BQU92QixJQUFQLGlCQUEwQlAsU0FBMUIsQ0FBSDtBQUFBLElBQWYsRUFBMEQsT0FBTyxFQUFDK0IsT0FBTSxNQUFQLEVBQWpFO0FBQ0U5QjtBQURGLEVBRGU7QUFBQSxDQUFoQjs7QUFNQTRCLFVBQVVULFlBQVYsR0FBdUI7QUFDdEJVLFNBQVEsaUJBQVVULE1BREk7QUFFdEJaLFdBQVUsaUJBQVVhLElBRkU7QUFHdEJaLFNBQVEsaUJBQVVXO0FBSEksQ0FBdkIiLCJmaWxlIjoidGFzay1wYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IE1lZGlhUXVlcnkgZnJvbSBcInJlYWN0LXJlc3BvbnNpdmVcIlxyXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sIFN1YmhlYWRlcixEaXZpZGVyLFRhYiwgRmxhdEJ1dHRvbixJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQge1RhYmxlLCBUYWJsZUJvZHksIFRhYmxlSGVhZGVyLCBUYWJsZUhlYWRlckNvbHVtbiwgVGFibGVSb3csIFRhYmxlUm93Q29sdW1ufSBmcm9tICdtYXRlcmlhbC11aS9UYWJsZSdcclxuXHJcbmltcG9ydCB7XHJcblx0eWVsbG93NTAwIGFzIENPTE9SX0RPTkVcclxuXHQseWVsbG93MjAwIGFzIENPTE9SX0hPVkVSXHJcblx0LGxpZ2h0Qmx1ZTEwMCBhcyBDT0xPUl9FTkFCTEVEXHJcblx0LGdyZXkzMDAgYXMgQ09MT1JfRElTQUJMRURcclxufSBmcm9tIFwibWF0ZXJpYWwtdWkvc3R5bGVzL2NvbG9yc1wiXHJcblxyXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9zd2lwZS10YWJzXCJcclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuXHJcbmV4cG9ydCBjb25zdCBUYXNrUGFkPShwcm9wcz0+KFxyXG5cdDxNZWRpYVF1ZXJ5IG1heFdpZHRoPXs5NjB9PlxyXG5cdHtcclxuXHRcdG1hdGNoPT5tYXRjaCA/IDxUYXNrUGFkTW9iaWxlIHsuLi5wcm9wc30vPiA6IDxUYXNrUGFkV2lkZSB7Li4ucHJvcHN9Lz5cclxuXHR9XHJcblx0PC9NZWRpYVF1ZXJ5PlxyXG4pKVxyXG5cclxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oaTw3ICYmIGEuc3BsaWNlKGksMSw8Yj7ku4rlpKk8L2I+KSxhKVxyXG5jb25zdCBJVEVNX1NUWUxFPXtcclxuXHRkaXNwbGF5OlwiaW5saW5lLWJsb2NrXCIsXHJcblx0d2lkdGg6NjAsXHJcblx0dGV4dEFsaWduOlwiY2VudGVyXCIsXHJcblx0bWFyZ2luVG9wOjE2LFxyXG5cdG1hcmdpbkJvdHRvbToxNlxyXG59XHJcbmNvbnN0IFRhc2tQYWRXaWRlPSgoe3RvZG9zPVtdLGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxyXG5cdDxMaXN0PlxyXG5cdFx0PExpc3RJdGVtXHJcblx0XHRcdHByaW1hcnlUZXh0PVwi5Lu75YqhXFzmmJ/mnJ9cIlxyXG5cdFx0XHRyaWdodEljb25CdXR0b249e1xyXG5cdFx0XHRcdDxXcmFwcGVyPlxyXG5cdFx0XHRcdFx0e2RheXMubWFwKChhLGkpPT48c3BhbiBrZXk9e2l9IHN0eWxlPXtJVEVNX1NUWUxFfT57YX08L3NwYW4+KX1cclxuXHRcdFx0XHQ8L1dyYXBwZXI+XHJcblx0XHRcdH1cclxuXHRcdC8+XHJcblx0XHQ8RGl2aWRlci8+XHJcblxyXG5cdFx0e3RvZG9zLm1hcCgoe2tub3dsZWRnZSwgY29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9PihcclxuXHRcdFx0PExpc3RJdGVtIGtleT17aX1cclxuXHRcdFx0XHRwcmltYXJ5VGV4dD17a25vd2xlZGdlID8gPFRhc2tUaXRsZSB7Li4ue2tub3dsZWRnZSx0YXNrfX0vPiA6IHRhc2t9XHJcblx0XHRcdFx0cmlnaHRJY29uQnV0dG9uPXtcclxuXHRcdFx0XHRcdDxXcmFwcGVyPlxyXG5cdFx0XHRcdFx0e1swLDEsMiwzLDQsNSw2XS5tYXAoYT0+KFxyXG5cdFx0XHRcdFx0XHQ8c3BhbiBrZXk9e2F9IHN0eWxlPXtJVEVNX1NUWUxFfT5cclxuXHRcdFx0XHRcdFx0XHQ8VG9kb1N0YXR1c1xyXG5cdFx0XHRcdFx0XHRcdFx0dG9kbz17dGFza31cclxuXHRcdFx0XHRcdFx0XHRcdGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfVxyXG5cdFx0XHRcdFx0XHRcdFx0ZGF5PXthfVxyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudD17Y3VycmVudH1cclxuXHRcdFx0XHRcdFx0XHRcdC8+XHJcblx0XHRcdFx0XHRcdDwvc3Bhbj5cclxuXHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9XcmFwcGVyPlxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHQvPlxyXG5cdFx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XHJcblx0XHRcdHN0YXRlLnB1c2goYSlcclxuXHRcdFx0c3RhdGUucHVzaCg8RGl2aWRlciBrZXk9e2BfJHtpfWB9Lz4pXHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSxbXSl9XHJcblx0PC9MaXN0PlxyXG4pKVxyXG5cclxuY29uc3QgVGFza1BhZE1vYmlsZT0oe3RvZG9zPVtdLGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9LFxyXG5cdHtkaXNwYXRjaCxBQ1RJT04sbXVpVGhlbWUsIG1pbkhlaWdodD1tdWlUaGVtZS5wYWdlLmhlaWdodC1tdWlUaGVtZS5hcHBCYXIuaGVpZ2h0LW11aVRoZW1lLmZvb3RiYXIuaGVpZ2h0fSk9PihcclxuXHQ8U3dpcGVhYmxlVGFicyBpbmRleD17Y3VycmVudCU3fVxyXG5cdFx0dGFicz17ZGF5cy5tYXAoKGRheSxpKT0+PFRhYiBrZXk9e2l9IGxhYmVsPXtkYXl9IHZhbHVlPXtpfS8+KX0+XHJcblx0XHR7XHJcblx0XHRcdGRheXMubWFwKChkYXksaSk9PihcclxuXHRcdFx0XHQ8TGlzdCBrZXk9e2l9IHN0eWxlPXt7bWluSGVpZ2h0Om1pbkhlaWdodCozLzR9fT5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0dG9kb3MubWFwKCh7a25vd2xlZGdlLCBjb250ZW50OnRhc2ssZG9uZXM9W119LGopPT4oXHJcblx0XHRcdFx0XHRcdFx0PExpc3RJdGVtIGtleT17an1cclxuXHRcdFx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PXtrbm93bGVkZ2UgPyA8VGFza1RpdGxlIHsuLi57a25vd2xlZGdlLHRhc2t9fS8+IDogdGFza31cclxuXHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9Pi0xPT1kb25lcy5pbmRleE9mKGkpICYmIGN1cnJlbnQ+PWkgJiYgZGlzcGF0Y2goQUNUSU9OLkRPTkUodGFzayxpKSl9XHJcblx0XHRcdFx0XHRcdFx0XHRsZWZ0Q2hlY2tib3g9ezxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGkpfSBkYXk9e2l9IGN1cnJlbnQ9e2N1cnJlbnR9Lz59XHJcblx0XHRcdFx0XHRcdFx0Lz5cclxuXHRcdFx0XHRcdFx0KSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L0xpc3Q+XHJcblx0XHRcdCkpXHJcblx0XHR9XHJcblx0PC9Td2lwZWFibGVUYWJzPlxyXG4pXHJcblRhc2tQYWRNb2JpbGUuY29udGV4dFR5cGVzPXtcclxuXHRtdWlUaGVtZTpQcm9wVHlwZXMub2JqZWN0LFxyXG5cdEFDVElPTjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcclxufVxyXG5cclxuY29uc3QgVG9kb1N0YXR1cz0oe3RvZG8sZG9uZSwgZGF5LCBjdXJyZW50LCAuLi5vdGhlcnN9LHtkaXNwYXRjaCxBQ1RJT059KT0+e1xyXG5cdGlmKGRvbmUpXHJcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9e0NPTE9SX0RPTkV9IHsuLi5vdGhlcnN9Lz4pXHJcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcclxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj17Q09MT1JfRElTQUJMRUR9IHsuLi5vdGhlcnN9Lz4pXHJcblx0ZWxzZVxyXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPXtDT0xPUl9FTkFCTEVEfSBob3ZlckNvbG9yPXtDT0xPUl9IT1ZFUn0gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0gIHsuLi5vdGhlcnN9Lz4pXHJcbn1cclxuXHJcblRvZG9TdGF0dXMuY29udGV4dFR5cGVzPXtcclxuXHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXHJcblx0ZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jXHJcbn1cclxuY29uc3QgV3JhcHBlcj0oe29uS2V5Ym9hcmRGb2N1cywuLi5vdGhlcnN9KT0+KDxzcGFuIHsuLi5vdGhlcnN9Lz4pXHJcblxyXG5jb25zdCBUYXNrVGl0bGU9KHtrbm93bGVkZ2UsdGFza30se3JvdXRlcixkaXNwYXRjaCxBQ1RJT059KT0+KFxyXG5cdDxzcGFuIG9uQ2xpY2s9e2U9PnJvdXRlci5wdXNoKGAva25vd2xlZGdlLyR7a25vd2xlZGdlfWApfSBzdHlsZT17e2NvbG9yOlwiYmx1ZVwifX0+XHJcblx0XHR7dGFza31cclxuXHQ8L3NwYW4+XHJcbilcclxuXHJcblRhc2tUaXRsZS5jb250ZXh0VHlwZXM9e1xyXG5cdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmMsXHJcblx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0XHJcbn1cclxuIl19