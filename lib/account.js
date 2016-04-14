"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Photo = _qiliApp.UI.Photo;
var CommandBar = _qiliApp.UI.CommandBar;
var RightArrow = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right');

var Account = function (_Component) {
    _inherits(Account, _Component);

    function Account() {
        _classCallCheck(this, Account);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Account).apply(this, arguments));
    }

    _createClass(Account, [{
        key: "render",
        value: function render() {
            var user = _qiliApp.User.current;
            var avatar;
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
                        rightIcon: _qiliApp.React.createElement(RightArrow, null) }),
                    _qiliApp.React.createElement(List.Divider, { inset: true })
                ),
                _qiliApp.React.createElement(CommandBar, { className: "footbar",
                    onSelect: this.onSelect.bind(this),
                    primary: "帐号",
                    items: ["Back", "帐号", "设置"] })
            );
        }
    }, {
        key: "onSelect",
        value: function onSelect(command) {
            switch (command) {
                case "设置":
                    this.context.router.transitionTo('setting');
                    break;
            }
        }
    }]);

    return Account;
}(_qiliApp.Component);

exports.default = Account;


Account.contextTypes = { router: _qiliApp.React.PropTypes.func };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hY2NvdW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7O0lBRUs7SUFBTTtBQUFQLElBQWMsbUNBQWQ7QUFDQSxpQkFBVyxRQUFRLHlEQUFSLENBQVg7O0lBRWlCOzs7Ozs7Ozs7OztpQ0FDVDtBQUNKLGdCQUFJLE9BQUssY0FBSyxPQUFMLENBREw7QUFFSixnQkFBSSxNQUFKLENBRkk7QUFHSixnQkFBRyxLQUFLLEtBQUwsRUFDQyxTQUFPLG1EQUFRLEtBQUssS0FBSyxLQUFMLEVBQWIsQ0FBUCxDQURKLEtBRUs7QUFDRCx5QkFBTyw2QkFBQyxLQUFEO0FBQ0gsNkJBQVMsaUJBQUMsR0FBRCxFQUFPO0FBQUMsNkJBQUssS0FBTCxHQUFXLEdBQVgsQ0FBRCxhQUFnQixDQUFLLE1BQUwsQ0FBWSxJQUFaLEVBQWhCO3FCQUFQO0FBQ1QsK0JBQVcsSUFBRSxDQUFGLEVBQUssT0FBTyxFQUFQLEVBQVcsUUFBUSxFQUFSLEVBRnhCLENBQVAsQ0FEQzthQUZMO0FBT0EsbUJBQ0k7OztnQkFDSTtBQUFDLHdCQUFEOztvQkFDSSw2QkFBQyxLQUFLLElBQU4sSUFBVyxhQUFhLEtBQUssSUFBTCxJQUFXLEtBQUssUUFBTDtBQUMvQixvQ0FBWSxNQUFaO0FBQ0EsbUNBQVcsNkJBQUMsVUFBRCxPQUFYLEVBRkosQ0FESjtvQkFLSSw2QkFBQyxLQUFLLE9BQU4sSUFBYyxPQUFPLElBQVAsRUFBZCxDQUxKO2lCQURKO2dCQVNJLDZCQUFDLFVBQUQsSUFBWSxXQUFVLFNBQVY7QUFDUiw4QkFBVSxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLElBQW5CLENBQVY7QUFDQSw2QkFBUSxJQUFSO0FBQ0EsMkJBQU8sQ0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLElBQWYsQ0FBUCxFQUhKLENBVEo7YUFESixDQVZJOzs7O2lDQTRCQyxTQUFRO0FBQ2Isb0JBQU8sT0FBUDtBQUNBLHFCQUFLLElBQUw7QUFDSSx5QkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixZQUFwQixDQUFpQyxTQUFqQyxFQURKO0FBRUksMEJBRko7QUFEQSxhQURhOzs7O1dBN0JBOzs7Ozs7QUF1Q3JCLFFBQVEsWUFBUixHQUFxQixFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLElBQWhCLEVBQTdCIiwiZmlsZSI6ImFjY291bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJLCBVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0F2YXRhcn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbnZhciB7TGlzdCwgUGhvdG8sIENvbW1hbmRCYXJ9PVVJLFxyXG4gICAgUmlnaHRBcnJvdz1yZXF1aXJlKCdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2hhcmR3YXJlL2tleWJvYXJkLWFycm93LXJpZ2h0JylcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY291bnQgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICB2YXIgdXNlcj1Vc2VyLmN1cnJlbnRcclxuICAgICAgICB2YXIgYXZhdGFyO1xyXG4gICAgICAgIGlmKHVzZXIucGhvdG8pXHJcbiAgICAgICAgICAgIGF2YXRhcj08QXZhdGFyIHNyYz17dXNlci5waG90b30vPlxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhdmF0YXI9PFBob3RvXHJcbiAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+e3VzZXIucGhvdG89dXJsO1VzZXIudXBzZXJ0KHVzZXIpfX1cclxuICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxMaXN0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0gcHJpbWFyeVRleHQ9e3VzZXIubmFtZXx8dXNlci51c2VybmFtZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodEljb249ezxSaWdodEFycm93Lz59IC8+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz5cclxuXHJcbiAgICAgICAgICAgICAgICA8L0xpc3Q+XHJcbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcclxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxyXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCLluJDlj7dcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJCYWNrXCIsIFwi5biQ5Y+3XCIsIFwi6K6+572uXCJdfS8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdChjb21tYW5kKXtcclxuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XHJcbiAgICAgICAgY2FzZSBcIuiuvue9rlwiOlxyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygnc2V0dGluZycpXHJcbiAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuQWNjb3VudC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cclxuIl19