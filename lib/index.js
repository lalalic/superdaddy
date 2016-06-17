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
            if (this.props.children.props.route.name == 'baby' && nextState.child != this.state.child && !this.context.router.isActive('baby/' + nextState.child.name)) {
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

            return _qiliApp.React.createElement(
                'div',
                null,
                this.props.children.props.route.contextual != false && _qiliApp.React.createElement(CurrentChild, { key: 'context', child: child, name: child.name }),
                _qiliApp.React.cloneElement(this.props.children, { child: child }),
                _qiliApp.React.createElement(CommandBar, { className: 'footbar',
                    primary: this.props.children.props.route.name,
                    items: [{ label: "任务", action: "tasks",
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
                _extends({ className: 'sticky top right',
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
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'knowledges', name: 'knowledges', contextual: false, component: _knowledges2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'account', name: 'account', contextual: false, component: _account2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'task/:_id', contextual: false, component: _task2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby/:name', name: 'baby', component: _baby2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', contextual: false, component: _baby.Creator }),
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
//# sourceMappingURL=data:application/json;base64,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QUFDcEIsNEJBQU0sTUFBTSxRQUFOO21DQUNPLE1BQU0sS0FBTjtvQkFBZDtvQkFBTTs7O0FBRVQsb0JBQUcsTUFBTSxJQUFOLElBQVksTUFBWixFQUNGLE1BQU0sSUFBTixHQUFXOzJCQUFHLGNBQUssT0FBTyxJQUFQO2lCQUFSLENBRFo7aUJBSndCO1NBQXpCO0FBT0EsZUFBTyw2QkFBQyxTQUFELEVBQWUsS0FBZixDQUFQLENBUjhCO0tBRG5CO0NBakNDLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5pbXBvcnQgSWNvbkFjY291bnQgZnJvbSAnbWF0ZXJpYWwtdWkvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCdcbmltcG9ydCBJY29uVGFzayBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiXG5pbXBvcnQgSWNvblJld2FyZCBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL3BsYWNlcy9jaGlsZC1jYXJlXCJcblxuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmNvbnN0IHtFbXB0eSwgQ29tbWVudCwgQ29tbWFuZEJhcn09VUlcblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjaGlsZDpudWxsfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLGNoaWxkPT50aGlzLnNldFN0YXRlKHtjaGlsZH0pKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUubmFtZT09J2JhYnknXG5cdFx0XHQmJiBuZXh0U3RhdGUuY2hpbGQhPXRoaXMuc3RhdGUuY2hpbGRcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnN0YXRlXG5cdFx0aWYoIWNoaWxkKVxuXHRcdFx0cmV0dXJuICg8RW1wdHkgaWNvbj17PExvZ28vPn0+PExpbmsgdG89XCJiYWJ5XCI+Y2xpY2sgdG8gc3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnkhPC9MaW5rPjwvRW1wdHk+KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dWFsIT1mYWxzZSAmJlxuXHRcdFx0XHRcdCg8Q3VycmVudENoaWxkIGtleT1cImNvbnRleHRcIiBjaGlsZD17Y2hpbGR9IG5hbWU9e2NoaWxkLm5hbWV9Lz4pfVxuXG5cdFx0XHRcdHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbix7Y2hpbGR9KX1cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXt0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnJvdXRlLm5hbWV9XG5cdFx0XHRcdFx0aXRlbXM9e1tcblx0XHRcdFx0XHRcdHtsYWJlbDpcIuS7u+WKoVwiLCBhY3Rpb246XCJ0YXNrc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uVGFza30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJDnu6lcIiwgYWN0aW9uOlwic2NvcmVcIixcblx0XHRcdFx0XHRcdFx0b25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdzY29yZScpLFxuXHRcdFx0XHRcdFx0XHRpY29uOkljb25SZXdhcmR9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5Y+R546wXCIsIGFjdGlvbjpcImtub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuaIkVwiLCBhY3Rpb246XCJhY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogSWNvbkFjY291bnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbk9iamVjdC5hc3NpZ24oU3VwZXJEYWRkeS5kZWZhdWx0UHJvcHMse1xuICAgIGFwcElkOlwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCIsXG4gICAgaW5pdDooKT0+aW5pdCgpXG59KVxuXG5jbGFzcyBDdXJyZW50Q2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2hpbGQsIG5hbWUsIHN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG5cdFx0XHRcdG1pbmk9e3RydWV9XG5cdFx0XHRcdHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgICAgICB7Li4ub3RoZXJzfVxuXHRcdFx0XHRvbkNsaWNrPXtlPT50aGlzLmNoYW5nZSgpfT5cbiAgICAgICAgICAgICAgICB7Y2hpbGQucGhvdG8gPyAoPEF2YXRhciBzcmM9e3RoaXMucHJvcHMuY2hpbGQucGhvdG99Lz4pIDogbmFtZX1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKXtcblx0XHRyZXR1cm4gbmV4dFByb3BzLm5hbWUhPXRoaXMucHJvcHMubmFtZVxuICAgIH1cblxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIgY3VycmVudD10aGlzLnByb3BzLmNoaWxkLFxuICAgICAgICAgICAgY2hpbGRyZW49RmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcbiAgICAgICAgRmFtaWx5LmN1cnJlbnRDaGlsZD1jaGlsZHJlblsoaW5kZXgrMSkgJSBsZW5dXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBCYWJ5VUksIHtDcmVhdG9yfSBmcm9tICcuL2JhYnknXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBUYXNrc1VJLCB7QXBwcm92aW5nc30gZnJvbSBcIi4vdGFza3NcIlxuaW1wb3J0IFNjb3JlVUkgZnJvbSBcIi4vc2NvcmVcIlxuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICAoPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtTdXBlckRhZGR5fT5cblxuICAgICAgICA8SW5kZXhSb3V0ZSBuYW1lPVwidGFza3NcIiBjb21wb25lbnQ9e1Rhc2tzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cInNjb3JlXCIgbmFtZT1cInNjb3JlXCIgY29tcG9uZW50PXtTY29yZVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VzXCIgbmFtZT1cImtub3dsZWRnZXNcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtLbm93bGVkZ2VzVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnkvOm5hbWVcIiBuYW1lPVwiYmFieVwiIGNvbXBvbmVudD17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiYmFieVwiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0NyZWF0b3J9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG5cbiAgICAgICAgPFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfSBwYXRoPVwic2V0dGluZ1wiPlxuXHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17U2V0dGluZ1VJfS8+XG5cdFx0PC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgbmFtZT1cInB1Ymxpc2hcIiBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doYXQ6XCJhbGxcIn19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==