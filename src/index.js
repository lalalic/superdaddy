require('../style/index.less')

import {Route, IndexRoute, Direct, IndexDirect} from "react-router"
import {User,React,Component,QiliApp, UI} from 'qili-app'
import {MenuItem, FloatingActionButton, Avatar} from 'material-ui'

import {Family,Knowledge,Table,init} from './db'

const {Empty}=UI

class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{baby:this.props.child})
        Family.event.on('change',a=>this.setState({baby:Family.currentChild}))
    }

    renderContent(){
        var {baby}=this.state
            ,{children:child}=this.props
            ,{route}=child.props
        return (
            <div>
               <CurrentChild child={baby} onChange={target=>{
                   if(route.name=="baby")
                       this.context.router.push(`baby/${target.name}`)
                   else
                       Family.currentChild=target
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
        var {child={}, style={position:"absolute", zIndex:9}}=this.props, avatar

        if(child.photo)
            avatar=(<Avatar src={this.props.child.photo}/>)
        else
            avatar=(<div><span style={{fontSize:"xx-small"}}>{this.lastName=child.name}</span></div>)

        if(!child._id)
            style.display='none'

        return(
            <FloatingActionButton className="sticky top right"
                mini={true} style={style} onClick={()=>this.change()}>
                {avatar}
            </FloatingActionButton>
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        return !!this.props.child && (nextProps.child!=this.props.child || nextProps.child.name!=this.lastName)
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
import Dashboard from "./dashboard"

module.exports=QiliApp.render(
    (<Route path="/" component={SuperDaddy}>
        <IndexRoute component={Dashboard}/>

        <Route name="task" path="task" component={TaskUI}>
            <IndexRoute/>
            <Route path=":_id"/>
        </Route>

        <Route name="baby" path="baby" component={BabyUI}>
            <IndexRoute onEnter={(nextState, replace, callback)=>{
    				Family.currentChild={}
    				callback()
    			}}/>
            <Route path=":_id"/>
        </Route>
        <Route name="knowledges" path="knowledges" component={KnowledgesUI}/>
        <Route name="create" path="knowledge/_new" component={NewKnowledgeUI} />
        <Route name="knowledge" path="knowledge" component={KnowledgeUI}>
            <IndexRoute />
            <Route path=":_id"/>
        </Route>


        <Route name="comment" path="comment" component={Comment}>
            <Route path=":type/:_id"/>
        </Route>

        <Route name="account" path="account" component={AccountUI} />
        <Route name="setting" path="setting" component={SettingUI} />
        <Route name="dashboard" path="dashboard" component={Dashboard}>
            <IndexRoute params={{when:new Date()}}/>
            <Route path=":when"/>
        </Route>

        <Route name="publish" path="publish" component={PublishUI}>
            <IndexRoute params={{what:"all"}}/>
            <Route path=":what"/>
        </Route>

    </Route>),{

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
