import React, {Component, PropTypes} from "react"
import {findDOMNode} from "react-dom"
import {List as Ul, ListItem as Li, IconButton} from "material-ui"
import {DragSource, DropTarget} from "react-dnd"
import flow from "lodash.flow"

import IconOrder from "material-ui/svg-icons/action/swap-vert"

class ListItem extends Component{
    componentDidMount(){
        const {connectDragSource, connectDropTarget,connectDragPreview,primaryText}=this.props
        connectDragSource(findDOMNode(this.refs.order),{dropEffect:"copy"})
        connectDropTarget(findDOMNode(this))
        connectDragPreview(findDOMNode(this),{})
    }

    componentDidUpdate(){
        this.componentDidMount()
    }

    render(){
        const {connectDragSource, connectDropTarget, connectDragPreview, index, parent,
                isDragging, isOver, canDrop,...others}=this.props
        if(isDragging){
            others.primaryText=(<span style={{visibility:"hidden"}}>{others.primaryText}</span>)
        }else if(isOver && canDrop){
            others.primaryText="can drop here"
        }else{
            others.rightIconButton=(
                <IconButton  ref="order" disableTouchRipple={true}>
                    <IconOrder/>
                </IconButton>
            )
        }
        return <Li {...others}/>
    }
}

class List extends Component{
    state={
        data:this.props.data
        ,dragging:-1
        ,hovering:-1
    }
    render(){
        const {data, dragging, hovering}=this.state
        const {template,onDrop,dndType}=this.props
        const ListItem=dnd(onDrop,dndType)
        let items=data.map((a,i)=>React.createElement(ListItem,{...template(a).props,key:i,index:i,parent:this}))
        if(dragging!=-1 && hovering!=-1){
            let [moving]=items.splice(dragging,1)
            if(hovering>dragging)
                items.splice(hovering-1,0,moving)
            else
                items.splice(hovering,0,moving)
        }

        return (
            <Ul>
                {items}
            </Ul>
        )
    }
}

const DEFAULT_TYPE="UNKNOWN"

function dnd(onDrop,type=DEFAULT_TYPE){
    return flow(
        DragSource(DEFAULT_TYPE,{
            beginDrag(props,monitor){
                return {index:props.index}
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
                onDrop(monitor.getItem().index, props.index)
                return props
            },
            hover(props,monitor,component){
                if(!monitor.canDrop())
                    return
                const {parent:list}=component.props
                list.setState({dragging:monitor.getItem().index,hovering:props.index})
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

export default {List, ListItem:Li}
