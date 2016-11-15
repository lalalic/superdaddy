"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = function (_Visitor) {
    (0, _inherits3.default)(image, _Visitor);

    function image() {
        (0, _classCallCheck3.default)(this, image);

        var _this = (0, _possibleConstructorReturn3.default)(this, (image.__proto__ || (0, _getPrototypeOf2.default)(image)).apply(this, arguments));

        _this.container = _this.findTypedParent(_p2.default);
        _this.data = _this.srcModel.getImage();
        if (typeof _this.data != 'string') {
            _this.findTypedParent(_document2.default).images.push(_this);
        }
        return _this;
    }

    (0, _createClass3.default)(image, [{
        key: "html",
        get: function get() {
            var alt = this.alt ? "alt=\"" + this.alt + "\"" : "";
            switch ((0, _typeof3.default)(this.data)) {
                case 'string':
                    return "<img src=\"" + this.data + "\" " + alt + ">";
                default:
                    return "<img class=\"__revoking\" " + alt + " src=\"" + URL.createObjectURL(new Blob([this.data], { type: "image/*" })) + "\">"; /**/
            }
        }
    }, {
        key: "alt",
        get: function get() {
            return this.container.text;
        }
    }]);
    return image;
}(_visitor2.default);

exports.default = image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbWFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUdxQjs7O0FBQ2pCLHFCQUFhOzs7eUlBQ0EsWUFEQTs7QUFFVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsYUFBZixDQUZTO0FBR1QsY0FBSyxJQUFMLEdBQVUsTUFBSyxRQUFMLENBQWMsUUFBZCxFQUFWLENBSFM7QUFJVCxZQUFHLE9BQU8sTUFBSyxJQUFMLElBQVksUUFBbkIsRUFBNEI7QUFDM0Isa0JBQUssZUFBTCxxQkFBK0IsTUFBL0IsQ0FBc0MsSUFBdEMsUUFEMkI7U0FBL0I7cUJBSlM7S0FBYjs7Ozs0QkFTVTtBQUNOLGdCQUFJLE1BQUksS0FBSyxHQUFMLGNBQW1CLEtBQUssR0FBTCxPQUFuQixHQUFpQyxFQUFqQyxDQURGO0FBRU4sMENBQWMsS0FBSyxJQUFMLENBQWQ7QUFDQSxxQkFBSyxRQUFMO0FBQ0ksMkNBQW9CLEtBQUssSUFBTCxXQUFjLFNBQWxDLENBREo7QUFEQTtBQUlJLDBEQUFrQyxrQkFBWSxJQUFJLGVBQUosQ0FBb0IsSUFBSSxJQUFKLENBQVMsQ0FBQyxLQUFLLElBQUwsQ0FBVixFQUFxQixFQUFDLE1BQUssU0FBTCxFQUF0QixDQUFwQixTQUE5QyxDQURKO0FBSEEsYUFGTTs7Ozs0QkFVRDtBQUNMLG1CQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FERjs7Ozs7O2tCQXBCUSIsImZpbGUiOiJpbWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL3BcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGltYWdlIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHBhcmFncmFwaClcclxuICAgICAgICB0aGlzLmRhdGE9dGhpcy5zcmNNb2RlbC5nZXRJbWFnZSgpXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuZGF0YSkhPSdzdHJpbmcnKXtcclxuICAgICAgICAgICAgdGhpcy5maW5kVHlwZWRQYXJlbnQoZG9jdW1lbnQpLmltYWdlcy5wdXNoKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IGFsdD10aGlzLmFsdCA/IGBhbHQ9XCIke3RoaXMuYWx0fVwiYCA6IFwiXCJcclxuICAgICAgICBzd2l0Y2godHlwZW9mKHRoaXMuZGF0YSkpe1xyXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgIHJldHVybiBgPGltZyBzcmM9XCIke3RoaXMuZGF0YX1cIiAke2FsdH0+YFxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cIl9fcmV2b2tpbmdcIiAke2FsdH0gc3JjPVwiJHtVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmRhdGFdLHt0eXBlOlwiaW1hZ2UvKlwifSkpfVwiPmAgLyoqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWx0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnRleHRcclxuICAgIH1cclxufVxyXG4iXX0=