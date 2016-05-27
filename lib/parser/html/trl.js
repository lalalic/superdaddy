"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var row = function (_Visitor) {
    _inherits(row, _Visitor);

    function row() {
        _classCallCheck(this, row);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(row).apply(this, arguments));

        _this.tag = "tr";
        _this.container = _this.findTypedParent(table);
        return _this;
    }

    return row;
}(_visitor2.default);

exports.default = row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90cmwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLGFBRGlCLEdBQ2pCLEdBQWE7OEJBREksS0FDSjs7MkVBREksaUJBRUosWUFEQTs7QUFFVCxjQUFLLEdBQUwsR0FBUyxJQUFULENBRlM7QUFHVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsQ0FBcUIsS0FBckIsQ0FBZixDQUhTOztLQUFiOztXQURpQiIsImZpbGUiOiJ0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJvdyBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInRyXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudCh0YWJsZSlcclxuICAgIH1cclxufVxyXG5cclxuIl19