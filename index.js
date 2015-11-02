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
    constructor(props){
        super(props)
        this.state={child:Family.currentChild}
    }
    getChildContext(){
        return {muiTheme:themeManager.getCurrentTheme()}
    }
    componentDidMount(){
        Family.event.on('change',this.__onCurrentchange=()=>this.setState({child:Family.currentChild}))
    }

    componentWillUnmount(){
        Family.event.removeListener('change',this.__onCurrentchange)
    }
    render(){
        var floatAction,main, {child}=this.state
        if(child){
            floatAction=(<CurrentChild child={child}/>)
            main=(<RouteHandler child={child}/>)
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

;(function onReady(){
    var routes=(
         <Route name="home" path="/" handler={Entry}>
             <Route name="task" path="task/:_id?" handler={require('./lib/task')}/>
             <Route name="baby" path="baby/:_id?" handler={require('./lib/baby')}/>
             <Route name="knowledges" path="knowledges/" handler={require('./lib/knowledges')}/>
             <Route name="knowledge" path="knowledge/:_id/" handler={require('./lib/knowledge')}/>
             <Route name="create" path="create/" handler={require('./lib/newKnowledge')} />
             <Route name="comment" path="comment/:type/:_id/" handler={Comment}/>
             <Route name="account" path="account/" handler={require('./lib/account')} />
             <Route name="setting" path="setting/" handler={require('./lib/setting')} />
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
