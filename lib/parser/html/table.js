"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _td = require("./td");

var _td2 = _interopRequireDefault(_td);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var table = function (_Visitor) {
    (0, _inherits3.default)(table, _Visitor);

    function table() {
        (0, _classCallCheck3.default)(this, table);

        var _this = (0, _possibleConstructorReturn3.default)(this, (table.__proto__ || (0, _getPrototypeOf2.default)(table)).apply(this, arguments));

        _this.tag = "table";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    return table;
}(_visitor2.default);

exports.default = table;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90YWJsZS5qcyJdLCJuYW1lcyI6WyJ0YWJsZSIsImFyZ3VtZW50cyIsInRhZyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxLOzs7QUFDakIscUJBQWE7QUFBQTs7QUFBQSx5SUFDQUMsU0FEQTs7QUFFVCxjQUFLQyxHQUFMLEdBQVMsT0FBVDtBQUNBLGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGtDQUFmO0FBSFM7QUFJWjs7Ozs7a0JBTGdCSixLIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL3RkXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYmxlIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwidGFibGVcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KGNlbGwsIGRvY3VtZW50KVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=