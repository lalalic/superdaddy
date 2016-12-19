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

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _p = require("./p");

var _p2 = _interopRequireDefault(_p);

var _document = require("./document");

var _document2 = _interopRequireDefault(_document);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Property = function (_Visitor) {
	(0, _inherits3.default)(Property, _Visitor);

	function Property() {
		(0, _classCallCheck3.default)(this, Property);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Property.__proto__ || (0, _getPrototypeOf2.default)(Property)).apply(this, arguments));

		_this.container = _this.findTypedParent(_p2.default, _document2.default);
		return _this;
	}

	(0, _createClass3.default)(Property, [{
		key: "_shouldIgnore",
		value: function _shouldIgnore() {
			return this.constructor.Properties.indexOf(this.srcModel.key) != -1;
		}
	}]);
	return Property;
}(_visitor2.default);

Property.Properties = "title,keywords,category".split(',');
exports.default = Property;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCOzs7QUFDcEIscUJBQWE7Ozt5SUFDSCxZQURHOztBQUVOLFFBQUssU0FBTCxHQUFlLE1BQUssZUFBTCxpQ0FBZixDQUZNOztFQUFiOzs7O2tDQUlrQjtBQUNYLFVBQU8sS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLE9BQTVCLENBQW9DLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBcEMsSUFBd0QsQ0FBQyxDQUFELENBRHBEOzs7Ozs7QUFMRSxTQVNiLGFBQVcsMEJBQTBCLEtBQTFCLENBQWdDLEdBQWhDO2tCQVRFIiwiZmlsZSI6InByb3BlcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCBwYXJhZ3JhcGggZnJvbSBcIi4vcFwiXHJcbmltcG9ydCBkb2N1bWVudCBmcm9tIFwiLi9kb2N1bWVudFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wZXJ0eSBleHRlbmRzIFZpc2l0b3J7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgICAgICB0aGlzLmNvbnRhaW5lcj10aGlzLmZpbmRUeXBlZFBhcmVudChwYXJhZ3JhcGgsZG9jdW1lbnQpXHJcblx0fVxyXG4gICAgX3Nob3VsZElnbm9yZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMuaW5kZXhPZih0aGlzLnNyY01vZGVsLmtleSkhPS0xXHJcbiAgICB9XHJcblx0XHJcblx0c3RhdGljIFByb3BlcnRpZXM9XCJ0aXRsZSxrZXl3b3JkcyxjYXRlZ29yeVwiLnNwbGl0KCcsJylcclxufSJdfQ==