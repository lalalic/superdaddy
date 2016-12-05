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

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _selector = require("../selector");

var _db = require("../db");

var _appBar = require("../components/app-bar");

var _appBar2 = _interopRequireDefault(_appBar);

var _taskPad = require("./task-pad");

var _taskPadEditor = require("./task-pad-editor");

var _todoEditor = require("./todo-editor");

var _cloudDone = require("material-ui/svg-icons/file/cloud-done");

var _cloudDone2 = _interopRequireDefault(_cloudDone);

var _dashboard = require("../dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (props) {
	return _react2.default.createElement(_dashboard2.default, props);
});

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
		return changeTodos(function (todos, child) {
			var task = todos.find(function (a) {
				return a.content == todo;
			});
			var _task$dones = task.dones,
			    dones = _task$dones === undefined ? [] : _task$dones;

			dones.push(day);
			task.dones = dones;
			child.score = child.score + 1;
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
	    editing = _ref3.editing,
	    todoWeek = _ref3.todoWeek,
	    _ref3$week = _ref3.week,
	    week = _ref3$week === undefined ? new Date().getWeek() : _ref3$week,
	    _ref3$isCurrentWeek = _ref3.isCurrentWeek,
	    isCurrentWeek = _ref3$isCurrentWeek === undefined ? todoWeek == week : _ref3$isCurrentWeek;
	return _react2.default.createElement(
		"div",
		null,
		goal ? _react2.default.createElement(
			"div",
			null,
			isCurrentWeek ? _react2.default.createElement(_todoEditor.TodoEditor, { editing: editing }) : _react2.default.createElement(_appBar2.default, {
				iconElementRight: _react2.default.createElement(
					_materialUi.IconButton,
					{ onClick: function onClick(e) {
							return dispatch(ACTION.RESET());
						} },
					_react2.default.createElement(_cloudDone2.default, { color: "white" })
				),
				title: "保存前" + (week - todoWeek) + "周完成情况"
			}),
			isCurrentWeek && editing ? _react2.default.createElement(_taskPadEditor.TaskPadEditor, null) : _react2.default.createElement(_taskPad.TaskPad, { current: isCurrentWeek ? new Date().getDay() : -1 })
		) : _react2.default.createElement(ScorePad, { height: 100 })
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFDQSxJQUFNLFdBQVMseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QztDQUFQLENBQVIsQ0FBc0U7UUFBTyxtREFBVyxLQUFYO0NBQVAsQ0FBL0U7O0FBR04sSUFBTSxTQUFPLE1BQVA7O0FBRU4sSUFBTSxjQUFZLFNBQVosV0FBWTtRQUFHLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDekMsTUFBTSxRQUFNLFVBQU4sQ0FEbUM7QUFFekMsTUFBTSxRQUFNLCtCQUFnQixLQUFoQixDQUFOLENBRm1DO0FBR3pDLE1BQUcsTUFBTSxRQUFOLElBQWdCLFNBQWhCLEVBQ0YsTUFBTSxRQUFOLEdBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFmLENBREQ7O3FCQUdlLE1BQVY7MkNBQU0sa0JBTjhCOzs7QUFRekMsTUFBSSxVQUFRLEVBQUUsTUFBTSxLQUFOLDhDQUFnQixPQUFoQixFQUF3QixLQUExQixDQUFSLENBUnFDO0FBU3pDLE1BQUcsRUFBRSxXQUFXLFFBQVEsSUFBUixDQUFiLEVBQ0YsVUFBUSxrQkFBUSxPQUFSLEVBQVIsQ0FERDtBQUVBLFNBQU8sUUFBUSxJQUFSLENBQWE7VUFBRyxXQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQ3JCLElBRHFCLENBQ2hCO1dBQVMsU0FBUyx1QkFBUywwQkFBVSxPQUFWLEVBQW1CLFdBQU8sTUFBUCxDQUFuQixDQUFrQyxRQUFsQyxDQUFsQjtJQUFUO0dBRGEsQ0FBcEIsQ0FYeUM7RUFBckI7Q0FBSDtBQWNYLElBQU0sMEJBQU87QUFDbkIs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bEc7OztFQUNELE9BQ0M7OztHQUNPLGdCQUNKLHdEQUFZLFNBQVMsT0FBVCxFQUFaLENBREksR0FFSjtBQUNELHNCQUNDOztPQUFZLFNBQVM7Y0FBRyxTQUFTLE9BQU8sS0FBUCxFQUFUO09BQUgsRUFBckI7S0FDQyxxREFBVSxPQUFNLE9BQU4sRUFBVixDQUREO0tBREQ7QUFLQSxvQkFBYSxPQUFLLFFBQUwsV0FBYjtJQU5DLENBRkk7R0FZQSxpQkFBZSxPQUFmLEdBQ0osaUVBREksR0FFSixrREFBUyxTQUFTLGdCQUFnQixJQUFJLElBQUosR0FBVyxNQUFYLEVBQWhCLEdBQXNDLENBQUMsQ0FBRCxFQUF4RCxDQUZJO0dBZFIsR0FrQlUsOEJBQUMsUUFBRCxJQUFVLFFBQVEsR0FBUixFQUFWLENBbEJWOztDQUZxQjs7a0JBeUJULHNCQUFjLFVBQWQsRUFBeUIsRUFBQyxnQkFBRCxFQUF6QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVN9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxuXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi4vZGJcIlxuXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi9jb21wb25lbnRzL2FwcC1iYXJcIlxuaW1wb3J0IHtUYXNrUGFkfSBmcm9tIFwiLi90YXNrLXBhZFwiXG5pbXBvcnQge1Rhc2tQYWRFZGl0b3J9IGZyb20gXCIuL3Rhc2stcGFkLWVkaXRvclwiXG5pbXBvcnQge1RvZG9FZGl0b3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcblxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IFNjb3JlIGZyb20gXCIuLi9kYXNoYm9hcmRcIlxuY29uc3QgU2NvcmVQYWQ9Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKHByb3BzPT48U2NvcmUgey4uLnByb3BzfS8+KVxuXG5cbmNvbnN0IERPTUFJTj1cInRpbWVcIlxuXG5jb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRpZihjaGlsZC50b2RvV2Vlaz09dW5kZWZpbmVkKVxuXHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cblx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblxuXHRsZXQgaGFuZGxlZD1mKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10sIGNoaWxkKVxuXHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQuc2NvcmU9Y2hpbGQuc2NvcmUrMVxuXHR9KVxuXHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0LFVQOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaS0xKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0fSlcblx0LEJPVFRPTTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5wdXNoKHRhcmdldClcblx0fSlcblx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cblx0fSlcblx0LFJFU0VUOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRcdC8vc2F2ZSBoaXN0b3J5XG5cdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0aWYoZG9uZXMubGVuZ3RoKXtcblx0XHRcdFx0cmV0dXJuIFRhc2suZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCBkb25lcykudGhlbihhPT57XG5cdFx0XHRcdFx0dG9kb3MuZm9yRWFjaChhPT5hLmRvbmVzPVtdKVxuXHRcdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZVxuXHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZGlzcGF0Y2gsIGdvYWwsIGVkaXRpbmcsIHRvZG9XZWVrLCB3ZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrfSk9PihcbiAgICA8ZGl2PlxuXHRcdHtnb2FsP1xuXHRcdFx0KDxkaXY+XG5cdFx0ICAgICAgICB7aXNDdXJyZW50V2Vla1xuXHRcdFx0XHRcdD8gPFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxuXHRcdFx0XHRcdDogPEFwcEJhclxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX0+XG5cdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRpdGxlPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHR9XG5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrJiZlZGl0aW5nXG5cdFx0XHRcdFx0PyA8VGFza1BhZEVkaXRvci8+XG5cdFx0XHRcdFx0OiA8VGFza1BhZCBjdXJyZW50PXtpc0N1cnJlbnRXZWVrID8gbmV3IERhdGUoKS5nZXREYXkoKSA6IC0xfS8+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PikgOiA8U2NvcmVQYWQgaGVpZ2h0PXsxMDB9Lz5cblx0XHR9XG4gICAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGltZU1hbmFnZSx7cmVkdWNlcn0pXG4iXX0=