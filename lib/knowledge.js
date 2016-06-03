'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('qili-app');

var React = _require.React;
var Component = _require.Component;
var File = _require.File;
var _require$UI = _require.UI;
var List = _require$UI.List;
var Loading = _require$UI.Loading;
var Comment = _require$UI.Comment;
var CommandBar = _require$UI.CommandBar;
var fileSelector = _require$UI.fileSelector;
var Link = _require.Router.Link;
var User = _require.User;
var DialogCommand = CommandBar.DialogCommand;
var dbKnowledge = require('./db/knowledge');
var dbTask = require('./db/task');

var _require2 = require('material-ui');

var RaisedButton = _require2.RaisedButton;
var extract = require('./parser/extractor');
var Template = require("./parser/template");
var Knowledge = function (_Component) {
    _inherits(Knowledge, _Component);

    function Knowledge(props) {
        _classCallCheck(this, Knowledge);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Knowledge).call(this, props));

        _this.state = {};
        var id = _this.props.params._id;

        dbKnowledge.findOne({ _id: id }, function (entity) {
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


            if (id != lastId) dbKnowledge.findOne({ _id: id }, function (entity) {
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


            if (!entity) return React.createElement(Loading, null);

            var commands = ["Back"],
                primary,
                planCommand;
            if (true || User.current._id == entity.author._id) commands.push({ action: "New Version", icon: require("material-ui/lib/svg-icons/editor/border-color") });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: require("material-ui/lib/svg-icons/navigation/cancel") });
                    primary = "Save";
                    break;
                default:
                    this.origin = entity;
                    commands.push({ action: "Plan", onSelect: function onSelect() {
                            return _this3.refs.plan.show();
                        } });
                    planCommand = React.createElement(PlanCommand, { ref: 'plan', onDismiss: function onDismiss() {
                            return _this3.createPlan();
                        } });

                    commands.push(React.createElement(CommandBar.Comment, { key: 'Comment', type: dbKnowledge, model: entity }));
                    commands.push(React.createElement(CommandBar.Share, { key: 'Share', message: entity }));
                    primary = "Plan";
            }

            return React.createElement(
                'div',
                { className: 'post' },
                React.createElement(
                    'div',
                    { className: 'knowledge' },
                    Knowledge.renderContent(entity)
                ),
                React.createElement(Plan, { style: { padding: 10 }, open: planing, entity: entity }),
                React.createElement(CommandBar, {
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
                        dbKnowledge.upsert(_this4.state.entity, _this4.origin, function () {
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


            dbTask.plan(entity, selectedDays);
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
            var template = new Template(entity.content);

            var content = (templateRender || function (tpl) {
                var __html = tpl.contents.map(function (section, i) {
                    if (typeof section == 'string') return section;
                    return '\n                        <details open="true">\n                            <summary>' + section.key + '</summary>\n                            <p>' + section.alt + '</p>\n                        </details>\n                    ';
                }).join("");
                return React.createElement('div', { dangerouslySetInnerHTML: { __html: __html } });
            })(template);

            if (entity.summary) {
                content = React.createElement(
                    'details',
                    { open: open },
                    React.createElement(
                        'summary',
                        null,
                        entity.summary
                    ),
                    content
                );
            }

            var notNewStuff;
            if (entity._id) {
                notNewStuff = [React.createElement(
                    'h1',
                    { key: 'link' },
                    React.createElement(
                        Link,
                        { to: '/knowledge/' + entity._id },
                        entity.title
                    )
                ), React.createElement(
                    'p',
                    { key: 'author' },
                    entity.author.name,
                    ' - ',
                    React.createElement(
                        'time',
                        null,
                        Knowledge.date2String(entity.createdAt)
                    )
                )];
            } else {
                notNewStuff = React.createElement(
                    'h1',
                    { key: 'link' },
                    entity.title
                );
            }

            if (figure) figure = React.createElement('img', { src: figure });

            return React.createElement(
                'article',
                null,
                React.createElement(
                    'figure',
                    null,
                    figure
                ),
                React.createElement(
                    'header',
                    null,
                    notNewStuff,
                    React.createElement(
                        'p',
                        null,
                        category.join(", "),
                        ' ',
                        keywords.join(", ")
                    )
                ),
                React.createElement(
                    'section',
                    null,
                    content
                )
            );
        }
    }, {
        key: 'selectDocx',
        value: function selectDocx() {
            return fileSelector.select().then(extract, console.error);
        }
    }]);

    return Knowledge;
}(Component);

exports.default = Knowledge;


Knowledge.contextTypes = {
    router: React.PropTypes.func
};

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

            return React.createElement('div', _extends({ className: className + ' ' + (!open && "hidden" || "") }, others));
        }
    }]);

    return Plan;
}(Component);

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
            var everydays = "week,weekend,weekday,month".split(",").map(function (a) {
                var _this7 = this;

                return React.createElement(
                    RaisedButton,
                    { key: a, onClick: function onClick() {
                            return _this7.selectDays(a);
                        } },
                    a
                );
            }.bind(this));
            var now = new Date();
            var Calendar = require('./components/calendar');
            var selectedDays = this.state.selectedDays;


            return [React.createElement(
                'div',
                { key: 'everydays', style: { textAlign: 'center', padding: 10 } },
                everydays
            ), React.createElement(
                'div',
                { key: 'calender' },
                React.createElement(Calendar, {
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
//# sourceMappingURL=data:application/json;base64,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Q0FBRDtzQkFBYyxLQUFLLENBQUwsRUFBUSxTQUFTO21DQUFJLE9BQUssVUFBTCxDQUFnQixDQUFoQjt5QkFBSixFQUEvQjtvQkFBd0QsQ0FBeEQ7aUJBQVIsQ0FENkQ7YUFBWCxDQUVwRCxJQUZvRCxDQUUvQyxJQUYrQyxDQUE1QyxDQUFWLENBRE87QUFJUCxzQkFBSSxJQUFJLElBQUosRUFBSixDQUpPO0FBS1AsMkJBQVMsUUFBUSx1QkFBUixDQUFULENBTE87Z0JBTU4sZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQU5NOzs7QUFRWCxtQkFBTyxDQUFFOztrQkFBSyxLQUFJLFdBQUosRUFBZ0IsT0FBTyxFQUFDLFdBQVUsUUFBVixFQUFtQixTQUFRLEVBQVIsRUFBM0IsRUFBckI7Z0JBQThELFNBQTlEO2FBQUYsRUFDRTs7a0JBQUssS0FBSSxVQUFKLEVBQUw7Z0JBQ0csb0JBQUMsUUFBRDtBQUNJLHlCQUFJLFVBQUo7QUFDQSw2QkFBUyxHQUFUO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixHQUFwQixFQUF3QixFQUF4QixDQUFUO0FBQ0EsaUNBQWEsR0FBYixFQUpKLENBREg7YUFERixDQUFQLENBUlc7Ozs7bUNBa0JKLEdBQUU7OztXQXpCWDtFQUFvQixXQUFXLGFBQVgiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUk6e0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yfSxSb3V0ZXI6e0xpbmt9LCBVc2VyfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyLFxuICAgIGRiS25vd2xlZGdlPXJlcXVpcmUoJy4vZGIva25vd2xlZGdlJyksXG4gICAgZGJUYXNrPXJlcXVpcmUoJy4vZGIvdGFzaycpLFxuICAgIHtSYWlzZWRCdXR0b259PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyksXG4gICAgZXh0cmFjdD1yZXF1aXJlKCcuL3BhcnNlci9leHRyYWN0b3InKSxcblx0VGVtcGxhdGU9cmVxdWlyZShcIi4vcGFyc2VyL3RlbXBsYXRlXCIpO1xuXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmlkfX09dGhpcy5wcm9wc1xuICAgICAgICBkYktub3dsZWRnZS5maW5kT25lKHtfaWQ6aWR9LChlbnRpdHkpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6ZW50aXR5fSkpXG4gICAgfVxuXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmxhc3RJZH19PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7cGFyYW1zOntfaWQ6aWR9fT1uZXh0UHJvcHNcblxuICAgICAgICBpZihpZCE9bGFzdElkKVxuICAgICAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOmlkfSwoZW50aXR5KT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OmVudGl0eX0pKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZ309dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl0sIHByaW1hcnksIHBsYW5Db21tYW5kO1xuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9saWIvc3ZnLWljb25zL2VkaXRvci9ib3JkZXItY29sb3JcIil9KVxuXG4gICAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlICdyZXZpc2luZyc6XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKFwiU2F2ZVwiKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiQ2FuY2VsXCIsXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6KCk9PnRoaXMuc2V0U3RhdGUoe2VudGl0eTp0aGlzLm9yaWdpbixzdGF0dXM6dW5kZWZpbmVkfSksXG4gICAgICAgICAgICAgICAgaWNvbjpyZXF1aXJlKFwibWF0ZXJpYWwtdWkvbGliL3N2Zy1pY29ucy9uYXZpZ2F0aW9uL2NhbmNlbFwiKX0pXG4gICAgICAgICAgICBwcmltYXJ5PVwiU2F2ZVwiXG4gICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLm9yaWdpbj1lbnRpdHlcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goe2FjdGlvbjpcIlBsYW5cIiwgb25TZWxlY3Q6KCk9PnRoaXMucmVmcy5wbGFuLnNob3coKX0pXG4gICAgICAgICAgICBwbGFuQ29tbWFuZD0oPFBsYW5Db21tYW5kIHJlZj1cInBsYW5cIiBvbkRpc21pc3M9eygpPT50aGlzLmNyZWF0ZVBsYW4oKX0vPilcblxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCg8Q29tbWFuZEJhci5Db21tZW50IGtleT1cIkNvbW1lbnRcIiB0eXBlPXtkYktub3dsZWRnZX0gbW9kZWw9e2VudGl0eX0vPilcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuU2hhcmUga2V5PVwiU2hhcmVcIiBtZXNzYWdlPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBwcmltYXJ5PVwiUGxhblwiXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJrbm93bGVkZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAge0tub3dsZWRnZS5yZW5kZXJDb250ZW50KGVudGl0eSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPFBsYW4gc3R5bGU9e3twYWRkaW5nOjEwfX0gb3Blbj17cGxhbmluZ30gZW50aXR5PXtlbnRpdHl9Lz5cblxuICAgICAgICAgICAgICAgIDxDb21tYW5kQmFyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvb3RiYXJcIlxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5PXtwcmltYXJ5fVxuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdD17dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICBpdGVtcz17Y29tbWFuZHN9Lz5cblxuICAgICAgICAgICAgICAgIHtwbGFuQ29tbWFuZH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuXHRcblx0c3RhdGljIGRhdGUyU3RyaW5nKGQpe1xuXHRcdGlmKCFkKSByZXR1cm4gXCJcIlxuXHRcdHZhciBub3c9bW9tZW50KCksZGF0ZT1tb21lbnQoZClcdFxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQobm93LmlzU2FtZShkYXRlLFwiZGF5XCIpID8gXCLku4rlpKkgSEg6TU1cIiA6IG5vdy5pc1NhbWUoZGF0ZSwgXCJ5ZWFyXCIpID8gXCJNTeaciERE5pelXCIgOiBcIllZWVnlubRNTeaciERE5pelXCIpXG5cdH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmU9XCJodHRwOi8vbi5zaW5haW1nLmNuL3RyYW5zZm9ybS8yMDE1MDcxNi9jS0hSLWZ4ZmFzd2k0MDM5MDg1LmpwZ1wifT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9LFxuICAgICAgICAgICAgdGVtcGxhdGU9bmV3IFRlbXBsYXRlKGVudGl0eS5jb250ZW50KTtcblxuICAgICAgICB2YXIgY29udGVudD0odGVtcGxhdGVSZW5kZXJ8fGZ1bmN0aW9uKHRwbCl7XG4gICAgICAgICAgICAgICAgdmFyIF9faHRtbD10cGwuY29udGVudHMubWFwKChzZWN0aW9uLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihzZWN0aW9uKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT4ke3NlY3Rpb24ua2V5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3NlY3Rpb24uYWx0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWx9fS8+XG4gICAgICAgICAgICB9KSh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGgxIGtleT1cImxpbmtcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtlbnRpdHkuX2lkfWB9PntlbnRpdHkudGl0bGV9PC9MaW5rPjwvaDE+KSxcbiAgICAgICAgICAgICAgICAoPHAga2V5PVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkuYXV0aG9yLm5hbWV9IC0gPHRpbWU+e0tub3dsZWRnZS5kYXRlMlN0cmluZyhlbnRpdHkuY3JlYXRlZEF0KX08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rXCI+e2VudGl0eS50aXRsZX08L2gxPilcbiAgICAgICAgfVxuXHRcdFxuXHRcdGlmKGZpZ3VyZSlcblx0XHRcdGZpZ3VyZT0oPGltZyBzcmM9e2ZpZ3VyZX0vPilcblx0XHRcblx0XHRyZXR1cm4gKFxuXHRcdFx0PGFydGljbGU+XG5cdFx0XHRcdDxmaWd1cmU+e2ZpZ3VyZX08L2ZpZ3VyZT5cblx0XHRcdFx0PGhlYWRlcj5cblx0XHRcdFx0XHR7bm90TmV3U3R1ZmZ9XG5cdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHR7Y2F0ZWdvcnkuam9pbihcIiwgXCIpfSB7a2V5d29yZHMuam9pbihcIiwgXCIpfVxuXHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdHtjb250ZW50fVxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0KVxuICAgIH1cblxuICAgIGdldEV4cGVyaWVuY2UoKXtcblxuICAgIH1cblxuICAgIG9uU2VsZWN0KGNvbW1hbmQpe1xuICAgICAgICBzd2l0Y2goY29tbWFuZCl7XG4gICAgICAgIGNhc2UgJ05ldyBWZXJzaW9uJzpcbiAgICAgICAgICAgIEtub3dsZWRnZS5zZWxlY3REb2N4KClcbiAgICAgICAgICAgICAgICAudGhlbigoZG9jeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5kb2N4XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N4PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHtrbm93bGVkZ2V9PWRvY3hcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmc9T2JqZWN0LmFzc2lnbih7fSx0aGlzLnN0YXRlLmVudGl0eSxrbm93bGVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2VudGl0eTpwZW5kaW5nLCBzdGF0dXM6J3JldmlzaW5nJ30pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ1NhdmUnOlxuICAgICAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGVcbiAgICAgICAgICAgIHRoaXMuZG9jeC51cGxvYWQoZW50aXR5KS50aGVuKChjb250ZW50KT0+e1xuICAgICAgICAgICAgICAgIGVudGl0eS5waG90b3M9dGhpcy5kb2N4LmdldFBob3RvcygpXG4gICAgICAgICAgICAgICAgZW50aXR5LmNvbnRlbnQ9Y29udGVudFxuICAgICAgICAgICAgICAgIGRiS25vd2xlZGdlLnVwc2VydCh0aGlzLnN0YXRlLmVudGl0eSwgdGhpcy5vcmlnaW4sXG4gICAgICAgICAgICAgICAgICAgICgpPT50aGlzLnNldFN0YXRlKHtzdGF0dXM6dW5kZWZpbmVkfSkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZVBsYW4oKXtcbiAgICAgICAgdmFyIHtlbnRpdHl9PXRoaXMuc3RhdGUsXG4gICAgICAgICAgICB7c2VsZWN0ZWREYXlzfT10aGlzLnJlZnMucGxhbi5zdGF0ZVxuXG4gICAgICAgIGRiVGFzay5wbGFuKGVudGl0eSxzZWxlY3RlZERheXMpXG4gICAgfVxuXG4gICAgc3RhdGljIHNlbGVjdERvY3goKXtcbiAgICAgICAgcmV0dXJuIGZpbGVTZWxlY3Rvci5zZWxlY3QoKVxuICAgICAgICAgICAgLnRoZW4oZXh0cmFjdCxjb25zb2xlLmVycm9yKVxuICAgIH1cbn1cblxuS25vd2xlZGdlLmNvbnRleHRUeXBlcz17XG4gICAgcm91dGVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xufVxuXG5jbGFzcyBQbGFuIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2NsYXNzTmFtZSxvcGVuLC4uLm90aGVyc309dGhpcy5wcm9wc1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YCR7Y2xhc3NOYW1lfSAkeyFvcGVuICYmIFwiaGlkZGVuXCIgfHxcIlwifWB9IHsuLi5vdGhlcnN9PlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2xhc3MgUGxhbkNvbW1hbmQgZXh0ZW5kcyBDb21tYW5kQmFyLkRpYWxvZ0NvbW1hbmR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17XG4gICAgICAgICAgICBzZWxlY3RlZERheXM6W11cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCl7XG4gICAgICAgIHZhciBldmVyeWRheXM9XCJ3ZWVrLHdlZWtlbmQsd2Vla2RheSxtb250aFwiLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICg8UmFpc2VkQnV0dG9uIGtleT17YX0gb25DbGljaz17KCk9PnRoaXMuc2VsZWN0RGF5cyhhKX0+e2F9PC9SYWlzZWRCdXR0b24+KVxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG5vdz1uZXcgRGF0ZSgpLFxuICAgICAgICAgICAgQ2FsZW5kYXI9cmVxdWlyZSgnLi9jb21wb25lbnRzL2NhbGVuZGFyJyksXG4gICAgICAgICAgICB7c2VsZWN0ZWREYXlzfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiBbKDxkaXYga2V5PVwiZXZlcnlkYXlzXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcicscGFkZGluZzoxMH19PntldmVyeWRheXN9PC9kaXY+KSxcbiAgICAgICAgICAgICAgICAoPGRpdiBrZXk9XCJjYWxlbmRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8Q2FsZW5kYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj1cImNhbGVuZGFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRhdGU9e25vd31cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heERhdGU9e0RhdGUuSGVscGVyLmFkZERheXMobm93LDMxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlEYXRlPXtub3d9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+KV1cbiAgICB9XG5cbiAgICBzZWxlY3REYXlzKGEpe1xuXG4gICAgfVxufVxuIl19