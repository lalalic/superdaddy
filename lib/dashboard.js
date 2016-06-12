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
                    onSelect: function onSelect() {
                        return _this5.onSelect();
                    },
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
                            return _this6.context.router.push('knowledges');
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
            this.context.router.push("dashboard", { when: this._format(d) });
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
                    return addDays(today, -1);
                case 'tomorrow':
                    return addDays(today, 1);
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
            ), _qiliApp.React.createElement('div', { key: 'calendar' })];
        }
    }]);

    return TaskQueryCommand;
}(DialogCommand);

function addDays(date, days) {
    var d = new Date();
    d.setTime(date.getTime() - days * 24 * 60 * 60 * 1000);
    return d;
}
//# sourceMappingURL=data:application/json;base64,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QUFQLENBRE87QUFFUCw4QkFBWSxJQUFaLENBRk87QUFHWCxvQkFBTSxZQUFOLEtBQXVCLGNBQVksSUFBSSxJQUFKLEVBQVosRUFBd0IsT0FBSyxJQUFMLENBQS9DLENBSFc7QUFJWCxvQkFBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLENBQVIsQ0FKVztBQUtYLDJCQUFlLFlBQVksUUFBWixDQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUFmLENBTFc7O0FBT1gsbUJBQU8sQ0FBRTtBQUFDLG9CQUFEO2tCQUFNLEtBQUksUUFBSixFQUFOO2dCQUNHO0FBQUMseUJBQUssSUFBTjs7QUFDSSxvQ0FBYTs7Ozt5QkFBYjtBQUNBLGlDQUFTO21DQUFJLFNBQVMsWUFBVDt5QkFBSjtBQUNULHVDQUFjLDJDQUFkO3FCQUhKOztpQkFESDtnQkFRRyw2QkFBQyxLQUFLLE9BQU4sT0FSSDthQUFGLEVBVUUsc0NBQUssS0FBSSxVQUFKLEVBQUwsQ0FWRixDQUFQLENBUFc7Ozs7V0FEYjtFQUF5Qjs7QUE4Qi9CLFNBQVMsT0FBVCxDQUFpQixJQUFqQixFQUF1QixJQUF2QixFQUE0QjtBQUN4QixRQUFJLElBQUUsSUFBSSxJQUFKLEVBQUYsQ0FEb0I7QUFFeEIsTUFBRSxPQUFGLENBQVUsS0FBSyxPQUFMLEtBQWUsT0FBSyxFQUFMLEdBQVEsRUFBUixHQUFXLEVBQVgsR0FBYyxJQUFkLENBQXpCLENBRndCO0FBR3hCLFdBQU8sQ0FBUCxDQUh3QjtDQUE1QiIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSX0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0F2YXRhcixQYXBlciwgUmFkaW9Hcm91cCwgUmFkaW9CdXR0b24sRm9udEljb24sSWNvbkJ1dHRvbixUZXh0RmllbGQsIFRhYnMsIFRhYiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuaW1wb3J0IEljb25BY2NvdW50IGZyb20gJ21hdGVyaWFsLXVpL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnXG5pbXBvcnQgSWNvblRhc2sgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIlxuXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgUmV3YXJkcyBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcblxuY29uc3Qge0xpc3QsIExvYWRpbmcsIEVtcHR5LENvbW1lbnQsQ29tbWFuZEJhcixQaG90byxNZXNzYWdlcixJY29uc309VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGRcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gKDxCYWJ5RGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfSAvPikgOiAoPEF1dGhvckRhc2hib2FyZCB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG59XG5cbi8qKlxuQHdpdGhvdXQgY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhvckRhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IHRleHQ9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSwgb3Igd2FsayBhcm91bmQhXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImJhYnlcIil9Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIkZhbWlseVwiXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IEljb25BY2NvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG59XG5BdXRob3JEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuLyoqXG5AIHdpdGggY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEJhYnlEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuc3RhdGU9dGhpcy5fcmVzb2x2ZU1vZGVsKClcblx0fVxuXG4gICAgX3Jlc29sdmVNb2RlbChwcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge3BhcmFtczp7d2hlbj10b2RheX19PXByb3BzfHx0aGlzLnByb3BzO1xuICAgICAgICB3aGVuPXRoaXMuX3BhcnNlRGF0ZSh3aGVuKVxuICAgICAgICB2YXIgbW9kZWw9d2hlbj09J2FwcHJvdmluZ3MnID8gZGJUYXNrLmFwcHJvdmluZ3MoKSA6IGRiVGFzay5ieURhdGUod2hlbilcbiAgICAgICAgcmV0dXJuIHt3aGVuLCBtb2RlbH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge25leHRDaGlsZCwgcGFyYW1zOntuZXh0V2hlbj10b2RheX19PW5leHRQcm9wcyxcbiAgICAgICAgICAgIHtjaGlsZCwgcGFyYW1zOnt3aGVuPXRvZGF5fX09dGhpcy5wcm9wc1xuICAgICAgICBpZiAobmV4dENoaWxkIT1jaGlsZCB8fCBuZXh0V2hlbi5nZXRUaW1lKCkhPXdoZW4uZ2V0VGltZSgpKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9yZXNvbHZlTW9kZWwobmV4dFByb3BzKSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt3aGVuLCBtb2RlbH09dGhpcy5zdGF0ZVxuXHRcdHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFJld2FyZHMgY2hpbGQ9e2NoaWxkfS8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCh3aGVuKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblx0XHRcdFx0PENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJLbm93bGVkZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpPT50aGlzLm9uU2VsZWN0KCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVGFza1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnJlZnMudGFzay5zaG93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uVGFza30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ2FjY291bnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiBJY29uQWNjb3VudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRhc2tRdWVyeUNvbW1hbmQgcmVmPVwidGFza1wiIHdoZW49e3doZW59IG9uQ2hhbmdlPXtkPT50aGlzLm9uQ2hhbmdlRGF0ZShkKX0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHdoZW4pe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgaGVhZGVyU3R5bGU9e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjonZGFya29yYW5nZScsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OidlbGxpcHNpcycsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTonbm93cmFwJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246J2xlZnQnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOlwieHgtbGFyZ2VcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjowXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM9e21vZGVsLGhlYWRlclN0eWxlfVxuXG4gICAgICAgIGlmKCdhcHByb3ZpbmdzJz09d2hlbil7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6XCJBcHByb3ZpbmdzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6UHJvdmluZ0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6KDxFbXB0eSB0ZXh0PVwiTm9ib2R5IHBsYXllZCB3aXRoIHlvdXIgY2hpbGRyZW4hXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZD1NYXRoLmZsb29yKChEYXRlLm5vdygpLXdoZW4uZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IHRoaXMuX2Zvcm1hdCh3aGVuKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpUYXNrSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTpkPjAgP1xuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BZb3UgZGlkbm90IHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pIDpcbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgRmluZCBmdW4gdG9waWMgTk9XIHRvIHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9IGB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIucHVzaCgna25vd2xlZGdlcycpfSAvPilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPExpc3Qgey4uLnByb3BzfS8+XG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdSZWZyZXNoJzpcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNoYW5nZURhdGUoZCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIucHVzaChcImRhc2hib2FyZFwiLHt3aGVuOnRoaXMuX2Zvcm1hdChkKX0pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3doZW46ZH0pXG4gICAgICAgIHRoaXMucmVmcy50YXNrLmRpc21pc3MoKVxuICAgIH1cblxuICAgIF9mb3JtYXQoZCl7XG4gICAgICAgIHN3aXRjaChNYXRoLmZsb29yKChEYXRlLm5vdygpLWQuZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuICdUb2RheSdcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuICdZZXN0ZXJkYXknXG4gICAgICAgICAgICBjYXNlIC0xOiByZXR1cm4gJ1RvbW9ycm93J1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkrJy0nKyhkLmdldE1vbnRoKCkrMSkrJy0nK2QuZ2V0RGF0ZSgpXG4gICAgfVxuXG4gICAgX3BhcnNlRGF0ZSh3aGVuKXtcbiAgICAgICAgaWYodHlwZW9mKHdoZW4pIT0nc3RyaW5nJyl7XG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpXG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgIHN3aXRjaCh3aGVuLnRvTG93ZXJDYXNlKCkpe1xuICAgICAgICBjYXNlICdhcHByb3ZpbmdzJzpcbiAgICAgICAgICAgIHJldHVybiAnYXBwcm92aW5ncydcbiAgICAgICAgY2FzZSAndG9kYXknOlxuICAgICAgICAgICAgcmV0dXJuIHRvZGF5XG4gICAgICAgIGNhc2UgJ3llc3RlcmRheSc6XG4gICAgICAgICAgICByZXR1cm4gYWRkRGF5cyh0b2RheSwtMSlcbiAgICAgICAgY2FzZSAndG9tb3Jyb3cnOlxuICAgICAgICAgICAgcmV0dXJuIGFkZERheXModG9kYXksMSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHdoZW49bmV3IERhdGUoRGF0ZS5wYXJzZSh3aGVuKSlcbiAgICAgICAgICAgIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgIHJldHVybiB3aGVuXG4gICAgICAgIH1cbiAgICB9XG59XG5CYWJ5RGFzaGJvYXJkLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG5cbmNsYXNzIFRhc2tJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOnRhc2ssIGltYWdlLCBhY3Rpb25zLCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7a25vd2xlZGdlfT10YXNrO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiIG9uQ2xpY2s9e3RoaXMub25EZXRhaWwuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3Rhc2sua25vd2xlZGdlLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGFzay5waG90b3x8aW1hZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnB1c2goJ3Rhc2snLHRoaXMucHJvcHMubW9kZWwpXG4gICAgfVxufVxuVGFza0l0ZW0uZGVmYXVsdFByb3BzPXtcbiAgICBpbWFnZTpcImltYWdlcy90YXNrLmpwZ1wiXG59XG5cbmNsYXNzIFByb3ZpbmdJdGVtIGV4dGVuZHMgVGFza0l0ZW17fVxuXG5jbGFzcyBUYXNrUXVlcnlDb21tYW5kIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7d2hlbiwgb25DaGFuZ2V9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBkaXNwbGF5RGF0ZT13aGVuO1xuICAgICAgICB3aGVuPT0nYXBwcm92aW5ncycgJiYgKGRpc3BsYXlEYXRlPW5ldyBEYXRlKCksIHdoZW49bnVsbCk7XG4gICAgICAgIHdoZW4gJiYgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBkaXNwbGF5RGF0ZSAmJiBkaXNwbGF5RGF0ZS5zZXRIb3VycygwLDAsMCwwKVxuXG4gICAgICAgIHJldHVybiBbKDxMaXN0IGtleT1cIm90aGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXsoPEF2YXRhcj5BPC9BdmF0YXI+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT5vbkNoYW5nZShcImFwcHJvdmluZ3NcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0PVwiT3RoZXIgZmFtaWxpZXMgcGxheWVkLCBuZWVkIHlvdXIgYXBwcm92YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQXBwcm92aW5nc1xuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlci8+XG4gICAgICAgICAgICAgICAgPC9MaXN0PiksXG4gICAgICAgICAgICAgICAgKDxkaXYga2V5PVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgey8qPENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17d2hlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlPXtkaXNwbGF5RGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e2FkZERheXMoZGlzcGxheURhdGUsLTMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e2FkZERheXMoZGlzcGxheURhdGUsMzEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXlUb3VjaFRhcD17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgLz4qL31cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXVxuICAgIH1cbn1cblxuZnVuY3Rpb24gYWRkRGF5cyhkYXRlLCBkYXlzKXtcbiAgICB2YXIgZD1uZXcgRGF0ZSgpXG4gICAgZC5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpLWRheXMqMjQqNjAqNjAqMTAwMClcbiAgICByZXR1cm4gZFxufVxuIl19