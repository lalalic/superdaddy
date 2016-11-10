"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TimeManage = undefined;

var _objectDestructuringEmpty2 = require("babel-runtime/helpers/objectDestructuringEmpty");

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _Table = require("material-ui/Table");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACTION = {};

var TimeManage = exports.TimeManage = function TimeManage(_ref) {
    (0, _objectDestructuringEmpty3.default)(_ref);
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(TodoEditor, null),
        _react2.default.createElement(TaskPad, null),
        _react2.default.createElement(ScorePad, null)
    );
};

var TodoEditor = function TodoEditor(_ref2) {
    (0, _objectDestructuringEmpty3.default)(_ref2);
    return _react2.default.createElement(
        "div",
        { className: "grid" },
        _react2.default.createElement(_materialUi.TextField, { floatingLabelText: "\u4EFB\u52A1" }),
        _react2.default.createElement(_materialUi.FlatButton, { label: "\u6DFB\u52A0" })
    );
};

var TaskPad = function TaskPad(_ref3) {
    var _ref3$tasks = _ref3.tasks,
        tasks = _ref3$tasks === undefined ? ["阅读", "钢琴"] : _ref3$tasks;
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
                ),
                _react2.default.createElement(
                    _Table.TableHeaderColumn,
                    null,
                    "\u65E5"
                )
            )
        ),
        _react2.default.createElement(
            _Table.TableBody,
            { displayRowCheckbox: false },
            tasks.map(function (task, i) {
                return _react2.default.createElement(
                    _Table.TableRow,
                    { key: i },
                    _react2.default.createElement(
                        _Table.TableRowColumn,
                        null,
                        task
                    ),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null),
                    _react2.default.createElement(_Table.TableHeaderColumn, null)
                );
            })
        )
    );
};

var ScorePad = function ScorePad(_ref4) {
    var score = _ref4.score,
        goal = _ref4.goal;
    return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
            "h3",
            null,
            score,
            _react2.default.createElement(_mood2.default, { color: "yellow" })
        ),
        _react2.default.createElement(
            "h3",
            null,
            "\u4F60\u7684\u76EE\u6807\u662F:",
            goal
        )
    );
};

exports.default = TimeManage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLW1hbmFnZS5qcyJdLCJuYW1lcyI6WyJBQ1RJT04iLCJUaW1lTWFuYWdlIiwiVG9kb0VkaXRvciIsIlRhc2tQYWQiLCJ0YXNrcyIsIm1hcCIsInRhc2siLCJpIiwiU2NvcmVQYWQiLCJzY29yZSIsImdvYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBR0EsSUFBTUEsU0FBTyxFQUFiOztBQUdPLElBQU1DLGtDQUFXLFNBQVhBLFVBQVc7QUFBQTtBQUFBLFdBQ3BCO0FBQUE7QUFBQTtBQUNJLHNDQUFDLFVBQUQsT0FESjtBQUdJLHNDQUFDLE9BQUQsT0FISjtBQUtJLHNDQUFDLFFBQUQ7QUFMSixLQURvQjtBQUFBLENBQWpCOztBQVVQLElBQU1DLGFBQVcsU0FBWEEsVUFBVztBQUFBO0FBQUEsV0FDYjtBQUFBO0FBQUEsVUFBSyxXQUFVLE1BQWY7QUFDSSwrREFBVyxtQkFBa0IsY0FBN0IsR0FESjtBQUVJLGdFQUFZLE9BQU0sY0FBbEI7QUFGSixLQURhO0FBQUEsQ0FBakI7O0FBT0EsSUFBTUMsVUFBUSxTQUFSQSxPQUFRO0FBQUEsNEJBQUVDLEtBQUY7QUFBQSxRQUFFQSxLQUFGLCtCQUFRLENBQUMsSUFBRCxFQUFNLElBQU4sQ0FBUjtBQUFBLFdBQ1Y7QUFBQTtBQUFBO0FBQ0k7QUFBQTtBQUFBLGNBQWUsa0JBQWtCLEtBQWpDLEVBQXdDLG1CQUFtQixLQUEzRDtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBSkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUxGO0FBTUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFORjtBQU9FO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUEY7QUFRRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUkY7QUFERixTQURKO0FBYUk7QUFBQTtBQUFBLGNBQVcsb0JBQW9CLEtBQS9CO0FBRUlBLGtCQUFNQyxHQUFOLENBQVUsVUFBQ0MsSUFBRCxFQUFNQyxDQUFOO0FBQUEsdUJBQ047QUFBQTtBQUFBLHNCQUFVLEtBQUtBLENBQWY7QUFDSTtBQUFBO0FBQUE7QUFBaUJEO0FBQWpCLHFCQURKO0FBRUksaUZBRko7QUFHSSxpRkFISjtBQUlJLGlGQUpKO0FBS0ksaUZBTEo7QUFNSSxpRkFOSjtBQU9JLGlGQVBKO0FBUUk7QUFSSixpQkFETTtBQUFBLGFBQVY7QUFGSjtBQWJKLEtBRFU7QUFBQSxDQUFkOztBQWlDQSxJQUFNRSxXQUFTLFNBQVRBLFFBQVM7QUFBQSxRQUFFQyxLQUFGLFNBQUVBLEtBQUY7QUFBQSxRQUFTQyxJQUFULFNBQVNBLElBQVQ7QUFBQSxXQUNYO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQTtBQUFLRCxpQkFBTDtBQUFXLDREQUFXLE9BQU0sUUFBakI7QUFBWCxTQURKO0FBRUk7QUFBQTtBQUFBO0FBQUE7QUFBV0M7QUFBWDtBQUZKLEtBRFc7QUFBQSxDQUFmOztrQkFPZVQsVSIsImZpbGUiOiJ0aW1lLW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUZXh0RmllbGQsRmxhdEJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7VGFibGUsIFRhYmxlQm9keSwgVGFibGVIZWFkZXIsIFRhYmxlSGVhZGVyQ29sdW1uLCBUYWJsZVJvdywgVGFibGVSb3dDb2x1bW59IGZyb20gJ21hdGVyaWFsLXVpL1RhYmxlJztcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXG5cblxuY29uc3QgQUNUSU9OPXtcbn1cblxuZXhwb3J0IGNvbnN0IFRpbWVNYW5hZ2U9KHt9KT0+KFxuICAgIDxkaXY+XG4gICAgICAgIDxUb2RvRWRpdG9yLz5cblxuICAgICAgICA8VGFza1BhZC8+XG5cbiAgICAgICAgPFNjb3JlUGFkLz5cbiAgICA8L2Rpdj5cbilcblxuY29uc3QgVG9kb0VkaXRvcj0oe30pPT4oXG4gICAgPGRpdiBjbGFzc05hbWU9XCJncmlkXCI+XG4gICAgICAgIDxUZXh0RmllbGQgZmxvYXRpbmdMYWJlbFRleHQ9XCLku7vliqFcIiAvPlxuICAgICAgICA8RmxhdEJ1dHRvbiBsYWJlbD1cIua3u+WKoFwiLz5cbiAgICA8L2Rpdj5cbilcblxuY29uc3QgVGFza1BhZD0oe3Rhc2tzPVtcIumYheivu1wiLFwi6ZKi55C0XCJdfSk9PihcbiAgICA8VGFibGU+XG4gICAgICAgIDxUYWJsZUhlYWRlciAgIGRpc3BsYXlTZWxlY3RBbGw9e2ZhbHNlfSBhZGp1c3RGb3JDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgIDxUYWJsZVJvdz5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7ku7vliqFcXOaYn+acnzwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5LiAPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kuow8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuS4iTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5ZubPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj7kupQ8L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPuWFrTwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+5pelPC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICA8L1RhYmxlSGVhZGVyPlxuICAgICAgICA8VGFibGVCb2R5IGRpc3BsYXlSb3dDaGVja2JveD17ZmFsc2V9PlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdGFza3MubWFwKCh0YXNrLGkpPT4oXG4gICAgICAgICAgICAgICAgPFRhYmxlUm93IGtleT17aX0+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZVJvd0NvbHVtbj57dGFza308L1RhYmxlUm93Q29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICAgICAgPFRhYmxlSGVhZGVyQ29sdW1uPjwvVGFibGVIZWFkZXJDb2x1bW4+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZUhlYWRlckNvbHVtbj48L1RhYmxlSGVhZGVyQ29sdW1uPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGVIZWFkZXJDb2x1bW4+PC9UYWJsZUhlYWRlckNvbHVtbj5cbiAgICAgICAgICAgICAgICA8L1RhYmxlUm93PlxuICAgICAgICAgICAgKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgPC9UYWJsZT5cbilcblxuY29uc3QgU2NvcmVQYWQ9KHtzY29yZSwgZ29hbH0pPT4oXG4gICAgPGRpdj5cbiAgICAgICAgPGgzPntzY29yZX08SWNvblNtaWxlIGNvbG9yPVwieWVsbG93XCIvPjwvaDM+XG4gICAgICAgIDxoMz7kvaDnmoTnm67moIfmmK86e2dvYWx9PC9oMz5cbiAgICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgVGltZU1hbmFnZVxuIl19