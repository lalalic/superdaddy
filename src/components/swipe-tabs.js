import React, {Component} from "react"
import {Tabs} from "material-ui"
import SwipeableViews from 'react-swipeable-views'

export class SwipeableTabs extends Component{
    constructor(){
        super(...arguments)
        this.state={
            index:this.props.index
        }
    }

    render(){
        const {index}=this.state
        const {tabs,children}=this.props
        return (
            <div>
                <Tabs value={index} onChange={index=>this.setState({index})}>
                    {tabs}
                </Tabs>
                <SwipeableViews index={index} onChangeIndex={index=>this.setState({index})}>
                    {children}
                </SwipeableViews>
            </div>
        )
    }

    static defaultProps={
        index:0
    }
}

export default SwipeableTabs
