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
		goal && goal != score ? _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFDQSxJQUFNLFdBQVMseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QztDQUFQLENBQVIsQ0FBc0U7UUFBTyxtREFBVyxLQUFYO0NBQVAsQ0FBL0U7O0FBR04sSUFBTSxTQUFPLE1BQVA7O0FBRU4sSUFBTSxjQUFZLFNBQVosV0FBWTtRQUFHLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDekMsTUFBTSxRQUFNLFVBQU4sQ0FEbUM7QUFFekMsTUFBTSxRQUFNLCtCQUFnQixLQUFoQixDQUFOLENBRm1DO0FBR3pDLE1BQUcsTUFBTSxRQUFOLElBQWdCLFNBQWhCLEVBQ0YsTUFBTSxRQUFOLEdBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFmLENBREQ7O3FCQUdlLE1BQVY7MkNBQU0sa0JBTjhCOzs7QUFRekMsTUFBSSxVQUFRLEVBQUUsTUFBTSxLQUFOLDhDQUFnQixPQUFoQixFQUF3QixLQUExQixDQUFSLENBUnFDO0FBU3pDLE1BQUcsRUFBRSxXQUFXLFFBQVEsSUFBUixDQUFiLEVBQ0YsVUFBUSxrQkFBUSxPQUFSLEVBQVIsQ0FERDtBQUVBLFNBQU8sUUFBUSxJQUFSLENBQWE7VUFBRyxXQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQ3JCLElBRHFCLENBQ2hCO1dBQVMsU0FBUyx1QkFBUywwQkFBVSxPQUFWLEVBQW1CLFdBQU8sTUFBUCxDQUFuQixDQUFrQyxRQUFsQyxDQUFsQjtJQUFUO0dBRGEsQ0FBcEIsQ0FYeUM7RUFBckI7Q0FBSDtBQWNYLElBQU0sMEJBQU87QUFDbkIsTUFBSztTQUFNLFVBQUMsUUFBRCxFQUFXLFFBQVgsRUFBc0I7QUFDaEMsT0FBRyxDQUFDLElBQUQsRUFDRixPQUFPLGtCQUFRLE9BQVIsRUFBUCxDQUREO0FBRUEsVUFBTyxZQUFZLGlCQUFPO0FBQ3pCLG1CQUFjLGdFQUFkO0FBQ0EsVUFBSyxRQUFMO0FBQ0MsWUFBTSxJQUFOLENBQVcsSUFBWCxFQUREO0FBRUMsWUFGRDtBQURBO0FBS0MsVUFBRyxDQUFDLE1BQU0sSUFBTixDQUFXO2NBQUcsRUFBRSxPQUFGLElBQVcsSUFBWDtPQUFILENBQVosRUFDRixNQUFNLElBQU4sQ0FBVyxFQUFDLFNBQVEsSUFBUixFQUFaLEVBREQ7QUFMRCxLQUR5QjtJQUFQLENBQVosQ0FTSixRQVRJLEVBU0ssUUFUTCxDQUFQLENBSGdDO0dBQXRCO0VBQU47QUFjSixTQUFRO1NBQU0sWUFBWSxpQkFBTztBQUNqQyxPQUFJLElBQUUsUUFBTyxpRUFBUCxJQUFjLFFBQWQsR0FDSCxNQUFNLFNBQU4sQ0FBZ0I7V0FBRyxFQUFFLEdBQUYsR0FBTSxLQUFLLEdBQUw7SUFBVCxDQURiLEdBRUgsTUFBTSxTQUFOLENBQWdCO1dBQUcsRUFBRSxPQUFGLEdBQVUsSUFBVjtJQUFILENBRmIsQ0FEMkI7O0FBS2pDLE9BQUcsS0FBRyxDQUFDLENBQUQsRUFDTCxNQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUREO0dBTDBCO0VBQWxCO0FBUVIsa0JBQWlCO1NBQUcsWUFBWTtVQUFPLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmO0dBQVA7RUFBZjtBQUNqQixPQUFNLGNBQUMsSUFBRCxFQUFNLEdBQU47U0FBWSxZQUFZLFVBQUMsS0FBRCxFQUFPLEtBQVAsRUFBZTtBQUM3QyxPQUFNLE9BQUssTUFBTSxJQUFOLENBQVc7V0FBRyxFQUFFLE9BQUYsSUFBVyxJQUFYO0lBQUgsQ0FBaEIsQ0FEdUM7cUJBRTlCLEtBQVY7MkNBQU0saUJBRmtDOztBQUc3QyxTQUFNLElBQU4sQ0FBVyxHQUFYLEVBSDZDO0FBSTdDLFFBQUssS0FBTCxHQUFXLEtBQVgsQ0FKNkM7QUFLN0MsU0FBTSxLQUFOLEdBQVksTUFBTSxLQUFOLEdBQVksQ0FBWixDQUxpQztBQU03QyxTQUFNLFVBQU4sR0FBaUIsQ0FBQyxNQUFNLFVBQU4sSUFBa0IsQ0FBbEIsQ0FBRCxHQUFzQixDQUF0QixDQU40QjtHQUFmO0VBQXhCO0FBUU4sVUFBUztNQUFDLDZFQUFPO1NBQUssRUFBQyxNQUFRLGdCQUFSLEVBQXVCLFNBQVEsTUFBUjtFQUFyQztBQUNULEtBQUk7U0FBRyxZQUFZLGlCQUFPO0FBQzFCLE9BQUksU0FBTyxNQUFNLENBQU4sQ0FBUCxDQURzQjtBQUUxQixTQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUYwQjtBQUcxQixTQUFNLE1BQU4sQ0FBYSxDQUFDLElBQUUsQ0FBRixDQUFELElBQU8sTUFBTSxNQUFOLEdBQWEsQ0FBYixDQUFQLEVBQXVCLENBQXBDLEVBQXNDLE1BQXRDLEVBSDBCO0dBQVA7RUFBZjtBQUtKLE9BQU07U0FBRyxZQUFZLGlCQUFPO0FBQzVCLE9BQUksU0FBTyxNQUFNLENBQU4sQ0FBUCxDQUR3QjtBQUU1QixTQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUY0QjtBQUc1QixTQUFNLE1BQU4sQ0FBYSxDQUFDLElBQUUsQ0FBRixDQUFELElBQU8sTUFBTSxNQUFOLEdBQWEsQ0FBYixDQUFQLEVBQXVCLENBQXBDLEVBQXNDLE1BQXRDLEVBSDRCO0dBQVA7RUFBZjtBQUtOLE1BQUs7U0FBRyxZQUFZLGlCQUFPO0FBQzNCLE9BQUksU0FBTyxNQUFNLENBQU4sQ0FBUCxDQUR1QjtBQUUzQixTQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUYyQjtBQUczQixTQUFNLE9BQU4sQ0FBYyxNQUFkLEVBSDJCO0dBQVA7RUFBZjtBQUtMLFNBQVE7U0FBRyxZQUFZLGlCQUFPO0FBQzlCLE9BQUksU0FBTyxNQUFNLENBQU4sQ0FBUCxDQUQwQjtBQUU5QixTQUFNLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUY4QjtBQUc5QixTQUFNLElBQU4sQ0FBVyxNQUFYLEVBSDhCO0dBQVA7RUFBZjtBQUtSLGlCQUFnQjtTQUFHLFlBQVksaUJBQU87QUFDdEMsT0FBSSxTQUFPLE1BQU0sQ0FBTixDQUFQLENBRGtDO0FBRXRDLFVBQU8sTUFBUCxHQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBUCxDQUZxQjtHQUFQO0VBQWY7QUFJaEIsUUFBTztTQUFHLFVBQUMsUUFBRCxFQUFVLFFBQVYsRUFBcUI7QUFDL0IsVUFBTyxZQUFZLFVBQUMsS0FBRCxFQUFPLEtBQVAsRUFBZTs7QUFFakMsUUFBSSxRQUFNLE1BQU0sTUFBTixDQUFhOzJCQUFFOzRDQUFNO1lBQU0sTUFBTSxNQUFOO0tBQWQsQ0FBbkIsQ0FGNkI7QUFHakMsUUFBRyxNQUFNLE1BQU4sRUFBYTtBQUNmLFlBQU8sU0FBSyxlQUFMLENBQXFCLEtBQXJCLEVBQTRCLEtBQTVCLEVBQW1DLElBQW5DLENBQXdDLGFBQUc7QUFDakQsWUFBTSxPQUFOLENBQWM7Y0FBRyxFQUFFLEtBQUYsR0FBUSxFQUFSO09BQUgsQ0FBZCxDQURpRDtBQUVqRCxZQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FGaUQ7TUFBSCxDQUEvQyxDQURlO0tBQWhCLE1BTUMsTUFBTSxRQUFOLEdBQWUsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFmLENBTkQ7SUFIa0IsQ0FBWixDQVVKLFFBVkksRUFVSyxRQVZMLENBQVAsQ0FEK0I7R0FBckI7RUFBSDtDQXpESTs7QUF3RU4sSUFBTSw0QkFBUSxTQUFSLE9BQVEsR0FBb0M7S0FBbkMsNEVBQU0sRUFBQyxTQUFRLENBQVIsR0FBNEI7O0tBQWhCO0tBQUssd0JBQVc7O0FBQ3hELFNBQU8sSUFBUDtBQUNBLE9BQVEsZ0JBQVI7QUFDQyxVQUFPLEVBQUMsU0FBUSxPQUFSLEVBQVIsQ0FERDtBQUVBLFNBRkE7QUFEQSxFQUR3RDtBQU14RCxRQUFPLEtBQVAsQ0FOd0Q7Q0FBcEM7O0FBU2QsSUFBTSxrQ0FBVyxTQUFYLFVBQVc7S0FBRTtLQUFVO0tBQU07S0FBTztLQUFTO3dCQUFVO3VDQUFLLElBQUksSUFBSixHQUFXLE9BQVg7aUNBQXNCO3lEQUFjLFlBQVUsSUFBVjtRQUN6Rzs7O0VBQ0QsUUFBUSxRQUFNLEtBQU4sR0FDUDs7O0dBQ08sZ0JBQ0osd0RBQVksU0FBUyxPQUFULEVBQVosQ0FESSxHQUVKO0FBQ0Qsc0JBQ0M7O09BQVksU0FBUztjQUFHLFNBQVMsT0FBTyxLQUFQLEVBQVQ7T0FBSCxFQUFyQjtLQUNDLHFEQUFVLE9BQU0sT0FBTixFQUFWLENBREQ7S0FERDtBQUtBLG9CQUFhLE9BQUssUUFBTCxXQUFiO0lBTkMsQ0FGSTtHQVlBLGlCQUFlLE9BQWYsR0FDSixpRUFESSxHQUVKLGtEQUFTLFNBQVMsZ0JBQWdCLElBQUksSUFBSixHQUFXLE1BQVgsRUFBaEIsR0FBc0MsQ0FBQyxDQUFELEVBQXhELENBRkk7R0FkUixHQWtCVSw4QkFBQyxRQUFELElBQVUsUUFBUSxHQUFSLEVBQVYsQ0FsQlY7O0NBRnFCOztrQkF5QlQsc0JBQWMsVUFBZCxFQUF5QixFQUFDLGdCQUFELEVBQXpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5cbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuLi9kYlwiXG5cbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXG5pbXBvcnQge1Rhc2tQYWR9IGZyb20gXCIuL3Rhc2stcGFkXCJcbmltcG9ydCB7VGFza1BhZEVkaXRvcn0gZnJvbSBcIi4vdGFzay1wYWQtZWRpdG9yXCJcbmltcG9ydCB7VG9kb0VkaXRvcn0gZnJvbSBcIi4vdG9kby1lZGl0b3JcIlxuXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5pbXBvcnQgU2NvcmUgZnJvbSBcIi4uL2Rhc2hib2FyZFwiXG5jb25zdCBTY29yZVBhZD1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJzY29yZVwiLFwiZ29hbFwiLFwidG9kb1wiKSkocHJvcHM9PjxTY29yZSB7Li4ucHJvcHN9Lz4pXG5cblxuY29uc3QgRE9NQUlOPVwidGltZVwiXG5cbmNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdGlmKGNoaWxkLnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblxuXHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXG5cdGxldCBoYW5kbGVkPWYoY2hpbGQudG9kb3M9Wy4uLnRvZG9zXSwgY2hpbGQpXG5cdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxuXHRcdGhhbmRsZWQ9UHJvbWlzZS5yZXNvbHZlKClcblx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHR9XG5cdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdH1cblx0LFJFTU9WRTogdG9kbz0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXG5cdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLl9pZD10b2RvLl9pZClcblx0XHRcdDogdG9kb3MuZmluZEluZGV4KGE9PmEuY29udGVudD10b2RvKTtcblxuXHRcdGlmKGkhPS0xKVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0fSlcblx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxuXHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0bGV0IHtkb25lcz1bXX09dGFza1xuXHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRjaGlsZC5zY29yZT1jaGlsZC5zY29yZSsxXG5cdFx0Y2hpbGQudG90YWxTY29yZT0oY2hpbGQudG90YWxTY29yZXx8MCkrMVxuXHR9KVxuXHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0LFVQOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaS0xKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0fSlcblx0LEJPVFRPTTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5wdXNoKHRhcmdldClcblx0fSlcblx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cblx0fSlcblx0LFJFU0VUOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRcdC8vc2F2ZSBoaXN0b3J5XG5cdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0aWYoZG9uZXMubGVuZ3RoKXtcblx0XHRcdFx0cmV0dXJuIFRhc2suZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCBkb25lcykudGhlbihhPT57XG5cdFx0XHRcdFx0dG9kb3MuZm9yRWFjaChhPT5hLmRvbmVzPVtdKVxuXHRcdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZVxuXHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZGlzcGF0Y2gsIGdvYWwsIHNjb3JlLCBlZGl0aW5nLCB0b2RvV2Vlaywgd2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKSwgaXNDdXJyZW50V2Vlaz10b2RvV2Vlaz09d2Vla30pPT4oXG4gICAgPGRpdj5cblx0XHR7Z29hbCAmJiBnb2FsIT1zY29yZSA/XG5cdFx0XHQoPGRpdj5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrXG5cdFx0XHRcdFx0PyA8VG9kb0VkaXRvciBlZGl0aW5nPXtlZGl0aW5nfS8+XG5cdFx0XHRcdFx0OiA8QXBwQmFyXG5cdFx0XHRcdFx0XHRpY29uRWxlbWVudFJpZ2h0PXtcblx0XHRcdFx0XHRcdFx0PEljb25CdXR0b24gb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLlJFU0VUKCkpfT5cblx0XHRcdFx0XHRcdFx0XHQ8SWNvbkRvbmUgY29sb3I9XCJ3aGl0ZVwiLz5cblx0XHRcdFx0XHRcdFx0PC9JY29uQnV0dG9uPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGl0bGU9e2Dkv53lrZjliY0ke3dlZWstdG9kb1dlZWt95ZGo5a6M5oiQ5oOF5Ya1YH1cblx0XHRcdFx0XHRcdC8+XG5cdFx0XHRcdH1cblxuXHRcdCAgICAgICAge2lzQ3VycmVudFdlZWsmJmVkaXRpbmdcblx0XHRcdFx0XHQ/IDxUYXNrUGFkRWRpdG9yLz5cblx0XHRcdFx0XHQ6IDxUYXNrUGFkIGN1cnJlbnQ9e2lzQ3VycmVudFdlZWsgPyBuZXcgRGF0ZSgpLmdldERheSgpIDogLTF9Lz5cblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+KSA6IDxTY29yZVBhZCBoZWlnaHQ9ezEwMH0vPlxuXHRcdH1cbiAgICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==