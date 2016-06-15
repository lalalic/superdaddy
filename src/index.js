require('../style/index.less')

import {Route, IndexRoute, Direct, IndexRedirect} from "react-router"
import {User,React,Component,QiliApp, UI} from 'qili-app'
import {MenuItem, FloatingActionButton, Avatar} from 'material-ui'

import {Family,Knowledge,Table,init} from './db'

const {Empty, Comment}=UI

class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{baby:null})
        Family.event.on('change',baby=>this.setState({baby}))
    }

    shouldComponentUpdate(nextProps, nextState){
        let {name:route}=this.props.children.props.route
        if(route=="baby" && nextState.baby!=this.state.baby)
            return false

        return true
    }

    renderContent(){
        var {baby}=this.state
            ,{children:child}=this.props
            ,{route}=child.props
        return (
            <div>
                CurrentChild child={baby} name={baby.name} mini={true}
				show={route.floatingButton===false ? false : true}
				onChange={target=>{
                    Family.currentChild=target
                    if(route.name=="baby")
                       this.context.router.push({pathname:`baby/${target.name}`})
               }}/>
               {React.cloneElement(child,{child:baby})}
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
        var {child, show, style={position:"absolute", zIndex:9}, ...others}=this.props, avatar

        if(child.photo)
            avatar=(<Avatar src={this.props.child.photo}/>)
        else
            avatar=(<div><span style={{fontSize:"xx-small"}}>{this.lastName=child.name}</span></div>)

		if(!show)
			style.display="none"

        return(
            <FloatingActionButton className="sticky top right"
				style={style}
                {...others}
				onClick={e=>this.change()}>
                {avatar}
            </FloatingActionButton>
        )
    }

    shouldComponentUpdate(nextProps){
		return true
		let {name:target, open:targetOpen}=nextProps,
			{name, open}=this.props

        return target!=name || targetOpen!=open
    }

    change(){
        var current=this.props.child,
            children=Family.children,
            len=children.length;
        if(len<2)
            return;

        var index=children.indexOf(current)
        this.props.onChange(children[(index+1) % len])
    }
    static contextTypes={router:React.PropTypes.object}
}

import TaskUI from './task'
import BabyUI from './baby'
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

        <Route path="baby" floatingButton={false} component={BabyUI.Creator}
			onEnter={(nextState, replace)=>{
				Family.currentChild={}
			}}/>

        <Route path="knowledges" component={KnowledgesUI}/>
        <Route path="knowledge">
            <IndexRoute floatingButton={false} component={NewKnowledgeUI}/>
            <Route path=":_id" component={KnowledgeUI}/>
        </Route>

        <Route path="comment/:type/:_id" component={Comment}/>

        <Route floatingButton={false} path="account" component={AccountUI} />

        <Route floatingButton={false} path="setting">
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
		},
        onError(error){
            console.log(`onerror: ${error}`)
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
