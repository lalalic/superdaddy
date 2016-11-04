import React, {Component, PropTypes} from "react"

import {SvgIcon} from 'material-ui'

export default class Logo extends Component{
  render() {
      var {drawStyle={}, ...others}=this.props
      var {textStroke="lightgray", ...otherDrawStyle}=Object.assign({
              fill:"none",
              stroke:"rgb(200,200,200)",
              strokeWidth:1,
              fontSize:5
          },drawStyle)

    return (
      <SvgIcon {...others}>
        <g {...otherDrawStyle}>
            <circle cx="18" cy="4" r="2"/>
            <circle cx="4" cy="6" r="3"/>
            <text x="5" y="20" stroke={textStroke}>C&nbsp;N&nbsp;B</text>
            <path d="M 3.5208 10.2525 q 6.95554 7.98853 16.9068 -4.76903" fill="none"/>
        </g>
    </SvgIcon>
    )
  }
}
