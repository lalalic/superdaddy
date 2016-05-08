"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _ = require(".");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reward = function (_Model) {
    _inherits(Reward, _Model);

    function Reward() {
        _classCallCheck(this, Reward);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Reward).apply(this, arguments));
    }

    _createClass(Reward, null, [{
        key: "_name",
        get: function get() {
            return "rewards";
        }
    }]);

    return Reward;
}(_qiliApp.Model);

exports.default = Reward;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYi9yZXdhcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUNDO0FBQUMsbUJBQU8sU0FBUCxDQUFEOzs7O1dBREQiLCJmaWxlIjoicmV3YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2RlbCxVc2VyfSBmcm9tIFwicWlsaS1hcHBcIlxuaW1wb3J0IHtGYW1pbHl9IGZyb20gXCIuXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV3YXJkIGV4dGVuZHMgTW9kZWx7XG4gICAgc3RhdGljIGdldCBfbmFtZSgpe3JldHVybiBcInJld2FyZHNcIn1cblxufVxuIl19