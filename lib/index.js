'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require('react-router');

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

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

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;

var SuperDaddy = function (_QiliApp) {
    _inherits(SuperDaddy, _QiliApp);

    function SuperDaddy(props) {
        _classCallCheck(this, SuperDaddy);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).call(this, props));

        Object.assign(_this.state, { baby: null });
        _db.Family.event.on('change', function (baby) {
            return _this.setState({ baby: baby });
        });
        return _this;
    }

    _createClass(SuperDaddy, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var route = this.props.children.props.route.name;

            if (route == "baby" && nextState.baby != this.state.baby) return false;

            return true;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var baby = this.state.baby;
            var child = this.props.children;
            var route = child.props.route;

            return _qiliApp.React.createElement(
                'div',
                null,
                'CurrentChild child=',
                baby,
                ' name=',
                baby.name,
                ' mini=',
                true,
                'show=',
                route.floatingButton === false ? false : true,
                'onChange=',
                function (target) {
                    _db.Family.currentChild = target;
                    if (route.name == "baby") _this2.context.router.push({ pathname: 'baby/' + target.name });
                },
                '/>',
                _qiliApp.React.cloneElement(child, { child: baby })
            );
        }
    }]);

    return SuperDaddy;
}(_qiliApp.QiliApp);

SuperDaddy.contextTypes = { router: _qiliApp.React.PropTypes.object };


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

            var _props = this.props;
            var child = _props.child;
            var show = _props.show;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { position: "absolute", zIndex: 9 } : _props$style;
            var others = _objectWithoutProperties(_props, ['child', 'show', 'style']);var avatar;

            if (child.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: this.props.child.photo });else avatar = _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(
                    'span',
                    { style: { fontSize: "xx-small" } },
                    this.lastName = child.name
                )
            );

            if (!show) style.display = "none";

            return _qiliApp.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'sticky top right',
                    style: style
                }, others, {
                    onClick: function onClick(e) {
                        return _this4.change();
                    } }),
                avatar
            );
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return true;
            var target = nextProps.name;
            var targetOpen = nextProps.open;
            var _props2 = this.props;
            var name = _props2.name;
            var open = _props2.open;


            return target != name || targetOpen != open;
        }
    }, {
        key: 'change',
        value: function change() {
            var current = this.props.child,
                children = _db.Family.children,
                len = children.length;
            if (len < 2) return;

            var index = children.indexOf(current);
            this.props.onChange(children[(index + 1) % len]);
        }
    }]);

    return CurrentChild;
}(_qiliApp.Component);

CurrentChild.contextTypes = { router: _qiliApp.React.PropTypes.object };


module.exports = _qiliApp.QiliApp.render(_qiliApp.React.createElement(
    _reactRouter.Route,
    { path: '/', component: SuperDaddy },
    _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'tasks' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _tasks2.default }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: 'approvings', component: _tasks.Approvings }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':when', component: _tasks2.default })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'task/:_id', component: _task2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby/:name', name: 'baby', component: _baby2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', floatingButton: false, component: _baby2.default.Creator,
        onEnter: function onEnter(nextState, replace) {
            _db.Family.currentChild = {};
        } }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'knowledges', component: _knowledges2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'knowledge' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { floatingButton: false, component: _newKnowledge2.default }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id', component: _knowledge2.default })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'comment/:type/:_id', component: Comment }),
    _qiliApp.React.createElement(_reactRouter.Route, { floatingButton: false, path: 'account', component: _account2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { floatingButton: false, path: 'setting' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _setting2.default })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'publish', path: 'publish', component: _publish2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { params: { what: "all" } }),
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
    },
    onError: function onError(error) {
        console.log('onerror: ' + error);
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
//# sourceMappingURL=data:application/json;base64,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InJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFJlYWN0LENvbXBvbmVudCxRaWxpQXBwLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudH09VUlcblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtiYWJ5Om51bGx9KVxuICAgICAgICBGYW1pbHkuZXZlbnQub24oJ2NoYW5nZScsYmFieT0+dGhpcy5zZXRTdGF0ZSh7YmFieX0pKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGxldCB7bmFtZTpyb3V0ZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZVxuICAgICAgICBpZihyb3V0ZT09XCJiYWJ5XCIgJiYgbmV4dFN0YXRlLmJhYnkhPXRoaXMuc3RhdGUuYmFieSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2JhYnl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgICx7Y2hpbGRyZW46Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgICAgICx7cm91dGV9PWNoaWxkLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIEN1cnJlbnRDaGlsZCBjaGlsZD17YmFieX0gbmFtZT17YmFieS5uYW1lfSBtaW5pPXt0cnVlfVxuXHRcdFx0XHRzaG93PXtyb3V0ZS5mbG9hdGluZ0J1dHRvbj09PWZhbHNlID8gZmFsc2UgOiB0cnVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGFyZ2V0PT57XG4gICAgICAgICAgICAgICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLm5hbWU9PVwiYmFieVwiKVxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmBiYWJ5LyR7dGFyZ2V0Lm5hbWV9YH0pXG4gICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLHtjaGlsZDpiYWJ5fSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZCwgc2hvdywgc3R5bGU9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIiwgekluZGV4Ojl9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG5cdFx0aWYoIXNob3cpXG5cdFx0XHRzdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc31cblx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2F2YXRhcn1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKXtcblx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGxldCB7bmFtZTp0YXJnZXQsIG9wZW46dGFyZ2V0T3Blbn09bmV4dFByb3BzLFxuXHRcdFx0e25hbWUsIG9wZW59PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gdGFyZ2V0IT1uYW1lIHx8IHRhcmdldE9wZW4hPW9wZW5cbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXSlcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSBmcm9tICcuL2JhYnknXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IERhc2hib2FyZCBmcm9tIFwiLi9kYXNoYm9hcmRcIlxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtTdXBlckRhZGR5fT5cblxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG5cdFx0PFJvdXRlIHBhdGg9XCJ0YXNrc1wiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cdFx0XHQ8Um91dGUgcGF0aD1cImFwcHJvdmluZ3NcIiBjb21wb25lbnQ9e0FwcHJvdmluZ3N9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoZW5cIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblx0XHQ8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbXBvbmVudD17VGFza1VJfS8+XG5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnkvOm5hbWVcIiBuYW1lPVwiYmFieVwiIGNvbXBvbmVudD17QmFieVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJiYWJ5XCIgZmxvYXRpbmdCdXR0b249e2ZhbHNlfSBjb21wb25lbnQ9e0JhYnlVSS5DcmVhdG9yfVxuXHRcdFx0b25FbnRlcj17KG5leHRTdGF0ZSwgcmVwbGFjZSk9Pntcblx0XHRcdFx0RmFtaWx5LmN1cnJlbnRDaGlsZD17fVxuXHRcdFx0fX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlc1wiIGNvbXBvbmVudD17S25vd2xlZGdlc1VJfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBmbG9hdGluZ0J1dHRvbj17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG4gICAgICAgIDxSb3V0ZSBmbG9hdGluZ0J1dHRvbj17ZmFsc2V9IHBhdGg9XCJhY2NvdW50XCIgY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIGZsb2F0aW5nQnV0dG9uPXtmYWxzZX0gcGF0aD1cInNldHRpbmdcIj5cblx0XHRcdDxJbmRleFJvdXRlICBjb21wb25lbnQ9e1NldHRpbmdVSX0vPlxuXHRcdDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJwdWJsaXNoXCIgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBwYXJhbXM9e3t3aGF0OlwiYWxsXCJ9fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgPC9Sb3V0ZT4pLHtcblx0XHRjcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpe1xuXHRcdFx0aWYoQ29tcG9uZW50PT1TdXBlckRhZGR5KXsvL3JlZnJlc2ggYmFieSBwYWdlXG5cdFx0XHRcdGxldCBjaGlsZD1wcm9wcy5jaGlsZHJlblxuXHRcdFx0XHRcdCx7cm91dGUscGFyYW1zfT1jaGlsZC5wcm9wc1xuXG5cdFx0XHRcdGlmKHJvdXRlLm5hbWU9PVwiYmFieVwiKVxuXHRcdFx0XHRcdHByb3BzLmluaXQ9YT0+aW5pdChwYXJhbXMubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30vPlxuXHRcdH0sXG4gICAgICAgIG9uRXJyb3IoZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coYG9uZXJyb3I6ICR7ZXJyb3J9YClcbiAgICAgICAgfVxuXG5cdH1cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19