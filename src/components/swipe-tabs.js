import React, {Component, Fragment} from "react"
import Tabs from "material-ui/Tabs"
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
            <div style={{display:"flex", flexDirection:"column", height:"100%"}}>
                <div style={{flex:"none"}}> 
                    <Tabs value={index} onChange={index=>this.setState({index})}>
                        {tabs}
                    </Tabs>
                </div>
                <SwipeableViews index={index} className="flexV" onChangeIndex={index=>this.setState({index})}>
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
