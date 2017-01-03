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
			if (target.todoWeek == undefined) target.todoWeek = new Date().getWeek();

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
		SET_GOAL: function SET_GOAL(goal, todo) {
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
			return changeTodos(function (todos, child) {
				var task = todos.find(function (a) {
					return a.content == todo;
				});
				var _task$dones = task.dones,
				    dones = _task$dones === undefined ? [] : _task$dones;

				dones.push(day);
				task.dones = dones;
				child.score = child.score + 1;
				child.totalScore = (child.totalScore || 0) + 1;
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
							target.todoWeek = new Date().getWeek();
						});
					} else target.todoWeek = new Date().getWeek();
				})(dispatch, getState);
			};
		}
	};

	var ScorePad = (0, _reactRedux.connect)(function (state) {
		return _extends({}, (0, _qiliApp.compact)((0, _selector.getCurrentChildTarget)(state, domain), "score", "goal", "todo"), { AppBar: AppBar });
	})(_scorePad.ScorePad);
	var TodoEditor = (0, _reactRedux.connect)()(_todoEditor.TodoEditor);
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
										title: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
									}),
									_react2.default.createElement(TaskPad, { current: 99 })
								);
							}
						}
					}(new Date().getWeek())
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
		    todoWeek = _target$todoWeek === undefined ? new Date().getWeek() : _target$todoWeek,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9jb3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbImNyZWF0ZSIsIkFwcEJhciIsImRvbWFpbiIsIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0YXJnZXRzIiwidGFyZ2V0IiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJEYXRlIiwiZ2V0V2VlayIsInRvZG9zIiwiaGFuZGxlZCIsImYiLCJ0aGVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJ1cHNlcnQiLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBQ1RJT04iLCJTRVRfR09BTCIsImdvYWwiLCJ0b2RvIiwic2NvcmUiLCJNYXRoIiwibWF4IiwiQUREIiwicHVzaCIsImZpbmQiLCJhIiwiY29udGVudCIsIlJFTU9WRSIsImkiLCJmaW5kSW5kZXgiLCJfaWQiLCJzcGxpY2UiLCJSRU1PVkVfQllfSU5ERVgiLCJET05FIiwiZGF5IiwidGFzayIsImRvbmVzIiwidG90YWxTY29yZSIsIkVESVRJTkciLCJzdGF0dXMiLCJ0eXBlIiwicGF5bG9hZCIsIlVQIiwibGVuZ3RoIiwiRE9XTiIsIlRPUCIsInVuc2hpZnQiLCJCT1RUT00iLCJUT0dHTEVfVklTSUJMRSIsImhpZGRlbiIsIlJFU0VUIiwiZmlsdGVyIiwiZmluaXNoV2Vla1Rhc2tzIiwiZm9yRWFjaCIsIlNjb3JlUGFkIiwiVG9kb0VkaXRvciIsIlRhc2tQYWQiLCJUYXNrUGFkRWRpdG9yIiwiVGltZU1hbmFnZSIsInByb3BzIiwiZWRpdGluZyIsImlzQ3VycmVudFdlZWsiLCJ3ZWVrIiwiYWNjb21wbGlzaGVkIiwiZ2V0RGF5IiwiY3JlYXRlRWxlbWVudCIsImljb25FbGVtZW50UmlnaHQiLCJ0aXRsZSIsImNoaWxkQ29udGV4dFR5cGVzIiwiZWxlbWVudCIsIm9iamVjdCIsImZ1bmMiLCJyZWR1Y2VyIiwiVGltZU1hbmFnZXIiLCJ1aSIsInRp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S0FBMEIsdUVBQXBCLEVBQW9CO0FBQUE7QUFBQSxNQUFoQjJDLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLE1BQVhDLE9BQVcsU0FBWEEsT0FBVzs7QUFDeEMsVUFBT0QsSUFBUDtBQUNBLFFBQVEvQyxNQUFSO0FBQ0Msd0JBQVdJLEtBQVgsc0JBQWtCTCxNQUFsQixFQUEwQmlELE9BQTFCO0FBQ0Q7QUFIQTtBQUtBLFNBQU81QyxLQUFQO0FBQ0EsRUFQRDs7QUFTQSxLQUFJNEUsY0FBWSx5QkFBUSxpQkFBTztBQUM3QixNQUFJekUsU0FBTyxxQ0FBc0JILEtBQXRCLEVBQTRCTCxNQUE1QixDQUFYO0FBRDZCLHlCQUUwQlEsTUFGMUIsQ0FFdEJDLFFBRnNCO0FBQUEsTUFFdEJBLFFBRnNCLG9DQUViLElBQUlFLElBQUosR0FBV0MsT0FBWCxFQUZhO0FBQUEscUJBRTBCSixNQUYxQixDQUVTaUIsSUFGVDtBQUFBLE1BRVNBLElBRlQsZ0NBRWMsQ0FGZDtBQUFBLHNCQUUwQmpCLE1BRjFCLENBRWlCbUIsS0FGakI7QUFBQSxNQUVpQkEsS0FGakIsaUNBRXVCLENBRnZCOztBQUc3QixTQUFPO0FBQ055QyxZQUFRL0QsTUFBTTZFLEVBQU4sQ0FBU0MsSUFBVCxDQUFjbkYsTUFBZCxDQURGO0FBRU5TLHFCQUZNO0FBR05nQixTQUFNekIsVUFBUSxNQUFSLEdBQWlCeUIsSUFBakIsR0FBd0IyRCxPQUFPQyxnQkFIL0I7QUFJTjFEO0FBSk0sR0FBUDtBQU1BLEVBVGMsRUFTWnVDLFVBVFksQ0FBaEI7O0FBV0FlLGFBQVlELE9BQVosR0FBb0JBLE9BQXBCO0FBQ0FDLGFBQVluQixRQUFaLEdBQXFCQSxRQUFyQjtBQUNBLFFBQU9tQixXQUFQO0FBQ0E7O2tCQUVjbkYsTSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcclxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxyXG5cclxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcclxuXHJcbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuLi8uLi9kYlwiXHJcblxyXG5pbXBvcnQge1Rhc2tQYWQgYXMgX1Rhc2tQYWR9IGZyb20gXCIuL3Rhc2stcGFkXCJcclxuaW1wb3J0IHtUYXNrUGFkRWRpdG9yIGFzIF9UYXNrUGFkRWRpdG9yfSBmcm9tIFwiLi90YXNrLXBhZC1lZGl0b3JcIlxyXG5pbXBvcnQge1RvZG9FZGl0b3IgYXMgX1RvZG9FZHRpb3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcclxuaW1wb3J0IHtTY29yZVBhZCBhcyBfU2NvcmVQYWR9IGZyb20gXCIuL3Njb3JlLXBhZFwiXHJcblxyXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZCwgZ2V0Q3VycmVudENoaWxkVGFyZ2V0LCBnZXRDdXJyZW50Q2hpbGRUYXNrc30gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKEFwcEJhciwgZG9tYWluKXtcclxuXHRjb25zdCBET01BSU49ZG9tYWluXHJcblxyXG5cdGNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9PntcclxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcclxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcclxuXHRcdGlmKCFjaGlsZC50YXJnZXRzKVxyXG5cdFx0XHRjaGlsZC50YXJnZXRzPXt9XHJcblx0XHRjb25zdCB0YXJnZXQ9Y2hpbGQudGFyZ2V0c1tkb21haW5dfHx7fVxyXG5cdFx0aWYodGFyZ2V0LnRvZG9XZWVrPT11bmRlZmluZWQpXHJcblx0XHRcdHRhcmdldC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxyXG5cclxuXHRcdGxldCB7dG9kb3M9W119PXRhcmdldFxyXG5cclxuXHRcdGxldCBoYW5kbGVkPWYodGFyZ2V0LnRvZG9zPVsuLi50b2Rvc10sIHRhcmdldCwgY2hpbGQpXHJcblx0XHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcclxuXHRcdFx0aGFuZGxlZD1Qcm9taXNlLnJlc29sdmUoKVxyXG5cdFx0Y2hpbGQudGFyZ2V0c1tkb21haW5dPXRhcmdldFxyXG5cdFx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXHJcblx0fVxyXG5cdGNvbnN0IEFDVElPTj17XHJcblx0XHRTRVRfR09BTDogKGdvYWwsIHRvZG8pPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XHJcblx0XHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChnZXRTdGF0ZSgpKVxyXG5cdFx0XHRpZighY2hpbGQudGFyZ2V0cylcclxuXHRcdFx0XHRjaGlsZC50YXJnZXRzPXt9XHJcblx0XHRcdGNvbnN0IHRhcmdldD1jaGlsZC50YXJnZXRzW2RvbWFpbl18fHt9XHJcblx0XHRcdHRhcmdldC5zY29yZT1NYXRoLm1heCgodGFyZ2V0LnNjb3JlfHwwKS0odGFyZ2V0LmdvYWx8fDApLDApXHJcblx0XHRcdHRhcmdldC5nb2FsPWdvYWxcclxuXHRcdFx0dGFyZ2V0LnRvZG89dG9kb1xyXG5cdFx0XHRjaGlsZC50YXJnZXRzW2RvbWFpbl09dGFyZ2V0XHJcblx0XHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxyXG5cdFx0XHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpXHJcblx0XHR9LFxyXG5cdFx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xyXG5cdFx0XHRpZighdG9kbylcclxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuXHRcdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XHJcblx0XHRcdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XHJcblx0XHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxyXG5cdFx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcclxuXHRcdFx0XHRcdFx0dG9kb3MucHVzaCh7Y29udGVudDp0b2RvfSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxyXG5cdFx0fVxyXG5cdFx0LFJFTU9WRTogdG9kbz0+Y2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xyXG5cdFx0XHRcdD8gdG9kb3MuZmluZEluZGV4KGE9PmEuX2lkPXRvZG8uX2lkKVxyXG5cdFx0XHRcdDogdG9kb3MuZmluZEluZGV4KGE9PmEuY29udGVudD10b2RvKTtcclxuXHJcblx0XHRcdGlmKGkhPS0xKVxyXG5cdFx0XHRcdHRvZG9zLnNwbGljZShpLDEpXHJcblx0XHR9KVxyXG5cdFx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxyXG5cdFx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9PntcclxuXHRcdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcclxuXHRcdFx0bGV0IHtkb25lcz1bXX09dGFza1xyXG5cdFx0XHRkb25lcy5wdXNoKGRheSlcclxuXHRcdFx0dGFzay5kb25lcz1kb25lc1xyXG5cdFx0XHRjaGlsZC5zY29yZT1jaGlsZC5zY29yZSsxXHJcblx0XHRcdGNoaWxkLnRvdGFsU2NvcmU9KGNoaWxkLnRvdGFsU2NvcmV8fDApKzFcclxuXHRcdH0pXHJcblx0XHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcclxuXHRcdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxyXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxyXG5cdFx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcclxuXHRcdH0pXHJcblx0XHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PntcclxuXHRcdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxyXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxyXG5cdFx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcclxuXHRcdH0pXHJcblx0XHQsVE9QOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xyXG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXHJcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXHJcblx0XHRcdHRvZG9zLnVuc2hpZnQodGFyZ2V0KVxyXG5cdFx0fSlcclxuXHRcdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XHJcblx0XHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cclxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcclxuXHRcdFx0dG9kb3MucHVzaCh0YXJnZXQpXHJcblx0XHR9KVxyXG5cdFx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xyXG5cdFx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXHJcblx0XHRcdHRhcmdldC5oaWRkZW49ISEhdGFyZ2V0LmhpZGRlblxyXG5cdFx0fSlcclxuXHRcdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xyXG5cdFx0XHRyZXR1cm4gY2hhbmdlVG9kb3MoKHRvZG9zLHRhcmdldCxjaGlsZCk9PntcclxuXHRcdFx0XHQvL3NhdmUgaGlzdG9yeVxyXG5cdFx0XHRcdGxldCBkb25lcz10b2Rvcy5maWx0ZXIoKHtkb25lcz1bXX0pPT5kb25lcy5sZW5ndGgpXHJcblx0XHRcdFx0aWYoZG9uZXMubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMsIGRvbWFpbikudGhlbihhPT57XHJcblx0XHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcclxuXHRcdFx0XHRcdFx0dGFyZ2V0LnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHR0YXJnZXQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcclxuXHRcdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT4oey4uLmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkVGFyZ2V0KHN0YXRlLGRvbWFpbiksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSxBcHBCYXJ9KSkoX1Njb3JlUGFkKVxyXG5cdGNvbnN0IFRvZG9FZGl0b3I9Y29ubmVjdCgpKF9Ub2RvRWR0aW9yKVxyXG5cdGNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxkb21haW4pLmZpbHRlcihhPT4hYS5oaWRkZW4pfSkpKF9UYXNrUGFkKVxyXG5cdGNvbnN0IFRhc2tQYWRFZGl0b3I9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSxkb21haW4pfSkpKF9UYXNrUGFkRWRpdG9yKVxyXG5cdFxyXG5cdGNsYXNzIFRpbWVNYW5hZ2UgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0XHRzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXM9e1xyXG5cdFx0XHRBcHBCYXI6IFByb3BUeXBlcy5lbGVtZW50LFxyXG5cdFx0XHRBQ1RJT046IFByb3BUeXBlcy5vYmplY3QsXHJcblx0XHRcdGRpc3BhdGNoOiBQcm9wVHlwZXMuZnVuY1xyXG5cdFx0fVxyXG5cdFx0Z2V0Q2hpbGRDb250ZXh0KCl7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0QXBwQmFyOiAoPEFwcEJhci8+KSxcclxuXHRcdFx0XHRBQ1RJT04sXHJcblx0XHRcdFx0ZGlzcGF0Y2g6IHRoaXMucHJvcHMuZGlzcGF0Y2hcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmVuZGVyKCl7XHJcblx0XHRcdGxldCB7Z29hbCwgc2NvcmUsIGVkaXRpbmcsIHRvZG9XZWVrfT10aGlzLnByb3BzXHJcblx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0KHdlZWs9PntcclxuXHRcdFx0XHRcdFx0XHRpZighZ29hbCl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cclxuXHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrXHJcblx0XHRcdFx0XHRcdFx0XHRpZihpc0N1cnJlbnRXZWVrKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZighYWNjb21wbGlzaGVkKXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7ZWRpdGluZyA/IDxUYXNrUGFkRWRpdG9yLz4gOiA8VGFza1BhZCBjdXJyZW50PXtuZXcgRGF0ZSgpLmdldERheSgpfS8+fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChBcHBCYXIse1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ6KFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aXRsZTpg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWBcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cdFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PFRhc2tQYWQgY3VycmVudD17OTl9Lz5cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSkobmV3IERhdGUoKS5nZXRXZWVrKCkpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0Y29uc3QgcmVkdWNlcj0oc3RhdGU9e30se3R5cGUscGF5bG9hZH0pPT57XHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XHJcblx0XHRcdHJldHVybiB7Li4uc3RhdGUsW2RvbWFpbl06cGF5bG9hZH1cclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RhdGVcclxuXHR9XHJcblxyXG5cdGxldCBUaW1lTWFuYWdlcj1jb25uZWN0KHN0YXRlPT57XHJcblx0XHRcdGxldCB0YXJnZXQ9Z2V0Q3VycmVudENoaWxkVGFyZ2V0KHN0YXRlLGRvbWFpbilcclxuXHRcdFx0Y29uc3Qge3RvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBnb2FsPTAsIHNjb3JlPTB9PXRhcmdldFxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdGVkaXRpbmc6c3RhdGUudWkudGltZVtkb21haW5dLFxyXG5cdFx0XHRcdHRvZG9XZWVrLFxyXG5cdFx0XHRcdGdvYWw6IGRvbWFpbj09XCJiYWJ5XCIgPyBnb2FsIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsXHJcblx0XHRcdFx0c2NvcmVcclxuXHRcdFx0fVxyXG5cdFx0fSkoVGltZU1hbmFnZSlcclxuXHRcclxuXHRUaW1lTWFuYWdlci5yZWR1Y2VyPXJlZHVjZXJcclxuXHRUaW1lTWFuYWdlci5TY29yZVBhZD1TY29yZVBhZFxyXG5cdHJldHVybiBUaW1lTWFuYWdlclxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVcclxuIl19