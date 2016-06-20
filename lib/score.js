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

var _materialUi = require("material-ui");

var _cameraRoll = require("material-ui/svg-icons/image/camera-roll");

var _cameraRoll2 = _interopRequireDefault(_cameraRoll);

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
			var _this2 = this;

			return _qiliApp.React.createElement(
				"div",
				{ className: "page" },
				_qiliApp.React.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky bottom right",
						mini: true, onClick: function onClick(e) {
							return _this2.context.router.push("publish");
						} },
					_qiliApp.React.createElement(_cameraRoll2.default, null),
					"$"
				),
				_qiliApp.React.createElement(_rewards2.default, { child: this.props.child })
			);
		}
	}]);

	return Score;
}(_qiliApp.Component);

Score.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Score;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU87SUFBWTs7SUFFRTs7Ozs7Ozs7Ozs7MkJBQ1o7OztBQUNQLFVBQ0M7O01BQUssV0FBVSxNQUFWLEVBQUw7SUFDQzs7O0FBQ0MsaUJBQVUsOEJBQVY7QUFDQSxZQUFNLElBQU4sRUFBWSxTQUFTO2NBQUcsT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixJQUFwQixDQUF5QixTQUF6QjtPQUFILEVBRnRCO0tBR0Msd0RBSEQ7O0tBREQ7SUFNQyxrREFBUyxPQUFPLEtBQUssS0FBTCxDQUFXLEtBQVgsRUFBaEIsQ0FORDtJQURELENBRE87Ozs7UUFEWTs7O01BYWIsZUFBYSxFQUFDLFFBQVEsZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQWJUIiwiZmlsZSI6InNjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50LCBVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBSZXdhcmRzIGZyb20gXCIuL2NvbXBvbmVudHMvcmV3YXJkc1wiXHJcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgYm90dG9tIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIil9PlxyXG5cdFx0XHRcdFx0PEljb25QdWJsaXNoLz4kXHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHRcdFx0XHQ8UmV3YXJkcyBjaGlsZD17dGhpcy5wcm9wcy5jaGlsZH0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxyXG59XHJcbiJdfQ==