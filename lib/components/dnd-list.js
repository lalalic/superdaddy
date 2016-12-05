"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

            connectDragSource((0, _reactDom.findDOMNode)(this.refs.order), { dropEffect: "copy" });
            connectDropTarget((0, _reactDom.findDOMNode)(this));
            connectDragPreview((0, _reactDom.findDOMNode)(this), {});
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
                index = _props2.index,
                parent = _props2.parent,
                isDragging = _props2.isDragging,
                isOver = _props2.isOver,
                canDrop = _props2.canDrop,
                others = (0, _objectWithoutProperties3.default)(_props2, ["connectDragSource", "connectDropTarget", "connectDragPreview", "index", "parent", "isDragging", "isOver", "canDrop"]);

            if (isDragging) {
                others.primaryText = _react2.default.createElement(
                    "span",
                    { style: { visibility: "hidden" } },
                    others.primaryText
                );
            } else if (isOver && canDrop) {
                others.primaryText = "can drop here";
            } else {
                others.rightIconButton = _react2.default.createElement(
                    _materialUi.IconButton,
                    { ref: "order", disableTouchRipple: true },
                    _react2.default.createElement(_swapVert2.default, null)
                );
            }
            return _react2.default.createElement(_materialUi.ListItem, others);
        }
    }]);
    return ListItem;
}(_react.Component);

var List = function (_Component2) {
    (0, _inherits3.default)(List, _Component2);

    function List() {
        var _ref;

        var _temp, _this2, _ret;

        (0, _classCallCheck3.default)(this, List);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, (_ref = List.__proto__ || (0, _getPrototypeOf2.default)(List)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            data: _this2.props.data,
            dragging: -1,
            hovering: -1
        }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
    }

    (0, _createClass3.default)(List, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                data = _state.data,
                dragging = _state.dragging,
                hovering = _state.hovering;
            var _props3 = this.props,
                template = _props3.template,
                onDrop = _props3.onDrop,
                dndType = _props3.dndType;

            var ListItem = dnd(onDrop, dndType);
            var items = data.map(function (a, i) {
                return _react2.default.createElement(ListItem, (0, _extends3.default)({}, template(a).props, { key: i, index: i, parent: _this3 }));
            });
            if (dragging != -1 && hovering != -1) {
                var _items$splice = items.splice(dragging, 1),
                    _items$splice2 = (0, _slicedToArray3.default)(_items$splice, 1),
                    moving = _items$splice2[0];

                if (hovering > dragging) items.splice(hovering - 1, 0, moving);else items.splice(hovering, 0, moving);
            }

            return _react2.default.createElement(
                _materialUi.List,
                null,
                items
            );
        }
    }]);
    return List;
}(_react.Component);

var DEFAULT_TYPE = "UNKNOWN";

function dnd(onDrop) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_TYPE;

    return (0, _lodash2.default)((0, _reactDnd.DragSource)(DEFAULT_TYPE, {
        beginDrag: function beginDrag(props, monitor) {
            return { index: props.index };
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
            onDrop(monitor.getItem().index, props.index);
            return props;
        },
        hover: function hover(props, monitor, component) {
            if (!monitor.canDrop()) return;
            var list = component.props.parent;

            list.setState({ dragging: monitor.getItem().index, hovering: props.index });
        }
    }, function (connector, monitor) {
        return {
            connectDropTarget: connector.dropTarget(),
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        };
    }))(ListItem);
}

exports.default = { List: List, ListItem: _materialUi.ListItem };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwicHJvcHMiLCJjb25uZWN0RHJhZ1NvdXJjZSIsImNvbm5lY3REcm9wVGFyZ2V0IiwiY29ubmVjdERyYWdQcmV2aWV3IiwicHJpbWFyeVRleHQiLCJyZWZzIiwib3JkZXIiLCJkcm9wRWZmZWN0IiwiY29tcG9uZW50RGlkTW91bnQiLCJpbmRleCIsInBhcmVudCIsImlzRHJhZ2dpbmciLCJpc092ZXIiLCJjYW5Ecm9wIiwib3RoZXJzIiwidmlzaWJpbGl0eSIsInJpZ2h0SWNvbkJ1dHRvbiIsIkxpc3QiLCJzdGF0ZSIsImRhdGEiLCJkcmFnZ2luZyIsImhvdmVyaW5nIiwidGVtcGxhdGUiLCJvbkRyb3AiLCJkbmRUeXBlIiwiZG5kIiwiaXRlbXMiLCJtYXAiLCJhIiwiaSIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJzcGxpY2UiLCJtb3ZpbmciLCJERUZBVUxUX1RZUEUiLCJ0eXBlIiwiYmVnaW5EcmFnIiwibW9uaXRvciIsImNvbm5lY3RvciIsImRyYWdTb3VyY2UiLCJkcmFnUHJldmlldyIsImRyb3AiLCJjb21wb25lbnQiLCJkaWREcm9wIiwiZ2V0SXRlbSIsImhvdmVyIiwibGlzdCIsInNldFN0YXRlIiwiZHJvcFRhcmdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztJQUVNQSxROzs7Ozs7Ozs7OzRDQUNpQjtBQUFBLHlCQUM2RCxLQUFLQyxLQURsRTtBQUFBLGdCQUNSQyxpQkFEUSxVQUNSQSxpQkFEUTtBQUFBLGdCQUNXQyxpQkFEWCxVQUNXQSxpQkFEWDtBQUFBLGdCQUM2QkMsa0JBRDdCLFVBQzZCQSxrQkFEN0I7QUFBQSxnQkFDZ0RDLFdBRGhELFVBQ2dEQSxXQURoRDs7QUFFZkgsOEJBQWtCLDJCQUFZLEtBQUtJLElB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eEIsT0FBUjtBQUhQLFNBQVA7QUFLSCxLQW5CRCxDQVpHLEVBZ0NOZCxRQWhDTSxDQUFQO0FBaUNIOztrQkFFYyxFQUFDa0IsVUFBRCxFQUFPbEIsOEJBQVAsRSIsImZpbGUiOiJkbmQtbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSBcInJlYWN0LWRvbVwiXG5pbXBvcnQge0xpc3QgYXMgVWwsIExpc3RJdGVtIGFzIExpLCBJY29uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxuaW1wb3J0IHtEcmFnU291cmNlLCBEcm9wVGFyZ2V0fSBmcm9tIFwicmVhY3QtZG5kXCJcbmltcG9ydCBmbG93IGZyb20gXCJsb2Rhc2guZmxvd1wiXG5cbmltcG9ydCBJY29uT3JkZXIgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc3dhcC12ZXJ0XCJcblxuY2xhc3MgTGlzdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCxjb25uZWN0RHJhZ1ByZXZpZXcscHJpbWFyeVRleHR9PXRoaXMucHJvcHNcbiAgICAgICAgY29ubmVjdERyYWdTb3VyY2UoZmluZERPTU5vZGUodGhpcy5yZWZzLm9yZGVyKSx7ZHJvcEVmZmVjdDpcImNvcHlcIn0pXG4gICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0KGZpbmRET01Ob2RlKHRoaXMpKVxuICAgICAgICBjb25uZWN0RHJhZ1ByZXZpZXcoZmluZERPTU5vZGUodGhpcykse30pXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XG4gICAgICAgIHRoaXMuY29tcG9uZW50RGlkTW91bnQoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7Y29ubmVjdERyYWdTb3VyY2UsIGNvbm5lY3REcm9wVGFyZ2V0LCBjb25uZWN0RHJhZ1ByZXZpZXcsIGluZGV4LCBwYXJlbnQsXG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZywgaXNPdmVyLCBjYW5Ecm9wLC4uLm90aGVyc309dGhpcy5wcm9wc1xuICAgICAgICBpZihpc0RyYWdnaW5nKXtcbiAgICAgICAgICAgIG90aGVycy5wcmltYXJ5VGV4dD0oPHNwYW4gc3R5bGU9e3t2aXNpYmlsaXR5OlwiaGlkZGVuXCJ9fT57b3RoZXJzLnByaW1hcnlUZXh0fTwvc3Bhbj4pXG4gICAgICAgIH1lbHNlIGlmKGlzT3ZlciAmJiBjYW5Ecm9wKXtcbiAgICAgICAgICAgIG90aGVycy5wcmltYXJ5VGV4dD1cImNhbiBkcm9wIGhlcmVcIlxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG90aGVycy5yaWdodEljb25CdXR0b249KFxuICAgICAgICAgICAgICAgIDxJY29uQnV0dG9uICByZWY9XCJvcmRlclwiIGRpc2FibGVUb3VjaFJpcHBsZT17dHJ1ZX0+XG4gICAgICAgICAgICAgICAgICAgIDxJY29uT3JkZXIvPlxuICAgICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPExpIHsuLi5vdGhlcnN9Lz5cbiAgICB9XG59XG5cbmNsYXNzIExpc3QgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc3RhdGU9e1xuICAgICAgICBkYXRhOnRoaXMucHJvcHMuZGF0YVxuICAgICAgICAsZHJhZ2dpbmc6LTFcbiAgICAgICAgLGhvdmVyaW5nOi0xXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICBjb25zdCB7ZGF0YSwgZHJhZ2dpbmcsIGhvdmVyaW5nfT10aGlzLnN0YXRlXG4gICAgICAgIGNvbnN0IHt0ZW1wbGF0ZSxvbkRyb3AsZG5kVHlwZX09dGhpcy5wcm9wc1xuICAgICAgICBjb25zdCBMaXN0SXRlbT1kbmQob25Ecm9wLGRuZFR5cGUpXG4gICAgICAgIGxldCBpdGVtcz1kYXRhLm1hcCgoYSxpKT0+UmVhY3QuY3JlYXRlRWxlbWVudChMaXN0SXRlbSx7Li4udGVtcGxhdGUoYSkucHJvcHMsa2V5OmksaW5kZXg6aSxwYXJlbnQ6dGhpc30pKVxuICAgICAgICBpZihkcmFnZ2luZyE9LTEgJiYgaG92ZXJpbmchPS0xKXtcbiAgICAgICAgICAgIGxldCBbbW92aW5nXT1pdGVtcy5zcGxpY2UoZHJhZ2dpbmcsMSlcbiAgICAgICAgICAgIGlmKGhvdmVyaW5nPmRyYWdnaW5nKVxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShob3ZlcmluZy0xLDAsbW92aW5nKVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShob3ZlcmluZywwLG1vdmluZylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VWw+XG4gICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgPC9VbD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgREVGQVVMVF9UWVBFPVwiVU5LTk9XTlwiXG5cbmZ1bmN0aW9uIGRuZChvbkRyb3AsdHlwZT1ERUZBVUxUX1RZUEUpe1xuICAgIHJldHVybiBmbG93KFxuICAgICAgICBEcmFnU291cmNlKERFRkFVTFRfVFlQRSx7XG4gICAgICAgICAgICBiZWdpbkRyYWcocHJvcHMsbW9uaXRvcil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtpbmRleDpwcm9wcy5pbmRleH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcmFnU291cmNlOiBjb25uZWN0b3IuZHJhZ1NvdXJjZSgpXG4gICAgICAgICAgICAgICAgLGNvbm5lY3REcmFnUHJldmlldzogY29ubmVjdG9yLmRyYWdQcmV2aWV3KClcbiAgICAgICAgICAgICAgICAsaXNEcmFnZ2luZzogbW9uaXRvci5pc0RyYWdnaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIERyb3BUYXJnZXQoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGRyb3AocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmRpZERyb3AoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgb25Ecm9wKG1vbml0b3IuZ2V0SXRlbSgpLmluZGV4LCBwcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3Zlcihwcm9wcyxtb25pdG9yLGNvbXBvbmVudCl7XG4gICAgICAgICAgICAgICAgaWYoIW1vbml0b3IuY2FuRHJvcCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBjb25zdCB7cGFyZW50Omxpc3R9PWNvbXBvbmVudC5wcm9wc1xuICAgICAgICAgICAgICAgIGxpc3Quc2V0U3RhdGUoe2RyYWdnaW5nOm1vbml0b3IuZ2V0SXRlbSgpLmluZGV4LGhvdmVyaW5nOnByb3BzLmluZGV4fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0OiBjb25uZWN0b3IuZHJvcFRhcmdldCgpXG4gICAgICAgICAgICAgICAgLGlzT3ZlcjogbW9uaXRvci5pc092ZXIoKVxuICAgICAgICAgICAgICAgICxjYW5Ecm9wOiBtb25pdG9yLmNhbkRyb3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAoTGlzdEl0ZW0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtMaXN0LCBMaXN0SXRlbTpMaX1cbiJdfQ==