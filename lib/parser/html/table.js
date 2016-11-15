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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90YWJsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUI7OztBQUNqQixxQkFBYTs7O3lJQUNBLFlBREE7O0FBRVQsY0FBSyxHQUFMLEdBQVMsT0FBVCxDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGtDQUFmLENBSFM7O0tBQWI7Ozs7O2tCQURpQiIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi90ZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0YWJsZSBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInRhYmxlXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChjZWxsLCBkb2N1bWVudClcclxuICAgIH1cclxufVxyXG5cclxuIl19