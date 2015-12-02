require('./lib/css/index.less')
require('babel/polyfill')

var {User,React,Component,Router,QiliApp,UI:{Comment}}=require('qili-app'),
    {Route, RouteHandler, DefaultRoute} = Router,
    {MenuItem, FloatingActionButton, Avatar}=require('material-ui'),
    {Family,Knowledge,Table,init}=require('./lib/db'),
    Baby=require('./lib/baby')


class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        Object.assign(this.state,{child:Family.currentChild})
        Family.event.on('change',()=>this.setState({child:Family.currentChild}))
    }

    renderContent(){
        var {child={}}=this.state,
            childStyle={position:'fixed',top:10,right:this._right(10), opacity:0.7, zIndex:9}
        return (
            <div>
                <CurrentChild child={child} style={childStyle}/>
                {child._id ? <RouteHandler child={child}/> : <Baby child={{}}/>}
            </div>
        )
    }
}
Object.assign(SuperDaddy.defaultProps,{
    appId:"4516b5a9b8bf4f63b2bca6c8798ae78d",
    init:()=>init()
})

class CurrentChild extends Component{
    render(){
        var {child, style={}, ...others}=this.props, avatar

        if(child.photo)
            avatar=(<Avatar src={this.props.child.photo}/>)
        else
            avatar=(<div><span style={{fontSize:"xx-small"}}>{child.name}</span></div>)

        if(!child._id)
            style.display='none'

        return(
            <FloatingActionButton mini={true} style={style} onClick={()=>this.change()} {...others}>
                {avatar}
            </FloatingActionButton>
        )
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.child!=this.props.child
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
* Done:new Child is strange -- controlled input use setState to hold change
* init backend upload not start
*/
