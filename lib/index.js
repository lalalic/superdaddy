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
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _knowledges2.default }),
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
//# sourceMappingURL=data:application/json;base64,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RFUsRUFzQ0Q7QUFDWiwwQ0FBYyxXQUFXLE9BQU07QUFDOUIsWUFBRyxhQUFXLFVBQVgsRUFBc0I7OztBQUNwQiw0QkFBTSxNQUFNLFFBQU47bUNBQ08sTUFBTSxLQUFOO29CQUFkO29CQUFNOzs7QUFFVCxvQkFBRyxNQUFNLElBQU4sSUFBWSxNQUFaLEVBQ0YsTUFBTSxJQUFOLEdBQVc7MkJBQUcsY0FBSyxPQUFPLElBQVA7aUJBQVIsQ0FEWjtpQkFKd0I7U0FBekI7QUFPQSxlQUFPLDZCQUFDLFNBQUQsRUFBZSxLQUFmLENBQVAsQ0FSOEI7S0FEbkI7Q0F0Q0MsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4UmVkaXJlY3R9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuaW1wb3J0IHtVc2VyLFJlYWN0LENvbXBvbmVudCxRaWxpQXBwLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcblxuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcbmltcG9ydCBJY29uUmV3YXJkIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvcGxhY2VzL2NoaWxkLWNhcmVcIlxuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50LCBDb21tYW5kQmFyfT1VSVxuXG5jbGFzcyBTdXBlckRhZGR5IGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NoaWxkOm51bGx9KVxuICAgICAgICBGYW1pbHkuZXZlbnQub24oJ2NoYW5nZScsY2hpbGQ9PnRoaXMuc2V0U3RhdGUoe2NoaWxkfSkpXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5jb250ZXh0dXJlXG5cdFx0XHQmJiBuZXh0U3RhdGUuY2hpbGQhPXRoaXMuc3RhdGUuY2hpbGRcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICBsZXQge2NoaWxkfT10aGlzLnN0YXRlXG5cdFx0aWYoIWNoaWxkKVxuXHRcdFx0cmV0dXJuICg8RW1wdHkgaWNvbj17PExvZ28vPn0+PExpbmsgdG89XCJiYWJ5XCI+Y2xpY2sgdG8gc3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnkhPC9MaW5rPjwvRW1wdHk+KVxuXG4gICAgICAgIGxldCB7Y29udGV4dHVhbCwgbmFtZTpyb3V0ZU5hbWV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG5cdFx0XHRcdHtjb250ZXh0dWFsIT1mYWxzZSAmJlxuXHRcdFx0XHRcdCg8Q3VycmVudENoaWxkIGtleT1cImNvbnRleHRcIiBjaGlsZD17Y2hpbGR9IG5hbWU9e2NoaWxkLm5hbWV9Lz4pfVxuXG5cdFx0XHRcdHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbix7Y2hpbGR9KX1cblxuICAgICAgICAgICAgICAgIHtyb3V0ZU5hbWUmJig8Q29tbWFuZEJhciBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cm91dGVOYW1lfVxuXHRcdFx0XHRcdGl0ZW1zPXtbXG5cdFx0XHRcdFx0XHR7bGFiZWw6XCLmiJHnmoTku7vliqFcIiwgYWN0aW9uOlwidGFza3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDphPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvblRhc2t9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2xhYmVsOlwi5oiQ57upXCIsIGFjdGlvbjpcInNjb3JlXCIsXG5cdFx0XHRcdFx0XHRcdG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnc2NvcmUnKSxcblx0XHRcdFx0XHRcdFx0aWNvbjpJY29uUmV3YXJkfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYWJlbDpcIuWPkeeOsFwiLCBhY3Rpb246XCJrbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6YT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFiZWw6XCLmiJFcIiwgYWN0aW9uOlwiYWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OmE9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IEljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz4pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbk9iamVjdC5hc3NpZ24oU3VwZXJEYWRkeS5kZWZhdWx0UHJvcHMse1xuICAgIGFwcElkOlwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCIsXG4gICAgaW5pdDooKT0+aW5pdCgpXG59KVxuXG5jbGFzcyBDdXJyZW50Q2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCB7Y2hpbGQsIG5hbWUsIHN0eWxlPXtmb250U2l6ZTpcInh4LXNtYWxsXCJ9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwiY29udGV4dHVyZSBzdGlja3kgdG9wIHJpZ2h0XCJcblx0XHRcdFx0bWluaT17dHJ1ZX1cblx0XHRcdFx0c3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgICAgIHsuLi5vdGhlcnN9XG5cdFx0XHRcdG9uQ2xpY2s9e2U9PnRoaXMuY2hhbmdlKCl9PlxuICAgICAgICAgICAgICAgIHtjaGlsZC5waG90byA/ICg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPikgOiBuYW1lfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuXHRcdHJldHVybiBuZXh0UHJvcHMubmFtZSE9dGhpcy5wcm9wcy5uYW1lXG4gICAgfVxuXG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciBjdXJyZW50PXRoaXMucHJvcHMuY2hpbGQsXG4gICAgICAgICAgICBjaGlsZHJlbj1GYW1pbHkuY2hpbGRyZW4sXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9Y2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxuICAgICAgICBGYW1pbHkuY3VycmVudENoaWxkPWNoaWxkcmVuWyhpbmRleCsxKSAlIGxlbl1cbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSwge0NyZWF0b3J9IGZyb20gJy4vYmFieSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuaW1wb3J0IFRhc2tzVUksIHtBcHByb3ZpbmdzfSBmcm9tIFwiLi90YXNrc1wiXG5pbXBvcnQgU2NvcmVVSSBmcm9tIFwiLi9zY29yZVwiXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1N1cGVyRGFkZHl9PlxuXG4gICAgICAgIDxJbmRleFJvdXRlIG5hbWU9XCJ0YXNrc1wiIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwic2NvcmVcIiBuYW1lPVwic2NvcmVcIiBjb21wb25lbnQ9e1Njb3JlVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZXNcIiBuYW1lPVwia25vd2xlZGdlc1wiIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSS5DcmVhdGFibGV9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImFjY291bnRcIiAgbmFtZT1cImFjY291bnRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtUYXNrVUl9Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnkvOm5hbWVcIiBjb250ZXh0dXJlPXt0cnVlfSBjb21wb25lbnQ9e0JhYnlVSX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb3Vyc2VzXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0tub3dsZWRnZXNVSX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCJkb25lXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtOZXdLbm93bGVkZ2VVSX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIgY29tcG9uZW50PXtLbm93bGVkZ2VVSX0vPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkXCIgY29tcG9uZW50PXtDb21tZW50fS8+XG5cblxuICAgICAgICA8Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IHBhdGg9XCJzZXR0aW5nXCI+XG5cdFx0XHQ8SW5kZXhSb3V0ZSAgY29tcG9uZW50PXtTZXR0aW5nVUl9Lz5cblx0XHQ8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doYXQ6XCJhbGxcIn19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==