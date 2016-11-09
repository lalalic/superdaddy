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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Step).apply(this, arguments));

        wordModel.wXml.textContent.trim().replace(/^\[(.*)\]$/g, function (a, content) {
            var _content$split = content.split(":");

            var _content$split2 = (0, _slicedToArray3.default)(_content$split, 3);

            var key = _content$split2[0];
            var alt = _content$split2[1];
            var _content$split2$ = _content$split2[2];
            var reward = _content$split2$ === undefined ? "1" : _content$split2$;

            _this._info = { key: key, alt: alt, reward: parseInt(reward) };
            _this.findTypedParent(_document2.default).addStep(_this._info);
        });
        return _this;
    }

    (0, _createClass3.default)(Step, [{
        key: "visit",
        value: function visit() {
            (0, _get3.default)((0, _getPrototypeOf2.default)(Step.prototype), "visit", this).apply(this, arguments);
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
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9zdGVwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sS0FBRyxXQUFIOzs7Ozs7SUFLZTs7O0FBQ2pCLGFBRGlCLElBQ2pCLENBQVksU0FBWixFQUFzQjs0Q0FETCxNQUNLOztpR0FETCxrQkFFSixZQURTOztBQUVsQixrQkFBVSxJQUFWLENBQWUsV0FBZixDQUEyQixJQUEzQixHQUNLLE9BREwsQ0FDYSxhQURiLEVBQzRCLFVBQUMsQ0FBRCxFQUFJLE9BQUosRUFBYztpQ0FDUCxRQUFRLEtBQVIsQ0FBYyxHQUFkLEVBRE87Ozs7Z0JBQzNCLHlCQUQyQjtnQkFDdkIseUJBRHVCOztnQkFDbkIsMENBQU8sdUJBRFk7O0FBRWxDLGtCQUFLLEtBQUwsR0FBVyxFQUFDLFFBQUQsRUFBTSxRQUFOLEVBQVcsUUFBTyxTQUFTLE1BQVQsQ0FBUCxFQUF0QixDQUZrQztBQUdsQyxrQkFBSyxlQUFMLHFCQUErQixPQUEvQixDQUF1QyxNQUFLLEtBQUwsQ0FBdkMsQ0FIa0M7U0FBZCxDQUQ1QixDQUZrQjs7S0FBdEI7OytCQURpQjs7Z0NBZ0JWO0FBQ0gsNkRBakJhLDRDQWlCRSxVQUFmLENBREc7QUFFSCxtQkFBTyxLQUFQO0FBRkc7Ozs0QkFMRzt3QkFDVSxLQUFLLEtBQUwsQ0FEVjtnQkFDQyxnQkFERDtnQkFDSyxnQkFETDs7QUFFTix5QkFBVyxLQUFLLEdBQUwseUJBQXlCLE9BQUssR0FBTCxXQUFhLEtBQUssR0FBTCxNQUFqRCxDQUZNOzs7OzJCQVdBLE9BQU07QUFDWixnQkFBRyxNQUFNLElBQU4sS0FBYSxXQUFiLEVBQ0MsT0FBTyxLQUFQLENBREo7O0FBR0EsbUJBQU8sR0FBRyxJQUFILENBQVEsTUFBTSxJQUFOLENBQVcsV0FBWCxDQUF1QixJQUF2QixFQUFSLENBQVAsQ0FKWTs7O1dBdEJDOzs7S0E2QlY7Ozs7Ozs7Ozs7NEJBQ2M7QUFBQyxtQkFBTyxNQUFQLENBQUQ7Ozs7OztrQkE5QkoiLCJmaWxlIjoic3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCJkb2N4NGpzL2xpYi9vcGVueG1sL2RvY3gvbW9kZWxcIlxuaW1wb3J0IGRvY3VtZW50IGZyb20gJy4vZG9jdW1lbnQnXG5pbXBvcnQgUCBmcm9tIFwiLi9wXCJcblxuY29uc3QgSVM9L15cXFsuKlxcXSQvZ1xuLyoqXG4gKlxuICogW2tleTphbHQ6cmV3YXJkXVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgUHtcbiAgICBjb25zdHJ1Y3Rvcih3b3JkTW9kZWwpe1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgICAgIHdvcmRNb2RlbC53WG1sLnRleHRDb250ZW50LnRyaW0oKVxuICAgICAgICAgICAgLnJlcGxhY2UoL15cXFsoLiopXFxdJC9nLCAoYSwgY29udGVudCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBba2V5LGFsdCxyZXdhcmQ9XCIxXCJdPWNvbnRlbnQuc3BsaXQoXCI6XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5faW5mbz17a2V5LCBhbHQsIHJld2FyZDpwYXJzZUludChyZXdhcmQpfVxuICAgICAgICAgICAgICAgIHRoaXMuZmluZFR5cGVkUGFyZW50KGRvY3VtZW50KS5hZGRTdGVwKHRoaXMuX2luZm8pXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldCBodG1sKCl7XG4gICAgICAgIGNvbnN0IHtrZXksYWx0fT10aGlzLl9pbmZvXG4gICAgICAgIHJldHVybiBgPCR7dGhpcy50YWd9IGNsYXNzPVwic3RlcFwiPiR7YWx0fHxrZXl9PC8ke3RoaXMudGFnfT5gXG4gICAgfVxuXG4gICAgdmlzaXQoKXtcbiAgICAgICAgc3VwZXIudmlzaXQoLi4uYXJndW1lbnRzKVxuICAgICAgICByZXR1cm4gZmFsc2UvL25vdCB2aXNpdCBjaGlsZHJlblxuICAgIH1cblxuXG4gICAgc3RhdGljIGlzKG1vZGVsKXtcbiAgICAgICAgaWYobW9kZWwudHlwZSE9PSdwYXJhZ3JhcGgnKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cdFx0XG4gICAgICAgIHJldHVybiBJUy50ZXN0KG1vZGVsLndYbWwudGV4dENvbnRlbnQudHJpbSgpKVxuICAgIH1cblxuICAgIHN0YXRpYyBNb2RlbD1jbGFzcyBleHRlbmRzIEJhc2V7XG4gICAgICAgIHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBcInN0ZXBcIn1cbiAgICB9XG59XG4iXX0=