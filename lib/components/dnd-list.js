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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2RuZC1saXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFpQ2dCOztBQWpDaEI7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTTs7Ozs7Ozs7Ozs0Q0FDaUI7eUJBQzZELEtBQUssS0FBTDtnQkFBckU7Z0JBQW1CO2dCQUFrQjtnQkFBbUIsaUNBRGhEOztBQUVmLDhCQUFrQiwyQkFBWSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQTlCLEVBRmU7QUFHZiw4QkFBa0IsMkJBQVksSUFBWixDQUFsQixFQUhlOzs7OzZDQU1DO0FBQ2hCLGlCQUFLLGlCQUFMLEdBRGdCOzs7O2lDQUlaOzBCQUUyQyxLQUFLLEtBQUw7Z0JBRHhDO2dCQUFtQjtnQkFBbUI7Z0JBQ3JDO2dCQUFZO2dCQUFRO2dCQUFXLDhKQUZuQzs7QUFHSixnQkFBRyxVQUFILEVBQWM7QUFDVix1QkFBTyxXQUFQLEdBQW1CLFVBQW5CLENBRFU7YUFBZCxNQUVNLElBQUcsVUFBVSxPQUFWLEVBQWtCO0FBQ3ZCLHVCQUFPLFdBQVAsR0FBbUIsZUFBbkIsQ0FEdUI7YUFBckI7QUFHTixtQkFBTywrRUFBUSxVQUFRLGlCQUFpQjs7c0JBQWEsS0FBSSxPQUFKLEVBQWI7b0JBQXlCLHVEQUF6QjtpQkFBakIsR0FBaEIsQ0FBUCxDQVJJOzs7Ozs7QUFZWixJQUFNLGVBQWEsU0FBYjs7QUFFQyxTQUFTLEdBQVQsQ0FBYSxNQUFiLEVBQXNDO1FBQWxCLDJFQUFLLGFBQWE7O0FBQ3pDLFdBQU8sc0JBQ0gsMEJBQVcsWUFBWCxFQUF3QjtBQUNwQixzQ0FBVSxPQUFNLFNBQVE7QUFDcEIsbUJBQU8sS0FBUCxDQURvQjtTQURKO0tBQXhCLEVBSUUsVUFBQyxTQUFELEVBQVcsT0FBWCxFQUFxQjtBQUNuQixlQUFPO0FBQ0gsK0JBQW1CLFVBQVUsVUFBVixFQUFuQjtBQUNDLGdDQUFvQixVQUFVLFdBQVYsRUFBcEI7QUFDQSx3QkFBWSxRQUFRLFVBQVIsRUFBWjtTQUhMLENBRG1CO0tBQXJCLENBTEMsRUFZSCwwQkFBVyxZQUFYLEVBQXdCO0FBQ3BCLDRCQUFLLE9BQU0sU0FBUSxXQUFVO0FBQ3pCLGdCQUFHLENBQUMsUUFBUSxPQUFSLEVBQUQsRUFDQyxPQURKO0FBRUEsbUJBQU8sUUFBUSxPQUFSLEVBQVAsRUFBMEIsS0FBMUIsRUFIeUI7QUFJekIsbUJBQU8sS0FBUCxDQUp5QjtTQURUO0tBQXhCLEVBT0UsVUFBQyxTQUFELEVBQVcsT0FBWCxFQUFxQjtBQUNuQixlQUFPO0FBQ0gsK0JBQW1CLFVBQVUsVUFBVixFQUFuQjtBQUNDLG9CQUFRLFFBQVEsTUFBUixFQUFSO0FBQ0EscUJBQVMsUUFBUSxPQUFSLEVBQVQ7U0FITCxDQURtQjtLQUFyQixDQW5CQyxFQTBCTixRQTFCTSxDQUFQLENBRHlDO0NBQXRDIiwiZmlsZSI6ImRuZC1saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tIFwicmVhY3QtZG9tXCJcbmltcG9ydCB7TGlzdEl0ZW0gYXMgTGksIEljb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXG5pbXBvcnQge0RyYWdTb3VyY2UsIERyb3BUYXJnZXR9IGZyb20gXCJyZWFjdC1kbmRcIlxuaW1wb3J0IGZsb3cgZnJvbSBcImxvZGFzaC5mbG93XCJcblxuaW1wb3J0IEljb25PcmRlciBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zd2FwLXZlcnRcIlxuXG5jbGFzcyBMaXN0SXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb21wb25lbnREaWRNb3VudCgpe1xuICAgICAgICBjb25zdCB7Y29ubmVjdERyYWdTb3VyY2UsIGNvbm5lY3REcm9wVGFyZ2V0LGNvbm5lY3REcmFnUHJldmlldyxwcmltYXJ5VGV4dH09dGhpcy5wcm9wc1xuICAgICAgICBjb25uZWN0RHJhZ1NvdXJjZShmaW5kRE9NTm9kZSh0aGlzLnJlZnMub3JkZXIpKVxuICAgICAgICBjb25uZWN0RHJvcFRhcmdldChmaW5kRE9NTm9kZSh0aGlzKSlcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcbiAgICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCgpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGNvbnN0IHtjb25uZWN0RHJhZ1NvdXJjZSwgY29ubmVjdERyb3BUYXJnZXQsIGNvbm5lY3REcmFnUHJldmlldyxcbiAgICAgICAgICAgICAgICBpc0RyYWdnaW5nLCBpc092ZXIsIGNhbkRyb3AsLi4ub3RoZXJzfT10aGlzLnByb3BzXG4gICAgICAgIGlmKGlzRHJhZ2dpbmcpe1xuICAgICAgICAgICAgb3RoZXJzLnByaW1hcnlUZXh0PVwiZHJhZ2dpbmdcIlxuICAgICAgICB9ZWxzZSBpZihpc092ZXIgJiYgY2FuRHJvcCl7XG4gICAgICAgICAgICBvdGhlcnMucHJpbWFyeVRleHQ9XCJjYW4gZHJvcCBoZXJlXCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPExpIHsuLi5vdGhlcnN9IHJpZ2h0SWNvbkJ1dHRvbj17PEljb25CdXR0b24gIHJlZj1cIm9yZGVyXCI+PEljb25PcmRlci8+PC9JY29uQnV0dG9uPn0vPlxuICAgIH1cbn1cblxuY29uc3QgREVGQVVMVF9UWVBFPVwiVU5LTk9XTlwiXG5cbmV4cG9ydCBmdW5jdGlvbiBkbmQob25Ecm9wLHR5cGU9REVGQVVMVF9UWVBFKXtcbiAgICByZXR1cm4gZmxvdyhcbiAgICAgICAgRHJhZ1NvdXJjZShERUZBVUxUX1RZUEUse1xuICAgICAgICAgICAgYmVnaW5EcmFnKHByb3BzLG1vbml0b3Ipe1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LChjb25uZWN0b3IsbW9uaXRvcik9PntcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29ubmVjdERyYWdTb3VyY2U6IGNvbm5lY3Rvci5kcmFnU291cmNlKClcbiAgICAgICAgICAgICAgICAsY29ubmVjdERyYWdQcmV2aWV3OiBjb25uZWN0b3IuZHJhZ1ByZXZpZXcoKVxuICAgICAgICAgICAgICAgICxpc0RyYWdnaW5nOiBtb25pdG9yLmlzRHJhZ2dpbmcoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgRHJvcFRhcmdldChERUZBVUxUX1RZUEUse1xuICAgICAgICAgICAgZHJvcChwcm9wcyxtb25pdG9yLGNvbXBvbmVudCl7XG4gICAgICAgICAgICAgICAgaWYoIW1vbml0b3IuZGlkRHJvcCgpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBvbkRyb3AobW9uaXRvci5nZXRJdGVtKCksIHByb3BzKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LChjb25uZWN0b3IsbW9uaXRvcik9PntcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY29ubmVjdERyb3BUYXJnZXQ6IGNvbm5lY3Rvci5kcm9wVGFyZ2V0KClcbiAgICAgICAgICAgICAgICAsaXNPdmVyOiBtb25pdG9yLmlzT3ZlcigpXG4gICAgICAgICAgICAgICAgLGNhbkRyb3A6IG1vbml0b3IuY2FuRHJvcCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKVxuICAgIChMaXN0SXRlbSlcbn1cbiJdfQ==