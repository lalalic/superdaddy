require('restmock')

var {init,User,React,Component,Router,Main,UI:{Comment}}=require('dashboard'),
    {Route, Link, NotFoundRoute, DefaultRoute, HistoryLocation} = Router,
    {MenuItem}=require('material-ui'),
    Family=require('./lib/db/family'),
    Knowledge=require('./lib/db/knowledge'),
    Task=require('./lib/db/task');


class Entry extends Component{
    constructor(props){
        super(props)
        this.state={
            user:User.current,
            child:Family.currentChild,
            children:Family.children
        }
    }
    render(){
        var quickActions=[],children=this.state.children;

        quickActions.push({text:'knowledge', route:'knowledges'})

        if(children && children.length){
            var path=this.context.router.makePath
            quickActions.push({text:'children',type:MenuItem.Types.SUBHEADER})
            children.forEach(function(child){
                quickActions.push({text:child.name,route:path('family',child)})
            }.bind(this))
        }

        quickActions.push({type:MenuItem.Types.SUBHEADER, text:""})
        quickActions.push({text:"logout",
            iconClassName:'icon-log-out',
            onClick:User.logout})

        return (
            <Main
                title="Super Daddy"
                quickActions={quickActions}
            />
        )
    }
}

Entry.contextTypes={router:React.PropTypes.func}

;(function onReady(){
    var routes=(
         <Route name="main" path="/" handler={Entry}>
            <Route name="task" path="task/:_id" handler={require('./lib/task')}/>
            <Route name="family" path="family/:_id" handler={require('./lib/family')}/>
            <Route name="knowledges" handler={require('./lib/knowledges')}/>
            <Route name="knowledge" path="knowledge/:_id" handler={require('./lib/knowledge')}/>

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
