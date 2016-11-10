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

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var row = function (_Visitor) {
    (0, _inherits3.default)(row, _Visitor);

    function row() {
        (0, _classCallCheck3.default)(this, row);

        var _this = (0, _possibleConstructorReturn3.default)(this, (row.__proto__ || (0, _getPrototypeOf2.default)(row)).apply(this, arguments));

        _this.tag = "tr";
        _this.container = _this.findTypedParent(_table2.default);
        return _this;
    }

    return row;
}(_visitor2.default);

exports.default = row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ci5qcyJdLCJuYW1lcyI6WyJyb3ciLCJhcmd1bWVudHMiLCJ0YWciLCJjb250YWluZXIiLCJmaW5kVHlwZWRQYXJlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEc7OztBQUNqQixtQkFBYTtBQUFBOztBQUFBLHFJQUNBQyxTQURBOztBQUVULGNBQUtDLEdBQUwsR0FBUyxJQUFUO0FBQ0EsY0FBS0MsU0FBTCxHQUFlLE1BQUtDLGVBQUwsaUJBQWY7QUFIUztBQUlaOzs7OztrQkFMZ0JKLEciLCJmaWxlIjoidHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHRhYmxlIGZyb20gXCIuL3RhYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJvdyBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInRyXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudCh0YWJsZSlcclxuICAgIH1cclxufVxyXG5cclxuIl19