"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

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

			return _react2.default.createElement(
				"div",
				{ className: "page" },
				_react2.default.createElement(
					_materialUi.FloatingActionButton,
					{
						className: "floating sticky bottom right",
						mini: true, onClick: function onClick(e) {
							return _this2.context.router.push("publish");
						} },
					_react2.default.createElement(_cameraRoll2.default, null),
					"$"
				),
				_react2.default.createElement(_rewards2.default, { child: this.context.child })
			);
		}
	}]);

	return Score;
}(_react.Component);

Score.contextTypes = {
	router: _react.PropTypes.object,
	child: _react.PropTypes.object
};
exports.default = Score;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTztJQUFZOztJQUVFOzs7Ozs7Ozs7OzsyQkFDWjs7O0FBQ1AsVUFDQzs7TUFBSyxXQUFVLE1BQVYsRUFBTDtJQUNDOzs7QUFDQyxpQkFBVSw4QkFBVjtBQUNBLFlBQU0sSUFBTixFQUFZLFNBQVM7Y0FBRyxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLElBQXBCLENBQXlCLFNBQXpCO09BQUgsRUFGdEI7S0FHQyx5REFIRDs7S0FERDtJQU1DLG1EQUFTLE9BQU8sS0FBSyxPQUFMLENBQWEsS0FBYixFQUFoQixDQU5EO0lBREQsQ0FETzs7OztRQURZOzs7TUFhYixlQUFhO0FBQ25CLFNBQVEsaUJBQVUsTUFBVjtBQUNQLFFBQU8saUJBQVUsTUFBVjs7a0JBZlciLCJmaWxlIjoic2NvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuaW1wb3J0IHtVSX0gZnJvbSBcInFpbGktYXBwXCJcclxuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcclxuXHJcbmltcG9ydCBSZXdhcmRzIGZyb20gXCIuL2NvbXBvbmVudHMvcmV3YXJkc1wiXHJcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcclxuaW1wb3J0IHtGbG9hdGluZ0FjdGlvbkJ1dHRvbn0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuaW1wb3J0IEljb25QdWJsaXNoIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIlxyXG5cclxuY29uc3Qge0NvbW1hbmRCYXIsIEVtcHR5fT1VSVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NvcmUgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cclxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b25cclxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cImZsb2F0aW5nIHN0aWNreSBib3R0b20gcmlnaHRcIlxyXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX0gb25DbGljaz17ZT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKFwicHVibGlzaFwiKX0+XHJcblx0XHRcdFx0XHQ8SWNvblB1Ymxpc2gvPiRcclxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxyXG5cdFx0XHRcdDxSZXdhcmRzIGNoaWxkPXt0aGlzLmNvbnRleHQuY2hpbGR9Lz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpXHJcblx0fVxyXG5cdHN0YXRpYyBjb250ZXh0VHlwZXM9e1xyXG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0XHQsY2hpbGQ6IFByb3BUeXBlcy5vYmplY3RcclxuXHR9XHJcbn1cclxuIl19