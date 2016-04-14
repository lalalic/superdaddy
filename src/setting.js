import {React, Component, UI} from "qili-app"
import {TextField, RadioButtonGroup, RadioButton,DatePicker} from 'material-ui'

var {List}=UI

export default class Setting extends Component{
    constructor(props){
        super(props)
        this.state={focus:Suggestion}
    }
    render(){
        return (
            <div>
                {<this.state.focus />}
                <UI.CommandBar className="footbar"
                    primary="建议"
                    onSelect={this.onSelect.bind(this)}
                    items={["Back", "去评价", "建议",  "更新", "关于"]}/>
            </div>
        )
    }

    onSelect(cmd){
        switch(cmd){
        case '建议':
            this.setState({focus:Suggestion})
        break
        case '关于':
            this.setState({focus:About})
        break
        case '去评价':

        break
        case '更新':
            this.setState({focus:Update})
        break
        }
    }
}

class Suggestion extends Component{
    render(){
        return (
            <div>
                <TextField fullWidth={true} ref="suggestion"
                    floatingLabelText="你的建议,我们的前进方向"/>
            </div>
        )
    }
}

class About extends Component{
    render(){
        return (
            <div>

            </div>
        )
    }
}

class Update extends Component{
    render(){
        return <div/>
    }
}
