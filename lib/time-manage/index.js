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
				title: "\u4FDD\u5B58\u524D" + (week - todoWeek) + "\u5468\u5B8C\u6210\u60C5\u51B5"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90aW1lLW1hbmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6WyJET01BSU4iLCJjaGFuZ2VUb2RvcyIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJzdGF0ZSIsImNoaWxkIiwidG9kb1dlZWsiLCJ1bmRlZmluZWQiLCJEYXRlIiwiZ2V0V2VlayIsInRvZG9zIiwiaGFuZGxlZCIsImYiLCJ0aGVuIiwicmVzb2x2ZSIsInVwc2VydCIsInVwZGF0ZWQiLCJzY2hlbWEiLCJlbnRpdGllcyIsIkFDVElPTiIsIkFERCIsInRvZG8iLCJwdXNoIiwiZmluZCIsImEiLCJjb250ZW50IiwiUkVNT1ZFIiwiaSIsImZpbmRJbmRleCIsIl9pZCIsInNwbGljZSIsIlJFTU9WRV9CWV9JTkRFWCIsIkRPTkUiLCJkYXkiLCJ0YXNrIiwiZG9uZXMiLCJzY29yZSIsInRvdGFsU2NvcmUiLCJFRElUSU5HIiwic3RhdHVzIiwidHlwZSIsInBheWxvYWQiLCJVUCIsInRhcmdldCIsImxlbmd0aCIsIkRPV04iLCJUT1AiLCJ1bnNoaWZ0IiwiQk9UVE9NIiwiVE9HR0xFX1ZJU0lCTEUiLCJoaWRkZW4iLCJSRVNFVCIsImZpbHRlciIsImZpbmlzaFdlZWtUYXNrcyIsImZvckVhY2giLCJyZWR1Y2VyIiwiZWRpdGluZyIsIlRpbWVNYW5hZ2UiLCJnb2FsIiwid2VlayIsImlzQ3VycmVudFdlZWsiLCJnZXREYXkiLCJTY29yZVBhZCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxTQUFPLE1BQWI7O0FBRUEsSUFBTUMsY0FBWSxTQUFaQSxXQUFZO0FBQUEsUUFBRyxVQUFDQyxRQUFELEVBQVVDLFFBQVYsRUFBcUI7QUFDekMsTUFBTUMsUUFBTUQsVUFBWjtBQUNBLE1BQU1FLFFBQU0sK0JBQWdCRCxLQUFoQixDQUFaO0FBQ0EsTUFBR0MsTUFBTUMsUUFBTixJQUFnQkMsU0FBbkIsRUFDQ0YsTUFBTUMsUUFBTixHQUFlLElBQUlFLElBQUosR0FBV0MsT0FBWCxFQUFmOztBQUp3QyxxQkFNMUJKLEtBTjBCLENBTXBDSyxLQU5vQztBQUFBLE1BTXBDQSxLQU5vQyxnQ0FNOUIsRUFOOEI7OztBQVF6QyxNQUFJQyxVQUFRQyxFQUFFUCxNQUFNSyxLQUFOLDhDQUFnQkEsS0FBaEIsRUFBRixFQUEwQkwsS0FBMUIsQ0FBWjtBQUNBLE1BQUcsRUFBRU0sV0FBV0EsUUFBUUUsSUFBckIsQ0FBSCxFQUNDRixVQUFRLGtCQUFRRyxPQUFSLEVBQVI7QUFDRCxTQUFPSCxRQUFRRSxJQUFSLENBQWE7QUFBQSxVQUFHLFdBQU9FLE1BQVAsQ0FBY1YsS0FBZCxFQUNyQlEsSUFEcUIsQ0FDaEI7QUFBQSxXQUFTWCxTQUFTLHVCQUFTLDBCQUFVYyxPQUFWLEVBQW1CLFdBQU9DLE1BQTFCLEVBQWtDQyxRQUEzQyxDQUFULENBQVQ7QUFBQSxJQURnQixDQUFIO0FBQUEsR0FBYixDQUFQO0FBRUEsRUFiaUI7QUFBQSxDQUFsQjtBQWNPLElBQU1DLDBCQUFPO0FBQ25CQyxNQUFLO0FBQUEsU0FBTSxVQUFDbEIsUUFBRCxFQUFXQyxRQUFYLEVBQXNCO0FBQ2hDLE9BQUcsQ0FBQ2tCLElBQUosRUFDQyxPQUFPLGtCQUFRUCxPQUFSLEVBQVA7QUFDRCxVQUFPYixZQUFZLGlCQUFPO0FBQ3pCLG1CQUFjb0IsSUFBZCx1REFBY0EsSUFBZDtBQUNBLFVBQUssUUFBTDtBQUNDWCxZQUFNWSxJQUFOLENBQVdELElBQVg7QUFDQTtBQUNEO0FBQ0MsVUFBRyxDQUFDWCxNQUFNYSxJQUFOLENBQVc7QUFBQSxjQUFHQyxFQUFFQyxPQUFGLElBQVdKLElBQWQ7QUFBQSxPQUFYLENBQUosRUFDQ1gsTUFBTVksSUFBTixDQUFXLEVBQUNHLFNBQVFKLElBQVQsRUFBWDtBQU5GO0FBUUEsSUFUTSxFQVNKbkIsUUFUSSxFQVNLQyxRQVRMLENBQVA7QUFVQSxHQWJJO0FBQUEsRUFEYztBQWVsQnVCLFNBQVE7QUFBQSxTQUFNekIsWUFBWSxpQkFBTztBQUNqQyxPQUFJMEIsSUFBRSxRQUFPTixJQUFQLHVEQUFPQSxJQUFQLE1BQWMsUUFBZCxHQUNIWCxNQUFNa0IsU0FBTixDQUFnQjtBQUFBLFdBQUdKLEVBQUVLLEdBQUYsR0FBTVIsS0FBS1EsR0FBZDtBQUFBLElBQWhCLENBREcsR0FFSG5CLE1BQU1rQixTQUFOLENBQWdCO0FBQUEsV0FBR0osRUFBRUMsT0FBRixHQUFVSixJQUFiO0FBQUEsSUFBaEIsQ0FGSDs7QUFJQSxPQUFHTSxLQUFHLENBQUMsQ0FBUCxFQUNDakIsTUFBTW9CLE1BQU4sQ0FBYUgsQ0FBYixFQUFlLENBQWY7QUFDRCxHQVBjLENBQU47QUFBQSxFQWZVO0FBdUJsQkksa0JBQWlCO0FBQUEsU0FBRzlCLFlBQVk7QUFBQSxVQUFPUyxNQUFNb0IsTUFBTixDQUFhSCxDQUFiLEVBQWUsQ0FBZixDQUFQO0FBQUEsR0FBWixDQUFIO0FBQUEsRUF2QkM7QUF3QmxCSyxPQUFNLGNBQUNYLElBQUQsRUFBTVksR0FBTjtBQUFBLFNBQVloQyxZQUFZLFVBQUNTLEtBQUQsRUFBT0wsS0FBUCxFQUFlO0FBQzdDLE9BQU02QixPQUFLeEIsTUFBTWEsSUFBTixDQUFXO0FBQUEsV0FBR0MsRUFBRUMsT0FBRixJQUFXSixJQUFkO0FBQUEsSUFBWCxDQUFYO0FBRDZDLHFCQUU5QmEsSUFGOEIsQ0FFeENDLEtBRndDO0FBQUEsT0FFeENBLEtBRndDLCtCQUVsQyxFQUZrQzs7QUFHN0NBLFNBQU1iLElBQU4sQ0FBV1csR0FBWDtBQUNBQyxRQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTlCLFNBQU0rQixLQUFOLEdBQVkvQixNQUFNK0IsS0FBTixHQUFZLENBQXhCO0FBQ0EvQixTQUFNZ0MsVUFBTixHQUFpQixDQUFDaEMsTUFBTWdDLFVBQU4sSUFBa0IsQ0FBbkIsSUFBc0IsQ0FBdkM7QUFDQSxHQVBrQixDQUFaO0FBQUEsRUF4Qlk7QUFnQ2xCQyxVQUFTO0FBQUEsTUFBQ0MsTUFBRCx1RUFBUSxDQUFSO0FBQUEsU0FBYSxFQUFDQyxNQUFReEMsTUFBUixVQUFELEVBQXdCeUMsU0FBUUYsTUFBaEMsRUFBYjtBQUFBLEVBaENTO0FBaUNsQkcsS0FBSTtBQUFBLFNBQUd6QyxZQUFZLGlCQUFPO0FBQzFCLE9BQUkwQyxTQUFPakMsTUFBTWlCLENBQU4sQ0FBWDtBQUNBakIsU0FBTW9CLE1BQU4sQ0FBYUgsQ0FBYixFQUFlLENBQWY7QUFDQWpCLFNBQU1vQixNQUFOLENBQWEsQ0FBQ0gsSUFBRSxDQUFILEtBQU9qQixNQUFNa0MsTUFBTixHQUFhLENBQXBCLENBQWIsRUFBb0MsQ0FBcEMsRUFBc0NELE1BQXRDO0FBQ0EsR0FKTyxDQUFIO0FBQUEsRUFqQ2M7QUFzQ2xCRSxPQUFNO0FBQUEsU0FBRzVDLFlBQVksaUJBQU87QUFDNUIsT0FBSTBDLFNBQU9qQyxNQUFNaUIsQ0FBTixDQUFYO0FBQ0FqQixTQUFNb0IsTUFBTixDQUFhSCxDQUFiLEVBQWUsQ0FBZjtBQUNBakIsU0FBTW9CLE1BQU4sQ0FBYSxDQUFDSCxJQUFFLENBQUgsS0FBT2pCLE1BQU1rQyxNQUFOLEdBQWEsQ0FBcEIsQ0FBYixFQUFvQyxDQUFwQyxFQUFzQ0QsTUFBdEM7QUFDQSxHQUpTLENBQUg7QUFBQSxFQXRDWTtBQTJDbEJHLE1BQUs7QUFBQSxTQUFHN0MsWUFBWSxpQkFBTztBQUMzQixPQUFJMEMsU0FBT2pDLE1BQU1pQixDQUFOLENBQVg7QUFDQWpCLFNBQU1vQixNQUFOLENBQWFILENBQWIsRUFBZSxDQUFmO0FBQ0FqQixTQUFNcUMsT0FBTixDQUFjSixNQUFkO0FBQ0EsR0FKUSxDQUFIO0FBQUEsRUEzQ2E7QUFnRGxCSyxTQUFRO0FBQUEsU0FBRy9DLFlBQVksaUJBQU87QUFDOUIsT0FBSTBDLFNBQU9qQyxNQUFNaUIsQ0FBTixDQUFYO0FBQ0FqQixTQUFNb0IsTUFBTixDQUFhSCxDQUFiLEVBQWUsQ0FBZjtBQUNBakIsU0FBTVksSUFBTixDQUFXcUIsTUFBWDtBQUNBLEdBSlcsQ0FBSDtBQUFBLEVBaERVO0FBcURsQk0saUJBQWdCO0FBQUEsU0FBR2hELFlBQVksaUJBQU87QUFDdEMsT0FBSTBDLFNBQU9qQyxNQUFNaUIsQ0FBTixDQUFYO0FBQ0FnQixVQUFPTyxNQUFQLEdBQWMsQ0FBQyxDQUFDLENBQUNQLE9BQU9PLE1BQXhCO0FBQ0EsR0FIbUIsQ0FBSDtBQUFBLEVBckRFO0FBeURsQkMsUUFBTztBQUFBLFNBQUcsVUFBQ2pELFFBQUQsRUFBVUMsUUFBVixFQUFxQjtBQUMvQixVQUFPRixZQUFZLFVBQUNTLEtBQUQsRUFBT0wsS0FBUCxFQUFlO0FBQ2pDO0FBQ0EsUUFBSThCLFFBQU16QixNQUFNMEMsTUFBTixDQUFhO0FBQUEsMkJBQUVqQixLQUFGO0FBQUEsU0FBRUEsS0FBRiw4QkFBUSxFQUFSO0FBQUEsWUFBY0EsTUFBTVMsTUFBcEI7QUFBQSxLQUFiLENBQVY7QUFDQSxRQUFHVCxNQUFNUyxNQUFULEVBQWdCO0FBQ2YsWUFBTyxTQUFLUyxlQUFMLENBQXFCaEQsS0FBckIsRUFBNEI4QixLQUE1QixFQUFtQ3RCLElBQW5DLENBQXdDLGFBQUc7QUFDakRILFlBQU00QyxPQUFOLENBQWM7QUFBQSxjQUFHOUIsRUFBRVcsS0FBRixHQUFRLEVBQVg7QUFBQSxPQUFkO0FBQ0E5QixZQUFNQyxRQUFOLEdBQWUsSUFBSUUsSUFBSixHQUFXQyxPQUFYLEVBQWY7QUFDQSxNQUhNLENBQVA7QUFJQSxLQUxELE1BTUNKLE1BQU1DLFFBQU4sR0FBZSxJQUFJRSxJQUFKLEdBQVdDLE9BQVgsRUFBZjtBQUNELElBVk0sRUFVSlAsUUFWSSxFQVVLQyxRQVZMLENBQVA7QUFXQSxHQVpPO0FBQUE7QUF6RFcsQ0FBYjs7QUF3RUEsSUFBTW9ELDRCQUFRLFNBQVJBLE9BQVEsR0FBb0M7QUFBQSxLQUFuQ25ELEtBQW1DLHVFQUE3QixFQUFDb0QsU0FBUSxDQUFULEVBQTZCO0FBQUE7QUFBQSxLQUFoQmhCLElBQWdCLFNBQWhCQSxJQUFnQjtBQUFBLEtBQVhDLE9BQVcsU0FBWEEsT0FBVzs7QUFDeEQsU0FBT0QsSUFBUDtBQUNBLE9BQVF4QyxNQUFSO0FBQ0MsVUFBTyxFQUFDd0QsU0FBUWYsT0FBVCxFQUFQO0FBQ0Q7QUFIQTtBQUtBLFFBQU9yQyxLQUFQO0FBQ0EsQ0FQTTs7QUFTQSxJQUFNcUQsa0NBQVcsU0FBWEEsVUFBVztBQUFBLEtBQUV2RCxRQUFGLFNBQUVBLFFBQUY7QUFBQSxLQUFZd0QsSUFBWixTQUFZQSxJQUFaO0FBQUEsS0FBa0J0QixLQUFsQixTQUFrQkEsS0FBbEI7QUFBQSxLQUF5Qm9CLE9BQXpCLFNBQXlCQSxPQUF6QjtBQUFBLEtBQWtDbEQsUUFBbEMsU0FBa0NBLFFBQWxDO0FBQUEsd0JBQTRDcUQsSUFBNUM7QUFBQSxLQUE0Q0EsSUFBNUMsOEJBQWlELElBQUluRCxJQUFKLEdBQVdDLE9BQVgsRUFBakQ7QUFBQSxpQ0FBdUVtRCxhQUF2RTtBQUFBLEtBQXVFQSxhQUF2RSx1Q0FBcUZ0RCxZQUFVcUQsSUFBL0Y7QUFBQSxRQUNwQjtBQUFBO0FBQUE7QUFDREQsVUFBUUEsT0FBS3RCLEtBQWIsR0FDQztBQUFBO0FBQUE7QUFDT3dCLG1CQUNKLHdEQUFZLFNBQVNKLE9BQXJCLEdBREksR0FFSjtBQUNELHNCQUNDO0FBQUE7QUFBQSxPQUFZLFNBQVM7QUFBQSxjQUFHdEQsU0FBU2lCLE9BQU9nQyxLQUFQLEVBQVQsQ0FBSDtBQUFBLE9BQXJCO0FBQ0MsMERBQVUsT0FBTSxPQUFoQjtBQURELEtBRkE7QUFNRCxtQ0FBYVEsT0FBS3JELFFBQWxCO0FBTkMsS0FISDtBQWFPc0Qsb0JBQWVKLE9BQWYsR0FDSixpRUFESSxHQUVKLGtEQUFTLFNBQVNJLGdCQUFnQixJQUFJcEQsSUFBSixHQUFXcUQsTUFBWCxFQUFoQixHQUFzQyxDQUFDLENBQXpEO0FBZkgsR0FERCxHQWtCVSw4QkFBQyxRQUFELElBQVUsUUFBUSxHQUFsQjtBQW5CVCxFQURvQjtBQUFBLENBQWpCOztBQXlCUCxJQUFNQyxXQUFTLHlCQUFRO0FBQUEsUUFBTyxzQkFBUSwrQkFBZ0IxRCxLQUFoQixDQUFSLEVBQStCLE9BQS9CLEVBQXVDLE1BQXZDLEVBQThDLE1BQTlDLENBQVA7QUFBQSxDQUFSLEVBQXNFO0FBQUEsUUFBTyxrREFBVzJELEtBQVgsQ0FBUDtBQUFBLENBQXRFLENBQWY7O2tCQUVlLHNCQUFjTixVQUFkLEVBQXlCLEVBQUNGLGdCQUFELEVBQXpCLEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7SWNvbkJ1dHRvbiwgQXV0b0NvbXBsZXRlfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2NvbXBhY3QsIEVOVElUSUVTfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQge2dldEN1cnJlbnRDaGlsZH0gZnJvbSBcIi4uL3NlbGVjdG9yXCJcblxuaW1wb3J0IHtGYW1pbHksVGFza30gZnJvbSBcIi4uL2RiXCJcblxuaW1wb3J0IEFwcEJhciBmcm9tIFwiLi4vY29tcG9uZW50cy9hcHAtYmFyXCJcbmltcG9ydCB7VGFza1BhZH0gZnJvbSBcIi4vdGFzay1wYWRcIlxuaW1wb3J0IHtUYXNrUGFkRWRpdG9yfSBmcm9tIFwiLi90YXNrLXBhZC1lZGl0b3JcIlxuaW1wb3J0IHtUb2RvRWRpdG9yfSBmcm9tIFwiLi90b2RvLWVkaXRvclwiXG5cbmltcG9ydCBJY29uRG9uZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ZpbGUvY2xvdWQtZG9uZVwiXG5cbmltcG9ydCBTY29yZSBmcm9tIFwiLi9zY29yZS1wYWRcIlxuXG5jb25zdCBET01BSU49XCJ0aW1lXCJcblxuY29uc3QgY2hhbmdlVG9kb3M9Zj0+KGRpc3BhdGNoLGdldFN0YXRlKT0+e1xuXHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0aWYoY2hpbGQudG9kb1dlZWs9PXVuZGVmaW5lZClcblx0XHRjaGlsZC50b2RvV2Vlaz1uZXcgRGF0ZSgpLmdldFdlZWsoKVxuXG5cdGxldCB7dG9kb3M9W119PWNoaWxkXG5cblx0bGV0IGhhbmRsZWQ9ZihjaGlsZC50b2Rvcz1bLi4udG9kb3NdLCBjaGlsZClcblx0aWYoIShoYW5kbGVkICYmIGhhbmRsZWQudGhlbikpXG5cdFx0aGFuZGxlZD1Qcm9taXNlLnJlc29sdmUoKVxuXHRyZXR1cm4gaGFuZGxlZC50aGVuKGE9PkZhbWlseS51cHNlcnQoY2hpbGQpXG5cdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpKVxufVxuZXhwb3J0IGNvbnN0IEFDVElPTj17XG5cdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRpZighdG9kbylcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdHJldHVybiBjaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0XHRjYXNlIFwib2JqZWN0XCI6XG5cdFx0XHRcdHRvZG9zLnB1c2godG9kbylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGlmKCF0b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbykpXG5cdFx0XHRcdFx0dG9kb3MucHVzaCh7Y29udGVudDp0b2RvfSlcblx0XHRcdH1cblx0XHR9KShkaXNwYXRjaCxnZXRTdGF0ZSlcblx0fVxuXHQsUkVNT1ZFOiB0b2RvPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCBpPXR5cGVvZih0b2RvKT09J29iamVjdCdcblx0XHRcdD8gdG9kb3MuZmluZEluZGV4KGE9PmEuX2lkPXRvZG8uX2lkKVxuXHRcdFx0OiB0b2Rvcy5maW5kSW5kZXgoYT0+YS5jb250ZW50PXRvZG8pO1xuXG5cdFx0aWYoaSE9LTEpXG5cdFx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHR9KVxuXHQsUkVNT1ZFX0JZX0lOREVYOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+dG9kb3Muc3BsaWNlKGksMSkpXG5cdCxET05FOiAodG9kbyxkYXkpPT5jaGFuZ2VUb2RvcygodG9kb3MsY2hpbGQpPT57XG5cdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcblx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0ZG9uZXMucHVzaChkYXkpXG5cdFx0dGFzay5kb25lcz1kb25lc1xuXHRcdGNoaWxkLnNjb3JlPWNoaWxkLnNjb3JlKzFcblx0XHRjaGlsZC50b3RhbFNjb3JlPShjaGlsZC50b3RhbFNjb3JlfHwwKSsxXG5cdH0pXG5cdCxFRElUSU5HOiAoc3RhdHVzPTApPT4oe3R5cGU6YCR7RE9NQUlOfS9lZGl0YCwgcGF5bG9hZDpzdGF0dXN9KVxuXHQsVVA6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRvZG9zLnNwbGljZShpLDEpXG5cdFx0dG9kb3Muc3BsaWNlKChpLTEpJSh0b2Rvcy5sZW5ndGgrMSksMCx0YXJnZXQpXG5cdH0pXG5cdCxET1dOOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnNwbGljZSgoaSsxKSUodG9kb3MubGVuZ3RoKzEpLDAsdGFyZ2V0KVxuXHR9KVxuXHQsVE9QOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnVuc2hpZnQodGFyZ2V0KVxuXHR9KVxuXHQsQk9UVE9NOiBpPT5jaGFuZ2VUb2Rvcyh0b2Rvcz0+e1xuXHRcdGxldCB0YXJnZXQ9dG9kb3NbaV1cblx0XHR0b2Rvcy5zcGxpY2UoaSwxKVxuXHRcdHRvZG9zLnB1c2godGFyZ2V0KVxuXHR9KVxuXHQsVE9HR0xFX1ZJU0lCTEU6IGk9PmNoYW5nZVRvZG9zKHRvZG9zPT57XG5cdFx0bGV0IHRhcmdldD10b2Rvc1tpXVxuXHRcdHRhcmdldC5oaWRkZW49ISEhdGFyZ2V0LmhpZGRlblxuXHR9KVxuXHQsUkVTRVQ6IGE9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRyZXR1cm4gY2hhbmdlVG9kb3MoKHRvZG9zLGNoaWxkKT0+e1xuXHRcdFx0Ly9zYXZlIGhpc3Rvcnlcblx0XHRcdGxldCBkb25lcz10b2Rvcy5maWx0ZXIoKHtkb25lcz1bXX0pPT5kb25lcy5sZW5ndGgpXG5cdFx0XHRpZihkb25lcy5sZW5ndGgpe1xuXHRcdFx0XHRyZXR1cm4gVGFzay5maW5pc2hXZWVrVGFza3MoY2hpbGQsIGRvbmVzKS50aGVuKGE9Pntcblx0XHRcdFx0XHR0b2Rvcy5mb3JFYWNoKGE9PmEuZG9uZXM9W10pXG5cdFx0XHRcdFx0Y2hpbGQudG9kb1dlZWs9bmV3IERhdGUoKS5nZXRXZWVrKClcblx0XHRcdFx0fSlcblx0XHRcdH1lbHNlXG5cdFx0XHRcdGNoaWxkLnRvZG9XZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpXG5cdFx0fSkoZGlzcGF0Y2gsZ2V0U3RhdGUpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZHVjZXI9KHN0YXRlPXtlZGl0aW5nOjB9LHt0eXBlLHBheWxvYWR9KT0+e1xuXHRzd2l0Y2godHlwZSl7XG5cdGNhc2UgYCR7RE9NQUlOfS9lZGl0YDpcblx0XHRyZXR1cm4ge2VkaXRpbmc6cGF5bG9hZH1cblx0YnJlYWtcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHtkaXNwYXRjaCwgZ29hbCwgc2NvcmUsIGVkaXRpbmcsIHRvZG9XZWVrLCB3ZWVrPW5ldyBEYXRlKCkuZ2V0V2VlaygpLCBpc0N1cnJlbnRXZWVrPXRvZG9XZWVrPT13ZWVrfSk9PihcbiAgICA8ZGl2PlxuXHRcdHtnb2FsICYmIGdvYWw+c2NvcmUgP1xuXHRcdFx0KDxkaXY+XG5cdFx0ICAgICAgICB7aXNDdXJyZW50V2Vla1xuXHRcdFx0XHRcdD8gPFRvZG9FZGl0b3IgZWRpdGluZz17ZWRpdGluZ30vPlxuXHRcdFx0XHRcdDogPEFwcEJhclxuXHRcdFx0XHRcdFx0aWNvbkVsZW1lbnRSaWdodD17XG5cdFx0XHRcdFx0XHRcdDxJY29uQnV0dG9uIG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5SRVNFVCgpKX0+XG5cdFx0XHRcdFx0XHRcdFx0PEljb25Eb25lIGNvbG9yPVwid2hpdGVcIi8+XG5cdFx0XHRcdFx0XHRcdDwvSWNvbkJ1dHRvbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRpdGxlPXtg5L+d5a2Y5YmNJHt3ZWVrLXRvZG9XZWVrfeWRqOWujOaIkOaDheWGtWB9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHR9XG5cblx0XHQgICAgICAgIHtpc0N1cnJlbnRXZWVrJiZlZGl0aW5nXG5cdFx0XHRcdFx0PyA8VGFza1BhZEVkaXRvci8+XG5cdFx0XHRcdFx0OiA8VGFza1BhZCBjdXJyZW50PXtpc0N1cnJlbnRXZWVrID8gbmV3IERhdGUoKS5nZXREYXkoKSA6IC0xfS8+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PikgOiA8U2NvcmVQYWQgaGVpZ2h0PXsxMDB9Lz5cblx0XHR9XG4gICAgPC9kaXY+XG4pXG5cbmNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKShwcm9wcz0+PFNjb3JlIHsuLi5wcm9wc30vPilcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihUaW1lTWFuYWdlLHtyZWR1Y2VyfSlcbiJdfQ==