'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require('qili-app');

var _noteAdd = require('material-ui/svg-icons/action/note-add');

var _noteAdd2 = _interopRequireDefault(_noteAdd);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _knowledge3 = require('./knowledge');

var _knowledge4 = _interopRequireDefault(_knowledge3);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

var _knowledges = require('./knowledges');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Empty = _qiliApp.UI.Empty,
    CommandBar = _qiliApp.UI.CommandBar;
var ACTION = _knowledges.Knowledges.ACTION;

var NewKnowledge = function (_Component) {
    (0, _inherits3.default)(NewKnowledge, _Component);

    function NewKnowledge() {
        (0, _classCallCheck3.default)(this, NewKnowledge);
        return (0, _possibleConstructorReturn3.default)(this, (NewKnowledge.__proto__ || (0, _getPrototypeOf2.default)(NewKnowledge)).apply(this, arguments));
    }

    (0, _createClass3.default)(NewKnowledge, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.dispatch(ACTION.CLEAR);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                knowledge = _props.docx.knowledge,
                dispatch = _props.dispatch;

            var content = void 0,
                primary = void 0,
                commands = void 0;
            var router = this.context.router;


            if (!entity) {
                content = _react2.default.createElement(Empty, { icon: _react2.default.createElement(_noteAdd2.default, { onClick: function onClick(a) {
                            return _this2.selectNewVersion();
                        } }),
                    text: '\u9009\u62E9docx\u6587\u6848\u6587\u4EF6' });
            } else {
                content = _react2.default.createElement(
                    'div',
                    { className: 'knowledge' },
                    _knowledge4.default.renderContent(knowledge)
                );
                commands = [{
                    action: "保存",
                    onSelect: function onSelect(a) {
                        return dispatch(ACTION.CREATE(_this2.docx).then(function (a) {
                            return router.replace('/knowledge/' + a._id);
                        }));
                    }
                }, {
                    action: "新版本",
                    icon: _react2.default.createElement(_borderColor2.default, null),
                    onSelect: function onSelect(a) {
                        return dispatch(ACTION.SELECT_DOCX());
                    }
                }];
                primary = "保存";
            }

            return _react2.default.createElement(
                'div',
                { className: 'post' },
                content,
                commands && _react2.default.createElement(CommandBar, {
                    className: 'footbar',
                    primary: primary,
                    items: commands })
            );
        }
    }]);
    return NewKnowledge;
}(_react.Component);

NewKnowledge.contextTypes = { router: _react.PropTypes.object };
exports.default = NewKnowledge;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9uZXdLbm93bGVkZ2UuanMiXSwibmFtZXMiOlsiRW1wdHkiLCJDb21tYW5kQmFyIiwiQUNUSU9OIiwiTmV3S25vd2xlZGdlIiwicHJvcHMiLCJkaXNwYXRjaCIsIkNMRUFSIiwia25vd2xlZGdlIiwiZG9jeCIsImNvbnRlbnQiLCJwcmltYXJ5IiwiY29tbWFuZHMiLCJyb3V0ZXIiLCJjb250ZXh0IiwiZW50aXR5Iiwic2VsZWN0TmV3VmVyc2lvbiIsInJlbmRlckNvbnRlbnQiLCJhY3Rpb24iLCJvblNlbGVjdCIsIkNSRUFURSIsInRoZW4iLCJyZXBsYWNlIiwiYSIsIl9pZCIsImljb24iLCJTRUxFQ1RfRE9DWCIsImNvbnRleHRUeXBlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztJQUVPQSxLLGVBQUFBLEs7SUFBT0MsVSxlQUFBQSxVO0lBRVBDLE0sMEJBQUFBLE07O0lBRWNDLFk7Ozs7Ozs7Ozs7K0NBQ0s7QUFDbEIsaUJBQUtDLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQkgsT0FBT0ksS0FBM0I7QUFDSDs7O2lDQUVPO0FBQUE7O0FBQUEseUJBQytCLEtBQUtGLEtBRHBDO0FBQUEsZ0JBQ1NHLFNBRFQsVUFDR0MsSUFESCxDQUNTRCxTQURUO0FBQUEsZ0JBQ3FCRixRQURyQixVQUNxQkEsUUFEckI7O0FBRUosZ0JBQUlJLGdCQUFKO0FBQUEsZ0JBQWFDLGdCQUFiO0FBQUEsZ0JBQXNCQyxpQkFBdEI7QUFGSSxnQkFHR0MsTUFISCxHQUdXLEtBQUtDLE9BSGhCLENBR0dELE1BSEg7OztBQUtKLGdCQUFHLENBQUNFLE1BQUosRUFBVztBQUNQTCwwQkFBUyw4QkFBQyxLQUFELElBQU8sTUFBTSxtREFBWSxTQUFTO0FBQUEsbUNBQUcsT0FBS00sZ0JBQUwsRUFBSDtBQUFBLHlCQUFyQixHQUFiO0FBQ2pCLDBCQUFLLDBDQURZLEdBQVQ7QUFFSCxhQUhELE1BR0s7QUFDRE4sMEJBQVM7QUFBQTtBQUFBLHNCQUFLLFdBQVUsV0FBZjtBQUE0Qix3Q0FBWU8sYUFBWixDQUEwQlQsU0FBMUI7QUFBNUIsaUJBQVQ7QUFDQUksMkJBQVMsQ0FDTDtBQUNJTSw0QkFBTyxJQURYO0FBRUtDLDhCQUFTO0FBQUEsK0JBQUdiLFNBQVNILE9BQU9pQixNQUFQLENBQWMsT0FBS1gsSUFBbkIsRUFBeUJZLElBQXpCLENBQThCO0FBQUEsbUNBQUdSLE9BQU9TLE9BQVAsaUJBQTZCQyxFQUFFQyxHQUEvQixDQUFIO0FBQUEseUJBQTlCLENBQVQsQ0FBSDtBQUFBO0FBRmQsaUJBREssRUFLSjtBQUNHTiw0QkFBTyxLQURWO0FBRUlPLDBCQUFLLDBEQUZUO0FBR0lOLDhCQUFTO0FBQUEsK0JBQUdiLFNBQVNILE9BQU91QixXQUFQLEVBQVQsQ0FBSDtBQUFBO0FBSGIsaUJBTEksQ0FBVDtBQVdBZiwwQkFBUSxJQUFSO0FBQ0g7O0FBRUQsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsTUFBZjtBQUNLRCx1QkFETDtBQUVLRSw0QkFBYSw4QkFBQyxVQUFEO0FBQ1YsK0JBQVUsU0FEQTtBQUVWLDZCQUFTRCxPQUZDO0FBR1YsMkJBQU9DLFFBSEc7QUFGbEIsYUFESjtBQVNIOzs7OztBQXRDZ0JSLFksQ0F3Q2J1QixZLEdBQWEsRUFBQ2QsUUFBTyxpQkFBVWUsTUFBbEIsRTtrQkF4Q0F4QixZIiwiZmlsZSI6Im5ld0tub3dsZWRnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tICdxaWxpLWFwcCdcclxuaW1wb3J0IEluc2VydEZpbGUgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9ub3RlLWFkZCdcclxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcclxuXHJcbmltcG9ydCBkYktub3dsZWRnZSBmcm9tICcuL2RiL2tub3dsZWRnZSdcclxuaW1wb3J0IHVpS25vd2xlZGdlIGZyb20gJy4va25vd2xlZGdlJ1xyXG5pbXBvcnQgZXh0cmFjdG9yIGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcclxuXHJcbmltcG9ydCB7S25vd2xlZGdlc30gZnJvbSBcIi4va25vd2xlZGdlc1wiXHJcblxyXG5jb25zdCB7RW1wdHksIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5jb25zdCB7QUNUSU9OfT1Lbm93bGVkZ2VzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpe1xyXG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2goQUNUSU9OLkNMRUFSKVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtkb2N4Ontrbm93bGVkZ2V9LCBkaXNwYXRjaH09dGhpcy5wcm9wc1xyXG4gICAgICAgIGxldCBjb250ZW50LCBwcmltYXJ5LCBjb21tYW5kcztcclxuICAgICAgICBjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcclxuXHJcbiAgICAgICAgaWYoIWVudGl0eSl7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxFbXB0eSBpY29uPXs8SW5zZXJ0RmlsZSBvbkNsaWNrPXthPT50aGlzLnNlbGVjdE5ld1ZlcnNpb24oKX0vPn1cclxuXHRcdFx0XHR0ZXh0PVwi6YCJ5oupZG9jeOaWh+ahiOaWh+S7tlwiLz4pXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ9KDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+e3VpS25vd2xlZGdlLnJlbmRlckNvbnRlbnQoa25vd2xlZGdlKX08L2Rpdj4pXHJcbiAgICAgICAgICAgIGNvbW1hbmRzPVtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246XCLkv53lrZhcIlxyXG4gICAgICAgICAgICAgICAgICAgICxvblNlbGVjdDphPT5kaXNwYXRjaChBQ1RJT04uQ1JFQVRFKHRoaXMuZG9jeCkudGhlbihhPT5yb3V0ZXIucmVwbGFjZShgL2tub3dsZWRnZS8ke2EuX2lkfWApKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICx7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uOlwi5paw54mI5pysXCJcclxuICAgICAgICAgICAgICAgICAgICAsaWNvbjo8SWNvbkNyZWF0ZS8+XHJcbiAgICAgICAgICAgICAgICAgICAgLG9uU2VsZWN0OmE9PmRpc3BhdGNoKEFDVElPTi5TRUxFQ1RfRE9DWCgpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIHByaW1hcnk9XCLkv53lrZhcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XHJcbiAgICAgICAgICAgICAgICB7Y29udGVudH1cclxuICAgICAgICAgICAgICAgIHtjb21tYW5kcyAmJiAoPENvbW1hbmRCYXJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtwcmltYXJ5fVxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPil9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlByb3BUeXBlcy5vYmplY3R9XHJcbn1cclxuIl19