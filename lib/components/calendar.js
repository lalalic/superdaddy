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
    (0, _inherits3.default)(Calendar, _Calendar2);

    function Calendar() {
        (0, _classCallCheck3.default)(this, Calendar);
        return (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).apply(this, arguments));
    }

    return Calendar;
}(_Calendar4.default);

exports.default = Calendar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFRZ0I7UUFPQTtRQWNBO1FBVUE7O0FBdkNoQjs7OztBQUVBOzs7O0FBRUE7Ozs7OztBQUlPLFNBQVMsaUJBQVQsQ0FBMkIsQ0FBM0IsRUFBNkI7QUFDaEMsUUFBSSxPQUFLLCtCQUFlLENBQWYsQ0FBTCxDQUQ0QjtBQUVoQyxRQUFNLE9BQUssNEJBQVksQ0FBWixDQUFMLENBRjBCO0FBR2hDLFNBQUssT0FBTCxDQUFhLElBQWIsRUFIZ0M7QUFJaEMsV0FBTyxJQUFQLENBSmdDO0NBQTdCOztBQU9BLFNBQVMsTUFBVCxDQUFnQixJQUFoQixFQUFzQixJQUF0QixFQUEyQjtBQUM5QixRQUFJLFFBQU07QUFDWCxXQUFFLEtBQUssV0FBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFFBQUwsS0FBZ0IsQ0FBaEI7QUFDRixXQUFFLEtBQUssT0FBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFFBQUwsRUFBRjtBQUNBLFdBQUUsS0FBSyxVQUFMLEVBQUY7QUFDQSxXQUFFLEtBQUssVUFBTCxFQUFGO0tBTkssQ0FEMEI7QUFTOUIsV0FBTyxLQUFLLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLFVBQVMsS0FBVCxFQUFlLElBQWYsRUFBb0I7QUFDcEQsZUFBTyxNQUFNLFFBQU0sR0FBTixHQUFZLEtBQUssV0FBTCxFQUFaLEdBQWlDLElBQWpDLENBQU4sSUFBZ0QsRUFBaEQsQ0FENkM7S0FBcEIsQ0FBcEMsQ0FUOEI7Q0FBM0I7O0FBY0EsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQW9DO1FBQWYsMEVBQUksSUFBSSxJQUFKLEdBQVc7O0FBQzFDLFFBQUcsQ0FBQyxDQUFELEVBQUksT0FBTyxFQUFQLENBQVA7QUFDQSxRQUFHLE9BQU8sQ0FBUCxJQUFXLFFBQVgsRUFDRixJQUFFLElBQUksSUFBSixDQUFTLENBQVQsQ0FBRixDQUREOztBQUdBLFdBQU8sT0FBTyxDQUFQLEVBQVUsNEJBQVksR0FBWixFQUFnQixDQUFoQixJQUFxQixVQUFyQixHQUNaLEVBQUUsV0FBRixNQUFpQixJQUFJLFdBQUosRUFBakIsR0FBcUMsUUFBckMsR0FBZ0QsYUFBaEQsQ0FETCxDQUwwQztDQUFwQzs7QUFTUCxJQUFNLGtCQUFrQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjtBQUNDLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsT0FBbEMsRUFBMkM7QUFDOUMsUUFBSSwyR0FBd0IsZUFBeEIsQ0FEMEM7QUFFOUMsU0FBSyxNQUFMLEdBQWMsVUFBUyxJQUFULEVBQWU7QUFDekIsWUFBSSxRQUFRLE9BQVIsS0FBb0IsUUFBcEIsRUFDRixPQUFPLGdCQUFnQixLQUFLLE1BQUwsRUFBaEIsQ0FBUCxDQURGO0FBRUEsZUFBTyxFQUFFLE1BQUYsVUFBWSxTQUFaLENBQVAsQ0FIeUI7S0FBZixDQUZnQztDQUEzQzs7SUFTYyIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgX0NhbGVuZGFyIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvQ2FsZW5kYXInXG5cbmltcG9ydCB7aXNFcXVhbERhdGUsIGNsb25lQXNEYXRlLCBnZXREYXlzSW5Nb250aCxkYXRlVGltZUZvcm1hdH0gZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuLy9leHBvcnQgKiBmcm9tIFwibWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9kYXRlVXRpbHNcIlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFzdERheU9mTW9udGgoZCl7XG4gICAgbGV0IGRheXM9Z2V0RGF5c0luTW9udGgoZClcbiAgICBjb25zdCBkYXRlPWNsb25lQXNEYXRlKGQpXG4gICAgZGF0ZS5zZXREYXRlKGRheXMpXG4gICAgcmV0dXJuIGRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkYXRlLCB0bXBsKXtcbiAgICBsZXQgdmFsdWU9e1xuXHRcdFx0eTpkYXRlLmdldEZ1bGxZZWFyKCksXG5cdFx0XHRNOmRhdGUuZ2V0TW9udGgoKSsxLFxuXHRcdFx0ZDpkYXRlLmdldERhdGUoKSxcblx0XHRcdGg6ZGF0ZS5nZXRIb3VycygpLFxuXHRcdFx0bTpkYXRlLmdldE1pbnV0ZXMoKSxcblx0XHRcdHM6ZGF0ZS5nZXRTZWNvbmRzKClcblx0XHR9XG4gICAgcmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XG4gICAgICAgIHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGQsIG5vdz1uZXcgRGF0ZSgpKXtcblx0aWYoIWQpIHJldHVybiBcIlwiXG5cdGlmKHR5cGVvZihkKT09J3N0cmluZycpXG5cdFx0ZD1uZXcgRGF0ZShkKVxuXG5cdHJldHVybiBmb3JtYXQoZCwgaXNFcXVhbERhdGUobm93LGQpID8gXCLku4rlpKkgSEg6bW1cIiA6XG5cdFx0XHRcdFx0XHRkLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gXCJNTeaciERE5pelXCIgOiBcIllZWVnlubRNTeaciERE5pelXCIpXG59XG5cbmNvbnN0IGRheUFiYnJldmlhdGlvbiA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ11cbmV4cG9ydCBmdW5jdGlvbiBjbkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykge1xuICAgIGxldCBhPW5ldyBkYXRlVGltZUZvcm1hdCguLi5hcmd1bWVudHMpXG4gICAgdGhpcy5mb3JtYXQgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLndlZWtkYXkgPT09ICduYXJyb3cnKVxuICAgICAgICAgIHJldHVybiBkYXlBYmJyZXZpYXRpb25bZGF0ZS5nZXREYXkoKV1cbiAgICAgICAgcmV0dXJuIGEuZm9ybWF0KC4uLmFyZ3VtZW50cylcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIF9DYWxlbmRhcntcblxufVxuIl19