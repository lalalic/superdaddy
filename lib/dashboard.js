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

            return _qiliApp.React.createElement(
                'div',
                null,
                _qiliApp.React.createElement(_rewards2.default, { child: this.props.child }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRUs7SUFBTTtJQUFTO0lBQU07SUFBUTtJQUFXO0lBQU07QUFBL0MsSUFBd0QseUJBQXhEO0lBQ0MsZ0JBQWUsV0FBZjs7SUFJZ0I7Ozs7Ozs7Ozs7OzhDQUNLLFdBQVU7QUFDNUIsbUJBQU8sVUFBVSxLQUFWLElBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FESTs7OztpQ0FHeEI7Z0JBQ0MsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQUREOztBQUVKLG1CQUFPLFFBQVMsNkJBQUMsYUFBRCxFQUFtQixLQUFLLEtBQUwsQ0FBNUIsR0FBK0MsNkJBQUMsZUFBRCxFQUFxQixLQUFLLEtBQUwsQ0FBcEUsQ0FGSDs7OztXQUpTOzs7Ozs7Ozs7O0lBYVI7Ozs7Ozs7Ozs7O2lDQUNEOzs7QUFDSixtQkFDSTs7O2dCQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLDZDQUFMO0FBQ0gsMEJBQU0sa0RBQU47QUFDQSw2QkFBUzsrQkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLE1BQWpDO3FCQUFKLEVBRmIsQ0FESjtnQkFJSSw2QkFBQyxVQUFEO0FBQ0ksK0JBQVUsU0FBVjtBQUNBLDZCQUFRLFFBQVI7O0FBRUEsMkJBQU8sQ0FDSCxFQUFDLFFBQU8sWUFBUDtBQUNHLGtDQUFTO21DQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsWUFBakM7eUJBQUo7QUFDVCwrQ0FGSixFQURHLEVBSUgsRUFBQyxRQUFPLFFBQVA7QUFDRyxrQ0FBUzttQ0FBSSxPQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLElBQWpCO3lCQUFKO0FBQ1QsOEJBQUssUUFBUSxxREFBUixDQUFMLEVBTkQsRUFPSCxFQUFDLFFBQU8sU0FBUCxFQUFrQixPQUFNLFNBQU47QUFDZixrQ0FBUzttQ0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLFNBQWpDO3lCQUFKO0FBQ1QsOEJBQU0sUUFBUSw4Q0FBUixDQUFOLEVBVEQsQ0FBUDtpQkFKSixDQUpKO2dCQW9CSSw2QkFBQyxhQUFELElBQWUsS0FBSSxRQUFKLEVBQWYsQ0FwQko7YUFESixDQURJOzs7O1dBREM7OztBQTJCYixnQkFBZ0IsWUFBaEIsR0FBNkIsRUFBQyxRQUFPLGVBQU0sU0FBTixDQUFnQixJQUFoQixFQUFyQzs7Ozs7O0lBS2E7OztBQUNULGFBRFMsYUFDVCxDQUFZLEtBQVosRUFBa0I7OEJBRFQsZUFDUzs7NEVBRFQsMEJBRUMsUUFEUTs7QUFFZCxlQUFLLEtBQUwsR0FBVyxPQUFLLGFBQUwsRUFBWCxDQUZjOztLQUFsQjs7aUJBRFM7O3NDQU1LLE9BQU07QUFDWix3QkFBTSxJQUFJLElBQUosRUFBTixDQURZOzt1QkFFVSxTQUFPLEtBQUssS0FBTCxDQUZqQjs7d0NBRVgsT0FBUSxLQUZHO2dCQUVILHdDQUFLLHlCQUZGOztBQUdoQixtQkFBSyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBTCxDQUhnQjtBQUloQixnQkFBSSxRQUFNLFFBQU0sWUFBTixHQUFxQixTQUFPLFVBQVAsRUFBckIsR0FBMkMsU0FBTyxNQUFQLENBQWMsSUFBZCxDQUEzQyxDQUpNO0FBS2hCLG1CQUFPLEVBQUMsVUFBRCxFQUFPLFlBQVAsRUFBUCxDQUxnQjs7OztrREFRTSxXQUFVO0FBQzVCLHdCQUFNLElBQUksSUFBSixFQUFOLENBRDRCO2dCQUUzQixZQUFvQyxVQUFwQyxVQUYyQjt3Q0FFUyxVQUF6QixPQUFRLFNBRlE7QUFFNUIsZ0JBQW9CLGlEQUFTLDZCQUE3QixDQUY0Qjt5QkFHQyxLQUFLLEtBQUwsQ0FIRDtnQkFHM0IscUJBSDJCOzRDQUdwQixPQUFRLEtBSFk7Z0JBR1osMENBQUssMkJBSE87O0FBSWhDLGdCQUFJLGFBQVcsS0FBWCxJQUFvQixTQUFTLE9BQVQsTUFBb0IsS0FBSyxPQUFMLEVBQXBCLEVBQ3BCLEtBQUssUUFBTCxDQUFjLEtBQUssYUFBTCxDQUFtQixTQUFuQixDQUFkLEVBREo7Ozs7aUNBSUk7Ozt5QkFDYyxLQUFLLEtBQUwsQ0FEZDtnQkFDQyxtQkFERDtnQkFDTyxxQkFEUDs7QUFFSixtQkFDSTs7O2dCQUNJLGtEQUFTLE9BQU8sS0FBSyxLQUFMLENBQVcsS0FBWCxFQUFoQixDQURKO2dCQUdLLEtBQUssYUFBTCxDQUFtQixJQUFuQixDQUhMO2dCQUtSLDZCQUFDLFVBQUQ7QUFDZ0IsK0JBQVUsU0FBVjtBQUNBLDZCQUFRLFlBQVI7QUFDQSw4QkFBVTsrQkFBSSxPQUFLLFFBQUw7cUJBQUo7QUFDViwyQkFBTyxDQUNILEVBQUMsUUFBTyxNQUFQO0FBQ0csa0NBQVM7bUNBQUksT0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLElBQWY7eUJBQUo7QUFDVCw4QkFBSyxRQUFRLHVEQUFSLENBQUwsRUFIRCxFQUlILEVBQUMsUUFBTyxTQUFQO0FBQ0csa0NBQVM7bUNBQUksT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixZQUFwQixDQUFpQyxTQUFqQzt5QkFBSjtBQUNULDhCQUFLLFFBQVEsNkNBQVIsQ0FBTCxFQU5ELEVBT0gsRUFBQyxRQUFPLFlBQVA7QUFDRyxrQ0FBUzttQ0FBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLFlBQWpDO3lCQUFKO0FBQ1QsK0NBRkosRUFQRyxFQVVILEVBQUMsUUFBTyxRQUFQO0FBQ0csa0NBQVM7bUNBQUksT0FBSyxJQUFMLENBQVUsTUFBVixDQUFpQixJQUFqQjt5QkFBSjtBQUNULDhCQUFLLFFBQVEscURBQVIsQ0FBTCxFQVpELEVBYUgsRUFBQyxRQUFPLFNBQVAsRUFBa0IsT0FBTSxTQUFOO0FBQ2Ysa0NBQVM7bUNBQUksT0FBSyxPQUFMLENBQWEsTUFBYixDQUFvQixZQUFwQixDQUFpQyxTQUFqQzt5QkFBSjtBQUNULDhCQUFNLFFBQVEsOENBQVIsQ0FBTixFQWZELENBQVA7aUJBSmhCLENBTFE7Z0JBMkJJLDZCQUFDLGdCQUFELElBQWtCLEtBQUksTUFBSixFQUFXLE1BQU0sSUFBTixFQUFZLFVBQVU7K0JBQUksT0FBSyxZQUFMO3FCQUFKLEVBQW5ELENBM0JKO2dCQTRCSSw2QkFBQyxhQUFELElBQWUsS0FBSSxRQUFKLEVBQWEsT0FBTyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEVBQW5DLENBNUJKO2FBREosQ0FGSTs7OztzQ0FvQ00sTUFBSzs7O0FBQ1gsZ0JBQUMsUUFBTyxLQUFLLEtBQUwsQ0FBUCxLQUFELENBRFc7QUFFWCxnQkFBQyxRQUFPLEtBQUssS0FBTCxDQUFQLEtBQUQsQ0FGVztBQUdYLDhCQUFZO0FBQ1Isd0JBQVEsR0FBUjtBQUNBLGlDQUFnQixZQUFoQjtBQUNBLDhCQUFhLFVBQWI7QUFDQSw0QkFBVyxRQUFYO0FBQ0EsMkJBQVUsTUFBVjtBQUNBLDBCQUFTLFVBQVQ7QUFDQSx5QkFBUSxFQUFSO0FBQ0Esd0JBQU8sQ0FBUDthQVJKLENBSFc7QUFhWCx3QkFBTSxFQUFDLFlBQUQsRUFBTyx3QkFBUCxFQUFOLENBYlc7O0FBZWYsZ0JBQUcsZ0JBQWMsSUFBZCxFQUFtQjtBQUNsQix1QkFBTyxNQUFQLENBQWMsS0FBZCxFQUFvQjtBQUNoQiwrQkFBVSxZQUFWO0FBQ0EsOEJBQVMsV0FBVDtBQUNBLDJCQUFPLDZCQUFDLEtBQUQsSUFBTyxNQUFLLG1DQUFMO0FBQ0YsOEJBQU0sa0RBQU4sRUFETCxDQUFQO2lCQUhKLEVBRGtCO2FBQXRCLE1BT0s7QUFDRCxvQkFBSSxJQUFFLEtBQUssS0FBTCxDQUFXLENBQUMsS0FBSyxHQUFMLEtBQVcsS0FBSyxPQUFMLEVBQVgsQ0FBRCxJQUE2QixPQUFLLEVBQUwsR0FBUSxFQUFSLEdBQVcsRUFBWCxDQUE3QixDQUFiLENBREg7QUFFRCx1QkFBTyxNQUFQLENBQWMsS0FBZCxFQUFvQjtBQUNoQiwrQkFBVyxLQUFLLE9BQUwsQ0FBYSxJQUFiLENBQVg7QUFDQSw4QkFBUyxRQUFUO0FBQ0EsMkJBQU0sSUFBRSxDQUFGLEdBQ0QsNkJBQUMsS0FBRCxJQUFPLGdDQUE4QixNQUFNLElBQU47QUFDbEMsOEJBQU0sa0RBQU4sRUFESCxDQURDLEdBR0QsNkJBQUMsS0FBRCxJQUFPLDJDQUF5QyxNQUFNLElBQU4sTUFBekM7QUFDSiw4QkFBTSxrREFBTjtBQUNBLG9DQUFZO21DQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsWUFBakM7eUJBQUosRUFGZixDQUhDO2lCQUhWLEVBRkM7YUFQTDs7QUFxQkEsbUJBQU8sNkJBQUMsSUFBRCxFQUFVLEtBQVYsQ0FBUCxDQXBDZTs7OztpQ0F1Q1YsU0FBUSxHQUFFO0FBQ2Ysb0JBQU8sT0FBUDtBQUNBLHFCQUFLLFNBQUw7QUFDSSx5QkFBSyxXQUFMLEdBREo7QUFFSSwwQkFGSjtBQURBLGFBRGU7Ozs7cUNBT04sR0FBRTtBQUNYLGlCQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLFdBQWpDLEVBQTZDLEVBQUMsTUFBSyxLQUFLLE9BQUwsQ0FBYSxDQUFiLENBQUwsRUFBOUMsRUFEVztBQUVYLGlCQUFLLFFBQUwsQ0FBYyxFQUFDLE1BQUssQ0FBTCxFQUFmLEVBRlc7QUFHWCxpQkFBSyxJQUFMLENBQVUsSUFBVixDQUFlLE9BQWYsR0FIVzs7OztnQ0FNUCxHQUFFO0FBQ04sb0JBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxLQUFLLEdBQUwsS0FBVyxFQUFFLE9BQUYsRUFBWCxDQUFELElBQTBCLE9BQUssRUFBTCxHQUFRLEVBQVIsR0FBVyxFQUFYLENBQTFCLENBQWxCO0FBQ0kscUJBQUssQ0FBTDtBQUFRLDJCQUFPLE9BQVAsQ0FBUjtBQURKLHFCQUVTLENBQUw7QUFBUSwyQkFBTyxXQUFQLENBQVI7QUFGSixxQkFHUyxDQUFDLENBQUQ7QUFBSSwyQkFBTyxVQUFQLENBQVQ7QUFISixhQURNO0FBTU4sbUJBQU8sRUFBRSxXQUFGLEtBQWdCLEdBQWhCLElBQXFCLEVBQUUsUUFBRixLQUFhLENBQWIsQ0FBckIsR0FBcUMsR0FBckMsR0FBeUMsRUFBRSxPQUFGLEVBQXpDLENBTkQ7Ozs7bUNBU0MsTUFBSztBQUNaLGdCQUFHLE9BQU8sSUFBUCxJQUFjLFFBQWQsRUFBdUI7QUFDdEIscUJBQUssUUFBTCxDQUFjLENBQWQsRUFBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsQ0FBcEIsRUFEc0I7QUFFdEIsdUJBQU8sSUFBUCxDQUZzQjthQUExQjtBQUlBLGdCQUFJLFFBQU0sSUFBSSxJQUFKLEVBQU4sQ0FMUTtBQU1aLGtCQUFNLFFBQU4sQ0FBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBTlk7QUFPWixvQkFBTyxLQUFLLFdBQUwsRUFBUDtBQUNBLHFCQUFLLFlBQUw7QUFDSSwyQkFBTyxZQUFQLENBREo7QUFEQSxxQkFHSyxPQUFMO0FBQ0ksMkJBQU8sS0FBUCxDQURKO0FBSEEscUJBS0ssV0FBTDtBQUNJLDJCQUFPLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsS0FBcEIsRUFBMEIsQ0FBQyxDQUFELENBQWpDLENBREo7QUFMQSxxQkFPSyxVQUFMO0FBQ0ksMkJBQU8sS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixLQUFwQixFQUEwQixDQUExQixDQUFQLENBREo7QUFQQTtBQVVJLDJCQUFLLElBQUksSUFBSixDQUFTLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBVCxDQUFMLENBREo7QUFFSSx5QkFBSyxRQUFMLENBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixDQUFwQixFQUZKO0FBR0ksMkJBQU8sSUFBUCxDQUhKO0FBVEEsYUFQWTs7OztXQXZIUDs7O0FBOEliLGNBQWMsWUFBZCxHQUEyQixFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLElBQWhCLEVBQW5DOztJQUVNOzs7Ozs7Ozs7OztpQ0FDTTswQkFDd0MsS0FBSyxLQUFMLENBRHhDO2dCQUNPLGVBQU4sTUFERDtnQkFDYSxzQkFEYjtnQkFDb0IsMEJBRHBCO0FBQ0EsZ0JBQWdDLHlFQUFoQyxDQURBO2dCQUVDLFlBQVcsS0FBWCxVQUZEOztBQUdKLG1CQUNJOztrQkFBSyxXQUFVLElBQVYsRUFBTDtnQkFDSTs7c0JBQUssV0FBVSxTQUFWLEVBQW9CLFNBQVMsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFULEVBQXpCO29CQUNJOzs7d0JBQ0k7Ozs0QkFBSyxLQUFLLFNBQUwsQ0FBZSxLQUFmO3lCQURUO3FCQURKO29CQUlJOzswQkFBSyxXQUFVLE9BQVYsRUFBTDt3QkFDSSxzQ0FBSyxLQUFLLEtBQUssS0FBTCxJQUFZLEtBQVosRUFBVixDQURKO3FCQUpKO2lCQURKO2FBREosQ0FISTs7OzttQ0FnQkU7QUFDTixpQkFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixZQUFwQixDQUFpQyxNQUFqQyxFQUF3QyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQXhDLENBRE07Ozs7V0FqQlI7OztBQXFCTixTQUFTLFlBQVQsR0FBc0I7QUFDbEIsV0FBTSxpQkFBTjtDQURKOztJQUlNOzs7Ozs7Ozs7O0VBQW9COztJQUVwQjs7Ozs7Ozs7Ozs7d0NBQ2E7MEJBQ1UsS0FBSyxLQUFMLENBRFY7Z0JBQ04sb0JBRE07QUFDUCxnQkFBTywyQkFBUCxDQURPO0FBRVAsOEJBQVksSUFBWixDQUZPO0FBR1gsb0JBQU0sWUFBTixLQUF1QixjQUFZLElBQUksSUFBSixFQUFaLEVBQXdCLE9BQUssSUFBTCxDQUEvQyxDQUhXO0FBSVgsb0JBQVEsS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixDQUFwQixDQUFSLENBSlc7QUFLWCwyQkFBZSxZQUFZLFFBQVosQ0FBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsQ0FBZixDQUxXOztBQU9YLG1CQUFPLENBQUU7QUFBQyxvQkFBRDtrQkFBTSxLQUFJLFFBQUosRUFBTjtnQkFDRztBQUFDLHlCQUFLLElBQU47O0FBQ0ksb0NBQWE7Ozs7eUJBQWI7QUFDQSxpQ0FBUzttQ0FBSSxTQUFTLFlBQVQ7eUJBQUo7QUFDVCx1Q0FBYywyQ0FBZDtxQkFISjs7aUJBREg7Z0JBUUcsNkJBQUMsS0FBSyxPQUFOLE9BUkg7YUFBRixFQVVFOztrQkFBSyxLQUFJLFVBQUosRUFBTDtnQkFDRztBQUNJLDhCQUFVLElBQVY7QUFDQSxpQ0FBYSxXQUFiO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixXQUFwQixFQUFnQyxDQUFDLEVBQUQsQ0FBekM7QUFDQSw2QkFBUyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFdBQXBCLEVBQWdDLEVBQWhDLENBQVQ7QUFDQSxtQ0FBZSxRQUFmO2lCQUxKLENBREg7YUFWRixDQUFQLENBUFc7Ozs7V0FEYjtFQUF5Qjs7SUFnQ3pCOzs7Ozs7Ozs7Ozt3Q0FDYTtBQUNQLHlCQUFPLEtBQUssT0FBTCxDQUFhLE1BQWIsQ0FEQTsrQkFFSSxLQUFLLEtBQUwsQ0FBVixNQUZNO0FBRVAsZ0JBQUMscUNBQU0saUJBQVAsQ0FGTztBQUdQLDJCQUFTLFdBQVMsUUFBVCxDQUhGO0FBSVAsc0JBQUksU0FBUyxNQUFULENBSkc7QUFLUCw2QkFBVyxTQUFTLEdBQVQsQ0FBYSxVQUFTLENBQVQsRUFBVzs7O0FBQy9CLG9CQUFJLE1BQUosQ0FEK0I7QUFFL0Isb0JBQUcsRUFBRSxLQUFGLEVBQ0MsU0FBUSxtREFBUSxLQUFLLEVBQUUsS0FBRixFQUFiLENBQVIsQ0FESixLQUVJO0FBQ0Esd0JBQUksUUFBTyw2QkFBQyxLQUFEO0FBQ1AsaUNBQVMsaUJBQUMsR0FBRDttQ0FBTyxRQUFLLGFBQUwsQ0FBbUIsQ0FBbkIsRUFBcUIsR0FBckI7eUJBQVA7QUFDVCxtQ0FBVyxJQUFFLENBQUYsRUFBSyxPQUFPLEVBQVAsRUFBVyxRQUFRLEVBQVIsRUFGcEIsQ0FBUCxDQURKOztBQUtBLDZCQUFRLG1EQUFRLE1BQU0sS0FBTixFQUFSLENBQVIsQ0FMQTtpQkFGSjs7QUFVQSx1QkFDSTtBQUFDLHlCQUFLLElBQU47c0JBQVcsS0FBSyxFQUFFLEdBQUY7QUFDWixpQ0FBUzttQ0FBSSxPQUFPLFlBQVAsQ0FBb0IsTUFBcEIsRUFBMkIsV0FBUyxZQUFULEdBQXNCLENBQXRCO3lCQUEvQjtBQUNULG9DQUFZLE1BQVosRUFGSjtvQkFHSyxFQUFFLElBQUY7aUJBSlQsQ0FaK0I7YUFBWCxDQUF4QixDQUxPO0FBeUJQLDJCQUNJO0FBQUMscUJBQUssSUFBTjtrQkFBVyxLQUFJLFFBQUo7QUFDUCw2QkFBUzsrQkFBSSxPQUFPLFlBQVAsQ0FBb0IsTUFBcEI7cUJBQUo7QUFDVCxnQ0FBWTs7OztxQkFBWixFQUZKOzthQURKLENBekJPO0FBK0JQLDBCQUNJO0FBQUMscUJBQUssSUFBTjtrQkFBVyxLQUFJLFNBQUo7QUFDUCwyQkFBTyxFQUFDLGVBQWMsQ0FBZCxFQUFnQixZQUFXLENBQVgsRUFBYSxXQUFVLE1BQVYsRUFBckM7QUFDQSxpQ0FBYTs7MEJBQVEsU0FBUyxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQVQsRUFBUjs7cUJBQWIsRUFGSjtnQkFHUTtBQUNJLDJCQUFPLEVBQUMsT0FBTSxLQUFOLEVBQVksYUFBWSxDQUFaLEVBQWUsUUFBTyxDQUFQLEVBQVUsY0FBYSxnQkFBYixFQUErQixTQUFRLENBQVIsRUFBNUU7QUFDQSx5QkFBSSxJQUFKO0FBQ0EsaUNBQVksVUFBWixFQUhKLENBSFI7Z0JBUVE7QUFDSSwyQkFBTyxFQUFDLE9BQU0sS0FBTixFQUFZLFFBQU8sQ0FBUCxFQUFVLGNBQWEsZ0JBQWIsRUFBK0IsU0FBUSxDQUFSLEVBQTdEO0FBQ0EseUJBQUksY0FBSjtBQUNBLHdDQUFpQixNQUFNLElBQU4sSUFBWSxJQUFaLFNBQWpCLEVBSEosQ0FSUjthQURKLENBL0JPOztBQThDUCxtQkFBTyxDQUNIO0FBQUMsb0JBQUQ7a0JBQU0sS0FBSSxVQUFKLEVBQU47Z0JBQ0ssVUFETDtnQkFFSyxNQUFPLDZCQUFDLEtBQUssT0FBTixJQUFjLE9BQU8sSUFBUCxFQUFkLENBQVAsR0FBdUMsSUFBdkM7Z0JBQ0EsUUFITDthQURHLEVBTUg7QUFBQyxvQkFBRDtrQkFBTSxLQUFJLFFBQUosRUFBYSxXQUFVLE1BQVYsRUFBaUIsT0FBTyxFQUFDLFdBQVUsQ0FBVixFQUFSLEVBQXBDO2dCQUNLLE9BREw7YUFORyxDQUFQLENBOUNPOzs7O3NDQXdERCxPQUFPLEtBQUk7QUFDckIsdUJBQVMsTUFBVCxDQUFnQixLQUFoQixFQUFzQixFQUFDLE9BQU0sR0FBTixFQUF2QixFQURxQjs7OztpQ0FHakI7d0JBQ21CLEtBQUssSUFBTCxDQURuQjtnQkFDQyxjQUREO2dCQUNLLGtDQURMOztBQUVKLGlCQUFHLEdBQUcsVUFBSCxHQUFnQixLQUFoQixDQUZDO0FBR0osMkJBQWEsYUFBYSxVQUFiLEdBQTBCLEtBQTFCLENBSFQ7O0FBS0osZ0JBQUcsTUFBTSxZQUFOLEVBQW1CO0FBQ2xCLDJCQUFTLE1BQVQsQ0FBZ0IsRUFBaEIsRUFBb0IsWUFBcEIsRUFDSyxJQURMLENBQ1UsWUFBVSxFQUFWLENBRFYsQ0FEa0I7YUFBdEI7Ozs7V0FqRUY7RUFBc0I7O0FBeUU1QixjQUFjLFlBQWQsR0FBMkIsRUFBQyxRQUFRLGVBQU0sU0FBTixDQUFnQixJQUFoQixFQUFwQyIsImZpbGUiOiJkYXNoYm9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCxVSSxSb3V0ZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtBdmF0YXIsUGFwZXIsIFJhZGlvR3JvdXAsIFJhZGlvQnV0dG9uLEZvbnRJY29uLEljb25CdXR0b24sVGV4dEZpZWxkLCBUYWJzLCBUYWIsIERhdGVQaWNrZXJ9IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtUYXNrIGFzIGRiVGFzayxGYW1pbHkgYXMgZGJGYW1pbHl9IGZyb20gJy4vZGInXG5pbXBvcnQgQ2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IFJld2FyZHMgZnJvbSAnLi9jb21wb25lbnRzL3Jld2FyZHMnXG5pbXBvcnQgTG9nbyBmcm9tICcuL2ljb25zL2xvZ28nXG5pbXBvcnQgSWNvbktub3dsZWRnZXMgZnJvbSBcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvY29tbXVuaWNhdGlvbi9kaWFscGFkXCJcblxudmFyIHtMaXN0LCBMb2FkaW5nLCBFbXB0eSxDb21tZW50LENvbW1hbmRCYXIsUGhvdG8sTWVzc2FnZXIsSWNvbnN9PVVJLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcyl7XG4gICAgICAgIHJldHVybiBuZXh0UHJvcHMuY2hpbGQhPXRoaXMucHJvcHMuY2hpbGRcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHNcbiAgICAgICAgcmV0dXJuIGNoaWxkID8gKDxCYWJ5RGFzaGJvYXJkIHsuLi50aGlzLnByb3BzfSAvPikgOiAoPEF1dGhvckRhc2hib2FyZCB7Li4udGhpcy5wcm9wc30vPilcbiAgICB9XG59XG5cbi8qKlxuQHdpdGhvdXQgY3VycmVudENoaWxkXG4qL1xuZXhwb3J0IGNsYXNzIEF1dGhvckRhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPEVtcHR5IHRleHQ9XCJTdGFydCBmcm9tIHlvdXIgZmlyc3QgYmFieSwgb3Igd2FsayBhcm91bmQhXCJcbiAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiKX0vPlxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiRmFtaWx5XCJcblxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIktub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJGYW1pbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLmZhbWlseS5zaG93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc3VwZXJ2aXNvci1hY2NvdW50XCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxGYW1pbHlDb21tYW5kIHJlZj1cImZhbWlseVwiLz5cbiAgICAgICAgICAgIDwvZGl2PilcbiAgICB9XG59XG5BdXRob3JEYXNoYm9hcmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6UmVhY3QuUHJvcFR5cGVzLmZ1bmN9XG5cbi8qKlxuQCB3aXRoIGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBjbGFzcyBCYWJ5RGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGU9dGhpcy5fcmVzb2x2ZU1vZGVsKClcbiAgICB9XG5cbiAgICBfcmVzb2x2ZU1vZGVsKHByb3BzKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKCksXG4gICAgICAgICAgICB7cGFyYW1zOnt3aGVuPXRvZGF5fX09cHJvcHN8fHRoaXMucHJvcHM7XG4gICAgICAgIHdoZW49dGhpcy5fcGFyc2VEYXRlKHdoZW4pXG4gICAgICAgIHZhciBtb2RlbD13aGVuPT0nYXBwcm92aW5ncycgPyBkYlRhc2suYXBwcm92aW5ncygpIDogZGJUYXNrLmJ5RGF0ZSh3aGVuKVxuICAgICAgICByZXR1cm4ge3doZW4sIG1vZGVsfVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgdmFyIHRvZGF5PW5ldyBEYXRlKCksXG4gICAgICAgICAgICB7bmV4dENoaWxkLCBwYXJhbXM6e25leHRXaGVuPXRvZGF5fX09bmV4dFByb3BzLFxuICAgICAgICAgICAge2NoaWxkLCBwYXJhbXM6e3doZW49dG9kYXl9fT10aGlzLnByb3BzXG4gICAgICAgIGlmIChuZXh0Q2hpbGQhPWNoaWxkIHx8IG5leHRXaGVuLmdldFRpbWUoKSE9d2hlbi5nZXRUaW1lKCkpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuX3Jlc29sdmVNb2RlbChuZXh0UHJvcHMpKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge3doZW4sIG1vZGVsfT10aGlzLnN0YXRlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxSZXdhcmRzIGNoaWxkPXt0aGlzLnByb3BzLmNoaWxkfS8+XG5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KHdoZW4pfVxuXG5cdFx0XHRcdDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PVwiS25vd2xlZGdlc1wiXG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXsoKT0+dGhpcy5vblNlbGVjdCgpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17W1xuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIlRhc2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnRhc2suc2hvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvZWRpdG9yL2Zvcm1hdC1saXN0LW51bWJlcmVkXCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJQdWJsaXNoXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdwdWJsaXNoJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9pbWFnZS9jYW1lcmEtcm9sbFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiS25vd2xlZGdlc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25Ubygna25vd2xlZGdlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246SWNvbktub3dsZWRnZXN9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIkZhbWlseVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLnJlZnMuZmFtaWx5LnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9zdXBlcnZpc29yLWFjY291bnRcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcInNldHRpbmdcIiwgbGFiZWw6XCJBY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdhY2NvdW50JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogcmVxdWlyZSgnbWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vYWNjb3VudC1ib3gnKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRhc2tRdWVyeUNvbW1hbmQgcmVmPVwidGFza1wiIHdoZW49e3doZW59IG9uQ2hhbmdlPXsoKT0+dGhpcy5vbkNoYW5nZURhdGUoKX0vPlxuICAgICAgICAgICAgICAgIDxGYW1pbHlDb21tYW5kIHJlZj1cImZhbWlseVwiIGNoaWxkPXt0aGlzLnByb3BzLmNoaWxkfS8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJlbmRlckNvbnRlbnQod2hlbil7XG4gICAgICAgIHZhciB7Y2hpbGR9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7bW9kZWx9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICBoZWFkZXJTdHlsZT17XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOidkYXJrb3JhbmdlJyxcbiAgICAgICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6J2VsbGlwc2lzJyxcbiAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOidub3dyYXAnLFxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjonbGVmdCcsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6XCJ4eC1sYXJnZVwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6MTAsXG4gICAgICAgICAgICAgICAgbWFyZ2luOjBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wcz17bW9kZWwsaGVhZGVyU3R5bGV9XG5cbiAgICAgICAgaWYoJ2FwcHJvdmluZ3MnPT13aGVuKXtcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMse1xuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjpcIkFwcHJvdmluZ3NcIixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpQcm92aW5nSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTooPEVtcHR5IHRleHQ9XCJOb2JvZHkgcGxheWVkIHdpdGggeW91ciBjaGlsZHJlbiFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHZhciBkPU1hdGguZmxvb3IoKERhdGUubm93KCktd2hlbi5nZXRUaW1lKCkpLygxMDAwKjI0KjYwKjYwKSlcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocHJvcHMse1xuICAgICAgICAgICAgICAgIHN1YmhlYWRlcjogdGhpcy5fZm9ybWF0KHdoZW4pLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOlRhc2tJdGVtLFxuICAgICAgICAgICAgICAgIGVtcHR5OmQ+MCA/XG4gICAgICAgICAgICAgICAgICAgICg8RW1wdHkgdGV4dD17YFlvdSBkaWRub3QgcGxheSB3aXRoICR7Y2hpbGQubmFtZX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj17PExvZ28vPn0vPikgOlxuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BGaW5kIGZ1biB0b3BpYyBOT1cgdG8gcGxheSB3aXRoICR7Y2hpbGQubmFtZX0gYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59XG4gICAgICAgICAgICAgICAgICAgICAgICBvblRvdWNoVGFwPXsoKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZXMnKX0gLz4pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxMaXN0IHsuLi5wcm9wc30vPlxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQsZSl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSAnUmVmcmVzaCc6XG4gICAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG4gICAgb25DaGFuZ2VEYXRlKGQpe1xuICAgICAgICB0aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImRhc2hib2FyZFwiLHt3aGVuOnRoaXMuX2Zvcm1hdChkKX0pXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3doZW46ZH0pXG4gICAgICAgIHRoaXMucmVmcy50YXNrLmRpc21pc3MoKVxuICAgIH1cblxuICAgIF9mb3JtYXQoZCl7XG4gICAgICAgIHN3aXRjaChNYXRoLmZsb29yKChEYXRlLm5vdygpLWQuZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuICdUb2RheSdcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuICdZZXN0ZXJkYXknXG4gICAgICAgICAgICBjYXNlIC0xOiByZXR1cm4gJ1RvbW9ycm93J1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkrJy0nKyhkLmdldE1vbnRoKCkrMSkrJy0nK2QuZ2V0RGF0ZSgpXG4gICAgfVxuXG4gICAgX3BhcnNlRGF0ZSh3aGVuKXtcbiAgICAgICAgaWYodHlwZW9mKHdoZW4pIT0nc3RyaW5nJyl7XG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpXG4gICAgICAgIHRvZGF5LnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgIHN3aXRjaCh3aGVuLnRvTG93ZXJDYXNlKCkpe1xuICAgICAgICBjYXNlICdhcHByb3ZpbmdzJzpcbiAgICAgICAgICAgIHJldHVybiAnYXBwcm92aW5ncydcbiAgICAgICAgY2FzZSAndG9kYXknOlxuICAgICAgICAgICAgcmV0dXJuIHRvZGF5XG4gICAgICAgIGNhc2UgJ3llc3RlcmRheSc6XG4gICAgICAgICAgICByZXR1cm4gRGF0ZS5IZWxwZXIuYWRkRGF5cyh0b2RheSwtMSlcbiAgICAgICAgY2FzZSAndG9tb3Jyb3cnOlxuICAgICAgICAgICAgcmV0dXJuIERhdGUuSGVscGVyLmFkZERheXModG9kYXksMSlcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHdoZW49bmV3IERhdGUoRGF0ZS5wYXJzZSh3aGVuKSlcbiAgICAgICAgICAgIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgICAgIHJldHVybiB3aGVuXG4gICAgICAgIH1cbiAgICB9XG59XG5CYWJ5RGFzaGJvYXJkLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG5jbGFzcyBUYXNrSXRlbSBleHRlbmRzIENvbXBvbmVudHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHttb2RlbDp0YXNrLCBpbWFnZSwgYWN0aW9ucywgLi4ub3RoZXJzfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge2tub3dsZWRnZX09dGFzaztcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIiBvbkNsaWNrPXt0aGlzLm9uRGV0YWlsLmJpbmQodGhpcyl9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0Pnt0YXNrLmtub3dsZWRnZS50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG90b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9e3Rhc2sucGhvdG98fGltYWdlfS8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgb25EZXRhaWwoKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ3Rhc2snLHRoaXMucHJvcHMubW9kZWwpXG4gICAgfVxufVxuVGFza0l0ZW0uZGVmYXVsdFByb3BzPXtcbiAgICBpbWFnZTpcImltYWdlcy90YXNrLmpwZ1wiXG59XG5cbmNsYXNzIFByb3ZpbmdJdGVtIGV4dGVuZHMgVGFza0l0ZW17fVxuXG5jbGFzcyBUYXNrUXVlcnlDb21tYW5kIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciB7d2hlbiwgb25DaGFuZ2V9PXRoaXMucHJvcHMsXG4gICAgICAgICAgICBkaXNwbGF5RGF0ZT13aGVuO1xuICAgICAgICB3aGVuPT0nYXBwcm92aW5ncycgJiYgKGRpc3BsYXlEYXRlPW5ldyBEYXRlKCksIHdoZW49bnVsbCk7XG4gICAgICAgIHdoZW4gJiYgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBkaXNwbGF5RGF0ZSAmJiBkaXNwbGF5RGF0ZS5zZXRIb3VycygwLDAsMCwwKVxuXG4gICAgICAgIHJldHVybiBbKDxMaXN0IGtleT1cIm90aGVyc1wiPlxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXsoPEF2YXRhcj5BPC9BdmF0YXI+KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT5vbkNoYW5nZShcImFwcHJvdmluZ3NcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRhcnlUZXh0PVwiT3RoZXIgZmFtaWxpZXMgcGxheWVkLCBuZWVkIHlvdXIgYXBwcm92YWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgQXBwcm92aW5nc1xuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuRGl2aWRlci8+XG4gICAgICAgICAgICAgICAgPC9MaXN0PiksXG4gICAgICAgICAgICAgICAgKDxkaXYga2V5PVwiY2FsZW5kYXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZD17d2hlbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlPXtkaXNwbGF5RGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e0RhdGUuSGVscGVyLmFkZERheXMoZGlzcGxheURhdGUsLTMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e0RhdGUuSGVscGVyLmFkZERheXMoZGlzcGxheURhdGUsMzEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25EYXlUb3VjaFRhcD17b25DaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXVxuICAgIH1cbn1cblxuXG5cbmNsYXNzIEZhbWlseUNvbW1hbmQgZXh0ZW5kcyBEaWFsb2dDb21tYW5ke1xuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIHJvdXRlcj10aGlzLmNvbnRleHQucm91dGVyLFxuICAgICAgICAgICAge2NoaWxkPXt9fT10aGlzLnByb3BzLFxuICAgICAgICAgICAgY2hpbGRyZW49ZGJGYW1pbHkuY2hpbGRyZW4sXG4gICAgICAgICAgICBsZW49Y2hpbGRyZW4ubGVuZ3RoLFxuICAgICAgICAgICAgdWlDaGlsZHJlbj1jaGlsZHJlbi5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgdmFyIGF2YXRhcjtcbiAgICAgICAgICAgICAgICBpZihhLnBob3RvKVxuICAgICAgICAgICAgICAgICAgICBhdmF0YXI9KDxBdmF0YXIgc3JjPXthLnBob3RvfS8+KVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwaG90bz0oPFBob3RvXG4gICAgICAgICAgICAgICAgICAgICAgICBvblBob3RvPXsodXJsKT0+dGhpcy5zaG9ydGN1dFBob3RvKGEsdXJsKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb25SYXRpbz17Mi8zfSB3aWR0aD17NDB9IGhlaWdodD17NDB9Lz4pXG5cbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIGljb249e3Bob3RvfS8+KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXthLl9pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiLGRiRmFtaWx5LmN1cnJlbnRDaGlsZD1hKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9e2F2YXRhcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGFwcGVuZGVyPShcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT1cImNyZWF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT5yb3V0ZXIudHJhbnNpdGlvblRvKFwiYmFieVwiKX1cbiAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17PEF2YXRhcj4rPC9BdmF0YXI+fSA+XG4gICAgICAgICAgICAgICAgICAgIEkgaGF2ZSBtb3JlIGNoaWxkcmVuIVxuICAgICAgICAgICAgICAgIDwvTGlzdC5JdGVtPiksXG4gICAgICAgICAgICBpbnZpdGVyPShcbiAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT1cImludml0ZXJcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3BhZGRpbmdCb3R0b206MCxwYWRkaW5nVG9wOjAsdGV4dEFsaWduOidsZWZ0J319XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QXZhdGFyPXs8QXZhdGFyIG9uQ2xpY2s9e3RoaXMuaW52aXRlLmJpbmQodGhpcyl9Pis8L0F2YXRhcj59ID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6JzU0JScsbWFyZ2luUmlnaHQ6MiwgYm9yZGVyOjAsIGJvcmRlckJvdHRvbTonMXB4IHNvbGlkICNlZWUnLCBwYWRkaW5nOjV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuaJi+acuuWPty/nmbvlvZXotKblj7dcIi8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7d2lkdGg6JzQ1JScsYm9yZGVyOjAsIGJvcmRlckJvdHRvbTonMXB4IHNvbGlkICNlZWUnLCBwYWRkaW5nOjV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cInJlbGF0aW9uc2hpcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2DkuI4ke2NoaWxkLm5hbWV8fCflrp3lrp0nfeeahOWFs+ezu2B9Lz5cbiAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT4pO1xuXG4gICAgICAgICAgICByZXR1cm4gWyhcbiAgICAgICAgICAgICAgICA8TGlzdCBrZXk9XCJjaGlsZHJlblwiPlxuICAgICAgICAgICAgICAgICAgICB7dWlDaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAge2xlbiA/ICg8TGlzdC5EaXZpZGVyIGluc2V0PXt0cnVlfS8+KSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIHthcHBlbmRlcn1cbiAgICAgICAgICAgICAgICA8L0xpc3Q+KSwoXG4gICAgICAgICAgICAgICAgPExpc3Qga2V5PVwiaW52aXRlXCIgc3ViaGVhZGVyPVwi6YKA6K+35a625Lq6XCIgc3R5bGU9e3ttYXJnaW5Ub3A6NX19PlxuICAgICAgICAgICAgICAgICAgICB7aW52aXRlcn1cbiAgICAgICAgICAgICAgICA8L0xpc3Q+KV07XG4gICAgfVxuICAgIHNob3J0Y3V0UGhvdG8oY2hpbGQsIHVybCl7XG4gICAgICAgIGRiRmFtaWx5LnVwc2VydChjaGlsZCx7cGhvdG86dXJsfSlcbiAgICB9XG4gICAgaW52aXRlKCl7XG4gICAgICAgIHZhciB7aWQsIHJlbGF0aW9uc2hpcH09dGhpcy5yZWZzXG4gICAgICAgIGlkPWlkLmdldERPTU5vZGUoKS52YWx1ZVxuICAgICAgICByZWxhdGlvbnNoaXA9cmVsYXRpb25zaGlwLmdldERPTU5vZGUoKS52YWx1ZVxuXG4gICAgICAgIGlmKGlkICYmIHJlbGF0aW9uc2hpcCl7XG4gICAgICAgICAgICBkYkZhbWlseS5pbnZpdGUoaWQsIHJlbGF0aW9uc2hpcClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbn1cbkZhbWlseUNvbW1hbmQuY29udGV4dFR5cGVzPXtyb3V0ZXI6IFJlYWN0LlByb3BUeXBlcy5mdW5jfVxuIl19