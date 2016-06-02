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

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

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
												var _this2 = this;

												return _qiliApp.React.createElement(
																List,
																null,
																_qiliApp.React.createElement(List.Item, { primaryText: '去评价', leftIcon: _qiliApp.React.createElement(_modeEdit2.default, null) }),
																_qiliApp.React.createElement(List.Item, { primaryText: '建议', leftIcon: _qiliApp.React.createElement(_bugReport2.default, null) }),
																_qiliApp.React.createElement(List.Item, { primaryText: '更新', leftIcon: _qiliApp.React.createElement(_systemUpdateAlt2.default, null) }),
																_qiliApp.React.createElement(List.Item, { primaryText: 'App', leftIcon: _qiliApp.React.createElement(_logo2.default, null),
																				onClick: function onClick(a) {
																								return _this2.downloadApp();
																				}
																}),
																_qiliApp.React.createElement(List.Item, { primaryText: '关于', leftIcon: _qiliApp.React.createElement(_infoOutline2.default, null) })
												);
								}
				}, {
								key: 'downloadApp',
								value: function downloadApp() {
												var a = document.createElement("a");
												a.href = "./app.apk";
												a.download = "superdaddy.apk";
												a.style.position = "absolute";
												a.top = -1000;
												document.body.appendChild(a);
												a.click();
												document.body.removeChild(a);
								}
				}]);

				return Setting;
}(_qiliApp.Component);

exports.default = Setting;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRUs7O0lBRWdCOzs7Ozs7Ozs7OztpQ0FDVDs7O0FBQ0osbUJBQ0k7QUFBQyxvQkFBRDs7Z0JBQ0ksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxLQUFaLEVBQWtCLFVBQVUsc0RBQVYsRUFBN0IsQ0FESjtnQkFFSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLElBQVosRUFBaUIsVUFBVSx1REFBVixFQUE1QixDQUZKO2dCQUlJLDZCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWixFQUFpQixVQUFVLDZEQUFWLEVBQTVCLENBSko7Z0JBTVIsNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxLQUFaLEVBQWtCLFVBQVUsa0RBQVY7QUFDNUIsNkJBQVM7K0JBQUcsT0FBSyxXQUFMO3FCQUFIO2lCQURWLENBTlE7Z0JBU0ksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFVBQVUseURBQVYsRUFBNUIsQ0FUSjthQURKLENBREk7Ozs7c0NBZ0JFO0FBQ1osZ0JBQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQURRO0FBRVosY0FBRSxJQUFGLEdBQU8sV0FBUCxDQUZZO0FBR1osY0FBRSxRQUFGLEdBQVcsZ0JBQVgsQ0FIWTtBQUlaLGNBQUUsS0FBRixDQUFRLFFBQVIsR0FBaUIsVUFBakIsQ0FKWTtBQUtaLGNBQUUsR0FBRixHQUFNLENBQUMsSUFBRCxDQUxNO0FBTVoscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFOWTtBQU9aLGNBQUUsS0FBRixHQVBZO0FBUVoscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFSWTs7OztXQWpCTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IFJhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvZWRpdG9yL21vZGUtZWRpdCdcclxuaW1wb3J0IEJ1Z0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYnVnLXJlcG9ydCdcclxuaW1wb3J0IFVwZGF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc3lzdGVtLXVwZGF0ZS1hbHQnXHJcbmltcG9ydCBBYm91dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vaW5mby1vdXRsaW5lJ1xyXG5pbXBvcnQgTG9nb0ljb24gZnJvbSBcIi4vaWNvbnMvbG9nb1wiXHJcblxyXG52YXIge0xpc3R9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5nIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5Y676K+E5Lu3XCIgbGVmdEljb249ezxSYXRlSWNvbi8+fS8+XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5bu66K6uXCIgbGVmdEljb249ezxCdWdJY29uLz59Lz5cclxuXHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5pu05pawXCIgbGVmdEljb249ezxVcGRhdGVJY29uLz59Lz5cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0PExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIkFwcFwiIGxlZnRJY29uPXs8TG9nb0ljb24vPn1cclxuXHRcdFx0XHRcdG9uQ2xpY2s9e2E9PnRoaXMuZG93bmxvYWRBcHAoKX1cclxuXHRcdFx0XHRcdC8+XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLlhbPkuo5cIiBsZWZ0SWNvbj17PEFib3V0SWNvbi8+fS8+XHJcbiAgICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICApXHJcbiAgICB9XHJcblx0XHJcblx0ZG93bmxvYWRBcHAoKXtcclxuXHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcblx0XHRhLmhyZWY9XCIuL2FwcC5hcGtcIlxyXG5cdFx0YS5kb3dubG9hZD1cInN1cGVyZGFkZHkuYXBrXCJcclxuXHRcdGEuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiXHJcblx0XHRhLnRvcD0tMTAwMDtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcclxuXHRcdGEuY2xpY2soKVxyXG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKVxyXG5cdH1cclxufVxyXG4iXX0=