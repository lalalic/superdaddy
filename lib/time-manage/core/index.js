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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkFwcEJhciIsImRvbWFpbiIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0YXJnZXRzIiwidGFyZ2V0IiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJnZXRXZWVrU3RhcnQiLCJ0b2RvcyIsImhhbmRsZWQiLCJmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ0aGVuIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiU0VUX0dPQUwiLCJnb2FsIiwiZ2lmdCIsInNjb3JlIiwiTWF0aCIsIm1heCIsInRvZG8iLCJBREQiLCJmaW5kIiwiYSIsImtub3dsZWRnZSIsInB1c2giLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJ0b3RhbFNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiQ09NTUVOVCIsInRvZG9JZCIsImNyZWF0ZVVpZCIsIlNjb3JlUGFkIiwiVG9kb0VkaXRvciIsIlRhc2tQYWQiLCJUYXNrUGFkRWRpdG9yIiwiVGltZU1hbmFnZSIsInByb3BzIiwiZWRpdGluZyIsImlzQ3VycmVudFdlZWsiLCJ3ZWVrIiwiYWNjb21wbGlzaGVkIiwiRGF0ZSIsImdldERheSIsImNyZWF0ZUVsZW1lbnQiLCJpY29uRWxlbWVudFJpZ2h0IiwidGl0bGUiLCJyZWxhdGl2ZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiLCJyZWR1Y2VyIiwiVGltZU1hbmFnZXIiLCJ1aSIsInRpbWUiLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7UUFtQmdCQSxNLEdBQUFBLE07O0FBbkJoQjs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBR08sU0FBU0EsTUFBVCxDQUFnQkMsTUFBaEIsRUFBd0JDLE1BQXhCLEVBQStCO0FBQ3JDLEtBQU1DLFNBQU9ELE1BQWI7O0FBRUEsS0FBTUUsY0FBWSxTQUFaQSxXQUFZO0FBQUEsU0FBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDekMsT0FBTUMsUUFBTUQsVUFBWjtBQUNBLE9BQU1FLFFBQU0sK0JBQWdCRCxLQUFoQixDQUFaO0FBQ0EsT0FBRyxDQUFDQyxNQUFNQyxPQUFWLEVBQ0NELE1BQU1DLE9BQU4sR0FBYyxFQUFkO0FBQ0QsT0FBTUMsU0FBT0YsTUFBTUMsT0FBTixDQUFjUCxNQUFkLEtBQXVCLEVBQXBDO0FBQ0EsT0FBR1EsT0FBT0MsUUFBUCxJQUFpQkMsU0FBcEIsRUFDQ0YsT0FBT0MsUUFBUCxHQUFnQixTQUFLRSxZQUFMLEVBQWhCOztBQVB3Qyx1QkFTMUJILE1BVDBCLENBU3BDSSxLQVRvQztBQUFBLE9BU3BDQSxLQVRvQyxpQ0FTOUIsRUFUOEI7OztBQVd6QyxPQUFJQyxVQUFRQyxFQUFFTixPQUFPSSxLQUFQLGdDQUFpQkEsS0FBakIsRUFBRixFQUEyQkosTUFBM0IsRUFBbUNGLEtBQW5DLENBQVo7QUFDQSxPQUFHTyxZQUFVLEtBQWIsRUFDQyxPQUFPRSxRQUFRQyxPQUFSLEVBQVA7O0FBRUQsT0FBRyxFQUFFSCxXQUFXQSxRQUFRSSxJQUFyQixDQUFILEVBQ0NKLFVBQVFFLFFBQVFDLE9BQVIsRUFBUjtBQUNEVixTQUFNQyxPQUFOLENBQWNQLE1B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U0FBTyxxQ0FBc0JILEtBQXRCLEVBQTRCTCxNQUE1QixDQUFYO0FBRDZCLHlCQUV5QlEsTUFGekIsQ0FFdEJDLFFBRnNCO0FBQUEsTUFFdEJBLFFBRnNCLG9DQUViLFNBQUtFLFlBQUwsRUFGYTtBQUFBLHFCQUV5QkgsTUFGekIsQ0FFUWdCLElBRlI7QUFBQSxNQUVRQSxJQUZSLGdDQUVhLENBRmI7QUFBQSxzQkFFeUJoQixNQUZ6QixDQUVnQmtCLEtBRmhCO0FBQUEsTUFFZ0JBLEtBRmhCLGlDQUVzQixDQUZ0Qjs7QUFHN0IsU0FBTztBQUNOOEMsWUFBUW5FLE1BQU1tRixFQUFOLENBQVNDLElBQVQsQ0FBY3pGLE1BQWQsQ0FERjtBQUVOUyxxQkFGTTtBQUdOZSxTQUFNeEIsVUFBUSxNQUFSLEdBQWlCd0IsSUFBakIsR0FBd0JrRSxPQUFPQyxnQkFIL0I7QUFJTmpFO0FBSk0sR0FBUDtBQU1BLEVBVGMsRUFTWjRDLFVBVFksQ0FBaEI7O0FBV0FpQixhQUFZRCxPQUFaLEdBQW9CQSxPQUFwQjtBQUNBQyxhQUFZckIsUUFBWixHQUFxQkEsUUFBckI7QUFDQXFCLGFBQVlqRSxNQUFaLEdBQW1CQSxNQUFuQjtBQUNBLFFBQU9pRSxXQUFQO0FBQ0E7O2tCQUVjekYsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVN9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuLi8uLi9kYlwiXG5cbmltcG9ydCB7VGFza1BhZCBhcyBfVGFza1BhZH0gZnJvbSBcIi4vdGFzay1wYWRcIlxuaW1wb3J0IHtUYXNrUGFkRWRpdG9yIGFzIF9UYXNrUGFkRWRpdG9yfSBmcm9tIFwiLi90YXNrLXBhZC1lZGl0b3JcIlxuaW1wb3J0IHtUb2RvRWRpdG9yIGFzIF9Ub2RvRWR0aW9yfSBmcm9tIFwiLi90b2RvLWVkaXRvclwiXG5pbXBvcnQge1Njb3JlUGFkIGFzIF9TY29yZVBhZH0gZnJvbSBcIi4vc2NvcmUtcGFkXCJcblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhcmdldCwgZ2V0Q3VycmVudENoaWxkVGFza3N9IGZyb20gXCIuLi8uLi9zZWxlY3RvclwiXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShBcHBCYXIsIGRvbWFpbil7XG5cdGNvbnN0IERPTUFJTj1kb21haW5cblxuXHRjb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRpZighY2hpbGQudGFyZ2V0cylcblx0XHRcdGNoaWxkLnRhcmdldHM9e31cblx0XHRjb25zdCB0YXJnZXQ9Y2hpbGQudGFyZ2V0c1tkb21haW5dfHx7fVxuXHRcdGlmKHRhcmdldC50b2RvV2Vlaz09dW5kZWZpbmVkKVxuXHRcdFx0dGFyZ2V0LnRvZG9XZWVrPVRhc2suZ2V0V2Vla1N0YXJ0KClcblxuXHRcdGxldCB7dG9kb3M9W119PXRhcmdldFxuXG5cdFx0bGV0IGhhbmRsZWQ9Zih0YXJnZXQudG9kb3M9Wy4uLnRvZG9zXSwgdGFyZ2V0LCBjaGlsZClcblx0XHRpZihoYW5kbGVkPT09ZmFsc2UpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcblx0XHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRcdGhhbmRsZWQ9UHJvbWlzZS5yZXNvbHZlKClcblx0XHRjaGlsZC50YXJnZXRzW2RvbWFpbl09dGFyZ2V0XG5cdFx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpKVxuXHR9XG5cdGNvbnN0IEFDVElPTj17XG5cdFx0U0VUX0dPQUw6IChnb2FsLCBnaWZ0KT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKGdldFN0YXRlKCkpXG5cdFx0XHRpZighY2hpbGQudGFyZ2V0cylcblx0XHRcdFx0Y2hpbGQudGFyZ2V0cz17fVxuXHRcdFx0Y29uc3QgdGFyZ2V0PWNoaWxkLnRhcmdldHNbZG9tYWluXXx8e31cblx0XHRcdHRhcmdldC5zY29yZT1NYXRoLm1heCgodGFyZ2V0LnNjb3JlfHwwKS0odGFyZ2V0LmdvYWx8fDApLDApXG5cdFx0XHR0YXJnZXQuZ29hbD1nb2FsXG5cdFx0XHR0YXJnZXQudG9kbz10b2RvXG5cdFx0XHRjaGlsZC50YXJnZXRzW2RvbWFpbl09dGFyZ2V0XG5cdFx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0XHR9LFxuXHRcdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRcdGlmKCF0b2RvKVxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRcdHJldHVybiBjaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHRcdGlmKCF0b2Rvcy5maW5kKGE9PmEua25vd2xlZGdlPT10b2RvLmtub3dsZWRnZSkpXG5cdFx0XHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRcdFx0dG9kb3MucHVzaCh7Y29udGVudDp0b2RvfSlcblx0XHRcdFx0fVxuXHRcdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdFx0fVxuXHRcdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXG5cdFx0XHRcdD8gdG9kb3MuZmluZEluZGV4KGE9PmEua25vd2xlZGdlPXRvZG8uX2lkKVxuXHRcdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRcdGlmKGkhPS0xKVxuXHRcdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdH0pXG5cdFx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxuXHRcdCxET05FOiAodG9kbyxkYXkpPT5jaGFuZ2VUb2RvcygodG9kb3MsdGFyZ2V0KT0+e1xuXHRcdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcblx0XHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdFx0dGFzay5kb25lcz1kb25lc1xuXHRcdFx0dGFyZ2V0LnNjb3JlPXRhcmdldC5zY29yZSsxXG5cdFx0XHR0YXJnZXQudG90YWxTY29yZT0odGFyZ2V0LnRvdGFsU2NvcmV8fDApKzFcblx0XHR9KVxuXHRcdCxFRElUSU5HOiAoc3RhdHVzPTApPT4oe3R5cGU6YCR7RE9NQUlOfS9lZGl0YCwgcGF5bG9hZDpzdGF0dXN9KVxuXHRcdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0XHR9KVxuXHRcdCxET1dOOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHRcdHRvZG9zLnNwbGljZSgoaSsxKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHRcdH0pXG5cdFx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0XHR9KVxuXHRcdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdFx0fSlcblx0XHQsVE9HR0xFX1ZJU0lCTEU6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cblx0XHR9KVxuXHRcdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2Rvcyx0YXJnZXQsY2hpbGQpPT57XG5cdFx0XHRcdC8vc2F2ZSBoaXN0b3J5XG5cdFx0XHRcdGxldCBkb25lcz10b2Rvcy5maWx0ZXIoKHtkb25lcz1bXX0pPT5kb25lcy5sZW5ndGgpXG5cdFx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdFx0cmV0dXJuIFRhc2suZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCBkb25lcywgZG9tYWluKS50aGVuKGE9Pntcblx0XHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRcdHRhcmdldC50b2RvV2Vlaz1UYXNrLmdldFdlZWtTdGFydCgpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2Vcblx0XHRcdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxuXHRcdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdFx0fVxuXHRcdCxDT01NRU5UOiBrbm93bGVkZ2U9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0XHRsZXQgdG9kb0lkXG5cdFx0XHRyZXR1cm4gY2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldCxjaGlsZCk9Pntcblx0XHRcdFx0bGV0IHRvZG89dG9kb3MuZmluZChhPT5hLmtub3dsZWRnZT09a25vd2xlZGdlKVxuXHRcdFx0XHRpZih0b2RvSWQ9dG9kby5faWQpe1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHR0b2RvSWQ9dG9kby5faWQ9VGFzay5jcmVhdGVVaWQoKVxuXHRcdFx0XHR9XG5cdFx0XHR9KShkaXNwYXRjaCwgZ2V0U3RhdGUpLnRoZW4oYT0+dG9kb0lkKVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9Pih7Li4uY29tcGFjdChnZXRDdXJyZW50Q2hpbGRUYXJnZXQoc3RhdGUsZG9tYWluKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpLEFwcEJhcn0pKShfU2NvcmVQYWQpXG5cdGNvbnN0IFRvZG9FZGl0b3I9X1RvZG9FZHRpb3Jcblx0Y29uc3QgVGFza1BhZD1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlLGRvbWFpbikuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkoX1Rhc2tQYWQpXG5cdGNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxkb21haW4pfSkpKF9UYXNrUGFkRWRpdG9yKVxuXG5cdGNsYXNzIFRpbWVNYW5hZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdEFwcEJhcjogUHJvcFR5cGVzLmVsZW1lbnQsXG5cdFx0XHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0XHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcblx0XHR9XG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRBcHBCYXI6ICg8QXBwQmFyLz4pLFxuXHRcdFx0XHRBQ1RJT04sXG5cdFx0XHRcdGRpc3BhdGNoOiB0aGlzLnByb3BzLmRpc3BhdGNoXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlbmRlcigpe1xuXHRcdFx0bGV0IHtnb2FsLCBzY29yZSwgZWRpdGluZywgdG9kb1dlZWt9PXRoaXMucHJvcHNcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0KHdlZWs9Pntcblx0XHRcdFx0XHRcdFx0aWYoIWdvYWwpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiA8U2NvcmVQYWQvPlxuXHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRsZXQgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla1xuXHRcdFx0XHRcdFx0XHRcdGlmKGlzQ3VycmVudFdlZWspe1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIWFjY29tcGxpc2hlZCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtlZGl0aW5nID8gPFRhc2tQYWRFZGl0b3IvPiA6IDxUYXNrUGFkIGN1cnJlbnQ9e25ldyBEYXRlKCkuZ2V0RGF5KCl9Lz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChBcHBCYXIse1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0Oihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVQoKSl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTpg5L+d5a2Y5YmNJHtuZXcgRGF0ZSh3ZWVrKS5yZWxhdGl2ZShuZXcgRGF0ZSh0b2RvV2VlaykpLzd95ZGo5a6M5oiQ5oOF5Ya1YFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRhc2tQYWQgY3VycmVudD17OTl9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KShUYXNrLmdldFdlZWtTdGFydCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcmVkdWNlcj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYCR7RE9NQUlOfS9lZGl0YDpcblx0XHRcdHJldHVybiB7Li4uc3RhdGUsW2RvbWFpbl06cGF5bG9hZH1cblx0XHRicmVha1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxuXG5cdGxldCBUaW1lTWFuYWdlcj1jb25uZWN0KHN0YXRlPT57XG5cdFx0XHRsZXQgdGFyZ2V0PWdldEN1cnJlbnRDaGlsZFRhcmdldChzdGF0ZSxkb21haW4pXG5cdFx0XHRjb25zdCB7dG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKSwgZ29hbD0wLCBzY29yZT0wfT10YXJnZXRcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVkaXRpbmc6c3RhdGUudWkudGltZVtkb21haW5dLFxuXHRcdFx0XHR0b2RvV2Vlayxcblx0XHRcdFx0Z29hbDogZG9tYWluPT1cImJhYnlcIiA/IGdvYWwgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcblx0XHRcdFx0c2NvcmVcblx0XHRcdH1cblx0XHR9KShUaW1lTWFuYWdlKVxuXG5cdFRpbWVNYW5hZ2VyLnJlZHVjZXI9cmVkdWNlclxuXHRUaW1lTWFuYWdlci5TY29yZVBhZD1TY29yZVBhZFxuXHRUaW1lTWFuYWdlci5BQ1RJT049QUNUSU9OXG5cdHJldHVybiBUaW1lTWFuYWdlclxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVcbiJdfQ==