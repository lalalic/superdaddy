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

    _this.componentWillReceiveProps(_this.props);
    return _this;
  }

  _createClass(Calendar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var selected = nextProps.selected;

      this.state = {};
      if (Array.isArray(selected)) {
        Array.forEach(selected, function (a) {
          a.setHours(0, 0, 0, 0);
          this.state[a.getTime() + ''] = 1;
        });
      } else if (selected) {
        selected.setHours(0, 0, 0, 0);
        this.state[selected.getTime() + ''] = 1;
      }
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
      return week.map(function (day, j) {
        var disabled = this._shouldDisableDate(day);
        var selected = day && !disabled && this.state[day.getTime() + ''];

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
    value: function _handleDayTouchTap(e, date, i) {
      i = date.getTime() + '';
      var onDayTouchTap = this.props.onDayTouchTap;

      var state = {};
      state[i] = this.state[i] ? undefined : 1;

      this.setState(state);

      onDayTouchTap && onDayTouchTap(date);
      console.log(this.state);
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
  shouldDisableDate: _qiliApp.React.PropTypes.func
};
Calendar.addDays = _dateUtils.addDays;
exports.default = Calendar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLFdBRGlCLFFBQ2pCLENBQVksS0FBWixFQUFrQjswQkFERCxVQUNDOzt1RUFERCxxQkFFUCxRQURROztBQUVkLFVBQUsseUJBQUwsQ0FBK0IsTUFBSyxLQUFMLENBQS9CLENBRmM7O0dBQWxCOztlQURpQjs7OENBS1MsV0FBVTtVQUMzQixXQUFVLFVBQVYsU0FEMkI7O0FBRWhDLFdBQUssS0FBTCxHQUFXLEVBQVgsQ0FGZ0M7QUFHaEMsVUFBRyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUgsRUFBMkI7QUFDdkIsY0FBTSxPQUFOLENBQWMsUUFBZCxFQUF1QixVQUFTLENBQVQsRUFBVztBQUM5QixZQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFEOEI7QUFFOUIsZUFBSyxLQUFMLENBQVcsRUFBRSxPQUFGLEtBQVksRUFBWixDQUFYLEdBQTJCLENBQTNCLENBRjhCO1NBQVgsQ0FBdkIsQ0FEdUI7T0FBM0IsTUFLTSxJQUFHLFFBQUgsRUFBWTtBQUNkLGlCQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFEYztBQUVkLGFBQUssS0FBTCxDQUFXLFNBQVMsT0FBVCxLQUFtQixFQUFuQixDQUFYLEdBQWtDLENBQWxDLENBRmM7T0FBWjs7Ozs2QkFLRDtBQUNQLFVBQUksU0FBUztBQUNQLGNBQUs7QUFDRCxzQkFBWSxNQUFaO0FBQ0EscUJBQVcsUUFBWDtBQUNBLG1CQUFTLGlCQUFUO0FBQ0EsaUJBQU0sR0FBTjtBQUNBLGtCQUFPLFFBQVA7U0FMSjtBQU9BLG1CQUFXO0FBQ1QsbUJBQVMsQ0FBVDtBQUNBLHNCQUFZLE1BQVo7QUFDQSxrQkFBUSxNQUFSO0FBQ0Esc0JB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LGVBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULFdBQVMsZUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QscUJBQW1CLGVBQU0sU0FBTixDQUFnQixJQUFoQjs7QUE5R0EsU0FpSGI7a0JBakhhIiwiZmlsZSI6ImNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCwgQ29tcG9uZW50fSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCBEYXlCdXR0b24gZnJvbSAnbWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9EYXlCdXR0b24nXG5pbXBvcnQge2dldFdlZWtBcnJheSxpc0JldHdlZW5EYXRlcyxhZGREYXlzfSBmcm9tIFwibWF0ZXJpYWwtdWkvRGF0ZVBpY2tlci9kYXRlVXRpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3NlbGVjdGVkfT1uZXh0UHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICBBcnJheS5mb3JFYWNoKHNlbGVjdGVkLGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIGEuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlW2EuZ2V0VGltZSgpKycnXT0xXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZSBpZihzZWxlY3RlZCl7XG4gICAgICAgICAgICBzZWxlY3RlZC5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZVtzZWxlY3RlZC5nZXRUaW1lKCkrJyddPTFcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgcm9vdDp7XG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzMycHgnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4IDAgMTRweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6MjgwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjonMCBhdXRvJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTJweCcsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZURheToge1xuICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCAycHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fT5cbiAgICAgICAgICAgIDx1bCBzdHlsZT17c3R5bGVzLndlZWtUaXRsZX0+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+TTwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+RjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIHt0aGlzLl9nZXRXZWVrRWxlbWVudHMoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9nZXRXZWVrRWxlbWVudHMoKSB7XG4gICAgICB2YXIgd2Vla0FycmF5ID0gZ2V0V2Vla0FycmF5KHRoaXMucHJvcHMuZGlzcGxheURhdGUpO1xuXG4gICAgICByZXR1cm4gd2Vla0FycmF5Lm1hcChmdW5jdGlvbih3ZWVrLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2l9PlxuICAgICAgICAgICAge3RoaXMuX2dldERheUVsZW1lbnRzKHdlZWssIGkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX2dldERheUVsZW1lbnRzKHdlZWssIGkpIHtcbiAgICAgIHJldHVybiB3ZWVrLm1hcChmdW5jdGlvbihkYXksIGopIHtcbiAgICAgICAgdmFyIGRpc2FibGVkID0gdGhpcy5fc2hvdWxkRGlzYWJsZURhdGUoZGF5KTtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gZGF5ICYmICFkaXNhYmxlZCAmJiB0aGlzLnN0YXRlW2RheS5nZXRUaW1lKCkrJyddO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheUJ1dHRvblxuICAgICAgICAgICAga2V5PXsnZGInICsgaSArIGp9XG4gICAgICAgICAgICBkYXRlPXtkYXl9XG4gICAgICAgICAgICBvblRvdWNoVGFwPXt0aGlzLl9oYW5kbGVEYXlUb3VjaFRhcC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyEhc2VsZWN0ZWR9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+XG4gICAgICAgICk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRGF5VG91Y2hUYXAoZSwgZGF0ZSwgaSkge1xuXHRcdGk9KGRhdGUuZ2V0VGltZSgpKycnKTtcblx0XHR2YXIge29uRGF5VG91Y2hUYXB9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IHN0YXRlPXt9XG5cdFx0c3RhdGVbaV09dGhpcy5zdGF0ZVtpXSA/IHVuZGVmaW5lZCA6IDFcblx0XHRcblx0XHR0aGlzLnNldFN0YXRlKHN0YXRlKVxuXG4gICAgICAgIG9uRGF5VG91Y2hUYXAgJiYgb25EYXlUb3VjaFRhcChkYXRlKVxuXHRcdGNvbnNvbGUubG9nKHRoaXMuc3RhdGUpXG4gICAgfVxuXG4gICAgX3Nob3VsZERpc2FibGVEYXRlKGRheSkge1xuICAgICAgaWYgKGRheSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIGRpc2FibGVkID0gIWlzQmV0d2VlbkRhdGVzKGRheSwgdGhpcy5wcm9wcy5taW5EYXRlLCB0aGlzLnByb3BzLm1heERhdGUpO1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiB0aGlzLnByb3BzLnNob3VsZERpc2FibGVEYXRlKSBkaXNhYmxlZCA9IHRoaXMucHJvcHMuc2hvdWxkRGlzYWJsZURhdGUoZGF5KTtcblxuICAgICAgcmV0dXJuIGRpc2FibGVkO1xuICAgIH1cblx0XG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGRpc3BsYXlEYXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0b25EYXlUb3VjaFRhcDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bWluRGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdG1heERhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRzaG91bGREaXNhYmxlRGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmNcblx0fVxuXHRcblx0c3RhdGljIGFkZERheXM9YWRkRGF5c1xufVxuIl19