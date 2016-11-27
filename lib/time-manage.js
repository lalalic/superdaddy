"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = exports.ACTION = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _Table = require("material-ui/Table");

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _swipeTabs = require("./components/swipe-tabs");

var _swipeTabs2 = _interopRequireDefault(_swipeTabs);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _alarmOff = require("material-ui/svg-icons/action/alarm-off");

var _alarmOff2 = _interopRequireDefault(_alarmOff);

var _playlistAdd = require("material-ui/svg-icons/av/playlist-add");

var _playlistAdd2 = _interopRequireDefault(_playlistAdd);

var _arrowUpward = require("material-ui/svg-icons/navigation/arrow-upward");

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

var _arrowDownward = require("material-ui/svg-icons/navigation/arrow-downward");

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _verticalAlignTop = require("material-ui/svg-icons/editor/vertical-align-top");

var _verticalAlignTop2 = _interopRequireDefault(_verticalAlignTop);

var _verticalAlignBottom = require("material-ui/svg-icons/editor/vertical-align-bottom");

var _verticalAlignBottom2 = _interopRequireDefault(_verticalAlignBottom);

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _visibility = require("material-ui/svg-icons/action/visibility");

var _visibility2 = _interopRequireDefault(_visibility);

var _visibilityOff = require("material-ui/svg-icons/action/visibility-off");

var _visibilityOff2 = _interopRequireDefault(_visibilityOff);

var _selector = require("./selector");

var _db = require("./db");

var _reactResponsive = require("react-responsive");

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

var _dashboard = require("./dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty;


var DOMAIN = "time";

var changeTodos = function changeTodos(f) {
	return function (dispatch, getState) {
		var state = getState();
		var child = (0, _selector.getCurrentChild)(state);
		if (child.todoWeek == undefined) child.todoWeek = new Date().getWeek();

		var _child$todos = child.todos,
		    todos = _child$todos === undefined ? [] : _child$todos;


		var handled = f(child.todos = [].concat((0, _toConsumableArray3.default)(todos)), child);
		if (!(handled && handled.then)) handled = _promise2.default.resolve();
		return handled.then(function (a) {
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		});
	};
};
var ACTION = exports.ACTION = {
	ADD: function ADD(todo) {
		return function (dispatch, getState) {
			if (!todo) return _promise2.default.resolve();
			return changeTodos(function (todos) {
				switch (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) {
					case "object":
						todos.push(todo);
						break;
					default:
						if (!todos.find(function (a) {
							return a.content == todo;
						})) todos.push({ content: todo });
				}
			})(dispatch, getState);
		};
	},
	REMOVE: function REMOVE(todo) {
		return changeTodos(function (todos) {
			var i = (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) == 'object' ? todos.findIndex(function (a) {
				return a._id = todo._id;
			}) : todos.findIndex(function (a) {
				return a.content = todo;
			});

			if (i != -1) todos.splice(i, 1);
		});
	},
	REMOVE_BY_INDEX: function REMOVE_BY_INDEX(i) {
		return changeTodos(function (todos) {
			return todos.splice(i, 1);
		});
	},
	DONE: function DONE(todo, day) {
		return changeTodos(function (todos, child) {
			var task = todos.find(function (a) {
				return a.content == todo;
			});
			var _task$dones = task.dones,
			    dones = _task$dones === undefined ? [] : _task$dones;

			dones.push(day);
			task.dones = dones;
			child.score = child.score + 1;
		});
	},
	EDITING: function EDITING() {
		var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		return { type: DOMAIN + "/edit", payload: status };
	},
	UP: function UP(i) {
		return changeTodos(function (todos) {
			var target = todos[i];
			todos.splice(i, 1);
			todos.splice((i - 1) % (todos.length + 1), 0, target);
		});
	},
	DOWN: function DOWN(i) {
		return changeTodos(function (todos) {
			var target = todos[i];
			todos.splice(i, 1);
			todos.splice((i + 1) % (todos.length + 1), 0, target);
		});
	},
	TOP: function TOP(i) {
		return changeTodos(function (todos) {
			var target = todos[i];
			todos.splice(i, 1);
			todos.unshift(target);
		});
	},
	BOTTOM: function BOTTOM(i) {
		return changeTodos(function (todos) {
			var target = todos[i];
			todos.splice(i, 1);
			todos.push(target);
		});
	},
	TOGGLE_VISIBLE: function TOGGLE_VISIBLE(i) {
		return changeTodos(function (todos) {
			var target = todos[i];
			target.hidden = !!!target.hidden;
		});
	},
	RESET: function RESET(a) {
		return function (dispatch, getState) {
			return changeTodos(function (todos, child) {
				//save history
				var dones = todos.filter(function (_ref) {
					var _ref$dones = _ref.dones,
					    dones = _ref$dones === undefined ? [] : _ref$dones;
					return dones.length;
				});
				if (dones.length) {
					return _db.Task.finishWeekTasks(child, dones).then(function (a) {
						todos.forEach(function (a) {
							return a.dones = [];
						});
						child.todoWeek = new Date().getWeek();
					});
				} else child.todoWeek = new Date().getWeek();
			})(disptach, getState);
		};
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { editing: 0 };
	var _ref2 = arguments[1];
	var type = _ref2.type,
	    payload = _ref2.payload;

	switch (type) {
		case DOMAIN + "/edit":
			return { editing: payload };
			break;
	}
	return state;
};

var TimeManage = exports.TimeManage = function TimeManage(_ref3) {
	var dispatch = _ref3.dispatch,
	    goal = _ref3.goal,
	    editing = _ref3.editing,
	    todoWeek = _ref3.todoWeek,
	    _ref3$week = _ref3.week,
	    week = _ref3$week === undefined ? new Date().getWeek() : _ref3$week,
	    _ref3$isCurrentWeek = _ref3.isCurrentWeek,
	    isCurrentWeek = _ref3$isCurrentWeek === undefined ? todoWeek == week : _ref3$isCurrentWeek;
	return _react2.default.createElement(
		"div",
		null,
		goal ? _react2.default.createElement(
			"div",
			null,
			isCurrentWeek ? _react2.default.createElement(TodoEditor, { editing: editing }) : _react2.default.createElement(_materialUi.RaisedButton, { onClick: function onClick(e) {
					return dispatch(ACTION.RESET());
				},
				icon: _react2.default.createElement(_cloudDone2.default, null),
				label: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
			}),
			isCurrentWeek && editing ? _react2.default.createElement(TaskPadEditor, null) : _react2.default.createElement(TaskPad, { current: isCurrentWeek ? new Date().getDay() : 7 })
		) : _react2.default.createElement(ScorePad, { height: 100 })
	);
};

var TodoEditor = (0, _reactRedux.connect)()(function (_ref4) {
	var dispatch = _ref4.dispatch,
	    editing = _ref4.editing,
	    refTask = _ref4.refTask,
	    refForm = _ref4.refForm;
	return _react2.default.createElement(_materialUi.AppBar, {
		iconElementLeft: _react2.default.createElement("span", null),
		iconElementRight: _react2.default.createElement(
			"span",
			null,
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.ADD(refTask.getValue().trim()));
					} },
				_react2.default.createElement(_playlistAdd2.default, { color: "white" })
			),
			_react2.default.createElement(
				_materialUi.IconButton,
				{ onClick: function onClick(e) {
						return dispatch(ACTION.EDITING(editing ? 0 : 1));
					} },
				editing ? _react2.default.createElement(_cloudDone2.default, { color: "white" }) : _react2.default.createElement(_modeEdit2.default, { color: "white" })
			)
		),
		title: _react2.default.createElement(_materialUi.AutoComplete, { ref: function ref(a) {
				return refTask = a;
			},
			dataSource: [],
			hintText: "\u4EFB\u52A1",
			fullWidth: true,
			onKeyDown: function onKeyDown(e) {
				return e.keyCode == 13 && dispatch(ACTION.ADD(refTask.getValue().trim()));
			}
		})
	});
});

var TaskPad = (0, _reactRedux.connect)(function (state) {
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
var TaskPadWide = function TaskPadWide(_ref5) {
	var _ref5$todos = _ref5.todos,
	    todos = _ref5$todos === undefined ? [] : _ref5$todos,
	    dispatch = _ref5.dispatch,
	    _ref5$current = _ref5.current,
	    current = _ref5$current === undefined ? new Date().getDay() : _ref5$current,
	    _ref5$days = _ref5.days,
	    days = _ref5$days === undefined ? DAYS(current) : _ref5$days;
	return _react2.default.createElement(
		_Table.Table,
		null,
		_react2.default.createElement(
			_Table.TableHeader,
			{ displaySelectAll: false, adjustForCheckbox: false },
			_react2.default.createElement(
				_Table.TableRow,
				null,
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4EFB\u52A1\\\u661F\u671F"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[0]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[1]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[2]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[3]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[4]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[5]
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					days[6]
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref6, i) {
				var task = _ref6.content,
				    _ref6$dones = _ref6.dones,
				    dones = _ref6$dones === undefined ? [] : _ref6$dones;
				return _react2.default.createElement(
					_Table.TableRow,
					{ key: i },
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						task
					),
					[0, 1, 2, 3, 4, 5, 6].map(function (a) {
						return _react2.default.createElement(
							_Table.TableRowColumn,
							{ key: a },
							_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(a), day: a, current: current })
						);
					})
				);
			})
		)
	);
};

var WEEKDAYS = function WEEKDAYS(i) {
	var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "日一二三四五六".split("").map(function (a) {
		return "" + a;
	});
	return a.splice(i, 1, "今天"), a;
};
var TaskPadMobile = function TaskPadMobile(_ref7) {
	var _ref7$todos = _ref7.todos,
	    todos = _ref7$todos === undefined ? [] : _ref7$todos,
	    dispatch = _ref7.dispatch,
	    _ref7$current = _ref7.current,
	    current = _ref7$current === undefined ? new Date().getDay() : _ref7$current,
	    _ref7$days = _ref7.days,
	    days = _ref7$days === undefined ? WEEKDAYS(current) : _ref7$days;
	return _react2.default.createElement(
		_swipeTabs2.default,
		{ index: current,
			tabs: days.map(function (day, i) {
				return _react2.default.createElement(_materialUi.Tab, { key: i, label: day, value: i });
			}) },
		days.map(function (day, i) {
			return _react2.default.createElement(
				_Table.Table,
				{ key: i },
				_react2.default.createElement(
					_Table.TableBody,
					{ displayRowCheckbox: false },
					todos.map(function (_ref8, j) {
						var task = _ref8.content,
						    _ref8$dones = _ref8.dones,
						    dones = _ref8$dones === undefined ? [] : _ref8$dones;
						return _react2.default.createElement(
							_Table.TableRow,
							{ key: j },
							_react2.default.createElement(
								_Table.TableRowColumn,
								{ style: { width: 60 } },
								_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(i), day: i, current: current })
							),
							_react2.default.createElement(
								_Table.TableRowColumn,
								null,
								task
							)
						);
					})
				)
			);
		})
	);
};

var TaskPadEditor = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref9) {
	var _ref9$todos = _ref9.todos,
	    todos = _ref9$todos === undefined ? [] : _ref9$todos,
	    dispatch = _ref9.dispatch;
	return _react2.default.createElement(
		_Table.Table,
		null,
		_react2.default.createElement(
			_Table.TableHeader,
			{ displaySelectAll: false, adjustForCheckbox: false },
			_react2.default.createElement(
				_Table.TableRow,
				null,
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4EFB\u52A1\\\u64CD\u4F5C"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ style: { width: 60 } },
					"\u5220\u9664"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ style: { width: 60 } },
					"\u9690\u85CF"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ colSpan: 4, style: { width: 4 * 60 } },
					"\u987A\u5E8F"
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref10, i) {
				var task = _ref10.content,
				    _ref10$dones = _ref10.dones,
				    dones = _ref10$dones === undefined ? [] : _ref10$dones,
				    hidden = _ref10.hidden;
				return _react2.default.createElement(
					_Table.TableRow,
					{ key: i },
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						task
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						{ style: { width: 60 } },
						_react2.default.createElement(
							_materialUi.IconButton,
							{ onClick: function onClick(e) {
									return dispatch(ACTION.REMOVE_BY_INDEX(i));
								} },
							_react2.default.createElement(_alarmOff2.default, null)
						)
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						{ style: { width: 60 } },
						_react2.default.createElement(Visibility, { dispatch: dispatch, i: i, visible: !hidden })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						{ colSpan: 4, style: { width: 4 * 60 } },
						_react2.default.createElement(Order, { dispatch: dispatch, i: i })
					)
				);
			})
		)
	);
});

var TodoStatus = (0, _reactRedux.connect)()(function (_ref11) {
	var todo = _ref11.todo,
	    done = _ref11.done,
	    day = _ref11.day,
	    dispatch = _ref11.dispatch,
	    current = _ref11.current;

	if (done) return _react2.default.createElement(_mood2.default, { color: "yellow" });else if (day > current) return _react2.default.createElement(_mood2.default, { color: "lightgray" });else return _react2.default.createElement(_mood2.default, { color: "lightcyan", hoverColor: "yellow", onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} });
});

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (props) {
	return _react2.default.createElement(_dashboard2.default, props);
});

var Order = function Order(_ref12) {
	var i = _ref12.i,
	    dispatch = _ref12.dispatch;
	return _react2.default.createElement(
		"span",
		null,
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.TOP(i));
				} },
			_react2.default.createElement(_verticalAlignTop2.default, null)
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.UP(i));
				} },
			_react2.default.createElement(_arrowUpward2.default, null)
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.DOWN(i));
				} },
			_react2.default.createElement(_arrowDownward2.default, null)
		),
		_react2.default.createElement(
			_materialUi.IconButton,
			{ onClick: function onClick(e) {
					return dispatch(ACTION.BOTTOM(i));
				} },
			_react2.default.createElement(_verticalAlignBottom2.default, null)
		)
	);
};

var Visibility = function Visibility(_ref13) {
	var i = _ref13.i,
	    dispatch = _ref13.dispatch,
	    visible = _ref13.visible,
	    _ref13$Icon = _ref13.Icon,
	    Icon = _ref13$Icon === undefined ? !visible ? _visibilityOff2.default : _visibility2.default : _ref13$Icon;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.TOGGLE_VISIBLE(i));
			} },
		_react2.default.createElement(Icon, null)
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvV2VlayIsInVuZGVmaW5lZCIsIkRhdGUiLCJnZXRXZWVrIiwidG9kb3MiLCJoYW5kbGVkIiwiZiIsInRoZW4iLCJyZXNvbHZlIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiQUREIiwidG9kbyIsInB1c2giLCJmaW5kIiwiYSIsImNvbnRlbnQiLCJSRU1PVkUiLCJpIiwiZmluZEluZGV4IiwiX2lkIiwic3BsaWNlIiwiUkVNT1ZFX0JZX0lOREVYIiwiRE9ORSIsImRheSIsInRhc2siLCJkb25lcyIsInNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJ0YXJnZXQiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiZGlzcHRhY2giLCJyZWR1Y2VyIiwiZWRpdGluZyIsIlRpbWVNYW5hZ2UiLCJnb2FsIiwid2VlayIsImlzQ3VycmVudFdlZWsiLCJnZXREYXkiLCJUb2RvRWRpdG9yIiwicmVmVGFzayIsInJlZkZvcm0iLCJnZXRWYWx1ZSIsInRyaW0iLCJlIiwia2V5Q29kZSIsIlRhc2tQYWQiLCJtYXRjaCIsInByb3BzIiwiREFZUyIsInNwbGl0IiwiVGFza1BhZFdpZGUiLCJjdXJyZW50IiwiZGF5cyIsIm1hcCIsImluZGV4T2YiLCJXRUVLREFZUyIsIlRhc2tQYWRNb2JpbGUiLCJqIiwid2lkdGgiLCJUYXNrUGFkRWRpdG9yIiwiVG9kb1N0YXR1cyIsImRvbmUiLCJTY29yZVBhZCIsIk9yZGVyIiwiVmlzaWJpbGl0eSIsInZpc2li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LFVBQWFBLE9BQWI7QUFBQSwwQkFBcUJDLElBQXJCO0FBQUEsS0FBcUJBLElBQXJCLCtCQUEyQixDQUFDRCxPQUFELGlEQUEzQjtBQUFBLFFBQ2hCO0FBQUE7QUFBQSxJQUFZLFNBQVM7QUFBQSxXQUFHdkYsU0FBU2lCLE9BQU82QixjQUFQLENBQXNCckIsQ0FBdEIsQ0FBVCxDQUFIO0FBQUEsSUFBckI7QUFBNEQsZ0NBQUMsSUFBRDtBQUE1RCxFQURnQjtBQUFBLENBQWpCOztrQkFJZSxzQkFBYzhCLFVBQWQsRUFBeUIsRUFBQ0YsZ0JBQUQsRUFBekIsQyIsImZpbGUiOiJ0aW1lLW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtBcHBCYXIsVGV4dEZpZWxkLEZsYXRCdXR0b24sSWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlLFJhaXNlZEJ1dHRvbiwgVGFicywgVGFifSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVMsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgU3dpcGVhYmxlVGFicyBmcm9tIFwiLi9jb21wb25lbnRzL3N3aXBlLXRhYnNcIlxuXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tb2ZmXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYXYvcGxheWxpc3QtYWRkXCJcblxuaW1wb3J0IEljb25VcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctdXB3YXJkXCJcbmltcG9ydCBJY29uRG93biBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmRcIlxuaW1wb3J0IEljb25Ub3AgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tdG9wXCJcbmltcG9ydCBJY29uQm90dG9tIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLWJvdHRvbVwiXG5cbmltcG9ydCBJY29uRWRpdCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9tb2RlLWVkaXRcIlxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuXG5pbXBvcnQgSWNvblZpc2libGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eVwiXG5pbXBvcnQgSWNvbkhpZGRlbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5LW9mZlwiXG5cblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi9kYlwiXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY29uc3QgRE9NQUlOPVwidGltZVwiXG5cbmNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdGlmKGNoaWxkLnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblxuXHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXG5cdGxldCBoYW5kbGVkPWYoY2hpbGQudG9kb3M9Wy4uLnRvZG9zXSwgY2hpbGQpXG5cdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxuXHRcdGhhbmRsZWQ9UHJvbWlzZS5yZXNvbHZlKClcblx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHR9XG5cdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdH1cblx0LFJFTU9WRTogdG9kbz0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXG5cdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLl9pZD10b2RvLl9pZClcblx0XHRcdDogdG9kb3MuZmluZEluZGV4KGE9PmEuY29udGVudD10b2RvKTtcblxuXHRcdGlmKGkhPS0xKVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0fSlcblx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxuXHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0bGV0IHtkb25lcz1bXX09dGFza1xuXHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRjaGlsZC5zY29yZT1jaGlsZC5zY29yZSsxXG5cdH0pXG5cdCxFRElUSU5HOiAoc3RhdHVzPTApPT4oe3R5cGU6YCR7RE9NQUlOfS9lZGl0YCwgcGF5bG9hZDpzdGF0dXN9KVxuXHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxET1dOOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaSsxKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsVE9QOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnVuc2hpZnQodGFyZ2V0KVxuXHR9KVxuXHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnB1c2godGFyZ2V0KVxuXHR9KVxuXHQsVE9HR0xFX1ZJU0lCTEU6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRhcmdldC5oaWRkZW49ISEhdGFyZ2V0LmhpZGRlblxuXHR9KVxuXHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdFx0Ly9zYXZlIGhpc3Rvcnlcblx0XHRcdGxldCBkb25lcz10b2Rvcy5maWx0ZXIoKHtkb25lcz1bXX0pPT5kb25lcy5sZW5ndGgpXG5cdFx0XHRpZihkb25lcy5sZW5ndGgpe1xuXHRcdFx0XHRyZXR1cm4gVGFzay5maW5pc2hXZWVrVGFza3MoY2hpbGQsIGRvbmVzKS50aGVuKGE9Pntcblx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXG5cdFx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHRcdFx0fSlcblx0XHRcdH1lbHNlXG5cdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0fSkoZGlzcHRhY2gsZ2V0U3RhdGUpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXtlZGl0aW5nOjB9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYCR7RE9NQUlOfS9lZGl0YDpcblx0XHRyZXR1cm4ge2VkaXRpbmc6cGF5bG9hZH1cblx0YnJlYWtcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHtkaXNwYXRjaCwgZ29hbCwgZWRpdGluZywgdG9kb1dlZWssIHdlZWs9bmV3IERhdGUoKS5nZXRXZWVrKCksIGlzQ3VycmVudFdlZWs9dG9kb1dlZWs9PXdlZWt9KT0+KFxuICAgIDxkaXY+XG5cdFx0e2dvYWw/XG5cdFx0XHQoPGRpdj5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrXG5cdFx0XHRcdFx0PyA8VG9kb0VkaXRvciBlZGl0aW5nPXtlZGl0aW5nfS8+XG5cdFx0XHRcdFx0OiA8UmFpc2VkQnV0dG9uICBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVQoKSl9XG5cdFx0XHRcdFx0XHRpY29uPXs8SWNvbkRvbmUvPn1cblx0XHRcdFx0XHRcdGxhYmVsPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHR9XG5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrJiZlZGl0aW5nXG5cdFx0XHRcdFx0PyA8VGFza1BhZEVkaXRvci8+XG5cdFx0XHRcdFx0OiA8VGFza1BhZCBjdXJyZW50PXtpc0N1cnJlbnRXZWVrID8gbmV3IERhdGUoKS5nZXREYXkoKSA6IDd9Lz5cblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+KSA6IDxTY29yZVBhZCBoZWlnaHQ9ezEwMH0vPlxuXHRcdH1cbiAgICA8L2Rpdj5cbilcblxuY29uc3QgVG9kb0VkaXRvcj1jb25uZWN0KCkoKHtkaXNwYXRjaCwgZWRpdGluZywgcmVmVGFzaywgcmVmRm9ybX0pPT4oXG5cdDxBcHBCYXJcblx0XHRpY29uRWxlbWVudExlZnQ9ezxzcGFuLz59XG5cdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHQ8c3Bhbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLmdldFZhbHVlKCkudHJpbSgpKSl9PlxuXHRcdFx0XHRcdDxJY29uQWRkIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoZWRpdGluZyA/IDAgOiAxKSl9PlxuXHRcdFx0XHRcdHtlZGl0aW5nPzxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPiA6IDxJY29uRWRpdCBjb2xvcj1cIndoaXRlXCIvPn1cblx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0PC9zcGFuPlxuXHRcdH1cblx0XHR0aXRsZT17XG5cdFx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0XHRkYXRhU291cmNlPXtbXX1cblx0XHRcdFx0aGludFRleHQ9XCLku7vliqFcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBkaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suZ2V0VmFsdWUoKS50cmltKCkpKX1cblx0XHRcdFx0Lz5cblx0XHR9XG5cdFx0Lz5cbikpXG5cbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcbmNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkocHJvcHM9Pihcblx0PE1lZGlhUXVlcnkgbWF4V2lkdGg9ezk2MH0+XG5cdHtcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XG5cdH1cblx0PC9NZWRpYVF1ZXJ5PlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuICAgIDxUYWJsZT5cbiAgICAgICAgPFRhYmxlSGVhZGVyIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaYn+acnzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbMF19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1sxXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzJdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbM119PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1s0XX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzVdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbNl19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0e1swLDEsMiwzLDQsNSw2XS5tYXAoYT0+KFxuXHRcdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uIGtleT17YX0+XG5cdFx0XHRcdFx0XHRcdDxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfSBkYXk9e2F9IGN1cnJlbnQ9e2N1cnJlbnR9Lz5cblx0XHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0KSl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5pbXBvcnQgU3dpcGVhYmxlVmlld3MgZnJvbSAncmVhY3Qtc3dpcGVhYmxlLXZpZXdzJ1xuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsIFBhcGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5jb25zdCBXRUVLREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikubWFwKGE9PmAke2F9YCkpPT4oYS5zcGxpY2UoaSwxLFwi5LuK5aSpXCIpLGEpXG5jb25zdCBUYXNrUGFkTW9iaWxlPSh7dG9kb3M9W10sIGRpc3BhdGNoLCBjdXJyZW50PW5ldyBEYXRlKCkuZ2V0RGF5KCksZGF5cz1XRUVLREFZUyhjdXJyZW50KX0pPT4oXG5cdDxTd2lwZWFibGVUYWJzIGluZGV4PXtjdXJyZW50fVxuXHRcdHRhYnM9e2RheXMubWFwKChkYXksaSk9PjxUYWIga2V5PXtpfSBsYWJlbD17ZGF5fSB2YWx1ZT17aX0vPil9PlxuXHRcdHtcblx0XHRcdGRheXMubWFwKChkYXksaSk9Pihcblx0XHRcdFx0PFRhYmxlIGtleT17aX0+XG5cdFx0XHRcdFx0PFRhYmxlQm9keSAgZGlzcGxheVJvd0NoZWNrYm94PXtmYWxzZX0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLGRvbmVzPVtdfSxqKT0+KFxuXHRcdFx0XHRcdFx0XHQ8VGFibGVSb3cga2V5PXtqfT5cblx0XHRcdFx0XHRcdFx0XHQ8VGFibGVSb3dDb2x1bW4gc3R5bGU9e3t3aWR0aDo2MH19PlxuXHRcdFx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoaSl9IGRheT17aX0gY3VycmVudD17Y3VycmVudH0vPlxuXHRcdFx0XHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0XHRcdDwvVGFibGVSb3c+XG5cdFx0XHRcdFx0XHQpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L1RhYmxlQm9keT5cblx0XHRcdFx0PC9UYWJsZT5cblx0XHRcdCkpXG5cdFx0fVxuXHQ8L1N3aXBlYWJsZVRhYnM+XG4pXG5cbmNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSl9KSkoKHt0b2Rvcz1bXSwgZGlzcGF0Y2h9KT0+KFxuXHQ8VGFibGU+XG4gICAgICAgIDxUYWJsZUhlYWRlciAgZGlzcGxheVNlbGVjdEFsbD17ZmFsc2V9IGFkanVzdEZvckNoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS7u+WKoVxc5pON5L2cPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbiBzdHlsZT17e3dpZHRoOjYwfX0+5Yig6ZmkPC9UYWJsZUhlYWRlckNvbHVtbj5cblx0XHRcdDxUYWJsZUhlYWRlckNvbHVtbiBzdHlsZT17e3dpZHRoOjYwfX0+6ZqQ6JePPC9UYWJsZUhlYWRlckNvbHVtbj5cblx0XHRcdDxUYWJsZUhlYWRlckNvbHVtbiBjb2xTcGFuPXs0fSBzdHlsZT17e3dpZHRoOjQqNjB9fT7pobrluo88L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgIDxUYWJsZUJvZHkgZGlzcGxheVJvd0NoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdLCBoaWRkZW59LGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4gc3R5bGU9e3t3aWR0aDo2MH19PlxuXHRcdFx0XHRcdFx0PEljb25CdXR0b24gIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkVfQllfSU5ERVgoaSkpfT5cblx0XHRcdFx0XHRcdFx0PEljb25SZW1vdmUvPlxuXHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbiBzdHlsZT17e3dpZHRoOjYwfX0+XG5cdFx0XHRcdFx0XHQ8VmlzaWJpbGl0eSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGk9e2l9IHZpc2libGU9eyFoaWRkZW59Lz5cblx0XHRcdFx0XHQ8L1RhYmxlUm93Q29sdW1uPlxuXHRcdFx0XHRcdDxUYWJsZVJvd0NvbHVtbiBjb2xTcGFuPXs0fSBzdHlsZT17e3dpZHRoOjQqNjB9fT5cblx0XHRcdFx0XHRcdDxPcmRlciBkaXNwYXRjaD17ZGlzcGF0Y2h9IGk9e2l9Lz5cblx0XHRcdFx0XHQ8L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICA8L1RhYmxlQm9keT5cbiAgICA8L1RhYmxlPlxuKSlcblxuY29uc3QgVG9kb1N0YXR1cz1jb25uZWN0KCkoKHt0b2RvLGRvbmUsIGRheSwgZGlzcGF0Y2gsIGN1cnJlbnR9KT0+e1xuXHRpZihkb25lKVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cInllbGxvd1wiLz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwibGlnaHRncmF5XCIvPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cImxpZ2h0Y3lhblwiIGhvdmVyQ29sb3I9XCJ5ZWxsb3dcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9ORSh0b2RvLGRheSkpfS8+KVxufSlcblxuaW1wb3J0IFNjb3JlIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5jb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkocHJvcHM9PjxTY29yZSB7Li4ucHJvcHN9Lz4pXG5cbmNvbnN0IE9yZGVyPSh7aSxkaXNwYXRjaH0pPT4oXG5cdDxzcGFuPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT1AoaSkpfT48SWNvblRvcC8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5VUChpKSl9PjxJY29uVXAvPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9XTihpKSl9PjxJY29uRG93bi8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5CT1RUT00oaSkpfT48SWNvbkJvdHRvbS8+PC9JY29uQnV0dG9uPlxuXHQ8L3NwYW4+XG4pXG5cbmNvbnN0IFZpc2liaWxpdHk9KHtpLGRpc3BhdGNoLHZpc2libGUsSWNvbj0oIXZpc2libGUgPyBJY29uSGlkZGVuIDogSWNvblZpc2libGUpfSk9Pihcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPR0dMRV9WSVNJQkxFKGkpKX0+PEljb24vPjwvSWNvbkJ1dHRvbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==