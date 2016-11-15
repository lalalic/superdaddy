"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeManage = exports.ACTION = undefined;

var _objectDestructuringEmpty2 = require("babel-runtime/helpers/objectDestructuringEmpty");

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _Table = require("material-ui/Table");

var _reactRedux = require("react-redux");

var _qiliApp = require("qili-app");

var _normalizr = require("normalizr");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _selector = require("./selector");

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty;
var ACTION = exports.ACTION = {
	ADD: function ADD(todo) {
		return function (dispatch, getState) {
			if (!todo) return _promise2.default.resolve();
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos = child.todos,
			    todos = _child$todos === undefined ? [] : _child$todos;

			switch (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) {
				case "object":
					child.todos = [].concat((0, _toConsumableArray3.default)(todos), [todo]);
					break;
				default:
					if (!todos.find(function (a) {
						return a.content == todo;
					})) child.todos = [].concat((0, _toConsumableArray3.default)(todos), [{ content: todo }]);
			}
			if (child.todos != todos) {
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			} else {
				return _promise2.default.resolve();
			}
		};
	},
	REMOVE: function REMOVE(todo) {
		return function (dispatch, getState) {
			if (!todo) return _promise2.default.resolve();
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var _child$todos2 = child.todos,
			    todos = _child$todos2 === undefined ? [] : _child$todos2;

			switch (typeof todo === "undefined" ? "undefined" : (0, _typeof3.default)(todo)) {
				case "object":
					child.todos = todos.filter(function (a) {
						return a._id != todo._id;
					});
					break;
				default:
					child.todos = todos.filter(function (a) {
						return a.content != todo;
					});
			}

			if (child.todos != todos) {
				return _db.Family.upsert(child).then(function (updated) {
					return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
				});
			} else {
				return _promise2.default.resolve();
			}
		};
	},
	DONE: function DONE(todo, day) {
		return function (dispatch, getState) {
			var state = getState();
			var child = (0, _selector.getCurrentChild)(state);
			var todos = child.todos;

			var task = todos.find(function (a) {
				return a.content == todo;
			});
			var _task$dones = task.dones,
			    dones = _task$dones === undefined ? [] : _task$dones;

			dones.push(day);
			task.dones = dones;
			child.todos = [].concat((0, _toConsumableArray3.default)(todos));
			return _db.Family.upsert(child).then(function (updated) {
				return dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(updated, _db.Family.schema).entities));
			});
		};
	}
};

var TimeManage = exports.TimeManage = function TimeManage(_ref) {
	(0, _objectDestructuringEmpty3.default)(_ref);
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"center",
			null,
			_react2.default.createElement(TodoEditor, null)
		),
		_react2.default.createElement(TaskPad, null),
		_react2.default.createElement(ScorePad, null)
	);
};

var TodoEditor = (0, _reactRedux.connect)()(function (_ref2) {
	var dispatch = _ref2.dispatch,
	    refTask = _ref2.refTask,
	    refForm = _ref2.refForm;
	return _react2.default.createElement(
		"form",
		{ ref: function ref(a) {
				return refForm = a;
			}, className: "grid", onSubmit: function onSubmit(e) {
				e.preventDefault();
				dispatch(ACTION.ADD(refTask.getValue().trim()));
				return false;
			} },
		_react2.default.createElement(_materialUi.TextField, { ref: function ref(a) {
				return refTask = a;
			}, floatingLabelText: "任务" }),
		_react2.default.createElement(_materialUi.FlatButton, { label: "添加", onClick: function onClick(e) {
				return refForm.submit();
			} })
	);
});

var TaskPad = (0, _reactRedux.connect)(function (state) {
	return { todos: (0, _selector.getCurrentChildTasks)(state) };
})(function (_ref3) {
	var _ref3$todos = _ref3.todos,
	    todos = _ref3$todos === undefined ? [] : _ref3$todos;
	return _react2.default.createElement(
		_Table.Table,
		null,
		_react2.default.createElement(
			_Table.TableHeader,
			{ displaySelectAll: false, adjustForCheckbox: false },
			_react2.default.createElement(
				_Table.TableRow,
				null,
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"任务\\星期"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"日"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"一"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"二"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"三"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"四"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"五"
				),
				_react2.default.createElement(
					_Table.TableHeaderColumn,
					null,
					"六"
				)
			)
		),
		_react2.default.createElement(
			_Table.TableBody,
			{ displayRowCheckbox: false },
			todos.map(function (_ref4, i) {
				var task = _ref4.content,
				    _ref4$dones = _ref4.dones,
				    dones = _ref4$dones === undefined ? [] : _ref4$dones;
				return _react2.default.createElement(
					_Table.TableRow,
					{ key: i },
					_react2.default.createElement(
						_Table.TableRowColumn,
						null,
						task
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(0), day: 0 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(1), day: 1 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(2), day: 2 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(3), day: 3 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(4), day: 4 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(5), day: 5 })
					),
					_react2.default.createElement(
						_Table.TableHeaderColumn,
						null,
						_react2.default.createElement(TodoStatus, { todo: task, done: -1 != dones.indexOf(6), day: 6 })
					)
				);
			})
		)
	);
});

var TodoStatus = (0, _reactRedux.connect)()(function (_ref5) {
	var todo = _ref5.todo,
	    done = _ref5.done,
	    day = _ref5.day,
	    dispatch = _ref5.dispatch,
	    _ref5$current = _ref5.current,
	    current = _ref5$current === undefined ? new Date().getDay() : _ref5$current;

	if (done) return _react2.default.createElement(_mood2.default, { color: "yellow" });else if (day > current) return _react2.default.createElement(_mood2.default, { color: "lightgray" });else return _react2.default.createElement(_mood2.default, { color: "lightcyan", hoverColor: "yellow", onClick: function onClick(e) {
			return dispatch(ACTION.DONE(todo, day));
		} });
});

var ScorePad = (0, _reactRedux.connect)(function (state) {
	return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "score", "goal", "todo");
})(function (_ref6) {
	var score = _ref6.score,
	    goal = _ref6.goal,
	    todo = _ref6.todo;
	return _react2.default.createElement(Empty, { icon: _react2.default.createElement(_mood2.default, { color: "yellow" }), text: score + "/" + goal });
});

exports.default = TimeManage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztJQUVPO0FBRUEsSUFBTSwwQkFBTztBQUNuQixNQUFLO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFzQjtBQUNoQyxPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sa0JBQVEsT0FBUixFQUFQLENBREQ7QUFFQSxPQUFNLFFBQU0sVUFBTixDQUgwQjtBQUloQyxPQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FKMEI7c0JBS2pCLE1BQVY7NENBQU0sa0JBTHFCOztBQU1oQyxrQkFBYyxnRUFBZDtBQUNBLFNBQUssUUFBTDtBQUNDLFdBQU0sS0FBTiw4Q0FBZ0IsU0FBTyxNQUF2QixDQUREO0FBRUMsV0FGRDtBQURBO0FBS0MsU0FBRyxDQUFDLE1BQU0sSUFBTixDQUFXO2FBQUcsRUFBRSxPQUFGLElBQVcsSUFBWDtNQUFILENBQVosRUFDRixNQUFNLEtBQU4sOENBQWdCLFNBQU8sRUFBQyxTQUFRLElBQVIsSUFBeEIsQ0FERDtBQUxELElBTmdDO0FBY2hDLE9BQUcsTUFBTSxLQUFOLElBQWEsS0FBYixFQUFtQjtBQUNyQixXQUFPLFdBQU8sTUFBUCxDQUFjLEtBQWQsRUFDTCxJQURLLENBQ0E7WUFBUyxTQUFTLHVCQUFTLDBCQUFVLE9BQVYsRUFBbUIsV0FBTyxNQUFQLENBQW5CLENBQWtDLFFBQWxDLENBQWxCO0tBQVQsQ0FEUCxDQURxQjtJQUF0QixNQUdLO0FBQ0osV0FBTyxrQkFBUSxPQUFSLEVBQVAsQ0FESTtJQUhMO0dBZFU7RUFBTjtBQXFCSixTQUFRO1NBQU0sVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFzQjtBQUNwQyxPQUFHLENBQUMsSUFBRCxFQUNGLE9BQU8sa0JBQVEsT0FBUixFQUFQLENBREQ7QUFFQSxPQUFNLFFBQU0sVUFBTixDQUg4QjtBQUlwQyxPQUFNLFFBQU0sK0JBQWdCLEtBQWhCLENBQU4sQ0FKOEI7dUJBS3JCLE1BQVY7NkNBQU0sbUJBTHlCOztBQU1wQyxrQkFBYyxnRUFBZDtBQUNBLFNBQUssUUFBTDtBQUNDLFdBQU0sS0FBTixHQUFZLE1BQU0sTUFBTixDQUFhO2FBQUcsRUFBRSxHQUFGLElBQU8sS0FBSyxHQUFMO01BQVYsQ0FBekIsQ0FERDtBQUVDLFdBRkQ7QUFEQTtBQUtDLFdBQU0sS0FBTixHQUFZLE1BQU0sTUFBTixDQUFhO2FBQUcsRUFBRSxPQUFGLElBQVcsSUFBWDtNQUFILENBQXpCLENBREQ7QUFKQSxJQU5vQzs7QUFjcEMsT0FBRyxNQUFNLEtBQU4sSUFBYSxLQUFiLEVBQW1CO0FBQ3JCLFdBQU8sV0FBTyxNQUFQLENBQWMsS0FBZCxFQUNMLElBREssQ0FDQTtZQUFTLFNBQVMsdUJBQVMsMEJBQVUsT0FBVixFQUFtQixXQUFPLE1BQVAsQ0FBbkIsQ0FBa0MsUUFBbEMsQ0FBbEI7S0FBVCxDQURQLENBRHFCO0lBQXRCLE1BR0s7QUFDSixXQUFPLGtCQUFRLE9BQVIsRUFBUCxDQURJO0lBSEw7R0FkYztFQUFOO0FBcUJSLE9BQU0sY0FBQyxJQUFELEVBQU0sR0FBTjtTQUFZLFVBQUMsUUFBRCxFQUFXLFFBQVgsRUFBc0I7QUFDeEMsT0FBTSxRQUFNLFVBQU4sQ0FEa0M7QUFFeEMsT0FBTSxRQUFNLCtCQUFnQixLQUFoQixDQUFOLENBRmtDO09BR2pDLFFBQU8sTUFBUCxNQUhpQzs7QUFJeEMsT0FBTSxPQUFLLE1BQU0sSUFBTixDQUFXO1dBQUcsRUFBRSxPQUFGLElBQVcsSUFBWDtJQUFILENBQWhCLENBSmtDO3FCQUt6QixLQUFWOzJDQUFNLGlCQUw2Qjs7QUFNeEMsU0FBTSxJQUFOLENBQVcsR0FBWCxFQU53QztBQU94QyxRQUFLLEtBQUwsR0FBVyxLQUFYLENBUHdDO0FBUXhDLFNBQU0sS0FBTiw4Q0FBZ0IsT0FBaEIsQ0FSd0M7QUFTeEMsVUFBTyxXQUFPLE1BQVAsQ0FBYyxLQUFkLEVBQ0osSUFESSxDQUNDO1dBQVMsU0FBUyx1QkFBUywwQkFBVSxPQUFWLEVBQW1CLFdBQU8sTUFBUCxDQUFuQixDQUFrQyxRQUFsQyxDQUFsQjtJQUFULENBRFIsQ0FUd0M7R0FBdEI7RUFBWjtDQTNDSzs7QUF5RE4sSUFBTSxrQ0FBVyxTQUFYLFVBQVc7O1FBQ3BCOzs7RUFDSTs7O0dBQVEsOEJBQUMsVUFBRCxPQUFSO0dBREo7RUFHSSw4QkFBQyxPQUFELE9BSEo7RUFLSSw4QkFBQyxRQUFELE9BTEo7O0NBRG9COztBQVV4QixJQUFNLGFBQVcsMkJBQVU7S0FBRTtLQUFVO0tBQVM7UUFDNUM7O0lBQU0sS0FBSztXQUFHLFVBQVEsQ0FBUjtJQUFILEVBQWMsV0FBVSxNQUFWLEVBQWlCLFVBQVUscUJBQUc7QUFDeEQsTUFBRSxjQUFGLEdBRHdEO0FBRXhELGFBQVMsT0FBTyxHQUFQLENBQVcsUUFBUSxRQUFSLEdBQW1CLElBQW5CLEVBQVgsQ0FBVCxFQUZ3RDtBQUd4RCxXQUFPLEtBQVAsQ0FId0Q7SUFBSCxFQUFwRDtFQU1GLHVEQUFXLEtBQUs7V0FBRyxVQUFRLENBQVI7SUFBSCxFQUFjLG1CQUFrQixJQUFsQixFQUE5QixDQU5FO0VBT0ksd0RBQVksT0FBTSxJQUFOLEVBQVcsU0FBUztXQUFHLFFBQVEsTUFBUjtJQUFILEVBQWhDLENBUEo7O0NBRHVCLENBQXJCOztBQVlOLElBQU0sVUFBUSx5QkFBUTtRQUFRLEVBQUMsT0FBTSxvQ0FBcUIsS0FBckIsQ0FBTjtDQUFULENBQVIsQ0FBc0Q7eUJBQUU7eUNBQU07UUFDeEU7OztFQUNJOztLQUFlLGtCQUFrQixLQUFsQixFQUF5QixtQkFBbUIsS0FBbkIsRUFBeEM7R0FDRTs7O0lBQ0U7Ozs7S0FERjtJQUVFOzs7O0tBRkY7SUFHRTs7OztLQUhGO0lBSUU7Ozs7S0FKRjtJQUtFOzs7O0tBTEY7SUFNRTs7OztLQU5GO0lBT0U7Ozs7S0FQRjtJQVFFOzs7O0tBUkY7SUFERjtHQURKO0VBYUk7O0tBQVcsb0JBQW9CLEtBQXBCLEVBQVg7R0FFSSxNQUFNLEdBQU4sQ0FBVSxpQkFBMEIsQ0FBMUI7UUFBVSxhQUFSOzRCQUFjOzRDQUFNO1dBQzVCOztPQUFVLEtBQUssQ0FBTCxFQUFWO0tBQ0k7OztNQUFpQixJQUFqQjtNQURKO0tBRUk7OztNQUFtQiw4QkFBQyxVQUFELElBQVksTUFBTSxJQUFOLEVBQVksTUFBTSxDQUFDLENBQUQsSUFBSSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUosRUFBc0IsS0FBSyxDQUFMLEVBQXBELENBQW5CO01BRko7S0FHSTs7O01BQW1CLDhCQUFDLFVBQUQsSUFBWSxNQUFNLElBQU4sRUFBWSxNQUFNLENBQUMsQ0FBRCxJQUFJLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBSixFQUFzQixLQUFLLENBQUwsRUFBcEQsQ0FBbkI7TUFISjtLQUlJOzs7TUFBbUIsOEJBQUMsVUFBRCxJQUFZLE1BQU0sSUFBTixFQUFZLE1BQU0sQ0FBQyxDQUFELElBQUksTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFKLEVBQXNCLEtBQUssQ0FBTCxFQUFwRCxDQUFuQjtNQUpKO0tBS0k7OztNQUFtQiw4QkFBQyxVQUFELElBQVksTUFBTSxJQUFOLEVBQVksTUFBTSxDQUFDLENBQUQsSUFBSSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUosRUFBc0IsS0FBSyxDQUFMLEVBQXBELENBQW5CO01BTEo7S0FNSTs7O01BQW1CLDhCQUFDLFVBQUQsSUFBWSxNQUFNLElBQU4sRUFBWSxNQUFNLENBQUMsQ0FBRCxJQUFJLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBSixFQUFzQixLQUFLLENBQUwsRUFBcEQsQ0FBbkI7TUFOSjtLQU9JOzs7TUFBbUIsOEJBQUMsVUFBRCxJQUFZLE1BQU0sSUFBTixFQUFZLE1BQU0sQ0FBQyxDQUFELElBQUksTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFKLEVBQXNCLEtBQUssQ0FBTCxFQUFwRCxDQUFuQjtNQVBKO0tBUUk7OztNQUFtQiw4QkFBQyxVQUFELElBQVksTUFBTSxJQUFOLEVBQVksTUFBTSxDQUFDLENBQUQsSUFBSSxNQUFNLE9BQU4sQ0FBYyxDQUFkLENBQUosRUFBc0IsS0FBSyxDQUFMLEVBQXBELENBQW5CO01BUko7O0lBRE0sQ0FGZDtHQWJKOztDQURnRSxDQUE5RDs7QUFpQ04sSUFBTSxhQUFXLDJCQUFVLGlCQUEyRDtLQUF6RDtLQUFLO0tBQU07S0FBSzsyQkFBVTs2Q0FBUSxJQUFJLElBQUosR0FBVyxNQUFYLG1CQUF1Qjs7QUFDckYsS0FBRyxJQUFILEVBQ0MsT0FBUSxnREFBVyxPQUFNLFFBQU4sRUFBWCxDQUFSLENBREQsS0FFSyxJQUFHLE1BQUksT0FBSixFQUNQLE9BQVEsZ0RBQVcsT0FBTSxXQUFOLEVBQVgsQ0FBUixDQURJLEtBR0osT0FBUSxnREFBVyxPQUFNLFdBQU4sRUFBa0IsWUFBVyxRQUFYLEVBQW9CLFNBQVM7VUFBRyxTQUFTLE9BQU8sSUFBUCxDQUFZLElBQVosRUFBaUIsR0FBakIsQ0FBVDtHQUFILEVBQTFELENBQVIsQ0FISTtDQUhxQixDQUFyQjs7QUFTTixJQUFNLFdBQVMseUJBQVE7UUFBTyxzQkFBUSwrQkFBZ0IsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QztDQUFQLENBQVIsQ0FBc0U7S0FBRTtLQUFPO0tBQUs7UUFDL0YsOEJBQUMsS0FBRCxJQUFPLE1BQU0sZ0RBQVcsT0FBTSxRQUFOLEVBQVgsQ0FBTixFQUFtQyxNQUFTLGNBQVMsSUFBbEIsRUFBMUM7Q0FEaUYsQ0FBL0U7O2tCQUlTIiwiZmlsZSI6InRpbWUtbWFuYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RleHRGaWVsZCxGbGF0QnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtUYWJsZSwgVGFibGVCb2R5LCBUYWJsZUhlYWRlciwgVGFibGVIZWFkZXJDb2x1bW4sIFRhYmxlUm93LCBUYWJsZVJvd0NvbHVtbn0gZnJvbSAnbWF0ZXJpYWwtdWkvVGFibGUnXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcbmltcG9ydCB7Y29tcGFjdCwgRU5USVRJRVMsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtub3JtYWxpemV9IGZyb20gXCJub3JtYWxpenJcIlxuXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxuaW1wb3J0IHtnZXRDdXJyZW50Q2hpbGQsIGdldEN1cnJlbnRDaGlsZFRhc2tzfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0ZhbWlseX0gZnJvbSBcIi4vZGJcIlxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmV4cG9ydCBjb25zdCBBQ1RJT049e1xuXHRBREQ6IHRvZG89PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0aWYoIXRvZG8pXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGxldCB7dG9kb3M9W119PWNoaWxkXG5cdFx0c3dpdGNoKHR5cGVvZih0b2RvKSl7XG5cdFx0Y2FzZSBcIm9iamVjdFwiOlxuXHRcdFx0Y2hpbGQudG9kb3M9Wy4uLnRvZG9zLCB0b2RvXVxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0aWYoIXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKSlcblx0XHRcdFx0Y2hpbGQudG9kb3M9Wy4uLnRvZG9zLCB7Y29udGVudDp0b2RvfV1cblx0XHR9XG5cdFx0aWYoY2hpbGQudG9kb3MhPXRvZG9zKXtcblx0XHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdH1cblx0fVxuXHQsUkVNT1ZFOiB0b2RvPT4oZGlzcGF0Y2gsIGdldFN0YXRlKT0+e1xuXHRcdGlmKCF0b2RvKVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRsZXQge3RvZG9zPVtdfT1jaGlsZFxuXHRcdHN3aXRjaCh0eXBlb2YodG9kbykpe1xuXHRcdGNhc2UgXCJvYmplY3RcIjpcblx0XHRcdGNoaWxkLnRvZG9zPXRvZG9zLmZpbHRlcihhPT5hLl9pZCE9dG9kby5faWQpXG5cdFx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRjaGlsZC50b2Rvcz10b2Rvcy5maWx0ZXIoYT0+YS5jb250ZW50IT10b2RvKVxuXHRcdH1cblx0XHRcblx0XHRpZihjaGlsZC50b2RvcyE9dG9kb3Mpe1x0XG5cdFx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcblx0XHR9XG5cdH1cblx0LERPTkU6ICh0b2RvLGRheSk9PihkaXNwYXRjaCwgZ2V0U3RhdGUpPT57XG5cdFx0Y29uc3Qgc3RhdGU9Z2V0U3RhdGUoKVxuXHRcdGNvbnN0IGNoaWxkPWdldEN1cnJlbnRDaGlsZChzdGF0ZSlcblx0XHRjb25zdCB7dG9kb3N9PWNoaWxkXG5cdFx0Y29uc3QgdGFzaz10b2Rvcy5maW5kKGE9PmEuY29udGVudD09dG9kbylcblx0XHRsZXQge2RvbmVzPVtdfT10YXNrXG5cdFx0ZG9uZXMucHVzaChkYXkpXG5cdFx0dGFzay5kb25lcz1kb25lc1xuXHRcdGNoaWxkLnRvZG9zPVsuLi50b2Rvc11cblx0XHRyZXR1cm4gRmFtaWx5LnVwc2VydChjaGlsZClcblx0XHRcdFx0LnRoZW4odXBkYXRlZD0+ZGlzcGF0Y2goRU5USVRJRVMobm9ybWFsaXplKHVwZGF0ZWQsIEZhbWlseS5zY2hlbWEpLmVudGl0aWVzKSkpXG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHt9KT0+KFxuICAgIDxkaXY+XG4gICAgICAgIDxjZW50ZXI+PFRvZG9FZGl0b3IvPjwvY2VudGVyPlxuXG4gICAgICAgIDxUYXNrUGFkLz5cblxuICAgICAgICA8U2NvcmVQYWQvPlxuICAgIDwvZGl2PlxuKVxuXG5jb25zdCBUb2RvRWRpdG9yPWNvbm5lY3QoKSgoe2Rpc3BhdGNoLCByZWZUYXNrLCByZWZGb3JtfSk9PihcbiAgICA8Zm9ybSByZWY9e2E9PnJlZkZvcm09YX0gY2xhc3NOYW1lPVwiZ3JpZFwiIG9uU3VibWl0PXtlPT57XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5BREQocmVmVGFzay5nZXRWYWx1ZSgpLnRyaW0oKSkpXHRcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH19PlxuICAgICAgICBcblx0XHQ8VGV4dEZpZWxkIHJlZj17YT0+cmVmVGFzaz1hfSBmbG9hdGluZ0xhYmVsVGV4dD1cIuS7u+WKoVwiIC8+XG4gICAgICAgIDxGbGF0QnV0dG9uIGxhYmVsPVwi5re75YqgXCIgb25DbGljaz17ZT0+cmVmRm9ybS5zdWJtaXQoKX0vPlxuICAgIDwvZm9ybT5cbikpXG5cbmNvbnN0IFRhc2tQYWQ9Y29ubmVjdChzdGF0ZT0+KHt0b2RvczpnZXRDdXJyZW50Q2hpbGRUYXNrcyhzdGF0ZSl9KSkoKHt0b2Rvcz1bXX0pPT4oXG4gICAgPFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgICBkaXNwbGF5U2VsZWN0QWxsPXtmYWxzZX0gYWRqdXN0Rm9yQ2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Lu75YqhXFzmmJ/mnJ88L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuaXpTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5LiAPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kuow8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS4iTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5ZubPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kupQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuWFrTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgPFRhYmxlQm9keSBkaXNwbGF5Um93Q2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMCl9IGRheT17MH0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZigxKX0gZGF5PXsxfS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDIpfSBkYXk9ezJ9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMyl9IGRheT17M30vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZig0KX0gZGF5PXs0fS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDUpfSBkYXk9ezV9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoNil9IGRheT17Nn0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpfSk9Pntcblx0aWYoZG9uZSkgXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGdyYXlcIi8+KVx0XG5cdGVsc2Vcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGN5YW5cIiBob3ZlckNvbG9yPVwieWVsbG93XCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0vPilcbn0pXG5cbmNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKSgoe3Njb3JlLCBnb2FsLHRvZG99KT0+KFxuICAgIDxFbXB0eSBpY29uPXs8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPn0gdGV4dD17YCR7c2NvcmV9LyR7Z29hbH1gfS8+XG4pKVxuXG5leHBvcnQgZGVmYXVsdCBUaW1lTWFuYWdlXG4iXX0=