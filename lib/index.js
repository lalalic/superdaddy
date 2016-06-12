'use strict';

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

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Empty = _qiliApp.UI.Empty;

var SuperDaddy = function (_QiliApp) {
    _inherits(SuperDaddy, _QiliApp);

    function SuperDaddy(props) {
        _classCallCheck(this, SuperDaddy);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).call(this, props));

        Object.assign(_this.state, { baby: _this.props.child });
        _db.Family.event.on('change', function (a) {
            return _this.setState({ baby: _db.Family.currentChild });
        });
        return _this;
    }

    _createClass(SuperDaddy, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var baby = this.state.baby;
            var child = this.props.children;
            var route = child.props.route;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(CurrentChild, { child: baby, onChange: function onChange(target) {
                        if (route.name == "baby") _this2.context.router.push('baby/' + target.name);else _db.Family.currentChild = target;
                    } }),
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
            var _props$child = _props.child;
            var child = _props$child === undefined ? {} : _props$child;
            var _props$style = _props.style;
            var style = _props$style === undefined ? { position: "absolute", zIndex: 9 } : _props$style;var avatar;

            if (child.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: this.props.child.photo });else avatar = _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(
                    'span',
                    { style: { fontSize: "xx-small" } },
                    this.lastName = child.name
                )
            );

            if (!child._id) style.display = 'none';

            return _qiliApp.React.createElement(
                _materialUi.FloatingActionButton,
                { className: 'sticky top right',
                    mini: true, style: style, onClick: function onClick() {
                        return _this4.change();
                    } },
                avatar
            );
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !!this.props.child && (nextProps.child != this.props.child || nextProps.child.name != this.lastName);
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
        { name: 'task', path: 'task', component: _task2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, null),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id' })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'baby', path: 'baby', component: _baby2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { onEnter: function onEnter(nextState, replace, callback) {
                _db.Family.currentChild = {};
                callback();
            } }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id' })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { name: 'knowledges', path: 'knowledges', component: _knowledges2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { name: 'create', path: 'knowledge/_new', component: _newKnowledge2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'knowledge', path: 'knowledge', component: _knowledge2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, null),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id' })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'comment', path: 'comment', component: Comment },
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':type/:_id' })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { name: 'account', path: 'account', component: _account2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { name: 'setting', path: 'setting', component: _setting2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'dashboard', path: 'dashboard', component: _dashboard2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { params: { when: new Date() } }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':when' })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { name: 'publish', path: 'publish', component: _publish2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { params: { what: "all" } }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':what' })
    )
), {});

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
//# sourceMappingURL=data:application/json;base64,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SDtJQTJCRyxtREFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFNBQUwsRUFBZSw4QkFBckMsQ0EzQkg7SUE0QkcsbURBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxTQUFMLEVBQWUsOEJBQXJDLENBNUJIO0lBNkJHOztVQUFPLE1BQUssV0FBTCxFQUFpQixNQUFLLFdBQUwsRUFBaUIsZ0NBQXpDO1FBQ0ksd0RBQVksUUFBUSxFQUFDLE1BQUssSUFBSSxJQUFKLEVBQUwsRUFBVCxFQUFaLENBREo7UUFFSSxtREFBTyxNQUFLLE9BQUwsRUFBUCxDQUZKO0tBN0JIO0lBa0NHOztVQUFPLE1BQUssU0FBTCxFQUFlLE1BQUssU0FBTCxFQUFlLDhCQUFyQztRQUNJLHdEQUFZLFFBQVEsRUFBQyxNQUFLLEtBQUwsRUFBVCxFQUFaLENBREo7UUFFSSxtREFBTyxNQUFLLE9BQUwsRUFBUCxDQUZKO0tBbENIO0NBRFUsRUF3Q0QsRUF4Q0MsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1JvdXRlLCBJbmRleFJvdXRlLCBEaXJlY3QsIEluZGV4RGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5jb25zdCB7RW1wdHl9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7YmFieTp0aGlzLnByb3BzLmNoaWxkfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLGE9PnRoaXMuc2V0U3RhdGUoe2JhYnk6RmFtaWx5LmN1cnJlbnRDaGlsZH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtiYWJ5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICAse2NoaWxkcmVuOmNoaWxkfT10aGlzLnByb3BzXG4gICAgICAgICAgICAse3JvdXRlfT1jaGlsZC5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgIDxDdXJyZW50Q2hpbGQgY2hpbGQ9e2JhYnl9IG9uQ2hhbmdlPXt0YXJnZXQ9PntcbiAgICAgICAgICAgICAgICAgICBpZihyb3V0ZS5uYW1lPT1cImJhYnlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKGBiYWJ5LyR7dGFyZ2V0Lm5hbWV9YClcbiAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9dGFyZ2V0XG4gICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLHtjaGlsZDpiYWJ5fSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZD17fSwgc3R5bGU9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIiwgekluZGV4Ojl9fT10aGlzLnByb3BzLCBhdmF0YXJcblxuICAgICAgICBpZihjaGlsZC5waG90bylcbiAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBzcmM9e3RoaXMucHJvcHMuY2hpbGQucGhvdG99Lz4pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGF2YXRhcj0oPGRpdj48c3BhbiBzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19Pnt0aGlzLmxhc3ROYW1lPWNoaWxkLm5hbWV9PC9zcGFuPjwvZGl2PilcblxuICAgICAgICBpZighY2hpbGQuX2lkKVxuICAgICAgICAgICAgc3R5bGUuZGlzcGxheT0nbm9uZSdcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG4gICAgICAgICAgICAgICAgbWluaT17dHJ1ZX0gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoKT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2F2YXRhcn1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuICAgICAgICByZXR1cm4gISF0aGlzLnByb3BzLmNoaWxkICYmIChuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGQgfHwgbmV4dFByb3BzLmNoaWxkLm5hbWUhPXRoaXMubGFzdE5hbWUpXG4gICAgfVxuXG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciBjdXJyZW50PXRoaXMucHJvcHMuY2hpbGQsXG4gICAgICAgICAgICBjaGlsZHJlbj1GYW1pbHkuY2hpbGRyZW4sXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9Y2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGNoaWxkcmVuWyhpbmRleCsxKSAlIGxlbl0pXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBCYWJ5VUkgZnJvbSAnLi9iYWJ5J1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgICg8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e1N1cGVyRGFkZHl9PlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0Rhc2hib2FyZH0vPlxuXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza1wiIHBhdGg9XCJ0YXNrXCIgY29tcG9uZW50PXtUYXNrVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYmFieVwiIHBhdGg9XCJiYWJ5XCIgY29tcG9uZW50PXtCYWJ5VUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUgb25FbnRlcj17KG5leHRTdGF0ZSwgcmVwbGFjZSwgY2FsbGJhY2spPT57XG4gICAgXHRcdFx0XHRGYW1pbHkuY3VycmVudENoaWxkPXt9XG4gICAgXHRcdFx0XHRjYWxsYmFjaygpXG4gICAgXHRcdFx0fX0vPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIvPlxuICAgICAgICA8L1JvdXRlPlxuICAgICAgICA8Um91dGUgbmFtZT1cImtub3dsZWRnZXNcIiBwYXRoPVwia25vd2xlZGdlc1wiIGNvbXBvbmVudD17S25vd2xlZGdlc1VJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiY3JlYXRlXCIgcGF0aD1cImtub3dsZWRnZS9fbmV3XCIgY29tcG9uZW50PXtOZXdLbm93bGVkZ2VVSX0gLz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJrbm93bGVkZ2VcIiBwYXRoPVwia25vd2xlZGdlXCIgY29tcG9uZW50PXtLbm93bGVkZ2VVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSAvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJjb21tZW50XCIgcGF0aD1cImNvbW1lbnRcIiBjb21wb25lbnQ9e0NvbW1lbnR9PlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6dHlwZS86X2lkXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYWNjb3VudFwiIHBhdGg9XCJhY2NvdW50XCIgY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwic2V0dGluZ1wiIHBhdGg9XCJzZXR0aW5nXCIgY29tcG9uZW50PXtTZXR0aW5nVUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiZGFzaGJvYXJkXCIgcGF0aD1cImRhc2hib2FyZFwiIGNvbXBvbmVudD17RGFzaGJvYXJkfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doZW46bmV3IERhdGUoKX19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoZW5cIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJwdWJsaXNoXCIgcGF0aD1cInB1Ymxpc2hcIiBjb21wb25lbnQ9e1B1Ymxpc2hVSX0+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBwYXJhbXM9e3t3aGF0OlwiYWxsXCJ9fS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjp3aGF0XCIvPlxuICAgICAgICA8L1JvdXRlPlxuXG4gICAgPC9Sb3V0ZT4pLHtcblxuICAgIH1cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19