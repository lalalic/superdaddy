'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _reactRouter = require('react-router');

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _accountBox = require('material-ui/svg-icons/action/account-box');

var _accountBox2 = _interopRequireDefault(_accountBox);

var _formatListNumbered = require('material-ui/svg-icons/editor/format-list-numbered');

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _childCare = require('material-ui/svg-icons/places/child-care');

var _childCare2 = _interopRequireDefault(_childCare);

var _db = require('./db');

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

var _baby = require('./baby');

var _baby2 = _interopRequireDefault(_baby);

var _knowledges = require('./knowledges');

var _knowledges2 = _interopRequireDefault(_knowledges);

var _knowledge = require('./knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _newKnowledge = require('./newKnowledge');

var _newKnowledge2 = _interopRequireDefault(_newKnowledge);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

var _setting = require('./setting');

var _setting2 = _interopRequireDefault(_setting);

var _publish = require('./publish');

var _publish2 = _interopRequireDefault(_publish);

var _tasks = require('./tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _score = require('./score');

var _score2 = _interopRequireDefault(_score);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;

var SuperDaddy = function (_QiliApp) {
    _inherits(SuperDaddy, _QiliApp);

    function SuperDaddy(props) {
        _classCallCheck(this, SuperDaddy);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).call(this, props));

        Object.assign(_this.state, { child: null });
        _db.Family.event.on('change', function (child) {
            return _this.setState({ child: child });
        });
        return _this;
    }

    _createClass(SuperDaddy, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            if (this.props.children.props.route.contexture && nextState.child != this.state.child && !this.context.router.isActive('baby/' + nextState.child.name)) {
                this.context.router.push('baby/' + nextState.child.name);
                return false;
            }

            return true;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var child = this.state.child;

            if (!child) return _qiliApp.React.createElement(
                Empty,
                { icon: _qiliApp.React.createElement(Logo, null) },
                _qiliApp.React.createElement(
                    Link,
                    { to: 'baby' },
                    'click to start from your first baby!'
                )
            );

            var _props$children$props = this.props.children.props.route;
            var contextual = _props$children$props.contextual;
            var routeName = _props$children$props.name;

            return _qiliApp.React.createElement(
                'div',
                null,
                contextual != false && _qiliApp.React.createElement(CurrentChild, { name: child.name }),
                this.props.children,
                routeName && _qiliApp.React.createElement(CommandBar, { className: 'footbar',
                    primary: routeName,
                    items: [{ label: "我的任务", action: "tasks",
                        onSelect: function onSelect(a) {
                            return _this2.context.router.push('');
                        },
                        icon: _formatListNumbered2.default }, { label: "成绩", action: "score",
                        onSelect: function onSelect(a) {
                            return _this2.context.router.push('score');
                        },
                        icon: _childCare2.default }, { label: "发现", action: "knowledges",
                        onSelect: function onSelect(a) {
                            return _this2.context.router.push('knowledges');
                        },
                        icon: _dialpad2.default }, { label: "我", action: "account",
                        onSelect: function onSelect(a) {
                            return _this2.context.router.push('account');
                        },
                        icon: _accountBox2.default }]
                })
            );
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return Object.assign({
                child: this.state.child
            }, _get(Object.getPrototypeOf(SuperDaddy.prototype), 'getChildContext', this).call(this));
        }
    }]);

    return SuperDaddy;
}(_qiliApp.QiliApp);

SuperDaddy.contextTypes = {
    router: _qiliApp.React.PropTypes.object
};
SuperDaddy.childContextTypes = Object.assign({
    child: _qiliApp.React.PropTypes.object
}, _qiliApp.QiliApp.childContextTypes);


Object.assign(SuperDaddy.defaultProps, {
    appId: "5746b2c5e4bb3b3700ae1566",
    init: function init() {
        return (0, _db.init)();
    }
});

var CurrentChild = function (_Component) {
    _inherits(CurrentChild, _Component);

    function CurrentChild() {
        _classCallCheck(this, CurrentChild);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(CurrentChild).apply(this, arguments));
    }

    _createClass(CurrentChild, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var name = this.props.name;
            var child = this.context.child;

            return _qiliApp.React.createElement(
                _materialUi.FloatingActionButton,
                { className: 'contexture sticky top right',
                    mini: true,
                    style: { fontSize: "xx-small" },
                    onClick: function onClick(e) {
                        return _this4.change();
                    } },
                child.photo ? _qiliApp.React.createElement(_materialUi.Avatar, { src: child.photo }) : name
            );
        }
    }, {
        key: 'change',
        value: function change() {
            var current = this.context.child,
                children = _db.Family.children,
                len = children.length;
            if (len < 2) return;

            var index = children.indexOf(current);
            _db.Family.currentChild = children[(index + 1) % len];
        }
    }]);

    return CurrentChild;
}(_qiliApp.Component);

CurrentChild.contextTypes = { child: _qiliApp.React.PropTypes.object };


module.exports = _qiliApp.QiliApp.render(_qiliApp.React.createElement(
    _reactRouter.Route,
    { path: '/', component: SuperDaddy },
    _qiliApp.React.createElement(_reactRouter.IndexRoute, { name: 'tasks', component: _tasks2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'score', name: 'score', component: _score2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'knowledges', name: 'knowledges', contextual: false, component: _knowledges2.default.Creatable }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'account', name: 'account', contextual: false, component: _account2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'task/:_id', contextual: false, component: _task2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby/:name', contexture: true, component: _baby2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', contextual: false, component: _baby.Creator }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'courses' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _knowledges2.default.Course }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: 'done' })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'knowledge' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { contextual: false, component: _newKnowledge2.default }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id', component: _knowledge2.default })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'comment/:type/:_id', component: Comment }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'setting' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { contextual: false, component: _setting2.default })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'publish', component: _publish2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, null),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':what' })
    )
), {
    createElement: function createElement(Component, props) {
        if (Component == SuperDaddy) {
            (function () {
                //refresh baby page
                var child = props.children;
                var _child$props = child.props;
                var route = _child$props.route;
                var params = _child$props.params;


                if (route.name == "baby") props.init = function (a) {
                    return (0, _db.init)(params.name);
                };
            })();
        }
        return _qiliApp.React.createElement(Component, props);
    }
});

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
//# sourceMappingURL=data:application/json;base64,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LFlBQUcsYUFBVyxVQUFYLEVBQXNCOzs7QUFDcEIsNEJBQU0sTUFBTSxRQUFOO21DQUNPLE1BQU0sS0FBTjtvQkFBZDtvQkFBTTs7O0FBRVQsb0JBQUcsTUFBTSxJQUFOLElBQVksTUFBWixFQUNGLE1BQU0sSUFBTixHQUFXOzJCQUFHLGNBQUssT0FBTyxJQUFQO2lCQUFSLENBRFo7aUJBSndCO1NBQXpCO0FBT0EsZUFBTyw2QkFBQyxTQUFELEVBQWUsS0FBZixDQUFQLENBUjhCO0tBRG5CO0NBdENDLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjaGlsZDpudWxsfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLGNoaWxkPT50aGlzLnNldFN0YXRlKHtjaGlsZH0pKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUuY29udGV4dHVyZVxuXHRcdFx0JiYgbmV4dFN0YXRlLmNoaWxkIT10aGlzLnN0YXRlLmNoaWxkXG5cdFx0XHQmJiAhdGhpcy5jb250ZXh0LnJvdXRlci5pc0FjdGl2ZShgYmFieS8ke25leHRTdGF0ZS5jaGlsZC5uYW1lfWApKXtcblx0XHRcdHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgYmFieS8ke25leHRTdGF0ZS5jaGlsZC5uYW1lfWApXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5zdGF0ZVxuXHRcdGlmKCFjaGlsZClcblx0XHRcdHJldHVybiAoPEVtcHR5IGljb249ezxMb2dvLz59PjxMaW5rIHRvPVwiYmFieVwiPmNsaWNrIHRvIHN0YXJ0IGZyb20geW91ciBmaXJzdCBiYWJ5ITwvTGluaz48L0VtcHR5PilcblxuICAgICAgICBsZXQge2NvbnRleHR1YWwsIG5hbWU6cm91dGVOYW1lfT10aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHR7Y29udGV4dHVhbCE9ZmFsc2UgJiZcblx0XHRcdFx0XHQoPEN1cnJlbnRDaGlsZCBuYW1lPXtjaGlsZC5uYW1lfS8+KX1cblxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbn1cblxuICAgICAgICAgICAgICAgIHtyb3V0ZU5hbWUmJig8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cm91dGVOYW1lfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJHnmoTku7vliqFcIiwgYWN0aW9uOlwidGFza3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvblRhc2t9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnc2NvcmUnKSxcblx0XHRcdFx0XHRcdFx0aWNvbjpJY29uUmV3YXJkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiYWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IEljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17XG4gICAgICAgIHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG4gICAgfVxuXG4gICAgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzPU9iamVjdC5hc3NpZ24oe1xuICAgICAgICBjaGlsZDogUmVhY3QuUHJvcFR5cGVzLm9iamVjdFxuICAgIH0sUWlsaUFwcC5jaGlsZENvbnRleHRUeXBlcylcblxuICAgIGdldENoaWxkQ29udGV4dCgpe1xuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBjaGlsZDp0aGlzLnN0YXRlLmNoaWxkXG4gICAgICAgIH0sc3VwZXIuZ2V0Q2hpbGRDb250ZXh0KCkpXG4gICAgfVxufVxuXG5PYmplY3QuYXNzaWduKFN1cGVyRGFkZHkuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiLFxuICAgIGluaXQ6KCk9PmluaXQoKVxufSlcblxuY2xhc3MgQ3VycmVudENoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge25hbWV9PXRoaXMucHJvcHNcbiAgICAgICAgbGV0IHtjaGlsZH09dGhpcy5jb250ZXh0XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJjb250ZXh0dXJlIHN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuXHRcdFx0XHRzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19XG4gICAgICAgICAgICAgICAgb25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2NoaWxkLnBob3RvID8gKDxBdmF0YXIgc3JjPXtjaGlsZC5waG90b30vPikgOiBuYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIgY3VycmVudD10aGlzLmNvbnRleHQuY2hpbGQsXG4gICAgICAgICAgICBjaGlsZHJlbj1GYW1pbHkuY2hpbGRyZW4sXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9Y2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxuICAgICAgICBGYW1pbHkuY3VycmVudENoaWxkPWNoaWxkcmVuWyhpbmRleCsxKSAlIGxlbl1cbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17Y2hpbGQ6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17U3VwZXJEYWRkeX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlc1wiIG5hbWU9XCJrbm93bGVkZ2VzXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNyZWF0YWJsZX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYmFieS86bmFtZVwiIGNvbnRleHR1cmU9e3RydWV9IGNvbXBvbmVudD17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtOZXdLbm93bGVkZ2VVSX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIgY29tcG9uZW50PXtLbm93bGVkZ2VVSX0vPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNldHRpbmdcIj5cblx0XHRcdDxJbmRleFJvdXRlICBjb250ZXh0dWFsPXtmYWxzZX0gIGNvbXBvbmVudD17U2V0dGluZ1VJfS8+XG5cdFx0PC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1TdXBlckRhZGR5KXsvL3JlZnJlc2ggYmFieSBwYWdlXG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYmFieVwiKVxuXHRcdFx0XHRcdHByb3BzLmluaXQ9YT0+aW5pdChwYXJhbXMubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxuXHRcdH1cblx0fVxuKVxuXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=