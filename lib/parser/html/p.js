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

var _extractor = require("../extractor");

var _extractor2 = _interopRequireDefault(_extractor);

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
            return text.length > 1 && text[0] == '[' && text[len - 1] == ']';
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
            }).join("").trim(),
                len = text.length;
            if (this.isRegion(text)) {
                //editable region

                var _parse = this.parse(text);

                var _parse2 = _slicedToArray(_parse, 2);

                var key = _parse2[0];
                var alt = _parse2[1];

                return _extractor2.default.placeholder(key, alt);
            } else {
                return "<" + this.tag + ">" + text + "</" + this.tag + ">";
            }
        }
    }]);

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLEdBQWE7OEJBREksV0FDSjs7MkVBREksdUJBRUosWUFEQTs7QUFFVCxjQUFLLEdBQUwsR0FBUyxHQUFULENBRlM7QUFHVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsa0NBQWYsQ0FIUzs7S0FBYjs7aUJBRGlCOztpQ0FpQlIsTUFBSztBQUNWLG1CQUFPLEtBQUssTUFBTCxHQUFZLENBQVosSUFBaUIsS0FBSyxDQUFMLEtBQVMsR0FBVCxJQUFnQixLQUFLLE1BQUksQ0FBSixDQUFMLElBQWEsR0FBYixDQUQ5Qjs7Ozs4QkFJUixNQUFLOzhCQUNZLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFEWjs7Ozs7Z0JBQ0Ysb0NBQUkscUJBREY7Z0JBQ08sc0JBRFA7O0FBRVAsYUFBQyxHQUFELEtBQVMsTUFBSSxHQUFKLENBQVQsQ0FGTztBQUdQLG1CQUFPLENBQUMsR0FBRCxFQUFLLEdBQUwsQ0FBUCxDQUhPOzs7OzRCQWREO0FBQ04sZ0JBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxFQUF5QyxJQUF6QyxFQUFMO2dCQUFxRCxNQUFJLEtBQUssTUFBTCxDQUR2RDtBQUVOLGdCQUFHLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBSCxFQUF1Qjs7OzZCQUNMLEtBQUssS0FBTCxDQUFXLElBQVgsRUFESzs7OztvQkFDZCxpQkFEYztvQkFDVixpQkFEVTs7QUFFbkIsdUJBQU8sb0JBQVMsV0FBVCxDQUFxQixHQUFyQixFQUEwQixHQUExQixDQUFQLENBRm1CO2FBQXZCLE1BR007QUFDRiw2QkFBVyxLQUFLLEdBQUwsU0FBWSxjQUFTLEtBQUssR0FBTCxNQUFoQyxDQURFO2FBSE47Ozs7V0FUYSIsImZpbGUiOiJwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL3RkXCJcclxuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuLi9leHRyYWN0b3JcIlxyXG5cclxuLyoqXHJcbiogW2tleTphbHRdIGlzIGFuIGVkaXRhYmxlIHJlZ2lvblxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwYXJhZ3JhcGggZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJwXCJcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChjZWxsLCBkb2N1bWVudClcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIHZhciB0ZXh0PXRoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEuaHRtbCkuam9pbihcIlwiKS50cmltKCksbGVuPXRleHQubGVuZ3RoXHJcbiAgICAgICAgaWYodGhpcy5pc1JlZ2lvbih0ZXh0KSl7Ly9lZGl0YWJsZSByZWdpb25cclxuICAgICAgICAgICAgbGV0IFtrZXksYWx0XT10aGlzLnBhcnNlKHRleHQpXHJcbiAgICAgICAgICAgIHJldHVybiBUZW1wbGF0ZS5wbGFjZWhvbGRlcihrZXksIGFsdClcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgPCR7dGhpcy50YWd9PiR7dGV4dH08LyR7dGhpcy50YWd9PmBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNSZWdpb24odGV4dCl7XHJcbiAgICAgICAgcmV0dXJuIHRleHQubGVuZ3RoPjEgJiYgdGV4dFswXT09J1snICYmIHRleHRbbGVuLTFdPT0nXSdcclxuICAgIH1cclxuXHJcbiAgICBwYXJzZSh0ZXh0KXtcclxuICAgICAgICBsZXQgW2tleT1cIl9fXCIsYWx0XT10ZXh0LnNwbGl0KFwiOlwiKVxyXG4gICAgICAgICFhbHQgJiYgKGFsdD1rZXkpO1xyXG4gICAgICAgIHJldHVybiBba2V5LGFsdF1cclxuICAgIH1cclxufVxyXG4iXX0=