"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hyperlink = function (_Visitor) {
    _inherits(hyperlink, _Visitor);

    function hyperlink() {
        _classCallCheck(this, hyperlink);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(hyperlink).apply(this, arguments));

        _this.container = _this.findTypedParent(_p2.default);
        return _this;
    }

    _createClass(hyperlink, [{
        key: "html",
        get: function get() {
            var text = this.text.trim().toLowerCase();
            if ('buy' == text || '买' == text) {
                return "<a class=\"buy\" target=\"buy\" href=\"" + this.link + "\">" + text + "</a>";
            } else {
                return text;
            }
        }
    }, {
        key: "link",
        get: function get() {
            return this.srcModel.getLink();
        }
    }]);

    return hyperlink;
}(_visitor2.default);

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9oeXBlcmxpbmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixTQUNqQixHQUFhOzhCQURJLFdBQ0o7OzJFQURJLHVCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGFBQWYsQ0FGUzs7S0FBYjs7aUJBRGlCOzs0QkFNUDtBQUNOLGdCQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsSUFBVixHQUFpQixXQUFqQixFQUFMLENBREU7QUFFTixnQkFBRyxTQUFPLElBQVAsSUFBYSxPQUFLLElBQUwsRUFBVTtBQUN0QixtRUFBNEMsS0FBSyxJQUFMLFdBQWMsYUFBMUQsQ0FEc0I7YUFBMUIsTUFFTTtBQUNGLHVCQUFPLElBQVAsQ0FERTthQUZOOzs7OzRCQU9NO0FBQ04sbUJBQU8sS0FBSyxRQUFMLENBQWMsT0FBZCxFQUFQLENBRE07Ozs7V0FmTyIsImZpbGUiOiJoeXBlcmxpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGh5cGVybGluayBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICB2YXIgdGV4dD10aGlzLnRleHQudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICBpZignYnV5Jz09dGV4dHx8J+S5sCc9PXRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwiYnV5XCIgdGFyZ2V0PVwiYnV5XCIgaHJlZj1cIiR7dGhpcy5saW5rfVwiPiR7dGV4dH08L2E+YFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxpbmsoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRMaW5rKClcclxuICAgIH1cclxufSJdfQ==