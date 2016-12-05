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

var _materialUi = require("material-ui");

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _dndList = require("./components/dnd-list");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListItem = (0, _dndList.dnd)(function (source, target) {
	console.log("source.text=" + source.primaryText);
	console.log("target.text=" + target.primaryText);
});

var Test = function (_Component) {
	(0, _inherits3.default)(Test, _Component);

	function Test() {
		(0, _classCallCheck3.default)(this, Test);
		return (0, _possibleConstructorReturn3.default)(this, (Test.__proto__ || (0, _getPrototypeOf2.default)(Test)).apply(this, arguments));
	}

	(0, _createClass3.default)(Test, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_materialUi.List,
				null,
				_react2.default.createElement(ListItem, {
					primaryText: "work",
					leftIcon: _react2.default.createElement(_mood2.default, null)
				}),
				_react2.default.createElement(ListItem, {
					primaryText: "english",
					leftIcon: _react2.default.createElement(_mood2.default, null)
				})
			);
		}
	}]);
	return Test;
}(_react.Component);

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Test);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7QUFFQTs7OztBQUVBOztBQTJCQTs7QUFDQTs7Ozs7O0FBMUJBLElBQU0sV0FBUyxrQkFBSSxVQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWlCO0FBQ25DLFNBQVEsR0FBUixrQkFBMkIsT0FBTyxXQUFQLENBQTNCLENBRG1DO0FBRW5DLFNBQVEsR0FBUixrQkFBMkIsT0FBTyxXQUFQLENBQTNCLENBRm1DO0NBQWpCLENBQWI7O0lBS0E7Ozs7Ozs7Ozs7MkJBQ0c7QUFDUCxVQUNDOzs7SUFDQyw4QkFBQyxRQUFEO0FBQ0Msa0JBQVksTUFBWjtBQUNBLGVBQVUsbURBQVY7S0FGRCxDQUREO0lBTUMsOEJBQUMsUUFBRDtBQUNDLGtCQUFZLFNBQVo7QUFDQSxlQUFVLG1EQUFWO0tBRkQsQ0FORDtJQURELENBRE87Ozs7OztrQkFzQk0sK0RBQTRCLElBQTVCIiwiZmlsZSI6InRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcclxuXHJcbmltcG9ydCB7TGlzdH0gZnJvbSBcIm1hdGVyaWFsLXVpXCJcclxuXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcblxyXG5pbXBvcnQge2RuZH0gZnJvbSBcIi4vY29tcG9uZW50cy9kbmQtbGlzdFwiXHJcblxyXG5jb25zdCBMaXN0SXRlbT1kbmQoKHNvdXJjZSx0YXJnZXQpPT57XHJcblx0Y29uc29sZS5sb2coYHNvdXJjZS50ZXh0PSR7c291cmNlLnByaW1hcnlUZXh0fWApXHJcblx0Y29uc29sZS5sb2coYHRhcmdldC50ZXh0PSR7dGFyZ2V0LnByaW1hcnlUZXh0fWApXHJcbn0pXHJcblxyXG5jbGFzcyBUZXN0IGV4dGVuZHMgQ29tcG9uZW50e1xyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PExpc3Q+XHJcblx0XHRcdFx0PExpc3RJdGVtXHJcblx0XHRcdFx0XHRwcmltYXJ5VGV4dD1cIndvcmtcIlxyXG5cdFx0XHRcdFx0bGVmdEljb249ezxJY29uU21pbGUvPn1cclxuXHRcdFx0XHQvPlxyXG5cclxuXHRcdFx0XHQ8TGlzdEl0ZW1cclxuXHRcdFx0XHRcdHByaW1hcnlUZXh0PVwiZW5nbGlzaFwiXHJcblx0XHRcdFx0XHRsZWZ0SWNvbj17PEljb25TbWlsZS8+fVxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvTGlzdD5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuaW1wb3J0IHtEcmFnRHJvcENvbnRleHR9IGZyb20gXCJyZWFjdC1kbmRcIlxyXG5pbXBvcnQgRG5kQmFja2VuZCBmcm9tIFwicmVhY3QtZG5kLWh0bWw1LWJhY2tlbmRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJhZ0Ryb3BDb250ZXh0KERuZEJhY2tlbmQpKFRlc3QpXHJcbiJdfQ==