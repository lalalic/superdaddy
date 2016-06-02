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

var _android = require('material-ui/lib/svg-icons/action/android');

var _android2 = _interopRequireDefault(_android);

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
																_qiliApp.React.createElement(List.Item, { primaryText: 'App', leftIcon: _qiliApp.React.createElement(_android2.default, null),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRUs7O0lBRWdCOzs7Ozs7Ozs7OztpQ0FDVDs7O0FBQ0osbUJBQ0k7QUFBQyxvQkFBRDs7Z0JBQ0ksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxLQUFaLEVBQWtCLFVBQVUsc0RBQVYsRUFBN0IsQ0FESjtnQkFFSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLElBQVosRUFBaUIsVUFBVSx1REFBVixFQUE1QixDQUZKO2dCQUlJLDZCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWixFQUFpQixVQUFVLDZEQUFWLEVBQTVCLENBSko7Z0JBTVIsNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxLQUFaLEVBQWtCLFVBQVUscURBQVY7QUFDNUIsNkJBQVM7K0JBQUcsT0FBSyxXQUFMO3FCQUFIO2lCQURWLENBTlE7Z0JBU0ksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxJQUFaLEVBQWlCLFVBQVUseURBQVYsRUFBNUIsQ0FUSjthQURKLENBREk7Ozs7c0NBZ0JFO0FBQ1osZ0JBQUksSUFBRSxTQUFTLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBRixDQURRO0FBRVosY0FBRSxJQUFGLEdBQU8sV0FBUCxDQUZZO0FBR1osY0FBRSxRQUFGLEdBQVcsZ0JBQVgsQ0FIWTtBQUlaLGNBQUUsS0FBRixDQUFRLFFBQVIsR0FBaUIsVUFBakIsQ0FKWTtBQUtaLGNBQUUsR0FBRixHQUFNLENBQUMsSUFBRCxDQUxNO0FBTVoscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFOWTtBQU9aLGNBQUUsS0FBRixHQVBZO0FBUVoscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFSWTs7OztXQWpCTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IFJhdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvZWRpdG9yL21vZGUtZWRpdCdcclxuaW1wb3J0IEJ1Z0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYnVnLXJlcG9ydCdcclxuaW1wb3J0IFVwZGF0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc3lzdGVtLXVwZGF0ZS1hbHQnXHJcbmltcG9ydCBBYm91dEljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vaW5mby1vdXRsaW5lJ1xyXG5pbXBvcnQgTG9nb0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FuZHJvaWRcIlxyXG5cclxudmFyIHtMaXN0fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0dGluZyBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPlxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuW7uuiurlwiIGxlZnRJY29uPXs8QnVnSWNvbi8+fS8+XHJcblxyXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuabtOaWsFwiIGxlZnRJY29uPXs8VXBkYXRlSWNvbi8+fS8+XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCJBcHBcIiBsZWZ0SWNvbj17PExvZ29JY29uLz59XHJcblx0XHRcdFx0XHRvbkNsaWNrPXthPT50aGlzLmRvd25sb2FkQXBwKCl9XHJcblx0XHRcdFx0XHQvPlx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5YWz5LqOXCIgbGVmdEljb249ezxBYm91dEljb24vPn0vPlxyXG4gICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cdFxyXG5cdGRvd25sb2FkQXBwKCl7XHJcblx0XHR2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG5cdFx0YS5ocmVmPVwiLi9hcHAuYXBrXCJcclxuXHRcdGEuZG93bmxvYWQ9XCJzdXBlcmRhZGR5LmFwa1wiXHJcblx0XHRhLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIlxyXG5cdFx0YS50b3A9LTEwMDA7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpXHJcblx0XHRhLmNsaWNrKClcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcclxuXHR9XHJcbn1cclxuIl19