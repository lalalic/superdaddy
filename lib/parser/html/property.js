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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6WyJQcm9wZXJ0eSIsImFyZ3VtZW50cyIsImNvbnRhaW5lciIsImZpbmRUeXBlZFBhcmVudCIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImluZGV4T2YiLCJzcmNNb2RlbCIsImtleSIsInNwbGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxROzs7QUFDcEIscUJBQWE7QUFBQTs7QUFBQSx5SUFDSEMsU0FERzs7QUFFTixRQUFLQyxTQUFMLEdBQWUsTUFBS0MsZUFBTCxpQ0FBZjtBQUZNO0FBR1o7Ozs7a0NBQ2lCO0FBQ1gsVUFBTyxLQUFLQyxXQUFMLENBQWlCQyxVQUFqQixDQUE0QkMsT0FBNUIsQ0FBb0MsS0FBS0MsUUFBTCxDQUFjQyxHQUFsRCxLQUF3RCxDQUFDLENBQWhFO0FBQ0g7Ozs7O0FBUGdCUixRLENBU2JLLFUsR0FBVywwQkFBMEJJLEtBQTFCLENBQWdDLEdBQWhDLEM7a0JBVEVULFEiLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuaW1wb3J0IHBhcmFncmFwaCBmcm9tIFwiLi9wXCJcclxuaW1wb3J0IGRvY3VtZW50IGZyb20gXCIuL2RvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BlcnR5IGV4dGVuZHMgVmlzaXRvcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyPXRoaXMuZmluZFR5cGVkUGFyZW50KHBhcmFncmFwaCxkb2N1bWVudClcclxuXHR9XHJcbiAgICBfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcy5pbmRleE9mKHRoaXMuc3JjTW9kZWwua2V5KSE9LTFcclxuICAgIH1cclxuXHRcclxuXHRzdGF0aWMgUHJvcGVydGllcz1cInRpdGxlLGtleXdvcmRzLGNhdGVnb3J5XCIuc3BsaXQoJywnKVxyXG59Il19