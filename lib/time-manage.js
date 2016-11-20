"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = exports.ACTION = undefined;

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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

var _selector = require("./selector");

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty;


var DOMAIN = "time";

var ACTION = exports.ACTION = {
	ADD: function ADD(todo) {
		return function (dispatch, getState) {
			if (!todo) return _promise2.default.resolve();
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos = child.todos,
			    todos = _child$todos === undefined ? [] : _child$todos;

			switch (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) {
				case "object":
					child.todos = [].concat((0, _toConsumableArray3.default)(todos), [todo]);
					break;
				default:
					if (!todos.find(function (a) {
						return a.content == todo;
					})) child.todos = [].concat((0, _toConsumableArray3.default)(todos), [{ content: todo }]);
			}
			if (child.todos != todos) {
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			} else {
				return _promise2.default.resolve();
			}
		};
	},
	REMOVE: function REMOVE(todo) {
		return function (dispatch, getState) {
			if (!todo) return _promise2.default.resolve();
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos2 = child.todos,
			    todos = _child$todos2 === undefined ? [] : _child$todos2;

			switch (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) {
				case "object":
					child.todos = todos.filter(function (a) {
						return a._id != todo._id;
					});
					break;
				default:
					child.todos = todos.filter(function (a) {
						return a.content != todo;
					});
			}

			if (child.todos != todos) {
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			} else {
				return _promise2.default.resolve();
			}
		};
	},
	REMOVE_BY_INDEX: function REMOVE_BY_INDEX(removing) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos3 = child.todos,
			    todos = _child$todos3 === undefined ? [] : _child$todos3;

			child.todos = todos.filter(function (a, i) {
				return i != removing;
			});
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
	DONE: function DONE(todo, day) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var todos = child.todos;

			var task = todos.find(function (a) {
				return a.content == todo;
			});
			var _task$dones = task.dones,
			    dones = _task$dones === undefined ? [] : _task$dones;

			dones.push(day);
			task.dones = dones;
			child.todos = [].concat((0, _toConsumableArray3.default)(todos));
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
	EDITING: function EDITING() {
		var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
		return { type: DOMAIN + "/edit", payload: status };
	},
	UP: function UP(i) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos4 = child.todos,
			    todos = _child$todos4 === undefined ? [] : _child$todos4;

			var current = todos[i],
			    len = todos.length;
			todos = todos.filter(function (a, k) {
				return i !== k;
			});
			todos.splice((i - 1) % len, 0, current);
			child.todos = todos;
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	},
	DOWN: function DOWN(i) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos5 = child.todos,
			    todos = _child$todos5 === undefined ? [] : _child$todos5;

			var current = todos[i],
			    len = todos.length;
			todos = todos.filter(function (a, k) {
				return i !== k;
			});
			todos.splice((i + 1) % len, 0, current);
			child.todos = todos;
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	}
};

var reducer = exports.reducer = function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { editing: 0 };
	var _ref = arguments[1];
	var type = _ref.type,
	    payload = _ref.payload;

	switch (type) {
		case DOMAIN + "/edit":
			return { editing: payload };
			break;
	}
	return state;
};

var TimeManage = exports.TimeManage = function TimeManage(_ref2) {
	var editing = _ref2.editing;
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"center",
			null,
			_react2.default.createElement(TodoEditor, { editing: editing })
		),
		editing ? _react2.default.createElement(TaskPadEditor, null) : _react2.default.createElement(TaskPad, null),
		_react2.default.createElement(ScorePad, null)
	);
};

var TodoEditor = (0, _reactRedux.connect)()(function (_ref3) {
	var dispatch = _ref3.dispatch,
	    editing = _ref3.editing,
	    refTask = _ref3.refTask,
	    refForm = _ref3.refForm;
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

var TaskPad = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref4) {
	var _ref4$todos = _ref4.todos,
	    todos = _ref4$todos === undefined ? [] : _ref4$todos,
	    dispatch = _ref4.dispatch;
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
					"\u65E5"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E00"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E8C"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E09"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u56DB"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E94"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u516D"
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref5, i) {
				var task = _ref5.content,
				    _ref5$dones = _ref5.dones,
				    dones = _ref5$dones === undefined ? [] : _ref5$dones;
				return _react2.default.createElement(
					_Table.TableRow,
					{ key: i },
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						task
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(0), day: 0 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(1), day: 1 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(2), day: 2 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(3), day: 3 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(4), day: 4 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(5), day: 5 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(6), day: 6 })
					)
				);
			})
		)
	);
});

var TaskPadEditor = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref6) {
	var _ref6$todos = _ref6.todos,
	    todos = _ref6$todos === undefined ? [] : _ref6$todos,
	    dispatch = _ref6.dispatch;
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
					"\u987A\u5E8F"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E8C"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E09"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u56DB"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u4E94"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"\u516D"
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref7, i) {
				var task = _ref7.content,
				    _ref7$dones = _ref7.dones,
				    dones = _ref7$dones === undefined ? [] : _ref7$dones;
				return _react2.default.createElement(
					_Table.TableRow,
					{ key: i },
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						task
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
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
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(Order, { dispatch: dispatch, i: i })
					),
					_react2.default.createElement(_Table.TableHeaderColumn, null),
					_react2.default.createElement(_Table.TableHeaderColumn, null),
					_react2.default.createElement(_Table.TableHeaderColumn, null),
					_react2.default.createElement(_Table.TableHeaderColumn, null),
					_react2.default.createElement(_Table.TableHeaderColumn, null)
				);
			})
		)
	);
});

var TodoStatus = (0, _reactRedux.connect)()(function (_ref8) {
	var todo = _ref8.todo,
	    done = _ref8.done,
	    day = _ref8.day,
	    dispatch = _ref8.dispatch,
	    _ref8$current = _ref8.current,
	    current = _ref8$current === undefined ? new Date().getDay() : _ref8$current;

	if (done) return _react2.default.createElement(_mood2.default, { color: "yellow" });else if (day > current) return _react2.default.createElement(_mood2.default, { color: "lightgray" });else return _react2.default.createElement(_mood2.default, { color: "lightcyan", hoverColor: "yellow", onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} });
});

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (_ref9) {
	var score = _ref9.score,
	    goal = _ref9.goal,
	    todo = _ref9.todo;
	return _react2.default.createElement(Empty, { icon: _react2.default.createElement(_mood2.default, { color: "yellow" }), text: score + "/" + goal });
});

var Order = function Order(_ref10) {
	var i = _ref10.i,
	    dispatch = _ref10.dispatch;
	return _react2.default.createElement(
		"span",
		null,
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
		)
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsIkRPTUFJTiIsIkFDVElPTiIsIkFERCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJ0b2RvIiwicmVzb2x2ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvcyIsImZpbmQiLCJhIiwiY29udGVudCIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJSRU1PVkUiLCJmaWx0ZXIiLCJfaWQiLCJSRU1PVkVfQllfSU5ERVgiLCJpIiwicmVtb3ZpbmciLCJET05FIiwiZGF5IiwidGFzayIsImRvbmVzIiwicHVzaCIsIkVESVRJTkciLCJzdGF0dXMiLCJ0eXBlIiwicGF5bG9hZCIsIlVQIiwiY3VycmVudCIsImxlbiIsImxlbmd0aCIsImsiLCJzcGxpY2UiLCJET1dOIiwicmVkdWNlciIsImVkaXRpbmciLCJUaW1lTWFuYWdlIiwiVG9kb0VkaXRvciIsInJlZlRhc2siLCJyZWZGb3JtIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZ2V0VmFsdWUiLCJ0cmltIiwic3VibWl0IiwiVGFza1BhZCIsIm1hcCIsImluZGV4T2YiLCJUYXNrUGFkRWRpdG9yIiwiVG9kb1N0YXR1cyIsImRvbmUiLCJEYXRlIiwiZ2V0RGF5IiwiU2NvcmVQYWQiLCJzY29yZSIsImdvYWwiLCJPcmRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7OztJQUVPQSxLLGVBQUFBLEs7OztBQUVQLElBQU1DLFNBQU8sTUFBYjs7QUFFTyxJQUFNQywwQkFBTztBQUNuQkMsTUFBSztBQUFBLFNBQU0sVUFBQ0MsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2hDLE9BQUcsQ0FBQ0MsSUFBSixFQUNDLE9BQU8sa0JBQVFDLE9B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LHlCQUFRO0FBQUEsUUFBTyxzQkFBUSwrQkFBZ0JwRCxLQUFoQixDQUFSLEVBQStCLE9BQS9CLEVBQXVDLE1BQXZDLEVBQThDLE1BQTlDLENBQVA7QUFBQSxDQUFSLEVBQXNFO0FBQUEsS0FBRXFELEtBQUYsU0FBRUEsS0FBRjtBQUFBLEtBQVNDLElBQVQsU0FBU0EsSUFBVDtBQUFBLEtBQWN4RCxJQUFkLFNBQWNBLElBQWQ7QUFBQSxRQUNqRiw4QkFBQyxLQUFELElBQU8sTUFBTSxnREFBVyxPQUFNLFFBQWpCLEdBQWIsRUFBMEMsTUFBU3VELEtBQVQsU0FBa0JDLElBQTVELEdBRGlGO0FBQUEsQ0FBdEUsQ0FBZjs7QUFJQSxJQUFNQyxRQUFNLFNBQU5BLEtBQU07QUFBQSxLQUFFeEMsQ0FBRixVQUFFQSxDQUFGO0FBQUEsS0FBSW5CLFFBQUosVUFBSUEsUUFBSjtBQUFBLFFBQ1g7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBLEtBQVksU0FBUztBQUFBLFlBQUdBLFNBQVNGLE9BQU9nQyxFQUFQLENBQVVYLENBQVYsQ0FBVCxDQUFIO0FBQUEsS0FBckI7QUFBZ0Q7QUFBaEQsR0FERDtBQUVDO0FBQUE7QUFBQSxLQUFZLFNBQVM7QUFBQSxZQUFHbkIsU0FBU0YsT0FBT3NDLElBQVAsQ0FBWWpCLENBQVosQ0FBVCxDQUFIO0FBQUEsS0FBckI7QUFBa0Q7QUFBbEQ7QUFGRCxFQURXO0FBQUEsQ0FBWjs7a0JBT2Usc0JBQWNvQixVQUFkLEVBQXlCLEVBQUNGLGdCQUFELEVBQXpCLEMiLCJmaWxlIjoidGltZS1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGV4dEZpZWxkLEZsYXRCdXR0b24sSWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVMsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxuaW1wb3J0IEljb25SZW1vdmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWxhcm0tb2ZmXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGQtY2lyY2xlLW91dGxpbmVcIlxuXG5pbXBvcnQgSWNvblVwIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy11cHdhcmRcIlxuaW1wb3J0IEljb25Eb3duIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9hcnJvdy1kb3dud2FyZFwiXG5cbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkLCBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4vc2VsZWN0b3JcIlxuaW1wb3J0IHtGYW1pbHl9IGZyb20gXCIuL2RiXCJcblxuY29uc3Qge0VtcHR5fT1VSVxuXG5jb25zdCBET01BSU49XCJ0aW1lXCJcblxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRpZighdG9kbylcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRjaGlsZC50b2Rvcz1bLi4udG9kb3MsIHRvZG9dXG5cdFx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRjaGlsZC50b2Rvcz1bLi4udG9kb3MsIHtjb250ZW50OnRvZG99XVxuXHRcdH1cblx0XHRpZihjaGlsZC50b2RvcyE9dG9kb3Mpe1xuXHRcdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0fVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGxldCB7dG9kb3M9W119PWNoaWxkXG5cdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0Y2hpbGQudG9kb3M9dG9kb3MuZmlsdGVyKGE9PmEuX2lkIT10b2RvLl9pZClcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdGNoaWxkLnRvZG9zPXRvZG9zLmZpbHRlcihhPT5hLmNvbnRlbnQhPXRvZG8pXG5cdFx0fVxuXG5cdFx0aWYoY2hpbGQudG9kb3MhPXRvZG9zKXtcblx0XHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdH1cblx0fVxuXHQsUkVNT1ZFX0JZX0lOREVYOiByZW1vdmluZz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGxldCB7dG9kb3M9W119PWNoaWxkXG5cdFx0Y2hpbGQudG9kb3M9dG9kb3MuZmlsdGVyKChhLGkpPT5pIT1yZW1vdmluZylcblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxuXHR9XG5cdCxET05FOiAodG9kbyxkYXkpPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0Y29uc3Qge3RvZG9zfT1jaGlsZFxuXHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0bGV0IHtkb25lcz1bXX09dGFza1xuXHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRjaGlsZC50b2Rvcz1bLi4udG9kb3NdXG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxuXHR9XG5cdCxFRElUSU5HOiAoc3RhdHVzPTApPT4oe3R5cGU6YCR7RE9NQUlOfS9lZGl0YCwgcGF5bG9hZDpzdGF0dXN9KVxuXHQsVVA6IGk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXHRcdGxldCBjdXJyZW50PXRvZG9zW2ldLCBsZW49dG9kb3MubGVuZ3RoXG5cdFx0dG9kb3M9dG9kb3MuZmlsdGVyKChhLGspPT5pIT09aylcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklbGVuLDAsY3VycmVudClcblx0XHRjaGlsZC50b2Rvcz10b2Rvc1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fVxuXHQsRE9XTjogaT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGxldCB7dG9kb3M9W119PWNoaWxkXG5cdFx0bGV0IGN1cnJlbnQ9dG9kb3NbaV0sIGxlbj10b2Rvcy5sZW5ndGhcblx0XHR0b2Rvcz10b2Rvcy5maWx0ZXIoKGEsayk9PmkhPT1rKVxuXHRcdHRvZG9zLnNwbGljZSgoaSsxKSVsZW4sMCxjdXJyZW50KVxuXHRcdGNoaWxkLnRvZG9zPXRvZG9zXG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZWRpdGluZ30pPT4oXG4gICAgPGRpdj5cbiAgICAgICAgPGNlbnRlcj48VG9kb0VkaXRvciBlZGl0aW5nPXtlZGl0aW5nfS8+PC9jZW50ZXI+XG5cbiAgICAgICAge2VkaXRpbmcgPyA8VGFza1BhZEVkaXRvci8+IDogPFRhc2tQYWQvPn1cblxuICAgICAgICA8U2NvcmVQYWQvPlxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBUb2RvRWRpdG9yPWNvbm5lY3QoKSgoe2Rpc3BhdGNoLCBlZGl0aW5nLCByZWZUYXNrLCByZWZGb3JtfSk9PihcbiAgICA8Zm9ybSByZWY9e2E9PnJlZkZvcm09YX0gY2xhc3NOYW1lPVwiZ3JpZFwiIG9uU3VibWl0PXtlPT57XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9fT5cblx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0ZGF0YVNvdXJjZT17W119XG5cdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuS7u+WKoVwiLz5cblx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIua3u+WKoFwiIG9uQ2xpY2s9e2U9PnJlZkZvcm0uc3VibWl0KCl9Lz5cblx0XHR7XG5cdFx0XHRlZGl0aW5nID9cblx0XHQgXHQoPEZsYXRCdXR0b24gbGFiZWw9XCLlrozmiJBcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRURJVElORygwKSl9Lz4pXG5cdFx0XHQ6KDxGbGF0QnV0dG9uIGxhYmVsPVwi57yW6L6RXCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoMSkpfS8+KVxuXHRcdH1cbiAgICA8L2Zvcm0+XG4pKVxuXG5jb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKCh7dG9kb3M9W10sIGRpc3BhdGNofSk9PihcbiAgICA8VGFibGU+XG4gICAgICAgIDxUYWJsZUhlYWRlciBkaXNwbGF5U2VsZWN0QWxsPXtmYWxzZX0gYWRqdXN0Rm9yQ2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Lu75YqhXFzmmJ/mnJ88L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuaXpTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5LiAPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kuow8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS4iTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5ZubPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kupQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuWFrTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgPFRhYmxlQm9keSBkaXNwbGF5Um93Q2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMCl9IGRheT17MH0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZigxKX0gZGF5PXsxfS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDIpfSBkYXk9ezJ9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMyl9IGRheT17M30vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZig0KX0gZGF5PXs0fS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDUpfSBkYXk9ezV9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoNil9IGRheT17Nn0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUYXNrUGFkRWRpdG9yPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKCh7dG9kb3M9W10sIGRpc3BhdGNofSk9Pihcblx0PFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaTjeS9nDwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Yig6ZmkPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7pobrluo88L1RhYmxlSGVhZGVyQ29sdW1uPlxuXHRcdFx0PFRhYmxlSGVhZGVyQ29sdW1uPuS6jDwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5LiJPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7lm5s8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS6lDwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5YWtPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj5cblx0XHRcdFx0XHRcdDxJY29uQnV0dG9uICBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFX0JZX0lOREVYKGkpKX0+XG5cdFx0XHRcdFx0XHRcdDxJY29uUmVtb3ZlLz5cblx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+XG5cdFx0XHRcdFx0XHQ8T3JkZXIgZGlzcGF0Y2g9e2Rpc3BhdGNofSBpPXtpfS8+XG5cdFx0XHRcdFx0PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICA8L1RhYmxlQm9keT5cbiAgICA8L1RhYmxlPlxuKSlcblxuY29uc3QgVG9kb1N0YXR1cz1jb25uZWN0KCkoKHt0b2RvLGRvbmUsIGRheSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKX0pPT57XG5cdGlmKGRvbmUpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGdyYXlcIi8+KVxuXHRlbHNlXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwibGlnaHRjeWFuXCIgaG92ZXJDb2xvcj1cInllbGxvd1wiIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET05FKHRvZG8sZGF5KSl9Lz4pXG59KVxuXG5jb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkoKHtzY29yZSwgZ29hbCx0b2RvfSk9PihcbiAgICA8RW1wdHkgaWNvbj17PEljb25TbWlsZSBjb2xvcj1cInllbGxvd1wiLz59IHRleHQ9e2Ake3Njb3JlfS8ke2dvYWx9YH0vPlxuKSlcblxuY29uc3QgT3JkZXI9KHtpLGRpc3BhdGNofSk9Pihcblx0PHNwYW4+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlVQKGkpKX0+PEljb25VcC8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5ET1dOKGkpKX0+PEljb25Eb3duLz48L0ljb25CdXR0b24+XG5cdDwvc3Bhbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==