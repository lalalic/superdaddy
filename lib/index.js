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
            var style = _props$style === undefined ? { opacity: 0.7, zIndex: 9 } : _props$style;var avatar;

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
                'div',
                { className: 'sticky top right' },
                _qiliApp.React.createElement(
                    _materialUi.FloatingActionButton,
                    { mini: true, style: style, onClick: function onClick() {
                            return _this3.change();
                        } },
                    avatar
                )
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
//# sourceMappingURL=data:application/json;base64,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LE9BQU8sT0FBUCxHQUFlLGlCQUFRLE1BQVIsQ0FDWDtBQUFDLFNBQUQ7TUFBTyxNQUFLLEdBQUwsRUFBUyxTQUFTLFVBQVQsRUFBaEI7SUFDSSw2QkFBQyxLQUFELElBQU8sTUFBSyxNQUFMLEVBQVksTUFBSyxhQUFMLEVBQW1CLHlCQUF0QyxDQURKO0lBRUksNkJBQUMsS0FBRCxJQUFPLE1BQUssTUFBTCxFQUFZLE1BQUssWUFBTCxFQUFrQix5QkFBckMsQ0FGSjtJQUdJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFlBQUwsRUFBa0IsTUFBSyxhQUFMLEVBQW1CLCtCQUE1QyxDQUhKO0lBSUksNkJBQUMsS0FBRCxJQUFPLE1BQUssV0FBTCxFQUFpQixNQUFLLGtCQUFMLEVBQXdCLDhCQUFoRCxDQUpKO0lBS0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssUUFBTCxFQUFjLE1BQUssU0FBTCxFQUFlLGlDQUFwQyxDQUxKO0lBTUksNkJBQUMsS0FBRCxJQUFPLE1BQUssU0FBTCxFQUFlLE1BQUsscUJBQUwsRUFBMkIsU0FBUyxPQUFULEVBQWpELENBTko7SUFPSSw2QkFBQyxLQUFELElBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxVQUFMLEVBQWdCLDRCQUF0QyxDQVBKO0lBUUksNkJBQUMsS0FBRCxJQUFPLE1BQUssU0FBTCxFQUFlLE1BQUssVUFBTCxFQUFnQiw0QkFBdEMsQ0FSSjtJQVNJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFdBQUwsRUFBaUIsTUFBSyxtQkFBTCxFQUF5Qiw4QkFBakQsQ0FUSjtJQVVJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLGlCQUFMLEVBQXVCLDRCQUE3QyxDQVZKO0lBV0ksNkJBQUMsWUFBRCxJQUFjLDhCQUFkLENBWEo7Q0FEVyxDQUFmIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZSgnLi4vc3R5bGUvaW5kZXgubGVzcycpXG5cbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUm91dGVyLFFpbGlBcHAsIFVJfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7TWVudUl0ZW0sIEZsb2F0aW5nQWN0aW9uQnV0dG9uLCBBdmF0YXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtGYW1pbHksS25vd2xlZGdlLFRhYmxlLGluaXR9IGZyb20gJy4vZGInXG5cbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcblxudmFyIHtSb3V0ZSwgUm91dGVIYW5kbGVyLCBEZWZhdWx0Um91dGV9ID0gUm91dGVyLFxuICAgIHtFbXB0eX09VUlcblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjaGlsZDpGYW1pbHkuY3VycmVudENoaWxkfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLCgpPT50aGlzLnNldFN0YXRlKHtjaGlsZDpGYW1pbHkuY3VycmVudENoaWxkfSkpXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnN0YXRlXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICA8Q3VycmVudENoaWxkIGNoaWxkPXtjaGlsZH0vPlxuICAgICAgICAgICAgICAgPFJvdXRlSGFuZGxlciBjaGlsZD17Y2hpbGR9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuU3VwZXJEYWRkeS5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZD17fSwgc3R5bGU9e29wYWNpdHk6MC43LCB6SW5kZXg6OX19PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG4gICAgICAgIGlmKCFjaGlsZC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PSdub25lJ1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxkaXYgIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b24gbWluaT17dHJ1ZX0gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXsoKT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAgICAgIHthdmF0YXJ9XG4gICAgICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKXtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5wcm9wcy5jaGlsZCAmJiAobmV4dFByb3BzLmNoaWxkIT10aGlzLnByb3BzLmNoaWxkIHx8IG5leHRQcm9wcy5jaGlsZC5uYW1lIT10aGlzLmxhc3ROYW1lKVxuICAgIH1cblxuICAgIGNoYW5nZSgpe1xuICAgICAgICB2YXIgY3VycmVudD10aGlzLnByb3BzLmNoaWxkLFxuICAgICAgICAgICAgY2hpbGRyZW49RmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYobGVuPDIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGluZGV4PWNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcbiAgICAgICAgRmFtaWx5LmN1cnJlbnRDaGlsZD1jaGlsZHJlblsoaW5kZXgrMSkgJSBsZW5dXG4gICAgfVxufVxuXG5DdXJyZW50Q2hpbGQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cblxuaW1wb3J0IFRhc2tVSSBmcm9tICcuL3Rhc2snXG5pbXBvcnQgQmFieVVJIGZyb20gJy4vYmFieSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9rbm93bGVkZ2VzJ1xuaW1wb3J0IEtub3dsZWRnZVVJIGZyb20gJy4va25vd2xlZGdlJ1xuaW1wb3J0IE5ld0tub3dsZWRnZVVJIGZyb20gJy4vbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2FjY291bnQnXG5pbXBvcnQgU2V0dGluZ1VJIGZyb20gJy4vc2V0dGluZydcbmltcG9ydCBQdWJsaXNoVUkgZnJvbSAnLi9wdWJsaXNoJ1xuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtTdXBlckRhZGR5fT5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrXCIgcGF0aD1cInRhc2svOl9pZD8vXCIgaGFuZGxlcj17VGFza1VJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYmFieVwiIHBhdGg9XCJiYWJ5LzpfaWQ/XCIgaGFuZGxlcj17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwia25vd2xlZGdlc1wiIHBhdGg9XCJrbm93bGVkZ2VzL1wiIGhhbmRsZXI9e0tub3dsZWRnZXNVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImtub3dsZWRnZVwiIHBhdGg9XCJrbm93bGVkZ2UvOl9pZD8vXCIgaGFuZGxlcj17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJjcmVhdGVcIiBwYXRoPVwiY3JlYXRlL1wiIGhhbmRsZXI9e05ld0tub3dsZWRnZVVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cImNvbW1lbnRcIiBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkL1wiIGhhbmRsZXI9e0NvbW1lbnR9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJhY2NvdW50XCIgcGF0aD1cImFjY291bnQvXCIgaGFuZGxlcj17QWNjb3VudFVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cInNldHRpbmdcIiBwYXRoPVwic2V0dGluZy9cIiBoYW5kbGVyPXtTZXR0aW5nVUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiZGFzaGJvYXJkXCIgcGF0aD1cImRhc2hib2FyZC86d2hlbj8vXCIgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwicHVibGlzaFwiIHBhdGg9XCJwdWJsaXNoLzp3aGF0Py9cIiBoYW5kbGVyPXtQdWJsaXNoVUl9IC8+XG4gICAgICAgIDxEZWZhdWx0Um91dGUgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgPC9Sb3V0ZT5cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19