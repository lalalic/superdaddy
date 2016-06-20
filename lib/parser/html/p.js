"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _td = require("./td");

var _td2 = _interopRequireDefault(_td);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paragraph = function (_Visitor) {
    _inherits(paragraph, _Visitor);

    function paragraph() {
        _classCallCheck(this, paragraph);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(paragraph).apply(this, arguments));

        _this.tag = "p";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsU0FDakIsR0FBYTs4QkFESSxXQUNKOzsyRUFESSx1QkFFSixZQURBOztBQUVULGNBQUssR0FBTCxHQUFTLEdBQVQsQ0FGUztBQUdULGNBQUssU0FBTCxHQUFlLE1BQUssZUFBTCxrQ0FBZixDQUhTOztLQUFiOztXQURpQiIsImZpbGUiOiJwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL3RkXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBhcmFncmFwaCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInBcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KGNlbGwsIGRvY3VtZW50KVxyXG4gICAgfVxyXG59XHJcbiJdfQ==