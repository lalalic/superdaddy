'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _modeEdit = require('material-ui/lib/svg-icons/editor/mode-edit');

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require('material-ui/lib/svg-icons/action/bug-report');

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require('material-ui/lib/svg-icons/action/system-update-alt');

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require('material-ui/lib/svg-icons/action/info-outline');

var _infoOutline2 = _interopRequireDefault(_infoOutline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;

var Setting = function (_Component) {
    _inherits(Setting, _Component);

    function Setting() {
        _classCallCheck(this, Setting);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Setting).apply(this, arguments));
    }

    _createClass(Setting, [{
        key: 'render',
        value: function render() {
            return _qiliApp.React.createElement(
                List,
                null,
                _qiliApp.React.createElement(List.Item, { primaryText: '去评价', leftIcon: _qiliApp.React.createElement(_modeEdit2.default, null) }),
                _qiliApp.React.createElement(List.Item, { primaryText: '建议', leftIcon: _qiliApp.React.createElement(_bugReport2.default, null) }),
                _qiliApp.React.createElement(List.Item, { primaryText: '更新', leftIcon: _qiliApp.React.createElement(_systemUpdateAlt2.default, null) }),
                _qiliApp.React.createElement(List.Item, { primaryText: '关于', leftIcon: _qiliApp.React.createElement(_infoOutline2.default, null) })
            );
        }
    }]);

    return Setting;
}(_qiliApp.Component);

exports.default = Setting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVLOztJQUVnQjs7Ozs7Ozs7Ozs7aUNBQ1Q7QUFDSixtQkFDSTtBQUFDLG9CQUFEOztnQkFDSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLEtBQVosRUFBa0IsVUFBVSxzREFBVixFQUE3QixDQURKO2dCQUVJLDZCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWixFQUFpQixVQUFVLHVEQUFWLEVBQTVCLENBRko7Z0JBSUksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFVBQVUsNkRBQVYsRUFBNUIsQ0FKSjtnQkFLSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLElBQVosRUFBaUIsVUFBVSx5REFBVixFQUE1QixDQUxKO2FBREosQ0FESTs7OztXQURTIiwiZmlsZSI6InNldHRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQgUmF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9lZGl0b3IvbW9kZS1lZGl0J1xyXG5pbXBvcnQgQnVnSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9idWctcmVwb3J0J1xyXG5pbXBvcnQgVXBkYXRlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9zeXN0ZW0tdXBkYXRlLWFsdCdcclxuaW1wb3J0IEFib3V0SWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9pbmZvLW91dGxpbmUnXHJcblxyXG52YXIge0xpc3R9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5Y676K+E5Lu3XCIgbGVmdEljb249ezxSYXRlSWNvbi8+fS8+XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5bu66K6uXCIgbGVmdEljb249ezxCdWdJY29uLz59Lz5cclxuXHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5pu05pawXCIgbGVmdEljb249ezxVcGRhdGVJY29uLz59Lz5cclxuICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLlhbPkuo5cIiBsZWZ0SWNvbj17PEFib3V0SWNvbi8+fS8+XHJcbiAgICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIl19