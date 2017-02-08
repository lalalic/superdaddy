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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3N3aXBlLXRhYnMuanMiXSwibmFtZXMiOlsiU3dpcGVhYmxlVGFicyIsImFyZ3VtZW50cyIsInN0YXRlIiwiaW5kZXgiLCJwcm9wcyIsInRhYnMiLCJjaGlsZHJlbiIsInNldFN0YXRlIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFYUEsYSxXQUFBQSxhOzs7QUFDVCw2QkFBYTtBQUFBOztBQUFBLG1JQUNBQyxTQURBOztBQUVULGNBQUtDLEtBQUwsR0FBVztBQUNQQyxtQkFBTSxNQUFLQyxLQUFMLENBQVdEO0FBRFYsU0FBWDtBQUZTO0FBS1o7Ozs7aUNBRU87QUFBQTs7QUFBQSxnQkFDR0EsS0FESCxHQUNVLEtBQUtELEtBRGYsQ0FDR0MsS0FESDtBQUFBLHlCQUVrQixLQUFLQyxLQUZ2QjtBQUFBLGdCQUVHQyxJQUZILFVBRUdBLElBRkg7QUFBQSxnQkFFUUMsUUFGUixVQUVRQSxRQUZSOztBQUdKLG1CQUNJO0FBQUE7QUFBQTtBQUNJO0FBQUE7QUFBQSxzQkFBTSxPQUFPSCxLQUFiLEVBQW9CLFVBQVU7QUFBQSxtQ0FBTyxPQUFLSSxRQUFMLENBQWMsRUFBQ0osWUFBRCxFQUFkLENBQVA7QUFBQSx5QkFBOUI7QUFDS0U7QUFETCxpQkFESjtBQUlJO0FBQUE7QUFBQSxzQkFBZ0IsT0FBT0YsS0FBdkIsRUFBOEIsZUFBZTtBQUFBLG1DQUFPLE9BQUtJLFFBQUwsQ0FBYyxFQUFDSixZQUFELEVBQWQsQ0FBUDtBQUFBLHlCQUE3QztBQUNLRztBQURMO0FBSkosYUFESjtBQVVIOzs7Ozs7QUFyQlFOLGEsQ0F1QkZRLFksR0FBYTtBQUNoQkwsV0FBTTtBQURVLEM7a0JBS1RILGEiLCJmaWxlIjoic3dpcGUtdGFicy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7VGFic30gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCBTd2lwZWFibGVWaWV3cyBmcm9tICdyZWFjdC1zd2lwZWFibGUtdmlld3MnXG5cbmV4cG9ydCBjbGFzcyBTd2lwZWFibGVUYWJzIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBpbmRleDp0aGlzLnByb3BzLmluZGV4XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2luZGV4fT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHt0YWJzLGNoaWxkcmVufT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxUYWJzIHZhbHVlPXtpbmRleH0gb25DaGFuZ2U9e2luZGV4PT50aGlzLnNldFN0YXRlKHtpbmRleH0pfT5cbiAgICAgICAgICAgICAgICAgICAge3RhYnN9XG4gICAgICAgICAgICAgICAgPC9UYWJzPlxuICAgICAgICAgICAgICAgIDxTd2lwZWFibGVWaWV3cyBpbmRleD17aW5kZXh9IG9uQ2hhbmdlSW5kZXg9e2luZGV4PT50aGlzLnNldFN0YXRlKHtpbmRleH0pfT5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvU3dpcGVhYmxlVmlld3M+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuICAgICAgICBpbmRleDowXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTd2lwZWFibGVUYWJzXG4iXX0=