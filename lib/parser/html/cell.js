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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9jZWxsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixHQUNqQixHQUFhOzhCQURJLEtBQ0o7OzJFQURJLGlCQUVKLFlBREE7O0FBRVQsY0FBSyxHQUFMLEdBQVMsSUFBVCxDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLENBQXFCLEtBQXJCLENBQWYsQ0FIUzs7S0FBYjs7V0FEaUIiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgcm93IGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwidHJcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHRhYmxlKVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=