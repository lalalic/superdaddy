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

        var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(text).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixJQUNqQixHQUFhOzRDQURJLE1BQ0o7O2lHQURJLGtCQUVKLFlBREE7O0FBRVQsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGtDQUFmLENBRlM7O0tBQWI7OytCQURpQjs7NEJBTVA7QUFDTixtQkFBTyxLQUFLLElBQUwsQ0FERDs7Ozs0QkFJQTtBQUNOLG1CQUFPLEtBQUssUUFBTCxDQUFjLE9BQWQsRUFBUCxDQURNOzs7V0FWTyIsImZpbGUiOiJ0ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vcFwiXHJcbmltcG9ydCBoeXBlcmxpbmsgZnJvbSBcIi4vaHlwZXJsaW5rXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRleHQgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQoaHlwZXJsaW5rLCBwYXJhZ3JhcGgpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGh0bWwoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRleHQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zcmNNb2RlbC5nZXRUZXh0KClcclxuICAgIH1cclxufVxyXG4iXX0=