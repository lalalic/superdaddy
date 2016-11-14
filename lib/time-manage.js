"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeManage = undefined;

var _objectDestructuringEmpty2 = require("babel-runtime/helpers/objectDestructuringEmpty");

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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


var ACTION = {
  ADD: function ADD(todo) {
    return function (dispatch, getState) {
      if (!todo) return _promise2.default.resolve();
      var state = getState();
      var child = (0, _selector.getCurrentChild)(state);
      var _child$todos = child.todos,
          todos = _child$todos === undefined ? [] : _child$todos;

      if (!todos.find(function (a) {
        return a.content == todo;
      })) {
        child.todos = [].concat((0, _toConsumableArray3.default)(todos), [{ content: todo }]);

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
      }, floatingLabelText: "\u4EFB\u52A1" }),
    _react2.default.createElement(_materialUi.FlatButton, { label: "\u6DFB\u52A0", onClick: function onClick(e) {
        return refForm.submit();
      } })
  );
});

var TaskPad = (0, _reactRedux.connect)(function (state) {
  return (0, _qiliApp.compact)((0, _selector.getCurrentChild)(state), "todos");
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
          "\u4EFB\u52A1\\\u661F\u671F"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u65E5"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u4E00"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u4E8C"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u4E09"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u56DB"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u4E94"
        ),
        _react2.default.createElement(
          _Table.TableHeaderColumn,
          null,
          "\u516D"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJFbXB0eSIsIkFDVElPTiIsIkFERCIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJ0b2RvIiwicmVzb2x2ZSIsInN0YXRlIiwiY2hpbGQiLCJ0b2RvcyIsImZpbmQiLCJhIiwiY29udGVudCIsInVwc2VydCIsInRoZW4iLCJ1cGRhdGVkIiwic2NoZW1hIiwiZW50aXRpZXMiLCJET05FIiwiZGF5IiwidGFzayIsImRvbmVzIiwicHVzaCIsIlRpbWVNYW5hZ2UiLCJUb2RvRWRpdG9yIiwicmVmVGFzayIsInJlZkZvcm0iLCJlIiwicHJldmVudERlZmF1bHQiLCJnZXRWYWx1ZSIsInRyaW0iLCJzdWJtaXQiLCJUYXNrUGFkIiwibWFwIiwiaSIsImluZGV4T2YiLCJUb2RvU3RhdHVzIiwiZG9uZSIsImN1cnJlbnQiLCJEYXRlIiwiZ2V0RGF5IiwiU2NvcmVQYWQiLCJzY29yZSIsImdvYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUVBOzs7O0FBQ0E7O0FBQ0E7Ozs7SUFFT0EsSyxlQUFBQSxLOzs7QUFFUCxJQUFNQyxTQUFPO0FBQ1pDLE9BQUs7QUFBQSxXQUFNLFVBQUNDLFFBQUQsRUFBV0MsUUFBWCxFQUFzQjtBQUNoQyxVQUFHLENBQUNDLElBQUosRUFDQyxPQUFPLGtCQUFRQyxPQUFSLEVBQVA7QUFDRCxVQUFNQyxRQUFNSCxVQUFaO0FBQ0EsVUFBTUksUUFBTSwrQkFBZ0JELEtBQWhCLENBQVo7QUFKZ0MseUJBS2pCQyxLQUxpQixDQUszQkMsS0FMMkI7QUFBQSxVQUszQkEsS0FMMkIsZ0NBS3JCLEVBTHFCOztBQU1oQyxVQUFHLENBQUNBLE1BQU1DLElBQU4sQ0FBVztBQUFBLGVBQUdDLEVBQUVDLE9BQUYsSUFBV1AsSUFBZDtBQUFBLE9BQVgsQ0FBSixFQUFtQztBQUNsQ0csY0FBTUMsS0FBTiw4Q0FBZ0JB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QUFDRCxDQVBnQixDQUFqQjs7QUFTQSxJQUFNc0IsV0FBUyx5QkFBUTtBQUFBLFNBQU8sc0JBQVEsK0JBQWdCbEMsS0FBaEIsQ0FBUixFQUErQixPQUEvQixFQUF1QyxNQUF2QyxFQUE4QyxNQUE5QyxDQUFQO0FBQUEsQ0FBUixFQUFzRTtBQUFBLE1BQUVtQyxLQUFGLFNBQUVBLEtBQUY7QUFBQSxNQUFTQyxJQUFULFNBQVNBLElBQVQ7QUFBQSxNQUFjdEMsSUFBZCxTQUFjQSxJQUFkO0FBQUEsU0FDakYsOEJBQUMsS0FBRCxJQUFPLE1BQU0sZ0RBQVcsT0FBTSxRQUFqQixHQUFiLEVBQTBDLE1BQVNxQyxLQUFULFNBQWtCQyxJQUE1RCxHQURpRjtBQUFBLENBQXRFLENBQWY7O2tCQUllcEIsVSIsImZpbGUiOiJ0aW1lLW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJ1xuXG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gXCJyZWFjdC1yZWR1eFwiXG5pbXBvcnQge2NvbXBhY3QsIEVOVElUSUVTLCBVSX0gZnJvbSBcInFpbGktYXBwXCJcbmltcG9ydCB7bm9ybWFsaXplfSBmcm9tIFwibm9ybWFsaXpyXCJcblxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcbmltcG9ydCB7Z2V0Q3VycmVudENoaWxkfSBmcm9tIFwiLi9zZWxlY3RvclwiXG5pbXBvcnQge0ZhbWlseX0gZnJvbSBcIi4vZGJcIlxuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNvbnN0IEFDVElPTj17XG5cdEFERDogdG9kbz0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRpZighdG9kbylcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdGNvbnN0IHN0YXRlPWdldFN0YXRlKClcblx0XHRjb25zdCBjaGlsZD1nZXRDdXJyZW50Q2hpbGQoc3RhdGUpXG5cdFx0bGV0IHt0b2Rvcz1bXX09Y2hpbGRcblx0XHRpZighdG9kb3MuZmluZChhPT5hLmNvbnRlbnQ9PXRvZG8pKXtcblx0XHRcdGNoaWxkLnRvZG9zPVsuLi50b2Rvcywge2NvbnRlbnQ6dG9kb31dXG5cdFx0XHRcblx0XHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuXHRcdH1cblx0fVxuXHQsRE9ORTogKHRvZG8sZGF5KT0+KGRpc3BhdGNoLCBnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGQ9Z2V0Q3VycmVudENoaWxkKHN0YXRlKVxuXHRcdGNvbnN0IHt0b2Rvc309Y2hpbGRcblx0XHRjb25zdCB0YXNrPXRvZG9zLmZpbmQoYT0+YS5jb250ZW50PT10b2RvKVxuXHRcdGxldCB7ZG9uZXM9W119PXRhc2tcblx0XHRkb25lcy5wdXNoKGRheSlcblx0XHR0YXNrLmRvbmVzPWRvbmVzXG5cdFx0Y2hpbGQudG9kb3M9Wy4uLnRvZG9zXVxuXHRcdHJldHVybiBGYW1pbHkudXBzZXJ0KGNoaWxkKVxuXHRcdFx0XHQudGhlbih1cGRhdGVkPT5kaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUodXBkYXRlZCwgRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKSlcblx0fVxufVxuXG5leHBvcnQgY29uc3QgVGltZU1hbmFnZT0oe30pPT4oXG4gICAgPGRpdj5cbiAgICAgICAgPGNlbnRlcj48VG9kb0VkaXRvci8+PC9jZW50ZXI+XG5cbiAgICAgICAgPFRhc2tQYWQvPlxuXG4gICAgICAgIDxTY29yZVBhZC8+XG4gICAgPC9kaXY+XG4pXG5cbmNvbnN0IFRvZG9FZGl0b3I9Y29ubmVjdCgpKCh7ZGlzcGF0Y2gsIHJlZlRhc2ssIHJlZkZvcm19KT0+KFxuICAgIDxmb3JtIHJlZj17YT0+cmVmRm9ybT1hfSBjbGFzc05hbWU9XCJncmlkXCIgb25TdWJtaXQ9e2U9Pntcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZGlzcGF0Y2goQUNUSU9OLkFERChyZWZUYXNrLmdldFZhbHVlKCkudHJpbSgpKSlcdFxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fX0+XG4gICAgICAgIFxuXHRcdDxUZXh0RmllbGQgcmVmPXthPT5yZWZUYXNrPWF9IGZsb2F0aW5nTGFiZWxUZXh0PVwi5Lu75YqhXCIgLz5cbiAgICAgICAgPEZsYXRCdXR0b24gbGFiZWw9XCLmt7vliqBcIiBvbkNsaWNrPXtlPT5yZWZGb3JtLnN1Ym1pdCgpfS8+XG4gICAgPC9mb3JtPlxuKSlcblxuY29uc3QgVGFza1BhZD1jb25uZWN0KHN0YXRlPT5jb21wYWN0KGdldEN1cnJlbnRDaGlsZChzdGF0ZSksXCJ0b2Rvc1wiKSkoKHt0b2Rvcz1bXX0pPT4oXG4gICAgPFRhYmxlPlxuICAgICAgICA8VGFibGVIZWFkZXIgICBkaXNwbGF5U2VsZWN0QWxsPXtmYWxzZX0gYWRqdXN0Rm9yQ2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5Lu75YqhXFzmmJ/mnJ88L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuaXpTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5LiAPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kuow8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS4iTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5ZubPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kupQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuWFrTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgPFRhYmxlQm9keSBkaXNwbGF5Um93Q2hlY2tib3g9e2ZhbHNlfT5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRvZG9zLm1hcCgoe2NvbnRlbnQ6dGFzaywgZG9uZXM9W119LGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMCl9IGRheT17MH0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZigxKX0gZGF5PXsxfS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDIpfSBkYXk9ezJ9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoMyl9IGRheT17M30vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48VG9kb1N0YXR1cyB0b2RvPXt0YXNrfSBkb25lPXstMSE9ZG9uZXMuaW5kZXhPZig0KX0gZGF5PXs0fS8+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjxUb2RvU3RhdHVzIHRvZG89e3Rhc2t9IGRvbmU9ey0xIT1kb25lcy5pbmRleE9mKDUpfSBkYXk9ezV9Lz48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PFRvZG9TdGF0dXMgdG9kbz17dGFza30gZG9uZT17LTEhPWRvbmVzLmluZGV4T2YoNil9IGRheT17Nn0vPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgPC9UYWJsZVJvdz5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgICB9XG4gICAgICAgIDwvVGFibGVCb2R5PlxuICAgIDwvVGFibGU+XG4pKVxuXG5jb25zdCBUb2RvU3RhdHVzPWNvbm5lY3QoKSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudD1uZXcgRGF0ZSgpLmdldERheSgpfSk9Pntcblx0aWYoZG9uZSkgXG5cdFx0cmV0dXJuICg8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPilcblx0ZWxzZSBpZihkYXk+Y3VycmVudClcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGdyYXlcIi8+KVx0XG5cdGVsc2Vcblx0XHRyZXR1cm4gKDxJY29uU21pbGUgY29sb3I9XCJsaWdodGN5YW5cIiBob3ZlckNvbG9yPVwieWVsbG93XCIgb25DbGljaz17ZT0+ZGlzcGF0Y2goQUNUSU9OLkRPTkUodG9kbyxkYXkpKX0vPilcbn0pXG5cbmNvbnN0IFNjb3JlUGFkPWNvbm5lY3Qoc3RhdGU9PmNvbXBhY3QoZ2V0Q3VycmVudENoaWxkKHN0YXRlKSxcInNjb3JlXCIsXCJnb2FsXCIsXCJ0b2RvXCIpKSgoe3Njb3JlLCBnb2FsLHRvZG99KT0+KFxuICAgIDxFbXB0eSBpY29uPXs8SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPn0gdGV4dD17YCR7c2NvcmV9LyR7Z29hbH1gfS8+XG4pKVxuXG5leHBvcnQgZGVmYXVsdCBUaW1lTWFuYWdlXG4iXX0=