require('../style/index.less')

import {Route, IndexRoute, Direct, IndexRedirect} from "react-router"
import {User,React,Component,QiliApp, UI} from 'qili-app'
import {MenuItem, FloatingActionButton, Avatar} from 'material-ui'

import {Family,Knowledge,Table,init} from './db'

const {Empty, Comment}=UI

class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{child:null})
        Family.event.on('change',child=>this.setState({child}))
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.children.props.route.name=='baby' 
			&& nextState.child!=this.state.child
			&& !this.context.router.isActive(`baby/${nextState.child.name}`)){
			this.context.router.push(`baby/${nextState.child.name}`)
			return false
		}
		
		return true
    }

    renderContent(){
        var {child}=this.state
		if(!child)
			return (<Empty icon={<Logo/>}><Link to="baby">click to start from your first baby!</Link></Empty>)

        return (
            <div>
				{this.props.children.props.route.contextual!=false && 
					(<CurrentChild key="context" child={child} name={child.name}/>)}
					
				{React.cloneElement(this.props.children,{child})}
            </div>
        )
    }
    static contextTypes={router:React.PropTypes.object}
}

Object.assign(SuperDaddy.defaultProps,{
    appId:"5746b2c5e4bb3b3700ae1566",
    init:()=>init()
})

class CurrentChild extends Component{
    render(){
        let {child, name, style={fontSize:"xx-small"}, ...others}=this.props

        return(
            <FloatingActionButton className="sticky top right"
				mini={true}
				style={style}
                {...others}
				onClick={e=>this.change()}>
                {child.photo ? (<Avatar src={this.props.child.photo}/>) : name}
            </FloatingActionButton>
        )
    }

    shouldComponentUpdate(nextProps){
		return nextProps.name!=this.props.name
    }

    change(){
        var current=this.props.child,
            children=Family.children,
            len=children.length;
        if(len<2)
            return;

        var index=children.indexOf(current)
        Family.currentChild=children[(index+1) % len]
    }
    static contextTypes={router:React.PropTypes.object}
}

import TaskUI from './task'
import BabyUI, {Creator} from './baby'
import KnowledgesUI from './knowledges'
import KnowledgeUI from './knowledge'
import NewKnowledgeUI from './newKnowledge'
import AccountUI from './account'
import SettingUI from './setting'
import PublishUI from './publish'
import TasksUI, {Approvings} from "./tasks"
import Dashboard from "./dashboard"

module.exports=QiliApp.render(
    (<Route path="/" component={SuperDaddy}>

        <IndexRoute component={Dashboard}/>

		<Route path="tasks">
            <IndexRoute component={TasksUI}/>
			<Route path="approvings" component={Approvings}/>
            <Route path=":when" component={TasksUI}/>
        </Route>
		<Route path="task/:_id" component={TaskUI}/>


        <Route path="baby/:name" name="baby" component={BabyUI}/>
        <Route path="baby" contextual={false} component={Creator}/>

        <Route path="knowledges" component={KnowledgesUI}/>
        <Route path="knowledge">
            <IndexRoute contextual={false} component={NewKnowledgeUI}/>
            <Route path=":_id" component={KnowledgeUI}/>
        </Route>

        <Route path="comment/:type/:_id" component={Comment}/>

        <Route contextual={false} path="account" component={AccountUI} />

        <Route contextual={false} path="setting">
			<IndexRoute  component={SettingUI}/>
		</Route>

        <Route name="publish" path="publish" component={PublishUI}>
            <IndexRoute params={{what:"all"}}/>
            <Route path=":what"/>
        </Route>

    </Route>),{
		createElement(Component, props){
			if(Component==SuperDaddy){//refresh baby page
				let child=props.children
					,{route,params}=child.props

				if(route.name=="baby")
					props.init=a=>init(params.name)
			}
			return <Component {...props}/>
		}
	}
)


/**
* quickAction position doesn't change when resizing
* server render ready
    * dom and data retrieving from server should be in componentDidMount
* immutable setState to improve performance
*done: baby feature
    * create first baby
    * delete last baby
    * create baby
    * delete baby
    * Family list update along with baby addition and deletion
*done: Not baby centric
* logo
    * loading
* flux refactor
* form refactor
    *done: auto update: baby, controlled input onchange->setState->onBlur->upsert
* Family list UI
    * remove->dashboard->family list: setState warning, not pure render?
* change child name ->shortcut name should be changed accordingly
*/
