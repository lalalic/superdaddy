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

        var _this = _possibleConstructorReturn(this, (document.__proto__ || Object.getPrototypeOf(document)).apply(this, arguments));

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFyZ3VtZW50cyIsIl9jaGlsZHJlbiIsImltYWdlcyIsInN0ZXBzIiwiX2lkIiwiRGF0ZSIsIm5vdyIsInN0ZXAiLCJwdXNoIiwibWFwIiwiYSIsImh0bWwiLCJqb2luIiwic3JjTW9kZWwiLCJ3RG9jIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7O0FBQ2pCLHdCQUFhO0FBQUE7O0FBQUEseUhBQ0FDLFNBREE7O0FBRVQsY0FBS0MsU0FBTCxHQUFlLEVBQWY7QUFDQSxjQUFLQyxNQUFMLEdBQVksRUFBWjtBQUNBLGNBQUtDLEtBQUwsR0FBVyxFQUFYO0FBQ0EsY0FBS0MsR0FBTCxhQUFpQkMsS0FBS0MsR0FBTCxFQUFqQjtBQUxTO0FBTVo7Ozs7d0NBVVc7QUFDUixtQkFBTyxLQUFQO0FBQ0g7OztnQ0FFT0MsSSxFQUFLO0FBQ1QsaUJBQUtKLEtBQUwsQ0FBV0ssSUFBWCxDQUFnQkQsSUFBaEI7QUFDSDs7OzRCQWRTO0FBQ04sa0NBQW1CLEtBQUtILEdBQXhCLFdBQWdDLEtBQUtILFNBQUwsQ0FBZVEsR0FBZixDQUFtQixVQUFDQyxDQUFEO0FBQUEsdUJBQUtBLEVBQUVDLElBQVA7QUFBQSxhQUFuQixFQUFnQ0MsSUFBaEMsQ0FBcUMsRUFBckMsQ0FBaEM7QUFDSDs7OzRCQUVlO0FBQ1osbUJBQU8sS0FBS0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CQyxLQUExQjtBQUNIOzs7Ozs7a0JBZmdCaEIsUSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaWdub3JlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50IGV4dGVuZHMgSWdub3Jle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW49W11cclxuICAgICAgICB0aGlzLmltYWdlcz1bXVxyXG4gICAgICAgIHRoaXMuc3RlcHM9W11cclxuICAgICAgICB0aGlzLl9pZD1gZG9jeF8ke0RhdGUubm93KCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiJHt0aGlzLl9pZH1cIj4ke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEuaHRtbCkuam9pbihcIlwiKX08L2Rpdj5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByb3BlcnRpZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC53RG9jLnByb3BzXHJcbiAgICB9XHJcblxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdGVwKHN0ZXApe1xyXG4gICAgICAgIHRoaXMuc3RlcHMucHVzaChzdGVwKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==