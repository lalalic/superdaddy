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
                _qiliApp.React.cloneElement(this.props.children, { child: child })
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
            var _this3 = this;

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
                        return _this3.change();
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
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', contextual: false, component: _baby.Creator }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'knowledges', component: _knowledges2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'knowledge' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { contextual: false, component: _newKnowledge2.default }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id', component: _knowledge2.default })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'comment/:type/:_id', component: Comment }),
    _qiliApp.React.createElement(_reactRouter.Route, { contextual: false, path: 'account', component: _account2.default }),
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
//# sourceMappingURL=data:application/json;base64,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O1VBQU8sWUFBWSxLQUFaLEVBQW1CLE1BQUssU0FBTCxFQUExQjtRQUNMLHdEQUFhLDhCQUFiLENBREs7S0F6Qkg7SUE2Qkc7O1VBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxTQUFMLEVBQWUsOEJBQXJDO1FBQ0ksd0RBQVksUUFBUSxFQUFDLE1BQUssS0FBTCxFQUFULEVBQVosQ0FESjtRQUVJLG1EQUFPLE1BQUssT0FBTCxFQUFQLENBRko7S0E3Qkg7Q0FEVSxFQW1DRDtBQUNaLDBDQUFjLFdBQVcsT0FBTTtBQUM5QixZQUFHLGFBQVcsVUFBWCxFQUFzQjs7O0FBQ3BCLDRCQUFNLE1BQU0sUUFBTjttQ0FDTyxNQUFNLEtBQU47b0JBQWQ7b0JBQU07OztBQUVULG9CQUFHLE1BQU0sSUFBTixJQUFZLE1BQVosRUFDRixNQUFNLElBQU4sR0FBVzsyQkFBRyxjQUFLLE9BQU8sSUFBUDtpQkFBUixDQURaO2lCQUp3QjtTQUF6QjtBQU9BLGVBQU8sNkJBQUMsU0FBRCxFQUFlLEtBQWYsQ0FBUCxDQVI4QjtLQURuQjtDQW5DQyxDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7Um91dGUsIEluZGV4Um91dGUsIERpcmVjdCwgSW5kZXhSZWRpcmVjdH0gZnJvbSBcInJlYWN0LXJvdXRlclwiXG5pbXBvcnQge1VzZXIsUmVhY3QsQ29tcG9uZW50LFFpbGlBcHAsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuY29uc3Qge0VtcHR5LCBDb21tZW50fT1VSVxuXG5jbGFzcyBTdXBlckRhZGR5IGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NoaWxkOm51bGx9KVxuICAgICAgICBGYW1pbHkuZXZlbnQub24oJ2NoYW5nZScsY2hpbGQ9PnRoaXMuc2V0U3RhdGUoe2NoaWxkfSkpXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgaWYodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5yb3V0ZS5uYW1lPT0nYmFieScgXG5cdFx0XHQmJiBuZXh0U3RhdGUuY2hpbGQhPXRoaXMuc3RhdGUuY2hpbGRcblx0XHRcdCYmICF0aGlzLmNvbnRleHQucm91dGVyLmlzQWN0aXZlKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YCkpe1xuXHRcdFx0dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBiYWJ5LyR7bmV4dFN0YXRlLmNoaWxkLm5hbWV9YClcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5zdGF0ZVxuXHRcdGlmKCFjaGlsZClcblx0XHRcdHJldHVybiAoPEVtcHR5IGljb249ezxMb2dvLz59PjxMaW5rIHRvPVwiYmFieVwiPmNsaWNrIHRvIHN0YXJ0IGZyb20geW91ciBmaXJzdCBiYWJ5ITwvTGluaz48L0VtcHR5PilcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cblx0XHRcdFx0e3RoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGUuY29udGV4dHVhbCE9ZmFsc2UgJiYgXG5cdFx0XHRcdFx0KDxDdXJyZW50Q2hpbGQga2V5PVwiY29udGV4dFwiIGNoaWxkPXtjaGlsZH0gbmFtZT17Y2hpbGQubmFtZX0vPil9XG5cdFx0XHRcdFx0XG5cdFx0XHRcdHtSZWFjdC5jbG9uZUVsZW1lbnQodGhpcy5wcm9wcy5jaGlsZHJlbix7Y2hpbGR9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5PYmplY3QuYXNzaWduKFN1cGVyRGFkZHkuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiLFxuICAgIGluaXQ6KCk9PmluaXQoKVxufSlcblxuY2xhc3MgQ3VycmVudENoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICBsZXQge2NoaWxkLCBuYW1lLCBzdHlsZT17Zm9udFNpemU6XCJ4eC1zbWFsbFwifSwgLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRtaW5pPXt0cnVlfVxuXHRcdFx0XHRzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc31cblx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2NoaWxkLnBob3RvID8gKDxBdmF0YXIgc3JjPXt0aGlzLnByb3BzLmNoaWxkLnBob3RvfS8+KSA6IG5hbWV9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG5cdFx0cmV0dXJuIG5leHRQcm9wcy5uYW1lIT10aGlzLnByb3BzLm5hbWVcbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgQmFieVVJLCB7Q3JlYXRvcn0gZnJvbSAnLi9iYWJ5J1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgVGFza3NVSSwge0FwcHJvdmluZ3N9IGZyb20gXCIuL3Rhc2tzXCJcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17U3VwZXJEYWRkeX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGFza3NcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17VGFza3NVSX0vPlxuXHRcdFx0PFJvdXRlIHBhdGg9XCJhcHByb3ZpbmdzXCIgY29tcG9uZW50PXtBcHByb3ZpbmdzfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGVuXCIgY29tcG9uZW50PXtUYXNrc1VJfS8+XG4gICAgICAgIDwvUm91dGU+XG5cdFx0PFJvdXRlIHBhdGg9XCJ0YXNrLzpfaWRcIiBjb21wb25lbnQ9e1Rhc2tVSX0vPlxuXG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJiYWJ5LzpuYW1lXCIgbmFtZT1cImJhYnlcIiBjb21wb25lbnQ9e0JhYnlVSX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnlcIiBjb250ZXh0dWFsPXtmYWxzZX0gY29tcG9uZW50PXtDcmVhdG9yfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VzXCIgY29tcG9uZW50PXtLbm93bGVkZ2VzVUl9Lz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfSBjb21wb25lbnQ9e05ld0tub3dsZWRnZVVJfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZVVJfS8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuICAgICAgICA8Um91dGUgY29udGV4dHVhbD17ZmFsc2V9IHBhdGg9XCJhY2NvdW50XCIgY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIGNvbnRleHR1YWw9e2ZhbHNlfSBwYXRoPVwic2V0dGluZ1wiPlxuXHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17U2V0dGluZ1VJfS8+XG5cdFx0PC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgbmFtZT1cInB1Ymxpc2hcIiBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doYXQ6XCJhbGxcIn19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==