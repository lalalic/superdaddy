require('./lib/css/index.less')
require('babel/polyfill')

var {User,React,Component,Router,QiliApp, UI:{Empty}}=require('qili-app'),
    {Route, RouteHandler, DefaultRoute} = Router,
    {MenuItem, FloatingActionButton, Avatar}=require('material-ui'),
    {Family,Knowledge,Table,init}=require('./lib/db')

class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{child:Family.currentChild})
        Family.event.on('change',()=>this.setState({child:Family.currentChild}))
    }

    renderContent(){
        var {child}=this.state,
            childStyle={position:'fixed',top:10,right:this._right(10), opacity:0.7, zIndex:9}
        return (
            <div>
                <CurrentChild child={child} style={childStyle}/>
                <RouteHandler child={child}/>
            </div>
        )
    }
}
Object.assign(SuperDaddy.defaultProps,{
    appId:"56a742f6a3dc55086c4fc938",//"1c7f3b148057498aa1edcc783a7537c6",
    init:()=>init()
})

class CurrentChild extends Component{
    render(){
        var {child={}, style={}, ...others}=this.props, avatar

        if(child.photo)
            avatar=(<Avatar src={this.props.child.photo}/>)
        else
            avatar=(<div><span style={{fontSize:"xx-small"}}>{this.lastName=child.name}</span></div>)

        if(!child._id)
            style.display='none'

        return(
            <FloatingActionButton mini={true} style={style} onClick={()=>this.change()} {...others}>
                {avatar}
            </FloatingActionButton>
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.child!=this.props.child || nextProps.child.name!=this.lastName
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
}

CurrentChild.contextTypes={router:React.PropTypes.func}



module.exports=QiliApp.render(
    <Route path="/" handler={SuperDaddy}>
        <Route name="task" path="task/:_id?/" handler={require('./lib/task')}/>
        <Route name="baby" path="baby/:_id?" handler={require('./lib/baby')}/>
        <Route name="knowledges" path="knowledges/" handler={require('./lib/knowledges')}/>
        <Route name="knowledge" path="knowledge/:_id?/" handler={require('./lib/knowledge')}/>
        <Route name="create" path="create/" handler={require('./lib/newKnowledge')} />
        <Route name="comment" path="comment/:type/:_id/" handler={Comment}/>
        <Route name="account" path="account/" handler={require('./lib/account')} />
        <Route name="setting" path="setting/" handler={require('./lib/setting')} />
        <Route name="dashboard" path="dashboard/:when?/" handler={require("./lib/dashboard")}/>
        <Route name="publish" path="publish/:what?/" handler={require("./lib/publish")} />
        <DefaultRoute handler={require("./lib/dashboard")}/>
    </Route>
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
