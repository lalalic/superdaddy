'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BabyDashboard = exports.AuthorDashboard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _db = require('./db');

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _rewards = require('./components/rewards');

var _rewards2 = _interopRequireDefault(_rewards);

var _logo = require('./icons/logo');

var _logo2 = _interopRequireDefault(_logo);

var _dialpad = require('material-ui/lib/svg-icons/communication/dialpad');

var _dialpad2 = _interopRequireDefault(_dialpad);

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
                        return _this3.context.router.transitionTo("baby");
                    } }),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: 'Family',

                    items: [{ action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this3.context.router.transitionTo('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this3.context.router.transitionTo('account');
                        },
                        icon: require('material-ui/lib/svg-icons/action/account-box') }]
                }),
                _qiliApp.React.createElement(FamilyCommand, { ref: 'family' })
            );
        }
    }]);

    return AuthorDashboard;
}(_qiliApp.Component);

AuthorDashboard.contextTypes = { router: _qiliApp.React.PropTypes.func };

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
                this.renderContent(when),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: 'Knowledges',
                    onSelect: function onSelect() {
                        return _this5.onSelect();
                    },
                    items: [{ action: "Task",
                        onSelect: function onSelect() {
                            return _this5.refs.task.show();
                        },
                        icon: require("material-ui/lib/svg-icons/editor/format-list-numbered") }, { action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('account');
                        },
                        icon: require('material-ui/lib/svg-icons/action/account-box') }]
                }),
                _qiliApp.React.createElement(TaskQueryCommand, { ref: 'task', when: when, onChange: function onChange(d) {
                        return _this5.onChangeDate(d);
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
                            return _this6.context.router.transitionTo('knowledges');
                        } })
                });
            }

            return _qiliApp.React.createElement(List, props);
        }
    }, {
        key: 'onSelect',
        value: function onSelect(command, e) {
            switch (command) {
                case 'Refresh':
                    this.forceUpdate();
                    break;
            }
        }
    }, {
        key: 'onChangeDate',
        value: function onChangeDate(d) {
            this.context.router.transitionTo("dashboard", { when: this._format(d) });
            this.setState({ when: d });
            this.refs.task.dismiss();
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
                    return Date.Helper.addDays(today, -1);
                case 'tomorrow':
                    return Date.Helper.addDays(today, 1);
                default:
                    when = new Date(Date.parse(when));
                    when.setHours(0, 0, 0, 0);
                    return when;
            }
        }
    }]);

    return BabyDashboard;
}(_qiliApp.Component);

BabyDashboard.contextTypes = { router: _qiliApp.React.PropTypes.func };

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
            this.context.router.transitionTo('task', this.props.model);
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
                    minDate: Date.Helper.addDays(displayDate, -31),
                    maxDate: Date.Helper.addDays(displayDate, 31),
                    onDayTouchTap: onChange
                })
            )];
        }
    }]);

    return TaskQueryCommand;
}(DialogCommand);
//# sourceMappingURL=data:application/json;base64,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TSxpQkFBTjtDQURKOztJQUlNOzs7Ozs7Ozs7O0VBQW9COztJQUVwQjs7Ozs7Ozs7Ozs7d0NBQ2E7MEJBQ1UsS0FBSyxLQUFMLENBRFY7Z0JBQ04sb0JBRE07QUFDUCxnQkFBTywyQkFBUCxDQURPO0FBRVAsOEJBQVksSUFBWixDQUZPO0FBR1gsb0JBQU0sWUFBTixLQUF1QixjQUFZLElBQUksSUFBSixFQUFaLEVBQXdCLE9BQUssSUFBTCxDQUEvQyxDQUhXO0FBSVgsb0JBQVEsS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixDQUFwQixDQUFSLENBSlc7QUFLWCwyQkFBZSxZQUFZLFFBQVosQ0FBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FBZixDQUxXOztBQU9YLG1CQUFPLENBQUU7QUFBQyxvQkFBRDtrQkFBTSxLQUFJLFFBQUosRUFBTjtnQkFDRztBQUFDLHlCQUFLLElBQU47O0FBQ0ksb0NBQWE7Ozs7eUJBQWI7QUFDQSxpQ0FBUzttQ0FBSSxTQUFTLFlBQVQ7eUJBQUo7QUFDVCx1Q0FBYywyQ0FBZDtxQkFISjs7aUJBREg7Z0JBUUcsNkJBQUMsS0FBSyxPQUFOLE9BUkg7YUFBRixFQVVFOztrQkFBSyxLQUFJLFVBQUosRUFBTDtnQkFDRztBQUNJLDhCQUFVLElBQVY7QUFDQSxpQ0FBYSxXQUFiO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixXQUFwQixFQUFnQyxDQUFDLEVBQUQsQ0FBekM7QUFDQSw2QkFBUyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFdBQXBCLEVBQWdDLEVBQWhDLENBQVQ7QUFDQSxtQ0FBZSxRQUFmO2lCQUxKLENBREg7YUFWRixDQUFQLENBUFc7Ozs7V0FEYjtFQUF5QiIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSSxSb3V0ZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtBdmF0YXIsUGFwZXIsIFJhZGlvR3JvdXAsIFJhZGlvQnV0dG9uLEZvbnRJY29uLEljb25CdXR0b24sVGV4dEZpZWxkLCBUYWJzLCBUYWIsIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtUYXNrIGFzIGRiVGFzayxGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IFJld2FyZHMgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcblxudmFyIHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGRcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gKDxCYWJ5RGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfSAvPikgOiAoPEF1dGhvckRhc2hib2FyZCB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG59XG5cbi8qKlxuQHdpdGhvdXQgY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhvckRhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IHRleHQ9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSwgb3Igd2FsayBhcm91bmQhXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiKX0vPlxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiRmFtaWx5XCJcblxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIktub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGYW1pbHlDb21tYW5kIHJlZj1cImZhbWlseVwiLz5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG59XG5BdXRob3JEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cbi8qKlxuQCB3aXRoIGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBjbGFzcyBCYWJ5RGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0YXRlPXRoaXMuX3Jlc29sdmVNb2RlbCgpXG5cdH1cblxuICAgIF9yZXNvbHZlTW9kZWwocHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtwYXJhbXM6e3doZW49dG9kYXl9fT1wcm9wc3x8dGhpcy5wcm9wcztcbiAgICAgICAgd2hlbj10aGlzLl9wYXJzZURhdGUod2hlbilcbiAgICAgICAgdmFyIG1vZGVsPXdoZW49PSdhcHByb3ZpbmdzJyA/IGRiVGFzay5hcHByb3ZpbmdzKCkgOiBkYlRhc2suYnlEYXRlKHdoZW4pXG4gICAgICAgIHJldHVybiB7d2hlbiwgbW9kZWx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtuZXh0Q2hpbGQsIHBhcmFtczp7bmV4dFdoZW49dG9kYXl9fT1uZXh0UHJvcHMsXG4gICAgICAgICAgICB7Y2hpbGQsIHBhcmFtczp7d2hlbj10b2RheX19PXRoaXMucHJvcHNcbiAgICAgICAgaWYgKG5leHRDaGlsZCE9Y2hpbGQgfHwgbmV4dFdoZW4uZ2V0VGltZSgpIT13aGVuLmdldFRpbWUoKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fcmVzb2x2ZU1vZGVsKG5leHRQcm9wcykpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7d2hlbiwgbW9kZWx9PXRoaXMuc3RhdGVcblx0XHR2YXIge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxSZXdhcmRzIGNoaWxkPXtjaGlsZH0vPlxuXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCh3aGVuKX1cblxuXHRcdFx0XHQ8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIktub3dsZWRnZXNcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVxdWlyZSgnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRhc2tRdWVyeUNvbW1hbmQgcmVmPVwidGFza1wiIHdoZW49e3doZW59IG9uQ2hhbmdlPXtkPT50aGlzLm9uQ2hhbmdlRGF0ZShkKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHdoZW4pe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgaGVhZGVyU3R5bGU9e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjonZGFya29yYW5nZScsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OidlbGxpcHNpcycsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTonbm93cmFwJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246J2xlZnQnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOlwieHgtbGFyZ2VcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjowXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM9e21vZGVsLGhlYWRlclN0eWxlfVxuXG4gICAgICAgIGlmKCdhcHByb3ZpbmdzJz09d2hlbil7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6XCJBcHByb3ZpbmdzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6UHJvdmluZ0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6KDxFbXB0eSB0ZXh0PVwiTm9ib2R5IHBsYXllZCB3aXRoIHlvdXIgY2hpbGRyZW4hXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZD1NYXRoLmZsb29yKChEYXRlLm5vdygpLXdoZW4uZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IHRoaXMuX2Zvcm1hdCh3aGVuKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpUYXNrSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTpkPjAgP1xuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BZb3UgZGlkbm90IHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pIDpcbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgRmluZCBmdW4gdG9waWMgTk9XIHRvIHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9IGB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyl9IC8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8TGlzdCB7Li4ucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ1JlZnJlc2gnOlxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2hhbmdlRGF0ZShkKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJkYXNoYm9hcmRcIix7d2hlbjp0aGlzLl9mb3JtYXQoZCl9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHt3aGVuOmR9KVxuICAgICAgICB0aGlzLnJlZnMudGFzay5kaXNtaXNzKClcbiAgICB9XG5cbiAgICBfZm9ybWF0KGQpe1xuICAgICAgICBzd2l0Y2goTWF0aC5mbG9vcigoRGF0ZS5ub3coKS1kLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKSl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiAnVG9kYXknXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiAnWWVzdGVyZGF5J1xuICAgICAgICAgICAgY2FzZSAtMTogcmV0dXJuICdUb21vcnJvdydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpKyctJysoZC5nZXRNb250aCgpKzEpKyctJytkLmdldERhdGUoKVxuICAgIH1cblxuICAgIF9wYXJzZURhdGUod2hlbil7XG4gICAgICAgIGlmKHR5cGVvZih3aGVuKSE9J3N0cmluZycpe1xuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKVxuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBzd2l0Y2god2hlbi50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgY2FzZSAnYXBwcm92aW5ncyc6XG4gICAgICAgICAgICByZXR1cm4gJ2FwcHJvdmluZ3MnXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIHJldHVybiB0b2RheVxuICAgICAgICBjYXNlICd5ZXN0ZXJkYXknOlxuICAgICAgICAgICAgcmV0dXJuIERhdGUuSGVscGVyLmFkZERheXModG9kYXksLTEpXG4gICAgICAgIGNhc2UgJ3RvbW9ycm93JzpcbiAgICAgICAgICAgIHJldHVybiBEYXRlLkhlbHBlci5hZGREYXlzKHRvZGF5LDEpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB3aGVuPW5ldyBEYXRlKERhdGUucGFyc2Uod2hlbikpXG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgfVxufVxuQmFieURhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgVGFza0l0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6dGFzaywgaW1hZ2UsIGFjdGlvbnMsIC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtrbm93bGVkZ2V9PXRhc2s7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0YXNrLnBob3RvfHxpbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCd0YXNrJyx0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbn1cblRhc2tJdGVtLmRlZmF1bHRQcm9wcz17XG4gICAgaW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIlxufVxuXG5jbGFzcyBQcm92aW5nSXRlbSBleHRlbmRzIFRhc2tJdGVte31cblxuY2xhc3MgVGFza1F1ZXJ5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlzcGxheURhdGU9d2hlbjtcbiAgICAgICAgd2hlbj09J2FwcHJvdmluZ3MnICYmIChkaXNwbGF5RGF0ZT1uZXcgRGF0ZSgpLCB3aGVuPW51bGwpO1xuICAgICAgICB3aGVuICYmIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgZGlzcGxheURhdGUgJiYgZGlzcGxheURhdGUuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gWyg8TGlzdCBrZXk9XCJvdGhlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17KDxBdmF0YXI+QTwvQXZhdGFyPil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+b25DaGFuZ2UoXCJhcHByb3ZpbmdzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dD1cIk90aGVyIGZhbWlsaWVzIHBsYXllZCwgbmVlZCB5b3VyIGFwcHJvdmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmluZ3NcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIvPlxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3doZW59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17ZGlzcGxheURhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLC0zMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF5VG91Y2hUYXA9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG59XG4iXX0=