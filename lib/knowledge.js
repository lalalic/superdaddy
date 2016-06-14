'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qiliApp = require('qili-app');

var _materialUi = require('material-ui');

var _reactRouter = require('react-router');

var _borderColor = require('material-ui/svg-icons/editor/border-color');

var _borderColor2 = _interopRequireDefault(_borderColor);

var _cancel = require('material-ui/svg-icons/navigation/cancel');

var _cancel2 = _interopRequireDefault(_cancel);

var _calendar = require('./components/calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _knowledge = require('./db/knowledge');

var _knowledge2 = _interopRequireDefault(_knowledge);

var _task = require('./db/task');

var _task2 = _interopRequireDefault(_task);

var _extractor = require('./parser/extractor');

var _extractor2 = _interopRequireDefault(_extractor);

var _template = require('./parser/template');

var _template2 = _interopRequireDefault(_template);

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

        _this.state = { entity: null };
        return _this;
    }

    _createClass(Knowledge, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            _knowledge2.default.findOne({ _id: this.props.params._id }, function (entity) {
                return _this2.setState({ entity: entity });
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            var lastId = this.props.params._id;
            var _id = nextProps.params._id;


            if (_id != lastId) _knowledge2.default.findOne({ _id: _id }, function (entity) {
                return _this3.setState({ entity: entity });
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
            var _this4 = this;

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
                            return _this4.setState({ entity: _this4.origin, status: undefined });
                        },
                        icon: _cancel2.default });
                    primary = "Save";
                    break;
                default:
                    this.origin = entity;
                    commands.push({ action: "Plan", onSelect: function onSelect() {
                            return _this4.refs.plan.show();
                        } });
                    planCommand = _qiliApp.React.createElement(PlanCommand, { ref: 'plan', onCreate: function onCreate(selected) {
                            return _this4.createPlan(selected);
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
            var _this5 = this;

            switch (command) {
                case 'New Version':
                    Knowledge.selectDocx().then(function (docx) {
                        _this5.docx && _this5.docx.revoke();
                        delete _this5.docx;

                        _this5.docx = docx;
                        var knowledge = docx.knowledge;

                        var pending = Object.assign({}, _this5.state.entity, knowledge);
                        _this5.setState({ entity: pending, status: 'revising' });
                    });
                    break;
                case 'Save':
                    var entity = this.state.entity;

                    this.docx.upload(entity).then(function (content) {
                        entity.photos = _this5.docx.getPhotos();
                        entity.content = content;
                        _knowledge2.default.upsert(_this5.state.entity, _this5.origin, function () {
                            return _this5.setState({ status: undefined });
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
            var year = d.getYear(),
                month = d.getMonth(),
                now = new Date();
            now.setHours(0, 0, 0, 0);
            d.setHours(0, 0, 0, 0);

            return (0, _calendar.format)(d, now.getTime() == d.getTime() ? "今天 HH:MM" : year == now.getYear() && month == now.getMonth() ? "MM月DD日" : "YYYY年MM月DD日");
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
                        _reactRouter.Link,
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

        var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlanCommand).call(this, props));

        _this7.state = { selectedDays: [] };
        return _this7;
    }

    _createClass(PlanCommand, [{
        key: 'renderContent',
        value: function renderContent() {
            var _this8 = this;

            var everydays = "每天,周末,工作日".split(",").map(function (a) {
                return _qiliApp.React.createElement(
                    _materialUi.RaisedButton,
                    { key: a, onClick: function onClick(_) {
                            return _this8.selectDays(a);
                        } },
                    a
                );
            });
            var now = new Date();
            var selectedDays = this.state.selectedDays;


            return [_qiliApp.React.createElement(
                'div',
                { key: 'days', style: { textAlign: 'center', padding: 10 } },
                everydays
            ), _qiliApp.React.createElement(
                'div',
                { key: 'calender' },
                _qiliApp.React.createElement(_calendar2.default, {
                    ref: 'calendar',
                    minDate: now,
                    maxDate: (0, _calendar.addDays)(now, 31),
                    displayDate: now,
                    selected: selectedDays
                })
            ), _qiliApp.React.createElement(
                'center',
                { key: 'ok' },
                _qiliApp.React.createElement(
                    _materialUi.RaisedButton,
                    { onClick: function onClick(e) {
                            return _this8.props.onCreate(_this8.refs.calendar.state.selected);
                        },
                        primary: true, disabled: selectedDays.length == 0 },
                    '创建'
                )
            )];
        }
    }, {
        key: 'selectDays',
        value: function selectDays(type) {
            var now = new Date();
            switch (type) {
                case '每天':
                    break;
                case '周末':
                    break;
                case '每天':
                    break;
            }
        }
    }]);

    return PlanCommand;
}(CommandBar.DialogCommand);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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QUFKLENBSE07Z0JBSUwsZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQUpLOzs7QUFNWCxtQkFBTyxDQUFFOztrQkFBSyxLQUFJLE1BQUosRUFBVyxPQUFPLEVBQUMsV0FBVSxRQUFWLEVBQW1CLFNBQVEsRUFBUixFQUEzQixFQUFoQjtnQkFBeUQsU0FBekQ7YUFBRixFQUNFOztrQkFBSyxLQUFJLFVBQUosRUFBTDtnQkFDVDtBQUNDLHlCQUFJLFVBQUo7QUFDQSw2QkFBUyxHQUFUO0FBQ0EsNkJBQVMsdUJBQVEsR0FBUixFQUFZLEVBQVosQ0FBVDtBQUNBLGlDQUFhLEdBQWI7QUFDZSw4QkFBVSxZQUFWO2lCQUxoQixDQURTO2FBREYsRUFVRTs7a0JBQVEsS0FBSSxJQUFKLEVBQVI7Z0JBQWlCOztzQkFBZSxTQUFTO21DQUFHLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0IsT0FBSyxJQUFMLENBQVUsUUFBVixDQUFtQixLQUFuQixDQUF5QixRQUF6Qjt5QkFBdkI7QUFDdEMsaUNBQVMsSUFBVCxFQUFlLFVBQVUsYUFBYSxNQUFiLElBQXFCLENBQXJCLEVBRFg7O2lCQUFqQjthQVZGLENBQVAsQ0FOVzs7OzttQ0FxQkosTUFBSztBQUNaLGdCQUFJLE1BQUksSUFBSSxJQUFKLEVBQUosQ0FEUTtBQUVaLG9CQUFPLElBQVA7QUFDQSxxQkFBSyxJQUFMO0FBQ0EsMEJBREE7QUFEQSxxQkFHSyxJQUFMO0FBQ0EsMEJBREE7QUFIQSxxQkFLSyxJQUFMO0FBQ0EsMEJBREE7QUFMQSxhQUZZOzs7O1dBMUJkO0VBQW9CLFdBQVcsYUFBWCIsImZpbGUiOiJrbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1JlYWN0LENvbXBvbmVudCwgRmlsZSxVSSwgVXNlcn0gZnJvbSAncWlsaS1hcHAnXG5pbXBvcnQge1JhaXNlZEJ1dHRvbn0gZnJvbSAnbWF0ZXJpYWwtdWknXG5pbXBvcnQge0xpbmt9IGZyb20gXCJyZWFjdC1yb3V0ZXJcIlxuXG5pbXBvcnQgSWNvbkNyZWF0ZSBmcm9tIFwibWF0ZXJpYWwtdWkvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIlxuaW1wb3J0IEljb25DYW5jZWwgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2NhbmNlbFwiXG5cbmltcG9ydCBDYWxlbmRhciwge2FkZERheXMsIGZvcm1hdH0gZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJ1xuaW1wb3J0IGRiS25vd2xlZGdlIGZyb20gJy4vZGIva25vd2xlZGdlJ1xuaW1wb3J0IGRiVGFzayBmcm9tICcuL2RiL3Rhc2snXG5cbmltcG9ydCBleHRyYWN0IGZyb20gJy4vcGFyc2VyL2V4dHJhY3RvcidcbmltcG9ydCBUZW1wbGF0ZSBmcm9tIFwiLi9wYXJzZXIvdGVtcGxhdGVcIlxuXG5jb25zdCB7TGlzdCxMb2FkaW5nLENvbW1lbnQsQ29tbWFuZEJhcixmaWxlU2VsZWN0b3J9PVVJXG5jb25zdCB7RGlhbG9nQ29tbWFuZH09Q29tbWFuZEJhclxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17ZW50aXR5Om51bGx9XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKXtcbiAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sZW50aXR5PT50aGlzLnNldFN0YXRlKHtlbnRpdHl9KSlcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyl7XG4gICAgICAgIHZhciB7cGFyYW1zOntfaWQ6bGFzdElkfX09dGhpcy5wcm9wcyxcbiAgICAgICAgICAgIHtwYXJhbXM6e19pZH19PW5leHRQcm9wc1xuXG4gICAgICAgIGlmKF9pZCE9bGFzdElkKVxuICAgICAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkfSxlbnRpdHk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eX0pKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZ309dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl0sIHByaW1hcnksIHBsYW5Db21tYW5kO1xuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOkljb25DcmVhdGV9KVxuXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlICdyZXZpc2luZyc6XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKFwiU2F2ZVwiKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp0aGlzLm9yaWdpbixzdGF0dXM6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICAgICAgaWNvbjpJY29uQ2FuY2VsfSlcbiAgICAgICAgICAgIHByaW1hcnk9XCJTYXZlXCJcbiAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMub3JpZ2luPWVudGl0eVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiUGxhblwiLCBvblNlbGVjdDooKT0+dGhpcy5yZWZzLnBsYW4uc2hvdygpfSlcbiAgICAgICAgICAgIHBsYW5Db21tYW5kPSg8UGxhbkNvbW1hbmQgcmVmPVwicGxhblwiIG9uQ3JlYXRlPXtzZWxlY3RlZD0+dGhpcy5jcmVhdGVQbGFuKHNlbGVjdGVkKX0vPilcblxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5Db21tZW50IGtleT1cIkNvbW1lbnRcIiB0eXBlPXtkYktub3dsZWRnZX0gbW9kZWw9e2VudGl0eX0vPilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBwcmltYXJ5PVwiUGxhblwiXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge0tub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8UGxhbiBzdHlsZT17e3BhZGRpbmc6MTB9fSBvcGVuPXtwbGFuaW5nfSBlbnRpdHk9e2VudGl0eX0vPlxuXG4gICAgICAgICAgICAgICAgPENvbW1hbmRCYXJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9vdGJhclwiXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnk9e3ByaW1hcnl9XG4gICAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zPXtjb21tYW5kc30vPlxuXG4gICAgICAgICAgICAgICAge3BsYW5Db21tYW5kfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG5cblx0c3RhdGljIGRhdGUyU3RyaW5nKGQpe1xuXHRcdGlmKCFkKSByZXR1cm4gXCJcIlxuICAgICAgICBsZXQgeWVhcj1kLmdldFllYXIoKVxuICAgICAgICAgICAgLG1vbnRoPWQuZ2V0TW9udGgoKVxuXHRcdCAgICAsbm93PW5ldyBEYXRlKClcbiAgICAgICAgbm93LnNldEhvdXJzKDAsMCwwLDApXG4gICAgICAgIGQuc2V0SG91cnMoMCwwLDAsMClcblxuICAgICAgICByZXR1cm4gZm9ybWF0KGQsIG5vdy5nZXRUaW1lKCk9PWQuZ2V0VGltZSgpID8gXCLku4rlpKkgSEg6TU1cIiA6IHllYXI9PW5vdy5nZXRZZWFyKCkmJm1vbnRoPT1ub3cuZ2V0TW9udGgoKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlPVwiaHR0cDovL24uc2luYWltZy5jbi90cmFuc2Zvcm0vMjAxNTA3MTYvY0tIUi1meGZhc3dpNDAzOTA4NS5qcGdcIn09ZW50aXR5LFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfSxcbiAgICAgICAgICAgIHRlbXBsYXRlPW5ldyBUZW1wbGF0ZShlbnRpdHkuY29udGVudCk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9KHRlbXBsYXRlUmVuZGVyfHxmdW5jdGlvbih0cGwpe1xuICAgICAgICAgICAgICAgIHZhciBfX2h0bWw9dHBsLmNvbnRlbnRzLm1hcCgoc2VjdGlvbixpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2Yoc2VjdGlvbik9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+JHtzZWN0aW9uLmtleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtzZWN0aW9uLmFsdH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sfX0vPlxuICAgICAgICAgICAgfSkodGVtcGxhdGUpO1xuXG4gICAgICAgIGlmKGVudGl0eS5zdW1tYXJ5KXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KFxuICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49e29wZW59PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT57ZW50aXR5LnN1bW1hcnl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm90TmV3U3R1ZmZcbiAgICAgICAgaWYoZW50aXR5Ll9pZCl7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj1bXG4gICAgICAgICAgICAgICAgKDxoMSBrZXk9XCJsaW5rXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntLbm93bGVkZ2UuZGF0ZTJTdHJpbmcoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGlua1wiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8YXJ0aWNsZT5cblx0XHRcdFx0PGZpZ3VyZT57ZmlndXJlfTwvZmlndXJlPlxuXHRcdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHRcdHtub3ROZXdTdHVmZn1cblx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdHtjYXRlZ29yeS5qb2luKFwiLCBcIil9IHtrZXl3b3Jkcy5qb2luKFwiLCBcIil9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2hlYWRlcj5cblx0XHRcdFx0PHNlY3Rpb24+XG5cdFx0XHRcdFx0e2NvbnRlbnR9XG5cdFx0XHRcdDwvc2VjdGlvbj5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHQpXG4gICAgfVxuXG4gICAgZ2V0RXhwZXJpZW5jZSgpe1xuXG4gICAgfVxuXG4gICAgb25TZWxlY3QoY29tbWFuZCl7XG4gICAgICAgIHN3aXRjaChjb21tYW5kKXtcbiAgICAgICAgY2FzZSAnTmV3IFZlcnNpb24nOlxuICAgICAgICAgICAgS25vd2xlZGdlLnNlbGVjdERvY3goKVxuICAgICAgICAgICAgICAgIC50aGVuKChkb2N4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3ggJiYgdGhpcy5kb2N4LnJldm9rZSgpXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmRvY3hcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3g9ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIge2tub3dsZWRnZX09ZG9jeFxuICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZz1PYmplY3QuYXNzaWduKHt9LHRoaXMuc3RhdGUuZW50aXR5LGtub3dsZWRnZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnBlbmRpbmcsIHN0YXR1czoncmV2aXNpbmcnfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAnU2F2ZSc6XG4gICAgICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZVxuICAgICAgICAgICAgdGhpcy5kb2N4LnVwbG9hZChlbnRpdHkpLnRoZW4oKGNvbnRlbnQpPT57XG4gICAgICAgICAgICAgICAgZW50aXR5LnBob3Rvcz10aGlzLmRvY3guZ2V0UGhvdG9zKClcbiAgICAgICAgICAgICAgICBlbnRpdHkuY29udGVudD1jb250ZW50XG4gICAgICAgICAgICAgICAgZGJLbm93bGVkZ2UudXBzZXJ0KHRoaXMuc3RhdGUuZW50aXR5LCB0aGlzLm9yaWdpbixcbiAgICAgICAgICAgICAgICAgICAgKCk9PnRoaXMuc2V0U3RhdGUoe3N0YXR1czp1bmRlZmluZWR9KSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlUGxhbigpe1xuICAgICAgICB2YXIge2VudGl0eX09dGhpcy5zdGF0ZSxcbiAgICAgICAgICAgIHtzZWxlY3RlZERheXN9PXRoaXMucmVmcy5wbGFuLnN0YXRlXG5cbiAgICAgICAgZGJUYXNrLnBsYW4oZW50aXR5LHNlbGVjdGVkRGF5cylcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VsZWN0RG9jeCgpe1xuICAgICAgICByZXR1cm4gZmlsZVNlbGVjdG9yLnNlbGVjdCgpXG4gICAgICAgICAgICAudGhlbihleHRyYWN0LGNvbnNvbGUuZXJyb3IpXG4gICAgfVxuICAgIHN0YXRpYyBjb250ZXh0VHlwZXM9e3JvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0fVxufVxuXG5jbGFzcyBQbGFuIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NsYXNzTmFtZSxvcGVuLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSAkeyFvcGVuICYmIFwiaGlkZGVuXCIgfHxcIlwifWB9IHsuLi5vdGhlcnN9PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2xhc3MgUGxhbkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17c2VsZWN0ZWREYXlzOltdfVxuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciBldmVyeWRheXM9XCLmr4/lpKks5ZGo5pyrLOW3peS9nOaXpVwiLnNwbGl0KFwiLFwiKVxuICAgICAgICAgICAgICAgIC5tYXAoYT0+KDxSYWlzZWRCdXR0b24ga2V5PXthfSBvbkNsaWNrPXtfPT50aGlzLnNlbGVjdERheXMoYSl9PnthfTwvUmFpc2VkQnV0dG9uPikpXG4gICAgICAgICAgICAsbm93PW5ldyBEYXRlKClcbiAgICAgICAgICAgICx7c2VsZWN0ZWREYXlzfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiBbKDxkaXYga2V5PVwiZGF5c1wiIHN0eWxlPXt7dGV4dEFsaWduOidjZW50ZXInLHBhZGRpbmc6MTB9fT57ZXZlcnlkYXlzfTwvZGl2PiksXG4gICAgICAgICAgICAgICAgKDxkaXYga2V5PVwiY2FsZW5kZXJcIj5cbiAgICBcdFx0XHRcdDxDYWxlbmRhclxuICAgIFx0XHRcdFx0XHRyZWY9XCJjYWxlbmRhclwiXG4gICAgXHRcdFx0XHRcdG1pbkRhdGU9e25vd31cbiAgICBcdFx0XHRcdFx0bWF4RGF0ZT17YWRkRGF5cyhub3csMzEpfVxuICAgIFx0XHRcdFx0XHRkaXNwbGF5RGF0ZT17bm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQ9e3NlbGVjdGVkRGF5c31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KSxcbiAgICAgICAgICAgICAgICAoPGNlbnRlciBrZXk9XCJva1wiPjxSYWlzZWRCdXR0b24gIG9uQ2xpY2s9e2U9PnRoaXMucHJvcHMub25DcmVhdGUodGhpcy5yZWZzLmNhbGVuZGFyLnN0YXRlLnNlbGVjdGVkKX1cbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17dHJ1ZX0gZGlzYWJsZWQ9e3NlbGVjdGVkRGF5cy5sZW5ndGg9PTB9PuWIm+W7ujwvUmFpc2VkQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvY2VudGVyPildXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5cyh0eXBlKXtcbiAgICAgICAgbGV0IG5vdz1uZXcgRGF0ZSgpXG4gICAgICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgICAgY2FzZSAn5q+P5aSpJzpcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAn5ZGo5pyrJzpcbiAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAn5q+P5aSpJzpcbiAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==