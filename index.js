require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,React,Component,Router,QiliApp,UI:{Comment}}=require('qili-app'),
    {Route, RouteHandler, DefaultRoute} = Router,
    {MenuItem, FloatingActionButton, Avatar}=require('material-ui'),
    Family=require('./lib/db/family'),
    Knowledge=require('./lib/db/knowledge'),
    Task=require('./lib/db/task'),
    Baby=require('./lib/baby');


class SuperDaddy extends QiliApp{
    constructor(props){
        super(props)
        this.state={child:Family.currentChild}
    }

    componentDidMount(){
        Family.event.on('change',()=>this.setState({child:Family.currentChild}))
    }

    render(a){
        if(a=super.render())
            return a;

        var {child}=this.state, floatAction, content
        if(child){
            floatAction=(<CurrentChild child={child}/>)
            content=(<RouteHandler child={child}/>)
        }else {
            content=(<Baby child={{}}/>)
        }
        return (
            <div className="withFootbar">
                <div id="container">
                    {floatAction}
                    {content}
                </div>
            </div>
        )
    }
}
Object.assign(SuperDaddy.defaultProps,{
    appId:"ac78253917904d0ca54f2140993101ec",
    init:()=>Family.init()
})


module.exports=QiliApp.render(
    <Route path="/" handler={SuperDaddy}>
        <Route name="task" path="task/:_id?/" handler={require('./lib/task')}/>
        <Route name="baby" path="baby/:_id?/" handler={require('./lib/baby')}/>
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


class CurrentChild extends Component{
    render(){
        var {child}=this.props, avatar,
            style={position:'fixed',top:10,right:10, opacity:0.7, zIndex:9}
        if(child.photo)
            avatar=(<Avatar src={this.props.child.photo}/>)
        else
            avatar=(<div><span style={{fontSize:"xx-small"}}>{child.name}</span></div>)

        return(
            <FloatingActionButton mini={true}
                onClick={this.change.bind(this)}
                style={style}>
                {avatar}
            </FloatingActionButton>
        )
    }
    shouldComponentUpdate(next){
        return next.child!=this.props.child
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
