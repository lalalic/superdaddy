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

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _hyperlink = require("./hyperlink");

var _hyperlink2 = _interopRequireDefault(_hyperlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var text = function (_Visitor) {
    (0, _inherits3.default)(text, _Visitor);

    function text() {
        (0, _classCallCheck3.default)(this, text);

        var _this = (0, _possibleConstructorReturn3.default)(this, (text.__proto__ || (0, _getPrototypeOf2.default)(text)).apply(this, arguments));

        _this.container = _this.findTypedParent(_hyperlink2.default, _p2.default);
        return _this;
    }

    (0, _createClass3.default)(text, [{
        key: "html",
        get: function get() {
            return this.text;
        }
    }, {
        key: "text",
        get: function get() {
            return this.srcModel.getText();
        }
    }]);
    return text;
}(_visitor2.default);

exports.default = text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZXh0LmpzIl0sIm5hbWVzIjpbInRleHQiLCJhcmd1bWVudHMiLCJjb250YWluZXIiLCJmaW5kVHlwZWRQYXJlbnQiLCJzcmNNb2RlbCIsImdldFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEk7OztBQUNqQixvQkFBYTtBQUFBOztBQUFBLHVJQUNBQyxTQURBOztBQUVULGNBQUtDLFNBQUwsR0FBZSxNQUFLQyxlQUFMLGtDQUFmO0FBRlM7QUFHWjs7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUtILElBQVo7QUFDSDs7OzRCQUVTO0FBQ04sbUJBQU8sS0FBS0ksUUFBTCxDQUFjQyxPQUFkLEVBQVA7QUFDSDs7Ozs7a0JBWmdCTCxJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuaW1wb3J0IGh5cGVybGluayBmcm9tIFwiLi9oeXBlcmxpbmtcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdGV4dCBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChoeXBlcmxpbmssIHBhcmFncmFwaClcclxuICAgIH1cclxuXHJcbiAgICBnZXQgaHRtbCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHRcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGV4dCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNyY01vZGVsLmdldFRleHQoKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==