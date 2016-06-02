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

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

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
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "<a href='./app.apk' target='_new'>安装</a>",
                        leftIcon: _qiliApp.React.createElement(_logo2.default, null)
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


Account.contextTypes = { router: _qiliApp.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFwQixDQUFpQyxTQUFqQzt5QkFBSDtxQkFGYixDQTNCSjtvQkFnQ1gsNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSwwQ0FBWjtBQUNRLGtDQUFVLGtEQUFWO3FCQURuQixDQWhDVztpQkFESjtnQkFxQ1IsNkJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNJLDJCQUFPLENBQUMsTUFBRCxDQUFQO2lCQURoQixDQXJDUTthQURKLENBbkNJOzs7O3NDQWdGTSxPQUFPLEtBQUk7QUFDckIsdUJBQVMsTUFBVCxDQUFnQixLQUFoQixFQUFzQixFQUFDLE9BQU0sR0FBTixFQUF2QixFQURxQjs7OztXQWpGUjs7Ozs7O0FBc0ZyQixRQUFRLFlBQVIsR0FBcUIsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixJQUFoQixFQUE3QiIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBTZXR0aW5nSWNvbiBmcm9tICdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEludml0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9zb2NpYWwvZ3JvdXAtYWRkJ1xyXG5pbXBvcnQgUHVibGlzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5pbXBvcnQgTG9nb0ljb24gZnJvbSBcIi4vaWNvbnMvbG9nb1wiXHJcblxyXG52YXIge0xpc3QsIFBob3RvLCBDb21tYW5kQmFyfT1VSVxyXG5cclxuaW1wb3J0IHtGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gXCIuL2RiXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuICAgICAgICB2YXIgYXZhdGFyO1xyXG4gICAgICAgIGlmKHVzZXIucGhvdG8pXHJcbiAgICAgICAgICAgIGF2YXRhcj08QXZhdGFyIHNyYz17dXNlci5waG90b30vPlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhdmF0YXI9PFBob3RvXHJcbiAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+e3VzZXIucGhvdG89dXJsO1VzZXIudXBzZXJ0KHVzZXIpfX1cclxuICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlcixcclxuICAgICAgICAgICAgY2hpbGRyZW49ZGJGYW1pbHkuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGgsXHJcbiAgICAgICAgICAgIHVpQ2hpbGRyZW49Y2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGEpe1xyXG4gICAgICAgICAgICAgICAgdmFyIGF2YXRhcjtcclxuICAgICAgICAgICAgICAgIGlmKGEucGhvdG8pXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17YS5waG90b30vPilcclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBob3RvPSg8UGhvdG9cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMuc2hvcnRjdXRQaG90byhhLHVybCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz4pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcj1waG90b1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2EuX2lkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIixkYkZhbWlseS5jdXJyZW50Q2hpbGQ9YSl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHthLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8TGlzdD5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXt1c2VyLm5hbWV8fHVzZXIudXNlcm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLmiJHnmoTlrp3otJ1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PHNwYW4vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb3Blbj17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17YT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXs8QXZhdGFyPis8L0F2YXRhcj59PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dWlDaGlsZHJlbn1cclxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi6YKA6K+35a625Lq6XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxJbnZpdGVJY29uLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJpbnZpdGVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLlh7rkuaZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PFB1Ymxpc2hJY29uLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJwdWJsaXNoXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi6K6+572uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxTZXR0aW5nSWNvbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygnc2V0dGluZycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCI8YSBocmVmPScuL2FwcC5hcGsnIHRhcmdldD0nX25ldyc+5a6J6KOFPC9hPlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8TG9nb0ljb24vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc2hvcnRjdXRQaG90byhjaGlsZCwgdXJsKXtcclxuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbkFjY291bnQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XHJcbiJdfQ==