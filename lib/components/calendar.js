"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateUtils = require("material-ui/DatePicker/dateUtils");

Object.keys(_dateUtils).forEach(function (key) {
    if (key === "default") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _dateUtils[key];
        }
    });
});
exports.getLastDayOfMonth = getLastDayOfMonth;
exports.format = format;
exports.relative = relative;
exports.cnDateTimeFormat = cnDateTimeFormat;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Calendar3 = require("material-ui/DatePicker/Calendar");

var _Calendar4 = _interopRequireDefault(_Calendar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _inherits(Calendar, _Calendar2);

    function Calendar() {
        _classCallCheck(this, Calendar);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).apply(this, arguments));
    }

    return Calendar;
}(_Calendar4.default);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBOztBQUVBOzs7Ozs7Ozs7UUFFZ0I7UUFPQTtRQWNBO1FBVUE7O0FBdENoQjs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFLTyxTQUFTLGlCQUFULENBQTJCLENBQTNCLEVBQTZCO0FBQ2hDLFFBQUksT0FBSywrQkFBZSxDQUFmLENBQUwsQ0FENEI7QUFFaEMsUUFBTSxPQUFLLDRCQUFZLENBQVosQ0FBTCxDQUYwQjtBQUdoQyxTQUFLLE9BQUwsQ0FBYSxJQUFiLEVBSGdDO0FBSWhDLFdBQU8sSUFBUCxDQUpnQztDQUE3Qjs7QUFPQSxTQUFTLE1BQVQsQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsRUFBMkI7QUFDOUIsUUFBSSxRQUFNO0FBQ1gsV0FBRSxLQUFLLFdBQUwsRUFBRjtBQUNBLFdBQUUsS0FBSyxRQUFMLEtBQWdCLENBQWhCO0FBQ0YsV0FBRSxLQUFLLE9BQUwsRUFBRjtBQUNBLFdBQUUsS0FBSyxRQUFMLEVBQUY7QUFDQSxXQUFFLEtBQUssVUFBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFVBQUwsRUFBRjtLQU5LLENBRDBCO0FBUzlCLFdBQU8sS0FBSyxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTLEtBQVQsRUFBZSxJQUFmLEVBQW9CO0FBQ3BELGVBQU8sTUFBTSxRQUFNLEdBQU4sR0FBWSxLQUFLLFdBQUwsRUFBWixHQUFpQyxJQUFqQyxDQUFOLElBQWdELEVBQWhELENBRDZDO0tBQXBCLENBQXBDLENBVDhCO0NBQTNCOztBQWNBLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFvQztRQUFmLDREQUFJLElBQUksSUFBSixrQkFBVzs7QUFDMUMsUUFBRyxDQUFDLENBQUQsRUFBSSxPQUFPLEVBQVAsQ0FBUDtBQUNBLFFBQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxFQUNGLElBQUUsSUFBSSxJQUFKLENBQVMsQ0FBVCxDQUFGLENBREQ7O0FBR0EsV0FBTyxPQUFPLENBQVAsRUFBVSw0QkFBWSxHQUFaLEVBQWdCLENBQWhCLElBQXFCLFVBQXJCLEdBQ1osRUFBRSxXQUFGLE1BQWlCLElBQUksV0FBSixFQUFqQixHQUFxQyxRQUFyQyxHQUFnRCxhQUFoRCxDQURMLENBTDBDO0NBQXBDOztBQVNQLElBQU0sa0JBQWtCLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQWxCO0FBQ0MsU0FBUyxnQkFBVCxDQUEwQixNQUExQixFQUFrQyxPQUFsQyxFQUEyQztBQUM5QyxRQUFJLDJHQUF3QixlQUF4QixDQUQwQztBQUU5QyxTQUFLLE1BQUwsR0FBYyxVQUFTLElBQVQsRUFBZTtBQUN6QixZQUFJLFFBQVEsT0FBUixLQUFvQixRQUFwQixFQUNGLE9BQU8sZ0JBQWdCLEtBQUssTUFBTCxFQUFoQixDQUFQLENBREY7QUFFQSxlQUFPLEVBQUUsTUFBRixVQUFZLFNBQVosQ0FBUCxDQUh5QjtLQUFmLENBRmdDO0NBQTNDOztJQVNjIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCBfQ2FsZW5kYXIgZnJvbSAnbWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9DYWxlbmRhcidcbmltcG9ydCB7aXNFcXVhbERhdGUsIGNsb25lQXNEYXRlLCBnZXREYXlzSW5Nb250aCxkYXRlVGltZUZvcm1hdH0gZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuZXhwb3J0ICogZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExhc3REYXlPZk1vbnRoKGQpe1xuICAgIGxldCBkYXlzPWdldERheXNJbk1vbnRoKGQpXG4gICAgY29uc3QgZGF0ZT1jbG9uZUFzRGF0ZShkKVxuICAgIGRhdGUuc2V0RGF0ZShkYXlzKVxuICAgIHJldHVybiBkYXRlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXQoZGF0ZSwgdG1wbCl7XG4gICAgbGV0IHZhbHVlPXtcblx0XHRcdHk6ZGF0ZS5nZXRGdWxsWWVhcigpLFxuXHRcdFx0TTpkYXRlLmdldE1vbnRoKCkrMSxcblx0XHRcdGQ6ZGF0ZS5nZXREYXRlKCksXG5cdFx0XHRoOmRhdGUuZ2V0SG91cnMoKSxcblx0XHRcdG06ZGF0ZS5nZXRNaW51dGVzKCksXG5cdFx0XHRzOmRhdGUuZ2V0U2Vjb25kcygpXG5cdFx0fVxuICAgIHJldHVybiB0bXBsLnJlcGxhY2UoLyhbeW1kaHNdKSsvaWcsIGZ1bmN0aW9uKG1hdGNoLHR5cGUpe1xuICAgICAgICByZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWxhdGl2ZShkLCBub3c9bmV3IERhdGUoKSl7XG5cdGlmKCFkKSByZXR1cm4gXCJcIlxuXHRpZih0eXBlb2YoZCk9PSdzdHJpbmcnKVxuXHRcdGQ9bmV3IERhdGUoZClcblxuXHRyZXR1cm4gZm9ybWF0KGQsIGlzRXF1YWxEYXRlKG5vdyxkKSA/IFwi5LuK5aSpIEhIOm1tXCIgOlxuXHRcdFx0XHRcdFx0ZC5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxufVxuXG5jb25zdCBkYXlBYmJyZXZpYXRpb24gPSBbJ+aXpScsICfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrSddXG5leHBvcnQgZnVuY3Rpb24gY25EYXRlVGltZUZvcm1hdChsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICBsZXQgYT1uZXcgZGF0ZVRpbWVGb3JtYXQoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMuZm9ybWF0ID0gZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICBpZiAob3B0aW9ucy53ZWVrZGF5ID09PSAnbmFycm93JylcbiAgICAgICAgICByZXR1cm4gZGF5QWJicmV2aWF0aW9uW2RhdGUuZ2V0RGF5KCldXG4gICAgICAgIHJldHVybiBhLmZvcm1hdCguLi5hcmd1bWVudHMpXG4gICAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBfQ2FsZW5kYXJ7XG4gICAgXG59XG4iXX0=