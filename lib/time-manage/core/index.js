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
				var i = (typeof todo === "undefined" ? "undefined" : _typeof(todo)) == 'object' ? todos.findIndex(function (a) {
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
	return TimeManager;
}

exports.default = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkFwcEJhciIsImRvbWFpbiIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0YXJnZXRzIiwidGFyZ2V0IiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJnZXRXZWVrU3RhcnQiLCJ0b2RvcyIsImhhbmRsZWQiLCJmIiwidGhlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwidXBzZXJ0IiwidXBkYXRlZCIsInNjaGVtYSIsImVudGl0aWVzIiwiQUNUSU9OIiwiU0VUX0dPQUwiLCJnb2FsIiwiZ2lmdCIsInNjb3JlIiwiTWF0aCIsIm1heCIsInRvZG8iLCJBREQiLCJwdXNoIiwiZmluZCIsImEiLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJ0b3RhbFNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiU2NvcmVQYWQiLCJUb2RvRWRpdG9yIiwiVGFza1BhZCIsIlRhc2tQYWRFZGl0b3IiLCJUaW1lTWFuYWdlIiwicHJvcHMiLCJlZGl0aW5nIiwiaXNDdXJyZW50V2VlayIsIndlZWsiLCJhY2NvbXBsaXNoZWQiLCJEYXRlIiwiZ2V0RGF5IiwiY3JlYXRlRWxlbWVudCIsImljb25FbGVtZW50UmlnaHQiLCJ0aXRsZSIsInJlbGF0aXZlIiwiY2hpbGRDb250ZXh0VHlwZXMiLCJlbGVtZW50Iiwib2JqZWN0IiwiZnVuYyIsInJlZHVjZXIi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QyxVQUFRLFNBQVJBLE9BQVEsR0FBMkI7QUFBQSxNQUExQjdFLEtBQTBCLHVFQUFwQixFQUFvQjtBQUFBO0FBQUEsTUFBaEIyQyxJQUFnQixTQUFoQkEsSUFBZ0I7QUFBQSxNQUFYQyxPQUFXLFNBQVhBLE9BQVc7O0FBQ3hDLFVBQU9ELElBQVA7QUFDQSxRQUFRL0MsTUFBUjtBQUNDLHdCQUFXSSxLQUFYLHNCQUFrQkwsTUFBbEIsRUFBMEJpRCxPQUExQjtBQUNEO0FBSEE7QUFLQSxTQUFPNUMsS0FBUDtBQUNBLEVBUEQ7O0FBU0EsS0FBSThFLGNBQVkseUJBQVEsaUJBQU87QUFDN0IsTUFBSTNFLFNBQU8scUNBQXNCSCxLQUF0QixFQUE0QkwsTUFBNUIsQ0FBWDtBQUQ2Qix5QkFFeUJRLE1BRnpCLENBRXRCQyxRQUZzQjtBQUFBLE1BRXRCQSxRQUZzQixvQ0FFYixTQUFLRSxZQUFMLEVBRmE7QUFBQSxxQkFFeUJILE1BRnpCLENBRVFnQixJQUZSO0FBQUEsTUFFUUEsSUFGUixnQ0FFYSxDQUZiO0FBQUEsc0JBRXlCaEIsTUFGekIsQ0FFZ0JrQixLQUZoQjtBQUFBLE1BRWdCQSxLQUZoQixpQ0FFc0IsQ0FGdEI7O0FBRzdCLFNBQU87QUFDTjBDLFlBQVEvRCxNQUFNK0UsRUFBTixDQUFTQyxJQUFULENBQWNyRixNQUFkLENBREY7QUFFTlMscUJBRk07QUFHTmUsU0FBTXhCLFVBQVEsTUFBUixHQUFpQndCLElBQWpCLEdBQXdCOEQsT0FBT0MsZ0JBSC9CO0FBSU43RDtBQUpNLEdBQVA7QUFNQSxFQVRjLEVBU1p3QyxVQVRZLENBQWhCOztBQVdBaUIsYUFBWUQsT0FBWixHQUFvQkEsT0FBcEI7QUFDQUMsYUFBWXJCLFFBQVosR0FBcUJBLFFBQXJCO0FBQ0EsUUFBT3FCLFdBQVA7QUFDQTs7a0JBRWNyRixNIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IHtGYW1pbHksVGFza30gZnJvbSBcIi4uLy4uL2RiXCJcblxuaW1wb3J0IHtUYXNrUGFkIGFzIF9UYXNrUGFkfSBmcm9tIFwiLi90YXNrLXBhZFwiXG5pbXBvcnQge1Rhc2tQYWRFZGl0b3IgYXMgX1Rhc2tQYWRFZGl0b3J9IGZyb20gXCIuL3Rhc2stcGFkLWVkaXRvclwiXG5pbXBvcnQge1RvZG9FZGl0b3IgYXMgX1RvZG9FZHRpb3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcbmltcG9ydCB7U2NvcmVQYWQgYXMgX1Njb3JlUGFkfSBmcm9tIFwiLi9zY29yZS1wYWRcIlxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFyZ2V0LCBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKEFwcEJhciwgZG9tYWluKXtcblx0Y29uc3QgRE9NQUlOPWRvbWFpblxuXG5cdGNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGlmKCFjaGlsZC50YXJnZXRzKVxuXHRcdFx0Y2hpbGQudGFyZ2V0cz17fVxuXHRcdGNvbnN0IHRhcmdldD1jaGlsZC50YXJnZXRzW2RvbWFpbl18fHt9XG5cdFx0aWYodGFyZ2V0LnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxuXG5cdFx0bGV0IHt0b2Rvcz1bXX09dGFyZ2V0XG5cblx0XHRsZXQgaGFuZGxlZD1mKHRhcmdldC50b2Rvcz1bLi4udG9kb3NdLCB0YXJnZXQsIGNoaWxkKVxuXHRcdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxuXHRcdFx0aGFuZGxlZD1Qcm9taXNlLnJlc29sdmUoKVxuXHRcdGNoaWxkLnRhcmdldHNbZG9tYWluXT10YXJnZXRcblx0XHRyZXR1cm4gaGFuZGxlZC50aGVuKGE9PkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG5cdH1cblx0Y29uc3QgQUNUSU9OPXtcblx0XHRTRVRfR09BTDogKGdvYWwsIGdpZnQpPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRcdGlmKCFjaGlsZC50YXJnZXRzKVxuXHRcdFx0XHRjaGlsZC50YXJnZXRzPXt9XG5cdFx0XHRjb25zdCB0YXJnZXQ9Y2hpbGQudGFyZ2V0c1tkb21haW5dfHx7fVxuXHRcdFx0dGFyZ2V0LnNjb3JlPU1hdGgubWF4KCh0YXJnZXQuc2NvcmV8fDApLSh0YXJnZXQuZ29hbHx8MCksMClcblx0XHRcdHRhcmdldC5nb2FsPWdvYWxcblx0XHRcdHRhcmdldC50b2RvPXRvZG9cblx0XHRcdGNoaWxkLnRhcmdldHNbZG9tYWluXT10YXJnZXRcblx0XHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCxGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKVxuXHRcdH0sXG5cdFx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdFx0aWYoIXRvZG8pXG5cdFx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHRcdH1cblx0XHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHRcdH1cblx0XHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLl9pZD10b2RvLl9pZClcblx0XHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xuXG5cdFx0XHRpZihpIT0tMSlcblx0XHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR9KVxuXHRcdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0XHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldCk9Pntcblx0XHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0XHRkb25lcy5wdXNoKGRheSlcblx0XHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRcdHRhcmdldC5zY29yZT10YXJnZXQuc2NvcmUrMVxuXHRcdFx0dGFyZ2V0LnRvdGFsU2NvcmU9KHRhcmdldC50b3RhbFNjb3JlfHwwKSsxXG5cdFx0fSlcblx0XHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0XHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdFx0fSlcblx0XHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0XHR9KVxuXHRcdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdFx0fSlcblx0XHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHRcdHRvZG9zLnB1c2godGFyZ2V0KVxuXHRcdH0pXG5cdFx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdFx0fSlcblx0XHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsdGFyZ2V0LGNoaWxkKT0+e1xuXHRcdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0XHRpZihkb25lcy5sZW5ndGgpe1xuXHRcdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMsIGRvbWFpbikudGhlbihhPT57XG5cdFx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXG5cdFx0XHRcdFx0XHR0YXJnZXQudG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNlXG5cdFx0XHRcdFx0dGFyZ2V0LnRvZG9XZWVrPVRhc2suZ2V0V2Vla1N0YXJ0KClcblx0XHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9Pih7Li4uY29tcGFjdChnZXRDdXJyZW50Q2hpbGRUYXJnZXQoc3RhdGUsZG9tYWluKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpLEFwcEJhcn0pKShfU2NvcmVQYWQpXG5cdGNvbnN0IFRvZG9FZGl0b3I9X1RvZG9FZHRpb3Jcblx0Y29uc3QgVGFza1BhZD1jb25uZWN0KHN0YXRlPT4oe3RvZG9zOmdldEN1cnJlbnRDaGlsZFRhc2tzKHN0YXRlLGRvbWFpbikuZmlsdGVyKGE9PiFhLmhpZGRlbil9KSkoX1Rhc2tQYWQpXG5cdGNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxkb21haW4pfSkpKF9UYXNrUGFkRWRpdG9yKVxuXG5cdGNsYXNzIFRpbWVNYW5hZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG5cdFx0c3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPXtcblx0XHRcdEFwcEJhcjogUHJvcFR5cGVzLmVsZW1lbnQsXG5cdFx0XHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXG5cdFx0XHRkaXNwYXRjaDogUHJvcFR5cGVzLmZ1bmNcblx0XHR9XG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRBcHBCYXI6ICg8QXBwQmFyLz4pLFxuXHRcdFx0XHRBQ1RJT04sXG5cdFx0XHRcdGRpc3BhdGNoOiB0aGlzLnByb3BzLmRpc3BhdGNoXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlbmRlcigpe1xuXHRcdFx0bGV0IHtnb2FsLCBzY29yZSwgZWRpdGluZywgdG9kb1dlZWt9PXRoaXMucHJvcHNcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0KHdlZWs9Pntcblx0XHRcdFx0XHRcdFx0aWYoIWdvYWwpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiA8U2NvcmVQYWQvPlxuXHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRsZXQgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla1xuXHRcdFx0XHRcdFx0XHRcdGlmKGlzQ3VycmVudFdlZWspe1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIWFjY29tcGxpc2hlZCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtlZGl0aW5nID8gPFRhc2tQYWRFZGl0b3IvPiA6IDxUYXNrUGFkIGN1cnJlbnQ9e25ldyBEYXRlKCkuZ2V0RGF5KCl9Lz59XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChBcHBCYXIse1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0Oihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVQoKSl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTpg5L+d5a2Y5YmNJHtuZXcgRGF0ZSh3ZWVrKS5yZWxhdGl2ZShuZXcgRGF0ZSh0b2RvV2VlaykpLzd95ZGo5a6M5oiQ5oOF5Ya1YFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRhc2tQYWQgY3VycmVudD17OTl9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KShUYXNrLmdldFdlZWtTdGFydCgpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcmVkdWNlcj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgYCR7RE9NQUlOfS9lZGl0YDpcblx0XHRcdHJldHVybiB7Li4uc3RhdGUsW2RvbWFpbl06cGF5bG9hZH1cblx0XHRicmVha1xuXHRcdH1cblx0XHRyZXR1cm4gc3RhdGVcblx0fVxuXG5cdGxldCBUaW1lTWFuYWdlcj1jb25uZWN0KHN0YXRlPT57XG5cdFx0XHRsZXQgdGFyZ2V0PWdldEN1cnJlbnRDaGlsZFRhcmdldChzdGF0ZSxkb21haW4pXG5cdFx0XHRjb25zdCB7dG9kb1dlZWs9VGFzay5nZXRXZWVrU3RhcnQoKSwgZ29hbD0wLCBzY29yZT0wfT10YXJnZXRcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGVkaXRpbmc6c3RhdGUudWkudGltZVtkb21haW5dLFxuXHRcdFx0XHR0b2RvV2Vlayxcblx0XHRcdFx0Z29hbDogZG9tYWluPT1cImJhYnlcIiA/IGdvYWwgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUixcblx0XHRcdFx0c2NvcmVcblx0XHRcdH1cblx0XHR9KShUaW1lTWFuYWdlKVxuXG5cdFRpbWVNYW5hZ2VyLnJlZHVjZXI9cmVkdWNlclxuXHRUaW1lTWFuYWdlci5TY29yZVBhZD1TY29yZVBhZFxuXHRyZXR1cm4gVGltZU1hbmFnZXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlXG4iXX0=