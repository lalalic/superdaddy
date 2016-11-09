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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(image).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbWFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUdxQjs7O0FBQ2pCLGFBRGlCLEtBQ2pCLEdBQWE7NENBREksT0FDSjs7aUdBREksbUJBRUosWUFEQTs7QUFFVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsYUFBZixDQUZTO0FBR1QsY0FBSyxJQUFMLEdBQVUsTUFBSyxRQUFMLENBQWMsUUFBZCxFQUFWLENBSFM7QUFJVCxZQUFHLE9BQU8sTUFBSyxJQUFMLElBQVksUUFBbkIsRUFBNEI7QUFDM0Isa0JBQUssZUFBTCxxQkFBK0IsTUFBL0IsQ0FBc0MsSUFBdEMsUUFEMkI7U0FBL0I7cUJBSlM7S0FBYjs7K0JBRGlCOzs0QkFVUDtBQUNOLGdCQUFJLE1BQUksS0FBSyxHQUFMLGNBQW1CLEtBQUssR0FBTCxPQUFuQixHQUFpQyxFQUFqQyxDQURGO0FBRU4sMENBQWMsS0FBSyxJQUFMLENBQWQ7QUFDQSxxQkFBSyxRQUFMO0FBQ0ksMkNBQW9CLEtBQUssSUFBTCxXQUFjLFNBQWxDLENBREo7QUFEQTtBQUlJLDBEQUFrQyxrQkFBWSxJQUFJLGVBQUosQ0FBb0IsSUFBSSxJQUFKLENBQVMsQ0FBQyxLQUFLLElBQUwsQ0FBVixFQUFxQixFQUFDLE1BQUssU0FBTCxFQUF0QixDQUFwQixTQUE5QyxDQURKO0FBSEEsYUFGTTs7Ozs0QkFVRDtBQUNMLG1CQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FERjs7O1dBcEJRIiwiZmlsZSI6ImltYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vcFwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW1hZ2UgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQocGFyYWdyYXBoKVxyXG4gICAgICAgIHRoaXMuZGF0YT10aGlzLnNyY01vZGVsLmdldEltYWdlKClcclxuICAgICAgICBpZih0eXBlb2YodGhpcy5kYXRhKSE9J3N0cmluZycpe1xyXG4gICAgICAgICAgICB0aGlzLmZpbmRUeXBlZFBhcmVudChkb2N1bWVudCkuaW1hZ2VzLnB1c2godGhpcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBsZXQgYWx0PXRoaXMuYWx0ID8gYGFsdD1cIiR7dGhpcy5hbHR9XCJgIDogXCJcIlxyXG4gICAgICAgIHN3aXRjaCh0eXBlb2YodGhpcy5kYXRhKSl7XHJcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgcmV0dXJuIGA8aW1nIHNyYz1cIiR7dGhpcy5kYXRhfVwiICR7YWx0fT5gXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGA8aW1nIGNsYXNzPVwiX19yZXZva2luZ1wiICR7YWx0fSBzcmM9XCIke1VSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3RoaXMuZGF0YV0se3R5cGU6XCJpbWFnZS8qXCJ9KSl9XCI+YCAvKiovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBhbHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb250YWluZXIudGV4dFxyXG4gICAgfVxyXG59XHJcbiJdfQ==