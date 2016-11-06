"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _modeEdit = require("material-ui/svg-icons/editor/mode-edit");

var _modeEdit2 = _interopRequireDefault(_modeEdit);

var _bugReport = require("material-ui/svg-icons/action/bug-report");

var _bugReport2 = _interopRequireDefault(_bugReport);

var _systemUpdateAlt = require("material-ui/svg-icons/action/system-update-alt");

var _systemUpdateAlt2 = _interopRequireDefault(_systemUpdateAlt);

var _infoOutline = require("material-ui/svg-icons/action/info-outline");

var _infoOutline2 = _interopRequireDefault(_infoOutline);

var _android = require("material-ui/svg-icons/action/android");

var _android2 = _interopRequireDefault(_android);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var CommandBar = _qiliApp.UI.CommandBar;

var Setting = function (_Component) {
    _inherits(Setting, _Component);

    function Setting() {
        _classCallCheck(this, Setting);

        return _possibleConstructorReturn(this, (Setting.__proto__ || Object.getPrototypeOf(Setting)).apply(this, arguments));
    }

    _createClass(Setting, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    List,
                    null,
                    _react2.default.createElement(List.Item, { primaryText: "\u53BB\u8BC4\u4EF7", leftIcon: _react2.default.createElement(_modeEdit2.default, null) }),
                    _react2.default.createElement(List.Item, { primaryText: "\u5EFA\u8BAE", leftIcon: _react2.default.createElement(_bugReport2.default, null) }),
                    _react2.default.createElement(List.Item, { primaryText: "\u66F4\u65B0", leftIcon: _react2.default.createElement(_systemUpdateAlt2.default, null) }),
                    _react2.default.createElement(List.Item, { primaryText: "App", leftIcon: _react2.default.createElement(_android2.default, null),
                        onClick: function onClick(a) {
                            return _this2.downloadApp();
                        }
                    }),
                    _react2.default.createElement(List.Item, { primaryText: "\u5173\u4E8E", leftIcon: _react2.default.createElement(_infoOutline2.default, null) })
                ),
                _react2.default.createElement(CommandBar, { className: "footbar", items: [{ action: "Back" }] })
            );
        }
    }, {
        key: "downloadApp",
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
}(_react.Component);

exports.default = Setting;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXR0aW5nLmpzIl0sIm5hbWVzIjpbIkxpc3QiLCJDb21tYW5kQmFyIiwiU2V0dGluZyIsImRvd25sb2FkQXBwIiwiYWN0aW9uIiwiYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImhyZWYiLCJkb3dubG9hZCIsInN0eWxlIiwicG9zaXRpb24iLCJ0b3AiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRUtBLEksZUFBQUEsSTtJQUFLQyxVLGVBQUFBLFU7O0lBRVdDLE87Ozs7Ozs7Ozs7O2lDQUNUO0FBQUE7O0FBQ0osbUJBQ0k7QUFBQTtBQUFBO0FBQ0k7QUFBQyx3QkFBRDtBQUFBO0FBQ0ksa0RBQUMsSUFBRCxDQUFNLElBQU4sSUFBVyxhQUFZLG9CQUF2QixFQUE2QixVQUFVLHVEQUF2QyxHQURKO0FBRUksa0RBQUMsSUFBRCxDQUFNLElBQU4sSUFBVyxhQUFZLGNBQXZCLEVBQTRCLFVBQVUsd0RBQXRDLEdBRko7QUFJSSxrREFBQyxJQUFELENBQU0sSUFBTixJQUFXLGFBQVksY0FBdkIsRUFBNEIsVUFBVSw4REFBdEMsR0FKSjtBQU1SLGtEQUFDLElBQUQsQ0FBTSxJQUFOLElBQVcsYUFBWSxLQUF2QixFQUE2QixVQUFVLHNEQUF2QztBQUNDLGlDQUFTO0FBQUEsbUNBQUcsT0FBS0MsV0FBTCxFQUFIO0FBQUE7QUFEVixzQkFOUTtBQVNJLGtEQUFDLElBQUQsQ0FBTSxJQUFOLElBQVcsYUFBWSxjQUF2QixFQUE0QixVQUFVLDBEQUF0QztBQVRKLGlCQURKO0FBWUksOENBQUMsVUFBRCxJQUFZLFdBQVUsU0FBdEIsRUFBZ0MsT0FBTyxDQUFDLEVBQUNDLFFBQU8sTUFBUixFQUFELENBQXZDO0FBWkosYUFESjtBQWdCSDs7O3NDQUVTO0FBQ1osZ0JBQUlDLElBQUVDLFNBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRixjQUFFRyxJQUFGLEdBQU8sV0FBUDtBQUNBSCxjQUFFSSxRQUFGLEdBQVcsZ0JBQVg7QUFDQUosY0FBRUssS0FBRixDQUFRQyxRQUFSLEdBQWlCLFVBQWpCO0FBQ0FOLGNBQUVPLEdBQUYsR0FBTSxDQUFDLElBQVA7QUFDQU4scUJBQVNPLElBQVQsQ0FBY0MsV0FBZCxDQUEwQlQsQ0FBMUI7QUFDQUEsY0FBRVUsS0FBRjtBQUNBVCxxQkFBU08sSUFBVCxDQUFjRyxXQUFkLENBQTBCWCxDQUExQjtBQUNBOzs7Ozs7a0JBN0JtQkgsTyIsImZpbGUiOiJzZXR0aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBSYXRlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL21vZGUtZWRpdCdcclxuaW1wb3J0IEJ1Z0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9idWctcmVwb3J0J1xyXG5pbXBvcnQgVXBkYXRlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3N5c3RlbS11cGRhdGUtYWx0J1xyXG5pbXBvcnQgQWJvdXRJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vaW5mby1vdXRsaW5lJ1xyXG5pbXBvcnQgTG9nb0ljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYW5kcm9pZFwiXHJcblxyXG52YXIge0xpc3QsQ29tbWFuZEJhcn09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldHRpbmcgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWOu+ivhOS7t1wiIGxlZnRJY29uPXs8UmF0ZUljb24vPn0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLlu7rorq5cIiBsZWZ0SWNvbj17PEJ1Z0ljb24vPn0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5pu05pawXCIgbGVmdEljb249ezxVcGRhdGVJY29uLz59Lz5cclxuXHJcbiAgICBcdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCJBcHBcIiBsZWZ0SWNvbj17PExvZ29JY29uLz59XHJcbiAgICBcdFx0XHRcdFx0b25DbGljaz17YT0+dGhpcy5kb3dubG9hZEFwcCgpfVxyXG4gICAgXHRcdFx0XHRcdC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWFs+S6jlwiIGxlZnRJY29uPXs8QWJvdXRJY29uLz59Lz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBpdGVtcz17W3thY3Rpb246XCJCYWNrXCJ9XX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG5cdGRvd25sb2FkQXBwKCl7XHJcblx0XHR2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxyXG5cdFx0YS5ocmVmPVwiLi9hcHAuYXBrXCJcclxuXHRcdGEuZG93bmxvYWQ9XCJzdXBlcmRhZGR5LmFwa1wiXHJcblx0XHRhLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIlxyXG5cdFx0YS50b3A9LTEwMDA7XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpXHJcblx0XHRhLmNsaWNrKClcclxuXHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcclxuXHR9XHJcbn1cclxuIl19