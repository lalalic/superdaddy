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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwicHJvcHMiLCJjb25uZWN0RHJhZ1NvdXJjZSIsImNvbm5lY3REcm9wVGFyZ2V0IiwiY29ubmVjdERyYWdQcmV2aWV3IiwicHJpbWFyeVRleHQiLCJyZWZzIiwib3JkZXIiLCJkcm9wRWZmZWN0IiwiY29tcG9uZW50RGlkTW91bnQiLCJpbmRleCIsInBhcmVudCIsImlzRHJhZ2dpbmciLCJpc092ZXIiLCJjYW5Ecm9wIiwib3RoZXJzIiwidmlzaWJpbGl0eSIsInJpZ2h0SWNvbkJ1dHRvbiIsIkxpc3QiLCJzdGF0ZSIsImRhdGEiLCJkcmFnZ2luZyIsImhvdmVyaW5nIiwidGVtcGxhdGUiLCJvbkRyb3AiLCJkbmRUeXBlIiwiZG5kIiwiaXRlbXMiLCJtYXAiLCJhIiwiaSIsImNyZWF0ZUVsZW1lbnQiLCJrZXkiLCJzcGxpY2UiLCJtb3ZpbmciLCJERUZBVUxUX1RZUEUiLCJ0eXBlIiwiYmVnaW5EcmFnIiwibW9uaXRvciIsInNldFN0YXRlIiwiZW5kRHJhZyIsImNvbm5lY3RvciIsImRyYWdTb3VyY2UiLCJkcmFnUHJldmlldyIsImRyb3AiLCJjb21wb25lbnQiLCJkaWREcm9wIiwiZ2V0SXRlbSIsImhvdmVyIiwibGlzdCIsImRyb3BUYXJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs0Q0FDaUI7QUFBQSx5QkFDNkQsS0FBS0MsS0FEbEU7QUFBQSxnQkFDUkMsaUJBRFEsVUFDUkEsaUJBRFE7QUFBQSxnQkFDV0MsaUJBRFgsVUFDV0EsaUJBRFg7QUFBQSxnQkFDNkJDLGtCQUQ3QixVQUM2QkEsa0JBRDdCO0FBQUEsZ0JBQ2dEQyxXQURoRCxVQUNnREEsV0FEaEQ7O0FBRWZILDhCQUFrQiwyQkFB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LEtBQXRDO0FBQ0EsbUJBQU9ULEtBQVA7QUFDSCxTQU5tQjtBQU9wQitDLGFBUG9CLGlCQU9kL0MsS0FQYyxFQU9ScUMsT0FQUSxFQU9BTyxTQVBBLEVBT1U7QUFDMUIsZ0JBQUcsQ0FBQ1AsUUFBUXhCLE9BQVIsRUFBSixFQUNJO0FBRnNCLGdCQUdabUMsSUFIWSxHQUdOSixVQUFVNUMsS0FISixDQUduQlUsTUFIbUI7O0FBSTFCc0MsaUJBQUtWLFFBQUwsQ0FBYyxFQUFDbEIsVUFBU2lCLFFBQVFTLE9BQVIsR0FBa0JyQyxLQUE1QixFQUFrQ1ksVUFBU3JCLE1BQU1TLEtBQWpELEVBQWQ7QUFDSDtBQVptQixLQUF4QixFQWFFLFVBQUMrQixTQUFELEVBQVdILE9BQVgsRUFBcUI7QUFDbkIsZUFBTztBQUNIbkMsK0JBQW1Cc0MsVUFBVVMsVUFBVixFQURoQjtBQUVGckMsb0JBQVF5QixRQUFRekIsTUFBUixFQUZOO0FBR0ZDLHFCQUFTd0IsUUFBUXhCLE9BQVI7QUFIUCxTQUFQO0FBS0gsS0FuQkQsQ0FqQkcsRUFxQ05kLFFBckNNLENBQVA7QUFzQ0g7O2tCQUVjLEVBQUNrQixVQUFELEVBQU9sQiw4QkFBUCxFIiwiZmlsZSI6ImRuZC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7TGlzdCBhcyBVbCwgTGlzdEl0ZW0gYXMgTGksIEljb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge0RyYWdTb3VyY2UsIERyb3BUYXJnZXR9IGZyb20gXCJyZWFjdC1kbmRcIlxuaW1wb3J0IGZsb3cgZnJvbSBcImxvZGFzaC5mbG93XCJcblxuaW1wb3J0IEljb25PcmRlciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zd2FwLXZlcnRcIlxuXG5jbGFzcyBMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7Y29ubmVjdERyYWdTb3VyY2UsIGNvbm5lY3REcm9wVGFyZ2V0LGNvbm5lY3REcmFnUHJldmlldyxwcmltYXJ5VGV4dH09dGhpcy5wcm9wc1xuICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZShmaW5kRE9NTm9kZSh0aGlzLnJlZnMub3JkZXIpLHtkcm9wRWZmZWN0OlwiY29weVwifSlcbiAgICAgICAgY29ubmVjdERyb3BUYXJnZXQoZmluZERPTU5vZGUodGhpcykpXG4gICAgICAgIGNvbm5lY3REcmFnUHJldmlldyhmaW5kRE9NTm9kZSh0aGlzKSx7fSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtjb25uZWN0RHJhZ1NvdXJjZSwgY29ubmVjdERyb3BUYXJnZXQsIGNvbm5lY3REcmFnUHJldmlldywgaW5kZXgsIHBhcmVudCxcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nLCBpc092ZXIsIGNhbkRyb3AsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGlmKGlzRHJhZ2dpbmcpe1xuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PSg8c3BhbiBzdHlsZT17e3Zpc2liaWxpdHk6XCJoaWRkZW5cIn19PntvdGhlcnMucHJpbWFyeVRleHR9PC9zcGFuPilcbiAgICAgICAgfWVsc2UgaWYoaXNPdmVyICYmIGNhbkRyb3Ape1xuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PVwiY2FuIGRyb3AgaGVyZVwiXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgb3RoZXJzLnJpZ2h0SWNvbkJ1dHRvbj0oXG4gICAgICAgICAgICAgICAgPEljb25CdXR0b24gIHJlZj1cIm9yZGVyXCIgZGlzYWJsZVRvdWNoUmlwcGxlPXt0cnVlfT5cbiAgICAgICAgICAgICAgICAgICAgPEljb25PcmRlci8+XG4gICAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8TGkgey4uLm90aGVyc30vPlxuICAgIH1cbn1cblxuY2xhc3MgTGlzdCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzdGF0ZT17XG4gICAgICAgIGRhdGE6dGhpcy5wcm9wcy5kYXRhXG4gICAgICAgICxkcmFnZ2luZzotMVxuICAgICAgICAsaG92ZXJpbmc6LTFcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtkYXRhLCBkcmFnZ2luZywgaG92ZXJpbmd9PXRoaXMuc3RhdGVcbiAgICAgICAgY29uc3Qge3RlbXBsYXRlLG9uRHJvcCxkbmRUeXBlfT10aGlzLnByb3BzXG4gICAgICAgIGNvbnN0IExpc3RJdGVtPWRuZChvbkRyb3AsZG5kVHlwZSlcbiAgICAgICAgbGV0IGl0ZW1zPWRhdGEubWFwKChhLGkpPT5SZWFjdC5jcmVhdGVFbGVtZW50KExpc3RJdGVtLHsuLi50ZW1wbGF0ZShhKS5wcm9wcyxrZXk6aSxpbmRleDppLHBhcmVudDp0aGlzfSkpXG4gICAgICAgIGlmKGRyYWdnaW5nIT0tMSAmJiBob3ZlcmluZyE9LTEpe1xuICAgICAgICAgICAgbGV0IFttb3ZpbmddPWl0ZW1zLnNwbGljZShkcmFnZ2luZywxKVxuICAgICAgICAgICAgbW92aW5nPVJlYWN0LmNyZWF0ZUVsZW1lbnQoTGksbW92aW5nLnByb3BzKVxuICAgICAgICAgICAgaWYoaG92ZXJpbmc+ZHJhZ2dpbmcpXG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGhvdmVyaW5nLTEsMCxtb3ZpbmcpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgaXRlbXMuc3BsaWNlKGhvdmVyaW5nLDAsbW92aW5nKVxuICAgICAgICB9ZWxzZSBpZihkcmFnZ2luZyE9LTEpe1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFVsPlxuICAgICAgICAgICAgICAgIHtpdGVtc31cbiAgICAgICAgICAgIDwvVWw+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVFlQRT1cIlVOS05PV05cIlxuXG5mdW5jdGlvbiBkbmQob25Ecm9wLHR5cGU9REVGQVVMVF9UWVBFKXtcbiAgICByZXR1cm4gZmxvdyhcbiAgICAgICAgRHJhZ1NvdXJjZShERUZBVUxUX1RZUEUse1xuICAgICAgICAgICAgYmVnaW5EcmFnKHtpbmRleH0sbW9uaXRvcix7cHJvcHM6e3BhcmVudH19KXtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc2V0U3RhdGUoe2RyYWdnaW5nOmluZGV4LGhvdmVyaW5nOi0xfSlcbiAgICAgICAgICAgICAgICByZXR1cm4ge2luZGV4fVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZW5kRHJhZyh7aW5kZXh9LG1vbml0b3Ise3Byb3BzOntwYXJlbnR9fSl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnNldFN0YXRlKHtkcmFnZ2luZzotMSxob3ZlcmluZzotMX0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sKGNvbm5lY3Rvcixtb25pdG9yKT0+e1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZTogY29ubmVjdG9yLmRyYWdTb3VyY2UoKVxuICAgICAgICAgICAgICAgICxjb25uZWN0RHJhZ1ByZXZpZXc6IGNvbm5lY3Rvci5kcmFnUHJldmlldygpXG4gICAgICAgICAgICAgICAgLGlzRHJhZ2dpbmc6IG1vbml0b3IuaXNEcmFnZ2luZygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBEcm9wVGFyZ2V0KERFRkFVTFRfVFlQRSx7XG4gICAgICAgICAgICBkcm9wKHByb3BzLG1vbml0b3IsY29tcG9uZW50KXtcbiAgICAgICAgICAgICAgICBpZighbW9uaXRvci5kaWREcm9wKCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIG9uRHJvcChtb25pdG9yLmdldEl0ZW0oKS5pbmRleCwgcHJvcHMuaW5kZXgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3BzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaG92ZXIocHJvcHMsbW9uaXRvcixjb21wb25lbnQpe1xuICAgICAgICAgICAgICAgIGlmKCFtb25pdG9yLmNhbkRyb3AoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgY29uc3Qge3BhcmVudDpsaXN0fT1jb21wb25lbnQucHJvcHNcbiAgICAgICAgICAgICAgICBsaXN0LnNldFN0YXRlKHtkcmFnZ2luZzptb25pdG9yLmdldEl0ZW0oKS5pbmRleCxob3ZlcmluZzpwcm9wcy5pbmRleH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sKGNvbm5lY3Rvcixtb25pdG9yKT0+e1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjb25uZWN0RHJvcFRhcmdldDogY29ubmVjdG9yLmRyb3BUYXJnZXQoKVxuICAgICAgICAgICAgICAgICxpc092ZXI6IG1vbml0b3IuaXNPdmVyKClcbiAgICAgICAgICAgICAgICAsY2FuRHJvcDogbW9uaXRvci5jYW5Ecm9wKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgKExpc3RJdGVtKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7TGlzdCwgTGlzdEl0ZW06TGl9XG4iXX0=