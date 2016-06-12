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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFJQTs7Ozs7Ozs7OztJQUZLO0lBQU07SUFBTzs7SUFJRzs7Ozs7Ozs7Ozs7aUNBQ1Q7OztBQUNKLGdCQUFJLE9BQUssY0FBSyxPQUFMLENBREw7QUFFSixnQkFBSSxNQUFKLENBRkk7QUFHSixnQkFBRyxLQUFLLEtBQUwsRUFDQyxTQUFPLG1EQUFRLEtBQUssS0FBSyxLQUFMLEVBQWIsQ0FBUCxDQURKLEtBRUs7QUFDRCx5QkFBTyw2QkFBQyxLQUFEO0FBQ0gsNkJBQVMsaUJBQUMsR0FBRCxFQUFPO0FBQUMsNkJBQUssS0FBTCxHQUFXLEdBQVgsQ0FBRCxhQUFnQixDQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWhCO3FCQUFQO0FBQ1QsK0JBQVcsSUFBRSxDQUFGLEVBQUssT0FBTyxFQUFQLEVBQVcsUUFBUSxFQUFSLEVBRnhCLENBQVAsQ0FEQzthQUZMOztBQVFBLGdCQUFJLFNBQU8sS0FBSyxPQUFMLENBQWEsTUFBYjtnQkFDUCxXQUFTLFdBQVMsUUFBVDtnQkFDVCxNQUFJLFNBQVMsTUFBVDtnQkFDSixhQUFXLFNBQVMsR0FBVCxDQUFhLFVBQVMsQ0FBVCxFQUFXOzs7QUFDL0Isb0JBQUksTUFBSixDQUQrQjtBQUUvQixvQkFBRyxFQUFFLEtBQUYsRUFDQyxTQUFRLG1EQUFRLEtBQUssRUFBRSxLQUFGLEVBQWIsQ0FBUixDQURKLEtBRUk7QUFDQSx3QkFBSSxRQUFPLDZCQUFDLEtBQUQ7QUFDUCxpQ0FBUyxpQkFBQyxHQUFEO21DQUFPLE9BQUssYUFBTCxDQUFtQixDQUFuQixFQUFxQixHQUFyQjt5QkFBUDtBQUNULG1DQUFXLElBQUUsQ0FBRixFQUFLLE9BQU8sRUFBUCxFQUFXLFFBQVEsRUFBUixFQUZwQixDQUFQLENBREo7O0FBS0EsNkJBQU8sS0FBUCxDQUxBO2lCQUZKOztBQVVBLHVCQUNJO0FBQUMseUJBQUssSUFBTjtzQkFBVyxLQUFLLEVBQUUsR0FBRjtBQUNaLGlDQUFTO21DQUFJLE9BQU8sWUFBUCxDQUFvQixNQUFwQixFQUEyQixXQUFTLFlBQVQsR0FBc0IsQ0FBdEI7eUJBQS9CO0FBQ1Qsb0NBQVksTUFBWixFQUZKO29CQUdLLEVBQUUsSUFBRjtpQkFKVCxDQVorQjthQUFYLENBQXhCLENBZEE7O0FBbUNKLG1CQUNJOzs7Z0JBQ0k7QUFBQyx3QkFBRDs7b0JBQ0ksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBYSxLQUFLLElBQUwsSUFBVyxLQUFLLFFBQUw7QUFDL0Isb0NBQVksTUFBWjtBQUNBLG1DQUFXLGdFQUFYLEVBRkosQ0FESjtvQkFLSSw2QkFBQyxLQUFLLE9BQU4sSUFBYyxPQUFPLElBQVAsRUFBZCxDQUxKO29CQU9JO0FBQUMsNkJBQUssSUFBTjswQkFBVyxhQUFZLE1BQVo7QUFDUCxzQ0FBVSwwQ0FBVjtBQUNBLGtDQUFNLElBQU47QUFDQSxxQ0FBUzt1Q0FBRyxPQUFPLFlBQVAsQ0FBb0IsTUFBcEI7NkJBQUg7QUFDVCx5Q0FBYTs7Ozs2QkFBYixFQUpKO3dCQUtLLFVBTEw7cUJBUEo7b0JBZUksNkJBQUMsS0FBSyxPQUFOLElBQWMsT0FBTyxJQUFQLEVBQWQsQ0FmSjtvQkFpQkksNkJBQUMsS0FBSyxJQUFOLElBQVcsYUFBWSxNQUFaO0FBQ1Asa0NBQVUsc0RBQVY7QUFDQSxpQ0FBUzttQ0FBRyxPQUFPLFlBQVAsQ0FBb0IsUUFBcEI7eUJBQUg7cUJBRmIsQ0FqQko7b0JBc0JJLDZCQUFDLEtBQUssSUFBTixJQUFXLGFBQVksSUFBWjtBQUNQLGtDQUFVLHdEQUFWO0FBQ0EsaUNBQVM7bUNBQUcsT0FBTyxZQUFQLENBQW9CLFNBQXBCO3lCQUFIO3FCQUZiLENBdEJKO29CQTJCSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFZLElBQVo7QUFDUCxrQ0FBVSxzREFBVjtBQUNBLGlDQUFTO21DQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsU0FBakM7eUJBQUg7cUJBRmIsQ0EzQko7aUJBREo7Z0JBaUNSLDZCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDSSwyQkFBTyxDQUFDLE1BQUQsQ0FBUDtpQkFEaEIsQ0FqQ1E7YUFESixDQW5DSTs7OztzQ0E0RU0sT0FBTyxLQUFJO0FBQ3JCLHVCQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0IsRUFBQyxPQUFNLEdBQU4sRUFBdkIsRUFEcUI7Ozs7V0E3RVI7Ozs7OztBQWtGckIsUUFBUSxZQUFSLEdBQXFCLEVBQUMsUUFBTyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsRUFBN0IiLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudCwgVUksIFVzZXJ9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7QXZhdGFyfSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgUmlnaHRBcnJvdyBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvaGFyZHdhcmUva2V5Ym9hcmQtYXJyb3ctcmlnaHQnXHJcbmltcG9ydCBTZXR0aW5nSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL3NldHRpbmdzJ1xyXG5pbXBvcnQgSW52aXRlSWNvbiBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL2dyb3VwLWFkZCdcclxuaW1wb3J0IFB1Ymxpc2hJY29uIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5cclxudmFyIHtMaXN0LCBQaG90bywgQ29tbWFuZEJhcn09VUlcclxuXHJcbmltcG9ydCB7RmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tIFwiLi9kYlwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NvdW50IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgdmFyIHVzZXI9VXNlci5jdXJyZW50XHJcbiAgICAgICAgdmFyIGF2YXRhcjtcclxuICAgICAgICBpZih1c2VyLnBob3RvKVxyXG4gICAgICAgICAgICBhdmF0YXI9PEF2YXRhciBzcmM9e3VzZXIucGhvdG99Lz5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYXZhdGFyPTxQaG90b1xyXG4gICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9Pnt1c2VyLnBob3RvPXVybDtVc2VyLnVwc2VydCh1c2VyKX19XHJcbiAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcm91dGVyPXRoaXMuY29udGV4dC5yb3V0ZXIsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuPWRiRmFtaWx5LmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoLFxyXG4gICAgICAgICAgICB1aUNoaWxkcmVuPWNoaWxkcmVuLm1hcChmdW5jdGlvbihhKXtcclxuICAgICAgICAgICAgICAgIHZhciBhdmF0YXI7XHJcbiAgICAgICAgICAgICAgICBpZihhLnBob3RvKVxyXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBzcmM9e2EucGhvdG99Lz4pXHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90bz0oPFBob3RvXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLnNob3J0Y3V0UGhvdG8oYSx1cmwpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI9cGhvdG9cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXthLl9pZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIsZGJGYW1pbHkuY3VycmVudENoaWxkPWEpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7YS5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPExpc3Q+XHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD17dXNlci5uYW1lfHx1c2VyLnVzZXJuYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0SWNvbj17PFJpZ2h0QXJyb3cvPn0gLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5oiR55qE5a6d6LSdXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxzcGFuLz59XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW49e3RydWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2E9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17PEF2YXRhcj4rPC9BdmF0YXI+fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3VpQ2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIumCgOivt+WutuS6ulwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8SW52aXRlSWNvbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwiaW52aXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PVwi5Ye65LmmXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEljb249ezxQdWJsaXNoSWNvbi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwicHVibGlzaFwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuiuvue9rlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8U2V0dGluZ0ljb24vPn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ3NldHRpbmcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuXHRcdFx0XHQ8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1wiQmFja1wiXX1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgc2hvcnRjdXRQaG90byhjaGlsZCwgdXJsKXtcclxuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbkFjY291bnQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cclxuIl19