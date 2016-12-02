"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test(props) {
	return _react2.default.createElement(
		_materialUi.List,
		null,
		_react2.default.createElement(_materialUi.ListItem, {
			primaryText: "work",
			leftIcon: _react2.default.createElement(TodoStatus, null)
		})
	);
};

var TodoStatus = function TodoStatus(_ref) {
	var todo = _ref.todo,
	    done = _ref.done,
	    day = _ref.day,
	    dispatch = _ref.dispatch,
	    current = _ref.current,
	    others = (0, _objectWithoutProperties3.default)(_ref, ["todo", "done", "day", "dispatch", "current"]);
	return _react2.default.createElement(_mood2.default, others);
};

exports.default = Test;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbIlRlc3QiLCJUb2RvU3RhdHVzIiwidG9kbyIsImRvbmUiLCJkYXkiLCJkaXNwYXRjaCIsImN1cnJlbnQiLCJvdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUVBOzs7Ozs7QUFFQSxJQUFNQSxPQUFLLFNBQUxBLElBQUs7QUFBQSxRQUNWO0FBQUE7QUFBQTtBQUNDO0FBQ0MsZ0JBQVksTUFEYjtBQUVDLGFBQVUsOEJBQUMsVUFBRDtBQUZYO0FBREQsRUFEVTtBQUFBLENBQVg7O0FBU0EsSUFBTUMsYUFBWSxTQUFaQSxVQUFZO0FBQUEsS0FBRUMsSUFBRixRQUFFQSxJQUFGO0FBQUEsS0FBT0MsSUFBUCxRQUFPQSxJQUFQO0FBQUEsS0FBYUMsR0FBYixRQUFhQSxHQUFiO0FBQUEsS0FBa0JDLFFBQWxCLFFBQWtCQSxRQUFsQjtBQUFBLEtBQTRCQyxPQUE1QixRQUE0QkEsT0FBNUI7QUFBQSxLQUF3Q0MsTUFBeEM7QUFBQSxRQUFrRCw4Q0FBZUEsTUFBZixDQUFsRDtBQUFBLENBQWxCOztrQkFFZVAsSSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW0sU3ViaGVhZGVyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5cclxuaW1wb3J0IEljb25TbWlsZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9tb29kXCJcclxuXHJcbmNvbnN0IFRlc3Q9cHJvcHM9PihcclxuXHQ8TGlzdD5cclxuXHRcdDxMaXN0SXRlbVxyXG5cdFx0XHRwcmltYXJ5VGV4dD1cIndvcmtcIlxyXG5cdFx0XHRsZWZ0SWNvbj17PFRvZG9TdGF0dXMvPn1cclxuXHRcdC8+XHJcblx0PC9MaXN0PlxyXG4pXHJcblxyXG5jb25zdCBUb2RvU3RhdHVzPSgoe3RvZG8sZG9uZSwgZGF5LCBkaXNwYXRjaCwgY3VycmVudCwgLi4ub3RoZXJzfSk9PjxJY29uU21pbGUgey4uLm90aGVyc30vPilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRlc3QiXX0=