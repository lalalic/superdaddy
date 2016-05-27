'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
            var childStyle = { position: 'fixed', top: 10, right: this._right(10), opacity: 0.7, zIndex: 9 };

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(CurrentChild, { child: child, style: childStyle }),
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
            var style = _props$style === undefined ? {} : _props$style;
            var others = _objectWithoutProperties(_props, ['child', 'style']);var avatar;

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
                _extends({ mini: true, style: style, onClick: function onClick() {
                        return _this3.change();
                    } }, others),
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
//# sourceMappingURL=data:application/json;base64,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dXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1VzZXIsUmVhY3QsQ29tcG9uZW50LFJvdXRlcixRaWxpQXBwLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5pbXBvcnQgRGFzaGJvYXJkIGZyb20gXCIuL2Rhc2hib2FyZFwiXG5cbnZhciB7Um91dGUsIFJvdXRlSGFuZGxlciwgRGVmYXVsdFJvdXRlfSA9IFJvdXRlcixcbiAgICB7RW1wdHl9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZH0pXG4gICAgICAgIEZhbWlseS5ldmVudC5vbignY2hhbmdlJywoKT0+dGhpcy5zZXRTdGF0ZSh7Y2hpbGQ6RmFtaWx5LmN1cnJlbnRDaGlsZH0pKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIGNoaWxkU3R5bGU9e3Bvc2l0aW9uOidmaXhlZCcsdG9wOjEwLHJpZ2h0OnRoaXMuX3JpZ2h0KDEwKSwgb3BhY2l0eTowLjcsIHpJbmRleDo5fVxuXHRcdFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgIDxDdXJyZW50Q2hpbGQgY2hpbGQ9e2NoaWxkfSBzdHlsZT17Y2hpbGRTdHlsZX0vPlxuICAgICAgICAgICAgICAgPFJvdXRlSGFuZGxlciBjaGlsZD17Y2hpbGR9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuU3VwZXJEYWRkeS5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZD17fSwgc3R5bGU9e30sIC4uLm90aGVyc309dGhpcy5wcm9wcywgYXZhdGFyXG5cbiAgICAgICAgaWYoY2hpbGQucGhvdG8pXG4gICAgICAgICAgICBhdmF0YXI9KDxBdmF0YXIgc3JjPXt0aGlzLnByb3BzLmNoaWxkLnBob3RvfS8+KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhdmF0YXI9KDxkaXY+PHNwYW4gc3R5bGU9e3tmb250U2l6ZTpcInh4LXNtYWxsXCJ9fT57dGhpcy5sYXN0TmFtZT1jaGlsZC5uYW1lfTwvc3Bhbj48L2Rpdj4pXG5cbiAgICAgICAgaWYoIWNoaWxkLl9pZClcbiAgICAgICAgICAgIHN0eWxlLmRpc3BsYXk9J25vbmUnXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIG1pbmk9e3RydWV9IHN0eWxlPXtzdHlsZX0gb25DbGljaz17KCk9PnRoaXMuY2hhbmdlKCl9IHsuLi5vdGhlcnN9PlxuICAgICAgICAgICAgICAgIHthdmF0YXJ9XG4gICAgICAgICAgICA8L0Zsb2F0aW5nQWN0aW9uQnV0dG9uPlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5jaGlsZCAmJiAobmV4dFByb3BzLmNoaWxkIT10aGlzLnByb3BzLmNoaWxkIHx8IG5leHRQcm9wcy5jaGlsZC5uYW1lIT10aGlzLmxhc3ROYW1lKVxuICAgIH1cblxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIgY3VycmVudD10aGlzLnByb3BzLmNoaWxkLFxuICAgICAgICAgICAgY2hpbGRyZW49RmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcbiAgICAgICAgRmFtaWx5LmN1cnJlbnRDaGlsZD1jaGlsZHJlblsoaW5kZXgrMSkgJSBsZW5dXG4gICAgfVxufVxuXG5DdXJyZW50Q2hpbGQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cblxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgQmFieVVJIGZyb20gJy4vYmFieSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtTdXBlckRhZGR5fT5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrXCIgcGF0aD1cInRhc2svOl9pZD8vXCIgaGFuZGxlcj17VGFza1VJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYmFieVwiIHBhdGg9XCJiYWJ5LzpfaWQ/XCIgaGFuZGxlcj17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwia25vd2xlZGdlc1wiIHBhdGg9XCJrbm93bGVkZ2VzL1wiIGhhbmRsZXI9e0tub3dsZWRnZXNVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImtub3dsZWRnZVwiIHBhdGg9XCJrbm93bGVkZ2UvOl9pZD8vXCIgaGFuZGxlcj17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJjcmVhdGVcIiBwYXRoPVwiY3JlYXRlL1wiIGhhbmRsZXI9e05ld0tub3dsZWRnZVVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cImNvbW1lbnRcIiBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkL1wiIGhhbmRsZXI9e0NvbW1lbnR9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJhY2NvdW50XCIgcGF0aD1cImFjY291bnQvXCIgaGFuZGxlcj17QWNjb3VudFVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cInNldHRpbmdcIiBwYXRoPVwic2V0dGluZy9cIiBoYW5kbGVyPXtTZXR0aW5nVUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiZGFzaGJvYXJkXCIgcGF0aD1cImRhc2hib2FyZC86d2hlbj8vXCIgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwicHVibGlzaFwiIHBhdGg9XCJwdWJsaXNoLzp3aGF0Py9cIiBoYW5kbGVyPXtQdWJsaXNoVUl9IC8+XG4gICAgICAgIDxEZWZhdWx0Um91dGUgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgPC9Sb3V0ZT5cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19