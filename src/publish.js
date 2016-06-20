import {Component, React, UI} from "qili-app"
import {TextField, DatePicker, IconButton, GridList, GridTile, Subheader, AppBar, Divider,} from "material-ui"
import IconUnSelected from 'material-ui/svg-icons/toggle/star-border'
import IconSelected from 'material-ui/svg-icons/toggle/star'
import IconPrint from "material-ui/svg-icons/action/print"
import IconView from "material-ui/svg-icons/action/pageview"

import dbPublish from "./db/publish"

const {Messager}=UI


export default class Publisher extends Component{
	state={template:"light"}
	
    componentWillReceiveProps(next){
        return next.child!=this.props.child
    }
	
    render(){
		const {child}=this.props
		const {template}=this.state
        return(
            <div>
				<AppBar title={`出版${child.name}的成长历程,留下永久的回忆`} 
					showMenuIconButton={false}/>
				<center>
					<DatePicker ref="since"
						floatingLabelText="自从" 
						autoOk={true} mode="landscape"/>
						
					<TextField ref="copy"
						floatingLabelText="打印多少本"
						defaultValue={1}
						type="number"/>
				</center>
				<GridList>
					<Subheader>选择出版模板</Subheader>
					
					{"light,dark,modern,gift".split(",").map(a=>(
						<GridTile key={a} title={a}
							actionIcon={<IconButton onClick={e=>this.setState({template:a})}>
									{template==a ? 
										<IconSelected hoverColor="blue" color="yellow"/> :
										<IconUnSelected hoverColor="blue" color="white"/>
									}
								</IconButton>}>
							<img src={`images/template/${a}.jpg`}/>
						</GridTile>
					))}
				</GridList>
                <UI.CommandBar className="footbar"
                    items={["Back", 
						{action:"Preview", label:"预览", onSelect:e=>this.preview(), icon:IconView}, 
						{action:"Print", label:"云打印", onSelect:e=>this.print(), icon:IconPrint}
						]}/>
            </div>
        )
    }
	
	preview(){
		Messager.show("stay tune")
	}
	
	print(){
		Messager.show("Put into queue, please pay within 24 hours")
	}
}
