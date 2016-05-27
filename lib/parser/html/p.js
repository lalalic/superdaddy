"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        key: "html",
        get: function get() {
            var text = this._children.map(function (a) {
                return a.html;
            }).join("").trim(),
                len = text.length;
            if (len > 1 && text[0] == '[' && text[len - 1] == ']') {
                //editable region
                var sep = text.indexOf(':'),
                    key,
                    alt;
                if (sep > 1) {
                    key = text.substring(1, sep);
                    alt = text.substring(sep + 1, len - 1);
                } else {
                    alt = key = text.substring(1, len - 1) || "__";
                }
                return Template.placeholder(key, alt);
            } else {
                return "<" + this.tag + ">" + text + "</" + this.tag + ">";
            }
        }
    }]);

    return paragraph;
}(_visitor2.default);

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCOzs7QUFDakIsYUFEaUIsU0FDakIsR0FBYTs4QkFESSxXQUNKOzsyRUFESSx1QkFFSixZQURBOztBQUVULGNBQUssR0FBTCxHQUFTLEdBQVQsQ0FGUztBQUdULGNBQUssU0FBTCxHQUFlLE1BQUssZUFBTCxrQ0FBZixDQUhTOztLQUFiOztpQkFEaUI7OzRCQU9QO0FBQ04sZ0JBQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxFQUF5QyxJQUF6QyxFQUFMO2dCQUFxRCxNQUFJLEtBQUssTUFBTCxDQUR2RDtBQUVOLGdCQUFHLE1BQUksQ0FBSixJQUFTLEtBQUssQ0FBTCxLQUFTLEdBQVQsSUFBZ0IsS0FBSyxNQUFJLENBQUosQ0FBTCxJQUFhLEdBQWIsRUFBaUI7O0FBQ3pDLG9CQUFJLE1BQUksS0FBSyxPQUFMLENBQWEsR0FBYixDQUFKO29CQUF1QixHQUEzQjtvQkFBZ0MsR0FBaEMsQ0FEeUM7QUFFekMsb0JBQUcsTUFBSSxDQUFKLEVBQU07QUFDTCwwQkFBSSxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLEdBQWpCLENBQUosQ0FESztBQUVMLDBCQUFJLEtBQUssU0FBTCxDQUFlLE1BQUksQ0FBSixFQUFNLE1BQUksQ0FBSixDQUF6QixDQUZLO2lCQUFULE1BR007QUFDRiwwQkFBSSxNQUFLLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBaUIsTUFBSSxDQUFKLENBQWpCLElBQXlCLElBQXpCLENBRFA7aUJBSE47QUFNQSx1QkFBTyxTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEIsR0FBMUIsQ0FBUCxDQVJ5QzthQUE3QyxNQVNNO0FBQ0YsNkJBQVcsS0FBSyxHQUFMLFNBQVksY0FBUyxLQUFLLEdBQUwsTUFBaEMsQ0FERTthQVROOzs7O1dBVGEiLCJmaWxlIjoicC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBWaXNpdG9yIGZyb20gXCIuL3Zpc2l0b3JcIlxyXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSBcIi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgY2VsbCBmcm9tIFwiLi90ZFwiXHJcblxyXG4vKipcclxuKiBba2V5OmFsdF0gaXMgYW4gZWRpdGFibGUgcmVnaW9uXHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBhcmFncmFwaCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLnRhZz1cInBcIlxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KGNlbGwsIGRvY3VtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgdmFyIHRleHQ9dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXCIpLnRyaW0oKSxsZW49dGV4dC5sZW5ndGhcclxuICAgICAgICBpZihsZW4+MSAmJiB0ZXh0WzBdPT0nWycgJiYgdGV4dFtsZW4tMV09PSddJyl7Ly9lZGl0YWJsZSByZWdpb25cclxuICAgICAgICAgICAgdmFyIHNlcD10ZXh0LmluZGV4T2YoJzonKSwga2V5LCBhbHQ7XHJcbiAgICAgICAgICAgIGlmKHNlcD4xKXtcclxuICAgICAgICAgICAgICAgIGtleT10ZXh0LnN1YnN0cmluZygxLHNlcClcclxuICAgICAgICAgICAgICAgIGFsdD10ZXh0LnN1YnN0cmluZyhzZXArMSxsZW4tMSlcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWx0PWtleT0odGV4dC5zdWJzdHJpbmcoMSxsZW4tMSl8fFwiX19cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVGVtcGxhdGUucGxhY2Vob2xkZXIoa2V5LCBhbHQpXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfT4ke3RleHR9PC8ke3RoaXMudGFnfT5gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=