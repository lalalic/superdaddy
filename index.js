require('restmock')
require('./lib/css/index.less')
require('babel/polyfill')

var {init,User,React,Component,Router,Main,UI:{Comment}}=require('dashboard'),
    {Route, RouteHandler, Link, NotFoundRoute, DefaultRoute, HistoryLocation} = Router,
    {MenuItem,Styles:{ThemeManager}, FloatingActionButton, Avatar}=require('material-ui'),
    Family=require('./lib/db/family'),
    Knowledge=require('./lib/db/knowledge'),
    Task=require('./lib/db/task'),
    themeManager=new ThemeManager(),
    Baby=require('./lib/baby');


class Entry extends Component{
    getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    render(){
        var floatAction,main
        if(Family.currentChild){
            floatAction=(<CurrentChild onChange={()=>this.forceUpdate()}/>)
            main=(<RouteHandler/>)
        }else{
            main=(<Baby/>)
        }

        return (
            <Main.Light>
                <div className="withFootbar">
                    {floatAction}
                    {main}
                </div>
            </Main.Light>
        )
    }
}

Entry.childContextTypes={muiTheme:React.PropTypes.object}

class CurrentChild extends Component{
    render(){
        return(
            <FloatingActionButton mini={true}
                onClick={this.change.bind(this)}
                style={{position:'fixed',top:10,right:10}}>
                <Avatar src="http://n.sinaimg.cn/transform/20150716/cKHR-fxfaswi4039085.jpg"/>
            </FloatingActionButton>
        )
    }
    change(){
        var current=Family.currentChild,
            children=Family.children,
            len=children.length;
        if(len<2)
            return;

        var index=children.indexOf(current)
        Family.currentChild=children[index+1 % len]
        var {onChange}=this.props
        onChange()
    }
}
CurrentChild.PropTypes={
    onChange: React.PropTypes.func.isRequired
}

CurrentChild.contextTypes={router:React.PropTypes.func}

;(function onReady(){
    var routes=(
         <Route name="home" path="/" handler={Entry}>
             <Route name="task" path="task/:_id?" handler={require('./lib/task')}/>
             <Route name="baby" path="baby/:_id?" handler={require('./lib/baby')}/>
             <Route name="knowledges" handler={require('./lib/knowledges')}/>
             <Route name="knowledge" path="knowledge/:_id" handler={require('./lib/knowledge')}/>
             <Route name="comment" path="comment/:type/:_id" handler={Comment}/>
             <Route name="dashboard" path="dashboard/:when?" handler={require("./lib/dashboard")}/>
             <NotFoundRoute handler={require("./lib/dashboard")}/>
         </Route>
     );

    init("http://localhost:9080/1/","superDaddy", function(db){
        Family.init().then(function(){
            Router.run(routes, (!window.cordova ? HistoryLocation : undefined),function(Handler, state){
                var container=document.getElementById('app')
                container.style.height=window.innerHeight+'px'
                React.render(<Handler
                    params={state.params}
                    query={state.query}/>, container)
            })
        })
    })
})();
