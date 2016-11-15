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

var CommandBar = _qiliApp.UI.CommandBar,
    Empty = _qiliApp.UI.Empty;

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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7SUFFTztJQUFZOztJQUVFOzs7Ozs7Ozs7OzJCQUNaOzs7QUFDUCxVQUNDOztNQUFLLFdBQVUsTUFBVixFQUFMO0lBQ0M7OztBQUNDLGlCQUFVLDhCQUFWO0FBQ0EsWUFBTSxJQUFOLEVBQVksU0FBUztjQUFHLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsSUFBcEIsQ0FBeUIsU0FBekI7T0FBSCxFQUZ0QjtLQUdDLHlEQUhEOztLQUREO0lBTUMsbURBQVMsT0FBTyxLQUFLLE9BQUwsQ0FBYSxLQUFiLEVBQWhCLENBTkQ7SUFERCxDQURPOzs7Ozs7QUFEWSxNQWFiLGVBQWE7QUFDbkIsU0FBUSxpQkFBVSxNQUFWO0FBQ1AsUUFBTyxpQkFBVSxNQUFWOztrQkFmVyIsImZpbGUiOiJzY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQge1VJfSBmcm9tIFwicWlsaS1hcHBcIlxyXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxyXG5cclxuaW1wb3J0IFJld2FyZHMgZnJvbSBcIi4vY29tcG9uZW50cy9yZXdhcmRzXCJcclxuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xyXG5pbXBvcnQge0Zsb2F0aW5nQWN0aW9uQnV0dG9ufSBmcm9tIFwibWF0ZXJpYWwtdWlcIlxyXG5pbXBvcnQgSWNvblB1Ymxpc2ggZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiXHJcblxyXG5jb25zdCB7Q29tbWFuZEJhciwgRW1wdHl9PVVJXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY29yZSBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxyXG5cdFx0XHRcdDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG5cdFx0XHRcdFx0Y2xhc3NOYW1lPVwiZmxvYXRpbmcgc3RpY2t5IGJvdHRvbSByaWdodFwiXHJcblx0XHRcdFx0XHRtaW5pPXt0cnVlfSBvbkNsaWNrPXtlPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goXCJwdWJsaXNoXCIpfT5cclxuXHRcdFx0XHRcdDxJY29uUHVibGlzaC8+JFxyXG5cdFx0XHRcdDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XHJcblx0XHRcdFx0PFJld2FyZHMgY2hpbGQ9e3RoaXMuY29udGV4dC5jaGlsZH0vPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdClcclxuXHR9XHJcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XHJcblx0XHRyb3V0ZXI6IFByb3BUeXBlcy5vYmplY3RcclxuXHRcdCxjaGlsZDogUHJvcFR5cGVzLm9iamVjdFxyXG5cdH1cclxufVxyXG4iXX0=