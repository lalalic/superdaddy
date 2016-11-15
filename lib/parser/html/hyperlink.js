"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hyperlink = function (_Visitor) {
    (0, _inherits3.default)(hyperlink, _Visitor);

    function hyperlink() {
        (0, _classCallCheck3.default)(this, hyperlink);

        var _this = (0, _possibleConstructorReturn3.default)(this, (hyperlink.__proto__ || (0, _getPrototypeOf2.default)(hyperlink)).apply(this, arguments));

        _this.container = _this.findTypedParent(_p2.default);
        return _this;
    }

    (0, _createClass3.default)(hyperlink, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9oeXBlcmxpbmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUI7OztBQUNqQix5QkFBYTs7O2lKQUNBLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGFBQWYsQ0FGUzs7S0FBYjs7Ozs0QkFLVTtBQUNOLGdCQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsSUFBVixHQUFpQixXQUFqQixFQUFMLENBREU7QUFFTixnQkFBRyxTQUFPLElBQVAsSUFBYSxPQUFLLElBQUwsRUFBVTtBQUN0QixtRUFBNEMsS0FBSyxJQUFMLFdBQWMsYUFBMUQsQ0FEc0I7YUFBMUIsTUFFTTtBQUNGLHVCQUFPLElBQVAsQ0FERTthQUZOOzs7OzRCQU9NO0FBQ04sbUJBQU8sS0FBSyxRQUFMLENBQWMsT0FBZCxFQUFQLENBRE07Ozs7OztrQkFmTyIsImZpbGUiOiJoeXBlcmxpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGh5cGVybGluayBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICB2YXIgdGV4dD10aGlzLnRleHQudHJpbSgpLnRvTG93ZXJDYXNlKClcclxuICAgICAgICBpZignYnV5Jz09dGV4dHx8J+S5sCc9PXRleHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gYDxhIGNsYXNzPVwiYnV5XCIgdGFyZ2V0PVwiYnV5XCIgaHJlZj1cIiR7dGhpcy5saW5rfVwiPiR7dGV4dH08L2E+YFxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRleHRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGxpbmsoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRMaW5rKClcclxuICAgIH1cclxufSJdfQ==