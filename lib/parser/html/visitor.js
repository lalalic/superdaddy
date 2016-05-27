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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Visitor).apply(this, arguments));

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
            _get(Object.getPrototypeOf(Visitor.prototype), "visit", this).call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC92aXNpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsYUFEaUIsT0FDakIsR0FBYTs4QkFESSxTQUNKOzsyRUFESSxxQkFFSixZQURBOztBQUVULGNBQUssU0FBTCxHQUFlLEVBQWYsQ0FGUztBQUdULGNBQUssU0FBTCxHQUFlLElBQWYsQ0FIUzs7S0FBYjs7aUJBRGlCOzswQ0FPUTtBQUNyQixnQkFBSSxJQUFFLEtBQUssTUFBTCxDQURlOzs4Q0FBTjs7YUFBTTs7QUFFckIsbUJBQU0sQ0FBTixFQUFRO0FBQ0osb0JBQUcsTUFBTSxNQUFOLENBQWEsVUFBQyxJQUFEOzJCQUFRLGFBQWEsSUFBYjtpQkFBUixDQUFiLENBQXdDLE1BQXhDLEVBQ0MsT0FBTyxDQUFQLENBREosS0FHSSxJQUFFLEVBQUUsTUFBRixDQUhOO2FBREo7QUFNQSxrQkFBTSxJQUFJLEtBQUosQ0FBVSxtREFBaUQsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFqRSxDQVJxQjs7OztnQ0FXbEI7QUFDSCx1Q0FuQmEsNkNBbUJiLENBREc7QUFFSCxpQkFBSyxTQUFMLENBQWUsU0FBZixDQUF5QixJQUF6QixDQUE4QixJQUE5QixFQUZHOzs7O3dDQWVLO0FBQ1IsbUJBQU8sS0FBUCxDQURROzs7OzRCQVZGO0FBQ04sZ0JBQUcsQ0FBQyxLQUFLLEdBQUwsRUFDQSxPQUFPLEVBQVAsQ0FESjtBQUVBLHlCQUFXLEtBQUssR0FBTCxTQUFZLEtBQUssU0FBTCxDQUFlLEdBQWYsQ0FBbUIsVUFBQyxDQUFEO3VCQUFLLEVBQUUsSUFBRjthQUFMLENBQW5CLENBQWdDLElBQWhDLENBQXFDLE1BQXJDLFdBQWlELEtBQUssR0FBTCxNQUF4RSxDQUhNOzs7OzRCQU1BO0FBQ04sd0JBQVUsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixVQUFDLENBQUQ7dUJBQUssRUFBRSxJQUFGO2FBQUwsQ0FBbkIsQ0FBZ0MsSUFBaEMsQ0FBcUMsRUFBckMsQ0FBVixDQURNOzs7O1dBN0JPIiwiZmlsZSI6InZpc2l0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSWdub3JlIGZyb20gXCIuL2lnbm9yZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXNpdG9yIGV4dGVuZHMgSWdub3Jle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW49W11cclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj1udWxsXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFR5cGVkUGFyZW50KC4uLlR5cGVzKXtcclxuICAgICAgICB2YXIgcD10aGlzLnBhcmVudFxyXG4gICAgICAgIHdoaWxlKHApe1xyXG4gICAgICAgICAgICBpZihUeXBlcy5maWx0ZXIoKFR5cGUpPT5wIGluc3RhbmNlb2YgVHlwZSkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcD1wLnBhcmVudFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyBzdHJ1Y3R1cmU6IGNhbiBub3QgZmluZCBjb250YWluZXIgZm9yIGEgXCIrdGhpcy5zcmNNb2RlbC50eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIHZpc2l0KCl7XHJcbiAgICAgICAgc3VwZXIudmlzaXQoKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLl9jaGlsZHJlbi5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBpZighdGhpcy50YWcpXHJcbiAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy50YWd9PiR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXFxyXFxuXCIpfTwvJHt0aGlzLnRhZ30+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0ZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEudGV4dCkuam9pbignJyl9YFxyXG4gICAgfVxyXG5cdFxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSJdfQ==