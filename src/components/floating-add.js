import React, {Component, PropTypes} from "react"

import {FloatingActionButton} from "material-ui"
import IconAdd from "material-ui/svg-icons/content/add"

export default class FloatingAdd extends Component{
    render(){
        return (
            <FloatingActionButton
                {...this.props}
                className="floating sticky bottom right">
                <IconAdd/>
            </FloatingActionButton>
        )
    }
}
