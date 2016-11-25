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
				label: "保存前" + (week - todoWeek) + "周完成情况"
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
			floatingLabelText: "任务" }),
		_react2.default.createElement(_materialUi.FlatButton, { label: "添加", onClick: function onClick(e) {
				return refForm.submit();
			} }),
		editing ? _react2.default.createElement(_materialUi.FlatButton, { label: "完成", onClick: function onClick(e) {
				return dispatch(ACTION.EDITING(0));
			} }) : _react2.default.createElement(_materialUi.FlatButton, { label: "编辑", onClick: function onClick(e) {
				return dispatch(ACTION.EDITING(1));
			} })
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
					"任务\\操作"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"删除"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"隐藏"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					{ colSpan: 4 },
					"顺序"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFHQTs7QUFDQTs7OztJQUVPOzs7QUFFUCxJQUFNLFNBQU8sTUFBUDs7QUFFTixJQUFNLGNBQVksU0FBWixXQUFZO1FBQUcsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUN6QyxNQUFNLFFBQU0sVUFBTixDQURtQztBQUV6QyxNQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FGbUM7QUFHekMsTUFBRyxNQUFNLFFBQU4sSUFBZ0IsU0FBaEIsRUFDRixNQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FERDs7cUJBR2UsTUFBVjsyQ0FBTSxrQkFOOEI7OztBQVF6QyxNQUFJLFVBQVEsRUFBRSxNQUFNLEtBQU4sOENBQWdCLE9BQWhCLEVBQXdCLEtBQTFCLENBQVIsQ0FScUM7QUFTekMsTUFBRyxFQUFFLFdBQVcsUUFBUSxJQUFSLENBQWIsRUFDRixVQUFRLGtCQUFRLE9BQVIsRUFBUixDQUREO0FBRUEsU0FBTyxRQUFRLElBQVIsQ0FBYTtVQUFHLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFDckIsSUFEcUIsQ0FDaEI7V0FBUyxTQUFTLHVCQUFTLDBCQUFVLE9BQVYsRUFBbUIsV0FBTyxNQUFQLENBQW5CLENBQWtDLFFBQWxDLENBQWxCO0lBQVQ7R0FEYSxDQUFwQixDQVh5QztFQUFyQjtDQUFIO0FBY1gsSUFBTSwwQkFBTztBQUNuQixNQUFLO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFzQjtBQUNoQyxPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sa0JBQVEsT0FBUixFQUFQLENBREQ7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YWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZCxGbGF0QnV0dG9uLEljb25CdXR0b24sIEF1dG9Db21wbGV0ZSxSYWlzZWRCdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge1RhYmxlLCBUYWJsZUJvZHksIFRhYmxlSGVhZGVyLCBUYWJsZUhlYWRlckNvbHVtbiwgVGFibGVSb3csIFRhYmxlUm93Q29sdW1ufSBmcm9tICdtYXRlcmlhbC11aS9UYWJsZSdcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFUywgVUl9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5pbXBvcnQgSWNvblJlbW92ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hbGFybS1vZmZcIlxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZC1jaXJjbGUtb3V0bGluZVwiXG5cbmltcG9ydCBJY29uVXAgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LXVwd2FyZFwiXG5pbXBvcnQgSWNvbkRvd24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2Fycm93LWRvd253YXJkXCJcbmltcG9ydCBJY29uVG9wIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL3ZlcnRpY2FsLWFsaWduLXRvcFwiXG5pbXBvcnQgSWNvbkJvdHRvbSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci92ZXJ0aWNhbC1hbGlnbi1ib3R0b21cIlxuXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5pbXBvcnQgSWNvblZpc2libGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vdmlzaWJpbGl0eVwiXG5pbXBvcnQgSWNvbkhpZGRlbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi92aXNpYmlsaXR5LW9mZlwiXG5cblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi9kYlwiXG5cbmNvbnN0IHtFbXB0eX09VUlcblxuY29uc3QgRE9NQUlOPVwidGltZVwiXG5cbmNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdGlmKGNoaWxkLnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XG5cdGxldCB7dG9kb3M9W119PWNoaWxkXG5cdFxuXHRsZXQgaGFuZGxlZD1mKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10sIGNoaWxkKVxuXHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcblx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0ZG9uZXMucHVzaChkYXkpXG5cdFx0dGFzay5kb25lcz1kb25lc1xuXHR9KVxuXHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0LFVQOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaS0xKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0fSlcblx0LEJPVFRPTTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5wdXNoKHRhcmdldClcblx0fSlcblx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cdFxuXHR9KVxuXHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdFx0Ly9zYXZlIGhpc3Rvcnlcblx0XHRcdGxldCBkb25lcz10b2Rvcy5maWx0ZXIoKHtkb25lcz1bXX0pPT5kb25lcy5sZW5ndGgpXG5cdFx0XHRpZihkb25lcy5sZW5ndGgpe1xuXHRcdFx0XHRyZXR1cm4gVGFzay5maW5pc2hXZWVrVGFza3MoY2hpbGQsIGRvbmVzKS50aGVuKGE9Pntcblx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXG5cdFx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHRcdFx0fSlcblx0XHRcdH1lbHNlXG5cdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0fSkoZGlzcHRhY2gsZ2V0U3RhdGUpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXtlZGl0aW5nOjB9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYCR7RE9NQUlOfS9lZGl0YDpcblx0XHRyZXR1cm4ge2VkaXRpbmc6cGF5bG9hZH1cblx0YnJlYWtcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHtkaXNwYXRjaCwgZWRpdGluZywgdG9kb1dlZWssIHdlZWs9bmV3IERhdGUoKS5nZXRXZWVrKCksIGlzQ3VycmVudFdlZWs9dG9kb1dlZWs9PXdlZWt9KT0+KFxuICAgIDxkaXY+XG4gICAgICAgIDxjZW50ZXI+XG5cdFx0e2lzQ3VycmVudFdlZWsgXG5cdFx0XHQ/IDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz4gXG5cdFx0XHQ6IDxSYWlzZWRCdXR0b24gIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX1cblx0XHRcdFx0aWNvbj17PEljb25Eb25lLz59XG5cdFx0XHRcdGxhYmVsPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdC8+XG5cdFx0fVxuXHRcdDwvY2VudGVyPlxuXG4gICAgICAgIHtpc0N1cnJlbnRXZWVrJiZlZGl0aW5nIFxuXHRcdFx0PyA8VGFza1BhZEVkaXRvci8+IFxuXHRcdFx0OiA8VGFza1BhZCBjdXJyZW50PXtpc0N1cnJlbnRXZWVrID8gbmV3IERhdGUoKS5nZXREYXkoKSA6IDd9Lz5cblx0XHR9XG5cbiAgICAgICAgPFNjb3JlUGFkLz5cbiAgICA8L2Rpdj5cbilcblxuY29uc3QgVG9kb0VkaXRvcj1jb25uZWN0KCkoKHtkaXNwYXRjaCwgZWRpdGluZywgcmVmVGFzaywgcmVmRm9ybX0pPT4oXG4gICAgPGZvcm0gcmVmPXthPT5yZWZGb3JtPWF9IGNsYXNzTmFtZT1cImdyaWRcIiBvblN1Ym1pdD17ZT0+e1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRkaXNwYXRjaChBQ1RJT04uQUREKHJlZlRhc2suZ2V0VmFsdWUoKS50cmltKCkpKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fX0+XG5cdFx0PEF1dG9Db21wbGV0ZSByZWY9e2E9PnJlZlRhc2s9YX1cblx0XHRcdGRhdGFTb3VyY2U9e1tdfVxuXHRcdFx0ZmxvYXRpbmdMYWJlbFRleHQ9XCLku7vliqFcIi8+XG5cdFx0PEZsYXRCdXR0b24gbGFiZWw9XCLmt7vliqBcIiBvbkNsaWNrPXtlPT5yZWZGb3JtLnN1Ym1pdCgpfS8+XG5cdFx0e1xuXHRcdFx0ZWRpdGluZyA/XG5cdFx0IFx0KDxGbGF0QnV0dG9uIGxhYmVsPVwi5a6M5oiQXCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkVESVRJTkcoMCkpfS8+KVxuXHRcdFx0Oig8RmxhdEJ1dHRvbiBsYWJlbD1cIue8lui+kVwiIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5FRElUSU5HKDEpKX0vPilcblx0XHR9XG4gICAgPC9mb3JtPlxuKSlcblxuY29uc3QgREFZUz0oaSxhPVwi5pel5LiA5LqM5LiJ5Zub5LqU5YWtXCIuc3BsaXQoXCJcIikpPT4oYS5zcGxpY2UoaSwxLDxiPuS7iuWkqTwvYj4pLGEpXG5jb25zdCBUYXNrUGFkPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpXG4oKHt0b2Rvcz1bXSwgZGlzcGF0Y2gsIGN1cnJlbnQ9bmV3IERhdGUoKS5nZXREYXkoKSxkYXlzPURBWVMoY3VycmVudCl9KT0+KFxuICAgIDxUYWJsZT5cbiAgICAgICAgPFRhYmxlSGVhZGVyIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaYn+acnzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbMF19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1sxXX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzJdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbM119PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj57ZGF5c1s0XX08L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPntkYXlzWzVdfTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+e2RheXNbNl19PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9kb3MubWFwKCh7Y29udGVudDp0YXNrLCBkb25lcz1bXX0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0e1swLDEsMiwzLDQsNSw2XS5tYXAoYT0+KFxuXHRcdFx0XHRcdFx0PFRhYmxlUm93Q29sdW1uIGtleT17YX0+XG5cdFx0XHRcdFx0XHRcdDxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKGEpfSBkYXk9e2F9IGN1cnJlbnQ9e2N1cnJlbnR9Lz5cblx0XHRcdFx0XHRcdDwvVGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0KSl9XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUYXNrUGFkRWRpdG9yPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUpfSkpKCh7dG9kb3M9W10sIGRpc3BhdGNofSk9Pihcblx0PFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaTjeS9nDwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Yig6ZmkPC9UYWJsZUhlYWRlckNvbHVtbj5cblx0XHRcdDxUYWJsZUhlYWRlckNvbHVtbj7pmpDol488L1RhYmxlSGVhZGVyQ29sdW1uPlxuXHRcdFx0PFRhYmxlSGVhZGVyQ29sdW1uIGNvbFNwYW49ezR9PumhuuW6jzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgPFRhYmxlQm9keSBkaXNwbGF5Um93Q2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W10sIGhpZGRlbn0saSk9PihcbiAgICAgICAgICAgICAgICA8VGFibGVSb3cga2V5PXtpfT5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlUm93Q29sdW1uPnt0YXNrfTwvVGFibGVSb3dDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj5cblx0XHRcdFx0XHRcdDxJY29uQnV0dG9uICBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVNT1ZFX0JZX0lOREVYKGkpKX0+XG5cdFx0XHRcdFx0XHRcdDxJY29uUmVtb3ZlLz5cblx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHQ8L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVSb3dDb2x1bW4+XG5cdFx0XHRcdFx0XHQ8VmlzaWJpbGl0eSBkaXNwYXRjaD17ZGlzcGF0Y2h9IGk9e2l9IHZpc2libGU9eyFoaWRkZW59Lz5cblx0XHRcdFx0XHQ8L1RhYmxlUm93Q29sdW1uPlxuXHRcdFx0XHRcdDxUYWJsZVJvd0NvbHVtbiBjb2xTcGFuPXs0fT5cblx0XHRcdFx0XHRcdDxPcmRlciBkaXNwYXRjaD17ZGlzcGF0Y2h9IGk9e2l9Lz5cblx0XHRcdFx0XHQ8L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICAgfVxuICAgICAgICA8L1RhYmxlQm9keT5cbiAgICA8L1RhYmxlPlxuKSlcblxuY29uc3QgVG9kb1N0YXR1cz1jb25uZWN0KCkoKHt0b2RvLGRvbmUsIGRheSwgZGlzcGF0Y2gsIGN1cnJlbnR9KT0+e1xuXHRpZihkb25lKVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cInllbGxvd1wiLz4pXG5cdGVsc2UgaWYoZGF5PmN1cnJlbnQpXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwibGlnaHRncmF5XCIvPilcblx0ZWxzZVxuXHRcdHJldHVybiAoPEljb25TbWlsZSBjb2xvcj1cImxpZ2h0Y3lhblwiIGhvdmVyQ29sb3I9XCJ5ZWxsb3dcIiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9ORSh0b2RvLGRheSkpfS8+KVxufSlcblxuY29uc3QgU2NvcmVQYWQ9Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKCh7c2NvcmUsIGdvYWwsdG9kb30pPT4oXG4gICAgPEVtcHR5IGljb249ezxJY29uU21pbGUgY29sb3I9XCJ5ZWxsb3dcIi8+fSB0ZXh0PXtgJHtzY29yZX0vJHtnb2FsfWB9Lz5cbikpXG5cbmNvbnN0IE9yZGVyPSh7aSxkaXNwYXRjaH0pPT4oXG5cdDxzcGFuPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5UT1AoaSkpfT48SWNvblRvcC8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5VUChpKSl9PjxJY29uVXAvPjwvSWNvbkJ1dHRvbj5cblx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uRE9XTihpKSl9PjxJY29uRG93bi8+PC9JY29uQnV0dG9uPlxuXHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5CT1RUT00oaSkpfT48SWNvbkJvdHRvbS8+PC9JY29uQnV0dG9uPlxuXHQ8L3NwYW4+XG4pXG5cbmNvbnN0IFZpc2liaWxpdHk9KHtpLGRpc3BhdGNoLHZpc2libGUsSWNvbj0oIXZpc2libGUgPyBJY29uSGlkZGVuIDogSWNvblZpc2libGUpfSk9Pihcblx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlRPR0dMRV9WSVNJQkxFKGkpKX0+PEljb24vPjwvSWNvbkJ1dHRvbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==