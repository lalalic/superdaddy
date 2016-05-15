import {React, Component, UI} from "qili-app"
import RateIcon from 'material-ui/lib/svg-icons/editor/mode-edit'
import BugIcon from 'material-ui/lib/svg-icons/action/bug-report'
import UpdateIcon from 'material-ui/lib/svg-icons/action/system-update-alt'
import AboutIcon from 'material-ui/lib/svg-icons/action/info-outline'

var {List}=UI

export default class Setting extends Component{
    render(){
        return (
            <List>
                <List.Item primaryText="去评价" leftIcon={<RateIcon/>}/>
                <List.Item primaryText="建议" leftIcon={<BugIcon/>}/>

                <List.Item primaryText="更新" leftIcon={<UpdateIcon/>}/>
                <List.Item primaryText="关于" leftIcon={<AboutIcon/>}/>
            </List>
        )
    }
}
