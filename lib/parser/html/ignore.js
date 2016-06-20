"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _docx4js = require("docx4js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ignore = function (_Any) {
    _inherits(Ignore, _Any);

    function Ignore() {
        _classCallCheck(this, Ignore);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Ignore).apply(this, arguments));
    }

    _createClass(Ignore, [{
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return true;
        }
    }]);

    return Ignore;
}(_docx4js.Visitor);

exports.default = Ignore;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9pZ25vcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3dDQUNGO0FBQ1gsbUJBQU8sSUFBUCxDQURXOzs7O1dBREUiLCJmaWxlIjoiaWdub3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaXNpdG9yIGFzIEFueX0gZnJvbSBcImRvY3g0anNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWdub3JlIGV4dGVuZHMgQW55e1xyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9XHJcbn1cclxuIl19