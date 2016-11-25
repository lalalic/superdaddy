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

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _alarmOff = require("material-ui/svg-icons/action/alarm-off");

var _alarmOff2 = _interopRequireDefault(_alarmOff);

var _addCircleOutline = require("material-ui/svg-icons/content/add-circle-outline");

var _addCircleOutline2 = _interopRequireDefault(_addCircleOutline);

var _arrowUpward = require("material-ui/svg-icons/navigation/arrow-upward");

var _arrowUpward2 = _interopRequireDefault(_arrowUpward);

var _arrowDownward = require("material-ui/svg-icons/navigation/arrow-downward");

var _arrowDownward2 = _interopRequireDefault(_arrowDownward);

var _verticalAlignTop = require("material-ui/svg-icons/editor/vertical-align-top");

var _verticalAlignTop2 = _interopRequireDefault(_verticalAlignTop);

var _verticalAlignBottom = require("material-ui/svg-icons/editor/vertical-align-bottom");

var _verticalAlignBottom2 = _interopRequireDefault(_verticalAlignBottom);

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _visibility = require("material-ui/svg-icons/action/visibility");

var _visibility2 = _interopRequireDefault(_visibility);

var _visibilityOff = require("material-ui/svg-icons/action/visibility-off");

var _visibilityOff2 = _interopRequireDefault(_visibilityOff);

var _selector = require("./selector");

var _db = require("./db");

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
		return changeTodos(function (todos) {
			var task = todos.find(function (a) {
				return a.content == todo;
			});
			var _task$dones = task.dones,
			    dones = _task$dones === undefined ? [] : _task$dones;

			dones.push(day);
			task.dones = dones;
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
	    editing = _ref3.editing,
	    todoWeek = _ref3.todoWeek,
	    _ref3$week = _ref3.week,
	    week = _ref3$week === undefined ? new Date().getWeek() : _ref3$week,
	    _ref3$isCurrentWeek = _ref3.isCurrentWeek,
	    isCurrentWeek = _ref3$isCurrentWeek === undefined ? todoWeek == week : _ref3$isCurrentWeek;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"center",
			null,
			isCurrentWeek ? _react2.default.createElement(TodoEditor, { editing: editing }) : _react2.default.createElement(_materialUi.RaisedButton, { onClick: function onClick(e) {
					return dispatch(ACTION.RESET());
				},
				icon: _react2.default.createElement(_cloudDone2.default, null),
				label: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
			})
		),
		isCurrentWeek && editing ? _react2.default.createElement(TaskPadEditor, null) : _react2.default.createElement(TaskPad, { current: isCurrentWeek ? new Date().getDay() : 7 }),
		_react2.default.createElement(ScorePad, null)
	);
};

var TodoEditor = (0, _reactRedux.connect)()(function (_ref4) {
	var dispatch = _ref4.dispatch,
	    editing = _ref4.editing,
	    refTask = _ref4.refTask,
	    refForm = _ref4.refForm;
	return _react2.default.createElement(
		"form",
		{ ref: function ref(a) {
				return refForm = a;
			}, className: "grid", onSubmit: function onSubmit(e) {
				e.preventDefault();
				dispatch(ACTION.ADD(refTask.getValue().trim()));
				return false;
			} },
		_react2.default.createElement(_materialUi.AutoComplete, { ref: function ref(a) {
				return refTask = a;
			},
			dataSource: [],
			floatingLabelText: "\u4EFB\u52A1" }),
		_react2.default.createElement(_materialUi.FlatButton, { label: "\u6DFB\u52A0", onClick: function onClick(e) {
				return refForm.submit();
			} }),
		editing ? _react2.default.createElement(_materialUi.FlatButton, { label: "\u5B8C\u6210", onClick: function onClick(e) {
				return dispatch(ACTION.EDITING(0));
			} }) : _react2.default.createElement(_materialUi.FlatButton, { label: "\u7F16\u8F91", onClick: function onClick(e) {
				return dispatch(ACTION.EDITING(1));
			} })
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
var TaskPad = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state).filter(function (a) {
			return !a.hidden;
		}) };
})(function (_ref5) {
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
});

var TaskPadEditor = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref7) {
	var _ref7$todos = _ref7.todos,
	    todos = _ref7$todos === undefined ? [] : _ref7$todos,
	    dispatch = _ref7.dispatch;
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
					null,
					"\u5220\u9664"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u9690\u85CF"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ colSpan: 4 },
					"\u987A\u5E8F"
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref8, i) {
				var task = _ref8.content,
				    _ref8$dones = _ref8.dones,
				    dones = _ref8$dones === undefined ? [] : _ref8$dones,
				    hidden = _ref8.hidden;
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
						null,
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
						null,
						_react2.default.createElement(Visibility, { dispatch: dispatch, i: i, visible: !hidden })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						{ colSpan: 4 },
						_react2.default.createElement(Order, { dispatch: dispatch, i: i })
					)
				);
			})
		)
	);
});

var TodoStatus = (0, _reactRedux.connect)()(function (_ref9) {
	var todo = _ref9.todo,
	    done = _ref9.done,
	    day = _ref9.day,
	    dispatch = _ref9.dispatch,
	    current = _ref9.current;

	if (done) return _react2.default.createElement(_mood2.default, { color: "yellow" });else if (day > current) return _react2.default.createElement(_mood2.default, { color: "lightgray" });else return _react2.default.createElement(_mood2.default, { color: "lightcyan", hoverColor: "yellow", onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} });
});

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (_ref10) {
	var score = _ref10.score,
	    goal = _ref10.goal,
	    todo = _ref10.todo;
	return _react2.default.createElement(Empty, { icon: _react2.default.createElement(_mood2.default, { color: "yellow" }), text: score + "/" + goal });
});

var Order = function Order(_ref11) {
	var i = _ref11.i,
	    dispatch = _ref11.dispatch;
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

var Visibility = function Visibility(_ref12) {
	var i = _ref12.i,
	    dispatch = _ref12.dispatch,
	    visible = _ref12.visible,
	    _ref12$Icon = _ref12.Icon,
	    Icon = _ref12$Icon === undefined ? !visible ? _visibilityOff2.default : _visibility2.default : _ref12$Icon;
	return _react2.default.createElement(
		_materialUi.IconButton,
		{ onClick: function onClick(e) {
				return dispatch(ACTION.TOGGLE_VISIBLE(i));
			} },
		_react2.default.createElement(Icon, null)
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvV2VlayIsInVuZGVmaW5lZCIsIkRhdGUiLCJnZXRXZWVrIiwidG9kb3MiLCJoYW5kbGVkIiwiZiIsInRoZW4iLCJyZXNvbHZlIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiQUREIiwidG9kbyIsInB1c2giLCJmaW5kIiwiYSIsImNvbnRlbnQiLCJSRU1PVkUiLCJpIiwiZmluZEluZGV4IiwiX2lkIiwic3BsaWNlIiwiUkVNT1ZFX0JZX0lOREVYIiwiRE9ORSIsImRheSIsInRhc2siLCJkb25lcyIsIkVESVRJTkciLCJzdGF0dXMiLCJ0eXBlIiwicGF5bG9hZCIsIlVQIiwidGFyZ2V0IiwibGVuZ3RoIiwiRE9XTiIsIlRPUCIsInVuc2hpZnQiLCJCT1RUT00iLCJUT0dHTEVfVklTSUJMRSIsImhpZGRlbiIsIlJFU0VUIiwiZmlsdGVyIiwiZmluaXNoV2Vla1Rhc2tzIiwiZm9yRWFjaCIsImRpc3B0YWNoIiwicmVkdWNlciIsImVkaXRpbmciLCJUaW1lTWFuYWdlIiwid2VlayIsImlzQ3VycmVudFdlZWsiLCJnZXREYXkiLCJUb2RvRWRpdG9yIiwicmVmVGFzayIsInJlZkZvcm0iLCJlIiwicHJldmVudERlZmF1bHQiLCJnZXRWYWx1ZSIsInRyaW0iLCJzdWJtaXQiLCJEQVlTIiwic3BsaXQiLCJUYXNrUGFkIiwiY3VycmVudCIsImRheXMiLCJtYXAiLCJpbmRleE9mIiwiVGFza1BhZEVkaXRvciIsIlRvZG9TdGF0dXMiLCJkb25lIiwiU2NvcmVQYWQiLCJzY29yZSIsImdvYWwiLCJPcmRlciIsIlZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiSWNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7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S0FBckI7QUFBb0Q7QUFBcEQ7QUFKRCxFQURXO0FBQUEsQ0FBWjs7QUFTQSxJQUFNdUQsYUFBVyxTQUFYQSxVQUFXO0FBQUEsS0FBRXZELENBQUYsVUFBRUEsQ0FBRjtBQUFBLEtBQUl6QixRQUFKLFVBQUlBLFFBQUo7QUFBQSxLQUFhaUYsT0FBYixVQUFhQSxPQUFiO0FBQUEsMEJBQXFCQyxJQUFyQjtBQUFBLEtBQXFCQSxJQUFyQiwrQkFBMkIsQ0FBQ0QsT0FBRCxpREFBM0I7QUFBQSxRQUNoQjtBQUFBO0FBQUEsSUFBWSxTQUFTO0FBQUEsV0FBR2pGLFNBQVNpQixPQUFPNEIsY0FBUCxDQUFzQnBCLENBQXRCLENBQVQsQ0FBSDtBQUFBLElBQXJCO0FBQTRELGdDQUFDLElBQUQ7QUFBNUQsRUFEZ0I7QUFBQSxDQUFqQjs7a0JBSWUsc0JBQWM2QixVQUFkLEVBQXlCLEVBQUNGLGdCQUFELEVBQXpCLEMiLCJmaWxlIjoidGltZS1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sSWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlLFJhaXNlZEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2NvbXBhY3QsIEVOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcbmltcG9ydCBJY29uUmVtb3ZlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FsYXJtLW9mZlwiXG5pbXBvcnQgSWNvbkFkZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbnRlbnQvYWRkLWNpcmNsZS1vdXRsaW5lXCJcblxuaW1wb3J0IEljb25VcCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctdXB3YXJkXCJcbmltcG9ydCBJY29uRG93biBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL25hdmlnYXRpb24vYXJyb3ctZG93bndhcmRcIlxuaW1wb3J0IEljb25Ub3AgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvdmVydGljYWwtYWxpZ24tdG9wXCJcbmltcG9ydCBJY29uQm90dG9tIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLWJvdHRvbVwiXG5cbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmltcG9ydCBJY29uVmlzaWJsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5XCJcbmltcG9ydCBJY29uSGlkZGVuIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3Zpc2liaWxpdHktb2ZmXCJcblxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuL3NlbGVjdG9yXCJcbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuL2RiXCJcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJ0aW1lXCJcblxuY29uc3QgY2hhbmdlVG9kb3M9Zj0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0aWYoY2hpbGQudG9kb1dlZWs9PXVuZGVmaW5lZClcblx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcblx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblx0XG5cdGxldCBoYW5kbGVkPWYoY2hpbGQudG9kb3M9Wy4uLnRvZG9zXSwgY2hpbGQpXG5cdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxuXHRcdGhhbmRsZWQ9UHJvbWlzZS5yZXNvbHZlKClcblx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHR9XG5cdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdH1cblx0LFJFTU9WRTogdG9kbz0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXG5cdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLl9pZD10b2RvLl9pZClcblx0XHRcdDogdG9kb3MuZmluZEluZGV4KGE9PmEuY29udGVudD10b2RvKTtcblxuXHRcdGlmKGkhPS0xKVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0fSlcblx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxuXHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdH0pXG5cdCxFRElUSU5HOiAoc3RhdHVzPTApPT4oe3R5cGU6YCR7RE9NQUlOfS9lZGl0YCwgcGF5bG9hZDpzdGF0dXN9KVxuXHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxET1dOOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaSsxKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsVE9QOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnVuc2hpZnQodGFyZ2V0KVxuXHR9KVxuXHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnB1c2godGFyZ2V0KVxuXHR9KVxuXHQsVE9HR0xFX1ZJU0lCTEU6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRhcmdldC5oaWRkZW49ISEhdGFyZ2V0LmhpZGRlblx0XG5cdH0pXG5cdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMpLnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHR9KShkaXNwdGFjaCxnZXRTdGF0ZSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e2VkaXRpbmc6MH0se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgJHtET01BSU59L2VkaXRgOlxuXHRcdHJldHVybiB7ZWRpdGluZzpwYXlsb2FkfVxuXHRicmVha1xuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe2Rpc3BhdGNoLCBlZGl0aW5nLCB0b2RvV2Vlaywgd2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKSwgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla30pPT4oXG4gICAgPGRpdj5cbiAgICAgICAgPGNlbnRlcj5cblx0XHR7aXNDdXJyZW50V2VlayBcblx0XHRcdD8gPFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPiBcblx0XHRcdDogPFJhaXNlZEJ1dHRvbiAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfVxuXHRcdFx0XHRpY29uPXs8SWNvbkRvbmUvPn1cblx0XHRcdFx0bGFiZWw9e2Dkv53lrZjliY0ke3dlZWstdG9kb1dlZWt95ZGo5a6M5oiQ5oOF5Ya1YH1cblx0XHRcdFx0Lz5cblx0XHR9XG5cdFx0PC9jZW50ZXI+XG5cbiAgICAgICAge2lzQ3VycmVudFdlZWsmJmVkaXRpbmcgXG5cdFx0XHQ/IDxUYXNrUGFkRWRpdG9yLz4gXG5cdFx0XHQ6IDxUYXNrUGFkIGN1cnJlbnQ9e2lzQ3VycmVudFdlZWsgPyBuZXcgRGF0ZSgpLmdldERheSgpIDogN30vPlxuXHRcdH1cblxuICAgICAgICA8U2NvcmVQYWQvPlxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBUb2RvRWRpdG9yPWNvbm5lY3QoKSgoe2Rpc3BhdGNoLCBlZGl0aW5nLCByZWZUYXNrLCByZWZGb3JtfSk9PihcbiAgICA8Zm9ybSByZWY9e2E9PnJlZkZvcm09YX0gY2xhc3NOYW1lPVwiZ3JpZFwiIG9uU3VibWl0PXtlPT57XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9fT5cblx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0ZGF0YVNvdXJjZT17W119XG5cdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuS7u+WKoVwiLz5cblx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIua3u+WKoFwiIG9uQ2xpY2s9e2U9PnJlZkZvcm0uc3VibWl0KCl9Lz5cblx0XHR7XG5cdFx0XHRlZGl0aW5nID9cblx0XHQgXHQoPEZsYXRCdXR0b24gbGFiZWw9XCLlrozmiJBcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRURJVElORygwKSl9Lz4pXG5cdFx0XHQ6KDxGbGF0QnV0dG9uIGxhYmVsPVwi57yW6L6RXCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoMSkpfS8+KVxuXHRcdH1cbiAgICA8L2Zvcm0+XG4pKVxuXG5jb25zdCBEQVlTPShpLGE9XCLml6XkuIDkuozkuInlm5vkupTlha1cIi5zcGxpdChcIlwiKSk9PihhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcbmNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSlcbigoe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG4gICAgPFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgZGlzcGxheVNlbGVjdEFsbD17ZmFsc2V9IGFkanVzdEZvckNoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS7u+WKoVxc5pif5pyfPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1swXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzFdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbMl19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1szXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzRdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbNV19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1s2XX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgIDxUYWJsZUJvZHkgZGlzcGxheVJvd0NoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdfSxpKT0+KFxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+e3Rhc2t9PC9UYWJsZVJvd0NvbHVtbj5cblx0XHRcdFx0XHR7WzAsMSwyLDMsNCw1LDZdLm1hcChhPT4oXG5cdFx0XHRcdFx0XHQ8VGFibGVSb3dDb2x1bW4ga2V5PXthfT5cblx0XHRcdFx0XHRcdFx0PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoYSl9IGRheT17YX0gY3VycmVudD17Y3VycmVudH0vPlxuXHRcdFx0XHRcdFx0PC9UYWJsZVJvd0NvbHVtbj5cblx0XHRcdFx0XHQpKX1cbiAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgPC9UYWJsZT5cbikpXG5cbmNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSl9KSkoKHt0b2Rvcz1bXSwgZGlzcGF0Y2h9KT0+KFxuXHQ8VGFibGU+XG4gICAgICAgIDxUYWJsZUhlYWRlciAgZGlzcGxheVNlbGVjdEFsbD17ZmFsc2V9IGFkanVzdEZvckNoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS7u+WKoVxc5pON5L2cPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7liKDpmaQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuXHRcdFx0PFRhYmxlSGVhZGVyQ29sdW1uPumakOiXjzwvVGFibGVIZWFkZXJDb2x1bW4+XG5cdFx0XHQ8VGFibGVIZWFkZXJDb2x1bW4gY29sU3Bhbj17NH0+6aG65bqPPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXSwgaGlkZGVufSxpKT0+KFxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+e3Rhc2t9PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPlxuXHRcdFx0XHRcdFx0PEljb25CdXR0b24gIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRU1PVkVfQllfSU5ERVgoaSkpfT5cblx0XHRcdFx0XHRcdFx0PEljb25SZW1vdmUvPlxuXHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj5cblx0XHRcdFx0XHRcdDxWaXNpYmlsaXR5IGRpc3BhdGNoPXtkaXNwYXRjaH0gaT17aX0gdmlzaWJsZT17IWhpZGRlbn0vPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uIGNvbFNwYW49ezR9PlxuXHRcdFx0XHRcdFx0PE9yZGVyIGRpc3BhdGNoPXtkaXNwYXRjaH0gaT17aX0vPlxuXHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudH0pPT57XG5cdGlmKGRvbmUpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGdyYXlcIi8+KVxuXHRlbHNlXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwibGlnaHRjeWFuXCIgaG92ZXJDb2xvcj1cInllbGxvd1wiIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9Lz4pXG59KVxuXG5jb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoKHtzY29yZSwgZ29hbCx0b2RvfSk9PihcbiAgICA8RW1wdHkgaWNvbj17PEljb25TbWlsZSBjb2xvcj1cInllbGxvd1wiLz59IHRleHQ9e2Ake3Njb3JlfS8ke2dvYWx9YH0vPlxuKSlcblxuY29uc3QgT3JkZXI9KHtpLGRpc3BhdGNofSk9Pihcblx0PHNwYW4+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPUChpKSl9PjxJY29uVG9wLz48L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQKGkpKX0+PEljb25VcC8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET1dOKGkpKX0+PEljb25Eb3duLz48L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkJPVFRPTShpKSl9PjxJY29uQm90dG9tLz48L0ljb25CdXR0b24+XG5cdDwvc3Bhbj5cbilcblxuY29uc3QgVmlzaWJpbGl0eT0oe2ksZGlzcGF0Y2gsdmlzaWJsZSxJY29uPSghdmlzaWJsZSA/IEljb25IaWRkZW4gOiBJY29uVmlzaWJsZSl9KT0+KFxuXHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9HR0xFX1ZJU0lCTEUoaSkpfT48SWNvbi8+PC9JY29uQnV0dG9uPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRpbWVNYW5hZ2Use3JlZHVjZXJ9KVxuIl19