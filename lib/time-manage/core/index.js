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
				    todoWeek = _props.todoWeek,
				    dispatch = _props.dispatch;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkFwcEJhciIsImRvbWFpbiIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0YXJnZXRzIiwidGFyZ2V0IiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJnZXRXZWVrU3RhcnQiLCJ0b2RvcyIsImhhbmRsZWQiLCJmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiU0VUX0dPQUwiLCJnb2FsIiwiZ2lmdCIsInNjb3JlIiwiTWF0aCIsIm1heCIsInRvZG8iLCJBREQiLCJmaW5kIiwiYSIsImtub3dsZWRnZSIsInB1c2giLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJ0b3RhbFNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiQ09NTUVOVCIsInRvZG9JZCIsImNyZWF0ZVVpZCIsIlNjb3JlUGFkIiwiVG9kb0VkaXRvciIsIlRhc2tQYWQiLCJUYXNrUGFkRWRpdG9yIiwiVGltZU1hbmFnZSIsInByb3BzIiwiZWRpdGluZyIsImlzQ3VycmVudFdlZWsiLCJ3ZWVrIiwiYWNjb21wbGlzaGVkIiwiRGF0ZSIsImdldERheSIsImNyZWF0ZUVsZW1lbnQiLCJpY29uRWxlbWVudFJpZ2h0IiwidGl0bGUiLCJyZWxhdGl2ZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiLCJyZWR1Y2VyIiwiVGltZU1hbmFnZXIiLCJ1aSIsInRpbWUiLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7UUFtQmdCQSxNLEdBQUFBLE07O0FBbkJoQjs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQStCO0FBQ3JDLEtBQU1DLFNBQU9ELE1BQWI7O0FBRUEsS0FBTUUsY0FBWSxTQUFaQSxXQUFZO0FBQUEsU0FBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDekMsT0FBTUMsUUFBTUQsVUFBWjtBQUNBLE9BQU1FLFFBQU0sK0JBQWdCRCxLQUFoQixDQUFaO0FBQ0EsT0FBRyxDQUFDQyxNQUFNQyxPQUFWLEVBQ0NELE1BQU1DLE9BQU4sR0FBYyxFQUFkO0FBQ0QsT0FBTUMsU0FBT0YsTUFBTUMsT0FBTixDQUFjUCxNQUFkLEtBQXVCLEVBQXBDO0FBQ0EsT0FBR1EsT0FBT0MsUUFBUCxJQUFpQkMsU0FBcEIsRUFDQ0YsT0FBT0MsUUFBUCxHQUFnQixTQUFLRSxZQUFMLEVBQWhCOztBQVB3Qyx1QkFTMUJILE1BVDBCLENBU3BDSSxLQVRvQztBQUFBLE9BU3BDQSxLQVRvQyxpQ0FTOUIsRUFUOEI7OztBQVd6QyxPQUFJQyxVQUFRQyxFQUFFTixPQUFPSSxLQUFQLGdDQUFpQkEsS0FBakIsRUFBRixFQUEyQkosTUFBM0IsRUFBbUNGLEtBQW5DLENBQVo7QUFDQSxPQUFHTyxZQUFVLEtBQWIsRUFDQyxPQUFPRSxRQUFRQyxPQUFSLEVBQVA7O0FBRUQsT0FBRyxFQUFFSCxXQUFXQSxRQUFRSSxJQUFyQixDQUFILEVBQ0NKLFVBQVFFLFFBQVFDLE9BQVIsRUFBUjtBQUNEVixTQUFNQyxPQUFOLENBQWNQLE1B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RixjQUFZLHlCQUFRLGlCQUFPO0FBQzdCLE1BQUkvRSxTQUFPLHFDQUFzQkgsS0FBdEIsRUFBNEJMLE1BQTVCLENBQVg7QUFENkIseUJBRXlCUSxNQUZ6QixDQUV0QkMsUUFGc0I7QUFBQSxNQUV0QkEsUUFGc0Isb0NBRWIsU0FBS0UsWUFBTCxFQUZhO0FBQUEscUJBRXlCSCxNQUZ6QixDQUVRZ0IsSUFGUjtBQUFBLE1BRVFBLElBRlIsZ0NBRWEsQ0FGYjtBQUFBLHNCQUV5QmhCLE1BRnpCLENBRWdCa0IsS0FGaEI7QUFBQSxNQUVnQkEsS0FGaEIsaUNBRXNCLENBRnRCOztBQUc3QixTQUFPO0FBQ044QyxZQUFRbkUsTUFBTW1GLEVBQU4sQ0FBU0MsSUFBVCxDQUFjekYsTUFBZCxDQURGO0FBRU5TLHFCQUZNO0FBR05lLFNBQU14QixVQUFRLE1BQVIsR0FBaUJ3QixJQUFqQixHQUF3QmtFLE9BQU9DLGdCQUgvQjtBQUlOakU7QUFKTSxHQUFQO0FBTUEsRUFUYyxFQVNaNEMsVUFUWSxDQUFoQjs7QUFXQWlCLGFBQVlELE9BQVosR0FBb0JBLE9BQXBCO0FBQ0FDLGFBQVlyQixRQUFaLEdBQXFCQSxRQUFyQjtBQUNBcUIsYUFBWWpFLE1BQVosR0FBbUJBLE1BQW5CO0FBQ0EsUUFBT2lFLFdBQVA7QUFDQTs7a0JBRWN6RixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IHtGYW1pbHksVGFza30gZnJvbSBcIi4uLy4uL2RiXCJcblxuaW1wb3J0IHtUYXNrUGFkIGFzIF9UYXNrUGFkfSBmcm9tIFwiLi90YXNrLXBhZFwiXG5pbXBvcnQge1Rhc2tQYWRFZGl0b3IgYXMgX1Rhc2tQYWRFZGl0b3J9IGZyb20gXCIuL3Rhc2stcGFkLWVkaXRvclwiXG5pbXBvcnQge1RvZG9FZGl0b3IgYXMgX1RvZG9FZHRpb3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcbmltcG9ydCB7U2NvcmVQYWQgYXMgX1Njb3JlUGFkfSBmcm9tIFwiLi9zY29yZS1wYWRcIlxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFyZ2V0LCBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKEFwcEJhciwgZG9tYWluKXtcblx0Y29uc3QgRE9NQUlOPWRvbWFpblxuXG5cdGNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGlmKCFjaGlsZC50YXJnZXRzKVxuXHRcdFx0Y2hpbGQudGFyZ2V0cz17fVxuXHRcdGNvbnN0IHRhcmdldD1jaGlsZC50YXJnZXRzW2RvbWFpbl18fHt9XG5cdFx0aWYodGFyZ2V0LnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxuXG5cdFx0bGV0IHt0b2Rvcz1bXX09dGFyZ2V0XG5cblx0XHRsZXQgaGFuZGxlZD1mKHRhcmdldC50b2Rvcz1bLi4udG9kb3NdLCB0YXJnZXQsIGNoaWxkKVxuXHRcdGlmKGhhbmRsZWQ9PT1mYWxzZSlcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXG5cdFx0aWYoIShoYW5kbGVkICYmIGhhbmRsZWQudGhlbikpXG5cdFx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdFx0Y2hpbGQudGFyZ2V0c1tkb21haW5dPXRhcmdldFxuXHRcdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcblx0fVxuXHRjb25zdCBBQ1RJT049e1xuXHRcdFNFVF9HT0FMOiAoZ29hbCwgZ2lmdCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxuXHRcdFx0aWYoIWNoaWxkLnRhcmdldHMpXG5cdFx0XHRcdGNoaWxkLnRhcmdldHM9e31cblx0XHRcdGNvbnN0IHRhcmdldD1jaGlsZC50YXJnZXRzW2RvbWFpbl18fHt9XG5cdFx0XHR0YXJnZXQuc2NvcmU9TWF0aC5tYXgoKHRhcmdldC5zY29yZXx8MCktKHRhcmdldC5nb2FsfHwwKSwwKVxuXHRcdFx0dGFyZ2V0LmdvYWw9Z29hbFxuXHRcdFx0dGFyZ2V0LnRvZG89dG9kb1xuXHRcdFx0Y2hpbGQudGFyZ2V0c1tkb21haW5dPXRhcmdldFxuXHRcdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdFx0fSxcblx0XHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0XHRpZighdG9kbylcblx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmtub3dsZWRnZT09dG9kby5rbm93bGVkZ2UpKVxuXHRcdFx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHRcdH1cblx0XHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHRcdH1cblx0XHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLmtub3dsZWRnZT10b2RvLl9pZClcblx0XHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xuXG5cdFx0XHRpZihpIT0tMSlcblx0XHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR9KVxuXHRcdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0XHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldCk9Pntcblx0XHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0XHRkb25lcy5wdXNoKGRheSlcblx0XHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRcdHRhcmdldC5zY29yZT10YXJnZXQuc2NvcmUrMVxuXHRcdFx0dGFyZ2V0LnRvdGFsU2NvcmU9KHRhcmdldC50b3RhbFNjb3JlfHwwKSsxXG5cdFx0fSlcblx0XHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0XHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdFx0fSlcblx0XHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0XHR9KVxuXHRcdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdFx0fSlcblx0XHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHRcdHRvZG9zLnB1c2godGFyZ2V0KVxuXHRcdH0pXG5cdFx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdFx0fSlcblx0XHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsdGFyZ2V0LGNoaWxkKT0+e1xuXHRcdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0XHRpZihkb25lcy5sZW5ndGgpe1xuXHRcdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMsIGRvbWFpbikudGhlbihhPT57XG5cdFx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXG5cdFx0XHRcdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0dGFyZ2V0LnRvZG9XZWVrPVRhc2suZ2V0V2Vla1N0YXJ0KClcblx0XHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHRcdH1cblx0XHQsQ09NTUVOVDoga25vd2xlZGdlPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdFx0bGV0IHRvZG9JZFxuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2Rvcyx0YXJnZXQsY2hpbGQpPT57XG5cdFx0XHRcdGxldCB0b2RvPXRvZG9zLmZpbmQoYT0+YS5rbm93bGVkZ2U9PWtub3dsZWRnZSlcblx0XHRcdFx0aWYodG9kb0lkPXRvZG8uX2lkKXtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dG9kb0lkPXRvZG8uX2lkPVRhc2suY3JlYXRlVWlkKClcblx0XHRcdFx0fVxuXHRcdFx0fSkoZGlzcGF0Y2gsIGdldFN0YXRlKS50aGVuKGE9PnRvZG9JZClcblx0XHR9XG5cdH1cblxuXHRjb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT4oey4uLmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkVGFyZ2V0KHN0YXRlLGRvbWFpbiksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSxBcHBCYXJ9KSkoX1Njb3JlUGFkKVxuXHRjb25zdCBUb2RvRWRpdG9yPV9Ub2RvRWR0aW9yXG5cdGNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxkb21haW4pLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKF9UYXNrUGFkKVxuXHRjb25zdCBUYXNrUGFkRWRpdG9yPWNvbm5lY3Qoc3RhdGU9Pih7dG9kb3M6Z2V0Q3VycmVudENoaWxkVGFza3Moc3RhdGUsZG9tYWluKX0pKShfVGFza1BhZEVkaXRvcilcblxuXHRjbGFzcyBUaW1lTWFuYWdlIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRcdHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz17XG5cdFx0XHRBcHBCYXI6IFByb3BUeXBlcy5lbGVtZW50LFxuXHRcdFx0QUNUSU9OOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdFx0ZGlzcGF0Y2g6IFByb3BUeXBlcy5mdW5jXG5cdFx0fVxuXHRcdGdldENoaWxkQ29udGV4dCgpe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0QXBwQmFyOiAoPEFwcEJhci8+KSxcblx0XHRcdFx0QUNUSU9OLFxuXHRcdFx0XHRkaXNwYXRjaDogdGhpcy5wcm9wcy5kaXNwYXRjaFxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZW5kZXIoKXtcblx0XHRcdGxldCB7Z29hbCwgc2NvcmUsIGVkaXRpbmcsIHRvZG9XZWVrLCBkaXNwYXRjaH09dGhpcy5wcm9wc1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQod2Vlaz0+e1xuXHRcdFx0XHRcdFx0XHRpZighZ29hbCl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIDxTY29yZVBhZC8+XG5cdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdGxldCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrXG5cdFx0XHRcdFx0XHRcdFx0aWYoaXNDdXJyZW50V2Vlayl7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgYWNjb21wbGlzaGVkPWdvYWw8PXNjb3JlXG5cdFx0XHRcdFx0XHRcdFx0XHRpZighYWNjb21wbGlzaGVkKXtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0e2VkaXRpbmcgPyA8VGFza1BhZEVkaXRvci8+IDogPFRhc2tQYWQgY3VycmVudD17bmV3IERhdGUoKS5nZXREYXkoKX0vPn1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiA8U2NvcmVQYWQvPlxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KEFwcEJhcix7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ6KFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvbkRvbmUgY29sb3I9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOmDkv53lrZjliY0ke25ldyBEYXRlKHdlZWspLnJlbGF0aXZlKG5ldyBEYXRlKHRvZG9XZWVrKSkvN33lkajlrozmiJDmg4XlhrVgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8VGFza1BhZCBjdXJyZW50PXs5OX0vPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pKFRhc2suZ2V0V2Vla1N0YXJ0KCkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdClcblx0XHR9XG5cdH1cblxuXHRjb25zdCByZWR1Y2VyPShzdGF0ZT17fSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBgJHtET01BSU59L2VkaXRgOlxuXHRcdFx0cmV0dXJuIHsuLi5zdGF0ZSxbZG9tYWluXTpwYXlsb2FkfVxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdHJldHVybiBzdGF0ZVxuXHR9XG5cblx0bGV0IFRpbWVNYW5hZ2VyPWNvbm5lY3Qoc3RhdGU9Pntcblx0XHRcdGxldCB0YXJnZXQ9Z2V0Q3VycmVudENoaWxkVGFyZ2V0KHN0YXRlLGRvbWFpbilcblx0XHRcdGNvbnN0IHt0b2RvV2Vlaz1UYXNrLmdldFdlZWtTdGFydCgpLCBnb2FsPTAsIHNjb3JlPTB9PXRhcmdldFxuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZWRpdGluZzpzdGF0ZS51aS50aW1lW2RvbWFpbl0sXG5cdFx0XHRcdHRvZG9XZWVrLFxuXHRcdFx0XHRnb2FsOiBkb21haW49PVwiYmFieVwiID8gZ29hbCA6IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLFxuXHRcdFx0XHRzY29yZVxuXHRcdFx0fVxuXHRcdH0pKFRpbWVNYW5hZ2UpXG5cblx0VGltZU1hbmFnZXIucmVkdWNlcj1yZWR1Y2VyXG5cdFRpbWVNYW5hZ2VyLlNjb3JlUGFkPVNjb3JlUGFkXG5cdFRpbWVNYW5hZ2VyLkFDVElPTj1BQ1RJT05cblx0cmV0dXJuIFRpbWVNYW5hZ2VyXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVxuIl19