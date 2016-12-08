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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOztBQWtCQTs7QUFDQTs7Ozs7O0lBakJNOzs7Ozs7Ozs7OzJCQUNHO0FBQ1AsVUFDQztBQUNDLFVBQU0sQ0FBQyxPQUFELEVBQVMsT0FBVCxDQUFOO0FBQ0EsY0FBVTtZQUFHLG1EQUFVLGFBQWEsQ0FBYixFQUFWO0tBQUg7QUFDVixZQUFRLGdCQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWlCLEVBQWpCO0lBSFQsQ0FERCxDQURPOzs7Ozs7a0JBa0JNLCtEQUE0QixJQUE1QiIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcblxyXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW19IGZyb20gXCIuL2NvbXBvbmVudHMvZG5kLWxpc3RcIlxyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0XHJcblx0XHRcdFx0ZGF0YT17W1wiaGVsbG9cIixcIndvcmxkXCJdfVxyXG5cdFx0XHRcdHRlbXBsYXRlPXthPT48TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e2F9Lz59XHJcblx0XHRcdFx0b25Ecm9wPXsoc291cmNlLHRhcmdldCk9PntcclxuXHJcblx0XHRcdFx0fX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5pbXBvcnQge0RyYWdEcm9wQ29udGV4dH0gZnJvbSBcInJlYWN0LWRuZFwiXHJcbmltcG9ydCBEbmRCYWNrZW5kIGZyb20gXCJyZWFjdC1kbmQtaHRtbDUtYmFja2VuZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnRHJvcENvbnRleHQoRG5kQmFja2VuZCkoVGVzdClcclxuIl19