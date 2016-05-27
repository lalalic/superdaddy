"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visitor = require("./visitor");

var _visitor2 = _interopRequireDefault(_visitor);

var _table = require("./table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var row = function (_Visitor) {
    _inherits(row, _Visitor);

    function row() {
        _classCallCheck(this, row);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(row).apply(this, arguments));

        _this.tag = "tr";
        _this.container = _this.findTypedParent(_table2.default);
        return _this;
    }

    return row;
}(_visitor2.default);

exports.default = row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wYXJzZXIvaHRtbC90ci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNqQixhQURpQixHQUNqQixHQUFhOzhCQURJLEtBQ0o7OzJFQURJLGlCQUVKLFlBREE7O0FBRVQsY0FBSyxHQUFMLEdBQVMsSUFBVCxDQUZTO0FBR1QsY0FBSyxTQUFMLEdBQWUsTUFBSyxlQUFMLGlCQUFmLENBSFM7O0tBQWI7O1dBRGlCIiwiZmlsZSI6InRyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFZpc2l0b3IgZnJvbSBcIi4vdmlzaXRvclwiXHJcbmltcG9ydCB0YWJsZSBmcm9tIFwiLi90YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByb3cgZXh0ZW5kcyBWaXNpdG9ye1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpXHJcbiAgICAgICAgdGhpcy50YWc9XCJ0clwiXHJcbiAgICAgICAgdGhpcy5jb250YWluZXI9dGhpcy5maW5kVHlwZWRQYXJlbnQodGFibGUpXHJcbiAgICB9XHJcbn1cclxuXHJcbiJdfQ==