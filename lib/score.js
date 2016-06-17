"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require("qili-app");

var _reactRouter = require("react-router");

var _rewards = require("./components/rewards");

var _rewards2 = _interopRequireDefault(_rewards);

var _logo = require("./icons/logo");

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommandBar = _qiliApp.UI.CommandBar;
var Empty = _qiliApp.UI.Empty;

var Score = function (_Component) {
	_inherits(Score, _Component);

	function Score() {
		_classCallCheck(this, Score);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Score).apply(this, arguments));
	}

	_createClass(Score, [{
		key: "render",
		value: function render() {
			return _qiliApp.React.createElement(
				"div",
				{ className: "page" },
				_qiliApp.React.createElement(_rewards2.default, { child: this.props.child })
			);
		}
	}]);

	return Score;
}(_qiliApp.Component);

Score.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Score;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVPO0lBQVk7O0lBRUU7Ozs7Ozs7Ozs7OzJCQUNaO0FBQ1AsVUFDQzs7TUFBSyxXQUFVLE1BQVYsRUFBTDtJQUNDLGtEQUFTLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFoQixDQUREO0lBREQsQ0FETzs7OztRQURZOzs7TUFRYixlQUFhLEVBQUMsUUFBUSxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEI7a0JBUlQiLCJmaWxlIjoic2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnQsIFVJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IFJld2FyZHMgZnJvbSBcIi4vY29tcG9uZW50cy9yZXdhcmRzXCJcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuXHRcdFx0XHQ8UmV3YXJkcyBjaGlsZD17dGhpcy5wcm9wcy5jaGlsZH0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==