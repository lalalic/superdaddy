import React, {Component} from "react"
import PropTypes from "prop-types"


import _Calendar from 'material-ui/DatePicker/Calendar'

import {isEqualDate, cloneAsDate, getDaysInMonth,dateTimeFormat} from "material-ui/DatePicker/dateUtils"

//export * from "material-ui/DatePicker/dateUtils"

export function getLastDayOfMonth(d){
    let days=getDaysInMonth(d)
    const date=cloneAsDate(d)
    date.setDate(days)
    return date
}

export function format(date, tmpl){
    let value={
			y:date.getFullYear(),
			M:date.getMonth()+1,
			d:date.getDate(),
			h:date.getHours(),
			m:date.getMinutes(),
			s:date.getSeconds()
		}
    return tmpl.replace(/([ymdhs])+/ig, function(match,type){
        return value[type!='M' ? type.toLowerCase() : type] || ""
    })
}

export function relative(d, now=new Date()){
	if(!d) return ""
	if(typeof(d)=='string')
		d=new Date(d)

	return format(d, isEqualDate(now,d) ? "今天 HH:mm" :
						d.getFullYear()==now.getFullYear() ? "MM月DD日" : "YYYY年MM月DD日")
}

const dayAbbreviation = ['日', '一', '二', '三', '四', '五', '六']
export function cnDateTimeFormat(locale, options) {
    let a=new dateTimeFormat(...arguments)
    this.format = function(date) {
        if (options.weekday === 'narrow')
          return dayAbbreviation[date.getDay()]
        return a.format(...arguments)
    };
}

export default class Calendar extends _Calendar{

}
