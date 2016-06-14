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
exports.default = Calendar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQjs7O0FBQ2pCLFdBRGlCLFFBQ2pCLENBQVksS0FBWixFQUFrQjswQkFERCxVQUNDOzt1RUFERCxxQkFFUCxRQURROzsrQkFFSSxNQUFLLEtBQUwsQ0FBYixTQUZTO1FBRVQsZ0RBQVMsMEJBRkE7O0FBR2QsUUFBRyxDQUFDLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBRCxFQUF5QjtBQUN4QixVQUFHLFFBQUgsRUFDSSxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7S0FESjtBQUlBLGVBQVMsWUFBVSxFQUFWLENBUEs7QUFRZCxhQUFTLE9BQVQsQ0FBaUI7YUFBRyxFQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakI7S0FBSCxDQUFqQixDQVJjO0FBU2QsVUFBSyxLQUFMLEdBQVcsRUFBQyxrQkFBRCxFQUFYLENBVGM7O0dBQWxCOztlQURpQjs7OENBWVMsV0FBVTtnQ0FDZCxVQUFiLFNBRDJCO1VBQzNCLCtDQUFTLHlCQURrQjs7QUFFaEMsVUFBRyxDQUFDLE1BQU0sT0FBTixDQUFjLFFBQWQsQ0FBRCxFQUF5QjtBQUN4QixZQUFHLFFBQUgsRUFDSSxXQUFTLENBQUMsUUFBRCxDQUFULENBREo7T0FESjtBQUlBLGlCQUFTLFlBQVUsRUFBVixDQU51QjtBQU9oQyxlQUFTLE9BQVQsQ0FBaUI7ZUFBRyxFQUFFLFFBQUYsQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakI7T0FBSCxDQUFqQixDQVBnQztBQVFoQyxXQUFLLFFBQUwsQ0FBYyxFQUFDLGtCQUFELEVBQWQsRUFSZ0M7Ozs7NkJBVTNCO0FBQ1AsVUFBSSxTQUFTO0FBQ1AsY0FBSztBQUNELHNCQUFZLE1BQVo7QUFDQSxxQkFBVyxRQUFYO0FBQ0EsbUJBQVMsaUJBQVQ7QUFDQSxpQkFBTSxHQUFOO0FBQ0Esa0JBQU8sUUFBUDtTQUxKO0FBT0EsbUJBQVc7QUFDVCxtQkFBUyxDQUFUO0FBQ0Esc0JBQVksTUFBWjtBQUNBLGtCQUFRLE1BQVI7QUFDQSxzQkFBWSxLQUFaO1NBSkY7QUFNQSxzQkFBYztBQUNaLHFCQUFXLE1BQVg7QUFDQSxpQkFBTyxNQUFQO0FBQ0EsaUJBQU8sTUFBUDtBQUNBLHFCQUFXLFFBQVg7QUFDQSxrQkFBUSxPQUFSO1NBTEY7T0FkRixDQURHO0FBdUJQLGFBQ0U7O1VBQUssT0FBTyxPQUFPLElBQVAsRUFBWjtRQUNJOztZQUFJLE9BQU8sT0FBTyxTQUFQLEVBQVg7VUFDRTs7Y0FBSSxPQUFPLE9BQU8sWUFBUCxFQUFYOztXQURGO1VBRUU7O2NBQUksT0FBTyxPQUFPLFlBQVAsRUFBWDs7V0FGRjtVQUdFOztjQUFJLE9BQU8sT0FBTyxZQUFQLEVBQVg7O1dBSEY7VUFJRTs7Y0FBSSxPQUFPLE9BQU8sWUFBUCxFQUFYOztXQUpGO1VBS0U7O2NBQUksT0FBTyxPQUFPLFlBQVAsRUFBWDs7V0FMRjtVQU1FOztjQUFJLE9BQU8sT0FBTyxZQUFQLEVBQVg7O1dBTkY7VUFPRTs7Y0FBSSxPQUFPLE9BQU8sWUFBUCxFQUFYOztXQVBGO1NBREo7UUFVRyxLQUFLLGdCQUFMLEVBVkg7T0FERixDQXZCTzs7Ozt1Q0F1Q1U7QUFDakIsVUFBSSxZQUFZLDZCQUFhLEtBQUssS0FBTCxDQUFXLFdBQVgsQ0FBekIsQ0FEYTs7QUFHakIsYUFBTyxVQUFVLEdBQVYsQ0FBYyxVQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCO0FBQ3JDLGVBQ0U7O1lBQUssS0FBSyxDQUFMLEVBQUw7VUFDRyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsQ0FBM0IsQ0FESDtTQURGLENBRHFDO09BQWxCLEVBTWxCLElBTkksQ0FBUCxDQUhpQjs7OztvQ0FZSCxNQUFNLEdBQUc7QUFDckIsVUFBSSxZQUFVLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FETztBQUV2QixhQUFPLEtBQUssR0FBTCxDQUFTLFVBQVMsR0FBVCxFQUFjLENBQWQsRUFBaUI7QUFDL0IsWUFBSSxXQUFXLEtBQUssa0JBQUwsQ0FBd0IsR0FBeEIsQ0FBWCxDQUQyQjtBQUUvQixZQUFJLFdBQVcsT0FBTyxDQUFDLFFBQUQsSUFBYSxVQUFVLElBQVYsQ0FBZTtpQkFBRyxFQUFFLE9BQUYsTUFBYSxJQUFJLE9BQUosRUFBYjtTQUFILENBQW5DLENBRmdCOztBQUkvQixlQUNFO0FBQ0UsZUFBSyxPQUFPLENBQVAsR0FBVyxDQUFYO0FBQ0wsZ0JBQU0sR0FBTjtBQUNBLHNCQUFZLEtBQUssa0JBQUwsQ0FBd0IsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBWjtBQUNBLG9CQUFVLENBQUMsQ0FBQyxRQUFEO0FBQ1gsb0JBQVUsUUFBVixFQUxGLENBREYsQ0FKK0I7T0FBakIsRUFZYixJQVpJLENBQVAsQ0FGdUI7Ozs7dUNBaUJOLEdBQUcsTUFBTTttQkFDRSxLQUFLLEtBQUwsQ0FERjtVQUN2QixxQ0FEdUI7QUFDeEIsVUFBZ0IsMEJBQWhCLENBRHdCO0FBRWpCLHFCQUFTLEtBQUssS0FBTCxDQUFXLFFBQVgsQ0FGUTtBQUdqQixrQkFBTSxTQUFTLFNBQVQsQ0FBbUI7ZUFBRyxFQUFFLE9BQUYsTUFBYSxLQUFLLE9BQUw7T0FBaEIsQ0FBekIsQ0FIaUI7O0FBS3hCLFVBQUcsUUFBSCxFQUFZO0FBQ1IsaUJBQU8sQ0FBQyxDQUFELEdBQUssU0FBUyxJQUFULENBQWMsSUFBZCxDQUFaLEdBQWtDLFNBQVMsTUFBVCxDQUFnQixLQUFoQixFQUFzQixDQUF0QixDQUFsQyxDQURRO0FBRVIseUJBQWlCLGNBQWMsUUFBZCxDQUFqQixDQUZRO09BQVosTUFHTSxJQUFHLFNBQU8sQ0FBQyxDQUFELEVBQUc7QUFDZixtQkFBUyxDQUFDLElBQUQsQ0FBVCxDQURlO0FBRWYseUJBQWlCLGNBQWMsSUFBZCxDQUFqQixDQUZlO09BQWIsTUFJRixPQUpFOztBQU1aLFdBQUssUUFBTCxDQUFjLEVBQUMsa0JBQUQsRUFBZCxFQWQ4Qjs7Ozt1Q0FpQlQsS0FBSztBQUN0QixVQUFJLFFBQVEsSUFBUixFQUFjLE9BQU8sS0FBUCxDQUFsQjtBQUNBLFVBQUksV0FBVyxDQUFDLCtCQUFlLEdBQWYsRUFBb0IsS0FBSyxLQUFMLENBQVcsT0FBWCxFQUFvQixLQUFLLEtBQUwsQ0FBVyxPQUFYLENBQXpDLENBRk87QUFHdEIsVUFBSSxDQUFDLFFBQUQsSUFBYSxLQUFLLEtBQUwsQ0FBVyxpQkFBWCxFQUE4QixXQUFXLEtBQUssS0FBTCxDQUFXLGlCQUFYLENBQTZCLEdBQTdCLENBQVgsQ0FBL0M7O0FBRUEsYUFBTyxRQUFQLENBTHNCOzs7O1NBM0dQOzs7U0FtSGIsWUFBVTtBQUNoQixlQUFhLGVBQU0sU0FBTixDQUFnQixNQUFoQixDQUF1QixVQUF2QjtBQUNiLGlCQUFlLGVBQU0sU0FBTixDQUFnQixJQUFoQjtBQUNmLFdBQVMsZUFBTSxTQUFOLENBQWdCLE1BQWhCLENBQXVCLFVBQXZCO0FBQ1QsV0FBUyxlQUFNLFNBQU4sQ0FBZ0IsTUFBaEIsQ0FBdUIsVUFBdkI7QUFDVCxxQkFBbUIsZUFBTSxTQUFOLENBQWdCLElBQWhCO0FBQ2IsWUFBVSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEI7O0FBekhHLFNBNEhiO2tCQTVIYSIsImZpbGUiOiJjYWxlbmRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsIENvbXBvbmVudH0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQgRGF5QnV0dG9uIGZyb20gJ21hdGVyaWFsLXVpL0RhdGVQaWNrZXIvRGF5QnV0dG9uJ1xuaW1wb3J0IHtnZXRXZWVrQXJyYXksaXNCZXR3ZWVuRGF0ZXMsYWRkRGF5c30gZnJvbSBcIm1hdGVyaWFsLXVpL0RhdGVQaWNrZXIvZGF0ZVV0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FsZW5kYXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdmFyIHtzZWxlY3RlZD1bXX09dGhpcy5wcm9wc1xuICAgICAgICBpZighQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9W3NlbGVjdGVkXVxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkPXNlbGVjdGVkfHxbXVxuICAgICAgICBzZWxlY3RlZC5mb3JFYWNoKGE9PmEuc2V0SG91cnMoMCwwLDAsMCkpXG4gICAgICAgIHRoaXMuc3RhdGU9e3NlbGVjdGVkfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB7c2VsZWN0ZWQ9W119PW5leHRQcm9wc1xuICAgICAgICBpZighQXJyYXkuaXNBcnJheShzZWxlY3RlZCkpe1xuICAgICAgICAgICAgaWYoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ9W3NlbGVjdGVkXVxuICAgICAgICB9XG4gICAgICAgIHNlbGVjdGVkPXNlbGVjdGVkfHxbXVxuICAgICAgICBzZWxlY3RlZC5mb3JFYWNoKGE9PmEuc2V0SG91cnMoMCwwLDAsMCkpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkfSlcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgdmFyIHN0eWxlcyA9IHtcbiAgICAgICAgICAgIHJvb3Q6e1xuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICczMnB4JyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc4cHggMTRweCAwIDE0cHgnLFxuICAgICAgICAgICAgICAgIHdpZHRoOjI4MCxcbiAgICAgICAgICAgICAgICBtYXJnaW46JzAgYXV0bydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ZWVrVGl0bGU6IHtcbiAgICAgICAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgICAgICAgbGluZUhlaWdodDogJzEycHgnLFxuICAgICAgICAgICAgICBoZWlnaHQ6ICcxMnB4JyxcbiAgICAgICAgICAgICAgZm9udFdlaWdodDogJzUwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3ZWVrVGl0bGVEYXk6IHtcbiAgICAgICAgICAgICAgbGlzdFN0eWxlOiAnbm9uZScsXG4gICAgICAgICAgICAgIGZsb2F0OiAnbGVmdCcsXG4gICAgICAgICAgICAgIHdpZHRoOiAnMzJweCcsXG4gICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgIG1hcmdpbjogJzAgMnB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IHN0eWxlPXtzdHlsZXMucm9vdH0+XG4gICAgICAgICAgICA8dWwgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGV9PlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9PlM8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9Pk08L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9PlQ8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9Plc8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9PlQ8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9PkY8L2xpPlxuICAgICAgICAgICAgICA8bGkgc3R5bGU9e3N0eWxlcy53ZWVrVGl0bGVEYXl9PlM8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICB7dGhpcy5fZ2V0V2Vla0VsZW1lbnRzKCl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBfZ2V0V2Vla0VsZW1lbnRzKCkge1xuICAgICAgdmFyIHdlZWtBcnJheSA9IGdldFdlZWtBcnJheSh0aGlzLnByb3BzLmRpc3BsYXlEYXRlKTtcblxuICAgICAgcmV0dXJuIHdlZWtBcnJheS5tYXAoZnVuY3Rpb24od2VlaywgaSkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpfT5cbiAgICAgICAgICAgIHt0aGlzLl9nZXREYXlFbGVtZW50cyh3ZWVrLCBpKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIF9nZXREYXlFbGVtZW50cyh3ZWVrLCBpKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZHM9dGhpcy5zdGF0ZS5zZWxlY3RlZFxuICAgICAgcmV0dXJuIHdlZWsubWFwKGZ1bmN0aW9uKGRheSwgaikge1xuICAgICAgICB2YXIgZGlzYWJsZWQgPSB0aGlzLl9zaG91bGREaXNhYmxlRGF0ZShkYXkpO1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBkYXkgJiYgIWRpc2FibGVkICYmIHNlbGVjdGVkcy5maW5kKGE9PmEuZ2V0VGltZSgpPT1kYXkuZ2V0VGltZSgpKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPERheUJ1dHRvblxuICAgICAgICAgICAga2V5PXsnZGInICsgaSArIGp9XG4gICAgICAgICAgICBkYXRlPXtkYXl9XG4gICAgICAgICAgICBvblRvdWNoVGFwPXt0aGlzLl9oYW5kbGVEYXlUb3VjaFRhcC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgc2VsZWN0ZWQ9eyEhc2VsZWN0ZWR9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9IC8+XG4gICAgICAgICk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlRGF5VG91Y2hUYXAoZSwgZGF0ZSkge1xuXHRcdHZhciAgIHtvbkRheVRvdWNoVGFwLCBtdWx0aXBsZX09dGhpcy5wcm9wc1xuICAgICAgICAgICAgICAsc2VsZWN0ZWQ9dGhpcy5zdGF0ZS5zZWxlY3RlZFxuICAgICAgICAgICAgICAsZm91bmQ9c2VsZWN0ZWQuZmluZEluZGV4KGE9PmEuZ2V0VGltZSgpPT1kYXRlLmdldFRpbWUpXG5cbiAgICAgICAgaWYobXVsdGlwbGUpe1xuICAgICAgICAgICAgZm91bmQ9PS0xID8gc2VsZWN0ZWQucHVzaChkYXRlKSA6IHNlbGVjdGVkLnNwbGljZShmb3VuZCwxKVxuICAgICAgICAgICAgb25EYXlUb3VjaFRhcCAmJiBvbkRheVRvdWNoVGFwKHNlbGVjdGVkKVxuICAgICAgICB9ZWxzZSBpZihmb3VuZD09LTEpe1xuICAgICAgICAgICAgc2VsZWN0ZWQ9W2RhdGVdXG4gICAgICAgICAgICBvbkRheVRvdWNoVGFwICYmIG9uRGF5VG91Y2hUYXAoZGF0ZSlcbiAgICAgICAgfWVsc2VcbiAgICAgICAgICAgIHJldHVybjtcblxuXHRcdHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkfSlcbiAgICB9XG5cbiAgICBfc2hvdWxkRGlzYWJsZURhdGUoZGF5KSB7XG4gICAgICBpZiAoZGF5ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgZGlzYWJsZWQgPSAhaXNCZXR3ZWVuRGF0ZXMoZGF5LCB0aGlzLnByb3BzLm1pbkRhdGUsIHRoaXMucHJvcHMubWF4RGF0ZSk7XG4gICAgICBpZiAoIWRpc2FibGVkICYmIHRoaXMucHJvcHMuc2hvdWxkRGlzYWJsZURhdGUpIGRpc2FibGVkID0gdGhpcy5wcm9wcy5zaG91bGREaXNhYmxlRGF0ZShkYXkpO1xuXG4gICAgICByZXR1cm4gZGlzYWJsZWQ7XG4gICAgfVxuXG5cdHN0YXRpYyBwcm9wVHlwZXM9e1xuXHRcdGRpc3BsYXlEYXRlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cdFx0b25EYXlUb3VjaFRhcDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG5cdFx0bWluRGF0ZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXHRcdG1heERhdGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblx0XHRzaG91bGREaXNhYmxlRGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIG11bHRpcGxlOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxuXHR9XG5cblx0c3RhdGljIGFkZERheXM9YWRkRGF5c1xufVxuIl19