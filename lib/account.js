"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _keyboardArrowRight = require("material-ui/lib/svg-icons/hardware/keyboard-arrow-right");

var _keyboardArrowRight2 = _interopRequireDefault(_keyboardArrowRight);

var _settings = require("material-ui/lib/svg-icons/action/settings");

var _settings2 = _interopRequireDefault(_settings);

var _groupAdd = require("material-ui/lib/svg-icons/social/group-add");

var _groupAdd2 = _interopRequireDefault(_groupAdd);

var _cameraRoll = require("material-ui/lib/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

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
            var _this3 = this;

            var user = _qiliApp.User.current;
            var avatar;
            if (user.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: user.photo });else {
                avatar = _qiliApp.React.createElement(Photo, {
                    onPhoto: function onPhoto(url) {
                        user.photo = url;_qiliApp.User.upsert(user);
                    },
                    iconRatio: 2 / 3, width: 40, height: 40 });
            }

            var router = this.context.router,
                children = _db.Family.children,
                len = children.length,
                uiChildren = children.map(function (a) {
                var _this2 = this;

                var avatar;
                if (a.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: a.photo });else {
                    var photo = _qiliApp.React.createElement(Photo, {
                        onPhoto: function onPhoto(url) {
                            return _this2.shortcutPhoto(a, url);
                        },
                        iconRatio: 2 / 3, width: 40, height: 40 });

                    avatar = photo;
                }

                return _qiliApp.React.createElement(
                    List.Item,
                    { key: a._id,
                        onClick: function onClick() {
                            return router.transitionTo("baby", _db.Family.currentChild = a);
                        },
                        leftAvatar: avatar },
                    a.name
                );
            });

            return _qiliApp.React.createElement(
                "div",
                null,
                _qiliApp.React.createElement(
                    List,
                    null,
                    _qiliApp.React.createElement(List.Item, { primaryText: user.name || user.username,
                        leftAvatar: avatar,
                        rightIcon: _qiliApp.React.createElement(_keyboardArrowRight2.default, null) }),
                    _qiliApp.React.createElement(List.Divider, { inset: true }),
                    _qiliApp.React.createElement(
                        List.Item,
                        { primaryText: "我的宝贝",
                            leftIcon: _qiliApp.React.createElement("span", null),
                            open: true,
                            onClick: function onClick(a) {
                                return router.transitionTo("baby");
                            },
                            rightAvatar: _qiliApp.React.createElement(
                                _materialUi.Avatar,
                                null,
                                "+"
                            ) },
                        uiChildren
                    ),
                    _qiliApp.React.createElement(List.Divider, { inset: true }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "邀请家人",
                        leftIcon: _qiliApp.React.createElement(_groupAdd2.default, null),
                        onClick: function onClick(a) {
                            return router.transitionTo("invite");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "出书",
                        leftIcon: _qiliApp.React.createElement(_cameraRoll2.default, null),
                        onClick: function onClick(a) {
                            return router.transitionTo("publish");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "设置",
                        leftIcon: _qiliApp.React.createElement(_settings2.default, null),
                        onClick: function onClick(e) {
                            return _this3.context.router.transitionTo('setting');
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
}(_qiliApp.Component);

exports.default = Account;


Account.contextTypes = { router: _qiliApp.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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aUMsU0FBakM7eUJBQUg7cUJBRmIsQ0EzQko7aUJBREo7YUFESixDQW5DSTs7OztzQ0F5RU0sT0FBTyxLQUFJO0FBQ3JCLHVCQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0IsRUFBQyxPQUFNLEdBQU4sRUFBdkIsRUFEcUI7Ozs7V0ExRVI7Ozs7OztBQStFckIsUUFBUSxZQUFSLEdBQXFCLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBN0IiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJbnZpdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvc29jaWFsL2dyb3VwLWFkZCdcclxuaW1wb3J0IFB1Ymxpc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuXHJcbnZhciB7TGlzdCwgUGhvdG8sIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSBcIi4vZGJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudFxyXG4gICAgICAgIHZhciBhdmF0YXI7XHJcbiAgICAgICAgaWYodXNlci5waG90bylcclxuICAgICAgICAgICAgYXZhdGFyPTxBdmF0YXIgc3JjPXt1c2VyLnBob3RvfS8+XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF2YXRhcj08UGhvdG9cclxuICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT57dXNlci5waG90bz11cmw7VXNlci51cHNlcnQodXNlcil9fVxyXG4gICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyLFxyXG4gICAgICAgICAgICBjaGlsZHJlbj1kYkZhbWlseS5jaGlsZHJlbixcclxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aCxcclxuICAgICAgICAgICAgdWlDaGlsZHJlbj1jaGlsZHJlbi5tYXAoZnVuY3Rpb24oYSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZhdGFyO1xyXG4gICAgICAgICAgICAgICAgaWYoYS5waG90bylcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI9KDxBdmF0YXIgc3JjPXthLnBob3RvfS8+KVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG89KDxQaG90b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5zaG9ydGN1dFBob3RvKGEsdXJsKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPXBob3RvXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17YS5faWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiLGRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2EubmFtZX1cclxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e3VzZXIubmFtZXx8dXNlci51c2VybmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxSaWdodEFycm93Lz59IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuaIkeeahOWunei0nVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8c3Bhbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRBdmF0YXI9ezxBdmF0YXI+KzwvQXZhdGFyPn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt1aUNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLpgoDor7flrrbkurpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PEludml0ZUljb24vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImludml0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWHuuS5plwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8UHVibGlzaEljb24vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnRyYW5zaXRpb25UbyhcInB1Ymxpc2hcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLorr7nva5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PFNldHRpbmdJY29uLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdzZXR0aW5nJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBzaG9ydGN1dFBob3RvKGNoaWxkLCB1cmwpe1xyXG4gICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZCx7cGhvdG86dXJsfSlcclxuICAgIH1cclxufVxyXG5cclxuQWNjb3VudC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cclxuIl19