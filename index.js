require('restmock')
require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,React,Component,Router,QiliApp,UI:{Comment}}=require('dashboard'),
    {Route, RouteHandler, DefaultRoute} = Router,
    {MenuItem,Styles:{ThemeManager}, FloatingActionButton, Avatar}=require('material-ui'),
    Family=require('./lib/db/family'),
    Knowledge=require('./lib/db/knowledge'),
    Task=require('./lib/db/task'),
    themeManager=new ThemeManager(),
    Baby=require('./lib/baby');


class SuperDaddy extends Component{
    constructor(props){
        super(props)
        this.state={child:Family.currentChild}
    }
    getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    componentDidMount(){
        Family.event.on('change',()=>this.setState({child:Family.currentChild}))
    }

    render(){
        var {child}=this.state
        return (
            <QiliApp appId="SuperDaddy" init={()=>Family.init()}>
                <div className="withFootbar">
                    <div id="container">
                    {child ? (<CurrentChild child={child}/>) : null}
                    {child ? (<RouteHandler child={child}/>) : (<Baby child={Family.currentChild={}}/>)}
                    </div>
                </div>
            </QiliApp>
        )
    }
}

SuperDaddy.childContextTypes={muiTheme:React.PropTypes.object}

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
CurrentChild.PropTypes={
    onChange: React.PropTypes.func.isRequired
}

CurrentChild.contextTypes={router:React.PropTypes.func}


QiliApp.render(
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

/*
;(function onReady(){
    var root="/",
        routes=(
         <Route path={root} handler={Entry}>
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
     );

    function getHistory(){
        return document.location.pathname==root ? HistoryLocation : HashLocation
    }
    window.routed=new Promise((resolve, reject)=>{
        init("http://localhost:9080/1/","superDaddy", function(db){
            Family.init().then(function(){
                Router.run(routes, getHistory(),function(Handler, state){
                    var container=document.getElementById('app')
                    container.style.height=window.innerHeight+'px'
                    resolve(React.render(<Handler
                        params={state.params}
                        query={state.query}/>, container))
                })
            }, reject)
        })
    })
})();
*/
