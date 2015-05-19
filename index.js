var {init,User,React,Component,Router,Main}=require('dashboard');
var routes=(
     <Router name="main" path="/" handler={Entry}>

     </Router>
 );

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
    init("http:","superdaddy", function(){
        Router.run(routes, function(Handler, state){
            React.render(<Handler
                params={state.params}
                query={state.query}/>, document.body)
        })
    })
}


typeof(document.ondeviceready)!='undefined' ? document.ondeviceready(onReady) : onReady();
