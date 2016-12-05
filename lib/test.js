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

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _dndList = require("./components/dnd-list");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function (_Component) {
	(0, _inherits3.default)(Test, _Component);

	function Test() {
		(0, _classCallCheck3.default)(this, Test);
		return (0, _possibleConstructorReturn3.default)(this, (Test.__proto__ || (0, _getPrototypeOf2.default)(Test)).apply(this, arguments));
	}

	(0, _createClass3.default)(Test, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(_dndList.List, {
				data: ["hello", "world"],
				template: function template(a) {
					return _react2.default.createElement(_dndList.ListItem, { primaryText: a });
				},
				onDrop: function onDrop(source, target) {}
			});
		}
	}]);
	return Test;
}(_react.Component);

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(Test);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbIlRlc3QiLCJhIiwic291cmNlIiwidGFyZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFrQkE7O0FBQ0E7Ozs7OztJQWpCTUEsSTs7Ozs7Ozs7OzsyQkFDRztBQUNQLFVBQ0M7QUFDQyxVQUFNLENBQUMsT0FBRCxFQUFTLE9BQVQsQ0FEUDtBQUVDLGNBQVU7QUFBQSxZQUFHLG1EQUFVLGFBQWFDLENBQXZCLEdBQUg7QUFBQSxLQUZYO0FBR0MsWUFBUSxnQkFBQ0MsTUFBRCxFQUFRQyxNQUFSLEVBQWlCLENBRXhCO0FBTEYsS0FERDtBQVNBOzs7OztrQkFRYSwrREFBNEJILElBQTVCLEMiLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgSWNvblNtaWxlIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvc29jaWFsL21vb2RcIlxyXG5cclxuaW1wb3J0IHtMaXN0LExpc3RJdGVtfSBmcm9tIFwiLi9jb21wb25lbnRzL2RuZC1saXN0XCJcclxuXHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQ8TGlzdFxyXG5cdFx0XHRcdGRhdGE9e1tcImhlbGxvXCIsXCJ3b3JsZFwiXX1cclxuXHRcdFx0XHR0ZW1wbGF0ZT17YT0+PExpc3RJdGVtIHByaW1hcnlUZXh0PXthfS8+fVxyXG5cdFx0XHRcdG9uRHJvcD17KHNvdXJjZSx0YXJnZXQpPT57XHJcblxyXG5cdFx0XHRcdH19XHJcblx0XHRcdFx0Lz5cclxuXHRcdClcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuaW1wb3J0IHtEcmFnRHJvcENvbnRleHR9IGZyb20gXCJyZWFjdC1kbmRcIlxyXG5pbXBvcnQgRG5kQmFja2VuZCBmcm9tIFwicmVhY3QtZG5kLWh0bWw1LWJhY2tlbmRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRHJhZ0Ryb3BDb250ZXh0KERuZEJhY2tlbmQpKFRlc3QpXHJcbiJdfQ==