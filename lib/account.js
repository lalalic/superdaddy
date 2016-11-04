"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _keyboardArrowRight = require("material-ui/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _groupAdd = require("material-ui/svg-icons/social/group-add");

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

var _childCare = require("material-ui/svg-icons/places/child-care");

var _childCare2 = _interopRequireDefault(_childCare);

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Photo = _qiliApp.UI.Photo;
var CommandBar = _qiliApp.UI.CommandBar;

var Account = function (_Component) {
    _inherits(Account, _Component);

    function Account() {
        _classCallCheck(this, Account);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Account).apply(this, arguments));
    }

    _createClass(Account, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var user = _qiliApp.User.current,
                router = this.context.router,
                avatar;
            if (user.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: user.photo });else {
                avatar = _react2.default.createElement(Photo, {
                    onPhoto: function onPhoto(url) {
                        user.photo = url;_qiliApp.User.upsert(user);
                    },
                    iconRatio: 2 / 3, width: 40, height: 40 });
            }

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    List,
                    null,
                    _react2.default.createElement(List.Item, { primaryText: user.name || user.username,
                        leftAvatar: avatar,
                        rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null) }),
                    _react2.default.createElement(List.Divider, { inset: true }),
                    _react2.default.createElement(List.Item, { primaryText: "我的宝贝",
                        leftIcon: _react2.default.createElement(_childCare2.default, { className: "plus" }),
                        initiallyOpen: true,
                        autoGenerateNestedIndicator: false,
                        onClick: function onClick(a) {
                            return router.push("baby");
                        },
                        nestedItems: _db.Family.children.map(function (a) {
                            var avatar;
                            if (a.photo) avatar = _react2.default.createElement(_materialUi.Avatar, { src: a.photo });else avatar = _react2.default.createElement(Photo, {
                                onPhoto: function onPhoto(url) {
                                    return _this2.shortcutPhoto(a, url);
                                },
                                iconRatio: 2 / 3, width: 40, height: 40 });

                            return _react2.default.createElement(List.Item, { key: a._id,
                                primaryText: a.name,
                                onClick: function onClick(e) {
                                    _db.Family.currentChild = a;
                                    router.push("baby/" + a.name);
                                },
                                leftAvatar: avatar });
                        })
                    }),
                    _react2.default.createElement(List.Divider, { inset: true }),
                    _react2.default.createElement(List.Item, { primaryText: "邀请家人",
                        leftIcon: _react2.default.createElement(_groupAdd2.default, null),
                        rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(a) {
                            return router.push("invite");
                        }
                    }),
                    _react2.default.createElement(List.Item, { primaryText: "设置",
                        leftIcon: _react2.default.createElement(_settings2.default, null),
                        rightIcon: _react2.default.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(e) {
                            return _this2.context.router.push('setting');
                        }
                    })
                )
            );
        }
    }, {
        key: "shortcutPhoto",
        value: function shortcutPhoto(child, url) {
            _db.Family.upsert(child, { photo: url });
        }
    }]);

    return Account;
}(_react.Component);

Account.contextTypes = { router: _react.PropTypes.object };
exports.default = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Ozs7V0FwRVI7OztRQXdFVixlQUFhLEVBQUMsUUFBTyxpQkFBVSxNQUFWO2tCQXhFWCIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBTZXR0aW5nSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NldHRpbmdzJ1xyXG5pbXBvcnQgSW52aXRlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL2dyb3VwLWFkZCdcclxuaW1wb3J0IFB1Ymxpc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgQmFieUljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXHJcblxyXG52YXIge0xpc3QsIFBob3RvLCBDb21tYW5kQmFyfT1VSVxyXG5cclxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gXCIuL2RiXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuXHRcdFx0LHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyXHJcblx0XHRcdCxhdmF0YXJcclxuICAgICAgICBpZih1c2VyLnBob3RvKVxyXG4gICAgICAgICAgICBhdmF0YXI9PEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXZhdGFyPTxQaG90b1xyXG4gICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9Pnt1c2VyLnBob3RvPXVybDtVc2VyLnVwc2VydCh1c2VyKX19XHJcbiAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17dXNlci5uYW1lfHx1c2VyLnVzZXJuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5oiR55qE5a6d6LSdXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxCYWJ5SWNvbiBjbGFzc05hbWU9XCJwbHVzXCIvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGx5T3Blbj17dHJ1ZX1cclxuXHRcdFx0XHRcdFx0YXV0b0dlbmVyYXRlTmVzdGVkSW5kaWNhdG9yPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnB1c2goXCJiYWJ5XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXN0ZWRJdGVtcz17XHJcblx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkuY2hpbGRyZW4ubWFwKGE9PntcclxuXHRcdFx0XHRcdFx0XHRcdHZhciBhdmF0YXI7XHJcblx0XHRcdFx0XHRcdFx0XHRpZihhLnBob3RvKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRhdmF0YXI9KDxBdmF0YXIgc3JjPXthLnBob3RvfS8+KVxyXG5cdFx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRhdmF0YXI9KDxQaG90b1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uUGhvdG89eyh1cmwpPT50aGlzLnNob3J0Y3V0UGhvdG8oYSx1cmwpfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz4pXHJcblxyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHRcdFx0XHRcdFx0PExpc3QuSXRlbSBrZXk9e2EuX2lkfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHByaW1hcnlUZXh0PXthLm5hbWV9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25DbGljaz17ZT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGJGYW1pbHkuY3VycmVudENoaWxkPWFcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJvdXRlci5wdXNoKGBiYWJ5LyR7YS5uYW1lfWApXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0fX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsZWZ0QXZhdGFyPXthdmF0YXJ9Lz5cclxuXHRcdFx0XHRcdFx0XHRcdClcclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHR9XHJcbiAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi6YKA6K+35a625Lq6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxJbnZpdGVJY29uLz59XHJcblx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnB1c2goXCJpbnZpdGVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLorr7nva5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcblx0XHRcdFx0XHRcdHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdzZXR0aW5nJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBzaG9ydGN1dFBob3RvKGNoaWxkLCB1cmwpe1xyXG4gICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZCx7cGhvdG86dXJsfSlcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UHJvcFR5cGVzLm9iamVjdH1cclxufVxyXG4iXX0=