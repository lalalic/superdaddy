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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbImdldExhc3REYXlPZk1vbnRoIiwiZm9ybWF0IiwicmVsYXRpdmUiLCJjbkRhdGVUaW1lRm9ybWF0IiwiZCIsImRheXMiLCJkYXRlIiwic2V0RGF0ZSIsInRtcGwiLCJ2YWx1ZSIsInkiLCJnZXRGdWxsWWVhciIsIk0iLCJnZXRNb250aCIsImdldERhdGUiLCJoIiwiZ2V0SG91cnMiLCJtIiwiZ2V0TWludXRlcyIsInMiLCJnZXRTZWNvbmRzIiwicmVwbGFjZSIsIm1hdGNoIiwidHlwZSIsInRvTG93ZXJDYXNlIiwibm93IiwiRGF0ZSIsImRheUFiYnJldmlhdGlvbiIsImxvY2FsZSIsIm9wdGlvbnMiLCJhIiwiYXJndW1lbnRzIiwid2Vla2RheSIsImdldERheSIsIkNhbGVuZGFyIl0sIm1hcHBpbmdzIjoiOzs7OztRQVFnQkEsaUIsR0FBQUEsaUI7UUFPQUMsTSxHQUFBQSxNO1FBY0FDLFEsR0FBQUEsUTtRQVVBQyxnQixHQUFBQSxnQjs7QUF2Q2hCOzs7O0FBRUE7Ozs7QUFFQTs7Ozs7Ozs7OztBQUVBOztBQUVPLFNBQVNILGlCQUFULENBQTJCSSxDQUEzQixFQUE2QjtBQUNoQyxRQUFJQyxPQUFLLCtCQUFlRCxDQUFmLENBQVQ7QUFDQSxRQUFNRSxPQUFLLDRCQUFZRixDQUFaLENBQVg7QUFDQUUsU0FBS0MsT0FBTCxDQUFhRixJQUFiO0FBQ0EsV0FBT0MsSUFBUDtBQUNIOztBQUVNLFNBQVNMLE1BQVQsQ0FBZ0JLLElBQWhCLEVBQXNCRSxJQUF0QixFQUEyQjtBQUM5QixRQUFJQyxRQUFNO0FBQ1hDLFdBQUVKLEtBQUtLLFdBQUwsRUFEUztBQUVYQyxXQUFFTixLQUFLTyxRQUFMLEtBQWdCLENBRlA7QUFHWFQsV0FBRUUsS0FBS1EsT0FBTCxFQUhTO0FBSVhDLFdBQUVULEtBQUtVLFFBQUwsRUFKUztBQUtYQyxXQUFFWCxLQUFLWSxVQUFMLEVBTFM7QUFNWEMsV0FBRWIsS0FBS2MsVUFBTDtBQU5TLEtBQVY7QUFRQSxXQUFPWixLQUFLYSxPQUFMLENBQWEsY0FBYixFQUE2QixVQUFTQyxLQUFULEVBQWVDLElBQWYsRUFBb0I7QUFDcEQsZUFBT2QsTUFBTWMsUUFBTSxHQUFOLEdBQVlBLEtBQUtDLFdBQUwsRUFBWixHQUFpQ0QsSUFBdkMsS0FBZ0QsRUFBdkQ7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFFTSxTQUFTckIsUUFBVCxDQUFrQkUsQ0FBbEIsRUFBb0M7QUFBQSxRQUFmcUIsR0FBZSx1RUFBWCxJQUFJQyxJQUFKLEVBQVc7O0FBQzFDLFFBQUcsQ0FBQ3RCLENBQUosRUFBTyxPQUFPLEVBQVA7QUFDUCxRQUFHLE9BQU9BLENBQVAsSUFBVyxRQUFkLEVBQ0NBLElBQUUsSUFBSXNCLElBQUosQ0FBU3RCLENBQVQsQ0FBRjs7QUFFRCxXQUFPSCxPQUFPRyxDQUFQLEVBQVUsNEJBQVlxQixHQUFaLEVBQWdCckIsQ0FBaEIsSUFBcUIsVUFBckIsR0FDWkEsRUFBRU8sV0FBRixNQUFpQmMsSUFBSWQsV0FBSixFQUFqQixHQUFxQyxRQUFyQyxHQUFnRCxhQUQ5QyxDQUFQO0FBRUE7O0FBRUQsSUFBTWdCLGtCQUFrQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUF4QjtBQUNPLFNBQVN4QixnQkFBVCxDQUEwQnlCLE1BQTFCLEVBQWtDQyxPQUFsQyxFQUEyQztBQUM5QyxRQUFJQywyR0FBd0JDLFNBQXhCLE1BQUo7QUFDQSxTQUFLOUIsTUFBTCxHQUFjLFVBQVNLLElBQVQsRUFBZTtBQUN6QixZQUFJdUIsUUFBUUcsT0FBUixLQUFvQixRQUF4QixFQUNFLE9BQU9MLGdCQUFnQnJCLEtBQUsyQixNQUFMLEVBQWhCLENBQVA7QUFDRixlQUFPSCxFQUFFN0IsTUFBRixVQUFZOEIsU0FBWixDQUFQO0FBQ0gsS0FKRDtBQUtIOztJQUVvQkcsUTs7Ozs7Ozs7Ozs7O2tCQUFBQSxRIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50LCBQcm9wVHlwZXN9IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCBfQ2FsZW5kYXIgZnJvbSAnbWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9DYWxlbmRhcidcblxuaW1wb3J0IHtpc0VxdWFsRGF0ZSwgY2xvbmVBc0RhdGUsIGdldERheXNJbk1vbnRoLGRhdGVUaW1lRm9ybWF0fSBmcm9tIFwibWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9kYXRlVXRpbHNcIlxuXG4vL2V4cG9ydCAqIGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXN0RGF5T2ZNb250aChkKXtcbiAgICBsZXQgZGF5cz1nZXREYXlzSW5Nb250aChkKVxuICAgIGNvbnN0IGRhdGU9Y2xvbmVBc0RhdGUoZClcbiAgICBkYXRlLnNldERhdGUoZGF5cylcbiAgICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KGRhdGUsIHRtcGwpe1xuICAgIGxldCB2YWx1ZT17XG5cdFx0XHR5OmRhdGUuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06ZGF0ZS5nZXRNb250aCgpKzEsXG5cdFx0XHRkOmRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0aDpkYXRlLmdldEhvdXJzKCksXG5cdFx0XHRtOmRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0czpkYXRlLmdldFNlY29uZHMoKVxuXHRcdH1cbiAgICByZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcbiAgICAgICAgcmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZCwgbm93PW5ldyBEYXRlKCkpe1xuXHRpZighZCkgcmV0dXJuIFwiXCJcblx0aWYodHlwZW9mKGQpPT0nc3RyaW5nJylcblx0XHRkPW5ldyBEYXRlKGQpXG5cblx0cmV0dXJuIGZvcm1hdChkLCBpc0VxdWFsRGF0ZShub3csZCkgPyBcIuS7iuWkqSBISDptbVwiIDpcblx0XHRcdFx0XHRcdGQuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyBcIk1N5pyIRETml6VcIiA6IFwiWVlZWeW5tE1N5pyIRETml6VcIilcbn1cblxuY29uc3QgZGF5QWJicmV2aWF0aW9uID0gWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXVxuZXhwb3J0IGZ1bmN0aW9uIGNuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgbGV0IGE9bmV3IGRhdGVUaW1lRm9ybWF0KC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLmZvcm1hdCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2Vla2RheSA9PT0gJ25hcnJvdycpXG4gICAgICAgICAgcmV0dXJuIGRheUFiYnJldmlhdGlvbltkYXRlLmdldERheSgpXVxuICAgICAgICByZXR1cm4gYS5mb3JtYXQoLi4uYXJndW1lbnRzKVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgX0NhbGVuZGFye1xuXG59XG4iXX0=