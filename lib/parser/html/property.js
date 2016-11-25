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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Property = function (_Visitor) {
    (0, _inherits3.default)(Property, _Visitor);

    function Property() {
        (0, _classCallCheck3.default)(this, Property);
        return (0, _possibleConstructorReturn3.default)(this, (Property.__proto__ || (0, _getPrototypeOf2.default)(Property)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7d0NBQ0Y7QUFDWCxtQkFBTyxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsT0FBNUIsQ0FBb0MsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFwQyxJQUF3RCxDQUFDLENBQUQsQ0FEcEQ7Ozs7OztBQURFLFNBS2IsYUFBVywwQkFBMEIsS0FBMUIsQ0FBZ0MsR0FBaEM7a0JBTEUiLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BlcnR5IGV4dGVuZHMgVmlzaXRvcntcclxuICAgIF9zaG91bGRJZ25vcmUoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzLmluZGV4T2YodGhpcy5zcmNNb2RlbC5rZXkpIT0tMVxyXG4gICAgfVxyXG5cdFxyXG5cdHN0YXRpYyBQcm9wZXJ0aWVzPVwidGl0bGUsa2V5d29yZHMsY2F0ZWdvcnlcIi5zcGxpdCgnLCcpXHJcbn0iXX0=