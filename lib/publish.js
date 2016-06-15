"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

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
                    items: ["Cloud Print", "Preview"] })
            );
        }
    }]);

    return Publisher;
}(_qiliApp.Component);

exports.default = Publisher;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNLOztJQUVnQjs7Ozs7Ozs7Ozs7a0RBQ1MsTUFBSztBQUMzQixnQkFBSSxLQUFLLEtBQUwsSUFBWSxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQ1osS0FBSyxXQUFMLEdBREo7Ozs7aUNBR0k7QUFDSixtQkFDSTs7O2dCQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFNLHdEQUFOLEVBQWUsTUFBSywwQ0FBTCxFQUF0QixDQURKO2dCQUVJLHlDQUFJLFVBQUosSUFBZSxXQUFVLFNBQVYsRUFBb0IsU0FBUSxhQUFSO0FBQy9CLDJCQUFPLENBQUMsYUFBRCxFQUFnQixTQUFoQixDQUFQLEVBREosQ0FGSjthQURKLENBREk7Ozs7V0FMUyIsImZpbGUiOiJwdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIFJlYWN0LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IEljb24gZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcbnZhciB7RW1wdHl9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdWJsaXNoZXIgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHQpe1xyXG4gICAgICAgIGlmIChuZXh0LmNoaWxkIT10aGlzLnByb3BzLmNoaWxkKVxyXG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIHJldHVybihcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxFbXB0eSBpY29uPXs8SWNvbi8+fSB0ZXh0PVwiU2VsZWN0IEZpbmlzaGVkIFRhc2tzIHRvIFB1Ymxpc2ggQXMgQm9va1wiLz5cclxuICAgICAgICAgICAgICAgIDxVSS5Db21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIiBwcmltYXJ5PVwiQ2xvdWQgUHJpbnRcIlxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXCJDbG91ZCBQcmludFwiLCBcIlByZXZpZXdcIl19Lz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==