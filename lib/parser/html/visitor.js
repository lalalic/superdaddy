"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ignore = require("./ignore");

var _ignore2 = _interopRequireDefault(_ignore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Visitor = function (_Ignore) {
    _inherits(Visitor, _Ignore);

    function Visitor() {
        _classCallCheck(this, Visitor);

        var _this = _possibleConstructorReturn(this, (Visitor.__proto__ || Object.getPrototypeOf(Visitor)).apply(this, arguments));

        _this._children = [];
        _this.container = null;
        return _this;
    }

    _createClass(Visitor, [{
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
            _get(Visitor.prototype.__proto__ || Object.getPrototypeOf(Visitor.prototype), "visit", this).call(this);
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC92aXNpdG9yLmpzIl0sIm5hbWVzIjpbIlZpc2l0b3IiLCJhcmd1bWVudHMiLCJfY2hpbGRyZW4iLCJjb250YWluZXIiLCJwIiwicGFyZW50IiwiVHlwZXMiLCJmaWx0ZXIiLCJUeXBlIiwibGVuZ3RoIiwiRXJyb3IiLCJzcmNNb2RlbCIsInR5cGUiLCJwdXNoIiwidGFnIiwibWFwIiwiYSIsImh0bWwiLCJqb2luIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87OztBQUNqQix1QkFBYTtBQUFBOztBQUFBLHVIQUNBQyxTQURBOztBQUVULGNBQUtDLFNBQUwsR0FBZSxFQUFmO0FBQ0EsY0FBS0MsU0FBTCxHQUFlLElBQWY7QUFIUztBQUlaOzs7OzBDQUV3QjtBQUNyQixnQkFBSUMsSUFBRSxLQUFLQyxNQUFYOztBQURxQiw4Q0FBTkMsS0FBTTtBQUFOQSxxQkFBTTtBQUFBOztBQUVyQixtQkFBTUYsQ0FBTixFQUFRO0FBQ0osb0JBQUdFLE1BQU1DLE1BQU4sQ0FBYSxVQUFDQyxJQUFEO0FBQUEsMkJBQVFKLGFBQWFJLElBQXJCO0FBQUEsaUJBQWIsRUFBd0NDLE1BQTNDLEVBQ0ksT0FBT0wsQ0FBUCxDQURKLEtBR0lBLElBQUVBLEVBQUVDLE1BQUo7QUFDUDtBQUNELGtCQUFNLElBQUlLLEtBQUosQ0FBVSxtREFBaUQsS0FBS0MsUUFBTCxDQUFjQyxJQUF6RSxDQUFOO0FBQ0g7OztnQ0FFTTtBQUNIO0FBQ0EsaUJBQUtULFNBQUwsQ0FBZUQsU0FBZixDQUF5QlcsSUFBekIsQ0FBOEIsSUFBOUI7QUFDSDs7O3dDQVlXO0FBQ1IsbUJBQU8sS0FBUDtBQUNIOzs7NEJBWlM7QUFDTixnQkFBRyxDQUFDLEtBQUtDLEdBQVQsRUFDSSxPQUFPLEVBQVA7QUFDSix5QkFBVyxLQUFLQSxHQUFoQixTQUF1QixLQUFLWixTQUFMLENBQWVhLEdBQWYsQ0FBbUIsVUFBQ0MsQ0FBRDtBQUFBLHVCQUFLQSxFQUFFQyxJQUFQO0FBQUEsYUFBbkIsRUFBZ0NDLElBQWhDLENBQXFDLE1BQXJDLENBQXZCLFVBQXdFLEtBQUtKLEdBQTdFO0FBQ0g7Ozs0QkFFUztBQUNOLHdCQUFVLEtBQUtaLFNBQUwsQ0FBZWEsR0FBZixDQUFtQixVQUFDQyxDQUFEO0FBQUEsdUJBQUtBLEVBQUVHLElBQVA7QUFBQSxhQUFuQixFQUFnQ0QsSUFBaEMsQ0FBcUMsRUFBckMsQ0FBVjtBQUNIOzs7Ozs7a0JBL0JnQmxCLE8iLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaWdub3JlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpc2l0b3IgZXh0ZW5kcyBJZ25vcmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbj1bXVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPW51bGxcclxuICAgIH1cclxuXHJcbiAgICBmaW5kVHlwZWRQYXJlbnQoLi4uVHlwZXMpe1xyXG4gICAgICAgIHZhciBwPXRoaXMucGFyZW50XHJcbiAgICAgICAgd2hpbGUocCl7XHJcbiAgICAgICAgICAgIGlmKFR5cGVzLmZpbHRlcigoVHlwZSk9PnAgaW5zdGFuY2VvZiBUeXBlKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcFxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBwPXAucGFyZW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIldyb25nIHN0cnVjdHVyZTogY2FuIG5vdCBmaW5kIGNvbnRhaW5lciBmb3IgYSBcIit0aGlzLnNyY01vZGVsLnR5cGUpXHJcbiAgICB9XHJcblxyXG4gICAgdmlzaXQoKXtcclxuICAgICAgICBzdXBlci52aXNpdCgpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIuX2NoaWxkcmVuLnB1c2godGhpcylcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIGlmKCF0aGlzLnRhZylcclxuICAgICAgICAgICAgcmV0dXJuICcnXHJcbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLnRhZ30+JHt0aGlzLl9jaGlsZHJlbi5tYXAoKGEpPT5hLmh0bWwpLmpvaW4oXCJcXHJcXG5cIil9PC8ke3RoaXMudGFnfT5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS50ZXh0KS5qb2luKCcnKX1gXHJcbiAgICB9XHJcblx0XHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59Il19