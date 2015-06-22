require('restmock')

var {init,User,React,Component,Router,Main,UI:{Comment}}=require('dashboard'),
    {Route, RouteHandler, Link, NotFoundRoute, DefaultRoute, HistoryLocation} = Router,
    {MenuItem,Styles:{ThemeManager}}=require('material-ui'),
    Family=require('./lib/db/family'),
    Knowledge=require('./lib/db/knowledge'),
    Task=require('./lib/db/task'),
    themeManager=new ThemeManager();


class Entry extends Component{
    constructor(props){
        super(props)
        this.state={
            user:User.current,
            child:Family.currentChild,
            children:Family.children
        }
    }
    getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    render(){
        return (
            <div className="withFootbar">
                <RouteHandler/>
            </div>
        )
    }
}

Entry.contextTypes={router:React.PropTypes.func}
Entry.childContextTypes={muiTheme:React.PropTypes.object}

;(function onReady(){
    var routes=(
         <Route name="home" path="/" handler={Entry}>
            <Route name="task" path="task/:_id?" handler={require('./lib/task')}/>
            <Route name="family" path="family/:_id?" handler={require('./lib/family')}/>
            <Route name="knowledges" handler={require('./lib/knowledges')}/>
            <Route name="knowledge" path="knowledge/:_id" handler={require('./lib/knowledge')}/>
            <Route name="comment" path="comment/:type/:_id" handler={Comment}/>
            <NotFoundRoute handler={require("./lib/dashboard")}/>
         </Route>
     );

    init("http://localhost:9080/1/","superDaddy", function(db){
        Family.init(db).then(function(){
            Knowledge.init(db)
            Task.init(db)
            Router.run(routes, (!window.cordova ? HistoryLocation : undefined),function(Handler, state){
                React.render(<Handler
                    params={state.params}
                    query={state.query}/>, document.body)
            })
        })
    })
})();
