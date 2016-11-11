"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getLastDayOfMonth = getLastDayOfMonth;
exports.format = format;
exports.relative = relative;
exports.cnDateTimeFormat = cnDateTimeFormat;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Calendar3 = require("material-ui/DatePicker/Calendar");

var _Calendar4 = _interopRequireDefault(_Calendar3);

var _dateUtils = require("material-ui/DatePicker/dateUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//export * from "material-ui/DatePicker/dateUtils"

function getLastDayOfMonth(d) {
    var days = (0, _dateUtils.getDaysInMonth)(d);
    var date = (0, _dateUtils.cloneAsDate)(d);
    date.setDate(days);
    return date;
}

function format(date, tmpl) {
    var value = {
        y: date.getFullYear(),
        M: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        m: date.getMinutes(),
        s: date.getSeconds()
    };
    return tmpl.replace(/([ymdhs])+/ig, function (match, type) {
        return value[type != 'M' ? type.toLowerCase() : type] || "";
    });
}

function relative(d) {
    var now = arguments.length <= 1 || arguments[1] === undefined ? new Date() : arguments[1];

    if (!d) return "";
    if (typeof d == 'string') d = new Date(d);

    return format(d, (0, _dateUtils.isEqualDate)(now, d) ? "今天 HH:mm" : d.getFullYear() == now.getFullYear() ? "MM月DD日" : "YYYY年MM月DD日");
}

var dayAbbreviation = ['日', '一', '二', '三', '四', '五', '六'];
function cnDateTimeFormat(locale, options) {
    var a = new (Function.prototype.bind.apply(_dateUtils.dateTimeFormat, [null].concat(Array.prototype.slice.call(arguments))))();
    this.format = function (date) {
        if (options.weekday === 'narrow') return dayAbbreviation[date.getDay()];
        return a.format.apply(a, arguments);
    };
}

var Calendar = function (_Calendar2) {
    (0, _inherits3.default)(Calendar, _Calendar2);

    function Calendar() {
        (0, _classCallCheck3.default)(this, Calendar);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Calendar).apply(this, arguments));
    }

    return Calendar;
}(_Calendar4.default);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFRZ0I7UUFPQTtRQWNBO1FBVUE7O0FBdkNoQjs7OztBQUVBOzs7O0FBRUE7Ozs7OztBQUlPLFNBQVMsaUJBQVQsQ0FBMkIsQ0FBM0IsRUFBNkI7QUFDaEMsUUFBSSxPQUFLLCtCQUFlLENBQWYsQ0FBTCxDQUQ0QjtBQUVoQyxRQUFNLE9BQUssNEJBQVksQ0FBWixDQUFMLENBRjBCO0FBR2hDLFNBQUssT0FBTCxDQUFhLElBQWIsRUFIZ0M7QUFJaEMsV0FBTyxJQUFQLENBSmdDO0NBQTdCOztBQU9BLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixJQUF0QixFQUEyQjtBQUM5QixRQUFJLFFBQU07QUFDWCxXQUFFLEtBQUssV0FBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFFBQUwsS0FBZ0IsQ0FBaEI7QUFDRixXQUFFLEtBQUssT0FBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFFBQUwsRUFBRjtBQUNBLFdBQUUsS0FBSyxVQUFMLEVBQUY7QUFDQSxXQUFFLEtBQUssVUFBTCxFQUFGO0tBTkssQ0FEMEI7QUFTOUIsV0FBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLFVBQVMsS0FBVCxFQUFlLElBQWYsRUFBb0I7QUFDcEQsZUFBTyxNQUFNLFFBQU0sR0FBTixHQUFZLEtBQUssV0FBTCxFQUFaLEdBQWlDLElBQWpDLENBQU4sSUFBZ0QsRUFBaEQsQ0FENkM7S0FBcEIsQ0FBcEMsQ0FUOEI7Q0FBM0I7O0FBY0EsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQW9DO1FBQWYsNERBQUksSUFBSSxJQUFKLGtCQUFXOztBQUMxQyxRQUFHLENBQUMsQ0FBRCxFQUFJLE9BQU8sRUFBUCxDQUFQO0FBQ0EsUUFBRyxPQUFPLENBQVAsSUFBVyxRQUFYLEVBQ0YsSUFBRSxJQUFJLElBQUosQ0FBUyxDQUFULENBQUYsQ0FERDs7QUFHQSxXQUFPLE9BQU8sQ0FBUCxFQUFVLDRCQUFZLEdBQVosRUFBZ0IsQ0FBaEIsSUFBcUIsVUFBckIsR0FDWixFQUFFLFdBQUYsTUFBaUIsSUFBSSxXQUFKLEVBQWpCLEdBQXFDLFFBQXJDLEdBQWdELGFBQWhELENBREwsQ0FMMEM7Q0FBcEM7O0FBU1AsSUFBTSxrQkFBa0IsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsQ0FBbEI7QUFDQyxTQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLE9BQWxDLEVBQTJDO0FBQzlDLFFBQUksMkdBQXdCLGVBQXhCLENBRDBDO0FBRTlDLFNBQUssTUFBTCxHQUFjLFVBQVMsSUFBVCxFQUFlO0FBQ3pCLFlBQUksUUFBUSxPQUFSLEtBQW9CLFFBQXBCLEVBQ0YsT0FBTyxnQkFBZ0IsS0FBSyxNQUFMLEVBQWhCLENBQVAsQ0FERjtBQUVBLGVBQU8sRUFBRSxNQUFGLFVBQVksU0FBWixDQUFQLENBSHlCO0tBQWYsQ0FGZ0M7Q0FBM0M7O0lBU2MiLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcblxuaW1wb3J0IF9DYWxlbmRhciBmcm9tICdtYXRlcmlhbC11aS9EYXRlUGlja2VyL0NhbGVuZGFyJ1xuXG5pbXBvcnQge2lzRXF1YWxEYXRlLCBjbG9uZUFzRGF0ZSwgZ2V0RGF5c0luTW9udGgsZGF0ZVRpbWVGb3JtYXR9IGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXG5cbi8vZXhwb3J0ICogZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhc3REYXlPZk1vbnRoKGQpe1xuICAgIGxldCBkYXlzPWdldERheXNJbk1vbnRoKGQpXG4gICAgY29uc3QgZGF0ZT1jbG9uZUFzRGF0ZShkKVxuICAgIGRhdGUuc2V0RGF0ZShkYXlzKVxuICAgIHJldHVybiBkYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZGF0ZSwgdG1wbCl7XG4gICAgbGV0IHZhbHVlPXtcblx0XHRcdHk6ZGF0ZS5nZXRGdWxsWWVhcigpLFxuXHRcdFx0TTpkYXRlLmdldE1vbnRoKCkrMSxcblx0XHRcdGQ6ZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRoOmRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdG06ZGF0ZS5nZXRNaW51dGVzKCksXG5cdFx0XHRzOmRhdGUuZ2V0U2Vjb25kcygpXG5cdFx0fVxuICAgIHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xuICAgICAgICByZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShkLCBub3c9bmV3IERhdGUoKSl7XG5cdGlmKCFkKSByZXR1cm4gXCJcIlxuXHRpZih0eXBlb2YoZCk9PSdzdHJpbmcnKVxuXHRcdGQ9bmV3IERhdGUoZClcblxuXHRyZXR1cm4gZm9ybWF0KGQsIGlzRXF1YWxEYXRlKG5vdyxkKSA/IFwi5LuK5aSpIEhIOm1tXCIgOlxuXHRcdFx0XHRcdFx0ZC5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxufVxuXG5jb25zdCBkYXlBYmJyZXZpYXRpb24gPSBbJ+aXpScsICfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrSddXG5leHBvcnQgZnVuY3Rpb24gY25EYXRlVGltZUZvcm1hdChsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICBsZXQgYT1uZXcgZGF0ZVRpbWVGb3JtYXQoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMuZm9ybWF0ID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy53ZWVrZGF5ID09PSAnbmFycm93JylcbiAgICAgICAgICByZXR1cm4gZGF5QWJicmV2aWF0aW9uW2RhdGUuZ2V0RGF5KCldXG4gICAgICAgIHJldHVybiBhLmZvcm1hdCguLi5hcmd1bWVudHMpXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBfQ2FsZW5kYXJ7XG5cbn1cbiJdfQ==