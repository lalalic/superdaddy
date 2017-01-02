"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MyAppBar = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyAppBar = exports.MyAppBar = function MyAppBar(props) {
	return _react2.default.createElement(_materialUi.AppBar, _extends({}, props, {
		iconElementLeft: _react2.default.createElement(
			_materialUi.FloatingActionButton,
			{
				mini: true,
				style: { fontSize: "xx-small" }
			},
			"\u7238\u7238"
		)
	}));
};

exports.default = MyAppBar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90aW1lLW1hbmFnZS9wYXBhL2FwcC1iYXIuanMiXSwibmFtZXMiOlsiTXlBcHBCYXIiLCJwcm9wcyIsImZvbnRTaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRU8sSUFBTUEsOEJBQVUsU0FBVkEsUUFBVTtBQUFBLFFBQ3RCLCtEQUFZQyxLQUFaO0FBQ0MsbUJBQ0M7QUFBQTtBQUFBO0FBQ0MsVUFBTSxJQURQO0FBRUMsV0FBTyxFQUFDQyxVQUFTLFVBQVY7QUFGUjtBQUFBO0FBQUE7QUFGRixJQURzQjtBQUFBLENBQWhCOztrQkFhUUYsUSIsImZpbGUiOiJhcHAtYmFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge0FwcEJhcixGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcblxuZXhwb3J0IGNvbnN0IE15QXBwQmFyPShwcm9wcz0+KFxuXHQ8QXBwQmFyIHsuLi5wcm9wc31cblx0XHRpY29uRWxlbWVudExlZnQ9e1xuXHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXG5cdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX1cblx0XHRcdFx0PlxuXHRcdFx0XHTniLjniLhcblx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG5cdFx0fVxuXHRcdC8+XG4pKVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcEJhclxuIl19