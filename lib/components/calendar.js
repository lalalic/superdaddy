'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _DayButton = require('material-ui/DatePicker/DayButton');

var _DayButton2 = _interopRequireDefault(_DayButton);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
      var weekArray = _moment2.default.getWeekArray(this.props.displayDate);

      return weekArray.map(function (week, i) {
        return _qiliApp.React.createElement(
          _materialUi.ClearFix,
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
        var selected = day && !disabled && this.state[day.getTime() + ''] && true;

        return _qiliApp.React.createElement(_DayButton2.default, {
          key: 'db' + i + j,
          date: day,
          onTouchTap: this._handleDayTouchTap.bind(this),
          selected: selected,
          disabled: disabled });
      }, this);
    }
  }, {
    key: '_handleDayTouchTap',
    value: function _handleDayTouchTap(e, date, i) {
      if (this.state[i = date.getTime() + '']) delete this.state[i];else this.setState({ i: 1 });
      var onDayTouchTap = this.props.onDayTouchTap;

      onDayTouchTap && onDayTouchTap(date);
    }
  }, {
    key: '_shouldDisableDate',
    value: function _shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !_moment2.default.isBetweenDates(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }
  }]);

  return Calendar;
}(_qiliApp.Component);

exports.default = Calendar;

Calendar.propTypes = {
  displayDate: _qiliApp.React.PropTypes.object.isRequired,
  onDayTouchTap: _qiliApp.React.PropTypes.func,
  minDate: _qiliApp.React.PropTypes.object.isRequired,
  maxDate: _qiliApp.React.PropTypes.object.isRequired,
  shouldDisableDate: _qiliApp.React.PropTypes.func
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDakIsV0FEaUIsUUFDakIsQ0FBWSxLQUFaLEVBQWtCOzBCQURELFVBQ0M7O3VFQURELHFCQUVQLFFBRFE7O0FBRWQsVUFBSyx5QkFBTCxDQUErQixNQUFLLEtBQUwsQ0FBL0IsQ0FGYzs7R0FBbEI7O2VBRGlCOzs4Q0FLUyxXQUFVO1VBQzNCLFdBQVUsVUFBVixTQUQyQjs7QUFFaEMsV0FBSyxLQUFMLEdBQVcsRUFBWCxDQUZnQztBQUdoQyxVQUFHLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBSCxFQUEyQjtBQUN2QixjQUFNLE9BQU4sQ0FBYyxRQUFkLEVBQXVCLFVBQVMsQ0FBVCxFQUFXO0FBQzlCLFlBQUUsUUFBRixDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUQ4QjtBQUU5QixlQUFLLEtBQUwsQ0FBVyxFQUFFLE9BQUYsS0FBWSxFQUFaLENBQVgsR0FBMkIsQ0FBM0IsQ0FGOEI7U0FBWCxDQUF2QixDQUR1QjtPQUEzQixNQUtNLElBQUcsUUFBSCxFQUFZO0FBQ2QsaUJBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUFzQixDQUF0QixFQUF3QixDQUF4QixFQURjO0FBRWQsYUFBSyxLQUFMLENBQVcsU0FBUyxPQUFULEtBQW1CLEVBQW5CLENBQVgsR0FBa0MsQ0FBbEMsQ0FGYztPQUFaOzs7OzZCQUtEO0FBQ1AsVUFBSSxTQUFTO0FBQ1AsY0FBSztBQUNELHNCQUFZLE1BQVo7QUFDQSxxQkFBVyxRQUFYO0FBQ0EsbUJBQVMsaUJBQVQ7QUFDQSxpQkFBTSxHQUFOO0FBQ0Esa0JBQU8sUUFBUDtTQUxKO0FBT0EsbUJBQVc7QUFDVCxtQkFBUyxDQUFUO0FBQ0Esc0JBQVksTUFBWjtBQUNBLGtCQUFRLE1BQVI7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Q0FBdUIsVUFBdkI7QUFDVCxXQUFTLGVBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULHFCQUFtQixlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7Q0FMckIiLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LCBDb21wb25lbnR9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtDbGVhckZpeH0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgRGF5QnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvRGF5QnV0dG9uJ1xuaW1wb3J0IERhdGVUaW1lIGZyb20gXCJtb21lbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3NlbGVjdGVkfT1uZXh0UHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICBBcnJheS5mb3JFYWNoKHNlbGVjdGVkLGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIGEuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlW2EuZ2V0VGltZSgpKycnXT0xXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZSBpZihzZWxlY3RlZCl7XG4gICAgICAgICAgICBzZWxlY3RlZC5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZVtzZWxlY3RlZC5nZXRUaW1lKCkrJyddPTFcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgcm9vdDp7XG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzMycHgnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4IDAgMTRweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6MjgwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjonMCBhdXRvJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTJweCcsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZURheToge1xuICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCAycHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fT5cbiAgICAgICAgICAgIDx1bCBzdHlsZT17c3R5bGVzLndlZWtUaXRsZX0+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+TTwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+RjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIHt0aGlzLl9nZXRXZWVrRWxlbWVudHMoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9nZXRXZWVrRWxlbWVudHMoKSB7XG4gICAgICB2YXIgd2Vla0FycmF5ID0gRGF0ZVRpbWUuZ2V0V2Vla0FycmF5KHRoaXMucHJvcHMuZGlzcGxheURhdGUpO1xuXG4gICAgICByZXR1cm4gd2Vla0FycmF5Lm1hcChmdW5jdGlvbih3ZWVrLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENsZWFyRml4IGtleT17aX0+XG4gICAgICAgICAgICB7dGhpcy5fZ2V0RGF5RWxlbWVudHMod2VlaywgaSl9XG4gICAgICAgICAgPC9DbGVhckZpeD5cbiAgICAgICAgKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIF9nZXREYXlFbGVtZW50cyh3ZWVrLCBpKSB7XG4gICAgICByZXR1cm4gd2Vlay5tYXAoZnVuY3Rpb24oZGF5LCBqKSB7XG4gICAgICAgIHZhciBkaXNhYmxlZCA9IHRoaXMuX3Nob3VsZERpc2FibGVEYXRlKGRheSk7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IGRheSAmJiAhZGlzYWJsZWQgJiYgdGhpcy5zdGF0ZVtkYXkuZ2V0VGltZSgpKycnXSAmJiB0cnVlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheUJ1dHRvblxuICAgICAgICAgICAga2V5PXsnZGInICsgaSArIGp9XG4gICAgICAgICAgICBkYXRlPXtkYXl9XG4gICAgICAgICAgICBvblRvdWNoVGFwPXt0aGlzLl9oYW5kbGVEYXlUb3VjaFRhcC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPlxuICAgICAgICApO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX2hhbmRsZURheVRvdWNoVGFwKGUsIGRhdGUsIGkpIHtcbiAgICAgICAgaWYodGhpcy5zdGF0ZVtpPShkYXRlLmdldFRpbWUoKSsnJyldKVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGVbaV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aToxfSlcbiAgICAgICAgdmFyIHtvbkRheVRvdWNoVGFwfT10aGlzLnByb3BzXG4gICAgICAgIG9uRGF5VG91Y2hUYXAgJiYgb25EYXlUb3VjaFRhcChkYXRlKVxuICAgIH1cblxuICAgIF9zaG91bGREaXNhYmxlRGF0ZShkYXkpIHtcbiAgICAgIGlmIChkYXkgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBkaXNhYmxlZCA9ICFEYXRlVGltZS5pc0JldHdlZW5EYXRlcyhkYXksIHRoaXMucHJvcHMubWluRGF0ZSwgdGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG91bGREaXNhYmxlRGF0ZSkgZGlzYWJsZWQgPSB0aGlzLnByb3BzLnNob3VsZERpc2FibGVEYXRlKGRheSk7XG5cbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG59XG5DYWxlbmRhci5wcm9wVHlwZXM9e1xuICBkaXNwbGF5RGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkRheVRvdWNoVGFwOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgbWluRGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBtYXhEYXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHNob3VsZERpc2FibGVEYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuIl19