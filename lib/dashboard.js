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
            var rewardDetail = this.props.child.rewardDetail;

            return _qiliApp.React.createElement(
                'div',
                null,
                this.renderContent(when),
                _qiliApp.React.createElement(_rewards2.default, { rewardDetail: rewardDetail }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRUs7SUFBTTtJQUFTO0lBQU07SUFBUTtJQUFXO0lBQU07QUFBL0MsSUFBd0QseUJBQXhEO0lBQ0MsZ0JBQWUsV0FBZjs7SUFJZ0I7Ozs7Ozs7Ozs7OzhDQUNLLFdBQVU7QUFDNUIsbUJBQU8sVUFBVSxLQUFWLElBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FESTs7OztpQ0FHeEI7Z0JBQ0MsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQUREOztBQUVKLG1CQUFPLFFBQVMsNkJBQUMsYUFBRCxFQUFtQixLQUFLLEtBQUwsQ0FBNUIsR0FBK0MsNkJBQUMsZUFBRCxFQUFxQixLQUFLLEtBQUwsQ0FBcEUsQ0FGSDs7OztXQUpTOzs7Ozs7Ozs7O0lBYVI7Ozs7Ozs7Ozs7O2lDQUNEOzs7QUFDSixtQkFDSTs7O2dCQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLDZDQUFMO0FBQ0gsMEJBQU0sa0RBQU47QUFDQSw2QkFBUzsrQkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLE1BQWpDO3FCQUFKLEVBRmIsQ0FESjtnQkFJSSw2QkFBQyxVQUFEO0FBQ0ksK0JBQVUsU0FBVjtBQUNBLDZCQUFRLFFBQVI7O0FBRUEsMkJBQU8sQ0FDSCxFQUFDLFFBQU8sWUFBUDtBQUNHLGtDQUFTO21DQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsWUFBakM7eUJBQUo7QUFDVCwrQ0FGSixFQURHLEVBSUgsRUFBQyxRQUFPLFFBQVA7QUFDRyxrQ0FBUzttQ0FBSSxPQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLElBQWpCO3lCQUFKO0FBQ1QsOEJBQUssUUFBUSxxREFBUixDQUFMLEVBTkQsRUFPSCxFQUFDLFFBQU8sU0FBUCxFQUFr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LFdBQVUsTUFBVixFQUFpQixPQUFPLEVBQUMsV0FBVSxDQUFWLEVBQVIsRUFBcEM7Z0JBQ0ssT0FETDthQU5HLENBQVAsQ0E5Q087Ozs7c0NBd0RELE9BQU8sS0FBSTtBQUNyQix1QkFBUyxNQUFULENBQWdCLEtBQWhCLEVBQXNCLEVBQUMsT0FBTSxHQUFOLEVBQXZCLEVBRHFCOzs7O2lDQUdqQjt3QkFDbUIsS0FBSyxJQUFMLENBRG5CO2dCQUNDLGNBREQ7Z0JBQ0ssa0NBREw7O0FBRUosaUJBQUcsR0FBRyxVQUFILEdBQWdCLEtBQWhCLENBRkM7QUFHSiwyQkFBYSxhQUFhLFVBQWIsR0FBMEIsS0FBMUIsQ0FIVDs7QUFLSixnQkFBRyxNQUFNLFlBQU4sRUFBbUI7QUFDbEIsMkJBQVMsTUFBVCxDQUFnQixFQUFoQixFQUFvQixZQUFwQixFQUNLLElBREwsQ0FDVSxZQUFVLEVBQVYsQ0FEVixDQURrQjthQUF0Qjs7OztXQWpFRjtFQUFzQjs7QUF5RTVCLGNBQWMsWUFBZCxHQUEyQixFQUFDLFFBQVEsZUFBTSxTQUFOLENBQWdCLElBQWhCLEVBQXBDIiwiZmlsZSI6ImRhc2hib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVhY3QsQ29tcG9uZW50LFVJLFJvdXRlcn0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge0F2YXRhcixQYXBlciwgUmFkaW9Hcm91cCwgUmFkaW9CdXR0b24sRm9udEljb24sSWNvbkJ1dHRvbixUZXh0RmllbGQsIFRhYnMsIFRhYiwgRGF0ZVBpY2tlcn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge1Rhc2sgYXMgZGJUYXNrLEZhbWlseSBhcyBkYkZhbWlseX0gZnJvbSAnLi9kYidcbmltcG9ydCBDYWxlbmRhciBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgUmV3YXJkcyBmcm9tICcuL2NvbXBvbmVudHMvcmV3YXJkcydcbmltcG9ydCBMb2dvIGZyb20gJy4vaWNvbnMvbG9nbydcbmltcG9ydCBJY29uS25vd2xlZGdlcyBmcm9tIFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9jb21tdW5pY2F0aW9uL2RpYWxwYWRcIlxuXG52YXIge0xpc3QsIExvYWRpbmcsIEVtcHR5LENvbW1lbnQsQ29tbWFuZEJhcixQaG90byxNZXNzYWdlcixJY29uc309VUksXG4gICAge0RpYWxvZ0NvbW1hbmR9PUNvbW1hbmRCYXJcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzKXtcbiAgICAgICAgcmV0dXJuIG5leHRQcm9wcy5jaGlsZCE9dGhpcy5wcm9wcy5jaGlsZFxuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5wcm9wc1xuICAgICAgICByZXR1cm4gY2hpbGQgPyAoPEJhYnlEYXNoYm9hcmQgey4uLnRoaXMucHJvcHN9IC8+KSA6ICg8QXV0aG9yRGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfS8+KVxuICAgIH1cbn1cblxuLyoqXG5Ad2l0aG91dCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgY2xhc3MgQXV0aG9yRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8RW1wdHkgdGV4dD1cIlN0YXJ0IGZyb20geW91ciBmaXJzdCBiYWJ5LCBvciB3YWxrIGFyb3VuZCFcIlxuICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIpfS8+XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJGYW1pbHlcIlxuXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkZhbWlseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnJlZnMuZmFtaWx5LnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9zdXBlcnZpc29yLWFjY291bnRcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVxdWlyZSgnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEZhbWlseUNvbW1hbmQgcmVmPVwiZmFtaWx5XCIvPlxuICAgICAgICAgICAgPC9kaXY+KVxuICAgIH1cbn1cbkF1dGhvckRhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuLyoqXG5AIHdpdGggY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEJhYnlEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT10aGlzLl9yZXNvbHZlTW9kZWwoKVxuICAgIH1cblxuICAgIF9yZXNvbHZlTW9kZWwocHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtwYXJhbXM6e3doZW49dG9kYXl9fT1wcm9wc3x8dGhpcy5wcm9wcztcbiAgICAgICAgd2hlbj10aGlzLl9wYXJzZURhdGUod2hlbilcbiAgICAgICAgdmFyIG1vZGVsPXdoZW49PSdhcHByb3ZpbmdzJyA/IGRiVGFzay5hcHByb3ZpbmdzKCkgOiBkYlRhc2suYnlEYXRlKHdoZW4pXG4gICAgICAgIHJldHVybiB7d2hlbiwgbW9kZWx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpe1xuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKSxcbiAgICAgICAgICAgIHtuZXh0Q2hpbGQsIHBhcmFtczp7bmV4dFdoZW49dG9kYXl9fT1uZXh0UHJvcHMsXG4gICAgICAgICAgICB7Y2hpbGQsIHBhcmFtczp7d2hlbj10b2RheX19PXRoaXMucHJvcHNcbiAgICAgICAgaWYgKG5leHRDaGlsZCE9Y2hpbGQgfHwgbmV4dFdoZW4uZ2V0VGltZSgpIT13aGVuLmdldFRpbWUoKSlcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5fcmVzb2x2ZU1vZGVsKG5leHRQcm9wcykpXG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7d2hlbiwgbW9kZWx9PXRoaXMuc3RhdGVcblx0XHRsZXQge3Jld2FyZERldGFpbH09dGhpcy5wcm9wcy5jaGlsZFxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KHdoZW4pfVxuXHRcdFx0XHRcblx0XHRcdFx0PFJld2FyZHMgcmV3YXJkRGV0YWlsPXtyZXdhcmREZXRhaWx9Lz5cblx0XHRcdFx0XG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9XCJLbm93bGVkZ2VzXCJcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9eygpPT50aGlzLm9uU2VsZWN0KCl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtbXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiVGFza1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnJlZnMudGFzay5zaG93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9lZGl0b3IvZm9ybWF0LWxpc3QtbnVtYmVyZWRcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlB1Ymxpc2hcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ3B1Ymxpc2gnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2ltYWdlL2NhbWVyYS1yb2xsXCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiRmFtaWx5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy5mYW1pbHkuc2hvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL3N1cGVydmlzb3ItYWNjb3VudFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwic2V0dGluZ1wiLCBsYWJlbDpcIkFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2FjY291bnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKCdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8VGFza1F1ZXJ5Q29tbWFuZCByZWY9XCJ0YXNrXCIgd2hlbj17d2hlbn0gb25DaGFuZ2U9eygpPT50aGlzLm9uQ2hhbmdlRGF0ZSgpfS8+XG4gICAgICAgICAgICAgICAgPEZhbWlseUNvbW1hbmQgcmVmPVwiZmFtaWx5XCIgY2hpbGQ9e3RoaXMucHJvcHMuY2hpbGR9Lz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXG4gICAgcmVuZGVyQ29udGVudCh3aGVuKXtcbiAgICAgICAgdmFyIHtjaGlsZH09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHttb2RlbH09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIGhlYWRlclN0eWxlPXtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6J2RhcmtvcmFuZ2UnLFxuICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzonZWxsaXBzaXMnLFxuICAgICAgICAgICAgICAgIHdoaXRlU3BhY2U6J25vd3JhcCcsXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOidsZWZ0JyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTpcInh4LWxhcmdlXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzoxMCxcbiAgICAgICAgICAgICAgICBtYXJnaW46MFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByb3BzPXttb2RlbCxoZWFkZXJTdHlsZX1cblxuICAgICAgICBpZignYXBwcm92aW5ncyc9PXdoZW4pe1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcyx7XG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyOlwiQXBwcm92aW5nc1wiLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOlByb3ZpbmdJdGVtLFxuICAgICAgICAgICAgICAgIGVtcHR5Oig8RW1wdHkgdGV4dD1cIk5vYm9keSBwbGF5ZWQgd2l0aCB5b3VyIGNoaWxkcmVuIVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn0vPilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmFyIGQ9TWF0aC5mbG9vcigoRGF0ZS5ub3coKS13aGVuLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKVxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihwcm9wcyx7XG4gICAgICAgICAgICAgICAgc3ViaGVhZGVyOiB0aGlzLl9mb3JtYXQod2hlbiksXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6VGFza0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6ZD4wID9cbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgWW91IGRpZG5vdCBwbGF5IHdpdGggJHtjaGlsZC5uYW1lfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KSA6XG4gICAgICAgICAgICAgICAgICAgICg8RW1wdHkgdGV4dD17YEZpbmQgZnVuIHRvcGljIE5PVyB0byBwbGF5IHdpdGggJHtjaGlsZC5uYW1lfSBgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVG91Y2hUYXA9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpfSAvPilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPExpc3Qgey4uLnByb3BzfS8+XG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCxlKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdSZWZyZXNoJzpcbiAgICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvbkNoYW5nZURhdGUoZCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiZGFzaGJvYXJkXCIse3doZW46dGhpcy5fZm9ybWF0KGQpfSlcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7d2hlbjpkfSlcbiAgICAgICAgdGhpcy5yZWZzLnRhc2suZGlzbWlzcygpXG4gICAgfVxuXG4gICAgX2Zvcm1hdChkKXtcbiAgICAgICAgc3dpdGNoKE1hdGguZmxvb3IoKERhdGUubm93KCktZC5nZXRUaW1lKCkpLygxMDAwKjI0KjYwKjYwKSkpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gJ1RvZGF5J1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gJ1llc3RlcmRheSdcbiAgICAgICAgICAgIGNhc2UgLTE6IHJldHVybiAnVG9tb3Jyb3cnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGQuZ2V0RnVsbFllYXIoKSsnLScrKGQuZ2V0TW9udGgoKSsxKSsnLScrZC5nZXREYXRlKClcbiAgICB9XG5cbiAgICBfcGFyc2VEYXRlKHdoZW4pe1xuICAgICAgICBpZih0eXBlb2Yod2hlbikhPSdzdHJpbmcnKXtcbiAgICAgICAgICAgIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgIHJldHVybiB3aGVuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKClcbiAgICAgICAgdG9kYXkuc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgc3dpdGNoKHdoZW4udG9Mb3dlckNhc2UoKSl7XG4gICAgICAgIGNhc2UgJ2FwcHJvdmluZ3MnOlxuICAgICAgICAgICAgcmV0dXJuICdhcHByb3ZpbmdzJ1xuICAgICAgICBjYXNlICd0b2RheSc6XG4gICAgICAgICAgICByZXR1cm4gdG9kYXlcbiAgICAgICAgY2FzZSAneWVzdGVyZGF5JzpcbiAgICAgICAgICAgIHJldHVybiBEYXRlLkhlbHBlci5hZGREYXlzKHRvZGF5LC0xKVxuICAgICAgICBjYXNlICd0b21vcnJvdyc6XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5IZWxwZXIuYWRkRGF5cyh0b2RheSwxKVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgd2hlbj1uZXcgRGF0ZShEYXRlLnBhcnNlKHdoZW4pKVxuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgIH1cbn1cbkJhYnlEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cbmNsYXNzIFRhc2tJdGVtIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge21vZGVsOnRhc2ssIGltYWdlLCBhY3Rpb25zLCAuLi5vdGhlcnN9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7a25vd2xlZGdlfT10YXNrO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudFwiIG9uQ2xpY2s9e3RoaXMub25EZXRhaWwuYmluZCh0aGlzKX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+e3Rhc2sua25vd2xlZGdlLnRpdGxlfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob3RvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17dGFzay5waG90b3x8aW1hZ2V9Lz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbiAgICBvbkRldGFpbCgpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygndGFzaycsdGhpcy5wcm9wcy5tb2RlbClcbiAgICB9XG59XG5UYXNrSXRlbS5kZWZhdWx0UHJvcHM9e1xuICAgIGltYWdlOlwiaW1hZ2VzL3Rhc2suanBnXCJcbn1cblxuY2xhc3MgUHJvdmluZ0l0ZW0gZXh0ZW5kcyBUYXNrSXRlbXt9XG5cbmNsYXNzIFRhc2tRdWVyeUNvbW1hbmQgZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHt3aGVuLCBvbkNoYW5nZX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGRpc3BsYXlEYXRlPXdoZW47XG4gICAgICAgIHdoZW49PSdhcHByb3ZpbmdzJyAmJiAoZGlzcGxheURhdGU9bmV3IERhdGUoKSwgd2hlbj1udWxsKTtcbiAgICAgICAgd2hlbiAmJiB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgIGRpc3BsYXlEYXRlICYmIGRpc3BsYXlEYXRlLnNldEhvdXJzKDAsMCwwLDApXG5cbiAgICAgICAgcmV0dXJuIFsoPExpc3Qga2V5PVwib3RoZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9eyg8QXZhdGFyPkE8L0F2YXRhcj4pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9Pm9uQ2hhbmdlKFwiYXBwcm92aW5nc1wiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZGFyeVRleHQ9XCJPdGhlciBmYW1pbGllcyBwbGF5ZWQsIG5lZWQgeW91ciBhcHByb3ZhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBBcHByb3ZpbmdzXG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5EaXZpZGVyLz5cbiAgICAgICAgICAgICAgICA8L0xpc3Q+KSxcbiAgICAgICAgICAgICAgICAoPGRpdiBrZXk9XCJjYWxlbmRhclwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXt3aGVufVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGU9e2Rpc3BsYXlEYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZT17RGF0ZS5IZWxwZXIuYWRkRGF5cyhkaXNwbGF5RGF0ZSwtMzEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17RGF0ZS5IZWxwZXIuYWRkRGF5cyhkaXNwbGF5RGF0ZSwzMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkRheVRvdWNoVGFwPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PildXG4gICAgfVxufVxuXG5cblxuY2xhc3MgRmFtaWx5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIgcm91dGVyPXRoaXMuY29udGV4dC5yb3V0ZXIsXG4gICAgICAgICAgICB7Y2hpbGQ9e319PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBjaGlsZHJlbj1kYkZhbWlseS5jaGlsZHJlbixcbiAgICAgICAgICAgIGxlbj1jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgICB1aUNoaWxkcmVuPWNoaWxkcmVuLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICB2YXIgYXZhdGFyO1xuICAgICAgICAgICAgICAgIGlmKGEucGhvdG8pXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBzcmM9e2EucGhvdG99Lz4pXG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBob3RvPSg8UGhvdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uUGhvdG89eyh1cmwpPT50aGlzLnNob3J0Y3V0UGhvdG8oYSx1cmwpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblJhdGlvPXsyLzN9IHdpZHRoPXs0MH0gaGVpZ2h0PXs0MH0vPilcblxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI9KDxBdmF0YXIgaWNvbj17cGhvdG99Lz4pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2EuX2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIsZGJGYW1pbHkuY3VycmVudENoaWxkPWEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17YXZhdGFyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPlxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgYXBwZW5kZXI9KFxuICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PVwiY3JlYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnJvdXRlci50cmFuc2l0aW9uVG8oXCJiYWJ5XCIpfVxuICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXs8QXZhdGFyPis8L0F2YXRhcj59ID5cbiAgICAgICAgICAgICAgICAgICAgSSBoYXZlIG1vcmUgY2hpbGRyZW4hXG4gICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+KSxcbiAgICAgICAgICAgIGludml0ZXI9KFxuICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PVwiaW52aXRlclwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7cGFkZGluZ0JvdHRvbTowLHBhZGRpbmdUb3A6MCx0ZXh0QWxpZ246J2xlZnQnfX1cbiAgICAgICAgICAgICAgICAgICAgcmlnaHRBdmF0YXI9ezxBdmF0YXIgb25DbGljaz17dGhpcy5pbnZpdGUuYmluZCh0aGlzKX0+KzwvQXZhdGFyPn0gPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDonNTQlJyxtYXJnaW5SaWdodDoyLCBib3JkZXI6MCwgYm9yZGVyQm90dG9tOicxcHggc29saWQgI2VlZScsIHBhZGRpbmc6NX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi5omL5py65Y+3L+eZu+W9lei0puWPt1wiLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3t3aWR0aDonNDUlJyxib3JkZXI6MCwgYm9yZGVyQm90dG9tOicxcHggc29saWQgI2VlZScsIHBhZGRpbmc6NX19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwicmVsYXRpb25zaGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17YOS4jiR7Y2hpbGQubmFtZXx8J+WuneWunSd955qE5YWz57O7YH0vPlxuICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPik7XG5cbiAgICAgICAgICAgIHJldHVybiBbKFxuICAgICAgICAgICAgICAgIDxMaXN0IGtleT1cImNoaWxkcmVuXCI+XG4gICAgICAgICAgICAgICAgICAgIHt1aUNoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgICB7bGVuID8gKDxMaXN0LkRpdmlkZXIgaW5zZXQ9e3RydWV9Lz4pIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAge2FwcGVuZGVyfVxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLChcbiAgICAgICAgICAgICAgICA8TGlzdCBrZXk9XCJpbnZpdGVcIiBzdWJoZWFkZXI9XCLpgoDor7flrrbkurpcIiBzdHlsZT17e21hcmdpblRvcDo1fX0+XG4gICAgICAgICAgICAgICAgICAgIHtpbnZpdGVyfVxuICAgICAgICAgICAgICAgIDwvTGlzdD4pXTtcbiAgICB9XG4gICAgc2hvcnRjdXRQaG90byhjaGlsZCwgdXJsKXtcbiAgICAgICAgZGJGYW1pbHkudXBzZXJ0KGNoaWxkLHtwaG90bzp1cmx9KVxuICAgIH1cbiAgICBpbnZpdGUoKXtcbiAgICAgICAgdmFyIHtpZCwgcmVsYXRpb25zaGlwfT10aGlzLnJlZnNcbiAgICAgICAgaWQ9aWQuZ2V0RE9NTm9kZSgpLnZhbHVlXG4gICAgICAgIHJlbGF0aW9uc2hpcD1yZWxhdGlvbnNoaXAuZ2V0RE9NTm9kZSgpLnZhbHVlXG5cbiAgICAgICAgaWYoaWQgJiYgcmVsYXRpb25zaGlwKXtcbiAgICAgICAgICAgIGRiRmFtaWx5Lmludml0ZShpZCwgcmVsYXRpb25zaGlwKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuRmFtaWx5Q29tbWFuZC5jb250ZXh0VHlwZXM9e3JvdXRlcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG4iXX0=