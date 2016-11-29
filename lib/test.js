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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUVBOzs7Ozs7QUFFQSxJQUFNLE9BQUssU0FBTCxJQUFLO1FBQ1Y7OztFQUNDO0FBQ0MsZ0JBQVksTUFBWjtBQUNBLGFBQVUsOEJBQUMsVUFBRCxPQUFWO0dBRkQsQ0FERDs7Q0FEVTs7QUFTWCxJQUFNLGFBQVksU0FBWixVQUFZO0tBQUU7S0FBSztLQUFNO0tBQUs7S0FBVTtLQUFZO1FBQVUsOENBQWUsTUFBZjtDQUFsRDs7a0JBRUgiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHtMaXN0LExpc3RJdGVtLFN1YmhlYWRlcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcblxyXG5jb25zdCBUZXN0PXByb3BzPT4oXHJcblx0PExpc3Q+XHJcblx0XHQ8TGlzdEl0ZW1cclxuXHRcdFx0cHJpbWFyeVRleHQ9XCJ3b3JrXCJcclxuXHRcdFx0bGVmdEljb249ezxUb2RvU3RhdHVzLz59XHJcblx0XHQvPlxyXG5cdDwvTGlzdD5cclxuKVxyXG5cclxuY29uc3QgVG9kb1N0YXR1cz0oKHt0b2RvLGRvbmUsIGRheSwgZGlzcGF0Y2gsIGN1cnJlbnQsIC4uLm90aGVyc30pPT48SWNvblNtaWxlIHsuLi5vdGhlcnN9Lz4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBUZXN0Il19