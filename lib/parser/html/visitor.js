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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC92aXNpdG9yLmpzIl0sIm5hbWVzIjpbIlZpc2l0b3IiLCJhcmd1bWVudHMiLCJfY2hpbGRyZW4iLCJjb250YWluZXIiLCJwIiwicGFyZW50IiwiVHlwZXMiLCJmaWx0ZXIiLCJUeXBlIiwibGVuZ3RoIiwiRXJyb3IiLCJzcmNNb2RlbCIsInR5cGUiLCJwdXNoIiwidGFnIiwibWFwIiwiYSIsImh0bWwiLCJqb2luIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTzs7O0FBQ2pCLHVCQUFhO0FBQUE7O0FBQUEsNklBQ0FDLFNBREE7O0FBRVQsY0FBS0MsU0FBTCxHQUFlLEVBQWY7QUFDQSxjQUFLQyxTQUFMLEdBQWUsSUFBZjtBQUhTO0FBSVo7Ozs7MENBRXdCO0FBQ3JCLGdCQUFJQyxJQUFFLEtBQUtDLE1BQVg7O0FBRHFCLDhDQUFOQyxLQUFNO0FBQU5BLHFCQUFNO0FBQUE7O0FBRXJCLG1CQUFNRixDQUFOLEVBQVE7QUFDSixvQkFBR0UsTUFBTUMsTUFBTixDQUFhLFVBQUNDLElBQUQ7QUFBQSwyQkFBUUosYUFBYUksSUFBckI7QUFBQSxpQkFBYixFQUF3Q0MsTUFBM0MsRUFDSSxPQUFPTCxDQUFQLENBREosS0FHSUEsSUFBRUEsRUFBRUMsTUFBSjtBQUNQO0FBQ0Qsa0JBQU0sSUFBSUssS0FBSixDQUFVLG1EQUFpRCxLQUFLQyxRQUFMLENBQWNDLElBQXpFLENBQU47QUFDSDs7O2dDQUVNO0FBQ0g7QUFDQSxpQkFBS1QsU0FBTCxDQUFlRCxTQUFmLENBQXlCVyxJQUF6QixDQUE4QixJQUE5QjtBQUNIOzs7d0NBWVc7QUFDUixtQkFBTyxLQUFQO0FBQ0g7Ozs0QkFaUztBQUNOLGdCQUFHLENBQUMsS0FBS0MsR0FBVCxFQUNJLE9BQU8sRUFBUDtBQUNKLHlCQUFXLEtBQUtBLEdBQWhCLFNBQXVCLEtBQUtaLFNBQUwsQ0FBZWEsR0FBZixDQUFtQixVQUFDQyxDQUFEO0FBQUEsdUJBQUtBLEVBQUVDLElBQVA7QUFBQSxhQUFuQixFQUFnQ0MsSUFBaEMsQ0FBcUMsTUFBckMsQ0FBdkIsVUFBd0UsS0FBS0osR0FBN0U7QUFDSDs7OzRCQUVTO0FBQ04sd0JBQVUsS0FBS1osU0FBTCxDQUFlYSxHQUFmLENBQW1CLFVBQUNDLENBQUQ7QUFBQSx1QkFBS0EsRUFBRUcsSUFBUDtBQUFBLGFBQW5CLEVBQWdDRCxJQUFoQyxDQUFxQyxFQUFyQyxDQUFWO0FBQ0g7Ozs7O2tCQS9CZ0JsQixPIiwiZmlsZSI6InZpc2l0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSWdub3JlIGZyb20gXCIuL2lnbm9yZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXNpdG9yIGV4dGVuZHMgSWdub3Jle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW49W11cclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj1udWxsXHJcbiAgICB9XHJcblxyXG4gICAgZmluZFR5cGVkUGFyZW50KC4uLlR5cGVzKXtcclxuICAgICAgICB2YXIgcD10aGlzLnBhcmVudFxyXG4gICAgICAgIHdoaWxlKHApe1xyXG4gICAgICAgICAgICBpZihUeXBlcy5maWx0ZXIoKFR5cGUpPT5wIGluc3RhbmNlb2YgVHlwZSkubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcD1wLnBhcmVudFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXcm9uZyBzdHJ1Y3R1cmU6IGNhbiBub3QgZmluZCBjb250YWluZXIgZm9yIGEgXCIrdGhpcy5zcmNNb2RlbC50eXBlKVxyXG4gICAgfVxyXG5cclxuICAgIHZpc2l0KCl7XHJcbiAgICAgICAgc3VwZXIudmlzaXQoKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLl9jaGlsZHJlbi5wdXNoKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICBpZighdGhpcy50YWcpXHJcbiAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy50YWd9PiR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXFxyXFxuXCIpfTwvJHt0aGlzLnRhZ30+YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCB0ZXh0KCl7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEudGV4dCkuam9pbignJyl9YFxyXG4gICAgfVxyXG5cdFxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSJdfQ==