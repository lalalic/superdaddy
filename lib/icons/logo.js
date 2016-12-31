"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Logo = function (_Component) {
    _inherits(Logo, _Component);

    function Logo() {
        _classCallCheck(this, Logo);

        return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
    }

    _createClass(Logo, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                _props$drawStyle = _props.drawStyle,
                drawStyle = _props$drawStyle === undefined ? {} : _props$drawStyle,
                others = _objectWithoutProperties(_props, ["drawStyle"]);

            var _Object$assign = Object.assign({
                fill: "none",
                stroke: "rgb(200,200,200)",
                strokeWidth: 1,
                fontSize: 5
            }, drawStyle),
                _Object$assign$textSt = _Object$assign.textStroke,
                textStroke = _Object$assign$textSt === undefined ? "lightgray" : _Object$assign$textSt,
                otherDrawStyle = _objectWithoutProperties(_Object$assign, ["textStroke"]);

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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pY29ucy9sb2dvLmpzIl0sIm5hbWVzIjpbIkxvZ28iLCJwcm9wcyIsImRyYXdTdHlsZSIsIm90aGVycyIsIk9iamVjdCIsImFzc2lnbiIsImZpbGwiLCJzdHJva2UiLCJzdHJva2VXaWR0aCIsImZvbnRTaXplIiwidGV4dFN0cm9rZSIsIm90aGVyRHJhd1N0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7aUNBQ1Y7QUFBQSx5QkFDeUIsS0FBS0MsS0FEOUI7QUFBQSwwQ0FDQUMsU0FEQTtBQUFBLGdCQUNBQSxTQURBLG9DQUNVLEVBRFY7QUFBQSxnQkFDaUJDLE1BRGpCOztBQUFBLGlDQUUyQ0MsT0FBT0MsTUFBUCxDQUFjO0FBQ3REQyxzQkFBSyxNQURpRDtBQUV0REMsd0JBQU8sa0JBRitDO0FBR3REQyw2QkFBWSxDQUgwQztBQUl0REMsMEJBQVM7QUFKNkMsYUFBZCxFQUsxQ1AsU0FMMEMsQ0FGM0M7QUFBQSx1REFFQVEsVUFGQTtBQUFBLGdCQUVBQSxVQUZBLHlDQUVXLFdBRlg7QUFBQSxnQkFFMkJDLGNBRjNCOztBQVNQLG1CQUNFO0FBQUE7QUFBYVIsc0JBQWI7QUFDRTtBQUFBO0FBQU9RLGtDQUFQO0FBQ0ksOERBQVEsSUFBRyxJQUFYLEVBQWdCLElBQUcsR0FBbkIsRUFBdUIsR0FBRSxHQUF6QixHQURKO0FBRUksOERBQVEsSUFBRyxHQUFYLEVBQWUsSUFBRyxHQUFsQixFQUFzQixHQUFFLEdBQXhCLEdBRko7QUFHSTtBQUFBO0FBQUEsMEJBQU0sR0FBRSxHQUFSLEVBQVksR0FBRSxJQUFkLEVBQW1CLFFBQVFELFVBQTNCO0FBQUE7QUFBQSxxQkFISjtBQUlJLDREQUFNLEdBQUUscURBQVIsRUFBOEQsTUFBSyxNQUFuRTtBQUpKO0FBREYsYUFERjtBQVVEOzs7Ozs7a0JBcEJrQlYsSSIsImZpbGUiOiJsb2dvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQge1N2Z0ljb259IGZyb20gJ21hdGVyaWFsLXVpJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nbyBleHRlbmRzIENvbXBvbmVudHtcclxuICByZW5kZXIoKSB7XHJcbiAgICAgIHZhciB7ZHJhd1N0eWxlPXt9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcclxuICAgICAgdmFyIHt0ZXh0U3Ryb2tlPVwibGlnaHRncmF5XCIsIC4uLm90aGVyRHJhd1N0eWxlfT1PYmplY3QuYXNzaWduKHtcclxuICAgICAgICAgICAgICBmaWxsOlwibm9uZVwiLFxyXG4gICAgICAgICAgICAgIHN0cm9rZTpcInJnYigyMDAsMjAwLDIwMClcIixcclxuICAgICAgICAgICAgICBzdHJva2VXaWR0aDoxLFxyXG4gICAgICAgICAgICAgIGZvbnRTaXplOjVcclxuICAgICAgICAgIH0sZHJhd1N0eWxlKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTdmdJY29uIHsuLi5vdGhlcnN9PlxyXG4gICAgICAgIDxnIHsuLi5vdGhlckRyYXdTdHlsZX0+XHJcbiAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIxOFwiIGN5PVwiNFwiIHI9XCIyXCIvPlxyXG4gICAgICAgICAgICA8Y2lyY2xlIGN4PVwiNFwiIGN5PVwiNlwiIHI9XCIzXCIvPlxyXG4gICAgICAgICAgICA8dGV4dCB4PVwiNVwiIHk9XCIyMFwiIHN0cm9rZT17dGV4dFN0cm9rZX0+QyZuYnNwO04mbmJzcDtCPC90ZXh0PlxyXG4gICAgICAgICAgICA8cGF0aCBkPVwiTSAzLjUyMDggMTAuMjUyNSBxIDYuOTU1NTQgNy45ODg1MyAxNi45MDY4IC00Ljc2OTAzXCIgZmlsbD1cIm5vbmVcIi8+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgPC9TdmdJY29uPlxyXG4gICAgKVxyXG4gIH1cclxufVxyXG4iXX0=