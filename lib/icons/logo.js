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
        return (0, _possibleConstructorReturn3.default)(this, (Logo.__proto__ || (0, _getPrototypeOf2.default)(Logo)).apply(this, arguments));
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
                        "C\xA0N\xA0B"
                    ),
                    _react2.default.createElement("path", { d: "M 3.5208 10.2525 q 6.95554 7.98853 16.9068 -4.76903", fill: "none" })
                )
            );
        }
    }]);
    return Logo;
}(_react.Component);

exports.default = Logo;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbIkxvZ28iLCJwcm9wcyIsImRyYXdTdHlsZSIsIm90aGVycyIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImZvbnRTaXplIiwidGV4dFN0cm9rZSIsIm90aGVyRHJhd1N0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztJQUVxQkEsSTs7Ozs7Ozs7OztpQ0FDVjtBQUFBLHlCQUN5QixLQUFLQyxLQUQ5QjtBQUFBLDBDQUNBQyxTQURBO0FBQUEsZ0JBQ0FBLFNBREEsb0NBQ1UsRUFEVjtBQUFBLGdCQUNpQkMsTUFEakI7O0FBQUEsaUNBRTJDLHNCQUFjO0FBQ3REQyxzQkFBSyxNQURpRDtBQUV0REMsd0JBQU8sa0JBRitDO0FBR3REQyw2QkFBWSxDQUgwQztBQUl0REMsMEJBQVM7QUFKNkMsYUFBZCxFQUsxQ0wsU0FMMEMsQ0FGM0M7O0FBQUEsdURBRUFNLFVBRkE7QUFBQSxnQkFFQUEsVUFGQSx5Q0FFVyxXQUZYO0FBQUEsZ0JBRTJCQyxjQUYzQjs7O0FBU1AsbUJBQ0U7QUFBQTtBQUFhTixzQkFBYjtBQUNFO0FBQUE7QUFBT00sa0NBQVA7QUFDSSw4REFBUSxJQUFHLElBQVgsRUFBZ0IsSUFBRyxHQUFuQixFQUF1QixHQUFFLEdBQXpCLEdBREo7QUFFSSw4REFBUSxJQUFHLEdBQVgsRUFBZSxJQUFHLEdBQWxCLEVBQXNCLEdBQUUsR0FBeEIsR0FGSjtBQUdJO0FBQUE7QUFBQSwwQkFBTSxHQUFFLEdBQVIsRUFBWSxHQUFFLElBQWQsRUFBbUIsUUFBUUQsVUFBM0I7QUFBQTtBQUFBLHFCQUhKO0FBSUksNERBQU0sR0FBRSxxREFBUixFQUE4RCxNQUFLLE1BQW5FO0FBSko7QUFERixhQURGO0FBVUQ7Ozs7O2tCQXBCa0JSLEkiLCJmaWxlIjoibG9nby5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5cclxuaW1wb3J0IHtTdmdJY29ufSBmcm9tICdtYXRlcmlhbC11aSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ28gZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgICB2YXIge2RyYXdTdHlsZT17fSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXHJcbiAgICAgIHZhciB7dGV4dFN0cm9rZT1cImxpZ2h0Z3JheVwiLCAuLi5vdGhlckRyYXdTdHlsZX09T2JqZWN0LmFzc2lnbih7XHJcbiAgICAgICAgICAgICAgZmlsbDpcIm5vbmVcIixcclxuICAgICAgICAgICAgICBzdHJva2U6XCJyZ2IoMjAwLDIwMCwyMDApXCIsXHJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6MSxcclxuICAgICAgICAgICAgICBmb250U2l6ZTo1XHJcbiAgICAgICAgICB9LGRyYXdTdHlsZSlcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8U3ZnSWNvbiB7Li4ub3RoZXJzfT5cclxuICAgICAgICA8ZyB7Li4ub3RoZXJEcmF3U3R5bGV9PlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiMThcIiBjeT1cIjRcIiByPVwiMlwiLz5cclxuICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjRcIiBjeT1cIjZcIiByPVwiM1wiLz5cclxuICAgICAgICAgICAgPHRleHQgeD1cIjVcIiB5PVwiMjBcIiBzdHJva2U9e3RleHRTdHJva2V9PkMmbmJzcDtOJm5ic3A7QjwvdGV4dD5cclxuICAgICAgICAgICAgPHBhdGggZD1cIk0gMy41MjA4IDEwLjI1MjUgcSA2Ljk1NTU0IDcuOTg4NTMgMTYuOTA2OCAtNC43NjkwM1wiIGZpbGw9XCJub25lXCIvPlxyXG4gICAgICAgIDwvZz5cclxuICAgIDwvU3ZnSWNvbj5cclxuICAgIClcclxuICB9XHJcbn1cclxuIl19