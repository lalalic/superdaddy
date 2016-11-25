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

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _ignore = require("./ignore");

var _ignore2 = _interopRequireDefault(_ignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Visitor = function (_Ignore) {
    (0, _inherits3.default)(Visitor, _Ignore);

    function Visitor() {
        (0, _classCallCheck3.default)(this, Visitor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Visitor.__proto__ || (0, _getPrototypeOf2.default)(Visitor)).apply(this, arguments));

        _this._children = [];
        _this.container = null;
        return _this;
    }

    (0, _createClass3.default)(Visitor, [{
        key: "findTypedParent",
        value: function findTypedParent() {
            var p = this.parent;

            for (var _len = arguments.length, Types = Array(_len), _key = 0; _key < _len; _key++) {
                Types[_key] = arguments[_key];
            }

            while (p) {
                if (Types.filter(function (Type) {
                    return p instanceof Type;
                }).length) return p;else p = p.parent;
            }
            throw new Error("Wrong structure: can not find container for a " + this.srcModel.type);
        }
    }, {
        key: "visit",
        value: function visit() {
            (0, _get3.default)(Visitor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Visitor.prototype), "visit", this).call(this);
            this.container._children.push(this);
        }
    }, {
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return false;
        }
    }, {
        key: "html",
        get: function get() {
            if (!this.tag) return '';
            return "<" + this.tag + ">" + this._children.map(function (a) {
                return a.html;
            }).join("\r\n") + "</" + this.tag + ">";
        }
    }, {
        key: "text",
        get: function get() {
            return "" + this._children.map(function (a) {
                return a.text;
            }).join('');
        }
    }]);
    return Visitor;
}(_ignore2.default);

exports.default = Visitor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC92aXNpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7OztBQUNqQix1QkFBYTs7OzZJQUNBLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsSUFBZixDQUhTOztLQUFiOzs7OzBDQU15QjtBQUNyQixnQkFBSSxJQUFFLEtBQUssTUFBTCxDQURlOzs4Q0FBTjs7YUFBTTs7QUFFckIsbUJBQU0sQ0FBTixFQUFRO0FBQ0osb0JBQUcsTUFBTSxNQUFOLENBQWEsVUFBQyxJQUFEOzJCQUFRLGFBQWEsSUFBYjtpQkFBUixDQUFiLENBQXdDLE1BQXhDLEVBQ0MsT0FBTyxDQUFQLENBREosS0FHSSxJQUFFLEVBQUUsTUFBRixDQUhOO2FBREo7QUFNQSxrQkFBTSxJQUFJLEtBQUosQ0FBVSxtREFBaUQsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFqRSxDQVJxQjs7OztnQ0FXbEI7QUFDSCwwSUFERztBQUVILGlCQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLENBQThCLElBQTlCLEVBRkc7Ozs7d0NBZUs7QUFDUixtQkFBTyxLQUFQLENBRFE7Ozs7NEJBVkY7QUFDTixnQkFBRyxDQUFDLEtBQUssR0FBTCxFQUNBLE9BQU8sRUFBUCxDQURKO0FBRUEseUJBQVcsS0FBSyxHQUFMLFNBQVksS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixVQUFDLENBQUQ7dUJBQUssRUFBRSxJQUFGO2FBQUwsQ0FBbkIsQ0FBZ0MsSUFBaEMsQ0FBcUMsTUFBckMsV0FBaUQsS0FBSyxHQUFMLE1BQXhFLENBSE07Ozs7NEJBTUE7QUFDTix3QkFBVSxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxDQUFWLENBRE07Ozs7OztrQkE3Qk8iLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaWdub3JlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpc2l0b3IgZXh0ZW5kcyBJZ25vcmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbj1bXVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPW51bGxcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVHlwZWRQYXJlbnQoLi4uVHlwZXMpe1xyXG4gICAgICAgIHZhciBwPXRoaXMucGFyZW50XHJcbiAgICAgICAgd2hpbGUocCl7XHJcbiAgICAgICAgICAgIGlmKFR5cGVzLmZpbHRlcigoVHlwZSk9PnAgaW5zdGFuY2VvZiBUeXBlKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwPXAucGFyZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHN0cnVjdHVyZTogY2FuIG5vdCBmaW5kIGNvbnRhaW5lciBmb3IgYSBcIit0aGlzLnNyY01vZGVsLnR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgdmlzaXQoKXtcclxuICAgICAgICBzdXBlci52aXNpdCgpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuX2NoaWxkcmVuLnB1c2godGhpcylcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnRhZylcclxuICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLnRhZ30+JHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcXHJcXG5cIil9PC8ke3RoaXMudGFnfT5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS50ZXh0KS5qb2luKCcnKX1gXHJcbiAgICB9XHJcblx0XHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59Il19