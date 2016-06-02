"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _td = require("./td");

var _td2 = _interopRequireDefault(_td);

var _template = require("../template");

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* [key:alt] is an editable region
*/

var paragraph = function (_Visitor) {
    _inherits(paragraph, _Visitor);

    function paragraph() {
        _classCallCheck(this, paragraph);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(paragraph).apply(this, arguments));

        _this.tag = "p";
        _this.container = _this.findTypedParent(_td2.default, _document2.default);
        return _this;
    }

    _createClass(paragraph, [{
        key: "isRegion",
        value: function isRegion(text) {
            return text.length > 1 && text[0] == '[' && text[text.length - 1] == ']';
        }
    }, {
        key: "parse",
        value: function parse(text) {
            var _text$split = text.split(":");

            var _text$split2 = _slicedToArray(_text$split, 2);

            var _text$split2$ = _text$split2[0];
            var key = _text$split2$ === undefined ? "__" : _text$split2$;
            var alt = _text$split2[1];

            !alt && (alt = key);
            return [key, alt];
        }
    }, {
        key: "html",
        get: function get() {
            var text = this._children.map(function (a) {
                return a.html;
            }).join("").trim();
            if (this.isRegion(text)) {
                //editable region

                var _parse = this.parse(text);

                var _parse2 = _slicedToArray(_parse, 2);

                var key = _parse2[0];
                var alt = _parse2[1];

                debugger;
                return _template2.default.placeholder(key, alt);
            } else {
                return "<" + this.tag + ">" + text + "</" + this.tag + ">";
            }
        }
    }]);

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLEdBQWE7OEJBREksV0FDSjs7MkVBREksdUJBRUosWUFEQTs7QUFFVCxjQUFLLEdBQUwsR0FBUyxHQUFULENBRlM7QUFHVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsa0NBQWYsQ0FIUzs7S0FBYjs7aUJBRGlCOztpQ0FrQlIsTUFBSztBQUNWLG1CQUFPLEtBQUssTUFBTCxHQUFZLENBQVosSUFBaUIsS0FBSyxDQUFMLEtBQVMsR0FBVCxJQUFnQixLQUFLLEtBQUssTUFBTCxHQUFZLENBQVosQ0FBTCxJQUFxQixHQUFyQixDQUQ5Qjs7Ozs4QkFJUixNQUFLOzhCQUNZLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFEWjs7Ozs7Z0JBQ0Ysb0NBQUkscUJBREY7Z0JBQ08sc0JBRFA7O0FBRVAsYUFBQyxHQUFELEtBQVMsTUFBSSxHQUFKLENBQVQsQ0FGTztBQUdQLG1CQUFPLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBUCxDQUhPOzs7OzRCQWZEO0FBQ04sZ0JBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxFQUF5QyxJQUF6QyxFQUFMLENBREU7QUFFTixnQkFBRyxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQUgsRUFBdUI7Ozs2QkFDTCxLQUFLLEtBQUwsQ0FBVyxJQUFYLEVBREs7Ozs7b0JBQ2QsaUJBRGM7b0JBQ1YsaUJBRFU7O0FBRTVCLHlCQUY0QjtBQUduQix1QkFBTyxtQkFBUyxXQUFULENBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLENBQVAsQ0FIbUI7YUFBdkIsTUFJTTtBQUNGLDZCQUFXLEtBQUssR0FBTCxTQUFZLGNBQVMsS0FBSyxHQUFMLE1BQWhDLENBREU7YUFKTjs7OztXQVRhIiwiZmlsZSI6InAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuaW1wb3J0IGNlbGwgZnJvbSBcIi4vdGRcIlxyXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSBcIi4uL3RlbXBsYXRlXCJcclxuXHJcbi8qKlxyXG4qIFtrZXk6YWx0XSBpcyBhbiBlZGl0YWJsZSByZWdpb25cclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFyYWdyYXBoIGV4dGVuZHMgVmlzaXRvcntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMudGFnPVwicFwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoY2VsbCwgZG9jdW1lbnQpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICB2YXIgdGV4dD10aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcIikudHJpbSgpXHJcbiAgICAgICAgaWYodGhpcy5pc1JlZ2lvbih0ZXh0KSl7Ly9lZGl0YWJsZSByZWdpb25cclxuICAgICAgICAgICAgbGV0IFtrZXksYWx0XT10aGlzLnBhcnNlKHRleHQpXHJcblx0XHRcdGRlYnVnZ2VyIFxyXG4gICAgICAgICAgICByZXR1cm4gVGVtcGxhdGUucGxhY2Vob2xkZXIoa2V5LCBhbHQpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfT4ke3RleHR9PC8ke3RoaXMudGFnfT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzUmVnaW9uKHRleHQpe1xyXG4gICAgICAgIHJldHVybiB0ZXh0Lmxlbmd0aD4xICYmIHRleHRbMF09PSdbJyAmJiB0ZXh0W3RleHQubGVuZ3RoLTFdPT0nXSdcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZSh0ZXh0KXtcclxuICAgICAgICBsZXQgW2tleT1cIl9fXCIsYWx0XT10ZXh0LnNwbGl0KFwiOlwiKVxyXG4gICAgICAgICFhbHQgJiYgKGFsdD1rZXkpO1xyXG4gICAgICAgIHJldHVybiBba2V5LGFsdF1cclxuICAgIH1cclxufVxyXG4iXX0=