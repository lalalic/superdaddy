"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

exports.dnd = dnd;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _materialUi = require("material-ui");

var _reactDnd = require("react-dnd");

var _lodash = require("lodash.flow");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = function (_Component) {
    (0, _inherits3.default)(ListItem, _Component);

    function ListItem() {
        (0, _classCallCheck3.default)(this, ListItem);
        return (0, _possibleConstructorReturn3.default)(this, (ListItem.__proto__ || (0, _getPrototypeOf2.default)(ListItem)).apply(this, arguments));
    }

    (0, _createClass3.default)(ListItem, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _props = this.props,
                connectDragSource = _props.connectDragSource,
                connectDropTarget = _props.connectDropTarget,
                connectDragPreview = _props.connectDragPreview,
                primaryText = _props.primaryText;

            var dom = (0, _reactDom.findDOMNode)(this);
            connectDragSource(dom);
            connectDropTarget(dom);
            connectDragPreview(_react2.default.createElement(
                "div",
                null,
                primaryText
            ));
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this.componentDidMount();
        }
    }, {
        key: "render",
        value: function render() {
            var _props2 = this.props,
                connectDragSource = _props2.connectDragSource,
                connectDropTarget = _props2.connectDropTarget,
                connectDragPreview = _props2.connectDragPreview,
                isDragging = _props2.isDragging,
                isOver = _props2.isOver,
                canDrop = _props2.canDrop,
                others = (0, _objectWithoutProperties3.default)(_props2, ["connectDragSource", "connectDropTarget", "connectDragPreview", "isDragging", "isOver", "canDrop"]);

            if (isDragging) {
                others.primaryText = "dragging";
            } else if (isOver && canDrop) {
                others.primaryText = "can drop here";
            }
            return _react2.default.createElement(_materialUi.ListItem, others);
        }
    }]);
    return ListItem;
}(_react.Component);

var DEFAULT_TYPE = "UNKNOWN";

function dnd(onDrop) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_TYPE;

    return (0, _lodash2.default)((0, _reactDnd.DragSource)(DEFAULT_TYPE, {
        beginDrag: function beginDrag(props, monitor) {
            return props;
        }
    }, function (connector, monitor) {
        return {
            connectDragSource: connector.dragSource(),
            connectDragPreview: connector.dragPreview(),
            isDragging: monitor.isDragging()
        };
    }), (0, _reactDnd.DropTarget)(DEFAULT_TYPE, {
        drop: function drop(props, monitor, component) {
            if (!monitor.didDrop()) return;
            onDrop(monitor.getItem(), props);
            return props;
        }
    }, function (connector, monitor) {
        return {
            connectDropTarget: connector.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        };
    }))(ListItem);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbImRuZCIsIkxpc3RJdGVtIiwicHJvcHMiLCJjb25uZWN0RHJhZ1NvdXJjZSIsImNvbm5lY3REcm9wVGFyZ2V0IiwiY29ubmVjdERyYWdQcmV2aWV3IiwicHJpbWFyeVRleHQiLCJkb20iLCJjb21wb25lbnREaWRNb3VudCIsImlzRHJhZ2dpbmciLCJpc092ZXIiLCJjYW5Ecm9wIiwib3RoZXJzIiwiREVGQVVMVF9UWVBFIiwib25Ecm9wIiwidHlwZSIsImJlZ2luRHJhZyIsIm1vbml0b3IiLCJjb25uZWN0b3IiLCJkcmFnU291cmNlIiwiZHJhZ1ByZXZpZXciLCJkcm9wIiwiY29tcG9uZW50IiwiZGlkRHJvcCIsImdldEl0ZW0iLCJkcm9wVGFyZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQ2dCQSxHLEdBQUFBLEc7O0FBakNoQjs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7SUFFTUMsUTs7Ozs7Ozs7Ozs0Q0FDaUI7QUFBQSx5QkFDNkQsS0FBS0MsS0FEbEU7QUFBQSxnQkFDUkMsaUJBRFEsVUFDUkEsaUJBRFE7QUFBQSxnQkFDV0MsaUJBRFgsVUFDV0EsaUJBRFg7QUFBQSxnQkFDNkJDLGtCQUQ3QixVQUM2QkEsa0JBRDdCO0FBQUEsZ0JBQ2dEQyxXQURoRCxVQUNnREEsV0FEaEQ7O0FBRWYsZ0JBQUlDLE1BQUksMkJBQVksSUFBWixDQUFSO0FBQ0FKLDhCQUFrQkksR0FBbEI7QUFDQUgsOEJBQWtCRyxHQUFsQjtBQUNBRiwrQkFBbUI7QUFBQTtBQUFBO0FBQU1DO0FBQU4sYUFBbkI7QUFDSDs7OzZDQUVtQjtBQUNoQixpQkFBS0UsaUJBQUw7QUFDSDs7O2lDQUVPO0FBQUEsMEJBRTJDLEtBQUtOLEtBRmhEO0FBQUEsZ0JBQ0dDLGlCQURILFdBQ0dBLGlCQURIO0FBQUEsZ0JBQ3NCQyxpQkFEdEIsV0FDc0JBLGlCQUR0QjtBQUFBLGdCQUN5Q0Msa0JBRHpDLFdBQ3lDQSxrQkFEekM7QUFBQSxnQkFFSUksVUFGSixXQUVJQSxVQUZKO0FBQUEsZ0JBRWdCQyxNQUZoQixXQUVnQkEsTUFGaEI7QUFBQSxnQkFFd0JDLE9BRnhCLFdBRXdCQSxPQUZ4QjtBQUFBLGdCQUVtQ0MsTUFGbkM7O0FBR0osZ0JBQUdILFVBQUgsRUFBYztBQUNWRyx1QkFBT04sV0FBUCxHQUFtQixVQUFuQjtBQUNILGFBRkQsTUFFTSxJQUFHSSxVQUFVQyxPQUFiLEVBQXFCO0FBQ3ZCQyx1QkFBT04sV0FBUCxHQUFtQixlQUFuQjtBQUNIO0FBQ0QsbUJBQU8sb0RBQVFNLE1BQVIsQ0FBUDtBQUNIOzs7OztBQUdMLElBQU1DLGVBQWEsU0FBbkI7O0FBRU8sU0FBU2IsR0FBVCxDQUFhYyxNQUFiLEVBQXNDO0FBQUEsUUFBbEJDLElBQWtCLHVFQUFiRixZQUFhOztBQUN6QyxXQUFPLHNCQUNILDBCQUFXQSxZQUFYLEVBQXdCO0FBQ3BCRyxpQkFEb0IscUJBQ1ZkLEtBRFUsRUFDSmUsT0FESSxFQUNJO0FBQ3BCLG1CQUFPZixLQUFQO0FBQ0g7QUFIbUIsS0FBeEIsRUFJRSxVQUFDZ0IsU0FBRCxFQUFXRCxPQUFYLEVBQXFCO0FBQ25CLGVBQU87QUFDSGQsK0JBQW1CZSxVQUFVQyxVQUFWLEVBRGhCO0FBRUZkLGdDQUFvQmEsVUFBVUUsV0FBVixFQUZsQjtBQUdGWCx3QkFBWVEsUUFBUVIsVUFBUjtBQUhWLFNBQVA7QUFLSCxLQVZELENBREcsRUFZSCwwQkFBV0ksWUFBWCxFQUF3QjtBQUNwQlEsWUFEb0IsZ0JBQ2ZuQixLQURlLEVBQ1RlLE9BRFMsRUFDREssU0FEQyxFQUNTO0FBQ3pCLGdCQUFHLENBQUNMLFFBQVFNLE9BQVIsRUFBSixFQUNJO0FBQ0pULG1CQUFPRyxRQUFRTyxPQUFSLEVBQVAsRUFBMEJ0QixLQUExQjtBQUNBLG1CQUFPQSxLQUFQO0FBQ0g7QUFObUIsS0FBeEIsRUFPRSxVQUFDZ0IsU0FBRCxFQUFXRCxPQUFYLEVBQXFCO0FBQ25CLGVBQU87QUFDSGIsK0JBQW1CYyxVQUFVTyxVQUFWLEVBRGhCO0FBRUZmLG9CQUFRTyxRQUFRUCxNQUFSLEVBRk47QUFHRkMscUJBQVNNLFFBQVFOLE9BQVI7QUFIUCxTQUFQO0FBS0gsS0FiRCxDQVpHLEVBMEJOVixRQTFCTSxDQUFQO0FBMkJIIiwiZmlsZSI6ImRuZC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7TGlzdEl0ZW0gYXMgTGl9IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge0RyYWdTb3VyY2UsIERyb3BUYXJnZXR9IGZyb20gXCJyZWFjdC1kbmRcIlxuaW1wb3J0IGZsb3cgZnJvbSBcImxvZGFzaC5mbG93XCJcblxuY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCxjb25uZWN0RHJhZ1ByZXZpZXcscHJpbWFyeVRleHR9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IGRvbT1maW5kRE9NTm9kZSh0aGlzKVxuICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZShkb20pXG4gICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0KGRvbSlcbiAgICAgICAgY29ubmVjdERyYWdQcmV2aWV3KDxkaXY+e3ByaW1hcnlUZXh0fTwvZGl2PilcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtjb25uZWN0RHJhZ1NvdXJjZSwgY29ubmVjdERyb3BUYXJnZXQsIGNvbm5lY3REcmFnUHJldmlldyxcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nLCBpc092ZXIsIGNhbkRyb3AsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGlmKGlzRHJhZ2dpbmcpe1xuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PVwiZHJhZ2dpbmdcIlxuICAgICAgICB9ZWxzZSBpZihpc092ZXIgJiYgY2FuRHJvcCl7XG4gICAgICAgICAgICBvdGhlcnMucHJpbWFyeVRleHQ9XCJjYW4gZHJvcCBoZXJlXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPExpIHsuLi5vdGhlcnN9Lz5cbiAgICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVFlQRT1cIlVOS05PV05cIlxuXG5leHBvcnQgZnVuY3Rpb24gZG5kKG9uRHJvcCx0eXBlPURFRkFVTFRfVFlQRSl7XG4gICAgcmV0dXJuIGZsb3coXG4gICAgICAgIERyYWdTb3VyY2UoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGJlZ2luRHJhZyhwcm9wcyxtb25pdG9yKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcmFnU291cmNlOiBjb25uZWN0b3IuZHJhZ1NvdXJjZSgpXG4gICAgICAgICAgICAgICAgLGNvbm5lY3REcmFnUHJldmlldzogY29ubmVjdG9yLmRyYWdQcmV2aWV3KClcbiAgICAgICAgICAgICAgICAsaXNEcmFnZ2luZzogbW9uaXRvci5pc0RyYWdnaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIERyb3BUYXJnZXQoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGRyb3AocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmRpZERyb3AoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgb25Ecm9wKG1vbml0b3IuZ2V0SXRlbSgpLCBwcm9wcylcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0OiBjb25uZWN0b3IuZHJvcFRhcmdldCgpXG4gICAgICAgICAgICAgICAgLGlzT3ZlcjogbW9uaXRvci5pc092ZXIoKVxuICAgICAgICAgICAgICAgICxjYW5Ecm9wOiBtb25pdG9yLmNhbkRyb3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAoTGlzdEl0ZW0pXG59XG4iXX0=