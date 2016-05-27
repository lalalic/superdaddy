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
        key: "visit",
        value: function visit() {}
    }, {
        key: "_shouldIgnore",
        value: function _shouldIgnore() {
            return this.constructor.Properties.indexOf(this.srcModel.key) != -1;
        }
    }]);

    return Property;
}(_visitor2.default);

Property.Properties = "title,keywords,category,abstract,subject".split(',');
exports.default = Property;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC9wcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2dDQUNWOzs7d0NBR1E7QUFDWCxtQkFBTyxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsT0FBNUIsQ0FBb0MsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFwQyxJQUF3RCxDQUFDLENBQUQsQ0FEcEQ7Ozs7V0FKRTs7O1NBUWIsYUFBVywyQ0FBMkMsS0FBM0MsQ0FBaUQsR0FBakQ7a0JBUkUiLCJmaWxlIjoicHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmlzaXRvciBmcm9tIFwiLi92aXNpdG9yXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb3BlcnR5IGV4dGVuZHMgVmlzaXRvcntcclxuICAgIHZpc2l0KCl7XHJcblx0XHRcclxuXHR9XHJcbiAgICBfc2hvdWxkSWdub3JlKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcy5pbmRleE9mKHRoaXMuc3JjTW9kZWwua2V5KSE9LTFcclxuICAgIH1cclxuXHRcclxuXHRzdGF0aWMgUHJvcGVydGllcz1cInRpdGxlLGtleXdvcmRzLGNhdGVnb3J5LGFic3RyYWN0LHN1YmplY3RcIi5zcGxpdCgnLCcpXHJcbn0iXX0=