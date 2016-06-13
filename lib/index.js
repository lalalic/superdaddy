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
var Comment = _qiliApp.UI.Comment;

var SuperDaddy = function (_QiliApp) {
    _inherits(SuperDaddy, _QiliApp);

    function SuperDaddy(props) {
        _classCallCheck(this, SuperDaddy);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuperDaddy).call(this, props));

        Object.assign(_this.state, { baby: _this.props.child });
        _db.Family.event.on('change', function (baby) {
            return _this.setState({ baby: baby });
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
                _qiliApp.React.createElement(CurrentChild, { child: baby, name: baby.name,
                    show: route.floatingButton === false ? false : true,
                    onChange: function onChange(target) {
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
            var child = _props.child;
            var show = _props.show;
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

            if (!show) style.display = "none";

            return _qiliApp.React.createElement(
                _materialUi.FloatingActionButton,
                { className: 'sticky top right',
                    style: style,
                    onClick: function onClick(e) {
                        return _this4.change();
                    } },
                avatar
            );
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return true;
            var target = nextProps.name;
            var targetOpen = nextProps.open;
            var _props2 = this.props;
            var name = _props2.name;
            var open = _props2.open;


            return target != name || targetOpen != open;
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
    _qiliApp.React.createElement(_reactRouter.IndexRedirect, { to: 'dashboard' }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'dashboard', component: _dashboard2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRedirect, { to: 'today' }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':when' })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby/:name', name: 'baby', component: _baby2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', floatingButton: false, component: _baby2.default,
        onEnter: function onEnter(nextState, replace, callback) {
            _db.Family.currentChild = {};
            callback();
        } }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'knowledges', component: _knowledges2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'knowledge' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { floatingButton: false, component: _newKnowledge2.default }),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id', component: _knowledge2.default })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'comment/:type/:_id', component: Comment }),
    _qiliApp.React.createElement(_reactRouter.Route, { floatingButton: false, path: 'account', component: _account2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { floatingButton: false, path: 'setting' },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _setting2.default })
    ),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'task', component: _task2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, null),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':_id' })
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
//# sourceMappingURL=data:application/json;base64,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SDtJQXNCRyxtREFBTyxnQkFBZ0IsS0FBaEIsRUFBdUIsTUFBSyxTQUFMLEVBQWUsOEJBQTdDLENBdEJIO0lBd0JHOztVQUFPLGdCQUFnQixLQUFoQixFQUF1QixNQUFLLFNBQUwsRUFBOUI7UUFDTCx3REFBYSw4QkFBYixDQURLO0tBeEJIO0lBNkJIOztVQUFPLE1BQUssTUFBTCxFQUFZLDJCQUFuQjtRQUNVLDJEQURWO1FBRVUsbURBQU8sTUFBSyxNQUFMLEVBQVAsQ0FGVjtLQTdCRztJQWtDRzs7VUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFNBQUwsRUFBZSw4QkFBckM7UUFDSSx3REFBWSxRQUFRLEVBQUMsTUFBSyxLQUFMLEVBQVQsRUFBWixDQURKO1FBRUksbURBQU8sTUFBSyxPQUFMLEVBQVAsQ0FGSjtLQWxDSDtDQURVLEVBd0NEO0FBQ1osMENBQWMsV0FBVyxPQUFNO0FBQzlCLFlBQUcsYUFBVyxVQUFYLEVBQXNCOzs7QUFDcEIsNEJBQU0sTUFBTSxRQUFOO21DQUNPLE1BQU0sS0FBTjtvQkFBZDtvQkFBTTs7O0FBRVQsb0JBQUcsTUFBTSxJQUFOLElBQVksTUFBWixFQUNGLE1BQU0sSUFBTixHQUFXOzJCQUFHLGNBQUssT0FBTyxJQUFQO2lCQUFSLENBRFo7aUJBSndCO1NBQXpCO0FBT0EsZUFBTyw2QkFBQyxTQUFELEVBQWUsS0FBZixDQUFQLENBUjhCO0tBRG5CO0NBeENDLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5jb25zdCB7RW1wdHksIENvbW1lbnR9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7YmFieTp0aGlzLnByb3BzLmNoaWxkfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLGJhYnk9PnRoaXMuc2V0U3RhdGUoe2JhYnl9KSlcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7YmFieX09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgLHtjaGlsZHJlbjpjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICAgICAgLHtyb3V0ZX09Y2hpbGQucHJvcHNcblx0XHRcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICA8Q3VycmVudENoaWxkIGNoaWxkPXtiYWJ5fSBuYW1lPXtiYWJ5Lm5hbWV9IFxuXHRcdFx0XHRzaG93PXtyb3V0ZS5mbG9hdGluZ0J1dHRvbj09PWZhbHNlID8gZmFsc2UgOiB0cnVlfSBcblx0XHRcdFx0b25DaGFuZ2U9e3RhcmdldD0+e1xuICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLm5hbWU9PVwiYmFieVwiKVxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goYGJhYnkvJHt0YXJnZXQubmFtZX1gKVxuICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgRmFtaWx5LmN1cnJlbnRDaGlsZD10YXJnZXRcbiAgICAgICAgICAgICAgIH19Lz5cbiAgICAgICAgICAgICAgIHtSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQse2NoaWxkOmJhYnl9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5PYmplY3QuYXNzaWduKFN1cGVyRGFkZHkuZGVmYXVsdFByb3BzLHtcbiAgICBhcHBJZDpcIjU3NDZiMmM1ZTRiYjNiMzcwMGFlMTU2NlwiLFxuICAgIGluaXQ6KCk9PmluaXQoKVxufSlcblxuY2xhc3MgQ3VycmVudENoaWxkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkLCBzaG93LCBzdHlsZT17cG9zaXRpb246XCJhYnNvbHV0ZVwiLCB6SW5kZXg6OX19PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG5cdFx0aWYoIXNob3cpXG5cdFx0XHRzdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cdFx0XG4gICAgICAgIHJldHVybihcbiAgICAgICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvbiBjbGFzc05hbWU9XCJzdGlja3kgdG9wIHJpZ2h0XCIgXG5cdFx0XHRcdHN0eWxlPXtzdHlsZX1cblx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2F2YXRhcn1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKXtcblx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGxldCB7bmFtZTp0YXJnZXQsIG9wZW46dGFyZ2V0T3Blbn09bmV4dFByb3BzLFxuXHRcdFx0e25hbWUsIG9wZW59PXRoaXMucHJvcHNcblx0XHRcdFxuICAgICAgICByZXR1cm4gdGFyZ2V0IT1uYW1lIHx8IHRhcmdldE9wZW4hPW9wZW5cbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXSlcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSBmcm9tICcuL2JhYnknXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17U3VwZXJEYWRkeX0+XG4gICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiZGFzaGJvYXJkXCIvPlxuXHRcdDxSb3V0ZSBwYXRoPVwiZGFzaGJvYXJkXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9PlxuICAgICAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCJ0b2RheVwiLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoZW5cIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJiYWJ5LzpuYW1lXCIgbmFtZT1cImJhYnlcIiBjb21wb25lbnQ9e0JhYnlVSX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnlcIiBmbG9hdGluZ0J1dHRvbj17ZmFsc2V9IGNvbXBvbmVudD17QmFieVVJfSBcblx0XHRcdG9uRW50ZXI9eyhuZXh0U3RhdGUsIHJlcGxhY2UsIGNhbGxiYWNrKT0+e1xuXHRcdFx0XHRGYW1pbHkuY3VycmVudENoaWxkPXt9XG5cdFx0XHRcdGNhbGxiYWNrKClcblx0XHRcdH19Lz5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZXNcIiBjb21wb25lbnQ9e0tub3dsZWRnZXNVSX0vPlxuICAgICAgICA8Um91dGUgcGF0aD1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgPEluZGV4Um91dGUgZmxvYXRpbmdCdXR0b249e2ZhbHNlfSBjb21wb25lbnQ9e05ld0tub3dsZWRnZVVJfS8+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjpfaWRcIiBjb21wb25lbnQ9e0tub3dsZWRnZVVJfS8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJjb21tZW50Lzp0eXBlLzpfaWRcIiBjb21wb25lbnQ9e0NvbW1lbnR9Lz5cblxuICAgICAgICA8Um91dGUgZmxvYXRpbmdCdXR0b249e2ZhbHNlfSBwYXRoPVwiYWNjb3VudFwiIGNvbXBvbmVudD17QWNjb3VudFVJfSAvPlxuXHRcdFxuICAgICAgICA8Um91dGUgZmxvYXRpbmdCdXR0b249e2ZhbHNlfSBwYXRoPVwic2V0dGluZ1wiPlxuXHRcdFx0PEluZGV4Um91dGUgIGNvbXBvbmVudD17U2V0dGluZ1VJfS8+XG5cdFx0PC9Sb3V0ZT5cblx0XHRcbiAgICAgICAgXG5cdFx0PFJvdXRlIHBhdGg9XCJ0YXNrXCIgY29tcG9uZW50PXtUYXNrVUl9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6X2lkXCIvPlxuICAgICAgICA8L1JvdXRlPlxuXHRcdFxuICAgICAgICA8Um91dGUgbmFtZT1cInB1Ymxpc2hcIiBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doYXQ6XCJhbGxcIn19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==