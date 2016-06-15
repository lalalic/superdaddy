'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dateUtils = require('material-ui/DatePicker/dateUtils');

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

var _qiliApp = require('qili-app');

var _Calendar3 = require('material-ui/DatePicker/Calendar');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBOztBQUVBOzs7Ozs7Ozs7UUFFZ0I7UUFPQTtRQWNBO1FBVUE7O0FBckNoQjs7QUFDQTs7Ozs7Ozs7Ozs7O0FBS08sU0FBUyxpQkFBVCxDQUEyQixDQUEzQixFQUE2QjtBQUNoQyxRQUFJLE9BQUssK0JBQWUsQ0FBZixDQUFMLENBRDRCO0FBRWhDLFFBQU0sT0FBSyw0QkFBWSxDQUFaLENBQUwsQ0FGMEI7QUFHaEMsU0FBSyxPQUFMLENBQWEsSUFBYixFQUhnQztBQUloQyxXQUFPLElBQVAsQ0FKZ0M7Q0FBN0I7O0FBT0EsU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCLElBQXRCLEVBQTJCO0FBQzlCLFFBQUksUUFBTTtBQUNYLFdBQUUsS0FBSyxXQUFMLEVBQUY7QUFDQSxXQUFFLEtBQUssUUFBTCxLQUFnQixDQUFoQjtBQUNGLFdBQUUsS0FBSyxPQUFMLEVBQUY7QUFDQSxXQUFFLEtBQUssUUFBTCxFQUFGO0FBQ0EsV0FBRSxLQUFLLFVBQUwsRUFBRjtBQUNBLFdBQUUsS0FBSyxVQUFMLEVBQUY7S0FOSyxDQUQwQjtBQVM5QixXQUFPLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNkIsVUFBUyxLQUFULEVBQWUsSUFBZixFQUFvQjtBQUNwRCxlQUFPLE1BQU0sUUFBTSxHQUFOLEdBQVksS0FBSyxXQUFMLEVBQVosR0FBaUMsSUFBakMsQ0FBTixJQUFnRCxFQUFoRCxDQUQ2QztLQUFwQixDQUFwQyxDQVQ4QjtDQUEzQjs7QUFjQSxTQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBb0M7UUFBZiw0REFBSSxJQUFJLElBQUosa0JBQVc7O0FBQzFDLFFBQUcsQ0FBQyxDQUFELEVBQUksT0FBTyxFQUFQLENBQVA7QUFDQSxRQUFHLE9BQU8sQ0FBUCxJQUFXLFFBQVgsRUFDRixJQUFFLElBQUksSUFBSixDQUFTLENBQVQsQ0FBRixDQUREOztBQUdBLFdBQU8sT0FBTyxDQUFQLEVBQVUsNEJBQVksR0FBWixFQUFnQixDQUFoQixJQUFxQixVQUFyQixHQUNaLEVBQUUsV0FBRixNQUFpQixJQUFJLFdBQUosRUFBakIsR0FBcUMsUUFBckMsR0FBZ0QsYUFBaEQsQ0FETCxDQUwwQztDQUFwQzs7QUFTUCxJQUFNLGtCQUFrQixDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQixDQUFsQjtBQUNDLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBMUIsRUFBa0MsT0FBbEMsRUFBMkM7QUFDOUMsUUFBSSwyR0FBd0IsZUFBeEIsQ0FEMEM7QUFFOUMsU0FBSyxNQUFMLEdBQWMsVUFBUyxJQUFULEVBQWU7QUFDekIsWUFBSSxRQUFRLE9BQVIsS0FBb0IsUUFBcEIsRUFDRixPQUFPLGdCQUFnQixLQUFLLE1BQUwsRUFBaEIsQ0FBUCxDQURGO0FBRUEsZUFBTyxFQUFFLE1BQUYsVUFBWSxTQUFaLENBQVAsQ0FIeUI7S0FBZixDQUZnQztDQUEzQzs7SUFTYyIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudH0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgX0NhbGVuZGFyIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvQ2FsZW5kYXInXG5pbXBvcnQge2lzRXF1YWxEYXRlLCBjbG9uZUFzRGF0ZSwgZ2V0RGF5c0luTW9udGgsZGF0ZVRpbWVGb3JtYXR9IGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXG5cbmV4cG9ydCAqIGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXN0RGF5T2ZNb250aChkKXtcbiAgICBsZXQgZGF5cz1nZXREYXlzSW5Nb250aChkKVxuICAgIGNvbnN0IGRhdGU9Y2xvbmVBc0RhdGUoZClcbiAgICBkYXRlLnNldERhdGUoZGF5cylcbiAgICByZXR1cm4gZGF0ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0KGRhdGUsIHRtcGwpe1xuICAgIGxldCB2YWx1ZT17XG5cdFx0XHR5OmRhdGUuZ2V0RnVsbFllYXIoKSxcblx0XHRcdE06ZGF0ZS5nZXRNb250aCgpKzEsXG5cdFx0XHRkOmRhdGUuZ2V0RGF0ZSgpLFxuXHRcdFx0aDpkYXRlLmdldEhvdXJzKCksXG5cdFx0XHRtOmRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0czpkYXRlLmdldFNlY29uZHMoKVxuXHRcdH1cbiAgICByZXR1cm4gdG1wbC5yZXBsYWNlKC8oW3ltZGhzXSkrL2lnLCBmdW5jdGlvbihtYXRjaCx0eXBlKXtcbiAgICAgICAgcmV0dXJuIHZhbHVlW3R5cGUhPSdNJyA/IHR5cGUudG9Mb3dlckNhc2UoKSA6IHR5cGVdIHx8IFwiXCJcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVsYXRpdmUoZCwgbm93PW5ldyBEYXRlKCkpe1xuXHRpZighZCkgcmV0dXJuIFwiXCJcblx0aWYodHlwZW9mKGQpPT0nc3RyaW5nJylcblx0XHRkPW5ldyBEYXRlKGQpXG5cblx0cmV0dXJuIGZvcm1hdChkLCBpc0VxdWFsRGF0ZShub3csZCkgPyBcIuS7iuWkqSBISDptbVwiIDpcblx0XHRcdFx0XHRcdGQuZ2V0RnVsbFllYXIoKT09bm93LmdldEZ1bGxZZWFyKCkgPyBcIk1N5pyIRETml6VcIiA6IFwiWVlZWeW5tE1N5pyIRETml6VcIilcbn1cblxuY29uc3QgZGF5QWJicmV2aWF0aW9uID0gWyfml6UnLCAn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nXVxuZXhwb3J0IGZ1bmN0aW9uIGNuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKSB7XG4gICAgbGV0IGE9bmV3IGRhdGVUaW1lRm9ybWF0KC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLmZvcm1hdCA9IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMud2Vla2RheSA9PT0gJ25hcnJvdycpXG4gICAgICAgICAgcmV0dXJuIGRheUFiYnJldmlhdGlvbltkYXRlLmdldERheSgpXVxuICAgICAgICByZXR1cm4gYS5mb3JtYXQoLi4uYXJndW1lbnRzKVxuICAgIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgX0NhbGVuZGFye1xuICAgIFxufVxuIl19