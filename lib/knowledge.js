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
            if (true || User.current._id == entity.author._id) commands.push({ action: "New Version", icon: require("material-ui/svg-icons/editor/border-color") });

            switch (status) {
                case 'revising':
                    commands.push("Save");
                    commands.push({ action: "Cancel",
                        onSelect: function onSelect() {
                            return _this3.setState({ entity: _this3.origin, status: undefined });
                        },
                        icon: require("material-ui/svg-icons/navigation/cancel") });
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
    router: React.PropTypes.object
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
//# sourceMappingURL=data:application/json;base64,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Q0FBRDtzQkFBYyxLQUFLLENBQUwsRUFBUSxTQUFTO21DQUFJLE9BQUssVUFBTCxDQUFnQixDQUFoQjt5QkFBSixFQUEvQjtvQkFBd0QsQ0FBeEQ7aUJBQVIsQ0FENkQ7YUFBWCxDQUVwRCxJQUZvRCxDQUUvQyxJQUYrQyxDQUE1QyxDQUFWLENBRE87QUFJUCxzQkFBSSxJQUFJLElBQUosRUFBSixDQUpPO0FBS1AsMkJBQVMsUUFBUSx1QkFBUixDQUFULENBTE87Z0JBTU4sZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQU5NOzs7QUFRWCxtQkFBTyxDQUFFOztrQkFBSyxLQUFJLFdBQUosRUFBZ0IsT0FBTyxFQUFDLFdBQVUsUUFBVixFQUFtQixTQUFRLEVBQVIsRUFBM0IsRUFBckI7Z0JBQThELFNBQTlEO2FBQUYsRUFDRTs7a0JBQUssS0FBSSxVQUFKLEVBQUw7Z0JBQ0csb0JBQUMsUUFBRDtBQUNJLHlCQUFJLFVBQUo7QUFDQSw2QkFBUyxHQUFUO0FBQ0EsNkJBQVMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixHQUFwQixFQUF3QixFQUF4QixDQUFUO0FBQ0EsaUNBQWEsR0FBYixFQUpKLENBREg7YUFERixDQUFQLENBUlc7Ozs7bUNBa0JKLEdBQUU7OztXQXpCWDtFQUFvQixXQUFXLGFBQVgiLCJmaWxlIjoia25vd2xlZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUk6e0xpc3QsTG9hZGluZyxDb21tZW50LENvbW1hbmRCYXIsZmlsZVNlbGVjdG9yfSxSb3V0ZXI6e0xpbmt9LCBVc2VyfT1yZXF1aXJlKCdxaWxpLWFwcCcpLFxuICAgIHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyLFxuICAgIGRiS25vd2xlZGdlPXJlcXVpcmUoJy4vZGIva25vd2xlZGdlJyksXG4gICAgZGJUYXNrPXJlcXVpcmUoJy4vZGIvdGFzaycpLFxuICAgIHtSYWlzZWRCdXR0b259PXJlcXVpcmUoJ21hdGVyaWFsLXVpJyksXG4gICAgZXh0cmFjdD1yZXF1aXJlKCcuL3BhcnNlci9leHRyYWN0b3InKSxcblx0VGVtcGxhdGU9cmVxdWlyZShcIi4vcGFyc2VyL3RlbXBsYXRlXCIpO1xuXG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBLbm93bGVkZ2UgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgY29uc3RydWN0b3IocHJvcHMpe1xuICAgICAgICBzdXBlcihwcm9wcylcbiAgICAgICAgdGhpcy5zdGF0ZT17fVxuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmlkfX09dGhpcy5wcm9wc1xuICAgICAgICBkYktub3dsZWRnZS5maW5kT25lKHtfaWQ6aWR9LChlbnRpdHkpPT50aGlzLnNldFN0YXRlKHtlbnRpdHk6ZW50aXR5fSkpXG4gICAgfVxuXG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpe1xuICAgICAgICB2YXIge3BhcmFtczp7X2lkOmxhc3RJZH19PXRoaXMucHJvcHMsXG4gICAgICAgICAgICB7cGFyYW1zOntfaWQ6aWR9fT1uZXh0UHJvcHNcblxuICAgICAgICBpZihpZCE9bGFzdElkKVxuICAgICAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOmlkfSwoZW50aXR5KT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OmVudGl0eX0pKVxuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgdmFyIHtlbnRpdHksIHN0YXR1cywgcGxhbmluZ309dGhpcy5zdGF0ZVxuXG4gICAgICAgIGlmKCFlbnRpdHkpXG4gICAgICAgICAgICByZXR1cm4gKDxMb2FkaW5nLz4pXG5cbiAgICAgICAgdmFyIGNvbW1hbmRzPVtcIkJhY2tcIl0sIHByaW1hcnksIHBsYW5Db21tYW5kO1xuICAgICAgICBpZih0cnVlIHx8IFVzZXIuY3VycmVudC5faWQ9PWVudGl0eS5hdXRob3IuX2lkKVxuICAgICAgICAgICAgY29tbWFuZHMucHVzaCh7YWN0aW9uOlwiTmV3IFZlcnNpb25cIixpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvZWRpdG9yL2JvcmRlci1jb2xvclwiKX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOnJlcXVpcmUoXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIil9KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJQbGFuXCIsIG9uU2VsZWN0OigpPT50aGlzLnJlZnMucGxhbi5zaG93KCl9KVxuICAgICAgICAgICAgcGxhbkNvbW1hbmQ9KDxQbGFuQ29tbWFuZCByZWY9XCJwbGFuXCIgb25EaXNtaXNzPXsoKT0+dGhpcy5jcmVhdGVQbGFuKCl9Lz4pXG5cbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlBsYW5cIlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxQbGFuIHN0eWxlPXt7cGFkZGluZzoxMH19IG9wZW49e3BsYW5pbmd9IGVudGl0eT17ZW50aXR5fS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbW1hbmR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblx0XG5cdHN0YXRpYyBkYXRlMlN0cmluZyhkKXtcblx0XHRpZighZCkgcmV0dXJuIFwiXCJcblx0XHR2YXIgbm93PW1vbWVudCgpLGRhdGU9bW9tZW50KGQpXHRcbiAgICAgICAgcmV0dXJuIGRhdGUuZm9ybWF0KG5vdy5pc1NhbWUoZGF0ZSxcImRheVwiKSA/IFwi5LuK5aSpIEhIOk1NXCIgOiBub3cuaXNTYW1lKGRhdGUsIFwieWVhclwiKSA/IFwiTU3mnIhEROaXpVwiIDogXCJZWVlZ5bm0TU3mnIhEROaXpVwiKVxuXHR9XG5cbiAgICBzdGF0aWMgcmVuZGVyQ29udGVudChlbnRpdHksIG9wZW49dHJ1ZSwgdGVtcGxhdGVSZW5kZXIpe1xuICAgICAgICB2YXIge2NhdGVnb3J5PVtdLCBrZXl3b3Jkcz1bXSwgZmlndXJlPVwiaHR0cDovL24uc2luYWltZy5jbi90cmFuc2Zvcm0vMjAxNTA3MTYvY0tIUi1meGZhc3dpNDAzOTA4NS5qcGdcIn09ZW50aXR5LFxuICAgICAgICAgICAgc2VuY29uZGFyeVN0eWxlPXtmb250U2l6ZTonc21hbGwnLGZvbnRXZWlnaHQ6J25vcm1hbCcsIHRleHRBbGlnbjoncmlnaHQnfSxcbiAgICAgICAgICAgIHRlbXBsYXRlPW5ldyBUZW1wbGF0ZShlbnRpdHkuY29udGVudCk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQ9KHRlbXBsYXRlUmVuZGVyfHxmdW5jdGlvbih0cGwpe1xuICAgICAgICAgICAgICAgIHZhciBfX2h0bWw9dHBsLmNvbnRlbnRzLm1hcCgoc2VjdGlvbixpKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2Yoc2VjdGlvbik9PSdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN1bW1hcnk+JHtzZWN0aW9uLmtleX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtzZWN0aW9uLmFsdH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KS5qb2luKFwiXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiA8ZGl2IGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7X19odG1sfX0vPlxuICAgICAgICAgICAgfSkodGVtcGxhdGUpO1xuXG4gICAgICAgIGlmKGVudGl0eS5zdW1tYXJ5KXtcbiAgICAgICAgICAgIGNvbnRlbnQ9KFxuICAgICAgICAgICAgICAgIDxkZXRhaWxzIG9wZW49e29wZW59PlxuICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT57ZW50aXR5LnN1bW1hcnl9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm90TmV3U3R1ZmZcbiAgICAgICAgaWYoZW50aXR5Ll9pZCl7XG4gICAgICAgICAgICBub3ROZXdTdHVmZj1bXG4gICAgICAgICAgICAgICAgKDxoMSBrZXk9XCJsaW5rXCI+PExpbmsgdG89e2Ava25vd2xlZGdlLyR7ZW50aXR5Ll9pZH1gfT57ZW50aXR5LnRpdGxlfTwvTGluaz48L2gxPiksXG4gICAgICAgICAgICAgICAgKDxwIGtleT1cImF1dGhvclwiPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5LmF1dGhvci5uYW1lfSAtIDx0aW1lPntLbm93bGVkZ2UuZGF0ZTJTdHJpbmcoZW50aXR5LmNyZWF0ZWRBdCl9PC90aW1lPlxuICAgICAgICAgICAgICAgIDwvcD4pXG4gICAgICAgICAgICBdXG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPSg8aDEga2V5PVwibGlua1wiPntlbnRpdHkudGl0bGV9PC9oMT4pXG4gICAgICAgIH1cblx0XHRcblx0XHRpZihmaWd1cmUpXG5cdFx0XHRmaWd1cmU9KDxpbWcgc3JjPXtmaWd1cmV9Lz4pXG5cdFx0XG5cdFx0cmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0e2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0PC9zZWN0aW9uPlxuXHRcdFx0PC9hcnRpY2xlPlxuXHRcdClcbiAgICB9XG5cbiAgICBnZXRFeHBlcmllbmNlKCl7XG5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XG4gICAgICAgICAgICBLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRvY3gpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeD1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nPU9iamVjdC5hc3NpZ24oe30sdGhpcy5zdGF0ZS5lbnRpdHksa25vd2xlZGdlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6cGVuZGluZywgc3RhdHVzOidyZXZpc2luZyd9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdTYXZlJzpcbiAgICAgICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICB0aGlzLmRvY3gudXBsb2FkKGVudGl0eSkudGhlbigoY29udGVudCk9PntcbiAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxuICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcbiAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHksIHRoaXMub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAoKT0+dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOnVuZGVmaW5lZH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQbGFuKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3NlbGVjdGVkRGF5c309dGhpcy5yZWZzLnBsYW4uc3RhdGVcblxuICAgICAgICBkYlRhc2sucGxhbihlbnRpdHksc2VsZWN0ZWREYXlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG59XG5cbktub3dsZWRnZS5jb250ZXh0VHlwZXM9e1xuICAgIHJvdXRlcjpSZWFjdC5Qcm9wVHlwZXMub2JqZWN0XG59XG5cbmNsYXNzIFBsYW4gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2xhc3NOYW1lLG9wZW4sLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9ICR7IW9wZW4gJiYgXCJoaWRkZW5cIiB8fFwiXCJ9YH0gey4uLm90aGVyc30+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBQbGFuQ29tbWFuZCBleHRlbmRzIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5czpbXVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIGV2ZXJ5ZGF5cz1cIndlZWssd2Vla2VuZCx3ZWVrZGF5LG1vbnRoXCIuc3BsaXQoXCIsXCIpLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gKDxSYWlzZWRCdXR0b24ga2V5PXthfSBvbkNsaWNrPXsoKT0+dGhpcy5zZWxlY3REYXlzKGEpfT57YX08L1JhaXNlZEJ1dHRvbj4pXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpLFxuICAgICAgICAgICAgbm93PW5ldyBEYXRlKCksXG4gICAgICAgICAgICBDYWxlbmRhcj1yZXF1aXJlKCcuL2NvbXBvbmVudHMvY2FsZW5kYXInKSxcbiAgICAgICAgICAgIHtzZWxlY3RlZERheXN9PXRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIFsoPGRpdiBrZXk9XCJldmVyeWRheXNcIiBzdHlsZT17e3RleHRBbGlnbjonY2VudGVyJyxwYWRkaW5nOjEwfX0+e2V2ZXJ5ZGF5c308L2Rpdj4pLFxuICAgICAgICAgICAgICAgICg8ZGl2IGtleT1cImNhbGVuZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPVwiY2FsZW5kYXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbWluRGF0ZT17bm93fVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGF0ZT17RGF0ZS5IZWxwZXIuYWRkRGF5cyhub3csMzEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheURhdGU9e25vd30gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj4pXVxuICAgIH1cblxuICAgIHNlbGVjdERheXMoYSl7XG5cbiAgICB9XG59XG4iXX0=