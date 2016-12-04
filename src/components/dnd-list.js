import React, {Component, PropTypes} from "react"
import {findDOMNode} from "react-dom"
import {ListItem as Li, IconButton} from "material-ui"
import {DragSource, DropTarget} from "react-dnd"
import flow from "lodash.flow"

import IconOrder from "material-ui/svg-icons/action/swap-vert"

class ListItem extends Component{
    componentDidMount(){
        const {connectDragSource, connectDropTarget,connectDragPreview,primaryText}=this.props
        connectDragSource(findDOMNode(this.refs.order))
        connectDropTarget(findDOMNode(this))
    }

    componentDidUpdate(){
        this.componentDidMount()
    }

    render(){
        const {connectDragSource, connectDropTarget, connectDragPreview,
                isDragging, isOver, canDrop,...others}=this.props
        if(isDragging){
            others.primaryText="dragging"
        }else if(isOver && canDrop){
            others.primaryText="can drop here"
        }
        return <Li {...others} rightIconButton={<IconButton  ref="order"><IconOrder/></IconButton>}/>
    }
}

const DEFAULT_TYPE="UNKNOWN"

export function dnd(onDrop,type=DEFAULT_TYPE){
    return flow(
        DragSource(DEFAULT_TYPE,{
            beginDrag(props,monitor){
                return props
            }
        },(connector,monitor)=>{
            return {
                connectDragSource: connector.dragSource()
                ,connectDragPreview: connector.dragPreview()
                ,isDragging: monitor.isDragging()
            }
        }),
        DropTarget(DEFAULT_TYPE,{
            drop(props,monitor,component){
                if(!monitor.didDrop())
                    return
                onDrop(monitor.getItem(), props)
                return props
            }
        },(connector,monitor)=>{
            return {
                connectDropTarget: connector.dropTarget()
                ,isOver: monitor.isOver()
                ,canDrop: monitor.canDrop()
            }
        }))
    (ListItem)
}
