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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCOzs7QUFDakIsb0JBQWE7Ozt1SUFDQSxZQURBOztBQUVULGNBQUssR0FBTCxHQUFTLElBQVQsQ0FGUztBQUdULGNBQUssU0FBTCxHQUFlLE1BQUssZUFBTCxjQUFmLENBSFM7O0tBQWI7Ozs7O2tCQURpQiIsImZpbGUiOiJ0ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgcm93IGZyb20gXCIuL3RyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNlbGwgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJ0ZFwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQocm93KVxyXG4gICAgfVxyXG59Il19