"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _mood = require("material-ui/svg-icons/social/mood");

var _mood2 = _interopRequireDefault(_mood);

var _dndList = require("./components/dnd-list");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Test = function (_Component) {
	_inherits(Test, _Component);

	function Test() {
		_classCallCheck(this, Test);

		return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
	}

	_createClass(Test, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LmpzIl0sIm5hbWVzIjpbIlRlc3QiLCJhIiwic291cmNlIiwidGFyZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFrQkE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQWpCTUEsSTs7Ozs7Ozs7Ozs7MkJBQ0c7QUFDUCxVQUNDO0FBQ0MsVUFBTSxDQUFDLE9BQUQsRUFBUyxPQUFULENBRFA7QUFFQyxjQUFVO0FBQUEsWUFBRyxtREFBVSxhQUFhQyxDQUF2QixHQUFIO0FBQUEsS0FGWDtBQUdDLFlBQVEsZ0JBQUNDLE1BQUQsRUFBUUMsTUFBUixFQUFpQixDQUV4QjtBQUxGLEtBREQ7QUFTQTs7Ozs7O2tCQVFhLCtEQUE0QkgsSUFBNUIsQyIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBJY29uU21pbGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9zb2NpYWwvbW9vZFwiXHJcblxyXG5pbXBvcnQge0xpc3QsTGlzdEl0ZW19IGZyb20gXCIuL2NvbXBvbmVudHMvZG5kLWxpc3RcIlxyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIENvbXBvbmVudHtcclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxMaXN0XHJcblx0XHRcdFx0ZGF0YT17W1wiaGVsbG9cIixcIndvcmxkXCJdfVxyXG5cdFx0XHRcdHRlbXBsYXRlPXthPT48TGlzdEl0ZW0gcHJpbWFyeVRleHQ9e2F9Lz59XHJcblx0XHRcdFx0b25Ecm9wPXsoc291cmNlLHRhcmdldCk9PntcclxuXHJcblx0XHRcdFx0fX1cclxuXHRcdFx0XHQvPlxyXG5cdFx0KVxyXG5cdH1cclxufVxyXG5cclxuXHJcblxyXG5pbXBvcnQge0RyYWdEcm9wQ29udGV4dH0gZnJvbSBcInJlYWN0LWRuZFwiXHJcbmltcG9ydCBEbmRCYWNrZW5kIGZyb20gXCJyZWFjdC1kbmQtaHRtbDUtYmFja2VuZFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBEcmFnRHJvcENvbnRleHQoRG5kQmFja2VuZCkoVGVzdClcclxuIl19