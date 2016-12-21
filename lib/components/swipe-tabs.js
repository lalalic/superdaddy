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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3N3aXBlLXRhYnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0lBRWE7OztBQUNULDZCQUFhOzs7eUpBQ0EsWUFEQTs7QUFFVCxjQUFLLEtBQUwsR0FBVztBQUNQLG1CQUFNLE1BQUssS0FBTCxDQUFXLEtBQVg7U0FEVixDQUZTOztLQUFiOzs7O2lDQU9ROzs7Z0JBQ0csUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQURIO3lCQUVrQixLQUFLLEtBQUw7Z0JBQWY7Z0JBQUssMkJBRlI7O0FBR0osbUJBQ0k7OztnQkFDSTs7c0JBQU0sT0FBTyxLQUFQLEVBQWMsVUFBVTttQ0FBTyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZDt5QkFBUCxFQUE5QjtvQkFDSyxJQURMO2lCQURKO2dCQUlJOztzQkFBZ0IsT0FBTyxLQUFQLEVBQWMsZUFBZTttQ0FBTyxPQUFLLFFBQUwsQ0FBYyxFQUFDLFlBQUQsRUFBZDt5QkFBUCxFQUE3QztvQkFDSyxRQURMO2lCQUpKO2FBREosQ0FISTs7Ozs7O0FBUkMsY0F1QkYsZUFBYTtBQUNoQixXQUFNLENBQU47O2tCQUlPIiwiZmlsZSI6InN3aXBlLXRhYnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge1RhYnN9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQgU3dpcGVhYmxlVmlld3MgZnJvbSAncmVhY3Qtc3dpcGVhYmxlLXZpZXdzJ1xuXG5leHBvcnQgY2xhc3MgU3dpcGVhYmxlVGFicyBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGU9e1xuICAgICAgICAgICAgaW5kZXg6dGhpcy5wcm9wcy5pbmRleFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtpbmRleH09dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7dGFicyxjaGlsZHJlbn09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8VGFicyB2YWx1ZT17aW5kZXh9IG9uQ2hhbmdlPXtpbmRleD0+dGhpcy5zZXRTdGF0ZSh7aW5kZXh9KX0+XG4gICAgICAgICAgICAgICAgICAgIHt0YWJzfVxuICAgICAgICAgICAgICAgIDwvVGFicz5cbiAgICAgICAgICAgICAgICA8U3dpcGVhYmxlVmlld3MgaW5kZXg9e2luZGV4fSBvbkNoYW5nZUluZGV4PXtpbmRleD0+dGhpcy5zZXRTdGF0ZSh7aW5kZXh9KX0+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L1N3aXBlYWJsZVZpZXdzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzPXtcbiAgICAgICAgaW5kZXg6MFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3dpcGVhYmxlVGFic1xuIl19