"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = exports.ACTION = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _appBar = require("./components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

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
			})(dispatch, getState);
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
				label: "保存前" + (week - todoWeek) + "周完成情况"
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
	return _react2.default.createElement(_appBar2.default, {
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
			hintText: "任务",
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
		"今天"
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
					"任务\\星期"
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
				_materialUi.List,
				{ key: i },
				todos.map(function (_ref8, j) {
					var task = _ref8.content,
					    _ref8$dones = _ref8.dones,
					    dones = _ref8$dones === undefined ? [] : _ref8$dones;
					return _react2.default.createElement(_materialUi.ListItem, { key: j,
						primaryText: task,
						leftCheckbox: _react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(i), day: i, current: current })
					});
				})
			);
		})
	);
};

var TaskPadEditor1 = (0, _reactRedux.connect)(function (state) {
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
					"任务\\操作"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ style: { width: 60 } },
					"删除"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ style: { width: 60 } },
					"隐藏"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ colSpan: 4, style: { width: 4 * 60 } },
					"顺序"
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

var TaskPadEditor = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref11) {
	var _ref11$todos = _ref11.todos,
	    todos = _ref11$todos === undefined ? [] : _ref11$todos,
	    dispatch = _ref11.dispatch;
	return _react2.default.createElement(
		_materialUi.List,
		null,
		todos.map(function (_ref12, i) {
			var task = _ref12.content,
			    hidden = _ref12.hidden;
			return _react2.default.createElement(_materialUi.ListItem, { key: i, primaryText: task,
				rightIconButton: _react2.default.createElement(
					"span",
					null,
					_react2.default.createElement(Remover, { i: i, dispatch: dispatch }),
					_react2.default.createElement(Visibility, { i: i, dispatch: dispatch, visible: !hidden }),
					_react2.default.createElement(Order, { i: i, dispatch: dispatch })
				)
			});
		}).reduce(function (state, a, i) {
			state.push(a);
			state.push(_react2.default.createElement(_materialUi.Divider, { inset: false, key: i + "_1" }));
			return state;
		}, [])
	);
});

var TodoStatus = (0, _reactRedux.connect)()(function (_ref13) {
	var todo = _ref13.todo,
	    done = _ref13.done,
	    day = _ref13.day,
	    dispatch = _ref13.dispatch,
	    current = _ref13.current,
	    others = (0, _objectWithoutProperties3.default)(_ref13, ["todo", "done", "day", "dispatch", "current"]);

	if (done) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: "yellow" }, others));else if (day > current) return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: "lightgray" }, others));else return _react2.default.createElement(_mood2.default, (0, _extends3.default)({ color: "lightcyan", hoverColor: "yellow", onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} }, others));
});

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (props) {
	return _react2.default.createElement(_dashboard2.default, props);
});

var Order = function Order(_ref14) {
	var i = _ref14.i,
	    dispatch = _ref14.dispatch;
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

var Visibility = function Visibility(_ref15) {
	var i = _ref15.i,
	    dispatch = _ref15.dispatch,
	    visible = _ref15.visible,
	    _ref15$Icon = _ref15.Icon,
	    Icon = _ref15$Icon === undefined ? !visible ? _visibilityOff2.default : _visibility2.default : _ref15$Icon,
	    style = _ref15.style;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.TOGGLE_VISIBLE(i));
			}, style: style },
		_react2.default.createElement(Icon, null)
	);
};

var Remover = function Remover(_ref16) {
	var i = _ref16.i,
	    dispatch = _ref16.dispatch,
	    style = _ref16.style;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.REMOVE_BY_INDEX(i));
			}, style: style },
		_react2.default.createElement(_alarmOff2.default, null)
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7OztBQUVBOztBQWdKQTs7OztBQXlDQTs7OztBQTBGQTs7Ozs7O0lBalJPOzs7QUFFUCxJQUFNLFNBQU8sTUFBUDs7QUFFTixJQUFNLGNBQVksU0FBWixXQUFZO1FBQUcsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUN6QyxNQUFNLFFBQU0sVUFBTixDQURtQztBQUV6QyxNQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FGbUM7QUFHekMsTUFBRyxNQUFNLFFBQU4sSUFBZ0IsU0FBaEIsRUFDRixNQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FERDs7cUJBR2UsTUFBVjsyQ0FBTSxrQkFOOEI7OztBQVF6QyxNQUFJLFVBQVEsRUFBRSxNQUFNLEtBQU4sOENBQWdCLE9BQWhCLEVBQXdCLEtBQTFCLENBQVIsQ0FScUM7QUFTekMsTUFBRyxFQUFFLFdBQVcsUUFBUSxJQUFSLENBQWIsRUFDRixVQUFRLGtCQUFRLE9BQVIsRUFBUixDQUREO0FBRUEsU0FBTyxRQUFRLElBQVIsQ0FBYTtVQUFHLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFDckIsSUFEcUIsQ0FDaEI7V0FBUyxTQUFTLHVCQUFTLDBCQUFVLE9BQVYsRUFBbUIsV0FBTyxNQUFQLENBQW5CLENBQWtDLFFBQWxDLENBQWxCO0lBQVQ7R0FEYSxDQUFwQixDQVh5QztFQUFyQjtDQUFIO0FBY1gsSUFBTSwwQkFBTztBQUNuQixNQUFLO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFB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QUF1QixDQUF2QixDQUFUO0lBQUgsRUFBd0MsT0FBTyxLQUFQLEVBQTdEO0VBQ0MsdURBREQ7O0NBRGE7O2tCQU1DLHNCQUFjLFVBQWQsRUFBeUIsRUFBQyxnQkFBRCxFQUF6QiIsImZpbGUiOiJ0aW1lLW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGUsUmFpc2VkQnV0dG9uLCBUYWJzLCBUYWJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1RhYmxlLCBUYWJsZUJvZHksIFRhYmxlSGVhZGVyLCBUYWJsZUhlYWRlckNvbHVtbiwgVGFibGVSb3csIFRhYmxlUm93Q29sdW1ufSBmcm9tICdtYXRlcmlhbC11aS9UYWJsZSdcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFUywgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBTd2lwZWFibGVUYWJzIGZyb20gXCIuL2NvbXBvbmVudHMvc3dpcGUtdGFic1wiXG5cbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hdi9wbGF5bGlzdC1hZGRcIlxuXG5pbXBvcnQgSWNvblVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy11cHdhcmRcIlxuaW1wb3J0IEljb25Eb3duIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZFwiXG5pbXBvcnQgSWNvblRvcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi10b3BcIlxuaW1wb3J0IEljb25Cb3R0b20gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tYm90dG9tXCJcblxuaW1wb3J0IEljb25FZGl0IGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL21vZGUtZWRpdFwiXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5cbmltcG9ydCBJY29uVmlzaWJsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5XCJcbmltcG9ydCBJY29uSGlkZGVuIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHktb2ZmXCJcblxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuL3NlbGVjdG9yXCJcbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4vY29tcG9uZW50cy9hcHAtYmFyXCJcblxuaW1wb3J0IHtGYW1pbHksVGFza30gZnJvbSBcIi4vZGJcIlxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cInRpbWVcIlxuXG5jb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRpZihjaGlsZC50b2RvV2Vlaz09dW5kZWZpbmVkKVxuXHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cblx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblxuXHRsZXQgaGFuZGxlZD1mKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10sIGNoaWxkKVxuXHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQuc2NvcmU9Y2hpbGQuc2NvcmUrMVxuXHR9KVxuXHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0LFVQOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaS0xKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0fSlcblx0LEJPVFRPTTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5wdXNoKHRhcmdldClcblx0fSlcblx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cblx0fSlcblx0LFJFU0VUOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRcdC8vc2F2ZSBoaXN0b3J5XG5cdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0aWYoZG9uZXMubGVuZ3RoKXtcblx0XHRcdFx0cmV0dXJuIFRhc2suZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCBkb25lcykudGhlbihhPT57XG5cdFx0XHRcdFx0dG9kb3MuZm9yRWFjaChhPT5hLmRvbmVzPVtdKVxuXHRcdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZVxuXHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZGlzcGF0Y2gsIGdvYWwsIGVkaXRpbmcsIHRvZG9XZWVrLCB3ZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrfSk9PihcbiAgICA8ZGl2PlxuXHRcdHtnb2FsP1xuXHRcdFx0KDxkaXY+XG5cdFx0ICAgICAgICB7aXNDdXJyZW50V2Vla1xuXHRcdFx0XHRcdD8gPFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxuXHRcdFx0XHRcdDogPFJhaXNlZEJ1dHRvbiAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfVxuXHRcdFx0XHRcdFx0aWNvbj17PEljb25Eb25lLz59XG5cdFx0XHRcdFx0XHRsYWJlbD17YOS/neWtmOWJjSR7d2Vlay10b2RvV2Vla33lkajlrozmiJDmg4XlhrVgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0fVxuXG5cdFx0ICAgICAgICB7aXNDdXJyZW50V2VlayYmZWRpdGluZ1xuXHRcdFx0XHRcdD8gPFRhc2tQYWRFZGl0b3IvPlxuXHRcdFx0XHRcdDogPFRhc2tQYWQgY3VycmVudD17aXNDdXJyZW50V2VlayA/IG5ldyBEYXRlKCkuZ2V0RGF5KCkgOiA3fS8+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PikgOiA8U2NvcmVQYWQgaGVpZ2h0PXsxMDB9Lz5cblx0XHR9XG4gICAgPC9kaXY+XG4pXG5cbmNvbnN0IFRvZG9FZGl0b3I9Y29ubmVjdCgpKCh7ZGlzcGF0Y2gsIGVkaXRpbmcsIHJlZlRhc2ssIHJlZkZvcm19KT0+KFxuXHQ8QXBwQmFyXG5cdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHQ8c3Bhbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLmdldFZhbHVlKCkudHJpbSgpKSl9PlxuXHRcdFx0XHRcdDxJY29uQWRkIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoZWRpdGluZyA/IDAgOiAxKSl9PlxuXHRcdFx0XHRcdHtlZGl0aW5nPzxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPiA6IDxJY29uRWRpdCBjb2xvcj1cIndoaXRlXCIvPn1cblx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0PC9zcGFuPlxuXHRcdH1cblx0XHR0aXRsZT17XG5cdFx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0XHRkYXRhU291cmNlPXtbXX1cblx0XHRcdFx0aGludFRleHQ9XCLku7vliqFcIlxuXHRcdFx0XHRmdWxsV2lkdGg9e3RydWV9XG5cdFx0XHRcdG9uS2V5RG93bj17ZT0+ZS5rZXlDb2RlPT0xMyAmJiBkaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suZ2V0VmFsdWUoKS50cmltKCkpKX1cblx0XHRcdFx0Lz5cblx0XHR9XG5cdFx0Lz5cbikpXG5cbmltcG9ydCBNZWRpYVF1ZXJ5IGZyb20gXCJyZWFjdC1yZXNwb25zaXZlXCJcbmNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkocHJvcHM9Pihcblx0PE1lZGlhUXVlcnkgbWF4V2lkdGg9ezk2MH0+XG5cdHtcblx0XHRtYXRjaD0+bWF0Y2ggPyA8VGFza1BhZE1vYmlsZSB7Li4ucHJvcHN9Lz4gOiA8VGFza1BhZFdpZGUgey4uLnByb3BzfS8+XG5cdH1cblx0PC9NZWRpYVF1ZXJ5PlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBUYXNrUGFkV2lkZT0oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuICAgIDxUYWJsZT5cbiAgICAgICAgPFRhYmxlSGVhZGVyIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaYn+acnzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbMF19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1sxXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzJdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbM119PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1s0XX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzVdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbNl19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0e1swLDEsMiwzLDQsNSw2XS5tYXAoYT0+KFxuXHRcdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uIGtleT17YX0+XG5cdFx0XHRcdFx0XHRcdDxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfSBkYXk9e2F9IGN1cnJlbnQ9e2N1cnJlbnR9Lz5cblx0XHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0KSl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5pbXBvcnQgU3dpcGVhYmxlVmlld3MgZnJvbSAncmVhY3Qtc3dpcGVhYmxlLXZpZXdzJ1xuaW1wb3J0IHtMaXN0LExpc3RJdGVtLCBTdWJoZWFkZXIsRGl2aWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuY29uc3QgV0VFS0RBWVM9KGksYT1cIuaXpeS4gOS6jOS4ieWbm+S6lOWFrVwiLnNwbGl0KFwiXCIpLm1hcChhPT5gJHthfWApKT0+KGEuc3BsaWNlKGksMSxcIuS7iuWkqVwiKSxhKVxuY29uc3QgVGFza1BhZE1vYmlsZT0oe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9V0VFS0RBWVMoY3VycmVudCl9KT0+KFxuXHQ8U3dpcGVhYmxlVGFicyBpbmRleD17Y3VycmVudH1cblx0XHR0YWJzPXtkYXlzLm1hcCgoZGF5LGkpPT48VGFiIGtleT17aX0gbGFiZWw9e2RheX0gdmFsdWU9e2l9Lz4pfT5cblx0XHR7XG5cdFx0XHRkYXlzLm1hcCgoZGF5LGkpPT4oXG5cdFx0XHRcdDxMaXN0IGtleT17aX0+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLGRvbmVzPVtdfSxqKT0+KFxuXHRcdFx0XHRcdFx0XHQ8TGlzdEl0ZW0ga2V5PXtqfVxuXHRcdFx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PXt0YXNrfVxuXHRcdFx0XHRcdFx0XHRcdGxlZnRDaGVja2JveD17PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoaSl9IGRheT17aX0gY3VycmVudD17Y3VycmVudH0vPn1cblx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L0xpc3Q+XG5cdFx0XHQpKVxuXHRcdH1cblx0PC9Td2lwZWFibGVUYWJzPlxuKVxuXG5jb25zdCBUYXNrUGFkRWRpdG9yMT1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKX0pKSgoe3RvZG9zPVtdLCBkaXNwYXRjaH0pPT4oXG5cdDxUYWJsZT5cbiAgICAgICAgPFRhYmxlSGVhZGVyICBkaXNwbGF5U2VsZWN0QWxsPXtmYWxzZX0gYWRqdXN0Rm9yQ2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Lu75YqhXFzmk43kvZw8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uIHN0eWxlPXt7d2lkdGg6NjB9fT7liKDpmaQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuXHRcdFx0PFRhYmxlSGVhZGVyQ29sdW1uIHN0eWxlPXt7d2lkdGg6NjB9fT7pmpDol488L1RhYmxlSGVhZGVyQ29sdW1uPlxuXHRcdFx0PFRhYmxlSGVhZGVyQ29sdW1uIGNvbFNwYW49ezR9IHN0eWxlPXt7d2lkdGg6NCo2MH19PumhuuW6jzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgPFRhYmxlQm9keSBkaXNwbGF5Um93Q2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W10sIGhpZGRlbn0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbiBzdHlsZT17e3dpZHRoOjYwfX0+XG5cdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRV9CWV9JTkRFWChpKSl9PlxuXHRcdFx0XHRcdFx0XHQ8SWNvblJlbW92ZS8+XG5cdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdFx0PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uIHN0eWxlPXt7d2lkdGg6NjB9fT5cblx0XHRcdFx0XHRcdDxWaXNpYmlsaXR5IGRpc3BhdGNoPXtkaXNwYXRjaH0gaT17aX0gdmlzaWJsZT17IWhpZGRlbn0vPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uIGNvbFNwYW49ezR9IHN0eWxlPXt7d2lkdGg6NCo2MH19PlxuXHRcdFx0XHRcdFx0PE9yZGVyIGRpc3BhdGNoPXtkaXNwYXRjaH0gaT17aX0vPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUYXNrUGFkRWRpdG9yPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKCh7dG9kb3M9W10sIGRpc3BhdGNofSk9Pihcblx0PExpc3Q+XG5cdHtcblx0dG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBoaWRkZW59LGkpPT4oXG5cdFx0PExpc3RJdGVtIGtleT17aX0gcHJpbWFyeVRleHQ9e3Rhc2t9XG5cdFx0XHRyaWdodEljb25CdXR0b249e1xuXHRcdFx0XHQ8c3Bhbj5cblx0XHRcdFx0XHQ8UmVtb3ZlciBpPXtpfSBkaXNwYXRjaD17ZGlzcGF0Y2h9Lz5cblx0XHRcdFx0XHQ8VmlzaWJpbGl0eSBpPXtpfSBkaXNwYXRjaD17ZGlzcGF0Y2h9IHZpc2libGU9eyFoaWRkZW59Lz5cblx0XHRcdFx0XHQ8T3JkZXIgIGk9e2l9IGRpc3BhdGNoPXtkaXNwYXRjaH0vPlxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHR9XG5cdFx0Lz5cblx0KSkucmVkdWNlKChzdGF0ZSxhLGkpPT57XG5cdFx0XHRzdGF0ZS5wdXNoKGEpXG5cdFx0XHRzdGF0ZS5wdXNoKDxEaXZpZGVyIGluc2V0PXtmYWxzZX0ga2V5PXtgJHtpfV8xYH0vPilcblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0sW10pXG5cdH1cblx0PC9MaXN0PlxuKSlcblxuXG5cbmNvbnN0IFRvZG9TdGF0dXM9Y29ubmVjdCgpKCh7dG9kbyxkb25lLCBkYXksIGRpc3BhdGNoLCBjdXJyZW50LCAuLi5vdGhlcnN9KT0+e1xuXHRpZihkb25lKVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cInllbGxvd1wiIHsuLi5vdGhlcnN9Lz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwibGlnaHRncmF5XCIgey4uLm90aGVyc30vPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cImxpZ2h0Y3lhblwiIGhvdmVyQ29sb3I9XCJ5ZWxsb3dcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9ORSh0b2RvLGRheSkpfSAgey4uLm90aGVyc30vPilcbn0pXG5cbmltcG9ydCBTY29yZSBmcm9tIFwiLi9kYXNoYm9hcmRcIlxuY29uc3QgU2NvcmVQYWQ9Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKHByb3BzPT48U2NvcmUgey4uLnByb3BzfS8+KVxuXG5jb25zdCBPcmRlcj0oe2ksZGlzcGF0Y2h9KT0+KFxuXHQ8c3Bhbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9QKGkpKX0+PEljb25Ub3AvPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVVAoaSkpfT48SWNvblVwLz48L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPV04oaSkpfT48SWNvbkRvd24vPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uQk9UVE9NKGkpKX0+PEljb25Cb3R0b20vPjwvSWNvbkJ1dHRvbj5cblx0PC9zcGFuPlxuKVxuXG5jb25zdCBWaXNpYmlsaXR5PSh7aSxkaXNwYXRjaCx2aXNpYmxlLEljb249KCF2aXNpYmxlID8gSWNvbkhpZGRlbiA6IEljb25WaXNpYmxlKSxzdHlsZX0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT0dHTEVfVklTSUJMRShpKSl9IHN0eWxlPXtzdHlsZX0+XG5cdFx0PEljb24vPlxuXHQ8L0ljb25CdXR0b24+XG4pXG5cbmNvbnN0IFJlbW92ZXI9KHtpLGRpc3BhdGNoLCBzdHlsZX0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkVfQllfSU5ERVgoaSkpfSBzdHlsZT17c3R5bGV9PlxuXHRcdDxJY29uUmVtb3ZlLz5cblx0PC9JY29uQnV0dG9uPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRpbWVNYW5hZ2Use3JlZHVjZXJ9KVxuIl19