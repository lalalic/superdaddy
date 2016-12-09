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

var _scorePad = require("./score-pad");

var _scorePad2 = _interopRequireDefault(_scorePad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	    todoWeek = _ref3.todoWeek,
	    _ref3$week = _ref3.week,
	    week = _ref3$week === undefined ? new Date().getWeek() : _ref3$week,
	    _ref3$isCurrentWeek = _ref3.isCurrentWeek,
	    isCurrentWeek = _ref3$isCurrentWeek === undefined ? todoWeek == week : _ref3$isCurrentWeek;
	return _react2.default.createElement(
		"div",
		null,
		goal && goal > score ? _react2.default.createElement(
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

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (props) {
	return _react2.default.createElement(_scorePad2.default, props);
});

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLFNBQU8sTUFBUDs7QUFFTixJQUFNLGNBQVksU0FBWixXQUFZO1FBQUcsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUN6QyxNQUFNLFFBQU0sVUFBTixDQURtQztBQUV6QyxNQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FGbUM7QUFHekMsTUFBRyxNQUFNLFFBQU4sSUFBZ0IsU0FBaEIsRUFDRixNQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FERDs7cUJBR2UsTUFBVjsyQ0FBTSxrQkFOOEI7OztBQVF6QyxNQUFJLFVBQVEsRUFBRSxNQUFNLEtBQU4sOENBQWdCLE9BQWhCLEVBQXdCLEtBQTFCLENBQVIsQ0FScUM7QUFTekMsTUFBRyxFQUFFLFdBQVcsUUFBUSxJQUFSLENBQWIsRUFDRixVQUFRLGtCQUFRLE9BQVIsRUFBUixDQUREO0FBRUEsU0FBTyxRQUFRLElBQVIsQ0FBYTtVQUFHLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFDckIsSUFEcUIsQ0FDaEI7V0FBUyxTQUFTLHVCQUFTLDBCQUFVLE9BQVYsRUFBbUIsV0FBTyxNQUFQLENBQW5CLENBQWtDLFFBQWxDLENBQWxCO0lBQVQ7R0FEYSxDQUFwQixDQVh5QztFQUFyQjtDQUFIO0FBY1gsSUFBTSwwQkFBTztBQUNuQixNQUFLO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFzQjtBQUNoQyxPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sa0JBQVEsT0FBUixFQUFQLENBREQ7QUFFQSxVQUFPLFlBQVksaUJBQU87QUFDekIsbUJBQWMsZ0VBQWQ7QUFD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LE9BQVQsRUFBWixDQURJLEdBRUo7QUFDRCxzQkFDQzs7T0FBWSxTQUFTO2NBQUcsU0FBUyxPQUFPLEtBQVAsRUFBVDtPQUFILEVBQXJCO0tBQ0MscURBQVUsT0FBTSxPQUFOLEVBQVYsQ0FERDtLQUREO0FBS0Esb0JBQWEsT0FBSyxRQUFMLFdBQWI7SUFOQyxDQUZJO0dBWUEsaUJBQWUsT0FBZixHQUNKLGlFQURJLEdBRUosa0RBQVMsU0FBUyxnQkFBZ0IsSUFBSSxJQUFKLEdBQVcsTUFBWCxFQUFoQixHQUFzQyxDQUFDLENBQUQsRUFBeEQsQ0FGSTtHQWRSLEdBa0JVLDhCQUFDLFFBQUQsSUFBVSxRQUFRLEdBQVIsRUFBVixDQWxCVjs7Q0FGcUI7O0FBeUJ4QixJQUFNLFdBQVMseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QztDQUFQLENBQVIsQ0FBc0U7UUFBTyxrREFBVyxLQUFYO0NBQVAsQ0FBL0U7O2tCQUVTLHNCQUFjLFVBQWQsRUFBeUIsRUFBQyxnQkFBRCxFQUF6QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtJY29uQnV0dG9uLCBBdXRvQ29tcGxldGV9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVN9IGZyb20gXCJxaWxpLWFwcFwiXG5pbXBvcnQge25vcm1hbGl6ZX0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi4vc2VsZWN0b3JcIlxuXG5pbXBvcnQge0ZhbWlseSxUYXNrfSBmcm9tIFwiLi4vZGJcIlxuXG5pbXBvcnQgQXBwQmFyIGZyb20gXCIuLi9jb21wb25lbnRzL2FwcC1iYXJcIlxuaW1wb3J0IHtUYXNrUGFkfSBmcm9tIFwiLi90YXNrLXBhZFwiXG5pbXBvcnQge1Rhc2tQYWRFZGl0b3J9IGZyb20gXCIuL3Rhc2stcGFkLWVkaXRvclwiXG5pbXBvcnQge1RvZG9FZGl0b3J9IGZyb20gXCIuL3RvZG8tZWRpdG9yXCJcblxuaW1wb3J0IEljb25Eb25lIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZmlsZS9jbG91ZC1kb25lXCJcblxuaW1wb3J0IFNjb3JlIGZyb20gXCIuL3Njb3JlLXBhZFwiXG5cbmNvbnN0IERPTUFJTj1cInRpbWVcIlxuXG5jb25zdCBjaGFuZ2VUb2Rvcz1mPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRpZihjaGlsZC50b2RvV2Vlaz09dW5kZWZpbmVkKVxuXHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cblx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblxuXHRsZXQgaGFuZGxlZD1mKGNoaWxkLnRvZG9zPVsuLi50b2Rvc10sIGNoaWxkKVxuXHRpZighKGhhbmRsZWQgJiYgaGFuZGxlZC50aGVuKSlcblx0XHRoYW5kbGVkPVByb21pc2UucmVzb2x2ZSgpXG5cdHJldHVybiBoYW5kbGVkLnRoZW4oYT0+RmFtaWx5LnVwc2VydChjaGlsZClcblx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSkpXG59XG5leHBvcnQgY29uc3QgQUNUSU9OPXtcblx0QUREOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0XHRzd2l0Y2godHlwZW9mKHRvZG8pKXtcblx0XHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdFx0dG9kb3MucHVzaCh0b2RvKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0XHR0b2Rvcy5wdXNoKHtjb250ZW50OnRvZG99KVxuXHRcdFx0fVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG5cdCxSRU1PVkU6IHRvZG89PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IGk9dHlwZW9mKHRvZG8pPT0nb2JqZWN0J1xuXHRcdFx0PyB0b2Rvcy5maW5kSW5kZXgoYT0+YS5faWQ9dG9kby5faWQpXG5cdFx0XHQ6IHRvZG9zLmZpbmRJbmRleChhPT5hLmNvbnRlbnQ9dG9kbyk7XG5cblx0XHRpZihpIT0tMSlcblx0XHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdH0pXG5cdCxSRU1PVkVfQllfSU5ERVg6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT50b2Rvcy5zcGxpY2UoaSwxKSlcblx0LERPTkU6ICh0b2RvLGRheSk9PmNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQuc2NvcmU9Y2hpbGQuc2NvcmUrMVxuXHRcdGNoaWxkLnRvdGFsU2NvcmU9KGNoaWxkLnRvdGFsU2NvcmV8fDApKzFcblx0fSlcblx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXG5cdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdH0pXG5cdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdH0pXG5cdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdH0pXG5cdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMpLnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e2VkaXRpbmc6MH0se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgJHtET01BSU59L2VkaXRgOlxuXHRcdHJldHVybiB7ZWRpdGluZzpwYXlsb2FkfVxuXHRicmVha1xuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe2Rpc3BhdGNoLCBnb2FsLCBzY29yZSwgZWRpdGluZywgdG9kb1dlZWssIHdlZWs9bmV3IERhdGUoKS5nZXRXZWVrKCksIGlzQ3VycmVudFdlZWs9dG9kb1dlZWs9PXdlZWt9KT0+KFxuICAgIDxkaXY+XG5cdFx0e2dvYWwgJiYgZ29hbD5zY29yZSA/XG5cdFx0XHQoPGRpdj5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrXG5cdFx0XHRcdFx0PyA8VG9kb0VkaXRvciBlZGl0aW5nPXtlZGl0aW5nfS8+XG5cdFx0XHRcdFx0OiA8QXBwQmFyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0PXtcblx0XHRcdFx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfT5cblx0XHRcdFx0XHRcdFx0XHQ8SWNvbkRvbmUgY29sb3I9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGl0bGU9e2Dkv53lrZjliY0ke3dlZWstdG9kb1dlZWt95ZGo5a6M5oiQ5oOF5Ya1YH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdH1cblxuXHRcdCAgICAgICAge2lzQ3VycmVudFdlZWsmJmVkaXRpbmdcblx0XHRcdFx0XHQ/IDxUYXNrUGFkRWRpdG9yLz5cblx0XHRcdFx0XHQ6IDxUYXNrUGFkIGN1cnJlbnQ9e2lzQ3VycmVudFdlZWsgPyBuZXcgRGF0ZSgpLmdldERheSgpIDogLTF9Lz5cblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+KSA6IDxTY29yZVBhZCBoZWlnaHQ9ezEwMH0vPlxuXHRcdH1cbiAgICA8L2Rpdj5cbilcblxuY29uc3QgU2NvcmVQYWQ9Y29ubmVjdChzdGF0ZT0+Y29tcGFjdChnZXRDdXJyZW50Q2hpbGQoc3RhdGUpLFwic2NvcmVcIixcImdvYWxcIixcInRvZG9cIikpKHByb3BzPT48U2NvcmUgey4uLnByb3BzfS8+KVxuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKFRpbWVNYW5hZ2Use3JlZHVjZXJ9KVxuIl19