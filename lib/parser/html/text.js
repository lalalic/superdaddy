"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _hyperlink = require("./hyperlink");

var _hyperlink2 = _interopRequireDefault(_hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var text = function (_Visitor) {
    _inherits(text, _Visitor);

    function text() {
        _classCallCheck(this, text);

        var _this = _possibleConstructorReturn(this, (text.__proto__ || Object.getPrototypeOf(text)).apply(this, arguments));

        _this.container = _this.findTypedParent(_hyperlink2.default, _p2.default);
        return _this;
    }

    _createClass(text, [{
        key: "html",
        get: function get() {
            return this.text;
        }
    }, {
        key: "text",
        get: function get() {
            return this.srcModel.getText();
        }
    }]);

    return text;
}(_visitor2.default);

exports.default = text;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZXh0LmpzIl0sIm5hbWVzIjpbInRleHQiLCJhcmd1bWVudHMiLCJjb250YWluZXIiLCJmaW5kVHlwZWRQYXJlbnQiLCJzcmNNb2RlbCIsImdldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7OztBQUNqQixvQkFBYTtBQUFBOztBQUFBLGlIQUNBQyxTQURBOztBQUVULGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGtDQUFmO0FBRlM7QUFHWjs7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUtILElBQVo7QUFDSDs7OzRCQUVTO0FBQ04sbUJBQU8sS0FBS0ksUUFBTCxDQUFjQyxPQUFkLEVBQVA7QUFDSDs7Ozs7O2tCQVpnQkwsSSIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vcFwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHlwZXJsaW5rXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRleHQgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoaHlwZXJsaW5rLCBwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRUZXh0KClcclxuICAgIH1cclxufVxyXG4iXX0=