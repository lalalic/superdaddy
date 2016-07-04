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
                    _qiliApp.React.createElement(List.Item, { primaryText: "设置",
                        leftIcon: _qiliApp.React.createElement(_settings2.default, null),
                        rightIcon: _qiliApp.React.createElement(_keyboardArrowRight2.default, null),
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
}(_qiliApp.Component);

Account.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Account;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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Ozs7UUF3RVYsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQXhFWCIsImZpbGUiOiJhY2NvdW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSSwgVXNlcn0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtBdmF0YXJ9IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBSaWdodEFycm93IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9oYXJkd2FyZS9rZXlib2FyZC1hcnJvdy1yaWdodCdcclxuaW1wb3J0IFNldHRpbmdJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vc2V0dGluZ3MnXHJcbmltcG9ydCBJbnZpdGVJY29uIGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvZ3JvdXAtYWRkJ1xyXG5pbXBvcnQgUHVibGlzaEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbmltcG9ydCBCYWJ5SWNvbiBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcclxuXHJcbnZhciB7TGlzdCwgUGhvdG8sIENvbW1hbmRCYXJ9PVVJXHJcblxyXG5pbXBvcnQge0ZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSBcIi4vZGJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHZhciB1c2VyPVVzZXIuY3VycmVudFxyXG5cdFx0XHQscm91dGVyPXRoaXMuY29udGV4dC5yb3V0ZXJcclxuXHRcdFx0LGF2YXRhclxyXG4gICAgICAgIGlmKHVzZXIucGhvdG8pXHJcbiAgICAgICAgICAgIGF2YXRhcj08QXZhdGFyIHNyYz17dXNlci5waG90b30vPlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhdmF0YXI9PFBob3RvXHJcbiAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+e3VzZXIucGhvdG89dXJsO1VzZXIudXBzZXJ0KHVzZXIpfX1cclxuICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8TGlzdD5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIHByaW1hcnlUZXh0PXt1c2VyLm5hbWV8fHVzZXIudXNlcm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fSAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLmiJHnmoTlrp3otJ1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PEJhYnlJY29uIGNsYXNzTmFtZT1cInBsdXNcIi8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsbHlPcGVuPXt0cnVlfVxyXG5cdFx0XHRcdFx0XHRhdXRvR2VuZXJhdGVOZXN0ZWRJbmRpY2F0b3I9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIucHVzaChcImJhYnlcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lc3RlZEl0ZW1zPXtcclxuXHRcdFx0XHRcdFx0XHRkYkZhbWlseS5jaGlsZHJlbi5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0dmFyIGF2YXRhcjtcclxuXHRcdFx0XHRcdFx0XHRcdGlmKGEucGhvdG8pXHJcblx0XHRcdFx0XHRcdFx0XHRcdGF2YXRhcj0oPEF2YXRhciBzcmM9e2EucGhvdG99Lz4pXHJcblx0XHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRcdGF2YXRhcj0oPFBob3RvXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0b25QaG90bz17KHVybCk9PnRoaXMuc2hvcnRjdXRQaG90byhhLHVybCl9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPilcclxuXHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0XHRcdFx0XHQ8TGlzdC5JdGVtIGtleT17YS5faWR9XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cHJpbWFyeVRleHQ9e2EubmFtZX1cclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlPT57XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYkZhbWlseS5jdXJyZW50Q2hpbGQ9YVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cm91dGVyLnB1c2goYGJhYnkvJHthLm5hbWV9YClcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9fVxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGxlZnRBdmF0YXI9e2F2YXRhcn0vPlxyXG5cdFx0XHRcdFx0XHRcdFx0KVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdH1cclxuICAgICAgICAgICAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9XCLpgoDor7flrrbkurpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0SWNvbj17PEludml0ZUljb24vPn1cclxuXHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXthPT5yb3V0ZXIucHVzaChcImludml0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBwcmltYXJ5VGV4dD1cIuiuvue9rlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRJY29uPXs8U2V0dGluZ0ljb24vPn1cclxuXHRcdFx0XHRcdFx0cmlnaHRJY29uPXs8UmlnaHRBcnJvdy8+fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ3NldHRpbmcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDwvTGlzdD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3J0Y3V0UGhvdG8oY2hpbGQsIHVybCl7XHJcbiAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkLHtwaG90bzp1cmx9KVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==