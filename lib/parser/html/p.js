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

var paragraph = function (_Visitor) {
    (0, _inherits3.default)(paragraph, _Visitor);

    function paragraph() {
        (0, _classCallCheck3.default)(this, paragraph);

        var _this = (0, _possibleConstructorReturn3.default)(this, (paragraph.__proto__ || (0, _getPrototypeOf2.default)(paragraph)).apply(this, arguments));

        _this.tag = "p";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbInBhcmFncmFwaCIsImFyZ3VtZW50cyIsInRhZyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxTOzs7QUFDakIseUJBQWE7QUFBQTs7QUFBQSxpSkFDQUMsU0FEQTs7QUFFVCxjQUFLQyxHQUFMLEdBQVMsR0FBVDtBQUNBLGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGtDQUFmO0FBSFM7QUFJWjs7Ozs7a0JBTGdCSixTIiwiZmlsZSI6InAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vdGRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFyYWdyYXBoIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwicFwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoY2VsbCwgZG9jdW1lbnQpXHJcbiAgICB9XHJcbn1cclxuIl19