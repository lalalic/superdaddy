"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SwipeableTabs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _reactSwipeableViews = require("react-swipeable-views");

var _reactSwipeableViews2 = _interopRequireDefault(_reactSwipeableViews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwipeableTabs = exports.SwipeableTabs = function (_Component) {
    _inherits(SwipeableTabs, _Component);

    function SwipeableTabs() {
        _classCallCheck(this, SwipeableTabs);

        var _this = _possibleConstructorReturn(this, (SwipeableTabs.__proto__ || Object.getPrototypeOf(SwipeableTabs)).apply(this, arguments));

        _this.state = {
            index: _this.props.index
        };
        return _this;
    }

    _createClass(SwipeableTabs, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3N3aXBlLXRhYnMuanMiXSwibmFtZXMiOlsiU3dpcGVhYmxlVGFicyIsImFyZ3VtZW50cyIsInN0YXRlIiwiaW5kZXgiLCJwcm9wcyIsInRhYnMiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYUEsYSxXQUFBQSxhOzs7QUFDVCw2QkFBYTtBQUFBOztBQUFBLG1JQUNBQyxTQURBOztBQUVULGNBQUtDLEtBQUwsR0FBVztBQUNQQyxtQkFBTSxNQUFLQyxLQUFMLENBQVdEO0FBRFYsU0FBWDtBQUZTO0FBS1o7Ozs7aUNBRU87QUFBQTs7QUFBQSxnQkFDR0EsS0FESCxHQUNVLEtBQUtELEtBRGYsQ0FDR0MsS0FESDtBQUFBLHlCQUVrQixLQUFLQyxLQUZ2QjtBQUFBLGdCQUVHQyxJQUZILFVBRUdBLElBRkg7QUFBQSxnQkFFUUMsUUFGUixVQUVRQSxRQUZSOztBQUdKLG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQkFBTSxPQUFPSCxLQUFiLEVBQW9CLFVBQVU7QUFBQSxtQ0FBTyxPQUFLSSxRQUFMLENBQWMsRUFBQ0osWUFBRCxFQUFkLENBQVA7QUFBQSx5QkFBOUI7QUFDS0U7QUFETCxpQkFESjtBQUlJO0FBQUE7QUFBQSxzQkFBZ0IsT0FBT0YsS0FBdkIsRUFBOEIsZUFBZTtBQUFBLG1DQUFPLE9BQUtJLFFBQUwsQ0FBYyxFQUFDSixZQUFELEVBQWQsQ0FBUDtBQUFBLHlCQUE3QztBQUNLRztBQURMO0FBSkosYUFESjtBQVVIOzs7Ozs7QUFyQlFOLGEsQ0F1QkZRLFksR0FBYTtBQUNoQkwsV0FBTTtBQURVLEM7a0JBS1RILGEiLCJmaWxlIjoic3dpcGUtdGFicy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtUYWJzfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgU3dpcGVhYmxlVmlld3MgZnJvbSAncmVhY3Qtc3dpcGVhYmxlLXZpZXdzJ1xyXG5cclxuZXhwb3J0IGNsYXNzIFN3aXBlYWJsZVRhYnMgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnN0YXRlPXtcclxuICAgICAgICAgICAgaW5kZXg6dGhpcy5wcm9wcy5pbmRleFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7aW5kZXh9PXRoaXMuc3RhdGVcclxuICAgICAgICBjb25zdCB7dGFicyxjaGlsZHJlbn09dGhpcy5wcm9wc1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8VGFicyB2YWx1ZT17aW5kZXh9IG9uQ2hhbmdlPXtpbmRleD0+dGhpcy5zZXRTdGF0ZSh7aW5kZXh9KX0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RhYnN9XHJcbiAgICAgICAgICAgICAgICA8L1RhYnM+XHJcbiAgICAgICAgICAgICAgICA8U3dpcGVhYmxlVmlld3MgaW5kZXg9e2luZGV4fSBvbkNoYW5nZUluZGV4PXtpbmRleD0+dGhpcy5zZXRTdGF0ZSh7aW5kZXh9KX0+XHJcbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9Td2lwZWFibGVWaWV3cz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xyXG4gICAgICAgIGluZGV4OjBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3dpcGVhYmxlVGFic1xyXG4iXX0=