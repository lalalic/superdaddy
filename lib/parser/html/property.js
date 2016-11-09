"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Property = function (_Visitor) {
    (0, _inherits3.default)(Property, _Visitor);

    function Property() {
        (0, _classCallCheck3.default)(this, Property);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Property).apply(this, arguments));
    }

    (0, _createClass3.default)(Property, [{
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return this.constructor.Properties.indexOf(this.srcModel.key) != -1;
        }
    }]);
    return Property;
}(_visitor2.default);

Property.Properties = "title,keywords,category".split(',');
exports.default = Property;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7d0NBQ0Y7QUFDWCxtQkFBTyxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsT0FBNUIsQ0FBb0MsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFwQyxJQUF3RCxDQUFDLENBQUQsQ0FEcEQ7OztXQURFOzs7U0FLYixhQUFXLDBCQUEwQixLQUExQixDQUFnQyxHQUFoQztrQkFMRSIsImZpbGUiOiJwcm9wZXJ0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvcGVydHkgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMuaW5kZXhPZih0aGlzLnNyY01vZGVsLmtleSkhPS0xXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIFByb3BlcnRpZXM9XCJ0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeVwiLnNwbGl0KCcsJylcclxufSJdfQ==