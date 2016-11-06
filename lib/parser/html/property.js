"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = function (_Visitor) {
    _inherits(Property, _Visitor);

    function Property() {
        _classCallCheck(this, Property);

        return _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).apply(this, arguments));
    }

    _createClass(Property, [{
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return this.constructor.Properties.indexOf(this.srcModel.key) != -1;
        }
    }]);

    return Property;
}(_visitor2.default);

Property.Properties = "title,keywords,category".split(',');
exports.default = Property;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6WyJQcm9wZXJ0eSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImluZGV4T2YiLCJzcmNNb2RlbCIsImtleSIsInNwbGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7O3dDQUNGO0FBQ1gsbUJBQU8sS0FBS0MsV0FBTCxDQUFpQkMsVUFBakIsQ0FBNEJDLE9BQTVCLENBQW9DLEtBQUtDLFFBQUwsQ0FBY0MsR0FBbEQsS0FBd0QsQ0FBQyxDQUFoRTtBQUNIOzs7Ozs7QUFIZ0JMLFEsQ0FLYkUsVSxHQUFXLDBCQUEwQkksS0FBMUIsQ0FBZ0MsR0FBaEMsQztrQkFMRU4sUSIsImZpbGUiOiJwcm9wZXJ0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvcGVydHkgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMuaW5kZXhPZih0aGlzLnNyY01vZGVsLmtleSkhPS0xXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIFByb3BlcnRpZXM9XCJ0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeVwiLnNwbGl0KCcsJylcclxufSJdfQ==