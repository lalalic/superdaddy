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
            var _text$substring$split = text.substring(1, text.length - 2).split(":");

            var _text$substring$split2 = _slicedToArray(_text$substring$split, 2);

            var _text$substring$split3 = _text$substring$split2[0];
            var key = _text$substring$split3 === undefined ? "__" : _text$substring$split3;
            var alt = _text$substring$split2[1];

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

                this.findTypedParent(_document2.default).addStep(key, alt);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztJQUtxQjs7O0FBQ2pCLGFBRGlCLFNBQ2pCLEdBQWE7OEJBREksV0FDSjs7MkVBREksdUJBRUosWUFEQTs7QUFFVCxjQUFLLEdBQUwsR0FBUyxHQUFULENBRlM7QUFHVCxjQUFLLFNBQUwsR0FBZSxNQUFLLGVBQUwsa0NBQWYsQ0FIUzs7S0FBYjs7aUJBRGlCOztpQ0FrQlIsTUFBSztBQUNWLG1CQUFPLEtBQUssTUFBTCxHQUFZLENBQVosSUFBaUIsS0FBSyxDQUFMLEtBQVMsR0FBVCxJQUFnQixLQUFLLEtBQUssTUFBTCxHQUFZLENBQVosQ0FBTCxJQUFxQixHQUFyQixDQUQ5Qjs7Ozs4QkFJUixNQUFLO3dDQUNZLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBaUIsS0FBSyxNQUFMLEdBQVksQ0FBWixDQUFqQixDQUFnQyxLQUFoQyxDQUFzQyxHQUF0QyxFQURaOzs7OztnQkFDRiw2Q0FBSSw4QkFERjtnQkFDTyxnQ0FEUDs7QUFFUCxhQUFDLEdBQUQsS0FBUyxNQUFJLEdBQUosQ0FBVCxDQUZPO0FBR1AsbUJBQU8sQ0FBQyxHQUFELEVBQUssR0FBTCxDQUFQLENBSE87Ozs7NEJBZkQ7QUFDTixnQkFBSSxPQUFLLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsVUFBQyxDQUFEO3VCQUFLLEVBQUUsSUFBRjthQUFMLENBQW5CLENBQWdDLElBQWhDLENBQXFDLEVBQXJDLEVBQXlDLElBQXpDLEVBQUwsQ0FERTtBQUVOLGdCQUFHLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBSCxFQUF1Qjs7OzZCQUNMLEtBQUssS0FBTCxDQUFXLElBQVgsRUFESzs7OztvQkFDZCxpQkFEYztvQkFDVixpQkFEVTs7QUFFbkIscUJBQUssZUFBTCxxQkFBK0IsT0FBL0IsQ0FBdUMsR0FBdkMsRUFBNEMsR0FBNUMsRUFGbUI7QUFHbkIsdUJBQU8sbUJBQVMsV0FBVCxDQUFxQixHQUFyQixFQUEwQixHQUExQixDQUFQLENBSG1CO2FBQXZCLE1BSU07QUFDRiw2QkFBVyxLQUFLLEdBQUwsU0FBWSxjQUFTLEtBQUssR0FBTCxNQUFoQyxDQURFO2FBSk47Ozs7V0FUYSIsImZpbGUiOiJwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcbmltcG9ydCBjZWxsIGZyb20gXCIuL3RkXCJcclxuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuLi90ZW1wbGF0ZVwiXHJcblxyXG4vKipcclxuKiBba2V5OmFsdF0gaXMgYW4gZWRpdGFibGUgcmVnaW9uXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBhcmFncmFwaCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInBcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KGNlbGwsIGRvY3VtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgdmFyIHRleHQ9dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXCIpLnRyaW0oKVxyXG4gICAgICAgIGlmKHRoaXMuaXNSZWdpb24odGV4dCkpey8vZWRpdGFibGUgcmVnaW9uXHJcbiAgICAgICAgICAgIGxldCBba2V5LGFsdF09dGhpcy5wYXJzZSh0ZXh0KVxyXG4gICAgICAgICAgICB0aGlzLmZpbmRUeXBlZFBhcmVudChkb2N1bWVudCkuYWRkU3RlcChrZXksIGFsdClcclxuICAgICAgICAgICAgcmV0dXJuIFRlbXBsYXRlLnBsYWNlaG9sZGVyKGtleSwgYWx0KVxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGA8JHt0aGlzLnRhZ30+JHt0ZXh0fTwvJHt0aGlzLnRhZ30+YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc1JlZ2lvbih0ZXh0KXtcclxuICAgICAgICByZXR1cm4gdGV4dC5sZW5ndGg+MSAmJiB0ZXh0WzBdPT0nWycgJiYgdGV4dFt0ZXh0Lmxlbmd0aC0xXT09J10nXHJcbiAgICB9XHJcblxyXG4gICAgcGFyc2UodGV4dCl7XHJcbiAgICAgICAgbGV0IFtrZXk9XCJfX1wiLGFsdF09dGV4dC5zdWJzdHJpbmcoMSx0ZXh0Lmxlbmd0aC0yKS5zcGxpdChcIjpcIilcclxuICAgICAgICAhYWx0ICYmIChhbHQ9a2V5KTtcclxuICAgICAgICByZXR1cm4gW2tleSxhbHRdXHJcbiAgICB9XHJcbn1cclxuIl19