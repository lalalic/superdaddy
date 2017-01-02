"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.ACTION = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _db = require("../../db");

var _appBar = require("../../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _taskPad = require("./task-pad");

var _taskPad2 = _interopRequireDefault(_taskPad);

var _taskPadEditor = require("./task-pad-editor");

var _taskPadEditor2 = _interopRequireDefault(_taskPadEditor);

var _todoEditor = require("./todo-editor");

var _todoEditor2 = _interopRequireDefault(_todoEditor);

var _scorePad = require("./score-pad");

var _scorePad2 = _interopRequireDefault(_scorePad);

var _selector = require("../../selector");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DOMAIN = "baby";

var changeTodos = function changeTodos(f) {
	return function (dispatch, getState) {
		var state = getState();
		var child = (0, _selector.getCurrentChild)(state);
		if (child.todoWeek == undefined) child.todoWeek = new Date().getWeek();

		var _child$todos = child.todos,
		    todos = _child$todos === undefined ? [] : _child$todos;


		var handled = f(child.todos = [].concat(_toConsumableArray(todos)), child);
		if (!(handled && handled.then)) handled = Promise.resolve();
		return handled.then(function (a) {
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		});
	};
};
var ACTION = exports.ACTION = {
	SET_GOAL: function SET_GOAL(goal, todo) {
		return function (dispatch, getState) {
			var child = (0, _selector.getCurrentChild)(getState());
			child.score = Math.max((child.score || 0) - (child.goal || 0), 0);
			child.goal = goal;
			child.todo = todo;
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

var TimeManage = exports.TimeManage = function TimeManage(_ref2) {
	var dispatch = _ref2.dispatch,
	    goal = _ref2.goal,
	    score = _ref2.score,
	    editing = _ref2.editing,
	    todoWeek = _ref2.todoWeek;
	return _react2.default.createElement(
		"div",
		null,
		function (week) {
			if (!goal) {
				return _react2.default.createElement(_scorePad2.default, null);
			} else {
				var isCurrentWeek = todoWeek == week;
				if (isCurrentWeek) {
					var accomplished = goal <= score;
					if (!accomplished) {
						return _react2.default.createElement(
							"div",
							null,
							_react2.default.createElement(_todoEditor2.default, { editing: editing }),
							editing ? _react2.default.createElement(_taskPadEditor2.default, null) : _react2.default.createElement(_taskPad2.default, { current: new Date().getDay() })
						);
					} else {
						return _react2.default.createElement(_scorePad2.default, null);
					}
				} else {
					return _react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(_appBar2.default, {
							iconElementRight: _react2.default.createElement(
								_materialUi.IconButton,
								{ onClick: function onClick(e) {
										return dispatch(ACTION.RESET());
									} },
								_react2.default.createElement(_cloudDone2.default, { color: "white" })
							),
							title: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
						}),
						_react2.default.createElement(_taskPad2.default, { current: 99 })
					);
				}
			}
		}(new Date().getWeek())
	);
};

exports.default = (0, _reactRedux.connect)(function (state) {
	var child = (0, _selector.getCurrentChild)(state);
	var _child$todoWeek = child.todoWeek,
	    todoWeek = _child$todoWeek === undefined ? new Date().getWeek() : _child$todoWeek,
	    _child$goal = child.goal,
	    goal = _child$goal === undefined ? 0 : _child$goal,
	    _child$score = child.score,
	    score = _child$score === undefined ? 0 : _child$score;

	return _extends({}, state.ui.time, {
		todoWeek: todoWeek,
		goal: goal,
		score: score
	});
})(TimeManage);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L2luZGV4LmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvV2VlayIsInVuZGVmaW5lZCIsIkRhdGUiLCJnZXRXZWVrIiwidG9kb3MiLCJoYW5kbGVkIiwiZiIsInRoZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInVwc2VydCIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkFDVElPTiIsIlNFVF9HT0FMIiwiZ29hbCIsInRvZG8iLCJzY29yZSIsIk1hdGgiLCJtYXgiLCJBREQiLCJwdXNoIiwiZmluZCIsImEiLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJ0b3RhbFNjb3JlIiwiRURJVElORyIsInN0YXR1cyIsInR5cGUiLCJwYXlsb2FkIiwiVVAiLCJ0YXJnZXQiLCJsZW5ndGgiLCJET1dOIiwiVE9QIiwidW5zaGlmdCIsIkJPVFRPTSIsIlRPR0dMRV9WSVNJQkxFIiwiaGlkZGVuIiwiUkVTRVQiLCJmaWx0ZXIiLCJmaW5pc2hXZWVrVGFza3MiLCJmb3JFYWNoIiwiVGltZU1hbmFnZSIsImVkaXRpbmciLCJpc0N1cnJlbnRXZWVrIiwid2VlayIsImFjY29tcGxpc2hlZCIsImdldERheSIsInVpIiwidGltZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7QUFHQSxJQUFNQSxTQUFPLE1BQWI7O0FBRUEsSUFBTUMsY0FBWSxTQUFaQSxXQUFZO0FBQUEsUUFBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFB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LEtBWkQsTUFZSztBQUNKLFlBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFDQyx5QkFDQztBQUFBO0FBQUEsVUFBWSxTQUFTO0FBQUEsaUJBQUcvRCxTQUFTa0IsT0FBT29DLEtBQVAsRUFBVCxDQUFIO0FBQUEsVUFBckI7QUFDQyw2REFBVSxPQUFNLE9BQWhCO0FBREQsUUFGRjtBQU1DLHNDQUFhTyxPQUFLekQsUUFBbEI7QUFORCxRQUREO0FBU0MseURBQVMsU0FBUyxFQUFsQjtBQVRELE1BREQ7QUFhQTtBQUNEO0FBQ0QsR0FqQ0QsQ0FpQ0csSUFBSUUsSUFBSixHQUFXQyxPQUFYLEVBakNIO0FBRkMsRUFEb0I7QUFBQSxDQUFqQjs7a0JBeUNRLHlCQUFRLGlCQUFPO0FBQzVCLEtBQUlKLFFBQU0sK0JBQWdCRCxLQUFoQixDQUFWO0FBRDRCLHVCQUUyQkMsS0FGM0IsQ0FFckJDLFFBRnFCO0FBQUEsS0FFckJBLFFBRnFCLG1DQUVaLElBQUlFLElBQUosR0FBV0MsT0FBWCxFQUZZO0FBQUEsbUJBRTJCSixLQUYzQixDQUVVaUIsSUFGVjtBQUFBLEtBRVVBLElBRlYsK0JBRWUsQ0FGZjtBQUFBLG9CQUUyQmpCLEtBRjNCLENBRWtCbUIsS0FGbEI7QUFBQSxLQUVrQkEsS0FGbEIsZ0NBRXdCLENBRnhCOztBQUc1QixxQkFDSXBCLE1BQU04RCxFQUFOLENBQVNDLElBRGI7QUFFQzdELG9CQUZEO0FBR0NnQixZQUhEO0FBSUNFO0FBSkQ7QUFNQSxDQVRhLEVBU1hvQyxVQVRXLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2NvbXBhY3QsIEVOVElUSUVTfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi4vLi4vZGJcIlxuXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2FwcC1iYXJcIlxuaW1wb3J0IFRhc2tQYWQgZnJvbSBcIi4vdGFzay1wYWRcIlxuaW1wb3J0IFRhc2tQYWRFZGl0b3IgZnJvbSBcIi4vdGFzay1wYWQtZWRpdG9yXCJcbmltcG9ydCBUb2RvRWRpdG9yIGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcbmltcG9ydCBTY29yZVBhZCBmcm9tIFwiLi9zY29yZS1wYWRcIlxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uLy4uL3NlbGVjdG9yXCJcblxuXG5jb25zdCBET01BSU49XCJiYWJ5XCJcblxuY29uc3QgY2hhbmdlVG9kb3M9Zj0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0aWYoY2hpbGQudG9kb1dlZWs9PXVuZGVmaW5lZClcblx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXG5cdGxldCB7dG9kb3M9W119PWNoaWxkXG5cblx0bGV0IGhhbmRsZWQ9ZihjaGlsZC50b2Rvcz1bLi4udG9kb3NdLCBjaGlsZClcblx0aWYoIShoYW5kbGVkICYmIGhhbmRsZWQudGhlbikpXG5cdFx0aGFuZGxlZD1Qcm9taXNlLnJlc29sdmUoKVxuXHRyZXR1cm4gaGFuZGxlZC50aGVuKGE9PkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpKVxufVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdFNFVF9HT0FMOiAoZ29hbCwgdG9kbyk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoZ2V0U3RhdGUoKSlcblx0XHRjaGlsZC5zY29yZT1NYXRoLm1heCgoY2hpbGQuc2NvcmV8fDApLShjaGlsZC5nb2FsfHwwKSwwKVxuXHRcdGNoaWxkLmdvYWw9Z29hbFxuXHRcdGNoaWxkLnRvZG89dG9kb1xuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fSxcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQuc2NvcmU9Y2hpbGQuc2NvcmUrMVxuXHRcdGNoaWxkLnRvdGFsU2NvcmU9KGNoaWxkLnRvdGFsU2NvcmV8fDApKzFcblx0fSlcblx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXG5cdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdH0pXG5cdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdH0pXG5cdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdH0pXG5cdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMpLnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe2Rpc3BhdGNoLCBnb2FsLCBzY29yZSwgZWRpdGluZywgdG9kb1dlZWt9KT0+KFxuICAgIDxkaXY+XG5cdFx0e1xuXHRcdFx0KHdlZWs9Pntcblx0XHRcdFx0aWYoIWdvYWwpe1xuXHRcdFx0XHRcdHJldHVybiA8U2NvcmVQYWQvPlxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRsZXQgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla1xuXHRcdFx0XHRcdGlmKGlzQ3VycmVudFdlZWspe1xuXHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxuXHRcdFx0XHRcdFx0aWYoIWFjY29tcGxpc2hlZCl7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdHtlZGl0aW5nID8gPFRhc2tQYWRFZGl0b3IvPiA6IDxUYXNrUGFkIGN1cnJlbnQ9e25ldyBEYXRlKCkuZ2V0RGF5KCl9Lz59XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDxUYXNrUGFkIGN1cnJlbnQ9ezk5fS8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkobmV3IERhdGUoKS5nZXRXZWVrKCkpXG5cdFx0fVxuICAgIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlPT57XG5cdFx0bGV0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRjb25zdCB7dG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKCksIGdvYWw9MCwgc2NvcmU9MH09Y2hpbGRcblx0XHRyZXR1cm4ge1xuXHRcdFx0Li4uc3RhdGUudWkudGltZSxcblx0XHRcdHRvZG9XZWVrLFxuXHRcdFx0Z29hbCxcblx0XHRcdHNjb3JlXG5cdFx0fVxuXHR9KShUaW1lTWFuYWdlKVxuIl19