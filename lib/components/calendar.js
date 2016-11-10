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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImdldExhc3REYXlPZk1vbnRoIiwiZm9ybWF0IiwicmVsYXRpdmUiLCJjbkRhdGVUaW1lRm9ybWF0IiwiZCIsImRheXMiLCJkYXRlIiwic2V0RGF0ZSIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidHlwZSIsInRvTG93ZXJDYXNlIiwibm93IiwiRGF0ZSIsImRheUFiYnJldmlhdGlvbiIsImxvY2FsZSIsIm9wdGlvbnMiLCJhIiwiYXJndW1lbnRzIiwid2Vla2RheSIsImdldERheSIsIkNhbGVuZGFyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBUWdCQSxpQixHQUFBQSxpQjtRQU9BQyxNLEdBQUFBLE07UUFjQUMsUSxHQUFBQSxRO1FBVUFDLGdCLEdBQUFBLGdCOztBQXZDaEI7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7O0FBRU8sU0FBU0gsaUJBQVQsQ0FBMkJJLENBQTNCLEVBQTZCO0FBQ2hDLFFBQUlDLE9BQUssK0JBQWVELENBQWYsQ0FBVDtBQUNBLFFBQU1FLE9BQUssNEJBQVlGLENBQVosQ0FBWDtBQUNBRSxTQUFLQyxPQUFMLENBQWFGLElBQWI7QUFDQSxXQUFPQyxJQUFQO0FBQ0g7O0FBRU0sU0FBU0wsTUFBVCxDQUFnQkssSUFBaEIsRUFBc0JFLElBQXRCLEVBQTJCO0FBQzlCLFFBQUlDLFFBQU07QUFDWEMsV0FBRUosS0FBS0ssV0FBTCxFQURTO0FBRVhDLFdBQUVOLEtBQUtPLFFBQUwsS0FBZ0IsQ0FGUDtBQUdYVCxXQUFFRSxLQUFLUSxPQUFMLEVBSFM7QUFJWEMsV0FBRVQsS0FBS1UsUUFBTCxFQUpTO0FBS1hDLFdBQUVYLEtBQUtZLFVBQUwsRUFMUztBQU1YQyxXQUFFYixLQUFLYyxVQUFMO0FBTlMsS0FBVjtBQVFBLFdBQU9aLEtBQUthLE9BQUwsQ0FBYSxjQUFiLEVBQTZCLFVBQVNDLEtBQVQsRUFBZUMsSUFBZixFQUFvQjtBQUNwRCxlQUFPZCxNQUFNYyxRQUFNLEdBQU4sR0FBWUEsS0FBS0MsV0FBTCxFQUFaLEdBQWlDRCxJQUF2QyxLQUFnRCxFQUF2RDtBQUNILEtBRk0sQ0FBUDtBQUdIOztBQUVNLFNBQVNyQixRQUFULENBQWtCRSxDQUFsQixFQUFvQztBQUFBLFFBQWZxQixHQUFlLHVFQUFYLElBQUlDLElBQUosRUFBVzs7QUFDMUMsUUFBRyxDQUFDdEIsQ0FBSixFQUFPLE9BQU8sRUFBUDtBQUNQLFFBQUcsT0FBT0EsQ0FBUCxJQUFXLFFBQWQsRUFDQ0EsSUFBRSxJQUFJc0IsSUFBSixDQUFTdEIsQ0FBVCxDQUFGOztBQUVELFdBQU9ILE9BQU9HLENBQVAsRUFBVSw0QkFBWXFCLEdBQVosRUFBZ0JyQixDQUFoQixJQUFxQixVQUFyQixHQUNaQSxFQUFFTyxXQUFGLE1BQWlCYyxJQUFJZCxXQUFKLEVBQWpCLEdBQXFDLFFBQXJDLEdBQWdELGFBRDlDLENBQVA7QUFFQTs7QUFFRCxJQUFNZ0Isa0JBQWtCLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBQXhCO0FBQ08sU0FBU3hCLGdCQUFULENBQTBCeUIsTUFBMUIsRUFBa0NDLE9BQWxDLEVBQTJDO0FBQzlDLFFBQUlDLDJHQUF3QkMsU0FBeEIsTUFBSjtBQUNBLFNBQUs5QixNQUFMLEdBQWMsVUFBU0ssSUFBVCxFQUFlO0FBQ3pCLFlBQUl1QixRQUFRRyxPQUFSLEtBQW9CLFFBQXhCLEVBQ0UsT0FBT0wsZ0JBQWdCckIsS0FBSzJCLE1BQUwsRUFBaEIsQ0FBUDtBQUNGLGVBQU9ILEVBQUU3QixNQUFGLFVBQVk4QixTQUFaLENBQVA7QUFDSCxLQUpEO0FBS0g7O0lBRW9CRyxROzs7Ozs7Ozs7OztrQkFBQUEsUSIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge0NvbXBvbmVudCwgUHJvcFR5cGVzfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgX0NhbGVuZGFyIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvQ2FsZW5kYXInXG5cbmltcG9ydCB7aXNFcXVhbERhdGUsIGNsb25lQXNEYXRlLCBnZXREYXlzSW5Nb250aCxkYXRlVGltZUZvcm1hdH0gZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuLy9leHBvcnQgKiBmcm9tIFwibWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9kYXRlVXRpbHNcIlxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGFzdERheU9mTW9udGgoZCl7XG4gICAgbGV0IGRheXM9Z2V0RGF5c0luTW9udGgoZClcbiAgICBjb25zdCBkYXRlPWNsb25lQXNEYXRlKGQpXG4gICAgZGF0ZS5zZXREYXRlKGRheXMpXG4gICAgcmV0dXJuIGRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdChkYXRlLCB0bXBsKXtcbiAgICBsZXQgdmFsdWU9e1xuXHRcdFx0eTpkYXRlLmdldEZ1bGxZZWFyKCksXG5cdFx0XHRNOmRhdGUuZ2V0TW9udGgoKSsxLFxuXHRcdFx0ZDpkYXRlLmdldERhdGUoKSxcblx0XHRcdGg6ZGF0ZS5nZXRIb3VycygpLFxuXHRcdFx0bTpkYXRlLmdldE1pbnV0ZXMoKSxcblx0XHRcdHM6ZGF0ZS5nZXRTZWNvbmRzKClcblx0XHR9XG4gICAgcmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XG4gICAgICAgIHJldHVybiB2YWx1ZVt0eXBlIT0nTScgPyB0eXBlLnRvTG93ZXJDYXNlKCkgOiB0eXBlXSB8fCBcIlwiXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlKGQsIG5vdz1uZXcgRGF0ZSgpKXtcblx0aWYoIWQpIHJldHVybiBcIlwiXG5cdGlmKHR5cGVvZihkKT09J3N0cmluZycpXG5cdFx0ZD1uZXcgRGF0ZShkKVxuXG5cdHJldHVybiBmb3JtYXQoZCwgaXNFcXVhbERhdGUobm93LGQpID8gXCLku4rlpKkgSEg6bW1cIiA6XG5cdFx0XHRcdFx0XHRkLmdldEZ1bGxZZWFyKCk9PW5vdy5nZXRGdWxsWWVhcigpID8gXCJNTeaciERE5pelXCIgOiBcIllZWVnlubRNTeaciERE5pelXCIpXG59XG5cbmNvbnN0IGRheUFiYnJldmlhdGlvbiA9IFsn5pelJywgJ+S4gCcsICfkuownLCAn5LiJJywgJ+WbmycsICfkupQnLCAn5YWtJ11cbmV4cG9ydCBmdW5jdGlvbiBjbkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykge1xuICAgIGxldCBhPW5ldyBkYXRlVGltZUZvcm1hdCguLi5hcmd1bWVudHMpXG4gICAgdGhpcy5mb3JtYXQgPSBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLndlZWtkYXkgPT09ICduYXJyb3cnKVxuICAgICAgICAgIHJldHVybiBkYXlBYmJyZXZpYXRpb25bZGF0ZS5nZXREYXkoKV1cbiAgICAgICAgcmV0dXJuIGEuZm9ybWF0KC4uLmFyZ3VtZW50cylcbiAgICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIF9DYWxlbmRhcntcblxufVxuIl19