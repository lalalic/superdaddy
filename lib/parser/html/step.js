"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _model = require("docx4js/lib/openxml/docx/model");

var _model2 = _interopRequireDefault(_model);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IS = /^\[.*\]$/g;
/**
 *
 * [key:alt:reward]
 */

var Step = function (_P) {
    (0, _inherits3.default)(Step, _P);

    function Step(wordModel) {
        (0, _classCallCheck3.default)(this, Step);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Step.__proto__ || (0, _getPrototypeOf2.default)(Step)).apply(this, arguments));

        wordModel.wXml.textContent.trim().replace(/^\[(.*)\]$/g, function (a, content) {
            var _content$split = content.split(":"),
                _content$split2 = (0, _slicedToArray3.default)(_content$split, 3),
                key = _content$split2[0],
                alt = _content$split2[1],
                _content$split2$ = _content$split2[2],
                reward = _content$split2$ === undefined ? "1" : _content$split2$;

            _this._info = { key: key, alt: alt, reward: parseInt(reward) };
            _this.findTypedParent(_document2.default).addStep(_this._info);
        });
        return _this;
    }

    (0, _createClass3.default)(Step, [{
        key: "visit",
        value: function visit() {
            (0, _get3.default)(Step.prototype.__proto__ || (0, _getPrototypeOf2.default)(Step.prototype), "visit", this).apply(this, arguments);
            return false; //not visit children
        }
    }, {
        key: "html",
        get: function get() {
            var _info = this._info,
                key = _info.key,
                alt = _info.alt;

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
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
    }

    (0, _createClass3.default)(_class, null, [{
        key: "type",
        get: function get() {
            return "step";
        }
    }]);
    return _class;
}(_model2.default);

exports.default = Step;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9zdGVwLmpzIl0sIm5hbWVzIjpbIklTIiwiU3RlcCIsIndvcmRNb2RlbCIsImFyZ3VtZW50cyIsIndYbWwiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJyZXBsYWNlIiwiYSIsImNvbnRlbnQiLCJzcGxpdCIsImtleSIsImFsdCIsInJld2FyZCIsIl9pbmZvIiwicGFyc2VJbnQiLCJmaW5kVHlwZWRQYXJlbnQiLCJhZGRTdGVwIiwidGFnIiwibW9kZWwiLCJ0eXBlIiwidGVzdCIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxLQUFHLFdBQVQ7QUFDQTs7Ozs7SUFJcUJDLEk7OztBQUNqQixrQkFBWUMsU0FBWixFQUFzQjtBQUFBOztBQUFBLHVJQUNUQyxTQURTOztBQUVsQkQsa0JBQVVFLElBQVYsQ0FBZUMsV0FBZixDQUEyQkMsSUFBM0IsR0FDS0MsT0FETCxDQUNhLGFBRGIsRUFDNEIsVUFBQ0MsQ0FBRCxFQUFJQyxPQUFKLEVBQWM7QUFBQSxpQ0FDUEEsUUFBUUMsS0FBUixDQUFjLEdBQWQsQ0FETztBQUFBO0FBQUEsZ0JBQzNCQyxHQUQyQjtBQUFBLGdCQUN2QkMsR0FEdUI7QUFBQTtBQUFBLGdCQUNuQkMsTUFEbUIsb0NBQ1osR0FEWTs7QUFFbEMsa0JBQUtDLEtBQUwsR0FBVyxFQUFDSCxRQUFELEVBQU1DLFFBQU4sRUFBV0MsUUFBT0UsU0FBU0YsTUFBVCxDQUFsQixFQUFYO0FBQ0Esa0JBQUtHLGVBQUwscUJBQStCQyxPQUEvQixDQUF1QyxNQUFLSCxLQUE1QztBQUNILFNBTEw7QUFGa0I7QUFRckI7Ozs7Z0NBT007QUFDSCxxSUFBZVgsU0FBZjtBQUNBLG1CQUFPLEtBQVAsQ0FGRyxDQUVTO0FBQ2Y7Ozs0QkFSUztBQUFBLHdCQUNVLEtBQUtXLEtBRGY7QUFBQSxnQkFDQ0gsR0FERCxTQUNDQSxHQUREO0FBQUEsZ0JBQ0tDLEdBREwsU0FDS0EsR0FETDs7QUFFTix5QkFBVyxLQUFLTSxHQUFoQix5QkFBb0NOLE9BQUtELEdBQXpDLFdBQWlELEtBQUtPLEdBQXREO0FBQ0g7OzsyQkFRU0MsSyxFQUFNO0FBQ1osZ0JBQUdBLE1BQU1DLElBQU4sS0FBYSxXQUFoQixFQUNJLE9BQU8sS0FBUDs7QUFFSixtQkFBT3BCLEdBQUdxQixJQUFILENBQVFGLE1BQU1mLElBQU4sQ0FBV0MsV0FBWCxDQUF1QkMsSUFBdkIsRUFBUixDQUFQO0FBQ0g7Ozs7O0FBM0JnQkwsSSxDQTZCVnFCLEs7Ozs7Ozs7Ozs7NEJBQ2M7QUFBQyxtQkFBTyxNQUFQO0FBQWM7Ozs7O2tCQTlCbkJyQixJIiwiZmlsZSI6InN0ZXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiZG9jeDRqcy9saWIvb3BlbnhtbC9kb2N4L21vZGVsXCJcbmltcG9ydCBkb2N1bWVudCBmcm9tICcuL2RvY3VtZW50J1xuaW1wb3J0IFAgZnJvbSBcIi4vcFwiXG5cbmNvbnN0IElTPS9eXFxbLipcXF0kL2dcbi8qKlxuICpcbiAqIFtrZXk6YWx0OnJld2FyZF1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIFB7XG4gICAgY29uc3RydWN0b3Iod29yZE1vZGVsKXtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgICAgICB3b3JkTW9kZWwud1htbC50ZXh0Q29udGVudC50cmltKClcbiAgICAgICAgICAgIC5yZXBsYWNlKC9eXFxbKC4qKVxcXSQvZywgKGEsIGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgY29uc3QgW2tleSxhbHQscmV3YXJkPVwiMVwiXT1jb250ZW50LnNwbGl0KFwiOlwiKVxuICAgICAgICAgICAgICAgIHRoaXMuX2luZm89e2tleSwgYWx0LCByZXdhcmQ6cGFyc2VJbnQocmV3YXJkKX1cbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRUeXBlZFBhcmVudChkb2N1bWVudCkuYWRkU3RlcCh0aGlzLl9pbmZvKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXQgaHRtbCgpe1xuICAgICAgICBjb25zdCB7a2V5LGFsdH09dGhpcy5faW5mb1xuICAgICAgICByZXR1cm4gYDwke3RoaXMudGFnfSBjbGFzcz1cInN0ZXBcIj4ke2FsdHx8a2V5fTwvJHt0aGlzLnRhZ30+YFxuICAgIH1cblxuICAgIHZpc2l0KCl7XG4gICAgICAgIHN1cGVyLnZpc2l0KC4uLmFyZ3VtZW50cylcbiAgICAgICAgcmV0dXJuIGZhbHNlLy9ub3QgdmlzaXQgY2hpbGRyZW5cbiAgICB9XG5cblxuICAgIHN0YXRpYyBpcyhtb2RlbCl7XG4gICAgICAgIGlmKG1vZGVsLnR5cGUhPT0ncGFyYWdyYXBoJylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXHRcdFxuICAgICAgICByZXR1cm4gSVMudGVzdChtb2RlbC53WG1sLnRleHRDb250ZW50LnRyaW0oKSlcbiAgICB9XG5cbiAgICBzdGF0aWMgTW9kZWw9Y2xhc3MgZXh0ZW5kcyBCYXNle1xuICAgICAgICBzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gXCJzdGVwXCJ9XG4gICAgfVxufVxuIl19