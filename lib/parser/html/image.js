"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = function (_Visitor) {
    (0, _inherits3.default)(image, _Visitor);

    function image() {
        (0, _classCallCheck3.default)(this, image);

        var _this = (0, _possibleConstructorReturn3.default)(this, (image.__proto__ || (0, _getPrototypeOf2.default)(image)).apply(this, arguments));

        _this.container = _this.findTypedParent(_p2.default);
        _this.data = _this.srcModel.getImage();
        if (typeof _this.data != 'string') {
            _this.findTypedParent(_document2.default).images.push(_this);
        }
        return _this;
    }

    (0, _createClass3.default)(image, [{
        key: "html",
        get: function get() {
            var alt = this.alt ? "alt=\"" + this.alt + "\"" : "";
            switch ((0, _typeof3.default)(this.data)) {
                case 'string':
                    return "<img src=\"" + this.data + "\" " + alt + ">";
                default:
                    return "<img class=\"__revoking\" " + alt + " src=\"" + URL.createObjectURL(new Blob([this.data], { type: "image/*" })) + "\">"; /**/
            }
        }
    }, {
        key: "alt",
        get: function get() {
            return this.container.text;
        }
    }]);
    return image;
}(_visitor2.default);

exports.default = image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbWFnZS5qcyJdLCJuYW1lcyI6WyJpbWFnZSIsImFyZ3VtZW50cyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCIsImRhdGEiLCJzcmNNb2RlbCIsImdldEltYWdlIiwiaW1hZ2VzIiwicHVzaCIsImFsdCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJ0eXBlIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFHcUJBLEs7OztBQUNqQixxQkFBYTtBQUFBOztBQUFBLHlJQUNBQyxTQURBOztBQUVULGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGFBQWY7QUFDQSxjQUFLQyxJQUFMLEdBQVUsTUFBS0MsUUFBTCxDQUFjQyxRQUFkLEVBQVY7QUFDQSxZQUFHLE9BQU8sTUFBS0YsSUFBWixJQUFtQixRQUF0QixFQUErQjtBQUMzQixrQkFBS0QsZUFBTCxxQkFBK0JJLE1BQS9CLENBQXNDQyxJQUF0QztBQUNIO0FBTlE7QUFPWjs7Ozs0QkFFUztBQUNOLGdCQUFJQyxNQUFJLEtBQUtBLEdBQUwsY0FBbUIsS0FBS0EsR0FBeEIsVUFBaUMsRUFBekM7QUFDQSwwQ0FBYyxLQUFLTCxJQUFuQjtBQUNBLHFCQUFLLFFBQUw7QUFDSSwyQ0FBb0IsS0FBS0EsSUFBekIsV0FBa0NLLEdBQWxDO0FBQ0o7QUFDSSwwREFBa0NBLEdBQWxDLGVBQThDQyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDLEtBQUtSLElBQU4sQ0FBVCxFQUFxQixFQUFDUyxNQUFLLFNBQU4sRUFBckIsQ0FBcEIsQ0FBOUMsU0FKSixDQUlrSDtBQUpsSDtBQU1IOzs7NEJBRVE7QUFDTCxtQkFBTyxLQUFLWCxTQUFMLENBQWVZLElBQXRCO0FBQ0g7Ozs7O2tCQXRCZ0JkLEsiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbWFnZSBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgpXHJcbiAgICAgICAgdGhpcy5kYXRhPXRoaXMuc3JjTW9kZWwuZ2V0SW1hZ2UoKVxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmRhdGEpIT0nc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZFR5cGVkUGFyZW50KGRvY3VtZW50KS5pbWFnZXMucHVzaCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGxldCBhbHQ9dGhpcy5hbHQgPyBgYWx0PVwiJHt0aGlzLmFsdH1cImAgOiBcIlwiXHJcbiAgICAgICAgc3dpdGNoKHR5cGVvZih0aGlzLmRhdGEpKXtcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICByZXR1cm4gYDxpbWcgc3JjPVwiJHt0aGlzLmRhdGF9XCIgJHthbHR9PmBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJfX3Jldm9raW5nXCIgJHthbHR9IHNyYz1cIiR7VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbdGhpcy5kYXRhXSx7dHlwZTpcImltYWdlLypcIn0pKX1cIj5gIC8qKi9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFsdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci50ZXh0XHJcbiAgICB9XHJcbn1cclxuIl19