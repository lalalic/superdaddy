'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BabyDashboard = exports.AuthorDashboard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

var _accountBox = require('material-ui/svg-icons/action/account-box');

var _accountBox2 = _interopRequireDefault(_accountBox);

var _formatListNumbered = require('material-ui/svg-icons/editor/format-list-numbered');

var _formatListNumbered2 = _interopRequireDefault(_formatListNumbered);

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _rewards = require('./components/rewards');

var _rewards2 = _interopRequireDefault(_rewards);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Empty = _qiliApp.UI.Empty;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var Photo = _qiliApp.UI.Photo;
var Messager = _qiliApp.UI.Messager;
var Icons = _qiliApp.UI.Icons;
var DialogCommand = CommandBar.DialogCommand;

var Dashboard = function (_Component) {
    _inherits(Dashboard, _Component);

    function Dashboard() {
        _classCallCheck(this, Dashboard);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
    }

    _createClass(Dashboard, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return nextProps.child != this.props.child;
        }
    }, {
        key: 'render',
        value: function render() {
            var child = this.props.child;

            return child ? _qiliApp.React.createElement(BabyDashboard, this.props) : _qiliApp.React.createElement(AuthorDashboard, this.props);
        }
    }]);

    return Dashboard;
}(_qiliApp.Component);

/**
@without currentChild
*/


exports.default = Dashboard;

var AuthorDashboard = exports.AuthorDashboard = function (_Component2) {
    _inherits(AuthorDashboard, _Component2);

    function AuthorDashboard() {
        _classCallCheck(this, AuthorDashboard);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AuthorDashboard).apply(this, arguments));
    }

    _createClass(AuthorDashboard, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(Empty, { text: 'Start from your first baby, or walk around!',
                    icon: _qiliApp.React.createElement(_logo2.default, null),
                    onClick: function onClick() {
                        return _this3.context.router.push("baby");
                    } }),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: 'Family',

                    items: [{ action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this3.context.router.push('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this3.context.router.push('account');
                        },
                        icon: _accountBox2.default }]
                })
            );
        }
    }]);

    return AuthorDashboard;
}(_qiliApp.Component);

AuthorDashboard.contextTypes = { router: _qiliApp.React.PropTypes.object };

/**
@ with currentChild
*/

var BabyDashboard = exports.BabyDashboard = function (_Component3) {
    _inherits(BabyDashboard, _Component3);

    function BabyDashboard() {
        _classCallCheck(this, BabyDashboard);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(BabyDashboard).apply(this, arguments));

        _this4.state = _this4._resolveModel();
        return _this4;
    }

    _createClass(BabyDashboard, [{
        key: '_resolveModel',
        value: function _resolveModel(props) {
            var today = new Date();

            var _ref = props || this.props;

            var _ref$params$when = _ref.params.when;
            var when = _ref$params$when === undefined ? today : _ref$params$when;

            when = this._parseDate(when);
            var model = when == 'approvings' ? _db.Task.approvings() : _db.Task.byDate(when);
            return { when: when, model: model };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var today = new Date();
            var nextChild = nextProps.nextChild;
            var _nextProps$params$nex = nextProps.params.nextWhen;
            var nextWhen = _nextProps$params$nex === undefined ? today : _nextProps$params$nex;
            var _props = this.props;
            var child = _props.child;
            var _props$params$when = _props.params.when;
            var when = _props$params$when === undefined ? today : _props$params$when;

            if (nextChild != child || nextWhen.getTime() != when.getTime()) this.setState(this._resolveModel(nextProps));
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _state = this.state;
            var when = _state.when;
            var model = _state.model;
            var child = this.props.child;

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(_rewards2.default, { child: child }),
                _qiliApp.React.createElement(
                    'div',
                    { className: 'page' },
                    this.renderContent(when)
                ),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: 'Knowledges',
                    items: [{ action: "Task",
                        onSelect: function onSelect() {
                            return _this5.refs.task.show();
                        },
                        icon: _formatListNumbered2.default }, { action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this5.context.router.push('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this5.context.router.push('account');
                        },
                        icon: _accountBox2.default }]
                }),
                _qiliApp.React.createElement(TaskQueryCommand, { ref: 'task', when: when,
                    onChange: function onChange(d) {
                        return _this5.context.router.push('dashboard/' + _this5._format(d));
                    } })
            );
        }
    }, {
        key: 'renderContent',
        value: function renderContent(when) {
            var _this6 = this;

            var child = this.props.child;
            var model = this.state.model;
            var headerStyle = {
                height: 100,
                backgroundColor: 'darkorange',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'left',
                fontSize: "xx-large",
                padding: 10,
                margin: 0
            };
            var props = { model: model, headerStyle: headerStyle };

            if ('approvings' == when) {
                Object.assign(props, {
                    subheader: "Approvings",
                    template: ProvingItem,
                    empty: _qiliApp.React.createElement(Empty, { text: 'Nobody played with your children!',
                        icon: _qiliApp.React.createElement(_logo2.default, null) })
                });
            } else {
                var d = Math.floor((Date.now() - when.getTime()) / (1000 * 24 * 60 * 60));
                Object.assign(props, {
                    subheader: this._format(when),
                    template: TaskItem,
                    empty: d > 0 ? _qiliApp.React.createElement(Empty, { text: 'You didnot play with ' + child.name,
                        icon: _qiliApp.React.createElement(_logo2.default, null) }) : _qiliApp.React.createElement(Empty, { text: 'Find fun topic NOW to play with ' + child.name + ' ',
                        icon: _qiliApp.React.createElement(_logo2.default, null),
                        onTouchTap: function onTouchTap() {
                            return _this6.context.router.push('knowledges');
                        } })
                });
            }

            return _qiliApp.React.createElement(List, props);
        }
    }, {
        key: '_format',
        value: function _format(d) {
            switch (Math.floor((Date.now() - d.getTime()) / (1000 * 24 * 60 * 60))) {
                case 0:
                    return 'Today';
                case 1:
                    return 'Yesterday';
                case -1:
                    return 'Tomorrow';
            }
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        }
    }, {
        key: '_parseDate',
        value: function _parseDate(when) {
            if (typeof when != 'string') {
                when.setHours(0, 0, 0, 0);
                return when;
            }
            var today = new Date();
            today.setHours(0, 0, 0, 0);
            switch (when.toLowerCase()) {
                case 'approvings':
                    return 'approvings';
                case 'today':
                    return today;
                case 'yesterday':
                    return (0, _calendar.addDays)(today, -1);
                case 'tomorrow':
                    return (0, _calendar.addDays)(today, 1);
                default:
                    when = new Date(Date.parse(when));
                    when.setHours(0, 0, 0, 0);
                    return when;
            }
        }
    }]);

    return BabyDashboard;
}(_qiliApp.Component);

BabyDashboard.contextTypes = { router: _qiliApp.React.PropTypes.object };

var TaskItem = function (_Component4) {
    _inherits(TaskItem, _Component4);

    function TaskItem() {
        _classCallCheck(this, TaskItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TaskItem).apply(this, arguments));
    }

    _createClass(TaskItem, [{
        key: 'render',
        value: function render() {
            var _props2 = this.props;
            var task = _props2.model;
            var image = _props2.image;
            var actions = _props2.actions;
            var others = _objectWithoutProperties(_props2, ['model', 'image', 'actions']);
            var knowledge = task.knowledge;

            return _qiliApp.React.createElement(
                'div',
                { className: 'li' },
                _qiliApp.React.createElement(
                    'div',
                    { className: 'content', onClick: this.onDetail.bind(this) },
                    _qiliApp.React.createElement(
                        'div',
                        null,
                        _qiliApp.React.createElement(
                            'h4',
                            null,
                            task.knowledge.title
                        )
                    ),
                    _qiliApp.React.createElement(
                        'div',
                        { className: 'photo' },
                        _qiliApp.React.createElement('img', { src: task.photo || image })
                    )
                )
            );
        }
    }, {
        key: 'onDetail',
        value: function onDetail() {
            this.context.router.push('task', this.props.model);
        }
    }]);

    return TaskItem;
}(_qiliApp.Component);

TaskItem.defaultProps = {
    image: "images/task.jpg"
};

var ProvingItem = function (_TaskItem) {
    _inherits(ProvingItem, _TaskItem);

    function ProvingItem() {
        _classCallCheck(this, ProvingItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ProvingItem).apply(this, arguments));
    }

    return ProvingItem;
}(TaskItem);

var TaskQueryCommand = function (_DialogCommand) {
    _inherits(TaskQueryCommand, _DialogCommand);

    function TaskQueryCommand() {
        _classCallCheck(this, TaskQueryCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TaskQueryCommand).apply(this, arguments));
    }

    _createClass(TaskQueryCommand, [{
        key: 'renderContent',
        value: function renderContent() {
            var _props3 = this.props;
            var when = _props3.when;
            var onChange = _props3.onChange;
            var displayDate = when;
            when == 'approvings' && (displayDate = new Date(), when = null);
            when && when.setHours(0, 0, 0, 0);
            displayDate && displayDate.setHours(0, 0, 0, 0);

            return [_qiliApp.React.createElement(
                List,
                { key: 'others' },
                _qiliApp.React.createElement(
                    List.Item,
                    {
                        leftAvatar: _qiliApp.React.createElement(
                            _materialUi.Avatar,
                            null,
                            'A'
                        ),
                        onClick: function onClick() {
                            return onChange("approvings");
                        },
                        secondaryText: 'Other families played, need your approval'
                    },
                    'Approvings'
                ),
                _qiliApp.React.createElement(List.Divider, null)
            ), _qiliApp.React.createElement(
                'div',
                { key: 'calendar' },
                _qiliApp.React.createElement(_calendar2.default, {
                    selected: when,
                    displayDate: displayDate,
                    minDate: (0, _calendar.addDays)(displayDate, -31),
                    maxDate: (0, _calendar.addDays)(displayDate, 31),
                    onDayTouchTap: onChange
                })
            )];
        }
    }]);

    return TaskQueryCommand;
}(DialogCommand);
//# sourceMappingURL=data:application/json;base64,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a0JBQU0sS0FBSSxRQUFKLEVBQU47Z0JBQ0c7QUFBQyx5QkFBSyxJQUFOOztBQUNJLG9DQUFhOzs7O3lCQUFiO0FBQ0EsaUNBQVM7bUNBQUksU0FBUyxZQUFUO3lCQUFKO0FBQ1QsdUNBQWMsMkNBQWQ7cUJBSEo7O2lCQURIO2dCQVFHLDZCQUFDLEtBQUssT0FBTixPQVJIO2FBQUYsRUFVRTs7a0JBQUssS0FBSSxVQUFKLEVBQUw7Z0JBQ0k7QUFDRyw4QkFBVSxJQUFWO0FBQ0EsaUNBQWEsV0FBYjtBQUNBLDZCQUFTLHVCQUFRLFdBQVIsRUFBb0IsQ0FBQyxFQUFELENBQTdCO0FBQ0EsNkJBQVMsdUJBQVEsV0FBUixFQUFvQixFQUFwQixDQUFUO0FBQ0EsbUNBQWUsUUFBZjtpQkFMSCxDQURKO2FBVkYsQ0FBUCxDQVBXOzs7O1dBRGI7RUFBeUIiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVUl9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtBdmF0YXIsUGFwZXIsIFJhZGlvR3JvdXAsIFJhZGlvQnV0dG9uLEZvbnRJY29uLEljb25CdXR0b24sVGV4dEZpZWxkLCBUYWJzLCBUYWIsIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcbmltcG9ydCBJY29uQWNjb3VudCBmcm9tICdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94J1xuaW1wb3J0IEljb25UYXNrIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCJcblxuaW1wb3J0IHtUYXNrIGFzIGRiVGFzayxGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgQ2FsZW5kYXIsIHthZGREYXlzfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgUmV3YXJkcyBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIEVtcHR5LENvbW1lbnQsQ29tbWFuZEJhcixQaG90byxNZXNzYWdlcixJY29uc309VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGRcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gKDxCYWJ5RGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfSAvPikgOiAoPEF1dGhvckRhc2hib2FyZCB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG59XG5cbi8qKlxuQHdpdGhvdXQgY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhvckRhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IHRleHQ9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSwgb3Igd2FsayBhcm91bmQhXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImJhYnlcIil9Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIkZhbWlseVwiXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IEljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG59XG5BdXRob3JEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuLyoqXG5AIHdpdGggY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEJhYnlEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9dGhpcy5fcmVzb2x2ZU1vZGVsKClcblx0fVxuXG4gICAgX3Jlc29sdmVNb2RlbChwcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge3BhcmFtczp7d2hlbj10b2RheX19PXByb3BzfHx0aGlzLnByb3BzO1xuICAgICAgICB3aGVuPXRoaXMuX3BhcnNlRGF0ZSh3aGVuKVxuICAgICAgICB2YXIgbW9kZWw9d2hlbj09J2FwcHJvdmluZ3MnID8gZGJUYXNrLmFwcHJvdmluZ3MoKSA6IGRiVGFzay5ieURhdGUod2hlbilcbiAgICAgICAgcmV0dXJuIHt3aGVuLCBtb2RlbH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge25leHRDaGlsZCwgcGFyYW1zOntuZXh0V2hlbj10b2RheX19PW5leHRQcm9wcyxcbiAgICAgICAgICAgIHtjaGlsZCwgcGFyYW1zOnt3aGVuPXRvZGF5fX09dGhpcy5wcm9wc1xuICAgICAgICBpZiAobmV4dENoaWxkIT1jaGlsZCB8fCBuZXh0V2hlbi5nZXRUaW1lKCkhPXdoZW4uZ2V0VGltZSgpKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9yZXNvbHZlTW9kZWwobmV4dFByb3BzKSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt3aGVuLCBtb2RlbH09dGhpcy5zdGF0ZVxuXHRcdHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFJld2FyZHMgY2hpbGQ9e2NoaWxkfS8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCh3aGVuKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0PENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJLbm93bGVkZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25UYXNrfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IEljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGFza1F1ZXJ5Q29tbWFuZCByZWY9XCJ0YXNrXCIgd2hlbj17d2hlbn0gXG5cdFx0XHRcdFx0b25DaGFuZ2U9e2Q9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChgZGFzaGJvYXJkLyR7dGhpcy5fZm9ybWF0KGQpfWApfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQod2hlbil7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7bW9kZWx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBoZWFkZXJTdHlsZT17XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOidkYXJrb3JhbmdlJyxcbiAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6J2VsbGlwc2lzJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOidub3dyYXAnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjonbGVmdCcsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6XCJ4eC1sYXJnZVwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MTAsXG4gICAgICAgICAgICAgICAgbWFyZ2luOjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wcz17bW9kZWwsaGVhZGVyU3R5bGV9XG5cbiAgICAgICAgaWYoJ2FwcHJvdmluZ3MnPT13aGVuKXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMse1xuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjpcIkFwcHJvdmluZ3NcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpQcm92aW5nSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTooPEVtcHR5IHRleHQ9XCJOb2JvZHkgcGxheWVkIHdpdGggeW91ciBjaGlsZHJlbiFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBkPU1hdGguZmxvb3IoKERhdGUubm93KCktd2hlbi5nZXRUaW1lKCkpLygxMDAwKjI0KjYwKjYwKSlcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMse1xuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogdGhpcy5fZm9ybWF0KHdoZW4pLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOlRhc2tJdGVtLFxuICAgICAgICAgICAgICAgIGVtcHR5OmQ+MCA/XG4gICAgICAgICAgICAgICAgICAgICg8RW1wdHkgdGV4dD17YFlvdSBkaWRub3QgcGxheSB3aXRoICR7Y2hpbGQubmFtZX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn0vPikgOlxuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BGaW5kIGZ1biB0b3BpYyBOT1cgdG8gcGxheSB3aXRoICR7Y2hpbGQubmFtZX0gYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCdrbm93bGVkZ2VzJyl9IC8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8TGlzdCB7Li4ucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBfZm9ybWF0KGQpe1xuICAgICAgICBzd2l0Y2goTWF0aC5mbG9vcigoRGF0ZS5ub3coKS1kLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKSl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiAnVG9kYXknXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiAnWWVzdGVyZGF5J1xuICAgICAgICAgICAgY2FzZSAtMTogcmV0dXJuICdUb21vcnJvdydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpKyctJysoZC5nZXRNb250aCgpKzEpKyctJytkLmdldERhdGUoKVxuICAgIH1cblxuICAgIF9wYXJzZURhdGUod2hlbil7XG4gICAgICAgIGlmKHR5cGVvZih3aGVuKSE9J3N0cmluZycpe1xuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKVxuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBzd2l0Y2god2hlbi50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgY2FzZSAnYXBwcm92aW5ncyc6XG4gICAgICAgICAgICByZXR1cm4gJ2FwcHJvdmluZ3MnXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIHJldHVybiB0b2RheVxuICAgICAgICBjYXNlICd5ZXN0ZXJkYXknOlxuICAgICAgICAgICAgcmV0dXJuIGFkZERheXModG9kYXksLTEpXG4gICAgICAgIGNhc2UgJ3RvbW9ycm93JzpcbiAgICAgICAgICAgIHJldHVybiBhZGREYXlzKHRvZGF5LDEpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB3aGVuPW5ldyBEYXRlKERhdGUucGFyc2Uod2hlbikpXG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgfVxufVxuQmFieURhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG5jbGFzcyBUYXNrSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp0YXNrLCBpbWFnZSwgYWN0aW9ucywgLi4ub3RoZXJzfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2tub3dsZWRnZX09dGFzaztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIiBvbkNsaWNrPXt0aGlzLm9uRGV0YWlsLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt0YXNrLmtub3dsZWRnZS50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Rhc2sucGhvdG98fGltYWdlfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci5wdXNoKCd0YXNrJyx0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbn1cblRhc2tJdGVtLmRlZmF1bHRQcm9wcz17XG4gICAgaW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIlxufVxuXG5jbGFzcyBQcm92aW5nSXRlbSBleHRlbmRzIFRhc2tJdGVte31cblxuY2xhc3MgVGFza1F1ZXJ5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlzcGxheURhdGU9d2hlbjtcbiAgICAgICAgd2hlbj09J2FwcHJvdmluZ3MnICYmIChkaXNwbGF5RGF0ZT1uZXcgRGF0ZSgpLCB3aGVuPW51bGwpO1xuICAgICAgICB3aGVuICYmIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgZGlzcGxheURhdGUgJiYgZGlzcGxheURhdGUuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gWyg8TGlzdCBrZXk9XCJvdGhlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17KDxBdmF0YXI+QTwvQXZhdGFyPil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+b25DaGFuZ2UoXCJhcHByb3ZpbmdzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dD1cIk90aGVyIGZhbWlsaWVzIHBsYXllZCwgbmVlZCB5b3VyIGFwcHJvdmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmluZ3NcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIvPlxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIHs8Q2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt3aGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGU9e2Rpc3BsYXlEYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZT17YWRkRGF5cyhkaXNwbGF5RGF0ZSwtMzEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17YWRkRGF5cyhkaXNwbGF5RGF0ZSwzMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRheVRvdWNoVGFwPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAvPn1cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXVxuICAgIH1cbn1cbiJdfQ==