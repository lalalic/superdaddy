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
//# sourceMappingURL=data:application/json;base64,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aUJBQVEsTUFBUixDQUNYO0FBQUMsU0FBRDtNQUFPLE1BQUssR0FBTCxFQUFTLFNBQVMsVUFBVCxFQUFoQjtJQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQUwsRUFBWSxNQUFLLGFBQUwsRUFBbUIseUJBQXRDLENBREo7SUFFSSw2QkFBQyxLQUFELElBQU8sTUFBSyxNQUFMLEVBQVksTUFBSyxZQUFMLEVBQWtCLHlCQUFyQyxDQUZKO0lBR0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssWUFBTCxFQUFrQixNQUFLLGFBQUwsRUFBbUIsK0JBQTVDLENBSEo7SUFJSSw2QkFBQyxLQUFELElBQU8sTUFBSyxXQUFMLEVBQWlCLE1BQUssa0JBQUwsRUFBd0IsOEJBQWhELENBSko7SUFLSSw2QkFBQyxLQUFELElBQU8sTUFBSyxRQUFMLEVBQWMsTUFBSyxTQUFMLEVBQWUsaUNBQXBDLENBTEo7SUFNSSw2QkFBQyxLQUFELElBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxxQkFBTCxFQUEyQixTQUFTLE9BQVQsRUFBakQsQ0FOSjtJQU9JLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFVBQUwsRUFBZ0IsNEJBQXRDLENBUEo7SUFRSSw2QkFBQyxLQUFELElBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxVQUFMLEVBQWdCLDRCQUF0QyxDQVJKO0lBU0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssV0FBTCxFQUFpQixNQUFLLG1CQUFMLEVBQXlCLDhCQUFqRCxDQVRKO0lBVUksNkJBQUMsS0FBRCxJQUFPLE1BQUssU0FBTCxFQUFlLE1BQUssaUJBQUwsRUFBdUIsNEJBQTdDLENBVko7SUFXSSw2QkFBQyxZQUFELElBQWMsOEJBQWQsQ0FYSjtDQURXLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtVc2VyLFJlYWN0LENvbXBvbmVudCxSb3V0ZXIsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0ZhbWlseSxLbm93bGVkZ2UsVGFibGUsaW5pdH0gZnJvbSAnLi9kYidcblxuaW1wb3J0IERhc2hib2FyZCBmcm9tIFwiLi9kYXNoYm9hcmRcIlxuXG52YXIge1JvdXRlLCBSb3V0ZUhhbmRsZXIsIERlZmF1bHRSb3V0ZX0gPSBSb3V0ZXIsXG4gICAge0VtcHR5fT1VSVxuXG5jbGFzcyBTdXBlckRhZGR5IGV4dGVuZHMgUWlsaUFwcHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUse2NoaWxkOkZhbWlseS5jdXJyZW50Q2hpbGR9KVxuICAgICAgICBGYW1pbHkuZXZlbnQub24oJ2NoYW5nZScsKCk9PnRoaXMuc2V0U3RhdGUoe2NoaWxkOkZhbWlseS5jdXJyZW50Q2hpbGR9KSlcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMuc3RhdGVcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgIDxDdXJyZW50Q2hpbGQgY2hpbGQ9e2NoaWxkfS8+XG4gICAgICAgICAgICAgICA8Um91dGVIYW5kbGVyIGNoaWxkPXtjaGlsZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5TdXBlckRhZGR5LmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG5PYmplY3QuYXNzaWduKFN1cGVyRGFkZHkuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiLFxuICAgIGluaXQ6KCk9PmluaXQoKVxufSlcblxuY2xhc3MgQ3VycmVudENoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkPXt9LCBzdHlsZT17cG9zaXRpb246XCJhYnNvbHV0ZVwiLCB6SW5kZXg6OX19PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG4gICAgICAgIGlmKCFjaGlsZC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PSdub25lJ1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCJcbiAgICAgICAgICAgICAgICBtaW5pPXt0cnVlfSBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eygpPT50aGlzLmNoYW5nZSgpfT5cbiAgICAgICAgICAgICAgICB7YXZhdGFyfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuY2hpbGQgJiYgKG5leHRQcm9wcy5jaGlsZCE9dGhpcy5wcm9wcy5jaGlsZCB8fCBuZXh0UHJvcHMuY2hpbGQubmFtZSE9dGhpcy5sYXN0TmFtZSlcbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbn1cblxuQ3VycmVudENoaWxkLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSBmcm9tICcuL2JhYnknXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgPFJvdXRlIHBhdGg9XCIvXCIgaGFuZGxlcj17U3VwZXJEYWRkeX0+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwidGFza1wiIHBhdGg9XCJ0YXNrLzpfaWQ/L1wiIGhhbmRsZXI9e1Rhc2tVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImJhYnlcIiBwYXRoPVwiYmFieS86X2lkP1wiIGhhbmRsZXI9e0JhYnlVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImtub3dsZWRnZXNcIiBwYXRoPVwia25vd2xlZGdlcy9cIiBoYW5kbGVyPXtLbm93bGVkZ2VzVUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJrbm93bGVkZ2VcIiBwYXRoPVwia25vd2xlZGdlLzpfaWQ/L1wiIGhhbmRsZXI9e0tub3dsZWRnZVVJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiY3JlYXRlXCIgcGF0aD1cImNyZWF0ZS9cIiBoYW5kbGVyPXtOZXdLbm93bGVkZ2VVSX0gLz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJjb21tZW50XCIgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZC9cIiBoYW5kbGVyPXtDb21tZW50fS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYWNjb3VudFwiIHBhdGg9XCJhY2NvdW50L1wiIGhhbmRsZXI9e0FjY291bnRVSX0gLz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJzZXR0aW5nXCIgcGF0aD1cInNldHRpbmcvXCIgaGFuZGxlcj17U2V0dGluZ1VJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cImRhc2hib2FyZFwiIHBhdGg9XCJkYXNoYm9hcmQvOndoZW4/L1wiIGhhbmRsZXI9e0Rhc2hib2FyZH0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cInB1Ymxpc2hcIiBwYXRoPVwicHVibGlzaC86d2hhdD8vXCIgaGFuZGxlcj17UHVibGlzaFVJfSAvPlxuICAgICAgICA8RGVmYXVsdFJvdXRlIGhhbmRsZXI9e0Rhc2hib2FyZH0vPlxuICAgIDwvUm91dGU+XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==