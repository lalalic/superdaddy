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

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FloatingAdd).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2Zsb2F0aW5nLWFkZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLG1CQUNJOzs2QkFDUSxLQUFLLEtBQUw7QUFDSiwrQkFBVSw4QkFBVixHQUZKO2dCQUdJLGtEQUhKO2FBREosQ0FESTs7OztXQURTIiwiZmlsZSI6ImZsb2F0aW5nLWFkZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IEljb25BZGQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb250ZW50L2FkZFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsb2F0aW5nQWRkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IGJvdHRvbSByaWdodFwiPlxuICAgICAgICAgICAgICAgIDxJY29uQWRkLz5cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG59XG4iXX0=