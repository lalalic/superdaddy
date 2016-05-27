"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var image = function (_Visitor) {
    _inherits(image, _Visitor);

    function image() {
        _classCallCheck(this, image);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(image).apply(this, arguments));

        _this.container = _this.findTypedParent(_p2.default);
        _this.data = _this.srcModel.getImage();
        if (typeof _this.data != 'string') {
            _this.findTypedParent(_document2.default).images.push(_this);
        }
        return _this;
    }

    _createClass(image, [{
        key: "html",
        get: function get() {
            var alt = this.alt ? "alt=\"" + this.alt + "\"" : "";
            switch (_typeof(this.data)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbWFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFHcUI7OztBQUNqQixhQURpQixLQUNqQixHQUFhOzhCQURJLE9BQ0o7OzJFQURJLG1CQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGFBQWYsQ0FGUztBQUdULGNBQUssSUFBTCxHQUFVLE1BQUssUUFBTCxDQUFjLFFBQWQsRUFBVixDQUhTO0FBSVQsWUFBRyxPQUFPLE1BQUssSUFBTCxJQUFZLFFBQW5CLEVBQTRCO0FBQzNCLGtCQUFLLGVBQUwscUJBQStCLE1BQS9CLENBQXNDLElBQXRDLFFBRDJCO1NBQS9CO3FCQUpTO0tBQWI7O2lCQURpQjs7NEJBVVA7QUFDTixnQkFBSSxNQUFJLEtBQUssR0FBTCxjQUFtQixLQUFLLEdBQUwsT0FBbkIsR0FBaUMsRUFBakMsQ0FERjtBQUVOLDRCQUFjLEtBQUssSUFBTCxDQUFkO0FBQ0EscUJBQUssUUFBTDtBQUNJLDJDQUFvQixLQUFLLElBQUwsV0FBYyxTQUFsQyxDQURKO0FBREE7QUFJSSwwREFBa0Msa0JBQVksSUFBSSxlQUFKLENBQW9CLElBQUksSUFBSixDQUFTLENBQUMsS0FBSyxJQUFMLENBQVYsRUFBcUIsRUFBQyxNQUFLLFNBQUwsRUFBdEIsQ0FBcEIsU0FBOUMsQ0FESjtBQUhBLGFBRk07Ozs7NEJBVUQ7QUFDTCxtQkFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBREY7Ozs7V0FwQlEiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbWFnZSBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgpXHJcbiAgICAgICAgdGhpcy5kYXRhPXRoaXMuc3JjTW9kZWwuZ2V0SW1hZ2UoKVxyXG4gICAgICAgIGlmKHR5cGVvZih0aGlzLmRhdGEpIT0nc3RyaW5nJyl7XHJcbiAgICAgICAgICAgIHRoaXMuZmluZFR5cGVkUGFyZW50KGRvY3VtZW50KS5pbWFnZXMucHVzaCh0aGlzKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGxldCBhbHQ9dGhpcy5hbHQgPyBgYWx0PVwiJHt0aGlzLmFsdH1cImAgOiBcIlwiXHJcbiAgICAgICAgc3dpdGNoKHR5cGVvZih0aGlzLmRhdGEpKXtcclxuICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICByZXR1cm4gYDxpbWcgc3JjPVwiJHt0aGlzLmRhdGF9XCIgJHthbHR9PmBcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gYDxpbWcgY2xhc3M9XCJfX3Jldm9raW5nXCIgJHthbHR9IHNyYz1cIiR7VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbdGhpcy5kYXRhXSx7dHlwZTpcImltYWdlLypcIn0pKX1cIj5gIC8qKi9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGFsdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci50ZXh0XHJcbiAgICB9XHJcbn1cclxuIl19