'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
        _knowledge2.default.findOne({ _id: _this.props.params._id }, function (entity) {
            return _this.setState({ entity: entity });
        });
        return _this;
    }

    _createClass(Knowledge, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var lastId = this.props.params._id;
            var _id = nextProps.params._id;


            if (_id != lastId) _knowledge2.default.findOne({ _id: _id }, function (entity) {
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
                _qiliApp.React.createElement(_calendar2.default, {
                    ref: 'calendar',
                    minDate: now,
                    maxDate: (0, _calendar.addDays)(now, 31),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9rbm93bGVkZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRU87SUFBSztJQUFRO0lBQVE7SUFBVztJQUNoQyxnQkFBZSxXQUFmOztJQUVjOzs7QUFDakIsYUFEaUIsU0FDakIsQ0FBWSxLQUFaLEVBQWtCOzhCQURELFdBQ0M7OzJFQURELHNCQUVQLFFBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQVcsRUFBQyxRQUFPLElBQVAsRUFBWixDQUZjO0FBR2QsNEJBQVksT0FBWixDQUFvQixFQUFDLEtBQUksTUFBSyxLQUFMLENBQVcsTUFBWCxDQUFrQixHQUFsQixFQUF6QixFQUFnRDttQkFBUSxNQUFLLFFBQUwsQ0FBYyxFQUFDLGNBQUQsRUFBZDtTQUFSLENBQWhELENBSGM7O0tBQWxCOztpQkFEaUI7O2tEQVFTLFdBQVU7OztBQUM1QixnQkFBYSxTQUFTLEtBQUssS0FBTCxDQUFyQixPQUFRLEdBQVQsQ0FENEI7Z0JBRW5CLE1BQU0sVUFBZCxPQUFRLElBRm1COzs7QUFJaEMsZ0JBQUcsT0FBSyxNQUFMLEVBQ0Msb0JBQVksT0FBWixDQUFvQixFQUFDLFFBQUQsRUFBcEIsRUFBMEI7dUJBQVEsT0FBSyxRQUFMLENBQWMsRUFBQyxjQUFELEVBQWQ7YUFBUixDQUExQixDQURKOzs7OytDQUlrQjtBQUNsQixpQkFBSyxJQUFMLElBQWEsS0FBSyxJQUFMLENBQVUsTUFBVixFQUFiLENBRGtCOzs7O2lDQUlkOzs7eUJBQzBCLEtBQUssS0FBTCxDQUQxQjtnQkFDQyx1QkFERDtnQkFDUyx1QkFEVDtnQkFDaUIseUJBRGpCOzs7QUFHSixnQkFBRyxDQUFDLE1BQUQsRUFDQyxPQUFRLDZCQUFDLE9BQUQsT0FBUixDQURKOztBQUdBLGdCQUFJLFdBQVMsQ0FBQyxNQUFELENBQVQ7Z0JBQW1CLE9BQXZCO2dCQUFnQyxXQUFoQyxDQU5JO0FBT0osZ0JBQUcsUUFBUSxjQUFLLE9BQUwsQ0FBYSxHQUFiLElBQWtCLE9BQU8sTUFBUCxDQUFjLEdBQWQsRUFDekIsU0FBUyxJQUFULENBQWMsRUFBQyxRQUFPLGFBQVAsRUFBcUIsMkJBQXRCLEVBQWQsRUFESjs7QUFHQSxvQkFBTyxNQUFQO0FBQ0EscUJBQUssVUFBTDtBQUNJLDZCQUFTLElBQVQsQ0FBYyxNQUFkLEVBREo7QUFFSSw2QkFBUyxJQUFULENBQWMsRUFBQyxRQUFPLFFBQVA7QUFDWCxrQ0FBUzttQ0FBSSxPQUFLLFFBQUwsQ0FBYyxFQUFDLFFBQU8sT0FBSyxNQUFMLEVBQVksUUFBTyxTQUFQLEVBQWxDO3lCQUFKO0FBQ1QsOENBRlUsRUFBZCxFQUZKO0FBS0ksOEJBQVEsTUFBUixDQUxKO0FBTUEsMEJBTkE7QUFEQTtBQVNJLHlCQUFLLE1BQUwsR0FBWSxNQUFaLENBREo7QUFFSSw2QkFBUyxJQUFULENBQWMsRUFBQyxRQUFPLE1BQVAsRUFBZSxVQUFTO21DQUFJLE9BQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxJQUFmO3lCQUFKLEVBQXZDLEVBRko7QUFHSSxrQ0FBYSw2QkFBQyxXQUFELElBQWEsS0FBSSxNQUFKLEVBQVcsV0FBVzttQ0FBSSxPQUFLLFVBQUw7eUJBQUosRUFBbkMsQ0FBYixDQUhKOztBQUtJLDZCQUFTLElBQVQsQ0FBYyw2QkFBQyxXQUFXLE9BQVosSUFBb0IsS0FBSSxTQUFKLEVBQWMsMkJBQW1CLE9BQU8sTUFBUCxFQUFyRCxDQUFkLEVBTEo7QUFNSSw2QkFBUyxJQUFULENBQWMsNkJBQUMsV0FBVyxLQUFaLElBQWtCLEtBQUksT0FBSixFQUFZLFNBQVMsTUFBVCxFQUE5QixDQUFkLEVBTko7QUFPSSw4QkFBUSxNQUFSLENBUEo7QUFSQSxhQVZJOztBQTRCSixtQkFDSTs7a0JBQUssV0FBVSxNQUFWLEVBQUw7Z0JBQ0k7O3NCQUFLLFdBQVUsV0FBVixFQUFMO29CQUNLLFVBQVUsYUFBVixDQUF3QixNQUF4QixDQURMO2lCQURKO2dCQUlJLDZCQUFDLElBQUQsSUFBTSxPQUFPLEVBQUMsU0FBUSxFQUFSLEVBQVIsRUFBcUIsTUFBTSxPQUFOLEVBQWUsUUFBUSxNQUFSLEVBQTFDLENBSko7Z0JBTUksNkJBQUMsVUFBRDtBQUNJLCtCQUFVLFNBQVY7QUFDQSw2QkFBUyxPQUFUO0FBQ0EsOEJBQVUsS0FBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixJQUFuQixDQUFWO0FBQ0EsMkJBQU8sUUFBUCxFQUpKLENBTko7Z0JBWUssV0FaTDthQURKLENBNUJJOzs7O3dDQStHTzs7O2lDQUlOLFNBQVE7OztBQUNiLG9CQUFPLE9BQVA7QUFDQSxxQkFBSyxhQUFMO0FBQ0ksOEJBQVUsVUFBVixHQUNLLElBREwsQ0FDVSxVQUFDLElBQUQsRUFBUTtBQUNWLCtCQUFLLElBQUwsSUFBYSxPQUFLLElBQUwsQ0FBVSxNQUFWLEVBQWIsQ0FEVTtBQUVWLCtCQUFPLE9BQUssSUFBTCxDQUZHOztBQUlWLCtCQUFLLElBQUwsR0FBVSxJQUFWLENBSlU7NEJBS0wsWUFBVyxLQUFYLFVBTEs7O0FBTVYsNEJBQUksVUFBUSxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLE9BQUssS0FBTCxDQUFXLE1BQVgsRUFBa0IsU0FBbkMsQ0FBUixDQU5NO0FBT1YsK0JBQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxPQUFQLEVBQWdCLFFBQU8sVUFBUCxFQUEvQixFQVBVO3FCQUFSLENBRFYsQ0FESjtBQVdJLDBCQVhKO0FBREEscUJBYUssTUFBTDt3QkFDUyxTQUFRLEtBQUssS0FBTCxDQUFSLE9BRFQ7O0FBRUkseUJBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsSUFBekIsQ0FBOEIsVUFBQyxPQUFELEVBQVc7QUFDckMsK0JBQU8sTUFBUCxHQUFjLE9BQUssSUFBTCxDQUFVLFNBQVYsRUFBZCxDQURxQztBQUVyQywrQkFBTyxPQUFQLEdBQWUsT0FBZixDQUZxQztBQUdyQyw0Q0FBWSxNQUFaLENBQW1CLE9BQUssS0FBTCxDQUFXLE1BQVgsRUFBbUIsT0FBSyxNQUFMLEVBQ2xDO21DQUFJLE9BQUssUUFBTCxDQUFjLEVBQUMsUUFBTyxTQUFQLEVBQWY7eUJBQUosQ0FESixDQUhxQztxQkFBWCxDQUE5QixDQUZKO0FBUUksMEJBUko7QUFiQSxhQURhOzs7O3FDQTBCTDtBQUNKLGdCQUFDLFNBQVEsS0FBSyxLQUFMLENBQVIsTUFBRCxDQURJO2dCQUVILGVBQWMsS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLEtBQWYsQ0FBZCxhQUZHOzs7QUFJUiwyQkFBTyxJQUFQLENBQVksTUFBWixFQUFtQixZQUFuQixFQUpROzs7O29DQS9GSSxHQUFFO0FBQ3BCLGdCQUFHLENBQUMsQ0FBRCxFQUFJLE9BQU8sRUFBUCxDQUFQO0FBQ0EsZ0JBQUksTUFBSSx1QkFBSjtnQkFBYSxPQUFLLHNCQUFPLENBQVAsQ0FBTCxDQUZHO0FBR2QsbUJBQU8sS0FBSyxNQUFMLENBQVksSUFBSSxNQUFKLENBQVcsSUFBWCxFQUFnQixLQUFoQixJQUF5QixVQUF6QixHQUFzQyxJQUFJLE1BQUosQ0FBVyxJQUFYLEVBQWlCLE1BQWpCLElBQTJCLFFBQTNCLEdBQXNDLGFBQXRDLENBQXpELENBSGM7Ozs7c0NBTUcsUUFBa0M7Z0JBQTFCLDZEQUFLLG9CQUFxQjtnQkFBZiw4QkFBZTttQ0FDcUQsT0FBbkcsU0FEOEM7Z0JBQzlDLDRDQUFTLHNCQURxQzttQ0FDcUQsT0FBdEYsU0FEaUM7Z0JBQ2pDLDRDQUFTLHNCQUR3QjtpQ0FDcUQsT0FBekUsT0FEb0I7QUFDL0MsZ0JBQTJCLHdDQUFPLGlGQUFsQyxDQUQrQztBQUUvQyxrQ0FBZ0IsRUFBQyxVQUFTLE9BQVQsRUFBaUIsWUFBVyxRQUFYLEVBQXFCLFdBQVUsT0FBVixFQUF2RCxDQUYrQztBQUcvQywyQkFBUyx1QkFBYSxPQUFPLE9BQVAsQ0FBdEIsQ0FIK0M7O0FBS25ELGdCQUFJLFVBQVEsQ0FBQyxrQkFBZ0IsVUFBUyxHQUFULEVBQWE7QUFDbEMsb0JBQUksU0FBTyxJQUFJLFFBQUosQ0FBYSxHQUFiLENBQWlCLFVBQUMsT0FBRCxFQUFTLENBQVQsRUFBYTtBQUNyQyx3QkFBRyxPQUFPLE9BQVAsSUFBaUIsUUFBakIsRUFDQyxPQUFPLE9BQVAsQ0FESjtBQUVBLHNIQUVtQixRQUFRLEdBQVIsbURBQ04sUUFBUSxHQUFSLG1FQUhiLENBSHFDO2lCQUFiLENBQWpCLENBU1IsSUFUUSxDQVNILEVBVEcsQ0FBUCxDQUQ4QjtBQVdsQyx1QkFBTyxzQ0FBSyx5QkFBeUIsRUFBQyxjQUFELEVBQXpCLEVBQUwsQ0FBUCxDQVhrQzthQUFiLENBQWpCLENBWUwsUUFaSyxDQUFSLENBTCtDOztBQW1CbkQsZ0JBQUcsT0FBTyxPQUFQLEVBQWU7QUFDZCwwQkFDSTs7c0JBQVMsTUFBTSxJQUFOLEVBQVQ7b0JBQ0k7Ozt3QkFBVSxPQUFPLE9BQVA7cUJBRGQ7b0JBRUssT0FGTDtpQkFESixDQURjO2FBQWxCOztBQVNBLGdCQUFJLFdBQUosQ0E1Qm1EO0FBNkJuRCxnQkFBRyxPQUFPLEdBQVAsRUFBVztBQUNWLDhCQUFZLENBQ1A7O3NCQUFJLEtBQUksTUFBSixFQUFKO29CQUFlOzswQkFBTSxvQkFBa0IsT0FBTyxHQUFQLEVBQXhCO3dCQUF1QyxPQUFPLEtBQVA7cUJBQXREO2lCQURPLEVBRVA7O3NCQUFHLEtBQUksUUFBSixFQUFIO29CQUNJLE9BQU8sTUFBUCxDQUFjLElBQWQ7eUJBREo7b0JBQzBCOzs7d0JBQU8sVUFBVSxXQUFWLENBQXNCLE9BQU8sU0FBUCxDQUE3QjtxQkFEMUI7aUJBRk8sQ0FBWixDQURVO2FBQWQsTUFPTTtBQUNGLDhCQUFhOztzQkFBSSxLQUFJLE1BQUosRUFBSjtvQkFBZ0IsT0FBTyxLQUFQO2lCQUE3QixDQURFO2FBUE47O0FBV04sZ0JBQUcsTUFBSCxFQUNDLFNBQVEsc0NBQUssS0FBSyxNQUFMLEVBQUwsQ0FBUixDQUREOztBQUdBLG1CQUNDOzs7Z0JBQ0M7OztvQkFBUyxNQUFUO2lCQUREO2dCQUVDOzs7b0JBQ0UsV0FERjtvQkFFQzs7O3dCQUNFLFNBQVMsSUFBVCxDQUFjLElBQWQsQ0FERjs7d0JBQ3dCLFNBQVMsSUFBVCxDQUFjLElBQWQsQ0FEeEI7cUJBRkQ7aUJBRkQ7Z0JBUUM7OztvQkFDRSxPQURGO2lCQVJEO2FBREQsQ0EzQ3lEOzs7O3FDQWdHcEM7QUFDZixtQkFBTyxhQUFhLE1BQWIsR0FDRixJQURFLHNCQUNXLFFBQVEsS0FBUixDQURsQixDQURlOzs7O1dBeEtGOzs7VUE0S1YsZUFBYSxFQUFDLFFBQU8sZUFBTSxTQUFOLENBQWdCLE1BQWhCO2tCQTVLWDs7SUErS2Y7Ozs7Ozs7Ozs7O2lDQUNNO3lCQUMyQixLQUFLLEtBQUwsQ0FEM0I7Z0JBQ0MsNkJBREQ7Z0JBQ1csbUJBRFg7O2dCQUNtQixpRUFEbkI7O0FBR0osbUJBQ0ksK0NBQUssV0FBYyxtQkFBYSxDQUFDLElBQUQsSUFBUyxRQUFULElBQW9CLEVBQXBCLENBQTNCLElBQXlELE9BQTlELENBREosQ0FISTs7OztXQUROOzs7SUFZQTs7O0FBQ0YsYUFERSxXQUNGLENBQVksS0FBWixFQUFrQjs4QkFEaEIsYUFDZ0I7OzRFQURoQix3QkFFUSxRQURROztBQUVkLGVBQUssS0FBTCxHQUFXO0FBQ1AsMEJBQWEsRUFBYjtTQURKLENBRmM7O0tBQWxCOztpQkFERTs7d0NBT2E7OztBQUNQLDRCQUFVLDZCQUE2QixLQUE3QixDQUFtQyxHQUFuQyxFQUNMLEdBREssQ0FDRDt1QkFBSTs7c0JBQWMsS0FBSyxDQUFMLEVBQVEsU0FBUzttQ0FBSSxPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEI7eUJBQUosRUFBL0I7b0JBQXdELENBQXhEOzthQUFKLENBRFQsQ0FETztBQUdOLHNCQUFJLElBQUksSUFBSixFQUFKLENBSE07Z0JBSUwsZUFBYyxLQUFLLEtBQUwsQ0FBZCxhQUpLOzs7QUFNWCxtQkFBTyxDQUFFOztrQkFBSyxLQUFJLFdBQUosRUFBZ0IsT0FBTyxFQUFDLFdBQVUsUUFBVixFQUFtQixTQUFRLEVBQVIsRUFBM0IsRUFBckI7Z0JBQThELFNBQTlEO2FBQUYsRUFDRTs7a0JBQUssS0FBSSxVQUFKLEVBQUw7Z0JBQ2I7QUFDQyx5QkFBSSxVQUFKO0FBQ0EsNkJBQVMsR0FBVDtBQUNBLDZCQUFTLHVCQUFRLEdBQVIsRUFBWSxFQUFaLENBQVQ7QUFDQSxpQ0FBYSxHQUFiLEVBSkQsQ0FEYTthQURGLENBQVAsQ0FOVzs7OzttQ0FnQkosR0FBRTs7O1dBdkJYO0VBQW9CLFdBQVcsYUFBWCIsImZpbGUiOiJrbm93bGVkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIlxuaW1wb3J0IHtSZWFjdCxDb21wb25lbnQsIEZpbGUsVUksIFVzZXJ9IGZyb20gJ3FpbGktYXBwJ1xuaW1wb3J0IHtSYWlzZWRCdXR0b259IGZyb20gJ21hdGVyaWFsLXVpJ1xuaW1wb3J0IHtMaW5rfSBmcm9tIFwicmVhY3Qtcm91dGVyXCJcblxuaW1wb3J0IEljb25DcmVhdGUgZnJvbSBcIm1hdGVyaWFsLXVpL3N2Zy1pY29ucy9lZGl0b3IvYm9yZGVyLWNvbG9yXCJcbmltcG9ydCBJY29uQ2FuY2VsIGZyb20gXCJtYXRlcmlhbC11aS9zdmctaWNvbnMvbmF2aWdhdGlvbi9jYW5jZWxcIlxuXG5pbXBvcnQgQ2FsZW5kYXIsIHthZGREYXlzfSBmcm9tICcuL2NvbXBvbmVudHMvY2FsZW5kYXInXG5pbXBvcnQgZGJLbm93bGVkZ2UgZnJvbSAnLi9kYi9rbm93bGVkZ2UnXG5pbXBvcnQgZGJUYXNrIGZyb20gJy4vZGIvdGFzaydcblxuaW1wb3J0IGV4dHJhY3QgZnJvbSAnLi9wYXJzZXIvZXh0cmFjdG9yJ1xuaW1wb3J0IFRlbXBsYXRlIGZyb20gXCIuL3BhcnNlci90ZW1wbGF0ZVwiXG5cbmNvbnN0IHtMaXN0LExvYWRpbmcsQ29tbWVudCxDb21tYW5kQmFyLGZpbGVTZWxlY3Rvcn09VUlcbmNvbnN0IHtEaWFsb2dDb21tYW5kfT1Db21tYW5kQmFyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtub3dsZWRnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtlbnRpdHk6bnVsbH1cbiAgICAgICAgZGJLbm93bGVkZ2UuZmluZE9uZSh7X2lkOnRoaXMucHJvcHMucGFyYW1zLl9pZH0sZW50aXR5PT50aGlzLnNldFN0YXRlKHtlbnRpdHl9KSlcbiAgICB9XG5cblxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKXtcbiAgICAgICAgdmFyIHtwYXJhbXM6e19pZDpsYXN0SWR9fT10aGlzLnByb3BzLFxuICAgICAgICAgICAge3BhcmFtczp7X2lkfX09bmV4dFByb3BzXG5cbiAgICAgICAgaWYoX2lkIT1sYXN0SWQpXG4gICAgICAgICAgICBkYktub3dsZWRnZS5maW5kT25lKHtfaWR9LGVudGl0eT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5fSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKXtcbiAgICAgICAgdGhpcy5kb2N4ICYmIHRoaXMuZG9jeC5yZXZva2UoKVxuICAgIH1cblxuICAgIHJlbmRlcigpe1xuICAgICAgICB2YXIge2VudGl0eSwgc3RhdHVzLCBwbGFuaW5nfT10aGlzLnN0YXRlXG5cbiAgICAgICAgaWYoIWVudGl0eSlcbiAgICAgICAgICAgIHJldHVybiAoPExvYWRpbmcvPilcblxuICAgICAgICB2YXIgY29tbWFuZHM9W1wiQmFja1wiXSwgcHJpbWFyeSwgcGxhbkNvbW1hbmQ7XG4gICAgICAgIGlmKHRydWUgfHwgVXNlci5jdXJyZW50Ll9pZD09ZW50aXR5LmF1dGhvci5faWQpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJOZXcgVmVyc2lvblwiLGljb246SWNvbkNyZWF0ZX0pXG5cbiAgICAgICAgc3dpdGNoKHN0YXR1cyl7XG4gICAgICAgIGNhc2UgJ3JldmlzaW5nJzpcbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goXCJTYXZlXCIpXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJDYW5jZWxcIixcbiAgICAgICAgICAgICAgICBvblNlbGVjdDooKT0+dGhpcy5zZXRTdGF0ZSh7ZW50aXR5OnRoaXMub3JpZ2luLHN0YXR1czp1bmRlZmluZWR9KSxcbiAgICAgICAgICAgICAgICBpY29uOkljb25DYW5jZWx9KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlNhdmVcIlxuICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5vcmlnaW49ZW50aXR5XG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKHthY3Rpb246XCJQbGFuXCIsIG9uU2VsZWN0OigpPT50aGlzLnJlZnMucGxhbi5zaG93KCl9KVxuICAgICAgICAgICAgcGxhbkNvbW1hbmQ9KDxQbGFuQ29tbWFuZCByZWY9XCJwbGFuXCIgb25EaXNtaXNzPXsoKT0+dGhpcy5jcmVhdGVQbGFuKCl9Lz4pXG5cbiAgICAgICAgICAgIGNvbW1hbmRzLnB1c2goPENvbW1hbmRCYXIuQ29tbWVudCBrZXk9XCJDb21tZW50XCIgdHlwZT17ZGJLbm93bGVkZ2V9IG1vZGVsPXtlbnRpdHl9Lz4pXG4gICAgICAgICAgICBjb21tYW5kcy5wdXNoKDxDb21tYW5kQmFyLlNoYXJlIGtleT1cIlNoYXJlXCIgbWVzc2FnZT17ZW50aXR5fS8+KVxuICAgICAgICAgICAgcHJpbWFyeT1cIlBsYW5cIlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9zdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia25vd2xlZGdlXCI+XG4gICAgICAgICAgICAgICAgICAgIHtLbm93bGVkZ2UucmVuZGVyQ29udGVudChlbnRpdHkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxQbGFuIHN0eWxlPXt7cGFkZGluZzoxMH19IG9wZW49e3BsYW5pbmd9IGVudGl0eT17ZW50aXR5fS8+XG5cbiAgICAgICAgICAgICAgICA8Q29tbWFuZEJhclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb290YmFyXCJcbiAgICAgICAgICAgICAgICAgICAgcHJpbWFyeT17cHJpbWFyeX1cbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3RoaXMub25TZWxlY3QuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgaXRlbXM9e2NvbW1hbmRzfS8+XG5cbiAgICAgICAgICAgICAgICB7cGxhbkNvbW1hbmR9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cblxuXHRzdGF0aWMgZGF0ZTJTdHJpbmcoZCl7XG5cdFx0aWYoIWQpIHJldHVybiBcIlwiXG5cdFx0dmFyIG5vdz1tb21lbnQoKSxkYXRlPW1vbWVudChkKVxuICAgICAgICByZXR1cm4gZGF0ZS5mb3JtYXQobm93LmlzU2FtZShkYXRlLFwiZGF5XCIpID8gXCLku4rlpKkgSEg6TU1cIiA6IG5vdy5pc1NhbWUoZGF0ZSwgXCJ5ZWFyXCIpID8gXCJNTeaciERE5pelXCIgOiBcIllZWVnlubRNTeaciERE5pelXCIpXG5cdH1cblxuICAgIHN0YXRpYyByZW5kZXJDb250ZW50KGVudGl0eSwgb3Blbj10cnVlLCB0ZW1wbGF0ZVJlbmRlcil7XG4gICAgICAgIHZhciB7Y2F0ZWdvcnk9W10sIGtleXdvcmRzPVtdLCBmaWd1cmU9XCJodHRwOi8vbi5zaW5haW1nLmNuL3RyYW5zZm9ybS8yMDE1MDcxNi9jS0hSLWZ4ZmFzd2k0MDM5MDg1LmpwZ1wifT1lbnRpdHksXG4gICAgICAgICAgICBzZW5jb25kYXJ5U3R5bGU9e2ZvbnRTaXplOidzbWFsbCcsZm9udFdlaWdodDonbm9ybWFsJywgdGV4dEFsaWduOidyaWdodCd9LFxuICAgICAgICAgICAgdGVtcGxhdGU9bmV3IFRlbXBsYXRlKGVudGl0eS5jb250ZW50KTtcblxuICAgICAgICB2YXIgY29udGVudD0odGVtcGxhdGVSZW5kZXJ8fGZ1bmN0aW9uKHRwbCl7XG4gICAgICAgICAgICAgICAgdmFyIF9faHRtbD10cGwuY29udGVudHMubWFwKChzZWN0aW9uLGkpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKHR5cGVvZihzZWN0aW9uKT09J3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VjdGlvblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeT4ke3NlY3Rpb24ua2V5fTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3NlY3Rpb24uYWx0fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pLmpvaW4oXCJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tfX2h0bWx9fS8+XG4gICAgICAgICAgICB9KSh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgaWYoZW50aXR5LnN1bW1hcnkpe1xuICAgICAgICAgICAgY29udGVudD0oXG4gICAgICAgICAgICAgICAgPGRldGFpbHMgb3Blbj17b3Blbn0+XG4gICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5PntlbnRpdHkuc3VtbWFyeX08L3N1bW1hcnk+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZGV0YWlscz5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub3ROZXdTdHVmZlxuICAgICAgICBpZihlbnRpdHkuX2lkKXtcbiAgICAgICAgICAgIG5vdE5ld1N0dWZmPVtcbiAgICAgICAgICAgICAgICAoPGgxIGtleT1cImxpbmtcIj48TGluayB0bz17YC9rbm93bGVkZ2UvJHtlbnRpdHkuX2lkfWB9PntlbnRpdHkudGl0bGV9PC9MaW5rPjwvaDE+KSxcbiAgICAgICAgICAgICAgICAoPHAga2V5PVwiYXV0aG9yXCI+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkuYXV0aG9yLm5hbWV9IC0gPHRpbWU+e0tub3dsZWRnZS5kYXRlMlN0cmluZyhlbnRpdHkuY3JlYXRlZEF0KX08L3RpbWU+XG4gICAgICAgICAgICAgICAgPC9wPilcbiAgICAgICAgICAgIF1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgbm90TmV3U3R1ZmY9KDxoMSBrZXk9XCJsaW5rXCI+e2VudGl0eS50aXRsZX08L2gxPilcbiAgICAgICAgfVxuXG5cdFx0aWYoZmlndXJlKVxuXHRcdFx0ZmlndXJlPSg8aW1nIHNyYz17ZmlndXJlfS8+KVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdDxhcnRpY2xlPlxuXHRcdFx0XHQ8ZmlndXJlPntmaWd1cmV9PC9maWd1cmU+XG5cdFx0XHRcdDxoZWFkZXI+XG5cdFx0XHRcdFx0e25vdE5ld1N0dWZmfVxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0e2NhdGVnb3J5LmpvaW4oXCIsIFwiKX0ge2tleXdvcmRzLmpvaW4oXCIsIFwiKX1cblx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0XHQ8c2VjdGlvbj5cblx0XHRcdFx0XHR7Y29udGVudH1cblx0XHRcdFx0PC9zZWN0aW9uPlxuXHRcdFx0PC9hcnRpY2xlPlxuXHRcdClcbiAgICB9XG5cbiAgICBnZXRFeHBlcmllbmNlKCl7XG5cbiAgICB9XG5cbiAgICBvblNlbGVjdChjb21tYW5kKXtcbiAgICAgICAgc3dpdGNoKGNvbW1hbmQpe1xuICAgICAgICBjYXNlICdOZXcgVmVyc2lvbic6XG4gICAgICAgICAgICBLbm93bGVkZ2Uuc2VsZWN0RG9jeCgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRvY3gpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeCAmJiB0aGlzLmRvY3gucmV2b2tlKClcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZG9jeFxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jeD1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciB7a25vd2xlZGdlfT1kb2N4XG4gICAgICAgICAgICAgICAgICAgIHZhciBwZW5kaW5nPU9iamVjdC5hc3NpZ24oe30sdGhpcy5zdGF0ZS5lbnRpdHksa25vd2xlZGdlKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtlbnRpdHk6cGVuZGluZywgc3RhdHVzOidyZXZpc2luZyd9KVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdTYXZlJzpcbiAgICAgICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlXG4gICAgICAgICAgICB0aGlzLmRvY3gudXBsb2FkKGVudGl0eSkudGhlbigoY29udGVudCk9PntcbiAgICAgICAgICAgICAgICBlbnRpdHkucGhvdG9zPXRoaXMuZG9jeC5nZXRQaG90b3MoKVxuICAgICAgICAgICAgICAgIGVudGl0eS5jb250ZW50PWNvbnRlbnRcbiAgICAgICAgICAgICAgICBkYktub3dsZWRnZS51cHNlcnQodGhpcy5zdGF0ZS5lbnRpdHksIHRoaXMub3JpZ2luLFxuICAgICAgICAgICAgICAgICAgICAoKT0+dGhpcy5zZXRTdGF0ZSh7c3RhdHVzOnVuZGVmaW5lZH0pKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVQbGFuKCl7XG4gICAgICAgIHZhciB7ZW50aXR5fT10aGlzLnN0YXRlLFxuICAgICAgICAgICAge3NlbGVjdGVkRGF5c309dGhpcy5yZWZzLnBsYW4uc3RhdGVcblxuICAgICAgICBkYlRhc2sucGxhbihlbnRpdHksc2VsZWN0ZWREYXlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBzZWxlY3REb2N4KCl7XG4gICAgICAgIHJldHVybiBmaWxlU2VsZWN0b3Iuc2VsZWN0KClcbiAgICAgICAgICAgIC50aGVuKGV4dHJhY3QsY29uc29sZS5lcnJvcilcbiAgICB9XG4gICAgc3RhdGljIGNvbnRleHRUeXBlcz17cm91dGVyOlJlYWN0LlByb3BUeXBlcy5vYmplY3R9XG59XG5cbmNsYXNzIFBsYW4gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHZhciB7Y2xhc3NOYW1lLG9wZW4sLi4ub3RoZXJzfT10aGlzLnByb3BzXG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtjbGFzc05hbWV9ICR7IW9wZW4gJiYgXCJoaWRkZW5cIiB8fFwiXCJ9YH0gey4uLm90aGVyc30+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufVxuXG5jbGFzcyBQbGFuQ29tbWFuZCBleHRlbmRzIENvbW1hbmRCYXIuRGlhbG9nQ29tbWFuZHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcyl7XG4gICAgICAgIHN1cGVyKHByb3BzKVxuICAgICAgICB0aGlzLnN0YXRlPXtcbiAgICAgICAgICAgIHNlbGVjdGVkRGF5czpbXVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKXtcbiAgICAgICAgdmFyIGV2ZXJ5ZGF5cz1cIndlZWssd2Vla2VuZCx3ZWVrZGF5LG1vbnRoXCIuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICAgICAgLm1hcChhPT4oPFJhaXNlZEJ1dHRvbiBrZXk9e2F9IG9uQ2xpY2s9eygpPT50aGlzLnNlbGVjdERheXMoYSl9PnthfTwvUmFpc2VkQnV0dG9uPikpXG4gICAgICAgICAgICAsbm93PW5ldyBEYXRlKClcbiAgICAgICAgICAgICx7c2VsZWN0ZWREYXlzfT10aGlzLnN0YXRlO1xuXG4gICAgICAgIHJldHVybiBbKDxkaXYga2V5PVwiZXZlcnlkYXlzXCIgc3R5bGU9e3t0ZXh0QWxpZ246J2NlbnRlcicscGFkZGluZzoxMH19PntldmVyeWRheXN9PC9kaXY+KSxcbiAgICAgICAgICAgICAgICAoPGRpdiBrZXk9XCJjYWxlbmRlclwiPlxuXHRcdFx0XHQ8Q2FsZW5kYXJcblx0XHRcdFx0XHRyZWY9XCJjYWxlbmRhclwiXG5cdFx0XHRcdFx0bWluRGF0ZT17bm93fVxuXHRcdFx0XHRcdG1heERhdGU9e2FkZERheXMobm93LDMxKX1cblx0XHRcdFx0XHRkaXNwbGF5RGF0ZT17bm93fSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PildXG4gICAgfVxuXG4gICAgc2VsZWN0RGF5cyhhKXtcblxuICAgIH1cbn0iXX0=