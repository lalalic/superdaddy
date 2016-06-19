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
        value: function addStep(key, alt) {
            this.steps.push({ key: key, alt: alt });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixRQUNqQixHQUFhOzhCQURJLFVBQ0o7OzJFQURJLHNCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsRUFBZixDQUZTO0FBR1QsY0FBSyxNQUFMLEdBQVksRUFBWixDQUhTO0FBSVQsY0FBSyxLQUFMLEdBQVcsRUFBWCxDQUpTO0FBS1QsY0FBSyxHQUFMLGFBQWlCLEtBQUssR0FBTCxFQUFqQixDQUxTOztLQUFiOztpQkFEaUI7O3dDQWlCTDtBQUNSLG1CQUFPLEtBQVAsQ0FEUTs7OztnQ0FJSixLQUFLLEtBQUk7QUFDYixpQkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixFQUFDLFFBQUQsRUFBSyxRQUFMLEVBQWhCLEVBRGE7Ozs7NEJBWlA7QUFDTixrQ0FBbUIsS0FBSyxHQUFMLFdBQWEsS0FBSyxTQUFMLENBQWUsR0FBZixDQUFtQixVQUFDLENBQUQ7dUJBQUssRUFBRSxJQUFGO2FBQUwsQ0FBbkIsQ0FBZ0MsSUFBaEMsQ0FBcUMsRUFBckMsWUFBaEMsQ0FETTs7Ozs0QkFJTTtBQUNaLG1CQUFPLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsS0FBbkIsQ0FESzs7OztXQWJDIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElnbm9yZSBmcm9tIFwiLi9pZ25vcmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnQgZXh0ZW5kcyBJZ25vcmV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLl9jaGlsZHJlbj1bXVxyXG4gICAgICAgIHRoaXMuaW1hZ2VzPVtdXHJcbiAgICAgICAgdGhpcy5zdGVwcz1bXVxyXG4gICAgICAgIHRoaXMuX2lkPWBkb2N4XyR7RGF0ZS5ub3coKX1gXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICByZXR1cm4gYDxkaXYgaWQ9XCIke3RoaXMuX2lkfVwiPiR7dGhpcy5fY2hpbGRyZW4ubWFwKChhKT0+YS5odG1sKS5qb2luKFwiXCIpfTwvZGl2PmBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcHJvcGVydGllcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNyY01vZGVsLndEb2MucHJvcHNcclxuICAgIH1cclxuXHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFN0ZXAoa2V5LCBhbHQpe1xyXG4gICAgICAgIHRoaXMuc3RlcHMucHVzaCh7a2V5LGFsdH0pXHJcbiAgICB9XHJcbn1cclxuIl19