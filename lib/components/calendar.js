var React = require('react'), assign=require('react/lib/Object.assign');
var DateTime = require('material-ui/lib/utils/date-time');
var DayButton = require('material-ui/lib/date-picker/day-button');
var ClearFix = require('material-ui/lib/clearfix');

export default class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render() {
      var {style}=this.props,
        styles = assign({
                lineHeight: '32px',
                textAlign: 'center',
                padding: '8px 14px 0 14px',
            },style);

      return (
        <div style={styles}>
          {this._getWeekElements()}
        </div>
      );
    }

    _getWeekElements() {
      var weekArray = DateTime.getWeekArray(this.props.displayDate);

      return weekArray.map(function(week, i) {
        return (
          <ClearFix key={i}>
            {this._getDayElements(week, i)}
          </ClearFix>
        );
      }, this);
    }

    _getDayElements(week, i) {
      return week.map(function(day, j) {
        var disabled = this._shouldDisableDate(day);
        var selected = day && !disabled && this.state[day.getTime()+''];

        return (
          <DayButton
            key={'db' + i + j}
            date={day}
            onTouchTap={this._handleDayTouchTap.bind(this)}
            selected={selected}
            disabled={disabled} />
        );
      }, this);
    }

    _handleDayTouchTap(e, date, i) {
        if(this.state[i=(date.getTime()+'')])
            this.setState({i: 0})
        else
            this.setState({i:1})
    }

    _shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !DateTime.isBetweenDates(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }
}
Calendar.propTypes={
  displayDate: React.PropTypes.object.isRequired,
  onDayTouchTap: React.PropTypes.func,
  minDate: React.PropTypes.object,
  maxDate: React.PropTypes.object,
  shouldDisableDate: React.PropTypes.func
}
