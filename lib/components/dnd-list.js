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

                moving = _react2.default.createElement(_materialUi.ListItem, moving.props);
                if (hovering > dragging) items.splice(hovering - 1, 0, moving);else items.splice(hovering, 0, moving);
            } else if (dragging != -1) {}

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
        beginDrag: function beginDrag(_ref2, monitor, _ref3) {
            var index = _ref2.index;
            var parent = _ref3.props.parent;

            parent.setState({ dragging: index, hovering: -1 });
            return { index: index };
        },
        endDrag: function endDrag(_ref4, monitor, _ref5) {
            var index = _ref4.index;
            var parent = _ref5.props.parent;

            parent.setState({ dragging: -1, hovering: -1 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTTs7Ozs7Ozs7Ozs0Q0FDaUI7eUJBQzZELEtBQUssS0FBTDtnQkFBckU7Z0JBQW1CO2dCQUFrQjtnQkFBbUIsaUNBRGhEOztBQUVmLDhCQUFrQiwyQkFBWSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQTlCLEVBQStDLEVBQUMsWUFBVyxNQUFYLEVBQWhELEVBRmU7QUFHZiw4QkFBa0IsMkJBQVksSUFBWixDQUFsQixFQUhlO0FBSWYsK0JBQW1CLDJCQUFZLElBQVosQ0FBbkIsRUFBcUMsRUFBckMsRUFKZTs7Ozs2Q0FPQztBQUNoQixpQkFBSyxpQkFBTCxHQURnQjs7OztpQ0FJWjswQkFFMkMsS0FBSyxLQUFMO2dCQUR4QztnQkFBbUI7Z0JBQW1CO2dCQUFvQjtnQkFBTztnQkFDaEU7Z0JBQVk7Z0JBQVE7Z0JBQVcsaUxBRm5DOztBQUdKLGdCQUFHLFVBQUgsRUFBYztBQUNWLHVCQUFPLFdBQVAsR0FBb0I7O3NCQUFNLE9BQU8sRUFBQyxZQUFXLFFBQVgsRUFBUixFQUFOO29CQUFxQyxPQUFPLFdBQVA7aUJBQXpELENBRFU7YUFBZCxNQUVNLElBQUcsVUFBVSxPQUFWLEVBQWtCO0FBQ3ZCLHVCQUFPLFdBQVAsR0FBbUIsZUFBbkIsQ0FEdUI7YUFBckIsTUFFRDtBQUNELHVCQUFPLGVBQVAsR0FDSTs7c0JBQWEsS0FBSSxPQUFKLEVBQVksb0JBQW9CLElBQXBCLEVBQXpCO29CQUNJLHVEQURKO2lCQURKLENBREM7YUFGQztBQVNOLG1CQUFPLG9EQUFRLE1BQVIsQ0FBUCxDQWRJOzs7Ozs7SUFrQk47Ozs7Ozs7Ozs7Ozs7OytNQUNGLFFBQU07QUFDRixrQkFBSyxPQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0os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QTlCQyxFQXFDTixRQXJDTSxDQUFQLENBRGtDO0NBQXRDOztrQkF5Q2UsRUFBQyxVQUFELEVBQU8sOEJBQVAiLCJmaWxlIjoiZG5kLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7ZmluZERPTU5vZGV9IGZyb20gXCJyZWFjdC1kb21cIlxuaW1wb3J0IHtMaXN0IGFzIFVsLCBMaXN0SXRlbSBhcyBMaSwgSWNvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcbmltcG9ydCB7RHJhZ1NvdXJjZSwgRHJvcFRhcmdldH0gZnJvbSBcInJlYWN0LWRuZFwiXG5pbXBvcnQgZmxvdyBmcm9tIFwibG9kYXNoLmZsb3dcIlxuXG5pbXBvcnQgSWNvbk9yZGVyIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3N3YXAtdmVydFwiXG5cbmNsYXNzIExpc3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgICAgIGNvbnN0IHtjb25uZWN0RHJhZ1NvdXJjZSwgY29ubmVjdERyb3BUYXJnZXQsY29ubmVjdERyYWdQcmV2aWV3LHByaW1hcnlUZXh0fT10aGlzLnByb3BzXG4gICAgICAgIGNvbm5lY3REcmFnU291cmNlKGZpbmRET01Ob2RlKHRoaXMucmVmcy5vcmRlcikse2Ryb3BFZmZlY3Q6XCJjb3B5XCJ9KVxuICAgICAgICBjb25uZWN0RHJvcFRhcmdldChmaW5kRE9NTm9kZSh0aGlzKSlcbiAgICAgICAgY29ubmVjdERyYWdQcmV2aWV3KGZpbmRET01Ob2RlKHRoaXMpLHt9KVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xuICAgICAgICB0aGlzLmNvbXBvbmVudERpZE1vdW50KClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCwgY29ubmVjdERyYWdQcmV2aWV3LCBpbmRleCwgcGFyZW50LFxuICAgICAgICAgICAgICAgIGlzRHJhZ2dpbmcsIGlzT3ZlciwgY2FuRHJvcCwuLi5vdGhlcnN9PXRoaXMucHJvcHNcbiAgICAgICAgaWYoaXNEcmFnZ2luZyl7XG4gICAgICAgICAgICBvdGhlcnMucHJpbWFyeVRleHQ9KDxzcGFuIHN0eWxlPXt7dmlzaWJpbGl0eTpcImhpZGRlblwifX0+e290aGVycy5wcmltYXJ5VGV4dH08L3NwYW4+KVxuICAgICAgICB9ZWxzZSBpZihpc092ZXIgJiYgY2FuRHJvcCl7XG4gICAgICAgICAgICBvdGhlcnMucHJpbWFyeVRleHQ9XCJjYW4gZHJvcCBoZXJlXCJcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBvdGhlcnMucmlnaHRJY29uQnV0dG9uPShcbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvbiAgcmVmPVwib3JkZXJcIiBkaXNhYmxlVG91Y2hSaXBwbGU9e3RydWV9PlxuICAgICAgICAgICAgICAgICAgICA8SWNvbk9yZGVyLz5cbiAgICAgICAgICAgICAgICA8L0ljb25CdXR0b24+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxMaSB7Li4ub3RoZXJzfS8+XG4gICAgfVxufVxuXG5jbGFzcyBMaXN0IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHN0YXRlPXtcbiAgICAgICAgZGF0YTp0aGlzLnByb3BzLmRhdGFcbiAgICAgICAgLGRyYWdnaW5nOi0xXG4gICAgICAgICxob3ZlcmluZzotMVxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgY29uc3Qge2RhdGEsIGRyYWdnaW5nLCBob3ZlcmluZ309dGhpcy5zdGF0ZVxuICAgICAgICBjb25zdCB7dGVtcGxhdGUsb25Ecm9wLGRuZFR5cGV9PXRoaXMucHJvcHNcbiAgICAgICAgY29uc3QgTGlzdEl0ZW09ZG5kKG9uRHJvcCxkbmRUeXBlKVxuICAgICAgICBsZXQgaXRlbXM9ZGF0YS5tYXAoKGEsaSk9PlJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlzdEl0ZW0sey4uLnRlbXBsYXRlKGEpLnByb3BzLGtleTppLGluZGV4OmkscGFyZW50OnRoaXN9KSlcbiAgICAgICAgaWYoZHJhZ2dpbmchPS0xICYmIGhvdmVyaW5nIT0tMSl7XG4gICAgICAgICAgICBsZXQgW21vdmluZ109aXRlbXMuc3BsaWNlKGRyYWdnaW5nLDEpXG4gICAgICAgICAgICBtb3Zpbmc9UmVhY3QuY3JlYXRlRWxlbWVudChMaSxtb3ZpbmcucHJvcHMpXG4gICAgICAgICAgICBpZihob3ZlcmluZz5kcmFnZ2luZylcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaG92ZXJpbmctMSwwLG1vdmluZylcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBpdGVtcy5zcGxpY2UoaG92ZXJpbmcsMCxtb3ZpbmcpXG4gICAgICAgIH1lbHNlIGlmKGRyYWdnaW5nIT0tMSl7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8VWw+XG4gICAgICAgICAgICAgICAge2l0ZW1zfVxuICAgICAgICAgICAgPC9VbD5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY29uc3QgREVGQVVMVF9UWVBFPVwiVU5LTk9XTlwiXG5cbmZ1bmN0aW9uIGRuZChvbkRyb3AsdHlwZT1ERUZBVUxUX1RZUEUpe1xuICAgIHJldHVybiBmbG93KFxuICAgICAgICBEcmFnU291cmNlKERFRkFVTFRfVFlQRSx7XG4gICAgICAgICAgICBiZWdpbkRyYWcoe2luZGV4fSxtb25pdG9yLHtwcm9wczp7cGFyZW50fX0pe1xuICAgICAgICAgICAgICAgIHBhcmVudC5zZXRTdGF0ZSh7ZHJhZ2dpbmc6aW5kZXgsaG92ZXJpbmc6LTF9KVxuICAgICAgICAgICAgICAgIHJldHVybiB7aW5kZXh9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlbmREcmFnKHtpbmRleH0sbW9uaXRvcix7cHJvcHM6e3BhcmVudH19KXtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc2V0U3RhdGUoe2RyYWdnaW5nOi0xLGhvdmVyaW5nOi0xfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcmFnU291cmNlOiBjb25uZWN0b3IuZHJhZ1NvdXJjZSgpXG4gICAgICAgICAgICAgICAgLGNvbm5lY3REcmFnUHJldmlldzogY29ubmVjdG9yLmRyYWdQcmV2aWV3KClcbiAgICAgICAgICAgICAgICAsaXNEcmFnZ2luZzogbW9uaXRvci5pc0RyYWdnaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIERyb3BUYXJnZXQoREVGQVVMVF9UWVBFLHtcbiAgICAgICAgICAgIGRyb3AocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmRpZERyb3AoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgb25Ecm9wKG1vbml0b3IuZ2V0SXRlbSgpLmluZGV4LCBwcm9wcy5pbmRleClcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBob3Zlcihwcm9wcyxtb25pdG9yLGNvbXBvbmVudCl7XG4gICAgICAgICAgICAgICAgaWYoIW1vbml0b3IuY2FuRHJvcCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBjb25zdCB7cGFyZW50Omxpc3R9PWNvbXBvbmVudC5wcm9wc1xuICAgICAgICAgICAgICAgIGxpc3Quc2V0U3RhdGUoe2RyYWdnaW5nOm1vbml0b3IuZ2V0SXRlbSgpLmluZGV4LGhvdmVyaW5nOnByb3BzLmluZGV4fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNvbm5lY3REcm9wVGFyZ2V0OiBjb25uZWN0b3IuZHJvcFRhcmdldCgpXG4gICAgICAgICAgICAgICAgLGlzT3ZlcjogbW9uaXRvci5pc092ZXIoKVxuICAgICAgICAgICAgICAgICxjYW5Ecm9wOiBtb25pdG9yLmNhbkRyb3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICAoTGlzdEl0ZW0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHtMaXN0LCBMaXN0SXRlbTpMaX1cbiJdfQ==