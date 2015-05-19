var {init,User,React,Component,Router,Main}=require('dashboard'),
    {Route, NotFoundRoute, Link, State, DefaultRoute} = Router;

class Entry extends Component{
    render(){
        return (
            <Main
                title="Super Daddy"
            />
        )
    }
}


function onReady(){
    var routes=(
         <Route name="main" path="/" handler={Entry}>
         </Route>
     );

    init("http:","superdaddy", function(){
        Router.run(routes, function(Handler, state){
            React.render(<Handler
                params={state.params}
                query={state.query}/>, document.body)
        })
    })
}


typeof(document.ondeviceready)!='undefined' ? document.ondeviceready(onReady) : onReady();
