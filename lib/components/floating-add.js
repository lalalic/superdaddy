"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _add = require("material-ui/svg-icons/content/add");

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatingAdd = function (_Component) {
    (0, _inherits3.default)(FloatingAdd, _Component);

    function FloatingAdd() {
        (0, _classCallCheck3.default)(this, FloatingAdd);
        return (0, _possibleConstructorReturn3.default)(this, (FloatingAdd.__proto__ || (0, _getPrototypeOf2.default)(FloatingAdd)).apply(this, arguments));
    }

    (0, _createClass3.default)(FloatingAdd, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _materialUi.FloatingActionButton,
                (0, _extends3.default)({}, this.props, {
                    className: "floating sticky bottom right" }),
                _react2.default.createElement(_add2.default, null)
            );
        }
    }]);
    return FloatingAdd;
}(_react.Component);

exports.default = FloatingAdd;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZC5qcyJdLCJuYW1lcyI6WyJGbG9hdGluZ0FkZCIsInByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOztBQUNBOzs7Ozs7SUFFcUJBLFc7Ozs7Ozs7Ozs7aUNBQ1Q7QUFDSixtQkFDSTtBQUFBO0FBQUEsMkNBQ1EsS0FBS0MsS0FEYjtBQUVJLCtCQUFVLDhCQUZkO0FBR0k7QUFISixhQURKO0FBT0g7Ozs7O2tCQVRnQkQsVyIsImZpbGUiOiJmbG9hdGluZy1hZGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBJY29uQWRkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29udGVudC9hZGRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbG9hdGluZ0FkZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSBib3R0b20gcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8SWNvbkFkZC8+XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxufVxuIl19