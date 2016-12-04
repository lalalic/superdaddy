import React, {Component, PropTypes} from "react"
import {findDOMNode} from "react-dom"
import {ListItem as Li} from "material-ui"
import {DragSource, DropTarget} from "react-dnd"
import flow from "lodash.flow"

class ListItem extends Component{
    componentDidMount(){
        const {connectDragSource, connectDropTarget,connectDragPreview,primaryText}=this.props
        let dom=findDOMNode(this)
        connectDragSource(dom)
        connectDropTarget(dom)
        connectDragPreview(<div>{primaryText}</div>)
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
        return <Li {...others}/>
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
