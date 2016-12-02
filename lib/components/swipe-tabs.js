"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwipeableTabs = undefined;

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

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SwipeableTabs = exports.SwipeableTabs = function (_Component) {
    (0, _inherits3.default)(SwipeableTabs, _Component);

    function SwipeableTabs() {
        (0, _classCallCheck3.default)(this, SwipeableTabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SwipeableTabs.__proto__ || (0, _getPrototypeOf2.default)(SwipeableTabs)).apply(this, arguments));

        _this.state = {
            index: _this.props.index
        };
        return _this;
    }

    (0, _createClass3.default)(SwipeableTabs, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var index = this.state.index;
            var _props = this.props,
                tabs = _props.tabs,
                children = _props.children;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _materialUi.Tabs,
                    { value: index, onChange: function onChange(index) {
                            return _this2.setState({ index: index });
                        } },
                    tabs
                ),
                _react2.default.createElement(
                    _reactSwipeableViews2.default,
                    { index: index, onChangeIndex: function onChangeIndex(index) {
                            return _this2.setState({ index: index });
                        } },
                    children
                )
            );
        }
    }]);
    return SwipeableTabs;
}(_react.Component);

SwipeableTabs.defaultProps = {
    index: 0
};
exports.default = SwipeableTabs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3N3aXBlLXRhYnMuanMiXSwibmFtZXMiOlsiU3dpcGVhYmxlVGFicyIsImFyZ3VtZW50cyIsInN0YXRlIiwiaW5kZXgiLCJwcm9wcyIsInRhYnMiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFYUEsYSxXQUFBQSxhOzs7QUFDVCw2QkFBYTtBQUFBOztBQUFBLHlKQUNBQyxTQURBOztBQUVULGNBQUtDLEtBQUwsR0FBVztBQUNQQyxtQkFBTSxNQUFLQyxLQUFMLENBQVdEO0FBRFYsU0FBWDtBQUZTO0FBS1o7Ozs7aUNBRU87QUFBQTs7QUFBQSxnQkFDR0EsS0FESCxHQUNVLEtBQUtELEtBRGYsQ0FDR0MsS0FESDtBQUFBLHlCQUVrQixLQUFLQyxLQUZ2QjtBQUFBLGdCQUVHQyxJQUZILFVBRUdBLElBRkg7QUFBQSxnQkFFUUMsUUFGUixVQUVRQSxRQUZSOztBQUdKLG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQkFBTSxPQUFPSCxLQUFiLEVBQW9CLFVBQVU7QUFBQSxtQ0FBTyxPQUFLSSxRQUFMLENBQWMsRUFBQ0osWUFBRCxFQUFkLENBQVA7QUFBQSx5QkFBOUI7QUFDS0U7QUFETCxpQkFESjtBQUlJO0FBQUE7QUFBQSxzQkFBZ0IsT0FBT0YsS0FBdkIsRUFBOEIsZUFBZTtBQUFBLG1DQUFPLE9BQUtJLFFBQUwsQ0FBYyxFQUFDSixZQUFELEVBQWQsQ0FBUDtBQUFBLHlCQUE3QztBQUNLRztBQURMO0FBSkosYUFESjtBQVVIOzs7OztBQXJCUU4sYSxDQXVCRlEsWSxHQUFhO0FBQ2hCTCxXQUFNO0FBRFUsQztrQkFLVEgsYSIsImZpbGUiOiJzd2lwZS10YWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtUYWJzfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IFN3aXBlYWJsZVZpZXdzIGZyb20gJ3JlYWN0LXN3aXBlYWJsZS12aWV3cydcblxuZXhwb3J0IGNsYXNzIFN3aXBlYWJsZVRhYnMgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIGluZGV4OnRoaXMucHJvcHMuaW5kZXhcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7aW5kZXh9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3RhYnMsY2hpbGRyZW59PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFRhYnMgdmFsdWU9e2luZGV4fSBvbkNoYW5nZT17aW5kZXg9PnRoaXMuc2V0U3RhdGUoe2luZGV4fSl9PlxuICAgICAgICAgICAgICAgICAgICB7dGFic31cbiAgICAgICAgICAgICAgICA8L1RhYnM+XG4gICAgICAgICAgICAgICAgPFN3aXBlYWJsZVZpZXdzIGluZGV4PXtpbmRleH0gb25DaGFuZ2VJbmRleD17aW5kZXg9PnRoaXMuc2V0U3RhdGUoe2luZGV4fSl9PlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9Td2lwZWFibGVWaWV3cz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcz17XG4gICAgICAgIGluZGV4OjBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN3aXBlYWJsZVRhYnNcbiJdfQ==