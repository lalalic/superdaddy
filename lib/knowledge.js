'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _materialUi = require('material-ui');

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

var _template = require('./parser/template');

var _template2 = _interopRequireDefault(_template);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = _qiliApp.UI.List;
var Loading = _qiliApp.UI.Loading;
var Comment = _qiliApp.UI.Comment;
var CommandBar = _qiliApp.UI.CommandBar;
var fileSelector = _qiliApp.UI.fileSelector;
var DialogCommand = CommandBar.DialogCommand;

var Knowledge = function (_Component) {
    _inherits(Knowledge, _Component);

    function Knowledge(props) {
        _classCallCheck(this, Knowledge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledge).call(this, props));

        _this.state = {};
        var id = _this.props.params._id;

        _knowledge2.default.findOne({ _id: id }, function (entity) {
            return _this.setState({ entity: entity });
        });
        return _this;
    }

    _createClass(Knowledge, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var lastId = this.props.params._id;
            var id = nextProps.params._id;


            if (id != lastId) _knowledge2.default.findOne({ _id: id }, function (entity) {
                return _this2.setState({ entity: entity });
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.docx && this.docx.revoke();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state;
            var entity = _state.entity;
            var status = _state.status;
            var planing = _state.planing;


            if (!entity) return _qiliApp.React.createElement(Loading, null);

            var commands = ["Back"],
                primary,
                planCommand;
            if (true || _qiliApp.User.current._id == entity.author._id) commands.push({ action: "New Version", icon: _borderColor2.default });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: _cancel2.default });
                    primary = "Save";
                    break;
                default:
                    this.origin = entity;
                    commands.push({ action: "Plan", onSelect: function onSelect() {
                            return _this3.refs.plan.show();
                        } });
                    planCommand = _qiliApp.React.createElement(PlanCommand, { ref: 'plan', onDismiss: function onDismiss() {
                            return _this3.createPlan();
                        } });

                    commands.push(_qiliApp.React.createElement(CommandBar.Comment, { key: 'Comment', type: _knowledge2.default, model: entity }));
                    commands.push(_qiliApp.React.createElement(CommandBar.Share, { key: 'Share', message: entity }));
                    primary = "Plan";
            }

            return _qiliApp.React.createElement(
                'div',
                { className: 'post' },
                _qiliApp.React.createElement(
                    'div',
                    { className: 'knowledge' },
                    Knowledge.renderContent(entity)
                ),
                _qiliApp.React.createElement(Plan, { style: { padding: 10 }, open: planing, entity: entity }),
                _qiliApp.React.createElement(CommandBar, {
                    className: 'footbar',
                    primary: primary,
                    onSelect: this.onSelect.bind(this),
                    items: commands }),
                planCommand
            );
        }
    }, {
        key: 'getExperience',
        value: function getExperience() {}
    }, {
        key: 'onSelect',
        value: function onSelect(command) {
            var _this4 = this;

            switch (command) {
                case 'New Version':
                    Knowledge.selectDocx().then(function (docx) {
                        _this4.docx && _this4.docx.revoke();
                        delete _this4.docx;

                        _this4.docx = docx;
                        var knowledge = docx.knowledge;

                        var pending = Object.assign({}, _this4.state.entity, knowledge);
                        _this4.setState({ entity: pending, status: 'revising' });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    this.docx.upload(entity).then(function (content) {
                        entity.photos = _this4.docx.getPhotos();
                        entity.content = content;
                        _knowledge2.default.upsert(_this4.state.entity, _this4.origin, function () {
                            return _this4.setState({ status: undefined });
                        });
                    });
                    break;
            }
        }
    }, {
        key: 'createPlan',
        value: function createPlan() {
            var entity = this.state.entity;
            var selectedDays = this.refs.plan.state.selectedDays;


            _task2.default.plan(entity, selectedDays);
        }
    }], [{
        key: 'date2String',
        value: function date2String(d) {
            if (!d) return "";
            var now = (0, _moment2.default)(),
                date = (0, _moment2.default)(d);
            return date.format(now.isSame(date, "day") ? "今天 HH:MM" : now.isSame(date, "year") ? "MM月DD日" : "YYYY年MM月DD日");
        }
    }, {
        key: 'renderContent',
        value: function renderContent(entity) {
            var open = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
            var templateRender = arguments[2];
            var _entity$category = entity.category;
            var category = _entity$category === undefined ? [] : _entity$category;
            var _entity$keywords = entity.keywords;
            var keywords = _entity$keywords === undefined ? [] : _entity$keywords;
            var _entity$figure = entity.figure;
            var figure = _entity$figure === undefined ? "http://n.sinaimg.cn/transform/20150716/cKHR-fxfaswi4039085.jpg" : _entity$figure;
            var sencondaryStyle = { fontSize: 'small', fontWeight: 'normal', textAlign: 'right' };
            var template = new _template2.default(entity.content);

            var content = (templateRender || function (tpl) {
                var __html = tpl.contents.map(function (section, i) {
                    if (typeof section == 'string') return section;
                    return '\n                        <details open="true">\n                            <summary>' + section.key + '</summary>\n                            <p>' + section.alt + '</p>\n                        </details>\n                    ';
                }).join("");
                return _qiliApp.React.createElement('div', { dangerouslySetInnerHTML: { __html: __html } });
            })(template);

            if (entity.summary) {
                content = _qiliApp.React.createElement(
                    'details',
                    { open: open },
                    _qiliApp.React.createElement(
                        'summary',
                        null,
                        entity.summary
                    ),
                    content
                );
            }

            var notNewStuff;
            if (entity._id) {
                notNewStuff = [_qiliApp.React.createElement(
                    'h1',
                    { key: 'link' },
                    _qiliApp.React.createElement(
                        Link,
                        { to: '/knowledge/' + entity._id },
                        entity.title
                    )
                ), _qiliApp.React.createElement(
                    'p',
                    { key: 'author' },
                    entity.author.name,
                    ' - ',
                    _qiliApp.React.createElement(
                        'time',
                        null,
                        Knowledge.date2String(entity.createdAt)
                    )
                )];
            } else {
                notNewStuff = _qiliApp.React.createElement(
                    'h1',
                    { key: 'link' },
                    entity.title
                );
            }

            if (figure) figure = _qiliApp.React.createElement('img', { src: figure });

            return _qiliApp.React.createElement(
                'article',
                null,
                _qiliApp.React.createElement(
                    'figure',
                    null,
                    figure
                ),
                _qiliApp.React.createElement(
                    'header',
                    null,
                    notNewStuff,
                    _qiliApp.React.createElement(
                        'p',
                        null,
                        category.join(", "),
                        ' ',
                        keywords.join(", ")
                    )
                ),
                _qiliApp.React.createElement(
                    'section',
                    null,
                    content
                )
            );
        }
    }, {
        key: 'selectDocx',
        value: function selectDocx() {
            return fileSelector.select().then(_extractor2.default, console.error);
        }
    }]);

    return Knowledge;
}(_qiliApp.Component);

Knowledge.contextTypes = { router: _qiliApp.React.PropTypes.object };
exports.default = Knowledge;

var Plan = function (_Component2) {
    _inherits(Plan, _Component2);

    function Plan() {
        _classCallCheck(this, Plan);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Plan).apply(this, arguments));
    }

    _createClass(Plan, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var open = _props.open;

            var others = _objectWithoutProperties(_props, ['className', 'open']);

            return _qiliApp.React.createElement('div', _extends({ className: className + ' ' + (!open && "hidden" || "") }, others));
        }
    }]);

    return Plan;
}(_qiliApp.Component);

var PlanCommand = function (_CommandBar$DialogCom) {
    _inherits(PlanCommand, _CommandBar$DialogCom);

    function PlanCommand(props) {
        _classCallCheck(this, PlanCommand);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlanCommand).call(this, props));

        _this6.state = {
            selectedDays: []
        };
        return _this6;
    }

    _createClass(PlanCommand, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this7 = this;

            var everydays = "week,weekend,weekday,month".split(",").map(function (a) {
                return _qiliApp.React.createElement(
                    _materialUi.RaisedButton,
                    { key: a, onClick: function onClick() {
                            return _this7.selectDays(a);
                        } },
                    a
                );
            });
            var now = new Date();
            var selectedDays = this.state.selectedDays;


            return [_qiliApp.React.createElement(
                'div',
                { key: 'everydays', style: { textAlign: 'center', padding: 10 } },
                everydays
            ), _qiliApp.React.createElement(
                'div',
                { key: 'calender' },
                _qiliApp.React.createElement(Calendar, {
                    ref: 'calendar',
                    minDate: now,
                    maxDate: Date.Helper.addDays(now, 31),
                    displayDate: now })
            )];
        }
    }, {
        key: 'selectDays',
        value: function selectDays(a) {}
    }]);

    return PlanCommand;
}(CommandBar.DialogCommand);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVPO0lBQUs7SUFBUTtJQUFRO0lBQVc7SUFDaEMsZ0JBQWUsV0FBZjs7SUFFYzs7O0FBQ2pCLGFBRGlCLFNBQ2pCLENBQVksS0FBWixFQUFrQjs4QkFERCxXQUNDOzsyRUFERCxzQkFFUCxRQURROztBQUVkLGNBQUssS0FBTCxHQUFXLEVBQVgsQ0FGYztZQUdHLEtBQUssTUFBSyxLQUFMLENBQWpCLE9BQVEsSUFIQzs7QUFJZCw0QkFBWSxPQUFaLENBQW9CLEVBQUMsS0FBSSxFQUFKLEVBQXJCLEVBQTZCLFVBQUMsTUFBRDttQkFBVSxNQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sTUFBUCxFQUFmO1NBQVYsQ0FBN0IsQ0FKYzs7S0FBbEI7O2lCQURpQjs7a0RBU1UsV0FBVTs7O0FBQzdCLGdCQUFhLFNBQVMsS0FBSyxLQUFMLENBQXJCLE9BQVEsR0FBVCxDQUQ2QjtnQkFFaEIsS0FBSyxVQUFqQixPQUFRLElBRm9COzs7QUFJakMsZ0JBQUcsTUFBSSxNQUFKLEVBQ0Msb0JBQVksT0FBWixDQUFvQixFQUFDLEtBQUksRUFBSixFQUFyQixFQUE2QixVQUFDLE1BQUQ7dUJBQVUsT0FBSyxRQUFMLENBQWMsRUFBQyxRQUFPLE1BQVAsRUFBZjthQUFWLENBQTdCLENBREo7Ozs7K0NBSWtCO0FBQ2xCLGlCQUFLLElBQUwsSUFBYSxLQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWIsQ0FEa0I7Ozs7aUNBSWQ7Ozt5QkFDMEIsS0FBSyxLQUFMLENBRDFCO2dCQUNDLHVCQUREO2dCQUNTLHVCQURUO2dCQUNpQix5QkFEakI7OztBQUdKLGdCQUFHLENBQUMsTUFBRCxFQUNDLE9BQVEsNkJBQUMsT0FBRCxPQUFSLENBREo7O0FBR0EsZ0JB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S0FBSSxVQUFKLEVBQUw7Z0JBQ0csNkJBQUMsUUFBRDtBQUNJLHlCQUFJLFVBQUo7QUFDQSw2QkFBUyxHQUFUO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixHQUFwQixFQUF3QixFQUF4QixDQUFUO0FBQ0EsaUNBQWEsR0FBYixFQUpKLENBREg7YUFERixDQUFQLENBTlc7Ozs7bUNBZ0JKLEdBQUU7OztXQXZCWDtFQUFvQixXQUFXLGFBQVgiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQgZXh0cmFjdCBmcm9tICcuL3BhcnNlci9leHRyYWN0b3InXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSBcIi4vcGFyc2VyL3RlbXBsYXRlXCJcblxuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5jb25zdCB7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmlkfX09dGhpcy5wcm9wc1xuICAgICAgICBkYktub3dsZWRnZS5maW5kT25lKHtfaWQ6aWR9LChlbnRpdHkpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6ZW50aXR5fSkpXG4gICAgfVxuXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmxhc3RJZH19PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7cGFyYW1zOntfaWQ6aWR9fT1uZXh0UHJvcHNcblxuICAgICAgICBpZihpZCE9bGFzdElkKVxuICAgICAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOmlkfSwoZW50aXR5KT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OmVudGl0eX0pKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZ309dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl0sIHByaW1hcnksIHBsYW5Db21tYW5kO1xuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOkljb25DcmVhdGV9KVxuXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlICdyZXZpc2luZyc6XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKFwiU2F2ZVwiKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp0aGlzLm9yaWdpbixzdGF0dXM6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICAgICAgaWNvbjpJY29uQ2FuY2VsfSlcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcbiAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMub3JpZ2luPWVudGl0eVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiUGxhblwiLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnBsYW4uc2hvdygpfSlcbiAgICAgICAgICAgIHBsYW5Db21tYW5kPSg8UGxhbkNvbW1hbmQgcmVmPVwicGxhblwiIG9uRGlzbWlzcz17KCk9PnRoaXMuY3JlYXRlUGxhbigpfS8+KVxuXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLkNvbW1lbnQga2V5PVwiQ29tbWVudFwiIHR5cGU9e2RiS25vd2xlZGdlfSBtb2RlbD17ZW50aXR5fS8+KVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5TaGFyZSBrZXk9XCJTaGFyZVwiIG1lc3NhZ2U9e2VudGl0eX0vPilcbiAgICAgICAgICAgIHByaW1hcnk9XCJQbGFuXCJcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvc3RcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtub3dsZWRnZVwiPlxuICAgICAgICAgICAgICAgICAgICB7S25vd2xlZGdlLnJlbmRlckNvbnRlbnQoZW50aXR5KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8UGxhbiBzdHlsZT17e3BhZGRpbmc6MTB9fSBvcGVuPXtwbGFuaW5nfSBlbnRpdHk9e2VudGl0eX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e3ByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPlxuXG4gICAgICAgICAgICAgICAge3BsYW5Db21tYW5kfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGRhdGUyU3RyaW5nKGQpe1xuXHRcdGlmKCFkKSByZXR1cm4gXCJcIlxuXHRcdHZhciBub3c9bW9tZW50KCksZGF0ZT1tb21lbnQoZClcbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KG5vdy5pc1NhbWUoZGF0ZSxcImRheVwiKSA/IFwi5LuK5aSpIEhIOk1NXCIgOiBub3cuaXNTYW1lKGRhdGUsIFwieWVhclwiKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlPVwiaHR0cDovL24uc2luYWltZy5jbi90cmFuc2Zvcm0vMjAxNTA3MTYvY0tIUi1meGZhc3dpNDAzOTA4NS5qcGdcIn09ZW50aXR5LFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfSxcbiAgICAgICAgICAgIHRlbXBsYXRlPW5ldyBUZW1wbGF0ZShlbnRpdHkuY29udGVudCk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9KHRlbXBsYXRlUmVuZGVyfHxmdW5jdGlvbih0cGwpe1xuICAgICAgICAgICAgICAgIHZhciBfX2h0bWw9dHBsLmNvbnRlbnRzLm1hcCgoc2VjdGlvbixpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2Yoc2VjdGlvbik9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+JHtzZWN0aW9uLmtleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtzZWN0aW9uLmFsdH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sfX0vPlxuICAgICAgICAgICAgfSkodGVtcGxhdGUpO1xuXG4gICAgICAgIGlmKGVudGl0eS5zdW1tYXJ5KXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KFxuICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49e29wZW59PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT57ZW50aXR5LnN1bW1hcnl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm90TmV3U3R1ZmZcbiAgICAgICAgaWYoZW50aXR5Ll9pZCl7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj1bXG4gICAgICAgICAgICAgICAgKDxoMSBrZXk9XCJsaW5rXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntLbm93bGVkZ2UuZGF0ZTJTdHJpbmcoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGlua1wiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHQpXG4gICAgfVxuXG4gICAgZ2V0RXhwZXJpZW5jZSgpe1xuXG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSAnTmV3IFZlcnNpb24nOlxuICAgICAgICAgICAgS25vd2xlZGdlLnNlbGVjdERvY3goKVxuICAgICAgICAgICAgICAgIC50aGVuKChkb2N4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZz1PYmplY3QuYXNzaWduKHt9LHRoaXMuc3RhdGUuZW50aXR5LGtub3dsZWRnZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnBlbmRpbmcsIHN0YXR1czoncmV2aXNpbmcnfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oKGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcbiAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XG4gICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5LCB0aGlzLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgKCk9PnRoaXMuc2V0U3RhdGUoe3N0YXR1czp1bmRlZmluZWR9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGxhbigpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtzZWxlY3RlZERheXN9PXRoaXMucmVmcy5wbGFuLnN0YXRlXG5cbiAgICAgICAgZGJUYXNrLnBsYW4oZW50aXR5LHNlbGVjdGVkRGF5cylcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0RG9jeCgpe1xuICAgICAgICByZXR1cm4gZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG4gICAgICAgICAgICAudGhlbihleHRyYWN0LGNvbnNvbGUuZXJyb3IpXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5jbGFzcyBQbGFuIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NsYXNzTmFtZSxvcGVuLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSAkeyFvcGVuICYmIFwiaGlkZGVuXCIgfHxcIlwifWB9IHsuLi5vdGhlcnN9PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2xhc3MgUGxhbkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBzZWxlY3RlZERheXM6W11cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciBldmVyeWRheXM9XCJ3ZWVrLHdlZWtlbmQsd2Vla2RheSxtb250aFwiLnNwbGl0KFwiLFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoYT0+KDxSYWlzZWRCdXR0b24ga2V5PXthfSBvbkNsaWNrPXsoKT0+dGhpcy5zZWxlY3REYXlzKGEpfT57YX08L1JhaXNlZEJ1dHRvbj4pKVxuICAgICAgICAgICAgLG5vdz1uZXcgRGF0ZSgpXG4gICAgICAgICAgICAse3NlbGVjdGVkRGF5c309dGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gWyg8ZGl2IGtleT1cImV2ZXJ5ZGF5c1wiIHN0eWxlPXt7dGV4dEFsaWduOidjZW50ZXInLHBhZGRpbmc6MTB9fT57ZXZlcnlkYXlzfTwvZGl2PiksXG4gICAgICAgICAgICAgICAgKDxkaXYga2V5PVwiY2FsZW5kZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPENhbGVuZGFyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWY9XCJjYWxlbmRhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5EYXRlPXtub3d9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhEYXRlPXtEYXRlLkhlbHBlci5hZGREYXlzKG5vdywzMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5RGF0ZT17bm93fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PildXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5cyhhKXtcblxuICAgIH1cbn1cbiJdfQ==