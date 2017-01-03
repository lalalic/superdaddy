"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    var now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

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

        return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
    }

    return Calendar;
}(_Calendar4.default);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImdldExhc3REYXlPZk1vbnRoIiwiZm9ybWF0IiwicmVsYXRpdmUiLCJjbkRhdGVUaW1lRm9ybWF0IiwiZCIsImRheXMiLCJkYXRlIiwic2V0RGF0ZSIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidHlwZSIsInRvTG93ZXJDYXNlIiwibm93IiwiRGF0ZSIsImRheUFiYnJldmlhdGlvbiIsImxvY2FsZSIsIm9wdGlvbnMiLCJhIiwiYXJndW1lbnRzIiwid2Vla2RheSIsImdldERheSIsIkNhbGVuZGFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQVFnQkEsaUIsR0FBQUEsaUI7UUFPQUMsTSxHQUFBQSxNO1FBY0FDLFEsR0FBQUEsUTtRQVVBQyxnQixHQUFBQSxnQjs7QUF2Q2hCOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7OztBQUVBOztBQUVPLFNBQVNILGlCQUFULENBQTJCSSxDQUEzQixFQUE2QjtBQUNoQyxRQUFJQyxPQUFLLCtCQUFlRCxDQUFmLENBQVQ7QUFDQSxRQUFNRSxPQUFLLDRCQUFZRixDQUFaLENBQVg7QUFDQUUsU0FBS0MsT0FBTCxDQUFhRixJQUFiO0FBQ0EsV0FBT0MsSUFBUDtBQUNIOztBQUVNLFNBQVNMLE1BQVQsQ0FBZ0JLLElBQWhCLEVBQXNCRSxJQUF0QixFQUEyQjtBQUM5QixRQUFJQyxRQUFNO0FBQ1hDLFdBQUVKLEtBQUtLLFdBQUwsRUFEUztBQUVYQyxXQUFFTixLQUFLTyxRQUFMLEtBQWdCLENBRlA7QUFHWFQsV0FBRUUsS0FBS1EsT0FBTCxFQUhTO0FBSVhDLFdBQUVULEtBQUtVLFFBQUwsRUFKUztBQUtYQyxXQUFFWCxLQUFLWSxVQUFMLEVBTFM7QUFNWEMsV0FBRWIsS0FBS2MsVUFBTDtBQU5TLEtBQVY7QUFRQSxXQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWVDLElBQWYsRUFBb0I7QUFDcEQsZUFBT2QsTUFBTWMsUUFBTSxHQUFOLEdBQVlBLEtBQUtDLFdBQUwsRUFBWixHQUFpQ0QsSUFBdkMsS0FBZ0QsRUFBdkQ7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFFTSxTQUFTckIsUUFBVCxDQUFrQkUsQ0FBbEIsRUFBb0M7QUFBQSxRQUFmcUIsR0FBZSx1RUFBWCxJQUFJQyxJQUFKLEVBQVc7O0FBQzFDLFFBQUcsQ0FBQ3RCLENBQUosRUFBTyxPQUFPLEVBQVA7QUFDUCxRQUFHLE9BQU9BLENBQVAsSUFBVyxRQUFkLEVBQ0NBLElBQUUsSUFBSXNCLElBQUosQ0FBU3RCLENBQVQsQ0FBRjs7QUFFRCxXQUFPSCxPQUFPRyxDQUFQLEVBQVUsNEJBQVlxQixHQUFaLEVBQWdCckIsQ0FBaEIsSUFBcUIsVUFBckIsR0FDWkEsRUFBRU8sV0FBRixNQUFpQmMsSUFBSWQsV0FBSixFQUFqQixHQUFxQyxRQUFyQyxHQUFnRCxhQUQ5QyxDQUFQO0FBRUE7O0FBRUQsSUFBTWdCLGtCQUFrQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUF4QjtBQUNPLFNBQVN4QixnQkFBVCxDQUEwQnlCLE1BQTFCLEVBQWtDQyxPQUFsQyxFQUEyQztBQUM5QyxRQUFJQywyR0FBd0JDLFNBQXhCLE1BQUo7QUFDQSxTQUFLOUIsTUFBTCxHQUFjLFVBQVNLLElBQVQsRUFBZTtBQUN6QixZQUFJdUIsUUFBUUcsT0FBUixLQUFvQixRQUF4QixFQUNFLE9BQU9MLGdCQUFnQnJCLEtBQUsyQixNQUFMLEVBQWhCLENBQVA7QUFDRixlQUFPSCxFQUFFN0IsTUFBRixVQUFZOEIsU0FBWixDQUFQO0FBQ0gsS0FKRDtBQUtIOztJQUVvQkcsUTs7Ozs7Ozs7Ozs7O2tCQUFBQSxRIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXHJcblxyXG5pbXBvcnQgX0NhbGVuZGFyIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvQ2FsZW5kYXInXHJcblxyXG5pbXBvcnQge2lzRXF1YWxEYXRlLCBjbG9uZUFzRGF0ZSwgZ2V0RGF5c0luTW9udGgsZGF0ZVRpbWVGb3JtYXR9IGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXHJcblxyXG4vL2V4cG9ydCAqIGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFzdERheU9mTW9udGgoZCl7XHJcbiAgICBsZXQgZGF5cz1nZXREYXlzSW5Nb250aChkKVxyXG4gICAgY29uc3QgZGF0ZT1jbG9uZUFzRGF0ZShkKVxyXG4gICAgZGF0ZS5zZXREYXRlKGRheXMpXHJcbiAgICByZXR1cm4gZGF0ZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KGRhdGUsIHRtcGwpe1xyXG4gICAgbGV0IHZhbHVlPXtcclxuXHRcdFx0eTpkYXRlLmdldEZ1bGxZZWFyKCksXHJcblx0XHRcdE06ZGF0ZS5nZXRNb250aCgpKzEsXHJcblx0XHRcdGQ6ZGF0ZS5nZXREYXRlKCksXHJcblx0XHRcdGg6ZGF0ZS5nZXRIb3VycygpLFxyXG5cdFx0XHRtOmRhdGUuZ2V0TWludXRlcygpLFxyXG5cdFx0XHRzOmRhdGUuZ2V0U2Vjb25kcygpXHJcblx0XHR9XHJcbiAgICByZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcclxuICAgICAgICByZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGQsIG5vdz1uZXcgRGF0ZSgpKXtcclxuXHRpZighZCkgcmV0dXJuIFwiXCJcclxuXHRpZih0eXBlb2YoZCk9PSdzdHJpbmcnKVxyXG5cdFx0ZD1uZXcgRGF0ZShkKVxyXG5cclxuXHRyZXR1cm4gZm9ybWF0KGQsIGlzRXF1YWxEYXRlKG5vdyxkKSA/IFwi5LuK5aSpIEhIOm1tXCIgOlxyXG5cdFx0XHRcdFx0XHRkLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gXCJNTeaciERE5pelXCIgOiBcIllZWVnlubRNTeaciERE5pelXCIpXHJcbn1cclxuXHJcbmNvbnN0IGRheUFiYnJldmlhdGlvbiA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ11cclxuZXhwb3J0IGZ1bmN0aW9uIGNuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XHJcbiAgICBsZXQgYT1uZXcgZGF0ZVRpbWVGb3JtYXQoLi4uYXJndW1lbnRzKVxyXG4gICAgdGhpcy5mb3JtYXQgPSBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMud2Vla2RheSA9PT0gJ25hcnJvdycpXHJcbiAgICAgICAgICByZXR1cm4gZGF5QWJicmV2aWF0aW9uW2RhdGUuZ2V0RGF5KCldXHJcbiAgICAgICAgcmV0dXJuIGEuZm9ybWF0KC4uLmFyZ3VtZW50cylcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgX0NhbGVuZGFye1xyXG5cclxufVxyXG4iXX0=