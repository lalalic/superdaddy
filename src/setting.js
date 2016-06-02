import {React, Component, UI} from "qili-app"
import RateIcon from 'material-ui/lib/svg-icons/editor/mode-edit'
import BugIcon from 'material-ui/lib/svg-icons/action/bug-report'
import UpdateIcon from 'material-ui/lib/svg-icons/action/system-update-alt'
import AboutIcon from 'material-ui/lib/svg-icons/action/info-outline'
import LogoIcon from "material-ui/lib/svg-icons/action/android"

var {List}=UI

export default class Setting extends Component{
    render(){
        return (
            <List>
                <List.Item primaryText="去评价" leftIcon={<RateIcon/>}/>
                <List.Item primaryText="建议" leftIcon={<BugIcon/>}/>

                <List.Item primaryText="更新" leftIcon={<UpdateIcon/>}/>
						
				<List.Item primaryText="App" leftIcon={<LogoIcon/>}
					onClick={a=>this.downloadApp()}
					/>				
                <List.Item primaryText="关于" leftIcon={<AboutIcon/>}/>
            </List>
        )
    }
	
	downloadApp(){
		var a=document.createElement("a")
		a.href="./app.apk"
		a.download="superdaddy.apk"
		a.style.position="absolute"
		a.top=-1000;
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}
}
