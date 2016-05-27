"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _tr = require("./tr");

var _tr2 = _interopRequireDefault(_tr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cell = function (_Visitor) {
    _inherits(cell, _Visitor);

    function cell() {
        _classCallCheck(this, cell);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(cell).apply(this, arguments));

        _this.tag = "td";
        _this.container = _this.findTypedParent(_tr2.default);
        return _this;
    }

    return cell;
}(_visitor2.default);

exports.default = cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixJQUNqQixHQUFhOzhCQURJLE1BQ0o7OzJFQURJLGtCQUVKLFlBREE7O0FBRVQsY0FBSyxHQUFMLEdBQVMsSUFBVCxDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGNBQWYsQ0FIUzs7S0FBYjs7V0FEaUIiLCJmaWxlIjoidGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHJvdyBmcm9tIFwiLi90clwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjZWxsIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwidGRcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHJvdylcclxuICAgIH1cclxufSJdfQ==