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
		var _child$todos = child.todos,
		    todos = _child$todos === undefined ? [] : _child$todos;

		f(child.todos = [].concat((0, _toConsumableArray3.default)(todos)));
		return _db.Family.upsert(child).then(function (updated) {
			return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
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
			var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : todos[i];
			return target.hidden = !!!target.hidden;
		});
	},
	RESET: function RESET(a) {
		return function (dispatch, getState) {
			return changeTodos(function (todos) {
				//save history
				var dones = todos.filter(function (_ref) {
					var _ref$dones = _ref.dones,
					    dones = _ref$dones === undefined ? [] : _ref$dones;
					return dones.length;
				});
				//Finished.upsert(dones)
				//reset
				todos.forEach(function (a) {
					return a.dones = [];
				});
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
	var editing = _ref3.editing;
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
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(0), day: 0, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(1), day: 1, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(2), day: 2, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(3), day: 3, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(4), day: 4, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(5), day: 5, current: current })
					),
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(6), day: 6, current: current })
					)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvcyIsImYiLCJ1cHNlcnQiLCJ0aGVuIiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiQUREIiwidG9kbyIsInJlc29sdmUiLCJwdXNoIiwiZmluZCIsImEiLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJFRElUSU5HIiwic3RhdHVzIiwidHlwZSIsInBheWxvYWQiLCJVUCIsInRhcmdldCIsImxlbmd0aCIsIkRPV04iLCJUT1AiLCJ1bnNoaWZ0IiwiQk9UVE9NIiwiVE9HR0xFX1ZJU0lCTEUiLCJoaWRkZW4iLCJSRVNFVCIsImZpbHRlciIsImZvckVhY2giLCJkaXNwdGFjaCIsInJlZHVjZXIiLCJlZGl0aW5nIiwiVGltZU1hbmFnZSIsIlRvZG9FZGl0b3IiLCJyZWZUYXNrIiwicmVmRm9ybSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImdldFZhbHVlIiwidHJpbSIsInN1Ym1pdCIsIkRBWVMiLCJzcGxpdCIsIlRhc2tQYWQiLCJjdXJyZW50IiwiRGF0ZSIsImdldERheSIsImRheXMiLCJtYXAiLCJpbmRleE9mIiwiVGFza1BhZEVkaXRvciIsIlRvZG9TdGF0dXMiLCJkb25lIiwiU2NvcmVQYWQiLCJzY29yZSIsImdvYWwiLCJPcmRlciIsIlZpc2liaWxpdHkiLCJ2aXNpYmxlIiwiSWNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNB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QiwrQkFBMkIsQ0FBQ0QsT0FBRCxpREFBM0I7QUFBQSxRQUNoQjtBQUFBO0FBQUEsSUFBWSxTQUFTO0FBQUEsV0FBRzFFLFNBQVNXLE9BQU82QixjQUFQLENBQXNCcEIsQ0FBdEIsQ0FBVCxDQUFIO0FBQUEsSUFBckI7QUFBNEQsZ0NBQUMsSUFBRDtBQUE1RCxFQURnQjtBQUFBLENBQWpCOztrQkFJZSxzQkFBYzRCLFVBQWQsRUFBeUIsRUFBQ0YsZ0JBQUQsRUFBekIsQyIsImZpbGUiOiJ0aW1lLW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbixJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1RhYmxlLCBUYWJsZUJvZHksIFRhYmxlSGVhZGVyLCBUYWJsZUhlYWRlckNvbHVtbiwgVGFibGVSb3csIFRhYmxlUm93Q29sdW1ufSBmcm9tICdtYXRlcmlhbC11aS9UYWJsZSdcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFUywgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXG5cbmltcG9ydCBJY29uVXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LXVwd2FyZFwiXG5pbXBvcnQgSWNvbkRvd24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWRvd253YXJkXCJcbmltcG9ydCBJY29uVG9wIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLXRvcFwiXG5pbXBvcnQgSWNvbkJvdHRvbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi1ib3R0b21cIlxuXG5pbXBvcnQgSWNvblZpc2libGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eVwiXG5pbXBvcnQgSWNvbkhpZGRlbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5LW9mZlwiXG5cblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0ZhbWlseSxGaW5pc2hlZH0gZnJvbSBcIi4vZGJcIlxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IERPTUFJTj1cInRpbWVcIlxuXG5jb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXHRmKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10pXG5cdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxufVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRpZighdG9kbylcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdHJldHVybiBjaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdHRvZG9zLnB1c2godG9kbylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmKCF0b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbykpXG5cdFx0XHRcdFx0dG9kb3MucHVzaCh7Y29udGVudDp0b2RvfSlcblx0XHRcdH1cblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxuXHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCBpPXR5cGVvZih0b2RvKT09J29iamVjdCdcblx0XHRcdD8gdG9kb3MuZmluZEluZGV4KGE9PmEuX2lkPXRvZG8uX2lkKVxuXHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xuXG5cdFx0aWYoaSE9LTEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHR9KVxuXHQsUkVNT1ZFX0JZX0lOREVYOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+dG9kb3Muc3BsaWNlKGksMSkpXG5cdCxET05FOiAodG9kbyxkYXkpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0bGV0IHtkb25lcz1bXX09dGFza1xuXHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0fSlcblx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXG5cdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdH0pXG5cdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdH0pXG5cdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldD10b2Rvc1tpXSk9PnRhcmdldC5oaWRkZW49ISEhdGFyZ2V0LmhpZGRlbilcblx0LFJFU0VUOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdC8vRmluaXNoZWQudXBzZXJ0KGRvbmVzKVxuXHRcdFx0Ly9yZXNldFxuXHRcdFx0dG9kb3MuZm9yRWFjaChhPT5hLmRvbmVzPVtdKVxuXHRcdH0pKGRpc3B0YWNoLGdldFN0YXRlKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZWRpdGluZ30pPT4oXG4gICAgPGRpdj5cbiAgICAgICAgPGNlbnRlcj48VG9kb0VkaXRvciBlZGl0aW5nPXtlZGl0aW5nfS8+PC9jZW50ZXI+XG5cbiAgICAgICAge2VkaXRpbmcgPyA8VGFza1BhZEVkaXRvci8+IDogPFRhc2tQYWQvPn1cblxuICAgICAgICA8U2NvcmVQYWQvPlxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBUb2RvRWRpdG9yPWNvbm5lY3QoKSgoe2Rpc3BhdGNoLCBlZGl0aW5nLCByZWZUYXNrLCByZWZGb3JtfSk9PihcbiAgICA8Zm9ybSByZWY9e2E9PnJlZkZvcm09YX0gY2xhc3NOYW1lPVwiZ3JpZFwiIG9uU3VibWl0PXtlPT57XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5nZXRWYWx1ZSgpLnRyaW0oKSkpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9fT5cblx0XHQ8QXV0b0NvbXBsZXRlIHJlZj17YT0+cmVmVGFzaz1hfVxuXHRcdFx0ZGF0YVNvdXJjZT17W119XG5cdFx0XHRmbG9hdGluZ0xhYmVsVGV4dD1cIuS7u+WKoVwiLz5cblx0XHQ8RmxhdEJ1dHRvbiBsYWJlbD1cIua3u+WKoFwiIG9uQ2xpY2s9e2U9PnJlZkZvcm0uc3VibWl0KCl9Lz5cblx0XHR7XG5cdFx0XHRlZGl0aW5nID9cblx0XHQgXHQoPEZsYXRCdXR0b24gbGFiZWw9XCLlrozmiJBcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRURJVElORygwKSl9Lz4pXG5cdFx0XHQ6KDxGbGF0QnV0dG9uIGxhYmVsPVwi57yW6L6RXCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoMSkpfS8+KVxuXHRcdH1cbiAgICA8L2Zvcm0+XG4pKVxuXG5jb25zdCBEQVlTPShpLGE9XCLml6XkuIDkuozkuInlm5vkupTlha1cIi5zcGxpdChcIlwiKSk9PihhLnNwbGljZShpLDEsPGI+5LuK5aSpPC9iPiksYSlcbmNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSkuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSlcbigoe3RvZG9zPVtdLCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpLGRheXM9REFZUyhjdXJyZW50KX0pPT4oXG4gICAgPFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgZGlzcGxheVNlbGVjdEFsbD17ZmFsc2V9IGFkanVzdEZvckNoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS7u+WKoVxc5pif5pyfPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1swXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzFdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbMl19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1szXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzRdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbNV19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1s2XX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgIDxUYWJsZUJvZHkgZGlzcGxheVJvd0NoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdfSxpKT0+KFxuICAgICAgICAgICAgICAgIDxUYWJsZVJvdyBrZXk9e2l9PlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+e3Rhc2t9PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDApfSBkYXk9ezB9IGN1cnJlbnQ9e2N1cnJlbnR9Lz48L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMSl9IGRheT17MX0gY3VycmVudD17Y3VycmVudH0vPjwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZigyKX0gZGF5PXsyfSBjdXJyZW50PXtjdXJyZW50fS8+PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDMpfSBkYXk9ezN9IGN1cnJlbnQ9e2N1cnJlbnR9Lz48L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoNCl9IGRheT17NH0gY3VycmVudD17Y3VycmVudH0vPjwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZig1KX0gZGF5PXs1fSBjdXJyZW50PXtjdXJyZW50fS8+PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDYpfSBkYXk9ezZ9IGN1cnJlbnQ9e2N1cnJlbnR9Lz48L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICA8L1RhYmxlQm9keT5cbiAgICA8L1RhYmxlPlxuKSlcblxuY29uc3QgVGFza1BhZEVkaXRvcj1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlKX0pKSgoe3RvZG9zPVtdLCBkaXNwYXRjaH0pPT4oXG5cdDxUYWJsZT5cbiAgICAgICAgPFRhYmxlSGVhZGVyICBkaXNwbGF5U2VsZWN0QWxsPXtmYWxzZX0gYWRqdXN0Rm9yQ2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Lu75YqhXFzmk43kvZw8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuWIoOmZpDwvVGFibGVIZWFkZXJDb2x1bW4+XG5cdFx0XHQ8VGFibGVIZWFkZXJDb2x1bW4+6ZqQ6JePPC9UYWJsZUhlYWRlckNvbHVtbj5cblx0XHRcdDxUYWJsZUhlYWRlckNvbHVtbiBjb2xTcGFuPXs0fT7pobrluo88L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgIDwvVGFibGVIZWFkZXI+XG4gICAgICAgIDxUYWJsZUJvZHkgZGlzcGxheVJvd0NoZWNrYm94PXtmYWxzZX0+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2Rvcy5tYXAoKHtjb250ZW50OnRhc2ssIGRvbmVzPVtdLCBoaWRkZW59LGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiAgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFTU9WRV9CWV9JTkRFWChpKSl9PlxuXHRcdFx0XHRcdFx0XHQ8SWNvblJlbW92ZS8+XG5cdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdFx0PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPlxuXHRcdFx0XHRcdFx0PFZpc2liaWxpdHkgZGlzcGF0Y2g9e2Rpc3BhdGNofSBpPXtpfSB2aXNpYmxlPXshaGlkZGVufS8+XG5cdFx0XHRcdFx0PC9UYWJsZVJvd0NvbHVtbj5cblx0XHRcdFx0XHQ8VGFibGVSb3dDb2x1bW4gY29sU3Bhbj17NH0+XG5cdFx0XHRcdFx0XHQ8T3JkZXIgZGlzcGF0Y2g9e2Rpc3BhdGNofSBpPXtpfS8+XG5cdFx0XHRcdFx0PC9UYWJsZVJvd0NvbHVtbj5cbiAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgPC9UYWJsZT5cbikpXG5cbmNvbnN0IFRvZG9TdGF0dXM9Y29ubmVjdCgpKCh7dG9kbyxkb25lLCBkYXksIGRpc3BhdGNoLCBjdXJyZW50fSk9Pntcblx0aWYoZG9uZSlcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJ5ZWxsb3dcIi8+KVxuXHRlbHNlIGlmKGRheT5jdXJyZW50KVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cImxpZ2h0Z3JheVwiLz4pXG5cdGVsc2Vcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGN5YW5cIiBob3ZlckNvbG9yPVwieWVsbG93XCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0vPilcbn0pXG5cbmNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKSgoe3Njb3JlLCBnb2FsLHRvZG99KT0+KFxuICAgIDxFbXB0eSBpY29uPXs8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPn0gdGV4dD17YCR7c2NvcmV9LyR7Z29hbH1gfS8+XG4pKVxuXG5jb25zdCBPcmRlcj0oe2ksZGlzcGF0Y2h9KT0+KFxuXHQ8c3Bhbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVE9QKGkpKX0+PEljb25Ub3AvPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uVVAoaSkpfT48SWNvblVwLz48L0ljb25CdXR0b24+XG5cdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPV04oaSkpfT48SWNvbkRvd24vPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uQk9UVE9NKGkpKX0+PEljb25Cb3R0b20vPjwvSWNvbkJ1dHRvbj5cblx0PC9zcGFuPlxuKVxuXG5jb25zdCBWaXNpYmlsaXR5PSh7aSxkaXNwYXRjaCx2aXNpYmxlLEljb249KCF2aXNpYmxlID8gSWNvbkhpZGRlbiA6IEljb25WaXNpYmxlKX0pPT4oXG5cdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT0dHTEVfVklTSUJMRShpKSl9PjxJY29uLz48L0ljb25CdXR0b24+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGltZU1hbmFnZSx7cmVkdWNlcn0pXG4iXX0=