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

        Object.assign(_this.state, { baby: null });
        _db.Family.event.on('change', function (baby) {
            return _this.setState({ baby: baby });
        });
        return _this;
    }

    _createClass(SuperDaddy, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var route = this.props.children.props.route.name;

            if (route == "baby" && nextState.baby != this.state.baby) return false;

            return true;
        }
    }, {
        key: 'renderContent',
        value: function renderContent() {
            var _this2 = this;

            var baby = this.state.baby;
            var child = this.props.children;
            var route = child.props.route;


            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(CurrentChild, { child: baby, name: baby.name, mini: true,
                    show: route.floatingButton === false ? false : true,
                    onChange: function onChange(target) {
                        _db.Family.currentChild = target;
                        if (route.name == "baby") _this2.context.router.push({ pathname: 'baby/' + target.name });
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
            var style = _props$style === undefined ? { position: "absolute", zIndex: 9 } : _props$style;
            var others = _objectWithoutProperties(_props, ['child', 'show', 'style']);var avatar;

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
                _extends({ className: 'sticky top right',
                    style: style
                }, others, {
                    onClick: function onClick(e) {
                        return _this4.change();
                    } }),
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
    _qiliApp.React.createElement(_reactRouter.IndexRoute, { component: _dashboard2.default }),
    _qiliApp.React.createElement(
        _reactRouter.Route,
        { path: 'dashboard', component: _dashboard2.default },
        _qiliApp.React.createElement(_reactRouter.IndexRoute, null),
        _qiliApp.React.createElement(_reactRouter.Route, { path: ':when' })
    ),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby/:name', name: 'baby', component: _baby2.default }),
    _qiliApp.React.createElement(_reactRouter.Route, { path: 'baby', floatingButton: false, component: _baby2.default.Creator,
        onEnter: function onEnter(nextState, replace) {
            _db.Family.currentChild = {};
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
//# sourceMappingURL=data:application/json;base64,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Z0JHLG1EQUFPLE1BQUssWUFBTCxFQUFrQixpQ0FBekIsQ0FoQkg7SUFpQkc7O1VBQU8sTUFBSyxXQUFMLEVBQVA7UUFDSSx3REFBWSxnQkFBZ0IsS0FBaEIsRUFBdUIsbUNBQW5DLENBREo7UUFFSSxtREFBTyxNQUFLLE1BQUwsRUFBWSxnQ0FBbkIsQ0FGSjtLQWpCSDtJQXNCRyxtREFBTyxNQUFLLG9CQUFMLEVBQTBCLFdBQVcsT0FBWCxFQUFqQyxDQXRCSDtJQXdCRyxtREFBTyxnQkFBZ0IsS0FBaEIsRUFBdUIsTUFBSyxTQUFMLEVBQWUsOEJBQTdDLENBeEJIO0lBMEJHOztVQUFPLGdCQUFnQixLQUFoQixFQUF1QixNQUFLLFNBQUwsRUFBOUI7UUFDTCx3REFBYSw4QkFBYixDQURLO0tBMUJIO0lBK0JIOztVQUFPLE1BQUssTUFBTCxFQUFZLDJCQUFuQjtRQUNVLDJEQURWO1FBRVUsbURBQU8sTUFBSyxNQUFMLEVBQVAsQ0FGVjtLQS9CRztJQW9DRzs7VUFBTyxNQUFLLFNBQUwsRUFBZSxNQUFLLFNBQUwsRUFBZSw4QkFBckM7UUFDSSx3REFBWSxRQUFRLEVBQUMsTUFBSyxLQUFMLEVBQVQsRUFBWixDQURKO1FBRUksbURBQU8sTUFBSyxPQUFMLEVBQVAsQ0FGSjtLQXBDSDtDQURVLEVBMENEO0FBQ1osMENBQWMsV0FBVyxPQUFNO0FBQzlCLFlBQUcsYUFBVyxVQUFYLEVBQXNCOzs7QUFDcEIsNEJBQU0sTUFBTSxRQUFOO21DQUNPLE1BQU0sS0FBTjtvQkFBZDtvQkFBTTs7O0FBRVQsb0JBQUcsTUFBTSxJQUFOLElBQVksTUFBWixFQUNGLE1BQU0sSUFBTixHQUFXOzJCQUFHLGNBQUssT0FBTyxJQUFQO2lCQUFSLENBRFo7aUJBSndCO1NBQXpCO0FBT0EsZUFBTyw2QkFBQyxTQUFELEVBQWUsS0FBZixDQUFQLENBUjhCO0tBRG5CO0NBMUNDLENBQWYiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJyZXF1aXJlKCcuLi9zdHlsZS9pbmRleC5sZXNzJylcblxuaW1wb3J0IHtSb3V0ZSwgSW5kZXhSb3V0ZSwgRGlyZWN0LCBJbmRleFJlZGlyZWN0fSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcbmltcG9ydCB7VXNlcixSZWFjdCxDb21wb25lbnQsUWlsaUFwcCwgVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtNZW51SXRlbSwgRmxvYXRpbmdBY3Rpb25CdXR0b24sIEF2YXRhcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5cbmltcG9ydCB7RmFtaWx5LEtub3dsZWRnZSxUYWJsZSxpbml0fSBmcm9tICcuL2RiJ1xuXG5jb25zdCB7RW1wdHksIENvbW1lbnR9PVVJXG5cbmNsYXNzIFN1cGVyRGFkZHkgZXh0ZW5kcyBRaWxpQXBwe1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSx7YmFieTpudWxsfSlcbiAgICAgICAgRmFtaWx5LmV2ZW50Lm9uKCdjaGFuZ2UnLGJhYnk9PnRoaXMuc2V0U3RhdGUoe2JhYnl9KSlcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpe1xuICAgICAgICBsZXQge25hbWU6cm91dGV9PXRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMucm91dGVcbiAgICAgICAgaWYocm91dGU9PVwiYmFieVwiICYmIG5leHRTdGF0ZS5iYWJ5IT10aGlzLnN0YXRlLmJhYnkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHtiYWJ5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICAse2NoaWxkcmVuOmNoaWxkfT10aGlzLnByb3BzXG4gICAgICAgICAgICAse3JvdXRlfT1jaGlsZC5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgPEN1cnJlbnRDaGlsZCBjaGlsZD17YmFieX0gbmFtZT17YmFieS5uYW1lfSBtaW5pPXt0cnVlfVxuXHRcdFx0XHRzaG93PXtyb3V0ZS5mbG9hdGluZ0J1dHRvbj09PWZhbHNlID8gZmFsc2UgOiB0cnVlfVxuXHRcdFx0XHRvbkNoYW5nZT17dGFyZ2V0PT57XG4gICAgICAgICAgICAgICAgICAgIEZhbWlseS5jdXJyZW50Q2hpbGQ9dGFyZ2V0XG4gICAgICAgICAgICAgICAgICAgIGlmKHJvdXRlLm5hbWU9PVwiYmFieVwiKVxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goe3BhdGhuYW1lOmBiYWJ5LyR7dGFyZ2V0Lm5hbWV9YH0pXG4gICAgICAgICAgICAgICB9fS8+XG4gICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLHtjaGlsZDpiYWJ5fSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBzdGF0aWMgY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cbn1cblxuT2JqZWN0LmFzc2lnbihTdXBlckRhZGR5LmRlZmF1bHRQcm9wcyx7XG4gICAgYXBwSWQ6XCI1NzQ2YjJjNWU0YmIzYjM3MDBhZTE1NjZcIixcbiAgICBpbml0OigpPT5pbml0KClcbn0pXG5cbmNsYXNzIEN1cnJlbnRDaGlsZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZCwgc2hvdywgc3R5bGU9e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIiwgekluZGV4Ojl9LCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsIGF2YXRhclxuXG4gICAgICAgIGlmKGNoaWxkLnBob3RvKVxuICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17dGhpcy5wcm9wcy5jaGlsZC5waG90b30vPilcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYXZhdGFyPSg8ZGl2PjxzcGFuIHN0eWxlPXt7Zm9udFNpemU6XCJ4eC1zbWFsbFwifX0+e3RoaXMubGFzdE5hbWU9Y2hpbGQubmFtZX08L3NwYW4+PC9kaXY+KVxuXG5cdFx0aWYoIXNob3cpXG5cdFx0XHRzdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uIGNsYXNzTmFtZT1cInN0aWNreSB0b3AgcmlnaHRcIlxuXHRcdFx0XHRzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgey4uLm90aGVyc31cblx0XHRcdFx0b25DbGljaz17ZT0+dGhpcy5jaGFuZ2UoKX0+XG4gICAgICAgICAgICAgICAge2F2YXRhcn1cbiAgICAgICAgICAgIDwvRmxvYXRpbmdBY3Rpb25CdXR0b24+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKXtcblx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGxldCB7bmFtZTp0YXJnZXQsIG9wZW46dGFyZ2V0T3Blbn09bmV4dFByb3BzLFxuXHRcdFx0e25hbWUsIG9wZW59PXRoaXMucHJvcHNcblxuICAgICAgICByZXR1cm4gdGFyZ2V0IT1uYW1lIHx8IHRhcmdldE9wZW4hPW9wZW5cbiAgICB9XG5cbiAgICBjaGFuZ2UoKXtcbiAgICAgICAgdmFyIGN1cnJlbnQ9dGhpcy5wcm9wcy5jaGlsZCxcbiAgICAgICAgICAgIGNoaWxkcmVuPUZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGg7XG4gICAgICAgIGlmKGxlbjwyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBpbmRleD1jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXG4gICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoY2hpbGRyZW5bKGluZGV4KzEpICUgbGVuXSlcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmltcG9ydCBUYXNrVUkgZnJvbSAnLi90YXNrJ1xuaW1wb3J0IEJhYnlVSSBmcm9tICcuL2JhYnknXG5pbXBvcnQgS25vd2xlZGdlc1VJIGZyb20gJy4va25vd2xlZGdlcydcbmltcG9ydCBLbm93bGVkZ2VVSSBmcm9tICcuL2tub3dsZWRnZSdcbmltcG9ydCBOZXdLbm93bGVkZ2VVSSBmcm9tICcuL25ld0tub3dsZWRnZSdcbmltcG9ydCBBY2NvdW50VUkgZnJvbSAnLi9hY2NvdW50J1xuaW1wb3J0IFNldHRpbmdVSSBmcm9tICcuL3NldHRpbmcnXG5pbXBvcnQgUHVibGlzaFVJIGZyb20gJy4vcHVibGlzaCdcbmltcG9ydCBEYXNoYm9hcmQgZnJvbSBcIi4vZGFzaGJvYXJkXCJcblxubW9kdWxlLmV4cG9ydHM9UWlsaUFwcC5yZW5kZXIoXG4gICAgKDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17U3VwZXJEYWRkeX0+XG5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtEYXNoYm9hcmR9Lz5cblxuXHRcdDxSb3V0ZSBwYXRoPVwiZGFzaGJvYXJkXCIgY29tcG9uZW50PXtEYXNoYm9hcmR9PlxuICAgICAgICAgICAgPEluZGV4Um91dGUvPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6d2hlblwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImJhYnkvOm5hbWVcIiBuYW1lPVwiYmFieVwiIGNvbXBvbmVudD17QmFieVVJfS8+XG5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJiYWJ5XCIgZmxvYXRpbmdCdXR0b249e2ZhbHNlfSBjb21wb25lbnQ9e0JhYnlVSS5DcmVhdG9yfVxuXHRcdFx0b25FbnRlcj17KG5leHRTdGF0ZSwgcmVwbGFjZSk9Pntcblx0XHRcdFx0RmFtaWx5LmN1cnJlbnRDaGlsZD17fVxuXHRcdFx0fX0vPlxuXG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlc1wiIGNvbXBvbmVudD17S25vd2xlZGdlc1VJfS8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICA8SW5kZXhSb3V0ZSBmbG9hdGluZ0J1dHRvbj17ZmFsc2V9IGNvbXBvbmVudD17TmV3S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiIGNvbXBvbmVudD17S25vd2xlZGdlVUl9Lz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgcGF0aD1cImNvbW1lbnQvOnR5cGUvOl9pZFwiIGNvbXBvbmVudD17Q29tbWVudH0vPlxuXG4gICAgICAgIDxSb3V0ZSBmbG9hdGluZ0J1dHRvbj17ZmFsc2V9IHBhdGg9XCJhY2NvdW50XCIgY29tcG9uZW50PXtBY2NvdW50VUl9IC8+XG5cbiAgICAgICAgPFJvdXRlIGZsb2F0aW5nQnV0dG9uPXtmYWxzZX0gcGF0aD1cInNldHRpbmdcIj5cblx0XHRcdDxJbmRleFJvdXRlICBjb21wb25lbnQ9e1NldHRpbmdVSX0vPlxuXHRcdDwvUm91dGU+XG5cblxuXHRcdDxSb3V0ZSBwYXRoPVwidGFza1wiIGNvbXBvbmVudD17VGFza1VJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlLz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOl9pZFwiLz5cbiAgICAgICAgPC9Sb3V0ZT5cblxuICAgICAgICA8Um91dGUgbmFtZT1cInB1Ymxpc2hcIiBwYXRoPVwicHVibGlzaFwiIGNvbXBvbmVudD17UHVibGlzaFVJfT5cbiAgICAgICAgICAgIDxJbmRleFJvdXRlIHBhcmFtcz17e3doYXQ6XCJhbGxcIn19Lz5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOndoYXRcIi8+XG4gICAgICAgIDwvUm91dGU+XG5cbiAgICA8L1JvdXRlPikse1xuXHRcdGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBwcm9wcyl7XG5cdFx0XHRpZihDb21wb25lbnQ9PVN1cGVyRGFkZHkpey8vcmVmcmVzaCBiYWJ5IHBhZ2Vcblx0XHRcdFx0bGV0IGNoaWxkPXByb3BzLmNoaWxkcmVuXG5cdFx0XHRcdFx0LHtyb3V0ZSxwYXJhbXN9PWNoaWxkLnByb3BzXG5cblx0XHRcdFx0aWYocm91dGUubmFtZT09XCJiYWJ5XCIpXG5cdFx0XHRcdFx0cHJvcHMuaW5pdD1hPT5pbml0KHBhcmFtcy5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfS8+XG5cdFx0fVxuXHR9XG4pXG5cblxuLyoqXG4qIHF1aWNrQWN0aW9uIHBvc2l0aW9uIGRvZXNuJ3QgY2hhbmdlIHdoZW4gcmVzaXppbmdcbiogc2VydmVyIHJlbmRlciByZWFkeVxuICAgICogZG9tIGFuZCBkYXRhIHJldHJpZXZpbmcgZnJvbSBzZXJ2ZXIgc2hvdWxkIGJlIGluIGNvbXBvbmVudERpZE1vdW50XG4qIGltbXV0YWJsZSBzZXRTdGF0ZSB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4qZG9uZTogYmFieSBmZWF0dXJlXG4gICAgKiBjcmVhdGUgZmlyc3QgYmFieVxuICAgICogZGVsZXRlIGxhc3QgYmFieVxuICAgICogY3JlYXRlIGJhYnlcbiAgICAqIGRlbGV0ZSBiYWJ5XG4gICAgKiBGYW1pbHkgbGlzdCB1cGRhdGUgYWxvbmcgd2l0aCBiYWJ5IGFkZGl0aW9uIGFuZCBkZWxldGlvblxuKmRvbmU6IE5vdCBiYWJ5IGNlbnRyaWNcbiogbG9nb1xuICAgICogbG9hZGluZ1xuKiBmbHV4IHJlZmFjdG9yXG4qIGZvcm0gcmVmYWN0b3JcbiAgICAqZG9uZTogYXV0byB1cGRhdGU6IGJhYnksIGNvbnRyb2xsZWQgaW5wdXQgb25jaGFuZ2UtPnNldFN0YXRlLT5vbkJsdXItPnVwc2VydFxuKiBGYW1pbHkgbGlzdCBVSVxuICAgICogcmVtb3ZlLT5kYXNoYm9hcmQtPmZhbWlseSBsaXN0OiBzZXRTdGF0ZSB3YXJuaW5nLCBub3QgcHVyZSByZW5kZXI/XG4qIGNoYW5nZSBjaGlsZCBuYW1lIC0+c2hvcnRjdXQgbmFtZSBzaG91bGQgYmUgY2hhbmdlZCBhY2NvcmRpbmdseVxuKi9cbiJdfQ==