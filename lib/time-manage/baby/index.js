"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.reducer = exports.ACTION = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _selector = require("../../selector");

var _db = require("../../db");

var _appBar = require("../../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _taskPad = require("./task-pad");

var _taskPadEditor = require("./task-pad-editor");

var _todoEditor = require("./todo-editor");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _scorePad = require("./score-pad");

var _scorePad2 = _interopRequireDefault(_scorePad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var DOMAIN = "time";

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
	    goal = _ref3.goal,
	    score = _ref3.score,
	    editing = _ref3.editing,
	    todoWeek = _ref3.todoWeek;
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
							_react2.default.createElement(_todoEditor.TodoEditor, { editing: editing }),
							editing ? _react2.default.createElement(_taskPadEditor.TaskPadEditor, null) : _react2.default.createElement(_taskPad.TaskPad, { current: new Date().getDay() })
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
						_react2.default.createElement(_taskPad.TaskPad, { current: 99 })
					);
				}
			}
		}(new Date().getWeek())
	);
};

exports.default = Object.assign(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9iYWJ5L2luZGV4LmpzIl0sIm5hbWVzIjpbIkRPTUFJTiIsImNoYW5nZVRvZG9zIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvV2VlayIsInVuZGVmaW5lZCIsIkRhdGUiLCJnZXRXZWVrIiwidG9kb3MiLCJoYW5kbGVkIiwiZiIsInRoZW4iLCJQcm9taXNlIiwicmVzb2x2ZSIsInVwc2VydCIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkFDVElPTiIsIkFERCIsInRvZG8iLCJwdXNoIiwiZmluZCIsImEiLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJFRElUSU5HIiwic3RhdHVzIiwidHlwZSIsInBheWxvYWQiLCJVUCIsInRhcmdldCIsImxlbmd0aCIsIkRPV04iLCJUT1AiLCJ1bnNoaWZ0IiwiQk9UVE9NIiwiVE9HR0xFX1ZJU0lCTEUiLCJoaWRkZW4iLCJSRVNFVCIsImZpbHRlciIsImZpbmlzaFdlZWtUYXNrcyIsImZvckVhY2giLCJyZWR1Y2VyIiwiZWRpdGluZyIsIlRpbWVNYW5hZ2UiLCJnb2FsIiwiaXNDdXJyZW50V2VlayIsIndlZWsiLCJhY2NvbXBsaXNoZWQiLCJnZXREYXkiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7OztBQUVBLElBQU1BLFNBQU8sTUFBYjs7QUFFQSxJQUFNQyxjQUFZLFNBQVpBLFdBQVk7QUFBQSxRQUFHLFVBQUNDLFFBQUQsRUFBVUMsUUFBVixFQUFxQjtBQUN6QyxNQUFNQyxR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QWFBO0FBQ0Q7QUFDRCxHQWpDRCxDQWlDRyxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsRUFqQ0g7QUFGQyxFQURvQjtBQUFBLENBQWpCOztrQkF5Q1F1RCxPQUFPQyxNQUFQLENBQWNQLFVBQWQsRUFBeUIsRUFBQ0YsZ0JBQUQsRUFBekIsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVN9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vLi4vc2VsZWN0b3JcIlxuXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi4vLi4vZGJcIlxuXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL2FwcC1iYXJcIlxuaW1wb3J0IHtUYXNrUGFkfSBmcm9tIFwiLi90YXNrLXBhZFwiXG5pbXBvcnQge1Rhc2tQYWRFZGl0b3J9IGZyb20gXCIuL3Rhc2stcGFkLWVkaXRvclwiXG5pbXBvcnQge1RvZG9FZGl0b3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcblxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IFNjb3JlUGFkIGZyb20gXCIuL3Njb3JlLXBhZFwiXG5cbmNvbnN0IERPTUFJTj1cInRpbWVcIlxuXG5jb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRpZihjaGlsZC50b2RvV2Vlaz09dW5kZWZpbmVkKVxuXHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cblx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblxuXHRsZXQgaGFuZGxlZD1mKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10sIGNoaWxkKVxuXHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQuc2NvcmU9Y2hpbGQuc2NvcmUrMVxuXHRcdGNoaWxkLnRvdGFsU2NvcmU9KGNoaWxkLnRvdGFsU2NvcmV8fDApKzFcblx0fSlcblx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXG5cdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdH0pXG5cdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdH0pXG5cdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdH0pXG5cdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMpLnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e2VkaXRpbmc6MH0se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgJHtET01BSU59L2VkaXRgOlxuXHRcdHJldHVybiB7ZWRpdGluZzpwYXlsb2FkfVxuXHRicmVha1xuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe2Rpc3BhdGNoLCBnb2FsLCBzY29yZSwgZWRpdGluZywgdG9kb1dlZWt9KT0+KFxuICAgIDxkaXY+XG5cdFx0e1xuXHRcdFx0KHdlZWs9Pntcblx0XHRcdFx0aWYoIWdvYWwpe1xuXHRcdFx0XHRcdHJldHVybiA8U2NvcmVQYWQvPlxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRsZXQgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla1xuXHRcdFx0XHRcdGlmKGlzQ3VycmVudFdlZWspe1xuXHRcdFx0XHRcdFx0bGV0IGFjY29tcGxpc2hlZD1nb2FsPD1zY29yZVxuXHRcdFx0XHRcdFx0aWYoIWFjY29tcGxpc2hlZCl7XG5cdFx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz5cblx0XHRcdFx0XHRcdFx0XHRcdHtlZGl0aW5nID8gPFRhc2tQYWRFZGl0b3IvPiA6IDxUYXNrUGFkIGN1cnJlbnQ9e25ldyBEYXRlKCkuZ2V0RGF5KCl9Lz59XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gPFNjb3JlUGFkLz5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0PEFwcEJhclxuXHRcdFx0XHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdDxUYXNrUGFkIGN1cnJlbnQ9ezk5fS8+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSkobmV3IERhdGUoKS5nZXRXZWVrKCkpXG5cdFx0fVxuICAgIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRpbWVNYW5hZ2Use3JlZHVjZXJ9KVxuIl19