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

var table = function (_Visitor) {
    _inherits(table, _Visitor);

    function table() {
        _classCallCheck(this, table);

        var _this = _possibleConstructorReturn(this, (table.__proto__ || Object.getPrototypeOf(table)).apply(this, arguments));

        _this.tag = "table";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    return table;
}(_visitor2.default);

exports.default = table;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90YWJsZS5qcyJdLCJuYW1lcyI6WyJ0YWJsZSIsImFyZ3VtZW50cyIsInRhZyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7OztBQUNqQixxQkFBYTtBQUFBOztBQUFBLG1IQUNBQyxTQURBOztBQUVULGNBQUtDLEdBQUwsR0FBUyxPQUFUO0FBQ0EsY0FBS0MsU0FBTCxHQUFlLE1BQUtDLGVBQUwsa0NBQWY7QUFIUztBQUlaOzs7OztrQkFMZ0JKLEsiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vdGRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGFibGUgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJ0YWJsZVwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoY2VsbCwgZG9jdW1lbnQpXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==