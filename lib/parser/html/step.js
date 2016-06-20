"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _docx4js = require("docx4js");

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * [key:alt:reward]
 */

var Step = function (_P) {
    _inherits(Step, _P);

    function Step(wordModel) {
        _classCallCheck(this, Step);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Step).apply(this, arguments));

        wordModel.textContent.trim().replace(/^\[(.*)\]$/g, function (a, content) {
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

            return "<" + this.tag + " className=\"step\">" + (alt || key) + "</" + this.tag + ">";
        }
    }], [{
        key: "is",
        value: function is(wordModel) {
            if (wordModel.type !== 'paragraph') return false;

            return wordModel.textContent.trim().test(/^\[.*\]$/g);
        }
    }]);

    return Step;
}(_p2.default);

Step.Model = function (_Any) {
    _inherits(_class, _Any);

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
}(_docx4js.Visitor);

exports.default = Step;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9zdGVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBTXFCOzs7QUFDakIsYUFEaUIsSUFDakIsQ0FBWSxTQUFaLEVBQXNCOzhCQURMLE1BQ0s7OzJFQURMLGtCQUVKLFlBRFM7O0FBRWxCLGtCQUFVLFdBQVYsQ0FBc0IsSUFBdEIsR0FDSyxPQURMLENBQ2EsYUFEYixFQUM0QixVQUFDLENBQUQsRUFBSSxPQUFKLEVBQWM7aUNBQ1AsUUFBUSxLQUFSLENBQWMsR0FBZCxFQURPOzs7O2dCQUMzQix5QkFEMkI7Z0JBQ3ZCLHlCQUR1Qjs7Z0JBQ25CLDBDQUFPLHVCQURZOztBQUVsQyxrQkFBSyxLQUFMLEdBQVcsRUFBQyxRQUFELEVBQU0sUUFBTixFQUFXLFFBQU8sU0FBUyxNQUFULENBQVAsRUFBdEIsQ0FGa0M7QUFHbEMsa0JBQUssZUFBTCxxQkFBK0IsT0FBL0IsQ0FBdUMsTUFBSyxLQUFMLENBQXZDLENBSGtDO1NBQWQsQ0FENUIsQ0FGa0I7O0tBQXRCOztpQkFEaUI7O2dDQWdCVjtBQUNILHVDQWpCYSw0Q0FpQkUsVUFBZixDQURHO0FBRUgsbUJBQU8sS0FBUDtBQUZHOzs7NEJBTEc7d0JBQ1UsS0FBSyxLQUFMLENBRFY7Z0JBQ0MsZ0JBREQ7Z0JBQ0ssZ0JBREw7O0FBRU4seUJBQVcsS0FBSyxHQUFMLDZCQUE2QixPQUFLLEdBQUwsV0FBYSxLQUFLLEdBQUwsTUFBckQsQ0FGTTs7OzsyQkFXQSxXQUFVO0FBQ2hCLGdCQUFHLFVBQVUsSUFBVixLQUFpQixXQUFqQixFQUNDLE9BQU8sS0FBUCxDQURKOztBQUdBLG1CQUFPLFVBQVUsV0FBVixDQUFzQixJQUF0QixHQUE2QixJQUE3QixDQUFrQyxXQUFsQyxDQUFQLENBSmdCOzs7O1dBdEJIOzs7S0E2QlY7Ozs7Ozs7Ozs7OzRCQUNjO0FBQUMsbUJBQU8sTUFBUCxDQUFEOzs7Ozs7O2tCQTlCSiIsImZpbGUiOiJzdGVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaXNpdG9yIGFzIEFueX0gZnJvbSBcImRvY3g0anNcIlxuaW1wb3J0IGRvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnXG5pbXBvcnQgUCBmcm9tIFwiLi9wXCJcblxuLyoqXG4gKlxuICogW2tleTphbHQ6cmV3YXJkXVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgUHtcbiAgICBjb25zdHJ1Y3Rvcih3b3JkTW9kZWwpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHdvcmRNb2RlbC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvZywgKGEsIGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgW2tleSxhbHQscmV3YXJkPVwiMVwiXT1jb250ZW50LnNwbGl0KFwiOlwiKVxuICAgICAgICAgICAgICAgIHRoaXMuX2luZm89e2tleSwgYWx0LCByZXdhcmQ6cGFyc2VJbnQocmV3YXJkKX1cbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRUeXBlZFBhcmVudChkb2N1bWVudCkuYWRkU3RlcCh0aGlzLl9pbmZvKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgaHRtbCgpe1xuICAgICAgICBjb25zdCB7a2V5LGFsdH09dGhpcy5faW5mb1xuICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfSBjbGFzc05hbWU9XCJzdGVwXCI+JHthbHR8fGtleX08LyR7dGhpcy50YWd9PmBcbiAgICB9XG5cbiAgICB2aXNpdCgpe1xuICAgICAgICBzdXBlci52aXNpdCguLi5hcmd1bWVudHMpXG4gICAgICAgIHJldHVybiBmYWxzZS8vbm90IHZpc2l0IGNoaWxkcmVuXG4gICAgfVxuXG5cbiAgICBzdGF0aWMgaXMod29yZE1vZGVsKXtcbiAgICAgICAgaWYod29yZE1vZGVsLnR5cGUhPT0ncGFyYWdyYXBoJylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB3b3JkTW9kZWwudGV4dENvbnRlbnQudHJpbSgpLnRlc3QoL15cXFsuKlxcXSQvZylcbiAgICB9XG5cbiAgICBzdGF0aWMgTW9kZWw9Y2xhc3MgZXh0ZW5kcyBBbnl7XG4gICAgICAgIHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBcInN0ZXBcIn1cbiAgICB9XG59XG4iXX0=