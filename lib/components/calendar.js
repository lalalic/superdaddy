var React = require('react'), assign=require('react/lib/Object.assign');
var DateTime = require('material-ui/lib/utils/date-time');
var DayButton = require('material-ui/lib/date-picker/day-button');
var ClearFix = require('material-ui/lib/clearfix');

class AutoSelectableDayButton extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selected:false
        }
    }
    render(){
        var {selected}=this.state
        return (<DayButton
                ref="button"
                onClick={()=>{
                        this.setState({selected:!selected});
                        this.refs.button.setState({hover:false})
                    }}
                selected={selected}
                {...this.props}/>)
    }
}

export default class Calendar extends React.Component{
    constructor(props){
        super(props)
        this._selectedDates=[]
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

        return (
          <AutoSelectableDayButton
            key={'db' + i + j}
            date={day}
            onTouchTap={(e,date)=>this.toggle(date)}
            disabled={disabled} />
        );
      }, this);
    }

    toggle(e, date) {
        var i=this._selectedDates.indexOf(date)
        if(i!=-1)
            this._selectedDates.splice(i,1)
        else
            this._selectedDates.push(date)
    }

    _shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !DateTime.isBetweenDates(day, this.props.minDate, this.props.maxDate);
      return disabled;
    }

    get selectedDates(){
        return this._selectedDates;
    }
}
Calendar.propTypes={
  displayDate: React.PropTypes.object.isRequired,
  onDayTouchTap: React.PropTypes.func,
  minDate: React.PropTypes.object,
  maxDate: React.PropTypes.object
}
