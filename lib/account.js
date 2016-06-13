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
            if (user.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: user.photo });else {
                avatar = _qiliApp.React.createElement(Photo, {
                    onPhoto: function onPhoto(url) {
                        user.photo = url;_qiliApp.User.upsert(user);
                    },
                    iconRatio: 2 / 3, width: 40, height: 40 });
            }

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
                    _qiliApp.React.createElement(List.Item, { primaryText: "我的宝贝",
                        leftIcon: _qiliApp.React.createElement(_childCare2.default, { className: "plus" }),
                        initiallyOpen: true,
                        autoGenerateNestedIndicator: false,
                        onClick: function onClick(a) {
                            return router.push("baby");
                        },
                        nestedItems: _db.Family.children.map(function (a) {
                            var avatar;
                            if (a.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: a.photo });else avatar = _qiliApp.React.createElement(Photo, {
                                onPhoto: function onPhoto(url) {
                                    return _this2.shortcutPhoto(a, url);
                                },
                                iconRatio: 2 / 3, width: 40, height: 40 });

                            return _qiliApp.React.createElement(List.Item, { key: a._id,
                                primaryText: a.name,
                                onClick: function onClick(e) {
                                    _db.Family.currentChild = a;
                                    router.push("baby/" + a.name);
                                },
                                leftAvatar: avatar });
                        })
                    }),
                    _qiliApp.React.createElement(List.Divider, { inset: true }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "邀请家人",
                        leftIcon: _qiliApp.React.createElement(_groupAdd2.default, null),
                        rightIcon: _qiliApp.React.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(a) {
                            return router.push("invite");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "出书",
                        leftIcon: _qiliApp.React.createElement(_cameraRoll2.default, null),
                        rightIcon: _qiliApp.React.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(a) {
                            return router.push("publish");
                        }
                    }),
                    _qiliApp.React.createElement(List.Item, { primaryText: "设置",
                        leftIcon: _qiliApp.React.createElement(_settings2.default, null),
                        rightIcon: _qiliApp.React.createElement(_keyboardArrowRight2.default, null),
                        onClick: function onClick(e) {
                            return _this2.context.router.push('setting');
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
//# sourceMappingURL=data:application/json;base64,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QUF6Qjt5QkFBSDtxQkFIYixDQWpESjtpQkFESjtnQkF3RFIsNkJBQUMsVUFBRCxJQUFZLFdBQVUsU0FBVjtBQUNJLDJCQUFPLENBQUMsTUFBRCxDQUFQO2lCQURoQixDQXhEUTthQURKLENBWkk7Ozs7c0NBNEVNLE9BQU8sS0FBSTtBQUNyQix1QkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLEVBQUMsT0FBTSxHQUFOLEVBQXZCLEVBRHFCOzs7O1dBN0VSOzs7Ozs7QUFrRnJCLFFBQVEsWUFBUixHQUFxQixFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCLEVBQTdCIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IFJpZ2h0QXJyb3cgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0J1xyXG5pbXBvcnQgU2V0dGluZ0ljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9zZXR0aW5ncydcclxuaW1wb3J0IEludml0ZUljb24gZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL3NvY2lhbC9ncm91cC1hZGQnXHJcbmltcG9ydCBQdWJsaXNoSWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuaW1wb3J0IEJhYnlJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxyXG5cclxudmFyIHtMaXN0LCBQaG90bywgQ29tbWFuZEJhcn09VUlcclxuXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tIFwiLi9kYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHVzZXI9VXNlci5jdXJyZW50XHJcblx0XHRcdCxyb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlclxyXG5cdFx0XHQsYXZhdGFyXHJcbiAgICAgICAgaWYodXNlci5waG90bylcclxuICAgICAgICAgICAgYXZhdGFyPTxBdmF0YXIgc3JjPXt1c2VyLnBob3RvfS8+XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGF2YXRhcj08UGhvdG9cclxuICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT57dXNlci5waG90bz11cmw7VXNlci51cHNlcnQodXNlcil9fVxyXG4gICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e3VzZXIubmFtZXx8dXNlci51c2VybmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxSaWdodEFycm93Lz59IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuaIkeeahOWunei0nVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8QmFieUljb24gY2xhc3NOYW1lPVwicGx1c1wiLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxseU9wZW49e3RydWV9XHJcblx0XHRcdFx0XHRcdGF1dG9HZW5lcmF0ZU5lc3RlZEluZGljYXRvcj17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci5wdXNoKFwiYmFieVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbmVzdGVkSXRlbXM9e1xyXG5cdFx0XHRcdFx0XHRcdGRiRmFtaWx5LmNoaWxkcmVuLm1hcChhPT57XHJcblx0XHRcdFx0XHRcdFx0XHR2YXIgYXZhdGFyO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYoYS5waG90bylcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXZhdGFyPSg8QXZhdGFyIHNyYz17YS5waG90b30vPilcclxuXHRcdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdFx0YXZhdGFyPSg8UGhvdG9cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvblBob3RvPXsodXJsKT0+dGhpcy5zaG9ydGN1dFBob3RvKGEsdXJsKX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+KVxyXG5cclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHRcdFx0XHRcdDxMaXN0Lkl0ZW0ga2V5PXthLl9pZH1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwcmltYXJ5VGV4dD17YS5uYW1lfVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9uQ2xpY2s9e2U9PntcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyb3V0ZXIucHVzaChgYmFieS8ke2EubmFtZX1gKVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH19XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0bGVmdEF2YXRhcj17YXZhdGFyfS8+XHJcblx0XHRcdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0fVxyXG4gICAgICAgICAgICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIumCgOivt+WutuS6ulwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8SW52aXRlSWNvbi8+fVxyXG5cdFx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci5wdXNoKFwiaW52aXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5Ye65LmmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxQdWJsaXNoSWNvbi8+fVxyXG5cdFx0XHRcdFx0XHRyaWdodEljb249ezxSaWdodEFycm93Lz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci5wdXNoKFwicHVibGlzaFwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuiuvue9rlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8U2V0dGluZ0ljb24vPn1cclxuXHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ3NldHRpbmcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc2hvcnRjdXRQaG90byhjaGlsZCwgdXJsKXtcclxuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbkFjY291bnQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxuIl19