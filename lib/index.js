'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
                contextual != false && _qiliApp.React.createElement(CurrentChild, { key: 'context', child: child, name: child.name }),
                _qiliApp.React.cloneElement(this.props.children, { child: child }),
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
            var name = _props.name;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { fontSize: "xx-small" } : _props$style;

            var others = _objectWithoutProperties(_props, ['child', 'name', 'style']);

            return _qiliApp.React.createElement(
                _materialUi.FloatingActionButton,
                _extends({ className: 'contexture sticky top right',
                    mini: true,
                    style: style
                }, others, {
                    onClick: function onClick(e) {
                        return _this4.change();
                    } }),
                child.photo ? _qiliApp.React.createElement(_materialUi.Avatar, { src: this.props.child.photo }) : name
            );
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.name != this.props.name;
        }
    }, {
        key: 'change',
        value: function change() {
            var current = this.props.child,
                children = _db.Family.children,
                len = children.length;
            if (len < 2) return;

            var index = children.indexOf(current);
            _db.Family.currentChild = children[(index + 1) % len];
        }
    }]);

    return CurrentChild;
}(_qiliApp.Component);

CurrentChild.contextTypes = { router: _qiliApp.React.PropTypes.object };


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
        { contextual: false, path: 'setting' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _setting2.default })
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
//# sourceMappingURL=data:application/json;base64,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LFdBQVcsT0FBTTtBQUM5QixZQUFHLGFBQVcsVUFBWCxFQUFzQjs7O0FBQ3BCLDRCQUFNLE1BQU0sUUFBTjttQ0FDTyxNQUFNLEtBQU47b0JBQWQ7b0JBQU07OztBQUVULG9CQUFHLE1BQU0sSUFBTixJQUFZLE1BQVosRUFDRixNQUFNLElBQU4sR0FBVzsyQkFBRyxjQUFLLE9BQU8sSUFBUDtpQkFBUixDQURaO2lCQUp3QjtTQUF6QjtBQU9BLGVBQU8sNkJBQUMsU0FBRCxFQUFlLEtBQWYsQ0FBUCxDQVI4QjtLQURuQjtDQXRDQyxDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUmVhY3QsQ29tcG9uZW50LFFpbGlBcHAsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxuaW1wb3J0IEljb25SZXdhcmQgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9wbGFjZXMvY2hpbGQtY2FyZVwiXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5jb25zdCB7RW1wdHksIENvbW1lbnQsIENvbW1hbmRCYXJ9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y2hpbGQ6bnVsbH0pXG4gICAgICAgIEZhbWlseS5ldmVudC5vbignY2hhbmdlJyxjaGlsZD0+dGhpcy5zZXRTdGF0ZSh7Y2hpbGR9KSlcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuICAgICAgICBpZih0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLmNvbnRleHR1cmVcblx0XHRcdCYmIG5leHRTdGF0ZS5jaGlsZCE9dGhpcy5zdGF0ZS5jaGlsZFxuXHRcdFx0JiYgIXRoaXMuY29udGV4dC5yb3V0ZXIuaXNBY3RpdmUoYGJhYnkvJHtuZXh0U3RhdGUuY2hpbGQubmFtZX1gKSl7XG5cdFx0XHR0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGJhYnkvJHtuZXh0U3RhdGUuY2hpbGQubmFtZX1gKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIGxldCB7Y2hpbGR9PXRoaXMuc3RhdGVcblx0XHRpZighY2hpbGQpXG5cdFx0XHRyZXR1cm4gKDxFbXB0eSBpY29uPXs8TG9nby8+fT48TGluayB0bz1cImJhYnlcIj5jbGljayB0byBzdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSE8L0xpbms+PC9FbXB0eT4pXG5cbiAgICAgICAgbGV0IHtjb250ZXh0dWFsLCBuYW1lOnJvdXRlTmFtZX09dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0e2NvbnRleHR1YWwhPWZhbHNlICYmXG5cdFx0XHRcdFx0KDxDdXJyZW50Q2hpbGQga2V5PVwiY29udGV4dFwiIGNoaWxkPXtjaGlsZH0gbmFtZT17Y2hpbGQubmFtZX0vPil9XG5cblx0XHRcdFx0e1JlYWN0LmNsb25lRWxlbWVudCh0aGlzLnByb3BzLmNoaWxkcmVuLHtjaGlsZH0pfVxuXG4gICAgICAgICAgICAgICAge3JvdXRlTmFtZSYmKDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtyb3V0ZU5hbWV9XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuaIkeeahOS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uVGFza30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdzY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOkljb25SZXdhcmR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJhY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogSWNvbkFjY291bnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPil9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgbGV0IHtjaGlsZCwgbmFtZSwgc3R5bGU9e2ZvbnRTaXplOlwieHgtc21hbGxcIn0sIC4uLm90aGVyc309dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJjb250ZXh0dXJlIHN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuXHRcdFx0XHRzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc31cblx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2NoaWxkLnBob3RvID8gKDxBdmF0YXIgc3JjPXt0aGlzLnByb3BzLmNoaWxkLnBob3RvfS8+KSA6IG5hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG5cdFx0cmV0dXJuIG5leHRQcm9wcy5uYW1lIT10aGlzLnByb3BzLm5hbWVcbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBTY29yZVVJIGZyb20gXCIuL3Njb3JlXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17U3VwZXJEYWRkeX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgbmFtZT1cInRhc2tzXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJzY29yZVwiIG5hbWU9XCJzY29yZVwiIGNvbXBvbmVudD17U2NvcmVVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlc1wiIG5hbWU9XCJrbm93bGVkZ2VzXCIgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNyZWF0YWJsZX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYWNjb3VudFwiICBuYW1lPVwiYWNjb3VudFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0FjY291bnRVSX0gLz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInRhc2svOl9pZFwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYmFieS86bmFtZVwiIGNvbnRleHR1cmU9e3RydWV9IGNvbXBvbmVudD17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvdXJzZXNcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17S25vd2xlZGdlc1VJLkNvdXJzZX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtOZXdLbm93bGVkZ2VVSX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIgY29tcG9uZW50PXtLbm93bGVkZ2VVSX0vPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cblxuICAgICAgICA8Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IHBhdGg9XCJzZXR0aW5nXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSAgY29tcG9uZW50PXtTZXR0aW5nVUl9Lz5cblx0XHQ8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==