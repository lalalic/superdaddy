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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Visitor).apply(this, arguments));

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
            (0, _get3.default)((0, _getPrototypeOf2.default)(Visitor.prototype), "visit", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC92aXNpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixPQUNqQixHQUFhOzRDQURJLFNBQ0o7O2lHQURJLHFCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsSUFBZixDQUhTOztLQUFiOzsrQkFEaUI7OzBDQU9RO0FBQ3JCLGdCQUFJLElBQUUsS0FBSyxNQUFMLENBRGU7OzhDQUFOOzthQUFNOztBQUVyQixtQkFBTSxDQUFOLEVBQVE7QUFDSixvQkFBRyxNQUFNLE1BQU4sQ0FBYSxVQUFDLElBQUQ7MkJBQVEsYUFBYSxJQUFiO2lCQUFSLENBQWIsQ0FBd0MsTUFBeEMsRUFDQyxPQUFPLENBQVAsQ0FESixLQUdJLElBQUUsRUFBRSxNQUFGLENBSE47YUFESjtBQU1BLGtCQUFNLElBQUksS0FBSixDQUFVLG1EQUFpRCxLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQWpFLENBUnFCOzs7O2dDQVdsQjtBQUNILDZEQW5CYSw2Q0FtQmIsQ0FERztBQUVILGlCQUFLLFNBQUwsQ0FBZSxTQUFmLENBQXlCLElBQXpCLENBQThCLElBQTlCLEVBRkc7Ozs7d0NBZUs7QUFDUixtQkFBTyxLQUFQLENBRFE7Ozs7NEJBVkY7QUFDTixnQkFBRyxDQUFDLEtBQUssR0FBTCxFQUNBLE9BQU8sRUFBUCxDQURKO0FBRUEseUJBQVcsS0FBSyxHQUFMLFNBQVksS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixVQUFDLENBQUQ7dUJBQUssRUFBRSxJQUFGO2FBQUwsQ0FBbkIsQ0FBZ0MsSUFBaEMsQ0FBcUMsTUFBckMsV0FBaUQsS0FBSyxHQUFMLE1BQXhFLENBSE07Ozs7NEJBTUE7QUFDTix3QkFBVSxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxDQUFWLENBRE07OztXQTdCTyIsImZpbGUiOiJ2aXNpdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9pZ25vcmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlzaXRvciBleHRlbmRzIElnbm9yZXtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuX2NoaWxkcmVuPVtdXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIGZpbmRUeXBlZFBhcmVudCguLi5UeXBlcyl7XHJcbiAgICAgICAgdmFyIHA9dGhpcy5wYXJlbnRcclxuICAgICAgICB3aGlsZShwKXtcclxuICAgICAgICAgICAgaWYoVHlwZXMuZmlsdGVyKChUeXBlKT0+cCBpbnN0YW5jZW9mIFR5cGUpLmxlbmd0aClcclxuICAgICAgICAgICAgICAgIHJldHVybiBwXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHA9cC5wYXJlbnRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV3Jvbmcgc3RydWN0dXJlOiBjYW4gbm90IGZpbmQgY29udGFpbmVyIGZvciBhIFwiK3RoaXMuc3JjTW9kZWwudHlwZSlcclxuICAgIH1cclxuXHJcbiAgICB2aXNpdCgpe1xyXG4gICAgICAgIHN1cGVyLnZpc2l0KClcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5fY2hpbGRyZW4ucHVzaCh0aGlzKVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgaWYoIXRoaXMudGFnKVxyXG4gICAgICAgICAgICByZXR1cm4gJydcclxuICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfT4ke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEuaHRtbCkuam9pbihcIlxcclxcblwiKX08LyR7dGhpcy50YWd9PmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGV4dCgpe1xyXG4gICAgICAgIHJldHVybiBgJHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLnRleHQpLmpvaW4oJycpfWBcclxuICAgIH1cclxuXHRcclxuXHRfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0iXX0=