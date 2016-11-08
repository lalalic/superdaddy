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

var CommandBar = _qiliApp.UI.CommandBar;
var Empty = _qiliApp.UI.Empty;

var Score = function (_Component) {
	(0, _inherits3.default)(Score, _Component);

	function Score() {
		(0, _classCallCheck3.default)(this, Score);
		return (0, _possibleConstructorReturn3.default)(this, (Score.__proto__ || (0, _getPrototypeOf2.default)(Score)).apply(this, arguments));
	}

	(0, _createClass3.default)(Score, [{
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZS5qcyJdLCJuYW1lcyI6WyJDb21tYW5kQmFyIiwiRW1wdHkiLCJTY29yZSIsImNvbnRleHQiLCJyb3V0ZXIiLCJwdXNoIiwiY2hpbGQiLCJjb250ZXh0VHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztJQUVPQSxVLGVBQUFBLFU7SUFBWUMsSyxlQUFBQSxLOztJQUVFQyxLOzs7Ozs7Ozs7OzJCQUNaO0FBQUE7O0FBQ1AsVUFDQztBQUFBO0FBQUEsTUFBSyxXQUFVLE1BQWY7QUFDQztBQUFBO0FBQUE7QUFDQyxpQkFBVSw4QkFEWDtBQUVDLFlBQU0sSUFGUCxFQUVhLFNBQVM7QUFBQSxjQUFHLE9BQUtDLE9BQUwsQ0FBYUMsTUFBYixDQUFvQkMsSUFBcEIsQ0FBeUIsU0FBekIsQ0FBSDtBQUFBLE9BRnRCO0FBR0MsOERBSEQ7QUFBQTtBQUFBLEtBREQ7QUFNQyx1REFBUyxPQUFPLEtBQUtGLE9BQUwsQ0FBYUcsS0FBN0I7QUFORCxJQUREO0FBVUE7Ozs7O0FBWm1CSixLLENBYWJLLFksR0FBYTtBQUNuQkgsU0FBUSxpQkFBVUksTUFEQztBQUVsQkYsUUFBTyxpQkFBVUU7QUFGQyxDO2tCQWJBTixLIiwiZmlsZSI6InNjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCB7VUl9IGZyb20gXCJxaWxpLWFwcFwiXHJcbmltcG9ydCB7TGlua30gZnJvbSBcInJlYWN0LXJvdXRlclwiXHJcblxyXG5pbXBvcnQgUmV3YXJkcyBmcm9tIFwiLi9jb21wb25lbnRzL3Jld2FyZHNcIlxyXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXHJcbmltcG9ydCB7RmxvYXRpbmdBY3Rpb25CdXR0b259IGZyb20gXCJtYXRlcmlhbC11aVwiXHJcbmltcG9ydCBJY29uUHVibGlzaCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCJcclxuXHJcbmNvbnN0IHtDb21tYW5kQmFyLCBFbXB0eX09VUlcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjb3JlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJwYWdlXCI+XHJcblx0XHRcdFx0PEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcblx0XHRcdFx0XHRjbGFzc05hbWU9XCJmbG9hdGluZyBzdGlja3kgYm90dG9tIHJpZ2h0XCJcclxuXHRcdFx0XHRcdG1pbmk9e3RydWV9IG9uQ2xpY2s9e2U9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcInB1Ymxpc2hcIil9PlxyXG5cdFx0XHRcdFx0PEljb25QdWJsaXNoLz4kXHJcblx0XHRcdFx0PC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cclxuXHRcdFx0XHQ8UmV3YXJkcyBjaGlsZD17dGhpcy5jb250ZXh0LmNoaWxkfS8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KVxyXG5cdH1cclxuXHRzdGF0aWMgY29udGV4dFR5cGVzPXtcclxuXHRcdHJvdXRlcjogUHJvcFR5cGVzLm9iamVjdFxyXG5cdFx0LGNoaWxkOiBQcm9wVHlwZXMub2JqZWN0XHJcblx0fVxyXG59XHJcbiJdfQ==