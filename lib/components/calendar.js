'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _DayButton = require('material-ui/DatePicker/DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

var _dateUtils = require('material-ui/DatePicker/dateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));

    var _this$props$selected = _this.props.selected;
    var selected = _this$props$selected === undefined ? [] : _this$props$selected;

    if (!Array.isArray(selected)) {
      if (selected) selected = [selected];
    }
    selected = selected || [];
    selected.forEach(function (a) {
      return a.setHours(0, 0, 0, 0);
    });
    _this.state = { selected: selected };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$selected = nextProps.selected;
      var selected = _nextProps$selected === undefined ? [] : _nextProps$selected;

      if (!Array.isArray(selected)) {
        if (selected) selected = [selected];
      }
      selected = selected || [];
      selected.forEach(function (a) {
        return a.setHours(0, 0, 0, 0);
      });
      this.setState({ selected: selected });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = {
        root: {
          lineHeight: '32px',
          textAlign: 'center',
          padding: '8px 14px 0 14px',
          width: 280,
          margin: '0 auto'
        },
        weekTitle: {
          padding: 0,
          lineHeight: '12px',
          height: '12px',
          fontWeight: '500'
        },
        weekTitleDay: {
          listStyle: 'none',
          float: 'left',
          width: '32px',
          textAlign: 'center',
          margin: '0 2px'
        }
      };
      return _qiliApp.React.createElement(
        'div',
        { style: styles.root },
        _qiliApp.React.createElement(
          'ul',
          { style: styles.weekTitle },
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'S'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'M'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'W'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'F'
          ),
          _qiliApp.React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'S'
          )
        ),
        this._getWeekElements()
      );
    }
  }, {
    key: '_getWeekElements',
    value: function _getWeekElements() {
      var weekArray = (0, _dateUtils.getWeekArray)(this.props.displayDate);

      return weekArray.map(function (week, i) {
        return _qiliApp.React.createElement(
          'div',
          { key: i },
          this._getDayElements(week, i)
        );
      }, this);
    }
  }, {
    key: '_getDayElements',
    value: function _getDayElements(week, i) {
      var selecteds = this.state.selected;
      return week.map(function (day, j) {
        var disabled = this._shouldDisableDate(day);
        var selected = day && !disabled && selecteds.find(function (a) {
          return a.getTime() == day.getTime();
        });

        return _qiliApp.React.createElement(_DayButton2.default, {
          key: 'db' + i + j,
          date: day,
          onTouchTap: this._handleDayTouchTap.bind(this),
          selected: !!selected,
          disabled: disabled });
      }, this);
    }
  }, {
    key: '_handleDayTouchTap',
    value: function _handleDayTouchTap(e, date) {
      var _props = this.props;
      var onDayTouchTap = _props.onDayTouchTap;
      var multiple = _props.multiple;
      var selected = this.state.selected;
      var found = selected.findIndex(function (a) {
        return a.getTime() == date.getTime;
      });

      if (multiple) {
        found == -1 ? selected.push(date) : selected.splice(found, 1);
        onDayTouchTap && onDayTouchTap(selected);
      } else if (found == -1) {
        selected = [date];
        onDayTouchTap && onDayTouchTap(date);
      } else return;

      this.setState({ selected: selected });
    }
  }, {
    key: '_shouldDisableDate',
    value: function _shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !(0, _dateUtils.isBetweenDates)(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }
  }]);

  return Calendar;
}(_qiliApp.Component);

Calendar.propTypes = {
  displayDate: _qiliApp.React.PropTypes.object.isRequired,
  onDayTouchTap: _qiliApp.React.PropTypes.func,
  minDate: _qiliApp.React.PropTypes.object.isRequired,
  maxDate: _qiliApp.React.PropTypes.object.isRequired,
  shouldDisableDate: _qiliApp.React.PropTypes.func,
  multiple: _qiliApp.React.PropTypes.bool
};
Calendar.addDays = _dateUtils.addDays;
Calendar.isEqualDate = _dateUtils.isEqualDate;

Calendar.format = function (date, tmpl) {
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
};

Calendar.relative = function (d) {
  var now = arguments.length <= 1 || arguments[1] === undefined ? new Date() : arguments[1];

  if (!d) return "";
  if (typeof d == 'string') d = new Date(d);

  return Calendar.format(d, (0, _dateUtils.isEqualDate)(now, d) ? "今天 HH:mm" : d.getFullYear() == now.getFullYear() ? "MM月DD日" : "YYYY年MM月DD日");
};

exports.default = Calendar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLFdBRGlCLFFBQ2pCLENBQVksS0FBWixFQUFrQjswQkFERCxVQUNDOzt1RUFERCxxQkFFUCxRQURROzsrQkFFSSxNQUFLLEtBQUwsQ0FBYixTQUZTO1FBRVQsZ0RBQVMsMEJBRkE7O0FBR2QsUUFBRyxDQUFDLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBRCxFQUF5QjtBQUN4QixVQUFHLFFBQUgsRUFDSSxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7S0FESjtBQUlBLGVBQVMsWUFBVSxFQUFWLENBUEs7QUFRZCxhQUFTLE9BQVQsQ0FBaUI7YUFBRyxFQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakI7S0FBSCxDQUFqQixDQVJjO0FBU2QsVUFBSyxLQUFMLEdBQVcsRUFBQyxrQkFBRCxFQUFYLENBVGM7O0dBQWxCOztlQURpQjs7OENBWVMsV0FBVTtnQ0FDZCxVQUFiLFNBRDJCO1VBQzNCLCtDQUFTLHlCQURrQjs7QUFFaEMsVUFBRyxDQUFDLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBRCxFQUF5QjtBQUN4QixZQUFHLFFBQUgsRUFDSSxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7T0FESjtBQUlBLGlCQUFTLFlBQVUsRUFBVixDQU51QjtBQU9oQyxlQUFTLE9BQVQsQ0FBaUI7ZUFBRyxFQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakI7T0FBSCxDQUFqQixDQVBnQztBQVFoQyxXQUFLLFFBQUwsQ0FBYyxFQUFDLGtCQUFELEVBQWQsRUFSZ0M7Ozs7NkJBVTNCO0FBQ1AsVUFBSSxTQUFTO0FBQ1AsY0FBSztBQUNELHNCQUFZLE1BQVo7QUFDQSxxQkFBVyxRQUFYO0FBQ0EsbUJBQVMsaUJB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LEVBQWhELENBRDZDO0dBQXBCLENBQXBDLENBVDhCO0NBQXBCOztBQS9IRyxTQTZJYixXQUFTLFVBQVMsQ0FBVCxFQUEyQjtNQUFmLDREQUFJLElBQUksSUFBSixrQkFBVzs7QUFDMUMsTUFBRyxDQUFDLENBQUQsRUFBSSxPQUFPLEVBQVAsQ0FBUDtBQUNBLE1BQUcsT0FBTyxDQUFQLElBQVcsUUFBWCxFQUNGLElBQUUsSUFBSSxJQUFKLENBQVMsQ0FBVCxDQUFGLENBREQ7O0FBR0EsU0FBTyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUIsNEJBQVksR0FBWixFQUFnQixDQUFoQixJQUFxQixVQUFyQixHQUNyQixFQUFFLFdBQUYsTUFBaUIsSUFBSSxXQUFKLEVBQWpCLEdBQXFDLFFBQXJDLEdBQWdELGFBQWhELENBREwsQ0FMMEM7Q0FBM0I7O2tCQTdJSSIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudH0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgRGF5QnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvRGF5QnV0dG9uJ1xuaW1wb3J0IHtnZXRXZWVrQXJyYXksaXNCZXR3ZWVuRGF0ZXMsYWRkRGF5cywgaXNFcXVhbERhdGV9IGZyb20gXCJtYXRlcmlhbC11aS9EYXRlUGlja2VyL2RhdGVVdGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbGVuZGFyIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHZhciB7c2VsZWN0ZWQ9W119PXRoaXMucHJvcHNcbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPVtzZWxlY3RlZF1cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RlZD1zZWxlY3RlZHx8W11cbiAgICAgICAgc2VsZWN0ZWQuZm9yRWFjaChhPT5hLnNldEhvdXJzKDAsMCwwLDApKVxuICAgICAgICB0aGlzLnN0YXRlPXtzZWxlY3RlZH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3NlbGVjdGVkPVtdfT1uZXh0UHJvcHNcbiAgICAgICAgaWYoIUFycmF5LmlzQXJyYXkoc2VsZWN0ZWQpKXtcbiAgICAgICAgICAgIGlmKHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkPVtzZWxlY3RlZF1cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RlZD1zZWxlY3RlZHx8W11cbiAgICAgICAgc2VsZWN0ZWQuZm9yRWFjaChhPT5hLnNldEhvdXJzKDAsMCwwLDApKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtzZWxlY3RlZH0pXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgICByb290OntcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzJweCcsXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDE0cHggMCAxNHB4JyxcbiAgICAgICAgICAgICAgICB3aWR0aDoyODAsXG4gICAgICAgICAgICAgICAgbWFyZ2luOicwIGF1dG8nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2Vla1RpdGxlOiB7XG4gICAgICAgICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxMnB4JyxcbiAgICAgICAgICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2Vla1RpdGxlRGF5OiB7XG4gICAgICAgICAgICAgIGxpc3RTdHlsZTogJ25vbmUnLFxuICAgICAgICAgICAgICBmbG9hdDogJ2xlZnQnLFxuICAgICAgICAgICAgICB3aWR0aDogJzMycHgnLFxuICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICBtYXJnaW46ICcwIDJweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBzdHlsZT17c3R5bGVzLnJvb3R9PlxuICAgICAgICAgICAgPHVsIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlfT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5TPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5NPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5UPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5XPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5UPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5GPC9saT5cbiAgICAgICAgICAgICAgPGxpIHN0eWxlPXtzdHlsZXMud2Vla1RpdGxlRGF5fT5TPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAge3RoaXMuX2dldFdlZWtFbGVtZW50cygpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgX2dldFdlZWtFbGVtZW50cygpIHtcbiAgICAgIHZhciB3ZWVrQXJyYXkgPSBnZXRXZWVrQXJyYXkodGhpcy5wcm9wcy5kaXNwbGF5RGF0ZSk7XG5cbiAgICAgIHJldHVybiB3ZWVrQXJyYXkubWFwKGZ1bmN0aW9uKHdlZWssIGkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGtleT17aX0+XG4gICAgICAgICAgICB7dGhpcy5fZ2V0RGF5RWxlbWVudHMod2VlaywgaSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBfZ2V0RGF5RWxlbWVudHMod2VlaywgaSkge1xuICAgICAgICBsZXQgc2VsZWN0ZWRzPXRoaXMuc3RhdGUuc2VsZWN0ZWRcbiAgICAgIHJldHVybiB3ZWVrLm1hcChmdW5jdGlvbihkYXksIGopIHtcbiAgICAgICAgdmFyIGRpc2FibGVkID0gdGhpcy5fc2hvdWxkRGlzYWJsZURhdGUoZGF5KTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gZGF5ICYmICFkaXNhYmxlZCAmJiBzZWxlY3RlZHMuZmluZChhPT5hLmdldFRpbWUoKT09ZGF5LmdldFRpbWUoKSlcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxEYXlCdXR0b25cbiAgICAgICAgICAgIGtleT17J2RiJyArIGkgKyBqfVxuICAgICAgICAgICAgZGF0ZT17ZGF5fVxuICAgICAgICAgICAgb25Ub3VjaFRhcD17dGhpcy5faGFuZGxlRGF5VG91Y2hUYXAuYmluZCh0aGlzKX1cbiAgICAgICAgICAgIHNlbGVjdGVkPXshIXNlbGVjdGVkfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPlxuICAgICAgICApO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX2hhbmRsZURheVRvdWNoVGFwKGUsIGRhdGUpIHtcblx0XHR2YXIgICB7b25EYXlUb3VjaFRhcCwgbXVsdGlwbGV9PXRoaXMucHJvcHNcbiAgICAgICAgICAgICAgLHNlbGVjdGVkPXRoaXMuc3RhdGUuc2VsZWN0ZWRcbiAgICAgICAgICAgICAgLGZvdW5kPXNlbGVjdGVkLmZpbmRJbmRleChhPT5hLmdldFRpbWUoKT09ZGF0ZS5nZXRUaW1lKVxuXG4gICAgICAgIGlmKG11bHRpcGxlKXtcbiAgICAgICAgICAgIGZvdW5kPT0tMSA/IHNlbGVjdGVkLnB1c2goZGF0ZSkgOiBzZWxlY3RlZC5zcGxpY2UoZm91bmQsMSlcbiAgICAgICAgICAgIG9uRGF5VG91Y2hUYXAgJiYgb25EYXlUb3VjaFRhcChzZWxlY3RlZClcbiAgICAgICAgfWVsc2UgaWYoZm91bmQ9PS0xKXtcbiAgICAgICAgICAgIHNlbGVjdGVkPVtkYXRlXVxuICAgICAgICAgICAgb25EYXlUb3VjaFRhcCAmJiBvbkRheVRvdWNoVGFwKGRhdGUpXG4gICAgICAgIH1lbHNlXG4gICAgICAgICAgICByZXR1cm47XG5cblx0XHR0aGlzLnNldFN0YXRlKHtzZWxlY3RlZH0pXG4gICAgfVxuXG4gICAgX3Nob3VsZERpc2FibGVEYXRlKGRheSkge1xuICAgICAgaWYgKGRheSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIGRpc2FibGVkID0gIWlzQmV0d2VlbkRhdGVzKGRheSwgdGhpcy5wcm9wcy5taW5EYXRlLCB0aGlzLnByb3BzLm1heERhdGUpO1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3VsZERpc2FibGVEYXRlKSBkaXNhYmxlZCA9IHRoaXMucHJvcHMuc2hvdWxkRGlzYWJsZURhdGUoZGF5KTtcblxuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblxuXHRzdGF0aWMgcHJvcFR5cGVzPXtcblx0XHRkaXNwbGF5RGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdG9uRGF5VG91Y2hUYXA6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuXHRcdG1pbkRhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRtYXhEYXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0c2hvdWxkRGlzYWJsZURhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxuICAgICAgICBtdWx0aXBsZTogUmVhY3QuUHJvcFR5cGVzLmJvb2xcblx0fVxuXG5cdHN0YXRpYyBhZGREYXlzPWFkZERheXNcblx0c3RhdGljIGlzRXF1YWxEYXRlPWlzRXF1YWxEYXRlXG5cbiAgICBzdGF0aWMgZm9ybWF0PWZ1bmN0aW9uKGRhdGUsIHRtcGwpe1xuICAgICAgICBsZXQgdmFsdWU9e1xuXHRcdFx0XHR5OmRhdGUuZ2V0RnVsbFllYXIoKSwgXG5cdFx0XHRcdE06ZGF0ZS5nZXRNb250aCgpKzEsIFxuXHRcdFx0XHRkOmRhdGUuZ2V0RGF0ZSgpLCBcblx0XHRcdFx0aDpkYXRlLmdldEhvdXJzKCksIFxuXHRcdFx0XHRtOmRhdGUuZ2V0TWludXRlcygpLFxuXHRcdFx0XHRzOmRhdGUuZ2V0U2Vjb25kcygpXHRcblx0XHRcdH1cbiAgICAgICAgcmV0dXJuIHRtcGwucmVwbGFjZSgvKFt5bWRoc10pKy9pZywgZnVuY3Rpb24obWF0Y2gsdHlwZSl7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVbdHlwZSE9J00nID8gdHlwZS50b0xvd2VyQ2FzZSgpIDogdHlwZV0gfHwgXCJcIlxuICAgICAgICB9KVxuICAgIH1cblx0XG5cdHN0YXRpYyByZWxhdGl2ZT1mdW5jdGlvbihkLCBub3c9bmV3IERhdGUoKSl7XG5cdFx0aWYoIWQpIHJldHVybiBcIlwiXG5cdFx0aWYodHlwZW9mKGQpPT0nc3RyaW5nJylcblx0XHRcdGQ9bmV3IERhdGUoZClcblx0XHRcblx0XHRyZXR1cm4gQ2FsZW5kYXIuZm9ybWF0KGQsIGlzRXF1YWxEYXRlKG5vdyxkKSA/IFwi5LuK5aSpIEhIOm1tXCIgOiBcblx0XHRcdFx0XHRcdFx0ZC5nZXRGdWxsWWVhcigpPT1ub3cuZ2V0RnVsbFllYXIoKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxuXHR9XG59XG4iXX0=