"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _swapVert = require("material-ui/svg-icons/action/swap-vert");

var _swapVert2 = _interopRequireDefault(_swapVert);

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

            connectDragSource((0, _reactDom.findDOMNode)(this.refs.order));
            connectDropTarget((0, _reactDom.findDOMNode)(this));
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
            return _react2.default.createElement(_materialUi.ListItem, (0, _extends3.default)({}, others, { rightIconButton: _react2.default.createElement(
                    _materialUi.IconButton,
                    { ref: "order" },
                    _react2.default.createElement(_swapVert2.default, null)
                ) }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbImRuZCIsIkxpc3RJdGVtIiwicHJvcHMiLCJjb25uZWN0RHJhZ1NvdXJjZSIsImNvbm5lY3REcm9wVGFyZ2V0IiwiY29ubmVjdERyYWdQcmV2aWV3IiwicHJpbWFyeVRleHQiLCJyZWZzIiwib3JkZXIiLCJjb21wb25lbnREaWRNb3VudCIsImlzRHJhZ2dpbmciLCJpc092ZXIiLCJjYW5Ecm9wIiwib3RoZXJzIiwiREVGQVVMVF9UWVBFIiwib25Ecm9wIiwidHlwZSIsImJlZ2luRHJhZyIsIm1vbml0b3IiLCJjb25uZWN0b3IiLCJkcmFnU291cmNlIiwiZHJhZ1ByZXZpZXciLCJkcm9wIiwiY29tcG9uZW50IiwiZGlkRHJvcCIsImdldEl0ZW0iLCJkcm9wVGFyZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBaUNnQkEsRyxHQUFBQSxHOztBQWpDaEI7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUMsUTs7Ozs7Ozs7Ozs0Q0FDaUI7QUFBQSx5QkFDNkQsS0FBS0MsS0FEbEU7QUFBQSxnQkFDUkMsaUJBRFEsVUFDUkEsaUJBRFE7QUFBQSxnQkFDV0MsaUJBRFgsVUFDV0EsaUJBRFg7QUFBQSxnQkFDNkJDLGtCQUQ3QixVQUM2QkEsa0JBRDdCO0FBQUEsZ0JBQ2dEQyxXQURoRCxVQUNnREEsV0FEaEQ7O0FBRWZILDhCQUFrQiwyQkFBWSxLQUFLSSxJQUFMLENBQVVDLEtBQXRCLENBQWxCO0FBQ0FKLDhCQUFrQiwyQkFBWSxJQUFaLENBQWxCO0FBQ0g7Ozs2Q0FFbUI7QUFDaEIsaUJBQUtLLGlCQUFMO0FBQ0g7OztpQ0FFTztBQUFBLDBCQUUyQyxLQUFLUCxLQUZoRDtBQUFBLGdCQUNHQyxpQkFESCxXQUNHQSxpQkFESDtBQUFBLGdCQUNzQkMsaUJBRHRCLFdBQ3NCQSxpQkFEdEI7QUFBQSxnQkFDeUNDLGtCQUR6QyxXQUN5Q0Esa0JBRHpDO0FBQUEsZ0JBRUlLLFVBRkosV0FFSUEsVUFGSjtBQUFBLGdCQUVnQkMsTUFGaEIsV0FFZ0JBLE1BRmhCO0FBQUEsZ0JBRXdCQyxPQUZ4QixXQUV3QkEsT0FGeEI7QUFBQSxnQkFFbUNDLE1BRm5DOztBQUdKLGdCQUFHSCxVQUFILEVBQWM7QUFDVkcsdUJBQU9QLFdBQVAsR0FBbUIsVUFBbkI7QUFDSCxhQUZELE1BRU0sSUFBR0ssVUFBVUMsT0FBYixFQUFxQjtBQUN2QkMsdUJBQU9QLFdBQVAsR0FBbUIsZUFBbkI7QUFDSDtBQUNELG1CQUFPLCtFQUFRTyxNQUFSLElBQWdCLGlCQUFpQjtBQUFBO0FBQUEsc0JBQWEsS0FBSSxPQUFqQjtBQUF5QjtBQUF6QixpQkFBakMsSUFBUDtBQUNIOzs7OztBQUdMLElBQU1DLGVBQWEsU0FBbkI7O0FBRU8sU0FBU2QsR0FBVCxDQUFhZSxNQUFiLEVBQXNDO0FBQUEsUUFBbEJDLElBQWtCLHVFQUFiRixZQUFhOztBQUN6QyxXQUFPLHNCQUNILDBCQUFXQSxZQUFYLEVBQXdCO0FBQ3BCRyxpQkFEb0IscUJBQ1ZmLEtBRFUsRUFDSmdCLE9BREksRUFDSTtBQUNwQixtQkFBT2hCLEtBQVA7QUFDSDtBQUhtQixLQUF4QixFQUlFLFVBQUNpQixTQUFELEVBQVdELE9BQVgsRUFBcUI7QUFDbkIsZUFBTztBQUNIZiwrQkFBbUJnQixVQUFVQyxVQUFWLEVBRGhCO0FBRUZmLGdDQUFvQmMsVUFBVUUsV0FBVixFQUZsQjtBQUdGWCx3QkFBWVEsUUFBUVIsVUFBUjtBQUhWLFNBQVA7QUFLSCxLQVZELENBREcsRUFZSCwwQkFBV0ksWUFBWCxFQUF3QjtBQUNwQlEsWUFEb0IsZ0JBQ2ZwQixLQURlLEVBQ1RnQixPQURTLEVBQ0RLLFNBREMsRUFDUztBQUN6QixnQkFBRyxDQUFDTCxRQUFRTSxPQUFSLEVBQUosRUFDSTtBQUNKVCxtQkFBT0csUUFBUU8sT0FBUixFQUFQLEVBQTBCdkIsS0FBMUI7QUFDQSxtQkFBT0EsS0FBUDtBQUNIO0FBTm1CLEtBQXhCLEVBT0UsVUFBQ2lCLFNBQUQsRUFBV0QsT0FBWCxFQUFxQjtBQUNuQixlQUFPO0FBQ0hkLCtCQUFtQmUsVUFBVU8sVUFBVixFQURoQjtBQUVGZixvQkFBUU8sUUFBUVAsTUFBUixFQUZOO0FBR0ZDLHFCQUFTTSxRQUFRTixPQUFSO0FBSFAsU0FBUDtBQUtILEtBYkQsQ0FaRyxFQTBCTlgsUUExQk0sQ0FBUDtBQTJCSCIsImZpbGUiOiJkbmQtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge0xpc3RJdGVtIGFzIExpLCBJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtEcmFnU291cmNlLCBEcm9wVGFyZ2V0fSBmcm9tIFwicmVhY3QtZG5kXCJcbmltcG9ydCBmbG93IGZyb20gXCJsb2Rhc2guZmxvd1wiXG5cbmltcG9ydCBJY29uT3JkZXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc3dhcC12ZXJ0XCJcblxuY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCxjb25uZWN0RHJhZ1ByZXZpZXcscHJpbWFyeVRleHR9PXRoaXMucHJvcHNcbiAgICAgICAgY29ubmVjdERyYWdTb3VyY2UoZmluZERPTU5vZGUodGhpcy5yZWZzLm9yZGVyKSlcbiAgICAgICAgY29ubmVjdERyb3BUYXJnZXQoZmluZERPTU5vZGUodGhpcykpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7Y29ubmVjdERyYWdTb3VyY2UsIGNvbm5lY3REcm9wVGFyZ2V0LCBjb25uZWN0RHJhZ1ByZXZpZXcsXG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZywgaXNPdmVyLCBjYW5Ecm9wLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICBpZihpc0RyYWdnaW5nKXtcbiAgICAgICAgICAgIG90aGVycy5wcmltYXJ5VGV4dD1cImRyYWdnaW5nXCJcbiAgICAgICAgfWVsc2UgaWYoaXNPdmVyICYmIGNhbkRyb3Ape1xuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PVwiY2FuIGRyb3AgaGVyZVwiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxMaSB7Li4ub3RoZXJzfSByaWdodEljb25CdXR0b249ezxJY29uQnV0dG9uICByZWY9XCJvcmRlclwiPjxJY29uT3JkZXIvPjwvSWNvbkJ1dHRvbj59Lz5cbiAgICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVFlQRT1cIlVOS05PV05cIlxuXG5leHBvcnQgZnVuY3Rpb24gZG5kKG9uRHJvcCx0eXBlPURFRkFVTFRfVFlQRSl7XG4gICAgcmV0dXJuIGZsb3coXG4gICAgICAgIERyYWdTb3VyY2UoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGJlZ2luRHJhZyhwcm9wcyxtb25pdG9yKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcmFnU291cmNlOiBjb25uZWN0b3IuZHJhZ1NvdXJjZSgpXG4gICAgICAgICAgICAgICAgLGNvbm5lY3REcmFnUHJldmlldzogY29ubmVjdG9yLmRyYWdQcmV2aWV3KClcbiAgICAgICAgICAgICAgICAsaXNEcmFnZ2luZzogbW9uaXRvci5pc0RyYWdnaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIERyb3BUYXJnZXQoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGRyb3AocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmRpZERyb3AoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgb25Ecm9wKG1vbml0b3IuZ2V0SXRlbSgpLCBwcm9wcylcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0OiBjb25uZWN0b3IuZHJvcFRhcmdldCgpXG4gICAgICAgICAgICAgICAgLGlzT3ZlcjogbW9uaXRvci5pc092ZXIoKVxuICAgICAgICAgICAgICAgICxjYW5Ecm9wOiBtb25pdG9yLmNhbkRyb3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAoTGlzdEl0ZW0pXG59XG4iXX0=