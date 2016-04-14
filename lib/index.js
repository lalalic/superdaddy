'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./lib/db');

var _dashboard = require('./lib/dashboard');

var _dashboard2 = _interopRequireDefault(_dashboard);

var _task = require('./lib/task');

var _task2 = _interopRequireDefault(_task);

var _baby = require('./lib/baby');

var _baby2 = _interopRequireDefault(_baby);

var _knowledges = require('./lib/knowledges');

var _knowledges2 = _interopRequireDefault(_knowledges);

var _knowledge = require('./lib/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _newKnowledge = require('./lib/newKnowledge');

var _newKnowledge2 = _interopRequireDefault(_newKnowledge);

var _account = require('./lib/account');

var _account2 = _interopRequireDefault(_account);

var _setting = require('./lib/setting');

var _setting2 = _interopRequireDefault(_setting);

var _publish = require('./lib/publish');

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

Object.assign(SuperDaddy.defaultProps, {
    appId: "1c7f3b148057498aa1edcc783a7537c6", //"superdaddy",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQW1FQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQWhGQSxRQUFRLHFCQUFSOztJQVFLO0lBQU87QUFBUixJQUFzQiwyQ0FBdEI7SUFDQzs7SUFFQzs7O0FBQ0YsYUFERSxVQUNGLENBQVksS0FBWixFQUFrQjs4QkFEaEIsWUFDZ0I7OzJFQURoQix1QkFFUSxRQURROztBQUVkLGVBQU8sTUFBUCxDQUFjLE1BQUssS0FBTCxFQUFXLEVBQUMsT0FBTSxXQUFPLFlBQVAsRUFBaEMsRUFGYztBQUdkLG1CQUFPLEtBQVAsQ0FBYSxFQUFiLENBQWdCLFFBQWhCLEVBQXlCO21CQUFJLE1BQUssUUFBTCxDQUFjLEVBQUMsT0FBTSxXQUFPLFlBQVAsRUFBckI7U0FBSixDQUF6QixDQUhjOztLQUFsQjs7aUJBREU7O3dDQU9hO0FBQ1AsZ0JBQUMsUUFBTyxLQUFLLEtBQUwsQ0FBUCxLQUFELENBRE87QUFFUCw2QkFBVyxFQUFDLFVBQVMsT0FBVCxFQUFpQixLQUFJLEVBQUosRUFBTyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQVosQ0FBTixFQUF1QixTQUFRLEdBQVIsRUFBYSxRQUFPLENBQVAsRUFBeEUsQ0FGTzs7QUFJWCxtQkFDSTs7O2dCQUNJLDZCQUFDLFlBQUQsSUFBYyxPQUFPLEtBQVAsRUFBYyxPQUFPLFVBQVAsRUFBNUIsQ0FESjtnQkFFSSw2QkFBQyxZQUFELElBQWMsT0FBTyxLQUFQLEVBQWQsQ0FGSjthQURKLENBSlc7Ozs7V0FQYjs7O0FBbUJOLE9BQU8sTUFBUCxDQUFjLFdBQVcsWUFBWCxFQUF3QjtBQUNsQyxXQUFNLGtDQUFOO0FBQ0EsVUFBSztlQUFJO0tBQUo7Q0FGVDs7SUFLTTs7Ozs7Ozs7Ozs7aUNBQ007Ozt5QkFDZ0MsS0FBSyxLQUFMLENBRGhDO3NDQUNDLE1BREQ7Z0JBQ0MscUNBQU0sa0JBRFA7c0NBQ1csTUFEWDtnQkFDVyxxQ0FBTSxrQkFEakI7QUFDQSxnQkFBd0IsNkRBQXhCLENBREEsSUFDNEMsT0FENUM7O0FBR0osZ0JBQUcsTUFBTSxLQUFOLEVBQ0MsU0FBUSxtREFBUSxLQUFLLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBaUIsS0FBakIsRUFBYixDQUFSLENBREosS0FHSSxTQUFROzs7Z0JBQUs7O3NCQUFNLE9BQU8sRUFBQyxVQUFTLFVBQVQsRUFBUixFQUFOO29CQUFxQyxLQUFLLFFBQUwsR0FBYyxNQUFNLElBQU47aUJBQXhEO2FBQVIsQ0FISjs7QUFLQSxnQkFBRyxDQUFDLE1BQU0sR0FBTixFQUNBLE1BQU0sT0FBTixHQUFjLE1BQWQsQ0FESjs7QUFHQSxtQkFDSTs7MkJBQXNCLE1BQU0sSUFBTixFQUFZLE9BQU8sS0FBUCxFQUFjLFNBQVM7K0JBQUksT0FBSyxNQUFMO3FCQUFKLElBQXVCLE9BQWhGO2dCQUNLLE1BREw7YUFESixDQVhJOzs7OzhDQWtCYyxXQUFXLFdBQVU7QUFDdkMsbUJBQU8sQ0FBQyxDQUFDLEtBQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsVUFBVSxLQUFWLElBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsSUFBb0IsVUFBVSxLQUFWLENBQWdCLElBQWhCLElBQXNCLEtBQUssUUFBTCxDQUFsRixDQURnQzs7OztpQ0FJbkM7QUFDSixnQkFBSSxVQUFRLEtBQUssS0FBTCxDQUFXLEtBQVg7Z0JBQ1IsV0FBUyxXQUFPLFFBQVA7Z0JBQ1QsTUFBSSxTQUFTLE1BQVQsQ0FISjtBQUlKLGdCQUFHLE1BQUksQ0FBSixFQUNDLE9BREo7O0FBR0EsZ0JBQUksUUFBTSxTQUFTLE9BQVQsQ0FBaUIsT0FBakIsQ0FBTixDQVBBO0FBUUosdUJBQU8sWUFBUCxHQUFvQixTQUFTLENBQUMsUUFBTSxDQUFOLENBQUQsR0FBWSxHQUFaLENBQTdCLENBUkk7Ozs7V0F2Qk47OztBQW1DTixhQUFhLFlBQWIsR0FBMEIsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixJQUFoQixFQUFsQzs7QUFZQSxPQUFPLE9BQVAsR0FBZSxpQkFBUSxNQUFSLENBQ1g7QUFBQyxTQUFEO01BQU8sTUFBSyxHQUFMLEVBQVMsU0FBUyxVQUFULEVBQWhCO0lBQ0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssTUFBTCxFQUFZLE1BQUssYUFBTCxFQUFtQix5QkFBdEMsQ0FESjtJQUVJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLE1BQUwsRUFBWSxNQUFLLFlBQUwsRUFBa0IseUJBQXJDLENBRko7SUFHSSw2QkFBQyxLQUFELElBQU8sTUFBSyxZQUFMLEVBQWtCLE1BQUssYUFBTCxFQUFtQiwrQkFBNUMsQ0FISjtJQUlJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFdBQUwsRUFBaUIsTUFBSyxrQkFBTCxFQUF3Qiw4QkFBaEQsQ0FKSjtJQUtJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFFBQUwsRUFBYyxNQUFLLFNBQUwsRUFBZSxpQ0FBcEMsQ0FMSjtJQU1JLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLHFCQUFMLEVBQTJCLFNBQVMsT0FBVCxFQUFqRCxDQU5KO0lBT0ksNkJBQUMsS0FBRCxJQUFPLE1BQUssU0FBTCxFQUFlLE1BQUssVUFBTCxFQUFnQiw0QkFBdEMsQ0FQSjtJQVFJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFVBQUwsRUFBZ0IsNEJBQXRDLENBUko7SUFTSSw2QkFBQyxLQUFELElBQU8sTUFBSyxXQUFMLEVBQWlCLE1BQUssbUJBQUwsRUFBeUIsOEJBQWpELENBVEo7SUFVSSw2QkFBQyxLQUFELElBQU8sTUFBSyxTQUFMLEVBQWUsTUFBSyxpQkFBTCxFQUF1Qiw0QkFBN0MsQ0FWSjtJQVdJLDZCQUFDLFlBQUQsSUFBYyw4QkFBZCxDQVhKO0NBRFcsQ0FBZiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoJy4uL3N0eWxlL2luZGV4Lmxlc3MnKVxuXG5pbXBvcnQge1VzZXIsUmVhY3QsQ29tcG9uZW50LFJvdXRlcixRaWxpQXBwLCBVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge01lbnVJdGVtLCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgQXZhdGFyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2xpYi9kYidcblxuaW1wb3J0IERhc2hib2FyZCBmcm9tIFwiLi9saWIvZGFzaGJvYXJkXCJcblxudmFyIHtSb3V0ZSwgUm91dGVIYW5kbGVyLCBEZWZhdWx0Um91dGV9ID0gUm91dGVyLFxuICAgIHtFbXB0eX09VUlcblxuY2xhc3MgU3VwZXJEYWRkeSBleHRlbmRzIFFpbGlBcHB7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLHtjaGlsZDpGYW1pbHkuY3VycmVudENoaWxkfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLCgpPT50aGlzLnNldFN0YXRlKHtjaGlsZDpGYW1pbHkuY3VycmVudENoaWxkfSkpXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgY2hpbGRTdHlsZT17cG9zaXRpb246J2ZpeGVkJyx0b3A6MTAscmlnaHQ6dGhpcy5fcmlnaHQoMTApLCBvcGFjaXR5OjAuNywgekluZGV4Ojl9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEN1cnJlbnRDaGlsZCBjaGlsZD17Y2hpbGR9IHN0eWxlPXtjaGlsZFN0eWxlfS8+XG4gICAgICAgICAgICAgICAgPFJvdXRlSGFuZGxlciBjaGlsZD17Y2hpbGR9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCIxYzdmM2IxNDgwNTc0OThhYTFlZGNjNzgzYTc1MzdjNlwiLC8vXCJzdXBlcmRhZGR5XCIsXG4gICAgaW5pdDooKT0+aW5pdCgpXG59KVxuXG5jbGFzcyBDdXJyZW50Q2hpbGQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGQ9e30sIHN0eWxlPXt9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG4gICAgICAgIGlmKCFjaGlsZC5faWQpXG4gICAgICAgICAgICBzdHlsZS5kaXNwbGF5PSdub25lJ1xuXG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBtaW5pPXt0cnVlfSBzdHlsZT17c3R5bGV9IG9uQ2xpY2s9eygpPT50aGlzLmNoYW5nZSgpfSB7Li4ub3RoZXJzfT5cbiAgICAgICAgICAgICAgICB7YXZhdGFyfVxuICAgICAgICAgICAgPC9GbG9hdGluZ0FjdGlvbkJ1dHRvbj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XG4gICAgICAgIHJldHVybiAhIXRoaXMucHJvcHMuY2hpbGQgJiYgKG5leHRQcm9wcy5jaGlsZCE9dGhpcy5wcm9wcy5jaGlsZCB8fCBuZXh0UHJvcHMuY2hpbGQubmFtZSE9dGhpcy5sYXN0TmFtZSlcbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9Y2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXVxuICAgIH1cbn1cblxuQ3VycmVudENoaWxkLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi9saWIvdGFzaydcbmltcG9ydCBCYWJ5VUkgZnJvbSAnLi9saWIvYmFieSdcbmltcG9ydCBLbm93bGVkZ2VzVUkgZnJvbSAnLi9saWIva25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2xpYi9rbm93bGVkZ2UnXG5pbXBvcnQgTmV3S25vd2xlZGdlVUkgZnJvbSAnLi9saWIvbmV3S25vd2xlZGdlJ1xuaW1wb3J0IEFjY291bnRVSSBmcm9tICcuL2xpYi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL2xpYi9zZXR0aW5nJ1xuaW1wb3J0IFB1Ymxpc2hVSSBmcm9tICcuL2xpYi9wdWJsaXNoJ1xuXG5tb2R1bGUuZXhwb3J0cz1RaWxpQXBwLnJlbmRlcihcbiAgICA8Um91dGUgcGF0aD1cIi9cIiBoYW5kbGVyPXtTdXBlckRhZGR5fT5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJ0YXNrXCIgcGF0aD1cInRhc2svOl9pZD8vXCIgaGFuZGxlcj17VGFza1VJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiYmFieVwiIHBhdGg9XCJiYWJ5LzpfaWQ/XCIgaGFuZGxlcj17QmFieVVJfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwia25vd2xlZGdlc1wiIHBhdGg9XCJrbm93bGVkZ2VzL1wiIGhhbmRsZXI9e0tub3dsZWRnZXNVSX0vPlxuICAgICAgICA8Um91dGUgbmFtZT1cImtub3dsZWRnZVwiIHBhdGg9XCJrbm93bGVkZ2UvOl9pZD8vXCIgaGFuZGxlcj17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJjcmVhdGVcIiBwYXRoPVwiY3JlYXRlL1wiIGhhbmRsZXI9e05ld0tub3dsZWRnZVVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cImNvbW1lbnRcIiBwYXRoPVwiY29tbWVudC86dHlwZS86X2lkL1wiIGhhbmRsZXI9e0NvbW1lbnR9Lz5cbiAgICAgICAgPFJvdXRlIG5hbWU9XCJhY2NvdW50XCIgcGF0aD1cImFjY291bnQvXCIgaGFuZGxlcj17QWNjb3VudFVJfSAvPlxuICAgICAgICA8Um91dGUgbmFtZT1cInNldHRpbmdcIiBwYXRoPVwic2V0dGluZy9cIiBoYW5kbGVyPXtTZXR0aW5nVUl9IC8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwiZGFzaGJvYXJkXCIgcGF0aD1cImRhc2hib2FyZC86d2hlbj8vXCIgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgICAgIDxSb3V0ZSBuYW1lPVwicHVibGlzaFwiIHBhdGg9XCJwdWJsaXNoLzp3aGF0Py9cIiBoYW5kbGVyPXtQdWJsaXNoVUl9IC8+XG4gICAgICAgIDxEZWZhdWx0Um91dGUgaGFuZGxlcj17RGFzaGJvYXJkfS8+XG4gICAgPC9Sb3V0ZT5cbilcblxuXG4vKipcbiogcXVpY2tBY3Rpb24gcG9zaXRpb24gZG9lc24ndCBjaGFuZ2Ugd2hlbiByZXNpemluZ1xuKiBzZXJ2ZXIgcmVuZGVyIHJlYWR5XG4gICAgKiBkb20gYW5kIGRhdGEgcmV0cmlldmluZyBmcm9tIHNlcnZlciBzaG91bGQgYmUgaW4gY29tcG9uZW50RGlkTW91bnRcbiogaW1tdXRhYmxlIHNldFN0YXRlIHRvIGltcHJvdmUgcGVyZm9ybWFuY2Vcbipkb25lOiBiYWJ5IGZlYXR1cmVcbiAgICAqIGNyZWF0ZSBmaXJzdCBiYWJ5XG4gICAgKiBkZWxldGUgbGFzdCBiYWJ5XG4gICAgKiBjcmVhdGUgYmFieVxuICAgICogZGVsZXRlIGJhYnlcbiAgICAqIEZhbWlseSBsaXN0IHVwZGF0ZSBhbG9uZyB3aXRoIGJhYnkgYWRkaXRpb24gYW5kIGRlbGV0aW9uXG4qZG9uZTogTm90IGJhYnkgY2VudHJpY1xuKiBsb2dvXG4gICAgKiBsb2FkaW5nXG4qIGZsdXggcmVmYWN0b3JcbiogZm9ybSByZWZhY3RvclxuICAgICpkb25lOiBhdXRvIHVwZGF0ZTogYmFieSwgY29udHJvbGxlZCBpbnB1dCBvbmNoYW5nZS0+c2V0U3RhdGUtPm9uQmx1ci0+dXBzZXJ0XG4qIEZhbWlseSBsaXN0IFVJXG4gICAgKiByZW1vdmUtPmRhc2hib2FyZC0+ZmFtaWx5IGxpc3Q6IHNldFN0YXRlIHdhcm5pbmcsIG5vdCBwdXJlIHJlbmRlcj9cbiogY2hhbmdlIGNoaWxkIG5hbWUgLT5zaG9ydGN1dCBuYW1lIHNob3VsZCBiZSBjaGFuZ2VkIGFjY29yZGluZ2x5XG4qL1xuIl19