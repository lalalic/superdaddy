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
                _qiliApp.React.createElement(Empty, { text: 'Start from your first baby!',
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
                        icon: _dialpad2.default }, { action: "Family",
                        onSelect: function onSelect() {
                            return _this3.refs.family.show();
                        },
                        icon: require("material-ui/lib/svg-icons/action/supervisor-account") }, { action: "setting", label: "Account",
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

    function BabyDashboard(props) {
        _classCallCheck(this, BabyDashboard);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(BabyDashboard).call(this, props));

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

            return _qiliApp.React.createElement(
                'div',
                null,
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
                        icon: require("material-ui/lib/svg-icons/editor/format-list-numbered") }, { action: "Publish",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('publish');
                        },
                        icon: require("material-ui/lib/svg-icons/image/camera-roll") }, { action: "Knowledges",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('knowledges');
                        },
                        icon: _dialpad2.default }, { action: "Family",
                        onSelect: function onSelect() {
                            return _this5.refs.family.show();
                        },
                        icon: require("material-ui/lib/svg-icons/action/supervisor-account") }, { action: "setting", label: "Account",
                        onSelect: function onSelect() {
                            return _this5.context.router.transitionTo('account');
                        },
                        icon: require('material-ui/lib/svg-icons/action/account-box') }]
                }),
                _qiliApp.React.createElement(TaskQueryCommand, { ref: 'task', when: when, onChange: function onChange() {
                        return _this5.onChangeDate();
                    } }),
                _qiliApp.React.createElement(FamilyCommand, { ref: 'family', child: this.props.child })
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

var FamilyCommand = function (_DialogCommand2) {
    _inherits(FamilyCommand, _DialogCommand2);

    function FamilyCommand() {
        _classCallCheck(this, FamilyCommand);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FamilyCommand).apply(this, arguments));
    }

    _createClass(FamilyCommand, [{
        key: 'renderContent',
        value: function renderContent() {
            var router = this.context.router;
            var _props$child = this.props.child;
            var child = _props$child === undefined ? {} : _props$child;
            var children = _db.Family.children;
            var len = children.length;
            var uiChildren = children.map(function (a) {
                var _this11 = this;

                var avatar;
                if (a.photo) avatar = _qiliApp.React.createElement(_materialUi.Avatar, { src: a.photo });else {
                    var photo = _qiliApp.React.createElement(Photo, {
                        onPhoto: function onPhoto(url) {
                            return _this11.shortcutPhoto(a, url);
                        },
                        iconRatio: 2 / 3, width: 40, height: 40 });

                    avatar = _qiliApp.React.createElement(_materialUi.Avatar, { icon: photo });
                }

                return _qiliApp.React.createElement(
                    List.Item,
                    { key: a._id,
                        onClick: function onClick() {
                            return router.transitionTo("baby", _db.Family.currentChild = a);
                        },
                        leftAvatar: avatar },
                    a.name
                );
            });
            var appender = _qiliApp.React.createElement(
                List.Item,
                { key: 'create',
                    onClick: function onClick() {
                        return router.transitionTo("baby");
                    },
                    leftAvatar: _qiliApp.React.createElement(
                        _materialUi.Avatar,
                        null,
                        '+'
                    ) },
                'I have more children!'
            );
            var inviter = _qiliApp.React.createElement(
                List.Item,
                { key: 'inviter',
                    style: { paddingBottom: 0, paddingTop: 0, textAlign: 'left' },
                    rightAvatar: _qiliApp.React.createElement(
                        _materialUi.Avatar,
                        { onClick: this.invite.bind(this) },
                        '+'
                    ) },
                _qiliApp.React.createElement('input', {
                    style: { width: '54%', marginRight: 2, border: 0, borderBottom: '1px solid #eee', padding: 5 },
                    ref: 'id',
                    placeholder: '手机号/登录账号' }),
                _qiliApp.React.createElement('input', {
                    style: { width: '45%', border: 0, borderBottom: '1px solid #eee', padding: 5 },
                    ref: 'relationship',
                    placeholder: '与' + (child.name || '宝宝') + '的关系' })
            );

            return [_qiliApp.React.createElement(
                List,
                { key: 'children' },
                uiChildren,
                len ? _qiliApp.React.createElement(List.Divider, { inset: true }) : null,
                appender
            ), _qiliApp.React.createElement(
                List,
                { key: 'invite', subheader: '邀请家人', style: { marginTop: 5 } },
                inviter
            )];
        }
    }, {
        key: 'shortcutPhoto',
        value: function shortcutPhoto(child, url) {
            _db.Family.upsert(child, { photo: url });
        }
    }, {
        key: 'invite',
        value: function invite() {
            var _refs = this.refs;
            var id = _refs.id;
            var relationship = _refs.relationship;

            id = id.getDOMNode().value;
            relationship = relationship.getDOMNode().value;

            if (id && relationship) {
                _db.Family.invite(id, relationship).then(function () {});
            }
        }
    }]);

    return FamilyCommand;
}(DialogCommand);

FamilyCommand.contextTypes = { router: _qiliApp.React.PropTypes.func };
//# sourceMappingURL=data:application/json;base64,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d0RELE9BQU8sS0FBSTtBQUNyQix1QkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLEVBQUMsT0FBTSxHQUFOLEVBQXZCLEVBRHFCOzs7O2lDQUdqQjt3QkFDbUIsS0FBSyxJQUFMLENBRG5CO2dCQUNDLGNBREQ7Z0JBQ0ssa0NBREw7O0FBRUosaUJBQUcsR0FBRyxVQUFILEdBQWdCLEtBQWhCLENBRkM7QUFHSiwyQkFBYSxhQUFhLFVBQWIsR0FBMEIsS0FBMUIsQ0FIVDs7QUFLSixnQkFBRyxNQUFNLFlBQU4sRUFBbUI7QUFDbEIsMkJBQVMsTUFBVCxDQUFnQixFQUFoQixFQUFvQixZQUFwQixFQUNLLElBREwsQ0FDVSxZQUFVLEVBQVYsQ0FEVixDQURrQjthQUF0Qjs7OztXQWpFRjtFQUFzQjs7QUF5RTVCLGNBQWMsWUFBZCxHQUEyQixFQUFDLFFBQVEsZUFBTSxTQUFOLENBQWdCLElBQWhCLEVBQXBDIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJLFJvdXRlcn0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0F2YXRhcixQYXBlciwgUmFkaW9Hcm91cCwgUmFkaW9CdXR0b24sRm9udEljb24sSWNvbkJ1dHRvbixUZXh0RmllbGQsIFRhYnMsIFRhYiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcblxudmFyIHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGRcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gKDxCYWJ5RGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfSAvPikgOiAoPEF1dGhvckRhc2hib2FyZCB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG59XG5cbi8qKlxuQHdpdGhvdXQgY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhvckRhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IHRleHQ9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSFcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIpfS8+XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJGYW1pbHlcIlxuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkZhbWlseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnJlZnMuZmFtaWx5LnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9zdXBlcnZpc29yLWFjY291bnRcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVxdWlyZSgnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZhbWlseUNvbW1hbmQgcmVmPVwiZmFtaWx5XCIvPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbn1cbkF1dGhvckRhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuLyoqXG5AIHdpdGggY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEJhYnlEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT10aGlzLl9yZXNvbHZlTW9kZWwoKVxuICAgIH1cblxuICAgIF9yZXNvbHZlTW9kZWwocHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtwYXJhbXM6e3doZW49dG9kYXl9fT1wcm9wc3x8dGhpcy5wcm9wcztcbiAgICAgICAgd2hlbj10aGlzLl9wYXJzZURhdGUod2hlbilcbiAgICAgICAgdmFyIG1vZGVsPXdoZW49PSdhcHByb3ZpbmdzJyA/IGRiVGFzay5hcHByb3ZpbmdzKCkgOiBkYlRhc2suYnlEYXRlKHdoZW4pXG4gICAgICAgIHJldHVybiB7d2hlbiwgbW9kZWx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtuZXh0Q2hpbGQsIHBhcmFtczp7bmV4dFdoZW49dG9kYXl9fT1uZXh0UHJvcHMsXG4gICAgICAgICAgICB7Y2hpbGQsIHBhcmFtczp7d2hlbj10b2RheX19PXRoaXMucHJvcHNcbiAgICAgICAgaWYgKG5leHRDaGlsZCE9Y2hpbGQgfHwgbmV4dFdoZW4uZ2V0VGltZSgpIT13aGVuLmdldFRpbWUoKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fcmVzb2x2ZU1vZGVsKG5leHRQcm9wcykpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7d2hlbiwgbW9kZWx9PXRoaXMuc3RhdGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQ29udGVudCh3aGVuKX1cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIktub3dsZWRnZXNcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiUHVibGlzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygncHVibGlzaCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIktub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJGYW1pbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLmZhbWlseS5zaG93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc3VwZXJ2aXNvci1hY2NvdW50XCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUYXNrUXVlcnlDb21tYW5kIHJlZj1cInRhc2tcIiB3aGVuPXt3aGVufSBvbkNoYW5nZT17KCk9PnRoaXMub25DaGFuZ2VEYXRlKCl9Lz5cbiAgICAgICAgICAgICAgICA8RmFtaWx5Q29tbWFuZCByZWY9XCJmYW1pbHlcIiBjaGlsZD17dGhpcy5wcm9wcy5jaGlsZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHdoZW4pe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgaGVhZGVyU3R5bGU9e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjonZGFya29yYW5nZScsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OidlbGxpcHNpcycsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTonbm93cmFwJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246J2xlZnQnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOlwieHgtbGFyZ2VcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjowXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM9e21vZGVsLGhlYWRlclN0eWxlfVxuXG4gICAgICAgIGlmKCdhcHByb3ZpbmdzJz09d2hlbil7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6XCJBcHByb3ZpbmdzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6UHJvdmluZ0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6KDxFbXB0eSB0ZXh0PVwiTm9ib2R5IHBsYXllZCB3aXRoIHlvdXIgY2hpbGRyZW4hXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZD1NYXRoLmZsb29yKChEYXRlLm5vdygpLXdoZW4uZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IHRoaXMuX2Zvcm1hdCh3aGVuKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpUYXNrSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTpkPjAgP1xuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BZb3UgZGlkbm90IHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pIDpcbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgRmluZCBmdW4gdG9waWMgTk9XIHRvIHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9IGB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyl9IC8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8TGlzdCB7Li4ucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ1JlZnJlc2gnOlxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2hhbmdlRGF0ZShkKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJkYXNoYm9hcmRcIix7d2hlbjp0aGlzLl9mb3JtYXQoZCl9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHt3aGVuOmR9KVxuICAgICAgICB0aGlzLnJlZnMudGFzay5kaXNtaXNzKClcbiAgICB9XG5cbiAgICBfZm9ybWF0KGQpe1xuICAgICAgICBzd2l0Y2goTWF0aC5mbG9vcigoRGF0ZS5ub3coKS1kLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKSl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiAnVG9kYXknXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiAnWWVzdGVyZGF5J1xuICAgICAgICAgICAgY2FzZSAtMTogcmV0dXJuICdUb21vcnJvdydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpKyctJysoZC5nZXRNb250aCgpKzEpKyctJytkLmdldERhdGUoKVxuICAgIH1cblxuICAgIF9wYXJzZURhdGUod2hlbil7XG4gICAgICAgIGlmKHR5cGVvZih3aGVuKSE9J3N0cmluZycpe1xuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKVxuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBzd2l0Y2god2hlbi50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgY2FzZSAnYXBwcm92aW5ncyc6XG4gICAgICAgICAgICByZXR1cm4gJ2FwcHJvdmluZ3MnXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIHJldHVybiB0b2RheVxuICAgICAgICBjYXNlICd5ZXN0ZXJkYXknOlxuICAgICAgICAgICAgcmV0dXJuIERhdGUuSGVscGVyLmFkZERheXModG9kYXksLTEpXG4gICAgICAgIGNhc2UgJ3RvbW9ycm93JzpcbiAgICAgICAgICAgIHJldHVybiBEYXRlLkhlbHBlci5hZGREYXlzKHRvZGF5LDEpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB3aGVuPW5ldyBEYXRlKERhdGUucGFyc2Uod2hlbikpXG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgfVxufVxuQmFieURhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgVGFza0l0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6dGFzaywgaW1hZ2UsIGFjdGlvbnMsIC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtrbm93bGVkZ2V9PXRhc2s7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0YXNrLnBob3RvfHxpbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCd0YXNrJyx0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbn1cblRhc2tJdGVtLmRlZmF1bHRQcm9wcz17XG4gICAgaW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIlxufVxuXG5jbGFzcyBQcm92aW5nSXRlbSBleHRlbmRzIFRhc2tJdGVte31cblxuY2xhc3MgVGFza1F1ZXJ5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlzcGxheURhdGU9d2hlbjtcbiAgICAgICAgd2hlbj09J2FwcHJvdmluZ3MnICYmIChkaXNwbGF5RGF0ZT1uZXcgRGF0ZSgpLCB3aGVuPW51bGwpO1xuICAgICAgICB3aGVuICYmIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgZGlzcGxheURhdGUgJiYgZGlzcGxheURhdGUuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gWyg8TGlzdCBrZXk9XCJvdGhlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17KDxBdmF0YXI+QTwvQXZhdGFyPil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+b25DaGFuZ2UoXCJhcHByb3ZpbmdzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dD1cIk90aGVyIGZhbWlsaWVzIHBsYXllZCwgbmVlZCB5b3VyIGFwcHJvdmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmluZ3NcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIvPlxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3doZW59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17ZGlzcGxheURhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLC0zMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF5VG91Y2hUYXA9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG59XG5cblxuXG5jbGFzcyBGYW1pbHlDb21tYW5kIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciByb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlcixcbiAgICAgICAgICAgIHtjaGlsZD17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNoaWxkcmVuPWRiRmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICAgIHVpQ2hpbGRyZW49Y2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIHZhciBhdmF0YXI7XG4gICAgICAgICAgICAgICAgaWYoYS5waG90bylcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17YS5waG90b30vPilcbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG89KDxQaG90b1xuICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMuc2hvcnRjdXRQaG90byhhLHVybCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+KVxuXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBpY29uPXtwaG90b30vPilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17YS5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIixkYkZhbWlseS5jdXJyZW50Q2hpbGQ9YSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2EubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBhcHBlbmRlcj0oXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9XCJjcmVhdGVcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIil9XG4gICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9ezxBdmF0YXI+KzwvQXZhdGFyPn0gPlxuICAgICAgICAgICAgICAgICAgICBJIGhhdmUgbW9yZSBjaGlsZHJlbiFcbiAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT4pLFxuICAgICAgICAgICAgaW52aXRlcj0oXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9XCJpbnZpdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twYWRkaW5nQm90dG9tOjAscGFkZGluZ1RvcDowLHRleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17PEF2YXRhciBvbkNsaWNrPXt0aGlzLmludml0ZS5iaW5kKHRoaXMpfT4rPC9BdmF0YXI+fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOic1NCUnLG1hcmdpblJpZ2h0OjIsIGJvcmRlcjowLCBib3JkZXJCb3R0b206JzFweCBzb2xpZCAjZWVlJywgcGFkZGluZzo1fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLmiYvmnLrlj7cv55m75b2V6LSm5Y+3XCIvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOic0NSUnLGJvcmRlcjowLCBib3JkZXJCb3R0b206JzFweCBzb2xpZCAjZWVlJywgcGFkZGluZzo1fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZWxhdGlvbnNoaXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtg5LiOJHtjaGlsZC5uYW1lfHwn5a6d5a6dJ33nmoTlhbPns7tgfS8+XG4gICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+KTtcblxuICAgICAgICAgICAgcmV0dXJuIFsoXG4gICAgICAgICAgICAgICAgPExpc3Qga2V5PVwiY2hpbGRyZW5cIj5cbiAgICAgICAgICAgICAgICAgICAge3VpQ2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIHtsZW4gPyAoPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPikgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7YXBwZW5kZXJ9XG4gICAgICAgICAgICAgICAgPC9MaXN0PiksKFxuICAgICAgICAgICAgICAgIDxMaXN0IGtleT1cImludml0ZVwiIHN1YmhlYWRlcj1cIumCgOivt+WutuS6ulwiIHN0eWxlPXt7bWFyZ2luVG9wOjV9fT5cbiAgICAgICAgICAgICAgICAgICAge2ludml0ZXJ9XG4gICAgICAgICAgICAgICAgPC9MaXN0PildO1xuICAgIH1cbiAgICBzaG9ydGN1dFBob3RvKGNoaWxkLCB1cmwpe1xuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXG4gICAgfVxuICAgIGludml0ZSgpe1xuICAgICAgICB2YXIge2lkLCByZWxhdGlvbnNoaXB9PXRoaXMucmVmc1xuICAgICAgICBpZD1pZC5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAgICAgcmVsYXRpb25zaGlwPXJlbGF0aW9uc2hpcC5nZXRET01Ob2RlKCkudmFsdWVcblxuICAgICAgICBpZihpZCAmJiByZWxhdGlvbnNoaXApe1xuICAgICAgICAgICAgZGJGYW1pbHkuaW52aXRlKGlkLCByZWxhdGlvbnNoaXApXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5GYW1pbHlDb21tYW5kLmNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY31cbiJdfQ==