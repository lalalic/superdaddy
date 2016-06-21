"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _model = require("docx4js/lib/openxml/docx/model");

var _model2 = _interopRequireDefault(_model);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IS = /^\[.*\]$/g;
/**
 *
 * [key:alt:reward]
 */

var Step = function (_P) {
    _inherits(Step, _P);

    function Step(wordModel) {
        _classCallCheck(this, Step);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Step).apply(this, arguments));

        wordModel.wXml.textContent.trim().replace(/^\[(.*)\]$/g, function (a, content) {
            var _content$split = content.split(":");

            var _content$split2 = _slicedToArray(_content$split, 3);

            var key = _content$split2[0];
            var alt = _content$split2[1];
            var _content$split2$ = _content$split2[2];
            var reward = _content$split2$ === undefined ? "1" : _content$split2$;

            _this._info = { key: key, alt: alt, reward: parseInt(reward) };
            _this.findTypedParent(_document2.default).addStep(_this._info);
        });
        return _this;
    }

    _createClass(Step, [{
        key: "visit",
        value: function visit() {
            _get(Object.getPrototypeOf(Step.prototype), "visit", this).apply(this, arguments);
            return false; //not visit children
        }
    }, {
        key: "html",
        get: function get() {
            var _info = this._info;
            var key = _info.key;
            var alt = _info.alt;

            return "<" + this.tag + " class=\"step\">" + (alt || key) + "</" + this.tag + ">";
        }
    }], [{
        key: "is",
        value: function is(model) {
            if (model.type !== 'paragraph') return false;

            return IS.test(model.wXml.textContent.trim());
        }
    }]);

    return Step;
}(_p2.default);

Step.Model = function (_Base) {
    _inherits(_class, _Base);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, null, [{
        key: "type",
        get: function get() {
            return "step";
        }
    }]);

    return _class;
}(_model2.default);

exports.default = Step;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9zdGVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxLQUFHLFdBQUg7Ozs7OztJQUtlOzs7QUFDakIsYUFEaUIsSUFDakIsQ0FBWSxTQUFaLEVBQXNCOzhCQURMLE1BQ0s7OzJFQURMLGtCQUVKLFlBRFM7O0FBRWxCLGtCQUFVLElBQVYsQ0FBZSxXQUFmLENBQTJCLElBQTNCLEdBQ0ssT0FETCxDQUNhLGFBRGIsRUFDNEIsVUFBQyxDQUFELEVBQUksT0FBSixFQUFjO2lDQUNQLFFBQVEsS0FBUixDQUFjLEdBQWQsRUFETzs7OztnQkFDM0IseUJBRDJCO2dCQUN2Qix5QkFEdUI7O2dCQUNuQiwwQ0FBTyx1QkFEWTs7QUFFbEMsa0JBQUssS0FBTCxHQUFXLEVBQUMsUUFBRCxFQUFNLFFBQU4sRUFBVyxRQUFPLFNBQVMsTUFBVCxDQUFQLEVBQXRCLENBRmtDO0FBR2xDLGtCQUFLLGVBQUwscUJBQStCLE9BQS9CLENBQXVDLE1BQUssS0FBTCxDQUF2QyxDQUhrQztTQUFkLENBRDVCLENBRmtCOztLQUF0Qjs7aUJBRGlCOztnQ0FnQlY7QUFDSCx1Q0FqQmEsNENBaUJFLFVBQWYsQ0FERztBQUVILG1CQUFPLEtBQVA7QUFGRzs7OzRCQUxHO3dCQUNVLEtBQUssS0FBTCxDQURWO2dCQUNDLGdCQUREO2dCQUNLLGdCQURMOztBQUVOLHlCQUFXLEtBQUssR0FBTCx5QkFBeUIsT0FBSyxHQUFMLFdBQWEsS0FBSyxHQUFMLE1BQWpELENBRk07Ozs7MkJBV0EsT0FBTTtBQUNaLGdCQUFHLE1BQU0sSUFBTixLQUFhLFdBQWIsRUFDQyxPQUFPLEtBQVAsQ0FESjs7QUFHQSxtQkFBTyxHQUFHLElBQUgsQ0FBUSxNQUFNLElBQU4sQ0FBVyxXQUFYLENBQXVCLElBQXZCLEVBQVIsQ0FBUCxDQUpZOzs7O1dBdEJDOzs7S0E2QlY7Ozs7Ozs7Ozs7OzRCQUNjO0FBQUMsbUJBQU8sTUFBUCxDQUFEOzs7Ozs7O2tCQTlCSiIsImZpbGUiOiJzdGVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcImRvY3g0anMvbGliL29wZW54bWwvZG9jeC9tb2RlbFwiXG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnLi9kb2N1bWVudCdcbmltcG9ydCBQIGZyb20gXCIuL3BcIlxuXG5jb25zdCBJUz0vXlxcWy4qXFxdJC9nXG4vKipcbiAqXG4gKiBba2V5OmFsdDpyZXdhcmRdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBQe1xuICAgIGNvbnN0cnVjdG9yKHdvcmRNb2RlbCl7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICAgICAgd29yZE1vZGVsLndYbWwudGV4dENvbnRlbnQudHJpbSgpXG4gICAgICAgICAgICAucmVwbGFjZSgvXlxcWyguKilcXF0kL2csIChhLCBjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IFtrZXksYWx0LHJld2FyZD1cIjFcIl09Y29udGVudC5zcGxpdChcIjpcIilcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmZvPXtrZXksIGFsdCwgcmV3YXJkOnBhcnNlSW50KHJld2FyZCl9XG4gICAgICAgICAgICAgICAgdGhpcy5maW5kVHlwZWRQYXJlbnQoZG9jdW1lbnQpLmFkZFN0ZXAodGhpcy5faW5mbylcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0IGh0bWwoKXtcbiAgICAgICAgY29uc3Qge2tleSxhbHR9PXRoaXMuX2luZm9cbiAgICAgICAgcmV0dXJuIGA8JHt0aGlzLnRhZ30gY2xhc3M9XCJzdGVwXCI+JHthbHR8fGtleX08LyR7dGhpcy50YWd9PmBcbiAgICB9XG5cbiAgICB2aXNpdCgpe1xuICAgICAgICBzdXBlci52aXNpdCguLi5hcmd1bWVudHMpXG4gICAgICAgIHJldHVybiBmYWxzZS8vbm90IHZpc2l0IGNoaWxkcmVuXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXMobW9kZWwpe1xuICAgICAgICBpZihtb2RlbC50eXBlIT09J3BhcmFncmFwaCcpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2Vcblx0XHRcbiAgICAgICAgcmV0dXJuIElTLnRlc3QobW9kZWwud1htbC50ZXh0Q29udGVudC50cmltKCkpXG4gICAgfVxuXG4gICAgc3RhdGljIE1vZGVsPWNsYXNzIGV4dGVuZHMgQmFzZXtcbiAgICAgICAgc3RhdGljIGdldCB0eXBlKCl7cmV0dXJuIFwic3RlcFwifVxuICAgIH1cbn1cbiJdfQ==