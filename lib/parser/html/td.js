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

var _tr = require("./tr");

var _tr2 = _interopRequireDefault(_tr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cell = function (_Visitor) {
    (0, _inherits3.default)(cell, _Visitor);

    function cell() {
        (0, _classCallCheck3.default)(this, cell);

        var _this = (0, _possibleConstructorReturn3.default)(this, (cell.__proto__ || (0, _getPrototypeOf2.default)(cell)).apply(this, arguments));

        _this.tag = "td";
        _this.container = _this.findTypedParent(_tr2.default);
        return _this;
    }

    return cell;
}(_visitor2.default);

exports.default = cell;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZC5qcyJdLCJuYW1lcyI6WyJjZWxsIiwiYXJndW1lbnRzIiwidGFnIiwiY29udGFpbmVyIiwiZmluZFR5cGVkUGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxJOzs7QUFDakIsb0JBQWE7QUFBQTs7QUFBQSx1SUFDQUMsU0FEQTs7QUFFVCxjQUFLQyxHQUFMLEdBQVMsSUFBVDtBQUNBLGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGNBQWY7QUFIUztBQUlaOzs7OztrQkFMZ0JKLEkiLCJmaWxlIjoidGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi90clwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjZWxsIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwidGRcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHJvdylcclxuICAgIH1cclxufSJdfQ==