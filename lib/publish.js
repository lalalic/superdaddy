"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _cameraRoll = require("material-ui/lib/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Empty = _qiliApp.UI.Empty;

var Publisher = function (_Component) {
    _inherits(Publisher, _Component);

    function Publisher() {
        _classCallCheck(this, Publisher);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Publisher).apply(this, arguments));
    }

    _createClass(Publisher, [{
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(next) {
            if (next.child != this.props.child) this.forceUpdate();
        }
    }, {
        key: "render",
        value: function render() {
            return _qiliApp.React.createElement(
                "div",
                null,
                _qiliApp.React.createElement(Empty, { icon: _qiliApp.React.createElement(_cameraRoll2.default, null), text: "Select Finished Tasks to Publish As Book" }),
                _qiliApp.React.createElement(_qiliApp.UI.CommandBar, { className: "footbar", primary: "Cloud Print",
                    items: ["Back", "Cloud Print", "Preview"] })
            );
        }
    }]);

    return Publisher;
}(_qiliApp.Component);

exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNLOztJQUVnQjs7Ozs7Ozs7Ozs7a0RBQ1MsTUFBSztBQUMzQixnQkFBSSxLQUFLLEtBQUwsSUFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQ1osS0FBSyxXQUFMLEdBREo7Ozs7aUNBR0k7QUFDSixtQkFDSTs7O2dCQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFNLHdEQUFOLEVBQWUsTUFBSywwQ0FBTCxFQUF0QixDQURKO2dCQUVJLHlDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVYsRUFBb0IsU0FBUSxhQUFSO0FBQy9CLDJCQUFPLENBQUMsTUFBRCxFQUFRLGFBQVIsRUFBdUIsU0FBdkIsQ0FBUCxFQURKLENBRko7YUFESixDQURJOzs7O1dBTFMiLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBSZWFjdCwgVUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCBJY29uIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxudmFyIHtFbXB0eX09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1Ymxpc2hlciBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dCl7XHJcbiAgICAgICAgaWYgKG5leHQuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGQpXHJcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPEVtcHR5IGljb249ezxJY29uLz59IHRleHQ9XCJTZWxlY3QgRmluaXNoZWQgVGFza3MgdG8gUHVibGlzaCBBcyBCb29rXCIvPlxyXG4gICAgICAgICAgICAgICAgPFVJLkNvbW1hbmRCYXIgY2xhc3NOYW1lPVwiZm9vdGJhclwiIHByaW1hcnk9XCJDbG91ZCBQcmludFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcIkJhY2tcIixcIkNsb3VkIFByaW50XCIsIFwiUHJldmlld1wiXX0vPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuIl19