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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(hyperlink).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9oeXBlcmxpbmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixTQUNqQixHQUFhOzRDQURJLFdBQ0o7O2lHQURJLHVCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGFBQWYsQ0FGUzs7S0FBYjs7K0JBRGlCOzs0QkFNUDtBQUNOLGdCQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsSUFBVixHQUFpQixXQUFqQixFQUFMLENBREU7QUFFTixnQkFBRyxTQUFPLElBQVAsSUFBYSxPQUFLLElBQUwsRUFBVTtBQUN0QixtRUFBNEMsS0FBSyxJQUFMLFdBQWMsYUFBMUQsQ0FEc0I7YUFBMUIsTUFFTTtBQUNGLHVCQUFPLElBQVAsQ0FERTthQUZOOzs7OzRCQU9NO0FBQ04sbUJBQU8sS0FBSyxRQUFMLENBQWMsT0FBZCxFQUFQLENBRE07OztXQWZPIiwiZmlsZSI6Imh5cGVybGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL3BcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaHlwZXJsaW5rIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHBhcmFncmFwaClcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIHZhciB0ZXh0PXRoaXMudGV4dC50cmltKCkudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIGlmKCdidXknPT10ZXh0fHwn5LmwJz09dGV4dCl7XHJcbiAgICAgICAgICAgIHJldHVybiBgPGEgY2xhc3M9XCJidXlcIiB0YXJnZXQ9XCJidXlcIiBocmVmPVwiJHt0aGlzLmxpbmt9XCI+JHt0ZXh0fTwvYT5gXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgbGluaygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNyY01vZGVsLmdldExpbmsoKVxyXG4gICAgfVxyXG59Il19