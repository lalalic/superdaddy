"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ignore = require("./ignore");

var _ignore2 = _interopRequireDefault(_ignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var document = function (_Ignore) {
    _inherits(document, _Ignore);

    function document() {
        _classCallCheck(this, document);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(document).apply(this, arguments));

        _this._children = [];
        _this.images = [];
        _this.steps = [];
        _this._id = "docx_" + Date.now();
        return _this;
    }

    _createClass(document, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixRQUNqQixHQUFhOzhCQURJLFVBQ0o7OzJFQURJLHNCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxNQUFMLEdBQVksRUFBWixDQUhTO0FBSVQsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUpTO0FBS1QsY0FBSyxHQUFMLGFBQWlCLEtBQUssR0FBTCxFQUFqQixDQUxTOztLQUFiOztpQkFEaUI7O3dDQWlCTDtBQUNSLG1CQUFPLEtBQVAsQ0FEUTs7OztnQ0FJSixNQUFLO0FBQ1QsaUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFEUzs7Ozs0QkFaSDtBQUNOLGtDQUFtQixLQUFLLEdBQUwsV0FBYSxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxZQUFoQyxDQURNOzs7OzRCQUlNO0FBQ1osbUJBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixDQURLOzs7O1dBYkMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSWdub3JlIGZyb20gXCIuL2lnbm9yZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkb2N1bWVudCBleHRlbmRzIElnbm9yZXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuPVtdXHJcbiAgICAgICAgdGhpcy5pbWFnZXM9W11cclxuICAgICAgICB0aGlzLnN0ZXBzPVtdXHJcbiAgICAgICAgdGhpcy5faWQ9YGRvY3hfJHtEYXRlLm5vdygpfWBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBpZD1cIiR7dGhpcy5faWR9XCI+JHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcIil9PC9kaXY+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBwcm9wZXJ0aWVzKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3JjTW9kZWwud0RvYy5wcm9wc1xyXG4gICAgfVxyXG5cclxuXHRfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3RlcChzdGVwKXtcclxuICAgICAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcClcclxuICAgIH1cclxufVxyXG4iXX0=