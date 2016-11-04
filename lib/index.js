"use strict";

var _ref3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _qiliApp = require("qili-app");

var _materialUi = require("material-ui");

var _normalizr = require("normalizr");

var _dialpad = require("material-ui/svg-icons/communication/dialpad");

var _dialpad2 = _interopRequireDefault(_dialpad);

var _accountBox = require("material-ui/svg-icons/action/account-box");

var _accountBox2 = _interopRequireDefault(_accountBox);

var _formatListNumbered = require("material-ui/svg-icons/editor/format-list-numbered");

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _childCare = require("material-ui/svg-icons/places/child-care");

var _childCare2 = _interopRequireDefault(_childCare);

var _db = require("./db");

var _task = require("./task");

var _task2 = _interopRequireDefault(_task);

var _baby = require("./baby");

var _baby2 = _interopRequireDefault(_baby);

var _knowledges = require("./knowledges");

var _knowledges2 = _interopRequireDefault(_knowledges);

var _knowledge = require("./knowledge");

var _knowledge2 = _interopRequireDefault(_knowledge);

var _newKnowledge = require("./newKnowledge");

var _newKnowledge2 = _interopRequireDefault(_newKnowledge);

var _account = require("./account");

var _account2 = _interopRequireDefault(_account);

var _setting = require("./setting");

var _setting2 = _interopRequireDefault(_setting);

var _publish = require("./publish");

var _publish2 = _interopRequireDefault(_publish);

var _tasks = require("./tasks");

var _tasks2 = _interopRequireDefault(_tasks);

var _score = require("./score");

var _score2 = _interopRequireDefault(_score);

var _invite = require("./invite");

var _invite2 = _interopRequireDefault(_invite);

var _dashboard = require("./dashboard");

var _dashboard2 = _interopRequireDefault(_dashboard);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;


var DOMAIN = 'superdaddy';
var INIT_STATE = {};
var ACTION = {
    FAMILY_FETCHED: function FAMILY_FETCHED(_ref) {
        var children = _ref.children;
        var currentChild = _ref.currentChild;
        var all = _ref.all;
        return function (dispatch) {
            if (all.length) dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(all, (0, _normalizr.arrayOf)(_db.Family.schema)).entities));

            if (currentChild) dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: currentChild });else dispatch(ACTION.CREATE_DEFAULT_FIRST_CHILD());
        };
    },
    CREATE_DEFAULT_FIRST_CHILD: function CREATE_DEFAULT_FIRST_CHILD() {
        return function (dispatch) {
            return _db.Family.upsert({ name: "" }).then(function (child) {
                dispatch((0, _qiliApp.ENTITIES)((0, _normalizr.normalize)(child, _db.Family.schema).entities));
                dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: child });
            });
        };
    },
    SWITCH_CURRENT_CHILD: function SWITCH_CURRENT_CHILD() {
        return function (dispatch, getState) {
            var state = getState();
            var children = state.entities.children;
            var current = state[DOMAIN].child;
            var ids = Object.keys(children);
            var next = ids[(ids.indexOf(current) + 1) % ids.length];
            dispatch({ type: 'CURRENT_CHILD_CHANGE', payload: children[next] });
        };
    }
};

var REDUCER = function REDUCER() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? INIT_STATE : arguments[0];
    var _ref2 = arguments[1];
    var type = _ref2.type;
    var payload = _ref2.payload;

    switch (type) {
        case 'CURRENT_CHILD_CHANGE':
            return Object.assign({}, state, { child: payload._id });
    }
    return state;
};

var SuperDaddy = function (_Component) {
    _inherits(SuperDaddy, _Component);

    function SuperDaddy() {
        _classCallCheck(this, SuperDaddy);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).apply(this, arguments));
    }

    _createClass(SuperDaddy, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var childName = _props.childName;
            var childPhoto = _props.childPhoto;
            var children = _props.children;
            var routes = _props.routes;
            var initChildName = _props.initChildName;
            var dispatch = _props.dispatch;
            var router = this.context.router;

            var contextualStyle = { fontSize: "xx-small" };
            if (routes.find(function (a) {
                return a.contextual === false;
            })) contextualStyle.display = "none";
            return _react2.default.createElement(
                _qiliApp.QiliApp,
                { appId: "5746b2c5e4bb3b3700ae1566",
                    init: function init() {
                        return (0, _db.init)(initChildName).then(function (a) {
                            return dispatch(ACTION.FAMILY_FETCHED(a));
                        });
                    } },
                _react2.default.createElement(
                    _materialUi.FloatingActionButton,
                    { className: "sticky top right",
                        mini: true,
                        style: contextualStyle,
                        onClick: function onClick(e) {
                            return dispatch(ACTION.SWITCH_CURRENT_CHILD());
                        } },
                    childPhoto ? _react2.default.createElement(_materialUi.Avatar, { src: childPhoto }) : childName
                ),
                children,
                _react2.default.createElement(CommandBar, { className: "footbar",
                    items: [{ label: "我的任务", action: "tasks",
                        onSelect: function onSelect(a) {
                            return router.push('/');
                        },
                        icon: _react2.default.createElement(_formatListNumbered2.default, null) }, { label: "成绩", action: "score",
                        onSelect: function onSelect(a) {
                            return router.push('/score');
                        },
                        icon: _react2.default.createElement(_childCare2.default, null) }, { label: "发现", action: "knowledges",
                        onSelect: function onSelect(a) {
                            return router.push('/knowledges');
                        },
                        icon: _react2.default.createElement(_dialpad2.default, null) }, { label: "我", action: "account",
                        onSelect: function onSelect(a) {
                            return router.push('/account');
                        },
                        icon: _react2.default.createElement(_accountBox2.default, null) }]
                })
            );
        }
    }]);

    return SuperDaddy;
}(_react.Component);

/*
class SuperDaddy extends Component{
    constructor(props){
        super(props)
        Object.assign(this.state,{child:null})
        Family.event.on('change',child=>this.setState({child}))
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.children.props.route.contexture
			&& nextState.child!=this.state.child
			&& !this.context.router.isActive(`baby/${nextState.child.name}`)){
			this.context.router.push(`baby/${nextState.child.name}`)
			return false
		}

		return true
    }

    renderContent(){
        let {child}=this.state
		if(!child)
			return (<Empty icon={<Logo/>}><Link to="baby">click to start from your first baby!</Link></Empty>)

        let {contextual, name:routeName}=this.props.children.props.route
        return (
            <div>
				{contextual!=false &&
					(<CurrentChild name={child.name}/>)}

				{this.props.children}

                {routeName&&(<CommandBar className="footbar"
                    primary={routeName}
					items={[
						{label:"我的任务", action:"tasks",
                            onSelect:a=>this.context.router.push(''),
                            icon:<IconTask/>},
                        {label:"成绩", action:"score",
							onSelect:a=>this.context.router.push('score'),
							icon:<IconReward/>},
                        {label:"发现", action:"knowledges",
                            onSelect:a=>this.context.router.push('knowledges'),
                            icon:<IconKnowledges/>},
                        {label:"我", action:"account",
                            onSelect:a=>this.context.router.push('account'),
                            icon:<IconAccount/>}
                        ]}
                    />)}
            </div>
        )
    }
    static contextTypes={
        router:PropTypes.object
    }

    static childContextTypes=Object.assign({
        child: PropTypes.object
    },QiliApp.childContextTypes)

    getChildContext(){
        return Object.assign({
            child:this.state.child
        },super.getChildContext())
    }
}

Object.assign(SuperDaddy.defaultProps,{
    appId:"5746b2c5e4bb3b3700ae1566",
    init:()=>init()
})

class CurrentChild extends Component{
    render(){
        let {name}=this.props
        let {child}=this.context
        return(
            <FloatingActionButton className="contexture sticky top right"
				mini={true}
				style={{fontSize:"xx-small"}}
                onClick={e=>this.change()}>
                {child.photo ? (<Avatar src={child.photo}/>) : name}
            </FloatingActionButton>
        )
    }

    change(){
        var current=this.context.child,
            children=Family.children,
            len=children.length;
        if(len<2)
            return;

        var index=children.indexOf(current)
        Family.currentChild=children[(index+1) % len]
    }
    static contextTypes={child:PropTypes.object}
}


*/


SuperDaddy.defaultProps = {
    childName: _react.PropTypes.object,
    childPhoto: _react.PropTypes.string,
    initChildName: _react.PropTypes.string
};
SuperDaddy.contextTypes = {
    router: _react.PropTypes.object
};


var currentChild = function currentChild(state) {
    try {
        return state.entities[_db.Family._name][state[DOMAIN].child];
    } catch (e) {
        return {
            name: "_default"
        };
    }
};

module.exports = _qiliApp.QiliApp.render(_react2.default.createElement(
    _reactRouter.Route,
    { path: "/", component: (0, _reactRedux.connect)(function (a) {
            return { child: currentChild(a) };
        })(SuperDaddy) },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: (0, _reactRedux.connect)(function (a) {
            return { score: currentChild(a).score };
        })(_dashboard2.default) }),
    _react2.default.createElement(_reactRouter.Route, { name: "tasks", component: _tasks2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: "score", name: "score", component: _score2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: "knowledges", name: "knowledges", contextual: false, component: _knowledges2.default.Creatable }),
    _react2.default.createElement(_reactRouter.Route, { path: "account", name: "account", contextual: false, component: _account2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: "task/:_id", contextual: false, component: _task2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: "baby/:name", contexture: true, component: _baby2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: "baby", contextual: false, component: _baby.Creator }),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "courses" },
        _react2.default.createElement(_reactRouter.IndexRoute, { component: _knowledges2.default.Course }),
        _react2.default.createElement(_reactRouter.Route, { path: "done" })
    ),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "knowledge" },
        _react2.default.createElement(_reactRouter.IndexRoute, { contextual: false, component: _newKnowledge2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: ":_id", component: _knowledge2.default })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: "comment/:type/:_id", component: Comment }),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "setting" },
        _react2.default.createElement(_reactRouter.IndexRoute, { contextual: false, component: _setting2.default })
    ),
    _react2.default.createElement(
        _reactRouter.Route,
        { path: "publish", component: _publish2.default },
        _react2.default.createElement(_reactRouter.IndexRoute, null),
        _react2.default.createElement(_reactRouter.Route, { path: ":what" })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: "invite", component: _invite2.default })
), [(_ref3 = {}, _defineProperty(_ref3, DOMAIN, REDUCER), _defineProperty(_ref3, "ui", function ui() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    return a;
}), _ref3)]);

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
//# sourceMappingURL=data:application/json;base64,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U0FBTCxFQUFQO1FBQ0kseURBQVksV0FBVyxxQkFBYSxNQUFiLEVBQXZCLENBREo7UUFFSSxvREFBTyxNQUFLLE1BQUwsRUFBUCxDQUZKO0tBakJIO0lBc0JHOztVQUFPLE1BQUssV0FBTCxFQUFQO1FBQ0kseURBQVksWUFBWSxLQUFaLEVBQW1CLG1DQUEvQixDQURKO1FBRUksb0RBQU8sTUFBSyxNQUFMLEVBQVksZ0NBQW5CLENBRko7S0F0Qkg7SUEyQkcsb0RBQU8sTUFBSyxvQkFBTCxFQUEwQixXQUFXLE9BQVgsRUFBakMsQ0EzQkg7SUE4Qkc7O1VBQU8sTUFBSyxTQUFMLEVBQVA7UUFDTCx5REFBYSxZQUFZLEtBQVosRUFBb0IsOEJBQWpDLENBREs7S0E5Qkg7SUFrQ0c7O1VBQU8sTUFBSyxTQUFMLEVBQWUsOEJBQXRCO1FBQ0ksNERBREo7UUFFSSxvREFBTyxNQUFLLE9BQUwsRUFBUCxDQUZKO0tBbENIO0lBdUNHLG9EQUFPLE1BQUssUUFBTCxFQUFjLDZCQUFyQixDQXZDSDtDQURVLEVBMkNiLHFDQUFHLFFBQVEsdUNBQVc7UUFBQywwREFBRTtXQUFLO0NBQVIsU0FBdEIsQ0EzQ2EsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnQsIFByb3BUeXBlc30gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUWlsaUFwcCwgVUksIEVOVElUSUVTfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtub3JtYWxpemUsYXJyYXlPZn0gZnJvbSBcIm5vcm1hbGl6clwiXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY29uc3QgRE9NQUlOPSdzdXBlcmRhZGR5J1xuY29uc3QgSU5JVF9TVEFURT17fVxuY29uc3QgQUNUSU9OPXtcblx0RkFNSUxZX0ZFVENIRUQ6ICh7Y2hpbGRyZW4sIGN1cnJlbnRDaGlsZCwgYWxsfSk9PmRpc3BhdGNoPT57XG5cdFx0aWYoYWxsLmxlbmd0aClcblx0XHRcdGRpc3BhdGNoKEVOVElUSUVTKG5vcm1hbGl6ZShhbGwsYXJyYXlPZihGYW1pbHkuc2NoZW1hKSkuZW50aXRpZXMpKVxuXHRcdFxuXHRcdGlmKGN1cnJlbnRDaGlsZClcblx0XHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjdXJyZW50Q2hpbGR9KVxuXHRcdGVsc2Vcblx0XHRcdGRpc3BhdGNoKEFDVElPTi5DUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRCgpKVxuXHR9XG5cdCxDUkVBVEVfREVGQVVMVF9GSVJTVF9DSElMRDogKCk9PmRpc3BhdGNoPT57XG5cdFx0cmV0dXJuIEZhbWlseS51cHNlcnQoe25hbWU6XCJcIn0pXG5cdFx0XHQudGhlbihjaGlsZD0+e1xuXHRcdFx0XHRkaXNwYXRjaChFTlRJVElFUyhub3JtYWxpemUoY2hpbGQsRmFtaWx5LnNjaGVtYSkuZW50aXRpZXMpKVxuXHRcdFx0XHRkaXNwYXRjaCh7dHlwZTonQ1VSUkVOVF9DSElMRF9DSEFOR0UnLHBheWxvYWQ6Y2hpbGR9KVx0XG5cdFx0XHR9KVxuXHR9XG5cdCxTV0lUQ0hfQ1VSUkVOVF9DSElMRDogKCk9PihkaXNwYXRjaCxnZXRTdGF0ZSk9Pntcblx0XHRjb25zdCBzdGF0ZT1nZXRTdGF0ZSgpXG5cdFx0Y29uc3QgY2hpbGRyZW49c3RhdGUuZW50aXRpZXMuY2hpbGRyZW5cblx0XHRjb25zdCBjdXJyZW50PXN0YXRlW0RPTUFJTl0uY2hpbGRcblx0XHRjb25zdCBpZHM9T2JqZWN0LmtleXMoY2hpbGRyZW4pXG5cdFx0bGV0IG5leHQ9aWRzWyhpZHMuaW5kZXhPZihjdXJyZW50KSsxKSVpZHMubGVuZ3RoXVxuXHRcdGRpc3BhdGNoKHt0eXBlOidDVVJSRU5UX0NISUxEX0NIQU5HRScscGF5bG9hZDpjaGlsZHJlbltuZXh0XX0pXG5cdH1cbn1cblxuY29uc3QgUkVEVUNFUj0oc3RhdGU9SU5JVF9TVEFURSx7dHlwZSxwYXlsb2FkfSk9Pntcblx0c3dpdGNoKHR5cGUpe1xuXHRjYXNlICdDVVJSRU5UX0NISUxEX0NIQU5HRSc6XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3RhdGUse2NoaWxkOnBheWxvYWQuX2lkfSlcblx0fVxuXHRyZXR1cm4gc3RhdGVcbn1cblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcblx0cmVuZGVyKCl7XG5cdFx0Y29uc3Qge2NoaWxkTmFtZSwgY2hpbGRQaG90bywgY2hpbGRyZW4sIHJvdXRlcywgaW5pdENoaWxkTmFtZSwgZGlzcGF0Y2h9PXRoaXMucHJvcHNcblx0XHRjb25zdCB7cm91dGVyfT10aGlzLmNvbnRleHRcblx0XHRsZXQgY29udGV4dHVhbFN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9XG5cdFx0aWYocm91dGVzLmZpbmQoYT0+YS5jb250ZXh0dWFsPT09ZmFsc2UpKVxuXHRcdFx0Y29udGV4dHVhbFN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxRaWxpQXBwIGFwcElkPVwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCIgXG5cdFx0XHRcdGluaXQ9e1xuXHRcdFx0XHRcdCgpPT5pbml0KGluaXRDaGlsZE5hbWUpXG5cdFx0XHRcdFx0XHQudGhlbihhPT5kaXNwYXRjaChBQ1RJT04uRkFNSUxZX0ZFVENIRUQoYSkpKVxuXHRcdFx0XHR9PlxuXHRcdFx0XHQ8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG5cdFx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0XHRzdHlsZT17Y29udGV4dHVhbFN0eWxlfVxuXHRcdFx0XHRcdG9uQ2xpY2s9e2U9PmRpc3BhdGNoKEFDVElPTi5TV0lUQ0hfQ1VSUkVOVF9DSElMRCgpKX0+XG5cdFx0XHRcdFx0e2NoaWxkUGhvdG8gPyAoPEF2YXRhciBzcmM9e2NoaWxkUGhvdG99Lz4pIDogY2hpbGROYW1lfVxuXHRcdFx0XHQ8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuXG5cdFx0XHRcdHtjaGlsZHJlbn1cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJHnmoTku7vliqFcIiwgYWN0aW9uOlwidGFza3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT5yb3V0ZXIucHVzaCgnLycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25UYXNrLz59LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvc2NvcmUnKSxcblx0XHRcdFx0XHRcdFx0aWNvbjo8SWNvblJld2FyZC8+fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+cm91dGVyLnB1c2goJy9rbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbktub3dsZWRnZXMvPn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiYWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnJvdXRlci5wdXNoKCcvYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246PEljb25BY2NvdW50Lz59XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9RaWxpQXBwPlxuICAgICAgICApXG5cdH1cblx0XG5cdHN0YXRpYyBkZWZhdWx0UHJvcHM9e1xuXHRcdGNoaWxkTmFtZTogUHJvcFR5cGVzLm9iamVjdFxuXHRcdCxjaGlsZFBob3RvOiBQcm9wVHlwZXMuc3RyaW5nXG5cdFx0LGluaXRDaGlsZE5hbWU6IFByb3BUeXBlcy5zdHJpbmdcblx0fVxuXHRcblx0c3RhdGljIGNvbnRleHRUeXBlcz17XG5cdFx0cm91dGVyOiBQcm9wVHlwZXMub2JqZWN0XG5cdH1cbn1cblxuXG4vKlxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NoaWxkOm51bGx9KVxuICAgICAgICBGYW1pbHkuZXZlbnQub24oJ2NoYW5nZScsY2hpbGQ9PnRoaXMuc2V0U3RhdGUoe2NoaWxkfSkpXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dXJlXG5cdFx0XHQmJiBuZXh0U3RhdGUuY2hpbGQhPXRoaXMuc3RhdGUuY2hpbGRcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnN0YXRlXG5cdFx0aWYoIWNoaWxkKVxuXHRcdFx0cmV0dXJuICg8RW1wdHkgaWNvbj17PExvZ28vPn0+PExpbmsgdG89XCJiYWJ5XCI+Y2xpY2sgdG8gc3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnkhPC9MaW5rPjwvRW1wdHk+KVxuXG4gICAgICAgIGxldCB7Y29udGV4dHVhbCwgbmFtZTpyb3V0ZU5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdHtjb250ZXh0dWFsIT1mYWxzZSAmJlxuXHRcdFx0XHRcdCg8Q3VycmVudENoaWxkIG5hbWU9e2NoaWxkLm5hbWV9Lz4pfVxuXG5cdFx0XHRcdHt0aGlzLnByb3BzLmNoaWxkcmVufVxuXG4gICAgICAgICAgICAgICAge3JvdXRlTmFtZSYmKDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtyb3V0ZU5hbWV9XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkeeahOS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvblRhc2svPn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdzY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOjxJY29uUmV3YXJkLz59LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOjxJY29uS25vd2xlZGdlcy8+fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJhY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjo8SWNvbkFjY291bnQvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e1xuICAgICAgICByb3V0ZXI6UHJvcFR5cGVzLm9iamVjdFxuICAgIH1cblxuICAgIHN0YXRpYyBjaGlsZENvbnRleHRUeXBlcz1PYmplY3QuYXNzaWduKHtcbiAgICAgICAgY2hpbGQ6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9LFFpbGlBcHAuY2hpbGRDb250ZXh0VHlwZXMpXG5cbiAgICBnZXRDaGlsZENvbnRleHQoKXtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgY2hpbGQ6dGhpcy5zdGF0ZS5jaGlsZFxuICAgICAgICB9LHN1cGVyLmdldENoaWxkQ29udGV4dCgpKVxuICAgIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtuYW1lfT10aGlzLnByb3BzXG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMuY29udGV4dFxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwiY29udGV4dHVyZSBzdGlja3kgdG9wIHJpZ2h0XCJcblx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0c3R5bGU9e3tmb250U2l6ZTpcInh4LXNtYWxsXCJ9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2U9PnRoaXMuY2hhbmdlKCl9PlxuICAgICAgICAgICAgICAgIHtjaGlsZC5waG90byA/ICg8QXZhdGFyIHNyYz17Y2hpbGQucGhvdG99Lz4pIDogbmFtZX1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5jb250ZXh0LmNoaWxkLFxuICAgICAgICAgICAgY2hpbGRyZW49RmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcbiAgICAgICAgRmFtaWx5LmN1cnJlbnRDaGlsZD1jaGlsZHJlblsoaW5kZXgrMSkgJSBsZW5dXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e2NoaWxkOlByb3BUeXBlcy5vYmplY3R9XG59XG5cblxuKi9cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5pbXBvcnQgSW52aXRlVUkgZnJvbSBcIi4vaW52aXRlXCJcblxuaW1wb3J0IERhc2hib2FyZFVJIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5cbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuY29uc3QgY3VycmVudENoaWxkPXN0YXRlPT57XG5cdHRyeXtcblx0XHRyZXR1cm4gc3RhdGUuZW50aXRpZXNbRmFtaWx5Ll9uYW1lXVtzdGF0ZVtET01BSU5dLmNoaWxkXVxuXHR9Y2F0Y2goZSl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5hbWU6XCJfZGVmYXVsdFwiXG5cdFx0fVxuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e2Nvbm5lY3QoYT0+KHtjaGlsZDpjdXJyZW50Q2hpbGQoYSl9KSkoU3VwZXJEYWRkeSl9PlxuXHRcdFxuXHRcdDxJbmRleFJvdXRlIGNvbXBvbmVudD17Y29ubmVjdChhPT4oe3Njb3JlOmN1cnJlbnRDaGlsZChhKS5zY29yZX0pKShEYXNoYm9hcmRVSSl9Lz5cblx0XHRcbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZXNcIiBuYW1lPVwia25vd2xlZGdlc1wiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5DcmVhdGFibGV9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnkvOm5hbWVcIiBjb250ZXh0dXJlPXt0cnVlfSBjb21wb25lbnQ9e0JhYnlVSX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5Db3Vyc2V9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9uZVwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzZXR0aW5nXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSAgY29udGV4dHVhbD17ZmFsc2V9ICBjb21wb25lbnQ9e1NldHRpbmdVSX0vPlxuXHRcdDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJwdWJsaXNoXCIgY29tcG9uZW50PXtQdWJsaXNoVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6d2hhdFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImludml0ZVwiIGNvbXBvbmVudD17SW52aXRlVUl9Lz5cblxuICAgIDwvUm91dGU+KVxuXHQsW3tbRE9NQUlOXTpSRURVQ0VSLHVpOihhPXt9KT0+YX1dXG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==