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

var _dialpad = require('material-ui/svg-icons/communication/dialpad');

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
                        icon: require('material-ui/svg-icons/action/account-box') }]
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
                        icon: require("material-ui/svg-icons/editor/format-list-numbered") }, { action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('account');
                        },
                        icon: require('material-ui/svg-icons/action/account-box') }]
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
//# sourceMappingURL=data:application/json;base64,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REo7O0lBSU07Ozs7Ozs7Ozs7RUFBb0I7O0lBRXBCOzs7Ozs7Ozs7Ozt3Q0FDYTswQkFDVSxLQUFLLEtBQUwsQ0FEVjtnQkFDTixvQkFETTtBQUNQLGdCQUFPLDJCQUFQLENBRE87QUFFUCw4QkFBWSxJQUFaLENBRk87QUFHWCxvQkFBTSxZQUFOLEtBQXVCLGNBQVksSUFBSSxJQUFKLEVBQVosRUFBd0IsT0FBSyxJQUFMLENBQS9DLENBSFc7QUFJWCxvQkFBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLENBQXBCLENBQVIsQ0FKVztBQUtYLDJCQUFlLFlBQVksUUFBWixDQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixDQUFmLENBTFc7O0FBT1gsbUJBQU8sQ0FBRTtBQUFDLG9CQUFEO2tCQUFNLEtBQUksUUFBSixFQUFOO2dCQUNHO0FBQUMseUJBQUssSUFBTjs7QUFDSSxvQ0FBYTs7Ozt5QkFBYjtBQUNBLGlDQUFTO21DQUFJLFNBQVMsWUFBVDt5QkFBSjtBQUNULHVDQUFjLDJDQUFkO3FCQUhKOztpQkFESDtnQkFRRyw2QkFBQyxLQUFLLE9BQU4sT0FSSDthQUFGLEVBVUU7O2tCQUFLLEtBQUksVUFBSixFQUFMO2dCQUNHO0FBQ0ksOEJBQVUsSUFBVjtBQUNBLGlDQUFhLFdBQWI7QUFDQSw2QkFBUyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFdBQXBCLEVBQWdDLENBQUMsRUFBRCxDQUF6QztBQUNBLDZCQUFTLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsV0FBcEIsRUFBZ0MsRUFBaEMsQ0FBVDtBQUNBLG1DQUFlLFFBQWY7aUJBTEosQ0FESDthQVZGLENBQVAsQ0FQVzs7OztXQURiO0VBQXlCIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJLFJvdXRlcn0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0F2YXRhcixQYXBlciwgUmFkaW9Hcm91cCwgUmFkaW9CdXR0b24sRm9udEljb24sSWNvbkJ1dHRvbixUZXh0RmllbGQsIFRhYnMsIFRhYiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgUmV3YXJkcyBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5cbnZhciB7TGlzdCwgTG9hZGluZywgRW1wdHksQ29tbWVudCxDb21tYW5kQmFyLFBob3RvLE1lc3NhZ2VyLEljb25zfT1VSSxcbiAgICB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuICAgICAgICByZXR1cm4gbmV4dFByb3BzLmNoaWxkIT10aGlzLnByb3BzLmNoaWxkXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBjaGlsZCA/ICg8QmFieURhc2hib2FyZCB7Li4udGhpcy5wcm9wc30gLz4pIDogKDxBdXRob3JEYXNoYm9hcmQgey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgfVxufVxuXG4vKipcbkB3aXRob3V0IGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxFbXB0eSB0ZXh0PVwiU3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnksIG9yIHdhbGsgYXJvdW5kIVwiXG4gICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIil9Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIkZhbWlseVwiXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwic2V0dGluZ1wiLCBsYWJlbDpcIkFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2FjY291bnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKCdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbn1cbkF1dGhvckRhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxuXG4vKipcbkAgd2l0aCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgY2xhc3MgQmFieURhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdGF0ZT10aGlzLl9yZXNvbHZlTW9kZWwoKVxuXHR9XG5cbiAgICBfcmVzb2x2ZU1vZGVsKHByb3BzKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKCksXG4gICAgICAgICAgICB7cGFyYW1zOnt3aGVuPXRvZGF5fX09cHJvcHN8fHRoaXMucHJvcHM7XG4gICAgICAgIHdoZW49dGhpcy5fcGFyc2VEYXRlKHdoZW4pXG4gICAgICAgIHZhciBtb2RlbD13aGVuPT0nYXBwcm92aW5ncycgPyBkYlRhc2suYXBwcm92aW5ncygpIDogZGJUYXNrLmJ5RGF0ZSh3aGVuKVxuICAgICAgICByZXR1cm4ge3doZW4sIG1vZGVsfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKCksXG4gICAgICAgICAgICB7bmV4dENoaWxkLCBwYXJhbXM6e25leHRXaGVuPXRvZGF5fX09bmV4dFByb3BzLFxuICAgICAgICAgICAge2NoaWxkLCBwYXJhbXM6e3doZW49dG9kYXl9fT10aGlzLnByb3BzXG4gICAgICAgIGlmIChuZXh0Q2hpbGQhPWNoaWxkIHx8IG5leHRXaGVuLmdldFRpbWUoKSE9d2hlbi5nZXRUaW1lKCkpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuX3Jlc29sdmVNb2RlbChuZXh0UHJvcHMpKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3doZW4sIG1vZGVsfT10aGlzLnN0YXRlXG5cdFx0dmFyIHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8UmV3YXJkcyBjaGlsZD17Y2hpbGR9Lz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KHdoZW4pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXHRcdFx0XHQ8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIktub3dsZWRnZXNcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwic2V0dGluZ1wiLCBsYWJlbDpcIkFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2FjY291bnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKCdtYXRlcmlhbC11aS9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUYXNrUXVlcnlDb21tYW5kIHJlZj1cInRhc2tcIiB3aGVuPXt3aGVufSBvbkNoYW5nZT17ZD0+dGhpcy5vbkNoYW5nZURhdGUoZCl9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCh3aGVuKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHttb2RlbH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIGhlYWRlclN0eWxlPXtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6J2RhcmtvcmFuZ2UnLFxuICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzonZWxsaXBzaXMnLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6J25vd3JhcCcsXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOidsZWZ0JyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTpcInh4LWxhcmdlXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzoxMCxcbiAgICAgICAgICAgICAgICBtYXJnaW46MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BzPXttb2RlbCxoZWFkZXJTdHlsZX1cblxuICAgICAgICBpZignYXBwcm92aW5ncyc9PXdoZW4pe1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcyx7XG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyOlwiQXBwcm92aW5nc1wiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOlByb3ZpbmdJdGVtLFxuICAgICAgICAgICAgICAgIGVtcHR5Oig8RW1wdHkgdGV4dD1cIk5vYm9keSBwbGF5ZWQgd2l0aCB5b3VyIGNoaWxkcmVuIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn0vPilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGQ9TWF0aC5mbG9vcigoRGF0ZS5ub3coKS13aGVuLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcyx7XG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyOiB0aGlzLl9mb3JtYXQod2hlbiksXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6VGFza0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6ZD4wID9cbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgWW91IGRpZG5vdCBwbGF5IHdpdGggJHtjaGlsZC5uYW1lfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KSA6XG4gICAgICAgICAgICAgICAgICAgICg8RW1wdHkgdGV4dD17YEZpbmQgZnVuIHRvcGljIE5PVyB0byBwbGF5IHdpdGggJHtjaGlsZC5uYW1lfSBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpfSAvPilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPExpc3Qgey4uLnByb3BzfS8+XG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdSZWZyZXNoJzpcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNoYW5nZURhdGUoZCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiZGFzaGJvYXJkXCIse3doZW46dGhpcy5fZm9ybWF0KGQpfSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2hlbjpkfSlcbiAgICAgICAgdGhpcy5yZWZzLnRhc2suZGlzbWlzcygpXG4gICAgfVxuXG4gICAgX2Zvcm1hdChkKXtcbiAgICAgICAgc3dpdGNoKE1hdGguZmxvb3IoKERhdGUubm93KCktZC5nZXRUaW1lKCkpLygxMDAwKjI0KjYwKjYwKSkpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gJ1RvZGF5J1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gJ1llc3RlcmRheSdcbiAgICAgICAgICAgIGNhc2UgLTE6IHJldHVybiAnVG9tb3Jyb3cnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSsnLScrKGQuZ2V0TW9udGgoKSsxKSsnLScrZC5nZXREYXRlKClcbiAgICB9XG5cbiAgICBfcGFyc2VEYXRlKHdoZW4pe1xuICAgICAgICBpZih0eXBlb2Yod2hlbikhPSdzdHJpbmcnKXtcbiAgICAgICAgICAgIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgIHJldHVybiB3aGVuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKClcbiAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgc3dpdGNoKHdoZW4udG9Mb3dlckNhc2UoKSl7XG4gICAgICAgIGNhc2UgJ2FwcHJvdmluZ3MnOlxuICAgICAgICAgICAgcmV0dXJuICdhcHByb3ZpbmdzJ1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICByZXR1cm4gdG9kYXlcbiAgICAgICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBEYXRlLkhlbHBlci5hZGREYXlzKHRvZGF5LC0xKVxuICAgICAgICBjYXNlICd0b21vcnJvdyc6XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5IZWxwZXIuYWRkRGF5cyh0b2RheSwxKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgd2hlbj1uZXcgRGF0ZShEYXRlLnBhcnNlKHdoZW4pKVxuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgIH1cbn1cbkJhYnlEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLm9iamVjdH1cblxuY2xhc3MgVGFza0l0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6dGFzaywgaW1hZ2UsIGFjdGlvbnMsIC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtrbm93bGVkZ2V9PXRhc2s7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0YXNrLnBob3RvfHxpbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCd0YXNrJyx0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbn1cblRhc2tJdGVtLmRlZmF1bHRQcm9wcz17XG4gICAgaW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIlxufVxuXG5jbGFzcyBQcm92aW5nSXRlbSBleHRlbmRzIFRhc2tJdGVte31cblxuY2xhc3MgVGFza1F1ZXJ5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlzcGxheURhdGU9d2hlbjtcbiAgICAgICAgd2hlbj09J2FwcHJvdmluZ3MnICYmIChkaXNwbGF5RGF0ZT1uZXcgRGF0ZSgpLCB3aGVuPW51bGwpO1xuICAgICAgICB3aGVuICYmIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgZGlzcGxheURhdGUgJiYgZGlzcGxheURhdGUuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gWyg8TGlzdCBrZXk9XCJvdGhlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17KDxBdmF0YXI+QTwvQXZhdGFyPil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+b25DaGFuZ2UoXCJhcHByb3ZpbmdzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dD1cIk90aGVyIGZhbWlsaWVzIHBsYXllZCwgbmVlZCB5b3VyIGFwcHJvdmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmluZ3NcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIvPlxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3doZW59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17ZGlzcGxheURhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLC0zMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF5VG91Y2hUYXA9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG59XG4iXX0=