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
                this.renderContent(when),
                _qiliApp.React.createElement(_rewards2.default, { child: this.props.child }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXNoYm9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRUs7SUFBTTtJQUFTO0lBQU07SUFBUTtJQUFXO0lBQU07QUFBL0MsSUFBd0QseUJBQXhEO0lBQ0MsZ0JBQWUsV0FBZjs7SUFJZ0I7Ozs7Ozs7Ozs7OzhDQUNLLFdBQVU7QUFDNUIsbUJBQU8sVUFBVSxLQUFWLElBQWlCLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FESTs7OztpQ0FHeEI7Z0JBQ0MsUUFBTyxLQUFLLEtBQUwsQ0FBUCxNQUREOztBQUVKLG1CQUFPLFFBQVMsNkJBQUMsYUFBRCxFQUFtQixLQUFLLEtBQUwsQ0FBNUIsR0FBK0MsNkJBQUMsZUFBRCxFQUFxQixLQUFLLEtBQUwsQ0FBcEUsQ0FGSDs7OztXQUpTOzs7Ozs7Ozs7O0lBYVI7Ozs7Ozs7Ozs7O2lDQUNEOzs7QUFDSixtQkFDSTs7O2dCQUNJLDZCQUFDLEtBQUQsSUFBTyxNQUFLLDZDQUFMO0FBQ0gsMEJBQU0sa0RBQU47QUFDQSw2QkFBUzsrQkFBSSxPQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLFlBQXBCLENBQWlDLE1BQWpDO3FCQUFKLEVBRmIsQ0FESjtnQkFJSSw2QkFBQyxVQUFEO0FBQ0ksK0JBQVUsU0FBVjtBQUNBLDZCQUFRLFFBQVI7O0FBRUEsMkJBQU8sQ0FDSCxFQUFDLFFBQU8sWUFBUDtBQUNHLGtDQUFTO21DQUFJLE9BQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsWUFBcEIsQ0FBaUMsWUFBakM7eUJBQUo7QUFDVCwrQ0FGSixFQURHLEVBSUgsRUFBQyxRQUFPLFFBQVA7QUFDRyxrQ0FBUzttQ0FBSSxPQUFLLElBQUwsQ0FBVSxNQUFWLENBQWlCLElBQWpCO3lCQUFKO0FBQ1QsOEJBQUssUUFBUSxxREFBUixDQUFMLEVBTkQsRUFPSCxFQUFDLFFBQU8sU0FBUCxFQUFr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QyxXQUFVLENBQVYsRUFBUixFQUFwQztnQkFDSyxPQURMO2FBTkcsQ0FBUCxDQTlDTzs7OztzQ0F3REQsT0FBTyxLQUFJO0FBQ3JCLHVCQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0IsRUFBQyxPQUFNLEdBQU4sRUFBdkIsRUFEcUI7Ozs7aUNBR2pCO3dCQUNtQixLQUFLLElBQUwsQ0FEbkI7Z0JBQ0MsY0FERDtnQkFDSyxrQ0FETDs7QUFFSixpQkFBRyxHQUFHLFVBQUgsR0FBZ0IsS0FBaEIsQ0FGQztBQUdKLDJCQUFhLGFBQWEsVUFBYixHQUEwQixLQUExQixDQUhUOztBQUtKLGdCQUFHLE1BQU0sWUFBTixFQUFtQjtBQUNsQiwyQkFBUyxNQUFULENBQWdCLEVBQWhCLEVBQW9CLFlBQXBCLEVBQ0ssSUFETCxDQUNVLFlBQVUsRUFBVixDQURWLENBRGtCO2FBQXRCOzs7O1dBakVGO0VBQXNCOztBQXlFNUIsY0FBYyxZQUFkLEdBQTJCLEVBQUMsUUFBUSxlQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBcEMiLCJmaWxlIjoiZGFzaGJvYXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsVUksUm91dGVyfSBmcm9tICdxaWxpLWFwcCdcbmltcG9ydCB7QXZhdGFyLFBhcGVyLCBSYWRpb0dyb3VwLCBSYWRpb0J1dHRvbixGb250SWNvbixJY29uQnV0dG9uLFRleHRGaWVsZCwgVGFicywgVGFiLCBEYXRlUGlja2VyfSBmcm9tICdtYXRlcmlhbC11aSdcbmltcG9ydCB7VGFzayBhcyBkYlRhc2ssRmFtaWx5IGFzIGRiRmFtaWx5fSBmcm9tICcuL2RiJ1xuaW1wb3J0IENhbGVuZGFyIGZyb20gJy4vY29tcG9uZW50cy9jYWxlbmRhcidcbmltcG9ydCBSZXdhcmRzIGZyb20gJy4vY29tcG9uZW50cy9yZXdhcmRzJ1xuaW1wb3J0IExvZ28gZnJvbSAnLi9pY29ucy9sb2dvJ1xuaW1wb3J0IEljb25Lbm93bGVkZ2VzIGZyb20gXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2NvbW11bmljYXRpb24vZGlhbHBhZFwiXG5cbnZhciB7TGlzdCwgTG9hZGluZywgRW1wdHksQ29tbWVudCxDb21tYW5kQmFyLFBob3RvLE1lc3NhZ2VyLEljb25zfT1VSSxcbiAgICB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGFzaGJvYXJkIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHMpe1xuICAgICAgICByZXR1cm4gbmV4dFByb3BzLmNoaWxkIT10aGlzLnByb3BzLmNoaWxkXG4gICAgfVxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzXG4gICAgICAgIHJldHVybiBjaGlsZCA/ICg8QmFieURhc2hib2FyZCB7Li4udGhpcy5wcm9wc30gLz4pIDogKDxBdXRob3JEYXNoYm9hcmQgey4uLnRoaXMucHJvcHN9Lz4pXG4gICAgfVxufVxuXG4vKipcbkB3aXRob3V0IGN1cnJlbnRDaGlsZFxuKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JEYXNoYm9hcmQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxFbXB0eSB0ZXh0PVwiU3RhcnQgZnJvbSB5b3VyIGZpcnN0IGJhYnksIG9yIHdhbGsgYXJvdW5kIVwiXG4gICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIil9Lz5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIkZhbWlseVwiXG5cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJLbm93bGVkZ2VzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpJY29uS25vd2xlZGdlc30sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiRmFtaWx5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy5mYW1pbHkuc2hvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL3N1cGVydmlzb3ItYWNjb3VudFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwic2V0dGluZ1wiLCBsYWJlbDpcIkFjY291bnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2FjY291bnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiByZXF1aXJlKCdtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2FjdGlvbi9hY2NvdW50LWJveCcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8RmFtaWx5Q29tbWFuZCByZWY9XCJmYW1pbHlcIi8+XG4gICAgICAgICAgICA8L2Rpdj4pXG4gICAgfVxufVxuQXV0aG9yRGFzaGJvYXJkLmNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5mdW5jfVxuXG4vKipcbkAgd2l0aCBjdXJyZW50Q2hpbGRcbiovXG5leHBvcnQgY2xhc3MgQmFieURhc2hib2FyZCBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXRoaXMuX3Jlc29sdmVNb2RlbCgpXG4gICAgfVxuXG4gICAgX3Jlc29sdmVNb2RlbChwcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge3BhcmFtczp7d2hlbj10b2RheX19PXByb3BzfHx0aGlzLnByb3BzO1xuICAgICAgICB3aGVuPXRoaXMuX3BhcnNlRGF0ZSh3aGVuKVxuICAgICAgICB2YXIgbW9kZWw9d2hlbj09J2FwcHJvdmluZ3MnID8gZGJUYXNrLmFwcHJvdmluZ3MoKSA6IGRiVGFzay5ieURhdGUod2hlbilcbiAgICAgICAgcmV0dXJuIHt3aGVuLCBtb2RlbH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB0b2RheT1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAge25leHRDaGlsZCwgcGFyYW1zOntuZXh0V2hlbj10b2RheX19PW5leHRQcm9wcyxcbiAgICAgICAgICAgIHtjaGlsZCwgcGFyYW1zOnt3aGVuPXRvZGF5fX09dGhpcy5wcm9wc1xuICAgICAgICBpZiAobmV4dENoaWxkIT1jaGlsZCB8fCBuZXh0V2hlbi5nZXRUaW1lKCkhPXdoZW4uZ2V0VGltZSgpKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLl9yZXNvbHZlTW9kZWwobmV4dFByb3BzKSlcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHt3aGVuLCBtb2RlbH09dGhpcy5zdGF0ZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50KHdoZW4pfVxuXG5cdFx0XHRcdDxSZXdhcmRzIGNoaWxkPXt0aGlzLnByb3BzLmNoaWxkfS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT1cIktub3dsZWRnZXNcIlxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17KCk9PnRoaXMub25TZWxlY3QoKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e1tcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJUYXNrXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy50YXNrLnNob3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2VkaXRvci9mb3JtYXQtbGlzdC1udW1iZXJlZFwiKX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7YWN0aW9uOlwiUHVibGlzaFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygncHVibGlzaCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246cmVxdWlyZShcIm1hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvaW1hZ2UvY2FtZXJhLXJvbGxcIil9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2FjdGlvbjpcIktub3dsZWRnZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oJ2tub3dsZWRnZXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOkljb25Lbm93bGVkZ2VzfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJGYW1pbHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5yZWZzLmZhbWlseS5zaG93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9hY3Rpb24vc3VwZXJ2aXNvci1hY2NvdW50XCIpfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb246XCJzZXR0aW5nXCIsIGxhYmVsOlwiQWNjb3VudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OigpPT50aGlzLmNvbnRleHQucm91dGVyLnRyYW5zaXRpb25UbygnYWNjb3VudCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246IHJlcXVpcmUoJ21hdGVyaWFsLXVpL2xpYi9zdmctaWNvbnMvYWN0aW9uL2FjY291bnQtYm94Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxUYXNrUXVlcnlDb21tYW5kIHJlZj1cInRhc2tcIiB3aGVuPXt3aGVufSBvbkNoYW5nZT17KCk9PnRoaXMub25DaGFuZ2VEYXRlKCl9Lz5cbiAgICAgICAgICAgICAgICA8RmFtaWx5Q29tbWFuZCByZWY9XCJmYW1pbHlcIiBjaGlsZD17dGhpcy5wcm9wcy5jaGlsZH0vPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZW5kZXJDb250ZW50KHdoZW4pe1xuICAgICAgICB2YXIge2NoaWxkfT10aGlzLnByb3BzLFxuICAgICAgICAgICAge21vZGVsfT10aGlzLnN0YXRlLFxuICAgICAgICAgICAgaGVhZGVyU3R5bGU9e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjonZGFya29yYW5nZScsXG4gICAgICAgICAgICAgICAgdGV4dE92ZXJmbG93OidlbGxpcHNpcycsXG4gICAgICAgICAgICAgICAgd2hpdGVTcGFjZTonbm93cmFwJyxcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246J2xlZnQnLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOlwieHgtbGFyZ2VcIixcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjEwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjowXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJvcHM9e21vZGVsLGhlYWRlclN0eWxlfVxuXG4gICAgICAgIGlmKCdhcHByb3ZpbmdzJz09d2hlbil7XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6XCJBcHByb3ZpbmdzXCIsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6UHJvdmluZ0l0ZW0sXG4gICAgICAgICAgICAgICAgZW1wdHk6KDxFbXB0eSB0ZXh0PVwiTm9ib2R5IHBsYXllZCB3aXRoIHlvdXIgY2hpbGRyZW4hXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fS8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2YXIgZD1NYXRoLmZsb29yKChEYXRlLm5vdygpLXdoZW4uZ2V0VGltZSgpKS8oMTAwMCoyNCo2MCo2MCkpXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHByb3BzLHtcbiAgICAgICAgICAgICAgICBzdWJoZWFkZXI6IHRoaXMuX2Zvcm1hdCh3aGVuKSxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTpUYXNrSXRlbSxcbiAgICAgICAgICAgICAgICBlbXB0eTpkPjAgP1xuICAgICAgICAgICAgICAgICAgICAoPEVtcHR5IHRleHQ9e2BZb3UgZGlkbm90IHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGljb249ezxMb2dvLz59Lz4pIDpcbiAgICAgICAgICAgICAgICAgICAgKDxFbXB0eSB0ZXh0PXtgRmluZCBmdW4gdG9waWMgTk9XIHRvIHBsYXkgd2l0aCAke2NoaWxkLm5hbWV9IGB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uPXs8TG9nby8+fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ub3VjaFRhcD17KCk9PnRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCdrbm93bGVkZ2VzJyl9IC8+KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8TGlzdCB7Li4ucHJvcHN9Lz5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kLGUpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ1JlZnJlc2gnOlxuICAgICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uQ2hhbmdlRGF0ZShkKXtcbiAgICAgICAgdGhpcy5jb250ZXh0LnJvdXRlci50cmFuc2l0aW9uVG8oXCJkYXNoYm9hcmRcIix7d2hlbjp0aGlzLl9mb3JtYXQoZCl9KVxuICAgICAgICB0aGlzLnNldFN0YXRlKHt3aGVuOmR9KVxuICAgICAgICB0aGlzLnJlZnMudGFzay5kaXNtaXNzKClcbiAgICB9XG5cbiAgICBfZm9ybWF0KGQpe1xuICAgICAgICBzd2l0Y2goTWF0aC5mbG9vcigoRGF0ZS5ub3coKS1kLmdldFRpbWUoKSkvKDEwMDAqMjQqNjAqNjApKSl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiAnVG9kYXknXG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiAnWWVzdGVyZGF5J1xuICAgICAgICAgICAgY2FzZSAtMTogcmV0dXJuICdUb21vcnJvdydcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZC5nZXRGdWxsWWVhcigpKyctJysoZC5nZXRNb250aCgpKzEpKyctJytkLmdldERhdGUoKVxuICAgIH1cblxuICAgIF9wYXJzZURhdGUod2hlbil7XG4gICAgICAgIGlmKHR5cGVvZih3aGVuKSE9J3N0cmluZycpe1xuICAgICAgICAgICAgd2hlbi5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICAgICAgcmV0dXJuIHdoZW5cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG9kYXk9bmV3IERhdGUoKVxuICAgICAgICB0b2RheS5zZXRIb3VycygwLDAsMCwwKVxuICAgICAgICBzd2l0Y2god2hlbi50b0xvd2VyQ2FzZSgpKXtcbiAgICAgICAgY2FzZSAnYXBwcm92aW5ncyc6XG4gICAgICAgICAgICByZXR1cm4gJ2FwcHJvdmluZ3MnXG4gICAgICAgIGNhc2UgJ3RvZGF5JzpcbiAgICAgICAgICAgIHJldHVybiB0b2RheVxuICAgICAgICBjYXNlICd5ZXN0ZXJkYXknOlxuICAgICAgICAgICAgcmV0dXJuIERhdGUuSGVscGVyLmFkZERheXModG9kYXksLTEpXG4gICAgICAgIGNhc2UgJ3RvbW9ycm93JzpcbiAgICAgICAgICAgIHJldHVybiBEYXRlLkhlbHBlci5hZGREYXlzKHRvZGF5LDEpXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB3aGVuPW5ldyBEYXRlKERhdGUucGFyc2Uod2hlbikpXG4gICAgICAgICAgICB3aGVuLnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgICAgICByZXR1cm4gd2hlblxuICAgICAgICB9XG4gICAgfVxufVxuQmFieURhc2hib2FyZC5jb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMuZnVuY31cblxuY2xhc3MgVGFza0l0ZW0gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7bW9kZWw6dGFzaywgaW1hZ2UsIGFjdGlvbnMsIC4uLm90aGVyc309dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtrbm93bGVkZ2V9PXRhc2s7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb250ZW50XCIgb25DbGljaz17dGhpcy5vbkRldGFpbC5iaW5kKHRoaXMpfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoND57dGFzay5rbm93bGVkZ2UudGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGhvdG9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt0YXNrLnBob3RvfHxpbWFnZX0vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIG9uRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuY29udGV4dC5yb3V0ZXIudHJhbnNpdGlvblRvKCd0YXNrJyx0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbn1cblRhc2tJdGVtLmRlZmF1bHRQcm9wcz17XG4gICAgaW1hZ2U6XCJpbWFnZXMvdGFzay5qcGdcIlxufVxuXG5jbGFzcyBQcm92aW5nSXRlbSBleHRlbmRzIFRhc2tJdGVte31cblxuY2xhc3MgVGFza1F1ZXJ5Q29tbWFuZCBleHRlbmRzIERpYWxvZ0NvbW1hbmR7XG4gICAgcmVuZGVyQ29udGVudCgpe1xuICAgICAgICB2YXIge3doZW4sIG9uQ2hhbmdlfT10aGlzLnByb3BzLFxuICAgICAgICAgICAgZGlzcGxheURhdGU9d2hlbjtcbiAgICAgICAgd2hlbj09J2FwcHJvdmluZ3MnICYmIChkaXNwbGF5RGF0ZT1uZXcgRGF0ZSgpLCB3aGVuPW51bGwpO1xuICAgICAgICB3aGVuICYmIHdoZW4uc2V0SG91cnMoMCwwLDAsMClcbiAgICAgICAgZGlzcGxheURhdGUgJiYgZGlzcGxheURhdGUuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gWyg8TGlzdCBrZXk9XCJvdGhlcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEF2YXRhcj17KDxBdmF0YXI+QTwvQXZhdGFyPil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+b25DaGFuZ2UoXCJhcHByb3ZpbmdzXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGV4dD1cIk90aGVyIGZhbWlsaWVzIHBsYXllZCwgbmVlZCB5b3VyIGFwcHJvdmFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFwcHJvdmluZ3NcbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDxMaXN0LkRpdmlkZXIvPlxuICAgICAgICAgICAgICAgIDwvTGlzdD4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3doZW59XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17ZGlzcGxheURhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLC0zMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKGRpc3BsYXlEYXRlLDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRGF5VG91Y2hUYXA9e29uQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG59XG5cblxuXG5jbGFzcyBGYW1pbHlDb21tYW5kIGV4dGVuZHMgRGlhbG9nQ29tbWFuZHtcbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciByb3V0ZXI9dGhpcy5jb250ZXh0LnJvdXRlcixcbiAgICAgICAgICAgIHtjaGlsZD17fX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIGNoaWxkcmVuPWRiRmFtaWx5LmNoaWxkcmVuLFxuICAgICAgICAgICAgbGVuPWNoaWxkcmVuLmxlbmd0aCxcbiAgICAgICAgICAgIHVpQ2hpbGRyZW49Y2hpbGRyZW4ubWFwKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgICAgICAgIHZhciBhdmF0YXI7XG4gICAgICAgICAgICAgICAgaWYoYS5waG90bylcbiAgICAgICAgICAgICAgICAgICAgYXZhdGFyPSg8QXZhdGFyIHNyYz17YS5waG90b30vPilcbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGhvdG89KDxQaG90b1xuICAgICAgICAgICAgICAgICAgICAgICAgb25QaG90bz17KHVybCk9PnRoaXMuc2hvcnRjdXRQaG90byhhLHVybCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uUmF0aW89ezIvM30gd2lkdGg9ezQwfSBoZWlnaHQ9ezQwfS8+KVxuXG4gICAgICAgICAgICAgICAgICAgIGF2YXRhcj0oPEF2YXRhciBpY29uPXtwaG90b30vPilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17YS5faWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIixkYkZhbWlseS5jdXJyZW50Q2hpbGQ9YSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0QXZhdGFyPXthdmF0YXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2EubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBhcHBlbmRlcj0oXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9XCJjcmVhdGVcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+cm91dGVyLnRyYW5zaXRpb25UbyhcImJhYnlcIil9XG4gICAgICAgICAgICAgICAgICAgIGxlZnRBdmF0YXI9ezxBdmF0YXI+KzwvQXZhdGFyPn0gPlxuICAgICAgICAgICAgICAgICAgICBJIGhhdmUgbW9yZSBjaGlsZHJlbiFcbiAgICAgICAgICAgICAgICA8L0xpc3QuSXRlbT4pLFxuICAgICAgICAgICAgaW52aXRlcj0oXG4gICAgICAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9XCJpbnZpdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3twYWRkaW5nQm90dG9tOjAscGFkZGluZ1RvcDowLHRleHRBbGlnbjonbGVmdCd9fVxuICAgICAgICAgICAgICAgICAgICByaWdodEF2YXRhcj17PEF2YXRhciBvbkNsaWNrPXt0aGlzLmludml0ZS5iaW5kKHRoaXMpfT4rPC9BdmF0YXI+fSA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOic1NCUnLG1hcmdpblJpZ2h0OjIsIGJvcmRlcjowLCBib3JkZXJCb3R0b206JzFweCBzb2xpZCAjZWVlJywgcGFkZGluZzo1fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLmiYvmnLrlj7cv55m75b2V6LSm5Y+3XCIvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e3dpZHRoOic0NSUnLGJvcmRlcjowLCBib3JkZXJCb3R0b206JzFweCBzb2xpZCAjZWVlJywgcGFkZGluZzo1fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJyZWxhdGlvbnNoaXBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtg5LiOJHtjaGlsZC5uYW1lfHwn5a6d5a6dJ33nmoTlhbPns7tgfS8+XG4gICAgICAgICAgICAgICAgPC9MaXN0Lkl0ZW0+KTtcblxuICAgICAgICAgICAgcmV0dXJuIFsoXG4gICAgICAgICAgICAgICAgPExpc3Qga2V5PVwiY2hpbGRyZW5cIj5cbiAgICAgICAgICAgICAgICAgICAge3VpQ2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIHtsZW4gPyAoPExpc3QuRGl2aWRlciBpbnNldD17dHJ1ZX0vPikgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICB7YXBwZW5kZXJ9XG4gICAgICAgICAgICAgICAgPC9MaXN0PiksKFxuICAgICAgICAgICAgICAgIDxMaXN0IGtleT1cImludml0ZVwiIHN1YmhlYWRlcj1cIumCgOivt+WutuS6ulwiIHN0eWxlPXt7bWFyZ2luVG9wOjV9fT5cbiAgICAgICAgICAgICAgICAgICAge2ludml0ZXJ9XG4gICAgICAgICAgICAgICAgPC9MaXN0PildO1xuICAgIH1cbiAgICBzaG9ydGN1dFBob3RvKGNoaWxkLCB1cmwpe1xuICAgICAgICBkYkZhbWlseS51cHNlcnQoY2hpbGQse3Bob3RvOnVybH0pXG4gICAgfVxuICAgIGludml0ZSgpe1xuICAgICAgICB2YXIge2lkLCByZWxhdGlvbnNoaXB9PXRoaXMucmVmc1xuICAgICAgICBpZD1pZC5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAgICAgcmVsYXRpb25zaGlwPXJlbGF0aW9uc2hpcC5nZXRET01Ob2RlKCkudmFsdWVcblxuICAgICAgICBpZihpZCAmJiByZWxhdGlvbnNoaXApe1xuICAgICAgICAgICAgZGJGYW1pbHkuaW52aXRlKGlkLCByZWxhdGlvbnNoaXApXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG5GYW1pbHlDb21tYW5kLmNvbnRleHRUeXBlcz17cm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY31cbiJdfQ==