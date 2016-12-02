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
				title: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
			}),
			isCurrentWeek && editing ? _react2.default.createElement(_taskPadEditor.TaskPadEditor, null) : _react2.default.createElement(_taskPad.TaskPad, { current: isCurrentWeek ? new Date().getDay() : 7 })
		) : _react2.default.createElement(ScorePad, { height: 100 })
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJTY29yZVBhZCIsInN0YXRlIiwicHJvcHMiLCJET01BSU4iLCJjaGFuZ2VUb2RvcyIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJjaGlsZCIsInRvZG9XZWVrIiwidW5kZWZpbmVkIiwiRGF0ZSIsImdldFdlZWsiLCJ0b2RvcyIsImhhbmRsZWQiLCJmIiwidGhlbiIsInJlc29sdmUiLCJ1cHNlcnQiLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJBQ1RJT04iLCJBREQiLCJ0b2RvIiwicHVzaCIsImZpbmQiLCJhIiwiY29udGVudCIsIlJFTU9WRSIsImkiLCJmaW5kSW5kZXgiLCJfaWQiLCJzcGxpY2UiLCJSRU1PVkVfQllfSU5ERVgiLCJET05FIiwiZGF5IiwidGFzayIsImRvbmVzIiwic2NvcmUiLCJFRElUSU5HIiwic3RhdHVzIiwidHlwZSIsInBheWxvYWQiLCJVUCIsInRhcmdldCIsImxlbmd0aCIsIkRPV04iLCJUT1AiLCJ1bnNoaWZ0IiwiQk9UVE9NIiwiVE9HR0xFX1ZJU0lCTEUiLCJoaWRkZW4iLCJSRVNFVCIsImZpbHRlciIsImZpbmlzaFdlZWtUYXNrcyIsImZvckVhY2giLCJyZWR1Y2VyIiwiZWRpdGluZyIsIlRpbWVNYW5hZ2UiLCJnb2FsIiwid2VlayIsImlzQ3VycmVudFdlZWsiLCJnZXREYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBRUE7Ozs7OztBQUNBLElBQU1BLFdBQVMseUJBQVE7QUFBQSxRQUFPLHNCQUFRLCtCQUFnQkMsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QyxDQUFQO0FBQUEsQ0FBUixFQUFzRTtBQUFBLFFBQU8sbURBQVdDLEtB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LEVBQXpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2NvbXBhY3QsIEVOVElUSUVTfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcblxuaW1wb3J0IHtGYW1pbHksVGFza30gZnJvbSBcIi4uL2RiXCJcblxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcbmltcG9ydCB7VGFza1BhZH0gZnJvbSBcIi4vdGFzay1wYWRcIlxuaW1wb3J0IHtUYXNrUGFkRWRpdG9yfSBmcm9tIFwiLi90YXNrLXBhZC1lZGl0b3JcIlxuaW1wb3J0IHtUb2RvRWRpdG9yfSBmcm9tIFwiLi90b2RvLWVkaXRvclwiXG5cbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmltcG9ydCBTY29yZSBmcm9tIFwiLi4vZGFzaGJvYXJkXCJcbmNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKShwcm9wcz0+PFNjb3JlIHsuLi5wcm9wc30vPilcblxuXG5jb25zdCBET01BSU49XCJ0aW1lXCJcblxuY29uc3QgY2hhbmdlVG9kb3M9Zj0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0aWYoY2hpbGQudG9kb1dlZWs9PXVuZGVmaW5lZClcblx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXG5cdGxldCB7dG9kb3M9W119PWNoaWxkXG5cblx0bGV0IGhhbmRsZWQ9ZihjaGlsZC50b2Rvcz1bLi4udG9kb3NdLCBjaGlsZClcblx0aWYoIShoYW5kbGVkICYmIGhhbmRsZWQudGhlbikpXG5cdFx0aGFuZGxlZD1Qcm9taXNlLnJlc29sdmUoKVxuXHRyZXR1cm4gaGFuZGxlZC50aGVuKGE9PkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpKVxufVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRpZighdG9kbylcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdHJldHVybiBjaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdHRvZG9zLnB1c2godG9kbylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmKCF0b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbykpXG5cdFx0XHRcdFx0dG9kb3MucHVzaCh7Y29udGVudDp0b2RvfSlcblx0XHRcdH1cblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxuXHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCBpPXR5cGVvZih0b2RvKT09J29iamVjdCdcblx0XHRcdD8gdG9kb3MuZmluZEluZGV4KGE9PmEuX2lkPXRvZG8uX2lkKVxuXHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xuXG5cdFx0aWYoaSE9LTEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHR9KVxuXHQsUkVNT1ZFX0JZX0lOREVYOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+dG9kb3Muc3BsaWNlKGksMSkpXG5cdCxET05FOiAodG9kbyxkYXkpPT5jaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcblx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0ZG9uZXMucHVzaChkYXkpXG5cdFx0dGFzay5kb25lcz1kb25lc1xuXHRcdGNoaWxkLnNjb3JlPWNoaWxkLnNjb3JlKzFcblx0fSlcblx0LEVESVRJTkc6IChzdGF0dXM9MCk9Pih7dHlwZTpgJHtET01BSU59L2VkaXRgLCBwYXlsb2FkOnN0YXR1c30pXG5cdCxVUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGktMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LERPV046IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpKzEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxUT1A6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MudW5zaGlmdCh0YXJnZXQpXG5cdH0pXG5cdCxCT1RUT006IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3MucHVzaCh0YXJnZXQpXG5cdH0pXG5cdCxUT0dHTEVfVklTSUJMRTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dGFyZ2V0LmhpZGRlbj0hISF0YXJnZXQuaGlkZGVuXG5cdH0pXG5cdCxSRVNFVDogYT0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRcdHJldHVybiBjaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0XHQvL3NhdmUgaGlzdG9yeVxuXHRcdFx0bGV0IGRvbmVzPXRvZG9zLmZpbHRlcigoe2RvbmVzPVtdfSk9PmRvbmVzLmxlbmd0aClcblx0XHRcdGlmKGRvbmVzLmxlbmd0aCl7XG5cdFx0XHRcdHJldHVybiBUYXNrLmZpbmlzaFdlZWtUYXNrcyhjaGlsZCwgZG9uZXMpLnRoZW4oYT0+e1xuXHRcdFx0XHRcdHRvZG9zLmZvckVhY2goYT0+YS5kb25lcz1bXSlcblx0XHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2Vcblx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgcmVkdWNlcj0oc3RhdGU9e2VkaXRpbmc6MH0se3R5cGUscGF5bG9hZH0pPT57XG5cdHN3aXRjaCh0eXBlKXtcblx0Y2FzZSBgJHtET01BSU59L2VkaXRgOlxuXHRcdHJldHVybiB7ZWRpdGluZzpwYXlsb2FkfVxuXHRicmVha1xuXHR9XG5cdHJldHVybiBzdGF0ZVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe2Rpc3BhdGNoLCBnb2FsLCBlZGl0aW5nLCB0b2RvV2Vlaywgd2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKSwgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla30pPT4oXG4gICAgPGRpdj5cblx0XHR7Z29hbD9cblx0XHRcdCg8ZGl2PlxuXHRcdCAgICAgICAge2lzQ3VycmVudFdlZWtcblx0XHRcdFx0XHQ/IDxUb2RvRWRpdG9yIGVkaXRpbmc9e2VkaXRpbmd9Lz5cblx0XHRcdFx0XHQ6IDxBcHBCYXJcblx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ9e1xuXHRcdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVQoKSl9PlxuXHRcdFx0XHRcdFx0XHRcdDxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aXRsZT17YOS/neWtmOWJjSR7d2Vlay10b2RvV2Vla33lkajlrozmiJDmg4XlhrVgfVxuXHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0fVxuXG5cdFx0ICAgICAgICB7aXNDdXJyZW50V2VlayYmZWRpdGluZ1xuXHRcdFx0XHRcdD8gPFRhc2tQYWRFZGl0b3IvPlxuXHRcdFx0XHRcdDogPFRhc2tQYWQgY3VycmVudD17aXNDdXJyZW50V2VlayA/IG5ldyBEYXRlKCkuZ2V0RGF5KCkgOiA3fS8+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PikgOiA8U2NvcmVQYWQgaGVpZ2h0PXsxMDB9Lz5cblx0XHR9XG4gICAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGltZU1hbmFnZSx7cmVkdWNlcn0pXG4iXX0=