"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListItem = function (_Component) {
    _inherits(ListItem, _Component);

    function ListItem() {
        _classCallCheck(this, ListItem);

        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
    }

    _createClass(ListItem, [{
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
                others = _objectWithoutProperties(_props2, ["connectDragSource", "connectDropTarget", "connectDragPreview", "index", "parent", "isDragging", "isOver", "canDrop"]);

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
    _inherits(List, _Component2);

    function List() {
        var _ref;

        var _temp, _this2, _ret;

        _classCallCheck(this, List);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
            data: _this2.props.data,
            dragging: -1,
            hovering: -1
        }, _temp), _possibleConstructorReturn(_this2, _ret);
    }

    _createClass(List, [{
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
                return _react2.default.createElement(ListItem, _extends({}, template(a).props, { key: i, index: i, parent: _this3 }));
            });
            if (dragging != -1 && hovering != -1) {
                var _items$splice = items.splice(dragging, 1),
                    _items$splice2 = _slicedToArray(_items$splice, 1),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwicHJvcHMiLCJjb25uZWN0RHJhZ1NvdXJjZSIsImNvbm5lY3REcm9wVGFyZ2V0IiwiY29ubmVjdERyYWdQcmV2aWV3IiwicHJpbWFyeVRleHQiLCJyZWZzIiwib3JkZXIiLCJkcm9wRWZmZWN0IiwiY29tcG9uZW50RGlkTW91bnQiLCJpbmRleCIsInBhcmVudCIsImlzRHJhZ2dpbmciLCJpc092ZXIiLCJjYW5Ecm9wIiwib3RoZXJzIiwidmlzaWJpbGl0eSIsInJpZ2h0SWNvbkJ1dHRvbiIsIkxpc3QiLCJzdGF0ZSIsImRhdGEiLCJkcmFnZ2luZyIsImhvdmVyaW5nIiwidGVtcGxhdGUiLCJvbkRyb3AiLCJkbmRUeXBlIiwiZG5kIiwiaXRlbXMiLCJtYXAiLCJhIiwiaSIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJzcGxpY2UiLCJtb3ZpbmciLCJERUZBVUxUX1RZUEUiLCJ0eXBlIiwiYmVnaW5EcmFnIiwibW9uaXRvciIsInNldFN0YXRlIiwiZW5kRHJhZyIsImNvbm5lY3RvciIsImRyYWdTb3VyY2UiLCJkcmFnUHJldmlldyIsImRyb3AiLCJjb21wb25lbnQiLCJkaWREcm9wIiwiZ2V0SXRlbSIsImhvdmVyIiwibGlzdCIsImRyb3BUYXJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7NENBQ2lCO0FBQUEseUJBQzZELEtBQUtDLEtBRGxFO0FBQUEsZ0JBQ1JDLGlCQURRLFVBQ1JBLGlCQURRO0FBQUEsZ0JBQ1dDLGlCQURYLFVBQ1dBLGlCQURYO0FBQUEsZ0JBQzZCQyxrQkFEN0IsVUFDNkJBLGtCQUQ3QjtBQUFBLGdCQUNnREMsV0FEaEQsVUFDZ0RBLFdBRGhEOztBQUVmSCw4QkFBa0IsMkJBQVksS0FBS0ksSUFBTCxDQUFV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T1QsS0FBUDtBQUNILFNBTm1CO0FBT3BCK0MsYUFQb0IsaUJBT2QvQyxLQVBjLEVBT1JxQyxPQVBRLEVBT0FPLFNBUEEsRUFPVTtBQUMxQixnQkFBRyxDQUFDUCxRQUFReEIsT0FBUixFQUFKLEVBQ0k7QUFGc0IsZ0JBR1ptQyxJQUhZLEdBR05KLFVBQVU1QyxLQUhKLENBR25CVSxNQUhtQjs7QUFJMUJzQyxpQkFBS1YsUUFBTCxDQUFjLEVBQUNsQixVQUFTaUIsUUFBUVMsT0FBUixHQUFrQnJDLEtBQTVCLEVBQWtDWSxVQUFTckIsTUFBTVMsS0FBakQsRUFBZDtBQUNIO0FBWm1CLEtBQXhCLEVBYUUsVUFBQytCLFNBQUQsRUFBV0gsT0FBWCxFQUFxQjtBQUNuQixlQUFPO0FBQ0huQywrQkFBbUJzQyxVQUFVUyxVQUFWLEVBRGhCO0FBRUZyQyxvQkFBUXlCLFFBQVF6QixNQUFSLEVBRk47QUFHRkMscUJBQVN3QixRQUFReEIsT0FBUjtBQUhQLFNBQVA7QUFLSCxLQW5CRCxDQWpCRyxFQXFDTmQsUUFyQ00sQ0FBUDtBQXNDSDs7a0JBRWMsRUFBQ2tCLFVBQUQsRUFBT2xCLDhCQUFQLEUiLCJmaWxlIjoiZG5kLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtmaW5kRE9NTm9kZX0gZnJvbSBcInJlYWN0LWRvbVwiXHJcbmltcG9ydCB7TGlzdCBhcyBVbCwgTGlzdEl0ZW0gYXMgTGksIEljb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCB7RHJhZ1NvdXJjZSwgRHJvcFRhcmdldH0gZnJvbSBcInJlYWN0LWRuZFwiXHJcbmltcG9ydCBmbG93IGZyb20gXCJsb2Rhc2guZmxvd1wiXHJcblxyXG5pbXBvcnQgSWNvbk9yZGVyIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3N3YXAtdmVydFwiXHJcblxyXG5jbGFzcyBMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCxjb25uZWN0RHJhZ1ByZXZpZXcscHJpbWFyeVRleHR9PXRoaXMucHJvcHNcclxuICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZShmaW5kRE9NTm9kZSh0aGlzLnJlZnMub3JkZXIpLHtkcm9wRWZmZWN0OlwiY29weVwifSlcclxuICAgICAgICBjb25uZWN0RHJvcFRhcmdldChmaW5kRE9NTm9kZSh0aGlzKSlcclxuICAgICAgICBjb25uZWN0RHJhZ1ByZXZpZXcoZmluZERPTU5vZGUodGhpcykse30pXHJcbiAgICB9XHJcblxyXG4gICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XHJcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpXHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2Nvbm5lY3REcmFnU291cmNlLCBjb25uZWN0RHJvcFRhcmdldCwgY29ubmVjdERyYWdQcmV2aWV3LCBpbmRleCwgcGFyZW50LFxyXG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZywgaXNPdmVyLCBjYW5Ecm9wLC4uLm90aGVyc309dGhpcy5wcm9wc1xyXG4gICAgICAgIGlmKGlzRHJhZ2dpbmcpe1xyXG4gICAgICAgICAgICBvdGhlcnMucHJpbWFyeVRleHQ9KDxzcGFuIHN0eWxlPXt7dmlzaWJpbGl0eTpcImhpZGRlblwifX0+e290aGVycy5wcmltYXJ5VGV4dH08L3NwYW4+KVxyXG4gICAgICAgIH1lbHNlIGlmKGlzT3ZlciAmJiBjYW5Ecm9wKXtcclxuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PVwiY2FuIGRyb3AgaGVyZVwiXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG90aGVycy5yaWdodEljb25CdXR0b249KFxyXG4gICAgICAgICAgICAgICAgPEljb25CdXR0b24gIHJlZj1cIm9yZGVyXCIgZGlzYWJsZVRvdWNoUmlwcGxlPXt0cnVlfT5cclxuICAgICAgICAgICAgICAgICAgICA8SWNvbk9yZGVyLz5cclxuICAgICAgICAgICAgICAgIDwvSWNvbkJ1dHRvbj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPExpIHsuLi5vdGhlcnN9Lz5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTGlzdCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHN0YXRlPXtcclxuICAgICAgICBkYXRhOnRoaXMucHJvcHMuZGF0YVxyXG4gICAgICAgICxkcmFnZ2luZzotMVxyXG4gICAgICAgICxob3ZlcmluZzotMVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2RhdGEsIGRyYWdnaW5nLCBob3ZlcmluZ309dGhpcy5zdGF0ZVxyXG4gICAgICAgIGNvbnN0IHt0ZW1wbGF0ZSxvbkRyb3AsZG5kVHlwZX09dGhpcy5wcm9wc1xyXG4gICAgICAgIGNvbnN0IExpc3RJdGVtPWRuZChvbkRyb3AsZG5kVHlwZSlcclxuICAgICAgICBsZXQgaXRlbXM9ZGF0YS5tYXAoKGEsaSk9PlJlYWN0LmNyZWF0ZUVsZW1lbnQoTGlzdEl0ZW0sey4uLnRlbXBsYXRlKGEpLnByb3BzLGtleTppLGluZGV4OmkscGFyZW50OnRoaXN9KSlcclxuICAgICAgICBpZihkcmFnZ2luZyE9LTEgJiYgaG92ZXJpbmchPS0xKXtcclxuICAgICAgICAgICAgbGV0IFttb3ZpbmddPWl0ZW1zLnNwbGljZShkcmFnZ2luZywxKVxyXG4gICAgICAgICAgICBtb3Zpbmc9UmVhY3QuY3JlYXRlRWxlbWVudChMaSxtb3ZpbmcucHJvcHMpXHJcbiAgICAgICAgICAgIGlmKGhvdmVyaW5nPmRyYWdnaW5nKVxyXG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGhvdmVyaW5nLTEsMCxtb3ZpbmcpXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGl0ZW1zLnNwbGljZShob3ZlcmluZywwLG1vdmluZylcclxuICAgICAgICB9ZWxzZSBpZihkcmFnZ2luZyE9LTEpe1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxVbD5cclxuICAgICAgICAgICAgICAgIHtpdGVtc31cclxuICAgICAgICAgICAgPC9VbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IERFRkFVTFRfVFlQRT1cIlVOS05PV05cIlxyXG5cclxuZnVuY3Rpb24gZG5kKG9uRHJvcCx0eXBlPURFRkFVTFRfVFlQRSl7XHJcbiAgICByZXR1cm4gZmxvdyhcclxuICAgICAgICBEcmFnU291cmNlKERFRkFVTFRfVFlQRSx7XHJcbiAgICAgICAgICAgIGJlZ2luRHJhZyh7aW5kZXh9LG1vbml0b3Ise3Byb3BzOntwYXJlbnR9fSl7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnQuc2V0U3RhdGUoe2RyYWdnaW5nOmluZGV4LGhvdmVyaW5nOi0xfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiB7aW5kZXh9XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlbmREcmFnKHtpbmRleH0sbW9uaXRvcix7cHJvcHM6e3BhcmVudH19KXtcclxuICAgICAgICAgICAgICAgIHBhcmVudC5zZXRTdGF0ZSh7ZHJhZ2dpbmc6LTEsaG92ZXJpbmc6LTF9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwoY29ubmVjdG9yLG1vbml0b3IpPT57XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZTogY29ubmVjdG9yLmRyYWdTb3VyY2UoKVxyXG4gICAgICAgICAgICAgICAgLGNvbm5lY3REcmFnUHJldmlldzogY29ubmVjdG9yLmRyYWdQcmV2aWV3KClcclxuICAgICAgICAgICAgICAgICxpc0RyYWdnaW5nOiBtb25pdG9yLmlzRHJhZ2dpbmcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgRHJvcFRhcmdldChERUZBVUxUX1RZUEUse1xyXG4gICAgICAgICAgICBkcm9wKHByb3BzLG1vbml0b3IsY29tcG9uZW50KXtcclxuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmRpZERyb3AoKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIG9uRHJvcChtb25pdG9yLmdldEl0ZW0oKS5pbmRleCwgcHJvcHMuaW5kZXgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcHNcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaG92ZXIocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYoIW1vbml0b3IuY2FuRHJvcCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhcmVudDpsaXN0fT1jb21wb25lbnQucHJvcHNcclxuICAgICAgICAgICAgICAgIGxpc3Quc2V0U3RhdGUoe2RyYWdnaW5nOm1vbml0b3IuZ2V0SXRlbSgpLmluZGV4LGhvdmVyaW5nOnByb3BzLmluZGV4fSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sKGNvbm5lY3Rvcixtb25pdG9yKT0+e1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY29ubmVjdERyb3BUYXJnZXQ6IGNvbm5lY3Rvci5kcm9wVGFyZ2V0KClcclxuICAgICAgICAgICAgICAgICxpc092ZXI6IG1vbml0b3IuaXNPdmVyKClcclxuICAgICAgICAgICAgICAgICxjYW5Ecm9wOiBtb25pdG9yLmNhbkRyb3AoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkpXHJcbiAgICAoTGlzdEl0ZW0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtMaXN0LCBMaXN0SXRlbTpMaX1cclxuIl19