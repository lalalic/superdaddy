"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
                        onClick: function onClick($) {
                            return router.push("baby/" + (_db.Family.currentChild = a)._id);
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
                                return router.push("baby");
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
                            return router.push("invite");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "出书",
                        leftIcon: _qiliApp.React.createElement(_cameraRoll2.default, null),
                        onClick: function onClick(a) {
                            return router.push("publish");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "设置",
                        leftIcon: _qiliApp.React.createElement(_settings2.default, null),
                        onClick: function onClick(e) {
                            return _this3.context.router.push('setting');
                        }
                    })
                ),
                _qiliApp.React.createElement(CommandBar, { className: "footbar",
                    items: ["Back"]
                })
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


Account.contextTypes = { router: _qiliApp.React.PropTypes.object };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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LENBQXlCLFNBQXpCO3lCQUFIO3FCQUZiLENBM0JKO2lCQURKO2dCQWlDUiw2QkFBQyxVQUFELElBQVksV0FBVSxTQUFWO0FBQ0ksMkJBQU8sQ0FBQyxNQUFELENBQVA7aUJBRGhCLENBakNRO2FBREosQ0FuQ0k7Ozs7c0NBNEVNLE9BQU8sS0FBSTtBQUNyQix1QkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLEVBQUMsT0FBTSxHQUFOLEVBQXZCLEVBRHFCOzs7O1dBN0VSOzs7Ozs7QUFrRnJCLFFBQVEsWUFBUixHQUFxQixFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQTdCIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEludml0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9ncm91cC1hZGQnXHJcbmltcG9ydCBQdWJsaXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuXHJcbnZhciB7TGlzdCwgUGhvdG8sIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSBcIi4vZGJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudFxyXG4gICAgICAgIHZhciBhdmF0YXI7XHJcbiAgICAgICAgaWYodXNlci5waG90bylcclxuICAgICAgICAgICAgYXZhdGFyPTxBdmF0YXIgc3JjPXt1c2VyLnBob3RvfS8+XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF2YXRhcj08UGhvdG9cclxuICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT57dXNlci5waG90bz11cmw7VXNlci51cHNlcnQodXNlcil9fVxyXG4gICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyLFxyXG4gICAgICAgICAgICBjaGlsZHJlbj1kYkZhbWlseS5jaGlsZHJlbixcclxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aCxcclxuICAgICAgICAgICAgdWlDaGlsZHJlbj1jaGlsZHJlbi5tYXAoZnVuY3Rpb24oYSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXZhdGFyO1xyXG4gICAgICAgICAgICAgICAgaWYoYS5waG90bylcclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI9KDxBdmF0YXIgc3JjPXthLnBob3RvfS8+KVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG89KDxQaG90b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5zaG9ydGN1dFBob3RvKGEsdXJsKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPilcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPXBob3RvXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17YS5faWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyQ9PnJvdXRlci5wdXNoKGBiYWJ5LyR7KGRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hKS5faWR9YCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8TGlzdD5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXt1c2VyLm5hbWV8fHVzZXIudXNlcm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLmiJHnmoTlrp3otJ1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PHNwYW4vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbj17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnB1c2goXCJiYWJ5XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17PEF2YXRhcj4rPC9BdmF0YXI+fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VpQ2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIumCgOivt+WutuS6ulwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8SW52aXRlSWNvbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIucHVzaChcImludml0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuWHuuS5plwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8UHVibGlzaEljb24vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnB1c2goXCJwdWJsaXNoXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi6K6+572uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxTZXR0aW5nSWNvbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ3NldHRpbmcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc2hvcnRjdXRQaG90byhjaGlsZCwgdXJsKXtcclxuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbkFjY291bnQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxuIl19