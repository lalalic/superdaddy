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

var _ignore = require("./ignore");

var _ignore2 = _interopRequireDefault(_ignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var document = function (_Ignore) {
    (0, _inherits3.default)(document, _Ignore);

    function document() {
        (0, _classCallCheck3.default)(this, document);

        var _this = (0, _possibleConstructorReturn3.default)(this, (document.__proto__ || (0, _getPrototypeOf2.default)(document)).apply(this, arguments));

        _this._children = [];
        _this.images = [];
        _this.steps = [];
        _this._id = "docx_" + Date.now();
        return _this;
    }

    (0, _createClass3.default)(document, [{
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return false;
        }
    }, {
        key: "addStep",
        value: function addStep(step) {
            this.steps.push(step);
        }
    }, {
        key: "html",
        get: function get() {
            return "<div id=\"" + this._id + "\">" + this._children.map(function (a) {
                return a.html;
            }).join("") + "</div>";
        }
    }, {
        key: "properties",
        get: function get() {
            return this.srcModel.wDoc.props;
        }
    }]);
    return document;
}(_ignore2.default);

exports.default = document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7OztBQUNqQix3QkFBYTs7OytJQUNBLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxNQUFMLEdBQVksRUFBWixDQUhTO0FBSVQsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUpTO0FBS1QsY0FBSyxHQUFMLGFBQWlCLEtBQUssR0FBTCxFQUFqQixDQUxTOztLQUFiOzs7O3dDQWdCWTtBQUNSLG1CQUFPLEtBQVAsQ0FEUTs7OztnQ0FJSixNQUFLO0FBQ1QsaUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFEUzs7Ozs0QkFaSDtBQUNOLGtDQUFtQixLQUFLLEdBQUwsV0FBYSxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxZQUFoQyxDQURNOzs7OzRCQUlNO0FBQ1osbUJBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixDQURLOzs7Ozs7a0JBYkMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSWdub3JlIGZyb20gXCIuL2lnbm9yZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkb2N1bWVudCBleHRlbmRzIElnbm9yZXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuPVtdXHJcbiAgICAgICAgdGhpcy5pbWFnZXM9W11cclxuICAgICAgICB0aGlzLnN0ZXBzPVtdXHJcbiAgICAgICAgdGhpcy5faWQ9YGRvY3hfJHtEYXRlLm5vdygpfWBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cIiR7dGhpcy5faWR9XCI+JHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcIil9PC9kaXY+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcm9wZXJ0aWVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3JjTW9kZWwud0RvYy5wcm9wc1xyXG4gICAgfVxyXG5cclxuXHRfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3RlcChzdGVwKXtcclxuICAgICAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcClcclxuICAgIH1cclxufVxyXG4iXX0=