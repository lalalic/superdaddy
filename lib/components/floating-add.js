"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatingAdd = function (_Component) {
    _inherits(FloatingAdd, _Component);

    function FloatingAdd() {
        _classCallCheck(this, FloatingAdd);

        return _possibleConstructorReturn(this, (FloatingAdd.__proto__ || Object.getPrototypeOf(FloatingAdd)).apply(this, arguments));
    }

    _createClass(FloatingAdd, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _materialUi.FloatingActionButton,
                _extends({}, this.props, {
                    className: "floating sticky bottom right" }),
                _react2.default.createElement(_add2.default, null)
            );
        }
    }]);

    return FloatingAdd;
}(_react.Component);

exports.default = FloatingAdd;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZC5qcyJdLCJuYW1lcyI6WyJGbG9hdGluZ0FkZCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxXOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUNJO0FBQUE7QUFBQSw2QkFDUSxLQUFLQyxLQURiO0FBRUksK0JBQVUsOEJBRmQ7QUFHSTtBQUhKLGFBREo7QUFPSDs7Ozs7O2tCQVRnQkQsVyIsImZpbGUiOiJmbG9hdGluZy1hZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9hdGluZ0FkZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSBib3R0b20gcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8SWNvbkFkZC8+XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxufVxuIl19