var {React} = require('qili-app'),
    {ClearFix} = require('material-ui'),
    DayButton = require('material-ui/lib/date-picker/day-button'),
    DateTime=Date.Helper;

export default class Calendar extends React.Component{
    constructor(props){
        super(props)
        this.componentWillReceiveProps(this.props)
    }
    componentWillReceiveProps(nextProps){
        var {selected}=nextProps
        this.state={}
        if(Array.isArray(selected)){
            Array.forEach(selected,function(a){
                a.setHours(0,0,0,0)
                this.state[a.getTime()+'']=1
            })
        }else if(selected){
            selected.setHours(0,0,0,0)
            this.state[selected.getTime()+'']=1
        }
    }
    render() {
      var styles = {
            root:{
                lineHeight: '32px',
                textAlign: 'center',
                padding: '8px 14px 0 14px',
                width:280,
                margin:'0 auto'
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
        }
      return (
        <div style={styles.root}>
            <ul style={styles.weekTitle}>
              <li style={styles.weekTitleDay}>S</li>
              <li style={styles.weekTitleDay}>M</li>
              <li style={styles.weekTitleDay}>T</li>
              <li style={styles.weekTitleDay}>W</li>
              <li style={styles.weekTitleDay}>T</li>
              <li style={styles.weekTitleDay}>F</li>
              <li style={styles.weekTitleDay}>S</li>
            </ul>
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
        var selected = day && !disabled && this.state[day.getTime()+''] && true;

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
            delete this.state[i]
        else
            this.setState({i:1})
        var {onDayTouchTap}=this.props
        onDayTouchTap && onDayTouchTap(date)
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
  minDate: React.PropTypes.object.isRequired,
  maxDate: React.PropTypes.object.isRequired,
  shouldDisableDate: React.PropTypes.func
}
