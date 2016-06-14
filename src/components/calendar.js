import {React, Component} from 'qili-app'
import DayButton from 'material-ui/DatePicker/DayButton'
import {getWeekArray,isBetweenDates,addDays} from "material-ui/DatePicker/dateUtils"

export default class Calendar extends Component{
    constructor(props){
        super(props)
        var {selected=[]}=this.props
        if(!Array.isArray(selected)){
            if(selected)
                selected=[selected]
        }
        selected=selected||[]
        selected.forEach(a=>a.setHours(0,0,0,0))
        this.state={selected}
    }
    componentWillReceiveProps(nextProps){
        var {selected=[]}=nextProps
        if(!Array.isArray(selected)){
            if(selected)
                selected=[selected]
        }
        selected=selected||[]
        selected.forEach(a=>a.setHours(0,0,0,0))
        this.setState({selected})
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
      var weekArray = getWeekArray(this.props.displayDate);

      return weekArray.map(function(week, i) {
        return (
          <div key={i}>
            {this._getDayElements(week, i)}
          </div>
        );
      }, this);
    }

    _getDayElements(week, i) {
        let selecteds=this.state.selected
      return week.map(function(day, j) {
        var disabled = this._shouldDisableDate(day);
        var selected = day && !disabled && selecteds.find(a=>a.getTime()==day.getTime())

        return (
          <DayButton
            key={'db' + i + j}
            date={day}
            onTouchTap={this._handleDayTouchTap.bind(this)}
            selected={!!selected}
            disabled={disabled} />
        );
      }, this);
    }

    _handleDayTouchTap(e, date) {
		var   {onDayTouchTap, multiple}=this.props
              ,selected=this.state.selected
              ,found=selected.findIndex(a=>a.getTime()==date.getTime)

        if(multiple){
            found==-1 ? selected.push(date) : selected.splice(found,1)
            onDayTouchTap && onDayTouchTap(selected)
        }else if(found==-1){
            selected=[date]
            onDayTouchTap && onDayTouchTap(date)
        }else
            return;

		this.setState({selected})
    }

    _shouldDisableDate(day) {
      if (day === null) return false;
      var disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
      if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

      return disabled;
    }

	static propTypes={
		displayDate: React.PropTypes.object.isRequired,
		onDayTouchTap: React.PropTypes.func,
		minDate: React.PropTypes.object.isRequired,
		maxDate: React.PropTypes.object.isRequired,
		shouldDisableDate: React.PropTypes.func,
        multiple: React.PropTypes.bool
	}

	static addDays=addDays

    static format=function(date, tmpl){
        let value={y:date.getYear(), M: date.getMonth()+1, d: date.getDate(), h:date.getHours(), m:date.getMinutes() }
        return tmpl.replace(/([ymdhs])/ig, function(match,type){
            let v=value[type!='M' ? type.toLowerCase() : type]
            return v ? return v : ""
        })
    }
}
