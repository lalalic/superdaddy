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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(document).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixRQUNqQixHQUFhOzRDQURJLFVBQ0o7O2lHQURJLHNCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxNQUFMLEdBQVksRUFBWixDQUhTO0FBSVQsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUpTO0FBS1QsY0FBSyxHQUFMLGFBQWlCLEtBQUssR0FBTCxFQUFqQixDQUxTOztLQUFiOzsrQkFEaUI7O3dDQWlCTDtBQUNSLG1CQUFPLEtBQVAsQ0FEUTs7OztnQ0FJSixNQUFLO0FBQ1QsaUJBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsSUFBaEIsRUFEUzs7Ozs0QkFaSDtBQUNOLGtDQUFtQixLQUFLLEdBQUwsV0FBYSxLQUFLLFNBQUwsQ0FBZSxHQUFmLENBQW1CLFVBQUMsQ0FBRDt1QkFBSyxFQUFFLElBQUY7YUFBTCxDQUFuQixDQUFnQyxJQUFoQyxDQUFxQyxFQUFyQyxZQUFoQyxDQURNOzs7OzRCQUlNO0FBQ1osbUJBQU8sS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixLQUFuQixDQURLOzs7V0FiQyIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJZ25vcmUgZnJvbSBcIi4vaWdub3JlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50IGV4dGVuZHMgSWdub3Jle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5fY2hpbGRyZW49W11cclxuICAgICAgICB0aGlzLmltYWdlcz1bXVxyXG4gICAgICAgIHRoaXMuc3RlcHM9W11cclxuICAgICAgICB0aGlzLl9pZD1gZG9jeF8ke0RhdGUubm93KCl9YFxyXG4gICAgfVxyXG5cclxuICAgIGdldCBodG1sKCl7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGlkPVwiJHt0aGlzLl9pZH1cIj4ke3RoaXMuX2NoaWxkcmVuLm1hcCgoYSk9PmEuaHRtbCkuam9pbihcIlwiKX08L2Rpdj5gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHByb3BlcnRpZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC53RG9jLnByb3BzXHJcbiAgICB9XHJcblxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBhZGRTdGVwKHN0ZXApe1xyXG4gICAgICAgIHRoaXMuc3RlcHMucHVzaChzdGVwKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==