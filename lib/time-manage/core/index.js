"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.create = create;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _db = require("../../db");

var _taskPad = require("./task-pad");

var _taskPadEditor = require("./task-pad-editor");

var _todoEditor = require("./todo-editor");

var _scorePad = require("./score-pad");

var _selector = require("../../selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function create(AppBar, domain) {
	var DOMAIN = domain;

	var changeTodos = function changeTodos(f) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			if (!child.targets) child.targets = {};
			var target = child.targets[domain] || {};
			if (target.todoWeek == undefined) target.todoWeek = _db.Task.getWeekStart();

			var _target$todos = target.todos,
			    todos = _target$todos === undefined ? [] : _target$todos;


			var handled = f(target.todos = [].concat(_toConsumableArray(todos)), target, child);
			if (handled === false) return Promise.resolve();

			if (!(handled && handled.then)) handled = Promise.resolve();
			child.targets[domain] = target;
			return handled.then(function (a) {
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			});
		};
	};
	var ACTION = {
		SET_GOAL: function SET_GOAL(goal, gift) {
			return function (dispatch, getState) {
				var child = (0, _selector.getCurrentChild)(getState());
				if (!child.targets) child.targets = {};
				var target = child.targets[domain] || {};
				target.score = Math.max((target.score || 0) - (target.goal || 0), 0);
				target.goal = goal;
				target.todo = todo;
				child.targets[domain] = target;
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			};
		},
		ADD: function ADD(todo) {
			return function (dispatch, getState) {
				if (!todo) return Promise.resolve();
				return changeTodos(function (todos) {
					switch (typeof todo === "undefined" ? "undefined" : _typeof(todo)) {
						case "object":
							if (!todos.find(function (a) {
								return a.knowledge == todo.knowledge;
							})) todos.push(todo);
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
				var i = (typeof todo === "undefined" ? "undefined" : _typeof(todo)) == 'object' ? todos.findIndex(function (a) {
					return a.knowledge = todo._id;
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
			return changeTodos(function (todos, target) {
				var task = todos.find(function (a) {
					return a.content == todo;
				});
				var _task$dones = task.dones,
				    dones = _task$dones === undefined ? [] : _task$dones;

				dones.push(day);
				task.dones = dones;
				target.score = target.score + 1;
				target.totalScore = (target.totalScore || 0) + 1;
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
				return changeTodos(function (todos, target, child) {
					//save history
					var dones = todos.filter(function (_ref) {
						var _ref$dones = _ref.dones,
						    dones = _ref$dones === undefined ? [] : _ref$dones;
						return dones.length;
					});
					if (dones.length) {
						return _db.Task.finishWeekTasks(child, dones, domain).then(function (a) {
							todos.forEach(function (a) {
								return a.dones = [];
							});
							target.todoWeek = _db.Task.getWeekStart();
						});
					} else target.todoWeek = _db.Task.getWeekStart();
				})(dispatch, getState);
			};
		},
		COMMENT: function COMMENT(knowledge) {
			return function (dispatch, getState) {
				var todoId = void 0;
				return changeTodos(function (todos, target, child) {
					var todo = todos.find(function (a) {
						return a.knowledge == knowledge;
					});
					if (todoId = todo._id) {
						return false;
					} else {
						todoId = todo._id = _db.Task.createUid();
					}
				})(dispatch, getState).then(function (a) {
					return todoId;
				});
			};
		}
	};

	var ScorePad = (0, _reactRedux.connect)(function (state) {
		return _extends({}, (0, _qiliApp.compact)((0, _selector.getCurrentChildTarget)(state, domain), "score", "goal", "todo"), { AppBar: AppBar });
	})(_scorePad.ScorePad);
	var TodoEditor = _todoEditor.TodoEditor;
	var TaskPad = (0, _reactRedux.connect)(function (state) {
		return { todos: (0, _selector.getCurrentChildTasks)(state, domain).filter(function (a) {
				return !a.hidden;
			}) };
	})(_taskPad.TaskPad);
	var TaskPadEditor = (0, _reactRedux.connect)(function (state) {
		return { todos: (0, _selector.getCurrentChildTasks)(state, domain) };
	})(_taskPadEditor.TaskPadEditor);

	var TimeManage = function (_Component) {
		_inherits(TimeManage, _Component);

		function TimeManage() {
			_classCallCheck(this, TimeManage);

			return _possibleConstructorReturn(this, (TimeManage.__proto__ || Object.getPrototypeOf(TimeManage)).apply(this, arguments));
		}

		_createClass(TimeManage, [{
			key: "getChildContext",
			value: function getChildContext() {
				return {
					AppBar: _react2.default.createElement(AppBar, null),
					ACTION: ACTION,
					dispatch: this.props.dispatch
				};
			}
		}, {
			key: "render",
			value: function render() {
				var _props = this.props,
				    goal = _props.goal,
				    score = _props.score,
				    editing = _props.editing,
				    todoWeek = _props.todoWeek;

				return _react2.default.createElement(
					"div",
					null,
					function (week) {
						if (!goal) {
							return _react2.default.createElement(ScorePad, null);
						} else {
							var isCurrentWeek = todoWeek == week;
							if (isCurrentWeek) {
								var accomplished = goal <= score;
								if (!accomplished) {
									return _react2.default.createElement(
										"div",
										null,
										_react2.default.createElement(TodoEditor, { editing: editing }),
										editing ? _react2.default.createElement(TaskPadEditor, null) : _react2.default.createElement(TaskPad, { current: new Date().getDay() })
									);
								} else {
									return _react2.default.createElement(ScorePad, null);
								}
							} else {
								return _react2.default.createElement(
									"div",
									null,
									_react2.default.createElement(AppBar, {
										iconElementRight: _react2.default.createElement(
											_materialUi.IconButton,
											{ onClick: function onClick(e) {
													return dispatch(ACTION.RESET());
												} },
											_react2.default.createElement(_cloudDone2.default, { color: "white" })
										),
										title: "\u4FDD\u5B58\u524D" + new Date(week).relative(new Date(todoWeek)) / 7 + "\u5468\u5B8C\u6210\u60C5\u51B5"
									}),
									_react2.default.createElement(TaskPad, { current: 99 })
								);
							}
						}
					}(_db.Task.getWeekStart())
				);
			}
		}]);

		return TimeManage;
	}(_react.Component);

	TimeManage.childContextTypes = {
		AppBar: _react.PropTypes.element,
		ACTION: _react.PropTypes.object,
		dispatch: _react.PropTypes.func
	};


	var reducer = function reducer() {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var _ref2 = arguments[1];
		var type = _ref2.type,
		    payload = _ref2.payload;

		switch (type) {
			case DOMAIN + "/edit":
				return _extends({}, state, _defineProperty({}, domain, payload));
				break;
		}
		return state;
	};

	var TimeManager = (0, _reactRedux.connect)(function (state) {
		var target = (0, _selector.getCurrentChildTarget)(state, domain);
		var _target$todoWeek = target.todoWeek,
		    todoWeek = _target$todoWeek === undefined ? _db.Task.getWeekStart() : _target$todoWeek,
		    _target$goal = target.goal,
		    goal = _target$goal === undefined ? 0 : _target$goal,
		    _target$score = target.score,
		    score = _target$score === undefined ? 0 : _target$score;

		return {
			editing: state.ui.time[domain],
			todoWeek: todoWeek,
			goal: domain == "baby" ? goal : Number.MAX_SAFE_INTEGER,
			score: score
		};
	})(TimeManage);

	TimeManager.reducer = reducer;
	TimeManager.ScorePad = ScorePad;
	TimeManager.ACTION = ACTION;
	return TimeManager;
}

exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkFwcEJhciIsImRvbWFpbiIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0YXJnZXRzIiwidGFyZ2V0IiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJnZXRXZWVrU3RhcnQiLCJ0b2RvcyIsImhhbmRsZWQiLCJmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiU0VUX0dPQUwiLCJnb2FsIiwiZ2lmdCIsInNjb3JlIiwiTWF0aCIsIm1heCIsInRvZG8iLCJBREQiLCJmaW5kIiwiYSIsImtub3dsZWRnZSIsInB1c2giLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJ0b3RhbFNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiQ09NTUVOVCIsInRvZG9JZCIsImNyZWF0ZVVpZCIsIlNjb3JlUGFkIiwiVG9kb0VkaXRvciIsIlRhc2tQYWQiLCJUYXNrUGFkRWRpdG9yIiwiVGltZU1hbmFnZSIsInByb3BzIiwiZWRpdGluZyIsImlzQ3VycmVudFdlZWsiLCJ3ZWVrIiwiYWNjb21wbGlzaGVkIiwiRGF0ZSIsImdldERheSIsImNyZWF0ZUVsZW1lbnQiLCJpY29uRWxlbWVudFJpZ2h0IiwidGl0bGUiLCJyZWxhdGl2ZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiLCJyZWR1Y2VyIiwiVGltZU1hbmFnZXIiLCJ1aSIsInRpbWUiLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7UUFtQmdCQSxNLEdBQUFBLE07O0FBbkJoQjs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQStCO0FBQ3JDLEtBQU1DLFNBQU9ELE1BQWI7O0FBRUEsS0FBTUUsY0FBWSxTQUFaQSxXQUFZO0FBQUEsU0FBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDekMsT0FBTUMsUUFBTUQsVUFBWjtBQUNBLE9BQU1FLFFBQU0sK0JBQWdCRCxLQUFoQixDQUFaO0FBQ0EsT0FBRyxDQUFDQyxNQUFNQyxPQUFWLEVBQ0NELE1BQU1DLE9BQU4sR0FBYyxFQUFkO0FBQ0QsT0FBTUMsU0FBT0YsTUFBTUMsT0FBTixDQUFjUCxNQUFkLEtBQXVCLEVBQXBDO0FBQ0EsT0FBR1EsT0FBT0MsUUFBUCxJQUFpQkMsU0FBcEIsRUFDQ0YsT0FBT0MsUUFBUCxHQUFnQixTQUFLRSxZQUFMLEVBQWhCOztBQVB3Qyx1QkFTMUJILE1BVDBCLENBU3BDSSxLQVRvQztBQUFBLE9BU3BDQSxLQVRvQyxpQ0FTOUIsRUFUOEI7OztBQVd6QyxPQUFJQyxVQUFRQyxFQUFFTixPQUFPSSxLQUFQLGdDQUFpQkEsS0FBakIsRUFBRixFQUEyQkosTUFBM0IsRUFBbUNGLEtBQW5DLENBQVo7QUFDQSxPQUFHTyxZQUFVLEtBQWIsRUFDQyxPQUFPRSxRQUFRQyxPQUFSLEVBQVA7O0FBRUQsT0FBRyxFQUFFSCxXQUFXQSxRQUFRSSxJQUFyQixDQUFILEVBQ0NKLFVBQVFFLFFBQVFDLE9BQVIsRUFBUjtBQUNEVixTQUFNQyxPQUFOLENBQWNQLE1B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U0FBTyxxQ0FBc0JILEtBQXRCLEVBQTRCTCxNQUE1QixDQUFYO0FBRDZCLHlCQUV5QlEsTUFGekIsQ0FFdEJDLFFBRnNCO0FBQUEsTUFFdEJBLFFBRnNCLG9DQUViLFNBQUtFLFlBQUwsRUFGYTtBQUFBLHFCQUV5QkgsTUFGekIsQ0FFUWdCLElBRlI7QUFBQSxNQUVRQSxJQUZSLGdDQUVhLENBRmI7QUFBQSxzQkFFeUJoQixNQUZ6QixDQUVnQmtCLEtBRmhCO0FBQUEsTUFFZ0JBLEtBRmhCLGlDQUVzQixDQUZ0Qjs7QUFHN0IsU0FBTztBQUNOOEMsWUFBUW5FLE1BQU1tRixFQUFOLENBQVNDLElBQVQsQ0FBY3pGLE1BQWQsQ0FERjtBQUVOUyxxQkFGTTtBQUdOZSxTQUFNeEIsVUFBUSxNQUFSLEdBQWlCd0IsSUFBakIsR0FBd0JrRSxPQUFPQyxnQkFIL0I7QUFJTmpFO0FBSk0sR0FBUDtBQU1BLEVBVGMsRUFTWjRDLFVBVFksQ0FBaEI7O0FBV0FpQixhQUFZRCxPQUFaLEdBQW9CQSxPQUFwQjtBQUNBQyxhQUFZckIsUUFBWixHQUFxQkEsUUFBckI7QUFDQXFCLGFBQVlqRSxNQUFaLEdBQW1CQSxNQUFuQjtBQUNBLFFBQU9pRSxXQUFQO0FBQ0E7O2tCQUVjekYsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcclxuXHJcbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuLi8uLi9kYlwiXHJcblxyXG5pbXBvcnQge1Rhc2tQYWQgYXMgX1Rhc2tQYWR9IGZyb20gXCIuL3Rhc2stcGFkXCJcclxuaW1wb3J0IHtUYXNrUGFkRWRpdG9yIGFzIF9UYXNrUGFkRWRpdG9yfSBmcm9tIFwiLi90YXNrLXBhZC1lZGl0b3JcIlxyXG5pbXBvcnQge1RvZG9FZGl0b3IgYXMgX1RvZG9FZHRpb3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcclxuaW1wb3J0IHtTY29yZVBhZCBhcyBfU2NvcmVQYWR9IGZyb20gXCIuL3Njb3JlLXBhZFwiXHJcblxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFyZ2V0LCBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKEFwcEJhciwgZG9tYWluKXtcclxuXHRjb25zdCBET01BSU49ZG9tYWluXHJcblxyXG5cdGNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcclxuXHRcdGlmKCFjaGlsZC50YXJnZXRzKVxyXG5cdFx0XHRjaGlsZC50YXJnZXRzPXt9XHJcblx0XHRjb25zdCB0YXJnZXQ9Y2hpbGQudGFyZ2V0c1tkb21haW5dfHx7fVxyXG5cdFx0aWYodGFyZ2V0LnRvZG9XZWVrPT11bmRlZmluZWQpXHJcblx0XHRcdHRhcmdldC50b2RvV2Vlaz1UYXNrLmdldFdlZWtTdGFydCgpXHJcblxyXG5cdFx0bGV0IHt0b2Rvcz1bXX09dGFyZ2V0XHJcblxyXG5cdFx0bGV0IGhhbmRsZWQ9Zih0YXJnZXQudG9kb3M9Wy4uLnRvZG9zXSwgdGFyZ2V0LCBjaGlsZClcclxuXHRcdGlmKGhhbmRsZWQ9PT1mYWxzZSlcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXHJcblx0XHRcclxuXHRcdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxyXG5cdFx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXHJcblx0XHRjaGlsZC50YXJnZXRzW2RvbWFpbl09dGFyZ2V0XHJcblx0XHRyZXR1cm4gaGFuZGxlZC50aGVuKGE9PkZhbWlseS51cHNlcnQoY2hpbGQpXHJcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcclxuXHR9XHJcblx0Y29uc3QgQUNUSU9OPXtcclxuXHRcdFNFVF9HT0FMOiAoZ29hbCwgZ2lmdCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXHJcblx0XHRcdGlmKCFjaGlsZC50YXJnZXRzKVxyXG5cdFx0XHRcdGNoaWxkLnRhcmdldHM9e31cclxuXHRcdFx0Y29uc3QgdGFyZ2V0PWNoaWxkLnRhcmdldHNbZG9tYWluXXx8e31cclxuXHRcdFx0dGFyZ2V0LnNjb3JlPU1hdGgubWF4KCh0YXJnZXQuc2NvcmV8fDApLSh0YXJnZXQuZ29hbHx8MCksMClcclxuXHRcdFx0dGFyZ2V0LmdvYWw9Z29hbFxyXG5cdFx0XHR0YXJnZXQudG9kbz10b2RvXHJcblx0XHRcdGNoaWxkLnRhcmdldHNbZG9tYWluXT10YXJnZXRcclxuXHRcdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoY2hpbGQpXHJcblx0XHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcclxuXHRcdH0sXHJcblx0XHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRcdGlmKCF0b2RvKVxyXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxyXG5cdFx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcclxuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XHJcblx0XHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmtub3dsZWRnZT09dG9kby5rbm93bGVkZ2UpKVxyXG5cdFx0XHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxyXG5cdFx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXHJcblx0XHR9XHJcblx0XHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xyXG5cdFx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXHJcblx0XHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5rbm93bGVkZ2U9dG9kby5faWQpXHJcblx0XHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xyXG5cclxuXHRcdFx0aWYoaSE9LTEpXHJcblx0XHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcclxuXHRcdH0pXHJcblx0XHQsUkVNT1ZFX0JZX0lOREVYOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+dG9kb3Muc3BsaWNlKGksMSkpXHJcblx0XHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldCk9PntcclxuXHRcdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcclxuXHRcdFx0bGV0IHtkb25lcz1bXX09dGFza1xyXG5cdFx0XHRkb25lcy5wdXNoKGRheSlcclxuXHRcdFx0dGFzay5kb25lcz1kb25lc1xyXG5cdFx0XHR0YXJnZXQuc2NvcmU9dGFyZ2V0LnNjb3JlKzFcclxuXHRcdFx0dGFyZ2V0LnRvdGFsU2NvcmU9KHRhcmdldC50b3RhbFNjb3JlfHwwKSsxXHJcblx0XHR9KVxyXG5cdFx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXHJcblx0XHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XHJcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cclxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcclxuXHRcdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXHJcblx0XHR9KVxyXG5cdFx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XHJcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cclxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcclxuXHRcdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXHJcblx0XHR9KVxyXG5cdFx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxyXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxyXG5cdFx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcclxuXHRcdH0pXHJcblx0XHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xyXG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXHJcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXHJcblx0XHRcdHRvZG9zLnB1c2godGFyZ2V0KVxyXG5cdFx0fSlcclxuXHRcdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxyXG5cdFx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cclxuXHRcdH0pXHJcblx0XHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2Rvcyx0YXJnZXQsY2hpbGQpPT57XHJcblx0XHRcdFx0Ly9zYXZlIGhpc3RvcnlcclxuXHRcdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxyXG5cdFx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gVGFzay5maW5pc2hXZWVrVGFza3MoY2hpbGQsIGRvbmVzLCBkb21haW4pLnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXHJcblx0XHRcdFx0XHRcdHRhcmdldC50b2RvV2Vlaz1UYXNrLmdldFdlZWtTdGFydCgpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxyXG5cdFx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcclxuXHRcdH1cclxuXHRcdCxDT01NRU5UOiBrbm93bGVkZ2U9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XHJcblx0XHRcdGxldCB0b2RvSWRcclxuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2Rvcyx0YXJnZXQsY2hpbGQpPT57XHJcblx0XHRcdFx0bGV0IHRvZG89dG9kb3MuZmluZChhPT5hLmtub3dsZWRnZT09a25vd2xlZGdlKVxyXG5cdFx0XHRcdGlmKHRvZG9JZD10b2RvLl9pZCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHRvZG9JZD10b2RvLl9pZD1UYXNrLmNyZWF0ZVVpZCgpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KShkaXNwYXRjaCwgZ2V0U3RhdGUpLnRoZW4oYT0+dG9kb0lkKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3QgU2NvcmVQYWQ9Y29ubmVjdChzdGF0ZT0+KHsuLi5jb21wYWN0KGdldEN1cnJlbnRDaGlsZFRhcmdldChzdGF0ZSxkb21haW4pLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIiksQXBwQmFyfSkpKF9TY29yZVBhZClcclxuXHRjb25zdCBUb2RvRWRpdG9yPV9Ub2RvRWR0aW9yXHJcblx0Y29uc3QgVGFza1BhZD1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlLGRvbWFpbikuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkoX1Rhc2tQYWQpXHJcblx0Y29uc3QgVGFza1BhZEVkaXRvcj1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlLGRvbWFpbil9KSkoX1Rhc2tQYWRFZGl0b3IpXHJcblxyXG5cdGNsYXNzIFRpbWVNYW5hZ2UgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0XHRBcHBCYXI6IFByb3BUeXBlcy5lbGVtZW50LFxyXG5cdFx0XHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRcdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG5cdFx0fVxyXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0QXBwQmFyOiAoPEFwcEJhci8+KSxcclxuXHRcdFx0XHRBQ1RJT04sXHJcblx0XHRcdFx0ZGlzcGF0Y2g6IHRoaXMucHJvcHMuZGlzcGF0Y2hcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdGxldCB7Z29hbCwgc2NvcmUsIGVkaXRpbmcsIHRvZG9XZWVrfT10aGlzLnByb3BzXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0KHdlZWs9PntcclxuXHRcdFx0XHRcdFx0XHRpZighZ29hbCl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cclxuXHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrXHJcblx0XHRcdFx0XHRcdFx0XHRpZihpc0N1cnJlbnRXZWVrKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZighYWNjb21wbGlzaGVkKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7ZWRpdGluZyA/IDxUYXNrUGFkRWRpdG9yLz4gOiA8VGFza1BhZCBjdXJyZW50PXtuZXcgRGF0ZSgpLmdldERheSgpfS8+fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChBcHBCYXIse1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ6KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTpg5L+d5a2Y5YmNJHtuZXcgRGF0ZSh3ZWVrKS5yZWxhdGl2ZShuZXcgRGF0ZSh0b2RvV2VlaykpLzd95ZGo5a6M5oiQ5oOF5Ya1YFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRhc2tQYWQgY3VycmVudD17OTl9Lz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSkoVGFzay5nZXRXZWVrU3RhcnQoKSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y29uc3QgcmVkdWNlcj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XHJcblx0XHRcdHJldHVybiB7Li4uc3RhdGUsW2RvbWFpbl06cGF5bG9hZH1cclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuXHR9XHJcblxyXG5cdGxldCBUaW1lTWFuYWdlcj1jb25uZWN0KHN0YXRlPT57XHJcblx0XHRcdGxldCB0YXJnZXQ9Z2V0Q3VycmVudENoaWxkVGFyZ2V0KHN0YXRlLGRvbWFpbilcclxuXHRcdFx0Y29uc3Qge3RvZG9XZWVrPVRhc2suZ2V0V2Vla1N0YXJ0KCksIGdvYWw9MCwgc2NvcmU9MH09dGFyZ2V0XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0ZWRpdGluZzpzdGF0ZS51aS50aW1lW2RvbWFpbl0sXHJcblx0XHRcdFx0dG9kb1dlZWssXHJcblx0XHRcdFx0Z29hbDogZG9tYWluPT1cImJhYnlcIiA/IGdvYWwgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcclxuXHRcdFx0XHRzY29yZVxyXG5cdFx0XHR9XHJcblx0XHR9KShUaW1lTWFuYWdlKVxyXG5cclxuXHRUaW1lTWFuYWdlci5yZWR1Y2VyPXJlZHVjZXJcclxuXHRUaW1lTWFuYWdlci5TY29yZVBhZD1TY29yZVBhZFxyXG5cdFRpbWVNYW5hZ2VyLkFDVElPTj1BQ1RJT05cclxuXHRyZXR1cm4gVGltZU1hbmFnZXJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlXHJcbiJdfQ==