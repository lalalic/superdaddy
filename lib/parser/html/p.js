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

        var _this = _possibleConstructorReturn(this, (paragraph.__proto__ || Object.getPrototypeOf(paragraph)).apply(this, arguments));

        _this.tag = "p";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbInBhcmFncmFwaCIsImFyZ3VtZW50cyIsInRhZyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFM7OztBQUNqQix5QkFBYTtBQUFBOztBQUFBLDJIQUNBQyxTQURBOztBQUVULGNBQUtDLEdBQUwsR0FBUyxHQUFUO0FBQ0EsY0FBS0MsU0FBTCxHQUFlLE1BQUtDLGVBQUwsa0NBQWY7QUFIUztBQUlaOzs7OztrQkFMZ0JKLFMiLCJmaWxlIjoicC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi90ZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwYXJhZ3JhcGggZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJwXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChjZWxsLCBkb2N1bWVudClcclxuICAgIH1cclxufVxyXG4iXX0=