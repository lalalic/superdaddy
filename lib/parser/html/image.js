"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

        var _this = _possibleConstructorReturn(this, (image.__proto__ || Object.getPrototypeOf(image)).apply(this, arguments));

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pbWFnZS5qcyJdLCJuYW1lcyI6WyJpbWFnZSIsImFyZ3VtZW50cyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCIsImRhdGEiLCJzcmNNb2RlbCIsImdldEltYWdlIiwiaW1hZ2VzIiwicHVzaCIsImFsdCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJ0eXBlIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCQSxLOzs7QUFDakIscUJBQWE7QUFBQTs7QUFBQSxtSEFDQUMsU0FEQTs7QUFFVCxjQUFLQyxTQUFMLEdBQWUsTUFBS0MsZUFBTCxhQUFmO0FBQ0EsY0FBS0MsSUFBTCxHQUFVLE1BQUtDLFFBQUwsQ0FBY0MsUUFBZCxFQUFWO0FBQ0EsWUFBRyxPQUFPLE1BQUtGLElBQVosSUFBbUIsUUFBdEIsRUFBK0I7QUFDM0Isa0JBQUtELGVBQUwscUJBQStCSSxNQUEvQixDQUFzQ0MsSUFBdEM7QUFDSDtBQU5RO0FBT1o7Ozs7NEJBRVM7QUFDTixnQkFBSUMsTUFBSSxLQUFLQSxHQUFMLGNBQW1CLEtBQUtBLEdBQXhCLFVBQWlDLEVBQXpDO0FBQ0EsNEJBQWMsS0FBS0wsSUFBbkI7QUFDQSxxQkFBSyxRQUFMO0FBQ0ksMkNBQW9CLEtBQUtBLElBQXpCLFdBQWtDSyxHQUFsQztBQUNKO0FBQ0ksMERBQWtDQSxHQUFsQyxlQUE4Q0MsSUFBSUMsZUFBSixDQUFvQixJQUFJQyxJQUFKLENBQVMsQ0FBQyxLQUFLUixJQUFOLENBQVQsRUFBcUIsRUFBQ1MsTUFBSyxTQUFOLEVBQXJCLENBQXBCLENBQTlDLFNBSkosQ0FJa0g7QUFKbEg7QUFNSDs7OzRCQUVRO0FBQ0wsbUJBQU8sS0FBS1gsU0FBTCxDQUFlWSxJQUF0QjtBQUNIOzs7Ozs7a0JBdEJnQmQsSyIsImZpbGUiOiJpbWFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgcGFyYWdyYXBoIGZyb20gXCIuL3BcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGltYWdlIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHBhcmFncmFwaClcclxuICAgICAgICB0aGlzLmRhdGE9dGhpcy5zcmNNb2RlbC5nZXRJbWFnZSgpXHJcbiAgICAgICAgaWYodHlwZW9mKHRoaXMuZGF0YSkhPSdzdHJpbmcnKXtcclxuICAgICAgICAgICAgdGhpcy5maW5kVHlwZWRQYXJlbnQoZG9jdW1lbnQpLmltYWdlcy5wdXNoKHRoaXMpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgbGV0IGFsdD10aGlzLmFsdCA/IGBhbHQ9XCIke3RoaXMuYWx0fVwiYCA6IFwiXCJcclxuICAgICAgICBzd2l0Y2godHlwZW9mKHRoaXMuZGF0YSkpe1xyXG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgIHJldHVybiBgPGltZyBzcmM9XCIke3RoaXMuZGF0YX1cIiAke2FsdH0+YFxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBgPGltZyBjbGFzcz1cIl9fcmV2b2tpbmdcIiAke2FsdH0gc3JjPVwiJHtVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmRhdGFdLHt0eXBlOlwiaW1hZ2UvKlwifSkpfVwiPmAgLyoqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgYWx0KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnRleHRcclxuICAgIH1cclxufVxyXG4iXX0=