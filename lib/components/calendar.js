'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var React = _require.React;

var _require2 = require('material-ui');

var ClearFix = _require2.ClearFix;
var DayButton = require('material-ui/DatePicker/DayButton');
var DateTime = Date.Helper;
var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

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
      return React.createElement(
        'div',
        { style: styles.root },
        React.createElement(
          'ul',
          { style: styles.weekTitle },
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'S'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'M'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'W'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'T'
          ),
          React.createElement(
            'li',
            { style: styles.weekTitleDay },
            'F'
          ),
          React.createElement(
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
      var weekArray = DateTime.getWeekArray(this.props.displayDate);

      return weekArray.map(function (week, i) {
        return React.createElement(
          ClearFix,
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

        return React.createElement(DayButton, {
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
      var disabled = !DateTime.isBetweenDates(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }
  }]);

  return Calendar;
}(React.Component);

exports.default = Calendar;

Calendar.propTypes = {
  displayDate: React.PropTypes.object.isRequired,
  onDayTouchTap: React.PropTypes.func,
  minDate: React.PropTypes.object.isRequired,
  maxDate: React.PropTypes.object.isRequired,
  shouldDisableDate: React.PropTypes.func
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O2VBQWMsUUFBUSxVQUFSOztBQUFWLElBQUMsc0JBQUQ7O2dCQUNhLFFBQVEsYUFBUjs7QUFBYixJQUFDLDZCQUFEO0FBQ0EsZ0JBQVksUUFBUSxrQ0FBUixDQUFaO0FBQ0EsZUFBUyxLQUFLLE1BQUw7SUFFUTs7O0FBQ2pCLFdBRGlCLFFBQ2pCLENBQVksS0FBWixFQUFrQjswQkFERCxVQUNDOzt1RUFERCxxQkFFUCxRQURROztBQUVkLFVBQUsseUJBQUwsQ0FBK0IsTUFBSyxLQUFMLENBQS9CLENBRmM7O0dBQWxCOztlQURpQjs7OENBS1MsV0FBVTtVQUMzQixXQUFVLFVBQVYsU0FEMkI7O0FBRWhDLFdBQUssS0FBTCxHQUFXLEVBQVgsQ0FGZ0M7QUFHaEMsVUFBRyxNQUFNLE9BQU4sQ0FBYyxRQUFkLENBQUgsRUFBMkI7QUFDdkIsY0FBTSxPQUFOLENBQWMsUUFBZCxFQUF1QixVQUFTLENBQVQsRUFBVztBQUM5QixZQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFEOEI7QUFFOUIsZUFBSyxLQUFMLENBQVcsRUFBRSxPQUFGLEtBQVksRUFBWixDQUFYLEdBQTJCLENBQTNCLENBRjhCO1NBQVgsQ0FBdkIsQ0FEdUI7T0FBM0IsTUFLTSxJQUFHLFFBQUgsRUFBWTtBQUNkLGlCQUFTLFFBQVQsQ0FBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFBc0IsQ0FBdEIsRUFBd0IsQ0FBeEIsRUFEYztBQUVkLGFBQUssS0FBTCxDQUFXLFNBQVMsT0FBVCxLQUFtQixFQUFuQixDQUFYLEdBQWtDLENBQWxDLENBRmM7T0FBWjs7Ozs2QkFLRDtBQUNQLFVBQUksU0FBUztBQUNQLGNBQUs7QUFDRCxzQkFBWSxNQUFaO0FBQ0EscUJBQVcsUUFBWDtBQUNBLG1CQUFTLGlCQUFUO0FBQ0EsaUJBQU0sR0FB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LFNBQVQsR0FBbUI7QUFDakIsZUFBYSxNQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDYixpQkFBZSxNQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7QUFDZixXQUFTLE1BQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNULFdBQVMsTUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QscUJBQW1CLE1BQU0sU0FBTixDQUFnQixJQUFoQjtDQUxyQiIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB7UmVhY3R9ID0gcmVxdWlyZSgncWlsaS1hcHAnKSxcbiAgICB7Q2xlYXJGaXh9ID0gcmVxdWlyZSgnbWF0ZXJpYWwtdWknKSxcbiAgICBEYXlCdXR0b24gPSByZXF1aXJlKCdtYXRlcmlhbC11aS9EYXRlUGlja2VyL0RheUJ1dHRvbicpLFxuICAgIERhdGVUaW1lPURhdGUuSGVscGVyO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYWxlbmRhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHModGhpcy5wcm9wcylcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3NlbGVjdGVkfT1uZXh0UHJvcHNcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHNlbGVjdGVkKSl7XG4gICAgICAgICAgICBBcnJheS5mb3JFYWNoKHNlbGVjdGVkLGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIGEuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlW2EuZ2V0VGltZSgpKycnXT0xXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZSBpZihzZWxlY3RlZCl7XG4gICAgICAgICAgICBzZWxlY3RlZC5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZVtzZWxlY3RlZC5nZXRUaW1lKCkrJyddPTFcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgcm9vdDp7XG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzMycHgnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4IDAgMTRweCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6MjgwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjonMCBhdXRvJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZToge1xuICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMTJweCcsXG4gICAgICAgICAgICAgIGhlaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnNTAwJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdlZWtUaXRsZURheToge1xuICAgICAgICAgICAgICBsaXN0U3R5bGU6ICdub25lJyxcbiAgICAgICAgICAgICAgZmxvYXQ6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgd2lkdGg6ICczMnB4JyxcbiAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgbWFyZ2luOiAnMCAycHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlcy5yb290fT5cbiAgICAgICAgICAgIDx1bCBzdHlsZT17c3R5bGVzLndlZWtUaXRsZX0+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+TTwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VzwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+VDwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+RjwvbGk+XG4gICAgICAgICAgICAgIDxsaSBzdHlsZT17c3R5bGVzLndlZWtUaXRsZURheX0+UzwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICAgIHt0aGlzLl9nZXRXZWVrRWxlbWVudHMoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9nZXRXZWVrRWxlbWVudHMoKSB7XG4gICAgICB2YXIgd2Vla0FycmF5ID0gRGF0ZVRpbWUuZ2V0V2Vla0FycmF5KHRoaXMucHJvcHMuZGlzcGxheURhdGUpO1xuXG4gICAgICByZXR1cm4gd2Vla0FycmF5Lm1hcChmdW5jdGlvbih3ZWVrLCBpKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENsZWFyRml4IGtleT17aX0+XG4gICAgICAgICAgICB7dGhpcy5fZ2V0RGF5RWxlbWVudHMod2VlaywgaSl9XG4gICAgICAgICAgPC9DbGVhckZpeD5cbiAgICAgICAgKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIF9nZXREYXlFbGVtZW50cyh3ZWVrLCBpKSB7XG4gICAgICByZXR1cm4gd2Vlay5tYXAoZnVuY3Rpb24oZGF5LCBqKSB7XG4gICAgICAgIHZhciBkaXNhYmxlZCA9IHRoaXMuX3Nob3VsZERpc2FibGVEYXRlKGRheSk7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IGRheSAmJiAhZGlzYWJsZWQgJiYgdGhpcy5zdGF0ZVtkYXkuZ2V0VGltZSgpKycnXSAmJiB0cnVlO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheUJ1dHRvblxuICAgICAgICAgICAga2V5PXsnZGInICsgaSArIGp9XG4gICAgICAgICAgICBkYXRlPXtkYXl9XG4gICAgICAgICAgICBvblRvdWNoVGFwPXt0aGlzLl9oYW5kbGVEYXlUb3VjaFRhcC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfSAvPlxuICAgICAgICApO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgX2hhbmRsZURheVRvdWNoVGFwKGUsIGRhdGUsIGkpIHtcbiAgICAgICAgaWYodGhpcy5zdGF0ZVtpPShkYXRlLmdldFRpbWUoKSsnJyldKVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhdGVbaV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aToxfSlcbiAgICAgICAgdmFyIHtvbkRheVRvdWNoVGFwfT10aGlzLnByb3BzXG4gICAgICAgIG9uRGF5VG91Y2hUYXAgJiYgb25EYXlUb3VjaFRhcChkYXRlKVxuICAgIH1cblxuICAgIF9zaG91bGREaXNhYmxlRGF0ZShkYXkpIHtcbiAgICAgIGlmIChkYXkgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBkaXNhYmxlZCA9ICFEYXRlVGltZS5pc0JldHdlZW5EYXRlcyhkYXksIHRoaXMucHJvcHMubWluRGF0ZSwgdGhpcy5wcm9wcy5tYXhEYXRlKTtcbiAgICAgIGlmICghZGlzYWJsZWQgJiYgdGhpcy5wcm9wcy5zaG91bGREaXNhYmxlRGF0ZSkgZGlzYWJsZWQgPSB0aGlzLnByb3BzLnNob3VsZERpc2FibGVEYXRlKGRheSk7XG5cbiAgICAgIHJldHVybiBkaXNhYmxlZDtcbiAgICB9XG59XG5DYWxlbmRhci5wcm9wVHlwZXM9e1xuICBkaXNwbGF5RGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBvbkRheVRvdWNoVGFwOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgbWluRGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBtYXhEYXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHNob3VsZERpc2FibGVEYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuIl19