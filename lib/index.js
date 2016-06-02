'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _dashboard = require('./dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('../style/index.less');

var Route = _qiliApp.Router.Route;
var RouteHandler = _qiliApp.Router.RouteHandler;
var DefaultRoute = _qiliApp.Router.DefaultRoute;
var Empty = _qiliApp.UI.Empty;

var SuperDaddy = function (_QiliApp) {
    _inherits(SuperDaddy, _QiliApp);

    function SuperDaddy(props) {
        _classCallCheck(this, SuperDaddy);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).call(this, props));

        Object.assign(_this.state, { child: _db.Family.currentChild });
        _db.Family.event.on('change', function () {
            return _this.setState({ child: _db.Family.currentChild });
        });
        return _this;
    }

    _createClass(SuperDaddy, [{
        key: 'renderContent',
        value: function renderContent() {
            var child = this.state.child;


            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(CurrentChild, { child: child }),
                _qiliApp.React.createElement(RouteHandler, { child: child })
            );
        }
    }]);

    return SuperDaddy;
}(_qiliApp.QiliApp);

SuperDaddy.contextTypes = { router: _qiliApp.React.PropTypes.func };

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
            var _props$child = _props.child;
            var child = _props$child === undefined ? {} : _props$child;
            var _props$style = _props.style;
            var style = _props$style === undefined ? {} : _props$style;var avatar;

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
                        return _this3.change();
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
            _db.Family.currentChild = children[(index + 1) % len];
        }
    }]);

    return CurrentChild;
}(_qiliApp.Component);

CurrentChild.contextTypes = { router: _qiliApp.React.PropTypes.func };

module.exports = _qiliApp.QiliApp.render(_qiliApp.React.createElement(
    Route,
    { path: '/', handler: SuperDaddy },
    _qiliApp.React.createElement(Route, { name: 'task', path: 'task/:_id?/', handler: _task2.default }),
    _qiliApp.React.createElement(Route, { name: 'baby', path: 'baby/:_id?', handler: _baby2.default }),
    _qiliApp.React.createElement(Route, { name: 'knowledges', path: 'knowledges/', handler: _knowledges2.default }),
    _qiliApp.React.createElement(Route, { name: 'knowledge', path: 'knowledge/:_id?/', handler: _knowledge2.default }),
    _qiliApp.React.createElement(Route, { name: 'create', path: 'create/', handler: _newKnowledge2.default }),
    _qiliApp.React.createElement(Route, { name: 'comment', path: 'comment/:type/:_id/', handler: Comment }),
    _qiliApp.React.createElement(Route, { name: 'account', path: 'account/', handler: _account2.default }),
    _qiliApp.React.createElement(Route, { name: 'setting', path: 'setting/', handler: _setting2.default }),
    _qiliApp.React.createElement(Route, { name: 'dashboard', path: 'dashboard/:when?/', handler: _dashboard2.default }),
    _qiliApp.React.createElement(Route, { name: 'publish', path: 'publish/:what?/', handler: _publish2.default }),
    _qiliApp.React.createElement(DefaultRoute, { handler: _dashboard2.default })
));

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
//# sourceMappingURL=data:application/json;base64,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TUFBSyxHQUFMLEVBQVMsU0FBUyxVQUFULEVBQWhCO0lBQ0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssTUFBTCxFQUFZLE1BQUssYUFBTCxFQUFtQix5QkFBdEMsQ0FESjtJQUVJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQUwsRUFBWSxNQUFLLFlBQUwsRUFBa0IseUJBQXJDLENBRko7SUFHSSw2QkFBQyxLQUFELElBQU8sTUFBSyxZQUFMLEVBQWtCLE1BQUssYUFBTCxFQUFtQiwrQkFBNUMsQ0FISjtJQUlJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFdBQUwsRUFBaUIsTUFBSyxrQkFBTCxFQUF3Qiw4QkFBaEQsQ0FKSjtJQUtJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFFBQUwsRUFBYyxNQUFLLFNBQUwsRUFBZSxpQ0FBcEMsQ0FMSjtJQU1JLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLHFCQUFMLEVBQTJCLFNBQVMsT0FBVCxFQUFqRCxDQU5KO0lBT0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssU0FBTCxFQUFlLE1BQUssVUFBTCxFQUFnQiw0QkFBdEMsQ0FQSjtJQVFJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFVBQUwsRUFBZ0IsNEJBQXRDLENBUko7SUFTSSw2QkFBQyxLQUFELElBQU8sTUFBSyxXQUFMLEVBQWlCLE1BQUssbUJBQUwsRUFBeUIsOEJBQWpELENBVEo7SUFVSSw2QkFBQyxLQUFELElBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxpQkFBTCxFQUF1Qiw0QkFBN0MsQ0FWSjtJQVdJLDZCQUFDLFlBQUQsSUFBYyw4QkFBZCxDQVhKO0NBRFcsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1VzZXIsUmVhY3QsQ29tcG9uZW50LFJvdXRlcixRaWxpQXBwLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5cbnZhciB7Um91dGUsIFJvdXRlSGFuZGxlciwgRGVmYXVsdFJvdXRlfSA9IFJvdXRlcixcbiAgICB7RW1wdHl9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZH0pXG4gICAgICAgIEZhbWlseS5ldmVudC5vbignY2hhbmdlJywoKT0+dGhpcy5zZXRTdGF0ZSh7Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5zdGF0ZVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgPEN1cnJlbnRDaGlsZCBjaGlsZD17Y2hpbGR9Lz5cbiAgICAgICAgICAgICAgIDxSb3V0ZUhhbmRsZXIgY2hpbGQ9e2NoaWxkfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblN1cGVyRGFkZHkuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cbk9iamVjdC5hc3NpZ24oU3VwZXJEYWRkeS5kZWZhdWx0UHJvcHMse1xuICAgIGFwcElkOlwiNTc0NmIyYzVlNGJiM2IzNzAwYWUxNTY2XCIsXG4gICAgaW5pdDooKT0+aW5pdCgpXG59KVxuXG5jbGFzcyBDdXJyZW50Q2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGQ9e30sIHN0eWxlPXt9fT10aGlzLnByb3BzLCBhdmF0YXJcblxuICAgICAgICBpZihjaGlsZC5waG90bylcbiAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBzcmM9e3RoaXMucHJvcHMuY2hpbGQucGhvdG99Lz4pXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGF2YXRhcj0oPGRpdj48c3BhbiBzdHlsZT17e2ZvbnRTaXplOlwieHgtc21hbGxcIn19Pnt0aGlzLmxhc3ROYW1lPWNoaWxkLm5hbWV9PC9zcGFuPjwvZGl2PilcblxuICAgICAgICBpZighY2hpbGQuX2lkKVxuICAgICAgICAgICAgc3R5bGUuZGlzcGxheT0nbm9uZSdcblxuICAgICAgICByZXR1cm4oXG4gICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gY2xhc3NOYW1lPVwic3RpY2t5IHRvcCByaWdodFwiXG4gICAgICAgICAgICAgICAgbWluaT17dHJ1ZX0gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoKT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2F2YXRhcn1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuICAgICAgICByZXR1cm4gISF0aGlzLnByb3BzLmNoaWxkICYmIChuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGQgfHwgbmV4dFByb3BzLmNoaWxkLm5hbWUhPXRoaXMubGFzdE5hbWUpXG4gICAgfVxuXG4gICAgY2hhbmdlKCl7XG4gICAgICAgIHZhciBjdXJyZW50PXRoaXMucHJvcHMuY2hpbGQsXG4gICAgICAgICAgICBjaGlsZHJlbj1GYW1pbHkuY2hpbGRyZW4sXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBpZihsZW48MilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgaW5kZXg9Y2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxuICAgICAgICBGYW1pbHkuY3VycmVudENoaWxkPWNoaWxkcmVuWyhpbmRleCsxKSAlIGxlbl1cbiAgICB9XG59XG5cbkN1cnJlbnRDaGlsZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuXG5pbXBvcnQgVGFza1VJIGZyb20gJy4vdGFzaydcbmltcG9ydCBCYWJ5VUkgZnJvbSAnLi9iYWJ5J1xuaW1wb3J0IEtub3dsZWRnZXNVSSBmcm9tICcuL2tub3dsZWRnZXMnXG5pbXBvcnQgS25vd2xlZGdlVUkgZnJvbSAnLi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9uZXdLbm93bGVkZ2UnXG5pbXBvcnQgQWNjb3VudFVJIGZyb20gJy4vYWNjb3VudCdcbmltcG9ydCBTZXR0aW5nVUkgZnJvbSAnLi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL3B1Ymxpc2gnXG5cbm1vZHVsZS5leHBvcnRzPVFpbGlBcHAucmVuZGVyKFxuICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGhhbmRsZXI9e1N1cGVyRGFkZHl9PlxuICAgICAgICA8Um91dGUgbmFtZT1cInRhc2tcIiBwYXRoPVwidGFzay86X2lkPy9cIiBoYW5kbGVyPXtUYXNrVUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJiYWJ5XCIgcGF0aD1cImJhYnkvOl9pZD9cIiBoYW5kbGVyPXtCYWJ5VUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJrbm93bGVkZ2VzXCIgcGF0aD1cImtub3dsZWRnZXMvXCIgaGFuZGxlcj17S25vd2xlZGdlc1VJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwia25vd2xlZGdlXCIgcGF0aD1cImtub3dsZWRnZS86X2lkPy9cIiBoYW5kbGVyPXtLbm93bGVkZ2VVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImNyZWF0ZVwiIHBhdGg9XCJjcmVhdGUvXCIgaGFuZGxlcj17TmV3S25vd2xlZGdlVUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiY29tbWVudFwiIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWQvXCIgaGFuZGxlcj17Q29tbWVudH0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImFjY291bnRcIiBwYXRoPVwiYWNjb3VudC9cIiBoYW5kbGVyPXtBY2NvdW50VUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwic2V0dGluZ1wiIHBhdGg9XCJzZXR0aW5nL1wiIGhhbmRsZXI9e1NldHRpbmdVSX0gLz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJkYXNoYm9hcmRcIiBwYXRoPVwiZGFzaGJvYXJkLzp3aGVuPy9cIiBoYW5kbGVyPXtEYXNoYm9hcmR9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJwdWJsaXNoXCIgcGF0aD1cInB1Ymxpc2gvOndoYXQ/L1wiIGhhbmRsZXI9e1B1Ymxpc2hVSX0gLz5cbiAgICAgICAgPERlZmF1bHRSb3V0ZSBoYW5kbGVyPXtEYXNoYm9hcmR9Lz5cbiAgICA8L1JvdXRlPlxuKVxuXG5cbi8qKlxuKiBxdWlja0FjdGlvbiBwb3NpdGlvbiBkb2Vzbid0IGNoYW5nZSB3aGVuIHJlc2l6aW5nXG4qIHNlcnZlciByZW5kZXIgcmVhZHlcbiAgICAqIGRvbSBhbmQgZGF0YSByZXRyaWV2aW5nIGZyb20gc2VydmVyIHNob3VsZCBiZSBpbiBjb21wb25lbnREaWRNb3VudFxuKiBpbW11dGFibGUgc2V0U3RhdGUgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZVxuKmRvbmU6IGJhYnkgZmVhdHVyZVxuICAgICogY3JlYXRlIGZpcnN0IGJhYnlcbiAgICAqIGRlbGV0ZSBsYXN0IGJhYnlcbiAgICAqIGNyZWF0ZSBiYWJ5XG4gICAgKiBkZWxldGUgYmFieVxuICAgICogRmFtaWx5IGxpc3QgdXBkYXRlIGFsb25nIHdpdGggYmFieSBhZGRpdGlvbiBhbmQgZGVsZXRpb25cbipkb25lOiBOb3QgYmFieSBjZW50cmljXG4qIGxvZ29cbiAgICAqIGxvYWRpbmdcbiogZmx1eCByZWZhY3RvclxuKiBmb3JtIHJlZmFjdG9yXG4gICAgKmRvbmU6IGF1dG8gdXBkYXRlOiBiYWJ5LCBjb250cm9sbGVkIGlucHV0IG9uY2hhbmdlLT5zZXRTdGF0ZS0+b25CbHVyLT51cHNlcnRcbiogRmFtaWx5IGxpc3QgVUlcbiAgICAqIHJlbW92ZS0+ZGFzaGJvYXJkLT5mYW1pbHkgbGlzdDogc2V0U3RhdGUgd2FybmluZywgbm90IHB1cmUgcmVuZGVyP1xuKiBjaGFuZ2UgY2hpbGQgbmFtZSAtPnNob3J0Y3V0IG5hbWUgc2hvdWxkIGJlIGNoYW5nZWQgYWNjb3JkaW5nbHlcbiovXG4iXX0=