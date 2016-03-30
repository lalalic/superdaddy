import {React} from "qili-app"
import {TextField} from 'material-ui'

export default class Rewards extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <div>
                    <TextField placeholder="1, or 1-5 for a range"/>
                    <TextField placeholder="reward:a chocolate or a set of lego ..."/>
                </div>
                <div>a list of rewards showing vertically</div>
            </div>
        )
    }
}

Rewards.defaultProperties={
    items:{
        "1-5":  "Star"
        ,10:    "Pencil"
        ,50:    "Pencil Box"
        ,100:   "Angel"
    }
}
