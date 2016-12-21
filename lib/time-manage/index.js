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
							title: "保存前" + (week - todoWeek) + "周完成情况"
						}),
						_react2.default.createElement(_taskPad.TaskPad, { current: 99 })
					);
				}
			}
		}(new Date().getWeek())
	);
};

exports.default = (0, _assign2.default)(TimeManage, { reducer: reducer });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNLFNBQU8sTUFBUDs7QUFFTixJQUFNLGNBQVksU0FBWixXQUFZO1FBQUcsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUN6QyxNQUFNLFFBQU0sVUFBTixDQURtQztBQUV6QyxNQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FGbUM7QUFHekMsTUFBRyxNQUFNLFFBQU4sSUFBZ0IsU0FBaEIsRUFDRixNQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FERDs7cUJBR2UsTUFBVjsyQ0FBTSxrQkFOOEI7OztBQVF6QyxNQUFJLFVBQVEsRUFBRSxNQUFNLEtBQU4sOENBQWdCLE9BQWhCLEVBQXdCLEtBQTFCLENBQVIsQ0FScUM7QUFTekMsTUFBRyxFQUFFLFdBQVcsUUFBUSxJQUFSLENBQWIsRUFDRixVQUFRLGtCQUFRLE9BQVIsRUFBUixDQUREO0FBRUEsU0FBTyxRQUFRLElBQVIsQ0FBYTtVQUFHLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFDckIsSUFEcUIsQ0FDaEI7V0FBUyxTQUFTLHVCQUFTLDBCQUFVLE9BQVYsRUFBbUIsV0FBTyxNQUFQLENBQW5CLENBQWtDLFFBQWxDLENBQWxCO0lBQVQ7R0FEYSxDQUFwQixDQVh5QztFQUFyQjtDQUFIO0FBY1gsSUFBTSwwQkFBTztBQUNuQixNQUFLO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFzQjtBQUNoQyxPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sa0JBQVEsT0FBUixFQUFQLENBREQ7QUFFQSxVQUFPLFlBQVksaUJBQU87QUFDekIsbUJBQWMsZ0VBQWQ7QUFDQSxVQUFLLFFBQUw7QUFDQyxZQUFNLElBQU4sQ0FBVyxJQUFYLEVBREQ7QUFFQyxZQUZEO0FBREE7QUFLQyxVQUFHLENBQUMsTUFBTSxJQUFOLENBQVc7Y0FBRyxFQUFFLE9BQUYsSUFBVyxJQUFYO09BQUgsQ0FBWixFQUNGLE1BQU0sSUFBTixDQUFXLEVBQUMsU0FBUSxJQUFSLEVBQVosRUFERDtBQUxELEtBRHlCO0lBQVAsQ0FBWixDQVNKLFFBVEksRUFTSyxRQVRMLENBQVAsQ0FIZ0M7R0FBdEI7RUFBTjtBQWNKLFNBQVE7U0FBTSxZQUFZLGlCQUFPO0FBQ2pDLE9BQUksSUFBRSxRQUFPLGlFQUFQLElBQWMsUUFBZCxHQUNILE1BQU0sU0FBTixDQUFnQjtXQUFHLEVBQUUsR0FBRixHQUFNLEtBQUssR0FBTDtJQUFULENBRGIsR0FFSCxNQUFNLFNBQU4sQ0FBZ0I7V0FBRyxFQUFFLE9BQUYsR0FBVSxJQUFWO0lBQUgsQ0FGYixDQUQyQjs7QUFLakMsT0FBRyxLQUFHLENBQUMsQ0FBRCxFQUNMLE1BQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmLEVBREQ7R0FMMEI7RUFBbEI7QUFRUixrQkFBaUI7U0FBRyxZQUFZO1VBQU8sTUFBTSxNQUFOLENBQWEsQ0FBYixFQUFlLENBQWY7R0FBUDtFQUFmO0FBQ2pCLE9BQU0sY0FBQyxJQUFELEVBQU0sR0FBTjtTQUFZLFlBQVksVUFBQyxLQUFELEVBQU8sS0FBUCxFQUFlO0FBQzdDLE9BQU0sT0FBSyxNQUFNLElBQU4sQ0FBVztXQUFHLEVBQUUsT0FBRixJQUFXLElBQVg7SUFBSCxDQUFoQixDQUR1QztxQkFFOUIsS0FBVjsyQ0FBTSxpQkFGa0M7O0FBRzdDLFNBQU0sSUFBTixDQUFXLEdBQVgsRUFINkM7QUFJN0MsUUFBSyxLQUFMLEdBQVcsS0FBWCxDQUo2QztBQUs3QyxTQUFNLEtBQU4sR0FBWSxNQUFNLEtBQU4sR0FBWSxDQUFaLENBTGlDO0FBTTdDLFNBQU0sVUFBTixHQUFpQixDQUFDLE1BQU0sVUFBTixJQUFrQixDQUFsQixDQUFELEdBQXNCLENBQXRCLENBTjRCO0dBQWY7RUFBeEI7QUFRTixVQUFTO01BQUMsNkVBQU87U0FBSyxFQUFDLE1BQVEsZ0JBQVIsRUFBdUIsU0FBUSxNQUFSO0VBQXJDO0FBQ1QsS0FBSTtTQUFHLFlBQVksaUJBQU87QUFDMUIsT0FBSSxTQUFPLE1BQU0sQ0FBTixDQUFQLENBRHNCO0FBRTFCLFNBQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmLEVBRjBCO0FBRzFCLFNBQU0sTUFBTixDQUFhLENBQUMsSUFBRSxDQUFGLENBQUQsSUFBTyxNQUFNLE1BQU4sR0FBYSxDQUFiLENBQVAsRUFBdUIsQ0FBcEMsRUFBc0MsTUFBdEMsRUFIMEI7R0FBUDtFQUFmO0FBS0osT0FBTTtTQUFHLFlBQVksaUJBQU87QUFDNUIsT0FBSSxTQUFPLE1BQU0sQ0FBTixDQUFQLENBRHdCO0FBRTVCLFNBQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmLEVBRjRCO0FBRzVCLFNBQU0sTUFBTixDQUFhLENBQUMsSUFBRSxDQUFGLENBQUQsSUFBTyxNQUFNLE1BQU4sR0FBYSxDQUFiLENBQVAsRUFBdUIsQ0FBcEMsRUFBc0MsTUFBdEMsRUFINEI7R0FBUDtFQUFmO0FBS04sTUFBSztTQUFHLFlBQVksaUJBQU87QUFDM0IsT0FBSSxTQUFPLE1BQU0sQ0FBTixDQUFQLENBRHVCO0FBRTNCLFNBQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmLEVBRjJCO0FBRzNCLFNBQU0sT0FBTixDQUFjLE1BQWQsRUFIMkI7R0FBUDtFQUFmO0FBS0wsU0FBUTtTQUFHLFlBQVksaUJBQU87QUFDOUIsT0FBSSxTQUFPLE1BQU0sQ0FBTixDQUFQLENBRDBCO0FBRTlCLFNBQU0sTUFBTixDQUFhLENBQWIsRUFBZSxDQUFmLEVBRjhCO0FBRzlCLFNBQU0sSUFBTixDQUFXLE1BQVgsRUFIOEI7R0FBUDtFQUFmO0FBS1IsaUJBQWdCO1NBQUcsWUFBWSxpQkFBTztBQUN0QyxPQUFJLFNBQU8sTUFBTSxDQUFOLENBQVAsQ0FEa0M7QUFFdEMsVUFBTyxNQUFQLEdBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxNQUFQLENBRnFCO0dBQVA7RUFBZjtBQUloQixRQUFPO1NBQUcsVUFBQyxRQUFELEVBQVUsUUFBVixFQUFxQjtBQUMvQixVQUFPLFlBQVksVUFBQyxLQUFELEVBQU8sS0FBUCxFQUFlOztBQUVqQyxRQUFJLFFBQU0sTUFBTSxNQUFOLENBQWE7MkJBQUU7NENBQU07WUFBTSxNQUFNLE1BQU47S0FBZCxDQUFuQixDQUY2QjtBQUdqQyxRQUFHLE1BQU0sTUFBTixFQUFhO0FBQ2YsWUFBTyxTQUFLLGVBQUwsQ0FBcUIsS0FBckIsRUFBNEIsS0FBNUIsRUFBbUMsSUFBbkMsQ0FBd0MsYUFBRztBQUNqRCxZQUFNLE9BQU4sQ0FBYztjQUFHLEVBQUUsS0FBRixHQUFRLEVBQVI7T0FBSCxDQUFkLENBRGlEO0FBRWpELFlBQU0sUUFBTixHQUFlLElBQUksSUFBSixHQUFXLE9BQVgsRUFBZixDQUZpRDtNQUFILENBQS9DLENBRGU7S0FBaEIsTUFNQyxNQUFNLFFBQU4sR0FBZSxJQUFJLElBQUosR0FBVyxPQUFYLEVBQWYsQ0FORDtJQUhrQixDQUFaLENBVUosUUFWSSxFQVVLLFFBVkwsQ0FBUCxDQUQrQjtHQUFyQjtFQUFIO0NBekRJOztBQXdFTixJQUFNLDRCQUFRLFNBQVIsT0FBUSxHQUFvQztLQUFuQyw0RUFBTSxFQUFDLFNBQVEsQ0FBUixHQUE0Qjs7S0FBaEI7S0FBSyx3QkFBVzs7QUFDeEQsU0FBTyxJQUFQO0FBQ0EsT0FBUSxnQkFBUjtBQUNDLFVBQU8sRUFBQyxTQUFRLE9BQVIsRUFBUixDQUREO0FBRUEsU0FGQTtBQURBLEVBRHdEO0FBTXhELFFBQU8sS0FBUCxDQU53RDtDQUFwQzs7QUFTZCxJQUFNLGtDQUFXLFNBQVgsVUFBVztLQUFFO0tBQVU7S0FBTTtLQUFPO0tBQVM7UUFDdEQ7OztFQUVELFVBQUMsTUFBTTtBQUNOLE9BQUcsQ0FBQyxJQUFELEVBQU07QUFDUixXQUFPLHVEQUFQLENBRFE7SUFBVCxNQUVLO0FBQ0osUUFBSSxnQkFBYyxZQUFVLElBQVYsQ0FEZDtBQUVKLFFBQUcsYUFBSCxFQUFpQjtBQUNoQixTQUFJLGVBQWEsUUFBTSxLQUFOLENBREQ7QUFFaEIsU0FBRyxDQUFDLFlBQUQsRUFBYztBQUNoQixhQUNDOzs7T0FDQyx3REFBWSxTQUFTLE9BQVQsRUFBWixDQUREO09BRUUsVUFBVSxpRUFBVixHQUE2QixrREFBUyxTQUFTLElBQUksSUFBSixHQUFXLE1BQVgsRUFBVCxFQUFULENBQTdCO09BSEgsQ0FEZ0I7TUFBakIsTUFPSztBQUNKLGFBQU8sdURBQVAsQ0FESTtNQVBMO0tBRkQsTUFZSztBQUNKLFlBQ0M7OztNQUNDO0FBQ0MseUJBQ0M7O1VBQVksU0FBUztpQkFBRyxTQUFTLE9BQU8sS0FBUCxFQUFUO1VBQUgsRUFBckI7UUFDQyxxREFBVSxPQUFNLE9BQU4sRUFBVixDQUREO1FBREQ7QUFLQSx1QkFBYSxPQUFLLFFBQUwsV0FBYjtPQU5ELENBREQ7TUFTQyxrREFBUyxTQUFTLEVBQVQsRUFBVCxDQVREO01BREQsQ0FESTtLQVpMO0lBSkQ7R0FEQSxDQWlDRSxJQUFJLElBQUosR0FBVyxPQUFYLEVBakNILENBRkM7O0NBRG9COztrQkF5Q1Qsc0JBQWMsVUFBZCxFQUF5QixFQUFDLGdCQUFELEVBQXpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0ljb25CdXR0b24sIEF1dG9Db21wbGV0ZX0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIlxuaW1wb3J0IHtjb21wYWN0LCBFTlRJVElFU30gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGR9IGZyb20gXCIuLi9zZWxlY3RvclwiXG5cbmltcG9ydCB7RmFtaWx5LFRhc2t9IGZyb20gXCIuLi9kYlwiXG5cbmltcG9ydCBBcHBCYXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvYXBwLWJhclwiXG5pbXBvcnQge1Rhc2tQYWR9IGZyb20gXCIuL3Rhc2stcGFkXCJcbmltcG9ydCB7VGFza1BhZEVkaXRvcn0gZnJvbSBcIi4vdGFzay1wYWQtZWRpdG9yXCJcbmltcG9ydCB7VG9kb0VkaXRvcn0gZnJvbSBcIi4vdG9kby1lZGl0b3JcIlxuXG5pbXBvcnQgSWNvbkRvbmUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9maWxlL2Nsb3VkLWRvbmVcIlxuXG5pbXBvcnQgU2NvcmVQYWQgZnJvbSBcIi4vc2NvcmUtcGFkXCJcblxuY29uc3QgRE9NQUlOPVwidGltZVwiXG5cbmNvbnN0IGNoYW5nZVRvZG9zPWY9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdGlmKGNoaWxkLnRvZG9XZWVrPT11bmRlZmluZWQpXG5cdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblxuXHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXG5cdGxldCBoYW5kbGVkPWYoY2hpbGQudG9kb3M9Wy4uLnRvZG9zXSwgY2hpbGQpXG5cdGlmKCEoaGFuZGxlZCAmJiBoYW5kbGVkLnRoZW4pKVxuXHRcdGhhbmRsZWQ9UHJvbWlzZS5yZXNvbHZlKClcblx0cmV0dXJuIGhhbmRsZWQudGhlbihhPT5GYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdC50aGVuKHVwZGF0ZWQ9PmRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZSh1cGRhdGVkLCBGYW1pbHkuc2NoZW1hKS5lbnRpdGllcykpKSlcbn1cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0XHR0b2Rvcy5wdXNoKHRvZG8pXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKVxuXHRcdFx0XHRcdHRvZG9zLnB1c2goe2NvbnRlbnQ6dG9kb30pXG5cdFx0XHR9XG5cdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdH1cblx0LFJFTU9WRTogdG9kbz0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgaT10eXBlb2YodG9kbyk9PSdvYmplY3QnXG5cdFx0XHQ/IHRvZG9zLmZpbmRJbmRleChhPT5hLl9pZD10b2RvLl9pZClcblx0XHRcdDogdG9kb3MuZmluZEluZGV4KGE9PmEuY29udGVudD10b2RvKTtcblxuXHRcdGlmKGkhPS0xKVxuXHRcdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0fSlcblx0LFJFTU9WRV9CWV9JTkRFWDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9PnRvZG9zLnNwbGljZShpLDEpKVxuXHQsRE9ORTogKHRvZG8sZGF5KT0+Y2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdGNvbnN0IHRhc2s9dG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pXG5cdFx0bGV0IHtkb25lcz1bXX09dGFza1xuXHRcdGRvbmVzLnB1c2goZGF5KVxuXHRcdHRhc2suZG9uZXM9ZG9uZXNcblx0XHRjaGlsZC5zY29yZT1jaGlsZC5zY29yZSsxXG5cdFx0Y2hpbGQudG90YWxTY29yZT0oY2hpbGQudG90YWxTY29yZXx8MCkrMVxuXHR9KVxuXHQsRURJVElORzogKHN0YXR1cz0wKT0+KHt0eXBlOmAke0RPTUFJTn0vZWRpdGAsIHBheWxvYWQ6c3RhdHVzfSlcblx0LFVQOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaS0xKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsRE9XTjogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5zcGxpY2UoKGkrMSklKHRvZG9zLmxlbmd0aCsxKSwwLHRhcmdldClcblx0fSlcblx0LFRPUDogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy51bnNoaWZ0KHRhcmdldClcblx0fSlcblx0LEJPVFRPTTogaT0+Y2hhbmdlVG9kb3ModG9kb3M9Pntcblx0XHRsZXQgdGFyZ2V0PXRvZG9zW2ldXG5cdFx0dG9kb3Muc3BsaWNlKGksMSlcblx0XHR0b2Rvcy5wdXNoKHRhcmdldClcblx0fSlcblx0LFRPR0dMRV9WSVNJQkxFOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0YXJnZXQuaGlkZGVuPSEhIXRhcmdldC5oaWRkZW5cblx0fSlcblx0LFJFU0VUOiBhPT4oZGlzcGF0Y2gsZ2V0U3RhdGUpPT57XG5cdFx0cmV0dXJuIGNoYW5nZVRvZG9zKCh0b2RvcyxjaGlsZCk9Pntcblx0XHRcdC8vc2F2ZSBoaXN0b3J5XG5cdFx0XHRsZXQgZG9uZXM9dG9kb3MuZmlsdGVyKCh7ZG9uZXM9W119KT0+ZG9uZXMubGVuZ3RoKVxuXHRcdFx0aWYoZG9uZXMubGVuZ3RoKXtcblx0XHRcdFx0cmV0dXJuIFRhc2suZmluaXNoV2Vla1Rhc2tzKGNoaWxkLCBkb25lcykudGhlbihhPT57XG5cdFx0XHRcdFx0dG9kb3MuZm9yRWFjaChhPT5hLmRvbmVzPVtdKVxuXHRcdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZVxuXHRcdFx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXHRcdH0pKGRpc3BhdGNoLGdldFN0YXRlKVxuXHR9XG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyPShzdGF0ZT17ZWRpdGluZzowfSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlIGAke0RPTUFJTn0vZWRpdGA6XG5cdFx0cmV0dXJuIHtlZGl0aW5nOnBheWxvYWR9XG5cdGJyZWFrXG5cdH1cblx0cmV0dXJuIHN0YXRlXG59XG5cbmV4cG9ydCBjb25zdCBUaW1lTWFuYWdlPSh7ZGlzcGF0Y2gsIGdvYWwsIHNjb3JlLCBlZGl0aW5nLCB0b2RvV2Vla30pPT4oXG4gICAgPGRpdj5cblx0XHR7XG5cdFx0XHQod2Vlaz0+e1xuXHRcdFx0XHRpZighZ29hbCl7XG5cdFx0XHRcdFx0cmV0dXJuIDxTY29yZVBhZC8+XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGxldCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrXG5cdFx0XHRcdFx0aWYoaXNDdXJyZW50V2Vlayl7XG5cdFx0XHRcdFx0XHRsZXQgYWNjb21wbGlzaGVkPWdvYWw8PXNjb3JlXG5cdFx0XHRcdFx0XHRpZighYWNjb21wbGlzaGVkKXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0PFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxuXHRcdFx0XHRcdFx0XHRcdFx0e2VkaXRpbmcgPyA8VGFza1BhZEVkaXRvci8+IDogPFRhc2tQYWQgY3VycmVudD17bmV3IERhdGUoKS5nZXREYXkoKX0vPn1cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cdFxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDxTY29yZVBhZC8+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHQ8ZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxBcHBCYXJcblx0XHRcdFx0XHRcdFx0XHRcdGljb25FbGVtZW50UmlnaHQ9e1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8SWNvbkJ1dHRvbiBvbkNsaWNrPXtlPT5kaXNwYXRjaChBQ1RJT04uUkVTRVQoKSl9PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxJY29uRG9uZSBjb2xvcj1cIndoaXRlXCIvPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L0ljb25CdXR0b24+XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR0aXRsZT17YOS/neWtmOWJjSR7d2Vlay10b2RvV2Vla33lkajlrozmiJDmg4XlhrVgfVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQ8VGFza1BhZCBjdXJyZW50PXs5OX0vPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gXG5cdFx0XHR9KShuZXcgRGF0ZSgpLmdldFdlZWsoKSlcblx0XHR9XG4gICAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IE9iamVjdC5hc3NpZ24oVGltZU1hbmFnZSx7cmVkdWNlcn0pXG4iXX0=