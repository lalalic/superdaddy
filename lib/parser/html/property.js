"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = function (_Visitor) {
    _inherits(Property, _Visitor);

    function Property() {
        _classCallCheck(this, Property);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Property).apply(this, arguments));
    }

    _createClass(Property, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3dDQUNGO0FBQ1gsbUJBQU8sS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLE9BQTVCLENBQW9DLEtBQUssUUFBTCxDQUFjLEdBQWQsQ0FBcEMsSUFBd0QsQ0FBQyxDQUFELENBRHBEOzs7O1dBREU7OztTQUtiLGFBQVcsMEJBQTBCLEtBQTFCLENBQWdDLEdBQWhDO2tCQUxFIiwiZmlsZSI6InByb3BlcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9wZXJ0eSBleHRlbmRzIFZpc2l0b3J7XHJcbiAgICBfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcy5pbmRleE9mKHRoaXMuc3JjTW9kZWwua2V5KSE9LTFcclxuICAgIH1cclxuXHRcclxuXHRzdGF0aWMgUHJvcGVydGllcz1cInRpdGxlLGtleXdvcmRzLGNhdGVnb3J5XCIuc3BsaXQoJywnKVxyXG59Il19