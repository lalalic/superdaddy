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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFyZ3VtZW50cyIsIl9jaGlsZHJlbiIsImltYWdlcyIsInN0ZXBzIiwiX2lkIiwiRGF0ZSIsIm5vdyIsInN0ZXAiLCJwdXNoIiwibWFwIiwiYSIsImh0bWwiLCJqb2luIiwic3JjTW9kZWwiLCJ3RG9jIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsUTs7O0FBQ2pCLHdCQUFhO0FBQUE7O0FBQUEsK0lBQ0FDLFNBREE7O0FBRVQsY0FBS0MsU0FBTCxHQUFlLEVBQWY7QUFDQSxjQUFLQyxNQUFMLEdBQVksRUFBWjtBQUNBLGNBQUtDLEtBQUwsR0FBVyxFQUFYO0FBQ0EsY0FBS0MsR0FBTCxhQUFpQkMsS0FBS0MsR0FBTCxFQUFqQjtBQUxTO0FBTVo7Ozs7d0NBVVc7QUFDUixtQkFBTyxLQUFQO0FBQ0g7OztnQ0FFT0MsSSxFQUFLO0FBQ1QsaUJBQUtKLEtBQUwsQ0FBV0ssSUFBWCxDQUFnQkQsSUFBaEI7QUFDSDs7OzRCQWRTO0FBQ04sa0NBQW1CLEtBQUtILEdBQXhCLFdBQWdDLEtBQUtILFNBQUwsQ0FBZVEsR0FBZixDQUFtQixVQUFDQyxDQUFEO0FBQUEsdUJBQUtBLEVBQUVDLElBQVA7QUFBQSxhQUFuQixFQUFnQ0MsSUFBaEMsQ0FBcUMsRUFBckMsQ0FBaEM7QUFDSDs7OzRCQUVlO0FBQ1osbUJBQU8sS0FBS0MsUUFBTCxDQUFjQyxJQUFkLENBQW1CQyxLQUExQjtBQUNIOzs7OztrQkFmZ0JoQixRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9pZ25vcmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnQgZXh0ZW5kcyBJZ25vcmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbj1bXVxyXG4gICAgICAgIHRoaXMuaW1hZ2VzPVtdXHJcbiAgICAgICAgdGhpcy5zdGVwcz1bXVxyXG4gICAgICAgIHRoaXMuX2lkPWBkb2N4XyR7RGF0ZS5ub3coKX1gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICByZXR1cm4gYDxkaXYgaWQ9XCIke3RoaXMuX2lkfVwiPiR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXCIpfTwvZGl2PmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJvcGVydGllcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNyY01vZGVsLndEb2MucHJvcHNcclxuICAgIH1cclxuXHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFN0ZXAoc3RlcCl7XHJcbiAgICAgICAgdGhpcy5zdGVwcy5wdXNoKHN0ZXApXHJcbiAgICB9XHJcbn1cclxuIl19