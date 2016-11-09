"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function (_Component) {
    (0, _inherits3.default)(Logo, _Component);

    function Logo() {
        (0, _classCallCheck3.default)(this, Logo);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Logo).apply(this, arguments));
    }

    (0, _createClass3.default)(Logo, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var _props$drawStyle = _props.drawStyle;
            var drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle;
            var others = (0, _objectWithoutProperties3.default)(_props, ["drawStyle"]);

            var _Object$assign = (0, _assign2.default)({
                fill: "none",
                stroke: "rgb(200,200,200)",
                strokeWidth: 1,
                fontSize: 5
            }, drawStyle);

            var _Object$assign$textSt = _Object$assign.textStroke;
            var textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt;
            var otherDrawStyle = (0, _objectWithoutProperties3.default)(_Object$assign, ["textStroke"]);


            return _react2.default.createElement(
                _materialUi.SvgIcon,
                others,
                _react2.default.createElement(
                    "g",
                    otherDrawStyle,
                    _react2.default.createElement("circle", { cx: "18", cy: "4", r: "2" }),
                    _react2.default.createElement("circle", { cx: "4", cy: "6", r: "3" }),
                    _react2.default.createElement(
                        "text",
                        { x: "5", y: "20", stroke: textStroke },
                        "C N B"
                    ),
                    _react2.default.createElement("path", { d: "M 3.5208 10.2525 q 6.95554 7.98853 16.9068 -4.76903", fill: "none" })
                )
            );
        }
    }]);
    return Logo;
}(_react.Component);

exports.default = Logo;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0lBRXFCOzs7Ozs7Ozs7O2lDQUNWO3lCQUN5QixLQUFLLEtBQUwsQ0FEekI7MENBQ0EsVUFEQTtnQkFDQSw2Q0FBVSxzQkFEVjtnQkFDaUIsdUVBRGpCOztpQ0FFMkMsc0JBQWM7QUFDdEQsc0JBQUssTUFBTDtBQUNBLHdCQUFPLGtCQUFQO0FBQ0EsNkJBQVksQ0FBWjtBQUNBLDBCQUFTLENBQVQ7YUFKd0MsRUFLMUMsU0FMMEMsRUFGM0M7O3VEQUVBLFdBRkE7Z0JBRUEsbURBQVcsb0NBRlg7Z0JBRTJCLHdGQUYzQjs7O0FBU1AsbUJBQ0U7O2dCQUFhLE1BQWI7Z0JBQ0U7O29CQUFPLGNBQVA7b0JBQ0ksMENBQVEsSUFBRyxJQUFILEVBQVEsSUFBRyxHQUFILEVBQU8sR0FBRSxHQUFGLEVBQXZCLENBREo7b0JBRUksMENBQVEsSUFBRyxHQUFILEVBQU8sSUFBRyxHQUFILEVBQU8sR0FBRSxHQUFGLEVBQXRCLENBRko7b0JBR0k7OzBCQUFNLEdBQUUsR0FBRixFQUFNLEdBQUUsSUFBRixFQUFPLFFBQVEsVUFBUixFQUFuQjs7cUJBSEo7b0JBSUksd0NBQU0sR0FBRSxxREFBRixFQUF3RCxNQUFLLE1BQUwsRUFBOUQsQ0FKSjtpQkFERjthQURGLENBVE87OztXQURVIiwiZmlsZSI6ImxvZ28uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7U3ZnSWNvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dvIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gIHJlbmRlcigpIHtcclxuICAgICAgdmFyIHtkcmF3U3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICB2YXIge3RleHRTdHJva2U9XCJsaWdodGdyYXlcIiwgLi4ub3RoZXJEcmF3U3R5bGV9PU9iamVjdC5hc3NpZ24oe1xyXG4gICAgICAgICAgICAgIGZpbGw6XCJub25lXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlOlwicmdiKDIwMCwyMDAsMjAwKVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZVdpZHRoOjEsXHJcbiAgICAgICAgICAgICAgZm9udFNpemU6NVxyXG4gICAgICAgICAgfSxkcmF3U3R5bGUpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFN2Z0ljb24gey4uLm90aGVyc30+XHJcbiAgICAgICAgPGcgey4uLm90aGVyRHJhd1N0eWxlfT5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjE4XCIgY3k9XCI0XCIgcj1cIjJcIi8+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCI0XCIgY3k9XCI2XCIgcj1cIjNcIi8+XHJcbiAgICAgICAgICAgIDx0ZXh0IHg9XCI1XCIgeT1cIjIwXCIgc3Ryb2tlPXt0ZXh0U3Ryb2tlfT5DJm5ic3A7TiZuYnNwO0I8L3RleHQ+XHJcbiAgICAgICAgICAgIDxwYXRoIGQ9XCJNIDMuNTIwOCAxMC4yNTI1IHEgNi45NTU1NCA3Ljk4ODUzIDE2LjkwNjggLTQuNzY5MDNcIiBmaWxsPVwibm9uZVwiLz5cclxuICAgICAgICA8L2c+XHJcbiAgICA8L1N2Z0ljb24+XHJcbiAgICApXHJcbiAgfVxyXG59XHJcbiJdfQ==