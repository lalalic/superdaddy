import {Component, React, UI} from "qili-app"
import Icon from "material-ui/lib/svg-icons/image/camera-roll"
var {Empty}=UI

export default class Publisher extends Component{
    componentWillReceiveProps(next){
        if (next.child!=this.props.child)
            this.forceUpdate()
    }
    render(){
        return <Empty icon={<Icon/>} text="Select Finished Tasks to Publish As Book"/>
    }
}
