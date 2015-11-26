import {React, Component, UI} from "qili-app"

var {List}=UI

export default class Setting extends Component{
    render(){
        return (
            <div>
                <List>
                    <List.Item primaryText={`check version(${app.version})`}/>
                    <List.Item primaryText={`给${app.name}提建议`} />
                    <List.Item primaryText={`去评价${app.name}`} />
                    <List.Item primaryText="关于" />
                </List>
            </div>
        )
    }
}
